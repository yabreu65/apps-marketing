# Phase 18.1 — Dashboard Metrics QA & Empty States

## Status

Completed (local QA + minor UX polish).

## Purpose

Validar la sección de métricas en `/internal/leads` con datos demo y mejorar estados vacíos sin cambiar alcance funcional.

## QA Scope

- Métricas superiores del dashboard interno.
- Consistencia con filtros y búsqueda.
- Estado vacío con filtros sin resultados.
- Copy de estado vacío sin filtros (no hay leads).
- Confirmación de alcance local-only.

## Environment Used

```bash
npm run db:seed:local
```

Resultado seed:
- Eliminó y recreó 12 leads `[DEMO]` de forma idempotente.

Nota de ejecución local:
- `npm run dev -- --port 3000` devolvió `EADDRINUSE` porque el puerto 3000 ya estaba ocupado por una instancia activa.
- Se reutilizó esa instancia para QA manual con `curl` autenticado por cookie interna local.

## QA Checks Performed

1. **Baseline sin filtros** (`/internal/leads`):
   - Se renderiza bloque de métricas.
   - Valores coherentes con total de leads visibles en dataset activo.
   - Se muestra nota: “Calculadas sobre todas las consultas actuales.”

2. **Con filtros activos** (`/internal/leads?status=proposal`):
   - Métricas recalculadas con `where` filtrado.
   - Se muestra nota: “Calculadas sobre la búsqueda y filtros actuales.”
   - `Total`, `byStatus` y `uncontacted` ajustan correctamente al filtro.

3. **Búsqueda sin resultados** (`/internal/leads?q=zzzzzzz-no-match`):
   - Métricas en cero.
   - Estado vacío visible.
   - “Servicio más consultado” muestra fallback seguro.

## Changes Applied

### 1) Empty state contextual en `/internal/leads`

Archivo:
- `src/app/internal/leads/page.tsx`

Mejora:
- Si **hay filtros** y no hay resultados: mantiene mensaje de “criterios actuales”.
- Si **no hay filtros** y no hay leads: muestra mensaje específico de arranque:
  - “Todavía no hay leads cargados”
  - sugerencia de seed local o carga desde landing.

### 2) Fallback contextual en “Servicio más consultado”

Archivo:
- `src/app/internal/leads/page.tsx`

Mejora:
- Si no hay top service pero existen leads en ese corte: “Sin datos suficientes para este corte”.
- Si no hay leads: “Aún sin consultas registradas”.

## Validation Results

```bash
npm run test
npm run lint
npm run build
```

Estado:
- `test` ✅ (75 passing)
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
- No OpenAI/Ollama para métricas.
- No WhatsApp sending.
- No automatizaciones.
- No cambios en landing pública.

## Recommended Next Step

Fase 18.2 — Export básico local del corte actual (CSV) para revisión comercial interna, manteniendo modo local/read-only.
