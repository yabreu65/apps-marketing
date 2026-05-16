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

  it('no clasifica lead_followup_priority solo por mencionar WhatsApp', () => {
    const result = detectLeadAssistantIntent('Quiero una landing para captar más consultas desde WhatsApp.');

    expect(result.intent).toBe('landing');
  });

  it('detecta not_sure cuando el visitante compara varias opciones', () => {
    const result = detectLeadAssistantIntent(
      'Tengo un negocio de servicios y no sé si necesito landing, web o IA para empezar.',
    );

    expect(result.intent).toBe('not_sure');
  });

  it('cae en not_sure cuando no hay señales claras', () => {
    const result = detectLeadAssistantIntent('Quiero mejorar mi negocio pero no sé por dónde empezar.');

    expect(result.intent).toBe('not_sure');
  });
});
