import React from 'react';
import { AnalyticsCharts } from '../components/analytics/AnalyticsCharts';
import { TimelineScrubber } from '../components/simulation/TimelineScrubber';
import { useSimulationStore } from '../store/useSimulationStore';
import {
  BarChart3,
  Download,
} from 'lucide-react';

export const AnalyticsTab: React.FC = () => {
  const { setActiveTab } = useSimulationStore();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-orange-500" />
              <span>Traffic Analytics & Temporal Trends</span>
            </h2>
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/30">
              Synchronized Telemetry Stream
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Continuous time-series tracking of vehicle influx, speed degradation, queue density, and cross-jurisdictional load balance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('Exporting Analytics Data: Traffic_Analytics_Peak_Timeseries.csv')}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setActiveTab('authorities')}
            className="px-3.5 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <span>Authorities Imbalance</span>
          </button>
        </div>
      </div>

      {/* Mini Scrubber for interactive scrubbing while inspecting charts */}
      <TimelineScrubber />

      {/* Synchronized Recharts Views */}
      <AnalyticsCharts />
    </div>
  );
};
