# ADR-003 — AI Provider Strategy

## Status

Accepted

## Date

2026-05-13

## Project

Apps Marketing / Yoryi AI Studio

---

# 1. Context

El proyecto `apps-marketing` tendrá capacidades futuras de inteligencia artificial, especialmente mediante el módulo **AI Lead Assistant**.

AI Lead Assistant podrá ayudar a:

- Captar leads.
- Entender necesidades.
- Clasificar intención comercial.
- Resumir conversaciones.
- Sugerir lead scoring.
- Escalar oportunidades a revisión humana.
- Apoyar procesos de venta y automatización comercial.

Sin embargo, la Fase 1 del proyecto no incluye IA.

La Fase 1 está enfocada en:

- Landing comercial.
- CTA a WhatsApp manual.
- Formulario de contacto.
- SEO básico.
- Responsive design.
- Seguimiento humano/manual.

La decisión de proveedor IA debe documentarse desde ahora para evitar improvisación técnica, dependencia prematura de APIs pagas o integración de IA antes de validar el flujo comercial.

---

# 2. Decision

Se decide que en Fase 1 no se usará ningún proveedor de IA.

Para fases futuras, la estrategia será:

1. Usar **Ollama local** como proveedor inicial para desarrollo, pruebas y control de costos.
2. Mantener **OpenAI API** como proveedor opcional futuro para mayor calidad, producción o fallback.
3. Implementar una abstracción llamada conceptualmente `AIProvider` antes de acoplar la lógica de negocio a un proveedor específico.
4. No enviar datos reales de leads a proveedores IA sin revisión de privacidad, seguridad y ADR vigente.
5. No activar IA en producción sin evaluación de calidad, fallback y escalamiento humano.

---

# 3. Phase 1 Decision

En Fase 1 se decide explícitamente:

- No usar Ollama.
- No usar OpenAI API.
- No implementar `AIProvider`.
- No ejecutar prompts productivos.
- No implementar AI Lead Assistant.
- No calcular lead scoring automático.
- No generar resúmenes automáticos.
- No clasificar intención automáticamente.
- No enviar datos de usuarios a modelos IA.

La IA puede mencionarse como capacidad futura de Apps Marketing / Yoryi AI Studio, pero no debe presentarse como funcionalidad activa de la landing inicial.

---

# 4. Future AI Provider Strategy

## 4.1 Ollama

Ollama será el proveedor IA inicial recomendado para fases futuras de desarrollo y validación.

### Uso futuro esperado

- Probar prompts localmente.
- Validar flujos de conversación.
- Evaluar intent detection.
- Probar lead summary.
- Probar lead scoring.
- Reducir costos durante experimentación.
- Ejecutar QA interno sin pagar por tokens.

### Razones

- Bajo costo operativo inicial.
- Control local.
- Útil para pruebas frecuentes.
- Compatible con estrategia de aprendizaje y validación.
- Reduce dependencia temprana de proveedores externos.

### Limitaciones

- Puede tener menor calidad que modelos cloud avanzados.
- Puede depender del hardware disponible.
- Puede tener mayor latencia.
- Puede requerir mantenimiento local.
- No debe asumirse como proveedor final de producción sin evaluación.

---

## 4.2 OpenAI API

OpenAI API queda como proveedor opcional futuro.

### Uso futuro esperado

- Mejorar calidad del AI Lead Assistant.
- Producir resúmenes más robustos.
- Mejorar clasificación de intención.
- Mejorar consistencia del lead scoring.
- Servir como fallback si Ollama no alcanza calidad suficiente.
- Activarse en planes o escenarios donde el costo esté justificado.

### Razones

- Alta calidad esperada.
- Buen rendimiento para tareas complejas.
- Mejor escalabilidad operativa.
- Menor carga de mantenimiento local.
- Útil para producción si el flujo comercial ya genera valor.

### Limitaciones

- Es pago por uso.
- Requiere control de costos.
- Requiere gestión segura de API keys.
- Implica enviar datos a un proveedor externo.
- Requiere revisión de privacidad y política de datos.
- Puede cambiar precios, modelos o límites.

