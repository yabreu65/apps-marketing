import { beforeEach, describe, expect, it, vi } from 'vitest';

import { createJsonRequest, readJsonResponse, sameOriginHeaders } from '@/test/request-helpers';

const serviceMock = vi.hoisted(() => ({
  getPublicChatStateByVisitorKey: vi.fn(),
  processPersistentPublicChatTurn: vi.fn(),
}));

vi.mock('@/modules/lead-assistant/server/public-chat-service', () => serviceMock);

import { GET, PATCH, POST } from '@/app/api/public/chat/route';

describe('GET/POST /api/public/chat', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('GET responde 400 sin visitorKey', async () => {
    const response = await GET(new Request('http://localhost:3000/api/public/chat'));
    const data = await readJsonResponse<{ ok: boolean }>(response);

    expect(response.status).toBe(400);
    expect(data.ok).toBe(false);
  });

  it('GET responde 200 con estado', async () => {
    serviceMock.getPublicChatStateByVisitorKey.mockResolvedValueOnce({
      visitorKey: 'visitor-1',
      memory: null,
      messages: [],
    });

    const response = await GET(new Request('http://localhost:3000/api/public/chat?visitorKey=visitor-1'));
    const data = await readJsonResponse<{ ok: boolean; state?: { visitorKey: string } }>(response);

    expect(response.status).toBe(200);
    expect(data.ok).toBe(true);
    expect(data.state?.visitorKey).toBe('visitor-1');
  });

  it('POST responde 403 con origin externo', async () => {
    const request = createJsonRequest(
      'http://localhost:3000/api/public/chat',
      'POST',
      { visitorKey: 'visitor-1', message: 'hola' },
      {
        host: 'localhost:3000',
        origin: 'https://evil.com',
        'x-forwarded-proto': 'http',
      },
    );

    const response = await POST(request);
    const data = await readJsonResponse<{ ok: boolean }>(response);

    expect(response.status).toBe(403);
    expect(data.ok).toBe(false);
  });

  it('POST responde 200 con reply y suggestedActions', async () => {
    serviceMock.processPersistentPublicChatTurn.mockResolvedValueOnce({
      state: {
        visitorKey: 'visitor-1',
        memory: null,
        messages: [],
      },
      reply: {
        text: 'Respuesta de prueba',
        intent: 'not_sure',
        rationale: 'test',
        source: 'rules',
        ctas: [{ label: 'Completar formulario', href: '#contact-form', kind: 'form' }],
      },
    });

    const request = createJsonRequest(
      'http://localhost:3000/api/public/chat',
      'POST',
      { visitorKey: 'visitor-1', message: 'hola' },
      sameOriginHeaders(),
    );

    const response = await POST(request);
    const data = await readJsonResponse<{ ok: boolean; suggestedActions?: Array<{ label: string }> }>(response);

    expect(response.status).toBe(200);
    expect(data.ok).toBe(true);
    expect(data.suggestedActions?.length).toBe(1);
  });

  it('POST con mode=state responde 200 con estado', async () => {
    serviceMock.getPublicChatStateByVisitorKey.mockResolvedValueOnce({
      visitorKey: 'visitor-1',
      memory: null,
      messages: [],
    });

    const request = createJsonRequest(
      'http://localhost:3000/api/public/chat',
      'POST',
      { visitorKey: 'visitor-1', mode: 'state' },
      sameOriginHeaders(),
    );

    const response = await POST(request);
    const data = await readJsonResponse<{ ok: boolean; state?: { visitorKey: string } }>(response);

    expect(response.status).toBe(200);
    expect(data.ok).toBe(true);
    expect(data.state?.visitorKey).toBe('visitor-1');
    expect(serviceMock.processPersistentPublicChatTurn).not.toHaveBeenCalled();
  });

  it('PATCH responde 405', async () => {
    const response = await PATCH();

    expect(response.status).toBe(405);
    expect(response.headers.get('Allow')).toBe('GET, POST');
  });
});
