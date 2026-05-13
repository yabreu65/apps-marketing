# ADR-004 — WhatsApp Provider Strategy

## Status

Accepted

## Date

2026-05-13

## Project

Apps Marketing / Yoryi AI Studio

---

# 1. Context

El proyecto `apps-marketing` necesita un canal simple y directo para captar leads desde la landing comercial.

El canal principal inicial será WhatsApp, porque muchos negocios de servicios en Latinoamérica venden, responden consultas y coordinan oportunidades comerciales mediante conversaciones.

Sin embargo, existen dos caminos posibles:

1. Usar WhatsApp manual mediante un link directo desde la landing.
2. Usar WhatsApp Cloud API para automatizar mensajes, webhooks, bots y seguimiento.

Para Fase 1, el objetivo principal es validar la oferta, el mensaje y la conversión con bajo costo y baja complejidad.

Por eso, no conviene implementar WhatsApp Cloud API desde el inicio.

---

# 2. Decision

Se decide que en Fase 1 WhatsApp será usado únicamente de forma manual.

La Fase 1 usará:

- Link directo `wa.me`.
- Mensaje precargado opcional.
- Conversación humana/manual.
- Seguimiento manual.
- Evaluación manual del lead.

WhatsApp Cloud API queda documentado como integración futura.

---

# 3. Phase 1 WhatsApp Decision

En Fase 1 se permite:

- CTA hacia WhatsApp manual.
- Link `https://wa.me/<phone_number>`.
- Mensaje precargado opcional.
- Atención manual por Yoryi / Apps Marketing.
- Registro manual de oportunidades si aplica.
- Evaluación manual de calidad del lead.

En Fase 1 no se permite:

- WhatsApp Cloud API.
- Webhooks.
- Templates.
- Respuestas automáticas.
- AI Lead Assistant conectado a WhatsApp.
- Bot inteligente.
- Lead scoring automático.
- Resúmenes automáticos.
- Campañas masivas.
- Mensajería proactiva automatizada.
- Automatización de seguimiento.

---

# 4. Rationale

La razón principal de esta decisión es validar primero la captación manual antes de automatizar.

WhatsApp Cloud API agrega complejidad relacionada con:

- Configuración de Meta Business.
- Tokens.
- Webhooks.
- Validación de eventos.
- Templates.
- Reglas oficiales.
- Costos por conversación o mensaje.
- Opt-in y consentimiento.
- Seguridad de datos.
- Manejo de errores.
- Escalamiento humano.
- Integración con backend.
- Integración con AI Lead Assistant.

Implementar todo esto antes de validar la landing puede retrasar el MVP y aumentar el costo sin saber todavía si la oferta convierte.

---

# 5. Product Principle

El principio rector es:

**Primero usamos WhatsApp como canal manual de conversión. Después automatizamos cuando exista validación comercial.**

Esto significa:

- Primero landing.
- Luego CTA manual a WhatsApp.
- Luego aprendizaje de conversaciones reales.
- Luego backend si hay volumen.
- Luego WhatsApp Cloud API si existe necesidad real.
- Luego AI Lead Assistant conectado a WhatsApp si el flujo está validado.

---

# 6. Manual WhatsApp Flow — Phase 1

El flujo activo de Fase 1 será:

```txt
Visitante entra a la landing
↓
Lee propuesta de valor
↓
Hace click en CTA a WhatsApp
↓
Se abre WhatsApp o WhatsApp Web
↓
Se carga mensaje precargado opcional
↓
El prospecto envía el mensaje
↓
Yoryi responde manualmente
↓
Yoryi diagnostica necesidad
↓
Yoryi define próximo paso
```

---

# 7. Recommended WhatsApp Link Format

El formato recomendado es:

```txt
https://wa.me/<phone_number>
```

Con mensaje precargado opcional:

```txt
https://wa.me/<phone_number>?text=<encoded_message>
```

El número debe incluir código de país y no debe incluir:

- Espacios.
- Paréntesis.
- Guiones.
- Signo `+`.

---

# 8. Recommended Pre-filled Message

Mensaje recomendado:

```txt
Hola, vengo desde la landing de Apps Marketing / Yoryi AI Studio. Quiero recibir orientación para mejorar la presencia digital y captación de clientes de mi negocio.
```

