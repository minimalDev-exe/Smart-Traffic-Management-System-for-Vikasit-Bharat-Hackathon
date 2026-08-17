import React from 'react';
import { X, FileText, CheckCircle2, AlertCircle, Download, BookOpen } from 'lucide-react';
import { THEME_DETAILS } from '../../store/useRegistrationStore';

interface ThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
  themeKey: string;
}

export const ThemeModal: React.FC<ThemeModalProps> = ({
  isOpen,
  onClose,
  themeKey,
}) => {
  if (!isOpen) return null;

  const themeData = THEME_DETAILS[themeKey] || THEME_DETAILS['Smart City'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-orange-50/50 to-amber-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/10 text-orange-600 flex items-center justify-center border border-orange-500/20">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-orange-100 text-orange-700">
                  {themeData.category}
                </span>
                <span className="text-xs text-slate-400 font-medium">Official Spec Document</span>
              </div>
              <h3 className="text-lg font-bold text-[#1A2B4C]">
                {themeData.name} — Problem Brief & Evaluation Rubric
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto text-sm text-slate-600">
          {/* Problem Statement Box */}
          <div className="p-4 rounded-2xl bg-red-50/70 border border-red-200/80">
            <div className="flex items-start gap-2.5 text-red-900 font-semibold mb-1">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>Assigned Problem Statement</span>
            </div>
            <p className="text-xs text-red-800/90 leading-relaxed pl-6">
              {themeData.problemStatement}
            </p>
          </div>

          {/* Expected Solution Box */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
            <div className="flex items-start gap-2.5 text-emerald-900 font-semibold mb-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Mandated Deliverable & Solution Scope</span>
            </div>
            <p className="text-xs text-emerald-800/90 leading-relaxed pl-6">
              {themeData.expectedSolution}
            </p>
          </div>

          {/* Technical Evaluation Guidelines */}
          <div>
            <h4 className="font-bold text-[#1A2B4C] flex items-center gap-2 mb-3">
              <BookOpen className="w-4 h-4 text-orange-600" />
              Evaluation Rubric & Key Criteria
            </h4>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {themeData.guidelines.map((item, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 flex items-start gap-2"
                >
                  <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Expected Deliverables */}
          <div>
            <h4 className="font-bold text-[#1A2B4C] mb-2.5 text-xs uppercase tracking-wider text-slate-400">
              Required Technical Artifacts
            </h4>
            <ul className="space-y-1.5 text-xs">
              {themeData.sampleDeliverables.map((del, i) => (
                <li key={i} className="flex items-center gap-2 text-slate-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  <span>{del}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <span>Doc ID: SPEC-{themeData.id.toUpperCase()}-2024</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => alert(`Simulated PDF Download: ${themeData.name}_Theme_Specification.pdf`)}
              className="px-4 py-2 rounded-xl text-xs font-semibold border border-slate-200 text-slate-700 hover:bg-white transition-all flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              Download PDF
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-orange-600 text-white hover:bg-orange-700 transition-all shadow-sm shadow-orange-600/20"
            >
              Close Briefing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
