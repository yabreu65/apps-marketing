import { buildLeadReplySuggestionPrompt } from '@/lib/ai/lead-reply-suggestion-prompt';
import { buildLeadReplySuggestionByRules } from '@/lib/lead-reply-suggestion';
import type {
  LeadReplySuggestion,
  LeadReplySuggestionInput,
  LeadReplySuggestionSource,
} from '@/types/lead-reply-suggestion';

const DEFAULT_OLLAMA_BASE_URL = 'http://localhost:11434';
const DEFAULT_OLLAMA_MODEL = 'llama3:latest';
const DEFAULT_REQUEST_TIMEOUT_MS = 20000;

type OllamaGenerateResponse = {
  response?: string;
};

type ParsedReplySuggestion = {
  suggestedReply: string;
  rationale: string;
};

export type LeadReplySuggestionWithSource = {
  suggestion: LeadReplySuggestion;
  source: LeadReplySuggestionSource;
};

function isDev() {
  return process.env.NODE_ENV !== 'production';
}

function isLocalAIReplySuggestionEnabled() {
  return (process.env.ENABLE_LOCAL_AI_REPLY_SUGGESTION ?? 'false').trim().toLowerCase() === 'true';
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

function parseSuggestion(raw: string): ParsedReplySuggestion | null {
  try {
    const parsed = JSON.parse(raw) as Partial<ParsedReplySuggestion>;

    if (!parsed || typeof parsed.suggestedReply !== 'string' || typeof parsed.rationale !== 'string') {
      return null;
    }

    const suggestedReply = parsed.suggestedReply.trim();
    const rationale = parsed.rationale.trim();

    if (suggestedReply.length < 5 || suggestedReply.length > 1000) {
      return null;
    }

    if (rationale.length < 5 || rationale.length > 300) {
      return null;
    }

    return {
      suggestedReply,
      rationale,
    };
  } catch {
    return null;
  }
}

async function generateWithOllama(input: LeadReplySuggestionInput): Promise<ParsedReplySuggestion> {
  const { baseUrl, model, timeoutMs } = getOllamaConfig();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    if (isDev()) {
      console.info('[lead-reply][ollama] request:start', {
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
        prompt: buildLeadReplySuggestionPrompt(input),
        stream: false,
        format: 'json',
      }),
    });

    if (!response.ok) {
      throw new Error(`ollama_http_${response.status}`);
    }

    const data = (await response.json().catch(() => null)) as OllamaGenerateResponse | null;

    if (!data || typeof data.response !== 'string') {
      throw new Error('ollama_invalid_payload');
    }

    const parsed = parseSuggestion(data.response);

    if (!parsed) {
      throw new Error('ollama_invalid_shape');
    }

    if (isDev()) {
      console.info('[lead-reply][ollama] request:success', {
        replyLength: parsed.suggestedReply.length,
      });
    }

    return parsed;
  } finally {
    clearTimeout(timeout);
  }
}

export async function buildLeadReplySuggestionWithOptionalAI(
  input: LeadReplySuggestionInput,
): Promise<LeadReplySuggestionWithSource> {
  const rulesSuggestion = buildLeadReplySuggestionByRules(input);

  if (!isLocalAIReplySuggestionEnabled()) {
    return {
      suggestion: rulesSuggestion,
      source: 'rules',
    };
  }

  try {
    const aiSuggestion = await generateWithOllama(input);

    return {
      suggestion: {
        suggestedReply: aiSuggestion.suggestedReply,
        rationale: aiSuggestion.rationale,
        source: 'ollama',
      },
      source: 'ollama',
    };
  } catch (error) {
    if (isDev()) {
      const name = (error as Error)?.name;
      const message = (error as Error)?.message;
      console.warn('[lead-reply] ollama:fallback', {
        code: name === 'AbortError' ? 'timeout' : 'error',
        message: message ?? 'unknown',
      });
    }

    return {
      suggestion: {
        ...rulesSuggestion,
        source: 'rules_fallback',
      },
      source: 'rules_fallback',
    };
  }
}

export function __private__parseSuggestionForTests(raw: string) {
  return parseSuggestion(raw);
}
