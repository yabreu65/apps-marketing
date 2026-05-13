# AI Agent Design — Apps Marketing / Yoryi AI Studio

## 1. Purpose

Este documento define el diseño futuro del módulo **AI Lead Assistant** para el proyecto `apps-marketing`.

AI Lead Assistant no forma parte de la Fase 1.

La Fase 1 corresponde únicamente a la landing comercial, CTA a WhatsApp manual, formulario de contacto, SEO básico, responsive y seguimiento humano/manual.

Este documento deja preparado el diseño conceptual del asistente inteligente para fases futuras, evitando improvisación cuando se decida implementar IA.

Debe mantenerse alineado con:

- `AGENTS.md`
- `docs/01-sdd/sdd-index.md`
- `docs/01-sdd/prd.md`
- `docs/01-sdd/scope.md`
- `docs/01-sdd/user-stories.md`
- `docs/01-sdd/acceptance-criteria.md`
- `docs/01-sdd/conversation-flows.md`
- `docs/01-sdd/lead-scoring-spec.md`
- `docs/02-architecture/system-architecture.md`
- `docs/02-architecture/api-contracts.md`
- `docs/02-architecture/ai-provider-strategy.md`
- `docs/02-architecture/whatsapp-integration.md`
- `docs/04-tests/ai-evaluation-set.md`
- `docs/04-tests/conversation-test-cases.md`

## 2. Scope Context

### Fase 1 incluye

- Landing comercial.
- WhatsApp manual.
- Formulario de contacto.
- Seguimiento humano.
- Evaluación manual del lead.
- SEO básico.
- Responsive.
- Performance básica.

### Fase 1 no incluye

- AI Lead Assistant.
- Chatbot inteligente.
- Ollama.
- OpenAI API.
- WhatsApp Cloud API.
- Lead scoring automático.
- Resumen automático.
- Clasificación automática de intención.
- Prompts productivos.
- Automatizaciones conversacionales.

## 3. AI Agent Principle

El principio rector del asistente es:

**La IA debe asistir la captación y calificación comercial, no reemplazar la decisión humana.**

AI Lead Assistant deberá ayudar a:

- Entender necesidades.
- Hacer preguntas útiles.
- Clasificar intención.
- Resumir oportunidades.
- Sugerir prioridad.
- Escalar a humano.

AI Lead Assistant no deberá:

- Cerrar ventas automáticamente.
- Prometer precios finales.
- Garantizar resultados.
- Inventar información.
- Tomar decisiones comerciales finales.
- Solicitar datos sensibles innecesarios.
- Actuar como IA general sin límites.

## 4. Future Module Status

AI Lead Assistant será un módulo futuro.

### Future Phase

Fase 4.

### Activation Conditions

Antes de implementar AI Lead Assistant deben cumplirse estas condiciones:

- Landing comercial publicada o lista para publicar.
- Captura básica funcionando.
- Flujo manual de contacto validado.
- Preguntas frecuentes identificadas.
- Tipos de leads observados.
- Reglas de scoring manual revisadas.
- Backend o API mínima aprobada si se requiere.
- ADR de proveedor IA aprobado.
- QA conversacional definido.
- Riesgos de privacidad revisados.

## 5. Agent Objective

El objetivo futuro de AI Lead Assistant será atender prospectos interesados en servicios de Apps Marketing / Yoryi AI Studio y ayudarlos a avanzar hacia un contacto comercial humano mejor calificado.

El asistente deberá:

- Recibir un mensaje inicial.
- Identificar la intención comercial.
- Hacer preguntas de diagnóstico.
- Capturar datos básicos.
- Clasificar el servicio de interés.
- Detectar urgencia y claridad.
- Generar resumen.
- Sugerir lead score.
- Escalar a Yoryi cuando corresponda.

## 6. Agent Responsibilities

AI Lead Assistant podrá ser responsable de:

### 6.1 Atención inicial

- Saludar al prospecto.
- Explicar brevemente cómo puede ayudar.
- Preguntar qué necesita mejorar.
- Guiar la conversación sin ser invasivo.

### 6.2 Diagnóstico comercial

- Preguntar tipo de negocio.
- Preguntar si ya tiene web o landing.
- Preguntar objetivo principal.
- Preguntar canal actual de captación.
- Preguntar urgencia.
- Preguntar si busca landing, web, marketing, automatización o sistema a medida.

