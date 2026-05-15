# Phase 12A — Lead Summary by Local Rules

## Status

Local rule-based summary implemented.

## Purpose

Agregar un resumen comercial sugerido en el detalle del lead sin usar IA real ni servicios externos.

## Includes

- Helper `buildLeadSummary`.
- Análisis local por reglas.
- Tipo de oportunidad detectada.
- Prioridad sugerida.
- Resumen breve.
- Siguiente acción recomendada.
- Bloque visual en `/internal/leads/[id]`.
- Nota visible indicando que no usa IA real.

## Inputs Used

- `serviceInterest`
- `businessType`
- `message`
- `source`
- `status`
- `notes`

## Does Not Include

- OpenAI.
- Ollama.
- IA real.
- Llamadas externas.
- Envío de datos a terceros.
- WhatsApp sending.
- Automatizaciones.
- Producción.
- Usuarios/roles.
- CRM completo.

## Future Evolution

Fase 12B: integrar AIProvider local con Ollama para generar summaries reales usando lead, notas y timeline.
