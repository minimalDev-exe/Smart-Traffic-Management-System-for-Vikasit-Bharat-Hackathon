import React, { useState } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Calendar,
  Sunrise,
  Sunset,
  Sliders,
} from 'lucide-react';
import { useSimulationStore } from '../../store/useSimulationStore';

export const SimulationControls: React.FC = () => {
  const {
    isDarkMode,
    simState,
    startSimulation,
    pauseSimulation,
    resumeSimulation,
    stopSimulation,
    resetSimulation,
    speedMultiplier,
    setSpeedMultiplier,
    peakPeriod,
    setPeakPeriod,
    activeScenarioName,
  } = useSimulationStore();

  const [simDate, setSimDate] = useState('2024-11-18');
  const speedOptions = [1, 2, 5, 10, 50, 100];

  return (
    <div
      className={`p-6 rounded-3xl border space-y-6 transition-all ${
        isDarkMode ? 'bg-[#111827] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}
    >
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-orange-500" />
            <h3 className="text-sm font-extrabold tracking-tight">
              Simulation Playback & Environment Controls
            </h3>
          </div>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Active Scenario: <span className="text-orange-400 font-bold">{activeScenarioName}</span>
          </p>
        </div>

        {/* State Badge */}
        <div className="flex items-center gap-2">
          <span
            className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full flex items-center gap-1.5 ${
              simState === 'RUNNING'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : simState === 'PAUSED'
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                : 'bg-slate-700/30 text-slate-400 border border-slate-700/50'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                simState === 'RUNNING'
                  ? 'bg-emerald-500 animate-ping'
                  : simState === 'PAUSED'
                  ? 'bg-amber-500'
                  : 'bg-slate-500'
              }`}
            />
            <span>Simulation {simState}</span>
          </span>
        </div>
      </div>

      {/* Control Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Peak Period Selector */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Peak Traffic Window
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={() => setPeakPeriod('Morning Peak (09:00 - 12:00)')}
              className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                peakPeriod.includes('Morning')
                  ? 'bg-orange-500/20 border-orange-500/60 text-orange-400 shadow-xs'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Sunrise className="w-3.5 h-3.5" />
              <span>Morning (9-12)</span>
            </button>

            <button
              onClick={() => setPeakPeriod('Evening Peak (16:00 - 19:00)')}
              className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                peakPeriod.includes('Evening')
                  ? 'bg-orange-500/20 border-orange-500/60 text-orange-400 shadow-xs'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Sunset className="w-3.5 h-3.5" />
              <span>Evening (4-7)</span>
            </button>
          </div>
        </div>

        {/* 2. Speed Multipliers */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Simulation Speed Factor
          </label>
          <div className="grid grid-cols-6 gap-1">
            {speedOptions.map((s) => (
              <button
                key={s}
                onClick={() => setSpeedMultiplier(s)}
                className={`py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  speedMultiplier === s
                    ? 'bg-orange-600 text-white shadow-sm shadow-orange-600/30'
                    : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>

        {/* 3. Simulation Date */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Simulation Date
          </label>
          <div className="relative">
            <input
              type="date"
              value={simDate}
              onChange={(e) => setSimDate(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-800 bg-slate-900 text-xs font-mono font-bold text-slate-200 focus:outline-none focus:border-orange-500 cursor-pointer"
            />
            <Calendar className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-2.5 pointer-events-none" />
          </div>
        </div>

        {/* 4. Action Buttons Bar */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Playback Execution
          </label>
          <div className="flex items-center gap-1.5">
            {simState === 'RUNNING' ? (
              <button
                onClick={pauseSimulation}
                className="flex-1 py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
              >
                <Pause className="w-3.5 h-3.5" />
                <span>Pause</span>
              </button>
            ) : simState === 'PAUSED' ? (
              <button
                onClick={resumeSimulation}
                className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Resume</span>
              </button>
            ) : (
              <button
                onClick={startSimulation}
                className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Start Flow</span>
              </button>
            )}

            <button
              onClick={stopSimulation}
              className="py-2 px-3 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs transition-colors cursor-pointer"
              title="Stop Simulation"
            >
              Stop
            </button>

            <button
              onClick={resetSimulation}
              className="py-2 px-3 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs transition-colors cursor-pointer"
              title="Reset Simulation State"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
