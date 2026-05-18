import type { AppsMarketingAssistantConfig } from '@/modules/lead-assistant/types/lead-assistant';

export const appsMarketingAssistantConfig: AppsMarketingAssistantConfig = {
  businessName: 'Apps Marketing / Yoryi AI Studio',
  whatsappNumber: '+54 9 11 0000 0000',
  contactFormAnchor: '#contact-form',
  greeting:
    'Hola, soy el asistente comercial de Apps Marketing. En 2 minutos te ayudo a definir tu próximo paso: landing, web, dashboard o MVP.',
  privacyNote:
    'Este chat guarda contexto local para orientarte mejor. No compartas contraseñas, datos bancarios ni información sensible.',
  quickReplies: [
    { id: 'qr-not-sure', label: 'No sé qué me conviene hoy', intentHint: 'not_sure' },
    { id: 'qr-landing', label: 'Quiero captar más consultas', intentHint: 'landing' },
    { id: 'qr-web', label: 'Necesito una web que convierta', intentHint: 'web_professional' },
    { id: 'qr-dashboard', label: 'Pierdo seguimiento de consultas', intentHint: 'lead_followup_priority' },
    { id: 'qr-saas', label: 'Quiero validar un MVP SaaS', intentHint: 'mvp_saas' },
  ],
};
