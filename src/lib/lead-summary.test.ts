import { describe, expect, it } from 'vitest';

import { buildLeadSummary } from '@/lib/lead-summary';

describe('buildLeadSummary', () => {
  it('detecta captación comercial inicial para landing', () => {
    const result = buildLeadSummary({
      serviceInterest: 'Landing comercial',
      businessType: 'Clínica',
      message: 'Necesitamos captar más consultas urgentes.',
      source: 'contact_form',
      status: 'new',
      notes: [],
    });

    expect(result.opportunityType).toBe('Captación comercial inicial');
    expect(result.priority).toBe('high');
  });

  it('detecta evolución avanzada para IA/automatización', () => {
    const result = buildLeadSummary({
      serviceInterest: 'IA aplicada al negocio',
      businessType: 'Inmobiliaria',
      message: 'Queremos automatizar consultas repetitivas.',
      source: 'contact_form',
      status: 'new',
      notes: [],
    });

    expect(result.opportunityType).toBe('Evolución tecnológica avanzada');
  });
});
