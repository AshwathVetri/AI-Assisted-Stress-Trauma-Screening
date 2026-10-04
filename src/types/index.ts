export type RiskLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';

export type CaseStatus = 'Pending Review' | 'Under Review' | 'Reviewed' | 'Escalated' | 'Closed';

export type InputMethod = 'TEXT' | 'VOICE' | 'QUESTIONNAIRE';

export interface IndicatorScore {
  name: string;
  category: 'FEAR' | 'THREAT' | 'DISTRESS' | 'SLEEP_STRESS' | 'URGENCY';
  level: 'Low' | 'Moderate' | 'High' | 'Severe';
  score: number; // 0 to 100
  matchedTerms: string[];
  evidenceText: string;
}

export interface AssessmentResult {
  riskLevel: RiskLevel;
  confidenceScore: number; // 0-100 (clearly marked prototype confidence estimate)
  summaryExplanation: string;
  detailedReasons: string[];
  indicators: {
    fear: IndicatorScore;
    threat: IndicatorScore;
    distress: IndicatorScore;
    sleepStress: IndicatorScore;
    urgency: IndicatorScore;
  };
  urgencyRecommended: boolean;
  humanReviewRequired: boolean;
  generatedAt: string;
}

export interface QuestionnaireAnswers {
  safety: string; // 'Completely safe' | 'Mostly safe' | 'Unsure' | 'Unsafe' | 'Extremely unsafe'
  distress: string; // 'Very low' | 'Low' | 'Moderate' | 'High' | 'Very high'
  persistentFear: 'Yes' | 'No' | 'Unsure' | '';
  sleepDifficulty: 'Yes' | 'No' | 'Unsure' | '';
  threatened: 'Yes' | 'No' | 'Unsure' | '';
  immediateHelp: 'Yes' | 'No' | 'Unsure' | '';
  counselorRequested: 'Yes' | 'No' | '';
}

export interface CaseNote {
  id: string;
  author: string;
  role: string;
  timestamp: string;
  content: string;
  actionTaken?: string;
}

export interface SupportCase {
  id: string; // e.g. NHAA-1042
  timestamp: string;
  createdAt: string;
  inputMethods: InputMethod[];
  textContent?: string;
  voiceTranscript?: string;
  audioDurationSeconds?: number;
  questionnaireAnswers?: QuestionnaireAnswers;
  screeningLevel: RiskLevel;
  confidenceScore: number;
  keyIndicators: string[];
  assessmentResult: AssessmentResult;
  status: CaseStatus;
  assignedOfficer?: string;
  assignedCounselor?: string;
  notes: CaseNote[];
  isNew?: boolean;
}

export type StaffRole = 'Case Officer' | 'Counselor' | 'Supervisor' | 'Administrator';

export interface StaffUser {
  id: string;
  name: string;
  role: StaffRole;
  badgeNumber: string;
  department: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  caseId?: string;
  actor: string;
  role: string;
  action: string;
  details: string;
  severity: 'INFO' | 'WARNING' | 'ALERT';
}

export type AppView = 
  | 'landing'
  | 'consent'
  | 'methods'
  | 'assessment-text'
  | 'assessment-voice'
  | 'assessment-questionnaire'
  | 'processing'
  | 'results'
  | 'staff-login'
  | 'staff-dashboard'
  | 'case-details'
  | 'analytics'
  | 'explainability'
  | 'security';
