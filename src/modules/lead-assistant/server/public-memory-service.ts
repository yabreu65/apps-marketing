import type { PublicAssistantState } from '@/modules/lead-assistant/types/lead-assistant';

const VISITOR_KEY_STORAGE_KEY = 'apps-marketing:public-assistant:visitor-key';
const ASSISTANT_STATE_STORAGE_PREFIX = 'apps-marketing:public-assistant:state';

function canUseBrowserStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function generateVisitorKey() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `visitor_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function getOrCreateVisitorKey() {
  if (!canUseBrowserStorage()) {
    return 'visitor_local';
  }

  const existing = window.localStorage.getItem(VISITOR_KEY_STORAGE_KEY);
  if (existing) return existing;

  const created = generateVisitorKey();
  window.localStorage.setItem(VISITOR_KEY_STORAGE_KEY, created);
  return created;
}

function buildStateStorageKey(visitorKey: string) {
  return `${ASSISTANT_STATE_STORAGE_PREFIX}:${visitorKey}`;
}

export function loadPublicAssistantState(visitorKey: string): PublicAssistantState | null {
  if (!canUseBrowserStorage()) return null;

  const raw = window.localStorage.getItem(buildStateStorageKey(visitorKey));
  if (!raw) return null;

  try {
    return JSON.parse(raw) as PublicAssistantState;
  } catch {
    return null;
  }
}

export function savePublicAssistantState(state: PublicAssistantState) {
  if (!canUseBrowserStorage()) return;
  window.localStorage.setItem(buildStateStorageKey(state.visitorKey), JSON.stringify(state));
}

export function clearPublicAssistantMemory(visitorKey: string) {
  if (!canUseBrowserStorage()) return;
  window.localStorage.removeItem(buildStateStorageKey(visitorKey));
}
