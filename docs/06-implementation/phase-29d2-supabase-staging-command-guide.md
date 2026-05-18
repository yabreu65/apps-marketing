# Phase 29D.2 — Supabase Staging Command Guide & Safety Checklist

## Objective
Provide a safe operational guide to test `apps-marketing` against Supabase Postgres (staging) with Prisma, without breaking local DB and without deploy.

## Scope and Current Baseline
- `prisma.config.ts` prefers `DIRECT_URL`, with fallback to `DATABASE_URL` for Prisma CLI.
- Runtime app keeps using `DATABASE_URL` (`src/lib/prisma.ts`).
- Local DB scripts in `scripts/db/*` have local-host safety guards.
- This guide does **not** execute remote migrations by itself.

---

## 1) Supabase configuration (staging)

1. Create a Supabase project (staging only).
2. In Supabase project settings, copy:
   - **Pooled connection string** (for app runtime)
   - **Direct connection string** (for Prisma CLI migrations/introspection)
3. Create a local file (not committed):
   - `.env.local.supabase`
4. Keep your current local dev file for local Postgres:
   - `.env.local` (or `.env` depending on your local flow)

### Example variables
```env
# Supabase runtime pooled URL
DATABASE_URL="postgresql://..."

# Supabase direct URL for Prisma CLI
DIRECT_URL="postgresql://..."
```

> Never commit real credentials.

---

## 2) Safe env file strategy

Recommended split:
- Local Postgres: `.env.local`
- Supabase staging: `.env.local.supabase`

When testing Supabase staging locally:
1. Backup your active env file.
2. Load Supabase values into active env context.
3. Run Prisma/API checks.
4. Restore local env file.

---

## 3) Preflight safety checklist (before touching Supabase)

Run in this order:

1. Confirm branch/context is correct.
2. Confirm you are targeting **staging**, not production.
3. Confirm env values are loaded as expected:
   - `DATABASE_URL` points to Supabase pooled
   - `DIRECT_URL` points to Supabase direct
4. Confirm local backup scripts are **not** used for Supabase (they are local-only by design).
5. Dry-run mindset:
   - start with read/inspect commands
   - migrate only after explicit confirmation.

---

## 4) Command guide (safe order)

## A. Baseline quality gates (no DB mutation)
```bash
npm run test
npm run lint
npm run build
```

## B. Prisma configuration check (read-only)
```bash
npx prisma validate
```

## C. Introspection check (read-only against staging)
```bash
npx prisma db pull
```

## D. Migration status check (read-only)
```bash
npx prisma migrate status
```

## E. Generate client (safe)
```bash
npx prisma generate
```

## F. Apply migrations to Supabase staging (MUTATING — only with explicit approval)
```bash
npx prisma migrate deploy
```

> Use `migrate deploy` for controlled staging/prod-like flow.

---

## 5) Local runtime smoke test against Supabase staging

After env is set to Supabase:
```bash
npm run dev
```

Then verify manually:
- Landing loads
- Public contact form submits
- Public chat endpoint works
- Internal login/dashboard can read data

Optional API smoke checks:
- `POST /api/leads`
- `POST /api/public/chat`
- `GET /api/admin/leads` (with internal auth context)

---

## 6) Rollback / return to local DB

1. Stop dev server.
2. Restore local env values (`DATABASE_URL` local, unset `DIRECT_URL` if not used locally).
3. Start app again.
4. Re-run quick checks:
```bash
npm run test
npm run lint
```

---

## 7) Risk controls

- Do not run `prisma migrate reset` against Supabase staging.
- Do not run local restore scripts against remote DB.
- Do not expose Supabase credentials in frontend env vars.
- Keep `DATABASE_URL` pooled for runtime; keep `DIRECT_URL` for CLI/migrations.

---

## 8) GO / NO-GO for remote migration execution

GO only if all are true:
- Staging project confirmed (not prod)
- Env values verified
- `prisma validate` OK
- `prisma migrate status` reviewed
- Explicit human confirmation received

Otherwise: **NO-GO**.

---

## 9) Files reviewed for this guide
- `package.json`
- `prisma.config.ts`
- `prisma/schema.prisma`
- `.env.example`
- `scripts/db/*`
- `docs/06-implementation/phase-29d1-prisma-direct-url-safe-support.md`
