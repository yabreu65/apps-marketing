import {
  LEAD_CONVERSATION_CHANNELS,
  LEAD_CONVERSATION_DIRECTIONS,
  type LeadConversationCreatePayload,
  type LeadConversationValidationError,
} from '@/types/lead-conversation';

const MIN_CONTENT_LENGTH = 2;
const MAX_CONTENT_LENGTH = 1000;

export function normalizeLeadConversationPayload(input: unknown): LeadConversationCreatePayload {
  const obj = (input && typeof input === 'object' ? input : {}) as Record<string, unknown>;

  return {
    direction: String(obj.direction ?? '').trim() as LeadConversationCreatePayload['direction'],
    content: String(obj.content ?? '').trim(),
    channel: String(obj.channel ?? 'whatsapp_simulated').trim() as LeadConversationCreatePayload['channel'],
  };
}

export function validateLeadConversationPayload(payload: LeadConversationCreatePayload): LeadConversationValidationError[] {
  const errors: LeadConversationValidationError[] = [];

  if (!LEAD_CONVERSATION_DIRECTIONS.includes(payload.direction)) {
    errors.push({ field: 'direction', message: 'La dirección del mensaje no es válida.' });
  }

  if (!payload.content) {
    errors.push({ field: 'content', message: 'El contenido del mensaje es obligatorio.' });
  } else if (payload.content.length < MIN_CONTENT_LENGTH || payload.content.length > MAX_CONTENT_LENGTH) {
    errors.push({ field: 'content', message: 'El mensaje debe tener entre 2 y 1000 caracteres.' });
  }

  if (payload.channel && !LEAD_CONVERSATION_CHANNELS.includes(payload.channel)) {
    errors.push({ field: 'channel', message: 'El canal de conversación no es válido.' });
  }

  return errors;
}
