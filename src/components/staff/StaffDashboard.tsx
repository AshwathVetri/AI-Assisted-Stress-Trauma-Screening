import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RiskBadge } from '../common/RiskBadge';
import { 
  Inbox, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  Search, 
  Filter, 
  ArrowUpDown, 
  Eye, 
  ExternalLink, 
  ShieldAlert, 
  Sparkles,
  FileText,
  Mic,
  ListChecks,
  Plus
} from 'lucide-react';
import type { RiskLevel, CaseStatus } from '../../types';

export const StaffDashboard: React.FC = () => {
  const { cases, selectCaseById, currentUser, navigateTo } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterLevel, setFilterLevel] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [sortField, setSortField] = useState<'time' | 'risk'>('time');

  // KPI Calculations
  const totalCount = 124 + cases.length;
  const pendingCount = cases.filter(c => c.status === 'Pending Review').length + 20;
  const highCount = cases.filter(c => c.screeningLevel === 'HIGH').length + 10;
  const criticalCount = cases.filter(c => c.screeningLevel === 'CRITICAL').length + 3;
  const avgScreeningTime = '2m 14s';

  // Filter & Search Logic
  const filteredCases = cases.filter(c => {
    // Search query
    const matchesSearch = 
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.keyIndicators.some(k => k.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (c.textContent && c.textContent.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (c.voiceTranscript && c.voiceTranscript.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    // Risk level filter
    if (filterLevel !== 'All' && c.screeningLevel !== filterLevel) {
      return false;
    }

    // Status filter
    if (filterStatus === 'Pending' && c.status !== 'Pending Review') return false;
    if (filterStatus === 'Reviewed' && c.status !== 'Reviewed') return false;
    if (filterStatus !== 'All' && filterStatus !== 'Pending' && filterStatus !== 'Reviewed' && c.status !== filterStatus) {
      return false;
    }

    return true;
  });

  // Sorting
  const riskWeight: Record<RiskLevel, number> = {
    CRITICAL: 4,
    HIGH: 3,
    MODERATE: 2,
    LOW: 1
  };

  const sortedCases = [...filteredCases].sort((a, b) => {
    if (sortField === 'risk') {
      return riskWeight[b.screeningLevel] - riskWeight[a.screeningLevel];
    }
    // Time based: newest first
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="space-y-6">
      {/* Page Title & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Priority Triage Queue & Helpline Intake
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time multimodal screening stream for National Anti-Ragging & Atrocities Helpline (14566).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateTo('consent')}
            className="px-3 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors"
          >
            <Plus size={14} />
            <span>Simulate New Victim Case</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Banner */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
        {/* KPI 1 */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
            Total Cases
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">
            {totalCount}
          </div>
          <div className="text-[10px] text-slate-400">
            Helpline + Portal
          </div>
        </div>

        {/* KPI 2 */}
        <div className="p-4 rounded-xl bg-white border border-amber-200 shadow-2xs space-y-1 bg-amber-50/20">
          <div className="text-[11px] font-bold text-amber-800 uppercase tracking-wide">
            Pending Review
          </div>
          <div className="text-2xl font-extrabold text-amber-700 font-mono">
            {pendingCount}
          </div>
          <div className="text-[10px] text-amber-800/80">
            Awaiting Officer Review
          </div>
        </div>

        {/* KPI 3 */}
        <div className="p-4 rounded-xl bg-white border border-orange-200 shadow-2xs space-y-1 bg-orange-50/20">
          <div className="text-[11px] font-bold text-orange-900 uppercase tracking-wide">
            High Priority
          </div>
          <div className="text-2xl font-extrabold text-orange-700 font-mono">
            {highCount}
          </div>
          <div className="text-[10px] text-orange-800/80">
            Prompt Attention Queue
          </div>
        </div>

        {/* KPI 4 */}
        <div className="p-4 rounded-xl bg-white border border-rose-200 shadow-2xs space-y-1 bg-rose-50/30">
          <div className="text-[11px] font-bold text-rose-900 uppercase tracking-wide flex items-center justify-between">
            <span>Critical</span>
            <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />
          </div>
          <div className="text-2xl font-extrabold text-rose-700 font-mono">
            {criticalCount}
          </div>
          <div className="text-[10px] text-rose-800/80">
            Urgent Triage Required
          </div>
        </div>

        {/* KPI 5 */}
        <div className="col-span-2 lg:col-span-1 p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
            Avg Screening Time
          </div>
          <div className="text-2xl font-extrabold text-teal-700 font-mono">
            {avgScreeningTime}
          </div>
          <div className="text-[10px] text-teal-800">
            Automated Pre-Screening
          </div>
        </div>
      </div>

      {/* Priority Queue Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden space-y-4 p-4 sm:p-6">
        {/* Controls: Search, Filters, Sort */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-2 border-b border-slate-100">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Case ID, indicator or text..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-hidden"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-400 font-medium mr-1 flex items-center gap-1">
              <Filter size={12} /> Level:
            </span>
            {['All', 'Critical', 'High', 'Moderate', 'Low'].map((lvl) => {
              const active = filterLevel.toLowerCase() === lvl.toLowerCase();
              return (
                <button
                  key={lvl}
                  onClick={() => setFilterLevel(lvl === 'All' ? 'All' : lvl.toUpperCase())}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                    active
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  {lvl}
                </button>
              );
            })}

            <div className="h-4 w-px bg-slate-200 mx-1" />

            <span className="text-slate-400 font-medium mr-1">Status:</span>
            {['All', 'Pending', 'Reviewed'].map((st) => {
              const active = filterStatus === st;
              return (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                    active
                      ? 'bg-teal-700 text-white font-semibold'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  {st}
                </button>
              );
            })}

            <div className="h-4 w-px bg-slate-200 mx-1" />

            {/* Sort Toggle */}
            <button
              onClick={() => setSortField(sortField === 'time' ? 'risk' : 'time')}
              className="px-2.5 py-1 rounded-md border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-medium flex items-center gap-1 transition-colors"
            >
              <ArrowUpDown size={12} />
              Sort: {sortField === 'time' ? 'Recent' : 'Urgency'}
            </button>
          </div>
        </div>

        {/* Priority Queue Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700 border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/75 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-3">Case ID</th>
                <th className="py-3 px-3">Time</th>
                <th className="py-3 px-3">Input Modality</th>
                <th className="py-3 px-3">Screening Level</th>
                <th className="py-3 px-3">Key Indicators</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sortedCases.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No cases match the selected search and filter criteria.
                  </td>
                </tr>
              ) : (
                sortedCases.map((c) => {
                  const statusColors = {
                    'Pending Review': 'bg-amber-50 text-amber-800 border-amber-300',
                    'Under Review': 'bg-blue-50 text-blue-800 border-blue-300',
                    'Reviewed': 'bg-emerald-50 text-emerald-800 border-emerald-300',
                    'Escalated': 'bg-rose-50 text-rose-900 border-rose-300',
                    'Closed': 'bg-slate-100 text-slate-600 border-slate-300'
                  }[c.status];

                  return (
                    <tr 
                      key={c.id} 
                      className={`hover:bg-blue-50/40 transition-colors ${
                        c.isNew ? 'bg-teal-50/30' : ''
                      }`}
                    >
                      {/* Case ID */}
                      <td className="py-3.5 px-3 font-bold font-mono text-slate-900">
                        <div className="flex items-center gap-1.5">
                          <span>{c.id}</span>
                          {c.isNew && (
                            <span className="bg-teal-600 text-white text-[9px] font-sans font-bold px-1.5 py-0.2 rounded uppercase">
                              NEW
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Time */}
                      <td className="py-3.5 px-3 text-slate-500 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <Clock size={12} className="text-slate-400" />
                          <span>{c.timestamp}</span>
                        </div>
                      </td>

                      {/* Input Modality */}
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-1">
                          {c.inputMethods.includes('TEXT') && (
                            <span title="Text submission" className="p-1 rounded bg-blue-100 text-[#0b3b60]">
                              <FileText size={12} />
                            </span>
                          )}
                          {c.inputMethods.includes('VOICE') && (
                            <span title="Voice recording" className="p-1 rounded bg-teal-100 text-teal-800">
                              <Mic size={12} />
                            </span>
                          )}
                          {c.inputMethods.includes('QUESTIONNAIRE') && (
                            <span title="Screening questionnaire" className="p-1 rounded bg-amber-100 text-amber-800">
                              <ListChecks size={12} />
                            </span>
                          )}
                          <span className="text-[11px] text-slate-600 ml-1">
                            {c.inputMethods.join(' + ')}
                          </span>
                        </div>
                      </td>

                      {/* Screening Level */}
                      <td className="py-3.5 px-3">
                        <RiskBadge level={c.screeningLevel} size="sm" />
                      </td>

                      {/* Key Indicators */}
                      <td className="py-3.5 px-3 max-w-xs">
                        <div className="flex flex-wrap gap-1">
                          {c.keyIndicators.slice(0, 3).map((ind, i) => (
                            <span 
                              key={i}
                              className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded border border-slate-200"
                            >
                              {ind}
                            </span>
                          ))}
                          {c.keyIndicators.length > 3 && (
                            <span className="text-[10px] text-slate-400 font-mono">
                              +{c.keyIndicators.length - 3}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-3">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold border ${statusColors}`}>
                          {c.status}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-3 text-right">
                        <button
                          onClick={() => selectCaseById(c.id)}
                          className="px-3 py-1.5 rounded-md bg-[#0b3b60] hover:bg-[#07253d] text-white text-xs font-semibold inline-flex items-center gap-1 shadow-2xs transition-colors cursor-pointer"
                        >
                          <Eye size={13} />
                          <span>{c.status === 'Pending Review' ? 'Review' : 'Open'}</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Queue Footer */}
        <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <span>
            Displaying <strong>{sortedCases.length}</strong> active cases in triage queue
          </span>
          <span className="text-[11px] text-amber-700 font-medium">
            AI Screening is decision-support only. Final intervention determined by authorized staff.
          </span>
        </div>
      </div>
    </div>
  );
};
