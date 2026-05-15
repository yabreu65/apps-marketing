export const INTERNAL_AUTH_COOKIE_NAME =
  process.env.INTERNAL_AUTH_COOKIE_NAME?.trim() || 'apps_marketing_internal_auth';

const DEFAULT_PASSWORD = 'change-me';
const AUTH_COOKIE_VALUE = 'ok';

export function getInternalDashboardPassword() {
  return process.env.INTERNAL_DASHBOARD_PASSWORD?.trim() || '';
}

export function isInternalAuthConfigured() {
  const password = getInternalDashboardPassword();
  return password.length > 0 && password !== DEFAULT_PASSWORD;
}

export function isValidInternalDashboardPassword(input: string) {
  if (!isInternalAuthConfigured()) return false;
  return input === getInternalDashboardPassword();
}

export function getInternalAuthCookieValue() {
  return AUTH_COOKIE_VALUE;
}

export function isValidInternalRedirect(value: string | null | undefined) {
  if (!value) return false;
  if (!value.startsWith('/internal')) return false;
  if (value.startsWith('//')) return false;
  return true;
}

export function normalizeInternalRedirect(value: string | null | undefined): string {
  return isValidInternalRedirect(value) && value ? value : '/internal/leads';
}