Versión corta:

```txt
Hola, quiero consultar por una landing o sistema digital para captar más clientes.
```

Versión orientada a diagnóstico:

```txt
Hola, quiero solicitar un diagnóstico inicial para saber cómo mejorar mi web, landing o captación de leads.
```

---

# 9. CTA Rules for Phase 1

Los CTAs de WhatsApp deben ser claros y comerciales.

Ejemplos permitidos:

- Solicitar diagnóstico por WhatsApp.
- Hablar sobre mi proyecto.
- Quiero captar más clientes.
- Consultar por una landing.
- Mejorar mi presencia digital.
- Empezar una consulta.

Evitar CTAs como:

- Hablar con nuestro bot.
- Recibir respuesta automática.
- Activar asistente IA.
- Automatizar mi WhatsApp ahora.
- Recibir scoring automático.
- Iniciar campaña masiva.

---

# 10. Future WhatsApp Cloud API Strategy

WhatsApp Cloud API será una integración futura.

Podrá considerarse cuando existan:

- Landing validada.
- Leads reales.
- Flujo manual probado.
- Preguntas frecuentes identificadas.
- Backend aprobado.
- Data model aprobado.
- Seguridad y privacidad revisadas.
- ADR vigente.
- Revisión de costos.
- Revisión de reglas oficiales.
- QA conversacional.
- Estrategia de escalamiento humano.

---

# 11. Future WhatsApp Cloud API Responsibilities

En fases futuras, WhatsApp Cloud API podría permitir:

- Recibir mensajes automáticamente.
- Enviar respuestas desde backend.
- Integrar AI Lead Assistant.
- Guardar conversaciones.
- Asociar mensajes a leads.
- Crear o actualizar oportunidades.
- Generar resúmenes.
- Sugerir lead scoring.
- Escalar a humano.
- Enviar notificaciones controladas.
- Usar templates cuando aplique.

---

# 12. Future WhatsApp Cloud API Flow

```txt
Prospecto escribe por WhatsApp
↓
WhatsApp Cloud API recibe mensaje
↓
Webhook envía evento al backend
↓
Backend valida payload
↓
Backend identifica o crea lead
↓
Backend guarda mensaje
↓
AI Lead Assistant analiza intención
↓
Sistema genera respuesta
↓
WhatsApp Cloud API envía respuesta
↓
Sistema actualiza conversación
↓
Yoryi recibe resumen o alerta si aplica
```

---

# 13. Future Backend Dependency

WhatsApp Cloud API no debe implementarse sin backend aprobado.

El backend futuro deberá manejar:

- Webhook público.
- Verificación de webhook.
- Validación de payload.
- Seguridad de tokens.
- Normalización de mensajes.
- Creación o actualización de leads.
- Persistencia de conversaciones.
- Manejo de errores.
- Escalamiento humano.
- Logs seguros.

---

# 14. Future AI Dependency

AI Lead Assistant podrá conectarse a WhatsApp Cloud API solo en una fase futura.

Antes debe existir:

- Prompt system definido.
- Fallback prompt definido.
- Lead summary prompt definido.
- Lead scoring prompt definido.
- AIProvider abstraction.
- Proveedor IA aprobado.
- QA conversacional.
- Guardrails comerciales.
- Reglas de privacidad.
- Escalamiento humano.

La IA no debe responder por WhatsApp sin supervisión, pruebas y límites definidos.

---

# 15. Future Opt-In and Consent

Antes de enviar mensajes proactivos o automatizados, se debe definir una estrategia de consentimiento.

El sistema futuro debe poder responder:

- ¿El usuario inició la conversación?
- ¿El usuario autorizó contacto por WhatsApp?
- ¿Qué tipo de mensajes autorizó?
- ¿Cuándo dio consentimiento?
- ¿Desde qué canal llegó?
- ¿Cómo puede dejar de recibir mensajes?

En Fase 1, el usuario inicia manualmente la conversación mediante el link de WhatsApp.

---

# 16. Future Templates

Los templates de WhatsApp quedan para fases futuras.

Podrán evaluarse para:

- Confirmaciones.
- Seguimientos.
- Recordatorios.
- Reapertura de conversaciones.
- Notificaciones comerciales permitidas.

Reglas futuras:

