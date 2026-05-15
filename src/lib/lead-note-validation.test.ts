import { describe, expect, it } from 'vitest';

import { validateLeadNoteContent } from '@/lib/lead-note-validation';

describe('lead-note-validation', () => {
  it('acepta nota válida', () => {
    const result = validateLeadNoteContent('Nota válida para seguimiento comercial.');
    expect(result.ok).toBe(true);
  });

  it('rechaza nota vacía', () => {
    const result = validateLeadNoteContent('');
    expect(result.ok).toBe(false);
  });

  it('rechaza nota menor a 3 caracteres', () => {
    const result = validateLeadNoteContent('ab');
    expect(result.ok).toBe(false);
  });

  it('rechaza nota mayor a 1000 caracteres', () => {
    const result = validateLeadNoteContent('a'.repeat(1001));
    expect(result.ok).toBe(false);
  });

  it('rechaza nota solo espacios', () => {
    const result = validateLeadNoteContent('    ');
    expect(result.ok).toBe(false);
  });

  it('aplica trim cuando es válida', () => {
    const result = validateLeadNoteContent('   nota con trim   ');
    expect(result.ok).toBe(true);
    expect(result.content).toBe('nota con trim');
  });
});
