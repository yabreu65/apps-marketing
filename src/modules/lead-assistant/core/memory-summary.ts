import type {
  PublicAssistantIntent,
  PublicAssistantMemory,
  PublicAssistantMessage,
} from '@/modules/lead-assistant/types/lead-assistant';

function uniqueIntents(intents: PublicAssistantIntent[]) {
  return Array.from(new Set(intents));
}

export function buildPublicAssistantMemorySummary(
  previousMemory: PublicAssistantMemory | null,
  messages: PublicAssistantMessage[],
  currentIntent: PublicAssistantIntent,
): PublicAssistantMemory {
  const latestVisitorMessage = messages.find((message) => message.role === 'visitor')?.content ?? '';
  const previousInterests = previousMemory?.interests ?? [];
  const interests = uniqueIntents([...previousInterests, currentIntent]).slice(-4);

  const summary = `Interés principal: ${currentIntent}. Último contexto: ${latestVisitorMessage.slice(0, 180)}`;

  return {
    summary,
    interests,
    lastTopic: currentIntent,
    updatedAt: new Date().toISOString(),
  };
}

export function describePreviousMemory(memory: PublicAssistantMemory | null) {
  if (!memory) return null;

  const interestLabel = memory.interests[0] ?? memory.lastTopic;
  if (!interestLabel) return null;

  return `La última vez estabas explorando ${interestLabel.replaceAll('_', ' ')}.`;
}
