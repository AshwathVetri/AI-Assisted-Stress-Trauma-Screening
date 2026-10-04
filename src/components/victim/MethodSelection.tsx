import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FileText, 
  Mic, 
  ListChecks, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Info,
  Sparkles
} from 'lucide-react';
import type { InputMethod } from '../../types';

export const MethodSelection: React.FC = () => {
  const { 
    selectedMethods, 
    toggleMethod, 
    navigateTo 
  } = useApp();

  const handleContinue = () => {
    if (selectedMethods.length === 0) return;
    if (selectedMethods.includes('TEXT')) {
      navigateTo('assessment-text');
    } else if (selectedMethods.includes('VOICE')) {
      navigateTo('assessment-voice');
    } else if (selectedMethods.includes('QUESTIONNAIRE')) {
      navigateTo('assessment-questionnaire');
    }
  };

  const methodsConfig: { id: InputMethod; title: string; subtitle: string; icon: any; badge: string; desc: string }[] = [
    {
      id: 'TEXT',
      title: 'Text Assessment',
      subtitle: 'Describe what you are experiencing.',
      desc: 'Type in your own words what occurred, who was involved, or how you currently feel.',
      icon: FileText,
      badge: 'Narrative Analysis'
    },
    {
      id: 'VOICE',
      title: 'Voice Assessment',
      subtitle: 'Speak about your situation.',
      desc: 'Record a spoken voice message. Evaluates spoken words, urgency markers, and audio cues.',
      icon: Mic,
      badge: 'Acoustic & Transcript'
    },
    {
      id: 'QUESTIONNAIRE',
      title: 'Questionnaire Assessment',
      subtitle: 'Answer a few structured questions.',
      desc: '7 quick, structured screening questions on immediate safety, distress, and counselor requests.',
      icon: ListChecks,
      badge: 'Standardized Triage'
    }
  ];

  return (
    <div className="py-10 px-4 sm:px-6 max-w-3xl mx-auto space-y-6">
      {/* Breadcrumb / Step Indicator */}
      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <span>Public Portal</span>
        <span>/</span>
        <button onClick={() => navigateTo('consent')} className="hover:underline">Consent</button>
        <span>/</span>
        <span className="text-[#0b3b60] font-semibold">Step 2: Choose Method</span>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-bold text-teal-700 uppercase tracking-widest bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Intake Flexibility
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0b3b60]">
            How would you like to provide information?
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Select one or more methods that feel most comfortable and safe for you.
          </p>
        </div>

        {/* Recommended callout */}
        <div className="p-3.5 bg-blue-50/80 rounded-xl border border-blue-200 text-xs sm:text-sm text-[#0b3b60] flex items-start gap-2.5">
          <Sparkles size={18} className="text-teal-600 shrink-0 mt-0.5" />
          <p>
            <strong>Recommended:</strong> You may provide information using multiple methods for a more complete and accurate screening.
          </p>
        </div>

        {/* 3 Method Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {methodsConfig.map((m) => {
            const isSelected = selectedMethods.includes(m.id);
            const Icon = m.icon;

            return (
              <div
                key={m.id}
                onClick={() => toggleMethod(m.id)}
                role="checkbox"
                aria-checked={isSelected}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    toggleMethod(m.id);
                  }
                }}
                className={`cursor-pointer rounded-xl p-5 border-2 transition-all flex flex-col justify-between relative group ${
                  isSelected
                    ? 'border-teal-600 bg-teal-50/40 shadow-sm ring-1 ring-teal-500'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-white'
                }`}
              >
                {/* Selection Tick */}
                <div className={`absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                  isSelected ? 'bg-teal-600 text-white' : 'border border-slate-300 bg-white'
                }`}>
                  {isSelected && <Check size={13} strokeWidth={3} />}
                </div>

                <div className="space-y-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                    isSelected ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-700 group-hover:bg-slate-300'
                  }`}>
                    <Icon size={20} />
                  </div>

                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 block mb-1">
                      {m.badge}
                    </span>
                    <h3 className="font-bold text-base text-slate-900 leading-tight">
                      {m.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 leading-snug">
                    {m.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/80 text-[11px] text-slate-500">
                  {m.desc}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Summary */}
        <div className="text-xs text-slate-500 flex items-center justify-between pt-2">
          <span>
            Selected methods ({selectedMethods.length}):{' '}
            <strong className="text-slate-800">{selectedMethods.join(' + ')}</strong>
          </span>
          <span className="text-slate-400">Can be combined</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-100">
          <button
            onClick={() => navigateTo('consent')}
            className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back to Consent
          </button>

          <button
            id="method-continue-btn"
            disabled={selectedMethods.length === 0}
            onClick={handleContinue}
            className={`px-8 py-3 rounded-lg font-bold text-xs sm:text-sm shadow-xs flex items-center gap-2 transition-all ${
              selectedMethods.length > 0
                ? 'bg-teal-700 hover:bg-teal-800 text-white cursor-pointer hover:shadow-md'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            Continue to Intake
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
