# Phase 22.2 — Public Chat Memory QA & Conversation Quality

## Status

Completed (local QA + conversation quality polish).

## Purpose

Validar y mejorar la calidad conversacional del chat público con memoria persistente local, manteniendo todo local-first y sin servicios externos.

## Scope

- QA funcional del módulo `src/modules/lead-assistant`.
- Ajustes de calidad en detección de intención y tono de continuidad de memoria.
- Sin cambios de arquitectura grande.
- Sin cambios en backend externo, auth, dashboard interno, Prisma schema o deploy.

## Files Reviewed

- `/Users/yoryiabreu/proyectos/apps-marketing/src/modules/lead-assistant/components/PublicLeadAssistantWidget.tsx`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/modules/lead-assistant/core/detect-intent.ts`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/modules/lead-assistant/core/build-response.ts`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/modules/lead-assistant/core/memory-summary.ts`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/modules/lead-assistant/core/safety-rules.ts`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/modules/lead-assistant/core/suggested-actions.ts`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/modules/lead-assistant/server/public-chat-service.ts`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/modules/lead-assistant/server/public-memory-service.ts`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/modules/lead-assistant/config/appsMarketingAssistantConfig.ts`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/app/api/public/chat/route.ts`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/app/api/public/chat/memory/route.ts`

## Quality Findings

1. **Intent over-trigger risk**
   - `lead_followup_priority` se activaba demasiado fácil por menciones de WhatsApp/Instagram.
   - Riesgo: recomendar seguimiento/dashboard en casos que en realidad son de captación (landing).

2. **Memory continuity tone**
   - El texto de continuidad funcionaba, pero podía sonar técnico.
   - Se ajustó para que sea más natural y menos invasivo.

3. **Memory summary readability**
   - El resumen persistido usaba claves técnicas (`dashboard`, `mvp_saas`, etc.).
   - Se cambió a etiquetas comerciales legibles para mejor reutilización conversacional.

## Changes Applied

### 1) Intent detection hardening

File:
- `/Users/yoryiabreu/proyectos/apps-marketing/src/modules/lead-assistant/core/detect-intent.ts`

Cambios:
- Se reforzó `lead_followup_priority` para requerir señales reales de pérdida/seguimiento/priorización.
- Se removió el disparo excesivo por simple mención de WhatsApp/Instagram.

Impacto:
- Mejora la diferenciación entre captación vs seguimiento.

### 2) Memory continuity copy

File:
- `/Users/yoryiabreu/proyectos/apps-marketing/src/modules/lead-assistant/core/build-response.ts`

Cambio:
- Mensaje de continuidad actualizado a tono más natural:
  - de “También recuerdo…” a “Si te sirve, tomo como referencia…”.

### 3) Human-readable memory summary

File:
- `/Users/yoryiabreu/proyectos/apps-marketing/src/modules/lead-assistant/core/memory-summary.ts`

Cambio:
- Se agregaron labels de intención en lenguaje comercial para `summary` persistido.

## Tests Updated

- `/Users/yoryiabreu/proyectos/apps-marketing/src/modules/lead-assistant/tests/detect-intent.test.ts`
  - nuevo caso para evitar falso positivo de seguimiento al mencionar WhatsApp en contexto de captación.
- `/Users/yoryiabreu/proyectos/apps-marketing/src/modules/lead-assistant/tests/memory-summary.test.ts`
  - validación del nuevo label legible en resumen de memoria.

## QA Conversation Goals Coverage

- Entender intención: ✅
- Recordar contexto previo de forma natural: ✅
- Diferenciar captación vs seguimiento: ✅ (mejorado)
- No vender IA como primer paso automático: ✅
- Guiar por diagnóstico/fases: ✅
- CTA a formulario/WhatsApp manual: ✅
- Borrar memoria: ✅ (API DELETE y widget)

## Validation Commands

```bash
npm run db:seed:local
npm run test
npm run lint
npm run build
```

## Validation Results

- `db:seed:local`: OK
- `test`: OK (28 files, 133 tests passing)
- `lint`: OK
- `build`: OK

## Scope Validation

- No deploy.
- No producción.
- No Vercel.
- No segunda DB.
- No WhatsApp real / Meta.
- No OpenAI.
- No automatizaciones.
- No emails.
- No cambios auth/roles.
- No split frontend/backend.
- Sin cambios en dashboard interno.

## Recommended Next Step

Fase 22.3 — ampliar QA conversacional con matriz de prompts reales (not_sure, pricing, followup, MVP, IA) y snapshot tests de respuesta para evitar regresiones de tono/intención.
