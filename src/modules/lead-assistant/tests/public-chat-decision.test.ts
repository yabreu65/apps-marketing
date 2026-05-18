import { describe, expect, it } from 'vitest';

import { buildPublicChatDecision } from '@/modules/lead-assistant/core/public-chat-decision';

describe('buildPublicChatDecision', () => {
  it('builds structured decision with expected minimum fields', () => {
    const decision = buildPublicChatDecision({
      visitorMessage: 'vendo por instagram y whatsapp',
      detectedIntent: {
        intent: 'lead_followup_priority',
        confidence: 0.93,
        signals: ['seguimiento'],
      },
      memory: {
        summary: 'Interes principal: seguimiento.',
        interests: ['lead_followup_priority'],
        lastTopic: 'lead_followup_priority',
        updatedAt: new Date().toISOString(),
        facts: {
          businessType: 'retail / venta de productos',
          channels: ['Instagram', 'WhatsApp'],
          painPoints: ['pierde consultas o seguimiento'],
          goals: ['ordenar seguimiento'],
          recommendedPath: 'seguimiento de leads primero',
        },
      },
      conversationStage: 'diagnosis',
      baseReply: {
        text: 'texto base',
        intent: 'lead_followup_priority',
        rationale: 'rationale',
        source: 'rules',
        ctas: [{ label: 'WhatsApp', href: '#wa', kind: 'whatsapp_manual' }],
        followUpQuestion: 'Cuantas consultas recibis por dia?',
      },
    });

    expect(decision.intent).toBe('lead_followup_priority');
    expect(decision.userMessage).toBe('vendo por instagram y whatsapp');
    expect(decision.detectedContext.channels).toContain('Instagram');
    expect(decision.recommendedPath).toContain('seguimiento');
    expect(decision.nextQuestion).toContain('Cuantas consultas');
    expect(decision.constraints.length).toBeGreaterThan(0);
  });
});
