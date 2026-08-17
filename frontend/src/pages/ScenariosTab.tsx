import React, { useState } from 'react';
import { useSimulationStore } from '../store/useSimulationStore';
import { CustomScenarioModal } from '../components/scenarios/CustomScenarioModal';
import {
  FlaskConical,
  Play,
  AlertTriangle,
  Sunrise,
  Sunset,
  CloudRain,
  Plus,
  Radio,
} from 'lucide-react';
import type { ScenarioPreset } from '../types';

export const SCENARIO_PRESETS: ScenarioPreset[] = [
  {
    id: 'normal',
    name: 'Normal Baseline Peak Flow',
    description:
      'Standard steady-state commuter inflow across morning peak (09:00 - 12:00) with typical suburban-to-core migration.',
    icon: 'Sunrise',
    peakPeriod: 'Morning Peak (09:00 - 12:00)',
    trafficMultiplier: 1.0,
    affectedAuthorities: ['auth-a', 'auth-b', 'auth-c', 'auth-d'],
  },
  {
    id: 'morning_peak',
    name: 'Morning Peak Surge (09:00 - 12:00)',
    description:
      'Mass influx into East IT Corridor & Sitabuldi CBD with 88% capacity utilization and severe queuing on Inner Ring Road.',
    icon: 'Sunrise',
    peakPeriod: 'Morning Peak (09:00 - 12:00)',
    trafficMultiplier: 1.45,
    affectedAuthorities: ['auth-b', 'auth-a'],
  },
  {
    id: 'evening_peak',
    name: 'Evening Peak Surge (16:00 - 19:00)',
    description:
      'Mass outbound dispersal from Tech Parks to West Suburbs causing directional bottlenecks at major arterial exits.',
    icon: 'Sunset',
    peakPeriod: 'Evening Peak (16:00 - 19:00)',
    trafficMultiplier: 1.5,
    affectedAuthorities: ['auth-b', 'auth-d'],
  },
  {
    id: 'accident_east',
    name: 'Accident on Inner Ring Road (South)',
    description:
      'Multi-vehicle collision at Junction J-14 blocking 2 out of 3 lanes, spiking Authority B queue to 890m and utilization to 98%.',
    icon: 'AlertTriangle',
    peakPeriod: 'Morning Peak (09:00 - 12:00)',
    trafficMultiplier: 1.2,
    affectedAuthorities: ['auth-b'],
    blockedRoads: ['R-03'],
  },
  {
    id: 'road_closure',
    name: 'Wardha Road Partial Closure (Metro Works)',
    description:
      'Underground metro construction reduces Wardha Road capacity by 50%, diverting spillback traffic into Central Avenue.',
    icon: 'ShieldAlert',
    peakPeriod: 'Morning Peak (09:00 - 12:00)',
    trafficMultiplier: 1.1,
    affectedAuthorities: ['auth-a'],
    blockedRoads: ['R-01'],
  },
  {
    id: 'heavy_rain',
    name: 'Heavy Monsoon Downpour & Waterlogging',
    description:
      'Monsoon conditions reduce safe speeds by 40% citywide, tripling clearance intervals at signalized intersections.',
    icon: 'CloudRain',
    peakPeriod: 'Evening Peak (16:00 - 19:00)',
    trafficMultiplier: 1.15,
    affectedAuthorities: ['auth-a', 'auth-b', 'auth-c'],
  },
  {
    id: 'festival_event',
    name: 'Stadium Mega Event & Cultural Rally',
    description:
      'Major sporting event at CBD Stadium draws 35,000 spectators with localized congestion concentrated in Authority A.',
    icon: 'Sparkles',
    peakPeriod: 'Evening Peak (16:00 - 19:00)',
    trafficMultiplier: 1.6,
    affectedAuthorities: ['auth-a'],
  },
  {
    id: 'emergency_corridor',
    name: 'VIP / Emergency Ambulance Green Wave',
    description:
      'Emergency ambulance dispatch from East Corridor to CBD Multi-Specialty Hospital with adaptive signal preemption.',
    icon: 'Car',
    peakPeriod: 'Morning Peak (09:00 - 12:00)',
    trafficMultiplier: 1.0,
    affectedAuthorities: ['auth-b', 'auth-a'],
  },
];

export const ScenariosTab: React.FC = () => {
  const { isDarkMode, activeScenarioId, loadScenario, setActiveTab } =
    useSimulationStore();

  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-orange-500" />
              <span>Simulation Scenario Manager & Stress Testing</span>
            </h2>
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-400 border border-orange-500/30">
              TraCI Preset Suite
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Evaluate traffic mitigation resilience across peak surges, corridor accidents, monsoon weather, and custom incident injects.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsCustomModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-orange-600/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Custom Scenario</span>
          </button>
        </div>
      </div>

      {/* Preset Scenarios Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {SCENARIO_PRESETS.map((preset) => {
          const isActive = activeScenarioId === preset.id;

          return (
            <div
              key={preset.id}
              className={`p-6 rounded-3xl border transition-all flex flex-col justify-between space-y-4 ${
                isActive
                  ? 'bg-orange-500/10 border-orange-500/50 shadow-md'
                  : isDarkMode
                  ? 'bg-[#111827] border-slate-800 hover:border-slate-700'
                  : 'bg-white border-slate-200 shadow-xs hover:border-orange-200'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm ${
                      isActive
                        ? 'bg-orange-500 text-white'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {preset.id === 'accident_east' ? (
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                    ) : preset.id === 'heavy_rain' ? (
                      <CloudRain className="w-5 h-5 text-blue-400" />
                    ) : preset.peakPeriod.includes('Morning') ? (
                      <Sunrise className="w-5 h-5 text-amber-400" />
                    ) : (
                      <Sunset className="w-5 h-5 text-orange-400" />
                    )}
                  </div>

                  {isActive && (
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-orange-500 text-white">
                      Active
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white dark:text-white leading-tight">
                    {preset.name}
                  </h3>
                  <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
                    {preset.peakPeriod} · {preset.trafficMultiplier}x Volume
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                  {preset.description}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-slate-800/60">
                {isActive ? (
                  <button
                    onClick={() => setActiveTab('map')}
                    className="w-full py-2 px-3 rounded-xl bg-orange-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <Radio className="w-3.5 h-3.5" />
                    <span>Inspect on Live Map</span>
                  </button>
                ) : (
                  <button
                    onClick={() => loadScenario(preset)}
                    className="w-full py-2 px-3 rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-slate-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Play className="w-3 h-3" />
                    <span>Run This Scenario</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Custom Scenario Modal */}
      <CustomScenarioModal
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
      />
    </div>
  );
};
