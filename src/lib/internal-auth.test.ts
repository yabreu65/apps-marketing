import { describe, expect, it } from 'vitest';

import { normalizeInternalRedirect } from '@/lib/internal-auth';

describe('normalizeInternalRedirect', () => {
  it('acepta rutas internas válidas', () => {
    expect(normalizeInternalRedirect('/internal/leads')).toBe('/internal/leads');
  });

  it('rechaza redirects externos', () => {
    expect(normalizeInternalRedirect('https://evil.com')).toBe('/internal/leads');
    expect(normalizeInternalRedirect('//evil.com')).toBe('/internal/leads');
  });
});
