export interface TeamMember {
  id: string;
  fullName: string;
  email: string;
  role: string;
}

export interface TeamLead {
  fullName: string;
  email: string;
  phone: string;
  collegeOrgId: string;
}

export interface RegistrationData {
  theme: string;
  teamName: string;
  teamLead: TeamLead;
  members: TeamMember[];
  registeredAt?: string;
  workspaceReady?: boolean;
}

export interface RoadSegment {
  id: string;
  name: string;
  authorityId: string;
  authorityName: string;
  coordinates: [number, number][];
  lengthMeters: number;
  lanes: number;
  speedLimitKmh: number;
  currentSpeedKmh: number;
  currentVehicles: number;
  capacity: number;
  density: 'Low' | 'Moderate' | 'High' | 'Critical';
  queueLengthMeters: number;
  travelTimeMinutes: number;
  congestionLevel: 'Free Flowing' | 'Moderate' | 'Heavy' | 'Severe Congestion';
  congestionPercent: number;
  status: 'Clear' | 'Slow' | 'Congested' | 'Blocked';
}

export interface Junction {
  id: string;
  name: string;
  authorityId: string;
  coordinates: [number, number];
  connectedRoads: string[];
  signalPhase: 'North-South Green' | 'East-West Green' | 'All Red' | 'Adaptive';
  greenDurationSeconds: number;
  cycleTimeSeconds: number;
  currentQueueLengthMeters: number;
  adaptiveEnabled: boolean;
  directionCounts: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
}

export interface PlanningAuthority {
  id: string;
  name: string;
  code: string;
  color: string;
  areaSqKm: number;
  boundaryCoordinates: [number, number][];
  vehicles: number;
  roadUtilizationPercent: number;
  congestionLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  avgSpeedKmh: number;
  trafficSharePercent: number;
  activeBottlenecks: number;
  queueAccumulatedMeters: number;
}

export interface AIStrategy {
  id: string;
  type:
    | 'signal_retiming'
    | 'cross_authority_rerouting'
    | 'one_way_arterial'
    | 'green_wave'
    | 'incident_clearance';
  title: string;
  targetLocation: string;
  targetAuthority: string;
  recommendedAction: string;
  expectedImpact: {
    queueReduction: string;
    avgWait: string;
    throughput: string;
  };
  applied: boolean;
  appliedAt?: string;
  priority: 'URGENT' | 'HIGH' | 'MEDIUM';
}

export interface TrafficAlert {
  id: string;
  severity: 'CRITICAL' | 'HIGH' | 'WARNING' | 'SUCCESS';
  title: string;
  location: string;
  authorityId: string;
  metric: string;
  timestamp: string;
  read: boolean;
  coordinates?: [number, number];
}

export interface ScenarioPreset {
  id: string;
  name: string;
  description: string;
  icon: string;
  peakPeriod: 'Morning Peak (09:00 - 12:00)' | 'Evening Peak (16:00 - 19:00)' | 'Off-Peak';
  trafficMultiplier: number;
  affectedAuthorities: string[];
  blockedRoads?: string[];
  isCustom?: boolean;
}

export interface SimulationState {
  state: 'STOPPED' | 'RUNNING' | 'PAUSED';
  currentTime: string;
  timeSeconds: number;
  peakPeriod: 'Morning Peak (09:00 - 12:00)' | 'Evening Peak (16:00 - 19:00)';
  speedMultiplier: number;
  activeScenarioId: string;
  activeScenarioName: string;
  totalVehicles: number;
  avgSpeedKmh: number;
  congestionZonesCount: number;
  avgTravelTimeMin: number;
  co2EmissionsTons: number;
  networkEfficiencyPercent: number;
  imbalanceScore: number;
}
