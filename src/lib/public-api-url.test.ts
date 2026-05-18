import { describe, expect, it } from 'vitest';

import { buildPublicApiUrl } from '@/lib/public-api-url';

describe('buildPublicApiUrl', () => {
  it('uses relative path when NEXT_PUBLIC_API_BASE_URL is missing', () => {
    const previous = process.env.NEXT_PUBLIC_API_BASE_URL;
    delete process.env.NEXT_PUBLIC_API_BASE_URL;

    expect(buildPublicApiUrl('/api/leads')).toBe('/api/leads');
    expect(buildPublicApiUrl('api/public/chat')).toBe('/api/public/chat');

    process.env.NEXT_PUBLIC_API_BASE_URL = previous;
  });

  it('uses explicit base url when provided', () => {
    const previous = process.env.NEXT_PUBLIC_API_BASE_URL;
    process.env.NEXT_PUBLIC_API_BASE_URL = 'https://api.example.com/';

    expect(buildPublicApiUrl('/api/leads')).toBe('https://api.example.com/api/leads');

    process.env.NEXT_PUBLIC_API_BASE_URL = previous;
  });
});
