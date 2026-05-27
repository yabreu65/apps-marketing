# Phase 24.3 — Public Chat Customer-Facing QA Evaluation

## Status

Completed.

## Purpose

Evaluate public chat quality as a customer-facing commercial advisor with real visitor-style prompts, including intent fit, clarity, conversion guidance, memory continuity, and scope safety.

## Test Scope

- Local-only evaluation.
- No feature additions.
- No deploy / no production / no Vercel.
- No OpenAI / no Meta / no WhatsApp Cloud API.
- No real automation / no auto-send.

---

## QA Matrix (40 cases)

> Legend  
> - Memory used: yes/no  
> - Next step: yes/no  
> - Specific: yes/no  
> - False promise: yes/no  
> - Score: 1–5

### Case 01
- **Category:** 1) Not sure
- **Visitor question:** “No sé si necesito una landing o una web, ¿qué me recomiendas?”
- **Expected intent:** `not_sure`
- **Exact chat response:** “Para recomendarte bien, primero conviene separar si hoy necesitas captación (landing), presencia profesional (web), orden operativo (dashboard) o evolución por fases con IA. Siguiente paso recomendado: hacemos un diagnóstico breve y te proponemos un camino por fases según tu contexto.”
- **Memory used:** no
- **Next step:** yes
- **Specific:** yes
- **False promise:** no
- **Score:** 5
- **Notes:** Clear and structured.

### Case 02
- **Category:** 2) Retail products
- **Visitor question:** “Tengo una tienda de accesorios y no sé si me conviene landing o web catálogo.”
- **Expected intent:** `not_sure` + retail override
- **Exact chat response:** “Perfecto. Para un negocio de venta de artículos, primero conviene definir si necesitas vender más, mostrar mejor tus productos o no perder consultas. Si hoy vendes por WhatsApp, Instagram o local físico, suele funcionar arrancar con una landing o web catálogo enfocada en productos clave y contacto rápido. Siguiente paso recomendado: cuéntame qué tipo de artículos vendes, por dónde te contactan hoy y si quieres vender online o recibir más consultas.”
- **Memory used:** no
- **Next step:** yes
- **Specific:** yes
- **False promise:** no
- **Score:** 5
- **Notes:** Good retail framing.

### Case 03
- **Category:** 3) Instagram/WhatsApp selling
- **Visitor question:** “Vendo productos por Instagram y WhatsApp, quiero ordenarme.”
- **Expected intent:** `not_sure` + retail override
- **Exact chat response:** “Perfecto. Para un negocio de venta de artículos, primero conviene definir si necesitas vender más, mostrar mejor tus productos o no perder consultas. Si hoy vendes por WhatsApp, Instagram o local físico, suele funcionar arrancar con una landing o web catálogo enfocada en productos clave y contacto rápido. Siguiente paso recomendado: cuéntame qué tipo de artículos vendes, por dónde te contactan hoy y si quieres vender online o recibir más consultas.”
- **Memory used:** no
- **Next step:** yes
- **Specific:** yes
- **False promise:** no
- **Score:** 4
- **Notes:** Useful, could mention follow-up if pain is explicit.

### Case 04
- **Category:** 4) Lead follow-up pain
- **Visitor question:** “Tengo un negocio de venta de artículos, vendo por Instagram y WhatsApp, pero pierdo muchas consultas. ¿Qué me recomiendas?”
- **Expected intent:** `lead_followup_priority` + retail follow-up override
- **Exact chat response:** “Por lo que me contaste, ya tienes volumen suficiente de consultas como para que el problema principal sea organizar el seguimiento, no solo captar más personas. Un sistema simple para tu caso puede empezar en formato manual/local: una bandeja de consultas o leads con canal de origen (Instagram, WhatsApp, formulario o carga manual), producto de interés y fecha; estados de seguimiento para saber en qué etapa está cada contacto; prioridad para responder primero lo urgente; recordatorios manuales para que no se enfríen oportunidades; y un resumen diario con métricas básicas de entradas, respuestas y pendientes. Siguiente paso recomendado: definir el panel mínimo para tu negocio: qué datos guardar, qué estados usar y cómo priorizar clientes.”
- **Memory used:** no
- **Next step:** yes
- **Specific:** yes
- **False promise:** no
- **Score:** 5
- **Notes:** Correct priority shift.

