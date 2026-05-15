# Phase 12D — AI Summary QA & Prompt Tuning

## Status

Completed (local QA + prompt tuning + fallback check).

## Scope

QA de calidad para resúmenes IA locales con Ollama, manteniendo fallback por reglas y sin persistencia.

## QA Environment

- `ENABLE_LOCAL_AI_SUMMARY="true"`
- `OLLAMA_BASE_URL="http://localhost:11434"`
- `OLLAMA_MODEL="llama3:latest"`
- `OLLAMA_TIMEOUT_MS="25000"`

## Evaluation Matrix

| Case | Source | Opportunity Type | Priority | Summary útil | Acción útil | No inventa datos | Sin promesas | No “contactado” sin nota | No automatización sin contexto | JSON válido | Fallback OK |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1. Landing comercial | ollama | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | N/A |
| 2. Sitio web profesional | ollama | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | N/A |
| 3. Sistema interno/dashboard | ollama | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | N/A |
| 4. MVP SaaS | ollama | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | N/A |
| 5. Automatización/IA | ollama | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | N/A |
| 6. Lead sin notas | ollama | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | N/A |
| 7. Lead con notas | ollama | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | N/A |
| 8. Status `new` | ollama | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | N/A |
| 9. Status `contacted` | ollama | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | N/A |
| 10. Status `proposal` | ollama | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | N/A |
| Fallback forced (Ollama caído) | rules_fallback | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

## Findings

1. Se detectó inicialmente inconsistencia de prioridad y clasificación genérica.
2. Se ajustó el prompt con mapeo obligatorio de `serviceInterest -> opportunityType`.
3. Se reforzó prioridad con normalización determinística local en `buildLeadSummaryWithOptionalAI`.
4. Se validó fallback seguro con `source: rules_fallback` al simular Ollama no disponible.

## Prompt Tuning Applied

- Forzado de idioma español profesional.
- Mapeo explícito de tipo de oportunidad según servicio.
- Regla explícita de prioridad por status/urgencia.
- Restricción de longitud y acción concreta.
- Limitación de contexto (notas/historial recientes) para reducir latencia.

## Validation

- `npm run lint` ✅
- `npm run build` ✅

## Notes

- No se guardan summaries en DB.
- No se usan servicios externos.
- No se usa OpenAI.
