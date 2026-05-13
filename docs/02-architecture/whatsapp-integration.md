# WhatsApp Integration — Apps Marketing / Yoryi AI Studio

## 1. Purpose

Este documento define la estrategia de integración con WhatsApp para el proyecto `apps-marketing`.

La Fase 1 no implementa WhatsApp Cloud API.

En Fase 1, WhatsApp se usará únicamente como canal manual mediante enlaces directos desde la landing comercial.

Este documento también deja preparada la integración futura con WhatsApp Cloud API para AI Lead Assistant, backend, dashboard, automatizaciones y seguimiento comercial.

Debe mantenerse alineado con:

- `AGENTS.md`
- `docs/01-sdd/sdd-index.md`
- `docs/01-sdd/prd.md`
- `docs/01-sdd/scope.md`
- `docs/01-sdd/user-stories.md`
- `docs/01-sdd/acceptance-criteria.md`
- `docs/01-sdd/conversation-flows.md`
- `docs/02-architecture/system-architecture.md`
- `docs/02-architecture/api-contracts.md`
- `docs/02-architecture/ai-agent-design.md`
- `docs/02-architecture/security-and-privacy.md`
- `docs/05-decisions/adr-004-whatsapp-provider.md`

## 2. Scope Context

### Fase 1 incluye

- CTA manual hacia WhatsApp.
- Enlace `wa.me`.
- Mensaje precargado opcional.
- Conversación humana/manual.
- Seguimiento manual.
- Evaluación manual del lead.

### Fase 1 no incluye

- WhatsApp Cloud API.
- Webhooks.
- Templates.
- Mensajería automatizada.
- AI Lead Assistant.
- Chatbot.
- Respuestas automáticas.
- Campañas masivas.
- Integración con Meta Business.
- Automatización de seguimiento.

## 3. WhatsApp Strategy Principle

El principio rector es:

**Primero usar WhatsApp como canal manual de conversión. Después automatizar cuando exista validación comercial, backend y gobierno de datos.**

La integración oficial con WhatsApp Cloud API debe llegar solo cuando exista una razón comercial clara para automatizar conversaciones.

No se debe integrar WhatsApp Cloud API solo por entusiasmo técnico.

El robot vendedor entra cuando ya haya clientes tocando la puerta, no cuando todavía estamos pintando el cartel.

## 4. Phase 1 WhatsApp Manual Strategy

En Fase 1, WhatsApp funcionará como un canal directo de contacto.

El visitante llega a la landing, entiende la oferta y hace click en un CTA manual hacia WhatsApp.

## 5. Phase 1 WhatsApp Flow

```txt
Visitante
   ↓
Landing comercial
   ↓
CTA a WhatsApp manual
   ↓
WhatsApp / WhatsApp Web
   ↓
Mensaje precargado opcional
   ↓
Conversación humana con Yoryi
   ↓
Seguimiento manual
```

## 6. WhatsApp Manual Link

El enlace recomendado debe usar el formato:

```txt
https://wa.me/<phone_number>
```

También puede usar mensaje precargado:

```txt
https://wa.me/<phone_number>?text=<encoded_message>
```

El número debe incluir código de país y no debe incluir espacios, símbolos ni signos `+`.

Ejemplo conceptual:

```txt
https://wa.me/549XXXXXXXXXX?text=Hola%2C%20quiero%20consultar%20por%20una%20landing%20para%20captar%20clientes.
```

## 7. Recommended Pre-filled Messages

### Mensaje general

```txt
Hola, vengo desde la landing de Apps Marketing / Yoryi AI Studio. Quiero recibir orientación para mejorar la presencia digital y captación de clientes de mi negocio.
```

### Mensaje orientado a landing

```txt
Hola, quiero consultar por una landing comercial para captar más clientes.
```

### Mensaje orientado a diagnóstico

```txt
Hola, quiero solicitar un diagnóstico inicial para saber cómo mejorar mi web, landing o captación de leads.
```

### Mensaje corto

```txt
Hola, quiero hablar sobre mi proyecto digital.
```

## 8. Phase 1 CTA Guidelines

Los CTAs hacia WhatsApp deben ser claros y comerciales.

Ejemplos:

