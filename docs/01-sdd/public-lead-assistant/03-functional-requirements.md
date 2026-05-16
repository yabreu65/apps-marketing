# Public Lead Assistant with Local Memory — Functional Requirements

## Resumen

Requisitos funcionales numerados para implementar el módulo público con memoria local y control humano.

## FR

- **FR-001 — visitorKey anónimo**
  - El sistema debe generar/leer un `visitorKey` anónimo para identificar continuidad conversacional.

- **FR-002 — iniciar conversación**
  - El visitante debe poder abrir el chat y recibir saludo inicial consultivo.

- **FR-003 — guardar mensajes**
  - El sistema debe persistir mensajes de sesión pública (rol visitante/asistente) en entorno local.

- **FR-004 — detectar intención**
  - El sistema debe clasificar intención mínima en: `landing`, `web_professional`, `dashboard`, `mvp_saas`, `ai_automation`, `seo_marketing`, `lead_followup_priority`, `pricing`, `not_sure`, `human_help`.

- **FR-005 — generar respuesta**
  - Debe generar respuesta consultiva según intención y contexto.

- **FR-006 — usar memoria**
  - Debe recuperar memoria resumida/intereses previos para continuidad natural.

- **FR-007 — borrar memoria**
  - Debe permitir eliminar memoria asociada a `visitorKey` y reiniciar contexto.

- **FR-008 — CTA formulario/WhatsApp manual**
  - Debe incluir CTA explícito y coherente al cierre de respuesta diagnóstica.

- **FR-009 — fallback reglas**
  - Debe responder por reglas si IA opcional no está habilitada o falla.

- **FR-010 — Ollama opcional**
  - Debe poder habilitarse IA local por flag, sin ser requisito obligatorio.

- **FR-011 — privacidad visible**
  - Debe mostrar aviso de privacidad y recomendación de no compartir datos sensibles.

- **FR-012 — no promesas falsas**
  - No debe prometer resultados garantizados ni capacidades no implementadas.

- **FR-013 — no envíos automáticos**
  - No debe enviar mensajes automáticamente por WhatsApp ni otro canal externo.

- **FR-014 — no OpenAI**
  - No debe depender de OpenAI para el MVP definido.

- **FR-015 — diferenciación captación vs seguimiento**
  - Si detecta `lead_followup_priority`, debe priorizar organización interna (dashboard/proceso) sobre landing inicial.

- **FR-016 — pricing responsable**
  - Ante intención `pricing`, no debe inventar precio; debe solicitar alcance y derivar a diagnóstico.

- **FR-017 — retorno con memoria no invasiva**
  - Debe mencionar contexto previo de forma breve, clara y no intrusiva.

- **FR-018 — mensajes de error seguros**
  - Debe evitar exponer stack traces o errores internos crudos.
