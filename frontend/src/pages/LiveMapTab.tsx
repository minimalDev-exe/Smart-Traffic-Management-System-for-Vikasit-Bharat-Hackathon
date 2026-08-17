import React from 'react';
import { TrafficMap } from '../components/map/TrafficMap';
import { useSimulationStore } from '../store/useSimulationStore';
import { AlertCircle } from 'lucide-react';

export const LiveMapTab: React.FC = () => {
  const {
    roads,
    junctions,
    authorities,
    selectedRoadId,
    selectedJunctionId,
    selectedAuthorityId,
    getImbalance,
  } = useSimulationStore();

  const imbalance = getImbalance();
  const selectedRoad = roads.find((r) => r.id === selectedRoadId);
  const selectedJunction = junctions.find((j) => j.id === selectedJunctionId);
  const selectedAuthority = authorities.find((a) => a.id === selectedAuthorityId);

  return (
    <div className="space-y-[44px] animate-in fade-in duration-300 h-full flex flex-col">
      <section className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 shrink-0">
        <div>
          <h2 className="text-[20px] font-bold font-display text-[var(--color-ink)] mb-2">
            02 / Spatial network
          </h2>
          <p className="text-[14px] text-[var(--color-muted)] max-w-2xl">
            Live telemetry. Click roads or junctions for detailed metrics.
          </p>
        </div>

        <div className="flex items-center gap-2 border border-[var(--border)] px-3 py-2 rounded-[4px] bg-[var(--color-paper-2)]">
          <AlertCircle className="w-4 h-4 text-[var(--color-rust)]" />
          <span className="text-[13px] font-mono text-[var(--color-ink)]">Imbalance: {imbalance.score}/100</span>
        </div>
      </section>

      {(selectedRoad || selectedJunction || selectedAuthority) && (
        <section className="p-4 bg-[var(--color-paper-2)] border border-[var(--border)] rounded-[4px] shrink-0 text-[var(--color-ink)]">
           {selectedRoad && <div className="text-[13px] font-mono">Road: {selectedRoad.name} - Speed: {selectedRoad.currentSpeedKmh} km/h - Vehicles: {selectedRoad.currentVehicles}</div>}
           {selectedJunction && <div className="text-[13px] font-mono">Junction: {selectedJunction.name} - Phase: {selectedJunction.signalPhase}</div>}
           {selectedAuthority && <div className="text-[13px] font-mono">Authority: {selectedAuthority.name} - Util: {selectedAuthority.roadUtilizationPercent}%</div>}
        </section>
      )}

      <div className="flex-1 min-h-[500px] border border-[var(--border)] rounded-[4px] overflow-hidden">
        <TrafficMap />
      </div>
    </div>
  );
};
