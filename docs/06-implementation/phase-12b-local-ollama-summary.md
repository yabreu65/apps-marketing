# Phase 12B — Local Ollama Lead Summary Integration

## Status

Completed (local optional integration with safe fallback).

## Purpose

Agregar un resumen comercial con IA local opcional (Ollama), manteniendo fallback automático a reglas locales.

## Includes

- AIProvider mínimo en `src/lib/ai/ai-provider.ts`.
- Provider local de Ollama en `src/lib/ai/ollama-provider.ts`.
- Prompt seguro en `src/lib/ai/lead-summary-prompt.ts`.
- Wrapper con fallback en `src/lib/lead-summary-ai.ts`.
- Integración en `/internal/leads/[id]`.
- Nota visual según fuente del resumen: `rules`, `ollama`, `rules_fallback`.

## Environment Variables

- `OLLAMA_BASE_URL` (default: `http://localhost:11434`)
- `OLLAMA_MODEL` (default: `llama3:latest`)
- `ENABLE_LOCAL_AI_SUMMARY` (`true`/`false`)

## Behavior

1. Si `ENABLE_LOCAL_AI_SUMMARY !== "true"`:
   - usa reglas locales (`buildLeadSummary`)
   - source: `rules`

2. Si `ENABLE_LOCAL_AI_SUMMARY === "true"`:
   - intenta generar resumen con Ollama local
   - valida estructura y prioridad (`low|medium|high`)
   - si sale bien: source `ollama`
   - si falla: fallback a reglas con source `rules_fallback`

## Local Testing

### Probar modo reglas

- dejar `ENABLE_LOCAL_AI_SUMMARY="false"`
- abrir `/internal/leads/[id]`
- debe mostrar nota de reglas locales

### Probar modo Ollama

- levantar Ollama local
- setear `ENABLE_LOCAL_AI_SUMMARY="true"`
- opcional: verificar runtime con

```bash
curl http://localhost:11434/api/tags
```

- abrir `/internal/leads/[id]`
- debe mostrar nota de IA local si responde correctamente

### Si Ollama falla/no está disponible

- la vista sigue funcionando
- se muestra resumen por reglas con nota de fallback

## Scope Confirmed

- Sin OpenAI.
- Sin servicios externos.
- Sin producción.
- Sin WhatsApp Cloud API sending.
- Sin automatizaciones.
- Sin persistencia de summaries.
