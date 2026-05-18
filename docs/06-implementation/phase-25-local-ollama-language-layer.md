# Phase 25 - Local Ollama Language Layer

## Status

Implemented locally.

## Objective

Add an optional local Ollama language layer to improve public chat writing quality without replacing the existing business-rule engine.

## Architecture

The business pipeline remains in control:

1. Detect intent and conversation stage.
2. Build business-rule response.
3. Build structured `PublicChatDecision` object.
4. If AI feature flag is enabled, send decision + base response to local Ollama language rewriter.
5. Validate generated text.
6. If validation fails (or provider fails/disabled), return rules fallback.

AI only rewrites language. It does not decide strategy.

## Environment Variables

Expected variables for this phase:

```env
LEAD_ASSISTANT_AI_ENABLED=true
LEAD_ASSISTANT_AI_PROVIDER=ollama
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3.1:8b-instruct-q4_K_M
```

Compatibility kept:

- `ENABLE_LOCAL_AI_PUBLIC_ASSISTANT=true` is still accepted for legacy local flows.

## Flow and Components

- `src/modules/lead-assistant/core/public-chat-decision.ts`
  - Builds structured decision data (`intent`, `conversationSummary`, `recommendedPath`, `commercialGoal`, `cta`, `constraints`, etc.).

- `src/modules/lead-assistant/ai/ollama-client.ts`
  - Local HTTP client for `POST /api/generate`.
  - Reads phase variables and applies timeout.

- `src/modules/lead-assistant/ai/public-chat-language-prompt.ts`
  - Controlled prompt: model is a rewriter only.
  - Enforces no guaranteed sales claims and no invented integrations.

- `src/modules/lead-assistant/ai/generate-public-chat-natural-reply.ts`
  - Calls Ollama only when enabled.
  - Validates generated content.
  - Returns `rules_fallback` when disabled, failed, empty, or invalid.

- `src/modules/lead-assistant/server/public-chat-service.ts`
  - Integrates decision builder + optional natural language generation.

## Fallback Strategy

Fallback to rules is automatic when:

- Feature flag disabled.
- Provider is not `ollama`.
- Missing/invalid config.
- Timeout or network error.
- Empty/invalid model output.
- Output contains forbidden claims or out-of-scope content.

## Tests Added/Updated

- `src/modules/lead-assistant/tests/public-chat-decision.test.ts`
- `src/modules/lead-assistant/tests/generate-public-chat-natural-reply.test.ts`
- `src/modules/lead-assistant/tests/public-chat-service.test.ts` (updated AI mock integration)
- `src/modules/lead-assistant/tests/build-response.test.ts` (retail short-input coverage)
- `src/modules/lead-assistant/tests/detect-intent.test.ts` (extra scope-safe intent coverage)

## Scope Validation

Respected:

- No OpenAI.
- No Claude.
- No external APIs.
- No WhatsApp Cloud API real integration.
- No automatic message sending.
- No auth architecture changes.
- No dashboard changes.
- No deploy actions.

## Limitations

- Local Ollama quality depends on local model/hardware.
- The model is constrained as rewriter, so business strategy remains deterministic by rules.
- Legacy AI flag compatibility remains temporarily to avoid regression in existing local setups.

## Manual QA Matrix (Local)

Use this matrix to verify language quality and fallback safety in local runs.

### Setup A - Rules only

```env
LEAD_ASSISTANT_AI_ENABLED=false
LEAD_ASSISTANT_AI_PROVIDER=ollama
```

Expected: `source` should resolve to rules fallback path and commercial strategy stays deterministic.

### Setup B - Ollama enabled

```env
LEAD_ASSISTANT_AI_ENABLED=true
LEAD_ASSISTANT_AI_PROVIDER=ollama
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3.1:8b-instruct-q4_K_M
```

Expected: text sounds more natural, keeps same strategy, ends with useful next step/question.

### Scenarios

1. Input: `vendo ropa`
   - Expected strategy: retail-oriented diagnosis, no oversized solution promise.
   - Expected tone: natural, brief, consultive.
   - Expected guardrails: no guaranteed sales claims.

2. Input: `tengo una tienda de ropa`
   - Expected strategy: start with practical path (catalog/landing or qualified first step).
   - Expected guardrails: no invented integrations.

3. Input: `vendo por instagram y whatsapp`
   - Expected strategy: capture + follow-up channel clarity.
   - Expected follow-up: asks channel/process specifics.

4. Input: `pierdo muchas consultas`
   - Expected strategy: prioritize follow-up/organization before scaling demand.
   - Expected guardrails: no autonomous automation claims.

5. Input: `quiero vender online`
   - Expected strategy: phased recommendation, not full overbuild by default.
   - Expected follow-up: asks scope/timeline/channel.

6. Input: `necesito algo barato`
   - Expected strategy: scope-aware qualification before estimate.
   - Expected guardrails: no fixed price invention.

### Failure-path checks

1. Ollama disabled (`LEAD_ASSISTANT_AI_ENABLED=false`)
   - Expected: safe rules fallback response.

2. Ollama unavailable (stop local Ollama service)
   - Expected: safe rules fallback response, no user-facing technical error.

3. Invalid/empty model output
   - Expected: safe rules fallback response.

4. Forbidden claims in model output (simulated)
   - Expected: output rejected and replaced by rules fallback.
