import type {
  PublicAssistantIntent,
  PublicAssistantMemory,
  PublicLeadHandoffSummary,
} from '@/modules/lead-assistant/types/lead-assistant';

type BuildHandoffSummaryInput = {
  intent: PublicAssistantIntent;
  memory: PublicAssistantMemory | null;
  latestVisitorMessage: string | null;
};

const PROJECT_TYPE_LABELS: Record<PublicAssistantIntent, string> = {
  landing: 'Captación con landing comercial',
  web_professional: 'Sitio web profesional',
  dashboard: 'Dashboard interno',
  mvp_saas: 'MVP SaaS',
  ai_automation: 'IA aplicada por fases',
  seo_marketing: 'SEO / marketing digital',
  lead_followup_priority: 'Seguimiento y priorización de leads',
  pricing: 'Definición de alcance y estimación',
  not_sure: 'Diagnóstico inicial',
  human_help: 'Acompañamiento comercial manual',
};

const PROBABLE_SERVICE_LABELS: Record<PublicAssistantIntent, string> = {
  landing: 'Landing comercial',
  web_professional: 'Sitio web profesional',
  dashboard: 'Dashboard / panel interno',
  mvp_saas: 'MVP SaaS',
  ai_automation: 'IA aplicada al negocio',
  seo_marketing: 'SEO / marketing digital',
  lead_followup_priority: 'Sistema de seguimiento de leads',
  pricing: 'Dato pendiente',
  not_sure: 'Dato pendiente',
  human_help: 'Diagnóstico comercial',
};

const NEXT_STEP_LABELS: Record<PublicAssistantIntent, string> = {
  landing: 'Completar formulario con público objetivo, oferta y canal de captación principal.',
  web_professional: 'Compartir secciones clave y objetivo comercial para definir estructura inicial.',
  dashboard: 'Indicar qué decisiones querés acelerar para diseñar un panel mínimo.',
  mvp_saas: 'Definir usuario inicial, problema principal y alcance mínimo validable.',
  ai_automation: 'Elegir un proceso puntual para evaluar IA de forma controlada.',
  seo_marketing: 'Definir canal prioritario y capacidad de seguimiento comercial.',
  lead_followup_priority: 'Describir flujo actual de consultas para priorizar seguimiento.',
  pricing: 'Enviar objetivo, urgencia y alcance por formulario o WhatsApp manual.',
  not_sure: 'Realizar diagnóstico breve para definir camino por fases.',
  human_help: 'Usar WhatsApp manual o formulario para revisión comercial del equipo.',
};

function inferUrgencyLevel(message: string | null) {
  if (!message) return 'Dato pendiente';

  if (/(urgente|ya|hoy|esta semana|rápido|cuanto antes)/i.test(message)) {
    return 'Alta';
  }

  if (/(este mes|pr[oó]ximas semanas|prioridad media|cuando se pueda)/i.test(message)) {
    return 'Media';
  }

  return 'Dato pendiente';
}

function inferMainGoalOrProblem(message: string | null, memory: PublicAssistantMemory | null) {
  if (message && message.trim().length >= 12) {
    return message.trim().slice(0, 180);
  }

  if (memory?.summary) {
    return memory.summary.slice(0, 180);
  }

  return 'Dato pendiente';
}

export function buildPublicLeadHandoffSummary(input: BuildHandoffSummaryInput): PublicLeadHandoffSummary {
  return {
    projectType: PROJECT_TYPE_LABELS[input.intent],
    mainGoalOrProblem: inferMainGoalOrProblem(input.latestVisitorMessage, input.memory),
    probableService: PROBABLE_SERVICE_LABELS[input.intent],
    urgencyLevel: inferUrgencyLevel(input.latestVisitorMessage),
    nextRecommendedStep: NEXT_STEP_LABELS[input.intent],
  };
}

export function formatPublicLeadHandoffSummary(summary: PublicLeadHandoffSummary) {
  return [
    `Tipo de proyecto: ${summary.projectType}`,
    `Objetivo/problema: ${summary.mainGoalOrProblem}`,
    `Servicio probable: ${summary.probableService}`,
    `Urgencia: ${summary.urgencyLevel}`,
    `Siguiente paso recomendado: ${summary.nextRecommendedStep}`,
  ].join('\n');
}

export function buildPublicLeadHandoffWhatsAppMessage(summary: PublicLeadHandoffSummary) {
  return [
    'Hola, quiero continuar esta conversación del asistente comercial.',
    '',
    'Resumen para contacto:',
    formatPublicLeadHandoffSummary(summary),
  ].join('\n');
}
