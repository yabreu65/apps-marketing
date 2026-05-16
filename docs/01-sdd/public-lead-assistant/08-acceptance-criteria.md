# Public Lead Assistant with Local Memory — Acceptance Criteria

## AC

- **AC-001**: El visitante puede iniciar chat público y recibir saludo consultivo.
- **AC-002**: El chat recuerda interés anterior por `visitorKey` y continúa contexto de forma natural.
- **AC-003**: El chat diferencia correctamente problemas de captación vs seguimiento operativo.
- **AC-004**: Para `lead_followup_priority`, recomienda dashboard/proceso primero (no landing como primer paso).
- **AC-005**: Para `pricing`, no inventa precios exactos; solicita alcance y deriva a diagnóstico.
- **AC-006**: El visitante puede borrar memoria y el contexto se reinicia correctamente.
- **AC-007**: El chat siempre ofrece CTA útil a formulario o WhatsApp manual cuando corresponde.
- **AC-008**: Si IA opcional falla, el fallback por reglas mantiene conversación funcional.
- **AC-009**: El sistema no integra WhatsApp real ni Meta API.
- **AC-010**: El sistema no utiliza OpenAI.
- **AC-011**: El sistema no envía mensajes automáticos ni ejecuta acciones externas.
- **AC-012**: El asistente no promete resultados garantizados ni capacidades no implementadas.
- **AC-013**: Se muestra aviso de privacidad con prohibición de compartir datos sensibles.
- **AC-014**: Caso `not_sure` explica caminos por fases y realiza preguntas de diagnóstico.
- **AC-015**: Caso `mvp_saas` valida usuario/problema/MVP, sin prometer producto full inmediato.
- **AC-016**: Caso `ai_automation` posiciona IA como segunda capa después de diagnóstico de proceso.
- **AC-017**: Caso visitante recurrente menciona memoria previa sin sonar invasivo.
- **AC-018**: Caso borrado de memoria no afecta leads internos del dashboard.
