import type { PublicAssistantState } from '@/modules/lead-assistant/types/lead-assistant';

const VISITOR_KEY_STORAGE_KEY = 'apps-marketing:public-assistant:visitor-key';

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

export function clearStoredVisitorKey() {
  if (!canUseBrowserStorage()) return;
  window.localStorage.removeItem(VISITOR_KEY_STORAGE_KEY);
}

export function createFallbackState(visitorKey: string, greeting: string): PublicAssistantState {
  return {
    visitorKey,
    memory: null,
    messages: [
      {
        id: 'assistant-greeting',
        role: 'assistant',
        content: greeting,
        createdAt: new Date().toISOString(),
        intent: 'not_sure',
      },
    ],
  };
}
