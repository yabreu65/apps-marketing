# Public Lead Assistant with Local Memory — Test Plan

## Resumen

Plan de validación para el módulo público con memoria local, cubriendo intención, memoria, fallback y privacidad.

## 1) Unit tests (lógica)

- Detector de intención (`landing`, `web_professional`, `dashboard`, `mvp_saas`, `ai_automation`, `seo_marketing`, `lead_followup_priority`, `pricing`, `not_sure`, `human_help`).
- Generador de respuesta por reglas.
- Builder de memoria resumida.
- Sanitización de contenido sensible.

## 2) Tests de memoria

- Creación de `visitorKey`.
- Reuso de memoria en sesión posterior.
- Actualización de `lastTopic` e intereses.
- Borrado de memoria por `visitorKey`.
- Verificación de aislamiento (no impactar leads internos).

## 3) API contract tests

- iniciar sesión pública,
- guardar mensaje,
- obtener historial,
- pedir sugerencia/respuesta,
- borrar memoria,
- errores 400/404/500,
- método no permitido 405.

## 4) Tests de fallback

- IA desactivada -> `rules`.
- IA activada + Ollama OK -> `ollama`.
- IA activada + timeout/error -> `rules_fallback`.
- Sin errores crudos visibles al usuario.

## 5) Tests de privacidad

- Aviso visible en UI.
- Bloqueo/alerta cuando el usuario comparte dato sensible.
- No log de payload sensible completo.

## 6) QA manual de conversaciones

- Flujo not_sure.
- Flujo lead_followup_priority.
- Flujo mvp_saas.
- Flujo ai_automation.
- Flujo pricing.
- Flujo human_help.
- Retorno con memoria.
- Borrado de memoria.

## 7) Matriz de casos

| Caso | Intención esperada | Resultado esperado |
|---|---|---|
| No sabe qué necesita | `not_sure` | Compara caminos + diagnóstico + CTA |
| Pierde consultas en WA/IG | `lead_followup_priority` | Dashboard/proceso primero |
| Quiere SaaS | `mvp_saas` | Validación MVP por fases |
| Quiere IA sin claridad | `ai_automation` | Diagnóstico proceso primero |
| Pregunta costo | `pricing` | Sin precio inventado + preguntas de alcance |
| Retorna al chat | memoria + intención previa | Continuidad natural |
| Borra memoria | acción privacidad | Contexto reseteado |

## 8) Conversation Quality Benchmarks

### Pregunta 1
> “Tengo un negocio de servicios y quiero conseguir más clientes, pero no sé si necesito una landing, una página web completa o algo con IA. ¿Qué me recomendarías hacer primero?”

- **Intención esperada**: `not_sure`
- **Debe mencionar**: diferencia landing/web/dashboard/IA, preguntas de diagnóstico, camino por fases
- **NO debe mencionar**: “IA como solución automática inmediata”, promesas garantizadas
- **CTA esperado**: formulario o WhatsApp manual para diagnóstico

### Pregunta 2
> “Recibo consultas por WhatsApp e Instagram, pero muchas veces se me olvidan o no sé a cuáles darles prioridad. ¿Me conviene hacer una web, un dashboard o usar IA para organizar eso?”

- **Intención esperada**: `lead_followup_priority`
- **Debe mencionar**: priorización, orden operativo, dashboard interno, IA como segunda capa
- **NO debe mencionar**: landing como primera recomendación
- **CTA esperado**: diagnóstico orientado a flujo comercial interno

### Pregunta 3
> “Quiero hacer un SaaS pero no sé por dónde empezar.”

- **Intención esperada**: `mvp_saas`
- **Debe mencionar**: usuario, problema, funcionalidades mínimas, validación
- **NO debe mencionar**: promesa de plataforma completa inmediata
- **CTA esperado**: diagnóstico de alcance MVP

### Pregunta 4
> “Quiero usar IA en mi negocio, pero no sé qué proceso automatizar.”

- **Intención esperada**: `ai_automation`
- **Debe mencionar**: diagnóstico de proceso y datos, IA como apoyo gradual
- **NO debe mencionar**: IA mágica / automatización activa inmediata
- **CTA esperado**: evaluación manual del proceso actual

### Pregunta 5
> “¿Cuánto cuesta una solución como esta?”

- **Intención esperada**: `pricing`
- **Debe mencionar**: depende de alcance, variables de estimación
- **NO debe mencionar**: precio exacto inventado
- **CTA esperado**: formulario o WhatsApp manual para estimación

## 9) Comandos de validación esperados

```bash
npm run test
npm run lint
npm run build
```
