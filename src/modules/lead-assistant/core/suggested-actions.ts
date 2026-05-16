import { buildWhatsAppLink } from '@/lib/whatsapp';
import type {
  AppsMarketingAssistantConfig,
  AssistantCta,
  PublicAssistantIntent,
} from '@/modules/lead-assistant/types/lead-assistant';

export function buildAssistantCtas(intent: PublicAssistantIntent, config: AppsMarketingAssistantConfig): AssistantCta[] {
  const whatsappByIntent: Record<PublicAssistantIntent, string> = {
    landing: 'Hola, quiero orientación para una landing comercial enfocada en captar más consultas.',
    web_professional: 'Hola, quiero evaluar una web profesional para mi negocio.',
    dashboard: 'Hola, quiero ordenar datos y operación con un dashboard interno.',
    mvp_saas: 'Hola, quiero validar un MVP SaaS y definir alcance inicial.',
    ai_automation: 'Hola, quiero evaluar IA aplicada por fases para mi negocio.',
    seo_marketing: 'Hola, quiero mejorar visibilidad y captación con marketing/SEO.',
    lead_followup_priority: 'Hola, pierdo consultas en WhatsApp/Instagram y quiero priorizarlas mejor.',
    pricing: 'Hola, quiero estimar costos y alcance para mi proyecto.',
    not_sure: 'Hola, necesito diagnóstico para definir si me conviene landing, web, dashboard o IA.',
    human_help: 'Hola, quiero hablar con una persona del equipo para revisar mi caso.',
  };

  return [
    {
      kind: 'whatsapp_manual',
      label: 'Hablar por WhatsApp manual',
      href: buildWhatsAppLink(config.whatsappNumber, whatsappByIntent[intent]),
    },
    {
      kind: 'form',
      label: 'Completar formulario',
      href: config.contactFormAnchor,
    },
  ];
}

export function getNextDiagnosticQuestion(intent: PublicAssistantIntent) {
  switch (intent) {
    case 'lead_followup_priority':
      return '¿Cuántas consultas recibís por semana y cómo las priorizan hoy?';
    case 'landing':
      return '¿Tu prioridad hoy es captar más consultas o mejorar la calidad de las que llegan?';
    case 'web_professional':
      return '¿Qué páginas clave necesitás sí o sí para que tu web te ayude comercialmente?';
    case 'dashboard':
      return '¿Qué decisiones te cuesta tomar hoy por falta de visibilidad en datos?';
    case 'mvp_saas':
      return '¿Quién es el usuario inicial y cuál es el problema principal que querés validar?';
    case 'ai_automation':
      return '¿Qué tarea repetitiva te genera más fricción hoy y con qué datos la ejecutan?';
    case 'seo_marketing':
      return '¿Qué canal te trae hoy más consultas y cuál te gustaría escalar primero?';
    case 'pricing':
      return 'Para estimar bien, ¿podés contarme objetivo, urgencia y alcance esperado?';
    case 'human_help':
      return 'Si querés, te dejo contacto directo para que lo revisen con vos en detalle.';
    case 'not_sure':
    default:
      return '¿Qué te preocupa más hoy: captar consultas, ordenar seguimiento o validar producto?';
  }
}