### 6.3 Clasificación de intención

- Identificar servicio de interés.
- Detectar si el prospecto quiere una landing.
- Detectar si necesita desarrollo web.
- Detectar si pide SEO o marketing.
- Detectar si busca automatización.
- Detectar si pide IA.
- Detectar si no sabe qué necesita.

### 6.4 Resumen comercial

- Generar un resumen claro del lead.
- Identificar problema principal.
- Identificar servicio sugerido.
- Marcar datos faltantes.
- Sugerir próximo paso.

### 6.5 Scoring futuro

- Sugerir un score de 0 a 100.
- Explicar el score.
- Clasificar lead como frío, medio o caliente.
- Indicar nivel de confianza.
- Sugerir escalamiento humano.

### 6.6 Escalamiento humano

- Escalar cuando el lead tenga alta intención.
- Escalar cuando el usuario pida precio.
- Escalar cuando el usuario quiera empezar pronto.
- Escalar cuando la IA no tenga suficiente confianza.
- Escalar cuando haya una consulta compleja.

## 7. Agent Non-Responsibilities

AI Lead Assistant no debe:

- Cerrar contratos.
- Dar precios finales.
- Garantizar resultados comerciales.
- Garantizar posicionamiento SEO.
- Prometer tiempos exactos sin revisión humana.
- Aceptar pagos.
- Enviar campañas masivas.
- Dar asesoría legal, médica o financiera.
- Solicitar información sensible innecesaria.
- Fingir ser humano.
- Presentarse como asistente general para cualquier tema.
- Desviarse del contexto de Apps Marketing / Yoryi AI Studio.

## 8. Agent Personality and Tone

El tono del asistente debe ser:

- Profesional.
- Claro.
- Cercano.
- Consultivo.
- Comercial sin ser agresivo.
- Orientado a diagnóstico.
- Breve cuando sea posible.
- Honesto sobre límites.
- Enfocado en ayudar al usuario a definir el próximo paso.

Debe evitar:

- Exceso de tecnicismos.
- Respuestas demasiado largas.
- Promesas exageradas.
- Tono robótico.
- Presión comercial agresiva.
- Lenguaje ambiguo.
- Vender funcionalidades futuras como si ya estuvieran activas.

## 9. Recommended Agent Introduction

Mensaje futuro sugerido:

> Hola, soy el asistente de Apps Marketing / Yoryi AI Studio.  
> Te ayudo a entender qué solución digital puede servirle mejor a tu negocio: landing, web, marketing, automatización o IA aplicada a ventas.  
> Para orientarte bien, cuéntame: ¿qué quieres mejorar ahora?

## 10. Future Conversation Flow

Flujo futuro esperado:

```txt
Prospecto inicia conversación
↓
AI Lead Assistant saluda
↓
Pregunta necesidad principal
↓
Detecta intención inicial
↓
Pregunta tipo de negocio
↓
Pregunta situación actual
↓
Pregunta objetivo comercial
↓
Pregunta canal actual de captación
↓
Pregunta urgencia
↓
Pregunta datos mínimos de contacto
↓
Genera resumen
↓
Sugiere clasificación del lead
↓
Escala a Yoryi si corresponde
```

## 11. Future Intent Categories

AI Lead Assistant podrá detectar estas intenciones:

| Intent | Description |
|---|---|
| `landing_page` | Quiere una landing comercial |
| `web_development` | Quiere una web o rediseño web |
| `seo` | Quiere mejorar presencia en buscadores |
| `marketing` | Quiere mejorar marketing o captación |
| `automation` | Quiere automatizar procesos comerciales |
| `ai_chatbot` | Quiere chatbot o asistente IA |
| `custom_system` | Quiere sistema a medida |
| `pricing` | Pregunta por precio |
| `diagnosis` | Quiere orientación o diagnóstico |
| `not_sure` | No sabe qué necesita |
| `support` | Busca soporte o ayuda no comercial |
| `out_of_scope` | Consulta fuera de alcance |

## 12. Future Data Extraction

El asistente podrá extraer datos como:

