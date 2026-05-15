import type { AIProvider, LeadSummaryAIInput, LeadSummaryAIResult } from '@/lib/ai/ai-provider';
import { buildLeadSummaryPrompt } from '@/lib/ai/lead-summary-prompt';

const DEFAULT_OLLAMA_BASE_URL = 'http://localhost:11434';
const DEFAULT_OLLAMA_MODEL = 'llama3:latest';
const DEFAULT_REQUEST_TIMEOUT_MS = 20000;

type OllamaGenerateResponse = {
  response?: string;
};

type OllamaSummaryErrorCode =
  | 'timeout'
  | 'http_error'
  | 'invalid_response_json'
  | 'invalid_shape'
  | 'network_error';

export class OllamaSummaryError extends Error {
  code: OllamaSummaryErrorCode;

  constructor(code: OllamaSummaryErrorCode, message: string) {
    super(message);
    this.code = code;
  }
}

function isDev() {
  return process.env.NODE_ENV !== 'production';
}

function getOllamaConfig() {
  const timeoutFromEnv = Number(process.env.OLLAMA_TIMEOUT_MS ?? '');

  return {
    baseUrl: (process.env.OLLAMA_BASE_URL ?? DEFAULT_OLLAMA_BASE_URL).trim(),
    model: (process.env.OLLAMA_MODEL ?? DEFAULT_OLLAMA_MODEL).trim(),
    timeoutMs:
      Number.isFinite(timeoutFromEnv) && timeoutFromEnv > 0
        ? Math.floor(timeoutFromEnv)
        : DEFAULT_REQUEST_TIMEOUT_MS,
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
    const { baseUrl, model, timeoutMs } = getOllamaConfig();
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      if (isDev()) {
        console.info('[lead-summary][ollama] request:start', {
          baseUrl,
          model,
          timeoutMs,
        });
      }

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
        throw new OllamaSummaryError('http_error', `Ollama HTTP ${response.status}`);
      }

      const data = (await response.json().catch(() => null)) as OllamaGenerateResponse | null;
      if (!data || typeof data.response !== 'string') {
        throw new OllamaSummaryError('invalid_response_json', 'Ollama response payload inválido');
      }

      const parsed = parseAIResult(data.response);

      if (!parsed) {
        throw new OllamaSummaryError('invalid_shape', 'JSON de resumen con forma inválida');
      }

      if (isDev()) {
        console.info('[lead-summary][ollama] request:success', {
          priority: parsed.priority,
          hasOpportunityType: Boolean(parsed.opportunityType),
          summaryLength: parsed.summary.length,
          actionLength: parsed.recommendedAction.length,
        });
      }

      return parsed;
    } catch (error) {
      if (error instanceof OllamaSummaryError) {
        throw error;
      }

      if ((error as Error)?.name === 'AbortError') {
        throw new OllamaSummaryError('timeout', 'Timeout al consultar Ollama local');
      }

      throw new OllamaSummaryError('network_error', 'No se pudo conectar con Ollama local');
    } finally {
      clearTimeout(timeout);
    }
  }
}

export function isLocalAISummaryEnabled() {
  return (process.env.ENABLE_LOCAL_AI_SUMMARY ?? 'false').trim().toLowerCase() === 'true';
}
