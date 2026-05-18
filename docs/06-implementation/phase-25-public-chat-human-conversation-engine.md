# Phase 25 — Public Chat Human Conversation Engine

## Status

Implemented locally.

## Purpose

Make the public lead assistant feel more like a human commercial advisor without giving the AI model uncontrolled decision power.

## What Changed

### Conversation stage

Added a lightweight stage classifier:

- `first_contact`
- `diagnosis`
- `recommendation`
- `objection`
- `handoff`

This helps the assistant avoid answering every message as a first-touch intent.

### Structured memory

Memory now tracks useful commercial facts in addition to the plain summary:

- business type
- channels
- pain points
- goals
- recommended path
- last objection

The data is persisted through the existing memory summary, so no Prisma migration or new persistence was required.

### Human memory bridge

Responses now reference prior context in a more natural way, for example:

> Tomo el contexto que ya me diste (negocio: retail / venta de productos; canales: Instagram, WhatsApp; dolor: pierde consultas o seguimiento).

This replaces raw/technical summary repetition.

### Optional local model strategy

The Ollama prompt was upgraded so the model acts as a controlled human-tone rewriter:

1. Rules still detect intent and define the commercial strategy.
2. The optional local model can rewrite the final response in a warmer, more natural tone.
3. Safety rules still apply.
4. Fallback remains rules-only if Ollama is disabled or fails.

## Why Not RAG Yet

RAG is not the next bottleneck. The main issue was conversational state, memory quality, and human tone.

RAG should come later when there is a curated knowledge base for:

- service packages
- FAQs
- scope definitions
- pricing criteria
- delivery process
- approved commercial answers

## Files Modified

- `/Users/yoryiabreu/proyectos/apps-marketing/src/modules/lead-assistant/types/lead-assistant.ts`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/modules/lead-assistant/core/conversation-stage.ts`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/modules/lead-assistant/core/memory-summary.ts`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/modules/lead-assistant/core/build-response.ts`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/modules/lead-assistant/ai/public-chat-prompt.ts`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/modules/lead-assistant/server/public-chat-service.ts`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/modules/lead-assistant/tests/conversation-stage.test.ts`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/modules/lead-assistant/tests/memory-summary.test.ts`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/modules/lead-assistant/tests/build-response.test.ts`

## Tests Added / Updated

- Conversation stage classification.
- Structured memory extraction and persistence reconstruction.
- Natural memory usage in response copy.
- Existing objection/retail tests preserved.

## Scope Validation

- No deploy.
- No production/Vercel.
- No OpenAI.
- No Meta / WhatsApp Cloud API.
- No real automation.
- No auto-send.
- No new DB.
- No Prisma schema changes.
- No auth/roles changes.
- No RAG yet.

## Validation

```bash
npm run test
npm run lint
npm run build
```

Final result:

- `test`: OK
- `lint`: OK
- `build`: OK

## Recommended Next Step

**Phase 26 — Public Chat Local Knowledge Base / Mini-RAG Plan**

Only after the commercial knowledge base is curated and approved.
