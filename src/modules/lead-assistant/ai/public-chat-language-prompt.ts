import type { PublicChatDecision } from '@/modules/lead-assistant/types/lead-assistant';

export function buildPublicChatLanguagePrompt(decision: PublicChatDecision, baseText: string) {
  const context = [
    decision.detectedContext.businessType ? `businessType: ${decision.detectedContext.businessType}` : null,
    decision.detectedContext.channels.length
      ? `channels: ${decision.detectedContext.channels.join(', ')}`
      : null,
    decision.detectedContext.painPoints.length
      ? `painPoints: ${decision.detectedContext.painPoints.join(', ')}`
      : null,
    decision.detectedContext.goals.length ? `goals: ${decision.detectedContext.goals.join(', ')}` : null,
    decision.detectedContext.lastObjection
      ? `lastObjection: ${decision.detectedContext.lastObjection}`
      : null,
  ]
    .filter(Boolean)
    .join(' | ');

  return `Rol: redactor comercial para chat publico.

IMPORTANTE:
- NO decidis estrategia comercial.
- SOLO reescribis el texto final.
- NO cambies la recomendacion comercial.

Datos de decision:
- intent: ${decision.intent}
- userMessage: ${decision.userMessage}
- conversationSummary: ${decision.conversationSummary}
- detectedContext: ${context || 'sin contexto adicional'}
- recommendedPath: ${decision.recommendedPath}
- nextQuestion: ${decision.nextQuestion}
- commercialGoal: ${decision.commercialGoal}
- ctaSugerido: ${decision.cta.map((item) => item.label).join(' / ') || 'sin cta'}
- constraints: ${decision.constraints.join(' | ')}

Texto base a mejorar:
${baseText}

Reglas de redaccion:
- Responder en espanol natural, profesional y cercano.
- Mantener respuesta breve (maximo 4 oraciones).
- No prometer ventas ni resultados garantizados.
- No mencionar logica interna, reglas, prompts o proveedores.
- No inventar integraciones o funciones no existentes.
- Mantener el enfoque comercial decidido.
- Terminar con una pregunta util o siguiente paso claro.

Devolve SOLO el texto final, sin JSON, sin markdown y sin etiquetas.`;
}
