# Phase 29A — Remove Ollama Runtime Dependency

## Objetivo
Desactivar Ollama del flujo runtime activo para que el backend funcione sin dependencia obligatoria de `localhost:11434`, manteniendo fallback por reglas y dejando la integración local como opción futura.

## Auditoría de uso actual

### Variables detectadas
- `.env.example`
  - `OLLAMA_BASE_URL`
  - `OLLAMA_MODEL`
  - `ENABLE_LOCAL_AI_SUMMARY`
  - `ENABLE_LOCAL_AI_REPLY_SUGGESTION`
  - `LEAD_AGENT_ENABLED`
  - `LEAD_AGENT_PROVIDER`

### Código que puede llamar Ollama (solo si flags lo habilitan)
- `src/lib/ai/ollama-provider.ts` (resumen IA interno)
- `src/lib/lead-reply-suggestion-ai.ts` (sugerencia de respuesta interna)
- `src/modules/lead-assistant/ai/ollama-client.ts` (cliente legado de asistente)
- `src/modules/lead-assistant/agent/ollama-agent-client.ts` (cliente agente legado)
- `src/modules/lead-assistant/ai/public-chat-ai.ts` (módulo legado)

### Rutas/API impactadas
- `/api/admin/leads/[id]/summary` usa `buildLeadSummaryWithOptionalAI` con fallback por reglas.
- `/api/admin/leads/[id]/conversation/suggestion` usa `buildLeadReplySuggestionWithOptionalAI` con fallback por reglas.
- `/api/public/chat` actualmente usa agente Gemini/rules fallback, no Ollama runtime por defecto.

### Build / Tests / Dashboard / Chat público
- Build: no requiere Ollama.
- Tests: no requieren Ollama (se usan mocks y flags disabled por defecto).
- Dashboard: funciona sin Ollama mediante reglas.
- Chat público: no depende de Ollama por defecto (feature flags deshabilitadas).

## Cambios aplicados

1. `.env.example`
- `LEAD_AGENT_PROVIDER="ollama"` -> `LEAD_AGENT_PROVIDER="rules"`

2. `src/modules/lead-assistant/agent/ollama-agent-client.ts`
- default provider cambiado de `ollama` a `rules` para evitar inicialización accidental.

3. `src/modules/lead-assistant/ai/ollama-client.ts`
- default provider cambiado de `ollama` a `rules` para evitar uso accidental.

## Comportamiento por defecto resultante
- `ENABLE_LOCAL_AI_SUMMARY=false`
- `LEAD_AGENT_ENABLED=false`
- `LEAD_AGENT_PROVIDER=rules`

Con esta base, ninguna ruta pública/interna necesita `localhost:11434` para operar.

## Validaciones
- `npm run test` ✅
- `npm run lint` ✅
- `npm run build` ✅

## Alcance respetado
- Sin cambios de DB/Prisma/auth.
- Sin cambios de despliegue.
- Sin eliminar archivos de integración futura (solo aislados/desactivados por defecto).
