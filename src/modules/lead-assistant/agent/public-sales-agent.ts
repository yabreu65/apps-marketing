import { generateGeminiPublicChatReply, getGeminiPublicChatConfig } from '@/lib/ai/gemini-public-chat-provider';
import { buildPublicSalesAgentPrompt } from '@/modules/lead-assistant/agent/public-sales-agent-prompt';
import { loadSalesKnowledge } from '@/modules/lead-assistant/agent/knowledge-loader';
import { upsertLeadFromChat, validateAgentReplyText } from '@/modules/lead-assistant/agent/agent-tools';
import { ensureSafeAssistantCopy } from '@/modules/lead-assistant/core/safety-rules';
import { buildTechnicalAIErrorReply } from '@/modules/lead-assistant/core/technical-error-reply';
import type {
  PublicAssistantMemory,
  PublicAssistantMessage,
  PublicAssistantReply,
  PublicChatDecision,
} from '@/modules/lead-assistant/types/lead-assistant';

const fallbackEnabled = () => (process.env.LEAD_AGENT_FALLBACK_ENABLED ?? 'true').trim().toLowerCase() === 'true';

function buildConversationHistory(messages: PublicAssistantMessage[]) {
  const recent = messages.slice(-8);
  if (recent.length === 0) return 'Sin historial.';

  return recent
    .map((message) => `${message.role === 'assistant' ? 'assistant' : 'visitor'}: ${message.content}`)
    .join(' | ')
    .slice(0, 2000);
}

export async function generatePublicChatAIReply(input: {
  message: string;
  decision: PublicChatDecision;
  memory: PublicAssistantMemory | null;
  messages: PublicAssistantMessage[];
}) {
  const knowledge = await loadSalesKnowledge();
  const prompt = buildPublicSalesAgentPrompt({
    message: input.message,
    decision: input.decision,
    memory: input.memory,
    knowledge,
    conversationHistory: buildConversationHistory(input.messages),
  });

  const aiReply = await generateGeminiPublicChatReply({ prompt });

  if (!validateAgentReplyText(aiReply.replyText)) {
    throw new Error('invalid_agent_reply');
  }

  return aiReply;
}

export async function resolvePublicSalesAgentReply(input: {
  message: string;
  decision: PublicChatDecision;
  memory: PublicAssistantMemory | null;
  messages: PublicAssistantMessage[];
  baseReply: PublicAssistantReply;
  visitorKey: string;
}) {
  const config = getGeminiPublicChatConfig();

  if (!config.enabled) {
    if (!fallbackEnabled()) {
      throw new Error('gemini_public_chat_not_enabled');
    }

    return {
      reply: {
        ...input.baseReply,
        text: buildTechnicalAIErrorReply(),
        source: 'rules_fallback' as const,
      },
      summary: '',
      leadAction: 'none' as const,
      source: 'rules_fallback' as const,
    };
  }

  try {
    const aiReply = await generatePublicChatAIReply({
      message: input.message,
      decision: input.decision,
      memory: input.memory,
      messages: input.messages,
    });

    await upsertLeadFromChat({
      visitorKey: input.visitorKey,
      intent: input.baseReply.intent,
      memoryFacts: input.memory?.facts,
      summary: aiReply.summary,
      leadAction: aiReply.leadAction,
    });

    return {
      reply: {
        ...input.baseReply,
        text: ensureSafeAssistantCopy(aiReply.replyText),
        source: 'gemini' as const,
      },
      summary: aiReply.summary,
      leadAction: aiReply.leadAction,
      source: 'gemini' as const,
    };
  } catch {
    if (!fallbackEnabled()) {
      throw new Error('gemini_public_chat_failed_without_fallback');
    }

    return {
      reply: {
        ...input.baseReply,
        text: buildTechnicalAIErrorReply(),
        source: 'rules_fallback' as const,
      },
      summary: '',
      leadAction: 'none' as const,
      source: 'rules_fallback' as const,
    };
  }
}
