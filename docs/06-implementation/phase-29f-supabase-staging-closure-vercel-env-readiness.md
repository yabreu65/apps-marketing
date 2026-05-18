# Phase 29F — Supabase Staging Closure & Vercel Env Readiness

## Objective
Close Supabase staging integration technically and leave a safe checklist to prepare a future Vercel preview deployment (without deploying yet).

## Current status
- Supabase staging schema is complete.
- Schema was created via controlled SQL fallback (Prisma Migrate remained NO-GO due to persistent `Schema engine error`).
- `_prisma_migrations` table was intentionally not created/managed manually.
- Functional smoke against Supabase staging passed for:
  - public form create
  - honeypot block (202 + no Lead row)
  - public chat persistence and memory reset
  - internal dashboard login/list/detail
  - notes, status change, conversation simulated, export
- Quality gates pass:
  - `npm run test`
  - `npm run lint`
  - `npm run build`

## How schema was created
Applied SQL migrations directly in staging using controlled scripts:
- `scripts/db/check-supabase-metadata.ts` (read-only metadata checks)
- `scripts/db/apply-supabase-staging-sql-migrations.ts` (ordered SQL apply with safety guards)

Applied migrations:
1. `20260514160452_init_leads`
2. `20260514201533_add_lead_notes_timeline`
3. `20260516022322_add_lead_conversation_messages`
4. `20260516120812_add_public_chat_memory`

Created tables:
- `Lead`
- `LeadNote`
- `LeadStatusHistory`
- `LeadConversationMessage`
- `PublicChatVisitor`
- `PublicChatSession`
- `PublicChatMessage`
- `PublicVisitorMemory`

## Why SQL fallback was used
Prisma Migrate path remained blocked in this environment (multiple retries, URLs, node versions, lock flag, and SSL/timing variants). `pg` connectivity and SQL execution were validated; fallback was limited to empty staging and additive migrations only.

## Prisma Migrate debt (open)
- `npx prisma migrate status` remains unreliable against current staging setup.
- `_prisma_migrations` remains absent.
- Future migration governance still needs one of:
  1. recover Prisma Migrate compatibility, or
  2. formalize SQL fallback pipeline with controls and audit trail.

---

## Vercel Preview Environment Variable Matrix (no real values)

| Variable | Type | Vercel | Required | Recommended value for preview | Notes |
|---|---|---:|---:|---|---|
| `DATABASE_URL` | Secret | Yes | Yes | Supabase pooler runtime URL (`:6543`) | Runtime DB connection for app/API |
| `DIRECT_URL` | Secret | Optional (Yes if used by tools) | No for runtime | Supabase direct/session URL (`:5432`) | Keep for tooling/diagnostics only |
| `INTERNAL_DASHBOARD_PASSWORD` | Secret | Yes | Yes | Strong random value | Must not be `change-me` |
| `INTERNAL_AUTH_COOKIE_NAME` | Plain/Secret | Yes | Yes | Keep current or project-specific value | Cookie namespace isolation |
| `NEXT_PUBLIC_API_BASE_URL` | Public | Yes | Optional | Empty for same-origin preview | Set only if front/backend are split |
| `PUBLIC_API_ALLOWED_ORIGINS` | Secret/Plain | Yes | Recommended | Preview domain origin(s), comma-separated | Required when using cross-origin public API calls |
| `WHATSAPP_VERIFY_TOKEN` | Secret | Optional | Optional | Set only if webhook verification is tested | Not required for basic landing/chat smoke |
| `ENABLE_GEMINI_PUBLIC_CHAT` | Plain | Yes | Optional | `false` or `true` based on test scope | If `true`, set Gemini vars below |
| `GEMINI_API_KEY` | Secret | Optional | Conditional | API key value | Required only if Gemini chat enabled |
| `GEMINI_MODEL` | Plain | Optional | Conditional | e.g. `gemini-2.5-flash` | Required only if Gemini chat enabled |
| `LEAD_AGENT_ENABLED` | Plain | Optional | Optional | `false` by default | Keep disabled unless explicitly testing |
| `LEAD_AGENT_PROVIDER` | Plain | Optional | Optional | `rules` | Avoid local model provider in Vercel |
| `LEAD_AGENT_FALLBACK_ENABLED` | Plain | Optional | Optional | `true` | Safe fallback behavior |
| `ENABLE_LOCAL_AI_SUMMARY` | Plain | No (recommended off) | No | `false` | Local-AI flags should stay off in preview |
| `ENABLE_LOCAL_AI_REPLY_SUGGESTION` | Plain | No (recommended off) | No | `false` | Local-only behavior |
| `ENABLE_LOCAL_AI_PUBLIC_ASSISTANT` | Plain | No (recommended off) | No | `false` | Local-only behavior |
| `OLLAMA_BASE_URL` / `OLLAMA_MODEL` / `OLLAMA_TIMEOUT_MS` | Plain | No (recommended off) | No | Leave unset | Not suitable for Vercel serverless runtime |
| `WHATSAPP_VERIFY_TOKEN` | Secret | Optional | Optional | Only if webhook route is used | Duplicate listed for emphasis |

