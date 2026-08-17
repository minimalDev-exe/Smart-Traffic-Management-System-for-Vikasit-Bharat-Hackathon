import React, { useState } from 'react';
import { useSimulationStore } from '../store/useSimulationStore';
import {
  AlertTriangle,
  Radio,
  Trash2,
  Filter,
  ArrowRight,
  Bell,
} from 'lucide-react';

export const AlertsTab: React.FC = () => {
  const {
    isDarkMode,
    alerts,
    markAlertRead,
    clearAlerts,
    selectAuthority,
    selectRoad,
    selectJunction,
    setActiveTab,
  } = useSimulationStore();

  const [severityFilter, setSeverityFilter] = useState<string>('ALL');
  const [authorityFilter, setAuthorityFilter] = useState<string>('ALL');

  const filteredAlerts = alerts.filter((a) => {
    if (severityFilter !== 'ALL' && a.severity !== severityFilter) return false;
    if (authorityFilter !== 'ALL' && a.authorityId !== authorityFilter) return false;
    return true;
  });

  const handleViewOnMap = (alertItem: (typeof alerts)[0]) => {
    markAlertRead(alertItem.id);
    if (alertItem.authorityId) {
      selectAuthority(alertItem.authorityId);
    }
    if (alertItem.title.includes('J-14') || alertItem.title.includes('Junction')) {
      selectJunction('J-14');
    } else if (alertItem.title.includes('Wardha Road')) {
      selectRoad('R-01');
    }
    setActiveTab('map');
  };

  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case 'CRITICAL':
        return {
          icon: '🔴',
          label: 'Critical Crisis',
          bg: 'bg-red-500/20 text-red-400 border-red-500/30',
        };
      case 'HIGH':
        return {
          icon: '🟠',
          label: 'High Imbalance',
          bg: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
        };
      case 'WARNING':
        return {
          icon: '🟡',
          label: 'Warning / Slowdown',
          bg: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
        };
      case 'SUCCESS':
        return {
          icon: '🟢',
          label: 'Congestion Resolved',
          bg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
        };
      default:
        return {
          icon: '⚪',
          label: 'Info',
          bg: 'bg-slate-700 text-slate-300',
        };
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <span>Live Traffic Incident & Bottleneck Alerts</span>
            </h2>
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 border border-red-500/30">
              {alerts.length} Recorded Events
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Severity-tagged telemetry notifications for queue accumulation, jurisdictional skews, speed drops, and resolution triggers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {alerts.length > 0 && (
            <button
              onClick={clearAlerts}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5 text-slate-400" />
              <span>Clear Feed</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Bar */}
      <div
        className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
          isDarkMode ? 'bg-[#111827] border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        {/* Severity Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-bold text-slate-400 font-mono mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            Severity:
          </span>
          {['ALL', 'CRITICAL', 'HIGH', 'WARNING', 'SUCCESS'].map((sev) => (
            <button
              key={sev}
              onClick={() => setSeverityFilter(sev)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                severityFilter === sev
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'bg-slate-800/60 text-slate-400 hover:text-white'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>

        {/* Authority Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 font-mono">Authority:</span>
          <select
            value={authorityFilter}
            onChange={(e) => setAuthorityFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900 text-xs font-bold text-slate-200 focus:outline-none cursor-pointer"
          >
            <option value="ALL">All Authorities</option>
            <option value="auth-a">Authority A (CBD)</option>
            <option value="auth-b">Authority B (East Corridor)</option>
            <option value="auth-c">Authority C (South Logistics)</option>
            <option value="auth-d">Authority D (West Suburbs)</option>
          </select>
        </div>
      </div>

      {/* Alerts Feed List */}
      {filteredAlerts.length === 0 ? (
        <div className="p-12 text-center rounded-3xl border border-dashed border-slate-800 bg-slate-900/30">
          <Bell className="w-8 h-8 text-slate-500 mx-auto mb-2 opacity-50" />
          <p className="text-sm font-bold text-slate-400">No matching alerts for this filter.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredAlerts.map((alertItem) => {
            const sevBadge = getSeverityBadge(alertItem.severity);

            return (
              <div
                key={alertItem.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  alertItem.read
                    ? 'opacity-70 bg-slate-900/40 border-slate-800/60'
                    : isDarkMode
                    ? 'bg-[#111827] border-slate-800 shadow-xs'
                    : 'bg-white border-slate-200 shadow-xs'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <span className="text-xl mt-0.5 shrink-0">{sevBadge.icon}</span>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${sevBadge.bg}`}
                      >
                        {sevBadge.label}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        {alertItem.timestamp}
                      </span>
                      <span className="text-xs text-slate-400">· {alertItem.location}</span>
                    </div>

                    <h4 className="text-sm font-bold text-white dark:text-white">
                      {alertItem.title}
                    </h4>

                    <p className="text-xs text-slate-300 font-mono">
                      {alertItem.metric}
                    </p>
                  </div>
                </div>

                {/* Right Action: Reuses map focus mechanism */}
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => handleViewOnMap(alertItem)}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Radio className="w-3.5 h-3.5 text-orange-400" />
                    <span>View on Map</span>
                    <ArrowRight className="w-3 h-3 text-slate-400" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