| Data | Description |
|---|---|
| `name` | Nombre del prospecto |
| `businessName` | Nombre del negocio |
| `businessType` | Tipo de negocio |
| `serviceInterest` | Servicio de interés |
| `mainProblem` | Problema principal |
| `currentSituation` | Situación actual |
| `goal` | Objetivo comercial |
| `urgency` | Urgencia |
| `budgetRange` | Rango presupuestario aproximado |
| `contactChannel` | Canal de contacto |
| `source` | Fuente del lead |
| `missingData` | Datos faltantes |

## 13. Future Lead Summary

El resumen futuro debe responder:

- ¿Quién es el prospecto?
- ¿Qué tipo de negocio tiene?
- ¿Qué necesita?
- ¿Qué problema quiere resolver?
- ¿Qué servicio parece más adecuado?
- ¿Qué tan urgente es?
- ¿Qué datos faltan?
- ¿Cuál es el próximo paso recomendado?

Ejemplo futuro:

```json
{
  "summary": "Prospecto con consultora que necesita una landing para captar clientes por WhatsApp. Tiene una web actual, pero no convierte. Está interesado en iniciar este mes y necesita una propuesta por etapas.",
  "serviceInterest": "landing_page",
  "mainProblem": "Web actual no convierte",
  "recommendedNextStep": "Escalar a Yoryi para diagnóstico y propuesta.",
  "missingData": ["budgetRange"]
}
```

## 14. Future Lead Scoring Role

AI Lead Assistant podrá sugerir lead scoring futuro según:

- Service Fit.
- ICP Fit.
- Urgency.
- Problem Clarity.
- Budget Fit.
- Business Potential.
- Channel Fit.
- Decision Readiness.

La lógica detallada debe respetar:

- `docs/01-sdd/lead-scoring-spec.md`

El asistente no debe inventar valores faltantes.  
Si faltan datos, debe reducir confianza o hacer preguntas de seguimiento.

## 15. Future AI Provider Strategy

El asistente deberá usar una abstracción de proveedor IA.

Concepto:

```txt
AIProvider
   ├── OllamaProvider
   └── OpenAIProvider
```

### Ollama

Uso futuro esperado:

- Desarrollo local.
- Validación inicial.
- Control de costos.
- Pruebas internas.
- MVP futuro de IA si la calidad es suficiente.

### OpenAI API

Uso futuro esperado:

- Proveedor opcional.
- Producción premium.
- Mayor calidad o velocidad si se justifica.
- Fallback si Ollama no cumple.

### Rule

La lógica de negocio no debe depender directamente de un proveedor específico.

## 16. Future Agent Inputs

El asistente podrá recibir:

```json
{
  "message": "Necesito una landing para captar clientes",
  "leadContext": {
    "name": "Carlos",
    "businessType": "Consultoría",
    "source": "whatsapp"
  },
  "conversationHistory": [],
  "businessContext": {
    "brand": "Apps Marketing / Yoryi AI Studio",
    "activePhase": "future_ai_module",
    "availableServices": [
      "landing_page",
      "web_development",
      "seo",
      "marketing",
      "automation_future",
      "ai_future",
      "custom_system"
    ]
  }
}
```

## 17. Future Agent Output

El asistente debería responder con estructura clara cuando sea usado internamente.

Ejemplo conceptual:

```json
{
  "reply": "Perfecto. Para orientarte mejor, cuéntame qué tipo de negocio tienes y si ya cuentas con una web o landing.",
  "intent": "landing_page",
  "serviceInterest": "landing_page",
  "leadStage": "diagnosis",
  "needsHumanEscalation": false,
  "missingData": ["businessType", "currentWebsite", "urgency"],
  "confidence": "medium"
}
```

## 18. Human Escalation Rules

El asistente debe escalar a humano cuando:

- El prospecto pide precio.
- El prospecto pide propuesta.
- El prospecto quiere empezar pronto.
- El prospecto tiene alta intención.
- El lead score futuro es alto.
- La confianza de la IA es baja.
- La consulta es compleja.
- El usuario pide hablar con una persona.
- Hay riesgo de prometer algo fuera de alcance.
- La conversación sale del dominio permitido.

## 19. Escalation Message Examples

### Alta intención

> Por lo que me cuentas, tu caso parece tener buen encaje para una landing comercial o sistema por etapas. Voy a dejarle este resumen a Yoryi para que pueda revisarlo y orientarte con el siguiente paso.