### About `INTERNAL_SESSION_SECRET`
Current codebase does **not** use an `INTERNAL_SESSION_SECRET` env var. Internal auth currently relies on password + fixed cookie value logic, which is a security weakness for internet-exposed previews.

---

## Vercel risk audit

1. **Prisma + serverless lifecycle**
   - Frequent cold starts and short-lived instances can amplify DB connection pressure.
   - Pooler URL is mandatory; direct DB URL for runtime is not recommended.

2. **Supabase pooler + TLS handling**
   - Local workaround used relaxed TLS for diagnostics only.
   - Preview/production must use proper certificate validation strategy.

3. **Internal dashboard exposure risk**
   - Current internal auth is minimal (password check + static cookie value helper).
   - If preview is public, internal routes can be probed.

4. **Cookie/auth hardening gap**
   - No robust signed session strategy yet.
   - Requires hardening before public rollout.

5. **Origin guard coverage**
   - Public routes are origin-guarded but correctness depends on `PUBLIC_API_ALLOWED_ORIGINS` in multi-domain setups.

6. **Rate-limit in-memory in serverless**
   - In-memory maps are instance-local and reset on cold starts.
   - Useful as soft guard only; not a durable global limiter.

7. **Chat persistence + remote DB latency**
   - Public chat depends on DB writes/reads; serverless latency variance can impact UX.

8. **NEXT_PUBLIC variables**
   - Any `NEXT_PUBLIC_*` value is exposed to clients.
   - Never place secrets there.

9. **CORS/origin mismatch on previews**
   - Dynamic preview URLs require explicit allowlist strategy.

10. **Sensitive logging**
   - Ensure runtime logs do not leak payloads, identifiers, or secrets.

---

## Recommended deployment strategy (no deploy executed)
1. Create **private preview** deployment (not publicly announced).
2. Configure only required env vars for preview.
3. Smoke test in preview order:
   - public form
   - honeypot
   - public chat
   - internal login + internal leads flows (only if routes are intentionally exposed)
4. Review Vercel logs for DB/auth/origin errors.
5. Keep production blocked until dashboard auth is hardened and migration governance is settled.

---

## Rollback to local
- Keep local `.env` on local PostgreSQL.
- Use `.env.local.supabase` only for explicit staging sessions.
- Stop staging-mode sessions after smoke; do not leave local runtime pointed to Supabase by default.

## GO / NO-GO (for preparing preview)
- **GO (conditional)** to prepare a private Vercel preview checklist and env setup.
- **NO-GO** for production release until:
  - internal dashboard auth is hardened,
  - Prisma migration strategy is stabilized,
  - TLS/runtime DB behavior is validated in Vercel environment.
