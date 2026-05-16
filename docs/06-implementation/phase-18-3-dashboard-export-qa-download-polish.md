# Phase 18.3 — Dashboard Export QA & Download Polish

## Status

Completed (local QA + download polish).

## Purpose

Validar y pulir la exportación CSV local de `/internal/leads` para asegurar claridad de descarga, consistencia con filtros y robustez del contrato.

## Scope

- QA funcional del export local read-only.
- Pulido del nombre de archivo en `Content-Disposition`.
- Sin cambios de arquitectura ni features grandes.

## Review Performed

- `src/app/internal/leads/page.tsx`
- `src/app/internal/leads/export/route.ts`
- `src/lib/lead-dashboard-filters.ts`
- `src/lib/lead-csv.ts`
- `src/lib/lead-csv.test.ts`
- `src/app/internal/leads/export/route.test.ts`
- `docs/06-implementation/phase-18-2-export-local-csv.md`

## QA Findings

1. Export sigue respetando el corte actual (`status`, `source`, `serviceInterest`, `q`).
2. Export continúa trayendo el conjunto filtrado completo (no solo la página).
3. `no-store` y `same-origin` se mantienen correctos.
4. El nombre de archivo tenía precisión de minutos (`YYYYMMDD-HHMM`) y se pulió a segundos.

## Polish Applied

### Filename de descarga

Se actualizó el formato a:

- `leads-export-YYYYMMDD-HHMMSS.csv`

Esto mejora trazabilidad cuando se descargan múltiples archivos en pocos minutos.

### Header de compatibilidad

Se reforzó `Content-Disposition` con:

- `filename="..."`
- `filename*=UTF-8''...`

para mejor compatibilidad entre clientes/OS.

## Validation Evidence

Header verificado localmente:

- `content-disposition: attachment; filename="leads-export-20260515-215113.csv"; filename*=UTF-8''leads-export-20260515-215113.csv`

## Validation Commands

```bash
npm run test
npm run lint
npm run build
```

Resultados:
- Test ✅ (82 passing)
- Lint ✅
- Build ✅

## Scope Validation

- No deploy.
- No producción.
- No Vercel changes.
- No DB externa.
- No Prisma schema changes.
- No migraciones.
- No auth changes.
- No usuarios/roles.
- No OpenAI/Ollama.
- No WhatsApp.
- No emails.
- No automatizaciones.
- No landing changes.
- No export de notas/timeline/summaries/scores no persistidos.

## Recommended Next Step

Fase 18.4 — opcional: selector de columnas exportables (solo campos permitidos) sin romper modo local read-only.