- Usar solo templates aprobados.
- No usarlos para spam.
- No enviar mensajes sin permiso.
- Revisar categorías y costos.
- Documentar decisión antes de producción.

---

# 17. Future Pricing and Cost Review

Antes de implementar WhatsApp Cloud API se debe revisar:

- Costos por país.
- Costos por tipo de conversación.
- Costos de templates.
- Volumen estimado.
- Frecuencia de mensajes.
- Presupuesto mensual.
- Proveedor adicional si aplica.
- Retorno esperado.

Regla:

**No se activa WhatsApp Cloud API en producción sin revisión de costos y ADR vigente.**

---

# 18. Security Rules

## Phase 1

En Fase 1:

- No hay tokens de WhatsApp.
- No hay webhook.
- No hay integración con Meta.
- No hay secretos relacionados con WhatsApp Cloud API.
- No hay backend de mensajería.

## Future

Cuando se implemente WhatsApp Cloud API:

- Tokens deben ir en variables de entorno.
- No exponer tokens en frontend.
- Validar webhooks.
- Proteger endpoints.
- Evitar logs con datos sensibles.
- Manejar errores de proveedor.
- Controlar acceso a conversaciones.
- Respetar reglas de privacidad.
- Definir retención de mensajes.

---

# 19. Privacy Rules

## Phase 1

En Fase 1:

- El usuario inicia conversación manualmente.
- No se extraen conversaciones automáticamente.
- No se guardan mensajes automáticamente.
- No se usa IA sobre conversaciones.
- No se envían datos a proveedores IA.
- No se hacen campañas masivas.

## Future

Cuando exista WhatsApp Cloud API:

- Definir qué mensajes se guardan.
- Definir por cuánto tiempo se guardan.
- Definir quién puede verlos.
- Definir si se envían a IA.
- Minimizar datos personales.
- No pedir datos sensibles.
- No usar conversaciones para entrenamiento sin consentimiento.
- Permitir escalamiento humano.

---

# 20. Human Escalation

Cualquier implementación futura debe permitir escalamiento humano.

Debe escalar cuando:

- El usuario pida hablar con una persona.
- El usuario pida precio.
- El usuario pida propuesta.
- El usuario quiera empezar pronto.
- El lead parezca caliente.
- La IA tenga baja confianza.
- La consulta esté fuera de alcance.
- Haya error técnico.
- Exista riesgo de promesa indebida.
- Exista información sensible.

---

# 21. Alternatives Considered

## 21.1 WhatsApp Cloud API desde Fase 1

Rechazado.

### Razones

- Aumenta complejidad.
- Requiere backend.
- Requiere configuración Meta.
- Requiere revisión de políticas.
- Requiere manejo de tokens.
- Requiere QA conversacional.
- Requiere estrategia de privacidad.
- No es necesario para validar la landing.

## 21.2 Chat interno en lugar de WhatsApp

Evaluado, pero no elegido como canal principal inicial.

### Razones

- WhatsApp es más natural para el ICP.
- Reduce fricción de contacto.
- Muchos prospectos ya usan WhatsApp para ventas.
- Un chat interno requeriría más implementación.
- Un chat interno sin IA podría aportar menos confianza que WhatsApp directo.
- Un chat interno con IA movería el proyecto fuera de Fase 1.

## 21.3 Formulario solamente

Rechazado como único canal.

### Razones

- WhatsApp reduce fricción.
- WhatsApp permite conversación inmediata.
- El ICP usa canales conversacionales.
- La landing debe facilitar contacto rápido.

## 21.4 WhatsApp manual

Aceptado para Fase 1.

### Razones

- Simple.
- Bajo costo.
- Fácil de implementar.
- Permite validar interés.
- Permite aprender de conversaciones reales.
- No requiere backend.
- No requiere IA.
- No requiere Meta Business API.

---

# 22. Consequences

## 22.1 Positive Consequences

- Menor complejidad inicial.
- Menor costo.
- Menor tiempo de implementación.
- Menor riesgo técnico.
- Menor riesgo de privacidad.
- Validación más rápida de la landing.
- Conversaciones reales para aprender.
- Base para diseñar mejor la automatización futura.

## 22.2 Negative Consequences

