import React, { useState } from 'react';
import {
  Layers,
  ChevronDown,
  ChevronUp,
  Radio,
  Building,
  TrafficCone,
  Car,
  AlertTriangle,
  Compass,
} from 'lucide-react';
import { useSimulationStore } from '../../store/useSimulationStore';

interface MapLegendProps {
  layers: {
    heatmap: boolean;
    authorities: boolean;
    signals: boolean;
    vehicles: boolean;
    incidents: boolean;
  };
  onToggleLayer: (layer: keyof MapLegendProps['layers']) => void;
  onFocusLocation: (lat: number, lng: number, zoom: number) => void;
}

export const MapLegend: React.FC<MapLegendProps> = ({
  layers,
  onToggleLayer,
  onFocusLocation,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const { isDarkMode } = useSimulationStore();

  const colorScales = [
    { label: 'Free Flow (>40 km/h)', color: '#10B981', bg: 'bg-emerald-500' },
    { label: 'Moderate (25-40 km/h)', color: '#F59E0B', bg: 'bg-amber-500' },
    { label: 'Heavy (15-25 km/h)', color: '#F97316', bg: 'bg-orange-500' },
    { label: 'Severe (<15 km/h)', color: '#EF4444', bg: 'bg-red-500' },
  ];

  return (
    <div
      className={`absolute bottom-5 left-5 z-[500] rounded-2xl border transition-all shadow-xl backdrop-blur-md max-w-xs w-full overflow-hidden select-none ${
        isDarkMode
          ? 'bg-[#111827]/90 border-slate-800 text-slate-200'
          : 'bg-white/95 border-slate-200 text-slate-800'
      }`}
    >
      {/* Legend Header */}
      <div
        onClick={() => setCollapsed(!collapsed)}
        className="px-4 py-3 flex items-center justify-between cursor-pointer border-b border-slate-700/40 hover:opacity-90 transition-opacity"
      >
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-orange-500" />
          <span className="text-xs font-extrabold uppercase tracking-wider">
            Map Controls & Layers
          </span>
        </div>
        <button className="text-slate-400 hover:text-white">
          {collapsed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {!collapsed && (
        <div className="p-4 space-y-4 text-xs">
          {/* Traffic State Color Scale */}
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2">
              Traffic Speed Classification
            </span>
            <div className="grid grid-cols-2 gap-2">
              {colorScales.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-[11px]">
                  <span className={`w-2.5 h-2.5 rounded-full ${item.bg}`} />
                  <span className="font-medium text-slate-300 dark:text-slate-300 truncate">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Layer Visibility Toggles */}
          <div className="pt-2 border-t border-slate-700/40">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2">
              Active Layer Overlays
            </span>
            <div className="space-y-2">
              {/* Heatmap */}
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="flex items-center gap-2 text-slate-300 font-medium">
                  <Radio className="w-3.5 h-3.5 text-orange-400" />
                  <span>Congestion Heatmap</span>
                </span>
                <input
                  type="checkbox"
                  checked={layers.heatmap}
                  onChange={() => onToggleLayer('heatmap')}
                  className="rounded text-orange-600 focus:ring-0 cursor-pointer accent-orange-500"
                />
              </label>

              {/* Authorities */}
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="flex items-center gap-2 text-slate-300 font-medium">
                  <Building className="w-3.5 h-3.5 text-blue-400" />
                  <span>Authority Boundaries</span>
                </span>
                <input
                  type="checkbox"
                  checked={layers.authorities}
                  onChange={() => onToggleLayer('authorities')}
                  className="rounded text-orange-600 focus:ring-0 cursor-pointer accent-orange-500"
                />
              </label>

              {/* Signals */}
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="flex items-center gap-2 text-slate-300 font-medium">
                  <TrafficCone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Junction Signal Indicators</span>
                </span>
                <input
                  type="checkbox"
                  checked={layers.signals}
                  onChange={() => onToggleLayer('signals')}
                  className="rounded text-orange-600 focus:ring-0 cursor-pointer accent-orange-500"
                />
              </label>

              {/* Vehicles */}
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="flex items-center gap-2 text-slate-300 font-medium">
                  <Car className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Live Moving Vehicles</span>
                </span>
                <input
                  type="checkbox"
                  checked={layers.vehicles}
                  onChange={() => onToggleLayer('vehicles')}
                  className="rounded text-orange-600 focus:ring-0 cursor-pointer accent-orange-500"
                />
              </label>

              {/* Incidents */}
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="flex items-center gap-2 text-slate-300 font-medium">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                  <span>Incident & Blockage Hotspots</span>
                </span>
                <input
                  type="checkbox"
                  checked={layers.incidents}
                  onChange={() => onToggleLayer('incidents')}
                  className="rounded text-orange-600 focus:ring-0 cursor-pointer accent-orange-500"
                />
              </label>
            </div>
          </div>

          {/* Quick Focus Controls */}
          <div className="pt-2 border-t border-slate-700/40">
            <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1 mb-2">
              <Compass className="w-3.5 h-3.5 text-slate-400" />
              <span>Camera Focus Presets</span>
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => onFocusLocation(12.955, 77.61, 12)}
                className="px-2 py-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-[10px] font-bold text-slate-200 text-left truncate cursor-pointer transition-colors"
              >
                🌐 City Overview
              </button>
              <button
                onClick={() => onFocusLocation(12.978, 77.645, 14)}
                className="px-2 py-1.5 rounded-lg bg-red-500/15 hover:bg-red-500/25 text-[10px] font-bold text-red-400 text-left truncate cursor-pointer transition-colors"
              >
                🔴 Auth B (East)
              </button>
              <button
                onClick={() => onFocusLocation(12.972, 77.595, 14)}
                className="px-2 py-1.5 rounded-lg bg-blue-500/15 hover:bg-blue-500/25 text-[10px] font-bold text-blue-400 text-left truncate cursor-pointer transition-colors"
              >
                🔵 Auth A (CBD)
              </button>
              <button
                onClick={() => onFocusLocation(12.945, 77.56, 14)}
                className="px-2 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-[10px] font-bold text-emerald-400 text-left truncate cursor-pointer transition-colors"
              >
                🟢 Auth D (West)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
