import React, { useEffect } from 'react';
import {
  Sparkles,
  Play,
  Pause,
  ChevronRight,
  ChevronLeft,
  X,
} from 'lucide-react';
import { useSimulationStore } from '../../store/useSimulationStore';

export const DEMO_PHASE_DESCRIPTIONS = [
  {
    phase: 1,
    title: 'Baseline Morning Network',
    time: '09:00 AM',
    badge: 'Phase 1 of 5',
    targetTab: 'map',
    headline: 'Normal Commuter Traffic Influx (09:00 AM)',
    narrative:
      'Standard steady-state commuter inflow across all four planning authorities. Road utilization is evenly distributed under 60% capacity with an initial Imbalance Score of 38 (Moderate).',
    metrics: 'Imbalance: 38/100 · Avg Speed: 42 km/h · Queues: Nominal',
    accent: 'border-blue-500/50 bg-blue-500/10 text-blue-400',
  },
  {
    phase: 2,
    title: 'Peak Rush Crisis & Bottleneck',
    time: '10:15 AM',
    badge: 'Phase 2 of 5',
    targetTab: 'map',
    headline: 'Structural Bottleneck Forms at J-14 (10:15 AM)',
    narrative:
      'Peak commuter surge hits Authority B (MIHAN Tech Corridor). Demand exceeds the 4-lane capacity at Junction J-14, causing queue spillbacks up to 890 meters. Authority B utilization reaches 94% while Authority D holds 66% idle capacity. Imbalance surges to 78 (HIGH IMBALANCE).',
    metrics: 'Imbalance: 78/100 (HIGH) · Auth B: 94% · Auth D: 34% (Idle)',
    accent: 'border-red-500/50 bg-red-500/10 text-red-400',
  },
  {
    phase: 3,
    title: 'AI Anomaly Detection & Strategy',
    time: '10:16 AM',
    badge: 'Phase 3 of 5',
    targetTab: 'optimizer',
    headline: 'AI Optimizer Calculates Cross-Jurisdiction Fix',
    narrative:
      'The Autonomous Policy Engine flags cross-jurisdiction capacity disparity. It computes Strategy STRAT-01: extending J-14 green signal duration by +18 seconds and broadcasting dynamic VMS rerouting instructions to divert 24% of traffic onto the 6-lane Authority D West Bypass.',
    metrics: 'Confidence: 94.8% · Expected Imbalance Drop: -48 pts',
    accent: 'border-amber-500/50 bg-amber-500/10 text-amber-400',
  },
  {
    phase: 4,
    title: 'Intervention Applied Live',
    time: '10:18 AM',
    badge: 'Phase 4 of 5',
    targetTab: 'map',
    headline: 'Real-Time Load Transfer via West Bypass',
    narrative:
      'Intervention committed to the live simulation network. Commuter vehicles seamlessly divert toward the Authority D corridor. The J-14 queue collapses from 890m to 80m within three signal cycles.',
    metrics: 'Auth B Util: 94% → 52% · J-14 Queue: 80m · Flow Restored',
    accent: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400',
  },
  {
    phase: 5,
    title: 'Quantitative Victory Scorecard',
    time: '10:20 AM',
    badge: 'Phase 5 of 5',
    targetTab: 'comparison',
    headline: 'Problem Solved: Full-Tier Optimization Proven',
    narrative:
      'Final Before vs After scorecard proves victory! Imbalance plummeted from 78 (HIGH) to 24 (OPTIMAL). Average network speeds improved by +28%, travel delay cut by 34%, and 5.6 minutes shaved off peak commuter journeys.',
    metrics: 'Imbalance: 78 → 24 pts (OPTIMAL) · Speed: +28% · CO₂: -26%',
    accent: 'border-orange-500/50 bg-orange-500/10 text-orange-400',
  },
];

