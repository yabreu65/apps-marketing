import { buildLeadSummaryPrompt } from '@/lib/ai/lead-summary-prompt';
import { isLocalAISummaryEnabled, OllamaProvider, OllamaSummaryError } from '@/lib/ai/ollama-provider';
import { buildLeadSummary, type LeadSummaryInput, type LeadSummaryResult } from '@/lib/lead-summary';

export type LeadSummarySource = 'rules' | 'ollama' | 'rules_fallback';

export type LeadSummaryWithSource = {
  summary: LeadSummaryResult;
  source: LeadSummarySource;
};

type LeadSummaryAIInput = LeadSummaryInput & {
  name?: string;
  statusHistory?: Array<{ fromStatus?: string | null; toStatus: string; createdAt?: string | Date }>;
};

function isDev() {
  return process.env.NODE_ENV !== 'production';
}

export async function buildLeadSummaryWithOptionalAI(lead: LeadSummaryAIInput): Promise<LeadSummaryWithSource> {
  const rulesSummary = buildLeadSummary(lead);
  const enabled = isLocalAISummaryEnabled();

  if (isDev()) {
    console.info('[lead-summary] mode', {
      aiEnabled: enabled,
      source: lead.source,
      status: lead.status,
      hasNotes: Boolean(lead.notes?.length),
      hasStatusHistory: Boolean(lead.statusHistory?.length),
    });
  }

  if (!enabled) {
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

    return {
      summary: {
        opportunityType: aiResult.opportunityType,
        priority: aiResult.priority,
        summary: aiResult.summary,
        recommendedAction: aiResult.recommendedAction,
      },
      source: 'ollama',
    };
  } catch (error) {
    if (isDev()) {
      if (error instanceof OllamaSummaryError) {
        console.warn('[lead-summary] ollama:fallback', {
          code: error.code,
          message: error.message,
        });
      } else {
        console.warn('[lead-summary] ollama:fallback', {
          code: 'unknown',
          message: 'Error no controlado',
        });
      }
    }

    return { summary: rulesSummary, source: 'rules_fallback' };
  }
}