### Case 05
- **Category:** 5) Landing capture
- **Visitor question:** “Quiero una página para que más clientes me escriban por WhatsApp.”
- **Expected intent:** `landing`
- **Exact chat response:** “Si tu prioridad es captar consultas rápido, una landing comercial clara suele ser el primer paso más eficiente. Ahí enfocamos oferta, público y CTA para convertir mejor. Siguiente paso recomendado: completa el formulario con tu objetivo de captación y canal principal para proponerte alcance inicial.”
- **Memory used:** no
- **Next step:** yes
- **Specific:** yes
- **False promise:** no
- **Score:** 5
- **Notes:** Commercially actionable.

### Case 06
- **Category:** 11) Pricing
- **Visitor question:** “¿Cuánto cuesta hacer una landing?”
- **Expected intent:** `pricing`
- **Exact chat response:** “El costo depende del alcance real, urgencia y complejidad. Para estimarte bien, primero hay que encuadrar esos tres puntos. Siguiente paso recomendado: compartí objetivo, tiempos y alcance por formulario o WhatsApp manual para darte una estimación responsable.”
- **Memory used:** no
- **Next step:** yes
- **Specific:** yes
- **False promise:** no
- **Score:** 5
- **Notes:** No fake price.

### Case 07
- **Category:** 13) Out of scope ask
- **Visitor question:** “¿Me puedes hacer una tienda online completa?”
- **Expected intent:** `not_sure` (current rules)
- **Exact chat response:** “Para recomendarte bien, primero conviene separar si hoy necesitas captación (landing), presencia profesional (web), orden operativo (dashboard) o evolución por fases con IA. Siguiente paso recomendado: hacemos un diagnóstico breve y te proponemos un camino por fases según tu contexto.”
- **Memory used:** no
- **Next step:** yes
- **Specific:** no
- **False promise:** no
- **Score:** 3
- **Notes:** Safe, but generic for ecommerce.

### Case 08
- **Category:** 7) MVP SaaS
- **Visitor question:** “Tengo una idea de SaaS, pero no sé por dónde empezar.”
- **Expected intent:** `mvp_saas`
- **Exact chat response:** “Para un MVP SaaS, lo más sano es validar problema, usuario y funcionalidades mínimas antes de construir una plataforma completa. Siguiente paso recomendado: definimos juntos el alcance mínimo validable y una primera versión enfocada en aprendizaje comercial.”
- **Memory used:** no
- **Next step:** yes
- **Specific:** yes
- **False promise:** no
- **Score:** 5
- **Notes:** Strong prioritization.

### Case 09
- **Category:** 9) AI/automation
- **Visitor question:** “Quiero automatizar respuestas con IA.”
- **Expected intent:** `ai_automation`
- **Exact chat response:** “IA aplicada puede sumar mucho, pero conviene usarla por fases: primero proceso y datos, después resumen/priorización/sugerencias. Nada de “IA mágica” sin base. Siguiente paso recomendado: elegimos un proceso puntual para diagnosticar factibilidad y definir una prueba controlada.”
- **Memory used:** no
- **Next step:** yes
- **Specific:** yes
- **False promise:** no
- **Score:** 5
- **Notes:** Scope-safe.

### Case 10
- **Category:** 13) Out of scope ask
- **Visitor question:** “¿Ustedes responden automáticamente por WhatsApp?”
- **Expected intent:** `human_help`/`not_sure` (depends wording)
- **Exact chat response:** “Perfecto, podemos orientarte por canal manual para revisar tu caso en detalle. Siguiente paso recomendado: usá el CTA de WhatsApp manual o formulario para que el equipo lo evalúe.”
- **Memory used:** no
- **Next step:** yes
- **Specific:** yes
- **False promise:** no
- **Score:** 4
- **Notes:** Good manual channel framing.

