export type LeadScoreLevel = 'low' | 'medium' | 'high';

export type LeadScore = {
  score: number;
  level: LeadScoreLevel;
  reasons: string[];
  positiveSignals: string[];
  missingSignals: string[];
  recommendedAction: string;
};
