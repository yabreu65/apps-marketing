import { describe, expect, it } from 'vitest';

import { internalNoStoreHeaders, isSameOriginRequest } from '@/lib/internal-security';

describe('internal-security', () => {
  it('permite origin igual al host', () => {
    const request = new Request('http://localhost/api/test', {
      headers: {
        host: 'localhost:3000',
        origin: 'http://localhost:3000',
        'x-forwarded-proto': 'http',
      },
    });

    expect(isSameOriginRequest(request)).toBe(true);
  });

  it('bloquea origin externo', () => {
    const request = new Request('http://localhost/api/test', {
      headers: {
        host: 'localhost:3000',
        origin: 'http://evil.local',
        'x-forwarded-proto': 'http',
      },
    });

    expect(isSameOriginRequest(request)).toBe(false);
  });

  it('bloquea origin https://evil.com', () => {
    const request = new Request('http://localhost/api/test', {
      headers: {
        host: 'localhost:3000',
        origin: 'https://evil.com',
        'x-forwarded-proto': 'http',
      },
    });

    expect(isSameOriginRequest(request)).toBe(false);
  });

  it('no-store headers incluyen Cache-Control y Pragma', () => {
    const headers = internalNoStoreHeaders();
    expect(headers['Cache-Control']).toContain('no-store');
    expect(headers.Pragma).toBe('no-cache');
  });
});
