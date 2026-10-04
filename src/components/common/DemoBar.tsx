import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Compass, 
  RotateCcw, 
  ChevronDown, 
  ChevronUp, 
  UserCheck, 
  Activity, 
  ShieldAlert, 
  Sliders, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { DEMO_SCENARIOS } from '../../services/aiEngine';

export const DemoBar: React.FC = () => {
  const { 
    currentView, 
    navigateTo, 
    loadDemoScenario, 
    resetAllDemoData, 
    currentUser,
    cases 
  } = useApp();

  const [expanded, setExpanded] = useState(true);

  return (
    <div className="fixed bottom-3 right-3 z-50 max-w-sm sm:max-w-md w-full">
      <div className="bg-slate-900/95 backdrop-blur-md text-white border border-slate-700/80 rounded-xl shadow-2xl overflow-hidden transition-all duration-200">
        {/* Header Bar */}
        <div 
          onClick={() => setExpanded(!expanded)}
          className="px-3.5 py-2.5 bg-gradient-to-r from-blue-950 via-slate-900 to-teal-950 flex items-center justify-between cursor-pointer border-b border-slate-800"
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500"></span>
            </span>
            <span className="text-xs font-bold tracking-wide uppercase text-teal-300">
              SIH 2026 Judge Demo Controls
            </span>
            <span className="text-[10px] bg-blue-900/80 text-blue-200 px-1.5 py-0.5 rounded font-mono">
              PS: SIH26093
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                resetAllDemoData();
              }}
              title="Reset mock environment to default state"
              className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors"
            >
              <RotateCcw size={13} />
            </button>
            <button className="text-slate-400 hover:text-white p-1">
              {expanded ? <ChevronDown size={15} /> : <ChevronUp size={15} />}
            </button>
          </div>
        </div>

        {/* Collapsible Content */}
        {expanded && (
          <div className="p-3 space-y-3 text-xs">
            {/* Quick Demo Scenarios (1-Click) */}
            <div>
              <div className="text-[11px] font-semibold text-slate-400 mb-1.5 flex items-center justify-between">
                <span>Quick Pre-loaded Scenarios:</span>
                <span className="text-[10px] text-teal-400 font-mono">Auto-populates</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {DEMO_SCENARIOS.map((sc) => {
                  const colorMap = {
                    LOW: 'hover:border-emerald-500 text-emerald-300',
                    MODERATE: 'hover:border-amber-500 text-amber-300',
                    HIGH: 'hover:border-orange-500 text-orange-300',
                    CRITICAL: 'hover:border-rose-500 text-rose-300'
                  }[sc.expectedLevel];

                  return (
                    <button
                      key={sc.id}
                      onClick={() => {
                        loadDemoScenario(sc.id);
                        navigateTo('assessment-text');
                      }}
                      className={`px-2 py-1.5 bg-slate-800/90 hover:bg-slate-800 rounded border border-slate-700 text-left transition-all ${colorMap}`}
                    >
                      <div className="font-semibold truncate">{sc.expectedLevel}</div>
                      <div className="text-[10px] text-slate-400 truncate">{sc.description}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Navigation Targets */}
            <div className="pt-2 border-t border-slate-800">
              <div className="text-[11px] font-semibold text-slate-400 mb-1.5">
                Direct View Switcher:
              </div>
              <div className="grid grid-cols-3 gap-1">
                <button
                  onClick={() => navigateTo('consent')}
                  className={`py-1 px-1.5 rounded text-center truncate ${
                    currentView.startsWith('assessment') || currentView === 'consent'
                      ? 'bg-teal-700 text-white font-medium'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  Victim Flow
                </button>
                <button
                  onClick={() => navigateTo('staff-dashboard')}
                  className={`py-1 px-1.5 rounded text-center truncate ${
                    currentView === 'staff-dashboard' || currentView === 'case-details'
                      ? 'bg-[#0b3b60] text-white font-medium'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  Staff Queue ({cases.length})
                </button>
                <button
                  onClick={() => navigateTo('explainability')}
                  className={`py-1 px-1.5 rounded text-center truncate ${
                    currentView === 'explainability'
                      ? 'bg-purple-800 text-white font-medium'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  Explainable AI
                </button>
              </div>
            </div>

            {/* Current State Indicator */}
            <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800/60 font-mono">
              <span>View: <strong>{currentView}</strong></span>
              <span>Staff: <strong>{currentUser ? currentUser.role : 'Guest'}</strong></span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
