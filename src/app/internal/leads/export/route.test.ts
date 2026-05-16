import { beforeEach, describe, expect, it, vi } from 'vitest';

import { readJsonResponse, sameOriginHeaders } from '@/test/request-helpers';

const prismaMock = vi.hoisted(() => ({
  lead: {
    findMany: vi.fn(),
  },
}));

vi.mock('@/lib/prisma', () => ({
  prisma: prismaMock,
}));

import { GET, POST } from '@/app/internal/leads/export/route';

describe('GET /internal/leads/export', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('exporta CSV con filtros activos', async () => {
    prismaMock.lead.findMany.mockResolvedValueOnce([
      {
        id: 'lead_123',
        name: 'Lead Demo',
        email: 'demo@example.com',
        phone: '+5491112345678',
        businessType: 'Startup',
        serviceInterest: 'MVP SaaS',
        source: 'contact_form',
        status: 'proposal',
        message: 'Quiero avanzar con propuesta.',
        createdAt: new Date('2026-05-15T10:00:00.000Z'),
      },
    ]);

    const request = new Request('http://localhost:3000/internal/leads/export?status=proposal&q=demo', {
      method: 'GET',
      headers: sameOriginHeaders(),
    });

    const response = await GET(request);
    const body = await response.text();
    const disposition = response.headers.get('content-disposition') ?? '';

    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toContain('text/csv');
    expect(disposition).toContain('attachment; filename=');
    expect(disposition).toContain("filename*=UTF-8''");
    expect(disposition).toMatch(/leads-export-\d{8}-\d{6}\.csv/);
    expect(body).toContain('id,nombre,email,telefono,tipo_negocio,servicio_interes,fuente,estado,fecha_creacion_iso,mensaje');
    expect(body).toContain('lead_123');

    expect(prismaMock.lead.findMany).toHaveBeenCalledOnce();
    expect(prismaMock.lead.findMany.mock.calls[0][0].where.status).toBe('proposal');
    expect(prismaMock.lead.findMany.mock.calls[0][0].where.OR).toHaveLength(6);
  });

  it('rechaza origin externo con 403', async () => {
    const request = new Request('http://localhost:3000/internal/leads/export', {
      method: 'GET',
      headers: {
        host: 'localhost:3000',
        origin: 'https://evil.com',
        'x-forwarded-proto': 'http',
      },
    });

    const response = await GET(request);
    const data = await readJsonResponse<{ ok: boolean; message: string }>(response);

    expect(response.status).toBe(403);
    expect(data.ok).toBe(false);
    expect(data.message).toContain('origen');
  });

  it('responde 500 si falla la consulta', async () => {
    prismaMock.lead.findMany.mockRejectedValueOnce(new Error('db down'));

    const request = new Request('http://localhost:3000/internal/leads/export', {
      method: 'GET',
      headers: sameOriginHeaders(),
    });

    const response = await GET(request);
    const data = await readJsonResponse<{ ok: boolean; message: string }>(response);

    expect(response.status).toBe(500);
    expect(data.ok).toBe(false);
    expect(data.message).toContain('No se pudo exportar');
  });

  it('POST devuelve 405', async () => {
    const response = await POST();
    const data = await readJsonResponse<{ ok: boolean }>(response);

    expect(response.status).toBe(405);
    expect(response.headers.get('Allow')).toBe('GET');
    expect(data.ok).toBe(false);
  });
});
