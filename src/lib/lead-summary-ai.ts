import { buildLeadSummaryPrompt } from '@/lib/ai/lead-summary-prompt';
import { isLocalAISummaryEnabled, OllamaProvider } from '@/lib/ai/ollama-provider';
import { buildLeadSummary, type LeadSummaryInput, type LeadSummaryResult } from '@/lib/lead-summary';

type LeadSummarySource = 'rules' | 'ollama' | 'rules_fallback';

export type LeadSummaryWithSource = {
  summary: LeadSummaryResult;
  source: LeadSummarySource;
};

type LeadSummaryAIInput = LeadSummaryInput & {
  name?: string;
  statusHistory?: Array<{ fromStatus?: string | null; toStatus: string; createdAt?: string | Date }>;
};

function isValidPriority(priority: string): priority is 'low' | 'medium' | 'high' {
  return priority === 'low' || priority === 'medium' || priority === 'high';
}

export async function buildLeadSummaryWithOptionalAI(lead: LeadSummaryAIInput): Promise<LeadSummaryWithSource> {
  const rulesSummary = buildLeadSummary(lead);

  if (!isLocalAISummaryEnabled()) {
    return { summary: rulesSummary, source: 'rules' };
  }

  try {
    const provider = new OllamaProvider();
    const aiResult = await provider.generateLeadSummary({
      name: lead.name,
      serviceInterest: lead.serviceInterest,
      businessType: lead.businessType,
      message: lead.message,
      source: lead.source,
      status: lead.status,
      notes: lead.notes,
      statusHistory: lead.statusHistory,
      prompt: buildLeadSummaryPrompt({
        name: lead.name,
        serviceInterest: lead.serviceInterest,
        businessType: lead.businessType,
        message: lead.message,
        source: lead.source,
        status: lead.status,
        notes: lead.notes,
        statusHistory: lead.statusHistory,
      }),
    });

    if (!isValidPriority(aiResult.priority)) {
      return { summary: rulesSummary, source: 'rules_fallback' };
    }

    return {
      summary: {
        opportunityType: aiResult.opportunityType,
        priority: aiResult.priority,
        summary: aiResult.summary,
        recommendedAction: aiResult.recommendedAction,
      },
      source: 'ollama',
    };
  } catch {
    return { summary: rulesSummary, source: 'rules_fallback' };
  }
}
