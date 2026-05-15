import type { NextRequest } from 'next/server';

const MAX_FAILED_ATTEMPTS = 5;
const WINDOW_MS = 10 * 60 * 1000;
const BLOCK_MS = 10 * 60 * 1000;

type LoginAttemptRecord = {
  attempts: number[];
  blockedUntil?: number;
};

const attemptsByKey = new Map<string, LoginAttemptRecord>();

function now() {
  return Date.now();
}

function cleanupRecord(record: LoginAttemptRecord, timestamp: number) {
  record.attempts = record.attempts.filter((value) => timestamp - value <= WINDOW_MS);
  if (record.blockedUntil && record.blockedUntil <= timestamp) {
    record.blockedUntil = undefined;
  }
}

function getOrCreateRecord(key: string) {
  const record = attemptsByKey.get(key) ?? { attempts: [] };
  attemptsByKey.set(key, record);
  return record;
}

export function getLoginRateLimitKey(request: Request | NextRequest) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const first = forwardedFor.split(',')[0]?.trim();
    if (first) return first;
  }

  const realIp = request.headers.get('x-real-ip')?.trim();
  if (realIp) return realIp;

  return 'unknown';
}

export function isLoginBlocked(key: string) {
  const timestamp = now();
  const record = getOrCreateRecord(key);
  cleanupRecord(record, timestamp);

  return typeof record.blockedUntil === 'number' && record.blockedUntil > timestamp;
}

export function recordFailedLoginAttempt(key: string) {
  const timestamp = now();
  const record = getOrCreateRecord(key);
  cleanupRecord(record, timestamp);

  record.attempts.push(timestamp);

  if (record.attempts.length >= MAX_FAILED_ATTEMPTS) {
    record.blockedUntil = timestamp + BLOCK_MS;
    record.attempts = [];
  }
}

export function clearLoginAttempts(key: string) {
  attemptsByKey.delete(key);
}

export function getRemainingBlockSeconds(key: string) {
  const timestamp = now();
  const record = attemptsByKey.get(key);
  if (!record?.blockedUntil || record.blockedUntil <= timestamp) {
    return 0;
  }

  return Math.ceil((record.blockedUntil - timestamp) / 1000);
}

export const LOGIN_RATE_LIMIT_RULES = {
  maxFailedAttempts: MAX_FAILED_ATTEMPTS,
  windowMinutes: WINDOW_MS / 60000,
  blockMinutes: BLOCK_MS / 60000,
} as const;
