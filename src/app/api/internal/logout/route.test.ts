import { beforeEach, describe, expect, it, vi } from 'vitest';

import { createJsonRequest, readJsonResponse, sameOriginHeaders } from '@/test/request-helpers';

const cookieSetMock = vi.hoisted(() => vi.fn());
const cookiesMock = vi.hoisted(() =>
  vi.fn(async () => ({
    set: cookieSetMock,
  })),
);

vi.mock('next/headers', () => ({
  cookies: cookiesMock,
}));

import { GET, POST } from '@/app/api/internal/logout/route';

describe('POST /api/internal/logout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('logout con origin correcto responde 200 y limpia cookie', async () => {
    const request = createJsonRequest('http://localhost:3000/api/internal/logout', 'POST', {}, sameOriginHeaders());

    const response = await POST(request);
    const data = await readJsonResponse<{ ok: boolean }>(response);

    expect(response.status).toBe(200);
    expect(data.ok).toBe(true);
    expect(cookieSetMock).toHaveBeenCalledOnce();
    expect(cookieSetMock).toHaveBeenCalledWith(
      'apps_marketing_internal_auth',
      '',
      expect.objectContaining({ httpOnly: true, sameSite: 'lax', path: '/' }),
    );
  });

  it('origin externo responde 403', async () => {
    const request = createJsonRequest(
      'http://localhost:3000/api/internal/logout',
      'POST',
      {},
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

  it('GET responde 405 método no permitido', async () => {
    const response = await GET();
    const data = await readJsonResponse<{ ok: boolean }>(response);

    expect(response.status).toBe(405);
    expect(response.headers.get('Allow')).toBe('POST');
    expect(data.ok).toBe(false);
  });
});
