import type { AssessmentResult, QuestionnaireAnswers, RiskLevel } from '../types';

export const FEAR_KEYWORDS = [
  'scared', 'afraid', 'fear', 'terrified', 'frightened', 'panicking', 'dread', 'trembling', 'horrified', 'petrified'
];

export const THREAT_KEYWORDS = [
  'threat', 'threatening', 'threatened', 'danger', 'harm', 'attack', 'unsafe', 'hurt', 'kill', 'blackmail', 'forced', 'stalking', 'violence', 'pressuring'
];

export const DISTRESS_KEYWORDS = [
  'crying', 'overwhelmed', 'helpless', 'distressed', 'panic', 'cannot cope', "can't cope", 'hopeless', 'broken', 'depressed', 'anxious', 'exhausted', 'traumatized', 'numb'
];

export const SLEEP_STRESS_KEYWORDS = [
  "can't sleep", 'cannot sleep', 'insomnia', 'stress', 'stressed', 'anxiety', 'unable to sleep', 'nightmares', 'restless', 'tension', 'panic attacks', 'headache'
];

export const URGENCY_KEYWORDS = [
  'immediate', 'emergency', 'right now', 'danger', 'help me', 'unsafe', 'urgent', 'asap', 'save me', 'right away', 'call police', 'hurry'
];

export interface AssessInput {
  text?: string;
  transcript?: string;
  questionnaire?: QuestionnaireAnswers;
}

function findMatches(sourceText: string, keywords: string[]): string[] {
  const lower = sourceText.toLowerCase();
  const matched: string[] = [];
  for (const kw of keywords) {
    if (lower.includes(kw)) {
      matched.push(kw);
    }
  }
  return matched;
}

function extractEvidenceSnippet(fullText: string, matches: string[]): string {
  if (!fullText || matches.length === 0) {
    return 'No direct textual match in narrative response.';
  }
  // Find the sentence containing first match
  const sentences = fullText.split(/[.!?\n]+/);
  for (const sentence of sentences) {
    const sLower = sentence.toLowerCase();
    for (const match of matches) {
      if (sLower.includes(match)) {
        return `"${sentence.trim()}"`;
      }
    }
  }
  return `References term: "${matches[0]}"`;
}

function calculateIndicatorLevel(score: number): 'Low' | 'Moderate' | 'High' | 'Severe' {
  if (score >= 80) return 'Severe';
  if (score >= 55) return 'High';
  if (score >= 30) return 'Moderate';
  return 'Low';
}

/**
 * AI-Assisted Screening Engine (Prototype Simulation)
 * Evaluates linguistic stress patterns, threat perception, emotional distress, and structured screening cues.
 * Note: Clearly flagged as a prototype decision-support tool, NOT a clinical diagnostic model.
 */
