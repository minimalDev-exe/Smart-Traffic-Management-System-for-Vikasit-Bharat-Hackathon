import React from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { useSimulationStore } from '../../store/useSimulationStore';
import { calculateSurgeMultiplier } from '../../utils/trafficPhysics';

export const AnalyticsCharts: React.FC = () => {
  const { isDarkMode, currentTimeSeconds, peakPeriod, strategies } =
    useSimulationStore();

  const isMorning = peakPeriod.includes('Morning');
  const startHour = isMorning ? 9 : 16;
  const isOptimized = strategies.some((s) => s.applied);

  // Generate continuous synchronized time series data (every 15 mins across the 3 hour window)
  const data = React.useMemo(() => {
    const points = [];
    const stepCount = 13; // 0, 15m, 30m ... 180m (3 hours)

    for (let i = 0; i < stepCount; i++) {
      const minutesOffset = i * 15;
      const totalSec = (startHour * 3600) + (minutesOffset * 60);
      const surge = calculateSurgeMultiplier(totalSec, peakPeriod);

      const hour = Math.floor(totalSec / 3600) % 24;
      const min = Math.floor((totalSec % 3600) / 60);
      const ampm = hour < 12 ? 'AM' : 'PM';
      const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      const timeLabel = `${String(displayHour).padStart(2, '0')}:${String(min).padStart(2, '0')} ${ampm}`;

      // Telemetry values dynamically reflecting peak curve + AI strategy relief
      let totalVehicles = Math.round(8200 + surge * 5100);
      let avgSpeed = Number((44.0 - surge * 15.0).toFixed(1));
      let congestionPercent = Number((32.0 + surge * 54.0).toFixed(1));

      // Authority breakdown
      let authAVehicles = Math.round(2400 + surge * 1800);
      let authBVehicles = Math.round(3200 + surge * 2400); // Heavy influx
      let authCVehicles = Math.round(1600 + surge * 800);
      let authDVehicles = Math.round(1100 + surge * 700);

      // When AI strategy applied:
      if (isOptimized) {
        avgSpeed = Number((avgSpeed + 11.0).toFixed(1));
        congestionPercent = Math.max(22.0, Number((congestionPercent - 34.0).toFixed(1)));
        // Divert from B to D
        const diverted = Math.round(authBVehicles * 0.24);
        authBVehicles -= diverted;
        authDVehicles += diverted;
      }

      points.push({
        time: timeLabel,
        totalSeconds: totalSec,
        vehicles: totalVehicles,
        avgSpeed: avgSpeed,
        congestion: congestionPercent,
        'Authority A (CBD)': authAVehicles,
        'Authority B (East Corridor)': authBVehicles,
        'Authority C (South Logistics)': authCVehicles,
        'Authority D (West Suburbs)': authDVehicles,
      });
    }

    return points;
  }, [startHour, peakPeriod, isOptimized]);

  // Find nearest time label to current simulation time
  const nearestTimePoint = data.reduce((prev, curr) => {
    return Math.abs(curr.totalSeconds - currentTimeSeconds) <
      Math.abs(prev.totalSeconds - currentTimeSeconds)
      ? curr
      : prev;
  }, data[0]);

  const chartTheme = {
    grid: isDarkMode ? '#1F2937' : '#E5E7EB',
    text: isDarkMode ? '#9CA3AF' : '#4B5563',
    tooltipBg: isDarkMode ? '#111827' : '#FFFFFF',
    tooltipBorder: isDarkMode ? '#374151' : '#E5E7EB',
  };

  return (
    <div className="space-y-6">
      {/* Top 2 Time-Series Charts (Vehicles & Avg Speed) */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* 1. Vehicle Count vs Time */}
        <div
          className={`p-6 rounded-3xl border transition-all ${
            isDarkMode ? 'bg-[#111827] border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-400 block font-mono">
                Volume Metric
              </span>
              <h3 className="text-sm font-bold text-white dark:text-white">
                Vehicle Count vs Time
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-slate-400">
              Peak: 13,300 veh
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.grid} />
                <XAxis dataKey="time" stroke={chartTheme.text} fontSize={10} />
                <YAxis stroke={chartTheme.text} fontSize={10} domain={[6000, 15000]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: chartTheme.tooltipBg,
                    borderColor: chartTheme.tooltipBorder,
                    borderRadius: '12px',
                    fontSize: '11px',
                  }}
                />
                <ReferenceLine
                  x={nearestTimePoint.time}
                  stroke="#F97316"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  label={{ value: 'NOW', position: 'top', fill: '#F97316', fontSize: 10, fontWeight: 'bold' }}
                />
                <Line
                  type="monotone"
                  dataKey="vehicles"
                  name="Active Vehicles"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={{ r: 3, fill: '#3B82F6' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2. Average Speed vs Time */}
        <div
          className={`p-6 rounded-3xl border transition-all ${
            isDarkMode ? 'bg-[#111827] border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400 block font-mono">
                Mobility Metric
              </span>
              <h3 className="text-sm font-bold text-white dark:text-white">
                Average Speed vs Time (km/h)
              </h3>
            </div>
            <span
              className={`text-xs font-mono font-bold ${
                isOptimized ? 'text-emerald-400' : 'text-amber-400'
              }`}
            >
              {isOptimized ? '↑ Post-AI Optimized (+28%)' : 'Bottlenecked at Peak'}
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.grid} />
                <XAxis dataKey="time" stroke={chartTheme.text} fontSize={10} />
                <YAxis stroke={chartTheme.text} fontSize={10} domain={[10, 55]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: chartTheme.tooltipBg,
                    borderColor: chartTheme.tooltipBorder,
                    borderRadius: '12px',
                    fontSize: '11px',
                  }}
                />
                <ReferenceLine
                  x={nearestTimePoint.time}
                  stroke="#F97316"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  label={{ value: 'NOW', position: 'top', fill: '#F97316', fontSize: 10, fontWeight: 'bold' }}
                />
                <Line
                  type="monotone"
                  dataKey="avgSpeed"
                  name="Avg Speed (km/h)"
                  stroke="#F59E0B"
                  strokeWidth={3}
                  dot={{ r: 3, fill: '#F59E0B' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom 2 Charts (Congestion Level Area & Traffic Distribution by Authority Bar) */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* 3. Congestion Level vs Time (Area Chart) */}
        <div
          className={`p-6 rounded-3xl border transition-all ${
            isDarkMode ? 'bg-[#111827] border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-red-400 block font-mono">
                Bottleneck Severity
              </span>
              <h3 className="text-sm font-bold text-white dark:text-white">
                Network Congestion Level vs Time (%)
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-slate-400">
              Critical Threshold: &gt;75%
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.grid} />
                <XAxis dataKey="time" stroke={chartTheme.text} fontSize={10} />
                <YAxis stroke={chartTheme.text} fontSize={10} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: chartTheme.tooltipBg,
                    borderColor: chartTheme.tooltipBorder,
                    borderRadius: '12px',
                    fontSize: '11px',
                  }}
                />
                <ReferenceLine
                  x={nearestTimePoint.time}
                  stroke="#F97316"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  label={{ value: 'NOW', position: 'top', fill: '#F97316', fontSize: 10, fontWeight: 'bold' }}
                />
                <Area
                  type="monotone"
                  dataKey="congestion"
                  name="Congestion Level (%)"
                  stroke="#EF4444"
                  fill="#EF4444"
                  fillOpacity={0.25}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 4. Traffic Distribution by Planning Authority (Core Problem Statement Chart) */}
        <div
          className={`p-6 rounded-3xl border transition-all ${
            isDarkMode ? 'bg-[#111827] border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-400 block font-mono">
                Problem Statement Proof
              </span>
              <h3 className="text-sm font-bold text-white dark:text-white">
                Traffic Distribution by Planning Authority
              </h3>
            </div>
            <span
              className={`text-xs font-mono font-bold ${
                isOptimized ? 'text-emerald-400' : 'text-red-400'
              }`}
            >
              {isOptimized ? '✓ Load Balanced (24% Rerouted)' : '⚠ Severe Skew on Auth B'}
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.grid} />
                <XAxis dataKey="time" stroke={chartTheme.text} fontSize={10} />
                <YAxis stroke={chartTheme.text} fontSize={10} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: chartTheme.tooltipBg,
                    borderColor: chartTheme.tooltipBorder,
                    borderRadius: '12px',
                    fontSize: '11px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Bar dataKey="Authority B (East Corridor)" fill="#EF4444" stackId="a" />
                <Bar dataKey="Authority A (CBD)" fill="#3B82F6" stackId="a" />
                <Bar dataKey="Authority C (South Logistics)" fill="#F59E0B" stackId="a" />
                <Bar dataKey="Authority D (West Suburbs)" fill="#10B981" stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
