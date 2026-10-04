import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CheckCircle2, 
  Loader2, 
  Cpu, 
  ShieldCheck, 
  Sparkles,
  AlertCircle
} from 'lucide-react';

export const ProcessingScreen: React.FC = () => {
  const { processingStageIndex } = useApp();

  const stages = [
    { title: 'Input received', desc: 'Ingesting multimodal payload (text / audio / structured responses)' },
    { title: 'Consent verified', desc: 'Validating DPDPA voluntary screening consent record' },
    { title: 'Text / voice / questionnaire processed', desc: 'Tokenizing narrative and extracting linguistic patterns' },
    { title: 'Emotion indicators analyzed', desc: 'Evaluating distress, fear, and panic expressions' },
    { title: 'Stress indicators analyzed', desc: 'Correlating sleep disruption and somatic tension cues' },
    { title: 'Vulnerability indicators evaluated', desc: 'Assessing threat perception and immediate physical safety' },
    { title: 'Screening level generated', desc: 'Synthesizing weighted composite risk priority score' },
    { title: 'Explanation generated', desc: 'Drafting transparent feature evidence report for human officer' }
  ];

  return (
    <div className="py-14 px-4 sm:px-6 max-w-2xl mx-auto space-y-8 text-center">
      {/* Central Processing Ring */}
      <div className="relative inline-flex items-center justify-center">
        <div className="w-24 h-24 rounded-full border-4 border-teal-100 border-t-teal-600 animate-spin flex items-center justify-center">
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-[#0b3b60]">
          <Cpu size={34} className="animate-pulse text-teal-700" />
        </div>
      </div>

      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 bg-blue-50 text-[#0b3b60] text-xs font-semibold px-3 py-1 rounded-full border border-blue-200">
          <Sparkles size={13} className="text-teal-600" />
          <span>Prototype AI Assessment Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Analyzing Response
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
          Synthesizing distress and urgency indicators. Preparing decision-support summary for authorized staff.
        </p>
      </div>

      {/* Progress Stages Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 text-left space-y-4">
        <div className="space-y-3">
          {stages.map((stage, idx) => {
            const isCompleted = idx < processingStageIndex;
            const isCurrent = idx === processingStageIndex;

            return (
              <div 
                key={stage.title}
                className={`flex items-start gap-3.5 p-2 rounded-lg transition-all ${
                  isCurrent 
                    ? 'bg-blue-50/80 border border-blue-200/60' 
                    : isCompleted 
                    ? 'text-slate-800' 
                    : 'opacity-40 text-slate-400'
                }`}
              >
                <div className="shrink-0 mt-0.5">
                  {isCompleted ? (
                    <CheckCircle2 size={18} className="text-teal-600" />
                  ) : isCurrent ? (
                    <Loader2 size={18} className="animate-spin text-[#0b3b60]" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-slate-300 ml-0.5" />
                  )}
                </div>
                <div className="space-y-0.5">
                  <div className="text-xs sm:text-sm font-bold flex items-center gap-2">
                    <span>{stage.title}</span>
                    {isCurrent && (
                      <span className="text-[10px] text-[#0b3b60] font-mono bg-blue-100 px-1.5 py-0.2 rounded animate-pulse">
                        In progress
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500">
                    {stage.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* AI Prototype Clarification */}
        <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-500">
          <AlertCircle size={14} className="text-amber-600 shrink-0" />
          <span>Demo simulation running locally. Results will be presented for human validation.</span>
        </div>
      </div>
    </div>
  );
};
