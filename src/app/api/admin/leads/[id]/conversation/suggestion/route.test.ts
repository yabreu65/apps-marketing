import { beforeEach, describe, expect, it, vi } from 'vitest';

import { createJsonRequest, readJsonResponse, sameOriginHeaders } from '@/test/request-helpers';

const prismaMock = vi.hoisted(() => ({
  lead: {
    findUnique: vi.fn(),
  },
}));

const buildLeadReplySuggestionWithOptionalAIMock = vi.hoisted(() => vi.fn());

vi.mock('@/lib/prisma', () => ({
  prisma: prismaMock,
}));

vi.mock('@/lib/lead-reply-suggestion-ai', () => ({
  buildLeadReplySuggestionWithOptionalAI: buildLeadReplySuggestionWithOptionalAIMock,
}));

import { GET, POST } from '@/app/api/admin/leads/[id]/conversation/suggestion/route';

describe('POST /api/admin/leads/[id]/conversation/suggestion', () => {
  const validId = 'cmp6482q00000c5wsdsqtdpvn';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('responde 400 para id inválido', async () => {
    const request = createJsonRequest(
      'http://localhost:3000/api/admin/leads/x/conversation/suggestion',
      'POST',
      {},
      sameOriginHeaders(),
    );

    const response = await POST(request, { params: Promise.resolve({ id: 'x' }) });
    const data = await readJsonResponse<{ ok: boolean }>(response);

    expect(response.status).toBe(400);
    expect(data.ok).toBe(false);
  });

  it('responde 403 con origin externo', async () => {
    const request = createJsonRequest(
      `http://localhost:3000/api/admin/leads/${validId}/conversation/suggestion`,
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

  it('responde 404 cuando lead no existe', async () => {
    prismaMock.lead.findUnique.mockResolvedValueOnce(null);

    const request = createJsonRequest(
      `http://localhost:3000/api/admin/leads/${validId}/conversation/suggestion`,
      'POST',
      {},
      sameOriginHeaders(),
    );

    const response = await POST(request, { params: Promise.resolve({ id: validId }) });
    const data = await readJsonResponse<{ ok: boolean }>(response);

    expect(response.status).toBe(404);
    expect(data.ok).toBe(false);
  });

  it('responde 200 con sugerencia válida', async () => {
    prismaMock.lead.findUnique.mockResolvedValueOnce({
      id: validId,
      name: 'Demo Lead',
      serviceInterest: 'Landing comercial',
      businessType: 'Clínica',
      message: 'Quiero captar más consultas',
      source: 'contact_form',
      status: 'new',
      conversations: [
        {
          direction: 'inbound',
          content: 'Hola, necesito saber costos.',
          createdAt: new Date('2026-05-16T00:00:00Z'),
        },
      ],
    });

    buildLeadReplySuggestionWithOptionalAIMock.mockResolvedValueOnce({
      source: 'rules',
      suggestion: {
        suggestedReply: 'Gracias por escribir. El costo depende del alcance.',
        source: 'rules',
        rationale: 'Regla de pricing.',
      },
    });

    const request = createJsonRequest(
      `http://localhost:3000/api/admin/leads/${validId}/conversation/suggestion`,
      'POST',
      {},
      sameOriginHeaders(),
    );

    const response = await POST(request, { params: Promise.resolve({ id: validId }) });
    const data = await readJsonResponse<{
      ok: boolean;
      source?: string;
      suggestion?: { suggestedReply: string; source: string };
    }>(response);

    expect(response.status).toBe(200);
    expect(data.ok).toBe(true);
    expect(data.source).toBe('rules');
    expect(data.suggestion?.source).toBe('rules');
    expect(data.suggestion?.suggestedReply).toContain('costo');
  });

  it('responde 500 en error interno', async () => {
    prismaMock.lead.findUnique.mockRejectedValueOnce(new Error('boom'));

    const request = createJsonRequest(
      `http://localhost:3000/api/admin/leads/${validId}/conversation/suggestion`,
      'POST',
      {},
      sameOriginHeaders(),
    );

    const response = await POST(request, { params: Promise.resolve({ id: validId }) });
    const data = await readJsonResponse<{ ok: boolean; message: string; stack?: string }>(response);

    expect(response.status).toBe(500);
    expect(data.ok).toBe(false);
    expect(data.message).toContain('No se pudo generar la sugerencia local');
    expect(data.stack).toBeUndefined();
  });

  it('GET responde 405', async () => {
    const response = await GET();
    const data = await readJsonResponse<{ ok: boolean }>(response);

    expect(response.status).toBe(405);
    expect(data.ok).toBe(false);
    expect(response.headers.get('Allow')).toBe('POST');
  });
});
