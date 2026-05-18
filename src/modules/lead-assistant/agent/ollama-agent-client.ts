const DEFAULT_OLLAMA_BASE_URL = 'http://localhost:11434';
const DEFAULT_OLLAMA_MODEL = 'llama3:latest';
const DEFAULT_TIMEOUT_MS = 15000;

type AgentJsonResponse = {
  replyText?: string;
  summary?: string;
  leadAction?: 'create' | 'update' | 'none';
};

export function getLeadAgentConfig() {
  const enabled = (process.env.LEAD_AGENT_ENABLED ?? 'false').trim().toLowerCase() === 'true';
  const provider = (process.env.LEAD_AGENT_PROVIDER ?? 'ollama').trim().toLowerCase();
  const baseUrl = (process.env.OLLAMA_BASE_URL ?? DEFAULT_OLLAMA_BASE_URL).trim();
  const model = (process.env.OLLAMA_MODEL ?? DEFAULT_OLLAMA_MODEL).trim();
  const timeoutMs = Number(process.env.OLLAMA_TIMEOUT_MS ?? DEFAULT_TIMEOUT_MS);

  return {
    enabled,
    provider,
    baseUrl,
    model,
    timeoutMs: Number.isFinite(timeoutMs) && timeoutMs > 0 ? Math.floor(timeoutMs) : DEFAULT_TIMEOUT_MS,
  };
}

export async function generateAgentReply(prompt: string) {
  const config = getLeadAgentConfig();

  if (!config.enabled) {
    throw new Error('lead_agent_disabled');
  }

  if (config.provider !== 'ollama') {
    throw new Error('unsupported_provider');
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
        format: 'json',
      }),
    });

    if (!response.ok) {
      throw new Error(`ollama_http_${response.status}`);
    }

    const payload = (await response.json().catch(() => null)) as { response?: string } | null;
    const raw = payload?.response?.trim();

    if (!raw) {
      throw new Error('ollama_empty_response');
    }

    const parsed = JSON.parse(raw) as AgentJsonResponse;
    if (!parsed.replyText || typeof parsed.replyText !== 'string') {
      throw new Error('ollama_invalid_reply_shape');
    }

    return {
      replyText: parsed.replyText.trim(),
      summary: `${parsed.summary ?? ''}`.trim(),
      leadAction: parsed.leadAction ?? 'none',
    };
  } finally {
    clearTimeout(timeout);
  }
}
