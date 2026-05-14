# Phase 9B — Prisma + PostgreSQL Setup

## Status

Prisma/PostgreSQL base setup completed.

## What was included

- Prisma dependencies installed (`prisma`, `@prisma/client`).
- `prisma/schema.prisma` created with PostgreSQL datasource.
- `Lead` model created for future lead persistence.
- `DATABASE_URL` added to `.env.example`.
- `src/lib/prisma.ts` helper created with safe singleton pattern for Next.js development.

## Lead model

The schema includes:

- `id` (cuid)
- `name`
- `email` (optional)
- `phone` (optional)
- `businessType` (optional)
- `serviceInterest`
- `message`
- `source`
- `status` default `new`
- `createdAt`
- `updatedAt`

## Environment

`.env.example` now includes:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/apps_marketing"
```

## Important scope note

`/api/leads` is still using validation-only flow and temporary lead IDs.

This phase does **not** persist data in PostgreSQL yet.

## Next phase

Phase 9C will connect `/api/leads` to Prisma for real persistence.
