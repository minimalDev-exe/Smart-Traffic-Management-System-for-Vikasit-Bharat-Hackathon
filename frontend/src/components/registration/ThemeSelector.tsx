import React from 'react';
import { Sparkles, FileText, AlertCircle, CheckCircle2, Layers, ArrowRight } from 'lucide-react';
import { THEME_DETAILS, useRegistrationStore } from '../../store/useRegistrationStore';

export const ThemeSelector: React.FC = () => {
  const { theme, setTheme, teamName, setTeamName, toggleThemeModal, nextStep } =
    useRegistrationStore();

  const currentThemeData = THEME_DETAILS[theme] || THEME_DETAILS['Smart City'];
  const themeKeys = Object.keys(THEME_DETAILS);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Title & Subtitle */}
      <div className="text-left space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Step 1: Innovation Domain</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A2B4C] tracking-tight">
          Theme & Team Selection
        </h2>
        <p className="text-sm text-slate-500 font-medium">
          Select your hackathon theme and review the official problem statement and deliverable requirements.
        </p>
      </div>

      {/* Main Container Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-amber-900/10 space-y-6">
        {/* Team Name Input */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Team Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="e.g. Team UrbanFlow AI"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-[#1A2B4C] font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
            />
            <span className="absolute right-3.5 top-3.5 text-xs text-slate-400 font-medium">
              Required
            </span>
          </div>
        </div>

        {/* Theme Dropdown */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Select Hackathon Theme <span className="text-red-500">*</span>
            </label>
            <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Allocated Tracks
            </span>
          </div>

          <div className="relative">
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white text-[#1A2B4C] font-bold text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 appearance-none shadow-sm cursor-pointer transition-all"
            >
              {themeKeys.map((k) => (
                <option key={k} value={k}>
                  {k} — {THEME_DETAILS[k].category}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-4 top-4 text-slate-400">
              <Layers className="w-4 h-4" />
            </div>
          </div>

          {/* Info Link with Red/Orange Icon */}
          <div className="mt-3 flex items-center justify-between">
            <button
              type="button"
              onClick={() => toggleThemeModal(true)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700 hover:underline transition-all group"
            >
              <FileText className="w-3.5 h-3.5 text-red-500 group-hover:scale-110 transition-transform" />
              <span>View detailed information about this theme - PDF</span>
            </button>
            <span className="text-[11px] text-slate-400">
              Version 2.4 (Official)
            </span>
          </div>
        </div>

        {/* Dynamic Cards that Update Based on Selected Theme */}
        <div className="grid md:grid-cols-2 gap-4 pt-2">
          {/* Problem Statement Card */}
          <div className="bg-gradient-to-br from-rose-50/80 to-red-50/40 rounded-2xl p-5 border border-red-200/80 shadow-xs relative overflow-hidden transition-all duration-300">
            <div className="w-2 h-full bg-red-500 absolute left-0 top-0" />
            <div className="flex items-center gap-2 text-red-800 font-extrabold text-xs uppercase tracking-wider mb-2">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <span>Problem Statement</span>
            </div>
            <p className="text-xs text-[#1A2B4C] font-semibold leading-relaxed">
              {currentThemeData.problemStatement}
            </p>
            <div className="mt-3 pt-3 border-t border-red-200/60 flex items-center justify-between text-[11px] text-red-700 font-medium">
              <span>Jurisdiction / Domain</span>
              <span className="font-bold">{currentThemeData.category}</span>
            </div>
          </div>

          {/* Expected Solution Card */}
          <div className="bg-gradient-to-br from-emerald-50/80 to-teal-50/40 rounded-2xl p-5 border border-emerald-200/80 shadow-xs relative overflow-hidden transition-all duration-300">
            <div className="w-2 h-full bg-emerald-500 absolute left-0 top-0" />
            <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-xs uppercase tracking-wider mb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Expected Solution</span>
            </div>
            <p className="text-xs text-[#1A2B4C] font-semibold leading-relaxed">
              {currentThemeData.expectedSolution}
            </p>
            <div className="mt-3 pt-3 border-t border-emerald-200/60 flex items-center justify-between text-[11px] text-emerald-700 font-medium">
              <span>Evaluation Standard</span>
              <span className="font-bold">24-Hour Simulation Matrix</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 flex justify-end">
          <button
            type="button"
            onClick={nextStep}
            disabled={!teamName.trim()}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm bg-orange-600 text-white hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-orange-600/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Proceed to Team Members</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
