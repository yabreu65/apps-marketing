# Phase 20 — Local WhatsApp / Conversation Simulator

## Status

Completed (local only).

## Purpose

Agregar un simulador local de conversación tipo WhatsApp asociado a cada lead para preparar el futuro módulo conversacional, sin integrar APIs externas ni envíos reales.

## Scope

- **Local-only** (`whatsapp_simulated`)
- Sin WhatsApp Cloud API
- Sin Meta API
- Sin mensajes reales
- Sin OpenAI
- Sin llamadas a Ollama
- Sin emails
- Sin automatizaciones
- Sin cambios de auth/roles
- Sin cambios en landing pública

## Files Created

- `src/types/lead-conversation.ts`
- `src/lib/lead-conversation-validation.ts`
- `src/lib/lead-conversation-validation.test.ts`
- `src/app/api/admin/leads/[id]/conversation/route.ts`
- `src/app/api/admin/leads/[id]/conversation/route.test.ts`
- `src/components/internal/LeadConversationPanel.tsx`
- `docs/06-implementation/phase-20-local-whatsapp-conversation-simulator.md`
- `prisma/migrations/20260516022322_add_lead_conversation_messages/migration.sql`

## Files Modified

- `prisma/schema.prisma`
- `src/app/internal/leads/[id]/page.tsx`
- `scripts/seed-local-demo-data.ts`

## Data Model

Se agregó el modelo Prisma:

- `LeadConversationMessage`
  - `leadId`
  - `channel` (default `whatsapp_simulated`)
  - `direction` (`inbound | outbound`)
  - `content`
  - `createdAt`

Relación en `Lead`:

- `conversations LeadConversationMessage[]`

## Validation

`src/lib/lead-conversation-validation.ts`:

- normalización de payload
- `direction` permitido (`inbound` / `outbound`)
- `channel` permitido (`whatsapp_simulated`)
- `content` requerido (2–1000 chars)

## Internal API

Ruta:

- `GET /api/admin/leads/[id]/conversation`
- `POST /api/admin/leads/[id]/conversation`

Comportamiento:

- GET lista mensajes simulados por lead (ordenados por `createdAt desc`)
- POST crea mensaje simulado validado
- Guard `same-origin` en POST
- Respuestas consistentes (`successResponse` / `errorResponse`)
- `PATCH` responde `405`

## UI Integration

En `/internal/leads/[id]`:

- nuevo panel **Conversación simulada**
- permite registrar:
  - mensaje entrante simulado
  - respuesta manual simulada
- muestra:
  - dirección
  - canal (`whatsapp_simulated`)
  - fecha/hora
  - contenido
- nota visible de alcance local y sin envíos reales

## Timeline Integration

La actividad reciente ahora incluye eventos de conversación simulada:

- `Mensaje entrante simulado`
- `Respuesta manual simulada`

## Seed Demo Update

`npm run db:seed:local` ahora crea mensajes simulados para leads `[DEMO]`.

- mantiene comportamiento idempotente (limpia y recrea solo `[DEMO]`)
- no toca datos no-demo

## Local Safety Steps Executed

Antes de migrar:

```bash
npm run db:backup:local -- --tag=before_phase20_conversations
npm run db:backup:verify:local
```

Migración local:

```bash
npx prisma migrate dev --name add_lead_conversation_messages
npx prisma generate
```

## Validation

```bash
npm run db:seed:local
npm run test
npm run lint
npm run build
```

Resultado:

- Seed local ✅
- Tests ✅
- Lint ✅
- Build ✅

## Notes

- Los backups `.dump` y `.sha256` quedan en `backups/local/` como artefactos locales (no para producción).
- No se expone ni envía información a terceros desde este simulador.
