import React from 'react';
import {
  Car,
  Gauge,
  AlertTriangle,
  Clock,
  Leaf,
  TrendingUp,
} from 'lucide-react';
import { useSimulationStore } from '../../store/useSimulationStore';

export const StatCardsRow: React.FC = () => {
  const { isDarkMode, authorities, roads, strategies } = useSimulationStore();

  const totalVehicles = authorities.reduce((acc, a) => acc + a.vehicles, 0);
  const avgSpeed = (
    authorities.reduce((acc, a) => acc + a.avgSpeedKmh, 0) / authorities.length
  ).toFixed(1);
  const congestionZones = roads.filter((r) => r.congestionPercent > 70).length + 3;
  const appliedCount = strategies.filter((s) => s.applied).length;

  // Travel time and CO2 dynamically drop when strategies are applied
  const avgTravelTime = appliedCount > 0 ? '12.8' : '18.4';
  const co2Emissions = appliedCount > 0 ? '3.1' : '4.2';
  const efficiency = appliedCount > 0 ? '91' : '78';

  const stats = [
    {
      id: 'vehicles',
      label: 'Active Vehicles',
      value: totalVehicles.toLocaleString(),
      subtext: 'Simulated urban flow',
      icon: Car,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      trend: '+4.2% vs off-peak',
      trendPositive: false,
    },
    {
      id: 'speed',
      label: 'Network Avg Speed',
      value: `${avgSpeed} km/h`,
      subtext: 'Target: > 40 km/h',
      icon: Gauge,
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
      trend: appliedCount > 0 ? '+28% Post-AI' : '-18% vs baseline',
      trendPositive: appliedCount > 0,
    },
    {
      id: 'congestion',
      label: 'Congestion Bottlenecks',
      value: `${appliedCount > 0 ? 2 : congestionZones} zones`,
      subtext: 'Authority B concentrated',
      icon: AlertTriangle,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20',
      trend: appliedCount > 0 ? '-68% Resolved' : 'Critical on East Ring',
      trendPositive: appliedCount > 0,
    },
    {
      id: 'travel_time',
      label: 'Average Travel Time',
      value: `${avgTravelTime} min`,
      subtext: '10km cross-city trip',
      icon: Clock,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
      trend: appliedCount > 0 ? '-5.6 min delay' : '+4.8 min delay',
      trendPositive: appliedCount > 0,
    },
    {
      id: 'co2',
      label: 'CO₂ Emissions',
      value: `${co2Emissions} tons/h`,
      subtext: 'Idling exhaust footprint',
      icon: Leaf,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
      trend: appliedCount > 0 ? '-26% Eco saving' : 'Elevated idling',
      trendPositive: appliedCount > 0,
    },
    {
      id: 'efficiency',
      label: 'Network Efficiency',
      value: `${efficiency}%`,
      subtext: 'Capacity utilization ratio',
      icon: TrendingUp,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20',
      trend: appliedCount > 0 ? 'Optimal Corridor' : 'Severe Imbalance',
      trendPositive: appliedCount > 0,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
      {stats.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.id}
            className={`p-4 rounded-2xl border transition-all ${
              isDarkMode
                ? 'bg-[#111827] border-slate-800/90 text-white'
                : 'bg-white border-slate-200 text-[#1A2B4C] shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 truncate">
                {item.label}
              </span>
              <div className={`p-1.5 rounded-lg ${item.bgColor} ${item.color}`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-extrabold tracking-tight font-mono">
                {item.value}
              </h3>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400 truncate">{item.subtext}</span>
              </div>
              <div
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md inline-block ${
                  item.trendPositive
                    ? 'bg-emerald-500/10 text-emerald-500'
                    : 'bg-red-500/10 text-red-400'
                }`}
              >
                {item.trend}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
