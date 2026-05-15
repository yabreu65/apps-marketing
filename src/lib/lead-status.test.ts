import { describe, expect, it } from 'vitest';

import { LEAD_STATUSES, getLeadStatusBadgeClass, getLeadStatusLabel, isLeadStatus } from '@/lib/lead-status';

describe('lead-status', () => {
  it('incluye estados válidos esperados', () => {
    expect(LEAD_STATUSES).toEqual(['new', 'contacted', 'qualified', 'proposal', 'closed', 'archived']);
  });

  it('isLeadStatus true para estados válidos', () => {
    for (const status of LEAD_STATUSES) {
      expect(isLeadStatus(status)).toBe(true);
    }
  });

  it('isLeadStatus false para estados inválidos', () => {
    expect(isLeadStatus('pending')).toBe(false);
    expect(isLeadStatus('')).toBe(false);
    expect(isLeadStatus(null)).toBe(false);
  });

  it('retorna labels correctos', () => {
    expect(getLeadStatusLabel('new')).toBe('Nuevo');
    expect(getLeadStatusLabel('contacted')).toBe('Contactado');
    expect(getLeadStatusLabel('qualified')).toBe('Calificado');
    expect(getLeadStatusLabel('proposal')).toBe('Propuesta');
    expect(getLeadStatusLabel('closed')).toBe('Cerrado');
    expect(getLeadStatusLabel('archived')).toBe('Archivado');
  });

  it('badge class no vacía en estados conocidos e inválido', () => {
    for (const status of [...LEAD_STATUSES, 'invalid']) {
      expect(getLeadStatusBadgeClass(status)).toBeTruthy();
      expect(getLeadStatusBadgeClass(status)).toContain('border-');
    }
  });
});
