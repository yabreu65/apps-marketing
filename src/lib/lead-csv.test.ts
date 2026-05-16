import { describe, expect, it } from 'vitest';

import { buildLeadsCsv, buildLeadsCsvFilename } from '@/lib/lead-csv';

describe('lead-csv', () => {
  it('genera CSV con headers y filas', () => {
    const csv = buildLeadsCsv([
      {
        id: 'lead_1',
        name: 'Juan Pérez',
        email: 'juan@example.com',
        phone: null,
        businessType: 'Clínica',
        serviceInterest: 'Landing comercial',
        source: 'contact_form',
        status: 'new',
        message: 'Necesito captar más consultas',
        createdAt: new Date('2026-05-15T10:00:00.000Z'),
      },
    ]);

    expect(csv.startsWith('\uFEFFid,nombre,email')).toBe(true);
    expect(csv).toContain('lead_1');
    expect(csv).toContain('juan@example.com');
    expect(csv).toContain('2026-05-15T10:00:00.000Z');
  });

  it('escapa comillas y saltos de línea', () => {
    const csv = buildLeadsCsv([
      {
        id: 'lead_2',
        name: 'Ana "Demo"',
        email: 'ana@example.com',
        phone: '123',
        businessType: 'Servicios',
        serviceInterest: 'MVP SaaS',
        source: 'chat',
        status: 'qualified',
        message: 'Línea 1\nLínea 2, con coma',
        createdAt: new Date('2026-05-15T10:00:00.000Z'),
      },
    ]);

    expect(csv).toContain('"Ana ""Demo"""');
    expect(csv).toContain('"Línea 1\nLínea 2, con coma"');
  });

  it('genera nombre de archivo con patrón esperado', () => {
    const filename = buildLeadsCsvFilename();
    expect(filename).toMatch(/^leads-export-\d{8}-\d{4}\.csv$/);
  });
});
