# Phase 29E.13 — Supabase Staging Functional Smoke Test

## Objective
Validate end-to-end functional behavior of the app against Supabase staging (remote DB) after SQL fallback schema creation.

## Environment (sanitized)
- Runtime target: Supabase staging (pooler for `DATABASE_URL`)
- `DIRECT_URL`: present
- App runtime keeps using `DATABASE_URL`
- Local `.env` file was not permanently modified
- Local DB configuration restored at end (project default remains local)

### Note about TLS for local smoke
To complete runtime smoke against Supabase from this environment, the app was started with a temporary process-level flag:
- `NODE_TLS_REJECT_UNAUTHORIZED=0`
This was used only for local staging verification and not persisted to repo files.

## Demo data used
- Lead form demo email: `qa-smoke@example.com`
- Honeypot demo email: `bot@example.com`
- Visitor key: `qa-smoke-visitor-1`
- No real personal data used.

## Functional Results

### 1) Public contact form
- Valid submit to `/api/leads`: **201 Created**
- Lead created in Supabase: **yes**
- Created lead id observed: `cmpbsdotw0000r8wsljjvec46`

### 2) Honeypot
- Submit with `website` filled: **202 Accepted**
- Lead creation blocked: **yes**
- Verification in DB: `Lead` rows with `bot@example.com` = `0`

### 3) Public chat
- POST `/api/public/chat` with demo visitor key: **200**
- Persisted objects verified:
  - `PublicChatVisitor`: created
  - `PublicChatSession`: created
  - `PublicChatMessage`: created
  - `PublicVisitorMemory`: created
- Memory reset endpoint:
  - DELETE `/api/public/chat/memory?visitorKey=...`: **200**
  - Memory rows after reset for visitor: `0`
- Re-message after reset recreated session/context correctly.

### 4) Internal dashboard / backend flows
- Internal login API `/api/internal/login`: **200**
- Internal pages:
  - `/internal/leads`: **200**
  - `/internal/leads/[id]`: **200**
  - `/internal/leads/export`: **200**
- Lead list API `/api/admin/leads`: returns smoke records
- Notes API:
  - POST `/api/admin/leads/[id]/notes`: **201**
  - DB verification: `LeadNote` count for smoke lead = `1`
- Status API:
  - PATCH `/api/admin/leads/[id]/status` -> `qualified`: **200**
  - DB verification: status updated + `LeadStatusHistory` count = `1`
- Simulated conversation API:
  - POST `/api/admin/leads/[id]/conversation`: **201**
  - GET same endpoint returns message list

## Metadata confirmation after smoke
Using metadata runner against Supabase staging:
- public tables present: `Lead`, `LeadConversationMessage`, `LeadNote`, `LeadStatusHistory`, `PublicChatMessage`, `PublicChatSession`, `PublicChatVisitor`, `PublicVisitorMemory`
- `_prisma_migrations`: still not present (as designed for fallback flow)

## Validation commands
- `npm run test` ✅
- `npm run lint` ✅
- `npm run build` ✅

## Rollback to local
- Staging smoke server stopped
- `.env` project default remains local PostgreSQL
- No permanent env overwrite done

## Remaining risks
1. Prisma Migrate remains NO-GO (`migrate status` schema engine issue).
2. `_prisma_migrations` remains unmanaged in staging fallback path.
3. TLS handling for local runtime-to-Supabase may require explicit production-safe strategy (no `NODE_TLS_REJECT_UNAUTHORIZED=0` in real environments).

## GO / NO-GO for preparing Vercel
- **GO (conditional)** for continuing staging validation and integration hardening.
- **NO-GO** for production migration automation until Prisma Migrate path is fixed or an approved SQL migration governance process is formalized.
