# API Contracts — Apps Marketing / Yoryi AI Studio

## 1. Purpose

Este documento define los contratos conceptuales de API para el proyecto `apps-marketing`.

La Fase 1 no requiere una API completa ni backend obligatorio.  
Sin embargo, este documento deja preparado el diseño futuro para captura estructurada de leads, dashboard interno, AI Lead Assistant, WhatsApp Cloud API y automatizaciones.

Debe quedar claro que los contratos aquí descritos son principalmente futuros y no autorizan implementación fuera del alcance aprobado.

Este documento debe mantenerse alineado con:

- `AGENTS.md`
- `docs/01-sdd/sdd-index.md`
- `docs/01-sdd/prd.md`
- `docs/01-sdd/scope.md`
- `docs/01-sdd/user-stories.md`
- `docs/01-sdd/acceptance-criteria.md`
- `docs/01-sdd/functional-requirements.md`
- `docs/01-sdd/non-functional-requirements.md`
- `docs/02-architecture/system-architecture.md`
- `docs/02-architecture/data-model.md`
- `docs/02-architecture/security-and-privacy.md`

## 2. Scope Context

### Fase 1 incluye

- Landing comercial.
- CTA a WhatsApp manual.
- Formulario de contacto.
- Captura simple de datos.
- Seguimiento humano/manual.
- Posible solución simple para envío de formulario.

### Fase 1 no incluye

- API completa obligatoria.
- Backend completo.
- Dashboard completo.
- Autenticación.
- PostgreSQL obligatorio.
- Prisma obligatorio.
- WhatsApp Cloud API.
- AI Lead Assistant.
- OpenAI API.
- Ollama.
- Lead scoring automático.
- Automatizaciones avanzadas.

## 3. API Design Principle

El principio rector de API es:

**No construir backend antes de validar la landing, pero diseñar contratos futuros para evitar improvisación.**

La API debe aparecer cuando exista necesidad real de:

- Registrar leads.
- Gestionar estados.
- Consultar oportunidades.
- Integrar dashboard.
- Procesar conversaciones.
- Integrar IA.
- Automatizar WhatsApp.
- Medir mejor el embudo.

## 4. Phase 1 API Strategy

En Fase 1, la landing puede funcionar sin API propia.

Opciones permitidas para el formulario:

- Servicio externo de formularios.
- Envío por email.
- API route mínima si se aprueba.
- Registro manual temporal.
- Herramienta simple de bajo costo.

Si se implementa una API route mínima para formulario, debe cumplir:

- Bajo costo.
- Sin autenticación compleja.
- Sin dashboard obligatorio.
- Sin lead scoring automático.
- Sin IA.
- Sin WhatsApp Cloud API.
- Validación básica.
- Protección mínima contra abuso.
- Privacidad básica.

## 5. Phase 1 Optional Minimal Endpoint

Este endpoint es opcional y solo aplica si se decide resolver el formulario con una API mínima.

## POST `/contact-form`

### Phase

Fase 1 — Opcional.

### Purpose

Recibir datos mínimos del formulario de contacto de la landing.

### Request Body

```json
{
  "name": "Carlos Pérez",
  "email": "carlos@example.com",
  "phone": "+5491112345678",
  "businessType": "Consultoría",
  "serviceInterest": "landing_page",
  "message": "Necesito una landing para captar más clientes por WhatsApp."
}
```

### Required Fields

Al menos:

- `name`
- `message`
- `email` o `phone`

### Optional Fields

- `businessType`
- `serviceInterest`

### Validation Rules

| Field | Rule |
|---|---|
| `name` | Requerido, texto corto |
| `email` | Opcional, formato email si existe |
| `phone` | Opcional, formato razonable si existe |
| `businessType` | Opcional |
| `serviceInterest` | Opcional, valor conocido o `other` |
| `message` | Requerido, texto razonable |

### Success Response

```json
{
  "success": true,
  "message": "Solicitud recibida correctamente."
}
```

### Error Response

