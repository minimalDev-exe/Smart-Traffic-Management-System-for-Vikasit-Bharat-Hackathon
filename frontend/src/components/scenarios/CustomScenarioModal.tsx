import React, { useState } from 'react';
import {
  X,
  FlaskConical,
  Zap,
} from 'lucide-react';
import { useSimulationStore } from '../../store/useSimulationStore';
import type { ScenarioPreset } from '../../types';

interface CustomScenarioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CustomScenarioModal: React.FC<CustomScenarioModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { isDarkMode, loadScenario } = useSimulationStore();

  const [name, setName] = useState('Custom Tech Corridor Surge');
  const [description, setDescription] = useState(
    'Custom commuter influx with simulated road blockage and dynamic load variance.'
  );
  const [peakPeriod, setPeakPeriod] = useState<
    'Morning Peak (09:00 - 12:00)' | 'Evening Peak (16:00 - 19:00)'
  >('Morning Peak (09:00 - 12:00)');
  const [trafficMultiplier, setTrafficMultiplier] = useState(1.5);
  const [selectedAuthorities, setSelectedAuthorities] = useState<string[]>([
    'auth-b',
    'auth-a',
  ]);

  if (!isOpen) return null;

  const handleToggleAuthority = (id: string) => {
    if (selectedAuthorities.includes(id)) {
      if (selectedAuthorities.length > 1) {
        setSelectedAuthorities(selectedAuthorities.filter((a) => a !== id));
      }
    } else {
      setSelectedAuthorities([...selectedAuthorities, id]);
    }
  };

  const handleCreateAndRun = () => {
    const customPreset: ScenarioPreset = {
      id: `custom-${Date.now()}`,
      name,
      description,
      icon: 'FlaskConical',
      peakPeriod,
      trafficMultiplier,
      affectedAuthorities: selectedAuthorities,
      isCustom: true,
    };
    loadScenario(customPreset);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className={`rounded-3xl max-w-xl w-full border shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 ${
          isDarkMode ? 'bg-[#111827] border-slate-800 text-white' : 'bg-white border-slate-200 text-[#1A2B4C]'
        }`}
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-800/80 flex items-center justify-between bg-gradient-to-r from-orange-500/10 to-amber-500/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center border border-orange-500/30">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white dark:text-white">
                Create Custom Simulation Scenario
              </h3>
              <p className="text-xs text-slate-400">
                Define traffic volume multiplier, affected jurisdictions, and peak window.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <div className="p-6 space-y-4 text-xs">
          {/* Scenario Name */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Scenario Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-800 bg-slate-900 text-xs font-bold text-white focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Scenario Narrative / Description
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-800 bg-slate-900 text-xs font-medium text-slate-200 focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Peak Period Selection */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Target Peak Window
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPeakPeriod('Morning Peak (09:00 - 12:00)')}
                className={`py-2 px-3 rounded-xl border font-bold text-xs transition-all cursor-pointer ${
                  peakPeriod.includes('Morning')
                    ? 'bg-orange-500/20 border-orange-500/60 text-orange-400'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                🌅 Morning (09:00 - 12:00)
              </button>
              <button
                type="button"
                onClick={() => setPeakPeriod('Evening Peak (16:00 - 19:00)')}
                className={`py-2 px-3 rounded-xl border font-bold text-xs transition-all cursor-pointer ${
                  peakPeriod.includes('Evening')
                    ? 'bg-orange-500/20 border-orange-500/60 text-orange-400'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                🌆 Evening (16:00 - 19:00)
              </button>
            </div>
          </div>

          {/* Traffic Multiplier Slider */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Traffic Volume Multiplier
              </label>
              <span className="font-mono text-xs font-bold text-orange-400">
                {trafficMultiplier.toFixed(2)}x Normal Volume
              </span>
            </div>
            <input
              type="range"
              min={0.5}
              max={2.5}
              step={0.05}
              value={trafficMultiplier}
              onChange={(e) => setTrafficMultiplier(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
          </div>

          {/* Affected Authorities Checklist */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Affected Planning Authorities
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'auth-a', name: 'Authority A (CBD)', color: '#3B82F6' },
                { id: 'auth-b', name: 'Authority B (East)', color: '#EF4444' },
                { id: 'auth-c', name: 'Authority C (South)', color: '#F59E0B' },
                { id: 'auth-d', name: 'Authority D (West)', color: '#10B981' },
              ].map((a) => {
                const isSelected = selectedAuthorities.includes(a.id);
                return (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => handleToggleAuthority(a.id)}
                    className={`p-2.5 rounded-xl border text-left flex items-center justify-between text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-800 border-slate-600 text-white'
                        : 'bg-slate-900 border-slate-800 text-slate-500'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: a.color }} />
                      <span>{a.name}</span>
                    </div>
                    {isSelected && <span className="text-[10px] text-orange-400">✓</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/80 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleCreateAndRun}
            className="px-6 py-2.5 rounded-xl font-bold text-xs bg-orange-600 hover:bg-orange-700 text-white flex items-center gap-2 shadow-lg shadow-orange-600/20 transition-all cursor-pointer"
          >
            <Zap className="w-4 h-4" />
            <span>Load & Execute Custom Scenario</span>
          </button>
        </div>
      </div>
    </div>
  );
};