---

# 5. AIProvider Abstraction Decision

Cuando se implemente IA, se deberá usar una abstracción de proveedor.

Concepto:

```txt
AIProvider
   ├── OllamaProvider
   └── OpenAIProvider
```

## 5.1 Objetivo

Evitar que la lógica de negocio dependa directamente de Ollama, OpenAI u otro proveedor específico.

La lógica de negocio debe poder cambiar de proveedor sin reescribir:

- Conversation flows.
- Lead scoring.
- Lead summary.
- Intent detection.
- Fallback logic.
- API contracts.
- Business rules.
- QA tests.

## 5.2 Beneficios

- Menor acoplamiento.
- Mejor mantenibilidad.
- Posibilidad de fallback.
- Control de costos.
- Capacidad de probar modelos diferentes.
- Separación entre infraestructura IA y lógica comercial.
- Mayor facilidad para evolucionar.

## 5.3 Regla

No se debe implementar lógica comercial llamando directamente a OpenAI u Ollama desde componentes de UI o controladores de negocio sin una capa intermedia aprobada.

---

# 6. Future AI Tasks

Las tareas futuras que podrán usar IA son:

## 6.1 Intent Detection

Detectar intención del prospecto:

- Landing page.
- Desarrollo web.
- SEO.
- Marketing.
- Automatización.
- IA/chatbot.
- Sistema a medida.
- Precio.
- Diagnóstico.
- Fuera de alcance.

## 6.2 Lead Summary

Generar resumen comercial del prospecto:

- Tipo de negocio.
- Necesidad.
- Problema principal.
- Servicio sugerido.
- Urgencia.
- Datos faltantes.
- Próximo paso.

## 6.3 Lead Scoring

Sugerir score comercial de 0 a 100 según:

- Service Fit.
- ICP Fit.
- Urgency.
- Problem Clarity.
- Budget Fit.
- Business Potential.
- Channel Fit.
- Decision Readiness.

## 6.4 Fallback

Responder de forma segura cuando:

- Falta información.
- Hay baja confianza.
- La consulta está fuera de alcance.
- El proveedor IA falla.
- El usuario intenta prompt injection.
- Se necesita escalamiento humano.

## 6.5 Conversation Guidance

Ayudar al asistente a elegir la próxima pregunta útil sin vender agresivamente ni prometer resultados.

---

# 7. Provider Selection Rules

## 7.1 Local Development

Proveedor recomendado:

```txt
Ollama
```

Motivo:

- Bajo costo.
- Pruebas rápidas.
- Control local.
- Experimentación sin consumo por token.

## 7.2 Staging Future

Proveedores posibles:

- Ollama.
- OpenAI API con límites bajos.
- MockAIProvider para pruebas determinísticas.

## 7.3 Production Future

Proveedor posible:

- Ollama si cumple calidad, latencia y disponibilidad.
- OpenAI API si se justifica por calidad, confiabilidad o rendimiento.
- Estrategia híbrida si conviene.

---

# 8. Cost Control

Antes de usar OpenAI API en producción debe existir:

- Presupuesto mensual definido.
- Límite de uso.
- Métrica de consumo.
- Estrategia de fallback.
- Revisión de prompts para evitar tokens innecesarios.
- Evaluación de qué tareas realmente necesitan IA.
- Registro de decisión en ADR.
- Revisión periódica de costos.

## Regla

No se debe activar un proveedor pago de IA en producción sin una justificación comercial clara.

---

# 9. Privacy and Data Handling

Antes de enviar datos a cualquier proveedor IA debe definirse:

- Qué datos se envían.
- Por qué se envían.
- Qué datos se excluyen.
- Si se envían conversaciones completas o resúmenes.
- Cómo se minimizan datos personales.
- Si existe consentimiento suficiente.
- Qué política de privacidad aplica.
- Qué proveedor procesa los datos.
- Qué retención aplica.
- Qué fallback existe si no se puede usar IA.

## Fase 1

En Fase 1 no se envían datos a proveedores IA.

## Futuro