```json
{
  "success": false,
  "error": "VALIDATION_ERROR",
  "message": "Debes indicar nombre, mensaje y al menos un canal de contacto."
}
```

### Allowed Behavior in Phase 1

El endpoint puede:

- Validar datos básicos.
- Enviar email interno.
- Registrar datos en una herramienta simple si se aprueba.
- Devolver confirmación al usuario.

### Not Allowed in Phase 1

El endpoint no debe:

- Calcular lead scoring automático.
- Usar IA.
- Llamar OpenAI.
- Llamar Ollama.
- Enviar mensajes automáticos por WhatsApp Cloud API.
- Crear dashboard.
- Activar CRM avanzado.
- Iniciar campañas.

## 6. Future API Overview

En fases futuras, el sistema podrá evolucionar hacia una API completa.

Endpoints conceptuales futuros:

| Method | Endpoint | Purpose | Future Phase |
|---|---|---|---:|
| `POST` | `/leads` | Crear lead | 2 / 3 |
| `GET` | `/leads` | Listar leads | 3 |
| `GET` | `/leads/:id` | Ver detalle de lead | 3 |
| `PATCH` | `/leads/:id/status` | Actualizar estado | 3 |
| `POST` | `/contact-form` | Recibir formulario | 1 opcional / 2 |
| `POST` | `/webhooks/whatsapp` | Recibir eventos WhatsApp | 4 |
| `POST` | `/ai/lead/analyze` | Analizar lead con IA | 4 |
| `POST` | `/ai/lead/score` | Calcular scoring | 4 |
| `POST` | `/ai/lead/summary` | Generar resumen | 4 |
| `GET` | `/conversations/:id/messages` | Obtener mensajes | 4 |
| `POST` | `/notifications/send` | Enviar notificación | 3 / 4 |

## 7. Future Endpoint — Create Lead

## POST `/leads`

### Phase

Fase 2 / Fase 3.

### Purpose

Crear un lead estructurado desde formulario, dashboard, carga manual o futuras integraciones.

### Request Body

```json
{
  "name": "Carlos Pérez",
  "businessName": "CP Consultores",
  "businessType": "Consultoría",
  "contactEmail": "carlos@example.com",
  "contactPhone": "+5491112345678",
  "serviceInterest": "landing_page",
  "message": "Quiero una landing para captar más clientes.",
  "source": "landing",
  "urgency": "this_month",
  "budgetRange": "medium"
}
```

### Success Response

```json
{
  "id": "lead_123",
  "name": "Carlos Pérez",
  "status": "new",
  "createdAt": "2026-05-13T12:00:00.000Z"
}
```

### Validation Rules

- `name` requerido.
- Al menos un contacto: `contactEmail` o `contactPhone`.
- `message` requerido o recomendado según canal.
- `serviceInterest` debe ser valor conocido o `other`.
- `source` debe indicar canal de origen.

### Not Active in Phase 1

Este endpoint no es obligatorio en Fase 1.

## 8. Future Endpoint — List Leads

## GET `/leads`

### Phase

Fase 3.

### Purpose

Listar leads para dashboard interno.

### Query Params

| Param | Description |
|---|---|
| `status` | Filtrar por estado |
| `serviceInterest` | Filtrar por servicio |
| `source` | Filtrar por origen |
| `page` | Paginación |
| `limit` | Cantidad por página |

### Example Response

```json
{
  "items": [
    {
      "id": "lead_123",
      "name": "Carlos Pérez",
      "businessName": "CP Consultores",
      "serviceInterest": "landing_page",
      "status": "new",
      "source": "landing",
      "createdAt": "2026-05-13T12:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 1
  }
}
```

### Not Active in Phase 1

Este endpoint pertenece a dashboard futuro.

## 9. Future Endpoint — Get Lead Detail

## GET `/leads/:id`

### Phase

Fase 3.

### Purpose

Consultar detalle completo de un lead.

### Example Response

