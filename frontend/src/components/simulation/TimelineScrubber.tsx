import React from 'react';
import { Sunrise, Sunset } from 'lucide-react';
import { useSimulationStore } from '../../store/useSimulationStore';
import { calculateSurgeMultiplier } from '../../utils/trafficPhysics';

export const TimelineScrubber: React.FC = () => {
  const {
    isDarkMode,
    currentTimeSeconds,
    setTimeSeconds,
    peakPeriod,
    getFormattedTime,
    getImbalance,
  } = useSimulationStore();

  const isMorning = peakPeriod.includes('Morning');
  const startSec = isMorning ? 9 * 3600 : 16 * 3600; // 32400 or 57600
  const durationSec = 3 * 3600; // 10800
  const endSec = startSec + durationSec;

  const currentSurge = calculateSurgeMultiplier(currentTimeSeconds, peakPeriod);
  const imbalance = getImbalance();

  // Quick jump milestones
  const milestones = isMorning
    ? [
        { label: '09:00 AM (Start)', time: 9 * 3600, desc: 'Normal Commuter Baseline' },
        { label: '09:45 AM (Surge)', time: 9.75 * 3600, desc: 'East Corridor Influx' },
        { label: '10:15 AM (Peak Rush)', time: 10.25 * 3600, desc: 'Authority B Bottleneck (94%)', isPeak: true },
        { label: '11:15 AM (Taper)', time: 11.25 * 3600, desc: 'Dispersal & Recovery' },
        { label: '12:00 PM (End)', time: 12 * 3600, desc: 'Peak Clearance' },
      ]
    : [
        { label: '04:00 PM (Start)', time: 16 * 3600, desc: 'Evening Work Outflow' },
        { label: '04:45 PM (Surge)', time: 16.75 * 3600, desc: 'Ring Road Influx' },
        { label: '05:30 PM (Peak Rush)', time: 17.5 * 3600, desc: 'Severe East-West Gridlock', isPeak: true },
        { label: '06:15 PM (Taper)', time: 18.25 * 3600, desc: 'Residential Absorption' },
        { label: '07:00 PM (End)', time: 19 * 3600, desc: 'Off-Peak Normalization' },
      ];

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeSeconds(Number(e.target.value));
  };

  return (
    <div
      className={`p-6 rounded-3xl border space-y-5 transition-all ${
        isDarkMode ? 'bg-[#111827] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}
    >
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center border border-orange-500/20">
            {isMorning ? <Sunrise className="w-5 h-5" /> : <Sunset className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-extrabold tracking-tight">
                Peak Period Timeline Scrubber
              </h3>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-orange-500/10 text-orange-400">
                Instant State Evaluation
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              Drag to evaluate instantaneous traffic conditions across the ramp-plateau-taper influx curve.
            </p>
          </div>
        </div>

        {/* Current Time Display Box */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 font-mono text-center">
            <span className="text-[10px] text-slate-400 block uppercase">Simulated Time</span>
            <span className="text-base font-extrabold text-orange-400">
              {getFormattedTime()}
            </span>
          </div>

          <div
            className="px-3.5 py-2 rounded-xl border text-center font-mono text-xs"
            style={{
              borderColor: `${imbalance.color}40`,
              backgroundColor: imbalance.badgeBg,
              color: imbalance.color,
            }}
          >
            <span className="text-[10px] opacity-80 block uppercase">Imbalance</span>
            <span className="font-extrabold">{imbalance.score}/100</span>
          </div>
        </div>
      </div>

      {/* Scrubber Gradient Track with Influx Histogram visual */}
      <div className="space-y-2 pt-2">
        {/* Surge curve graphic background */}
        <div className="h-6 w-full rounded-xl bg-slate-800/40 relative overflow-hidden flex items-end px-2">
          {/* Visual gradient curve indicator */}
          <div
            className="absolute inset-0 opacity-30 bg-gradient-to-r from-emerald-500 via-red-500 to-emerald-500"
            style={{
              clipPath:
                'polygon(0% 100%, 15% 70%, 35% 20%, 65% 20%, 85% 70%, 100% 100%)',
            }}
          />
          <div className="w-full flex justify-between text-[9px] font-bold text-slate-400 relative z-10 px-1">
            <span>Ramp-Up (09:00)</span>
            <span className="text-red-400 font-mono">▲ Peak Plateau (10:15 - 10:45)</span>
            <span>Taper-Down (12:00)</span>
          </div>
        </div>

        {/* Draggable HTML Range Input */}
        <input
          type="range"
          min={startSec}
          max={endSec}
          step={60} // 1-minute step
          value={currentTimeSeconds}
          onChange={handleSliderChange}
          className="w-full h-3 bg-slate-700/60 rounded-lg appearance-none cursor-pointer accent-orange-500 hover:accent-orange-400 transition-all focus:outline-none"
        />

        {/* Progress & Surge Metric Bar */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-1 font-mono">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">Influx Intensity:</span>
            <span
              className={`font-bold ${
                currentSurge > 0.8
                  ? 'text-red-400'
                  : currentSurge > 0.4
                  ? 'text-amber-400'
                  : 'text-emerald-400'
              }`}
            >
              {(currentSurge * 100).toFixed(0)}% of Peak Max
            </span>
          </div>
          <span className="text-slate-400">
            Window: {isMorning ? '09:00 AM → 12:00 PM' : '04:00 PM → 07:00 PM'}
          </span>
        </div>
      </div>

      {/* Quick Jump Buttons for Hackathon Judges */}
      <div>
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-2">
          Judge Scenario Quick Jumps
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {milestones.map((m, idx) => (
            <button
              key={idx}
              onClick={() => setTimeSeconds(m.time)}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                currentTimeSeconds >= m.time && currentTimeSeconds < m.time + 1800
                  ? 'bg-orange-500/20 border-orange-500/60 text-white shadow-xs'
                  : m.isPeak
                  ? 'bg-red-500/10 border-red-500/30 hover:bg-red-500/20 text-red-300'
                  : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800 text-slate-300'
              }`}
            >
              <span className="font-mono font-bold text-xs block">{m.label.split(' ')[0]}</span>
              <span className="text-[10px] text-slate-400 truncate block mt-0.5">
                {m.desc}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
