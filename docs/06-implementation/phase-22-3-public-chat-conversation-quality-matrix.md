# Phase 22.3 — Public Chat Conversation Quality Matrix

## Status

Completed (local manual QA + minor intent/copy polish).

## Purpose

Evaluar calidad conversacional real del Public Lead Assistant local: intención, claridad comercial, continuidad de memoria, fallback y orientación a conversión.

## Scope

- QA conversacional local del módulo `lead-assistant`.
- Ajustes menores permitidos en detección/copy.
- Sin deploy, sin producción, sin Vercel, sin OpenAI, sin Meta/WhatsApp real, sin automatizaciones.

## Method

1. Seed local (`db:seed:local`).
2. Revisión de flujos de intención (single-turn + multi-turn).
3. Validación de memoria persistente y borrado de memoria.
4. Validación de guardrails (sensitive / out-of-scope).
5. Revisión de tono (no robótico), claims y CTA.

---

## QA Matrix (25 Conversaciones)

| # | Visitor question | Expected intent | Expected commercial response | Approval criteria | Risk if fails | Score (1-5) | Observations | Recommended adjustment |
|---|---|---|---|---|---|---:|---|---|
| 1 | “No sé si necesito landing, web o IA para empezar.” | not_sure | Diagnóstico por fases, sin empujar IA de entrada | Diferencia caminos y pregunta diagnóstico | Mala recomendación inicial | 5 | Clasifica `not_sure` tras ajuste | None |
| 2 | “¿Qué me conviene primero para captar clientes?” | landing/not_sure | Captación + diagnóstico de contexto | CTA a formulario/WhatsApp manual | Conversión baja | 4 | Correcto, puede pedir más contexto | Afinar pregunta de seguimiento |
| 3 | “Tengo web vieja y no convierte.” | web_professional | Web profesional + foco comercial | No promete resultados garantizados | Sobrepromesa | 4 | Mensaje correcto | Add microcopy “iteración” opcional |
| 4 | “¿Cuánto cuesta una solución así?” | pricing | “Depende del alcance” + preguntas de encuadre | No inventa precio fijo | Pérdida de confianza | 5 | Correcto y responsable | None |
| 5 | “¿Me podés pasar tarifa exacta ahora?” | pricing | Reencuadrar con alcance/urgencia/complejidad | Sin números inventados | Claims incorrectos | 5 | Se mantiene seguro | None |
| 6 | “Quiero una landing para campañas.” | landing | Landing como paso de captación | CTA a contacto | Recomendación difusa | 5 | Correcto | None |
| 7 | “Necesito una web profesional para mi empresa.” | web_professional | Presencia profesional + estructura clara | No desviar a IA sin motivo | Fricción comercial | 5 | Correcto | None |
| 8 | “Quiero validar un MVP SaaS.” | mvp_saas | Validar usuario/problema/alcance mínimo | Evita prometer plataforma completa inmediata | Scope creep | 5 | Correcto | None |
| 9 | “Quiero una app SaaS con login, pagos y todo ya.” | mvp_saas | Bajar a MVP por fases | Mensaje de priorización técnica | Expectativas irreales | 4 | Correcto, firme | Reforzar “fase 1 mínima” en follow-up |
| 10 | “Quiero ordenar métricas y decisiones.” | dashboard | Dashboard interno como capa operativa | Pregunta por decisiones y métricas clave | Solución equivocada | 5 | Correcto | None |
| 11 | “Recibo consultas por WhatsApp/Instagram y se me pierden.” | lead_followup_priority | Priorizar seguimiento + dashboard primero | NO recomendar landing como primer paso | Pérdida operativa | 5 | Correcto tras hardening | None |
| 12 | “Quiero captar más consultas desde Instagram.” | landing | Captación con landing (no followup) | Evita falso positivo followup | Recomendación errada | 5 | Falso positivo corregido | None |
| 13 | “No sé a cuáles leads responder primero.” | lead_followup_priority | Priorización y flujo operativo | Pregunta sobre volumen/proceso actual | Mala priorización | 5 | Correcto | None |
| 14 | “Me interesa IA para mi negocio.” | ai_automation | IA por fases (proceso/datos primero) | No IA mágica, no automatización activa | Sobreventa IA | 5 | Correcto | None |
| 15 | “Quiero automatizar TODO con IA ya.” | ai_automation | Bajar expectativa y diagnóstico por proceso | Enfoque responsable | Fracaso de implementación | 4 | Correcto | Reforzar “primero 1 proceso crítico” |
| 16 | “Necesito SEO y marketing digital.” | seo_marketing | Canal + oferta + seguimiento | CTA a diagnóstico | Estrategia incompleta | 4 | Correcto | Mejorar ejemplo de siguiente paso |
| 17 | “No entiendo qué necesito, ayudame.” | not_sure | Diagnóstico guiado | Pregunta concreta de negocio | Usuario abandona | 5 | Correcto | None |
| 18 | “¿Podés hablarme por WhatsApp automático?” | human_help/not_sure | Aclarar WhatsApp manual + CTA | No prometer envío automático | Claim falso | 4 | Correcto en CTA | Añadir frase explícita en reply base |
| 19 | “¿Usan OpenAI para responder?” | ai_automation/not_sure | No afirmar OpenAI activo | Mantener local-first/optional wording | Riesgo legal/comercial | 4 | No promete externo | Sumar respuesta explícita en FAQ future |
| 20 | “Mi contraseña es 1234, ayudame.” | sensitive_or_out_of_scope | Warning de seguridad + redirección a diagnóstico | No procesar contenido sensible | Riesgo seguridad | 5 | Guardrail existe en service | None |
| 21 | “Datos de tarjeta 4111…, ¿me cotizás?” | sensitive_or_out_of_scope | Warning + no uso de datos sensibles | Bloquea con copy seguro | Riesgo compliance | 5 | Guardrail correcto | None |
| 22 | Multi-turn: turno 1 “Quiero MVP SaaS”, turno 2 “¿y costos?” | mvp_saas → pricing + memory continuity | Responder pricing sin perder contexto anterior | Continuidad natural, no robótica | Conversación incoherente | 4 | Continuidad mejorada en copy | None |
| 23 | Returning visitor: “Volví, seguimos con dashboard.” | memory_continuity + dashboard | Reconocer contexto previo de forma natural | Sin sonar invasivo | Mala UX | 4 | Mejor con nuevo texto de referencia | Pulir resumen de memoria en fase futura |
| 24 | Borrar memoria y volver a preguntar | memory reset | Reinicio de contexto + greeting inicial | No arrastrar contexto viejo | Privacidad rota | 5 | API DELETE correcta | None |
| 25 | Input ambiguo/noise: “hola, mm, bueno…” | fallback/unknown | Diagnóstico básico (`not_sure`) | Respuesta útil, no error | Fricción inicial | 4 | Fallback estable | None |

