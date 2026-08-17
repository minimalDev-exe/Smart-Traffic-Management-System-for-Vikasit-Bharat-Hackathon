import React from 'react';
import { Plus, Trash2, Users, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useRegistrationStore } from '../../store/useRegistrationStore';

const ROLE_OPTIONS = [
  'Simulation & GIS Engineer',
  'AI / Optimization Algorithms',
  'Full-Stack Developer',
  'Traffic Data Analyst',
  'Smart City Domain Specialist',
  'Systems / DevOps Lead',
];

export const TeamMemberList: React.FC = () => {
  const { members, addMember, updateMember, removeMember } = useRegistrationStore();

  const totalTeamSize = members.length + 1; // 1 Lead + members
  const canAddMore = members.length < 4;
  const isTeamValid = totalTeamSize >= 2 && totalTeamSize <= 5;

  return (
    <div className="space-y-4">
      {/* Roster Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-[#1A2B4C] flex items-center gap-2">
              <Users className="w-4 h-4 text-orange-600" />
              Additional Team Members
            </h4>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
              {members.length} / 4 Added
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Add 1 to 4 additional members to collaborate on the simulation deliverable.
          </p>
        </div>

        <button
          type="button"
          onClick={addMember}
          disabled={!canAddMore}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Member ({4 - members.length} left)</span>
        </button>
      </div>

      {/* Team Size Status Badge */}
      <div
        className={`px-4 py-2 rounded-xl border text-xs flex items-center justify-between ${
          isTeamValid
            ? 'bg-emerald-50/60 border-emerald-200 text-emerald-800'
            : 'bg-amber-50/60 border-amber-200 text-amber-800'
        }`}
      >
        <div className="flex items-center gap-2 font-semibold">
          {isTeamValid ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          )}
          <span>
            Total Team Size: {totalTeamSize} (1 Lead + {members.length} Members)
          </span>
        </div>
        <span className="text-[11px] opacity-80">
          Rule: 2 to 5 members required
        </span>
      </div>

      {/* Members Rows */}
      {members.length === 0 ? (
        <div className="p-8 text-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50">
          <p className="text-xs font-semibold text-slate-500 mb-2">
            No additional team members added yet.
          </p>
          <button
            type="button"
            onClick={addMember}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-orange-600 text-white hover:bg-orange-700 transition-all cursor-pointer"
          >
            + Add First Member
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {members.map((member, index) => (
            <div
              key={member.id}
              className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-xs hover:border-orange-200 transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                  Member #{index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeMember(member.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  title="Remove member"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid sm:grid-cols-3 gap-3">
                {/* Full Name */}
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={member.fullName}
                    onChange={(e) =>
                      updateMember(member.id, 'fullName', e.target.value)
                    }
                    placeholder="e.g. Priya Venkatesh"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50/50 text-xs font-semibold text-[#1A2B4C] focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={member.email}
                    onChange={(e) =>
                      updateMember(member.id, 'email', e.target.value)
                    }
                    placeholder="e.g. priya.v@innovate.edu"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50/50 text-xs font-semibold text-[#1A2B4C] focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                  />
                </div>

                {/* Role / Skill Dropdown */}
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                    Role / Skill Specialization
                  </label>
                  <select
                    value={member.role}
                    onChange={(e) =>
                      updateMember(member.id, 'role', e.target.value)
                    }
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-[#1A2B4C] focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all cursor-pointer"
                  >
                    {ROLE_OPTIONS.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
