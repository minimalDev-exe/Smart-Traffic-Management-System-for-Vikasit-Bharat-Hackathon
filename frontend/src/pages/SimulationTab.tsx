import React from 'react';
import { SimulationControls } from '../components/simulation/SimulationControls';
import { TimelineScrubber } from '../components/simulation/TimelineScrubber';
import { useSimulationStore } from '../store/useSimulationStore';
import {
  PlayCircle,
  Building,
  ArrowRight,
  Radio,
  Zap,
} from 'lucide-react';

export const SimulationTab: React.FC = () => {
  const {
    isDarkMode,
    authorities,
    strategies,
    applyStrategy,
    unapplyStrategy,
    getImbalance,
    setActiveTab,
  } = useSimulationStore();

  const imbalance = getImbalance();
  const authB = authorities.find((a) => a.id === 'auth-b') || authorities[1];
  const authD = authorities.find((a) => a.id === 'auth-d') || authorities[3];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight flex items-center gap-2">
              <PlayCircle className="w-5 h-5 text-orange-500" />
              <span>Simulation Engine & Timeline Controller</span>
            </h2>
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-400 border border-orange-500/30">
              TraCI / SUMO Architecture
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Micro/macro traffic simulation engine modeling queue accumulation, structural bottlenecks, and peak period commuter surges.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('map')}
          className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all self-start sm:self-auto cursor-pointer"
        >
          <Radio className="w-3.5 h-3.5 text-orange-400" />
          <span>View on Live Map</span>
        </button>
      </div>

      {/* Playback Controls & Timeline Scrubber */}
      <SimulationControls />
      <TimelineScrubber />

      {/* Structural Bottleneck & Cross-Jurisdiction Capacity Analysis */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Authority B vs Authority D Structural Analysis Card */}
        <div
          className={`p-6 rounded-3xl border space-y-4 ${
            isDarkMode ? 'bg-[#111827] border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-red-500" />
              <h3 className="text-sm font-bold">Structural Bottleneck vs Idle Capacity</h3>
            </div>
            <span className="text-[10px] font-bold text-slate-400 font-mono">
              Root Cause Diagnostics
            </span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            The core problem statement stems from <strong className="text-white">structural network imbalance</strong>: Authority B (East Corridor) receives 40% of commuter inflow but possesses narrow 4-lane bottlenecks at Junction J-14, whereas Authority D (West Suburbs) has a 6-lane bypass operating with 66% idle reserve capacity.
          </p>

          <div className="grid sm:grid-cols-2 gap-3 pt-2">
            {/* Authority B Card */}
            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-xs text-red-400">Authority B (East Hub)</span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-red-500/20 text-red-300">
                  Bottleneck
                </span>
              </div>
              <div className="space-y-1 text-[11px] font-mono">
                <div className="flex justify-between text-slate-300">
                  <span>Road Utilization:</span>
                  <span className="font-bold text-red-400">{authB.roadUtilizationPercent}%</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Avg Flow Speed:</span>
                  <span className="font-bold">{authB.avgSpeedKmh} km/h</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Queue Accumulated:</span>
                  <span className="font-bold text-red-400">{authB.queueAccumulatedMeters} m</span>
                </div>
              </div>
            </div>

            {/* Authority D Card */}
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-xs text-emerald-400">Authority D (West Bypass)</span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300">
                  Idle Reserve
                </span>
              </div>
              <div className="space-y-1 text-[11px] font-mono">
                <div className="flex justify-between text-slate-300">
                  <span>Road Utilization:</span>
                  <span className="font-bold text-emerald-400">{authD.roadUtilizationPercent}%</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Avg Flow Speed:</span>
                  <span className="font-bold">{authD.avgSpeedKmh} km/h</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Free Capacity:</span>
                  <span className="font-bold text-emerald-400">
                    {(100 - authD.roadUtilizationPercent).toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live AI Optimization Impact Trigger */}
        <div
          className={`p-6 rounded-3xl border flex flex-col justify-between space-y-4 ${
            isDarkMode ? 'bg-[#111827] border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-orange-500" />
                <h3 className="text-sm font-bold">Dynamic Strategy Intervention</h3>
              </div>
              <span
                className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full"
                style={{ backgroundColor: imbalance.badgeBg, color: imbalance.color }}
              >
                Imbalance: {imbalance.score}/100 ({imbalance.classification})
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Applying the AI Optimization strategy dynamically reroutes 24% of through-traffic to the West Bypass and extends J-14 green phase by 18s, moving the Imbalance score across a full tier.
            </p>

            <div className="space-y-2">
              {strategies.map((s) => (
                <div
                  key={s.id}
                  className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
                    s.applied
                      ? 'bg-emerald-500/10 border-emerald-500/30'
                      : 'bg-slate-900/60 border-slate-800'
                  }`}
                >
                  <div className="space-y-0.5 truncate pr-2">
                    <h4 className="font-bold text-white truncate">{s.title}</h4>
                    <span className="text-[10px] text-slate-400 block font-mono">
                      Queue {s.expectedImpact.queueReduction} · Wait {s.expectedImpact.avgWait}
                    </span>
                  </div>

                  {s.applied ? (
                    <button
                      onClick={() => unapplyStrategy(s.id)}
                      className="px-3 py-1 rounded-lg text-[10px] font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                    >
                      Reset
                    </button>
                  ) : (
                    <button
                      onClick={() => applyStrategy(s.id)}
                      className="px-3 py-1 rounded-lg text-[10px] font-bold bg-orange-600 hover:bg-orange-700 text-white transition-all shadow-xs cursor-pointer shrink-0"
                    >
                      Apply Fix
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
            <span className="text-slate-400">Before / After Benchmark:</span>
            <button
              onClick={() => setActiveTab('comparison')}
              className="text-orange-500 hover:text-orange-400 font-bold flex items-center gap-1 cursor-pointer"
            >
              <span>View Quantitative Win Proof</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
