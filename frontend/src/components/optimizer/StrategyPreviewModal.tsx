import React from 'react';
import {
  X,
  BrainCircuit,
  Zap,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useSimulationStore } from '../../store/useSimulationStore';

export const StrategyPreviewModal: React.FC = () => {
  const {
    isDarkMode,
    previewStrategyId,
    setPreviewStrategyId,
    strategies,
    applyStrategy,
    getImbalance,
  } = useSimulationStore();

  if (!previewStrategyId) return null;

  const strategy = strategies.find((s) => s.id === previewStrategyId);
  if (!strategy) return null;

  const currentImbalance = getImbalance();

  const handleCommit = () => {
    applyStrategy(strategy.id);
    setPreviewStrategyId(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className={`rounded-3xl max-w-2xl w-full border shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 ${
          isDarkMode ? 'bg-[#111827] border-slate-800 text-white' : 'bg-white border-slate-200 text-[#1A2B4C]'
        }`}
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-800/80 flex items-center justify-between bg-gradient-to-r from-orange-500/10 to-amber-500/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center border border-orange-500/30">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-400">
                  Non-Mutating AI Simulation Preview
                </span>
                <span className="text-xs text-slate-400 font-mono">Confidence: 94.8%</span>
              </div>
              <h3 className="text-base font-bold text-white dark:text-white">
                Projected Impact: {strategy.title}
              </h3>
            </div>
          </div>

          <button
            onClick={() => setPreviewStrategyId(null)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 text-xs text-slate-300">
          {/* Target & Action Brief */}
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-1.5">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              Target Intervention Area
            </span>
            <p className="font-bold text-white text-sm">{strategy.targetLocation}</p>
            <p className="text-slate-400 text-xs">{strategy.recommendedAction}</p>
          </div>

          {/* Side-by-Side Projected Metrics Preview */}
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-3">
              Projected System Deltas (Predicted Model vs Current State)
            </span>

            <div className="grid grid-cols-3 gap-3">
              {/* Metric 1: Imbalance Score */}
              <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-2 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">
                  Imbalance Tier Shift
                </span>
                <div className="flex items-center justify-center gap-2">
                  <span className="font-mono text-lg font-extrabold text-red-400">
                    {currentImbalance.score}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-500" />
                  <span className="font-mono text-lg font-extrabold text-emerald-400">
                    24
                  </span>
                </div>
                <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full inline-block">
                  HIGH → OPTIMAL Tier
                </span>
              </div>

              {/* Metric 2: Network Avg Speed */}
              <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-2 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">
                  Network Avg Speed
                </span>
                <div className="flex items-center justify-center gap-2">
                  <span className="font-mono text-lg font-extrabold text-slate-300">
                    31 km/h
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-500" />
                  <span className="font-mono text-lg font-extrabold text-emerald-400">
                    39.6 km/h
                  </span>
                </div>
                <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full inline-block">
                  +28% Throughput
                </span>
              </div>

              {/* Metric 3: Queue Length */}
              <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-2 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">
                  J-14 Queue Length
                </span>
                <div className="flex items-center justify-center gap-2">
                  <span className="font-mono text-lg font-extrabold text-red-400">
                    540m
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-500" />
                  <span className="font-mono text-lg font-extrabold text-emerald-400">
                    80m
                  </span>
                </div>
                <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full inline-block">
                  -85% Queue Spillback
                </span>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs flex items-start gap-2">
            <Sparkles className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              <strong>Non-mutating Preview Active:</strong> Clicking "Commit Strategy" will apply these signal timings and VMS rerouting instructions to the live simulation network.
            </span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/80 flex items-center justify-between">
          <button
            onClick={() => setPreviewStrategyId(null)}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            Cancel Preview
          </button>

          <button
            onClick={handleCommit}
            className="px-6 py-2.5 rounded-xl font-bold text-xs bg-orange-600 hover:bg-orange-700 text-white flex items-center gap-2 shadow-lg shadow-orange-600/20 transition-all cursor-pointer"
          >
            <Zap className="w-4 h-4" />
            <span>Commit & Apply Strategy</span>
          </button>
        </div>
      </div>
    </div>
  );
};
