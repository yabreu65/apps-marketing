import { buildAssistantCtas, getNextDiagnosticQuestion } from '@/modules/lead-assistant/core/suggested-actions';
import type {
  AppsMarketingAssistantConfig,
  PublicAssistantReply,
  PublicAssistantReplyInput,
} from '@/modules/lead-assistant/types/lead-assistant';

function responseByIntent(intent: PublicAssistantReply['intent']) {
  switch (intent) {
    case 'lead_followup_priority':
      return {
        text: 'Tiene sentido: si hoy se te pierden consultas, primero conviene ordenar seguimiento y priorización. En ese escenario, un dashboard interno suele dar más impacto inicial que sumar más demanda, y la IA puede sumar como segunda capa de apoyo.',
        rationale: 'Prioriza operación comercial antes de captación adicional.',
      };
    case 'landing':
      return {
        text: 'Si tu prioridad es captar consultas rápido, una landing comercial clara suele ser el primer paso más eficiente. Ahí enfocamos oferta, público y CTA para convertir mejor.',
        rationale: 'Enfoque de captación inicial.',
      };
    case 'web_professional':
      return {
        text: 'Una web profesional te ayuda a mejorar confianza y claridad comercial. Es ideal cuando necesitás presentar servicios de forma sólida y ordenada.',
        rationale: 'Enfoque de presencia y credibilidad.',
      };
    case 'dashboard':
      return {
        text: 'Si necesitás visibilidad para decidir más rápido, el camino correcto suele ser dashboard/panel interno. Primero definimos qué métricas importan y qué decisiones querés acelerar.',
        rationale: 'Enfoque de datos para decisión operativa.',
      };
    case 'mvp_saas':
      return {
        text: 'Para un MVP SaaS, lo más sano es validar problema, usuario y funcionalidades mínimas antes de construir una plataforma completa.',
        rationale: 'Evita sobreconstrucción temprana.',
      };
    case 'ai_automation':
      return {
        text: 'IA aplicada puede sumar mucho, pero conviene usarla por fases: primero proceso y datos, después resumen/priorización/sugerencias. Nada de “IA mágica” sin base.',
        rationale: 'IA como capa de apoyo, no punto de partida ciego.',
      };
    case 'seo_marketing':
      return {
        text: 'Si el foco es visibilidad y demanda, SEO/marketing puede ser un frente clave. La recomendación es alinear canal, oferta y capacidad de seguimiento.',
        rationale: 'Enfoque de adquisición sostenible.',
      };
    case 'pricing':
      return {
        text: 'El costo depende del alcance real, urgencia y complejidad. Para estimarte bien, primero hay que encuadrar esos tres puntos.',
        rationale: 'Pricing responsable, sin inventar números.',
      };
    case 'human_help':
      return {
        text: 'Perfecto, podemos pasarte contacto directo del equipo para revisar tu caso en detalle.',
        rationale: 'Derivación humana explícita.',
      };
    case 'not_sure':
    default:
      return {
        text: 'Para recomendarte bien, primero conviene separar si hoy necesitás captación (landing), presencia profesional (web), orden operativo (dashboard) o evolución por fases con IA.',
        rationale: 'Caso ambiguo requiere diagnóstico guiado.',
      };
  }
}

export function buildPublicLeadAssistantResponse(
  input: PublicAssistantReplyInput,
  config: AppsMarketingAssistantConfig,
): PublicAssistantReply {
  const response = responseByIntent(input.detectedIntent.intent);
  const followUpQuestion = getNextDiagnosticQuestion(input.detectedIntent.intent);
  const ctas = buildAssistantCtas(input.detectedIntent.intent, config);

  const previousContext = input.memory?.summary
    ? ` También recuerdo que antes estabas evaluando: ${input.memory.summary}.`
    : '';

  return {
    text: `${response.text}${previousContext}`,
    intent: input.detectedIntent.intent,
    followUpQuestion,
    rationale: response.rationale,
    source: 'rules',
    ctas,
  };
}
