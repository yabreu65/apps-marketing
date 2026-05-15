import { beforeEach, describe, expect, it, vi } from 'vitest';

import { createJsonRequest, readJsonResponse, sameOriginHeaders } from '@/test/request-helpers';

const prismaMock = vi.hoisted(() => ({
  lead: {
    findUnique: vi.fn(),
  },
  $transaction: vi.fn(),
}));

vi.mock('@/lib/prisma', () => ({
  prisma: prismaMock,
}));

import { GET, PATCH } from '@/app/api/admin/leads/[id]/status/route';

describe('PATCH /api/admin/leads/[id]/status', () => {
  const validId = 'cmp6482q00000c5wsdsqtdpvn';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('responde 400 para id inválido', async () => {
    const request = createJsonRequest(
      `http://localhost:3000/api/admin/leads/bad/status`,
      'PATCH',
      { status: 'contacted' },
      sameOriginHeaders(),
    );

    const response = await PATCH(request, { params: Promise.resolve({ id: 'short' }) });
    const data = await readJsonResponse<{ ok: boolean }>(response);

    expect(response.status).toBe(400);
    expect(data.ok).toBe(false);
  });

  it('responde 400 para status inválido', async () => {
    const request = createJsonRequest(
      `http://localhost:3000/api/admin/leads/${validId}/status`,
      'PATCH',
      { status: 'invalid_status' },
      sameOriginHeaders(),
    );

    const response = await PATCH(request, { params: Promise.resolve({ id: validId }) });
    const data = await readJsonResponse<{ ok: boolean }>(response);

    expect(response.status).toBe(400);
    expect(data.ok).toBe(false);
    expect(prismaMock.lead.findUnique).not.toHaveBeenCalled();
  });

  it('responde 404 cuando lead no existe', async () => {
    prismaMock.lead.findUnique.mockResolvedValueOnce(null);

    const request = createJsonRequest(
      `http://localhost:3000/api/admin/leads/${validId}/status`,
      'PATCH',
      { status: 'contacted' },
      sameOriginHeaders(),
    );

    const response = await PATCH(request, { params: Promise.resolve({ id: validId }) });
    const data = await readJsonResponse<{ ok: boolean }>(response);

    expect(response.status).toBe(404);
    expect(data.ok).toBe(false);
  });

  it('si status es igual, responde 200 y no crea historial duplicado', async () => {
    prismaMock.lead.findUnique.mockResolvedValueOnce({ id: validId, status: 'contacted' });

    const createHistoryMock = vi.fn();
    prismaMock.$transaction.mockImplementationOnce(async (callback: (tx: unknown) => Promise<unknown>) => {
      return callback({
        lead: {
          update: vi.fn().mockResolvedValue({ id: validId, status: 'contacted', updatedAt: new Date('2026-01-01T00:00:00Z') }),
        },
        leadStatusHistory: {
          create: createHistoryMock,
        },
      });
    });

    const request = createJsonRequest(
      `http://localhost:3000/api/admin/leads/${validId}/status`,
      'PATCH',
      { status: 'contacted' },
      sameOriginHeaders(),
    );

    const response = await PATCH(request, { params: Promise.resolve({ id: validId }) });
    const data = await readJsonResponse<{ ok: boolean; lead: { status: string } }>(response);

    expect(response.status).toBe(200);
    expect(data.ok).toBe(true);
    expect(data.lead.status).toBe('contacted');
    expect(createHistoryMock).not.toHaveBeenCalled();
  });

  it('cambio válido responde 200 y registra historial', async () => {
    prismaMock.lead.findUnique.mockResolvedValueOnce({ id: validId, status: 'new' });

    const createHistoryMock = vi.fn().mockResolvedValue({ id: 'hist_1' });
    prismaMock.$transaction.mockImplementationOnce(async (callback: (tx: unknown) => Promise<unknown>) => {
      return callback({
        lead: {
          update: vi.fn().mockResolvedValue({ id: validId, status: 'qualified', updatedAt: new Date('2026-01-01T00:00:00Z') }),
        },
        leadStatusHistory: {
          create: createHistoryMock,
        },
      });
    });

    const request = createJsonRequest(
      `http://localhost:3000/api/admin/leads/${validId}/status`,
      'PATCH',
      { status: 'qualified' },
      sameOriginHeaders(),
    );

    const response = await PATCH(request, { params: Promise.resolve({ id: validId }) });
    const data = await readJsonResponse<{ ok: boolean; lead: { status: string } }>(response);

    expect(response.status).toBe(200);
    expect(data.ok).toBe(true);
    expect(data.lead.status).toBe('qualified');
    expect(createHistoryMock).toHaveBeenCalledOnce();
    expect(createHistoryMock).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          leadId: validId,
          fromStatus: 'new',
          toStatus: 'qualified',
        }),
      }),
    );
  });

  it('origin externo responde 403', async () => {
    const request = createJsonRequest(
      `http://localhost:3000/api/admin/leads/${validId}/status`,
      'PATCH',
      { status: 'qualified' },
      {
        host: 'localhost:3000',
        origin: 'https://evil.com',
        'x-forwarded-proto': 'http',
      },
    );

    const response = await PATCH(request, { params: Promise.resolve({ id: validId }) });
    const data = await readJsonResponse<{ ok: boolean }>(response);

    expect(response.status).toBe(403);
    expect(data.ok).toBe(false);
  });

  it('GET responde 405 método no permitido', async () => {
    const response = await GET();
    expect(response.status).toBe(405);
    expect(response.headers.get('Allow')).toBe('PATCH');
  });
});
