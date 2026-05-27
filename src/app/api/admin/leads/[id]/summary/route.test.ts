import { beforeEach, describe, expect, it, vi } from 'vitest';

import { createJsonRequest, readJsonResponse, sameOriginHeaders } from '@/test/request-helpers';

const prismaMock = vi.hoisted(() => ({
  lead: {
    findUnique: vi.fn(),
  },
}));

const buildLeadSummaryWithOptionalAIMock = vi.hoisted(() => vi.fn());

vi.mock('@/lib/prisma', () => ({
  prisma: prismaMock,
}));

vi.mock('@/lib/lead-summary-ai', () => ({
  buildLeadSummaryWithOptionalAI: buildLeadSummaryWithOptionalAIMock,
}));

import { GET, POST } from '@/app/api/admin/leads/[id]/summary/route';

describe('POST /api/admin/leads/[id]/summary', () => {
  const validId = 'cmp6482q00000c5wsdsqtdpvn';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('responde 400 para id inválido', async () => {
    const request = createJsonRequest('http://localhost:3000/api/admin/leads/x/summary', 'POST', {}, sameOriginHeaders());

    const response = await POST(request, { params: Promise.resolve({ id: 'x' }) });
    const data = await readJsonResponse<{ ok: boolean }>(response);

    expect(response.status).toBe(400);
    expect(data.ok).toBe(false);
  });

  it('responde 404 cuando lead no existe', async () => {
    prismaMock.lead.findUnique.mockResolvedValueOnce(null);

    const request = createJsonRequest(
      `http://localhost:3000/api/admin/leads/${validId}/summary`,
      'POST',
      {},
      sameOriginHeaders(),
    );

    const response = await POST(request, { params: Promise.resolve({ id: validId }) });
    const data = await readJsonResponse<{ ok: boolean }>(response);

    expect(response.status).toBe(404);
    expect(data.ok).toBe(false);
  });

  it('origin externo responde 403', async () => {
    const request = createJsonRequest(
      `http://localhost:3000/api/admin/leads/${validId}/summary`,
      'POST',
      {},
      {
        host: 'localhost:3000',
        origin: 'https://evil.com',
        'x-forwarded-proto': 'http',
      },
    );

    const response = await POST(request, { params: Promise.resolve({ id: validId }) });
    const data = await readJsonResponse<{ ok: boolean }>(response);

    expect(response.status).toBe(403);
    expect(data.ok).toBe(false);
  });

  it('summary válido responde 200 con summary + source', async () => {
    prismaMock.lead.findUnique.mockResolvedValueOnce({
      name: 'Ana',
      serviceInterest: 'MVP SaaS',
      businessType: 'SaaS',
      message: 'Quiero validar una idea en 8 semanas',
      source: 'contact_form',
      status: 'new',
      notes: [],
      statusHistory: [],
    });

    buildLeadSummaryWithOptionalAIMock.mockResolvedValueOnce({
      summary: {
        opportunityType: 'MVP SaaS',
        priority: 'high',
        summary: 'Lead con intención clara de validar producto.',
        recommendedAction: 'Agendar discovery para alcance MVP.',
      },
      source: 'rules',
    });

    const request = createJsonRequest(
      `http://localhost:3000/api/admin/leads/${validId}/summary`,
      'POST',
      {},
      sameOriginHeaders(),
    );

    const response = await POST(request, { params: Promise.resolve({ id: validId }) });
    const data = await readJsonResponse<{ ok: boolean; summary?: { opportunityType: string }; source?: string }>(response);

    expect(response.status).toBe(200);
    expect(data.ok).toBe(true);
    expect(data.summary?.opportunityType).toBe('MVP SaaS');
    expect(data.source).toBe('rules');
  });

  it('error interno responde 500 genérico sin stack', async () => {
    prismaMock.lead.findUnique.mockResolvedValueOnce({
      name: 'Ana',
      serviceInterest: 'Landing comercial',
      businessType: 'Servicios',
      message: 'Mensaje válido para pruebas',
      source: 'contact_form',
      status: 'new',
      notes: [],
      statusHistory: [],
    });

    buildLeadSummaryWithOptionalAIMock.mockRejectedValueOnce(new Error('boom'));

    const request = createJsonRequest(
      `http://localhost:3000/api/admin/leads/${validId}/summary`,
      'POST',
      {},
      sameOriginHeaders(),
    );

    const response = await POST(request, { params: Promise.resolve({ id: validId }) });
    const data = await readJsonResponse<{ ok: boolean; message: string; stack?: string }>(response);

    expect(response.status).toBe(500);
    expect(data.ok).toBe(false);
    expect(data.message).toContain('No se pudo regenerar el resumen comercial');
    expect(data.stack).toBeUndefined();
  });

  it('GET responde 405 método no permitido', async () => {
    const response = await GET();

    expect(response.status).toBe(405);
    expect(response.headers.get('Allow')).toBe('POST');
  });
});
