# Phase 10.7 — Internal API Hardening

## Status

Local internal API hardening completed.

## Changes

- Helper centralizado: `src/lib/api-response.ts`
  - `successResponse`
  - `errorResponse`
  - `methodNotAllowedResponse`
- Validación de notas extraída a `src/lib/lead-note-validation.ts`.
- Estandarización de formato JSON en APIs internas y de leads.
- Manejo defensivo de `id` inválido en rutas internas por lead.
- Respuestas 405 explícitas en endpoints internos donde aplica.

## APIs Hardened

- `POST /api/leads`
- `GET /api/admin/leads`
- `PATCH /api/admin/leads/[id]/status`
- `GET /api/admin/leads/[id]/notes`
- `POST /api/admin/leads/[id]/notes`

## Error Model

Formato consistente:

```json
{
  "ok": false,
  "message": "Mensaje claro para UI",
  "errors": {}
}
```

## Scope

- Sin deploy / sin producción.
- Sin auth/roles/usuarios.
- Sin IA/OpenAI/Ollama.
- Sin WhatsApp Cloud API sending.
- Sin Meta integration.
- Sin automatizaciones/pagos.
- Sin CRM completo.
