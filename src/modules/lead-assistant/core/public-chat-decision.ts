import type {
  DetectIntentResult,
  PublicAssistantConversationStage,
  PublicAssistantMemory,
  PublicAssistantReply,
  PublicAssistantIntent,
  PublicChatDecision,
} from '@/modules/lead-assistant/types/lead-assistant';

const COMMERCIAL_GOAL_BY_INTENT: Record<PublicAssistantIntent, string> = {
  landing: 'Capture qualified consultations with a focused landing offer.',
  web_professional: 'Build trust and professional presence with a clear website structure.',
  dashboard: 'Improve operational decisions with visibility and lead tracking clarity.',
  mvp_saas: 'Validate the product with a minimal and commercial-first SaaS scope.',
  ai_automation: 'Evaluate AI in controlled phases after process clarity and data basics.',
  seo_marketing: 'Increase sustainable demand with channel-focus and realistic follow-up capacity.',
  lead_followup_priority: 'Reduce lead loss by prioritizing follow-up before scaling acquisition.',
  pricing: 'Qualify scope and timeline before any responsible estimate.',
  not_sure: 'Guide initial diagnosis to choose a realistic first path.',
  human_help: 'Move to manual human review for deeper qualification.',
};

const RECOMMENDED_PATH_BY_INTENT: Record<PublicAssistantIntent, string> = {
  landing: 'landing comercial para captacion',
  web_professional: 'web profesional orientada a confianza y conversion',
  dashboard: 'dashboard interno para orden operativo',
  mvp_saas: 'mvp por fases con alcance validable',
  ai_automation: 'ia aplicada como segunda capa con control',
  seo_marketing: 'marketing con seguimiento comercial ordenado',
  lead_followup_priority: 'seguimiento de consultas primero, captacion despues',
  pricing: 'diagnostico comercial para estimacion responsable',
  not_sure: 'diagnostico inicial para definir primer paso',
  human_help: 'handoff manual por whatsapp o formulario',
};

function defaultNextQuestion(intent: PublicAssistantIntent) {
  if (intent === 'pricing') return 'Que alcance minimo necesitas y en que plazo queres lanzarlo?';
  if (intent === 'lead_followup_priority') return 'Cuantas consultas recibis por dia y como las seguis hoy?';
  return 'Para orientarte mejor, cual es tu objetivo comercial principal este mes?';
}

export function buildPublicChatDecision(input: {
  visitorMessage: string;
  detectedIntent: DetectIntentResult;
  memory: PublicAssistantMemory | null;
  conversationStage?: PublicAssistantConversationStage;
  baseReply: PublicAssistantReply;
}): PublicChatDecision {
  return {
    intent: input.detectedIntent.intent,
    userMessage: input.visitorMessage,
    conversationSummary: input.memory?.summary ?? 'sin memoria previa',
    detectedContext: {
      businessType: input.memory?.facts?.businessType,
      channels: input.memory?.facts?.channels ?? [],
      painPoints: input.memory?.facts?.painPoints ?? [],
      goals: input.memory?.facts?.goals ?? [],
      lastObjection: input.memory?.facts?.lastObjection,
      conversationStage: input.conversationStage,
    },
    recommendedPath:
      input.memory?.facts?.recommendedPath ?? RECOMMENDED_PATH_BY_INTENT[input.detectedIntent.intent],
    nextQuestion: input.baseReply.followUpQuestion ?? defaultNextQuestion(input.detectedIntent.intent),
    commercialGoal: COMMERCIAL_GOAL_BY_INTENT[input.detectedIntent.intent],
    cta: input.baseReply.ctas,
    constraints: [
      'No prometer ventas garantizadas.',
      'No inventar integraciones o funcionalidades fuera de alcance.',
      'No mencionar reglas internas ni procesamiento interno.',
      'No ofrecer envio automatico de WhatsApp.',
      'Mantener orientacion comercial y siguiente paso concreto.',
    ],
  };
}
