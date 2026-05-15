import { describe, expect, it } from 'vitest';

import { errorResponse, methodNotAllowedResponse, successResponse } from '@/lib/api-response';

describe('api-response', () => {
  it('successResponse devuelve ok true', async () => {
    const response = successResponse({ message: 'ok' }, 201);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.ok).toBe(true);
    expect(data.message).toBe('ok');
  });

  it('errorResponse devuelve ok false', async () => {
    const response = errorResponse('falló', 400, [{ field: 'name', message: 'err' }]);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.ok).toBe(false);
    expect(data.message).toBe('falló');
    expect(Array.isArray(data.errors)).toBe(true);
  });

  it('methodNotAllowedResponse devuelve 405', async () => {
    const response = methodNotAllowedResponse(['POST']);
    const data = await response.json();

    expect(response.status).toBe(405);
    expect(response.headers.get('Allow')).toBe('POST');
    expect(data.ok).toBe(false);
  });

  it('headers opcionales se mantienen', () => {
    const response = successResponse({ done: true }, 200, { 'Cache-Control': 'no-store' });
    expect(response.headers.get('Cache-Control')).toBe('no-store');
  });

  it('formato JSON consistente', async () => {
    const success = await successResponse({ x: 1 }).json();
    const failure = await errorResponse('x', 500).json();

    expect(success).toHaveProperty('ok', true);
    expect(failure).toHaveProperty('ok', false);
    expect(failure).toHaveProperty('message');
  });
});
