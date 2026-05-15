import type { LeadSummaryAIInput } from '@/lib/ai/ai-provider';

function formatStatusHistory(input: LeadSummaryAIInput) {
  if (!input.statusHistory?.length) return 'Sin historial de status relevante.';

  return input.statusHistory
    .slice(0, 5)
    .map((item, index) => `${index + 1}. ${item.fromStatus ?? 'sin_status'} -> ${item.toStatus}`)
    .join('\n');
}

function formatNotes(input: LeadSummaryAIInput) {
  if (!input.notes?.length) return 'Sin notas recientes.';
  return input.notes.slice(0, 5).map((note, index) => `${index + 1}. ${note.content}`).join('\n');
}

export function buildLeadSummaryPrompt(input: LeadSummaryAIInput) {
  return `Sos un analista comercial B2B para un dashboard interno local.
Tu tarea es generar un resumen comercial sugerido.

Devolvé SOLO JSON válido con esta estructura exacta:
{
  "opportunityType": "string",
  "priority": "low|medium|high",
  "summary": "string",
  "recommendedAction": "string"
}

Datos del lead:
- name: ${input.name ?? 'No especificado'}
- businessType: ${input.businessType ?? 'No especificado'}
- serviceInterest: ${input.serviceInterest}
- source: ${input.source}
- status: ${input.status}
- message: ${input.message}

Notas recientes:
${formatNotes(input)}

Historial de status (resumido):
${formatStatusHistory(input)}

Reglas obligatorias:
- No inventar datos.
- No prometer resultados garantizados.
- No afirmar que ya se contactó al cliente si no está explícito en notas o historial.
- No recomendar automatizaciones activas si no hay contexto claro.
- Mantener tono profesional, breve y accionable.
- Responder únicamente JSON válido sin texto adicional.`;
}
