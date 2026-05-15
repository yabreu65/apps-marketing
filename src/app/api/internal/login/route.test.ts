import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { clearLoginAttempts } from '@/lib/login-rate-limit';
import { createJsonRequest, readJsonResponse, resetTestEnv, sameOriginHeaders, setTestEnv } from '@/test/request-helpers';

const cookieSetMock = vi.hoisted(() => vi.fn());
const cookiesMock = vi.hoisted(() =>
  vi.fn(async () => ({
    set: cookieSetMock,
  })),
);

vi.mock('next/headers', () => ({
  cookies: cookiesMock,
}));

import { GET, POST } from '@/app/api/internal/login/route';

describe('POST /api/internal/login', () => {
  const rateLimitKey = '10.0.0.10';
  let previousEnv: Record<string, string | undefined> = {};

  beforeEach(() => {
    vi.clearAllMocks();
    clearLoginAttempts(rateLimitKey);
    previousEnv = setTestEnv({
      INTERNAL_DASHBOARD_PASSWORD: 'super-secret',
      INTERNAL_AUTH_COOKIE_NAME: 'apps_marketing_internal_auth',
      NODE_ENV: 'test',
    });
  });

  afterEach(() => {
    clearLoginAttempts(rateLimitKey);
    resetTestEnv(previousEnv);
  });

  it('responde 503 cuando auth está mal configurada', async () => {
    resetTestEnv(previousEnv);
    previousEnv = setTestEnv({ INTERNAL_DASHBOARD_PASSWORD: 'change-me' });

    const request = createJsonRequest(
      'http://localhost:3000/api/internal/login',
      'POST',
      { password: 'change-me' },
      {
        ...sameOriginHeaders(),
        'x-forwarded-for': rateLimitKey,
      },
    );

    const response = await POST(request);
    const data = await readJsonResponse<{ ok: boolean; message: string }>(response);

    expect(response.status).toBe(503);
    expect(data.ok).toBe(false);
    expect(data.message).toContain('no está configurada');
  });

  it('responde 401 para password incorrecta', async () => {
    const request = createJsonRequest(
      'http://localhost:3000/api/internal/login',
      'POST',
      { password: 'wrong-pass' },
      {
        ...sameOriginHeaders(),
        'x-forwarded-for': rateLimitKey,
      },
    );

    const response = await POST(request);
    const data = await readJsonResponse<{ ok: boolean; message: string }>(response);

    expect(response.status).toBe(401);
    expect(data.ok).toBe(false);
    expect(data.message).toContain('Credenciales inválidas');
    expect(cookieSetMock).not.toHaveBeenCalled();
  });

  it('responde 200 con password correcta y setea cookie', async () => {
    const request = createJsonRequest(
      'http://localhost:3000/api/internal/login',
      'POST',
      { password: 'super-secret', redirect: '/internal/leads' },
      {
        ...sameOriginHeaders(),
        'x-forwarded-for': rateLimitKey,
      },
    );

    const response = await POST(request);
    const data = await readJsonResponse<{ ok: boolean; redirectTo: string }>(response);

    expect(response.status).toBe(200);
    expect(data.ok).toBe(true);
    expect(data.redirectTo).toBe('/internal/leads');
    expect(cookieSetMock).toHaveBeenCalledOnce();
    expect(cookieSetMock).toHaveBeenCalledWith(
      'apps_marketing_internal_auth',
      'ok',
      expect.objectContaining({ httpOnly: true, sameSite: 'lax', path: '/' }),
    );
  });

  it('responde 403 con origin externo', async () => {
    const request = createJsonRequest(
      'http://localhost:3000/api/internal/login',
      'POST',
      { password: 'super-secret' },
      {
        host: 'localhost:3000',
        origin: 'https://evil.com',
        'x-forwarded-proto': 'http',
        'x-forwarded-for': rateLimitKey,
      },
    );

    const response = await POST(request);
    const data = await readJsonResponse<{ ok: boolean }>(response);

    expect(response.status).toBe(403);
    expect(data.ok).toBe(false);
  });

  it('responde 429 después del límite de intentos fallidos', async () => {
    for (let attempt = 0; attempt < 5; attempt++) {
      const request = createJsonRequest(
        'http://localhost:3000/api/internal/login',
        'POST',
        { password: `wrong-${attempt}` },
        {
          ...sameOriginHeaders(),
          'x-forwarded-for': rateLimitKey,
        },
      );

      const response = await POST(request);
      expect(response.status).toBe(401);
    }

    const blockedRequest = createJsonRequest(
      'http://localhost:3000/api/internal/login',
      'POST',
      { password: 'wrong-final' },
      {
        ...sameOriginHeaders(),
        'x-forwarded-for': rateLimitKey,
      },
    );

    const blockedResponse = await POST(blockedRequest);
    const blockedData = await readJsonResponse<{ ok: boolean; errors?: { retryAfterSeconds?: number } }>(blockedResponse);

    expect(blockedResponse.status).toBe(429);
    expect(blockedData.ok).toBe(false);
    expect(blockedData.errors?.retryAfterSeconds).toBeGreaterThan(0);
  });

  it('GET responde 405 método no permitido', async () => {
    const response = await GET();
    expect(response.status).toBe(405);
    expect(response.headers.get('Allow')).toBe('POST');
  });
});
