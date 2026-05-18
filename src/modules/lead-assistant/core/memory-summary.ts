import type {
  PublicAssistantConversationStage,
  PublicAssistantIntent,
  PublicAssistantMemory,
  PublicAssistantMemoryFacts,
  PublicAssistantMessage,
} from '@/modules/lead-assistant/types/lead-assistant';

const INTENT_LABELS: Record<PublicAssistantIntent, string> = {
  landing: 'captación con landing comercial',
  web_professional: 'web profesional',
  dashboard: 'dashboard interno',
  mvp_saas: 'MVP SaaS',
  ai_automation: 'IA aplicada por fases',
  seo_marketing: 'SEO/marketing',
  lead_followup_priority: 'seguimiento y priorización de consultas',
  pricing: 'estimación de alcance y costos',
  not_sure: 'diagnóstico inicial',
  human_help: 'contacto con el equipo',
};

function uniqueIntents(intents: PublicAssistantIntent[]) {
  return Array.from(new Set(intents));
}

function uniqueValues(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

function detectBusinessType(message: string) {
  if (/(ropa|accesorios|tienda|venta de art[ií]culos|vendo productos|local)/i.test(message)) {
    return 'retail / venta de productos';
  }
  if (/(servicios|consultor[ií]a|estudio|agencia)/i.test(message)) {
    return 'negocio de servicios';
  }
  if (/(saas|software|sistema|app)/i.test(message)) {
    return 'producto digital / sistema';
  }
  return undefined;
}

function detectChannels(message: string) {
  const channels: string[] = [];
  if (/instagram/i.test(message)) channels.push('Instagram');
  if (/whatsapp/i.test(message)) channels.push('WhatsApp');
  if (/formulario/i.test(message)) channels.push('formulario');
  if (/(web|sitio|p[aá]gina)/i.test(message)) channels.push('web');
  return channels;
}

function detectPainPoints(message: string) {
  const painPoints: string[] = [];
  if (/(pierdo|se me pasan|se me olvidan|sin responder|no llego a responder)/i.test(message)) {
    painPoints.push('pierde consultas o seguimiento');
  }
  if (/(desorden|ordenar|organizar)/i.test(message)) {
    painPoints.push('necesita ordenar operación comercial');
  }
  if (/(poco presupuesto|presupuesto bajo)/i.test(message)) {
    painPoints.push('presupuesto limitado');
  }
  return painPoints;
}

function detectGoals(message: string, currentIntent: PublicAssistantIntent) {
  const goals: string[] = [];
  if (/(captar|consultas|clientes|leads)/i.test(message)) goals.push('captar consultas');
  if (/(vender online|tienda online|ecommerce|cat[aá]logo)/i.test(message)) goals.push('mostrar o vender productos');
  if (/(seguimiento|prioridad|dashboard|panel|ordenar)/i.test(message)) goals.push('ordenar seguimiento');
  if (currentIntent === 'mvp_saas') goals.push('validar MVP');
  if (currentIntent === 'ai_automation') goals.push('evaluar IA por fases');
  return goals;
}

function recommendedPathForIntent(intent: PublicAssistantIntent) {
  const paths: Partial<Record<PublicAssistantIntent, string>> = {
    landing: 'landing comercial para captación',
    web_professional: 'web profesional para confianza y estructura',
    dashboard: 'dashboard interno para operación',
    lead_followup_priority: 'seguimiento de leads primero; captación como complemento',
    mvp_saas: 'MVP por fases',
    ai_automation: 'IA local/controlada como segunda capa',
    seo_marketing: 'marketing con seguimiento comercial',
  };

  return paths[intent];
}

function detectLastObjection(message: string) {
  if (/(garantizan|garant[ií]a|ventas garantizadas|resultados garantizados)/i.test(message)) {
    return 'garantía de resultados';
  }
  if (/(meta api|whatsapp cloud api|whatsapp autom[aá]tico)/i.test(message)) {
    return 'integración/automatización externa';
  }
  if (/(precio|costo|presupuesto|tarifa)/i.test(message)) {
    return 'presupuesto o costo';
  }
  return undefined;
}

function mergeFacts(
  previousFacts: PublicAssistantMemoryFacts | undefined,
  latestVisitorMessage: string,
  currentIntent: PublicAssistantIntent,
): PublicAssistantMemoryFacts {
  const businessType = detectBusinessType(latestVisitorMessage) ?? previousFacts?.businessType;
  const channels = uniqueValues([...(previousFacts?.channels ?? []), ...detectChannels(latestVisitorMessage)]).slice(-5);
  const painPoints = uniqueValues([
    ...(previousFacts?.painPoints ?? []),
    ...detectPainPoints(latestVisitorMessage),
  ]).slice(-5);
  const goals = uniqueValues([
    ...(previousFacts?.goals ?? []),
    ...detectGoals(latestVisitorMessage, currentIntent),
  ]).slice(-5);
  const lastObjection = detectLastObjection(latestVisitorMessage) ?? previousFacts?.lastObjection;

  return {
    businessType,
    channels,
    painPoints,
    goals,
    recommendedPath: recommendedPathForIntent(currentIntent) ?? previousFacts?.recommendedPath,
    lastObjection,
  };
}

function serializeFacts(facts: PublicAssistantMemoryFacts) {
  const parts = [
    facts.businessType ? `Negocio: ${facts.businessType}` : null,
    facts.channels.length > 0 ? `Canales: ${facts.channels.join(', ')}` : null,
    facts.painPoints.length > 0 ? `Dolores: ${facts.painPoints.join(', ')}` : null,
    facts.goals.length > 0 ? `Objetivos: ${facts.goals.join(', ')}` : null,
    facts.recommendedPath ? `Camino sugerido: ${facts.recommendedPath}` : null,
    facts.lastObjection ? `Última objeción: ${facts.lastObjection}` : null,
  ].filter(Boolean);

  return parts.join(' | ');
}

export function parsePublicAssistantMemoryFacts(summary: string): PublicAssistantMemoryFacts {
  const facts: PublicAssistantMemoryFacts = {
    channels: [],
    painPoints: [],
    goals: [],
  };

  const businessTypeMatch = summary.match(/Negocio:\s*([^|.]+)/);
  if (businessTypeMatch?.[1]) {
    facts.businessType = businessTypeMatch[1].trim();
  }

  for (const part of summary.split('|').map((value) => value.trim())) {
    const [key, ...rest] = part.split(':');
    const value = rest.join(':').trim();

    if (!key || !value) continue;

    if (key === 'Negocio') facts.businessType = value;
    if (key === 'Canales') facts.channels = value.split(',').map((item) => item.trim()).filter(Boolean);
    if (key === 'Dolores') facts.painPoints = value.split(',').map((item) => item.trim()).filter(Boolean);
    if (key === 'Objetivos') facts.goals = value.split(',').map((item) => item.trim()).filter(Boolean);
    if (key === 'Camino sugerido') facts.recommendedPath = value;
    if (key === 'Última objeción') facts.lastObjection = value;
  }

  return facts;
}

export function buildPublicAssistantMemorySummary(
  previousMemory: PublicAssistantMemory | null,
  messages: PublicAssistantMessage[],
  currentIntent: PublicAssistantIntent,
  conversationStage: PublicAssistantConversationStage = 'diagnosis',
): PublicAssistantMemory {
  const latestVisitorMessage =
    [...messages].reverse().find((message) => message.role === 'visitor')?.content ?? '';
  const previousInterests = previousMemory?.interests ?? [];
  const interests = uniqueIntents([...previousInterests, currentIntent]).slice(-4);
  const facts = mergeFacts(previousMemory?.facts, latestVisitorMessage, currentIntent);
  const structuredFacts = serializeFacts(facts);

  const summary = `Interés principal: ${INTENT_LABELS[currentIntent]}. Etapa: ${conversationStage}. ${structuredFacts}. Último contexto: ${latestVisitorMessage.slice(0, 180)}`;

  return {
    summary,
    interests,
    lastTopic: currentIntent,
    conversationStage,
    facts,
    updatedAt: new Date().toISOString(),
  };
}

export function describePreviousMemory(memory: PublicAssistantMemory | null) {
  if (!memory) return null;

  const interestLabel = memory.interests[0] ?? memory.lastTopic;
  if (!interestLabel) return null;

  return `La última vez estabas explorando ${interestLabel.replaceAll('_', ' ')}.`;
}
