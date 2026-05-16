# Phase 22.1B — Public Chat DB + API + Persistent Memory

## Status

Completed (local-only).

## Purpose

Persistir memoria real del chat público en PostgreSQL actual usando Prisma actual, manteniendo arquitectura modular en `src/modules/lead-assistant/`.

## Scope

- Single DB (PostgreSQL local actual)
- Prisma actual
- APIs públicas internas para chat/memoria
- Widget conectado a API
- Sin deploy/producción/Vercel
- Sin WhatsApp real/Meta/OpenAI
- Ollama opcional, no obligatorio

## Prisma Models / Migration

Models:
- `PublicChatVisitor`
- `PublicChatSession`
- `PublicChatMessage`
- `PublicVisitorMemory`

Migration:
- `20260516120812_add_public_chat_memory` (ya presente)
- `npx prisma migrate dev --name add_public_chat_memory` ejecutado (DB ya en sync)
- `npx prisma generate` OK

## APIs

### `GET /api/public/chat?visitorKey=...`
- Carga estado persistido del visitante.
- Crea visitor/sesión/greeting inicial si no existe.

### `POST /api/public/chat`
- Payload: `{ visitorKey, message }`
- Valida same-origin + payload
- Procesa intención/respuesta
- Persiste mensajes y memoria
- Devuelve `state`, `reply`, `suggestedActions`

### `DELETE /api/public/chat/memory?visitorKey=...`
- Borra memoria/sesiones del visitante en módulo público.
- No afecta leads internos.

## Module Changes

- `src/modules/lead-assistant/server/public-chat-service.ts`
  - orquesta persistencia DB + procesamiento conversacional
- `src/modules/lead-assistant/server/public-memory-service.ts`
  - visitorKey localStorage + fallback state
- `src/modules/lead-assistant/types/lead-assistant.ts`
  - tipos de request/response para APIs públicas

## Widget Integration

`PublicLeadAssistantWidget` ahora:
- obtiene/crea `visitorKey` en localStorage
- hace bootstrap con `GET /api/public/chat`
- envía mensajes con `POST /api/public/chat`
- muestra `reply` + `suggestedActions`
- borra memoria con `DELETE /api/public/chat/memory`
- mantiene aviso de privacidad

## Tests Added

- `src/modules/lead-assistant/tests/public-memory-service.test.ts`
- `src/modules/lead-assistant/tests/public-chat-service.test.ts`
- `src/app/api/public/chat/route.test.ts`
- `src/app/api/public/chat/memory/route.test.ts`

## Local Safety

Before schema work:
- `npm run db:backup:local -- --tag=before_phase22_1b_public_chat_memory`
- `npm run db:backup:verify:local`

## Validation

```bash
npm run db:seed:local
npm run test
npm run lint
npm run build
```

## Notes

- No frontend/backend split.
- No segunda DB.
- No automations, no outbound external messaging.
