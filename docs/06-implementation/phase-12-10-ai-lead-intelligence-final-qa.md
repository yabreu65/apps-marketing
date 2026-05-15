# Phase 12.10 — AI / Lead Intelligence Final QA

## Status

Completed.

## Purpose

Validar el módulo local de inteligencia de leads antes de avanzar a persistencia, producción o WhatsApp real.

## Features Reviewed

- Rule-based lead summary.
- Optional Ollama lead summary.
- Manual summary regeneration.
- Fallback behavior.
- Prompt QA/tuning.
- Rule-based lead scoring.
- Notes/status/timeline context.

## QA Matrix

| Case | Summary Source | Score Level | Result | Notes |
|---|---|---|---|---|
| 1. Lead nuevo sin notas (`cmp6xd1500000kqwsk1p71uq1`) | ollama | medium | ✅ | Mensaje corto penaliza score; resumen coherente. |
| 2. Lead contactado con notas (`cmp6wkojy00060fws7nmd4r30`) | ollama | high | ✅ | Score sube por status + notas + trazabilidad. |
| 3. Lead interés MVP SaaS (`cmp6wkokm00070fwsljnchblc`) | ollama | high | ✅ | Oportunidad y acción alineadas a propuesta. |
| 4. Lead sitio web profesional (`cmp6wkoe300010fwsr6y52nb6`) | ollama | medium | ✅ | Resumen claro sin inventar datos. |
| 5. Lead interés landing (`cmp6xdfc20000h8wske0siw2y`) | ollama | low | ✅ | Estaba archivado, score bajo correcto. |
| 6. Lead interés automatización/IA (`cmp6wkohk00040fwsxhrm4e64`) | ollama | medium | ✅ | Mantiene tono evaluativo, sin prometer automatización activa. |
| 7. Lead con mensaje corto (`cmp6xd1500000kqwsk1p71uq1`) | ollama | medium | ✅ | Señal de riesgo mostrada en scoring. |
| 8. Lead con mensaje claro/completo (`cmp6wkoe300010fwsr6y52nb6`) | ollama | medium | ✅ | Resumen accionable. |
| 9. Lead con status proposal (`cmp6wkokm00070fwsljnchblc`) | ollama | high | ✅ | Prioridad alta consistente. |
| 10. Lead archivado (`cmp6xdfc20000h8wske0siw2y`) | ollama | low | ✅ | No hubo cambios automáticos de status. |

## AI Modes Tested

| Mode | Expected | Result |
|---|---|---|
| `ENABLE_LOCAL_AI_SUMMARY=false` | source `rules` | ✅ |
| `ENABLE_LOCAL_AI_SUMMARY=true` + Ollama activo | source `ollama` | ✅ |
| `ENABLE_LOCAL_AI_SUMMARY=true` + URL inválida | source `rules_fallback` | ✅ |

Lead Score se mantuvo estable y funcional en los tres modos (independiente de proveedor IA).

## Findings

- Correcto: resumen, fallback, regeneración manual, y score explicable funcionan de punta a punta.
- Correcto: no se detectaron cambios automáticos de status/lead.
- Correcto: no se persiste summary ni score.
- Ajuste menor detectado: en casos archivados, el `recommendedAction` del resumen IA puede seguir proponiendo contacto; no es bloqueante, pero conviene tunearlo por status en una fase posterior.

## Known Limits

- Summaries no se persisten.
- Scores no se persisten.
- No hay versionado de IA.
- No hay comparación histórica.
- No hay evaluación automática de calidad.
- No es producción-ready.
- Ollama depende de hardware local.
- Timeout configurable por entorno (`OLLAMA_TIMEOUT_MS`).

## Safety Validation

- No OpenAI.
- No servicios externos.
- No acciones automáticas.
- No WhatsApp sending.
- No cambios automáticos de status.
- No persistencia de summary/score.
- API `/api/admin/leads/[id]/summary` con origin guard activo.
- Dashboard interno protegido por auth local.

## Recommended Next Options

1. Fase 12F — Persistir summary/score con historial.
2. Fase 13 — Producción DB plan.
3. Fase 14 — Auth real con usuarios/roles.
4. Fase 15 — WhatsApp Cloud API real.
5. Fase 16 — AI Lead Assistant conversacional completo.

### Recomendación preferida

- Si querés trazabilidad de decisiones comerciales: **Fase 12F**.
- Si querés preparar operación real primero: **Fase 13**.
