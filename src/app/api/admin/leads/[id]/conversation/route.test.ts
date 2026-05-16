import { beforeEach, describe, expect, it, vi } from 'vitest';

import { createJsonRequest, readJsonResponse, sameOriginHeaders } from '@/test/request-helpers';

const prismaMock = vi.hoisted(() => ({
  lead: {
    findUnique: vi.fn(),
  },
  leadConversationMessage: {
    findMany: vi.fn(),
    create: vi.fn(),
  },
}));

vi.mock('@/lib/prisma', () => ({
  prisma: prismaMock,
}));

import { GET, PATCH, POST } from '@/app/api/admin/leads/[id]/conversation/route';

describe('GET/POST /api/admin/leads/[id]/conversation', () => {
  const validId = 'cmp6482q00000c5wsdsqtdpvn';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('GET responde 400 para id inválido', async () => {
    const response = await GET(new Request('http://localhost:3000/api/admin/leads/x/conversation'), {
      params: Promise.resolve({ id: 'x' }),
    });

    const data = await readJsonResponse<{ ok: boolean }>(response);

    expect(response.status).toBe(400);
    expect(data.ok).toBe(false);
  });

  it('GET válido responde 200 con mensajes', async () => {
    prismaMock.leadConversationMessage.findMany.mockResolvedValueOnce([
      {
        id: 'msg_1',
        leadId: validId,
        channel: 'whatsapp_simulated',
        direction: 'inbound',
        content: 'Hola, quiero una propuesta para landing.',
        createdAt: new Date('2026-01-01T00:00:00Z'),
      },
    ]);

    const response = await GET(new Request(`http://localhost:3000/api/admin/leads/${validId}/conversation`), {
      params: Promise.resolve({ id: validId }),
    });

    const data = await readJsonResponse<{ ok: boolean; messages: Array<{ id: string }> }>(response);

    expect(response.status).toBe(200);
    expect(data.ok).toBe(true);
    expect(data.messages).toHaveLength(1);
    expect(data.messages[0].id).toBe('msg_1');
  });

  it('POST origin externo responde 403', async () => {
    const request = createJsonRequest(
      `http://localhost:3000/api/admin/leads/${validId}/conversation`,
      'POST',
      { direction: 'inbound', content: 'Mensaje válido' },
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

  it('POST responde 400 para id inválido', async () => {
    const request = createJsonRequest(
      'http://localhost:3000/api/admin/leads/x/conversation',
      'POST',
      { direction: 'inbound', content: 'Mensaje válido' },
      sameOriginHeaders(),
    );

    const response = await POST(request, { params: Promise.resolve({ id: 'x' }) });
    const data = await readJsonResponse<{ ok: boolean }>(response);

    expect(response.status).toBe(400);
    expect(data.ok).toBe(false);
  });

  it('POST responde 400 para payload inválido', async () => {
    const request = createJsonRequest(
      `http://localhost:3000/api/admin/leads/${validId}/conversation`,
      'POST',
      { direction: 'inbound', content: 'a' },
      sameOriginHeaders(),
    );

    const response = await POST(request, { params: Promise.resolve({ id: validId }) });
    const data = await readJsonResponse<{ ok: boolean; errors?: unknown[] }>(response);

    expect(response.status).toBe(400);
    expect(data.ok).toBe(false);
    expect(data.errors).toBeDefined();
    expect(prismaMock.lead.findUnique).not.toHaveBeenCalled();
  });

  it('POST responde 400 para contenido solo espacios', async () => {
    const request = createJsonRequest(
      `http://localhost:3000/api/admin/leads/${validId}/conversation`,
      'POST',
      { direction: 'inbound', content: '   ' },
      sameOriginHeaders(),
    );

    const response = await POST(request, { params: Promise.resolve({ id: validId }) });
    const data = await readJsonResponse<{ ok: boolean; errors?: Array<{ field: string }> }>(response);

    expect(response.status).toBe(400);
    expect(data.ok).toBe(false);
    expect(data.errors?.some((error) => error.field === 'content')).toBe(true);
  });

  it('POST responde 400 para JSON inválido', async () => {
    const request = new Request(`http://localhost:3000/api/admin/leads/${validId}/conversation`, {
      method: 'POST',
      headers: {
        ...sameOriginHeaders(),
        'content-type': 'application/json',
      },
      body: '{not-valid-json',
    });

    const response = await POST(request, { params: Promise.resolve({ id: validId }) });
    const data = await readJsonResponse<{ ok: boolean; message: string }>(response);

    expect(response.status).toBe(400);
    expect(data.ok).toBe(false);
    expect(data.message).toContain('JSON');
  });

  it('POST responde 404 cuando lead no existe', async () => {
    prismaMock.lead.findUnique.mockResolvedValueOnce(null);

    const request = createJsonRequest(
      `http://localhost:3000/api/admin/leads/${validId}/conversation`,
      'POST',
      { direction: 'inbound', content: 'Mensaje válido para test' },
      sameOriginHeaders(),
    );

    const response = await POST(request, { params: Promise.resolve({ id: validId }) });
    const data = await readJsonResponse<{ ok: boolean }>(response);

    expect(response.status).toBe(404);
    expect(data.ok).toBe(false);
  });

  it('POST válido responde 201 y devuelve mensaje creado', async () => {
    prismaMock.lead.findUnique.mockResolvedValueOnce({ id: validId });
    prismaMock.leadConversationMessage.create.mockResolvedValueOnce({
      id: 'msg_2',
      leadId: validId,
      channel: 'whatsapp_simulated',
      direction: 'outbound',
      content: 'Perfecto, coordinemos una llamada esta semana.',
      createdAt: new Date('2026-01-02T00:00:00Z'),
    });

    const request = createJsonRequest(
      `http://localhost:3000/api/admin/leads/${validId}/conversation`,
      'POST',
      { direction: 'outbound', content: 'Perfecto, coordinemos una llamada esta semana.' },
      sameOriginHeaders(),
    );

    const response = await POST(request, { params: Promise.resolve({ id: validId }) });
    const data = await readJsonResponse<{ ok: boolean; conversationMessage?: { id: string }; message?: string }>(response);

    expect(response.status).toBe(201);
    expect(data.ok).toBe(true);
    expect(data.conversationMessage?.id).toBe('msg_2');
    expect(data.message).toContain('guardado');
  });

  it('PATCH responde 405 método no permitido', async () => {
    const response = await PATCH();

    expect(response.status).toBe(405);
    expect(response.headers.get('Allow')).toBe('GET, POST');
  });
});