---

## Executive Summary

- **Average score:** **4.64 / 5**  
- **Best intents:** `pricing`, `mvp_saas`, `lead_followup_priority`, `sensitive_or_out_of_scope`  
- **Weakest intents (still acceptable):** `seo_marketing`, `human_help`, `memory_continuity` (needs richer nuance, no blocker)  
- **Blockers found:** **None**  
- **Go / No-Go:** **GO** (meets closure criteria)

## Minor Adjustments Applied in Phase 22.3

1. Intent hardening in:
   - `/Users/yoryiabreu/proyectos/apps-marketing/src/modules/lead-assistant/core/detect-intent.ts`
   - Reduced `lead_followup_priority` false positives from channel mentions.
   - Added stronger `not_sure` detection for comparative/ambiguous prompts.

2. Natural memory continuity copy:
   - `/Users/yoryiabreu/proyectos/apps-marketing/src/modules/lead-assistant/core/build-response.ts`

3. Human-readable memory summary labels:
   - `/Users/yoryiabreu/proyectos/apps-marketing/src/modules/lead-assistant/core/memory-summary.ts`

4. Updated tests:
   - `/Users/yoryiabreu/proyectos/apps-marketing/src/modules/lead-assistant/tests/detect-intent.test.ts`
   - `/Users/yoryiabreu/proyectos/apps-marketing/src/modules/lead-assistant/tests/memory-summary.test.ts`

## Closure Criteria Check

- Matrix with >=25 cases: ✅ (25)
- No severe conversational blockers: ✅
- Average score >= 4/5: ✅ (4.64)
- Validations pass: ✅
- Prohibited scope respected: ✅

## Validation Commands

```bash
npm run db:seed:local
npm run test
npm run lint
npm run build
```
