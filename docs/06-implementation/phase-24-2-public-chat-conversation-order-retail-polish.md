# Phase 24.2 — Public Chat Conversation Order & Retail Recommendation Polish

## Status

Completed.

## Problem Detected

- In long chats, greeting could appear out of order after newer assistant messages.
- Quick replies stayed visible even after user already provided free-text context.
- Retail-like queries ("venta de artículos", "tienda", "vendo por Instagram/WhatsApp") needed more specific guidance.
- Footer text looked too technical for a public experience.

## Changes Applied

### 1) Conversation order fix

File:
- `/Users/yoryiabreu/proyectos/apps-marketing/src/modules/lead-assistant/server/public-chat-service.ts`

Change:
- Message mapping now sorts ascending by `createdAt` so chat renders naturally from oldest to newest.

### 2) Memory summary latest-message fix

File:
- `/Users/yoryiabreu/proyectos/apps-marketing/src/modules/lead-assistant/core/memory-summary.ts`

Change:
- `latestVisitorMessage` now resolves from the latest visitor entry (reverse scan), preserving correct contextual summary after ordering fix.

### 3) Retail recommendation polish

File:
- `/Users/yoryiabreu/proyectos/apps-marketing/src/modules/lead-assistant/core/build-response.ts`

Change:
- Added retail context detection for phrases like:
  - "venta de artículos"
  - "tienda"
  - "vendo productos"
  - "tengo un local"
  - "vendo por Instagram/WhatsApp"
- Response now guides between:
  - landing for capture,
  - web catálogo orientation,
  - manual WhatsApp contact,
  - follow-up/dashboard logic when volume grows.
- Keeps explicit “Siguiente paso recomendado” + asks concrete data:
  - what products are sold,
  - where inquiries arrive today,
  - if goal is online selling or capture.

### 4) Quick replies and footer UX polish

File:
- `/Users/yoryiabreu/proyectos/apps-marketing/src/modules/lead-assistant/components/PublicLeadAssistantWidget.tsx`

Changes:
- Quick replies show only before first visitor message (`!hasUserMessage`).
- Privacy text compacted.
- Footer changed from technical `visitante: <id>` to human:
  - development: `Sesión local activa · <short-id>`
  - non-dev: `Sesión local activa`
- Button label updated:
  - `Borrar memoria` → `Borrar contexto`.

## Tests Updated

File:
- `/Users/yoryiabreu/proyectos/apps-marketing/src/modules/lead-assistant/tests/build-response.test.ts`

Added case:
- retail query should produce more specific recommendation and follow-up question.

## Validation Executed

```bash
npm run test
npm run lint
npm run build
```

Results:
- `test`: OK
- `lint`: OK
- `build`: OK

## Scope Check

- No deploy.
- No production/Vercel.
- No OpenAI.
- No Meta/WhatsApp Cloud API.
- No automations / no auto-send.
- No new persistence.
- No second DB.
- No auth/roles changes.
- No large feature additions.

## Final Result

**GO**  
Conversation order is now natural, quick replies no longer saturate after first free input, and retail recommendations are more useful and actionable.
