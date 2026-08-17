import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight, ShieldCheck, Sparkles, Activity, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useRegistrationStore } from '../../store/useRegistrationStore';

export const WorkspaceLaunchCard: React.FC = () => {
  const navigate = useNavigate();
  const { registrationResult, theme, teamName, teamLead, members, resetForm } =
    useRegistrationStore();
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    // Trigger celebratory confetti on mount
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ea580c', '#f59e0b', '#10b981', '#3b82f6'],
      });
    } catch {
      // ignore in test environments
    }
  }, []);

  const regId = registrationResult?.id || 'M4Y-884920';

  const copyId = () => {
    navigator.clipboard.writeText(regId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-amber-900/10 max-w-3xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-400">
      {/* Top Success Badge */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-emerald-400 to-teal-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
          <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Registration Successfully Confirmed</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A2B4C] tracking-tight">
          Your Project Workspace is Ready!
        </h2>
        <p className="text-sm text-slate-500 max-w-lg mx-auto font-medium">
          Welcome <span className="text-[#1A2B4C] font-bold">{teamName}</span>! Your simulation environment for the{' '}
          <span className="text-orange-600 font-bold">{theme}</span> track has been provisioned with the official problem dataset.
        </p>
      </div>

      {/* Official Credential Card */}
      <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">
              Registration Credential ID
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="font-mono font-extrabold text-base text-[#1A2B4C]">
                {regId}
              </span>
              <button
                onClick={copyId}
                className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
                title="Copy ID"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-orange-100 text-orange-700 border border-orange-200">
              Track: {theme}
            </span>
            <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
              Team: {members.length + 1} Members
            </span>
          </div>
        </div>

        {/* Team Summary Grid */}
        <div className="grid sm:grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-slate-400 font-medium">Team Lead:</span>
            <p className="font-bold text-[#1A2B4C]">{teamLead.fullName} ({teamLead.email})</p>
            <p className="text-slate-500 text-[11px]">{teamLead.collegeOrgId}</p>
          </div>
          <div>
            <span className="text-slate-400 font-medium">Team Members ({members.length}):</span>
            <p className="font-bold text-[#1A2B4C] truncate">
              {members.map((m) => m.fullName || 'Member').join(', ')}
            </p>
            <p className="text-slate-500 text-[11px]">Ready for 24h Hackathon Evaluation</p>
          </div>
        </div>
      </div>

      {/* Call to Action: Launch Simulation Workspace */}
      <div className="space-y-3">
        <button
          type="button"
          onClick={() => navigate('/command-center')}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-extrabold text-base shadow-lg shadow-orange-600/25 flex items-center justify-center gap-3 transition-all transform hover:-translate-y-0.5 cursor-pointer"
        >
          <Activity className="w-5 h-5 animate-pulse" />
          <span>Launch Simulation Command Center</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-between text-xs text-slate-400 px-2">
          <button
            onClick={() => {
              resetForm();
            }}
            className="text-slate-500 hover:text-slate-700 underline"
          >
            Start New Registration
          </button>
          <span className="flex items-center gap-1 text-emerald-600 font-medium">
            <ShieldCheck className="w-4 h-4" /> Live TraCI Bridge Ready
          </span>
        </div>
      </div>
    </div>
  );
};
