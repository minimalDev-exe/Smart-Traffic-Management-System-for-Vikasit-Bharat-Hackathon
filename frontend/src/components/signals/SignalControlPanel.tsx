import React, { useState } from 'react';
import { useSimulationStore } from '../../store/useSimulationStore';

export const SignalControlPanel: React.FC = () => {
  const { junctions, selectedJunctionId, selectJunction, updateJunctionGreen, toggleAdaptiveJunction } = useSimulationStore();
  const [activeJuncId, setActiveJuncId] = useState<string>(selectedJunctionId || junctions[1]?.id || 'J-14');
  const currentJunction = junctions.find((j) => j.id === activeJuncId) || junctions[0];
  const [tempGreen, setTempGreen] = useState<number>(currentJunction.greenDurationSeconds);

  React.useEffect(() => {
    setTempGreen(currentJunction.greenDurationSeconds);
  }, [currentJunction]);

  const greenDelta = tempGreen - currentJunction.greenDurationSeconds;
  const predictedThroughputDelta = (greenDelta * 0.6).toFixed(1);
  const predictedQueueDelta = (greenDelta * -3.2).toFixed(0);

  return (
    <div className="p-8 border border-[var(--border)] bg-[var(--color-paper)] flex flex-col gap-8 rounded-[4px]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[var(--border)]">
        <div>
          <h3 className="text-[18px] font-bold font-display text-[var(--color-ink)]">Phase control</h3>
          <p className="text-[14px] text-[var(--color-muted)]">Hardware-in-the-loop TraCI overrides.</p>
        </div>
        <select
          value={activeJuncId}
          onChange={(e) => { setActiveJuncId(e.target.value); selectJunction(e.target.value); }}
          className="px-3 py-2 bg-[var(--color-paper-2)] border border-[var(--border)] text-[13px] font-mono text-[var(--color-ink)] focus:outline-none rounded-[4px]"
        >
          {junctions.map((j) => (
            <option key={j.id} value={j.id}>{j.id} — {j.name}</option>
          ))}
        </select>
      </div>

      <div className="grid md:grid-cols-3 gap-[40px]">
        <div className="space-y-1">
          <span className="font-mono text-[10px] uppercase text-[var(--color-muted)]">Current Phase</span>
          <div className="font-mono text-[24px] font-medium text-[var(--color-ink)]">{currentJunction.signalPhase}</div>
          <div className="font-mono text-[11px] text-[var(--color-muted)]">Cycle: {currentJunction.cycleTimeSeconds}s</div>
        </div>
        <div className="space-y-1">
          <span className="font-mono text-[10px] uppercase text-[var(--color-muted)]">Queue</span>
          <div className="font-mono text-[24px] font-medium text-[var(--color-rust)]">{currentJunction.currentQueueLengthMeters}m</div>
        </div>
        <div className="space-y-1">
          <span className="font-mono text-[10px] uppercase text-[var(--color-muted)]">Actuation</span>
          <div className="font-mono text-[14px] font-bold text-[var(--color-ink)] mb-2">{currentJunction.adaptiveEnabled ? 'AI Adaptive' : 'Fixed Timing'}</div>
          <button
            onClick={() => toggleAdaptiveJunction(currentJunction.id)}
            className="px-3 py-1 bg-[var(--color-paper-2)] hover:bg-[var(--color-paper)] border border-[var(--border)] text-[12px] font-display text-[var(--color-ink)] transition-colors cursor-pointer rounded-[4px]"
          >
            Toggle Mode
          </button>
        </div>
      </div>

      <div className="p-6 bg-[var(--color-paper-2)] border border-[var(--border)] space-y-4 rounded-[4px]">
        <div className="flex items-center justify-between">
          <div className="font-bold font-display text-[var(--color-ink)]">Adjust Green Signal Duration</div>
          <div className="font-mono text-[16px] font-medium text-[var(--color-ink)]">{tempGreen}s</div>
        </div>
        <input
          type="range" min={15} max={90} step={1} value={tempGreen}
          onChange={(e) => setTempGreen(Number(e.target.value))}
          className="w-full h-2 bg-[var(--border)] appearance-none cursor-pointer rounded-full"
        />
        <div className="flex items-center gap-4 font-mono text-[12px] text-[var(--color-muted)] pt-2">
          <span>Throughput: {predictedThroughputDelta}%</span>
          <span>Queue: {predictedQueueDelta}m</span>
        </div>
        <div className="flex justify-end pt-2">
          <button
            onClick={() => updateJunctionGreen(currentJunction.id, tempGreen)}
            className="px-5 py-2 bg-[var(--color-ink)] hover:bg-[var(--color-petrol)] text-[var(--color-paper)] font-bold text-[13px] font-display cursor-pointer rounded-[4px]"
          >
            Apply timing
          </button>
        </div>
      </div>
    </div>
  );
};
