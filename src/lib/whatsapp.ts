export function buildWhatsAppLink(phoneNumber: string, message?: string): string {
  const cleanPhone = phoneNumber.replace(/[^\d]/g, '');
  const base = `https://wa.me/${cleanPhone}`;

  if (!message) return base;

  return `${base}?text=${encodeURIComponent(message)}`;
}
