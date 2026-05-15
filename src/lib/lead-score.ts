import type { LeadScore, LeadScoreLevel } from '@/types/lead-score';

type LeadScoreInput = {
  serviceInterest: string;
  businessType?: string | null;
  message: string;
  source: string;
  status: string;
  email?: string | null;
  phone?: string | null;
  notes?: Array<{ content: string }>;
  statusHistory?: Array<{ toStatus: string }>;
};

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function levelFromScore(score: number): LeadScoreLevel {
  if (score >= 70) return 'high';
  if (score >= 40) return 'medium';
  return 'low';
}

function containsAny(text: string, terms: string[]) {
  return terms.some((term) => text.includes(term));
}

export function buildLeadScore(lead: LeadScoreInput): LeadScore {
  let score = 20;
  const reasons: string[] = [];
  const positiveSignals: string[] = [];
  const missingSignals: string[] = [];

  const message = (lead.message ?? '').toLowerCase();
  const service = (lead.serviceInterest ?? '').toLowerCase();
  const status = (lead.status ?? '').toLowerCase();

  if (lead.email || lead.phone) {
    score += 15;
    positiveSignals.push('Canal de contacto disponible.');
  } else {
    missingSignals.push('Falta canal de contacto directo (email o teléfono).');
  }

  if (lead.businessType?.trim()) {
    score += 10;
    positiveSignals.push('Tipo de negocio informado.');
  } else {
    missingSignals.push('Tipo de negocio no especificado.');
  }

  if (message.length >= 80) {
    score += 12;
    positiveSignals.push('Necesidad explicada con buen contexto.');
  } else if (message.length < 30) {
    score -= 8;
    missingSignals.push('Mensaje breve con poco contexto comercial.');
  }

  if (containsAny(message, ['urgente', 'esta semana', 'hoy', 'rápido', 'asap'])) {
    score += 15;
    reasons.push('Menciona urgencia comercial.');
  }

  if (containsAny(service, ['mvp saas', 'sistema web', 'dashboard', 'ia aplicada', 'automatización'])) {
    score += 10;
    reasons.push('Interés en solución de alto valor estratégico.');
  }

  if (lead.notes?.length) {
    score += 8;
    positiveSignals.push('Tiene notas internas de seguimiento.');
  }

  if (status === 'contacted' || status === 'qualified') {
    score += 10;
    reasons.push('Lead con avance en seguimiento comercial.');
  }

  if (status === 'proposal') {
    score += 20;
    reasons.push('Lead en etapa de propuesta.');
  }

  if (status === 'closed' || status === 'archived') {
    score -= 30;
    reasons.push('Lead fuera del ciclo activo.');
  }

  const hadStatusChanges = (lead.statusHistory?.length ?? 0) > 0;
  if (hadStatusChanges) {
    score += 5;
    positiveSignals.push('Hay trazabilidad de actividad comercial.');
  }

  score = clamp(score, 0, 100);
  const level = levelFromScore(score);

  let recommendedAction = 'Solicitar más contexto y validar prioridad comercial en próximo contacto.';
  if (level === 'high') {
    recommendedAction = 'Priorizar seguimiento hoy y proponer próximo paso concreto (llamada o alcance).';
  } else if (level === 'medium') {
    recommendedAction = 'Agendar contacto de calificación y completar señales faltantes del lead.';
  }

  if (!reasons.length) {
    reasons.push('Score estimado por señales básicas disponibles en el lead.');
  }

  return {
    score,
    level,
    reasons,
    positiveSignals,
    missingSignals,
    recommendedAction,
  };
}
