import type { AuditLogEntry, StaffUser, SupportCase } from '../types';
import { assessResponse } from '../services/aiEngine';

export const INITIAL_STAFF_USERS: StaffUser[] = [
  {
    id: 'demo.officer',
    name: 'Officer Arjun Verma',
    role: 'Case Officer',
    badgeNumber: 'NHAA-CO-4182',
    department: 'First-Line Intake & Triage Unit'
  },
  {
    id: 'dr.ananya',
    name: 'Dr. Ananya Sharma',
    role: 'Counselor',
    badgeNumber: 'NHAA-CN-2091',
    department: 'Psychological Support & Trauma Response'
  },
  {
    id: 'sup.rajesh',
    name: 'Rajesh Kumar (Supervisor)',
    role: 'Supervisor',
    badgeNumber: 'NHAA-SP-1014',
    department: 'Helpline Emergency Oversight'
  },
  {
    id: 'admin.sih',
    name: 'Pooja Malhotra (Admin)',
    role: 'Administrator',
    badgeNumber: 'NHAA-AD-0081',
    department: 'Data Governance & IT Security'
  }
];

// Helper to pre-generate initial cases with real engine data
const case1042Text = "I am in danger right now. They are outside threatening to attack me if I don't withdraw the complaint. I am terrified and need immediate police assistance right now.";
const result1042 = assessResponse({
  transcript: case1042Text,
  questionnaire: {
    safety: 'Extremely unsafe',
    distress: 'Very high',
    persistentFear: 'Yes',
    sleepDifficulty: 'Yes',
    threatened: 'Yes',
    immediateHelp: 'Yes',
    counselorRequested: 'Yes'
  }
});

const case1043Text = "I am very scared because the person involved has been threatening me again. I have been unable to sleep properly and I don't know what I should do.";
const result1043 = assessResponse({
  text: case1043Text,
  questionnaire: {
    safety: 'Unsafe',
    distress: 'High',
    persistentFear: 'Yes',
    sleepDifficulty: 'Yes',
    threatened: 'Yes',
    immediateHelp: 'Unsure',
    counselorRequested: 'Yes'
  }
});

const case1044Result = assessResponse({
  questionnaire: {
    safety: 'Mostly safe',
    distress: 'Moderate',
    persistentFear: 'No',
    sleepDifficulty: 'Yes',
    threatened: 'No',
    immediateHelp: 'No',
    counselorRequested: 'Yes'
  }
});

const case1045Text = "I wanted to check on the status of my previous reference inquiry and understand the mediation process. I am feeling much better now.";
const result1045 = assessResponse({
  text: case1045Text,
  transcript: "Yes, I feel safe currently and just wanted documentation assistance.",
  questionnaire: {
    safety: 'Completely safe',
    distress: 'Very low',
    persistentFear: 'No',
    sleepDifficulty: 'No',
    threatened: 'No',
    immediateHelp: 'No',
    counselorRequested: 'No'
  }
});