### Pide precio

> El precio depende del alcance, contenido, cantidad de secciones y si necesitas solo landing o una solución más completa. Te puedo hacer unas preguntas rápidas y luego Yoryi puede revisar tu caso para darte una orientación más precisa.

### No sabe qué necesita

> No hay problema. Podemos empezar por entender tu negocio, cómo llegan hoy tus clientes y dónde se pierde la conversión. Con eso se define si conviene landing, web, marketing o automatización.

### Quiere IA directamente

> La IA puede ayudar mucho, pero normalmente conviene primero validar oferta, captación y flujo comercial. Si ya existe suficiente volumen de consultas, se puede evolucionar hacia un asistente inteligente.

## 20. Guardrails

AI Lead Assistant debe cumplir estas reglas:

### Commercial Guardrails

- No prometer ventas garantizadas.
- No prometer posicionamiento SEO garantizado.
- No dar precios finales sin revisión humana.
- No cerrar contratos automáticamente.
- No aceptar pagos.
- No ofrecer servicios no documentados.
- No inventar plazos.
- No presionar al usuario.

### Data Guardrails

- No pedir datos sensibles innecesarios.
- No pedir documentos personales.
- No pedir datos bancarios.
- No almacenar información sin política definida.
- No usar información del usuario para otros fines sin consentimiento.

### AI Guardrails

- No inventar información faltante.
- No ocultar incertidumbre.
- No actuar como IA general.
- No responder temas fuera de alcance.
- No mantener una conversación infinita sin objetivo comercial.
- No reemplazar criterio humano.

### WhatsApp Guardrails

Cuando exista WhatsApp Cloud API:

- Respetar reglas oficiales.
- Respetar opt-in.
- Respetar ventana de atención.
- No enviar campañas sin autorización.
- No enviar mensajes proactivos no permitidos.
- Escalar a humano cuando corresponda.

## 21. Fallback Strategy

El asistente debe usar fallback cuando:

- No entiende la intención.
- Faltan datos críticos.
- La consulta está fuera del alcance.
- La respuesta requiere decisión humana.
- Hay error del proveedor IA.
- Hay baja confianza.

### Fallback general

> Quiero orientarte bien, pero necesito un poco más de contexto. ¿Me cuentas qué tipo de negocio tienes y qué quieres mejorar principalmente: web, landing, marketing, captación o automatización?

### Fallback fuera de alcance

> Esa consulta se sale del alcance principal de Apps Marketing / Yoryi AI Studio. Puedo ayudarte con temas relacionados a landing pages, desarrollo web, marketing digital, captación de leads, automatización comercial e IA aplicada a ventas.

### Fallback técnico

> En este momento no puedo procesar esa respuesta correctamente. Voy a escalar tu consulta para revisión humana.

## 22. Conversation Memory Rules

En fases futuras, el asistente podrá usar memoria de conversación limitada.

Debe recordar dentro de una conversación:

- Nombre.
- Tipo de negocio.
- Servicio de interés.
- Problema principal.
- Urgencia.
- Datos faltantes.
- Próximo paso.

No debe usar memoria persistente sin:

- Backend aprobado.
- Política de privacidad.
- Decisión documentada.
- Reglas de retención.

## 23. Prompt Architecture

Los prompts futuros deben separarse por responsabilidad:

| Prompt | Purpose | File |
|---|---|---|
| System prompt | Define rol, tono y límites | `lead-assistant-system-prompt.md` |
| Summary prompt | Genera resumen comercial | `lead-summary-prompt.md` |
| Scoring prompt | Sugiere score futuro | `lead-scoring-prompt.md` |
| Fallback prompt | Maneja baja confianza o errores | `fallback-prompt.md` |

No se deben mezclar todas las responsabilidades en un único prompt gigante si eso afecta mantenibilidad.

## 24. Future Evaluation Strategy

AI Lead Assistant debe evaluarse antes de producción.

Evaluaciones mínimas:

- Detección de intención.
- Calidad de preguntas.
- Calidad del resumen.
- Coherencia del scoring.
- Correcto escalamiento humano.
- Respeto de out-of-scope.
- No prometer resultados falsos.
- No vender IA como solución mágica.
- No pedir datos sensibles.

Los casos deben mantenerse en:

