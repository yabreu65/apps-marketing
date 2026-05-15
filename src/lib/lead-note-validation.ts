export type LeadNoteValidationResult = {
  ok: boolean;
  content: string;
  message?: string;
};

export function validateLeadNoteContent(value: unknown): LeadNoteValidationResult {
  if (typeof value !== 'string') {
    return { ok: false, content: '', message: 'El contenido de la nota es requerido.' };
  }

  const content = value.trim();

  if (content.length < 3 || content.length > 1000) {
    return { ok: false, content, message: 'La nota debe tener entre 3 y 1000 caracteres.' };
  }

  return { ok: true, content };
}
