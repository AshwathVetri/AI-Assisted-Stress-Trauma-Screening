import React, { createContext, useContext, useState, useEffect } from 'react';
import type { 
  AppView, 
  AssessmentResult, 
  AuditLogEntry, 
  CaseStatus, 
  InputMethod, 
  QuestionnaireAnswers, 
  StaffUser, 
  SupportCase 
} from '../types';
import { INITIAL_AUDIT_LOGS, INITIAL_CASES, INITIAL_STAFF_USERS } from '../data/mockData';
import { assessResponse, DEMO_SCENARIOS } from '../services/aiEngine';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  // Navigation
  currentView: AppView;
  navigateTo: (view: AppView) => void;
  goBack: () => void;
  
  // Victim Flow State
  consentGiven: boolean;
  setConsentGiven: (val: boolean) => void;
  selectedMethods: InputMethod[];
  toggleMethod: (method: InputMethod) => void;
  setSelectedMethods: (methods: InputMethod[]) => void;
  
  textContent: string;
  setTextContent: (text: string) => void;
  voiceTranscript: string;
  setVoiceTranscript: (transcript: string) => void;
  voiceDuration: number;
  setVoiceDuration: (sec: number) => void;
  questionnaireAnswers: QuestionnaireAnswers;
  setQuestionnaireAnswer: <K extends keyof QuestionnaireAnswers>(key: K, value: QuestionnaireAnswers[K]) => void;
  
  currentResult: AssessmentResult | null;
  setCurrentResult: (result: AssessmentResult | null) => void;
  isProcessing: boolean;
  processingStageIndex: number;
  
  // Case Generation & Review
  submittedCaseId: string | null;
  loadDemoScenario: (scenarioId: string) => void;
  runAssessment: () => Promise<void>;
  requestHumanReview: () => string;
  
  // Staff & Cases
  currentUser: StaffUser | null;
  loginStaff: (userId: string) => boolean;
  logoutStaff: () => void;
  cases: SupportCase[];
  selectedCase: SupportCase | null;
  selectCaseById: (caseId: string) => void;
  updateCaseStatus: (caseId: string, status: CaseStatus, noteContent?: string) => void;
  escalateCase: (caseId: string, reason: string) => void;
  assignCase: (caseId: string, assignee: string, role: string) => void;
  addCaseNote: (caseId: string, content: string) => void;
  
  // Audit Logs & System
  auditLogs: AuditLogEntry[];
  toasts: Toast[];
  addToast: (message: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;
  resetAllDemoData: () => void;
}

