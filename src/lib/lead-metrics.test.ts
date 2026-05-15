import { describe, expect, it } from 'vitest';

import { buildLeadDashboardMetrics } from '@/lib/lead-metrics';

describe('buildLeadDashboardMetrics', () => {
  it('calcula métricas por status y servicio más consultado', () => {
    const metrics = buildLeadDashboardMetrics([
      {
        status: 'new',
        serviceInterest: 'Landing comercial',
        message: 'Necesito una landing para captar consultas esta semana, con enfoque comercial.',
        source: 'contact_form',
        email: 'demo1@example.com',
        phone: '',
        businessType: 'Clínica',
      },
      {
        status: 'proposal',
        serviceInterest: 'MVP SaaS',
        message: 'Queremos validar una idea SaaS y avanzar con propuesta.',
        source: 'contact_form',
        email: 'demo2@example.com',
        phone: '+5491111111111',
        businessType: 'Software',
      },
      {
        status: 'contacted',
        serviceInterest: 'Landing comercial',
        message: 'Buscamos mejorar conversiones con una landing clara.',
        source: 'chat',
        email: 'demo3@example.com',
        phone: null,
        businessType: null,
      },
    ]);

    expect(metrics.total).toBe(3);
    expect(metrics.byStatus.new).toBe(1);
    expect(metrics.byStatus.proposal).toBe(1);
    expect(metrics.byStatus.contacted).toBe(1);
    expect(metrics.byStatus.qualified).toBe(0);
    expect(metrics.byStatus.closed).toBe(0);
    expect(metrics.byStatus.archived).toBe(0);
    expect(metrics.uncontacted).toBe(1);
    expect(metrics.topServiceInterest).toEqual({ name: 'Landing comercial', count: 2 });
  });

  it('ignora status inválidos en buckets, pero mantiene total', () => {
    const metrics = buildLeadDashboardMetrics([
      {
        status: 'custom_status',
        serviceInterest: 'Sistema web a medida',
        message: 'Necesito ordenar procesos internos con un sistema.',
        source: 'unknown',
      },
    ]);

    expect(metrics.total).toBe(1);
    expect(metrics.byStatus.new).toBe(0);
    expect(metrics.byStatus.contacted).toBe(0);
    expect(metrics.byStatus.qualified).toBe(0);
    expect(metrics.byStatus.proposal).toBe(0);
    expect(metrics.byStatus.closed).toBe(0);
    expect(metrics.byStatus.archived).toBe(0);
    expect(metrics.topServiceInterest).toEqual({ name: 'Sistema web a medida', count: 1 });
  });

  it('retorna topServiceInterest null cuando no hay intereses válidos', () => {
    const metrics = buildLeadDashboardMetrics([
      {
        status: 'new',
        serviceInterest: '   ',
        message: 'Quiero orientación',
        source: 'diagnosis',
      },
    ]);

    expect(metrics.topServiceInterest).toBeNull();
  });

  it('cuenta alto potencial usando reglas de lead score', () => {
    const metrics = buildLeadDashboardMetrics([
      {
        status: 'proposal',
        serviceInterest: 'MVP SaaS',
        message:
          'Tenemos urgencia comercial y necesitamos validar este mes un MVP SaaS con onboarding, pagos y panel para clientes.',
        source: 'contact_form',
        email: 'demo4@example.com',
        phone: '+5491122222222',
        businessType: 'EdTech',
      },
      {
        status: 'new',
        serviceInterest: 'No estoy seguro',
        message: 'Hola',
        source: 'contact_form',
      },
    ]);

    expect(metrics.highPotential).toBe(1);
  });
});