- Solicitar diagnóstico por WhatsApp.
- Hablar sobre mi proyecto.
- Quiero captar más clientes.
- Consultar por una landing.
- Mejorar mi presencia digital.
- Empezar una consulta.

Los CTAs deben evitar:

- Prometer automatización inmediata.
- Decir que responderá un bot.
- Decir que hay AI Lead Assistant activo.
- Prometer respuesta automática.
- Prometer precios finales inmediatos.

## 9. Phase 1 Manual Response Guidelines

Cuando un prospecto escriba por WhatsApp, la respuesta humana debe buscar diagnóstico, no venta agresiva.

### Respuesta inicial sugerida

```txt
Hola, gracias por escribirme. Para orientarte mejor, cuéntame brevemente qué tipo de negocio tienes y qué quieres mejorar ahora: tu web, una landing, captación de leads, marketing o automatización.
```

### Si pide una landing

```txt
Perfecto. Para orientarte bien, dime si ya tienes una web o landing actual y cuál sería el objetivo principal: captar más consultas, explicar mejor tu servicio o vender una oferta específica.
```

### Si pide IA directamente

```txt
Sí, trabajamos soluciones con IA, pero normalmente conviene primero validar la oferta, la captación y el flujo comercial. Según tu caso podemos empezar con una landing o sistema base y luego evolucionar hacia automatización inteligente.
```

### Si pregunta por precio

```txt
Depende del alcance. Para darte una orientación seria necesito entender qué tipo de negocio tienes, qué objetivo quieres lograr y si necesitas solo landing, web completa o una solución por etapas.
```

### Si no sabe qué necesita

```txt
No hay problema. Podemos empezar con un diagnóstico simple: vemos qué vendes, cómo llegan hoy tus clientes y dónde se pierde la conversión. A partir de ahí definimos si conviene landing, web, marketing o automatización.
```

## 10. Phase 1 Manual Data Capture

Durante la conversación manual, se recomienda capturar:

- Nombre.
- Negocio.
- Tipo de negocio.
- Servicio de interés.
- Problema principal.
- Canal actual de captación.
- Urgencia.
- Presupuesto aproximado si el prospecto lo comparte.
- Próximo paso acordado.

Estos datos pueden registrarse manualmente en Fase 1.

No es obligatorio usar base de datos ni dashboard en Fase 1.

## 11. Phase 1 Rules

En Fase 1:

- WhatsApp es manual.
- No se usa WhatsApp Cloud API.
- No se usan webhooks.
- No se usan templates.
- No hay bot.
- No hay AI Lead Assistant.
- No hay respuestas automáticas.
- No hay campañas masivas.
- No hay lead scoring automático.
- No se prometen respuestas instantáneas automatizadas.
- No se piden datos sensibles innecesarios.

## 12. Future WhatsApp Cloud API Overview

WhatsApp Cloud API será considerada en fases futuras, especialmente cuando se implemente AI Lead Assistant.

Meta documenta que WhatsApp Business Platform permite construir integraciones usando la Cloud API, mensajes, plantillas y webhooks. Los mensajes libres de servicio pueden enviarse durante la ventana de atención al cliente, y fuera de esa ventana normalmente se usan templates aprobados. Las reglas y precios deben revisarse contra documentación oficial al momento de implementación.

## 13. Future Activation Conditions

Antes de implementar WhatsApp Cloud API deben cumplirse estas condiciones:

- Landing comercial validada.
- Flujo manual de WhatsApp funcionando.
- Leads reales observados.
- Preguntas frecuentes identificadas.
- Backend aprobado.
- Modelo de datos aprobado.
- Seguridad y privacidad revisadas.
- ADR de WhatsApp aprobado.
- Revisión de costos realizada.
- Revisión de políticas oficiales realizada.
- QA conversacional preparado.
- Escalamiento humano definido.

