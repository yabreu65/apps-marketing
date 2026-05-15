# Phase 17.1 — Backup Retention & Integrity (Local)

## Status

Completed (local-only).

## Purpose

Endurecer el flujo local de backup/restore con:

- retención automática de backups
- checksum SHA256 por backup
- verificación básica de integridad antes de restore
- política local documentada

## Naming Convention Confirmed

Los backups siguen este formato:

```txt
YYYYMMDD-HHMMSS-<database>-<tag>.dump
```

Ejemplo:

```txt
20260515-190451-apps_marketing-phase17.dump
```

## What Changed

### Scripts / Utils

- `scripts/db/local-db-utils.ts`
  - `backupRetentionCount` en config local (desde `LOCAL_BACKUP_RETENTION_COUNT`).
  - checksum helpers:
    - `computeSha256`
    - `writeSha256File`
    - `verifySha256File`
  - verificación de integridad archive:
    - `verifyBackupArchiveIntegrity` (checksum + `pg_restore -l -`).
  - retención automática:
    - `applyBackupRetentionPolicy`

- `scripts/db/local-backup.ts`
  - genera `.dump`
  - genera `.dump.sha256`
  - aplica retención automática

- `scripts/db/local-restore.ts`
  - verifica integridad por default antes de restaurar
  - mantiene confirm token `--confirm=RESTORE_LOCAL_DB`
  - opción `--skip-verify` para casos excepcionales locales

- `scripts/db/local-list-backups.ts`
  - lista backups con estado de checksum (ok/error)

- `scripts/db/local-reset.ts`
  - backup previo ahora incluye checksum
  - aplica retención sobre backups resultantes
  - mantiene confirm token `--confirm=RESET_LOCAL_DB`

- Nuevo script:
  - `scripts/db/local-verify-backup.ts`

### package.json scripts

Agregado:

```json
{
  "db:backup:verify:local": "tsx scripts/db/local-verify-backup.ts"
}
```

### Environment

`.env.example` agrega:

```env
LOCAL_BACKUP_RETENTION_COUNT="15"
```

## Local Retention Policy

- Política por cantidad de backups (`keep N`), no por días.
- Default: `15`.
- Se aplica automáticamente al crear backups (`db:backup:local`) y en backup previo de reset (`db:reset:local` sin `--skip-backup`).
- Cuando se purga un `.dump`, también se elimina su `.dump.sha256`.

## Integrity Policy

Cada backup genera:

- `<backup>.dump`
- `<backup>.dump.sha256`

La verificación básica incluye:

1. archivo backup existe y no está vacío
2. checksum `.sha256` existe y coincide
3. `pg_restore -l -` puede leer el archive

## Local Usage

### Crear backup (con checksum + retención)

```bash
npm run db:backup:local -- --tag=manual
```

### Listar backups con estado de checksum

```bash
npm run db:backup:list:local
```

### Verificar integridad

- Último backup:

```bash
npm run db:backup:verify:local
```

- Archivo puntual:

```bash
npm run db:backup:verify:local -- 20260515-190451-apps_marketing-phase17.dump
```

- Todos:

```bash
npm run db:backup:verify:local -- --all
```

### Restore (verifica integridad por default)

```bash
npm run db:restore:local -- <archivo.dump> --confirm=RESTORE_LOCAL_DB
```

## Validation Run

Ejecutado localmente:

- `npm run db:backup:local -- --tag=phase171` ✅
- `npm run db:backup:list:local` ✅
- `npm run db:backup:verify:local` ✅
- `npm run db:restore:local -- <archivo.dump> --confirm=RESTORE_LOCAL_DB` ✅

Validación técnica:

- `npm run test` ✅
- `npm run lint` ✅
- `npm run build` ✅

## Scope Validation

- No deploy
- No producción/Vercel
- No DB externa
- No Prisma schema changes
- No migraciones nuevas
- No auth/dashboard/feature changes
- No OpenAI/Ollama/servicios externos
