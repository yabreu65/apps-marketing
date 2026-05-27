import { buildLeadSummary, type LeadSummaryInput, type LeadSummaryResult } from '@/lib/lead-summary';

export type LeadSummarySource = 'rules' | 'gemini' | 'rules_fallback';

export type LeadSummaryWithSource = {
  summary: LeadSummaryResult;
  source: LeadSummarySource;
};

type LeadSummaryAIInput = LeadSummaryInput & {
  name?: string;
  statusHistory?: Array<{ fromStatus?: string | null; toStatus: string; createdAt?: string | Date }>;
};

/**
 * Phase 35B: local-model providers removed from runtime.
 * Summary generation stays deterministic by local business rules.
 */
export async function buildLeadSummaryWithOptionalAI(
  lead: LeadSummaryAIInput,
): Promise<LeadSummaryWithSource> {
  const summary = buildLeadSummary(lead);
  return { summary, source: 'rules' };
}
