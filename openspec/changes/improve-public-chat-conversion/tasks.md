# Tasks — Improve Public Chat Conversion Intelligence

## Phase 1 — Conversión inmediata (alto impacto)

- [ ] Diseñar CTA primario contextual por intención (`whatsapp_manual` vs `form`).
- [ ] Implementar mini-cierre en turno 2-3 con propuesta explícita de siguiente acción.
- [ ] Reducir competencia visual de CTAs secundarios en `PublicLeadAssistantWidget`.
- [ ] Agregar tests de UI/flujo para estados de CTA según intención.

## Phase 2 — Inteligencia comercial

- [ ] Definir señales de prioridad comercial (urgencia, claridad de necesidad, timing).
- [ ] Implementar score de señales en `public-chat-service` (no decisor final, solo apoyo).
- [ ] Enriquecer handoff summary con señales de prioridad para follow-up manual.
- [ ] Agregar tests unitarios del score y casos borde.

## Phase 3 — Captura y medición

- [ ] Definir eventos de funnel del chat (open, first_message, cta_click, form_start, form_submit).
- [ ] Instrumentar eventos mínimos (local/backend actual).
- [ ] Crear reporte básico de métricas para evaluar impacto y ajustar copy/flujo.

## Verification (strict_tdd)

- [ ] RED: escribir tests nuevos para CTA dinámico y mini-cierre.
- [ ] GREEN: implementar mínimo para pasar tests.
- [ ] TRIANGULATE: cubrir variantes de intención ambigua y contexto retail.
- [ ] REFACTOR: simplificar reglas/copy sin romper cobertura.
- [ ] Ejecutar `npm test` y `npm run lint`.
