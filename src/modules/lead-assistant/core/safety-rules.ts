export const SENSITIVE_DATA_PATTERNS: RegExp[] = [
  /\b(?:cvv|cvc|tarjeta|numero de tarjeta|card number)\b/i,
  /\b(?:clave|password|contrasena|contraseña|token)\b/i,
  /\b(?:iban|swift|cuenta bancaria|bank account)\b/i,
];

export function sanitizeVisitorMessage(input: string) {
  return input.replace(/\s+/g, ' ').trim();
}

export function containsSensitiveData(input: string) {
  return SENSITIVE_DATA_PATTERNS.some((pattern) => pattern.test(input));
}

export function getSensitiveDataWarning() {
  return 'Por seguridad, evitá compartir contraseñas, datos bancarios o información sensible. Si querés, seguimos con el diagnóstico comercial.';
}

export function ensureSafeAssistantCopy(text: string) {
  const sanitized = text
    .replace(/whatsapp cloud api/gi, 'canal externo')
    .replace(/meta api/gi, 'canal externo')
    .replace(/garantizado/gi, 'estimado')
    .trim();

  return sanitized;
}
