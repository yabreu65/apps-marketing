# Phase 17 — Local DB Backup & Restore

## Status

Completed (local-only).

## Purpose

Agregar flujo seguro y repetible para backup, restore, listado y reset controlado de la base PostgreSQL local de `apps-marketing`.

## Environment Audit (Local)

- Docker service: `postgres`
- Container name: `apps-marketing-postgres`
- Host: `localhost`
- Port: `5432`
- Database: `apps_marketing`
- User: `postgres`
- Connection source: `DATABASE_URL` (archivo `.env` local)

Origen de configuración:

- `docker-compose.local.yml`
- `.env` / `.env.example`
- `prisma.config.ts`
- `src/lib/prisma.ts`

## Files Added

- `backups/local/.gitkeep`
- `scripts/db/local-db-utils.ts`
- `scripts/db/local-backup.ts`
- `scripts/db/local-restore.ts`
- `scripts/db/local-list-backups.ts`
- `scripts/db/local-reset.ts`

## Package Scripts Added

```json
{
  "db:backup:local": "tsx scripts/db/local-backup.ts",
  "db:backup:list:local": "tsx scripts/db/local-list-backups.ts",
  "db:restore:local": "tsx scripts/db/local-restore.ts",
  "db:reset:local": "tsx scripts/db/local-reset.ts",
  "db:reset:local:seed": "tsx scripts/db/local-reset.ts --seed-demo"
}
```

## Safety Controls

- Los scripts validan que `DATABASE_URL` apunte a host local (`localhost`, `127.0.0.1`, `::1`).
- Los scripts fallan si el contenedor local no está corriendo.
- Restore requiere confirmación explícita:
  - `--confirm=RESTORE_LOCAL_DB`
- Reset requiere confirmación explícita:
  - `--confirm=RESET_LOCAL_DB`
- `db:reset:local` crea backup previo automático (salvo `--skip-backup`).

## Usage

### 1) Listar backups

```bash
npm run db:backup:list:local
```

### 2) Crear backup local

```bash
npm run db:backup:local -- --tag=manual
```

### 3) Restaurar backup local

```bash
npm run db:restore:local -- <archivo.dump> --confirm=RESTORE_LOCAL_DB
```

Ejemplo:

```bash
npm run db:restore:local -- 20260515-190451-apps_marketing-phase17.dump --confirm=RESTORE_LOCAL_DB
```

### 4) Reset local controlado (destructivo)

```bash
npm run db:reset:local -- --confirm=RESET_LOCAL_DB
```

Con seed demo automático:

```bash
npm run db:reset:local:seed -- --confirm=RESET_LOCAL_DB
```

## Recommended Flow

1. `npm run db:backup:local -- --tag=before-change`
2. Ejecutar cambios/pruebas locales
3. Si necesitas volver atrás: `npm run db:restore:local -- <archivo.dump> --confirm=RESTORE_LOCAL_DB`
4. Solo si quieres limpiar todo local: `npm run db:reset:local -- --confirm=RESET_LOCAL_DB`

## Validation Run (Local)

Ejecutado:

- `npm run db:backup:list:local` ✅
- `npm run db:backup:local -- --tag=phase17` ✅
- `npm run db:restore:local -- 20260515-190451-apps_marketing-phase17.dump --confirm=RESTORE_LOCAL_DB` ✅
- `npm run db:reset:local` (sin confirm) ✅ bloqueado por guard

Validación técnica:

- `npm run test` ✅
- `npm run lint` ✅
- `npm run build` ✅

## Scope Validation

- No deploy
- No producción
- No Vercel
- No DB externa
- No cambios en Prisma schema
- No cambios en migraciones
- No cambios en auth/dashboard
- No OpenAI/Ollama/servicios externos
