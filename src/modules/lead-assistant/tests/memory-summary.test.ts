import { describe, expect, it } from 'vitest';

import {
  buildPublicAssistantMemorySummary,
  describePreviousMemory,
  parsePublicAssistantMemoryFacts,
} from '@/modules/lead-assistant/core/memory-summary';

describe('memory-summary', () => {
  it('agrega intención actual y mantiene resumen', () => {
    const memory = buildPublicAssistantMemorySummary(
      null,
      [
        {
          id: 'msg-1',
          role: 'visitor',
          content: 'Necesito un dashboard para priorizar leads',
          createdAt: new Date().toISOString(),
        },
      ],
      'dashboard',
    );

    expect(memory.interests).toContain('dashboard');
    expect(memory.summary.toLowerCase()).toContain('dashboard interno');
  });

  it('describe memoria previa para continuidad', () => {
    const line = describePreviousMemory({
      summary: 'Interés principal: mvp_saas',
      interests: ['mvp_saas'],
      lastTopic: 'mvp_saas',
      updatedAt: new Date().toISOString(),
    });

    expect(line).toContain('mvp saas');
  });

  it('guarda memoria estructurada de negocio, canales y dolores', () => {
    const memory = buildPublicAssistantMemorySummary(
      null,
      [
        {
          id: 'msg-1',
          role: 'visitor',
          content: 'Tengo una tienda de ropa, vendo por Instagram y WhatsApp pero pierdo consultas',
          createdAt: new Date().toISOString(),
        },
      ],
      'lead_followup_priority',
      'recommendation',
    );

    expect(memory.conversationStage).toBe('recommendation');
    expect(memory.facts?.businessType).toBe('retail / venta de productos');
    expect(memory.facts?.channels).toEqual(expect.arrayContaining(['Instagram', 'WhatsApp']));
    expect(memory.facts?.painPoints).toContain('pierde consultas o seguimiento');
    expect(memory.facts?.recommendedPath).toContain('seguimiento de leads primero');
  });

  it('puede reconstruir facts desde el summary persistido', () => {
    const facts = parsePublicAssistantMemoryFacts(
      'Interés principal: seguimiento. Etapa: recommendation. Negocio: retail / venta de productos | Canales: Instagram, WhatsApp | Dolores: pierde consultas o seguimiento | Objetivos: ordenar seguimiento | Camino sugerido: seguimiento de leads primero; captación como complemento. Último contexto: x',
    );

    expect(facts.businessType).toBe('retail / venta de productos');
    expect(facts.channels).toEqual(['Instagram', 'WhatsApp']);
    expect(facts.painPoints).toContain('pierde consultas o seguimiento');
    expect(facts.recommendedPath).toContain('seguimiento de leads primero');
  });
});
