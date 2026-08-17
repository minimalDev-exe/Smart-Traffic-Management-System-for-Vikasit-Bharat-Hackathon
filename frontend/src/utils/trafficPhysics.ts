import type { PlanningAuthority, RoadSegment, Junction, AIStrategy } from '../types';
import { INITIAL_AUTHORITIES, INITIAL_ROADS, INITIAL_JUNCTIONS } from '../store/useSimulationStore';

/**
 * Calculates the smooth Ramp-Plateau-Taper surge multiplier (0.0 to 1.0)
 * for a given time within a peak period window.
 */
export function calculateSurgeMultiplier(
  timeSeconds: number,
  peakPeriod: 'Morning Peak (09:00 - 12:00)' | 'Evening Peak (16:00 - 19:00)'
): number {
  const isMorning = peakPeriod.includes('Morning');
  const startSec = isMorning ? 9 * 3600 : 16 * 3600; // 09:00 (32400s) or 16:00 (57600s)
  const durationSec = 3 * 3600; // 3 hours (10800s)
  const endSec = startSec + durationSec;

  // Clamped normalized progress [0, 1]
  const clampedTime = Math.max(startSec, Math.min(endSec, timeSeconds));
  const tau = (clampedTime - startSec) / durationSec;

  if (tau <= 0.35) {
    // Phase 1: Smooth sinusoidal Ramp-Up (09:00 -> 10:03)
    return 0.5 * (1 - Math.cos((Math.PI * tau) / 0.35));
  } else if (tau <= 0.65) {
    // Phase 2: Peak Plateau Max Surge (10:03 -> 10:57)
    return 1.0;
  } else {
    // Phase 3: Smooth sinusoidal Taper-Down (10:57 -> 12:00)
    const taperProgress = (tau - 0.65) / 0.35;
    return 0.5 * (1 + Math.cos(Math.PI * taperProgress));
  }
}

/**
 * Deterministically computes the full city traffic state at ANY arbitrary timestamp.
 * Allows instant timeline scrubbing to peak hours with structural bottleneck physics.
 */