export const DemoPresenterOverlay: React.FC = () => {
  const {
    isDemoActive,
    demoPhaseIndex,
    demoAutoAdvance,
    demoSecondsRemaining,
    activeTab,
    setActiveTab,
    nextDemoPhase,
    prevDemoPhase,
    goToDemoPhase,
    toggleDemoAutoAdvance,
    tickDemoTimer,
    stopDemo,
  } = useSimulationStore();

  // Tick the demo timer every 1 second
  useEffect(() => {
    if (!isDemoActive) return;
    const interval = setInterval(() => {
      tickDemoTimer();
    }, 1000);
    return () => clearInterval(interval);
  }, [isDemoActive, tickDemoTimer]);

  if (!isDemoActive) return null;

  const currentPhase = DEMO_PHASE_DESCRIPTIONS[demoPhaseIndex] || DEMO_PHASE_DESCRIPTIONS[0];
  const isOffPhaseTab = activeTab !== currentPhase.targetTab;

  return (
    <div className="fixed bottom-6 inset-x-4 sm:inset-x-8 md:inset-x-16 lg:inset-x-24 z-50 animate-in slide-in-from-bottom-8 duration-300">
      <div className="bg-slate-950/90 backdrop-blur-xl border border-orange-500/50 rounded-3xl p-5 sm:p-6 shadow-2xl shadow-orange-950/40 text-white space-y-4">
        {/* Top Header & Phase Step Indicator */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold text-xs shadow-md">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-sm tracking-wide text-orange-400">
              HACKATHON JUDGE NARRATIVE DEMO
            </span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              {currentPhase.badge}
            </span>
          </div>

          {/* Phase 5-Step Progress Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {DEMO_PHASE_DESCRIPTIONS.map((p, idx) => {
              const isCurrent = demoPhaseIndex === idx;
              const isPast = demoPhaseIndex > idx;

              return (
                <button
                  key={p.phase}
                  onClick={() => goToDemoPhase(idx)}
                  className={`px-3 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
                    isCurrent
                      ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30 ring-2 ring-orange-400/40'
                      : isPast
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-slate-900 text-slate-500 border border-slate-800 hover:text-slate-300'
                  }`}
                >
                  <span>{p.phase}.</span>
                  <span className="hidden md:inline">{p.title}</span>
                </button>
              );
            })}
          </div>

          {/* Exit Button */}
          <button
            onClick={stopDemo}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors self-end sm:self-auto cursor-pointer"
            title="Exit Demo Mode"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Narrative & Metrics Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-extrabold text-base text-white">
                {currentPhase.headline}
              </h3>
              {isOffPhaseTab && (
                <button
                  onClick={() => setActiveTab(currentPhase.targetTab)}
                  className="px-2.5 py-0.5 rounded-lg bg-orange-500/20 text-orange-400 border border-orange-500/30 text-[10px] font-bold hover:bg-orange-500/30 transition-colors cursor-pointer"
                >
                  ← Focus Phase Tab ({currentPhase.targetTab})
                </button>
              )}
            </div>
            <p className="text-xs text-slate-300 font-medium leading-relaxed">
              {currentPhase.narrative}
            </p>
            <div className="pt-1">
              <span className="text-[11px] font-mono font-bold text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded-lg border border-orange-500/20 inline-block">
                ⚡ Key Metrics: {currentPhase.metrics}
              </span>
            </div>
          </div>

          {/* Manual Controls & Auto-Advance Timer */}
          <div className="flex items-center gap-2.5 shrink-0 self-end lg:self-center">
            {/* Auto Advance Pause/Play toggle */}
            <button
              onClick={toggleDemoAutoAdvance}
              className={`px-3 py-2 rounded-xl text-xs font-bold font-mono flex items-center gap-1.5 transition-all border cursor-pointer ${
                demoAutoAdvance
                  ? 'bg-slate-800 border-slate-700 text-slate-200'
                  : 'bg-amber-500/20 border-amber-500/40 text-amber-400'
              }`}
              title="Pause auto-advance to linger on this phase"
            >
              {demoAutoAdvance ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-orange-400" />
                  <span>Auto: {demoSecondsRemaining}s</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Paused (Hold)</span>
                </>
              )}
            </button>

            {/* Back Button */}
            <button
              onClick={prevDemoPhase}
              disabled={demoPhaseIndex === 0}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 disabled:opacity-30 disabled:pointer-events-none border border-slate-800 transition-colors cursor-pointer"
              title="Previous Phase"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Next Button */}
            <button
              onClick={nextDemoPhase}
              className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs flex items-center gap-1 shadow-md shadow-orange-600/30 transition-all cursor-pointer"
            >
              <span>{demoPhaseIndex === 4 ? 'Finish Demo' : 'Next Phase'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
