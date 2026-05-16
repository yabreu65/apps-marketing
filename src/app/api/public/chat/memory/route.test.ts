import { beforeEach, describe, expect, it, vi } from 'vitest';

import { readJsonResponse } from '@/test/request-helpers';

const serviceMock = vi.hoisted(() => ({
  clearPublicChatMemoryByVisitorKey: vi.fn(),
}));

vi.mock('@/modules/lead-assistant/server/public-chat-service', () => serviceMock);

import { DELETE, GET } from '@/app/api/public/chat/memory/route';

describe('DELETE /api/public/chat/memory', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('responde 403 con origin externo', async () => {
    const request = new Request('http://localhost:3000/api/public/chat/memory?visitorKey=visitor-1', {
      method: 'DELETE',
      headers: {
        host: 'localhost:3000',
        origin: 'https://evil.com',
        'x-forwarded-proto': 'http',
      },
    });

    const response = await DELETE(request);
    const data = await readJsonResponse<{ ok: boolean }>(response);

    expect(response.status).toBe(403);
    expect(data.ok).toBe(false);
  });

  it('responde 400 sin visitorKey', async () => {
    const request = new Request('http://localhost:3000/api/public/chat/memory', {
      method: 'DELETE',
      headers: {
        host: 'localhost:3000',
        origin: 'http://localhost:3000',
        'x-forwarded-proto': 'http',
      },
    });

    const response = await DELETE(request);
    const data = await readJsonResponse<{ ok: boolean }>(response);

    expect(response.status).toBe(400);
    expect(data.ok).toBe(false);
  });

  it('responde 200 y ejecuta clear memory', async () => {
    const request = new Request('http://localhost:3000/api/public/chat/memory?visitorKey=visitor-1', {
      method: 'DELETE',
      headers: {
        host: 'localhost:3000',
        origin: 'http://localhost:3000',
        'x-forwarded-proto': 'http',
      },
    });

    const response = await DELETE(request);
    const data = await readJsonResponse<{ ok: boolean }>(response);

    expect(response.status).toBe(200);
    expect(data.ok).toBe(true);
    expect(serviceMock.clearPublicChatMemoryByVisitorKey).toHaveBeenCalledWith('visitor-1');
  });

  it('GET responde 405', async () => {
    const response = await GET();

    expect(response.status).toBe(405);
    expect(response.headers.get('Allow')).toBe('DELETE');
  });
});
