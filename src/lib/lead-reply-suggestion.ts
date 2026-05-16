import type { LeadReplySuggestion, LeadReplySuggestionInput, LeadReplySuggestionMessage } from '@/types/lead-reply-suggestion';

function normalizeText(value: string) {
  return value.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
}

function getLatestInboundMessage(messages: LeadReplySuggestionMessage[]) {
  return messages.find((message) => message.direction === 'inbound');
}

function inferIntent(text: string) {
  const normalized = normalizeText(text);

  if (/(precio|cost|cuanto|presupuesto|valor|tarifa)/.test(normalized)) return 'pricing';
  if (/(tiempo|plazo|cuando|urgente|rapido|asap)/.test(normalized)) return 'timeline';
  if (/(landing|capta|conversion)/.test(normalized)) return 'landing';
  if (/(sitio|web|institucional)/.test(normalized)) return 'website';
  if (/(sistema|proceso|interno|dashboard|panel|gestion)/.test(normalized)) return 'system';
  if (/(mvp|saas|producto)/.test(normalized)) return 'saas';
  if (/(ia|automatiz)/.test(normalized)) return 'ai';

  return 'general';
}

function baseGreeting(name?: string | null) {
  const cleanName = name?.trim();
  return cleanName ? `¡Gracias por escribir, ${cleanName}!` : '¡Gracias por escribir!';
}

export function buildLeadReplySuggestionByRules(input: LeadReplySuggestionInput): LeadReplySuggestion {
  const latestInbound = getLatestInboundMessage(input.messages);
  const inboundContent = latestInbound?.content?.trim() ?? '';
  const intent = inferIntent(inboundContent || input.lead.message || input.lead.serviceInterest);
  const greeting = baseGreeting(input.lead.name);

  let suggestedReply: string;
  let rationale: string;

  switch (intent) {
    case 'pricing':
      suggestedReply = `${greeting} El costo depende del alcance y prioridades del proyecto. Si querés, te hago 3 preguntas rápidas y te propongo una opción inicial con próximos pasos.`;
      rationale = 'Regla local: detectó consulta de costos/presupuesto y propone respuesta consultiva sin promesas cerradas.';
      break;
    case 'timeline':
      suggestedReply = `${greeting} Podemos estimar tiempos reales según alcance y urgencia. Si te parece, revisamos objetivo principal y te propongo un plan por etapas.`;
      rationale = 'Regla local: detectó consulta de tiempos/urgencia y sugiere planificación por etapas.';
      break;
    case 'landing':
      suggestedReply = `${greeting} Para una landing comercial, el siguiente paso es definir oferta, público y CTA principal. Con eso te recomiendo una estructura concreta para captar más consultas.`;
      rationale = 'Regla local: interés orientado a captación/landing.';
      break;
    case 'website':
      suggestedReply = `${greeting} Podemos ayudarte a definir una web profesional clara y confiable. El próximo paso es priorizar páginas clave, servicios y mensajes de confianza.`;
      rationale = 'Regla local: interés orientado a presencia web profesional.';
      break;
    case 'system':
      suggestedReply = `${greeting} Para sistema interno o dashboard, conviene mapear primero tus procesos críticos. Así priorizamos qué ordenar, medir y digitalizar en la primera fase.`;
      rationale = 'Regla local: interés en operaciones internas/sistema/dashboard.';
      break;
    case 'saas':
      suggestedReply = `${greeting} Para validar un MVP SaaS, podemos bajar la idea a usuarios, problema y funcionalidades esenciales. Te propongo empezar con un alcance corto de validación.`;
      rationale = 'Regla local: interés en MVP/SaaS y foco en validación temprana.';
      break;
    case 'ai':
      suggestedReply = `${greeting} Podemos evaluar IA aplicada de forma gradual y controlada, empezando por casos de uso concretos y datos disponibles. Primero revisamos proceso actual para no sumar complejidad innecesaria.`;
      rationale = 'Regla local: interés en IA/automatización con enfoque de fases y control humano.';
      break;
    default:
      suggestedReply = `${greeting} Para orientarte mejor, contame objetivo principal, urgencia y tipo de solución que querés priorizar. Con eso te recomiendo el mejor siguiente paso.`;
      rationale = 'Regla local: contexto general sin intención dominante clara.';
      break;
  }

  if (input.lead.status === 'archived' || input.lead.status === 'closed') {
    suggestedReply = `${greeting} Gracias por retomar el contacto. Si querés reactivar el proyecto, revisamos contexto actual y te propongo un siguiente paso actualizado.`;
    rationale = 'Regla local: lead cerrado/archivado, sugiere reactivación sin asumir continuidad automática.';
  }

  return {
    suggestedReply,
    source: 'rules',
    rationale,
  };
}
