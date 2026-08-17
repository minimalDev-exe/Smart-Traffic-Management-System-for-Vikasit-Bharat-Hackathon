import React, { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import { useSimulationStore } from '../../store/useSimulationStore';
import type { RoadSegment } from '../../types';

interface VehicleParticle {
  roadId: string;
  progress: number; // 0 to 1 along the road polyline
  speed: number;
  color: string;
  size: number;
}

export const VehicleCanvasLayer: React.FC = () => {
  const map = useMap();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<VehicleParticle[]>([]);

  const { simState, speedMultiplier, roads } = useSimulationStore();

  // Mutable refs so RAF loop has zero closure-recreation overhead
  const roadsRef = useRef<RoadSegment[]>(roads);
  const simStateRef = useRef<string>(simState);
  const speedMultiplierRef = useRef<number>(speedMultiplier);

  useEffect(() => {
    roadsRef.current = roads;
  }, [roads]);

  useEffect(() => {
    simStateRef.current = simState;
  }, [simState]);

  useEffect(() => {
    speedMultiplierRef.current = speedMultiplier;
  }, [speedMultiplier]);

  // Update particles in-place or re-init without touching DOM
  useEffect(() => {
    const existingParticles = particlesRef.current;
    const roadMap: Record<string, RoadSegment> = {};
    roads.forEach((r) => {
      roadMap[r.id] = r;
    });

    // If particles array is empty or road structure changed, initialize
    if (existingParticles.length === 0) {
      const newParticles: VehicleParticle[] = [];
      roads.forEach((road) => {
        const count = Math.max(6, Math.floor(road.currentVehicles / 150));
        const color =
          road.congestionPercent > 85
            ? '#EF4444'
            : road.congestionPercent > 70
            ? '#F97316'
            : road.congestionPercent > 40
            ? '#F59E0B'
            : '#10B981';

        for (let i = 0; i < count; i++) {
          newParticles.push({
            roadId: road.id,
            progress: Math.random(),
            speed: Math.max(0.0008, (road.currentSpeedKmh / 60) * 0.003),
            color,
            size: Math.random() > 0.7 ? 3.5 : 2.5,
          });
        }
      });
      particlesRef.current = newParticles;
    } else {
      // In-place update of colors and speeds to avoid garbage collection
      existingParticles.forEach((p) => {
        const road = roadMap[p.roadId];
        if (road) {
          p.color =
            road.congestionPercent > 85
              ? '#EF4444'
              : road.congestionPercent > 70
              ? '#F97316'
              : road.congestionPercent > 40
              ? '#F59E0B'
              : '#10B981';
          p.speed = Math.max(0.0008, (road.currentSpeedKmh / 60) * 0.003);
        }
      });
    }
  }, [roads]);

  // Canvas creation: mounted ONCE on the map container with persistent 60 FPS loop
  useEffect(() => {
    const container = map.getContainer();
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '400';
    canvasRef.current = canvas;

    container.appendChild(canvas);

    const updateCanvasSize = () => {
      if (!canvas) return;
      const size = map.getSize();
      canvas.width = size.x;
      canvas.height = size.y;
    };

    updateCanvasSize();
    map.on('resize move zoom', updateCanvasSize);

    // Optimized 60 FPS animation loop with spatial culling
    const render = () => {
      if (!canvas) return;
      const ctx = canvas.getContext('2d', { alpha: true });
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const currentRoads = roadsRef.current;
      const currentSimState = simStateRef.current;
      // Always keep vehicles moving at baseline speed to make the map feel "live" even if simulation is paused
      const currentMultiplier = currentSimState === 'RUNNING' ? speedMultiplierRef.current : 1.2;

      const roadMap: Record<string, RoadSegment> = {};
      for (let i = 0; i < currentRoads.length; i++) {
        roadMap[currentRoads[i].id] = currentRoads[i];
      }

      // Performance: pre-calculate step speed scaling at 50x / 100x
      const speedScale = Math.min(6, currentMultiplier * 0.35);

      const particles = particlesRef.current;
      const pLen = particles.length;

      for (let i = 0; i < pLen; i++) {
        const p = particles[i];
        const road = roadMap[p.roadId];
        if (!road || road.coordinates.length < 2) continue;

        // Advance particle position
        if (currentMultiplier > 0) {
          p.progress += p.speed * speedScale;
          if (p.progress >= 1) p.progress -= 1;
        }

        // Fast linear interpolation along polyline
        const coords = road.coordinates;
        const totalSegments = coords.length - 1;
        const scaledProgress = p.progress * totalSegments;
        const segmentIndex = Math.min(totalSegments - 1, Math.floor(scaledProgress));
        const segmentProgress = scaledProgress - segmentIndex;

        const p1 = coords[segmentIndex];
        const p2 = coords[segmentIndex + 1];

        const lat = p1[0] + (p2[0] - p1[0]) * segmentProgress;
        const lng = p1[1] + (p2[1] - p1[1]) * segmentProgress;

        // Fast screen projection
        const pixelPoint = map.latLngToContainerPoint([lat, lng]);

        // Spatial viewport bounding-box culling
        if (
          pixelPoint.x >= -8 &&
          pixelPoint.x <= canvas.width + 8 &&
          pixelPoint.y >= -8 &&
          pixelPoint.y <= canvas.height + 8
        ) {
          ctx.beginPath();
          ctx.arc(pixelPoint.x, pixelPoint.y, p.size, 0, 6.283185307179586);
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 3;
          ctx.fill();
        }
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      map.off('resize move zoom', updateCanvasSize);
      if (canvas && canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
      canvasRef.current = null;
    };
  }, [map]);

  return null;
};
