import { beforeEach, describe, expect, it, vi } from 'vitest';

import { createJsonRequest, readJsonResponse, sameOriginHeaders } from '@/test/request-helpers';

const prismaMock = vi.hoisted(() => ({
  lead: {
    findUnique: vi.fn(),
  },
  leadNote: {
    findMany: vi.fn(),
    create: vi.fn(),
  },
}));

vi.mock('@/lib/prisma', () => ({
  prisma: prismaMock,
}));

import { GET, PATCH, POST } from '@/app/api/admin/leads/[id]/notes/route';

describe('GET/POST /api/admin/leads/[id]/notes', () => {
  const validId = 'cmp6482q00000c5wsdsqtdpvn';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('GET responde 400 para id inválido', async () => {
    const response = await GET(new Request('http://localhost:3000/api/admin/leads/x/notes'), {
      params: Promise.resolve({ id: 'x' }),
    });

    const data = await readJsonResponse<{ ok: boolean }>(response);

    expect(response.status).toBe(400);
    expect(data.ok).toBe(false);
  });

  it('POST responde 404 cuando lead no existe', async () => {
    prismaMock.lead.findUnique.mockResolvedValueOnce(null);

    const request = createJsonRequest(
      `http://localhost:3000/api/admin/leads/${validId}/notes`,
      'POST',
      { content: 'Seguimiento inicial.' },
      sameOriginHeaders(),
    );

    const response = await POST(request, { params: Promise.resolve({ id: validId }) });
    const data = await readJsonResponse<{ ok: boolean }>(response);

    expect(response.status).toBe(404);
    expect(data.ok).toBe(false);
  });

  it('POST responde 400 para nota inválida', async () => {
    const request = createJsonRequest(
      `http://localhost:3000/api/admin/leads/${validId}/notes`,
      'POST',
      { content: 'ab' },
      sameOriginHeaders(),
    );

    const response = await POST(request, { params: Promise.resolve({ id: validId }) });
    const data = await readJsonResponse<{ ok: boolean; message: string }>(response);

    expect(response.status).toBe(400);
    expect(data.ok).toBe(false);
    expect(data.message).toContain('nota');
    expect(prismaMock.lead.findUnique).not.toHaveBeenCalled();
  });

  it('POST válido responde 201', async () => {
    prismaMock.lead.findUnique.mockResolvedValueOnce({ id: validId });
    prismaMock.leadNote.create.mockResolvedValueOnce({
      id: 'note_1',
      content: 'Seguimiento por WhatsApp manual.',
      createdAt: new Date('2026-01-01T00:00:00Z'),
      updatedAt: new Date('2026-01-01T00:00:00Z'),
    });

    const request = createJsonRequest(
      `http://localhost:3000/api/admin/leads/${validId}/notes`,
      'POST',
      { content: 'Seguimiento por WhatsApp manual.' },
      sameOriginHeaders(),
    );

    const response = await POST(request, { params: Promise.resolve({ id: validId }) });
    const data = await readJsonResponse<{ ok: boolean; note?: { id: string } }>(response);

    expect(response.status).toBe(201);
    expect(data.ok).toBe(true);
    expect(data.note?.id).toBe('note_1');
  });

  it('POST origin externo responde 403', async () => {
    const request = createJsonRequest(
      `http://localhost:3000/api/admin/leads/${validId}/notes`,
      'POST',
      { content: 'Seguimiento válido de prueba.' },
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

  it('GET válido responde 200 con lista mockeada', async () => {
    prismaMock.leadNote.findMany.mockResolvedValueOnce([
      {
        id: 'note_1',
        content: 'Nota 1',
        createdAt: new Date('2026-01-01T00:00:00Z'),
        updatedAt: new Date('2026-01-01T00:00:00Z'),
      },
    ]);

    const response = await GET(new Request(`http://localhost:3000/api/admin/leads/${validId}/notes`), {
      params: Promise.resolve({ id: validId }),
    });
    const data = await readJsonResponse<{ ok: boolean; notes: Array<{ id: string }> }>(response);

    expect(response.status).toBe(200);
    expect(data.ok).toBe(true);
    expect(data.notes).toHaveLength(1);
    expect(data.notes[0].id).toBe('note_1');
  });

  it('PATCH responde 405 método no permitido', async () => {
    const response = await PATCH();
    const data = await readJsonResponse<{ ok: boolean }>(response);

    expect(response.status).toBe(405);
    expect(data.ok).toBe(false);
    expect(response.headers.get('Allow')).toBe('GET, POST');
  });
});