```json
{
  "id": "lead_123",
  "name": "Carlos Pérez",
  "businessName": "CP Consultores",
  "businessType": "Consultoría",
  "contactEmail": "carlos@example.com",
  "contactPhone": "+5491112345678",
  "serviceInterest": "landing_page",
  "message": "Quiero una landing para captar más clientes.",
  "source": "landing",
  "status": "new",
  "urgency": "this_month",
  "budgetRange": "medium",
  "summary": null,
  "createdAt": "2026-05-13T12:00:00.000Z",
  "updatedAt": "2026-05-13T12:00:00.000Z"
}
```

### Not Active in Phase 1

Este endpoint pertenece a backend/dashboard futuro.

## 10. Future Endpoint — Update Lead Status

## PATCH `/leads/:id/status`

### Phase

Fase 3.

### Purpose

Actualizar estado comercial del lead.

### Request Body

```json
{
  "status": "contacted"
}
```

### Allowed Future Status Values

| Status | Description |
|---|---|
| `new` | Lead recibido |
| `contacted` | Contactado |
| `diagnosis` | En diagnóstico |
| `proposal_sent` | Propuesta enviada |
| `won` | Ganado |
| `lost` | Perdido |
| `not_qualified` | No calificado |

### Success Response

```json
{
  "id": "lead_123",
  "status": "contacted",
  "updatedAt": "2026-05-13T13:00:00.000Z"
}
```

### Not Active in Phase 1

Este endpoint pertenece a dashboard futuro.

## 11. Future Endpoint — WhatsApp Webhook

## POST `/webhooks/whatsapp`

### Phase

Fase 4.

### Purpose

Recibir eventos de WhatsApp Cloud API en fases futuras.

### Request Body

El payload dependerá de Meta WhatsApp Cloud API.

Representación conceptual:

```json
{
  "object": "whatsapp_business_account",
  "entry": [
    {
      "id": "waba_id",
      "changes": [
        {
          "field": "messages",
          "value": {
            "messages": [
              {
                "from": "5491112345678",
                "id": "wamid.xxx",
                "timestamp": "1715600000",
                "text": {
                  "body": "Hola, quiero una landing para mi negocio."
                },
                "type": "text"
              }
            ]
          }
        }
      ]
    }
  ]
}
```

### Future Responsibilities

El endpoint futuro podrá:

- Validar webhook.
- Recibir mensajes.
- Normalizar payload.
- Asociar mensaje a lead.
- Guardar conversación.
- Invocar AI Lead Assistant si corresponde.
- Escalar a humano.
- Responder mediante WhatsApp Cloud API.

### Not Allowed in Phase 1

No se implementa en Fase 1.

## 12. Future Endpoint — Analyze Lead with AI

## POST `/ai/lead/analyze`

### Phase

Fase 4.

### Purpose

Analizar información de un lead o conversación usando AI Lead Assistant.

### Request Body

```json
{
  "leadId": "lead_123",
  "message": "Necesito una landing para captar clientes por WhatsApp.",
  "context": {
    "businessType": "Consultoría",
    "serviceInterest": "landing_page",
    "source": "whatsapp"
  }
}
```

### Success Response

```json
{
  "intent": "landing_page",
  "problemClarity": "high",
  "recommendedNextStep": "ask_budget_and_timeline",
  "needsHumanEscalation": false
}
```

### Not Active in Phase 1

No se implementa IA en Fase 1.

## 13. Future Endpoint — Lead Score

## POST `/ai/lead/score`

### Phase

Fase 4.

### Purpose

Calcular score futuro del lead.

### Request Body

```json
{
  "leadId": "lead_123",
  "serviceInterest": "landing_page",
  "businessType": "Consultoría",
  "urgency": "this_month",
  "budgetRange": "medium",
  "problemDescription": "Tengo tráfico pero no convierto en clientes."
}
```

### Success Response