En fases futuras, la IA debe recibir solo los datos mínimos necesarios para cumplir la tarea.

---

# 10. Security Rules

Cuando se active IA:

- No exponer API keys.
- No guardar secretos en frontend.
- Usar variables de entorno.
- No commitear `.env`.
- Validar inputs.
- Validar outputs.
- No confiar ciegamente en respuestas del modelo.
- No ejecutar acciones críticas sin revisión humana.
- No revelar prompts internos.
- No revelar información de otros leads.
- No permitir prompt injection.
- No registrar datos sensibles innecesarios en logs.

---

# 11. Prompt Management

Los prompts futuros deben mantenerse documentados y versionados.

Archivos relacionados:

- `docs/03-prompts/lead-assistant-system-prompt.md`
- `docs/03-prompts/lead-summary-prompt.md`
- `docs/03-prompts/lead-scoring-prompt.md`
- `docs/03-prompts/fallback-prompt.md`

## Reglas

- No hardcodear prompts críticos sin documentación.
- No mezclar todas las tareas en un solo prompt gigante.
- Separar conversación, resumen, scoring y fallback.
- Evaluar cambios antes de producción.
- Mantener guardrails comerciales.
- Mantener defensa contra prompt injection.

---

# 12. Quality Evaluation

Antes de usar IA en producción debe existir evaluación sobre:

- Detección de intención.
- Calidad de respuesta.
- Calidad del resumen.
- Coherencia del scoring.
- Manejo de datos faltantes.
- Fallback.
- Escalamiento humano.
- Respeto de privacidad.
- Respeto de alcance.
- Defensa contra prompt injection.
- No prometer resultados garantizados.
- No dar precios finales.

Los documentos de evaluación son:

- `docs/04-tests/ai-evaluation-set.md`
- `docs/04-tests/conversation-test-cases.md`

---

# 13. Human Escalation

Toda implementación futura de IA debe incluir escalamiento humano.

La IA debe escalar cuando:

- El prospecto pide precio.
- El prospecto pide propuesta.
- El prospecto quiere empezar pronto.
- El lead parece caliente.
- La confianza es baja.
- La consulta es compleja.
- El usuario pide hablar con una persona.
- Hay riesgo de promesa indebida.
- El proveedor IA falla.
- La conversación sale del alcance permitido.

La IA no debe cerrar ventas automáticamente.

---

# 14. Alternatives Considered

## 14.1 Usar OpenAI API desde Fase 1

Rechazado.

### Razones

- Aumenta costo inicial.
- No es necesario para validar landing.
- Requiere privacidad y QA adicional.
- Puede acelerar scope creep hacia AI Lead Assistant.
- La oferta comercial aún debe validarse manualmente.

## 14.2 Usar Ollama desde Fase 1

Rechazado.

### Razones

- Aunque puede ser local y económico, sigue agregando complejidad.
- La Fase 1 no requiere IA.
- Puede distraer del objetivo principal: conversión de la landing.
- Requiere prompts, pruebas y manejo de respuestas.

## 14.3 No documentar IA hasta más adelante

Rechazado.

### Razones

- El proyecto tiene visión AI-first.
- Conviene dejar límites claros desde el inicio.
- Evita improvisación futura.
- Permite diseñar arquitectura preparada sin implementar IA todavía.

## 14.4 Acoplar directamente a un proveedor

Rechazado.

### Razones

- Aumenta dependencia técnica.
- Dificulta cambiar de modelo.
- Dificulta controlar costos.
- Dificulta fallback.
- Hace más difícil probar localmente.

---

# 15. Consequences

## 15.1 Consecuencias positivas

- Menor costo inicial.
- Menor complejidad en Fase 1.
- Mejor foco en conversión.
- Arquitectura futura más flexible.
- Menor dependencia de proveedor.
- Mejor control de privacidad.
- Mejor capacidad de evaluar calidad antes de producción.

## 15.2 Consecuencias negativas

- No habrá IA activa al inicio.
- No habrá automatización conversacional en Fase 1.
- El seguimiento será manual.
- Algunas capacidades futuras requerirán trabajo adicional antes de activarse.

