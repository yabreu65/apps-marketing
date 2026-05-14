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

export function normalizeLeadPayload(input: unknown): LeadPayload {
  const obj = (input && typeof input === 'object' ? input : {}) as Record<string, unknown>;

  return {
    name: String(obj.name ?? '').trim(),
    email: String(obj.email ?? '').trim(),
    phone: String(obj.phone ?? '').trim(),
    businessType: String(obj.businessType ?? '').trim(),
    serviceInterest: String(obj.serviceInterest ?? '').trim() as LeadPayload['serviceInterest'],
    message: String(obj.message ?? '').trim(),
    source: String(obj.source ?? 'unknown').trim() as LeadPayload['source'],
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

  return errors;
}
