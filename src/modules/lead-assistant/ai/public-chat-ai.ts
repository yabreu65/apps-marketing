import { buildPublicChatPrompt } from '@/modules/lead-assistant/ai/public-chat-prompt';
import { ensureSafeAssistantCopy } from '@/modules/lead-assistant/core/safety-rules';
import type {
  PublicAssistantReply,
  PublicAssistantSource,
  PublicChatAIInput,
} from '@/modules/lead-assistant/types/lead-assistant';

const DEFAULT_OLLAMA_BASE_URL = 'http://localhost:11434';
const DEFAULT_OLLAMA_MODEL = 'llama3:latest';
const DEFAULT_TIMEOUT_MS = 15000;

type OllamaGenerateResponse = {
  response?: string;
};

type ParsedAIReply = {
  replyText: string;
  rationale: string;
};

function isLocalPublicAssistantAIEnabled() {
  return (process.env.ENABLE_LOCAL_AI_PUBLIC_ASSISTANT ?? 'false').trim().toLowerCase() === 'true';
}

function getOllamaTimeoutMs() {
  const value = Number(process.env.OLLAMA_TIMEOUT_MS ?? '');
  return Number.isFinite(value) && value > 0 ? Math.floor(value) : DEFAULT_TIMEOUT_MS;
}

function parseAIReply(raw: string): ParsedAIReply | null {
  try {
    const parsed = JSON.parse(raw) as Partial<ParsedAIReply>;

    if (!parsed || typeof parsed.replyText !== 'string' || typeof parsed.rationale !== 'string') {
      return null;
    }

    return {
      replyText: parsed.replyText.trim(),
      rationale: parsed.rationale.trim(),
    };
  } catch {
    return null;
  }
}

export async function buildPublicLeadReplyWithOptionalAI(
  input: PublicChatAIInput,
  baseReply: PublicAssistantReply,
): Promise<{ reply: PublicAssistantReply; source: PublicAssistantSource }> {
  if (!isLocalPublicAssistantAIEnabled()) {
    return { reply: baseReply, source: 'rules' };
  }

  const baseUrl = (process.env.OLLAMA_BASE_URL ?? DEFAULT_OLLAMA_BASE_URL).trim();
  const model = (process.env.OLLAMA_MODEL ?? DEFAULT_OLLAMA_MODEL).trim();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), getOllamaTimeoutMs());

  try {
    const response = await fetch(`${baseUrl}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        model,
        prompt: buildPublicChatPrompt(input),
        format: 'json',
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`ollama_http_${response.status}`);
    }

    const payload = (await response.json().catch(() => null)) as OllamaGenerateResponse | null;

    if (!payload?.response) {
      throw new Error('ollama_invalid_payload');
    }

    const parsed = parseAIReply(payload.response);

    if (!parsed) {
      throw new Error('ollama_invalid_shape');
    }

    return {
      source: 'ollama',
      reply: {
        ...baseReply,
        text: ensureSafeAssistantCopy(parsed.replyText),
        rationale: parsed.rationale,
        source: 'ollama',
      },
    };
  } catch {
    return {
      source: 'rules_fallback',
      reply: {
        ...baseReply,
        source: 'rules_fallback',
      },
    };
  } finally {
    clearTimeout(timeout);
  }
}
