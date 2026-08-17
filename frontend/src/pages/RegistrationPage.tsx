import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Loader2, Sparkles, ShieldCheck } from 'lucide-react';
import { Navbar } from '../components/registration/Navbar';
import { StepProgressBar } from '../components/registration/StepProgressBar';
import { ThemeSelector } from '../components/registration/ThemeSelector';
import { ThemeModal } from '../components/registration/ThemeModal';
import { TeamLeadForm } from '../components/registration/TeamLeadForm';
import { TeamMemberList } from '../components/registration/TeamMemberList';
import { WorkspaceLaunchCard } from '../components/registration/WorkspaceLaunchCard';
import { useRegistrationStore } from '../store/useRegistrationStore';

export const RegistrationPage: React.FC = () => {
  const {
    step,
    theme,
    teamLead,
    members,
    prevStep,
    isThemeModalOpen,
    toggleThemeModal,
    submitRegistration,
    isSubmitting,
  } = useRegistrationStore();

  const [validationError, setValidationError] = useState<string | null>(null);

  // Validate step 2 fields
  const handleProceedFromStep2 = async () => {
    setValidationError(null);

    // Validate Team Lead
    if (
      !teamLead.fullName.trim() ||
      !teamLead.email.trim() ||
      !teamLead.phone.trim() ||
      !teamLead.collegeOrgId.trim()
    ) {
      setValidationError('Please complete all required Team Lead fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(teamLead.email)) {
      setValidationError('Please enter a valid email address for Team Lead.');
      return;
    }

    // Validate total team size (2 to 5 members total)
    const totalTeamSize = members.length + 1;
    if (totalTeamSize < 2) {
      setValidationError('Team size must be at least 2 members (1 Lead + 1 Member).');
      return;
    }
    if (totalTeamSize > 5) {
      setValidationError('Team size cannot exceed 5 members.');
      return;
    }

    // Validate member rows
    for (let i = 0; i < members.length; i++) {
      const m = members[i];
      if (!m.fullName.trim() || !m.email.trim()) {
        setValidationError(`Please fill out all fields for Member #${i + 1}.`);
        return;
      }
      if (!emailRegex.test(m.email)) {
        setValidationError(`Please enter a valid email address for Member #${i + 1}.`);
        return;
      }
    }

    // Submit registration
    await submitRegistration();
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] text-[#1A2B4C] flex flex-col justify-between selection:bg-orange-500 selection:text-white">
      {/* Sticky Header Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-4 sm:py-6">
        {/* Top Multi-Step Progress Indicator */}
        <StepProgressBar currentStep={step} theme={theme} />

        {/* Step 1: Theme & Problem Selection */}
        {step === 1 && <ThemeSelector />}

        {/* Step 2: Team Member Registration */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Title & Subtitle */}
            <div className="text-left space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Step 2: Team Registration</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A2B4C] tracking-tight">
                Team Lead & Member Roster
              </h2>
              <p className="text-sm text-slate-500 font-medium">
                Add one to four members in addition to the team lead (Total team size: 2 to 5 members).
              </p>
            </div>

            {/* Validation Error Banner */}
            {validationError && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs font-bold text-red-700 animate-in fade-in slide-in-from-top-1">
                ⚠ {validationError}
              </div>
            )}

            {/* Form Container Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-amber-900/10 space-y-8">
              {/* Team Lead Section */}
              <TeamLeadForm />

              {/* Dynamic Member Roster */}
              <TeamMemberList />

              {/* Navigation Action Buttons */}
              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={prevStep}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl font-bold text-xs border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous: Theme Details</span>
                </button>

                <button
                  type="button"
                  onClick={handleProceedFromStep2}
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm bg-orange-600 text-white hover:bg-orange-700 disabled:opacity-50 transition-all shadow-md shadow-orange-600/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Provisioning Team Workspace...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit & Launch Workspace</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Workspace Ready */}
        {step === 3 && <WorkspaceLaunchCard />}
      </main>

      {/* Theme PDF / Spec Modal */}
      <ThemeModal
        isOpen={isThemeModalOpen}
        onClose={() => toggleThemeModal(false)}
        themeKey={theme}
      />

      {/* Footer */}
      <footer className="w-full max-w-5xl mx-auto px-4 py-6 text-center text-xs text-slate-400 border-t border-amber-900/5 mt-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© 2024 Manthan 4 Yuva Hackathon · National Smart City Innovation Challenge</span>
          <span className="flex items-center gap-1 text-slate-500 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> Official Portal Secure
          </span>
        </div>
      </footer>
    </div>
  );
};
