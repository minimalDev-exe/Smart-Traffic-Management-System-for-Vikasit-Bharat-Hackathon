import React from 'react';
import type { AIStrategy } from '../../types';
import { useSimulationStore } from '../../store/useSimulationStore';
import { ArrowRight } from 'lucide-react';

export const AIRecommendationCard: React.FC<{ strategy: AIStrategy }> = ({ strategy }) => {
  const { applyStrategy, unapplyStrategy } = useSimulationStore();
  const isApplied = strategy.applied;

  return (
    <div className={`p-6 border border-[var(--border)] flex flex-col gap-4 rounded-[4px] ${isApplied ? 'bg-[var(--color-paper-2)]' : 'bg-[var(--color-paper)]'}`}>
      <div className="flex items-start justify-between">
        <div>
          <div className="font-mono text-[10px] uppercase text-[var(--color-muted)] mb-1">
            {isApplied ? 'ACTIVE' : strategy.priority} / {strategy.targetAuthority}
          </div>
          <h3 className="text-[16px] font-bold font-display text-[var(--color-ink)]">{strategy.title}</h3>
        </div>
        {isApplied ? (
          <button onClick={() => unapplyStrategy(strategy.id)} className="px-3 py-1.5 bg-[var(--color-paper)] hover:bg-[var(--color-paper-2)] border border-[var(--border)] text-[var(--color-ink)] text-[12px] font-display cursor-pointer rounded-[4px] transition-colors">
            Revert
          </button>
        ) : (
          <button onClick={() => applyStrategy(strategy.id)} className="px-4 py-2 bg-[var(--color-ink)] hover:bg-[var(--color-petrol)] text-[var(--color-paper)] font-bold text-[13px] font-display flex items-center gap-2 cursor-pointer rounded-[4px]">
            <span>Apply</span> <ArrowRight className="w-4 h-4"/>
          </button>
        )}
      </div>

      <div className="text-[13px] text-[var(--color-ink)]">
        {strategy.recommendedAction}
      </div>

      <div className="flex gap-6 font-mono text-[12px] pt-4 border-t border-[var(--border)]">
        <div className="flex flex-col"><span className="text-[10px] text-[var(--color-muted)]">Queue</span><span className="text-[var(--color-citrus)]">{strategy.expectedImpact.queueReduction}</span></div>
        <div className="flex flex-col"><span className="text-[10px] text-[var(--color-muted)]">Wait</span><span className="text-[var(--color-ink)]">{strategy.expectedImpact.avgWait}</span></div>
        <div className="flex flex-col"><span className="text-[10px] text-[var(--color-muted)]">Throughput</span><span className="text-[var(--color-sage)]">{strategy.expectedImpact.throughput}</span></div>
      </div>
    </div>
  );
};
