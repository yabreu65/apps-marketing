# Phase 35B — Remove Local/Ollama Runtime Dependency

## Objective
Apply product decision to remove local-model/Ollama runtime from the app while preserving deterministic local business rules.

## Decision constraints respected
- No backend contract break.
- No DB/Prisma changes.
- No deploy/push.
- No OpenAI integration.
- No forced Gemini enable.
- Diagnosis/scoring/chat/dashboard remain functional.

## Audit summary (35A)
Search executed:

```bash
grep -R "ollama\|OLLAMA\|ENABLE_LOCAL_AI\|localhost:11434\|local-ai\|local ai\|LOCAL_AI" -n src docs .env.example package.json 2>/dev/null
```

Detected references:
- `src`: 106 hits in 14 files
- `docs`: 127 hits in 18 files
- `.env.example`: 7 hits
- `package.json`: 0 textual hits for these keys

## Changes applied

### 1) Runtime cleanup (code)
Removed local-model implementation files:
- `src/lib/ai/ollama-provider.ts`
- `src/modules/lead-assistant/ai/ollama-client.ts`
- `src/modules/lead-assistant/ai/public-chat-ai.ts`
- `src/modules/lead-assistant/ai/generate-public-chat-natural-reply.ts`
- `src/modules/lead-assistant/agent/ollama-agent-client.ts`

Removed test tied to deleted legacy path:
- `src/modules/lead-assistant/tests/generate-public-chat-natural-reply.test.ts`

### 2) Summary and suggestion wrappers
Refactored to deterministic rules baseline:
- `src/lib/lead-summary-ai.ts`
- `src/lib/lead-reply-suggestion-ai.ts`

Both now run safely without local model dependency.

### 3) Types/UI source labels
Updated source unions and labels to remove `ollama`:
- `src/types/lead-reply-suggestion.ts`
- `src/modules/lead-assistant/types/lead-assistant.ts`
- `src/components/internal/LeadSummaryPanel.tsx`
- `src/components/internal/LeadConversationPanel.tsx`

### 4) Env cleanup
Updated `.env.example`:
- Removed `OLLAMA_*`
- Removed `ENABLE_LOCAL_AI_*`
- Removed `LEAD_AGENT_ENABLED` and `LEAD_AGENT_PROVIDER` (legacy local path)
- Kept `ENABLE_GEMINI_PUBLIC_CHAT`, `GEMINI_API_KEY`, `GEMINI_MODEL`, `LEAD_AGENT_FALLBACK_ENABLED`

### 5) Test updates
Adjusted tests to reflect no-ollama strategy:
- `src/lib/lead-reply-suggestion.test.ts`
- `src/app/api/admin/leads/[id]/summary/route.test.ts`

### 6) Strategy docs update
Replaced strategy documents that recommended local-model-first:
- `docs/02-architecture/ai-provider-strategy.md`
- `docs/05-decisions/adr-003-ai-provider.md`
- `docs/01-sdd/public-lead-assistant/07-ai-provider-strategy.md`

## What was intentionally NOT changed
- Diagnosis logic by rules.
- Lead scoring by rules.
- Public chat business guardrails/rule engine.
- API contracts and route paths.
- Database schema.
- Gemini disabled-by-default behavior.

## Residual references in historical implementation docs
Historical phase docs still contain Ollama mentions for traceability (past implementation history). They are not active runtime strategy.

## Validation checklist
Run after this phase:

```bash
npx tsc --noEmit --pretty false --incremental false
npm run test
npm run lint
npm run build
```
