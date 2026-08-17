import React from 'react';
import {
  Car,
  Gauge,
  Percent,
  AlertTriangle,
  Radio,
  ArrowRight,
} from 'lucide-react';
import type { PlanningAuthority } from '../../types';
import { useSimulationStore } from '../../store/useSimulationStore';

interface AuthorityCardProps {
  authority: PlanningAuthority;
}

export const AuthorityCard: React.FC<AuthorityCardProps> = ({ authority }) => {
  const { isDarkMode, selectAuthority, setActiveTab } = useSimulationStore();

  const isCritical = authority.congestionLevel === 'CRITICAL';
  const isHigh = authority.congestionLevel === 'HIGH';

  const handleInspectOnMap = () => {
    selectAuthority(authority.id);
    setActiveTab('map');
  };

  return (
    <div
      className={`p-6 rounded-3xl border transition-all space-y-5 ${
        isDarkMode
          ? 'bg-[#111827] border-slate-800 hover:border-slate-700'
          : 'bg-white border-slate-200 shadow-xs hover:border-orange-200'
      }`}
    >
      {/* Header with Authority Color & Badge */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-extrabold text-sm shadow-md"
            style={{ backgroundColor: authority.color }}
          >
            {authority.code.replace('AUTH-', '')}
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">
              Jurisdiction {authority.code}
            </span>
            <h3 className="text-sm font-bold text-white dark:text-white truncate max-w-[180px]">
              {authority.name}
            </h3>
          </div>
        </div>

        <span
          className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full ${
            isCritical
              ? 'bg-red-500/20 text-red-400 border border-red-500/30'
              : isHigh
              ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
              : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
          }`}
        >
          {authority.congestionLevel}
        </span>
      </div>

      {/* Road Utilization Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400 font-sans">Road Utilization:</span>
          <span
            className={`font-bold ${
              authority.roadUtilizationPercent > 80
                ? 'text-red-400'
                : authority.roadUtilizationPercent > 60
                ? 'text-amber-400'
                : 'text-emerald-400'
            }`}
          >
            {authority.roadUtilizationPercent}%
          </span>
        </div>
        <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${authority.roadUtilizationPercent}%`,
              backgroundColor: authority.color,
            }}
          />
        </div>
      </div>

      {/* Exact Telemetry Line Format from Super Prompt */}
      <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 text-[11px] font-mono space-y-2 text-slate-300">
        <div className="flex justify-between items-center">
          <span className="text-slate-400 font-sans flex items-center gap-1.5">
            <Car className="w-3.5 h-3.5 text-blue-400" />
            Vehicles:
          </span>
          <span className="font-bold text-white">{authority.vehicles.toLocaleString()}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-slate-400 font-sans flex items-center gap-1.5">
            <Gauge className="w-3.5 h-3.5 text-amber-400" />
            Avg Speed:
          </span>
          <span className="font-bold text-amber-400">{authority.avgSpeedKmh} km/h</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-slate-400 font-sans flex items-center gap-1.5">
            <Percent className="w-3.5 h-3.5 text-purple-400" />
            Traffic Share:
          </span>
          <span className="font-bold text-purple-400">{authority.trafficSharePercent}%</span>
        </div>

        <div className="flex justify-between items-center pt-1 border-t border-slate-800">
          <span className="text-slate-400 font-sans flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
            Bottlenecks:
          </span>
          <span
            className={`font-bold ${
              authority.activeBottlenecks > 0 ? 'text-red-400' : 'text-emerald-400'
            }`}
          >
            {authority.activeBottlenecks} active zones
          </span>
        </div>
      </div>

      {/* Action to Inspect on Map */}
      <button
        onClick={handleInspectOnMap}
        className="w-full py-2.5 px-3 rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-slate-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
      >
        <Radio className="w-3.5 h-3.5 text-orange-400" />
        <span>Focus Jurisdiction on Map</span>
        <ArrowRight className="w-3 h-3 ml-auto text-slate-500" />
      </button>
    </div>
  );
};
