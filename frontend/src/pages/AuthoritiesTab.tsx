import React from 'react';
import { ImbalanceScoreCard } from '../components/authorities/ImbalanceScoreCard';
import { AuthorityCard } from '../components/authorities/AuthorityCard';
import { useSimulationStore } from '../store/useSimulationStore';
import {
  Building,
  Scale,
  BrainCircuit,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export const AuthoritiesTab: React.FC = () => {
  const { isDarkMode, authorities, setActiveTab } = useSimulationStore();

  const comparisonData = authorities.map((a) => ({
    name: a.code,
    fullName: a.name,
    'Road Utilization (%)': a.roadUtilizationPercent,
    'Avg Speed (km/h)': a.avgSpeedKmh,
    'Traffic Share (%)': a.trafficSharePercent,
    'Active Vehicles': Math.round(a.vehicles / 100), // scaled for chart
  }));

  const chartTheme = {
    grid: isDarkMode ? '#1F2937' : '#E5E7EB',
    text: isDarkMode ? '#9CA3AF' : '#4B5563',
    tooltipBg: isDarkMode ? '#111827' : '#FFFFFF',
    tooltipBorder: isDarkMode ? '#374151' : '#E5E7EB',
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight flex items-center gap-2">
              <Building className="w-5 h-5 text-orange-500" />
              <span>Planning Authority Comparison & Imbalance Engine</span>
            </h2>
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-400 border border-orange-500/30">
              Core Problem Statement
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Real-time evaluation of jurisdictional disparity, capacity utilization bottlenecks, and cross-authority load distribution.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('optimizer')}
            className="px-3.5 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <BrainCircuit className="w-3.5 h-3.5" />
            <span>AI Load Balancer</span>
          </button>
        </div>
      </div>

      {/* 1. Imbalance Score Deep Dive with the 4 Weighted Sub-Components */}
      <ImbalanceScoreCard />

      {/* 2. Grid of 4 Planning Authorities Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white dark:text-white flex items-center gap-2">
            <Scale className="w-4 h-4 text-orange-500" />
            <span>Jurisdictional Roster & Telemetry Cards</span>
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            4 Municipal Authorities Monitored
          </span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {authorities.map((auth) => (
            <AuthorityCard key={auth.id} authority={auth} />
          ))}
        </div>
      </div>

      {/* 3. Cross-Authority Comparison Chart & Utilization Matrix */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border transition-all space-y-4 ${
          isDarkMode ? 'bg-[#111827] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-orange-500 block font-mono">
              Comparative Analysis
            </span>
            <h3 className="text-sm font-bold text-white dark:text-white">
              Cross-Jurisdiction Utilization & Speed Benchmark
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Target: All authorities &lt; 70% utilization
          </span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.grid} />
              <XAxis dataKey="name" stroke={chartTheme.text} fontSize={11} />
              <YAxis stroke={chartTheme.text} fontSize={10} domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: chartTheme.tooltipBg,
                  borderColor: chartTheme.tooltipBorder,
                  borderRadius: '12px',
                  fontSize: '11px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="Road Utilization (%)" fill="#EF4444" radius={[6, 6, 0, 0]} />
              <Bar dataKey="Avg Speed (km/h)" fill="#F59E0B" radius={[6, 6, 0, 0]} />
              <Bar dataKey="Traffic Share (%)" fill="#3B82F6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
