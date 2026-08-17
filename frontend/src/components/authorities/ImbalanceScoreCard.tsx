import React from 'react';
import {
  AlertOctagon,
  Sliders,
} from 'lucide-react';
import { useSimulationStore } from '../../store/useSimulationStore';

export const ImbalanceScoreCard: React.FC = () => {
  const { isDarkMode, getImbalance, strategies, applyStrategy, unapplyStrategy } =
    useSimulationStore();

  const imbalance = getImbalance();
  const isOptimized = strategies.some((s) => s.applied);

  // Sub-components data matching the mathematical formula in imbalanceCalculator.ts
  const subComponents = [
    {
      id: 'std_dev',
      label: 'Utilization Standard Deviation (C_std)',
      weight: '35%',
      value: imbalance.utilizationStdDev,
      unit: '%',
      scoreImpact: Math.round(
        (imbalance.utilizationStdDev / 35.0) * 100 * imbalance.weights.utilizationStdDev
      ),
      normalized: Math.min(100, Math.round((imbalance.utilizationStdDev / 35.0) * 100)),
      desc: 'Measures dispersion of road load across all 4 municipal jurisdictions.',
      color: 'bg-blue-500',
    },
    {
      id: 'spread',
      label: 'Max/Min Authority Spread (C_spread)',
      weight: '25%',
      value: imbalance.maxMinSpreadPercent,
      unit: '%',
      scoreImpact: Math.round(
        (imbalance.maxMinSpreadPercent / 70.0) * 100 * imbalance.weights.maxMinSpread
      ),
      normalized: Math.min(100, Math.round((imbalance.maxMinSpreadPercent / 70.0) * 100)),
      desc: `Gap between highest (${imbalance.highestLoadedAuthority}: ${imbalance.highestUtilization}%) and lowest (${imbalance.lowestLoadedAuthority}: ${imbalance.lowestUtilization}%).`,
      color: 'bg-amber-500',
    },
    {
      id: 'bottleneck',
      label: 'Critical Bottleneck Ratio (C_bottleneck)',
      weight: '25%',
      value: imbalance.bottleneckPenalty,
      unit: 'pts',
      scoreImpact: Math.round(imbalance.bottleneckPenalty * imbalance.weights.bottleneckRatio),
      normalized: Math.min(100, Math.round(imbalance.bottleneckPenalty)),
      desc: 'Exponential penalty applied when any single authority exceeds 70% capacity threshold.',
      color: 'bg-red-500',
    },
    {
      id: 'share_disparity',
      label: 'Traffic Share Skew (C_share)',
      weight: '15%',
      value: imbalance.trafficShareDisparity,
      unit: '%',
      scoreImpact: Math.round(
        (imbalance.trafficShareDisparity / 40.0) * 100 * imbalance.weights.trafficShareDisparity
      ),
      normalized: Math.min(100, Math.round((imbalance.trafficShareDisparity / 40.0) * 100)),
      desc: 'Deviation from the theoretical balanced 25% share per jurisdiction.',
      color: 'bg-purple-500',
    },
  ];

  return (
    <div
      className={`p-6 sm:p-8 rounded-3xl border space-y-6 transition-all ${
        isDarkMode ? 'bg-[#111827] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}
    >
      {/* Top Main Score & Classification Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800/60">
        <div className="flex items-start gap-4">
          {/* Circular Score Gauge Badge */}
          <div
            className="w-20 h-20 rounded-3xl flex flex-col items-center justify-center shrink-0 border-2 shadow-lg"
            style={{
              borderColor: imbalance.color,
              backgroundColor: imbalance.badgeBg,
              color: imbalance.color,
            }}
          >
            <span className="text-2xl font-mono font-extrabold leading-none">
              {imbalance.score}
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider opacity-80 mt-0.5">
              / 100
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span
                className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full"
                style={{ backgroundColor: imbalance.color, color: '#FFFFFF' }}
              >
                {imbalance.classification}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Deterministic Composite Formula
              </span>
            </div>
            <h3 className="text-lg font-bold text-white dark:text-white">
              Traffic Distribution Imbalance Score
            </h3>
            <p className="text-xs text-slate-300 font-medium max-w-xl leading-relaxed">
              {imbalance.explanation}
            </p>
          </div>
        </div>

        {/* Strategy Toggle inside Imbalance card */}
        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          {isOptimized ? (
            <button
              onClick={() => unapplyStrategy('strat-01')}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all border border-slate-700 cursor-pointer"
            >
              Reset to Baseline Imbalance
            </button>
          ) : (
            <button
              onClick={() => applyStrategy('strat-01')}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-extrabold bg-orange-600 hover:bg-orange-700 text-white flex items-center justify-center gap-2 shadow-md shadow-orange-600/25 transition-all cursor-pointer"
            >
              <AlertOctagon className="w-4 h-4" />
              <span>Apply AI Rebalance (Simulate Fix)</span>
            </button>
          )}
        </div>
      </div>

      {/* 4 Weighted Sub-Components Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-orange-500" />
            <span>Mathematical Sub-Components Breakdown (Formula Weights)</span>
          </span>
          <span className="text-[11px] text-slate-500 font-mono">
            Total Score = Σ (Weight_i × Normalized_i)
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-3.5">
          {subComponents.map((comp) => (
            <div
              key={comp.id}
              className={`p-4 rounded-2xl border transition-all ${
                isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-xs text-slate-200 truncate">
                  {comp.label}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20 font-mono">
                  Weight: {comp.weight}
                </span>
              </div>

              {/* Component Value & Contribution */}
              <div className="flex items-baseline justify-between text-xs font-mono my-2">
                <span className="text-slate-400 font-sans text-[11px]">
                  Raw Value: <strong className="text-white">{comp.value}{comp.unit}</strong>
                </span>
                <span className="font-bold text-orange-400">
                  +{comp.scoreImpact} pts to Score
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden mb-2">
                <div
                  className={`h-full rounded-full ${comp.color} transition-all duration-500`}
                  style={{ width: `${comp.normalized}%` }}
                />
              </div>

              <p className="text-[11px] text-slate-400 leading-tight">
                {comp.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
