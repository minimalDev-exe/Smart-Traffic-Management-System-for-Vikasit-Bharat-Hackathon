import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { Sidebar } from '../components/common/Sidebar';
import { OverviewTab } from './OverviewTab';
import { LiveMapTab } from './LiveMapTab';
import { OptimizerTab } from './OptimizerTab';
import { SignalsTab } from './SignalsTab';
import { DemoPresenterOverlay } from '../components/demo/DemoPresenterOverlay';
import { useSimulationStore } from '../store/useSimulationStore';

export const CommandCenterPage: React.FC = () => {
  const location = useLocation();
  const {
    activeTab,
    setActiveTab,
    simState,
    tick,
  } = useSimulationStore();

  // URL query param tab synchronization (?tab=simulation, etc.)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabParam = params.get('tab');
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [location.search, setActiveTab]);

  // Simulation tick loop (runs every 1 second when simState is RUNNING)
  useEffect(() => {
    if (simState !== 'RUNNING') return;
    const interval = setInterval(() => {
      tick(1);
    }, 1000);
    return () => clearInterval(interval);
  }, [simState, tick]);

  return (
    <div className="h-screen flex flex-col bg-[var(--color-paper)] text-[var(--color-ink)] overflow-hidden">
      {/* Header */}
      <Header />

      {/* Main Body with Sidebar + Tab Content */}
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />

        <main className="flex-1 p-[36px] overflow-y-auto w-full max-w-[1500px] mx-auto space-y-[44px]">
          {/* Active Tab Content */}
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'map' && <LiveMapTab />}
          {activeTab === 'optimizer' && <OptimizerTab />}
          {activeTab === 'signals' && <SignalsTab />}
        </main>
      </div>

      {/* Floating Demo Mode Presenter Overlay */}
      <DemoPresenterOverlay />
    </div>
  );
};
