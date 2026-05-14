import type { ChatIntent, ChatMessage, QuickReply } from '@/types/chat';

export const initialChatMessage: ChatMessage = {
  id: 'assistant-initial',
  role: 'assistant',
  text: 'Hola, soy el asistente de Apps Marketing. Puedo orientarte sobre qué tipo de solución digital puede servirte: landing, web, sistema, dashboard, SaaS o automatización. ¿Qué querés construir?',
};

export const quickReplies: QuickReply[] = [
  { id: 'qr-landing', label: 'Necesito una landing', intentHint: 'landing' },
  { id: 'qr-web', label: 'Quiero una web profesional', intentHint: 'web' },
  { id: 'qr-system', label: 'Necesito un sistema a medida', intentHint: 'system' },
  { id: 'qr-saas', label: 'Quiero crear un SaaS', intentHint: 'saas' },
  { id: 'qr-ai', label: 'Me interesa IA o automatización', intentHint: 'automation_ai' },
  { id: 'qr-unsure', label: 'No estoy seguro', intentHint: 'unknown' },
];

export const intentResponses: Record<ChatIntent, string> = {
  landing:
    'Perfecto. Si querés captar consultas rápido, una landing comercial con propuesta clara y CTA fuerte suele ser el mejor primer paso. Si querés, te recomiendo el paquete más conveniente.',
  web:
    'Excelente. Una web profesional te ayuda a presentar servicios con más credibilidad, ordenar tu mensaje y mejorar la experiencia comercial.',
  system:
    'Tiene sentido. Un sistema web a medida o dashboard interno aplica cuando necesitás ordenar procesos, seguimiento y operación del equipo.',
  saas:
    'Buen enfoque. Un MVP SaaS permite validar una idea de producto digital sin sobredesarrollar al inicio, con iteraciones según feedback real.',
  automation_ai:
    'Podemos evaluarlo como fase avanzada. Primero conviene mapear procesos y datos disponibles para definir una evolución responsable hacia automatización e IA aplicada.',
  seo_marketing:
    'Buen punto. SEO y marketing digital inicial ayudan a mejorar visibilidad y la calidad de las consultas que llegan desde tus canales.',
  pricing:
    'Buena pregunta. El costo depende del tipo de proyecto, alcance y tiempos. Contame tu proyecto por WhatsApp o completá el formulario para orientarte mejor.',
  human:
    'Perfecto. Podés escribir por WhatsApp o dejar tu consulta en el formulario.',
  unknown:
    'Te ayudo a definirlo. Contame qué querés mejorar primero: captar más consultas, presentar mejor tus servicios o ordenar procesos internos.',
};

export const privacyNote =
  'Este chat es una orientación inicial. No compartas contraseñas, datos bancarios ni información sensible.';