export function assessResponse(input: AssessInput): AssessmentResult {
  const combinedText = `${input.text || ''} ${input.transcript || ''}`.trim();
  const q = input.questionnaire;

  // 1. Keyword Extraction
  const fearMatches = findMatches(combinedText, FEAR_KEYWORDS);
  const threatMatches = findMatches(combinedText, THREAT_KEYWORDS);
  const distressMatches = findMatches(combinedText, DISTRESS_KEYWORDS);
  const sleepStressMatches = findMatches(combinedText, SLEEP_STRESS_KEYWORDS);
  const urgencyMatches = findMatches(combinedText, URGENCY_KEYWORDS);

  // 2. Base Scores from Linguistic Matches (0 - 100)
  let fearScore = Math.min(fearMatches.length * 28, 85);
  let threatScore = Math.min(threatMatches.length * 30, 85);
  let distressScore = Math.min(distressMatches.length * 24, 80);
  let sleepScore = Math.min(sleepStressMatches.length * 28, 85);
  let urgencyScore = Math.min(urgencyMatches.length * 35, 90);

  // 3. Structured Questionnaire Amplification
  if (q) {
    // Safety question
    if (q.safety === 'Extremely unsafe') {
      threatScore = Math.max(threatScore, 85);
      urgencyScore = Math.max(urgencyScore, 80);
    } else if (q.safety === 'Unsafe') {
      threatScore = Math.max(threatScore, 65);
      urgencyScore = Math.max(urgencyScore, 55);
    } else if (q.safety === 'Unsure') {
      threatScore = Math.max(threatScore, 40);
    }

    // Distress question
    if (q.distress === 'Very high') {
      distressScore = Math.max(distressScore, 88);
    } else if (q.distress === 'High') {
      distressScore = Math.max(distressScore, 70);
    } else if (q.distress === 'Moderate') {
      distressScore = Math.max(distressScore, 45);
    }

    // Persistent fear
    if (q.persistentFear === 'Yes') {
      fearScore = Math.max(fearScore + 25, fearMatches.length > 0 ? 60 : 40);
    }

    // Sleep difficulty
    if (q.sleepDifficulty === 'Yes') {
      sleepScore = Math.max(sleepScore + 30, 60);
    }

    // Threatened
    if (q.threatened === 'Yes') {
      threatScore = Math.max(threatScore + 30, threatMatches.length > 0 ? 70 : 50);
    }

    // Immediate help
    if (q.immediateHelp === 'Yes') {
      urgencyScore = Math.max(urgencyScore + 40, 85);
    }
  }

  // Ensure caps
  fearScore = Math.min(100, Math.max(10, fearScore));
  threatScore = Math.min(100, Math.max(10, threatScore));
  distressScore = Math.min(100, Math.max(10, distressScore));
  sleepScore = Math.min(100, Math.max(10, sleepScore));
  urgencyScore = Math.min(100, Math.max(10, urgencyScore));

  // 4. Overall Weighted Composite Calculation
  // Threat and Urgency are weighted highest for safety triaging
  const compositeScore = (
    urgencyScore * 0.30 +
    threatScore * 0.25 +
    fearScore * 0.20 +
    distressScore * 0.15 +
    sleepScore * 0.10
  );

  // 5. Classification Level
  let riskLevel: RiskLevel = 'LOW';
  if (compositeScore >= 75 || urgencyScore >= 80 || (threatScore >= 80 && fearScore >= 75)) {
    riskLevel = 'CRITICAL';
  } else if (compositeScore >= 45 || threatScore >= 55 || (fearScore >= 55 && distressScore >= 40)) {
    riskLevel = 'HIGH';
  } else if (compositeScore >= 25 || sleepScore >= 40 || distressScore >= 35) {
    riskLevel = 'MODERATE';
  } else {
    riskLevel = 'LOW';
  }

  // Fallback for empty responses
  if (!combinedText && (!q || !q.distress)) {
    riskLevel = 'LOW';
  }

  // Evidence snippets
  const fearEvidence = fearMatches.length > 0
    ? extractEvidenceSnippet(combinedText, fearMatches)
    : q?.persistentFear === 'Yes' ? 'Affirmed persistent fear or anxiety in questionnaire.' : 'No active fear indicators detected.';

  const threatEvidence = threatMatches.length > 0
    ? extractEvidenceSnippet(combinedText, threatMatches)
    : q?.threatened === 'Yes' ? 'Reported feeling threatened or pressured in questionnaire.' : 'No overt threat keywords noted.';

  const distressEvidence = distressMatches.length > 0
    ? extractEvidenceSnippet(combinedText, distressMatches)
    : q?.distress ? `Self-reported distress level: ${q.distress}.` : 'Mild or nominal distress expressions.';

  const sleepEvidence = sleepStressMatches.length > 0
    ? extractEvidenceSnippet(combinedText, sleepStressMatches)
    : q?.sleepDifficulty === 'Yes' ? 'Indicated sleep disruption related to incident.' : 'Normal sleep/stress pattern reported.';

  const urgencyEvidence = urgencyMatches.length > 0
    ? extractEvidenceSnippet(combinedText, urgencyMatches)
    : q?.immediateHelp === 'Yes' ? 'Requested immediate assistance in questionnaire.' : 'Standard triage queue appropriate.';

  // Construct Detailed Indicator Objects
  const indicators: AssessmentResult['indicators'] = {
    fear: {
      name: 'Fear-related language',
      category: 'FEAR',
      level: calculateIndicatorLevel(fearScore),
      score: fearScore,
      matchedTerms: fearMatches,
      evidenceText: fearEvidence
    },
    threat: {
      name: 'Threat perception',
      category: 'THREAT',
      level: calculateIndicatorLevel(threatScore),
      score: threatScore,
      matchedTerms: threatMatches,
      evidenceText: threatEvidence
    },
    distress: {
      name: 'Emotional distress',
      category: 'DISTRESS',
      level: calculateIndicatorLevel(distressScore),
      score: distressScore,
      matchedTerms: distressMatches,
      evidenceText: distressEvidence
    },
    sleepStress: {
      name: 'Sleep disturbance & stress',
      category: 'SLEEP_STRESS',
      level: calculateIndicatorLevel(sleepScore),
      score: sleepScore,
      matchedTerms: sleepStressMatches,
      evidenceText: sleepEvidence
    },
    urgency: {
      name: 'Urgency indicators',
      category: 'URGENCY',
      level: calculateIndicatorLevel(urgencyScore),
      score: urgencyScore,
      matchedTerms: urgencyMatches,
      evidenceText: urgencyEvidence
    }
  };

  // Why was this case flagged? User-facing non-clinical explainability
  let summaryExplanation = '';
  const detailedReasons: string[] = [];

  switch (riskLevel) {
    case 'CRITICAL':
      summaryExplanation = 'The response contains prominent indicators of immediate safety concern, active threats, or acute distress. This case requires immediate human triage and supervisor attention.';
      detailedReasons.push('Explicit references to imminent danger or immediate assistance requests detected.');
      if (threatScore >= 60) detailedReasons.push('High threat perception expressions flagged in narrative.');
      if (fearScore >= 60) detailedReasons.push('Severe fear-related terminology identified.');
      break;
    case 'HIGH':
      summaryExplanation = 'The response contains multiple indicators associated with significant emotional distress, perceived threat, or fear. These indicators warrant prompt review by authorized personnel.';
      if (fearScore >= 50) detailedReasons.push('Fear-related language identified across submitted responses.');
      if (threatScore >= 50) detailedReasons.push('Potential threat or intimidation indicators noted.');
      if (sleepScore >= 50) detailedReasons.push('Somatic stress and sleep disruption reported.');
      break;
    case 'MODERATE':
      summaryExplanation = 'The response reflects moderate stress, anxiety, or ongoing sleep disruption without immediate safety hazard keywords. Standard counselor follow-up recommended.';
      detailedReasons.push('Persistent stress or worry expressions detected in narrative or questionnaire.');
      if (sleepScore >= 40) detailedReasons.push('Sleep disturbance noted as an associated stress factor.');
      break;
    case 'LOW':
    default:
      summaryExplanation = 'The response exhibits mild concerns or informational queries without high-distress or threat indicators. Safe for standard queue handling.';
      detailedReasons.push('Complainant reports feeling mostly/completely safe or seeks guidance.');
      detailedReasons.push('No urgent safety or severe threat indicators identified.');
      break;
  }

  // Simulated AI confidence estimate (72% - 94% range)
  const baseConfidence = 74;
  const matchBonus = Math.min(20, (fearMatches.length + threatMatches.length + distressMatches.length) * 4);
  const confidenceScore = Math.min(94, baseConfidence + matchBonus);

  return {
    riskLevel,
    confidenceScore,
    summaryExplanation,
    detailedReasons,
    indicators,
    urgencyRecommended: riskLevel === 'CRITICAL' || riskLevel === 'HIGH',
    humanReviewRequired: true,
    generatedAt: new Date().toISOString()
  };
}