```json
{
  "leadScore": 82,
  "leadCategory": "hot",
  "confidence": "high",
  "breakdown": {
    "serviceFit": 18,
    "icpFit": 14,
    "urgency": 15,
    "problemClarity": 13,
    "budgetFit": 12,
    "businessPotential": 8,
    "channelFit": 5,
    "decisionReadiness": 5
  },
  "recommendedNextStep": "Priorizar contacto humano y ofrecer diagnóstico."
}
```

### Not Active in Phase 1

Lead scoring automático queda fuera de Fase 1.

## 14. Future Endpoint — Lead Summary

## POST `/ai/lead/summary`

### Phase

Fase 4.

### Purpose

Generar resumen comercial automático de un lead o conversación.

### Request Body

```json
{
  "leadId": "lead_123",
  "messages": [
    {
      "senderType": "lead",
      "content": "Quiero una landing para mi consultora."
    },
    {
      "senderType": "ai_assistant",
      "content": "¿Ya tienes una web actual?"
    },
    {
      "senderType": "lead",
      "content": "Tengo una web vieja, pero no convierte."
    }
  ]
}
```

### Success Response

```json
{
  "summary": "Prospecto con consultora que necesita reemplazar una web actual que no convierte. Busca una landing orientada a captar clientes.",
  "serviceInterest": "landing_page",
  "mainProblem": "Web actual no convierte",
  "recommendedNextStep": "Ofrecer diagnóstico y propuesta de landing comercial."
}
```

### Not Active in Phase 1

Resumen automático por IA queda fuera de Fase 1.

## 15. Future Endpoint — Conversation Messages

## GET `/conversations/:id/messages`

### Phase

Fase 4.

### Purpose

Consultar mensajes de una conversación futura.

### Example Response

```json
{
  "conversationId": "conv_123",
  "messages": [
    {
      "id": "msg_1",
      "senderType": "lead",
      "content": "Hola, quiero una landing.",
      "createdAt": "2026-05-13T12:00:00.000Z"
    },
    {
      "id": "msg_2",
      "senderType": "ai_assistant",
      "content": "Perfecto. ¿Qué tipo de negocio tienes?",
      "createdAt": "2026-05-13T12:01:00.000Z"
    }
  ]
}
```

### Not Active in Phase 1

No hay historial automatizado de conversaciones en Fase 1.

## 16. Future Endpoint — Send Notification

## POST `/notifications/send`

### Phase

Fase 3 / Fase 4.

### Purpose

Enviar notificación interna sobre eventos importantes.

### Request Body

```json
{
  "type": "new_lead",
  "leadId": "lead_123",
  "channel": "email",
  "payload": {
    "title": "Nuevo lead recibido",
    "message": "Carlos Pérez solicitó información sobre landing comercial."
  }
}
```

### Success Response

```json
{
  "success": true,
  "notificationId": "notif_123",
  "status": "sent"
}
```

### Not Active in Phase 1

No es obligatorio en Fase 1.

## 17. Authentication Strategy

## 17.1 Phase 1

Fase 1 no requiere autenticación si solo existe landing pública.

Si se implementa formulario mínimo, debe protegerse con medidas básicas según necesidad:

- Validación.
- Rate limiting simple si aplica.
- Protección anti-spam si aplica.
- No exponer secretos en frontend.

## 17.2 Future Phases

Cuando exista dashboard o API privada, se deberá definir:

- Autenticación.
- Autorización.
- Roles.
- Sesiones o tokens.
- Protección de endpoints.
- Auditoría.

Roles futuros posibles:

- `owner`
- `admin`
- `operator`

## 18. Error Handling

## 18.1 Standard Error Format

Formato futuro recomendado:

```json
{
  "success": false,
  "error": "ERROR_CODE",
  "message": "Descripción clara del error.",
  "details": {}
}
```

## 18.2 Common Error Codes

| Code | Description |
|---|---|
| `VALIDATION_ERROR` | Datos inválidos |
| `NOT_FOUND` | Recurso no encontrado |
| `UNAUTHORIZED` | No autenticado |
| `FORBIDDEN` | Sin permiso |
| `RATE_LIMITED` | Demasiadas solicitudes |
| `INTERNAL_ERROR` | Error interno |
| `AI_PROVIDER_ERROR` | Error futuro del proveedor IA |
| `WHATSAPP_WEBHOOK_ERROR` | Error futuro en webhook WhatsApp |

