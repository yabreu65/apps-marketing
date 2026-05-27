# AI Provider Strategy — Apps Marketing

## Status
Active (updated in Phase 35B).

## Product decision
The project no longer uses local-model providers (Ollama) in runtime architecture.

Current strategy:
- **Local business rules** as deterministic baseline.
- **Gemini API** as primary external model provider (opt-in by flag).
- **OpenAI** reserved as future alternative provider.
- **No Ollama / no localhost:11434 / no local model dependencies** in runtime.

## Scope
This strategy applies to:
- Public chat assistant
- Internal lead summary helpers
- Internal reply suggestion helpers
- Future provider abstraction

This strategy does **not** remove deterministic logic:
- Diagnosis by rules
- Lead scoring by rules
- Validation and allowlists
- Safe fallbacks by rules

## Current runtime behavior
1. If external AI provider is disabled/unavailable, flows must remain functional through local deterministic rules.
2. External AI is called only in high-value moments (chat turn, explicit summary generation, explicit suggestion generation), never on render.
3. Product guardrails remain enforced regardless of provider.

## Provider roles
### Rules (primary baseline)
- Deterministic, auditable, low-cost.
- Used for continuity and fallback.

### Gemini API (primary external provider)
- Main external provider for commercial assistant tasks when enabled.
- Controlled through environment flags.

### OpenAI (future optional alternative)
- Not active now.
- Can be added behind provider abstraction without coupling business logic.

## Explicitly out
- Ollama runtime provider
- Local model flags and localhost runtime calls
- Product strategy that requires VPS for local model serving

## Design constraints
- No provider-specific business logic in UI components.
- Keep provider calls behind service-level modules.
- Keep deterministic fallback available for every critical user flow.
- Preserve API contracts when provider changes.

## Cost discipline
- AI calls only where commercial value is clear.
- Keep deterministic fallback for budget control.
- Avoid background/continuous calls that increase token spend without conversion impact.

## Migration note
Historical implementation docs may still reference earlier local-model phases for traceability, but they are no longer the active product strategy.