const defaultQuestionnaire: QuestionnaireAnswers = {
  safety: '',
  distress: '',
  persistentFear: '',
  sleepDifficulty: '',
  threatened: '',
  immediateHelp: '',
  counselorRequested: ''
};

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation history
  const [history, setHistory] = useState<AppView[]>(['landing']);
  const currentView = history[history.length - 1] || 'landing';

  // Victim inputs
  const [consentGiven, setConsentGiven] = useState<boolean>(false);
  const [selectedMethods, setSelectedMethods] = useState<InputMethod[]>(['TEXT']);
  const [textContent, setTextContent] = useState<string>('');
  const [voiceTranscript, setVoiceTranscript] = useState<string>('');
  const [voiceDuration, setVoiceDuration] = useState<number>(0);
  const [questionnaireAnswers, setQuestionnaireAnswers] = useState<QuestionnaireAnswers>(defaultQuestionnaire);
  
  // Assessment
  const [currentResult, setCurrentResult] = useState<AssessmentResult | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingStageIndex, setProcessingStageIndex] = useState<number>(0);
  const [submittedCaseId, setSubmittedCaseId] = useState<string | null>(null);

  // Staff and Data
  const [currentUser, setCurrentUser] = useState<StaffUser | null>(INITIAL_STAFF_USERS[0]);
  const [cases, setCases] = useState<SupportCase[]>(() => {
    const saved = localStorage.getItem('nhaa_demo_cases');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_CASES;
      }
    }
    return INITIAL_CASES;
  });
  
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>('NHAA-1042');
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Persist cases
  useEffect(() => {
    localStorage.setItem('nhaa_demo_cases', JSON.stringify(cases));
  }, [cases]);

  const addToast = (message: string, type: Toast['type'] = 'info') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const navigateTo = (view: AppView) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setHistory(prev => [...prev, view]);
  };

  const goBack = () => {
    if (history.length > 1) {
      setHistory(prev => prev.slice(0, prev.length - 1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigateTo('landing');
    }
  };

  const toggleMethod = (method: InputMethod) => {
    setSelectedMethods(prev => {
      if (prev.includes(method)) {
        if (prev.length === 1) return prev; // Keep at least one
        return prev.filter(m => m !== method);
      } else {
        return [...prev, method];
      }
    });
  };

  const setQuestionnaireAnswer = <K extends keyof QuestionnaireAnswers>(key: K, value: QuestionnaireAnswers[K]) => {
    setQuestionnaireAnswers(prev => ({ ...prev, [key]: value }));
  };

  const loadDemoScenario = (scenarioId: string) => {
    const found = DEMO_SCENARIOS.find(s => s.id === scenarioId);
    if (!found) return;

    setTextContent(found.text);
    setQuestionnaireAnswers(found.questionnaire);
    setSelectedMethods(['TEXT', 'QUESTIONNAIRE']);
    setConsentGiven(true);
    addToast(`Loaded ${found.title} (${found.expectedLevel} priority sample)`, 'info');
  };

  const runAssessment = async () => {
    setIsProcessing(true);
    setProcessingStageIndex(0);
    navigateTo('processing');

    const totalStages = 8;
    for (let i = 0; i < totalStages; i++) {
      await new Promise(r => setTimeout(r, 260));
      setProcessingStageIndex(i + 1);
    }

    const result = assessResponse({
      text: selectedMethods.includes('TEXT') ? textContent : undefined,
      transcript: selectedMethods.includes('VOICE') ? voiceTranscript : undefined,
      questionnaire: selectedMethods.includes('QUESTIONNAIRE') ? questionnaireAnswers : undefined
    });

    setCurrentResult(result);
    setIsProcessing(false);
    navigateTo('results');
  };

  const requestHumanReview = (): string => {
    const caseNum = 1046 + (cases.length - 4);
    const newCaseId = `NHAA-${caseNum}`;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const keyIndicatorsList: string[] = [];
    if (currentResult?.indicators.fear.level !== 'Low') keyIndicatorsList.push('Fear Indicators');
    if (currentResult?.indicators.threat.level !== 'Low') keyIndicatorsList.push('Threat Perception');
    if (currentResult?.indicators.distress.level !== 'Low') keyIndicatorsList.push('Emotional Distress');
    if (currentResult?.indicators.sleepStress.level !== 'Low') keyIndicatorsList.push('Sleep Disturbance');
    if (currentResult?.indicators.urgency.level !== 'Low') keyIndicatorsList.push('Urgency');
    if (keyIndicatorsList.length === 0) keyIndicatorsList.push('Informational Guidance');

    const newCase: SupportCase = {
      id: newCaseId,
      timestamp: timeStr,
      createdAt: now.toISOString(),
      inputMethods: [...selectedMethods],
      textContent: selectedMethods.includes('TEXT') ? textContent : undefined,
      voiceTranscript: selectedMethods.includes('VOICE') ? voiceTranscript : undefined,
      audioDurationSeconds: selectedMethods.includes('VOICE') ? voiceDuration || 24 : undefined,
      questionnaireAnswers: selectedMethods.includes('QUESTIONNAIRE') ? { ...questionnaireAnswers } : undefined,
      screeningLevel: currentResult?.riskLevel || 'MODERATE',
      confidenceScore: currentResult?.confidenceScore || 82,
      keyIndicators: keyIndicatorsList,
      assessmentResult: currentResult || assessResponse({ text: textContent }),
      status: 'Pending Review',
      isNew: true,
      notes: [
        {
          id: `note-${Date.now()}`,
          author: 'Victim Portal Intake',
          role: 'Self-Service Screening',
          timestamp: timeStr,
          content: 'Complainant requested authorized human review following AI-assisted screening.'
        }
      ]
    };

    setCases(prev => [newCase, ...prev]);
    setSubmittedCaseId(newCaseId);
    setSelectedCaseId(newCaseId);

    // Audit log
    const auditEntry: AuditLogEntry = {
      id: `aud-${Date.now()}`,
      timestamp: timeStr,
      caseId: newCaseId,
      actor: 'Victim Portal Intake',
      role: 'Public Intake',
      action: 'CASE_SUBMITTED',
      details: `New case created with screening level: ${newCase.screeningLevel}`,
      severity: newCase.screeningLevel === 'CRITICAL' ? 'ALERT' : 'INFO'
    };
    setAuditLogs(prev => [auditEntry, ...prev]);

    addToast(`Case ${newCaseId} routed to Authorized Priority Queue (${newCase.screeningLevel})`, 'success');
    return newCaseId;
  };

  const loginStaff = (userId: string): boolean => {
    const found = INITIAL_STAFF_USERS.find(u => u.id === userId);
    if (found) {
      setCurrentUser(found);
      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setAuditLogs(prev => [
        {
          id: `aud-${Date.now()}`,
          timestamp: now,
          actor: found.name,
          role: found.role,
          action: 'STAFF_LOGIN',
          details: `Authenticated into NHAA Operations console (${found.role})`,
          severity: 'INFO'
        },
        ...prev
      ]);
      addToast(`Logged in as ${found.name} (${found.role})`, 'success');
      navigateTo('staff-dashboard');
      return true;
    }
    return false;
  };

  const logoutStaff = () => {
    if (currentUser) {
      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setAuditLogs(prev => [
        {
          id: `aud-${Date.now()}`,
          timestamp: now,
          actor: currentUser.name,
          role: currentUser.role,
          action: 'STAFF_LOGOUT',
          details: 'Staff member signed out',
          severity: 'INFO'
        },
        ...prev
      ]);
    }
    setCurrentUser(null);
    addToast('Logged out of Authorized Staff Portal', 'info');
    navigateTo('landing');
  };

  const selectCaseById = (caseId: string) => {
    setSelectedCaseId(caseId);
    navigateTo('case-details');
  };

  const updateCaseStatus = (caseId: string, status: CaseStatus, noteContent?: string) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setCases(prev => prev.map(c => {
      if (c.id === caseId) {
        const updatedNotes = [...c.notes];
        if (noteContent && currentUser) {
          updatedNotes.push({
            id: `note-${Date.now()}`,
            author: currentUser.name,
            role: currentUser.role,
            timestamp: timeStr,
            content: noteContent,
            actionTaken: `Status updated to ${status}`
          });
        }
        return {
          ...c,
          status,
          isNew: false,
          assignedOfficer: c.assignedOfficer || currentUser?.name,
          notes: updatedNotes
        };
      }
      return c;
    }));

    if (currentUser) {
      setAuditLogs(prev => [
        {
          id: `aud-${Date.now()}`,
          timestamp: timeStr,
          caseId,
          actor: currentUser.name,
          role: currentUser.role,
          action: 'CASE_STATUS_UPDATED',
          details: `Status changed to ${status}${noteContent ? ` - "${noteContent}"` : ''}`,
          severity: status === 'Escalated' ? 'ALERT' : 'INFO'
        },
        ...prev
      ]);
    }
    addToast(`Case ${caseId} marked as ${status}`, 'success');
  };

  const escalateCase = (caseId: string, reason: string) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setCases(prev => prev.map(c => {
      if (c.id === caseId) {
        return {
          ...c,
          status: 'Escalated',
          isNew: false,
          notes: [
            ...c.notes,
            {
              id: `note-${Date.now()}`,
              author: currentUser?.name || 'Authorized Supervisor',
              role: currentUser?.role || 'Supervisor',
              timestamp: timeStr,
              content: `ESCALATION: ${reason}`,
              actionTaken: 'Escalated to Emergency Response Squad'
            }
          ]
        };
      }
      return c;
    }));

    setAuditLogs(prev => [
      {
        id: `aud-${Date.now()}`,
        timestamp: timeStr,
        caseId,
        actor: currentUser?.name || 'Authorized Supervisor',
        role: currentUser?.role || 'Supervisor',
        action: 'CASE_ESCALATED',
        details: `Emergency escalation: ${reason}`,
        severity: 'ALERT'
      },
      ...prev
    ]);
    addToast(`Case ${caseId} escalated successfully! Emergency team alerted.`, 'warning');
  };

  const assignCase = (caseId: string, assignee: string, role: string) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setCases(prev => prev.map(c => {
      if (c.id === caseId) {
        return {
          ...c,
          status: 'Under Review',
          assignedCounselor: role === 'Counselor' ? assignee : c.assignedCounselor,
          assignedOfficer: role === 'Case Officer' ? assignee : c.assignedOfficer,
          notes: [
            ...c.notes,
            {
              id: `note-${Date.now()}`,
              author: currentUser?.name || 'Intake Dispatcher',
              role: currentUser?.role || 'Staff',
              timestamp: timeStr,
              content: `Case assigned to ${assignee} (${role}) for priority handling.`
            }
          ]
        };
      }
      return c;
    }));

    setAuditLogs(prev => [
      {
        id: `aud-${Date.now()}`,
        timestamp: timeStr,
        caseId,
        actor: currentUser?.name || 'Staff',
        role: currentUser?.role || 'Staff',
        action: 'CASE_ASSIGNED',
        details: `Assigned to ${assignee} (${role})`,
        severity: 'INFO'
      },
      ...prev
    ]);
    addToast(`Case ${caseId} assigned successfully to ${assignee}.`, 'success');
  };

  const addCaseNote = (caseId: string, content: string) => {
    if (!content.trim() || !currentUser) return;
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setCases(prev => prev.map(c => {
      if (c.id === caseId) {
        return {
          ...c,
          notes: [
            ...c.notes,
            {
              id: `note-${Date.now()}`,
              author: currentUser.name,
              role: currentUser.role,
              timestamp: timeStr,
              content: content.trim()
            }
          ]
        };
      }
      return c;
    }));

    setAuditLogs(prev => [
      {
        id: `aud-${Date.now()}`,
        timestamp: timeStr,
        caseId,
        actor: currentUser.name,
        role: currentUser.role,
        action: 'NOTE_ADDED',
        details: `Note logged: "${content.slice(0, 50)}..."`,
        severity: 'INFO'
      },
      ...prev
    ]);
    addToast('Case note recorded successfully.', 'success');
  };

  const resetAllDemoData = () => {
    localStorage.removeItem('nhaa_demo_cases');
    setCases(INITIAL_CASES);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setTextContent('');
    setVoiceTranscript('');
    setQuestionnaireAnswers(defaultQuestionnaire);
    setCurrentResult(null);
    setConsentGiven(false);
    setSelectedMethods(['TEXT']);
    setSelectedCaseId('NHAA-1042');
    setSubmittedCaseId(null);
    addToast('Demo environment reset to standard default cases.', 'info');
  };

  const selectedCase = cases.find(c => c.id === selectedCaseId) || cases[0] || null;

  return (
    <AppContext.Provider
      value={{
        currentView,
        navigateTo,
        goBack,
        consentGiven,
        setConsentGiven,
        selectedMethods,
        toggleMethod,
        setSelectedMethods,
        textContent,
        setTextContent,
        voiceTranscript,
        setVoiceTranscript,
        voiceDuration,
        setVoiceDuration,
        questionnaireAnswers,
        setQuestionnaireAnswer,
        currentResult,
        setCurrentResult,
        isProcessing,
        processingStageIndex,
        submittedCaseId,
        loadDemoScenario,
        runAssessment,
        requestHumanReview,
        currentUser,
        loginStaff,
        logoutStaff,
        cases,
        selectedCase,
        selectCaseById,
        updateCaseStatus,
        escalateCase,
        assignCase,
        addCaseNote,
        auditLogs,
        toasts,
        addToast,
        removeToast,
        resetAllDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