- No habrá automatización inicial.
- La respuesta dependerá de seguimiento humano.
- No habrá historial automático.
- No habrá métricas avanzadas de conversación.
- No habrá AI Lead Assistant por WhatsApp en Fase 1.

## 22.3 Accepted Consequence

Se acepta la gestión manual inicial porque permite aprender antes de automatizar.

---

# 23. Risks

## 23.1 Riesgo: perder leads por respuesta manual lenta

### Mitigación

- CTA claro.
- Mensaje precargado.
- Seguimiento humano ordenado.
- Revisar frecuencia de mensajes.
- En futura fase, evaluar automatización si hay volumen.

## 23.2 Riesgo: querer automatizar antes de tiempo

### Mitigación

- Mantener WhatsApp Cloud API fuera de Fase 1.
- Requerir ADR y fase aprobada.
- Usar regression checklist.
- Usar release checklist.

## 23.3 Riesgo: confundir WhatsApp manual con bot

### Mitigación

- Copy claro.
- No decir que responde una IA.
- No prometer respuesta automática.

## 23.4 Riesgo: futuros costos de WhatsApp Cloud API

### Mitigación

- Revisar precios antes de activar.
- Definir presupuesto.
- Medir volumen.
- Documentar decisión.

## 23.5 Riesgo: privacidad en conversaciones futuras

### Mitigación

- Definir política de datos.
- Minimizar datos.
- Proteger conversaciones.
- Revisar antes de usar IA.

---

# 24. Change Control

Cambiar esta decisión requiere:

- Actualizar este ADR.
- Actualizar `whatsapp-integration.md`.
- Actualizar `api-contracts.md`.
- Actualizar `security-and-privacy.md`.
- Actualizar `conversation-flows.md`.
- Actualizar QA Matrix.
- Aprobar nueva fase.
- Registrar decisión explícita de Yoryi.

No se puede implementar WhatsApp Cloud API en Fase 1 sin actualización formal de SDD y ADR.

---

# 25. Validation

La decisión se considera válida si:

- Fase 1 usa WhatsApp manual.
- El CTA `wa.me` funciona.
- El mensaje precargado, si existe, es correcto.
- No hay WhatsApp Cloud API en Fase 1.
- No hay webhooks en Fase 1.
- No hay templates en Fase 1.
- No hay bot en Fase 1.
- No hay AI Lead Assistant por WhatsApp en Fase 1.
- La documentación mantiene WhatsApp Cloud API como futuro.

---

# 26. Related Documents

Este ADR se relaciona con:

- `AGENTS.md`
- `docs/01-sdd/sdd-index.md`
- `docs/05-decisions/adr-001-project-scope.md`
- `docs/05-decisions/adr-002-stack.md`
- `docs/05-decisions/adr-003-ai-provider.md`
- `docs/01-sdd/conversation-flows.md`
- `docs/02-architecture/whatsapp-integration.md`
- `docs/02-architecture/api-contracts.md`
- `docs/02-architecture/ai-agent-design.md`
- `docs/02-architecture/security-and-privacy.md`
- `docs/04-tests/qa-matrix.md`
- `docs/04-tests/conversation-test-cases.md`
- `docs/04-tests/regression-checklist.md`
- `docs/04-tests/release-checklist.md`

---

# 27. Decision Summary

Se decide:

## Fase 1

- Usar WhatsApp manual.
- Usar link `wa.me`.
- Permitir mensaje precargado.
- Mantener seguimiento humano.
- No usar WhatsApp Cloud API.
- No usar webhooks.
- No usar bot.
- No automatizar conversaciones.

## Futuro

- Evaluar WhatsApp Cloud API.
- Implementar webhooks si hay backend aprobado.
- Usar templates solo si corresponde.
- Respetar opt-in.
- Revisar costos.
- Integrar AI Lead Assistant solo después de QA.
- Mantener escalamiento humano.

---

# 28. Final Statement

La decisión oficial es:

**Fase 1 usa WhatsApp manual mediante link `wa.me`.**

**WhatsApp Cloud API, webhooks, templates, bot inteligente, AI Lead Assistant, lead scoring automático, resúmenes y automatizaciones quedan fuera de Fase 1.**

**Primero se validan conversaciones manuales. Después se automatiza con reglas, backend, privacidad, QA y ADR aprobado.**