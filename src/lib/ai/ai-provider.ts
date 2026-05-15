export type LeadSummaryAIInput = {
  name?: string;
  serviceInterest: string;
  businessType?: string | null;
  message: string;
  source: string;
  status: string;
  notes?: Array<{ content: string }>;
  statusHistory?: Array<{ fromStatus?: string | null; toStatus: string; createdAt?: string | Date }>;
  prompt?: string;
};

export type LeadSummaryAIResult = {
  opportunityType: string;
  priority: 'low' | 'medium' | 'high';
  summary: string;
  recommendedAction: string;
};

export interface AIProvider {
  generateLeadSummary(input: LeadSummaryAIInput): Promise<LeadSummaryAIResult>;
}
