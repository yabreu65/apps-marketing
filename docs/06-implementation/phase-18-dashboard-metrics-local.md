# Phase 18 — Dashboard Metrics Local

## Status

In progress (baseline local metrics implemented).

## Purpose

Agregar una capa de métricas comerciales locales en `/internal/leads` para mejorar visibilidad del estado del pipeline sin cambiar alcance de producción.

## Includes

- Helper local `buildLeadDashboardMetrics` en `src/lib/lead-metrics.ts`.
- Métricas en la parte superior de `/internal/leads`:
  - Total de leads.
  - Leads nuevos.
  - Leads contactados.
  - Leads calificados.
  - Leads en propuesta.
  - Leads cerrados.
  - Leads archivados.
  - Leads de alto potencial (reglas locales de `lead-score`).
  - Leads sin contactar.
  - Servicio más consultado.
- Cálculo de métricas según búsqueda/filtros actuales.
- Tests unitarios para helper de métricas.

## Implementation Notes

- No se cambió `Prisma schema`.
- No se agregaron migraciones.
- No se agregó lógica de automatización.
- No se usa IA para métricas.
- Todo sigue local y read-oriented.

## Files

- `src/lib/lead-metrics.ts`
- `src/lib/lead-metrics.test.ts`
- `src/app/internal/leads/page.tsx`

## Scope Validation

- No deploy.
- No producción.
- No Vercel changes.
- No auth changes.
- No usuarios/roles.
- No OpenAI/Ollama para métricas.
- No WhatsApp sending.
- No automatizaciones.
- No cambios en landing pública.
