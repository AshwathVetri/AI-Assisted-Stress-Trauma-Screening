import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RiskBadge } from '../common/RiskBadge';
import { ConfirmationModal } from '../common/ConfirmationModal';
import { 
  ArrowLeft, 
  Clock, 
  UserCheck, 
  AlertTriangle, 
  ShieldCheck, 
  Send, 
  FileText, 
  Mic, 
  ListChecks, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Sparkles,
  UserPlus,
  MessageSquare,
  Volume2
} from 'lucide-react';
import type { CaseStatus } from '../../types';

export const CaseDetails: React.FC = () => {
  const { 
    selectedCase, 
    navigateTo, 
    updateCaseStatus, 
    escalateCase, 
    assignCase, 
    addCaseNote,
    currentUser 
  } = useApp();

  const [newNote, setNewNote] = useState('');
  
  // Modals state
  const [showEscalateModal, setShowEscalateModal] = useState(false);
  const [escalateReason, setEscalateReason] = useState('Critical safety indicators and imminent threat detected in complainant submission.');
  
  const [showCloseModal, setShowCloseModal] = useState(false);
  const [closeReason, setCloseReason] = useState('Resolved after authorized consultation and guidance support provided.');
  
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assignedStaff, setAssignedStaff] = useState('Dr. Ananya Sharma (Counselor)');

  if (!selectedCase) {
    return (
      <div className="py-20 text-center max-w-md mx-auto space-y-4">
        <p className="text-slate-600 text-sm">Case not found.</p>
        <button
          onClick={() => navigateTo('staff-dashboard')}
          className="px-5 py-2 bg-[#0b3b60] text-white rounded-lg text-xs font-semibold"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    addCaseNote(selectedCase.id, newNote);
    setNewNote('');
  };

  const handleConfirmEscalate = () => {
    escalateCase(selectedCase.id, escalateReason);
    setShowEscalateModal(false);
  };

  const handleConfirmClose = () => {
    updateCaseStatus(selectedCase.id, 'Closed', closeReason);
    setShowCloseModal(false);
  };

  const handleConfirmAssign = () => {
    assignCase(selectedCase.id, assignedStaff, assignedStaff.includes('Counselor') ? 'Counselor' : 'Case Officer');
    setShowAssignModal(false);
  };

  const ind = selectedCase.assessmentResult.indicators;

  const indicatorCards = [
    { name: 'Fear', level: ind.fear.level, reason: ind.fear.evidenceText, score: ind.fear.score },
    { name: 'Threat perception', level: ind.threat.level, reason: ind.threat.evidenceText, score: ind.threat.score },
    { name: 'Emotional distress', level: ind.distress.level, reason: ind.distress.evidenceText, score: ind.distress.score },
    { name: 'Stress indicators', level: ind.sleepStress.level, reason: ind.sleepStress.evidenceText, score: ind.sleepStress.score },
    { name: 'Urgency indicators', level: ind.urgency.level, reason: ind.urgency.evidenceText, score: ind.urgency.score }
  ];

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('staff-dashboard')}
            className="p-2 rounded-lg border border-slate-300 hover:bg-slate-200 text-slate-700 transition-colors"
            title="Back to queue"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-mono">
                {selectedCase.id}
              </h1>
              <RiskBadge level={selectedCase.screeningLevel} size="md" />
              <span className="text-xs px-2.5 py-0.5 rounded-full border border-slate-300 bg-slate-100 text-slate-700 font-medium">
                {selectedCase.status}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Intake Time: {selectedCase.timestamp} • Sources: {selectedCase.inputMethods.join(' + ')}
            </p>
          </div>
        </div>

        {/* Quick Review Status Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {selectedCase.status !== 'Reviewed' && (
            <button
              id="mark-reviewed-btn"
              onClick={() => updateCaseStatus(selectedCase.id, 'Reviewed', 'Marked reviewed by authorized officer after validating indicators.')}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
            >
              <CheckCircle2 size={14} />
              Mark Reviewed
            </button>
          )}

          {selectedCase.status !== 'Escalated' && (
            <button
              id="escalate-btn"
              onClick={() => setShowEscalateModal(true)}
              className="px-4 py-2 bg-rose-700 hover:bg-rose-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
            >
              <AlertTriangle size={14} />
              Escalate
            </button>
          )}

          <button
            id="assign-counselor-btn"
            onClick={() => setShowAssignModal(true)}
            className="px-3.5 py-2 bg-slate-900 hover:bg-[#0b3b60] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
          >
            <UserPlus size={14} />
            Assign Case
          </button>
        </div>
      </div>

      {/* Mandatory Human Review Banner */}
      <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-950 flex items-start gap-2.5 shadow-2xs">
        <AlertTriangle size={17} className="text-amber-700 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold">Human Review Required:</strong> Final assessment and intervention decisions remain strictly with authorized personnel. AI screening provides decision-support indicators and does not diagnose clinical conditions.
        </div>
      </div>

      {/* Dual Column Layout: AI Assessment (Left) vs Human Review & Case Notes (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: AI Screening Breakdown (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* AI Screening Summary */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-teal-600" />
                <h3 className="font-bold text-sm text-slate-900">
                  AI Screening Summary
                </h3>
              </div>
              <span className="text-[11px] font-mono text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded">
                Confidence: {selectedCase.confidenceScore}% (Prototype estimate)
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-lg border border-slate-200">
              {selectedCase.assessmentResult.summaryExplanation}
            </p>

            {selectedCase.assessmentResult.detailedReasons.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Flagged Indicators Rationale
                </span>
                <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                  {selectedCase.assessmentResult.detailedReasons.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Detected Indicators Cards */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
            <h3 className="font-bold text-sm text-slate-900 flex items-center justify-between">
              <span>Detected Indicators</span>
              <span className="text-xs font-normal text-slate-500">Non-Clinical Cues</span>
            </h3>

            <div className="space-y-3">
              {indicatorCards.map((card) => {
                const badgeColor = {
                  Severe: 'bg-rose-100 text-rose-800 border-rose-300',
                  High: 'bg-orange-100 text-orange-900 border-orange-300',
                  Moderate: 'bg-amber-100 text-amber-800 border-amber-300',
                  Low: 'bg-emerald-100 text-emerald-800 border-emerald-300'
                }[card.level];

                return (
                  <div 
                    key={card.name}
                    className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/60 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-800">
                        {card.name}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeColor}`}>
                        {card.level.toUpperCase()}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 italic">
                      {card.reason}
                    </p>

                    {/* Score Bar */}
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-1">
                      <div 
                        style={{ width: `${card.score}%` }} 
                        className={`h-full rounded-full ${
                          card.score >= 75 ? 'bg-rose-500' :
                          card.score >= 50 ? 'bg-orange-500' :
                          card.score >= 30 ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Complainant Multimodal Submissions Details */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
            <h3 className="font-bold text-sm text-slate-900">
              Submitted Input Sources
            </h3>

            {/* Text Payload */}
            {selectedCase.textContent && (
              <div className="p-3.5 rounded-lg bg-blue-50/50 border border-blue-200/80 space-y-1">
                <div className="text-[11px] font-bold text-[#0b3b60] uppercase flex items-center gap-1.5">
                  <FileText size={13} />
                  <span>Written Narrative</span>
                </div>
                <p className="text-xs text-slate-800 leading-relaxed italic">
                  "{selectedCase.textContent}"
                </p>
              </div>
            )}

            {/* Voice Transcript Payload */}
            {selectedCase.voiceTranscript && (
              <div className="p-3.5 rounded-lg bg-teal-50/50 border border-teal-200/80 space-y-1.5">
                <div className="text-[11px] font-bold text-teal-800 uppercase flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Mic size={13} /> Spoken Audio Transcript
                  </span>
                  <span className="text-[10px] text-teal-700 font-mono">
                    Duration: {selectedCase.audioDurationSeconds || 24}s
                  </span>
                </div>
                <p className="text-xs text-slate-800 leading-relaxed italic">
                  "{selectedCase.voiceTranscript}"
                </p>
              </div>
            )}

            {/* Questionnaire Payload */}
            {selectedCase.questionnaireAnswers && (
              <div className="p-3.5 rounded-lg bg-amber-50/40 border border-amber-200/80 space-y-2">
                <div className="text-[11px] font-bold text-amber-900 uppercase flex items-center gap-1.5">
                  <ListChecks size={13} />
                  <span>Structured Questionnaire Answers</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 bg-white rounded border border-amber-100">
                    <span className="text-slate-500 block text-[10px]">Safety Perception:</span>
                    <strong className="text-slate-800">{selectedCase.questionnaireAnswers.safety || 'Not reported'}</strong>
                  </div>
                  <div className="p-2 bg-white rounded border border-amber-100">
                    <span className="text-slate-500 block text-[10px]">Self-Reported Distress:</span>
                    <strong className="text-slate-800">{selectedCase.questionnaireAnswers.distress || 'Not reported'}</strong>
                  </div>
                  <div className="p-2 bg-white rounded border border-amber-100">
                    <span className="text-slate-500 block text-[10px]">Persistent Fear:</span>
                    <strong className="text-slate-800">{selectedCase.questionnaireAnswers.persistentFear || 'No'}</strong>
                  </div>
                  <div className="p-2 bg-white rounded border border-amber-100">
                    <span className="text-slate-500 block text-[10px]">Immediate Help Needed:</span>
                    <strong className="text-slate-800">{selectedCase.questionnaireAnswers.immediateHelp || 'No'}</strong>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Human Review Actions & Case Notes (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Action Decision Panel */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                <UserCheck size={16} className="text-teal-700" />
                <span>Authorized Review Panel</span>
              </h3>
              <span className="text-xs text-slate-500">
                Staff: {currentUser?.name.split(' ')[0]}
              </span>
            </div>

            <div className="space-y-2">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                Case Assignment
              </div>
              <div className="p-3 bg-slate-50 rounded-lg text-xs space-y-1 border border-slate-200">
                <div>Officer: <strong>{selectedCase.assignedOfficer || 'Unassigned'}</strong></div>
                <div>Counselor: <strong>{selectedCase.assignedCounselor || 'Not assigned'}</strong></div>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                Official Actions
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => updateCaseStatus(selectedCase.id, 'Reviewed', 'Marked Reviewed')}
                  className="p-2.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <CheckCircle2 size={14} />
                  Mark Reviewed
                </button>

                <button
                  onClick={() => setShowEscalateModal(true)}
                  className="p-2.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-300 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <AlertTriangle size={14} />
                  Escalate
                </button>

                <button
                  onClick={() => setShowAssignModal(true)}
                  className="p-2.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#0b3b60] border border-blue-300 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <UserPlus size={14} />
                  Assign
                </button>

                <button
                  onClick={() => {
                    addCaseNote(selectedCase.id, 'Official clarification requested from complainant regarding incident details.');
                  }}
                  className="p-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <HelpCircle size={14} />
                  Request Info
                </button>
              </div>

              <button
                onClick={() => setShowCloseModal(true)}
                className="w-full mt-2 py-2 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-600 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <XCircle size={14} />
                Close Case
              </button>
            </div>
          </div>

          {/* Case Notes & Audit Timeline */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
              <MessageSquare size={16} className="text-[#0b3b60]" />
              <span>Case Notes & Action Trail</span>
            </h3>

            {/* Add Note Form */}
            <form onSubmit={handleAddNote} className="space-y-2">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add authorized case note or investigation update..."
                rows={3}
                className="w-full p-2.5 rounded-lg border border-slate-300 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-xs outline-hidden"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!newNote.trim()}
                  className="px-4 py-1.5 bg-[#0b3b60] hover:bg-[#07253d] text-white rounded-lg text-xs font-semibold flex items-center gap-1 shadow-2xs transition-colors disabled:opacity-40"
                >
                  <Send size={12} />
                  Add Case Note
                </button>
              </div>
            </form>

            {/* Notes Timeline List */}
            <div className="space-y-3 pt-2 max-h-72 overflow-y-auto pr-1">
              {selectedCase.notes.map((note) => (
                <div key={note.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-500 text-[10px]">
                    <span className="font-bold text-slate-800">{note.author} ({note.role})</span>
                    <span>{note.timestamp}</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    {note.content}
                  </p>
                  {note.actionTaken && (
                    <div className="text-[10px] font-semibold text-teal-800 bg-teal-50 px-1.5 py-0.5 rounded inline-block mt-1">
                      Action: {note.actionTaken}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal for Escalate */}
      <ConfirmationModal
        isOpen={showEscalateModal}
        title="Confirm Emergency Escalation"
        message={`Are you sure you want to escalate Case ${selectedCase.id} to the Emergency Rapid Response Team?`}
        confirmLabel="Escalate Immediately"
        isDestructive={true}
        onConfirm={handleConfirmEscalate}
        onCancel={() => setShowEscalateModal(false)}
      >
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-700 block">
            Escalation Reason:
          </label>
          <textarea
            value={escalateReason}
            onChange={(e) => setEscalateReason(e.target.value)}
            rows={2}
            className="w-full p-2 border border-slate-300 rounded text-xs"
          />
        </div>
      </ConfirmationModal>

      {/* Confirmation Modal for Close Case */}
      <ConfirmationModal
        isOpen={showCloseModal}
        title="Close Case Confirmation"
        message={`You are about to close Case ${selectedCase.id}. Confirm that all necessary support protocols have been satisfied.`}
        confirmLabel="Confirm Closure"
        onConfirm={handleConfirmClose}
        onCancel={() => setShowCloseModal(false)}
      >
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-700 block">
            Resolution Summary:
          </label>
          <textarea
            value={closeReason}
            onChange={(e) => setCloseReason(e.target.value)}
            rows={2}
            className="w-full p-2 border border-slate-300 rounded text-xs"
          />
        </div>
      </ConfirmationModal>

      {/* Assignment Modal */}
      <ConfirmationModal
        isOpen={showAssignModal}
        title="Assign Case to Personnel"
        message={`Assign Case ${selectedCase.id} to an authorized counselor or case officer.`}
        confirmLabel="Assign Case"
        onConfirm={handleConfirmAssign}
        onCancel={() => setShowAssignModal(false)}
      >
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-700 block">
            Select Officer or Counselor:
          </label>
          <select
            value={assignedStaff}
            onChange={(e) => setAssignedStaff(e.target.value)}
            className="w-full p-2 border border-slate-300 rounded text-xs bg-white text-slate-800"
          >
            <option value="Dr. Ananya Sharma (Counselor)">Dr. Ananya Sharma (Counselor - Psychological Support)</option>
            <option value="Officer Arjun Verma (Case Officer)">Officer Arjun Verma (Case Officer - Triage Unit)</option>
            <option value="Rajesh Kumar (Supervisor)">Rajesh Kumar (Supervisor - Operations Control)</option>
          </select>
        </div>
      </ConfirmationModal>
    </div>
  );
};
