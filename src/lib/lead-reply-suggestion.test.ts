import { afterEach, describe, expect, it, vi } from 'vitest';

import { buildLeadReplySuggestionWithOptionalAI } from '@/lib/lead-reply-suggestion-ai';
import { buildLeadReplySuggestionByRules } from '@/lib/lead-reply-suggestion';

const baseInput = {
  lead: {
    name: 'Demo Lead',
    serviceInterest: 'Landing comercial',
    businessType: 'Servicios',
    message: 'Necesito captar consultas rápido',
    source: 'contact_form',
    status: 'new',
  },
  messages: [
    {
      direction: 'inbound' as const,
      content: 'Hola, ¿cuánto cuesta una landing y en qué tiempos?',
      createdAt: '2026-05-16T00:00:00.000Z',
    },
  ],
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe('lead-reply-suggestion rules', () => {
  it('detecta intención de pricing en reglas locales', () => {
    const result = buildLeadReplySuggestionByRules(baseInput);

    expect(result.source).toBe('rules');
    expect(result.suggestedReply.toLowerCase()).toContain('costo');
    expect(result.rationale.toLowerCase()).toContain('costos');
  });
});

describe('buildLeadReplySuggestionWithOptionalAI', () => {
  it('usa reglas locales por defecto', async () => {
    const result = await buildLeadReplySuggestionWithOptionalAI(baseInput);

    expect(result.source).toBe('rules');
    expect(result.suggestion.source).toBe('rules');
  });

  it('usa fallback local si el motor por reglas falla inesperadamente', async () => {
    const spy = vi
      .spyOn(await import('@/lib/lead-reply-suggestion'), 'buildLeadReplySuggestionByRules')
      .mockImplementationOnce(() => {
        throw new Error('boom');
      });

    const result = await buildLeadReplySuggestionWithOptionalAI(baseInput);

    expect(spy).toHaveBeenCalledOnce();
    expect(result.source).toBe('rules_fallback');
    expect(result.suggestion.source).toBe('rules_fallback');
  });
});
