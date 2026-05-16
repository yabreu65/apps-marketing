import { describe, expect, it } from 'vitest';

import { detectLeadAssistantIntent } from '@/modules/lead-assistant/core/detect-intent';

describe('detectLeadAssistantIntent', () => {
  it('detecta lead_followup_priority para consultas perdidas en WhatsApp/Instagram', () => {
    const result = detectLeadAssistantIntent(
      'Recibo consultas por WhatsApp e Instagram pero se me olvidan y no sé priorizarlas.',
    );

    expect(result.intent).toBe('lead_followup_priority');
    expect(result.confidence).toBeGreaterThan(0.8);
  });

  it('detecta pricing para preguntas de costos', () => {
    const result = detectLeadAssistantIntent('¿Cuánto cuesta una solución así?');

    expect(result.intent).toBe('pricing');
  });

  it('cae en not_sure cuando no hay señales claras', () => {
    const result = detectLeadAssistantIntent('Quiero mejorar mi negocio pero no sé por dónde empezar.');

    expect(result.intent).toBe('not_sure');
  });
});
