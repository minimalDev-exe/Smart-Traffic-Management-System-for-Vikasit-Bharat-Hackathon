import React from 'react';
import {
  LayoutDashboard,
  Map,
  BrainCircuit,
  TrafficCone,
  Settings,
  HelpCircle,
} from 'lucide-react';
import { useSimulationStore } from '../../store/useSimulationStore';

export const SIDEBAR_ITEMS = [
  { id: 'overview', label: '01 Overview', icon: LayoutDashboard },
  { id: 'map', label: '02 Live map', icon: Map },
  { id: 'optimizer', label: '03 Optimizer', icon: BrainCircuit },
  { id: 'signals', label: '04 Signals', icon: TrafficCone },
];

export const Sidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    isSidebarCollapsed,
    isDarkMode,
    toggleDarkMode,
  } = useSimulationStore();

  return (
    <aside
      className={`h-[calc(100vh-72px)] sticky top-[72px] flex flex-col justify-between transition-all duration-300 border-r border-[var(--border)] z-30 shrink-0 select-none bg-[var(--color-paper)] text-[var(--color-ink)] ${
        isSidebarCollapsed ? 'w-16' : 'w-[232px]'
      }`}
    >
      <div className="p-4 space-y-2 overflow-y-auto">
        {SIDEBAR_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[4px] text-[13px] font-display transition-all cursor-pointer group ${
                isActive
                  ? 'bg-[var(--color-paper-2)] text-[var(--color-petrol)]'
                  : 'text-[var(--color-ink)] hover:bg-[var(--color-paper-2)] hover:translate-x-[2px]'
              }`}
              title={item.label}
              style={{ borderLeftColor: isActive ? 'var(--color-citrus)' : 'transparent', borderLeftWidth: '3px', borderLeftStyle: 'solid' }}
            >
              <Icon
                className={`w-4 h-4 shrink-0 transition-transform ${
                  isActive ? 'text-[var(--color-petrol)]' : 'text-[var(--color-muted)]'
                }`}
              />

              {!isSidebarCollapsed && (
                <div className="flex-1 text-left truncate font-semibold">
                  {item.label}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-[var(--border)] space-y-2">
        <button
          onClick={toggleDarkMode}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-[4px] text-[13px] font-display transition-all cursor-pointer hover:bg-[var(--color-paper-2)] hover:translate-x-[2px] text-[var(--color-ink)]"
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          style={{ borderLeftColor: 'transparent', borderLeftWidth: '3px', borderLeftStyle: 'solid' }}
        >
          {isDarkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-[var(--color-muted)]"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-[var(--color-muted)]"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          )}
          {!isSidebarCollapsed && <span className="truncate font-semibold">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>}
        </button>
        <button
          className="w-full flex items-center gap-3 px-3 py-2 rounded-[4px] text-[13px] font-display transition-all cursor-pointer hover:bg-[var(--color-paper-2)] hover:translate-x-[2px] text-[var(--color-ink)]"
          title="Settings"
          style={{ borderLeftColor: 'transparent', borderLeftWidth: '3px', borderLeftStyle: 'solid' }}
        >
          <Settings className="w-4 h-4 shrink-0 text-[var(--color-muted)]" />
          {!isSidebarCollapsed && <span className="truncate font-semibold">Settings</span>}
        </button>
        <button
          onClick={() => window.location.href = '/support'}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-[4px] text-[13px] font-display transition-all cursor-pointer hover:bg-[var(--color-paper-2)] hover:translate-x-[2px] text-[var(--color-ink)]"
          title="Help"
          style={{ borderLeftColor: 'transparent', borderLeftWidth: '3px', borderLeftStyle: 'solid' }}
        >
          <HelpCircle className="w-4 h-4 shrink-0 text-[var(--color-muted)]" />
          {!isSidebarCollapsed && <span className="truncate font-semibold">Help & Support</span>}
        </button>
      </div>
    </aside>
  );
};