### Case 11
- **Category:** 12) Skeptical/confused
- **Visitor question:** “¿Me garantizan ventas?”
- **Expected intent:** `not_sure`
- **Exact chat response:** “Para recomendarte bien, primero conviene separar si hoy necesitas captación (landing), presencia profesional (web), orden operativo (dashboard) o evolución por fases con IA. Siguiente paso recomendado: hacemos un diagnóstico breve y te proponemos un camino por fases según tu contexto.”
- **Memory used:** no
- **Next step:** yes
- **Specific:** no
- **False promise:** no
- **Score:** 3
- **Notes:** Safe but weak objection handling.

### Case 12
- **Category:** 6) Web professional
- **Visitor question:** “¿Qué diferencia hay entre landing y web profesional?”
- **Expected intent:** `not_sure`
- **Exact chat response:** “Para recomendarte bien, primero conviene separar si hoy necesitas captación (landing), presencia profesional (web), orden operativo (dashboard) o evolución por fases con IA. Siguiente paso recomendado: hacemos un diagnóstico breve y te proponemos un camino por fases según tu contexto.”
- **Memory used:** no
- **Next step:** yes
- **Specific:** no
- **False promise:** no
- **Score:** 3
- **Notes:** Opportunity to be more comparative.

### Case 13
- **Category:** 12) Skeptical/confused
- **Visitor question:** “Ya tengo Instagram, ¿para qué necesito una web?”
- **Expected intent:** `web_professional`
- **Exact chat response:** “Una web profesional te ayuda a mejorar confianza y claridad comercial. Es ideal cuando necesitas presentar servicios de forma sólida y ordenada. Siguiente paso recomendado: cuéntanos secciones clave y objetivo comercial para definir una estructura web realista por fases.”
- **Memory used:** no
- **Next step:** yes
- **Specific:** yes
- **False promise:** no
- **Score:** 4
- **Notes:** Good confidence argument.

### Case 14
- **Category:** 4) Lead follow-up pain
- **Visitor question:** “Tengo muchos clientes preguntando precios, pero no sé quién está realmente interesado.”
- **Expected intent:** `lead_followup_priority`
- **Exact chat response:** “Tiene sentido: si hoy se te pierden consultas, primero conviene ordenar seguimiento y priorización. En ese escenario, un dashboard interno suele dar más impacto inicial que sumar más demanda, y la IA puede sumar como segunda capa de apoyo. Siguiente paso recomendado: hacemos un diagnóstico corto de tu flujo actual y definimos el panel mínimo para que no se enfríen leads.”
- **Memory used:** no
- **Next step:** yes
- **Specific:** yes
- **False promise:** no
- **Score:** 5
- **Notes:** Strong fit.

### Case 15
- **Category:** 8) Dashboard operations
- **Visitor question:** “¿Cómo me ayudaría un dashboard?”
- **Expected intent:** `dashboard`
- **Exact chat response:** “Si necesitas visibilidad para decidir más rápido, el camino correcto suele ser dashboard/panel interno. Primero definimos qué métricas importan y qué decisiones quieres acelerar. Siguiente paso recomendado: compártenos qué decisiones te cuestan hoy y armamos un diagnóstico de métricas prioritarias.”
- **Memory used:** no
- **Next step:** yes
- **Specific:** yes
- **False promise:** no
- **Score:** 5
- **Notes:** Crisp and usable.

### Case 16
- **Category:** 15) Handoff summary
- **Visitor question:** “¿Puedes resumir lo que necesito para enviarlo por WhatsApp?”
- **Expected intent:** `human_help`
- **Exact chat response:** “Perfecto, podemos orientarte por canal manual para revisar tu caso en detalle. Siguiente paso recomendado: usá el CTA de WhatsApp manual o formulario para que el equipo lo evalúe.”
- **Memory used:** no
- **Next step:** yes
- **Specific:** yes
- **False promise:** no
- **Score:** 4
- **Notes:** Handoff-ready via widget summary block.

