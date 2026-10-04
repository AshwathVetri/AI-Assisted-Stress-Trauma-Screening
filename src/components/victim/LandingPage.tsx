import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Shield, 
  FileText, 
  Mic, 
  HelpCircle, 
  Sparkles, 
  UserCheck, 
  Lock, 
  ArrowRight, 
  PhoneCall, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  HeartHandshake,
  Layers,
  Scale
} from 'lucide-react';
import { DEMO_SCENARIOS } from '../../services/aiEngine';

export const LandingPage: React.FC = () => {
  const { navigateTo, loadDemoScenario } = useApp();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#0b3b60] via-[#0f4c7a] to-[#0b3b60] text-white py-14 md:py-20 px-4 sm:px-6 relative overflow-hidden">
        {/* Subtle background decorative shapes */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-teal-400 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-blue-300 blur-2xl"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          {/* Government / Initiative Badges */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs sm:text-sm font-medium text-blue-100">
            <span className="flex h-2 w-2 rounded-full bg-teal-400 animate-pulse"></span>
            <span>National Helpline for Anti-Ragging & Atrocities (NHAA 14566)</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-teal-300 font-semibold">Scholar Sphere SIH 2026</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            AI-Assisted Stress & Trauma Screening
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-blue-100/90 max-w-3xl mx-auto font-normal leading-relaxed">
            Helping authorized support staff identify cases that may require timely attention through explainable AI-assisted screening.
          </p>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigateTo('consent')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-base shadow-lg shadow-teal-900/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95"
            >
              Start Assessment
              <ArrowRight size={18} />
            </button>

            <button
              onClick={() => {
                document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-base border border-white/20 transition-colors"
            >
              How It Works
            </button>
          </div>

          {/* Persistent Non-Diagnostic Warning Box */}
          <div className="max-w-2xl mx-auto mt-8 p-4 rounded-xl bg-blue-950/60 border border-teal-500/40 text-blue-200 text-xs sm:text-sm text-left flex items-start gap-3 backdrop-blur-xs">
            <AlertCircle size={20} className="text-teal-300 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-semibold mb-0.5">Important Notice:</strong>
              This platform provides AI-assisted screening and does not provide medical diagnosis. Final assessment and intervention decisions remain with authorized personnel.
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Helpline Strip */}
      <section className="bg-amber-500 text-slate-950 py-3 px-4 border-y border-amber-600">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm font-semibold">
          <div className="flex items-center gap-2">
            <PhoneCall size={16} className="text-slate-950" />
            <span>Are you in immediate physical danger? Contact emergency services right away:</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold">
            <span className="bg-slate-950 text-amber-300 px-2.5 py-1 rounded">NHAA: 14566</span>
            <span className="bg-slate-950 text-white px-2.5 py-1 rounded">Police: 112</span>
            <span className="bg-slate-950 text-white px-2.5 py-1 rounded">Women Helpline: 1091</span>
          </div>
        </div>
      </section>

      {/* 4-Step Workflow Section */}
      <section id="how-it-works" className="py-16 px-4 sm:px-6 bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-teal-700 uppercase tracking-widest bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              Clear & Transparent Flow
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0b3b60]">
              How the Screening Process Works
            </h2>
            <p className="text-sm text-slate-600">
              Every step prioritizes complainant dignity, informed consent, and certified human judgment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs relative flex flex-col items-center text-center group hover:border-[#0b3b60] transition-colors">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-[#0b3b60] font-bold text-lg flex items-center justify-center mb-4 border border-blue-100 group-hover:bg-[#0b3b60] group-hover:text-white transition-colors">
                1
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-2">Consent</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Review the purpose of screening, confirm understanding, and voluntarily proceed at your own pace.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs relative flex flex-col items-center text-center group hover:border-[#0b3b60] transition-colors">
              <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-700 font-bold text-lg flex items-center justify-center mb-4 border border-teal-100 group-hover:bg-teal-700 group-hover:text-white transition-colors">
                2
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-2">Share Information</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Provide responses using your preferred modality: typed text, voice narration, or a short questionnaire.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs relative flex flex-col items-center text-center group hover:border-purple-600 transition-colors">
              <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-700 font-bold text-lg flex items-center justify-center mb-4 border border-purple-100 group-hover:bg-purple-700 group-hover:text-white transition-colors">
                3
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-2">AI Screening</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Rule-based indicator models analyze stress, fear, and threat perception indicators with full explainability.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs relative flex flex-col items-center text-center group hover:border-emerald-600 transition-colors">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 font-bold text-lg flex items-center justify-center mb-4 border border-emerald-100 group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                4
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-2">Human Review</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Authorized NHAA 14566 staff and counselors review indicators and decide the appropriate support pathway.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-[#0b3b60] uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Module Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Multimodal Decision-Support Architecture
            </h2>
            <p className="text-sm text-slate-600">
              Built for speed, linguistic sensitivity, transparency, and data minimization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-[#0b3b60] flex items-center justify-center">
                <FileText size={20} />
              </div>
              <h3 className="text-base font-bold text-slate-900">Text Analysis</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Extracts distress keywords, intimidation references, and urgency terms while strictly avoiding psychiatric labels.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center">
                <Mic size={20} />
              </div>
              <h3 className="text-base font-bold text-slate-900">Voice Analysis</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Transcribes verbal recordings and flags pacing, distress cues, and panic markers for helpline dispatch review.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                <HelpCircle size={20} />
              </div>
              <h3 className="text-base font-bold text-slate-900">Structured Questionnaire</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                7 non-invasive screening questions assessing immediate safety, emotional strain, and request for professional counselor outreach.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center">
                <Sparkles size={20} />
              </div>
              <h3 className="text-base font-bold text-slate-900">Explainable AI (XAI)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every priority badge displays exact trigger terms and rationales so staff never rely on opaque black-box recommendations.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <UserCheck size={20} />
              </div>
              <h3 className="text-base font-bold text-slate-900">Human-in-the-Loop</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                No autonomous case closures or police alerts. Certified officers evaluate all screening indicators before taking action.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-lg bg-slate-200 text-slate-800 flex items-center justify-center">
                <Lock size={20} />
              </div>
              <h3 className="text-base font-bold text-slate-900">Secure Data Handling</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Aligned with India's Digital Personal Data Protection Act (DPDPA 2023), with cryptographic audit logs and anonymized queues.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Predefined Demo Scenarios Showcase for Judges */}
      <section className="py-14 px-4 sm:px-6 bg-slate-100 border-t border-slate-200">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-amber-800 uppercase tracking-widest bg-amber-100 px-2.5 py-0.5 rounded border border-amber-300">
                Evaluation Test Cases
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
                Predefined Demonstration Scenarios
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Select any benchmark case to experience the live multimodal screening pipeline.
              </p>
            </div>
            <div className="text-xs font-mono text-slate-500 bg-white px-3 py-1.5 rounded border border-slate-200">
              Clear Demonstration Data
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DEMO_SCENARIOS.map((scenario) => {
              const borderColors = {
                LOW: 'border-emerald-300 bg-emerald-50/40 hover:border-emerald-500',
                MODERATE: 'border-amber-300 bg-amber-50/40 hover:border-amber-500',
                HIGH: 'border-orange-300 bg-orange-50/40 hover:border-orange-500',
                CRITICAL: 'border-rose-300 bg-rose-50/40 hover:border-rose-500'
              }[scenario.expectedLevel];

              const badgeColors = {
                LOW: 'bg-emerald-100 text-emerald-800',
                MODERATE: 'bg-amber-100 text-amber-800',
                HIGH: 'bg-orange-100 text-orange-900',
                CRITICAL: 'bg-rose-100 text-rose-900'
              }[scenario.expectedLevel];

              return (
                <div 
                  key={scenario.id}
                  className={`p-4 rounded-xl border bg-white shadow-xs flex flex-col justify-between transition-all hover:shadow-md ${borderColors}`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${badgeColors}`}>
                        {scenario.expectedLevel}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">Demo Case</span>
                    </div>
                    <h4 className="font-bold text-sm text-slate-900">
                      {scenario.title.split(':')[1] || scenario.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {scenario.description}
                    </p>
                    <div className="p-2 bg-slate-50 rounded text-[11px] text-slate-600 italic border border-slate-200 line-clamp-3">
                      "{scenario.text}"
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      loadDemoScenario(scenario.id);
                      navigateTo('assessment-text');
                    }}
                    className="mt-4 w-full py-2 bg-slate-900 hover:bg-[#0b3b60] text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                  >
                    Load & Test Flow
                    <ArrowRight size={13} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sensitive Data & Privacy Section */}
      <section className="py-14 px-4 sm:px-6 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto rounded-2xl bg-gradient-to-br from-slate-900 to-blue-950 text-white p-8 sm:p-10 shadow-xl border border-blue-900">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0 border border-teal-500/30">
              <Lock size={24} />
            </div>
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Complainant Privacy & Consent Safeguards
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Sensitive information should only be collected with explicit, informed consent and handled exclusively by authorized NHAA 14566 personnel. Complainants retain the right to pause or exit screening at any time without forfeiture of helpline support.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-teal-400 shrink-0" />
                  <span>Granular Consent Before Any Input</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-teal-400 shrink-0" />
                  <span>No Permanent PII Storage in Demo</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-teal-400 shrink-0" />
                  <span>Audit Logs for Authorized Staff Actions</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-teal-400 shrink-0" />
                  <span>Role-Based Access Control (RBAC)</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => navigateTo('security')}
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-colors"
                >
                  Read Security & DPDPA Architecture
                </button>
                <button
                  onClick={() => navigateTo('staff-login')}
                  className="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-slate-950 text-xs font-bold transition-colors"
                >
                  Access Authorized Staff Portal
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
