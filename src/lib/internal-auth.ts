export const INTERNAL_AUTH_COOKIE_NAME =
  process.env.INTERNAL_AUTH_COOKIE_NAME?.trim() || 'apps_marketing_internal_auth';

const DEFAULT_PASSWORD = 'change-me';
const AUTH_COOKIE_VALUE = 'ok';

export function getInternalDashboardPassword() {
  return process.env.INTERNAL_DASHBOARD_PASSWORD?.trim() || DEFAULT_PASSWORD;
}

export function isValidInternalDashboardPassword(input: string) {
  return input === getInternalDashboardPassword();
}

export function getInternalAuthCookieValue() {
  return AUTH_COOKIE_VALUE;
}
