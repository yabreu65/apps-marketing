import type { LeadSummaryAIInput } from '@/lib/ai/ai-provider';

function formatStatusHistory(input: LeadSummaryAIInput) {
  if (!input.statusHistory?.length) return 'Sin historial de status relevante.';

  return input.statusHistory
    .slice(0, 3)
    .map((item, index) => `${index + 1}. ${item.fromStatus ?? 'sin_status'} -> ${item.toStatus}`)
    .join('\n');
}

function formatNotes(input: LeadSummaryAIInput) {
  if (!input.notes?.length) return 'Sin notas recientes.';
  return input.notes
    .slice(0, 3)
    .map((note, index) => `${index + 1}. ${note.content}`)
    .join('\n');
}

export function buildLeadSummaryPrompt(input: LeadSummaryAIInput) {
  return `Sos un analista comercial B2B para un dashboard interno local.
Tu tarea es generar un resumen comercial sugerido en ESPAÑOL.

Devolvé SOLO JSON válido con esta estructura exacta:
{
  "opportunityType": "string",
  "priority": "low|medium|high",
  "summary": "string",
  "recommendedAction": "string"
}

Mapeo obligatorio de opportunityType según serviceInterest:
- "Landing comercial" => "Captación comercial inicial"
- "Sitio web profesional" => "Presencia digital profesional"
- "Sistema web a medida" o "Dashboard / panel interno" => "Digitalización operativa"
- "MVP SaaS" => "Validación de producto digital"
- "Automatización comercial" o "IA aplicada al negocio" => "Evolución tecnológica avanzada"
- "SEO / marketing digital" => "Adquisición y visibilidad digital"
- "No estoy seguro" => "Diagnóstico comercial inicial"

Regla de prioridad sugerida:
- status "proposal" => high
- status "new" + urgencia explícita en mensaje => high
- status "closed" o "archived" => low
- caso contrario => medium

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
- Escribir en español profesional y breve.
- No prometer resultados garantizados.
- No afirmar que ya se contactó al cliente si no está explícito en notas o historial.
- No recomendar automatizaciones activas si no hay contexto claro.
- En summary: máximo 2 oraciones breves.
- En recommendedAction: una acción concreta y accionable.
- Responder únicamente JSON válido sin texto adicional.`;
}
