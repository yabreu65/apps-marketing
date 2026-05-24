import { describe, expect, it } from 'vitest';

import { issueInternalAuthToken, isValidInternalAuthToken, normalizeInternalRedirect } from '@/lib/internal-auth';

describe('normalizeInternalRedirect', () => {
  it('acepta rutas internas válidas', () => {
    expect(normalizeInternalRedirect('/internal/leads')).toBe('/internal/leads');
  });

  it('rechaza redirects externos', () => {
    expect(normalizeInternalRedirect('https://evil.com')).toBe('/internal/leads');
    expect(normalizeInternalRedirect('//evil.com')).toBe('/internal/leads');
  });
});

describe('internal auth token', () => {
  it('genera y valida token firmado', () => {
    process.env.INTERNAL_DASHBOARD_PASSWORD = 'super-secret';
    process.env.INTERNAL_AUTH_SECRET = 'super-secret-token-for-tests';

    const token = issueInternalAuthToken();
    expect(isValidInternalAuthToken(token)).toBe(true);
  });
});
