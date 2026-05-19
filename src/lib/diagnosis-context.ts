import type { LeadDiagnosisContext } from '@/types/lead';

const DIAGNOSIS_STORAGE_KEY = 'apps_marketing_diagnosis_context';

function isLeadDiagnosisContext(value: unknown): value is LeadDiagnosisContext {
  if (!value || typeof value !== 'object') return false;

  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.goal === 'string' &&
    typeof candidate.stage === 'string' &&
    typeof candidate.urgency === 'string' &&
    typeof candidate.recommendedSolution === 'string'
  );
}

export function saveDiagnosisContext(context: LeadDiagnosisContext) {
  if (typeof window === 'undefined') return;
  window.sessionStorage.setItem(DIAGNOSIS_STORAGE_KEY, JSON.stringify(context));
}

export function readDiagnosisContext(): LeadDiagnosisContext | null {
  if (typeof window === 'undefined') return null;

  const raw = window.sessionStorage.getItem(DIAGNOSIS_STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed: unknown = JSON.parse(raw);
    return isLeadDiagnosisContext(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function clearDiagnosisContext() {
  if (typeof window === 'undefined') return;
  window.sessionStorage.removeItem(DIAGNOSIS_STORAGE_KEY);
}
