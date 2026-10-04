import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Lock, 
  ArrowRight, 
  ArrowLeft, 
  FileCheck, 
  Info,
  Check
} from 'lucide-react';

export const ConsentScreen: React.FC = () => {
  const { consentGiven, setConsentGiven, navigateTo } = useApp();

  return (
    <div className="py-10 px-4 sm:px-6 max-w-3xl mx-auto space-y-6">
      {/* Breadcrumb / Step Indicator */}
      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <span>Public Portal</span>
        <span>/</span>
        <span className="text-[#0b3b60] font-semibold">Step 1: Informed Consent</span>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-[#0b3b60] text-white p-6 sm:p-8 space-y-2">
          <div className="inline-flex items-center gap-2 bg-teal-500/20 text-teal-300 text-xs font-semibold px-3 py-1 rounded-full border border-teal-500/30">
            <FileCheck size={14} />
            <span>NHAA 14566 Official Screening Intake</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Before We Begin
          </h1>
          <p className="text-sm text-blue-100">
            Please read this information carefully. Your privacy, rights, and informed consent are our highest priorities.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Key Information Cards */}
          <div className="space-y-4">
            {/* Reason 1 */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#0b3b60] flex items-center justify-center shrink-0 font-bold text-sm">
                1
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900">Why information is being collected</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Information provided helps authorized NHAA 14566 personnel understand the urgency and nature of your situation so that support staff and counselors can be alerted appropriately.
                </p>
              </div>
            </div>

            {/* Reason 2 */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 font-bold text-sm">
                2
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900">Role of Artificial Intelligence</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  An automated language and structured indicator engine assists in screening submitted information for indicators of distress, fear, or urgency to facilitate prompt human prioritization.
                </p>
              </div>
            </div>

            {/* Reason 3 - Critical Non-Diagnosis Pledge */}
            <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-lg bg-amber-200 text-amber-900 flex items-center justify-center shrink-0">
                <AlertTriangle size={18} />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-amber-950">Not a Medical Diagnosis</h4>
                <p className="text-xs text-amber-900 leading-relaxed">
                  <strong>The AI does not diagnose medical or psychological conditions</strong> (such as clinical PTSD or mental illness). It only categorizes indicators for authorized human staff review. Final assessment and intervention decisions remain strictly with authorized human personnel.
                </p>
              </div>
            </div>

            {/* Reason 4 */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#0b3b60] flex items-center justify-center shrink-0">
                <Lock size={16} />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900">Confidentiality & Secure Handling</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Information is treated confidentially and accessed strictly on a need-to-know basis by verified personnel in adherence to India's Digital Personal Data Protection Act (DPDPA 2023) standards.
                </p>
              </div>
            </div>

            {/* Reason 5 */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-lg bg-slate-200 text-slate-800 flex items-center justify-center shrink-0 font-bold text-sm">
                5
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900">Voluntary Participation</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Your participation is voluntary. You may pause or exit this assessment at any time and directly contact the national helpline at <strong>14566</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Consent Checkbox Box */}
          <div className="p-5 rounded-xl bg-blue-50 border-2 border-blue-200/80 space-y-3">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                id="consent-checkbox"
                checked={consentGiven}
                onChange={(e) => setConsentGiven(e.target.checked)}
                className="mt-1 h-5 w-5 rounded border-slate-300 text-teal-600 focus:ring-teal-500 cursor-pointer"
              />
              <span className="text-xs sm:text-sm font-semibold text-slate-900 leading-snug group-hover:text-[#0b3b60]">
                I understand and consent to this AI-assisted screening process.
              </span>
            </label>
            <p className="text-[11px] text-slate-500 pl-8">
              By checking this box, you acknowledge that this is a decision-support screening tool and not a clinical diagnosis.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
            <button
              onClick={() => navigateTo('landing')}
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft size={16} />
              Exit Assessment
            </button>

            <button
              id="consent-continue-btn"
              disabled={!consentGiven}
              onClick={() => navigateTo('methods')}
              className={`w-full sm:w-auto px-8 py-3 rounded-lg font-bold text-xs sm:text-sm shadow-xs flex items-center justify-center gap-2 transition-all ${
                consentGiven
                  ? 'bg-teal-700 hover:bg-teal-800 text-white cursor-pointer hover:shadow-md'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-200'
              }`}
            >
              Continue
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
