# Public Lead Assistant with Local Memory — AI Provider Strategy

## Resumen

Estrategia local-first: reglas determinísticas como base y Ollama opcional como mejora progresiva, siempre con fallback seguro.

## Estrategia por fases

## Fase inicial (MVP)

- Motor principal por reglas.
- Detección de intención por patrones + contexto.
- Respuesta consultiva estructurada.
- Sin dependencia de IA para funcionamiento base.

## Fase opcional IA local

- Activación por flag:
  - `ENABLE_LOCAL_AI_PUBLIC_ASSISTANT=true` (propuesto)
- Proveedor: Ollama local.
- Uso: mejorar redacción/contexto, no cambiar guardrails de producto.

## Fallback

- Si Ollama falla (timeout/red/respuesta inválida), volver a reglas.
- Reportar internamente source usado (`rules`, `ollama`, `rules_fallback`).
- Nunca romper UX del visitante.

## No OpenAI por ahora

- El MVP no usa OpenAI.
- No llamadas a servicios externos.

## Prompt seguro (principios)

- Tono consultivo, no vendedor agresivo.
- No prometer resultados garantizados.
- No inventar precios.
- No recomendar automatización real inmediata sin diagnóstico.
- No afirmar envíos automáticos.
- Responder breve y accionable.

## Timeout y resiliencia

- Timeout configurable por env (reusar `OLLAMA_TIMEOUT_MS`).
- Manejo de errores sin stack trace en UI.
- Mensaje de fallback transparente, no técnico.

## Decisiones automáticas prohibidas

- La IA no decide acciones externas.
- La IA no envía mensajes.
- La IA no crea contacto fuera del chat.

## Observabilidad local mínima (propuesta)

- Log interno solo en dev:
  - source utilizado,
  - duración de generación,
  - fallback activado sí/no.
- Sin log de contenido sensible completo.
