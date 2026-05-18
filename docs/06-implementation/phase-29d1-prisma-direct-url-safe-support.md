# Phase 29D.1 — Prisma DIRECT_URL Safe Support

## Objective
Enable safe Prisma CLI support for `DIRECT_URL` (Supabase direct connection) without breaking local development.

## Context
- Runtime app continues using `DATABASE_URL` in `src/lib/prisma.ts`.
- Prisma CLI previously used only `DATABASE_URL` through `prisma.config.ts`.
- `.env.example` already documents local Postgres + Supabase pooled URL + optional `DIRECT_URL`.

## Change Applied
### 1) Prisma CLI datasource fallback
Updated `prisma.config.ts`:
- Prisma CLI datasource URL now resolves with this order:
  1. `DIRECT_URL` (if present)
  2. `DATABASE_URL` fallback
- Added explicit error when neither is present.

This keeps behavior safe:
- Local dev works with only `DATABASE_URL`.
- Supabase staging can use `DIRECT_URL` for migrations/introspection.
- Runtime remains untouched and still uses `DATABASE_URL`.

## Files Modified
- `prisma.config.ts`

## Why this approach
- Avoids forcing `DIRECT_URL` in local environments.
- Avoids schema-level env hard requirements that could fail when `DIRECT_URL` is absent.
- Keeps migration/introspection connection strategy explicit and reversible.

## Validation
- `npm run test`
- `npm run lint`
- `npm run build`

## Rollback
If needed, revert `prisma.config.ts` to use only `DATABASE_URL`.
