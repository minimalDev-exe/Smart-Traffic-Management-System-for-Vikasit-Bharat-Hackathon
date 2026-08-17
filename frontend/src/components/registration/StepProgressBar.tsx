import React from 'react';
import { Check, Sparkles, Users, Award } from 'lucide-react';

interface StepProgressBarProps {
  currentStep: number;
  theme: string;
}

export const StepProgressBar: React.FC<StepProgressBarProps> = ({
  currentStep,
  theme,
}) => {
  const steps = [
    { number: 1, label: 'Theme & Problem', icon: Sparkles },
    { number: 2, label: 'Team Members', icon: Users },
    { number: 3, label: 'Workspace Launch', icon: Award },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 my-6">
      {/* Top Banner Tag */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 bg-white/80 backdrop-blur-sm px-5 py-2.5 rounded-xl border border-amber-900/5 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold tracking-wider text-slate-500 uppercase">
            REGISTERING FOR:
          </span>
          <span className="font-extrabold text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-md border border-orange-200/60">
            {theme}
          </span>
        </div>
        <div className="text-slate-500 font-medium flex items-center gap-2">
          <span>Stage {currentStep} of 3</span>
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
          <span>Team Size: 2 to 5 Members</span>
        </div>
      </div>

      {/* Visual Step Indicator */}
      <div className="relative">
        <div className="overflow-hidden h-1.5 mb-4 text-xs flex rounded-full bg-slate-200/80">
          <div
            style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-500 ease-out"
          ></div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {steps.map((s) => {
            const isCompleted = currentStep > s.number;
            const isCurrent = currentStep === s.number;
            const Icon = s.icon;

            return (
              <div
                key={s.number}
                className={`flex items-center gap-2.5 p-2 rounded-xl transition-all ${
                  isCurrent
                    ? 'bg-white shadow-sm border border-orange-200'
                    : isCompleted
                    ? 'opacity-80'
                    : 'opacity-50'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                    isCompleted
                      ? 'bg-emerald-500 text-white'
                      : isCurrent
                      ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/30'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : <Icon className="w-3.5 h-3.5" />}
                </div>
                <div className="hidden sm:block text-left truncate">
                  <p className="text-[10px] uppercase font-bold text-slate-400">
                    Step 0{s.number}
                  </p>
                  <p
                    className={`text-xs font-bold truncate ${
                      isCurrent ? 'text-orange-600' : 'text-[#1A2B4C]'
                    }`}
                  >
                    {s.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
