import type { LeadPayload, LeadValidationError } from '@/types/lead';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ALLOWED_INTERESTS = new Set<LeadPayload['serviceInterest']>([
  '',
  'Landing comercial',
  'Sitio web profesional',
  'Sistema web a medida',
  'Dashboard / panel interno',
  'MVP SaaS',
  'Automatización comercial',
  'IA aplicada al negocio',
  'SEO / marketing digital',
  'No estoy seguro (quiero orientación)',
]);

const ALLOWED_SOURCES = new Set<LeadPayload['source']>(['contact_form', 'chat', 'diagnosis', 'unknown']);
const ALLOWED_DIAGNOSIS_GOALS = new Set<NonNullable<LeadPayload['diagnosis']>['goal']>([
  'leads',
  'web',
  'system',
  'saas',
  'automation',
  'ai',
  'unsure',
]);
const ALLOWED_DIAGNOSIS_STAGES = new Set<NonNullable<LeadPayload['diagnosis']>['stage']>([
  'idea',
  'running',
  'manual',
  'noconvert',
  'scale',
]);
const ALLOWED_DIAGNOSIS_URGENCY = new Set<NonNullable<LeadPayload['diagnosis']>['urgency']>([
  'now',
  'soon',
  'explore',
]);
const ALLOWED_DIAGNOSIS_RECOMMENDATIONS = new Set<NonNullable<LeadPayload['diagnosis']>['recommendedSolution']>([
  'Landing comercial',
  'Sitio web profesional',
  'Sistema web a medida',
  'Dashboard / panel interno',
  'MVP SaaS',
  'Automatización comercial',
  'IA aplicada al negocio (fase avanzada)',
]);

export function normalizeLeadPayload(input: unknown): LeadPayload {
  const obj = (input && typeof input === 'object' ? input : {}) as Record<string, unknown>;
  const diagnosisInput =
    obj.diagnosis && typeof obj.diagnosis === 'object'
      ? (obj.diagnosis as Record<string, unknown>)
      : null;

  return {
    name: String(obj.name ?? '').trim(),
    email: String(obj.email ?? '').trim(),
    phone: String(obj.phone ?? '').trim(),
    businessType: String(obj.businessType ?? '').trim(),
    serviceInterest: String(obj.serviceInterest ?? '').trim() as LeadPayload['serviceInterest'],
    message: String(obj.message ?? '').trim(),
    source: String(obj.source ?? 'unknown').trim() as LeadPayload['source'],
    diagnosis: diagnosisInput
      ? {
          goal: String(diagnosisInput.goal ?? '').trim() as NonNullable<LeadPayload['diagnosis']>['goal'],
          stage: String(diagnosisInput.stage ?? '').trim() as NonNullable<LeadPayload['diagnosis']>['stage'],
          urgency: String(diagnosisInput.urgency ?? '').trim() as NonNullable<LeadPayload['diagnosis']>['urgency'],
          recommendedSolution: String(
            diagnosisInput.recommendedSolution ?? '',
          ).trim() as NonNullable<LeadPayload['diagnosis']>['recommendedSolution'],
        }
      : undefined,
  };
}

export function validateLeadPayload(payload: LeadPayload): LeadValidationError[] {
  const errors: LeadValidationError[] = [];

  if (!payload.name) {
    errors.push({ field: 'name', message: 'El nombre es obligatorio.' });
  } else if (payload.name.length < 2) {
    errors.push({ field: 'name', message: 'El nombre debe tener al menos 2 caracteres.' });
  } else if (payload.name.length > 80) {
    errors.push({ field: 'name', message: 'El nombre no puede superar 80 caracteres.' });
  }

  const hasEmail = payload.email.length > 0;
  const hasPhone = payload.phone.length > 0;

  if (!hasEmail && !hasPhone) {
    errors.push({ field: 'email', message: 'Debes indicar email o teléfono/WhatsApp.' });
  }

  if (hasEmail && !EMAIL_REGEX.test(payload.email)) {
    errors.push({ field: 'email', message: 'El email no es válido.' });
  }

  if (hasPhone && payload.phone.replace(/\D/g, '').length < 7) {
    errors.push({ field: 'phone', message: 'El teléfono/WhatsApp no es válido.' });
  }

  if (payload.businessType.length > 120) {
    errors.push({ field: 'businessType', message: 'El tipo de negocio no puede superar 120 caracteres.' });
  }

  if (!payload.message) {
    errors.push({ field: 'message', message: 'El mensaje es obligatorio.' });
  } else if (payload.message.length < 10) {
    errors.push({ field: 'message', message: 'El mensaje debe tener al menos 10 caracteres.' });
  } else if (payload.message.length > 1000) {
    errors.push({ field: 'message', message: 'El mensaje no puede superar 1000 caracteres.' });
  }

  if (!ALLOWED_INTERESTS.has(payload.serviceInterest)) {
    errors.push({ field: 'serviceInterest', message: 'El servicio de interés no es válido.' });
  }

  if (!ALLOWED_SOURCES.has(payload.source)) {
    errors.push({ field: 'source', message: 'La fuente del lead no es válida.' });
  }

  if (payload.diagnosis) {
    if (!ALLOWED_DIAGNOSIS_GOALS.has(payload.diagnosis.goal)) {
      errors.push({ field: 'source', message: 'El objetivo del diagnóstico no es válido.' });
    }
    if (!ALLOWED_DIAGNOSIS_STAGES.has(payload.diagnosis.stage)) {
      errors.push({ field: 'source', message: 'La etapa del diagnóstico no es válida.' });
    }
    if (!ALLOWED_DIAGNOSIS_URGENCY.has(payload.diagnosis.urgency)) {
      errors.push({ field: 'source', message: 'La urgencia del diagnóstico no es válida.' });
    }
    if (!ALLOWED_DIAGNOSIS_RECOMMENDATIONS.has(payload.diagnosis.recommendedSolution)) {
      errors.push({ field: 'source', message: 'La recomendación del diagnóstico no es válida.' });
    }
  }

  return errors;
}
