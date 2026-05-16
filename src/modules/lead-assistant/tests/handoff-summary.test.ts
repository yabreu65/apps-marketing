import { describe, expect, it } from 'vitest';

import {
  buildPublicLeadHandoffSummary,
  buildPublicLeadHandoffWhatsAppMessage,
  formatPublicLeadHandoffSummary,
} from '@/modules/lead-assistant/core/handoff-summary';

describe('buildPublicLeadHandoffSummary', () => {
  it('genera resumen con campos útiles para handoff comercial', () => {
    const summary = buildPublicLeadHandoffSummary({
      intent: 'lead_followup_priority',
      memory: {
        summary: 'Interés principal: seguimiento y priorización de consultas.',
        interests: ['lead_followup_priority'],
        lastTopic: 'lead_followup_priority',
        updatedAt: new Date().toISOString(),
      },
      latestVisitorMessage:
        'Recibo consultas por WhatsApp e Instagram y se me pasan varias, quiero ordenarlo cuanto antes.',
    });

    expect(summary.projectType.toLowerCase()).toContain('seguimiento');
    expect(summary.probableService.toLowerCase()).toContain('seguimiento');
    expect(summary.urgencyLevel).toBe('Alta');
    expect(summary.nextRecommendedStep.length).toBeGreaterThan(10);
  });

  it('no inventa información cuando faltan datos', () => {
    const summary = buildPublicLeadHandoffSummary({
      intent: 'not_sure',
      memory: null,
      latestVisitorMessage: null,
    });

    expect(summary.mainGoalOrProblem).toBe('Dato pendiente');
    expect(summary.probableService).toBe('Dato pendiente');
    expect(summary.urgencyLevel).toBe('Dato pendiente');
  });

  it('formatea resumen y mensaje de WhatsApp manual de forma legible', () => {
    const summary = buildPublicLeadHandoffSummary({
      intent: 'landing',
      memory: null,
      latestVisitorMessage: 'Necesito captar más consultas con una oferta clara.',
    });

    const formatted = formatPublicLeadHandoffSummary(summary);
    const whatsappMessage = buildPublicLeadHandoffWhatsAppMessage(summary);

    expect(formatted).toContain('Tipo de proyecto:');
    expect(formatted).toContain('Objetivo/problema:');
    expect(whatsappMessage).toContain('Resumen para contacto');
    expect(whatsappMessage).toContain('Siguiente paso recomendado:');
  });
});
