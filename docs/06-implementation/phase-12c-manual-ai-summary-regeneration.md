# Phase 12C — Manual AI Summary Regeneration

## Status

Completed (local/manual regeneration).

## Purpose

Permitir regenerar manualmente el resumen comercial sugerido desde `/internal/leads/[id]` usando IA local opcional con fallback seguro por reglas.

## Includes

- API interna `POST /api/admin/leads/[id]/summary`.
- Validación de ID y control de lead inexistente (`404`).
- Carga de `notes` y `statusHistory` recientes.
- Uso de `buildLeadSummaryWithOptionalAI`.
- UI con botón “Regenerar resumen IA local”.
- Estados de loading, error controlado y source (`rules|ollama|rules_fallback`).
- Sin persistencia en DB del resumen generado.

## Does Not Include

- OpenAI.
- Servicios externos.
- Persistencia de summaries.
- Automatizaciones.
- WhatsApp Cloud API sending.
- Cambios de auth o usuarios/roles.
- Producción/deploy.

## Security

- Misma política interna existente: same-origin guard y no-store headers.
