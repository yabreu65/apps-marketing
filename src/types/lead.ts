export type LeadInterest =
  | 'Landing comercial'
  | 'Sitio web profesional'
  | 'Sistema web a medida'
  | 'Dashboard / panel interno'
  | 'MVP SaaS'
  | 'Automatización comercial'
  | 'IA aplicada al negocio'
  | 'SEO / marketing digital'
  | 'No estoy seguro (quiero orientación)'
  | '';

export type LeadSource = 'contact_form' | 'chat' | 'diagnosis' | 'unknown';

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'proposal' | 'closed' | 'archived';

export type LeadPayload = {
  name: string;
  email: string;
  phone: string;
  businessType: string;
  serviceInterest: LeadInterest;
  message: string;
  source: LeadSource;
};

export type LeadValidationError = {
  field: keyof LeadPayload;
  message: string;
};

export type LeadApiResponse = {
  ok: boolean;
  message: string;
  leadId?: string;
  errors?: LeadValidationError[];
};