export const INITIAL_CASES: SupportCase[] = [
  {
    id: 'NHAA-1042',
    timestamp: '10:42 AM',
    createdAt: new Date(Date.now() - 42 * 60 * 1000).toISOString(),
    inputMethods: ['VOICE', 'QUESTIONNAIRE'],
    voiceTranscript: case1042Text,
    audioDurationSeconds: 38,
    screeningLevel: 'CRITICAL',
    confidenceScore: 92,
    keyIndicators: ['Immediate Safety', 'Threat Perception', 'Severe Distress', 'Urgency'],
    assessmentResult: result1042,
    status: 'Pending Review',
    questionnaireAnswers: {
      safety: 'Extremely unsafe',
      distress: 'Very high',
      persistentFear: 'Yes',
      sleepDifficulty: 'Yes',
      threatened: 'Yes',
      immediateHelp: 'Yes',
      counselorRequested: 'Yes'
    },
    notes: [
      {
        id: 'note-1042-1',
        author: 'System Intake Bot',
        role: 'AI Dispatch',
        timestamp: '10:42 AM',
        content: 'Emergency priority triage flagged. Multiple threat and urgency indicators detected in audio transcript.'
      }
    ]
  },
  {
    id: 'NHAA-1043',
    timestamp: '10:38 AM',
    createdAt: new Date(Date.now() - 48 * 60 * 1000).toISOString(),
    inputMethods: ['TEXT'],
    textContent: case1043Text,
    screeningLevel: 'HIGH',
    confidenceScore: 84,
    keyIndicators: ['Fear Language', 'Threat Perception', 'Sleep Disturbance'],
    assessmentResult: result1043,
    status: 'Under Review',
    assignedOfficer: 'Officer Arjun Verma',
    questionnaireAnswers: {
      safety: 'Unsafe',
      distress: 'High',
      persistentFear: 'Yes',
      sleepDifficulty: 'Yes',
      threatened: 'Yes',
      immediateHelp: 'Unsure',
      counselorRequested: 'Yes'
    },
    notes: [
      {
        id: 'note-1043-1',
        author: 'Officer Arjun Verma',
        role: 'Case Officer',
        timestamp: '10:45 AM',
        content: 'Claimant reported intimidation by phone. Case opened for preliminary outreach.',
        actionTaken: 'Initiated contact protocol'
      }
    ]
  },
  {
    id: 'NHAA-1044',
    timestamp: '10:31 AM',
    createdAt: new Date(Date.now() - 55 * 60 * 1000).toISOString(),
    inputMethods: ['QUESTIONNAIRE'],
    screeningLevel: 'MODERATE',
    confidenceScore: 78,
    keyIndicators: ['Somatic Stress', 'Sleep Disruption', 'Counselor Requested'],
    assessmentResult: case1044Result,
    status: 'Pending Review',
    questionnaireAnswers: {
      safety: 'Mostly safe',
      distress: 'Moderate',
      persistentFear: 'No',
      sleepDifficulty: 'Yes',
      threatened: 'No',
      immediateHelp: 'No',
      counselorRequested: 'Yes'
    },
    notes: [
      {
        id: 'note-1044-1',
        author: 'System Intake Bot',
        role: 'AI Dispatch',
        timestamp: '10:31 AM',
        content: 'Structured questionnaire submitted. Scheduled for standard counselor queue.'
      }
    ]
  },
  {
    id: 'NHAA-1045',
    timestamp: '10:20 AM',
    createdAt: new Date(Date.now() - 72 * 60 * 1000).toISOString(),
    inputMethods: ['TEXT', 'VOICE'],
    textContent: case1045Text,
    voiceTranscript: "Yes, I feel safe currently and just wanted documentation assistance.",
    audioDurationSeconds: 15,
    screeningLevel: 'LOW',
    confidenceScore: 89,
    keyIndicators: ['Informational Query', 'Safe Environment'],
    assessmentResult: result1045,
    status: 'Reviewed',
    assignedOfficer: 'Officer Arjun Verma',
    questionnaireAnswers: {
      safety: 'Completely safe',
      distress: 'Very low',
      persistentFear: 'No',
      sleepDifficulty: 'No',
      threatened: 'No',
      immediateHelp: 'No',
      counselorRequested: 'No'
    },
    notes: [
      {
        id: 'note-1045-1',
        author: 'Officer Arjun Verma',
        role: 'Case Officer',
        timestamp: '10:35 AM',
        content: 'Guidance brochure sent. Complainant confirmed no threat or emergency.',
        actionTaken: 'Marked Reviewed'
      }
    ]
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'aud-001',
    timestamp: '10:45:12 AM',
    caseId: 'NHAA-1043',
    actor: 'Officer Arjun Verma',
    role: 'Case Officer',
    action: 'CASE_STATUS_UPDATED',
    details: 'Status changed from Pending Review to Under Review',
    severity: 'INFO'
  },
  {
    id: 'aud-002',
    timestamp: '10:42:04 AM',
    caseId: 'NHAA-1042',
    actor: 'AI Screening Engine',
    role: 'Prototype AI Service',
    action: 'SCREENING_LEVEL_CRITICAL',
    details: 'Auto-triaged to CRITICAL queue based on threat & urgency indicators',
    severity: 'ALERT'
  },
  {
    id: 'aud-003',
    timestamp: '10:35:40 AM',
    caseId: 'NHAA-1045',
    actor: 'Officer Arjun Verma',
    role: 'Case Officer',
    action: 'CASE_RESOLVED',
    details: 'Marked as Reviewed after claimant guidance verification',
    severity: 'INFO'
  },
  {
    id: 'aud-004',
    timestamp: '10:15:00 AM',
    actor: 'Officer Arjun Verma',
    role: 'Case Officer',
    action: 'STAFF_LOGIN',
    details: 'Authorized session started from IP 10.14.5.66 via GovIntranet',
    severity: 'INFO'
  }
];
