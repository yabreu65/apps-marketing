import { buildPublicLeadReplyWithOptionalAI } from '@/modules/lead-assistant/ai/public-chat-ai';
import { buildPublicLeadAssistantResponse } from '@/modules/lead-assistant/core/build-response';
import { detectLeadAssistantIntent } from '@/modules/lead-assistant/core/detect-intent';
import {
  buildPublicAssistantMemorySummary,
  describePreviousMemory,
} from '@/modules/lead-assistant/core/memory-summary';
import {
  containsSensitiveData,
  getSensitiveDataWarning,
  sanitizeVisitorMessage,
} from '@/modules/lead-assistant/core/safety-rules';
import type {
  AppsMarketingAssistantConfig,
  PublicAssistantMessage,
  PublicAssistantReply,
  PublicAssistantState,
} from '@/modules/lead-assistant/types/lead-assistant';

function createMessage(role: PublicAssistantMessage['role'], content: string, intent?: PublicAssistantMessage['intent']) {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    content,
    intent,
    createdAt: new Date().toISOString(),
  } satisfies PublicAssistantMessage;
}

export async function processPublicAssistantMessage(params: {
  visitorInput: string;
  state: PublicAssistantState;
  config: AppsMarketingAssistantConfig;
}): Promise<{ nextState: PublicAssistantState; reply: PublicAssistantReply }> {
  const sanitizedInput = sanitizeVisitorMessage(params.visitorInput);

  const visitorMessage = createMessage('visitor', sanitizedInput);

  if (containsSensitiveData(sanitizedInput)) {
    const warningReply: PublicAssistantReply = {
      text: getSensitiveDataWarning(),
      intent: 'not_sure',
      rationale: 'Guardrail de seguridad por contenido sensible detectado.',
      source: 'rules',
      ctas: [],
    };

    const assistantMessage = createMessage('assistant', warningReply.text, warningReply.intent);

    return {
      reply: warningReply,
      nextState: {
        ...params.state,
        messages: [assistantMessage, visitorMessage, ...params.state.messages],
      },
    };
  }

  const detectedIntent = detectLeadAssistantIntent(sanitizedInput);
  const baseReply = buildPublicLeadAssistantResponse(
    {
      visitorMessage: sanitizedInput,
      detectedIntent,
      memory: params.state.memory,
    },
    params.config,
  );

  const previousMemoryLine = describePreviousMemory(params.state.memory);

  const resolvedReply = await buildPublicLeadReplyWithOptionalAI(
    {
      visitorMessage: sanitizedInput,
      detectedIntent: detectedIntent.intent,
      memorySummary: params.state.memory?.summary,
    },
    previousMemoryLine
      ? {
          ...baseReply,
          text: `${previousMemoryLine} ${baseReply.text}`,
        }
      : baseReply,
  );

  const assistantMessage = createMessage('assistant', resolvedReply.reply.text, resolvedReply.reply.intent);
  const nextMessages = [assistantMessage, visitorMessage, ...params.state.messages];
  const nextMemory = buildPublicAssistantMemorySummary(params.state.memory, nextMessages, detectedIntent.intent);

  return {
    reply: resolvedReply.reply,
    nextState: {
      ...params.state,
      messages: nextMessages,
      memory: nextMemory,
    },
  };
}
