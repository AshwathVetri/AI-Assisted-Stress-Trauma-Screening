import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FileText, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  Mic, 
  ListChecks,
  ChevronDown
} from 'lucide-react';
import { DEMO_SCENARIOS } from '../../services/aiEngine';

export const TextAssessment: React.FC = () => {
  const { 
    textContent, 
    setTextContent, 
    selectedMethods, 
    navigateTo, 
    runAssessment,
    loadDemoScenario 
  } = useApp();

  const [showDemoMenu, setShowDemoMenu] = useState(false);

  const hasVoice = selectedMethods.includes('VOICE');
  const hasQuestionnaire = selectedMethods.includes('QUESTIONNAIRE');

  const handleNext = () => {
    if (hasVoice) {
      navigateTo('assessment-voice');
    } else if (hasQuestionnaire) {
      navigateTo('assessment-questionnaire');
    } else {
      runAssessment();
    }
  };

  const loadDefaultSample = () => {
    setTextContent("I am very scared because the person involved has been threatening me again. I have been unable to sleep properly and I don't know what I should do.");
    setShowDemoMenu(false);
  };

  return (
    <div className="py-10 px-4 sm:px-6 max-w-3xl mx-auto space-y-6">
      {/* Breadcrumb / Step Indicator */}
      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <span>Public Portal</span>
        <span>/</span>
        <button onClick={() => navigateTo('methods')} className="hover:underline">Method</button>
        <span>/</span>
        <span className="text-[#0b3b60] font-semibold">Step 3A: Text Assessment</span>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
        {/* Header & Demo Loaders */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 bg-blue-50 text-[#0b3b60] text-xs font-semibold px-2.5 py-0.5 rounded-full border border-blue-200">
              <FileText size={13} />
              <span>Written Narrative</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0b3b60]">
              Tell us what is happening
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Please describe what you are experiencing or what happened. Share only information you are comfortable providing.
            </p>
          </div>

          {/* Load Demo Response Dropdown */}
          <div className="relative shrink-0">
            <button
              onClick={() => setShowDemoMenu(!showDemoMenu)}
              className="px-3.5 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors"
            >
              <Sparkles size={14} className="text-amber-700" />
              <span>Load Demo Response</span>
              <ChevronDown size={14} />
            </button>

            {showDemoMenu && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-20 space-y-1 animate-in fade-in zoom-in-95">
                <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1">
                  DEMO DATA (SIH Scenarios)
                </div>
                <button
                  onClick={loadDefaultSample}
                  className="w-full text-left p-2 rounded hover:bg-slate-50 text-xs transition-colors"
                >
                  <span className="font-semibold text-slate-800 block">Default Sample (High Distress)</span>
                  <span className="text-[11px] text-slate-500 line-clamp-1">"I am very scared because the person involved..."</span>
                </button>
                {DEMO_SCENARIOS.map(sc => (
                  <button
                    key={sc.id}
                    onClick={() => {
                      loadDemoScenario(sc.id);
                      setShowDemoMenu(false);
                    }}
                    className="w-full text-left p-2 rounded hover:bg-slate-50 text-xs transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-800">{sc.title.split(':')[1] || sc.title}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-700">
                        {sc.expectedLevel}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 line-clamp-1">{sc.description}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Text Area */}
        <div className="space-y-2">
          <div className="relative">
            <textarea
              id="victim-text-input"
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              rows={8}
              placeholder="Please describe what you are experiencing or what happened. Share only information you are comfortable providing."
              className="w-full p-4 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100 text-slate-900 text-sm leading-relaxed outline-hidden transition-all resize-y"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>
              Characters: <strong>{textContent.length}</strong> | Words:{' '}
              <strong>{textContent.trim() ? textContent.trim().split(/\s+/).length : 0}</strong>
            </span>
            <span className="text-[11px] text-slate-400">
              Only authorized staff will review this response
            </span>
          </div>
        </div>

        {/* Multi-method Progress Hint */}
        {(hasVoice || hasQuestionnaire) && (
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
            <span className="font-medium text-slate-800">
              Next in your chosen workflow:
            </span>
            <div className="flex items-center gap-2">
              {hasVoice && (
                <span className="bg-teal-100 text-teal-800 px-2 py-0.5 rounded text-[11px] font-medium flex items-center gap-1">
                  <Mic size={12} /> Voice Recording
                </span>
              )}
              {hasQuestionnaire && (
                <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-[11px] font-medium flex items-center gap-1">
                  <ListChecks size={12} /> Questionnaire
                </span>
              )}
            </div>
          </div>
        )}

        {/* Non-clinical disclaimer badge */}
        <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start gap-2">
          <AlertCircle size={15} className="text-amber-700 shrink-0 mt-0.5" />
          <p>
            <strong>Prototype AI Simulation:</strong> This text will be analyzed for indicators of stress, fear, and urgency. It does not generate medical diagnoses.
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-100">
          <button
            onClick={() => navigateTo('methods')}
            className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <div className="flex items-center gap-2">
            {/* If user wants to skip directly to processing */}
            <button
              id="analyze-response-btn"
              disabled={!textContent.trim()}
              onClick={() => runAssessment()}
              className={`px-5 py-2.5 rounded-lg font-semibold text-xs sm:text-sm border transition-all ${
                textContent.trim()
                  ? 'border-teal-600 text-teal-800 hover:bg-teal-50 cursor-pointer'
                  : 'border-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              Analyze Text Directly
            </button>

            {/* Next step in selected workflow */}
            {(hasVoice || hasQuestionnaire) ? (
              <button
                disabled={!textContent.trim()}
                onClick={handleNext}
                className={`px-6 py-2.5 rounded-lg font-bold text-xs sm:text-sm shadow-xs flex items-center gap-2 transition-all ${
                  textContent.trim()
                    ? 'bg-teal-700 hover:bg-teal-800 text-white cursor-pointer hover:shadow-md'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Proceed to {hasVoice ? 'Voice' : 'Questionnaire'}
                <ArrowRight size={16} />
              </button>
            ) : (
              <button
                disabled={!textContent.trim()}
                onClick={() => runAssessment()}
                className={`px-7 py-2.5 rounded-lg font-bold text-xs sm:text-sm shadow-xs flex items-center gap-2 transition-all ${
                  textContent.trim()
                    ? 'bg-teal-700 hover:bg-teal-800 text-white cursor-pointer hover:shadow-md'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Analyze Response
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