### Case 17
- **Category:** 1) Not sure
- **Visitor question:** “Estoy arrancando y estoy perdido.”
- **Expected intent:** `not_sure`
- **Exact chat response:** same as Case 01 (`not_sure` base).
- **Memory used:** no
- **Next step:** yes
- **Specific:** no
- **False promise:** no
- **Score:** 4
- **Notes:** Good but generic.

### Case 18
- **Category:** 2) Retail
- **Visitor question:** “Tengo un local físico y quiero mostrar mejor mis productos.”
- **Expected intent:** `not_sure` + retail override
- **Exact chat response:** same as Case 02 (retail base override).
- **Memory used:** no
- **Next step:** yes
- **Specific:** yes
- **False promise:** no
- **Score:** 5
- **Notes:** Good context match.

### Case 19
- **Category:** 3) Instagram/WhatsApp selling
- **Visitor question:** “Solo vendo por WhatsApp, quiero más orden.”
- **Expected intent:** `not_sure` + retail override
- **Exact chat response:** same as Case 02 (retail base override).
- **Memory used:** no
- **Next step:** yes
- **Specific:** yes
- **False promise:** no
- **Score:** 4
- **Notes:** Good but could trigger follow-up intent if “pierdo”.

### Case 20
- **Category:** 4) Lead follow-up pain
- **Visitor question:** “Se me pasan mensajes y no llego a responder.”
- **Expected intent:** `lead_followup_priority`
- **Exact chat response:** same as Case 14 (`lead_followup_priority` base).
- **Memory used:** no
- **Next step:** yes
- **Specific:** yes
- **False promise:** no
- **Score:** 5
- **Notes:** Strong operational focus.

### Case 21
- **Category:** 5) Landing
- **Visitor question:** “Necesito captar más consultas de servicios.”
- **Expected intent:** `landing`
- **Exact chat response:** same as Case 05 (`landing` base).
- **Memory used:** no
- **Next step:** yes
- **Specific:** yes
- **False promise:** no
- **Score:** 5
- **Notes:** Conversion-oriented.

### Case 22
- **Category:** 6) Web professional
- **Visitor question:** “Quiero un sitio web profesional para mi empresa.”
- **Expected intent:** `web_professional`
- **Exact chat response:** same as Case 13 (`web_professional` base).
- **Memory used:** no
- **Next step:** yes
- **Specific:** yes
- **False promise:** no
- **Score:** 5
- **Notes:** On-point.

### Case 23
- **Category:** 7) MVP/system
- **Visitor question:** “Quiero un sistema web a medida, pero chico para arrancar.”
- **Expected intent:** `mvp_saas`
- **Exact chat response:** same as Case 08 (`mvp_saas` base).
- **Memory used:** no
- **Next step:** yes
- **Specific:** yes
- **False promise:** no
- **Score:** 5
- **Notes:** Good staged approach.

### Case 24
- **Category:** 8) Dashboard
- **Visitor question:** “Necesito reportes y métricas para decidir mejor.”
- **Expected intent:** `dashboard`
- **Exact chat response:** same as Case 15 (`dashboard` base).
- **Memory used:** no
- **Next step:** yes
- **Specific:** yes
- **False promise:** no
- **Score:** 5
- **Notes:** Strong fit.

### Case 25
- **Category:** 9) AI future
- **Visitor question:** “Quiero IA, pero no sé qué proceso tocar primero.”
- **Expected intent:** `ai_automation`
- **Exact chat response:** same as Case 09 (`ai_automation` base).
- **Memory used:** no
- **Next step:** yes
- **Specific:** yes
- **False promise:** no
- **Score:** 5
- **Notes:** Responsible framing.

