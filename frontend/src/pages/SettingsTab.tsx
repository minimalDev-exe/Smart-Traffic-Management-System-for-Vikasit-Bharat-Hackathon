import React, { useState } from 'react';
import { useSimulationStore } from '../store/useSimulationStore';
import {
  Settings,
  Sun,
  Moon,
  Cpu,
  RotateCcw,
  Sliders,
  CheckCircle2,
} from 'lucide-react';

export const SettingsTab: React.FC = () => {
  const {
    isDarkMode,
    toggleDarkMode,
    resetSimulation,
  } = useSimulationStore();

  const [traciHost, setTraciHost] = useState('localhost');
  const [traciPort, setTraciPort] = useState('8873');
  const [imbalanceThreshold, setImbalanceThreshold] = useState(70);
  const [autoApplyAI, setAutoApplyAI] = useState(false);
  const [savedToast, setSavedToast] = useState(false);

  const handleSave = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-4xl">
      {/* Title Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight flex items-center gap-2">
            <Settings className="w-5 h-5 text-orange-500" />
            <span>Platform Configuration & Simulation Engine Settings</span>
          </h2>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Configure SUMO TraCI connectors, alert thresholds, and interface appearance.
          </p>
        </div>

        {savedToast && (
          <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>Settings Saved</span>
          </div>
        )}
      </div>

      {/* Settings Grid */}
      <div className="space-y-4">
        {/* 1. TraCI SUMO Hardware Bridge Settings */}
        <div
          className={`p-6 rounded-3xl border space-y-4 ${
            isDarkMode ? 'bg-[#111827] border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800/60">
            <Cpu className="w-4 h-4 text-orange-500" />
            <h3 className="text-sm font-bold">SUMO / TraCI Hardware Bridge Socket</h3>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-400 uppercase text-[10px] mb-1">
                TraCI Server Host
              </label>
              <input
                type="text"
                value={traciHost}
                onChange={(e) => setTraciHost(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-800 bg-slate-900 font-mono text-xs text-white focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-400 uppercase text-[10px] mb-1">
                TraCI Daemon Port
              </label>
              <input
                type="text"
                value={traciPort}
                onChange={(e) => setTraciPort(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-800 bg-slate-900 font-mono text-xs text-white focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>
          <p className="text-[11px] text-slate-400">
            When SUMO micro-simulator is running locally, telemetry is synced in real-time via Python TraCI sockets.
          </p>
        </div>

        {/* 2. Imbalance Threshold Configuration */}
        <div
          className={`p-6 rounded-3xl border space-y-4 ${
            isDarkMode ? 'bg-[#111827] border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800/60">
            <Sliders className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-bold">Thresholds & Automation</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-slate-300 font-bold">
                  Critical Imbalance Alert Threshold
                </span>
                <span className="font-mono text-orange-400 font-bold">
                  {imbalanceThreshold} / 100
                </span>
              </div>
              <input
                type="range"
                min={40}
                max={90}
                value={imbalanceThreshold}
                onChange={(e) => setImbalanceThreshold(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none accent-orange-500"
              />
            </div>

            <label className="flex items-center justify-between pt-2 border-t border-slate-800/60 cursor-pointer">
              <div>
                <span className="font-bold text-white block">Autonomous AI Auto-Actuation</span>
                <span className="text-[11px] text-slate-400">
                  Automatically apply signal retiming and rerouting when Imbalance exceeds threshold.
                </span>
              </div>
              <input
                type="checkbox"
                checked={autoApplyAI}
                onChange={(e) => setAutoApplyAI(e.target.checked)}
                className="rounded accent-orange-500 w-4 h-4"
              />
            </label>
          </div>
        </div>

        {/* 3. Appearance & Reset */}
        <div
          className={`p-6 rounded-3xl border flex items-center justify-between ${
            isDarkMode ? 'bg-[#111827] border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div>
            <h3 className="text-sm font-bold text-white dark:text-white">Command Center Visual Theme</h3>
            <p className="text-xs text-slate-400">Toggle between Dark Command Center and Light Theme.</p>
          </div>

          <button
            onClick={toggleDarkMode}
            className="px-4 py-2 rounded-xl border border-slate-800 bg-slate-900 text-xs font-bold text-slate-200 flex items-center gap-2 hover:bg-slate-800 cursor-pointer"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-400" />}
            <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>

        {/* Action Save Bar */}
        <div className="flex items-center justify-between pt-4">
          <button
            onClick={resetSimulation}
            className="px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-slate-400 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Platform State</span>
          </button>

          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-extrabold shadow-md shadow-orange-600/20 cursor-pointer"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};
