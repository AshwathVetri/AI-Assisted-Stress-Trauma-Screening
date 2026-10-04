import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ListChecks, 
  ArrowRight, 
  ArrowLeft, 
  AlertCircle, 
  CheckCircle2, 
  ShieldQuestion,
  Sparkles
} from 'lucide-react';

export const QuestionnaireAssessment: React.FC = () => {
  const { 
    questionnaireAnswers, 
    setQuestionnaireAnswer, 
    selectedMethods, 
    navigateTo, 
    runAssessment 
  } = useApp();

  const isComplete = Boolean(
    questionnaireAnswers.safety &&
    questionnaireAnswers.distress &&
    questionnaireAnswers.persistentFear &&
    questionnaireAnswers.sleepDifficulty &&
    questionnaireAnswers.threatened &&
    questionnaireAnswers.immediateHelp &&
    questionnaireAnswers.counselorRequested
  );

  const fillSampleAnswers = () => {
    setQuestionnaireAnswer('safety', 'Unsafe');
    setQuestionnaireAnswer('distress', 'High');
    setQuestionnaireAnswer('persistentFear', 'Yes');
    setQuestionnaireAnswer('sleepDifficulty', 'Yes');
    setQuestionnaireAnswer('threatened', 'Yes');
    setQuestionnaireAnswer('immediateHelp', 'Unsure');
    setQuestionnaireAnswer('counselorRequested', 'Yes');
  };

  return (
    <div className="py-10 px-4 sm:px-6 max-w-3xl mx-auto space-y-6">
      {/* Breadcrumb / Step Indicator */}
      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <span>Public Portal</span>
        <span>/</span>
        <button onClick={() => navigateTo('methods')} className="hover:underline">Method</button>
        <span>/</span>
        <span className="text-[#0b3b60] font-semibold">Step 3C: Structured Screening Questionnaire</span>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-8">
        {/* Header & Demo Quick Fill */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-900 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-amber-300">
              <ListChecks size={13} />
              <span>Structured Screening</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0b3b60]">
              Screening Questionnaire
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Answer the following 7 questions to assist our triage staff in understanding your circumstances.
            </p>
          </div>

          <button
            onClick={fillSampleAnswers}
            className="px-3.5 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors shrink-0"
          >
            <Sparkles size={14} className="text-amber-700" />
            <span>Fill Demo Answers</span>
          </button>
        </div>

        {/* Non-Diagnostic Disclaimer Box */}
        <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-950 flex items-start gap-2.5">
          <AlertCircle size={17} className="text-amber-700 shrink-0 mt-0.5" />
          <p>
            <strong>Screening Guidance Only:</strong> These are prototype screening questions, not a clinical diagnostic test. Answers provide structured context for authorized helpline officers.
          </p>
        </div>

        {/* 7 Questions Form */}
        <div className="space-y-7 divide-y divide-slate-100">
          {/* Question 1 */}
          <div className="space-y-3 pt-2">
            <label className="block text-sm font-bold text-slate-900">
              1. How safe do you feel right now?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {['Completely safe', 'Mostly safe', 'Unsure', 'Unsafe', 'Extremely unsafe'].map((opt) => {
                const selected = questionnaireAnswers.safety === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setQuestionnaireAnswer('safety', opt)}
                    className={`p-2.5 rounded-lg border text-xs font-medium text-center transition-all ${
                      selected
                        ? 'border-teal-600 bg-teal-50 text-teal-900 font-bold ring-1 ring-teal-500'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50/50'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question 2 */}
          <div className="space-y-3 pt-6">
            <label className="block text-sm font-bold text-slate-900">
              2. How distressed do you currently feel?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {['Very low', 'Low', 'Moderate', 'High', 'Very high'].map((opt) => {
                const selected = questionnaireAnswers.distress === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setQuestionnaireAnswer('distress', opt)}
                    className={`p-2.5 rounded-lg border text-xs font-medium text-center transition-all ${
                      selected
                        ? 'border-teal-600 bg-teal-50 text-teal-900 font-bold ring-1 ring-teal-500'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50/50'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question 3 */}
          <div className="space-y-3 pt-6">
            <label className="block text-sm font-bold text-slate-900">
              3. Have you been experiencing persistent fear or anxiety?
            </label>
            <div className="grid grid-cols-3 gap-2 max-w-sm">
              {(['Yes', 'No', 'Unsure'] as const).map((opt) => {
                const selected = questionnaireAnswers.persistentFear === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setQuestionnaireAnswer('persistentFear', opt)}
                    className={`p-2.5 rounded-lg border text-xs font-medium text-center transition-all ${
                      selected
                        ? 'border-teal-600 bg-teal-50 text-teal-900 font-bold ring-1 ring-teal-500'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50/50'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question 4 */}
          <div className="space-y-3 pt-6">
            <label className="block text-sm font-bold text-slate-900">
              4. Are you having difficulty sleeping because of the situation?
            </label>
            <div className="grid grid-cols-3 gap-2 max-w-sm">
              {(['Yes', 'No', 'Unsure'] as const).map((opt) => {
                const selected = questionnaireAnswers.sleepDifficulty === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setQuestionnaireAnswer('sleepDifficulty', opt)}
                    className={`p-2.5 rounded-lg border text-xs font-medium text-center transition-all ${
                      selected
                        ? 'border-teal-600 bg-teal-50 text-teal-900 font-bold ring-1 ring-teal-500'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50/50'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question 5 */}
          <div className="space-y-3 pt-6">
            <label className="block text-sm font-bold text-slate-900">
              5. Do you feel threatened or pressured by someone?
            </label>
            <div className="grid grid-cols-3 gap-2 max-w-sm">
              {(['Yes', 'No', 'Unsure'] as const).map((opt) => {
                const selected = questionnaireAnswers.threatened === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setQuestionnaireAnswer('threatened', opt)}
                    className={`p-2.5 rounded-lg border text-xs font-medium text-center transition-all ${
                      selected
                        ? 'border-teal-600 bg-teal-50 text-teal-900 font-bold ring-1 ring-teal-500'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50/50'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question 6 */}
          <div className="space-y-3 pt-6">
            <label className="block text-sm font-bold text-slate-900">
              6. Do you feel that you need immediate assistance?
            </label>
            <div className="grid grid-cols-3 gap-2 max-w-sm">
              {(['Yes', 'No', 'Unsure'] as const).map((opt) => {
                const selected = questionnaireAnswers.immediateHelp === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setQuestionnaireAnswer('immediateHelp', opt)}
                    className={`p-2.5 rounded-lg border text-xs font-medium text-center transition-all ${
                      selected
                        ? 'border-teal-600 bg-teal-50 text-teal-900 font-bold ring-1 ring-teal-500'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50/50'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question 7 */}
          <div className="space-y-3 pt-6">
            <label className="block text-sm font-bold text-slate-900">
              7. Would you like to speak with a trained support person or counselor?
            </label>
            <div className="grid grid-cols-2 gap-2 max-w-xs">
              {(['Yes', 'No'] as const).map((opt) => {
                const selected = questionnaireAnswers.counselorRequested === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setQuestionnaireAnswer('counselorRequested', opt)}
                    className={`p-2.5 rounded-lg border text-xs font-medium text-center transition-all ${
                      selected
                        ? 'border-teal-600 bg-teal-50 text-teal-900 font-bold ring-1 ring-teal-500'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50/50'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between gap-3 pt-6 border-t border-slate-100">
          <button
            onClick={() => {
              if (selectedMethods.includes('VOICE')) {
                navigateTo('assessment-voice');
              } else if (selectedMethods.includes('TEXT')) {
                navigateTo('assessment-text');
              } else {
                navigateTo('methods');
              }
            }}
            className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <button
            id="submit-questionnaire-btn"
            disabled={!isComplete}
            onClick={() => runAssessment()}
            className={`px-8 py-3 rounded-lg font-bold text-xs sm:text-sm shadow-xs flex items-center gap-2 transition-all ${
              isComplete
                ? 'bg-teal-700 hover:bg-teal-800 text-white cursor-pointer hover:shadow-md'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            Submit Questionnaire & Screen
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
