import { createHmac, timingSafeEqual } from 'crypto';

export const INTERNAL_AUTH_COOKIE_NAME =
  process.env.INTERNAL_AUTH_COOKIE_NAME?.trim() || 'apps_marketing_internal_auth';

const DEFAULT_PASSWORD = 'change-me';
const INTERNAL_AUTH_TOKEN_PREFIX = 'v1';
export const INTERNAL_AUTH_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 8;

export function getInternalDashboardPassword() {
  return process.env.INTERNAL_DASHBOARD_PASSWORD?.trim() || '';
}

function getInternalAuthSecret() {
  return (
    process.env.INTERNAL_AUTH_SECRET?.trim() ||
    process.env.INTERNAL_DASHBOARD_PASSWORD?.trim() ||
    ''
  );
}

export function isInternalAuthConfigured() {
  const password = getInternalDashboardPassword();
  const secret = getInternalAuthSecret();
  return (
    password.length > 0 &&
    password !== DEFAULT_PASSWORD &&
    secret.length >= 12
  );
}

export function isValidInternalDashboardPassword(input: string) {
  if (!isInternalAuthConfigured()) return false;
  return input === getInternalDashboardPassword();
}

function signInternalAuthPayload(expiresAt: number) {
  const secret = getInternalAuthSecret();
  return createHmac('sha256', secret).update(`${INTERNAL_AUTH_TOKEN_PREFIX}.${expiresAt}`).digest('base64url');
}

export function issueInternalAuthToken() {
  const expiresAt = Date.now() + INTERNAL_AUTH_COOKIE_MAX_AGE_SECONDS * 1000;
  const signature = signInternalAuthPayload(expiresAt);
  return `${INTERNAL_AUTH_TOKEN_PREFIX}.${expiresAt}.${signature}`;
}

export function isValidInternalAuthToken(token: string | null | undefined) {
  if (!token) return false;
  if (!isInternalAuthConfigured()) return false;

  const [prefix, expiresRaw, signatureRaw] = token.split('.');
  if (prefix !== INTERNAL_AUTH_TOKEN_PREFIX || !expiresRaw || !signatureRaw) {
    return false;
  }

  const expiresAt = Number(expiresRaw);
  if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) {
    return false;
  }

  const expectedSignature = signInternalAuthPayload(expiresAt);
  const expectedBuffer = Buffer.from(expectedSignature);
  const receivedBuffer = Buffer.from(signatureRaw);

  if (expectedBuffer.length !== receivedBuffer.length) return false;
  return timingSafeEqual(expectedBuffer, receivedBuffer);
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
