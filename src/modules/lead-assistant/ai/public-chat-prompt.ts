import type { PublicChatAIInput } from '@/modules/lead-assistant/types/lead-assistant';

export function buildPublicChatPrompt(input: PublicChatAIInput) {
  const facts = input.memoryFacts
    ? [
        input.memoryFacts.businessType ? `negocio: ${input.memoryFacts.businessType}` : null,
        input.memoryFacts.channels.length ? `canales: ${input.memoryFacts.channels.join(', ')}` : null,
        input.memoryFacts.painPoints.length ? `dolores: ${input.memoryFacts.painPoints.join(', ')}` : null,
        input.memoryFacts.goals.length ? `objetivos: ${input.memoryFacts.goals.join(', ')}` : null,
        input.memoryFacts.recommendedPath ? `camino sugerido: ${input.memoryFacts.recommendedPath}` : null,
      ]
        .filter(Boolean)
        .join(' | ')
    : 'sin datos estructurados';

  return `Sos un asistente comercial consultivo para una landing de servicios digitales.

responde SOLO JSON válido con este formato:
{
  "replyText": "string",
  "rationale": "string"
}

Contexto:
- intención detectada: ${input.detectedIntent}
- etapa conversacional: ${input.conversationStage ?? 'diagnosis'}
- mensaje del visitante: ${input.visitorMessage}
- memoria previa: ${input.memorySummary ?? 'sin memoria'}
- datos estructurados recordados: ${facts}

Reglas:
- Reescribí como asesor humano, claro y cercano; no suenes robótico.
- Mantené la estrategia comercial de la respuesta base si está implícita en la intención.
- Si hay memoria previa, usala de forma natural y breve; no repitas IDs ni resumen técnico.
- No inventar precios exactos.
- No prometer resultados garantizados.
- No prometer envíos automáticos de WhatsApp.
- No mencionar OpenAI, Meta o WhatsApp Cloud API.
- Siempre incluí un siguiente paso recomendado.
- Máximo 4 oraciones.
- Tono consultivo y profesional en español.`;
}
