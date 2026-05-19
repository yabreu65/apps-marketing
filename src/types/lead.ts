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

export type LeadDiagnosisGoal =
  | 'leads'
  | 'web'
  | 'system'
  | 'saas'
  | 'automation'
  | 'ai'
  | 'unsure';

export type LeadDiagnosisStage =
  | 'idea'
  | 'running'
  | 'manual'
  | 'noconvert'
  | 'scale';

export type LeadDiagnosisUrgency = 'now' | 'soon' | 'explore';

export type LeadDiagnosisRecommendation =
  | 'Landing comercial'
  | 'Sitio web profesional'
  | 'Sistema web a medida'
  | 'Dashboard / panel interno'
  | 'MVP SaaS'
  | 'Automatización comercial'
  | 'IA aplicada al negocio (fase avanzada)';

export type LeadDiagnosisContext = {
  goal: LeadDiagnosisGoal;
  stage: LeadDiagnosisStage;
  urgency: LeadDiagnosisUrgency;
  recommendedSolution: LeadDiagnosisRecommendation;
};

export type LeadPayload = {
  name: string;
  email: string;
  phone: string;
  businessType: string;
  serviceInterest: LeadInterest;
  message: string;
  source: LeadSource;
  diagnosis?: LeadDiagnosisContext;
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


export type LeadNote = {
  id: string;
  leadId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type LeadStatusHistoryItem = {
  id: string;
  leadId: string;
  fromStatus: LeadStatus | null;
  toStatus: LeadStatus;
  createdAt: string;
};
