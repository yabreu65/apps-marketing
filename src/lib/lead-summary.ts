import type { LeadStatus } from '@/lib/lead-status';

export type LeadSummaryInput = {
  serviceInterest: string;
  businessType?: string | null;
  message: string;
  source: string;
  status: LeadStatus | string;
  notes?: Array<{ content: string }>;
};

export type LeadSummaryPriority = 'low' | 'medium' | 'high';

export type LeadSummaryResult = {
  opportunityType: string;
  priority: LeadSummaryPriority;
  summary: string;
  recommendedAction: string;
};

const HIGH_PRIORITY_KEYWORDS = ['urgente', 'esta semana', 'hoy', 'rápido', 'asap'];
const ADVANCED_KEYWORDS = ['automat', 'ia', 'inteligencia artificial', 'saas', 'mvp'];
const INTERNAL_SYSTEM_KEYWORDS = ['proceso', 'interno', 'panel', 'dashboard', 'gestión'];

function includesAny(text: string, keywords: string[]) {
  return keywords.some((keyword) => text.includes(keyword));
}

function inferOpportunityType(serviceInterest: string, message: string) {
  const normalized = `${serviceInterest} ${message}`.toLowerCase();

  if (normalized.includes('landing')) return 'Captación comercial inicial';
  if (normalized.includes('sitio web') || normalized.includes('web profesional')) return 'Presencia digital profesional';
  if (normalized.includes('sistema web') || includesAny(normalized, INTERNAL_SYSTEM_KEYWORDS)) return 'Digitalización operativa';
  if (normalized.includes('mvp') || normalized.includes('saas')) return 'Validación de producto digital';
  if (includesAny(normalized, ADVANCED_KEYWORDS)) return 'Evolución tecnológica avanzada';
  if (normalized.includes('seo') || normalized.includes('marketing')) return 'Adquisición y visibilidad digital';

  return 'Diagnóstico comercial inicial';
}

function inferPriority(message: string, source: string, status: string): LeadSummaryPriority {
  const normalized = message.toLowerCase();

  if (status === 'new' && includesAny(normalized, HIGH_PRIORITY_KEYWORDS)) return 'high';
  if (source === 'chat' || source === 'diagnosis') return 'medium';
  if (status === 'proposal') return 'high';
  if (status === 'closed' || status === 'archived') return 'low';

  return 'medium';
}

function buildRecommendedAction(opportunityType: string, priority: LeadSummaryPriority) {
  if (opportunityType === 'Captación comercial inicial') {
    return 'Agendar contacto breve para definir propuesta de valor, oferta y CTA principal de conversión.';
  }

  if (opportunityType === 'Validación de producto digital') {
    return 'Coordinar discovery de MVP: problema, usuario objetivo y funcionalidades esenciales del primer release.';
  }

  if (opportunityType === 'Digitalización operativa') {
    return 'Realizar mapeo de procesos actuales y priorizar flujo interno con mayor impacto operativo.';
  }

  if (opportunityType === 'Evolución tecnológica avanzada') {
    return 'Alinear expectativas: proponer fase inicial de base web/procesos antes de escalar a automatización o IA aplicada.';
  }

  if (priority === 'high') {
    return 'Responder en prioridad alta y proponer llamada de diagnóstico en la primera ventana disponible.';
  }

  return 'Solicitar contexto adicional y orientar el próximo paso comercial por WhatsApp o formulario.';
}

export function buildLeadSummary(lead: LeadSummaryInput): LeadSummaryResult {
  const message = lead.message?.trim() ?? '';
  const opportunityType = inferOpportunityType(lead.serviceInterest ?? '', message);
  const priority = inferPriority(message, lead.source ?? 'unknown', lead.status ?? 'new');
  const businessType = lead.businessType?.trim() ? ` del rubro ${lead.businessType.trim()}` : '';
  const notesHint = lead.notes?.length ? ' Incluye notas internas para seguimiento.' : '';

  const summary = `Lead ${lead.source === 'contact_form' ? 'ingresado por formulario' : `originado en ${lead.source}`}${businessType}, con interés en ${lead.serviceInterest.toLowerCase()}. Estado actual: ${lead.status}.${notesHint}`;

  return {
    opportunityType,
    priority,
    summary,
    recommendedAction: buildRecommendedAction(opportunityType, priority),
  };
}
