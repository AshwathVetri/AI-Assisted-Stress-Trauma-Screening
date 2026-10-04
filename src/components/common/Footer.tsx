import React from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, PhoneCall, HeartHandshake, Lock, Info, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-auto">
      {/* Core Philosophical Banner */}
      <div className="bg-[#07253d] py-5 px-4 sm:px-6 border-b border-blue-900/60 text-center">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 text-sm">
          <div className="flex items-center gap-2 text-teal-400 font-semibold">
            <HeartHandshake size={18} />
            <span>Guiding Principle:</span>
          </div>
          <p className="text-slate-200 font-medium italic">
            "AI helps identify potential distress. Humans make the decision. Victims remain at the center."
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Project & Team */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-teal-600 flex items-center justify-center text-white font-bold">
                <Shield size={18} />
              </div>
              <span className="text-white font-bold text-lg">Scholar Sphere</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Smart India Hackathon 2026 Prototype
              <br />
              <strong>Team ID:</strong> 178723
              <br />
              <strong>Problem ID:</strong> SIH26093
              <br />
              <strong>Theme:</strong> MedTech / BioTech / HealthTech
            </p>
            <div className="inline-block bg-slate-800 text-amber-300 text-xs px-2.5 py-1 rounded border border-slate-700 font-mono">
              SIH26093 Prototype
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-2 text-sm">
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-3">
              Application Modules
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <button onClick={() => navigateTo('landing')} className="hover:text-white transition-colors">
                  Public Portal & Information
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('consent')} className="hover:text-white transition-colors">
                  Victim Pre-Screening Intake
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('explainability')} className="hover:text-white transition-colors">
                  Explainable AI (XAI) Model
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('security')} className="hover:text-white transition-colors">
                  DPDPA 2023 & Security Controls
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('staff-login')} className="hover:text-teal-400 font-medium transition-colors">
                  Authorized Personnel Login
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Helplines */}
          <div className="space-y-2 text-sm">
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-3">
              National Support Helplines
            </h4>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="p-2.5 rounded bg-slate-800/80 border border-slate-700/80">
                <div className="font-semibold text-amber-400 flex items-center gap-1.5">
                  <PhoneCall size={13} /> NHAA Helpline: 14566
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">Toll-free 24x7 Anti-Ragging & Atrocities Support</div>
              </div>
              <div className="flex gap-2">
                <div className="flex-1 p-2 rounded bg-slate-800 border border-slate-700 text-[11px]">
                  <span className="text-slate-400">Emergency:</span> <strong className="text-white">112</strong>
                </div>
                <div className="flex-1 p-2 rounded bg-slate-800 border border-slate-700 text-[11px]">
                  <span className="text-slate-400">Women:</span> <strong className="text-white">1091</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Important Safeguards */}
          <div className="space-y-3 text-xs">
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase">
              Ethical Guardrails
            </h4>
            <div className="p-3 rounded bg-blue-950/40 border border-blue-900/60 text-slate-300 space-y-2">
              <div className="flex items-start gap-1.5 text-blue-300 font-medium">
                <Info size={14} className="shrink-0 mt-0.5" />
                <span>Zero Autonomous Decisions</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal">
                AI operates strictly as decision-support. No automated legal actions, dispatch, or medical classification without certified human validation.
              </p>
            </div>
          </div>
        </div>

        {/* Mandatory SIH Disclaimer Notice */}
        <div className="pt-6 border-t border-slate-800 text-center space-y-2">
          <p className="text-xs text-slate-400 max-w-4xl mx-auto leading-relaxed">
            <strong>Mandatory Prototype Disclaimer:</strong> This platform is an AI-assisted decision-support prototype created for Smart India Hackathon 2026. It is <strong>NOT</strong> a medical diagnostic system and does not replace certified psychological or psychiatric evaluations. Final triage, investigation, and intervention decisions remain exclusively with authorized NHAA 14566 personnel.
          </p>
          <div className="text-[11px] text-slate-500 pt-2 flex flex-wrap items-center justify-center gap-4">
            <span>© 2026 Scholar Sphere (Team ID: 178723)</span>
            <span>•</span>
            <span>SIH26093 Demonstration Prototype</span>
            <span>•</span>
            <span className="text-amber-400/90">DEMO ENVIRONMENT — NO REAL VICTIM DATA</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