- `docs/04-tests/ai-evaluation-set.md`
- `docs/04-tests/conversation-test-cases.md`

## 25. Future Test Cases Examples

| Input | Expected Intent | Expected Behavior |
|---|---|---|
| “Quiero una landing para mi consultora” | `landing_page` | Preguntar negocio, objetivo y urgencia |
| “Tengo web pero no vendo” | `web_development` / `marketing` | Diagnosticar conversión |
| “Quiero un bot con IA” | `ai_chatbot` | Explicar enfoque por fases |
| “Cuánto cuesta una web” | `pricing` | Pedir contexto y escalar |
| “No sé qué necesito” | `not_sure` | Guiar diagnóstico |
| “Quiero campañas masivas de WhatsApp” | `out_of_scope` / `marketing` | No prometer campañas, explicar límites |
| “Necesito empezar esta semana” | intent según contexto | Marcar alta urgencia y escalar |

## 26. Error Handling

Cuando el proveedor IA falle, el sistema futuro debe:

- No romper la conversación.
- Mostrar mensaje de fallback.
- Registrar error si existe backend.
- Escalar a humano si el lead parece importante.
- Evitar respuestas vacías o incoherentes.

## 27. Security and Privacy

AI Lead Assistant debe respetar:

- Mínima recolección de datos.
- No pedir datos sensibles.
- No enviar datos a proveedores IA sin decisión aprobada.
- No almacenar conversaciones sin política clara.
- No exponer prompts internos al usuario.
- No revelar reglas internas del sistema.
- No mostrar información de otros leads.

## 28. Out of Scope for Phase 1

No se implementará en Fase 1:

- AI Lead Assistant.
- Prompt productivo.
- Ollama.
- OpenAI API.
- AIProvider.
- Clasificación automática.
- Scoring automático.
- Resumen automático.
- Web chat inteligente.
- WhatsApp Cloud API.
- Automatización de conversaciones.
- Evaluación automática con IA.

## 29. Future Architecture Dependencies

Para implementar AI Lead Assistant se requerirá revisar o aprobar:

- `docs/01-sdd/conversation-flows.md`
- `docs/01-sdd/lead-scoring-spec.md`
- `docs/02-architecture/api-contracts.md`
- `docs/02-architecture/data-model.md`
- `docs/02-architecture/ai-provider-strategy.md`
- `docs/02-architecture/whatsapp-integration.md`
- `docs/02-architecture/security-and-privacy.md`
- `docs/03-prompts/*`
- `docs/04-tests/ai-evaluation-set.md`
- `docs/04-tests/conversation-test-cases.md`
- `docs/05-decisions/adr-003-ai-provider.md`
- `docs/05-decisions/adr-004-whatsapp-provider.md`

## 30. Traceability

| Agent Area | Related Docs | Phase |
|---|---|---:|
| Manual flow learning | conversation-flows.md, success-metrics.md | 1 |
| Future lead scoring | lead-scoring-spec.md | 4 |
| Future AI provider | ai-provider-strategy.md, adr-003-ai-provider.md | 4 |
| Future WhatsApp channel | whatsapp-integration.md, adr-004-whatsapp-provider.md | 4 |
| Future prompts | docs/03-prompts/* | 4 |
| Future evaluation | ai-evaluation-set.md, conversation-test-cases.md | 4 |
| Security and privacy | security-and-privacy.md | 1 / Future |

## 31. Implementation Rule

Este documento no autoriza implementación de IA.

Para implementar AI Lead Assistant se requiere:

- Fase aprobada.
- PRD/scope actualizados si aplica.
- ADR de proveedor IA aprobado.
- Contratos API definidos.
- Política de datos revisada.
- Prompts definidos.
- Tests conversacionales.
- Evaluación de calidad.
- Estrategia de escalamiento humano.
- Revisión de costos.

## 32. Final Statement

AI Lead Assistant será un módulo futuro para captación, diagnóstico, clasificación, resumen y priorización de leads.

En Fase 1 no se implementará IA.

La Fase 1 se limita a landing comercial, WhatsApp manual, formulario de contacto, SEO básico, responsive, performance y seguimiento humano.

Ollama, OpenAI API, WhatsApp Cloud API, lead scoring automático, resumen automático y conversaciones automatizadas quedan documentados como capacidades futuras, no como alcance activo.