## 15.3 Consecuencia aceptada

Se acepta no usar IA en Fase 1 porque el objetivo principal es validar oferta, mensaje, ICP y conversión manual.

---

# 16. Risks

## 16.1 Riesgo: activar IA demasiado pronto

### Mitigación

- Mantener este ADR vigente.
- Requerir aprobación de fase.
- Requerir QA de IA.
- Requerir revisión de privacidad.

## 16.2 Riesgo: depender demasiado de OpenAI

### Mitigación

- Usar `AIProvider`.
- Mantener Ollama como alternativa.
- Evaluar proveedores por tarea.
- No acoplar lógica de negocio a un proveedor.

## 16.3 Riesgo: baja calidad con Ollama

### Mitigación

- Evaluar con `ai-evaluation-set.md`.
- Usar OpenAI API como opción futura si se justifica.
- Mantener revisión humana.

## 16.4 Riesgo: costos altos de IA

### Mitigación

- Control de presupuesto.
- Límites de uso.
- Prompts eficientes.
- Fallback manual.
- Uso de Ollama para pruebas.

## 16.5 Riesgo: privacidad de datos

### Mitigación

- Minimización de datos.
- Revisión de seguridad.
- No enviar datos sensibles.
- ADR antes de producción.
- Política de privacidad.

---

# 17. Change Control

Cambiar esta decisión requiere:

- Actualizar este ADR.
- Actualizar `ai-provider-strategy.md`.
- Actualizar `ai-agent-design.md`.
- Actualizar `api-contracts.md` si aplica.
- Actualizar `security-and-privacy.md`.
- Actualizar tests de IA.
- Aprobación explícita de Yoryi.

No se puede activar IA en Fase 1 sin modificar formalmente esta decisión y el alcance del proyecto.

---

# 18. Validation

La decisión se considera válida si:

- Fase 1 no usa IA.
- Ollama queda documentado como proveedor futuro inicial.
- OpenAI API queda documentado como proveedor opcional futuro.
- Existe estrategia `AIProvider`.
- La IA futura requiere QA.
- La IA futura requiere privacidad revisada.
- La IA futura requiere escalamiento humano.
- No hay dependencia de proveedor en Fase 1.

---

# 19. Related Documents

Este ADR se relaciona con:

- `AGENTS.md`
- `docs/01-sdd/sdd-index.md`
- `docs/05-decisions/adr-001-project-scope.md`
- `docs/05-decisions/adr-002-stack.md`
- `docs/01-sdd/conversation-flows.md`
- `docs/01-sdd/lead-scoring-spec.md`
- `docs/02-architecture/ai-agent-design.md`
- `docs/02-architecture/ai-provider-strategy.md`
- `docs/02-architecture/security-and-privacy.md`
- `docs/03-prompts/lead-assistant-system-prompt.md`
- `docs/03-prompts/lead-summary-prompt.md`
- `docs/03-prompts/lead-scoring-prompt.md`
- `docs/03-prompts/fallback-prompt.md`
- `docs/04-tests/ai-evaluation-set.md`
- `docs/04-tests/conversation-test-cases.md`

---

# 20. Decision Summary

Se decide:

## Fase 1

- No usar IA.
- No usar Ollama.
- No usar OpenAI API.
- No implementar AIProvider.
- No ejecutar prompts productivos.

## Futuro

- Usar Ollama como proveedor inicial de desarrollo y validación.
- Usar OpenAI API como proveedor opcional futuro.
- Implementar `AIProvider` para evitar acoplamiento.
- Evaluar calidad antes de producción.
- Controlar costos.
- Proteger privacidad.
- Mantener escalamiento humano.

---

# 21. Final Statement

La decisión oficial es:

**Fase 1 no usa IA.**

**Ollama será el proveedor local inicial futuro para pruebas y control de costos.**

**OpenAI API será proveedor opcional futuro cuando exista justificación comercial, calidad requerida y control de costos.**

**Toda IA futura deberá pasar por `AIProvider`, QA, privacidad, fallback y revisión humana.**