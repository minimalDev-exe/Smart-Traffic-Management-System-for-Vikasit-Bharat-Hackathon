import React, { useState, useMemo } from 'react';
import {
  MapContainer,
  TileLayer,
  Polyline,
  Polygon,
  Marker,
  Popup,
  Circle,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';
import { useSimulationStore } from '../../store/useSimulationStore';
import { VehicleCanvasLayer } from './VehicleCanvasLayer';
import { MapLegend } from './MapLegend';
import {
  TrafficCone,
  AlertTriangle,
  Building,
  Zap,
} from 'lucide-react';
import type { RoadSegment, Junction } from '../../types';

// Map camera controller helper
const MapViewController: React.FC<{
  target: { lat: number; lng: number; zoom: number } | null;
}> = ({ target }) => {
  const map = useMap();
  React.useEffect(() => {
    if (target) {
      map.flyTo([target.lat, target.lng], target.zoom, {
        duration: 1.2,
        easeLinearity: 0.25,
      });
    }
  }, [map, target]);
  return null;
};

export const TrafficMap: React.FC<{ className?: string; hideControls?: boolean }> = ({ 
  className = "h-[650px] lg:h-[720px]",
  hideControls = false
}) => {
  const {
    isDarkMode,
    roads,
    junctions,
    authorities,
    selectRoad,
    selectJunction,
    selectAuthority,
    selectedRoadId,
    applyStrategy,
    strategies,
  } = useSimulationStore();

  const [cameraTarget, setCameraTarget] = useState<{
    lat: number;
    lng: number;
    zoom: number;
  } | null>(null);

  const [layers, setLayers] = useState({
    heatmap: true,
    authorities: true,
    signals: true,
    vehicles: true,
    incidents: true,
  });

  // Canvas renderer instance for all vectors (maximum performance)
  const canvasRenderer = useMemo(() => L.canvas({ padding: 0.5 }), []);

  const handleToggleLayer = (layer: keyof typeof layers) => {
    setLayers((prev) => ({ ...prev, [layer]: !prev[layer] }));
  };

  const handleFocus = (lat: number, lng: number, zoom: number) => {
    setCameraTarget({ lat, lng, zoom });
  };

  // Helper to color roads by congestion percent / speed
  const getRoadColor = (road: RoadSegment) => {
    if (road.congestionPercent > 85) return '#EF4444'; // Red
    if (road.congestionPercent > 70) return '#F97316'; // Orange
    if (road.congestionPercent > 40) return '#F59E0B'; // Yellow
    return '#10B981'; // Green
  };

  // Custom Junction Marker Icon
  const createJunctionIcon = (junction: Junction) => {
    const isRed = junction.signalPhase.includes('Red');
    const isGreen = junction.signalPhase.includes('Green');
    const color = isGreen ? '#10B981' : isRed ? '#EF4444' : '#F59E0B';

    return L.divIcon({
      className: 'custom-junction-marker',
      html: `
        <div style="
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #F3F1EA;
          border: 2px solid ${color};
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 10px ${color}80;
          color: #1D2421;
          font-size: 9px;
          font-weight: 800;
          font-family: monospace;
          cursor: pointer;
        ">
          ${junction.id.replace('J-', '')}
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    });
  };

  // Custom Incident / Bottleneck Marker Icon
  const createIncidentIcon = () => {
    return L.divIcon({
      className: 'custom-incident-marker',
      html: `
        <div style="
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(239, 68, 68, 0.9);
          border: 2px solid #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 15px rgba(239, 68, 68, 0.9);
          animation: pulse 1.5s infinite;
          cursor: pointer;
        ">
          <span style="color: white; font-size: 14px;">⚠</span>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });
  };

  // Tile layer URL: CartoDB Dark Matter for dark mode, CartoDB Positron for light mode
  const tileUrl = isDarkMode
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

  const unappliedStrats = strategies.filter((s) => !s.applied);

  return (
    <div className={`relative w-full ${className} rounded-[4px] overflow-hidden border border-[var(--border)]`}>
      <MapContainer
        center={[21.1292, 79.1036]}
        zoom={12}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        {/* Dynamic Tile Layer */}
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url={tileUrl}
        />

        <MapViewController target={cameraTarget} />

        {/* 1. Planning Authority Boundaries Overlay (Polygons with canvas renderer) */}
        {layers.authorities &&
          authorities.map((auth) => (
            <Polygon
              key={auth.id}
              positions={auth.boundaryCoordinates}
              renderer={canvasRenderer}
              pathOptions={{
                color: auth.color,
                weight: 2,
                dashArray: '6, 6',
                fillColor: auth.color,
                fillOpacity: isDarkMode ? 0.08 : 0.12,
              }}
              eventHandlers={{
                click: () => selectAuthority(auth.id),
              }}
            >
              <Popup>
                <div className="p-2 space-y-2 text-xs text-[var(--color-ink)]">
                  <div className="flex items-center gap-2 border-b border-[var(--border)] pb-1">
                    <Building className="w-4 h-4 text-[var(--color-rust)]" />
                    <span className="font-bold font-display text-[14px]">{auth.name}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-[var(--color-muted)] font-mono">
                    <div>
                      <span>Road Utilization:</span>
                      <p className="font-bold text-[var(--color-rust)]">
                        {auth.roadUtilizationPercent}%
                      </p>
                    </div>
                    <div>
                      <span>Congestion Level:</span>
                      <p
                        className={`font-bold ${
                          auth.congestionLevel === 'CRITICAL'
                            ? 'text-[var(--color-rust)]'
                            : 'text-[var(--color-sage)]'
                        }`}
                      >
                        {auth.congestionLevel}
                      </p>
                    </div>
                    <div>
                      <span>Active Vehicles:</span>
                      <p className="font-bold">{auth.vehicles.toLocaleString()}</p>
                    </div>
                    <div>
                      <span>Avg Speed:</span>
                      <p className="font-bold">{auth.avgSpeedKmh} km/h</p>
                    </div>
                  </div>
                </div>
              </Popup>
            </Polygon>
          ))}

        {/* 2. Congestion Heatmap Pulse Rings (Canvas Circles) */}
        {layers.heatmap &&
          roads
            .filter((r) => r.congestionPercent > 70)
            .map((road) => (
              <Circle
                key={`heat-${road.id}`}
                center={road.coordinates[Math.floor(road.coordinates.length / 2)]}
                radius={road.congestionPercent > 85 ? 1200 : 700}
                renderer={canvasRenderer}
                pathOptions={{
                  color: road.congestionPercent > 85 ? '#EF4444' : '#F97316',
                  fillColor: road.congestionPercent > 85 ? '#EF4444' : '#F97316',
                  fillOpacity: 0.18,
                  weight: 1,
                  dashArray: '4, 4',
                }}
              />
            ))}

        {/* 3. Road Network Segments (Canvas Polylines) */}
        {roads.map((road) => {
          const isSelected = selectedRoadId === road.id;
          const roadColor = getRoadColor(road);

          return (
            <Polyline
              key={road.id}
              positions={road.coordinates}
              renderer={canvasRenderer}
              pathOptions={{
                color: isSelected ? '#FFFFFF' : roadColor,
                weight: isSelected ? 8 : road.lanes >= 6 ? 6 : 4,
                opacity: 0.95,
                lineCap: 'round',
                lineJoin: 'round',
              }}
              eventHandlers={{
                click: () => selectRoad(road.id),
              }}
            >
              {/* Exact Popup Specified in Super Prompt */}
              <Popup>
                <div className="p-2 space-y-2 text-xs font-sans text-[var(--color-ink)]">
                  <div className="flex items-center justify-between border-b border-[var(--border)] pb-1.5 gap-2">
                    <span className="font-bold font-display text-[14px] flex items-center gap-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: roadColor }}
                      />
                      Road: {road.name}
                    </span>
                    <span
                      className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-[4px] ${
                        road.status === 'Congested'
                          ? 'bg-[var(--color-rust)]/20 text-[var(--color-rust)]'
                          : 'bg-[var(--color-sage)]/20 text-[var(--color-sage)]'
                      }`}
                    >
                      {road.status}
                    </span>
                  </div>

                  <div className="space-y-1 text-[11px] text-[var(--color-muted)] font-mono">
                    <div className="flex items-center justify-between">
                      <span className="font-sans">Vehicles:</span>
                      <span className="font-bold text-[var(--color-ink)]">{road.currentVehicles}</span>
                      <span className="font-sans px-1">| Avg Speed:</span>
                      <span className="font-bold text-[var(--color-citrus)]">{road.currentSpeedKmh} km/h</span>
                      <span className="font-sans px-1">| Density:</span>
                      <span className="font-bold text-[var(--color-rust)]">{road.density}</span>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-[var(--border)]">
                      <span className="font-sans">Queue Length:</span>
                      <span className="font-bold text-[var(--color-rust)]">{road.queueLengthMeters} m</span>
                      <span className="font-sans px-1">| Travel Time:</span>
                      <span className="font-bold text-[var(--color-petrol)]">{road.travelTimeMinutes} min</span>
                      <span className="font-sans px-1">| Status:</span>
                      <span className="font-bold text-[var(--color-ink)]">{road.congestionLevel}</span>
                    </div>
                  </div>

                  <div className="pt-1.5 border-t border-[var(--border)] flex items-center justify-between text-[10px]">
                    <span className="text-[var(--color-muted)]">Jurisdiction:</span>
                    <span className="font-bold text-[var(--color-petrol)]">{road.authorityName}</span>
                  </div>

                  {road.congestionPercent > 70 && unappliedStrats.length > 0 && (
                    <button
                      onClick={() => applyStrategy(unappliedStrats[0].id)}
                      className="w-full mt-1 py-1.5 rounded-[4px] bg-[var(--color-rust)] hover:bg-[#c93d3d] text-white font-bold text-[10px] flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Zap className="w-3 h-3" />
                      <span>Apply AI Reroute / Signal Strategy</span>
                    </button>
                  )}
                </div>
              </Popup>
            </Polyline>
          );
        })}

        {/* 4. Junction Signal Node Markers */}
        {layers.signals &&
          junctions.map((junc) => (
            <Marker
              key={junc.id}
              position={junc.coordinates}
              icon={createJunctionIcon(junc)}
              eventHandlers={{
                click: () => selectJunction(junc.id),
              }}
            >
              <Popup>
                <div className="p-2 space-y-2 text-xs text-[var(--color-ink)]">
                  <div className="flex items-center justify-between border-b border-[var(--border)] pb-1">
                    <span className="font-bold font-display text-[14px] flex items-center gap-1.5">
                      <TrafficCone className="w-4 h-4 text-[var(--color-citrus)]" />
                      {junc.name}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-[4px] bg-[var(--color-paper-2)] border border-[var(--border)] text-[var(--color-ink)]">
                      {junc.id}
                    </span>
                  </div>

                  <div className="space-y-1 text-[11px] text-[var(--color-muted)]">
                    <div className="flex items-center justify-between">
                      <span>Signal Phase:</span>
                      <span className="font-bold text-[var(--color-sage)] font-mono">
                        {junc.signalPhase} ({junc.greenDurationSeconds}s Green)
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Queue Length:</span>
                      <span className="font-bold text-[var(--color-rust)] font-mono">
                        {junc.currentQueueLengthMeters} m
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Adaptive Control:</span>
                      <span className="font-bold text-[var(--color-petrol)]">
                        {junc.adaptiveEnabled ? 'Enabled (AI)' : 'Fixed Cycle'}
                      </span>
                    </div>
                  </div>

                  <div className="pt-1.5 border-t border-[var(--border)]">
                    <span className="text-[10px] text-[var(--color-muted)] block mb-1">
                      Approaching Vehicle Influx:
                    </span>
                    <div className="grid grid-cols-4 gap-1 text-[10px] font-mono text-center">
                      <div className="p-1 rounded-[4px] bg-[var(--color-paper-2)] border border-[var(--border)]">
                        <span className="text-[var(--color-muted)] block">N</span>
                        <span className="font-bold text-[var(--color-ink)]">{junc.directionCounts.north}</span>
                      </div>
                      <div className="p-1 rounded-[4px] bg-[var(--color-paper-2)] border border-[var(--border)]">
                        <span className="text-[var(--color-muted)] block">S</span>
                        <span className="font-bold text-[var(--color-ink)]">{junc.directionCounts.south}</span>
                      </div>
                      <div className="p-1 rounded-[4px] bg-[var(--color-paper-2)] border border-[var(--border)]">
                        <span className="text-[var(--color-muted)] block">E</span>
                        <span className="font-bold text-[var(--color-rust)]">{junc.directionCounts.east}</span>
                      </div>
                      <div className="p-1 rounded-[4px] bg-[var(--color-paper-2)] border border-[var(--border)]">
                        <span className="text-[var(--color-muted)] block">W</span>
                        <span className="font-bold text-[var(--color-rust)]">{junc.directionCounts.west}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

        {/* 5. Incident / Severe Bottleneck Markers */}
        {layers.incidents && (
          <Marker position={[21.1522, 79.1336]} icon={createIncidentIcon()}>
            <Popup>
              <div className="p-2 space-y-1 text-xs text-[var(--color-ink)]">
                <div className="font-bold font-display text-[14px] text-[var(--color-rust)] flex items-center gap-1.5 border-b border-[var(--border)] pb-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Severe Bottleneck Alert</span>
                </div>
                <p className="text-[11px] text-[var(--color-ink)] font-mono pt-1">
                  Inner Ring Road & Junction J-14 · Queue 340m
                </p>
                <p className="text-[10px] text-[var(--color-muted)] font-mono">
                  Authority B MIHAN Tech Corridor over capacity (91.5% utilization).
                </p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* 6. High Performance Canvas Moving Vehicles Layer */}
        {layers.vehicles && <VehicleCanvasLayer />}
      </MapContainer>

      {/* Floating Interactive Map Legend & Layer Controls */}
      {!hideControls && (
        <MapLegend
          layers={layers}
          onToggleLayer={handleToggleLayer}
          onFocusLocation={handleFocus}
        />
      )}
    </div>
  );
};