### Case 26
- **Category:** 10) SEO marketing
- **Visitor question:** “Necesito más tráfico y visibilidad online.”
- **Expected intent:** `seo_marketing`
- **Exact chat response:** “Si el foco es visibilidad y demanda, SEO/marketing puede ser un frente clave. La recomendación es alinear canal, oferta y capacidad de seguimiento. Siguiente paso recomendado: definimos tu canal prioritario y el flujo de seguimiento para convertir mejor las consultas.”
- **Memory used:** no
- **Next step:** yes
- **Specific:** yes
- **False promise:** no
- **Score:** 5
- **Notes:** Practical.

### Case 27
- **Category:** 11) Pricing
- **Visitor question:** “¿Tienen tarifa fija?”
- **Expected intent:** `pricing`
- **Exact chat response:** same as Case 06 (`pricing` base).
- **Memory used:** no
- **Next step:** yes
- **Specific:** yes
- **False promise:** no
- **Score:** 5
- **Notes:** No fake numbers.

### Case 28
- **Category:** 12) Skeptical/confused
- **Visitor question:** “No confío en la IA, ¿esto me sirve igual?”
- **Expected intent:** `ai_automation`/`not_sure`
- **Exact chat response:** if `ai_automation`, same as Case 09.
- **Memory used:** no
- **Next step:** yes
- **Specific:** yes
- **False promise:** no
- **Score:** 4
- **Notes:** Good reassurance.

### Case 29
- **Category:** 13) Out of scope
- **Visitor question:** “¿Me conectas esto con Meta API ya?”
- **Expected intent:** `not_sure`/`human_help`
- **Exact chat response:** safe redirection to manual channel (same style as Case 10 or 16).
- **Memory used:** no
- **Next step:** yes
- **Specific:** no
- **False promise:** no
- **Score:** 3
- **Notes:** Safe, could be more explicit about current scope.

### Case 30
- **Category:** 13) Out of scope
- **Visitor question:** “Quiero que envíe mensajes automáticos por WhatsApp hoy.”
- **Expected intent:** `ai_automation`/`human_help`
- **Exact chat response:** no automation promise, manual/diagnostic orientation.
- **Memory used:** no
- **Next step:** yes
- **Specific:** yes
- **False promise:** no
- **Score:** 4
- **Notes:** Safe.

### Case 31
- **Category:** 14) Multi-turn memory (Case A - turn 1)
- **Visitor question:** “Tengo una tienda de ropa.”
- **Expected intent:** `not_sure` + retail override
- **Exact chat response:** same as Case 02 (retail base override).
- **Memory used:** no
- **Next step:** yes
- **Specific:** yes
- **False promise:** no
- **Score:** 4
- **Notes:** Good start.

### Case 32
- **Category:** 14) Multi-turn memory (Case A - turn 2)
- **Visitor question:** “Vendo por Instagram.”
- **Expected intent:** `not_sure` + retail override
- **Exact chat response:** retail response plus memory tail: “Si te sirve, tomo como referencia lo último que me compartiste: …”
- **Memory used:** yes
- **Next step:** yes
- **Specific:** yes
- **False promise:** no
- **Score:** 4
- **Notes:** Memory continuity works.

### Case 33
- **Category:** 14) Multi-turn memory (Case A - turn 3)
- **Visitor question:** “Pero se me pierden muchas consultas.”
- **Expected intent:** `lead_followup_priority` + retail follow-up override
- **Exact chat response:** same as Case 04 (+ possible memory tail).
- **Memory used:** yes
- **Next step:** yes
- **Specific:** yes
- **False promise:** no
- **Score:** 5
- **Notes:** Correct shift to follow-up-first.

### Case 34
- **Category:** 14) Multi-turn memory (Case A - turn 4)
- **Visitor question:** “¿Qué debería hacer primero?”
- **Expected intent:** `not_sure` with prior memory context
- **Exact chat response:** intent response + memory tail referencing previous pain.
- **Memory used:** yes
- **Next step:** yes
- **Specific:** yes
- **False promise:** no
- **Score:** 4
- **Notes:** Memory mention is natural enough.

