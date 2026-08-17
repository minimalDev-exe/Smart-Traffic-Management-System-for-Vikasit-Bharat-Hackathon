import React from 'react';
import { UserCheck, Mail, Phone, Building2 } from 'lucide-react';
import { useRegistrationStore } from '../../store/useRegistrationStore';

export const TeamLeadForm: React.FC = () => {
  const { teamLead, updateTeamLead } = useRegistrationStore();

  return (
    <div className="bg-slate-50/70 rounded-2xl p-5 border border-slate-200/80 space-y-4">
      {/* Header Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
            <UserCheck className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#1A2B4C]">Team Lead (Primary Contact)</h4>
            <p className="text-[11px] text-slate-500 font-medium">
              Manages simulation parameters and official code submissions.
            </p>
          </div>
        </div>
        <span className="text-[10px] uppercase font-extrabold px-2.5 py-1 rounded-full bg-orange-100 text-orange-700 border border-orange-200">
          Required Lead
        </span>
      </div>

      {/* Inputs Grid */}
      <div className="grid sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={teamLead.fullName}
            onChange={(e) => updateTeamLead('fullName', e.target.value)}
            placeholder="e.g. Arjun Sharma"
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-[#1A2B4C] focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Official Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="email"
              value={teamLead.email}
              onChange={(e) => updateTeamLead('email', e.target.value)}
              placeholder="e.g. lead@university.edu"
              className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-[#1A2B4C] focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
            />
            <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="tel"
              value={teamLead.phone}
              onChange={(e) => updateTeamLead('phone', e.target.value)}
              placeholder="e.g. +91 98765 43210"
              className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-[#1A2B4C] focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
            />
            <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            College / Organization Roll ID <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={teamLead.collegeOrgId}
              onChange={(e) => updateTeamLead('collegeOrgId', e.target.value)}
              placeholder="e.g. MIT-BLR-2024-889"
              className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-[#1A2B4C] focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
            />
            <Building2 className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
          </div>
        </div>
      </div>
    </div>
  );
};
