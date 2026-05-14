# Phase 10.3 — Lead Status Update Local

## Status

Local internal status update enabled.

## Includes

- Estados permitidos de lead:
  - `new`
  - `contacted`
  - `qualified`
  - `proposal`
  - `closed`
  - `archived`
- Helper centralizado en `src/lib/lead-status.ts`:
  - `LEAD_STATUSES`
  - `LeadStatus`
  - `isLeadStatus`
  - `getLeadStatusLabel`
  - `getLeadStatusBadgeClass`
- API local interna:
  - `PATCH /api/admin/leads/[id]/status`
- UI local en detalle de lead para actualizar status.
- Filtro de status actualizado en `/internal/leads` con los estados nuevos.

## Scope

- Local/internal only.
- No auth/roles todavía.
- No edición de otros campos.
- No eliminación de leads.
- No notas, no asignaciones, no CRM completo.
- No deploy.
