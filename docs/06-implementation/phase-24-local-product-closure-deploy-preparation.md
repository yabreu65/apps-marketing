# Phase 24 — Local Product Closure & Deploy Preparation

## Status

Completed.

## Executive Summary

`apps-marketing` is now closed as a **local product baseline** with full funnel coverage:

- public landing + public chat assistant + lead capture,
- internal lead operations dashboard,
- local QA/test/build safety net,
- local DB operations (seed, backup, restore, reset).

Final recommendation: **READY FOR DEPLOY PREP** (not deploy itself).

---

## Current Local Product Capabilities

### Public commercial funnel
- Premium landing with clear value proposition and CTA structure.
- Public chat assistant with:
  - intent detection,
  - persistent local memory,
  - conversion-oriented CTA guidance,
  - handoff summary,
  - copy summary action,
  - WhatsApp manual prefilled handoff.
- Contact form posting to `/api/leads` with server-side validation.

### Internal operations
- Local auth-protected internal dashboard.
- Leads list, filters, search, pagination, metrics, CSV export.
- Lead detail with status updates, notes, timeline, simulated conversation.
- Local lead score and lead summary (rules-first with optional local AI fallback).

### Local engineering/ops
- Prisma + local PostgreSQL (Docker).
- Local demo seed data.
- Backup/restore/reset scripts with local safety guards.
- Unit and contract test baseline.

---

## Explicitly Out of Scope (Current Phase)

- Production deploy
- Vercel production configuration
- External managed DB setup
- OpenAI integration
- WhatsApp Cloud API / Meta integration
- Real outbound automations
- Full auth/roles model
- Payments
- Full CRM scope

---

## Verified Local Commands

## 1) Install

```bash
npm install
```

## 2) Local DB + Prisma

```bash
docker compose -f docker-compose.local.yml up -d postgres
npx prisma generate
npx prisma migrate dev
```

## 3) Seed local demo data

```bash
npm run db:seed:local
```

## 4) App run

```bash
npm run dev -- --port 3000
```

## 5) Quality gates

```bash
npm run test
npm run lint
npm run build
```

## 6) Local DB safety ops

```bash
npm run db:backup:local
npm run db:backup:list:local
npm run db:backup:verify:local
npm run db:restore:local -- --confirm=RESTORE_LOCAL_DB --file=<backup.dump>
npm run db:reset:local -- --confirm=RESET_LOCAL_DB
npm run db:reset:local:seed -- --confirm=RESET_LOCAL_DB
```

---

## Environment Variables (from `.env.example`)

```env
WHATSAPP_VERIFY_TOKEN="change-me"
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/apps_marketing"
INTERNAL_DASHBOARD_PASSWORD="change-me"
INTERNAL_AUTH_COOKIE_NAME="apps_marketing_internal_auth"
OLLAMA_BASE_URL="http://localhost:11434"
OLLAMA_MODEL="llama3:latest"
ENABLE_LOCAL_AI_SUMMARY="false"
ENABLE_LOCAL_AI_REPLY_SUGGESTION="false"
ENABLE_LOCAL_AI_PUBLIC_ASSISTANT="false"
OLLAMA_TIMEOUT_MS="20000"
LOCAL_PG_CONTAINER="apps-marketing-postgres"
LOCAL_BACKUP_RETENTION_COUNT="15"
```

Notes:
- Never commit `.env`.
- Keep `change-me` values only for template/example.
- Local AI flags are optional and safe-disabled by default.

---

## Checklist Before Future Production Preparation

1. Define production database provider and env strategy (dev/preview/prod split).
2. Harden auth model beyond local password cookie.
3. Add production-grade rate limit strategy (shared/distributed).
4. Add monitoring/alerting/log policy for APIs.
5. Formalize secrets management and rotation policy.
6. Confirm legal/privacy copy for public chat memory.
7. Validate mobile UX on physical devices and major browsers.
8. Define release runbook + rollback plan.
9. Freeze and version API contracts for deployment phase.
10. Review dependency/security posture before first deploy.

---

## Pending Risks

1. Current internal auth is minimal/local and not enough for production.
2. Local in-memory protections (e.g., rate limit) need distributed alternatives in production.
3. Public chat memory/privacy behavior needs production policy hardening.
4. External channel integrations (WhatsApp Cloud API) are intentionally not active yet.

---

## Validation Results (Phase 24)

Executed:

```bash
npm run db:seed:local
npm run test
npm run lint
npm run build
```

Result:
- `db:seed:local`: OK
- `test`: OK
- `lint`: OK
- `build`: OK

---

## Final Recommendation

**READY FOR DEPLOY PREP**  
(Local product closure complete; next phase should focus on production planning/hardening, not new scope expansion.)

## Scope Validation

- No deploy executed.
- No production/Vercel setup changes.
- No external DB provisioning.
- No OpenAI / Meta / WhatsApp Cloud API activation.
- No automations or auto-send behavior.
- No auth/roles model expansion.
- No large architecture changes.
