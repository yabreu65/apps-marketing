import { describe, expect, it } from 'vitest';

import { normalizeLeadPayload, validateLeadPayload } from '@/lib/lead-validation';

describe('lead-validation', () => {
  const base = {
    name: 'Juan Pérez',
    email: '',
    phone: '',
    businessType: 'Clínica',
    serviceInterest: 'Landing comercial',
    message: 'Necesito ayuda para captar más consultas esta semana.',
    source: 'contact_form',
  } as const;

  it('acepta lead válido con email', () => {
    const errors = validateLeadPayload({ ...base, email: 'juan@test.com' });
    expect(errors).toHaveLength(0);
  });

  it('acepta lead válido con phone', () => {
    const errors = validateLeadPayload({ ...base, phone: '+54 11 1234 5678' });
    expect(errors).toHaveLength(0);
  });

  it('devuelve error si falta name', () => {
    const errors = validateLeadPayload({ ...base, name: '', email: 'juan@test.com' });
    expect(errors.some((e) => e.field === 'name')).toBe(true);
  });

  it('devuelve error si message es muy corto', () => {
    const errors = validateLeadPayload({ ...base, message: 'hola', email: 'juan@test.com' });
    expect(errors.some((e) => e.field === 'message')).toBe(true);
  });

  it('devuelve error si faltan email y phone', () => {
    const errors = validateLeadPayload({ ...base });
    expect(errors.some((e) => e.field === 'email')).toBe(true);
  });

  it('devuelve error para email inválido', () => {
    const errors = validateLeadPayload({ ...base, email: 'bad-email' });
    expect(errors.some((e) => e.field === 'email')).toBe(true);
  });

  it('devuelve error para phone inválido', () => {
    const errors = validateLeadPayload({ ...base, phone: '123' });
    expect(errors.some((e) => e.field === 'phone')).toBe(true);
  });

  it('devuelve error para serviceInterest inválido', () => {
    const errors = validateLeadPayload({ ...base, email: 'juan@test.com', serviceInterest: 'X' as never });
    expect(errors.some((e) => e.field === 'serviceInterest')).toBe(true);
  });

  it('devuelve error para source inválido', () => {
    const errors = validateLeadPayload({ ...base, email: 'juan@test.com', source: 'api' as never });
    expect(errors.some((e) => e.field === 'source')).toBe(true);
  });

  it('valida max length básicos', () => {
    const errors = validateLeadPayload({
      ...base,
      email: 'juan@test.com',
      name: 'a'.repeat(81),
      businessType: 'b'.repeat(121),
      message: 'm'.repeat(1001),
    });

    expect(errors.some((e) => e.field === 'name')).toBe(true);
    expect(errors.some((e) => e.field === 'businessType')).toBe(true);
    expect(errors.some((e) => e.field === 'message')).toBe(true);
  });

  it('normaliza payload con trim y source default', () => {
    const normalized = normalizeLeadPayload({ name: '  Ana  ', message: '  Hola mundo   ' });
    expect(normalized.name).toBe('Ana');
    expect(normalized.message).toBe('Hola mundo');
    expect(normalized.source).toBe('unknown');
  });
});
