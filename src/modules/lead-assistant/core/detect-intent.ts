import type { DetectIntentResult, PublicAssistantIntent } from '@/modules/lead-assistant/types/lead-assistant';

type IntentRule = {
  intent: PublicAssistantIntent;
  patterns: RegExp[];
  confidence: number;
  signals: string[];
};

const INTENT_RULES: IntentRule[] = [
  {
    intent: 'lead_followup_priority',
    patterns: [
      /(pierdo|se me van|se enfr[ií]an|se me pasan|olvid|seguimiento|prioridad|pipeline|ordenar consultas)/i,
      /(consultas|leads|mensajes).*(sin responder|sin seguimiento|sin ordenar)|(sin responder|sin seguimiento|sin ordenar).*(consultas|leads|mensajes)/i,
      /(no s[eé] a cu[aá]les|no sabemos cu[aá]les|no llego a responder|no damos abasto)/i,
    ],
    confidence: 0.93,
    signals: ['seguimiento', 'priorización', 'canales inbound'],
  },
  {
    intent: 'not_sure',
    patterns: [
      /(no s[eé] si|no estoy seguro|no tengo claro|no s[eé] por d[oó]nde empezar)/i,
      /(landing|web|dashboard|ia|mvp).*(landing|web|dashboard|ia|mvp)/i,
    ],
    confidence: 0.87,
    signals: ['diagnóstico inicial', 'múltiples alternativas'],
  },
  {
    intent: 'pricing',
    patterns: [/(precio|costo|cu[aá]nto|presupuesto|tarifa)/i],
    confidence: 0.9,
    signals: ['consulta de pricing'],
  },
  {
    intent: 'mvp_saas',
    patterns: [/(mvp|saas|producto digital|app tipo saas)/i],
    confidence: 0.92,
    signals: ['validación de producto'],
  },
  {
    intent: 'ai_automation',
    patterns: [/(ia|inteligencia artificial|automatiz)/i],
    confidence: 0.88,
    signals: ['interés en IA/automatización'],
  },
  {
    intent: 'dashboard',
    patterns: [/(dashboard|panel|reportes|m[eé]tricas|datos)/i],
    confidence: 0.86,
    signals: ['visibilidad operativa'],
  },
  {
    intent: 'landing',
    patterns: [/(landing|captar|captaci[oó]n|conversion|consultas)/i],
    confidence: 0.84,
    signals: ['captación inicial'],
  },
  {
    intent: 'web_professional',
    patterns: [/(web profesional|sitio web|p[aá]gina web|institucional)/i],
    confidence: 0.84,
    signals: ['presencia profesional'],
  },
  {
    intent: 'seo_marketing',
    patterns: [/(seo|marketing|tr[aá]fico|ads|contenido)/i],
    confidence: 0.82,
    signals: ['adquisición y visibilidad'],
  },
  {
    intent: 'human_help',
    patterns: [/(persona|humano|asesor|equipo|hablar con alguien)/i],
    confidence: 0.8,
    signals: ['asistencia humana'],
  },
];

export function detectLeadAssistantIntent(input: string): DetectIntentResult {
  for (const rule of INTENT_RULES) {
    if (rule.patterns.some((pattern) => pattern.test(input))) {
      return {
        intent: rule.intent,
        confidence: rule.confidence,
        signals: rule.signals,
      };
    }
  }

  return {
    intent: 'not_sure',
    confidence: 0.55,
    signals: ['intención ambigua'],
  };
}
