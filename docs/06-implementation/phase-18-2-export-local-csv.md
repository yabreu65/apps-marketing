# Phase 18.2 — Export Local CSV (corte actual)

## Status

Completed (local export added).

## Purpose

Permitir exportar un CSV desde `/internal/leads` respetando filtros y búsqueda activos, de forma local y read-only.

## Includes

- Botón `Exportar CSV` en dashboard interno.
- Endpoint interno local `GET /internal/leads/export`.
- Exportación sobre **todo el resultado filtrado** (no solo la página actual).
- Soporte de filtros activos:
  - `status`
  - `source`
  - `serviceInterest`
  - `q`
- CSV con columnas:
  - `id`
  - `nombre`
  - `email`
  - `telefono`
  - `tipo_negocio`
  - `servicio_interes`
  - `fuente`
  - `estado`
  - `fecha_creacion_iso`
  - `mensaje`
- Headers de descarga (`Content-Disposition`) + `no-store`.
- Guard de same-origin para export.

## Implementation Details

### Route

- Archivo: `src/app/internal/leads/export/route.ts`
- Método: `GET`
- Flujo:
  1. Valida origin local/same-origin.
  2. Lee query params de filtros.
  3. Construye `where` con la misma lógica de dashboard.
  4. Consulta Prisma ordenando por `createdAt desc`.
  5. Genera CSV y responde `attachment`.

### Shared Filter Logic

- Archivo: `src/lib/lead-dashboard-filters.ts`
- Reutilizado en:
  - `src/app/internal/leads/page.tsx`
  - `src/app/internal/leads/export/route.ts`

### CSV Builder

- Archivo: `src/lib/lead-csv.ts`
- Incluye:
  - escape seguro de comillas/comas/saltos de línea.
  - BOM UTF-8 para compatibilidad de apertura en hojas de cálculo.
  - nombre de archivo con timestamp local.

## Tests Added

- `src/lib/lead-csv.test.ts`
- `src/app/internal/leads/export/route.test.ts`

Cobertura básica:
- CSV headers y escaping.
- filename pattern.
- export con filtros.
- 403 por origin externo.
- 500 por error de consulta.
- 405 para método no permitido.

## Validation

```bash
npm run test
npm run lint
npm run build
```

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
- No automatizaciones.
- No emails.
- No cambios en landing pública.
