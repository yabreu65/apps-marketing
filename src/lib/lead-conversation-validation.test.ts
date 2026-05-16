import { describe, expect, it } from 'vitest';

import {
  normalizeLeadConversationPayload,
  validateLeadConversationPayload,
} from '@/lib/lead-conversation-validation';

describe('lead-conversation-validation', () => {
  it('normaliza payload con defaults y trim', () => {
    const payload = normalizeLeadConversationPayload({
      direction: ' inbound ',
      content: '  Hola, quiero una propuesta  ',
    });

    expect(payload).toEqual({
      direction: 'inbound',
      content: 'Hola, quiero una propuesta',
      channel: 'whatsapp_simulated',
    });
  });

  it('acepta payload válido inbound', () => {
    const errors = validateLeadConversationPayload({
      direction: 'inbound',
      content: 'Necesito cotización para landing comercial.',
      channel: 'whatsapp_simulated',
    });

    expect(errors).toHaveLength(0);
  });

  it('acepta payload válido outbound', () => {
    const errors = validateLeadConversationPayload({
      direction: 'outbound',
      content: 'Perfecto, te enviamos una propuesta inicial mañana.',
      channel: 'whatsapp_simulated',
    });

    expect(errors).toHaveLength(0);
  });

  it('rechaza dirección inválida', () => {
    const errors = validateLeadConversationPayload({
      direction: 'sideways' as never,
      content: 'Mensaje válido para pruebas',
      channel: 'whatsapp_simulated',
    });

    expect(errors.some((error) => error.field === 'direction')).toBe(true);
  });

  it('rechaza contenido vacío', () => {
    const errors = validateLeadConversationPayload({
      direction: 'inbound',
      content: '',
      channel: 'whatsapp_simulated',
    });

    expect(errors.some((error) => error.field === 'content')).toBe(true);
  });

  it('rechaza contenido muy corto', () => {
    const errors = validateLeadConversationPayload({
      direction: 'inbound',
      content: 'a',
      channel: 'whatsapp_simulated',
    });

    expect(errors.some((error) => error.field === 'content')).toBe(true);
  });

  it('rechaza contenido mayor a 1000 caracteres', () => {
    const errors = validateLeadConversationPayload({
      direction: 'inbound',
      content: 'a'.repeat(1001),
      channel: 'whatsapp_simulated',
    });

    expect(errors.some((error) => error.field === 'content')).toBe(true);
  });

  it('rechaza canal inválido', () => {
    const errors = validateLeadConversationPayload({
      direction: 'inbound',
      content: 'Mensaje de prueba',
      channel: 'email' as never,
    });

    expect(errors.some((error) => error.field === 'channel')).toBe(true);
  });
});
