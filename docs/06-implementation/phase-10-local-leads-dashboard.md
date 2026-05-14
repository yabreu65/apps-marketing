# Phase 10 — Local Leads Dashboard

## Status

Local internal dashboard.

## Purpose

Visualizar leads guardados localmente en PostgreSQL.

## Includes

- API interna `GET /api/admin/leads`.
- Página interna `/internal/leads`.
- Listado de leads.
- Estado vacío.
- Contador.
- Nota de seguridad.

## Does Not Include

- Auth.
- Roles.
- Producción.
- Dashboard público.
- IA.
- WhatsApp sending.
- Automatizaciones.
- CRM completo.
- Edición de leads.
- Eliminación de leads.

## Local Usage

```bash
docker compose -f docker-compose.local.yml up -d postgres
npm run dev -- --port 3000
```