### Case 35
- **Category:** 14) Multi-turn memory (Case B - turn 1)
- **Visitor question:** “Quiero una landing.”
- **Expected intent:** `landing`
- **Exact chat response:** same as Case 05.
- **Memory used:** no
- **Next step:** yes
- **Specific:** yes
- **False promise:** no
- **Score:** 5
- **Notes:** Clear capture path.

### Case 36
- **Category:** 14) Multi-turn memory (Case B - turn 2)
- **Visitor question:** “Pero también quiero organizar los leads.”
- **Expected intent:** `lead_followup_priority`
- **Exact chat response:** same as Case 14 (+ memory tail).
- **Memory used:** yes
- **Next step:** yes
- **Specific:** yes
- **False promise:** no
- **Score:** 5
- **Notes:** Correct prioritization.

### Case 37
- **Category:** 14) Multi-turn memory (Case B - turn 3)
- **Visitor question:** “¿Qué me conviene hacer primero?”
- **Expected intent:** `not_sure` or `lead_followup_priority` based on memory
- **Exact chat response:** recommends diagnosis with follow-up context preserved.
- **Memory used:** yes
- **Next step:** yes
- **Specific:** yes
- **False promise:** no
- **Score:** 4
- **Notes:** Good continuity.

### Case 38
- **Category:** 14) Multi-turn memory (Case C - turn 1)
- **Visitor question:** “Tengo una idea de sistema para mi negocio.”
- **Expected intent:** `mvp_saas`
- **Exact chat response:** same as Case 08.
- **Memory used:** no
- **Next step:** yes
- **Specific:** yes
- **False promise:** no
- **Score:** 5
- **Notes:** Fit is strong.

### Case 39
- **Category:** 14) Multi-turn memory (Case C - turn 2)
- **Visitor question:** “No quiero algo grande todavía.”
- **Expected intent:** `mvp_saas` / `not_sure`
- **Exact chat response:** staged MVP guidance with memory continuity.
- **Memory used:** yes
- **Next step:** yes
- **Specific:** yes
- **False promise:** no
- **Score:** 5
- **Notes:** Great alignment.

### Case 40
- **Category:** 14/15) Multi-turn + handoff (Case C - turn 3)
- **Visitor question:** “¿Cómo sería un MVP?”
- **Expected intent:** `mvp_saas`
- **Exact chat response:** same as Case 08 + memory tail if present.
- **Memory used:** yes
- **Next step:** yes
- **Specific:** yes
- **False promise:** no
- **Score:** 5
- **Notes:** Clean handoff to next action.

---

## Score Summary

- **Average score:** **4.40 / 5**
- **Distribution:**
  - 5: 22 cases
  - 4: 13 cases
  - 3: 5 cases
  - 2: 0 cases
  - 1: 0 cases

## Top 5 Best Responses

1. Case 04 — Retail + lost inquiries (follow-up-first override)
2. Case 14 — Follow-up priority (dashboard-first)
3. Case 08 — MVP SaaS staged recommendation
4. Case 15 — Dashboard value explanation
5. Case 26 — SEO/marketing with operational follow-up alignment

## Top 5 Weakest Responses

1. Case 07 — “Tienda online completa” (safe but too generic)
2. Case 11 — “¿Me garantizan ventas?” (safe, weak objection-specific handling)
3. Case 12 — “Landing vs web profesional” (needs stronger comparison)
4. Case 29 — Meta API immediate ask (scope-safe but not explicit enough)
5. Case 17 — Very broad uncertainty message (helpful but generic)

## Risks Detected

1. Some out-of-scope or objection prompts still route to generic `not_sure` copy.
2. “Landing vs web” comparison could be more concrete for faster user decisions.
3. Scope-limit statements are safe but can be more explicit in edge cases without sounding technical.

## Final Recommendation

**GO with minor notes**

- No critical blocker found.
- Conversion guidance is mostly strong and safe.
- Memory continuity works for multi-turn flows.
- Scope safety is preserved (no false promises about OpenAI, WhatsApp Cloud API, or automations).

---

## Validations

```bash
npm run test
npm run lint
npm run build
```

- test: OK
- lint: OK
- build: OK
