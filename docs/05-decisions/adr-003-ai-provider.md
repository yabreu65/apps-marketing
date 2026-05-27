# ADR-003 — AI Provider Strategy

## Status
Accepted (supersedes previous local-model-first variant).

## Date
2026-05-27

## Context
The project needs controlled AI usage without increasing infrastructure complexity or fixed hosting cost.
Local-model runtime (Ollama) introduces operational overhead (VPS sizing, uptime management, deployment friction) not justified for the current product stage.

## Decision
Adopt this provider strategy:
1. **Deterministic local business rules** remain the default operational baseline.
2. **Gemini API** is the primary external model provider when AI is enabled.
3. **OpenAI** remains a future optional alternative provider.
4. **Ollama/local-model runtime is removed from active architecture**.

## What stays
- Diagnosis by rules
- Lead scoring by rules
- Rules-based commercial fallback
- Local validations/allowlists
- Deterministic templates and guardrails

## What is removed/deprecated
- Ollama runtime provider
- Local-model runtime flags
- Runtime references to `localhost:11434`
- Product guidance that recommends local-model serving as active strategy

## Rationale
- Lower operational risk.
- Lower deployment complexity.
- Better alignment with pay-per-use external AI at current scale.
- Maintains business continuity through deterministic rules when AI is off/unavailable.

## Consequences
### Positive
- Simpler runtime and environment management.
- Clear separation between deterministic logic and optional external AI.
- Better path to managed deployments.

### Tradeoffs
- External provider dependency for AI-enhanced responses.
- Need strict call governance for budget control.

## Guardrails
- No AI calls in render loops.
- AI calls only in explicit high-value actions.
- Rule-based fallback must remain available in critical flows.
- No direct provider coupling in UI/business components.

## Future extension
OpenAI can be introduced later behind the same provider abstraction, without changing business contracts.