/**
 * Predefined SIH 2026 Demo Scenarios
 */
export const DEMO_SCENARIOS = [
  {
    id: 'demo-1-low',
    title: 'Demo Case 1: LOW Priority',
    expectedLevel: 'LOW' as RiskLevel,
    description: 'Informational inquiry, complainant feels safe right now.',
    text: 'I am worried about the situation, but I feel safe at the moment. I mainly want information about what I can do next regarding the helpline procedures.',
    questionnaire: {
      safety: 'Mostly safe',
      distress: 'Low',
      persistentFear: 'No',
      sleepDifficulty: 'No',
      threatened: 'No',
      immediateHelp: 'No',
      counselorRequested: 'No'
    } as QuestionnaireAnswers
  },
  {
    id: 'demo-2-moderate',
    title: 'Demo Case 2: MODERATE Priority',
    expectedLevel: 'MODERATE' as RiskLevel,
    description: 'Ongoing stress and sleep difficulty following an incident.',
    text: 'I have been feeling stressed about what happened. I am having some difficulty sleeping and I keep thinking about the situation constantly.',
    questionnaire: {
      safety: 'Mostly safe',
      distress: 'Moderate',
      persistentFear: 'Yes',
      sleepDifficulty: 'Yes',
      threatened: 'No',
      immediateHelp: 'No',
      counselorRequested: 'Yes'
    } as QuestionnaireAnswers
  },
  {
    id: 'demo-3-high',
    title: 'Demo Case 3: HIGH Priority',
    expectedLevel: 'HIGH' as RiskLevel,
    description: 'Repeated threats, high fear, sleeplessness, and phone anxiety.',
    text: 'I am very scared because the person involved keeps threatening me. I cannot sleep properly and I feel anxious whenever I receive a call or hear a knock.',
    questionnaire: {
      safety: 'Unsafe',
      distress: 'High',
      persistentFear: 'Yes',
      sleepDifficulty: 'Yes',
      threatened: 'Yes',
      immediateHelp: 'Unsure',
      counselorRequested: 'Yes'
    } as QuestionnaireAnswers
  },
  {
    id: 'demo-4-critical',
    title: 'Demo Case 4: CRITICAL Priority',
    expectedLevel: 'CRITICAL' as RiskLevel,
    description: 'Imminent danger, severe fear, active threats, immediate help needed.',
    text: 'I am extremely frightened and I do not feel safe right now. I am being threatened directly and I need help immediately. Please assist right now.',
    questionnaire: {
      safety: 'Extremely unsafe',
      distress: 'Very high',
      persistentFear: 'Yes',
      sleepDifficulty: 'Yes',
      threatened: 'Yes',
      immediateHelp: 'Yes',
      counselorRequested: 'Yes'
    } as QuestionnaireAnswers
  }
];
