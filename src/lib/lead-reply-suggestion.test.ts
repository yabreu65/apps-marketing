import { afterEach, describe, expect, it, vi } from 'vitest';

import { buildLeadReplySuggestionWithOptionalAI } from '@/lib/lead-reply-suggestion-ai';
import { buildLeadReplySuggestionByRules } from '@/lib/lead-reply-suggestion';
import { resetTestEnv, setTestEnv } from '@/test/request-helpers';

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
  it('usa reglas cuando ENABLE_LOCAL_AI_REPLY_SUGGESTION=false', async () => {
    const previousEnv = setTestEnv({ ENABLE_LOCAL_AI_REPLY_SUGGESTION: 'false' });
    const fetchSpy = vi.spyOn(globalThis, 'fetch');

    const result = await buildLeadReplySuggestionWithOptionalAI(baseInput);

    expect(result.source).toBe('rules');
    expect(result.suggestion.source).toBe('rules');
    expect(fetchSpy).not.toHaveBeenCalled();

    resetTestEnv(previousEnv);
  });

  it('usa ollama cuando está habilitado y responde JSON válido', async () => {
    const previousEnv = setTestEnv({
      ENABLE_LOCAL_AI_REPLY_SUGGESTION: 'true',
      OLLAMA_BASE_URL: 'http://localhost:11434',
      OLLAMA_MODEL: 'llama3:latest',
      OLLAMA_TIMEOUT_MS: '20000',
    });

    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          response: JSON.stringify({
            suggestedReply: 'Gracias por escribir. Te propongo revisar alcance y tiempos en una llamada breve.',
            rationale: 'La consulta pide costos y plazos, por eso conviene alinear alcance primero.',
          }),
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      ),
    );

    const result = await buildLeadReplySuggestionWithOptionalAI(baseInput);

    expect(result.source).toBe('ollama');
    expect(result.suggestion.source).toBe('ollama');
    expect(result.suggestion.suggestedReply.toLowerCase()).toContain('alcance');

    resetTestEnv(previousEnv);
  });

  it('hace fallback a reglas si ollama falla', async () => {
    const previousEnv = setTestEnv({
      ENABLE_LOCAL_AI_REPLY_SUGGESTION: 'true',
      OLLAMA_BASE_URL: 'http://localhost:11434',
      OLLAMA_MODEL: 'llama3:latest',
      OLLAMA_TIMEOUT_MS: '20000',
    });

    vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('network down'));

    const result = await buildLeadReplySuggestionWithOptionalAI(baseInput);

    expect(result.source).toBe('rules_fallback');
    expect(result.suggestion.source).toBe('rules_fallback');

    resetTestEnv(previousEnv);
  });
});
