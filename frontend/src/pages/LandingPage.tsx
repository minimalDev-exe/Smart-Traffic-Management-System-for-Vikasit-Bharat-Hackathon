import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Layers, ArrowRight } from 'lucide-react';
import { useSimulationStore } from '../store/useSimulationStore';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { setActiveTab } = useSimulationStore();

  const handleLaunchSimulation = () => {
    setActiveTab('overview');
    navigate('/command-center');
  };

  const currentLocalTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-[var(--color-citrus)] selection:text-[var(--color-ink)] relative overflow-hidden bg-[var(--color-paper)] text-[var(--color-ink)]">
      {/* Background atlas texture placeholder */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%231d2421\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

      {/* Header Navbar */}
      <header className="w-full px-8 py-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <Layers className="w-6 h-6 text-[var(--color-petrol)]" />
          <span className="font-bold text-lg tracking-tight font-display">
            SADAKSENSE
          </span>
        </div>
        
        <div className="flex items-center gap-6">
          <Link
            to="/register"
            className="text-[13px] font-bold text-[var(--color-ink)] hover:text-[var(--color-petrol)] transition-all font-display tracking-wide"
          >
            Team registration
          </Link>
          <button
            onClick={handleLaunchSimulation}
            className="text-[13px] font-bold text-[var(--color-petrol)] hover:opacity-80 transition-all font-display flex items-center gap-1 group cursor-pointer"
          >
            <span>Open command center</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-[2px] transition-transform" />
          </button>
        </div>
      </header>

      {/* Main Hero Section */}
      <main className="w-full max-w-4xl mx-auto px-8 py-20 text-center z-10 flex flex-col items-center justify-center flex-1">
        {/* Eyebrow */}
        <div className="mb-8 font-mono text-[10px] uppercase tracking-widest text-[var(--color-muted)] flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--color-sage)]" />
          <span>Live network · Local {currentLocalTime}</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-[clamp(58px,8.3vw,124px)] font-bold tracking-tighter leading-[0.95] mb-6 text-[var(--color-ink)] font-display" style={{ letterSpacing: '-0.04em' }}>
          Make the next move visible.
        </h1>
        
        <p className="text-[16px] text-[var(--color-muted)] max-w-lg mx-auto font-normal leading-relaxed mb-12">
          SadakSense is a live traffic intelligence desk for city operators. Move from signal to decision quickly and balance jurisdictional bottlenecks with precision.
        </p>

        {/* Primary CTA */}
        <button
          onClick={handleLaunchSimulation}
          className="px-8 py-4 bg-[var(--color-ink)] hover:bg-[var(--color-petrol)] text-[var(--color-paper)] font-bold text-[13px] transition-all flex items-center justify-center gap-2 font-display cursor-pointer hover:scale-[0.98] active:scale-95 mx-auto"
        >
          <span>Enter live workspace</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </main>

      {/* Footer */}
      <footer className="w-full px-8 py-6 flex items-center justify-between font-mono text-[10px] text-[var(--color-muted)] z-10 uppercase tracking-widest">
        <div>Network status: nominal</div>
        <div>Signal Atlas / SadakSense Platform</div>
      </footer>
    </div>
  );
};
