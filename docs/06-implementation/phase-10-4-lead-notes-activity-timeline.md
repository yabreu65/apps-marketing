# Phase 10.4 — Lead Notes & Activity Timeline

## Status

Local internal update completed.

## Purpose

Agregar notas internas y trazabilidad básica de actividad por lead para mejorar seguimiento local sin convertirlo en CRM completo.

## Includes

- Nuevos modelos Prisma:
  - `LeadNote`
  - `LeadStatusHistory`
- Relaciones en `Lead`:
  - `notes`
  - `statusHistory`
- API interna local para notas:
  - `GET /api/admin/leads/[id]/notes`
  - `POST /api/admin/leads/[id]/notes`
- API de status actualizada para registrar historial:
  - `PATCH /api/admin/leads/[id]/status`
- Panel de notas en detalle de lead.
- Timeline básico en detalle de lead con:
  - cambios de status
  - notas internas

## Validation Rules

- Nota requerida entre 3 y 1000 caracteres.
- Status válido dentro de:
  - `new`, `contacted`, `qualified`, `proposal`, `closed`, `archived`.

## Scope

- Local/internal only.
- Sin auth/roles todavía.
- Sin usuarios/asignaciones.
- Sin edición de campos principales del lead.
- Sin eliminación de leads.
- Sin CRM completo.
- Sin deploy.
