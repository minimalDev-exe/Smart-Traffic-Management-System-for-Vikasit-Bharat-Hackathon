import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  Menu,
} from 'lucide-react';
import { useSimulationStore } from '../../store/useSimulationStore';
import { useRegistrationStore } from '../../store/useRegistrationStore';

export const Header: React.FC = () => {
  const { toggleSidebar, activeTab } = useSimulationStore();
  const { teamName } = useRegistrationStore();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const currentLocalTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const activeTabName = activeTab.charAt(0).toUpperCase() + activeTab.slice(1);

  return (
    <header className="w-full h-[72px] sticky top-0 z-40 border-b border-[var(--border)] px-6 py-0 flex items-center justify-between bg-[var(--color-paper)] text-[var(--color-ink)]">
      {/* Left: Mobile Menu & Brand */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-1 rounded text-[var(--color-ink)] hover:bg-[var(--color-paper-2)] transition-colors cursor-pointer block md:hidden"
          title="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <Link to="/" className="flex items-center gap-2 group">
          <Layers className="w-6 h-6 text-[var(--color-petrol)]" />
          <span className="font-bold text-lg tracking-tight font-display text-[var(--color-ink)]">
            SADAKSENSE
          </span>
        </Link>
      </div>

      {/* Center: Context */}
      <div className="hidden md:flex flex-1 justify-center">
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-[var(--color-muted)]">
          <span>Workspace &gt; {activeTabName}</span>
        </div>
      </div>

      {/* Right: Time, Operator */}
      <div className="flex items-center gap-6">
        <div className="hidden lg:flex items-center gap-2 font-mono text-[11px] text-[var(--color-muted)] uppercase">
          <span className="w-2 h-2 rounded-full bg-[var(--color-sage)]" />
          <span>Local {currentLocalTime}</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[var(--color-paper-2)] border border-[var(--border)] flex items-center justify-center font-bold text-[12px] text-[var(--color-petrol)] font-display">
            {teamName ? teamName.charAt(0).toUpperCase() : 'OP'}
          </div>
        </div>
      </div>
    </header>
  );
};
