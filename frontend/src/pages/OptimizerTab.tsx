import React from 'react';
import { AIRecommendationCard } from '../components/optimizer/AIRecommendationCard';
import { StrategyPreviewModal } from '../components/optimizer/StrategyPreviewModal';
import { useSimulationStore } from '../store/useSimulationStore';

export const OptimizerTab: React.FC = () => {
  const { strategies, getImbalance } = useSimulationStore();
  const imbalance = getImbalance();

  return (
    <div className="space-y-[44px] animate-in fade-in duration-300 pb-12">
      <section>
        <h2 className="text-[20px] font-bold font-display text-[var(--color-ink)] mb-2">
          03 / Optimizer
        </h2>
        <p className="text-[14px] text-[var(--color-muted)] max-w-2xl">
          Recommended interventions and expected impact.
        </p>
      </section>

      <section className="border border-[var(--border)] bg-[var(--color-paper)] flex flex-col relative overflow-hidden rounded-[4px]">
        <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="font-mono text-[10px] uppercase text-[var(--color-muted)] mb-1">
              NETWORK STATE / {imbalance.classification}
            </div>
            <h3 className="text-[18px] font-bold font-display text-[var(--color-ink)] mb-1">
              {strategies.filter(s => s.applied).length} strategies active
            </h3>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        {strategies.map((strategy) => (
          <AIRecommendationCard key={strategy.id} strategy={strategy} />
        ))}
      </section>

      <StrategyPreviewModal />
    </div>
  );
};
