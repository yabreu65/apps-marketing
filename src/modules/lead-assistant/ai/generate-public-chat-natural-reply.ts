import { buildPublicChatLanguagePrompt } from '@/modules/lead-assistant/ai/public-chat-language-prompt';
import { generateWithOllama } from '@/modules/lead-assistant/ai/ollama-client';
import { ensureSafeAssistantCopy } from '@/modules/lead-assistant/core/safety-rules';
import type { PublicAssistantReply, PublicAssistantSource, PublicChatDecision } from '@/modules/lead-assistant/types/lead-assistant';

const INVALID_PATTERNS = [
  /openai/i,
  /claude/i,
  /whatsapp cloud api/i,
  /meta api/i,
  /garantizamos ventas/i,
  /ventas garantizadas/i,
];

function isValidNaturalReply(text: string) {
  const normalized = text.trim();
  if (!normalized) return false;
  if (normalized.length < 40 || normalized.length > 1400) return false;
  if (INVALID_PATTERNS.some((pattern) => pattern.test(normalized))) return false;
  return true;
}

export async function generatePublicChatNaturalReply(input: {
  decision: PublicChatDecision;
  baseReply: PublicAssistantReply;
}): Promise<{ reply: PublicAssistantReply; source: PublicAssistantSource }> {
  const prompt = buildPublicChatLanguagePrompt(input.decision, input.baseReply.text);

  try {
    const aiText = await generateWithOllama(prompt);

    if (!isValidNaturalReply(aiText)) {
      throw new Error('invalid_ai_reply');
    }

    return {
      source: 'ollama',
      reply: {
        ...input.baseReply,
        text: ensureSafeAssistantCopy(aiText),
        source: 'ollama',
      },
    };
  } catch {
    return {
      source: 'rules_fallback',
      reply: {
        ...input.baseReply,
        source: 'rules_fallback',
      },
    };
  }
}
