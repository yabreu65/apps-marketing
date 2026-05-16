# Apps Marketing / Yoryi AI Studio

`apps-marketing` is a local-first commercial product baseline:
- premium public landing,
- lead capture API,
- internal leads dashboard,
- local conversational assistant with memory,
- manual WhatsApp handoff (no real WhatsApp integration).

> Current status: **ready for local demo and deploy preparation** (no production deploy in this repo phase).

## Current Local Scope

### Public side
- Marketing landing (`/`)
- Public chat assistant widget (intent detection, local memory, CTA guidance)
- Lead handoff summary in chat
- Copy summary action
- WhatsApp manual link with prefilled context
- Contact form connected to `POST /api/leads`

### Internal side
- Local auth-protected dashboard (`/internal/*`)
- Leads list with filters, search, pagination, metrics
- CSV export (local, filtered scope)
- Lead detail with:
  - status update,
  - internal notes,
  - timeline/activity,
  - simulated conversation,
  - local lead score,
  - local lead summary (rules / optional Ollama fallback-safe)

### Local ops/testing
- Demo seed dataset
- Local backup/restore/reset tooling
- Unit tests + API contract tests (Vitest)

## Out of Scope (Current Phase)

- Production deploy
- Vercel production setup
- External/managed production database configuration
- OpenAI integration
- WhatsApp Cloud API / Meta integration
- Real outbound message automation
- Roles/users enterprise auth model
- Payments
- Full CRM scope

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Prisma + PostgreSQL (local Docker)
- Vitest

## Local Setup

1) Install dependencies

```bash
npm install
```

2) Prepare env file

```bash
cp .env.example .env
```

3) Start local PostgreSQL

```bash
docker compose -f docker-compose.local.yml up -d postgres
```

4) Generate Prisma client

```bash
npx prisma generate
```

5) Apply local migrations (when needed)

```bash
npx prisma migrate dev
```

6) Seed local demo data

```bash
npm run db:seed:local
```

7) Start app

```bash
npm run dev -- --port 3000
```

Open [http://localhost:3000](http://localhost:3000)

## Verified Local Commands

```bash
npm run db:seed:local
npm run test
npm run lint
npm run build
```

## Local DB Operations

```bash
npm run db:backup:local
npm run db:backup:list:local
npm run db:backup:verify:local
npm run db:restore:local -- --confirm=RESTORE_LOCAL_DB --file=<backup.dump>
npm run db:reset:local -- --confirm=RESET_LOCAL_DB
npm run db:reset:local:seed -- --confirm=RESET_LOCAL_DB
```

## Security and Safety Notes

- Internal dashboard auth is local-minimum (not production-grade yet).
- Public chat memory is local app scope only.
- WhatsApp action is manual link open only.
- No automatic outbound messaging.
- No external AI required for baseline behavior.

## Troubleshooting

Clear Next cache:

```bash
rm -rf .next
```

Free port 3000:

```bash
lsof -ti:3000 | xargs -r kill -9
```