## 14. Future WhatsApp Cloud API Flow

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
Escalamiento humano si aplica
```

## 15. Future Components

### 15.1 WhatsApp Cloud API

Responsabilidades futuras:

- Recibir mensajes.
- Enviar respuestas.
- Gestionar número de WhatsApp Business.
- Usar templates cuando aplique.
- Mantener conversación bajo reglas oficiales.

### 15.2 Webhook Backend

Responsabilidades futuras:

- Recibir eventos.
- Validar origen.
- Normalizar payload.
- Evitar duplicados.
- Crear o actualizar leads.
- Guardar mensajes.
- Invocar AI Lead Assistant si corresponde.
- Manejar errores.

### 15.3 AI Lead Assistant

Responsabilidades futuras:

- Entender intención.
- Hacer preguntas.
- Resumir conversación.
- Sugerir score.
- Escalar a humano.
- Mantener límites y guardrails.

### 15.4 Dashboard

Responsabilidades futuras:

- Mostrar leads.
- Mostrar conversaciones.
- Mostrar estados.
- Mostrar resúmenes.
- Mostrar prioridad.
- Permitir seguimiento humano.

## 16. Future WhatsApp Webhook Endpoint

Endpoint conceptual futuro:

```txt
POST /webhooks/whatsapp
```

La especificación conceptual del endpoint se mantiene en:

- `docs/02-architecture/api-contracts.md`

Este endpoint no se implementa en Fase 1.

## 17. Future Environment Variables

Variables futuras posibles:

```txt
WHATSAPP_VERIFY_TOKEN=
WHATSAPP_ACCESS_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=
WHATSAPP_BUSINESS_ACCOUNT_ID=
WHATSAPP_APP_SECRET=
WEBHOOK_SECRET=
```

Estas variables no deben ser necesarias en Fase 1.

## 18. Future Webhook Validation

Cuando exista WhatsApp Cloud API, el backend deberá validar:

- Token de verificación.
- Firma o mecanismo recomendado por Meta.
- Payload esperado.
- Eventos duplicados.
- Eventos inválidos.
- Errores de entrega.
- Estados de mensajes.

## 19. Future Customer Service Window

Cuando se implemente WhatsApp Cloud API, se deberá respetar la ventana de atención al cliente definida por WhatsApp Business Platform.

Regla conceptual:

- Cuando el usuario inicia conversación, se abre una ventana de atención.
- Durante esa ventana se pueden enviar mensajes de servicio.
- Fuera de esa ventana, pueden requerirse templates aprobados.
- Las reglas exactas deben revisarse contra documentación oficial vigente antes de producción.

## 20. Future Message Templates

Los templates serán futuros y no forman parte de Fase 1.

Podrán usarse para:

- Seguimiento posterior.
- Confirmaciones.
- Recordatorios.
- Reapertura de conversación si aplica.

Reglas futuras:

- Solo usar templates aprobados.
- No usar templates para spam.
- No hacer campañas sin consentimiento.
- No enviar mensajes proactivos sin base legal o permiso.
- Revisar categoría, costo y política aplicable.

## 21. Future Opt-In and Consent

Antes de enviar mensajes proactivos en fases futuras, se deberá definir opt-in.

El sistema deberá poder responder:

- ¿El usuario autorizó contacto por WhatsApp?
- ¿Para qué tipo de mensajes?
- ¿Desde qué formulario o canal?
- ¿Cuándo dio consentimiento?
- ¿Cómo puede dejar de recibir mensajes?

En Fase 1, el usuario inicia manualmente la conversación mediante link, por lo que no hay automatización proactiva.

## 22. Future Pricing and Cost Control

La integración futura debe revisar costos antes de activarse.

Aspectos a revisar:

- País del destinatario.
- Categoría de mensaje.
- Tipo de conversación.
- Templates.
- Volumen de mensajes.
- Mensajes iniciados por usuario.
- Mensajes iniciados por negocio.
- Uso de proveedores externos si aplica.

Regla del proyecto:

**No activar WhatsApp Cloud API en producción sin revisar costos y documentar decisión en ADR.**

## 23. Future Error Handling

La integración futura debe manejar:

- Webhook inválido.
- Token expirado.
- Número no configurado.
- Payload inesperado.
- Error al enviar mensaje.
- Mensaje no entregado.
- Límite de API.
- Error de proveedor.
- Falla del AI Lead Assistant.

Fallback recomendado:

```txt
No pudimos procesar automáticamente este mensaje. La conversación debe escalarse a revisión humana.
```

## 24. Future Human Escalation

El sistema futuro debe escalar a humano cuando:

- El prospecto pide precio.
- El prospecto pide propuesta.
- El prospecto quiere empezar pronto.
- El lead parece caliente.
- La IA no entiende.
- La conversación sale de alcance.
- El usuario pide hablar con una persona.
- Hay un error técnico.
- Se requiere decisión comercial.

## 25. Future Data Privacy Rules

La integración futura debe respetar:

- Captura mínima de datos.
- No pedir información sensible innecesaria.
- No almacenar conversaciones sin política clara.
- No enviar conversaciones a IA sin decisión aprobada.
- No compartir datos con terceros sin necesidad.
- Definir retención de mensajes.
- Definir acceso interno.
- Definir eliminación o corrección de datos si aplica.

## 26. Future Security Rules

Cuando exista WhatsApp Cloud API:

- Proteger tokens.
- Usar variables de entorno.
- Validar webhooks.
- No exponer secretos en frontend.
- Registrar errores de forma segura.
- Evitar logs con datos sensibles.
- Controlar acceso al dashboard.
- Definir permisos internos.

## 27. Future QA Requirements

Antes de producción, se debe probar:

- Recepción de mensajes.
- Validación de webhook.
- Envío de respuestas.
- Manejo de errores.
- Duplicados.
- Escalamiento humano.
- Respeto de ventana de atención.
- Uso correcto de templates si aplica.
- Respuestas del AI Lead Assistant.
- No envío de campañas no autorizadas.
- Privacidad de datos.

## 28. Future Test Cases

| Caso | Resultado esperado |
|---|---|
| Usuario inicia conversación | Sistema crea o identifica lead |
| Usuario pide precio | Escalamiento humano |
| Usuario pide IA | Asistente explica enfoque por fases |
| Payload inválido | Rechazo seguro |
| Mensaje duplicado | No duplicar conversación |
| Error del proveedor IA | Fallback y escalamiento |
| Fuera de ventana de atención | Evaluar template o escalar |
| Usuario pide humano | Escalamiento inmediato |
| Usuario fuera de alcance | Respuesta segura y breve |

## 29. Out of Scope for Phase 1

No se implementará en Fase 1:

- WhatsApp Cloud API.
- Webhooks.
- Templates.
- Mensajería automatizada.
- Bot por WhatsApp.
- AI Lead Assistant.
- Lead scoring automático.
- Resumen automático.
- Dashboard de conversaciones.
- Campañas.
- Opt-in automático.
- Seguimiento automatizado.

## 30. Traceability

| Area | Related Docs | Phase |
|---|---|---:|
| WhatsApp manual CTA | conversation-flows.md, functional-requirements.md | 1 |
| Manual follow-up | conversation-flows.md, success-metrics.md | 1 |
| Future WhatsApp Cloud API | api-contracts.md, ai-agent-design.md | 4 |
| Future AI responses | ai-agent-design.md, docs/03-prompts/* | 4 |
| Future lead scoring | lead-scoring-spec.md | 4 |
| Future data storage | data-model.md, security-and-privacy.md | 3 / 4 |
| Future ADR | adr-004-whatsapp-provider.md | 4 |

## 31. Implementation Rule

Este documento no autoriza implementación de WhatsApp Cloud API.

Para implementar WhatsApp Cloud API se requiere:

- Fase aprobada.
- ADR aprobado.
- Backend disponible.
- Contratos API definidos.
- Revisión de políticas oficiales.
- Revisión de costos.
- Seguridad y privacidad revisadas.
- QA conversacional.
- Escalamiento humano.
- Variables de entorno configuradas.
- Pruebas en entorno controlado.

## 32. References

- Meta for Developers — WhatsApp Business Platform.
- Meta for Developers — WhatsApp Cloud API.
- Meta for Developers — WhatsApp Messages API.
- Meta for Developers — WhatsApp Templates.
- Meta for Developers — WhatsApp Pricing.

## 33. Final Statement

En Fase 1, WhatsApp será únicamente un canal manual mediante link desde la landing.

WhatsApp Cloud API, webhooks, templates, mensajería automatizada, AI Lead Assistant, lead scoring, resúmenes automáticos y campañas quedan documentados como capacidades futuras.

No se implementará ninguna automatización de WhatsApp en Fase 1.