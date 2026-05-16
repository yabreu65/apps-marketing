import { Prisma } from '@prisma/client';

import { appsMarketingAssistantConfig } from '@/modules/lead-assistant/config/appsMarketingAssistantConfig';
import { buildPublicLeadReplyWithOptionalAI } from '@/modules/lead-assistant/ai/public-chat-ai';
import { buildPublicLeadAssistantResponse } from '@/modules/lead-assistant/core/build-response';
import { detectLeadAssistantIntent } from '@/modules/lead-assistant/core/detect-intent';
import { buildPublicAssistantMemorySummary } from '@/modules/lead-assistant/core/memory-summary';
import {
  containsSensitiveData,
  getSensitiveDataWarning,
  sanitizeVisitorMessage,
} from '@/modules/lead-assistant/core/safety-rules';
import { prisma } from '@/lib/prisma';
import type {
  PublicAssistantMemory,
  PublicAssistantMessage,
  PublicAssistantReply,
  PublicAssistantState,
  PublicChatTurnRequest,
} from '@/modules/lead-assistant/types/lead-assistant';

function mapMemoryFromDb(memory: {
  summary: string | null;
  interests: Prisma.JsonValue | null;
  lastTopic: string | null;
  updatedAt: Date;
} | null): PublicAssistantMemory | null {
  if (!memory) return null;

  const interests = Array.isArray(memory.interests)
    ? (memory.interests.filter((value): value is string => typeof value === 'string') as PublicAssistantMemory['interests'])
    : [];

  return {
    summary: memory.summary ?? '',
    interests,
    lastTopic: memory.lastTopic ?? '',
    updatedAt: memory.updatedAt.toISOString(),
  };
}

function mapStateFromDb(params: {
  visitorKey: string;
  memory: {
    summary: string | null;
    interests: Prisma.JsonValue | null;
    lastTopic: string | null;
    updatedAt: Date;
  } | null;
  messages: Array<{ id: string; role: string; content: string; createdAt: Date }>;
}): PublicAssistantState {
  const mappedMessages: PublicAssistantMessage[] = params.messages
    .slice()
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .map((message) => ({
      id: message.id,
      role: message.role === 'assistant' ? 'assistant' : 'visitor',
      content: message.content,
      createdAt: message.createdAt.toISOString(),
    }));

  return {
    visitorKey: params.visitorKey,
    memory: mapMemoryFromDb(params.memory),
    messages: mappedMessages,
  };
}

async function getOrCreateVisitorWithSession(visitorKey: string) {
  const visitor = await prisma.publicChatVisitor.upsert({
    where: { visitorKey },
    update: {},
    create: { visitorKey },
    select: { id: true },
  });

  const existingSession = await prisma.publicChatSession.findFirst({
    where: { visitorId: visitor.id },
    orderBy: { createdAt: 'desc' },
    select: { id: true },
  });

  if (existingSession) {
    return { visitorId: visitor.id, sessionId: existingSession.id };
  }

  const createdSession = await prisma.publicChatSession.create({
    data: {
      visitorId: visitor.id,
      messages: {
        create: {
          role: 'assistant',
          content: appsMarketingAssistantConfig.greeting,
        },
      },
    },
    select: { id: true },
  });

  return { visitorId: visitor.id, sessionId: createdSession.id };
}

export async function getPublicChatStateByVisitorKey(visitorKey: string): Promise<PublicAssistantState> {
  const normalizedVisitorKey = visitorKey.trim();

  const { visitorId, sessionId } = await getOrCreateVisitorWithSession(normalizedVisitorKey);

  const [memory, messages] = await Promise.all([
    prisma.publicVisitorMemory.findUnique({
      where: { visitorId },
      select: {
        summary: true,
        interests: true,
        lastTopic: true,
        updatedAt: true,
      },
    }),
    prisma.publicChatMessage.findMany({
      where: { sessionId },
      orderBy: { createdAt: 'desc' },
      take: 60,
      select: {
        id: true,
        role: true,
        content: true,
        createdAt: true,
      },
    }),
  ]);

  return mapStateFromDb({
    visitorKey: normalizedVisitorKey,
    memory,
    messages,
  });
}

export async function processPersistentPublicChatTurn(
  payload: PublicChatTurnRequest,
): Promise<{ state: PublicAssistantState; reply: PublicAssistantReply }> {
  const visitorKey = payload.visitorKey.trim();
  const sanitizedInput = sanitizeVisitorMessage(payload.message);

  const { visitorId, sessionId } = await getOrCreateVisitorWithSession(visitorKey);

  const currentState = await getPublicChatStateByVisitorKey(visitorKey);

  if (containsSensitiveData(sanitizedInput)) {
    const warningReply: PublicAssistantReply = {
      text: getSensitiveDataWarning(),
      intent: 'not_sure',
      rationale: 'Guardrail por contenido sensible.',
      source: 'rules',
      ctas: [],
    };

    await prisma.publicChatMessage.createMany({
      data: [
        { sessionId, role: 'visitor', content: sanitizedInput },
        { sessionId, role: 'assistant', content: warningReply.text },
      ],
    });

    const state = await getPublicChatStateByVisitorKey(visitorKey);
    return { state, reply: warningReply };
  }

  const detectedIntent = detectLeadAssistantIntent(sanitizedInput);

  const baseReply = buildPublicLeadAssistantResponse(
    {
      visitorMessage: sanitizedInput,
      detectedIntent,
      memory: currentState.memory,
    },
    appsMarketingAssistantConfig,
  );

  const resolvedReply = await buildPublicLeadReplyWithOptionalAI(
    {
      visitorMessage: sanitizedInput,
      detectedIntent: detectedIntent.intent,
      memorySummary: currentState.memory?.summary,
    },
    baseReply,
  );

  await prisma.$transaction(async (tx) => {
    await tx.publicChatMessage.createMany({
      data: [
        { sessionId, role: 'visitor', content: sanitizedInput },
        { sessionId, role: 'assistant', content: resolvedReply.reply.text },
      ],
    });

    const syntheticMessages: PublicAssistantMessage[] = [
      {
        id: `visitor-${Date.now()}`,
        role: 'visitor',
        content: sanitizedInput,
        createdAt: new Date().toISOString(),
      },
      {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: resolvedReply.reply.text,
        intent: resolvedReply.reply.intent,
        createdAt: new Date().toISOString(),
      },
      ...currentState.messages,
    ];

    const nextMemory = buildPublicAssistantMemorySummary(
      currentState.memory,
      syntheticMessages,
      detectedIntent.intent,
    );

    await tx.publicVisitorMemory.upsert({
      where: { visitorId },
      create: {
        visitorId,
        summary: nextMemory.summary,
        interests: nextMemory.interests,
        lastTopic: nextMemory.lastTopic,
      },
      update: {
        summary: nextMemory.summary,
        interests: nextMemory.interests,
        lastTopic: nextMemory.lastTopic,
      },
    });
  });

  const state = await getPublicChatStateByVisitorKey(visitorKey);

  return {
    state,
    reply: resolvedReply.reply,
  };
}

export async function clearPublicChatMemoryByVisitorKey(visitorKey: string) {
  const normalizedVisitorKey = visitorKey.trim();

  const visitor = await prisma.publicChatVisitor.findUnique({
    where: { visitorKey: normalizedVisitorKey },
    select: { id: true },
  });

  if (!visitor) {
    return;
  }

  await prisma.$transaction(async (tx) => {
    await tx.publicVisitorMemory.deleteMany({ where: { visitorId: visitor.id } });
    await tx.publicChatSession.deleteMany({ where: { visitorId: visitor.id } });
  });
}
