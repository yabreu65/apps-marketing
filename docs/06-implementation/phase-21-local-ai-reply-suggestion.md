# Phase 21 — Local AI Reply Suggestion

## Status

Completed (local-only).

## Purpose

Agregar sugerencia local de respuesta en el panel de conversación simulada para asistir al operador humano, sin envío automático y sin persistencia de sugerencias.

## Scope

- Sin WhatsApp Cloud API / Meta API
- Sin envío real de mensajes
- Sin automatizaciones
- Sin OpenAI
- Ollama opcional (`ENABLE_LOCAL_AI_REPLY_SUGGESTION=true`)
- Fallback a reglas locales si Ollama falla
- Sin emails
- Sin deploy / producción / Vercel
- Sin DB externa
- Sin cambios auth/roles
- Sin cambios landing pública
- Sin persistencia de sugerencias

## Files Created

- `src/types/lead-reply-suggestion.ts`
- `src/lib/lead-reply-suggestion.ts`
- `src/lib/lead-reply-suggestion.test.ts`
- `src/lib/ai/lead-reply-suggestion-prompt.ts`
- `src/lib/lead-reply-suggestion-ai.ts`
- `src/app/api/admin/leads/[id]/conversation/suggestion/route.ts`
- `src/app/api/admin/leads/[id]/conversation/suggestion/route.test.ts`
- `docs/06-implementation/phase-21-local-ai-reply-suggestion.md`

## Files Modified

- `src/components/internal/LeadConversationPanel.tsx`
- `.env.example`

## Functional Behavior

En `LeadConversationPanel` se agregó acción:

- **Sugerir respuesta local**

Flujo:

1. Toma contexto del lead + últimos mensajes simulados.
2. Intenta generar sugerencia:
   - reglas locales (default)
   - Ollama opcional si está habilitado
   - fallback a reglas si Ollama falla
3. Muestra sugerencia en UI con:
   - texto sugerido
   - fuente (`rules`, `ollama`, `rules_fallback`)
   - rationale
4. Permite:
   - **Usar sugerencia** (carga texto en textarea, no guarda)
   - **Copiar sugerencia** (portapapeles)
5. No crea mensaje outbound hasta que el usuario presiona guardar manualmente.

## API Added

- `POST /api/admin/leads/[id]/conversation/suggestion`
- `GET` => `405`

La ruta:

- valida same-origin
- valida id
- carga lead + últimos mensajes
- genera sugerencia con `buildLeadReplySuggestionWithOptionalAI`
- responde JSON consistente

## Rules vs Ollama

Variables:

```env
ENABLE_LOCAL_AI_REPLY_SUGGESTION="false"
OLLAMA_BASE_URL="http://localhost:11434"
OLLAMA_MODEL="llama3:latest"
OLLAMA_TIMEOUT_MS="20000"
```

- `false` => siempre reglas locales (`source: rules`)
- `true` + Ollama OK => `source: ollama`
- `true` + Ollama caído/error => `source: rules_fallback`

## Safety

- No envía mensajes reales.
- No persiste sugerencias.
- No dispara acciones automáticas.
- El humano decide usar/copiar/guardar.

## Validation

```bash
npm run test
npm run lint
npm run build
```

Resultado:

- Tests ✅
- Lint ✅
- Build ✅
