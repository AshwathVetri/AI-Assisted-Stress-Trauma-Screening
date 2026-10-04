import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  FileCheck, 
  FileText, 
  UserCheck, 
  Eye, 
  AlertCircle, 
  Clock, 
  Search,
  Database,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export const SecurityPrivacyView: React.FC = () => {
  const { auditLogs } = useApp();
  const [logSearch, setLogSearch] = useState('');

  const filteredLogs = auditLogs.filter(log => 
    log.actor.toLowerCase().includes(logSearch.toLowerCase()) ||
    log.action.toLowerCase().includes(logSearch.toLowerCase()) ||
    log.details.toLowerCase().includes(logSearch.toLowerCase()) ||
    (log.caseId && log.caseId.toLowerCase().includes(logSearch.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-100 text-[#0b3b60]">
            <Lock size={20} />
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Security, Privacy & DPDPA Compliance Architecture
          </h1>
        </div>
        <p className="text-xs text-slate-500 max-w-3xl">
          Designed in adherence with India's Digital Personal Data Protection Act (DPDPA 2023) and Government of India cybersecurity guidelines.
        </p>
      </div>

      {/* Prominent Demo & Authorized Personnel Alert */}
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-950 space-y-2">
        <div className="flex items-center gap-2 font-bold text-amber-900">
          <AlertCircle size={17} className="text-amber-700" />
          <span>Notice on Sensitive Data & Demo Environment</span>
        </div>
        <p className="leading-relaxed">
          Sensitive information should only be accessed by authorized personnel. This prototype uses <strong>simulated/demo data</strong> and should not be used with real victim information during hackathon demonstrations.
        </p>
      </div>

      {/* 8 Compliance Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Consent */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
            <FileCheck size={18} />
          </div>
          <h3 className="font-bold text-xs uppercase tracking-wide text-slate-900">1. Granular Consent</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Explicit, freely given consent required prior to text, audio, or questionnaire collection. Complainants may pause at any time.
          </p>
        </div>

        {/* 2. Authentication */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#0b3b60] flex items-center justify-center font-bold">
            <Key size={18} />
          </div>
          <h3 className="font-bold text-xs uppercase tracking-wide text-slate-900">2. Authentication</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Authorized personnel login with multi-factor tokens and session timeouts. Demo environment uses pre-configured roles.
          </p>
        </div>

        {/* 3. Role-Based Access Control */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
            <UserCheck size={18} />
          </div>
          <h3 className="font-bold text-xs uppercase tracking-wide text-slate-900">3. RBAC Model</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Separation of duties: Case Officers handle intake, Counselors handle psychological notes, Supervisors oversee escalations.
          </p>
        </div>

        {/* 4. Encryption */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <Lock size={18} />
          </div>
          <h3 className="font-bold text-xs uppercase tracking-wide text-slate-900">4. Encryption</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            TLS 1.3 in-transit and AES-256 at-rest encryption standards for all helpline intake audio and transcripts.
          </p>
        </div>

        {/* 5. Secure Storage */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-slate-200 text-slate-800 flex items-center justify-center font-bold">
            <Database size={18} />
          </div>
          <h3 className="font-bold text-xs uppercase tracking-wide text-slate-900">5. Secure Storage</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Data hosted within MeitY-empanelled national cloud infrastructure adhering to Indian data localization mandates.
          </p>
        </div>

        {/* 6. Audit Logging */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
            <Clock size={18} />
          </div>
          <h3 className="font-bold text-xs uppercase tracking-wide text-slate-900">6. Audit Logging</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every view, status update, case note, and escalation is stamped with immutable cryptographic signatures.
          </p>
        </div>

        {/* 7. Data Minimization */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
            <ShieldCheck size={18} />
          </div>
          <h3 className="font-bold text-xs uppercase tracking-wide text-slate-900">7. Data Minimization</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Screening extracts indicators without requiring unnecessary personally identifiable attributes (PII).
          </p>
        </div>

        {/* 8. Authorized Personnel */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-800 flex items-center justify-center font-bold">
            <AlertTriangle size={18} />
          </div>
          <h3 className="font-bold text-xs uppercase tracking-wide text-slate-900">8. Authorized Personnel</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Strict human gatekeeping: AI serves as a prioritizer; certified helpline personnel maintain full operational accountability.
          </p>
        </div>
      </div>

      {/* Live Immutable Audit Ledger Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Clock size={16} className="text-[#0b3b60]" />
              <span>Live Audit Trail Ledger</span>
            </h3>
            <span className="text-[11px] text-slate-500">
              Tamper-evident log of all triage decisions and system interactions.
            </span>
          </div>

          <div className="relative max-w-xs w-full">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={logSearch}
              onChange={(e) => setLogSearch(e.target.value)}
              placeholder="Search audit trail..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded border border-slate-200 focus:border-teal-600 outline-hidden"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3">Actor & Role</th>
                <th className="py-2.5 px-3">Case ID</th>
                <th className="py-2.5 px-3">Action Event</th>
                <th className="py-2.5 px-3">Details / Audit Payload</th>
                <th className="py-2.5 px-3">Severity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map((log) => {
                const sevColor = {
                  ALERT: 'bg-rose-100 text-rose-800 border-rose-200',
                  WARNING: 'bg-amber-100 text-amber-800 border-amber-200',
                  INFO: 'bg-blue-100 text-blue-800 border-blue-200'
                }[log.severity];

                return (
                  <tr key={log.id} className="hover:bg-slate-50 font-mono text-[11px]">
                    <td className="py-2 px-3 text-slate-500 whitespace-nowrap">{log.timestamp}</td>
                    <td className="py-2 px-3 text-slate-900 font-sans font-semibold">
                      {log.actor} <span className="text-slate-400 font-normal">({log.role})</span>
                    </td>
                    <td className="py-2 px-3 text-teal-700 font-bold">{log.caseId || '—'}</td>
                    <td className="py-2 px-3 text-slate-800 font-semibold">{log.action}</td>
                    <td className="py-2 px-3 text-slate-600 font-sans">{log.details}</td>
                    <td className="py-2 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${sevColor}`}>
                        {log.severity}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
