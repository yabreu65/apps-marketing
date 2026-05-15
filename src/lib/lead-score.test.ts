import { describe, expect, it } from 'vitest';

import { buildLeadScore } from '@/lib/lead-score';

describe('buildLeadScore', () => {
  it('marca high para proposal con señales fuertes', () => {
    const result = buildLeadScore({
      serviceInterest: 'MVP SaaS',
      businessType: 'Consultora',
      message: 'Estamos listos para propuesta, necesitamos roadmap corto y seguimiento urgente esta semana.',
      source: 'contact_form',
      status: 'proposal',
      email: 'test@example.com',
      phone: '',
      notes: [{ content: 'Cliente pidió propuesta' }],
      statusHistory: [{ toStatus: 'proposal' }],
    });

    expect(result.score).toBeGreaterThanOrEqual(70);
    expect(result.level).toBe('high');
  });

  it('marca low en archivado con pocas señales', () => {
    const result = buildLeadScore({
      serviceInterest: 'Landing comercial',
      businessType: '',
      message: 'hola',
      source: 'contact_form',
      status: 'archived',
      email: '',
      phone: '',
      notes: [],
      statusHistory: [],
    });

    expect(result.level).toBe('low');
    expect(result.score).toBeLessThan(40);
    expect(result.missingSignals.length).toBeGreaterThan(0);
  });
});
