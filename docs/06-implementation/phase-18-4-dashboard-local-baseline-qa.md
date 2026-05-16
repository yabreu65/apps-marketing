# Phase 18.4 — Dashboard Local Baseline QA

## Status

Completed (local baseline QA + microfix).

## Purpose

Validar de punta a punta el baseline del dashboard interno local luego de métricas, filtros, búsqueda, paginación, export CSV, detalle, notas, timeline, summary IA local opcional, lead score, seed demo y backup/restore.

## Scope

- QA integral local/read-only.
- Sin cambios de arquitectura.
- Sin cambios de producción.
- Solo microfixes claros.

## Files Reviewed

- `src/app/internal/leads/page.tsx`
- `src/app/internal/leads/[id]/page.tsx`
- `src/app/internal/leads/export/route.ts`
- `src/components/internal/LeadSummaryPanel.tsx`
- `src/components/internal/LeadScorePanel.tsx`
- `src/components/internal/LeadNotesPanel.tsx`
- `src/components/internal/LeadStatusUpdater.tsx`
- `src/lib/lead-metrics.ts`
- `src/lib/lead-dashboard-filters.ts`
- `src/lib/lead-csv.ts`
- `src/lib/lead-score.ts`
- `src/lib/lead-summary-ai.ts`
- `scripts/seed-local-demo-data.ts`
- Docs fases 16, 17, 17.1, 18, 18.1, 18.2, 18.3

## Local Setup Executed

```bash
docker compose -f docker-compose.local.yml up -d postgres
npm run db:seed:local
npm run db:backup:local -- --tag=phase18_4
npm run db:backup:verify:local
npm run db:backup:list:local
```

Resultados:
- Postgres local running ✅
- Seed demo `[DEMO]` recreado ✅
- Backup local creado con checksum ✅
- Verificación de integridad de backup ✅
- Listado de backups con checksum ok ✅

## QA Matrix (Resumen)

| Área | Validación | Resultado |
|---|---|---|
| Auth local `/internal/*` | Sin cookie redirige a login | ✅ |
| Dashboard `/internal/leads` | Renderiza métricas + filtros + tabla/cards + paginación | ✅ |
| Filtros (`status/source/serviceInterest`) | Recalcula listado y métricas sobre corte activo | ✅ |
| Búsqueda `q` | Filtra y combina con corte activo | ✅ |
| Paginación | Ajuste defensivo de página fuera de rango | ✅ |
| Export CSV | Respeta filtros activos y descarga con headers correctos | ✅ |
| CSV security | `no-store`, same-origin guard, sin campos fuera de alcance | ✅ |
| Detalle `/internal/leads/[id]` | Datos lead + status + summary + score + notas + timeline | ✅ |
| Status update | 400 inválido / 200 válido | ✅ |
| Notas internas | 400 inválida / 201 válida / GET lista | ✅ |
| Summary endpoint | 200 válido / 403 origin externo | ✅ |
| Backup toolchain | backup + verify + list | ✅ |

## Evidence (Manual Checks)

### API/admin status
- `PATCH /api/admin/leads/{id}/status` status inválido → `400` ✅
- `PATCH /api/admin/leads/{id}/status` status válido → `200` ✅

### API/admin notes
- `POST /api/admin/leads/{id}/notes` contenido inválido → `400` ✅
- `POST /api/admin/leads/{id}/notes` contenido válido → `201` ✅
- `GET /api/admin/leads/{id}/notes` → `200` ✅

### API/admin summary
- `POST /api/admin/leads/{id}/summary` same-origin → `200` ✅
- `POST /api/admin/leads/{id}/summary` origin externo → `403` ✅

### Export CSV
- `GET /internal/leads/export?status=proposal` devuelve CSV con cabecera esperada ✅
- `Content-Disposition` correcto con `filename` y `filename*` ✅

## Microfix Applied

### Issue
En corte filtrado sin resultados, el fallback de “Servicio más consultado” podía mostrar “Aún sin consultas registradas”, lo que es ambiguo cuando sí hay leads fuera del filtro.

### Fix
Se ajustó el copy para priorizar contexto de filtros:
- con filtros activos y sin top service: **“Sin datos para este corte (revisá filtros o búsqueda).”**

Archivo:
- `src/app/internal/leads/page.tsx`

## Additional Note (Local Dev Runtime)

Se detectó una instancia previa de `next dev` en puerto 3000 con estado inconsistente de chunks (`Cannot find module './vendor-chunks/@prisma.js'`) al invocar un endpoint admin.

Acción:
- QA se repitió en una instancia limpia en `:3001`, sin reproducir el problema.

Conclusión:
- El hallazgo se comportó como estado de proceso local stale, no como bug funcional persistente del código.

## Technical Validation

```bash
npm run test
npm run lint
npm run build
```

Resultados:
- `test` ✅ (82 passing)
- `lint` ✅
- `build` ✅

## Scope Validation

Confirmado:
- No deploy.
- No producción.
- No Vercel changes.
- No DB externa.
- No Prisma schema changes.
- No migraciones.
- No auth changes.
- No usuarios/roles.
- No OpenAI.
- No dependencia obligatoria de Ollama para pasar QA baseline.
- No WhatsApp.
- No emails.
- No automatizaciones.
- No cambios en landing pública.
- No export de notas internas, timeline, summaries IA ni scores no persistidos.

## Recommended Next Step

Fase 18.5 — API/Internal Access Hardening local: reforzar protección de rutas `/api/admin/*` con gate de auth local (además de same-origin) antes de cualquier plan de producción.
