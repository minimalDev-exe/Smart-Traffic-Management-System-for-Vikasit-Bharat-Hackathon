import React from 'react';
import { useSimulationStore } from '../store/useSimulationStore';
import { AlertCircle, ArrowRight, Play, Pause, RotateCcw } from 'lucide-react';
import { TrafficMap } from '../components/map/TrafficMap';
export const OverviewTab: React.FC = () => {
  const {
    simState,
    startSimulation,
    pauseSimulation,
    resetSimulation,
    authorities,
    strategies,
    alerts,
    getImbalance,
    applyStrategy,
  } = useSimulationStore();

  const imbalance = getImbalance();
  const unappliedStrategies = strategies.filter((s) => !s.applied);
  const topStrategy = unappliedStrategies.length > 0 ? unappliedStrategies[0] : null;

  const currentHour = new Date().getHours();
  let timeOfDay = 'Night';
  if (currentHour >= 5 && currentHour < 12) timeOfDay = 'Morning';
  else if (currentHour >= 12 && currentHour < 17) timeOfDay = 'Afternoon';
  else if (currentHour >= 17 && currentHour < 21) timeOfDay = 'Evening';

  return (
    <div className="space-y-[44px] animate-in fade-in duration-300 pb-12">
      {/* 1. Page Intro */}
      <section className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <h1 className="text-[clamp(30px,4vw,49px)] font-bold tracking-tight text-[var(--color-ink)] font-display leading-[1.1] mb-2">
            {timeOfDay} peak monitoring.
          </h1>
          <p className="text-[14px] text-[var(--color-muted)] font-normal max-w-2xl">
            Live telemetry across 4 districts. The network is absorbing the commuter surge.
          </p>
        </div>
        
        {/* Simulation Controls - moved here from header to be more "operational" */}
        <div className="flex items-center gap-2">
          {simState === 'RUNNING' ? (
            <button
              onClick={pauseSimulation}
              className="px-4 py-2 bg-[var(--color-paper-2)] hover:bg-[#e0dfd8] text-[var(--color-ink)] font-bold text-[13px] transition-all flex items-center gap-2 cursor-pointer font-display rounded-[4px]"
            >
              <Pause className="w-4 h-4" />
              <span>Pause</span>
            </button>
          ) : (
            <button
              onClick={startSimulation}
              className="px-4 py-2 bg-[var(--color-ink)] hover:bg-[var(--color-petrol)] text-[var(--color-paper)] font-bold text-[13px] transition-all flex items-center gap-2 cursor-pointer font-display rounded-[4px]"
            >
              <Play className="w-4 h-4" />
              <span>Run simulation</span>
            </button>
          )}
          <button
            onClick={resetSimulation}
            className="px-3 py-2 border border-[var(--border)] hover:bg-[var(--color-paper-2)] text-[var(--color-ink)] transition-all flex items-center justify-center cursor-pointer rounded-[4px]"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 2. Primary Signal Banner */}
      {imbalance.score > 30 && (
        <section className="border border-[var(--border)] bg-[var(--color-paper)] flex flex-col relative overflow-hidden">
          {/* Citrus top rule */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-[var(--color-citrus)]" />
          
          <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[var(--color-citrus)] text-[var(--color-ink)] flex items-center justify-center shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase text-[var(--color-muted)] mb-1">
                  PRIMARY SIGNAL / {imbalance.classification}
                </div>
                <h3 className="text-[18px] font-bold font-display text-[var(--color-ink)] mb-1">
                  {imbalance.explanation}
                </h3>
                <p className="text-[14px] text-[var(--color-muted)]">
                  Imbalance score has reached {imbalance.score}/100.
                </p>
              </div>
            </div>
            
            {topStrategy && (
              <button
                onClick={() => applyStrategy(topStrategy.id)}
                className="shrink-0 px-5 py-3 bg-[var(--color-ink)] hover:bg-[var(--color-petrol)] text-[var(--color-paper)] font-bold text-[13px] font-display flex items-center gap-2 transition-transform hover:translate-x-[2px] cursor-pointer"
              >
                <span>Review adjustment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </section>
      )}

      <div className="grid lg:grid-cols-3 gap-[40px]">
        {/* Left Column: Atlas & Pulse */}
        <div className="lg:col-span-2 space-y-[44px]">
          
          {/* 3. Traffic Atlas */}
          <section>
            <h2 className="text-[20px] font-bold font-display text-[var(--color-ink)] mb-4">
              01 / Spatial network
            </h2>
            <TrafficMap className="h-[400px]" hideControls={true} />
          </section>

          {/* 5. District Pulse */}
          <section>
            <h2 className="text-[20px] font-bold font-display text-[var(--color-ink)] mb-4">
              03 / District pulse
            </h2>
            <div className="border-t border-[var(--border)]">
              {authorities.map((auth) => {
                const isCritical = auth.roadUtilizationPercent > 80;
                const isWatch = auth.roadUtilizationPercent > 60 && !isCritical;
                const stateColor = isCritical ? 'var(--color-rust)' : isWatch ? 'var(--color-citrus)' : 'var(--color-sage)';
                
                return (
                  <div key={auth.id} className="py-4 border-b border-[var(--border)] flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex items-center gap-3 w-48 shrink-0">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: stateColor }} />
                      <div>
                        <div className="font-bold font-display text-[14px] text-[var(--color-ink)]">{auth.name}</div>
                        <div className="font-mono text-[10px] text-[var(--color-muted)]">Auth-{auth.id}</div>
                      </div>
                    </div>
                    
                    <div className="flex-1 flex items-center gap-4">
                      <div className="flex-1 h-[4px] bg-[rgba(29,36,33,0.08)] rounded-none overflow-hidden">
                        <div 
                          className="h-full transition-all duration-500" 
                          style={{ width: `${auth.roadUtilizationPercent}%`, backgroundColor: stateColor }}
                        />
                      </div>
                      <div className="font-mono text-[12px] text-[var(--color-ink)] w-12 text-right">
                        {auth.roadUtilizationPercent}%
                      </div>
                    </div>
                    
                    <div className="w-24 shrink-0 text-right">
                      <div className="font-mono text-[12px] text-[var(--color-ink)]">{auth.avgSpeedKmh} km/h</div>
                      <div className="font-mono text-[9px] text-[var(--color-muted)] uppercase">Avg Speed</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Right Column: Readout & Next Move */}
        <div className="space-y-[44px]">
          
          {/* 4. Operator Readout */}
          <section>
            <h2 className="text-[20px] font-bold font-display text-[var(--color-ink)] mb-4">
              02 / What changed
            </h2>
            
            <div className="p-5 bg-[var(--color-paper-2)] border border-[var(--border)] rounded-[4px] mb-6">
              <div className="font-mono text-[10px] uppercase text-[var(--color-muted)] mb-2">Network Load</div>
              <div className="font-mono text-[48px] font-medium leading-none text-[var(--color-ink)] mb-1">
                {Math.round(authorities.reduce((acc, a) => acc + a.roadUtilizationPercent, 0) / authorities.length)}%
              </div>
              <div className="text-[12px] text-[var(--color-petrol)] font-display font-medium">
                +4.2% since 08:30
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-2">
                <div className="text-[14px] font-bold font-display text-[var(--color-ink)]">Recent incidents</div>
                <button className="text-[11px] font-display font-bold text-[var(--color-petrol)] hover:underline cursor-pointer">
                  Full log &rarr;
                </button>
              </div>
              
              {alerts.slice(0, 4).map((a) => {
                const color = a.severity === 'CRITICAL' ? 'var(--color-rust)' : a.severity === 'HIGH' ? 'var(--color-citrus)' : 'var(--color-sage)';
                return (
                  <div key={a.id} className="flex gap-3 group hover:-translate-y-[1px] transition-transform cursor-pointer">
                    <div className="w-[3px] shrink-0" style={{ backgroundColor: color }} />
                    <div className="flex-1 py-1 border-b border-[rgba(29,36,33,0.06)] pb-2">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-[13px] font-display font-medium text-[var(--color-ink)]">{a.title}</span>
                        <span className="font-mono text-[9px] text-[var(--color-muted)]">{a.timestamp}</span>
                      </div>
                      <div className="font-mono text-[10px] text-[var(--color-muted)] truncate max-w-[200px]">
                        {a.metric}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* 6. Next-best-move panel */}
          {topStrategy && (
            <section>
              <h2 className="text-[20px] font-bold font-display text-[var(--color-ink)] mb-4">
                04 / Next best move
              </h2>
              
              <div className="bg-[var(--color-petrol-dark)] text-white p-6 rounded-[4px] relative overflow-hidden">
                <div className="font-mono text-[10px] uppercase text-[var(--color-citrus)] mb-2">
                  RECOMMENDATION
                </div>
                <h3 className="text-[18px] font-bold font-display text-white mb-2 leading-tight">
                  {topStrategy.title}
                </h3>
                <p className="text-[13px] text-white/80 mb-6 leading-relaxed">
                  {topStrategy.recommendedAction}
                </p>
                
                <div className="flex items-center gap-6 mb-6">
                  <div>
                    <div className="font-mono text-[18px] font-medium text-[var(--color-citrus)]">
                      {topStrategy.expectedImpact.queueReduction}
                    </div>
                    <div className="font-mono text-[9px] uppercase text-white/60">Queue</div>
                  </div>
                  <div>
                    <div className="font-mono text-[18px] font-medium text-[var(--color-sage)]">
                      {topStrategy.expectedImpact.throughput}
                    </div>
                    <div className="font-mono text-[9px] uppercase text-white/60">Throughput</div>
                  </div>
                </div>
                
                <button
                  onClick={() => applyStrategy(topStrategy.id)}
                  className="w-full py-3 bg-[var(--color-citrus)] hover:bg-[#eab308] text-[var(--color-ink)] font-bold text-[13px] font-display flex items-center justify-center gap-2 transition-transform hover:scale-[0.98] active:scale-95 cursor-pointer"
                >
                  <span>Apply recommendation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
