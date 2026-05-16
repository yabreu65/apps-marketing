import type { AppsMarketingAssistantConfig } from '@/modules/lead-assistant/types/lead-assistant';

export const appsMarketingAssistantConfig: AppsMarketingAssistantConfig = {
  businessName: 'Apps Marketing / Yoryi AI Studio',
  whatsappNumber: '+54 9 11 0000 0000',
  contactFormAnchor: '#contact-form',
  greeting:
    'Hola, soy el asistente comercial de Apps Marketing. Te ayudo a definir si hoy te conviene una landing, una web, un dashboard, un MVP SaaS o una fase de IA aplicada.',
  privacyNote:
    'Este chat puede guardar contexto para mejorar la atención. No compartas contraseñas, datos bancarios ni información sensible.',
  quickReplies: [
    { id: 'qr-not-sure', label: 'No estoy seguro por dónde empezar', intentHint: 'not_sure' },
    { id: 'qr-landing', label: 'Quiero captar más consultas', intentHint: 'landing' },
    { id: 'qr-web', label: 'Necesito una web profesional', intentHint: 'web_professional' },
    { id: 'qr-dashboard', label: 'Pierdo seguimiento de leads', intentHint: 'lead_followup_priority' },
    { id: 'qr-saas', label: 'Quiero validar un MVP SaaS', intentHint: 'mvp_saas' },
    { id: 'qr-ai', label: 'Me interesa IA aplicada', intentHint: 'ai_automation' },
  ],
};
