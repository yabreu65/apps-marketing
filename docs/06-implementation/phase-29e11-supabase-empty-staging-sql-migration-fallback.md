# Phase 29E.11 — Supabase Empty Staging SQL Migration Fallback

## Objective
Apply Prisma SQL migrations to **empty Supabase staging** without Prisma Migrate (Schema Engine currently failing), using a controlled `pg` fallback.

## Why Prisma Migrate was not used
`npx prisma migrate status` keeps failing with `Schema engine error` across:
- Node 22 and Node 26
- direct URL and pooler URL
- advisory lock disabled
- timeout/ssl parameter tuning

Given this persistent failure, SQL fallback is evaluated for staging only.

## Evidence that staging is empty (preflight)
Confirmed via read-only metadata runner (`scripts/db/check-supabase-metadata.ts`) with successful path:
- target: Supabase pooler host on `:6543`
- database: `postgres`
- schema: `public`
- `public_tables_count = 0`
- `_prisma_migrations = false`
- app tables found: none

## Migrations detected (chronological)
1. `20260514160452_init_leads`
2. `20260514201533_add_lead_notes_timeline`
3. `20260516022322_add_lead_conversation_messages`
4. `20260516120812_add_public_chat_memory`

All include `migration.sql` and no destructive statements (`DROP TABLE`, `DROP COLUMN`, `TRUNCATE`, `DELETE`) were detected.

## Strategy for `_prisma_migrations`
Decision: **Option A (for now)** — do **not** register `_prisma_migrations` manually.

Reason:
- Prisma 7 metadata format should not be guessed manually.
- Even though local `_prisma_migrations` structure was inspected, checksums and lifecycle fields must match Prisma internals exactly.
- Safer to create app schema first in empty staging, then resolve Prisma Migrate issue separately.

Tradeoff:
- Prisma Migrate remains out of sync until engine issue is fixed or metadata is reconciled later.

## Fallback execution script (created, not executed yet)
- `scripts/db/apply-supabase-staging-sql-migrations.ts`

Safety controls in script:
- Loads `.env.local.supabase`
- Uses `DATABASE_URL` (pooler) with `sslmode` removed **in-memory only**
- Uses `ssl: { rejectUnauthorized: false }` (local staging diagnostic context)
- Re-checks staging emptiness before applying anything
- Validates each migration SQL against forbidden patterns
- Applies migrations in chronological order
- Runs each migration in `BEGIN/COMMIT`
- Stops at first error and rolls back current migration
- Sanitized logging only (no secrets)

## Execution status
- Script created ✅
- Execution pending ⏳
- No SQL applied yet.

## Risks
- `_prisma_migrations` not tracked by Prisma yet (temporary desync)
- Future Prisma Migrate operations may still fail until root cause is solved
- `rejectUnauthorized: false` is acceptable only in this controlled staging fallback context, not for production runtime

## Rollback (staging)
If migration fails:
1. Stop immediately at first failed migration
2. Do not patch manually without report
3. Recreate staging DB/project if needed (preferred for empty staging)
4. Keep local DB untouched

## GO / NO-GO
- Prisma Migrate: **NO-GO**
- SQL fallback execution: **WAITING FOR EXPLICIT CONFIRMATION**

Required confirmation phrase before running fallback script:
`EJECUTAR FALLBACK SQL EN SUPABASE STAGING VACIO`
