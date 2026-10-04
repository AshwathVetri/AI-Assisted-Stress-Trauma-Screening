import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Info,
  Calendar,
  Layers
} from 'lucide-react';

export const AnalyticsDashboard: React.FC = () => {
  const { cases } = useApp();

  // Metrics calculation incorporating dynamic cases
  const total = 124 + cases.length;
  const critical = cases.filter(c => c.screeningLevel === 'CRITICAL').length + 7;
  const high = cases.filter(c => c.screeningLevel === 'HIGH').length + 28;
  const moderate = cases.filter(c => c.screeningLevel === 'MODERATE').length + 54;
  const low = cases.filter(c => c.screeningLevel === 'LOW').length + 35;

  const textCount = cases.filter(c => c.inputMethods.includes('TEXT')).length + 62;
  const voiceCount = cases.filter(c => c.inputMethods.includes('VOICE')).length + 41;
  const questCount = cases.filter(c => c.inputMethods.includes('QUESTIONNAIRE')).length + 52;
  const multiCount = cases.filter(c => c.inputMethods.length > 1).length + 31;

  const hourlyTrends = [
    { hour: '08:00 AM', count: 12, critical: 1 },
    { hour: '10:00 AM', count: 26, critical: 3 },
    { hour: '12:00 PM', count: 34, critical: 2 },
    { hour: '02:00 PM', count: 21, critical: 1 },
    { hour: '04:00 PM', count: 18, critical: 0 },
    { hour: '06:00 PM', count: 13, critical: 1 }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header with Prominent Demo Data Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Helpline Screening Analytics & Trends
            </h1>
            <span className="bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full border border-amber-300 uppercase tracking-wider">
              DEMO DATA
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Operational triage throughput and modality distributions for NHAA 14566.
          </p>
        </div>

        <div className="text-xs font-mono bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 flex items-center gap-2">
          <Calendar size={13} className="text-slate-400" />
          <span>Reporting Period: Today (Live Shift)</span>
        </div>
      </div>

      {/* Prominent Demo Watermark Alert */}
      <div className="p-3.5 bg-amber-50/90 border border-amber-300 rounded-xl text-xs text-amber-950 flex items-start gap-2.5 shadow-2xs">
        <Info size={16} className="text-amber-700 shrink-0 mt-0.5" />
        <div>
          <strong>Demo Data Notice:</strong> All figures, charts, and metrics shown on this page are simulated prototype data for the Smart India Hackathon 2026 demonstration. They do not reflect confidential NHAA helpline records.
        </div>
      </div>

      {/* Top Level Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase">Total Screenings</span>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">{total}</div>
          <span className="text-[10px] text-teal-700 font-medium">↑ 14% vs yesterday</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase">Avg Review Speed</span>
          <div className="text-2xl font-extrabold text-[#0b3b60] font-mono">1m 48s</div>
          <span className="text-[10px] text-slate-500">From submission to triage</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase">Critical Flag Rate</span>
          <div className="text-2xl font-extrabold text-rose-700 font-mono">
            {Math.round((critical / total) * 100)}%
          </div>
          <span className="text-[10px] text-rose-800">Immediately escalated</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase">Counselor Interventions</span>
          <div className="text-2xl font-extrabold text-teal-700 font-mono">42</div>
          <span className="text-[10px] text-teal-800">Assigned & active</span>
        </div>
      </div>

      {/* Chart Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Cases by Screening Level */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <PieChart size={16} className="text-[#0b3b60]" />
              <span>Cases by Screening Level</span>
            </h3>
            <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
              Demo Data
            </span>
          </div>

          <div className="space-y-3">
            {/* Critical */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-rose-800">Critical Priority</span>
                <span className="font-mono text-slate-700">{critical} cases ({Math.round((critical / total) * 100)}%)</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div 
                  style={{ width: `${(critical / total) * 100}%` }} 
                  className="bg-rose-600 h-full rounded-full transition-all"
                />
              </div>
            </div>

            {/* High */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-orange-900">High Priority</span>
                <span className="font-mono text-slate-700">{high} cases ({Math.round((high / total) * 100)}%)</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div 
                  style={{ width: `${(high / total) * 100}%` }} 
                  className="bg-orange-500 h-full rounded-full transition-all"
                />
              </div>
            </div>

            {/* Moderate */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-amber-800">Moderate Priority</span>
                <span className="font-mono text-slate-700">{moderate} cases ({Math.round((moderate / total) * 100)}%)</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div 
                  style={{ width: `${(moderate / total) * 100}%` }} 
                  className="bg-amber-500 h-full rounded-full transition-all"
                />
              </div>
            </div>

            {/* Low */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-emerald-800">Low Priority</span>
                <span className="font-mono text-slate-700">{low} cases ({Math.round((low / total) * 100)}%)</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div 
                  style={{ width: `${(low / total) * 100}%` }} 
                  className="bg-emerald-500 h-full rounded-full transition-all"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 text-[11px] text-slate-500 italic">
            Automated screening sorts cases for immediate human response; human staff validate all levels.
          </div>
        </div>

        {/* Chart 2: Cases by Input Modality */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Layers size={16} className="text-teal-700" />
              <span>Input Modality Distribution</span>
            </h3>
            <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
              Demo Data
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-lg bg-blue-50 border border-blue-200 space-y-1">
              <span className="text-[11px] font-bold text-[#0b3b60] uppercase block">Written Text</span>
              <div className="text-xl font-extrabold text-[#0b3b60] font-mono">{textCount}</div>
              <span className="text-[10px] text-slate-600">Typed narratives</span>
            </div>

            <div className="p-3.5 rounded-lg bg-teal-50 border border-teal-200 space-y-1">
              <span className="text-[11px] font-bold text-teal-800 uppercase block">Voice Audio</span>
              <div className="text-xl font-extrabold text-teal-800 font-mono">{voiceCount}</div>
              <span className="text-[10px] text-slate-600">Transcribed memos</span>
            </div>

            <div className="p-3.5 rounded-lg bg-amber-50 border border-amber-200 space-y-1">
              <span className="text-[11px] font-bold text-amber-900 uppercase block">Questionnaire</span>
              <div className="text-xl font-extrabold text-amber-900 font-mono">{questCount}</div>
              <span className="text-[10px] text-slate-600">Structured 7-item</span>
            </div>

            <div className="p-3.5 rounded-lg bg-purple-50 border border-purple-200 space-y-1">
              <span className="text-[11px] font-bold text-purple-900 uppercase block">Multimodal</span>
              <div className="text-xl font-extrabold text-purple-900 font-mono">{multiCount}</div>
              <span className="text-[10px] text-slate-600">Text + Voice + Form</span>
            </div>
          </div>

          <div className="pt-2 text-[11px] text-slate-500">
            Multimodal combinations yield highest confidence score correlations in test scenarios.
          </div>
        </div>
      </div>

      {/* Hourly Call & Triage Volume Chart */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <TrendingUp size={16} className="text-[#0b3b60]" />
            <span>Shift Triage Volume by Hour</span>
          </h3>
          <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
            Live Stream (Demo)
          </span>
        </div>

        <div className="grid grid-cols-6 gap-2 sm:gap-4 text-center items-end pt-4 pb-2">
          {hourlyTrends.map((trend) => {
            const maxVal = 40;
            const barHeight = Math.round((trend.count / maxVal) * 120);

            return (
              <div key={trend.hour} className="space-y-2 flex flex-col items-center">
                <span className="text-[11px] font-bold font-mono text-slate-700">
                  {trend.count}
                </span>
                <div className="w-full max-w-[36px] bg-slate-100 rounded-t-md flex flex-col justify-end overflow-hidden h-32">
                  <div 
                    style={{ height: `${barHeight}px` }} 
                    className="bg-[#0b3b60] hover:bg-teal-600 transition-colors w-full rounded-t-md relative group"
                  >
                    {trend.critical > 0 && (
                      <div className="w-full h-2.5 bg-rose-500" title={`${trend.critical} critical cases`} />
                    )}
                  </div>
                </div>
                <span className="text-[10px] text-slate-500 block truncate w-full">
                  {trend.hour.split(' ')[0]}
                </span>
              </div>
            );
          })}
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-xs bg-[#0b3b60]" /> Total Cases
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-xs bg-rose-500" /> Critical Sub-tier
            </span>
          </div>
          <span>Peak intake observed around 12:00 PM</span>
        </div>
      </div>
    </div>
  );
};
