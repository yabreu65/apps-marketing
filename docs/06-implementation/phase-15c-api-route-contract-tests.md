# Phase 15C — API Route Contract Tests

## Status

API contract tests added.

## Purpose

Agregar tests aislados para contratos de endpoints críticos sin DB real ni servidor HTTP.

## Includes

- `POST /api/leads`
- `POST /api/internal/login`
- `POST /api/internal/logout`
- `PATCH /api/admin/leads/[id]/status`
- `GET/POST /api/admin/leads/[id]/notes`
- `POST /api/admin/leads/[id]/summary`

## Testing Strategy

- Vitest.
- Import directo de handlers de `route.ts`.
- Mock de Prisma.
- Mock de AI summary (`buildLeadSummaryWithOptionalAI`).
- Requests locales (`Request`) sin levantar servidor.
- Validación de contratos: status codes, payload shape y errores.
- Sin DB real.
- Sin Ollama real.
- Sin red externa.

## Files Added

- `src/test/request-helpers.ts`
- `src/app/api/leads/route.test.ts`
- `src/app/api/internal/login/route.test.ts`
- `src/app/api/internal/logout/route.test.ts`
- `src/app/api/admin/leads/[id]/status/route.test.ts`
- `src/app/api/admin/leads/[id]/notes/route.test.ts`
- `src/app/api/admin/leads/[id]/summary/route.test.ts`

## Contract Coverage Highlights

- `POST /api/leads`:
  - 201 payload válido
  - 400 JSON inválido
  - 400 payload inválido con `errors`
  - 500 error DB sin stack trace
  - 405 método no permitido
- `POST /api/internal/login`:
  - 503 auth mal configurada (`change-me`)
  - 401 password incorrecta
  - 200 password correcta + cookie set mock
  - 403 origin externo
  - 429 rate-limit después de intentos fallidos
  - 405 método no permitido
- `POST /api/internal/logout`:
  - 200 logout + limpieza de cookie mock
  - 403 origin externo
  - 405 método no permitido
- `PATCH /api/admin/leads/[id]/status`:
  - 400 id inválido
  - 400 status inválido
  - 404 lead no existe
  - 200 status igual sin historial duplicado
  - 200 cambio válido con historial
  - 403 origin externo
  - 405 método no permitido
- `GET/POST /api/admin/leads/[id]/notes`:
  - 400 id inválido
  - 404 lead no existe
  - 400 nota inválida
  - 201 nota válida
  - 403 origin externo
  - 200 GET lista mockeada
  - 405 método no permitido
- `POST /api/admin/leads/[id]/summary`:
  - 400 id inválido
  - 404 lead no existe
  - 403 origin externo
  - 200 summary + source mockeados
  - 500 error interno sin stack trace
  - 405 método no permitido

## Does Not Include

- E2E.
- Playwright.
- Cypress.
- UI tests.
- DB integration tests.
- Ollama integration tests.
- Network tests.
- Production tests.

## Commands

```bash
npm run test
npm run lint
npm run build
```

## Validation Result

- `npm run test` ✅ (14 archivos, 71 tests)
- `npm run lint` ✅
- `npm run build` ✅
