import type { AIProvider, LeadSummaryAIInput, LeadSummaryAIResult } from '@/lib/ai/ai-provider';
import { buildLeadSummaryPrompt } from '@/lib/ai/lead-summary-prompt';

const DEFAULT_OLLAMA_BASE_URL = 'http://localhost:11434';
const DEFAULT_OLLAMA_MODEL = 'llama3:latest';
const REQUEST_TIMEOUT_MS = 8000;

type OllamaGenerateResponse = {
  response?: string;
};

function getOllamaConfig() {
  return {
    baseUrl: (process.env.OLLAMA_BASE_URL ?? DEFAULT_OLLAMA_BASE_URL).trim(),
    model: (process.env.OLLAMA_MODEL ?? DEFAULT_OLLAMA_MODEL).trim(),
  };
}

function parseAIResult(raw: string): LeadSummaryAIResult | null {
  try {
    const parsed = JSON.parse(raw) as Partial<LeadSummaryAIResult>;

    if (
      !parsed ||
      typeof parsed.opportunityType !== 'string' ||
      typeof parsed.summary !== 'string' ||
      typeof parsed.recommendedAction !== 'string' ||
      (parsed.priority !== 'low' && parsed.priority !== 'medium' && parsed.priority !== 'high')
    ) {
      return null;
    }

    return {
      opportunityType: parsed.opportunityType,
      priority: parsed.priority,
      summary: parsed.summary,
      recommendedAction: parsed.recommendedAction,
    };
  } catch {
    return null;
  }
}

export class OllamaProvider implements AIProvider {
  async generateLeadSummary(input: LeadSummaryAIInput): Promise<LeadSummaryAIResult> {
    const { baseUrl, model } = getOllamaConfig();
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch(`${baseUrl}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          model,
          prompt: input.prompt ?? buildLeadSummaryPrompt(input),
          stream: false,
          format: 'json',
        }),
      });

      if (!response.ok) {
        throw new Error('Ollama request failed');
      }

      const data = (await response.json()) as OllamaGenerateResponse;
      const parsed = parseAIResult(data.response ?? '');

      if (!parsed) {
        throw new Error('Invalid AI response format');
      }

      return parsed;
    } catch {
      throw new Error('No se pudo generar resumen con IA local.');
    } finally {
      clearTimeout(timeout);
    }
  }
}

export function isLocalAISummaryEnabled() {
  return (process.env.ENABLE_LOCAL_AI_SUMMARY ?? 'false').trim().toLowerCase() === 'true';
}
