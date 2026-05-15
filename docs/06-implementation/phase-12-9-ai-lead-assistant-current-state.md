# Phase 12.9 — AI Lead Assistant Current State

## Status

Local AI lead summary baseline completed.

## Purpose

Documentar el estado actual del módulo IA local de leads antes de avanzar a scoring, persistencia, producción o WhatsApp real.

## Current Capabilities

- Resumen comercial por reglas locales.
- Resumen opcional con Ollama local.
- Regeneración manual desde el detalle del lead.
- Fallback automático por reglas si Ollama no está disponible o falla.
- Fuente del resumen visible en UI (`rules`, `ollama`, `rules_fallback`).
- Prompt tuneado para salida JSON estricta, tono comercial y restricciones de seguridad.
- QA manual de 10 escenarios + validación de fallback.
- Sin persistencia de summaries en base de datos.

## Architecture

Flujo actual:

Lead detail
→ load lead + notes + statusHistory
→ buildLeadSummaryWithOptionalAI
→ rules / ollama / rules_fallback
→ LeadSummaryPanel
→ manual regeneration via API
→ UI update without DB persistence

## Files and Responsibilities

| File | Responsibility |
|---|---|
| `src/lib/lead-summary.ts` | Motor de resumen por reglas locales (baseline seguro). |
| `src/lib/lead-summary-ai.ts` | Orquestación AI opcional + fallback automático a reglas. |
| `src/lib/ai/ai-provider.ts` | Tipos e interfaz mínima del provider IA. |
| `src/lib/ai/ollama-provider.ts` | Integración local con Ollama (`/api/generate`), timeout, parse y errores controlados. |
| `src/lib/ai/lead-summary-prompt.ts` | Construcción del prompt seguro con restricciones y formato JSON estricto. |
| `src/components/internal/LeadSummaryPanel.tsx` | UI del resumen + botón manual de regeneración + estado/loading/error. |
| `src/app/api/admin/leads/[id]/summary/route.ts` | Endpoint interno para regenerar resumen (lee lead + notas + historial y responde summary/source). |
| `src/app/internal/leads/[id]/page.tsx` | Vista detalle que carga resumen inicial y monta el panel de resumen. |
| `.env.example` | Variables para habilitar IA local y configurar Ollama. |

## Environment Variables

```env
ENABLE_LOCAL_AI_SUMMARY="false"
OLLAMA_BASE_URL="http://localhost:11434"
OLLAMA_MODEL="llama3:latest"
OLLAMA_TIMEOUT_MS="25000"
```

## Runtime Behavior

1. Si `ENABLE_LOCAL_AI_SUMMARY != true` → usa `rules`.
2. Si `ENABLE_LOCAL_AI_SUMMARY = true`:
   - intenta `ollama`
   - si responde válido, devuelve `source: ollama`
   - si falla (timeout/network/shape), devuelve `rules_fallback`.

## Security and Privacy Boundaries

- No OpenAI.
- No servicios externos.
- No envío de datos a terceros.
- No persistencia de summaries.
- No automatizaciones comerciales.
- No envío WhatsApp Cloud API.
- No cambios de auth/roles.

## Known Limits

- Calidad del resumen depende del modelo local de Ollama y latencia local.
- Sin versionado/persistencia del resumen generado.
- Sin scoring, sin clasificación avanzada y sin acciones automáticas.
- Sin observabilidad histórica del rendimiento de prompts.

## Risks

- Timeouts de Ollama en equipos lentos o modelo pesado.
- Respuestas válidas JSON pero calidad comercial irregular.
- Variabilidad de salida entre ejecuciones del mismo lead.

## Operational Notes

- El fallback asegura continuidad funcional aunque Ollama falle.
- La UI comunica la fuente real del resumen para evitar confusión operativa.
- Logging de diagnóstico está limitado a entorno development y sin exponer payload sensible completo.

## Next Recommended Steps

1. Fase 13A: snapshot opcional de summary en memoria de sesión (sin DB) para comparar regeneraciones.
2. Fase 13B: evaluación cuantitativa del prompt (rúbrica fija y scoring manual interno).
3. Fase 13C: diseño de persistencia opcional de summaries con opt-in explícito (aún sin producción).
4. Fase 14 (futura): preparar capa de proveedor IA extensible manteniendo local-first por defecto.
