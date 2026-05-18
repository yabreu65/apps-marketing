const DEFAULT_OLLAMA_BASE_URL = 'http://localhost:11434';
const DEFAULT_OLLAMA_MODEL = 'llama3.1:8b-instruct-q4_K_M';
const DEFAULT_TIMEOUT_MS = 15000;

type OllamaGenerateResponse = {
  response?: string;
};

type OllamaClientConfig = {
  enabled: boolean;
  provider: string;
  baseUrl: string;
  model: string;
  timeoutMs: number;
};

function normalizeBoolean(value: string | undefined, fallback = false) {
  if (!value) return fallback;
  return value.trim().toLowerCase() === 'true';
}

function resolveTimeoutMs() {
  const value = Number(process.env.OLLAMA_TIMEOUT_MS ?? '');
  if (!Number.isFinite(value) || value <= 0) return DEFAULT_TIMEOUT_MS;
  return Math.floor(value);
}

export function getLeadAssistantAIConfig(): OllamaClientConfig {
  const enabled = normalizeBoolean(process.env.LEAD_ASSISTANT_AI_ENABLED) ||
    normalizeBoolean(process.env.ENABLE_LOCAL_AI_PUBLIC_ASSISTANT);

  return {
    enabled,
    provider: (process.env.LEAD_ASSISTANT_AI_PROVIDER ?? 'rules').trim().toLowerCase(),
    baseUrl: (process.env.OLLAMA_BASE_URL ?? DEFAULT_OLLAMA_BASE_URL).trim(),
    model: (process.env.OLLAMA_MODEL ?? DEFAULT_OLLAMA_MODEL).trim(),
    timeoutMs: resolveTimeoutMs(),
  };
}

export async function generateWithOllama(prompt: string): Promise<string> {
  const config = getLeadAssistantAIConfig();

  if (!config.enabled) {
    throw new Error('ai_disabled');
  }

  if (config.provider !== 'ollama') {
    throw new Error('provider_not_supported');
  }

  if (!config.baseUrl || !config.model) {
    throw new Error('missing_ollama_config');
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), config.timeoutMs);

  try {
    const response = await fetch(`${config.baseUrl}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        model: config.model,
        prompt,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`ollama_http_${response.status}`);
    }

    const payload = (await response.json().catch(() => null)) as OllamaGenerateResponse | null;
    const content = payload?.response?.trim();

    if (!content) {
      throw new Error('ollama_empty_response');
    }

    return content;
  } finally {
    clearTimeout(timeout);
  }
}