## 19. Validation Strategy

La validación debe ser explícita.

En fases futuras se recomienda validar:

- Tipos de datos.
- Campos requeridos.
- Valores permitidos.
- Longitud máxima.
- Formato de email.
- Formato de teléfono.
- Payloads externos.
- Seguridad de webhooks.

En Fase 1, la validación mínima aplica principalmente al formulario.

## 20. Security Rules

La API futura debe respetar:

- No exponer secretos.
- Validar input.
- No confiar en payloads externos sin validación.
- Proteger webhooks.
- Limitar abuso.
- Respetar privacidad de leads.
- Capturar solo datos necesarios.
- No enviar datos a IA sin decisión documentada.
- No almacenar conversaciones sin justificación.

## 21. Rate Limiting and Abuse Protection

## 21.1 Phase 1

Si existe formulario, considerar protección contra:

- Spam.
- Envíos repetidos.
- Campos abusivos.
- Bots simples.

## 21.2 Future Phases

Cuando exista API completa:

- Rate limiting por IP.
- Protección de endpoints privados.
- Validación de webhooks.
- Logs de intentos sospechosos.
- Reglas anti-abuso.

## 22. API Versioning

En fases futuras, si la API crece, se podrá usar versionado:

```txt
/api/v1/...
```

En Fase 1 no es necesario definir versionado si no existe API completa.

## 23. Environment Variables

## 23.1 Phase 1 Possible Variables

Si se implementa formulario:

```txt
CONTACT_EMAIL=
FORM_PROVIDER_KEY=
NEXT_PUBLIC_SITE_URL=
```

## 23.2 Future Variables

```txt
DATABASE_URL=
JWT_SECRET=
OLLAMA_BASE_URL=
OPENAI_API_KEY=
WHATSAPP_VERIFY_TOKEN=
WHATSAPP_ACCESS_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=
WEBHOOK_SECRET=
```

Estas variables son futuras y no deben ser necesarias para Fase 1.

## 24. Out of Scope for Phase 1

No se implementará en Fase 1:

- API completa de leads.
- Dashboard API.
- Auth.
- Roles.
- PostgreSQL obligatorio.
- Prisma obligatorio.
- WhatsApp webhook.
- AI endpoints.
- Lead scoring endpoint.
- Summary endpoint.
- Notification system completo.
- Automatizaciones.

## 25. Traceability

| API Area | Related Docs | Phase |
|---|---|---:|
| Optional contact form endpoint | functional-requirements.md, security-and-privacy.md | 1 optional |
| Future leads API | data-model.md, system-architecture.md | 2 / 3 |
| Future dashboard API | system-architecture.md, data-model.md | 3 |
| Future WhatsApp webhook | whatsapp-integration.md, conversation-flows.md | 4 |
| Future AI endpoints | ai-agent-design.md, ai-provider-strategy.md | 4 |
| Future notifications | data-model.md, system-architecture.md | 3 / 4 |

## 26. Implementation Rule

Este documento no autoriza implementación automática de backend.

Para implementar endpoints de producción se requiere:

- Fase aprobada.
- Scope actualizado.
- Requisitos funcionales actualizados.
- Requisitos no funcionales actualizados.
- ADR técnico si corresponde.
- Revisión de seguridad.
- QA correspondiente.

## 27. Final Statement

En Fase 1, `apps-marketing` puede funcionar sin API completa.  
Solo se permite una solución simple para el formulario si se aprueba dentro del alcance.

Los contratos de API para leads, dashboard, WhatsApp Cloud API, AI Lead Assistant, lead scoring, resúmenes y notificaciones quedan documentados como arquitectura futura.

No se implementará backend completo, WhatsApp Cloud API, IA, dashboard, lead scoring automático ni automatizaciones en Fase 1.