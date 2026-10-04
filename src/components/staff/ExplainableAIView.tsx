import React, { useState } from 'react';
import { 
  Sparkles, 
  HelpCircle, 
  CheckCircle2, 
  Layers, 
  Scale, 
  Search, 
  ShieldAlert, 
  Sliders,
  FileText,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { 
  FEAR_KEYWORDS, 
  THREAT_KEYWORDS, 
  DISTRESS_KEYWORDS, 
  SLEEP_STRESS_KEYWORDS, 
  URGENCY_KEYWORDS,
  assessResponse,
  DEMO_SCENARIOS
} from '../../services/aiEngine';
import { RiskBadge } from '../common/RiskBadge';

export const ExplainableAIView: React.FC = () => {
  const [testText, setTestText] = useState("I am very scared because the person involved keeps threatening me. I cannot sleep properly and I feel anxious whenever I receive a call.");
  const [activeTab, setActiveTab] = useState<'interactive' | 'ontology' | 'weights'>('interactive');

  const testResult = assessResponse({ text: testText });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-teal-100 text-teal-800">
            <Sparkles size={20} />
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Explainable AI (XAI) Decision-Support Engine
          </h1>
        </div>
        <p className="text-xs text-slate-500 max-w-3xl">
          Transparent, interpretable indicator models designed for public-service helpline officers. No opaque black boxes or ungrounded conclusions.
        </p>
      </div>

      {/* Philosophy Callout */}
      <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs sm:text-sm text-[#0b3b60] flex items-start gap-3">
        <Scale size={20} className="text-teal-700 shrink-0 mt-0.5" />
        <div>
          <strong className="block text-slate-900 font-bold mb-0.5">High-Level Feature Attribution Only:</strong>
          This system explains screening results through identifiable linguistic indicators, self-reported distress scores, and perceived threat terms. It does not use generative ungrounded claims or clinical diagnostic labels.
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-1">
        <button
          onClick={() => setActiveTab('interactive')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
            activeTab === 'interactive'
              ? 'bg-[#0b3b60] text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Interactive Feature Sandbox
        </button>
        <button
          onClick={() => setActiveTab('ontology')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
            activeTab === 'ontology'
              ? 'bg-[#0b3b60] text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Screening Indicator Lexicon
        </button>
        <button
          onClick={() => setActiveTab('weights')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
            activeTab === 'weights'
              ? 'bg-[#0b3b60] text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Composite Scoring Architecture
        </button>
      </div>

      {/* Tab 1: Interactive Sandbox */}
      {activeTab === 'interactive' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Input Sandbox (6 Cols) */}
          <div className="lg:col-span-6 bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                <FileText size={16} className="text-teal-700" />
                <span>Test Input Text</span>
              </h3>
              <span className="text-[11px] text-slate-500">Live Real-Time Scoring</span>
            </div>

            <textarea
              value={testText}
              onChange={(e) => setTestText(e.target.value)}
              rows={6}
              className="w-full p-3 rounded-lg border border-slate-300 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-xs leading-relaxed outline-hidden"
              placeholder="Type or paste any test response..."
            />

            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block">
                Load Test Scenarios:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {DEMO_SCENARIOS.map((sc) => (
                  <button
                    key={sc.id}
                    onClick={() => setTestText(sc.text)}
                    className="p-2 rounded border border-slate-200 hover:bg-slate-50 text-left text-xs transition-colors"
                  >
                    <div className="font-semibold text-slate-800">{sc.expectedLevel}</div>
                    <div className="text-[10px] text-slate-500 truncate">{sc.text}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Real-time Explainability Output (6 Cols) */}
          <div className="lg:col-span-6 bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-900">
                Explainability Assessment
              </h3>
              <RiskBadge level={testResult.riskLevel} size="md" />
            </div>

            {/* Why was this flagged? */}
            <div className="p-3.5 rounded-lg bg-blue-50/70 border border-blue-200 space-y-1.5">
              <span className="text-[11px] font-bold text-[#0b3b60] uppercase tracking-wide block">
                Triage Rationale
              </span>
              <p className="text-xs text-slate-800 leading-relaxed font-medium">
                {testResult.summaryExplanation}
              </p>
            </div>

            {/* Indicator Breakdown */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block">
                Extracted Feature Signals
              </span>

              {Object.entries(testResult.indicators).map(([key, ind]) => (
                <div key={key} className="p-2.5 rounded border border-slate-200 bg-slate-50/50 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-800">{ind.name}</span>
                    {ind.matchedTerms.length > 0 && (
                      <div className="flex gap-1 mt-0.5">
                        {ind.matchedTerms.map((m, idx) => (
                          <span key={idx} className="text-[10px] bg-slate-200 text-slate-800 px-1 rounded font-mono">
                            {m}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-slate-700">{ind.level}</span>
                    <span className="text-[10px] text-slate-400 block font-mono">{ind.score}/100</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-2.5 bg-amber-50 rounded text-[11px] text-amber-900 border border-amber-200">
              <strong>Non-Diagnostic Guarantee:</strong> Indicators describe linguistic patterns, not individual psychological disorders.
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Ontology */}
      {activeTab === 'ontology' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-6">
          <h3 className="font-bold text-sm text-slate-900">
            Categorized Keyword Lexicons (Prototype Rule Library)
          </h3>
          <p className="text-xs text-slate-600">
            The screening model isolates indicators into 5 distinct groups without using uninterpretable deep embeddings.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg border border-rose-200 bg-rose-50/30 space-y-2">
              <span className="text-xs font-bold text-rose-900 uppercase">Urgency Indicators (Weight 30%)</span>
              <p className="text-[11px] text-slate-600">Expressions indicating immediate peril or rescue requests.</p>
              <div className="flex flex-wrap gap-1 pt-1">
                {URGENCY_KEYWORDS.map(k => (
                  <span key={k} className="text-[10px] bg-white border border-rose-200 text-rose-800 px-1.5 py-0.5 rounded font-mono">
                    {k}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-lg border border-orange-200 bg-orange-50/30 space-y-2">
              <span className="text-xs font-bold text-orange-900 uppercase">Threat Perception (Weight 25%)</span>
              <p className="text-[11px] text-slate-600">References to coercion, intimidation, or physical harm.</p>
              <div className="flex flex-wrap gap-1 pt-1">
                {THREAT_KEYWORDS.map(k => (
                  <span key={k} className="text-[10px] bg-white border border-orange-200 text-orange-800 px-1.5 py-0.5 rounded font-mono">
                    {k}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-lg border border-amber-200 bg-amber-50/30 space-y-2">
              <span className="text-xs font-bold text-amber-900 uppercase">Fear Expressions (Weight 20%)</span>
              <p className="text-[11px] text-slate-600">Terror, fright, panicking, or dread references.</p>
              <div className="flex flex-wrap gap-1 pt-1">
                {FEAR_KEYWORDS.map(k => (
                  <span key={k} className="text-[10px] bg-white border border-amber-200 text-amber-800 px-1.5 py-0.5 rounded font-mono">
                    {k}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-lg border border-blue-200 bg-blue-50/30 space-y-2">
              <span className="text-xs font-bold text-[#0b3b60] uppercase">Emotional Distress (Weight 15%)</span>
              <p className="text-[11px] text-slate-600">Overwhelm, crying, helplessness, and hopelessness cues.</p>
              <div className="flex flex-wrap gap-1 pt-1">
                {DISTRESS_KEYWORDS.map(k => (
                  <span key={k} className="text-[10px] bg-white border border-blue-200 text-[#0b3b60] px-1.5 py-0.5 rounded font-mono">
                    {k}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-lg border border-teal-200 bg-teal-50/30 space-y-2">
              <span className="text-xs font-bold text-teal-900 uppercase">Sleep & Stress (Weight 10%)</span>
              <p className="text-[11px] text-slate-600">Insomnia, nightmare disruption, and somatic stress cues.</p>
              <div className="flex flex-wrap gap-1 pt-1">
                {SLEEP_STRESS_KEYWORDS.map(k => (
                  <span key={k} className="text-[10px] bg-white border border-teal-200 text-teal-800 px-1.5 py-0.5 rounded font-mono">
                    {k}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Weights & Architecture */}
      {activeTab === 'weights' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-6">
          <h3 className="font-bold text-sm text-slate-900">
            Multi-Tier Decision Matrix & Safety Architecture
          </h3>

          <div className="space-y-4 text-xs text-slate-700">
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
              <div className="font-bold text-slate-900">Composite Score Equation:</div>
              <code className="block bg-slate-900 text-teal-300 p-3 rounded font-mono text-xs overflow-x-auto">
                RiskScore = (Urgency × 0.30) + (Threat × 0.25) + (Fear × 0.20) + (Distress × 0.15) + (SleepStress × 0.10)
              </code>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="p-3 bg-rose-50 border border-rose-300 rounded-lg space-y-1">
                <span className="font-bold text-rose-900">CRITICAL (Score ≥ 75)</span>
                <p className="text-[11px] text-rose-800">Direct safety alert. Supervisor notification and rapid counselor assignment triggered.</p>
              </div>
              <div className="p-3 bg-orange-50 border border-orange-300 rounded-lg space-y-1">
                <span className="font-bold text-orange-900">HIGH (Score 55 - 74)</span>
                <p className="text-[11px] text-orange-800">Prompt review queue. Officer follow-up within 15 minutes recommended.</p>
              </div>
              <div className="p-3 bg-amber-50 border border-amber-300 rounded-lg space-y-1">
                <span className="font-bold text-amber-900">MODERATE (Score 32 - 54)</span>
                <p className="text-[11px] text-amber-800">Standard counselor queue for scheduled follow-up and guidance.</p>
              </div>
              <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-lg space-y-1">
                <span className="font-bold text-emerald-900">LOW (Score &lt; 32)</span>
                <p className="text-[11px] text-emerald-800">Informational inquiries and administrative requests.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
