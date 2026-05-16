import type { LeadReplySuggestionInput } from '@/types/lead-reply-suggestion';

function formatConversation(messages: LeadReplySuggestionInput['messages']) {
  if (!messages.length) return 'Sin mensajes previos.';

  return messages
    .slice(0, 8)
    .map((message, index) => `${index + 1}. [${message.direction}] ${message.content}`)
    .join('\n');
}

export function buildLeadReplySuggestionPrompt(input: LeadReplySuggestionInput) {
  return `Sos asistente comercial interno para un simulador local.
Tu tarea: sugerir una respuesta breve para una conversación comercial.

Devolvé SOLO JSON válido con esta estructura exacta:
{
  "suggestedReply": "string",
  "rationale": "string"
}

Contexto del lead:
- nombre: ${input.lead.name ?? 'No informado'}
- rubro: ${input.lead.businessType ?? 'No informado'}
- servicio de interés: ${input.lead.serviceInterest}
- estado del lead: ${input.lead.status}
- fuente: ${input.lead.source}
- mensaje inicial del lead: ${input.lead.message}

Mensajes recientes (de más nuevo a más antiguo):
${formatConversation(input.messages)}

Reglas obligatorias:
- Responder en español profesional.
- No inventar datos.
- No prometer resultados garantizados.
- No afirmar que se enviará un mensaje automáticamente.
- No mencionar WhatsApp Cloud API, Meta o integraciones externas.
- No afirmar que se ejecutarán automatizaciones.
- La sugerencia debe ser accionable y humana (máximo 3 oraciones).
- rationale debe explicar en 1 oración por qué esa sugerencia encaja con el contexto.
- Responder únicamente JSON válido, sin markdown.`;
}