export function computeTrafficStateAtTime(
  timeSeconds: number,
  peakPeriod: 'Morning Peak (09:00 - 12:00)' | 'Evening Peak (16:00 - 19:00)',
  activeScenarioId: string,
  strategies: AIStrategy[]
): {
  authorities: PlanningAuthority[];
  roads: RoadSegment[];
  junctions: Junction[];
  surgeFactor: number;
} {
  const surge = calculateSurgeMultiplier(timeSeconds, peakPeriod); // 0.0 (off) to 1.0 (peak)
  const appliedCount = strategies.filter((s) => s.applied).length;
  const isRerouteApplied = strategies.some((s) => s.id === 'strat-02' && s.applied);
  const isSignalApplied = strategies.some((s) => s.id === 'strat-01' && s.applied);

  // Scenario specific modifiers
  const isAccident = activeScenarioId === 'accident_east';

  // 1. Planning Authorities Physics
  const authorities: PlanningAuthority[] = INITIAL_AUTHORITIES.map((baseAuth) => {
    if (baseAuth.id === 'auth-b') {
      // Authority B (MIHAN Tech Corridor): Structural capacity bottleneck
      // Base demand ranges from 3,200 (off-peak) to 5,600 (peak plateau)
      let demandVehicles = Math.round(3200 + surge * 2400);
      if (isAccident) demandVehicles += 800;

      // Base utilization without optimization: climbs from 65% to 94% (or 98% during accident)
      let util = 65.0 + surge * 29.0;
      if (isAccident) util = Math.min(99.0, util + 8.0);
      let avgSpeed = Math.max(10.0, 36.0 - surge * 23.0);
      let queue = Math.round(120 + surge * 770);
      let bottlenecks = surge > 0.4 ? (isAccident ? 5 : 4) : 2;

      // When AI Strategy applied: Relief from rerouting + green wave
      if (isRerouteApplied || isSignalApplied || appliedCount > 0) {
        const relief = appliedCount * 0.4;
        util = Math.max(48.0, util - relief * 38.0);
        avgSpeed = Math.min(40.0, avgSpeed + relief * 22.0);
        queue = Math.max(60, Math.round(queue * (1.0 - relief * 0.7)));
        demandVehicles = Math.round(demandVehicles * (1.0 - relief * 0.22));
        bottlenecks = Math.max(0, bottlenecks - Math.round(relief * 3));
      }

      const congestionLevel =
        util > 85 ? 'CRITICAL' : util > 70 ? 'HIGH' : util > 50 ? 'MODERATE' : 'LOW';

      return {
        ...baseAuth,
        vehicles: demandVehicles,
        roadUtilizationPercent: Number(util.toFixed(1)),
        avgSpeedKmh: Number(avgSpeed.toFixed(1)),
        congestionLevel: congestionLevel as any,
        activeBottlenecks: bottlenecks,
        queueAccumulatedMeters: queue,
      };
    }

    if (baseAuth.id === 'auth-d') {
      // Authority D (Amravati Road Bypass): High reserve capacity (4,000 veh/h)
      let demandVehicles = Math.round(1100 + surge * 700);
      let util = 22.0 + surge * 14.0; // 22% to 36%
      let avgSpeed = Math.max(40.0, 52.0 - surge * 6.0);

      // When AI rerouting applied: absorbs cross-jurisdiction traffic safely
      if (isRerouteApplied) {
        const absorbed = Math.round(800 * surge);
        demandVehicles += absorbed;
        util += 16.0 * surge;
        avgSpeed = Math.max(38.0, avgSpeed - 4.0);
      }

      return {
        ...baseAuth,
        vehicles: demandVehicles,
        roadUtilizationPercent: Number(util.toFixed(1)),
        avgSpeedKmh: Number(avgSpeed.toFixed(1)),
        congestionLevel: util > 50 ? 'MODERATE' : 'LOW',
        activeBottlenecks: 0,
      };
    }

    if (baseAuth.id === 'auth-a') {
      // Authority A (CBD): Commercial commuter destination
      const demandVehicles = Math.round(2400 + surge * 1800);
      let util = 45.0 + surge * 32.0; // 45% to 77%
      let avgSpeed = Math.max(18.0, 42.0 - surge * 20.0);

      if (appliedCount > 0) {
        util = Math.max(40.0, util - appliedCount * 8.0);
        avgSpeed = Math.min(38.0, avgSpeed + appliedCount * 6.0);
      }

      return {
        ...baseAuth,
        vehicles: demandVehicles,
        roadUtilizationPercent: Number(util.toFixed(1)),
        avgSpeedKmh: Number(avgSpeed.toFixed(1)),
        congestionLevel: util > 75 ? 'HIGH' : util > 55 ? 'MODERATE' : 'LOW',
      };
    }

    // Authority C (South Logistics)
    const demandVehicles = Math.round(1600 + surge * 800);
    const util = Number((35.0 + surge * 20.0).toFixed(1));
    return {
      ...baseAuth,
      vehicles: demandVehicles,
      roadUtilizationPercent: util,
      avgSpeedKmh: Number((45.0 - surge * 10.0).toFixed(1)),
      congestionLevel: util > 65 ? 'MODERATE' : 'LOW',
    };
  });

  // Normalize traffic share
  const totalVehicles = authorities.reduce((acc, a) => acc + a.vehicles, 0);
  authorities.forEach((a) => {
    a.trafficSharePercent = Number(((a.vehicles / Math.max(1, totalVehicles)) * 100).toFixed(1));
  });

  // 2. Road Network Telemetry Physics
  const roads: RoadSegment[] = INITIAL_ROADS.map((baseRoad) => {
    if (baseRoad.authorityId === 'auth-b') {
      let speed = Math.max(8.0, 45.0 - surge * 34.0);
      let congestion = Math.min(99.0, 35.0 + surge * 63.0);
      let queue = Math.round(40 + surge * 520);
      let vehicles = Math.round(1200 + surge * 2100);

      if (appliedCount > 0) {
        speed = Math.min(42.0, speed + appliedCount * 14.0);
        congestion = Math.max(40.0, congestion - appliedCount * 26.0);
        queue = Math.max(40, Math.round(queue * 0.4));
        vehicles = Math.round(vehicles * 0.75);
      }

      const status = congestion > 80 ? 'Congested' : congestion > 55 ? 'Slow' : 'Clear';
      const density = congestion > 85 ? 'Critical' : congestion > 70 ? 'High' : congestion > 45 ? 'Moderate' : 'Low';
      const level = congestion > 85 ? 'Severe Congestion' : congestion > 70 ? 'Heavy' : congestion > 40 ? 'Moderate' : 'Free Flowing';

      return {
        ...baseRoad,
        currentSpeedKmh: Number(speed.toFixed(1)),
        congestionPercent: Number(congestion.toFixed(1)),
        queueLengthMeters: queue,
        currentVehicles: vehicles,
        travelTimeMinutes: Number(((baseRoad.lengthMeters / 1000 / Math.max(5, speed)) * 60).toFixed(1)),
        status: status as any,
        density: density as any,
        congestionLevel: level as any,
      };
    }

    if (baseRoad.authorityId === 'auth-a') {
      let speed = Math.max(16.0, 48.0 - surge * 28.0);
      let congestion = Math.min(85.0, 30.0 + surge * 50.0);
      if (appliedCount > 0) {
        speed = Math.min(44.0, speed + appliedCount * 8.0);
        congestion = Math.max(35.0, congestion - appliedCount * 16.0);
      }
      return {
        ...baseRoad,
        currentSpeedKmh: Number(speed.toFixed(1)),
        congestionPercent: Number(congestion.toFixed(1)),
        travelTimeMinutes: Number(((baseRoad.lengthMeters / 1000 / Math.max(5, speed)) * 60).toFixed(1)),
      };
    }

    return baseRoad;
  });

  // 3. Junction Signal Telemetry
  const junctions: Junction[] = INITIAL_JUNCTIONS.map((baseJunc) => {
    if (baseJunc.id === 'J-14') {
      const green = isSignalApplied ? 43 : 25;
      const queue = isSignalApplied ? 110 : Math.round(80 + surge * 280);
      return {
        ...baseJunc,
        greenDurationSeconds: green,
        currentQueueLengthMeters: queue,
        adaptiveEnabled: isSignalApplied,
      };
    }
    return baseJunc;
  });

  return {
    authorities,
    roads,
    junctions,
    surgeFactor: surge,
  };
}
