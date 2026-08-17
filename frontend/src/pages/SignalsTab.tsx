import React from 'react';
import { SignalControlPanel } from '../components/signals/SignalControlPanel';

export const SignalsTab: React.FC = () => {
  return (
    <div className="space-y-[44px] animate-in fade-in duration-300 pb-12">
      <section>
        <h2 className="text-[20px] font-bold font-display text-[var(--color-ink)] mb-2">
          04 / Signals
        </h2>
        <p className="text-[14px] text-[var(--color-muted)] max-w-2xl">
          Signal control and corridor timing.
        </p>
      </section>

      <SignalControlPanel />
    </div>
  );
};
