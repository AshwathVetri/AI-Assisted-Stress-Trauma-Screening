import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RiskBadge } from '../common/RiskBadge';
import { 
  ShieldCheck, 
  AlertCircle, 
  ArrowRight, 
  Home, 
  UserCheck, 
  Clock, 
  Sparkles, 
  HelpCircle, 
  CheckCircle2, 
  Info,
  PhoneCall,
  ExternalLink
} from 'lucide-react';

export const ResultScreen: React.FC = () => {
  const { 
    currentResult, 
    requestHumanReview, 
    submittedCaseId, 
    navigateTo, 
    loginStaff 
  } = useApp();

  const [hasRequestedReview, setHasRequestedReview] = useState<boolean>(Boolean(submittedCaseId));
  const [createdCaseId, setCreatedCaseId] = useState<string | null>(submittedCaseId);

  if (!currentResult) {
    return (
      <div className="py-20 text-center max-w-md mx-auto space-y-4">
        <p className="text-slate-600 text-sm">No active assessment results found.</p>
        <button
          onClick={() => navigateTo('consent')}
          className="px-6 py-2.5 bg-teal-700 text-white rounded-lg text-xs font-semibold"
        >
          Start Assessment
        </button>
      </div>
    );
  }

  const handleRequestReview = () => {
    const caseId = requestHumanReview();
    setCreatedCaseId(caseId);
    setHasRequestedReview(true);
  };

  const ind = currentResult.indicators;

  const indicatorCards = [
    { title: 'Fear-related language', data: ind.fear, desc: ind.fear.evidenceText },
    { title: 'Emotional distress', data: ind.distress, desc: ind.distress.evidenceText },
    { title: 'Threat perception', data: ind.threat, desc: ind.threat.evidenceText },
    { title: 'Sleep disturbance & stress', data: ind.sleepStress, desc: ind.sleepStress.evidenceText },
    { title: 'Urgency indicators', data: ind.urgency, desc: ind.urgency.evidenceText }
  ];

  return (
    <div className="py-10 px-4 sm:px-6 max-w-4xl mx-auto space-y-8">
      {/* Breadcrumb / Step Indicator */}
      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <span>Public Portal</span>
        <span>/</span>
        <span className="text-[#0b3b60] font-semibold">Step 4: AI Screening Result</span>
      </div>

      {/* Main Result Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
        {/* Top Banner */}
        <div className="bg-gradient-to-r from-[#0b3b60] to-[#165384] text-white p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-300 flex items-center gap-1.5">
                <CheckCircle2 size={15} />
                Screening Complete
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Preliminary Screening Level
              </h1>
              <p className="text-xs sm:text-sm text-blue-100">
                Linguistic and structured indicators evaluated for authorized triage.
              </p>
            </div>

            {/* Large Visual Risk Badge */}
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 flex flex-col items-center justify-center shrink-0">
              <span className="text-[10px] text-blue-200 uppercase font-semibold tracking-wider mb-1">
                Priority Tier
              </span>
              <RiskBadge level={currentResult.riskLevel} size="lg" />
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          {/* AI Confidence & Non-Diagnostic Guarantee */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                  AI Confidence
                </span>
                <span className="text-xs font-mono font-bold text-teal-700 bg-teal-100 px-2 py-0.5 rounded">
                  {currentResult.confidenceScore}%
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Prototype confidence estimate based on keyword density & questionnaire alignment.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 space-y-1">
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wide flex items-center gap-1">
                <ShieldCheck size={14} className="text-amber-700" />
                Human-in-the-Loop Required
              </span>
              <p className="text-[11px] text-amber-900 leading-normal">
                This result is <strong>not a medical diagnosis</strong>. It is an AI-assisted screening intended to support authorized personnel in triage prioritization.
              </p>
            </div>
          </div>

          {/* Section: Indicators Identified */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Indicators Identified
              </h2>
              <span className="text-xs text-slate-500">
                5 Standard Screening Dimensions
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {indicatorCards.map((card) => {
                const levelColors = {
                  Severe: 'bg-rose-50 text-rose-800 border-rose-200',
                  High: 'bg-orange-50 text-orange-900 border-orange-200',
                  Moderate: 'bg-amber-50 text-amber-800 border-amber-200',
                  Low: 'bg-emerald-50 text-emerald-800 border-emerald-200'
                }[card.data.level];

                return (
                  <div 
                    key={card.title}
                    className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-2 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold text-slate-800 leading-tight">
                          {card.title}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${levelColors}`}>
                          {card.data.level}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-3 italic">
                        {card.desc}
                      </p>
                    </div>

                    {card.data.matchedTerms.length > 0 && (
                      <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-1">
                        {card.data.matchedTerms.map((term, tIdx) => (
                          <span key={tIdx} className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-mono">
                            {term}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section: Why Was This Case Flagged? (Explainable Summary) */}
          <div className="p-5 rounded-xl bg-blue-50/70 border border-blue-200 space-y-3">
            <h3 className="text-sm font-bold text-[#0b3b60] flex items-center gap-2">
              <Sparkles size={16} className="text-teal-600" />
              Why was this case flagged?
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {currentResult.summaryExplanation}
            </p>
            {currentResult.detailedReasons.length > 0 && (
              <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside pt-1">
                {currentResult.detailedReasons.map((reason, idx) => (
                  <li key={idx}>{reason}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Human Review Status / CTA Box */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-teal-900 to-slate-900 text-white space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-teal-300 uppercase tracking-wide flex items-center gap-1.5">
                  <UserCheck size={16} />
                  Authorized Staff Intervention
                </span>
                <h3 className="text-lg font-bold text-white">
                  {hasRequestedReview 
                    ? `Case Reference: ${createdCaseId}` 
                    : 'Submit for Authorized Human Review'}
                </h3>
                <p className="text-xs text-slate-300 max-w-lg">
                  {hasRequestedReview
                    ? 'Your case has been placed in the NHAA 14566 priority queue. An authorized officer or certified counselor will review the indicators promptly.'
                    : 'Route this AI-assisted screening report to the helpline priority queue for human case officer follow-up.'}
                </p>
              </div>

              {!hasRequestedReview ? (
                <button
                  id="request-human-review-btn"
                  onClick={handleRequestReview}
                  className="px-6 py-3 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-teal-950/40 flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 shrink-0"
                >
                  <UserCheck size={18} />
                  Request Human Review
                </button>
              ) : (
                <div className="flex flex-col sm:flex-row items-center gap-2 shrink-0">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-semibold">
                    <CheckCircle2 size={14} />
                    In Staff Queue
                  </span>
                  {/* Judge Demo Quick Leap */}
                  <button
                    onClick={() => {
                      loginStaff('demo.officer');
                      navigateTo('staff-dashboard');
                    }}
                    className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-teal-300 text-xs font-bold border border-teal-400/40 transition-colors flex items-center gap-1.5"
                  >
                    View in Staff Console (Judge Demo)
                    <ArrowRight size={14} />
                  </button>
                </div>
              )}
            </div>

            {/* Helpline Emergency Reminder */}
            <div className="pt-3 border-t border-slate-700 flex flex-wrap items-center justify-between text-xs text-slate-300 gap-2">
              <span className="flex items-center gap-1.5 text-amber-300">
                <PhoneCall size={13} />
                Need immediate phone support? Call <strong>14566</strong> anytime (24x7).
              </span>
              <span className="text-slate-400 text-[11px]">
                Complainant dignity and safety come first
              </span>
            </div>
          </div>

          {/* Bottom Navigation CTAs */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              onClick={() => navigateTo('landing')}
              className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2"
            >
              <Home size={16} />
              Return Home
            </button>

            <button
              onClick={() => navigateTo('explainability')}
              className="px-5 py-2.5 rounded-lg bg-blue-50 text-[#0b3b60] hover:bg-blue-100 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5"
            >
              <Sparkles size={15} />
              Inspect Explainable AI Rules
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
