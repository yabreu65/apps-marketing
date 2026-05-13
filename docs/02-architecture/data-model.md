# Data Model — Apps Marketing / Yoryi AI Studio

## 1. Purpose

Este documento define el modelo de datos conceptual del proyecto `apps-marketing`.

La Fase 1 no requiere base de datos obligatoria ni backend completo.  
Sin embargo, el proyecto debe quedar preparado para evolucionar hacia captura estructurada de leads, dashboard interno, AI Lead Assistant, WhatsApp Cloud API y automatizaciones futuras.

Este documento separa claramente:

- Datos activos o mínimos de Fase 1.
- Modelo conceptual futuro.
- Entidades futuras.
- Relaciones entre entidades.
- Reglas de privacidad y bajo costo.
- Límites de implementación por fase.

Debe mantenerse alineado con:

- `AGENTS.md`
- `docs/01-sdd/sdd-index.md`
- `docs/01-sdd/prd.md`
- `docs/01-sdd/scope.md`
- `docs/01-sdd/user-stories.md`
- `docs/01-sdd/acceptance-criteria.md`
- `docs/01-sdd/functional-requirements.md`
- `docs/01-sdd/non-functional-requirements.md`
- `docs/01-sdd/conversation-flows.md`
- `docs/01-sdd/lead-scoring-spec.md`
- `docs/02-architecture/system-architecture.md`
- `docs/02-architecture/security-and-privacy.md`

## 2. Scope Context

### Fase 1 incluye

- Landing comercial.
- CTA a WhatsApp manual.
- Formulario de contacto.
- Captura mínima de datos.
- Seguimiento humano/manual.
- Posible envío simple de formulario.
- Evaluación manual de leads.

### Fase 1 no incluye

- Base de datos obligatoria.
- PostgreSQL obligatorio.
- Prisma obligatorio.
- Dashboard completo.
- CRM avanzado.
- AI Lead Assistant.
- WhatsApp Cloud API.
- Lead scoring automático.
- Historial automatizado de conversaciones.
- Automatizaciones avanzadas.

## 3. Data Model Principle

El principio rector del modelo de datos es:

**Capturar solo lo necesario en Fase 1 y preparar una evolución ordenada para fases futuras.**

El proyecto no debe crear una base de datos compleja antes de validar la landing y la captación inicial.

La información capturada debe ser:

- Mínima.
- Útil.
- Orientada a seguimiento comercial.
- Respetuosa de privacidad.
- Fácil de migrar a backend futuro.
- No dependiente de IA en Fase 1.

## 4. Phase 1 Data Needs

En Fase 1, los datos pueden provenir de:

- Formulario de contacto.
- Mensaje manual por WhatsApp.
- Registro manual.
- Email.
- Herramienta simple de formularios.
- Notas humanas.

## 5. Phase 1 Minimum Lead Data

El formulario de Fase 1 debe capturar como mínimo:

| Campo | Descripción | Requerido | Fuente |
|---|---|---:|---|
| `name` | Nombre del prospecto | Sí | Formulario |
| `contactChannel` | Email o WhatsApp | Sí | Formulario |
| `businessType` | Tipo de negocio | Recomendado | Formulario |
| `serviceInterest` | Servicio de interés | Recomendado | Formulario |
| `message` | Necesidad principal | Sí | Formulario |
| `createdAt` | Fecha de recepción | Sí | Sistema o registro manual |

## 6. Phase 1 Optional Data

Estos campos pueden capturarse manualmente o agregarse después:

| Campo | Descripción | Requerido | Estado |
|---|---|---:|---|
| `businessName` | Nombre del negocio | No | Opcional |
| `source` | Fuente del lead | No | Opcional |
| `urgency` | Urgencia declarada | No | Manual |
| `budgetRange` | Rango estimado de presupuesto | No | Manual |
| `notes` | Notas internas | No | Manual |
| `manualStatus` | Estado manual del seguimiento | No | Manual |

## 7. Phase 1 Data Handling

En Fase 1 se permite:

- Enviar datos del formulario por email.
- Usar una herramienta simple de formularios.
- Guardar leads manualmente en una hoja o sistema temporal.
- Revisar datos de WhatsApp manualmente.
- Evaluar calidad del lead de forma humana.

En Fase 1 no se debe obligar a:

- Crear base de datos.
- Crear autenticación.
- Crear dashboard.
- Crear scoring automático.
- Crear historial automático.
- Crear integración con WhatsApp Cloud API.

## 8. Future Data Model Overview

En fases futuras, el sistema podrá evolucionar hacia un modelo estructurado con entidades como:

- Lead.
- Contact.
- Conversation.
- Message.
- LeadScore.
- ServiceInterest.
- Notification.
- User.
- AdminNote.
- AuditLog.

Arquitectura futura sugerida:

```txt
Lead
 ├── Contact
 ├── ServiceInterest
 ├── LeadScore
 ├── Conversation
 │    └── Message
 ├── Notification
 └── AdminNote
```

## 9. Future Entity — Lead

## 9.1 Purpose

Representa una oportunidad comercial generada desde la landing, formulario, WhatsApp manual o canales futuros.

## 9.2 Fields

| Campo | Tipo conceptual | Descripción |
|---|---|---|
| `id` | string | Identificador único |
| `name` | string | Nombre del prospecto |
| `businessName` | string | Nombre del negocio |
| `businessType` | string | Tipo de negocio |
| `contactEmail` | string | Email del prospecto |
| `contactPhone` | string | Teléfono o WhatsApp |
| `serviceInterest` | string | Servicio de interés |
| `message` | text | Necesidad principal |
| `source` | string | Fuente del lead |
| `status` | enum | Estado comercial |
| `urgency` | enum | Urgencia declarada |
| `budgetRange` | string | Rango de presupuesto |
| `summary` | text | Resumen manual o futuro por IA |
| `createdAt` | datetime | Fecha de creación |
| `updatedAt` | datetime | Última actualización |

## 9.3 Future Status Values

Estados futuros sugeridos:

| Estado | Descripción |
|---|---|
| `new` | Lead recibido |
| `contacted` | Lead contactado |
| `diagnosis` | En diagnóstico |
| `proposal_sent` | Propuesta enviada |
| `won` | Cliente ganado |
| `lost` | Oportunidad perdida |
| `not_qualified` | No calificado |

## 10. Future Entity — Contact

## 10.1 Purpose

Representa los datos de contacto del prospecto o persona asociada al lead.

## 10.2 Fields

| Campo | Tipo conceptual | Descripción |
|---|---|---|
| `id` | string | Identificador único |
| `leadId` | string | Relación con Lead |
| `name` | string | Nombre del contacto |
| `email` | string | Email |
| `phone` | string | Teléfono |
| `preferredChannel` | enum | Canal preferido |
| `createdAt` | datetime | Fecha de creación |
| `updatedAt` | datetime | Última actualización |

## 10.3 Preferred Channel Values

| Canal | Descripción |
|---|---|
| `whatsapp` | Contacto por WhatsApp |
| `email` | Contacto por email |
| `phone` | Llamada |
| `form` | Formulario |
| `unknown` | No definido |

## 11. Future Entity — ServiceInterest

## 11.1 Purpose

Representa el servicio o categoría de interés declarada por el prospecto.

## 11.2 Values

| Valor | Descripción |
|---|---|
| `landing_page` | Landing comercial |
| `web_development` | Desarrollo web |
| `seo` | SEO básico o técnico |
| `marketing` | Marketing digital |
| `automation` | Automatización comercial futura |
| `ai_lead_assistant` | AI Lead Assistant futuro |
| `custom_system` | Sistema a medida |
| `not_sure` | No está seguro |
| `other` | Otro |

## 12. Future Entity — Conversation

## 12.1 Purpose

Representa una conversación asociada a un lead.

En Fase 1 no se requiere guardar conversaciones automáticamente.

En fases futuras podrá guardar:

- Conversaciones del AI Lead Assistant.
- Conversaciones desde WhatsApp Cloud API.
- Historial de mensajes.
- Seguimiento humano.

## 12.2 Fields

| Campo | Tipo conceptual | Descripción |
|---|---|---|
| `id` | string | Identificador único |
| `leadId` | string | Lead asociado |
| `channel` | enum | Canal de conversación |
| `status` | enum | Estado de conversación |
| `startedAt` | datetime | Inicio |
| `closedAt` | datetime | Cierre |
| `createdAt` | datetime | Fecha de creación |
| `updatedAt` | datetime | Última actualización |

## 12.3 Channel Values

| Canal | Descripción |
|---|---|
| `manual_whatsapp` | WhatsApp manual |
| `contact_form` | Formulario |
| `whatsapp_cloud_api` | WhatsApp Cloud API futuro |
| `web_chat` | Chat web futuro |
| `email` | Email |
| `other` | Otro |

## 13. Future Entity — Message

## 13.1 Purpose

Representa un mensaje dentro de una conversación.

## 13.2 Fields

| Campo | Tipo conceptual | Descripción |
|---|---|---|
| `id` | string | Identificador único |
| `conversationId` | string | Conversación asociada |
| `senderType` | enum | Quién envió el mensaje |
| `content` | text | Contenido del mensaje |
| `messageType` | enum | Tipo de mensaje |
| `externalMessageId` | string | ID externo si aplica |
| `createdAt` | datetime | Fecha de creación |

## 13.3 Sender Type Values

| Sender | Descripción |
|---|---|
| `lead` | Prospecto |
| `human` | Yoryi o equipo |
| `ai_assistant` | AI Lead Assistant futuro |
| `system` | Sistema |

## 13.4 Message Type Values

| Tipo | Descripción |
|---|---|
| `text` | Texto |
| `form_submission` | Formulario enviado |
| `system_event` | Evento de sistema |
| `summary` | Resumen |
| `other` | Otro |

## 14. Future Entity — LeadScore

## 14.1 Purpose

Representa el resultado de scoring manual o automático de un lead.

En Fase 1, el scoring será manual y observacional.

En fases futuras, podrá calcularse automáticamente.

## 14.2 Fields

| Campo | Tipo conceptual | Descripción |
|---|---|---|
| `id` | string | Identificador único |
| `leadId` | string | Lead asociado |
| `score` | number | Puntaje 0–100 |
| `category` | enum | Frío, medio, caliente |
| `confidence` | enum | Nivel de confianza |
| `serviceFit` | number | Encaje con servicio |
| `icpFit` | number | Encaje con ICP |
| `urgency` | number | Urgencia |
| `problemClarity` | number | Claridad del problema |
| `budgetFit` | number | Encaje presupuestario |
| `businessPotential` | number | Potencial comercial |
| `channelFit` | number | Encaje de canal |
| `decisionReadiness` | number | Nivel de decisión |
| `explanation` | text | Explicación del score |
| `createdAt` | datetime | Fecha de creación |

## 14.3 Category Values

| Categoría | Score |
|---|---:|
| `cold` | 0–39 |
| `medium` | 40–69 |
| `hot` | 70–100 |

## 14.4 Confidence Values

| Confianza | Descripción |
|---|---|
| `low` | Faltan datos importantes |
| `medium` | Hay información parcial |
| `high` | Hay suficiente información |

## 15. Future Entity — Notification

## 15.1 Purpose

Representa una notificación interna o externa generada por el sistema.

## 15.2 Fields

| Campo | Tipo conceptual | Descripción |
|---|---|---|
| `id` | string | Identificador único |
| `leadId` | string | Lead asociado |
| `type` | enum | Tipo de notificación |
| `channel` | enum | Canal de envío |
| `status` | enum | Estado |
| `payload` | json | Datos enviados |
| `createdAt` | datetime | Fecha de creación |
| `sentAt` | datetime | Fecha de envío |

## 15.3 Notification Types

| Tipo | Descripción |
|---|---|
| `new_lead` | Nuevo lead recibido |
| `hot_lead` | Lead caliente futuro |
| `form_submission` | Formulario enviado |
| `ai_summary` | Resumen futuro generado por IA |
| `follow_up` | Seguimiento futuro |

## 16. Future Entity — User

## 16.1 Purpose

Representa usuarios internos del sistema futuro.

No aplica en Fase 1.

## 16.2 Fields

| Campo | Tipo conceptual | Descripción |
|---|---|---|
| `id` | string | Identificador único |
| `name` | string | Nombre |
| `email` | string | Email |
| `role` | enum | Rol |
| `createdAt` | datetime | Fecha de creación |
| `updatedAt` | datetime | Última actualización |

## 16.3 Role Values

| Rol | Descripción |
|---|---|
| `owner` | Dueño del proyecto |
| `admin` | Administrador |
| `operator` | Operador futuro |

## 17. Future Entity — AdminNote

## 17.1 Purpose

Representa notas internas asociadas a un lead.

## 17.2 Fields

| Campo | Tipo conceptual | Descripción |
|---|---|---|
| `id` | string | Identificador único |
| `leadId` | string | Lead asociado |
| `authorId` | string | Usuario que crea la nota |
| `content` | text | Contenido de la nota |
| `createdAt` | datetime | Fecha de creación |

## 18. Future Entity — AuditLog

## 18.1 Purpose

Representa eventos importantes del sistema para trazabilidad futura.

No aplica en Fase 1.

## 18.2 Fields

| Campo | Tipo conceptual | Descripción |
|---|---|---|
| `id` | string | Identificador único |
| `actorId` | string | Usuario o sistema que ejecutó acción |
| `entityType` | string | Tipo de entidad afectada |
| `entityId` | string | ID de entidad afectada |
| `action` | string | Acción realizada |
| `metadata` | json | Datos adicionales |
| `createdAt` | datetime | Fecha de evento |

## 19. Future Conceptual Prisma Model

Este modelo es conceptual y futuro.  
No autoriza implementación en Fase 1.

```prisma
model Lead {
  id              String   @id @default(uuid())
  name            String
  businessName    String?
  businessType    String?
  contactEmail    String?
  contactPhone    String?
  serviceInterest String?
  message         String?
  source          String?
  status          String   @default("new")
  urgency         String?
  budgetRange     String?
  summary         String?

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  contacts        Contact[]
  conversations   Conversation[]
  leadScores      LeadScore[]
  notifications   Notification[]
  notes           AdminNote[]
}

model Contact {
  id               String   @id @default(uuid())
  leadId           String
  name             String?
  email            String?
  phone            String?
  preferredChannel String?

  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt

  lead             Lead     @relation(fields: [leadId], references: [id])
}

model Conversation {
  id        String   @id @default(uuid())
  leadId    String
  channel   String
  status    String   @default("open")
  startedAt DateTime @default(now())
  closedAt  DateTime?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  lead      Lead     @relation(fields: [leadId], references: [id])
  messages  Message[]
}

model Message {
  id                String   @id @default(uuid())
  conversationId    String
  senderType        String
  content           String
  messageType       String   @default("text")
  externalMessageId String?
  createdAt         DateTime @default(now())

  conversation      Conversation @relation(fields: [conversationId], references: [id])
}

model LeadScore {
  id                String   @id @default(uuid())
  leadId            String
  score             Int
  category          String
  confidence        String?
  serviceFit        Int?
  icpFit            Int?
  urgency           Int?
  problemClarity    Int?
  budgetFit         Int?
  businessPotential Int?
  channelFit        Int?
  decisionReadiness Int?
  explanation       String?
  createdAt         DateTime @default(now())

  lead              Lead @relation(fields: [leadId], references: [id])
}

model Notification {
  id        String   @id @default(uuid())
  leadId    String?
  type      String
  channel   String?
  status    String   @default("pending")
  payload   Json?
  createdAt DateTime @default(now())
  sentAt    DateTime?

  lead      Lead?    @relation(fields: [leadId], references: [id])
}

model User {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  role      String   @default("owner")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  notes     AdminNote[]
}

model AdminNote {
  id        String   @id @default(uuid())
  leadId    String
  authorId  String?
  content   String
  createdAt DateTime @default(now())

  lead      Lead     @relation(fields: [leadId], references: [id])
  author    User?    @relation(fields: [authorId], references: [id])
}
```

## 20. Data Privacy Rules

El modelo de datos debe respetar estos principios:

- Capturar solo datos necesarios.
- No pedir datos sensibles innecesarios.
- No almacenar conversaciones sin justificación.
- No usar datos para IA sin decisión documentada.
- No compartir datos con terceros sin necesidad.
- Preparar política de privacidad si se almacenan leads.
- Permitir eliminación o corrección futura de datos si aplica.

## 21. Data Validation Rules

Los datos capturados deben cumplir validaciones mínimas:

| Campo | Regla |
|---|---|
| `name` | Requerido en formulario |
| `contactEmail` | Formato de email si se proporciona |
| `contactPhone` | Formato razonable si se proporciona |
| `message` | Requerido o recomendado |
| `serviceInterest` | Debe pertenecer a opciones conocidas o `other` |
| `businessType` | Texto corto o categoría |
| `budgetRange` | Opcional |
| `urgency` | Opcional |

## 22. Data Retention

## 22.1 Fase 1

En Fase 1, si no existe base de datos, la retención dependerá de:

- Email recibido.
- WhatsApp manual.
- Herramienta simple de formularios.
- Registro manual.

## 22.2 Futuro

Cuando exista backend, se deberá definir:

- Tiempo de retención.
- Política de eliminación.
- Acceso a datos.
- Backups.
- Auditoría.
- Exportación si aplica.

## 23. Data Ownership

Los datos de leads pertenecen al proyecto Apps Marketing / Yoryi AI Studio y deben usarse solo para:

- Contacto comercial.
- Diagnóstico.
- Seguimiento.
- Mejora de oferta.
- Métricas internas.
- Automatización futura si existe consentimiento y política clara.

## 24. Phase Boundaries

## 24.1 Active in Phase 1

| Elemento | Estado |
|---|---|
| Datos mínimos del formulario | Activo |
| WhatsApp manual | Activo |
| Evaluación manual del lead | Activo |
| Registro manual o simple | Permitido |
| Base de datos completa | No obligatorio |

## 24.2 Future Only

| Elemento | Fase futura |
|---|---:|
| PostgreSQL | 2 / 3 |
| Prisma | 2 / 3 |
| Dashboard | 3 |
| Conversation history | 4 |
| AI Lead Assistant | 4 |
| LeadScore automático | 4 |
| WhatsApp Cloud API messages | 4 |
| AuditLog | 3 / 4 |
| Notifications | 3 / 4 |

## 25. Traceability

| Data Area | Related Docs | Phase |
|---|---|---:|
| Minimum lead data | functional-requirements.md, acceptance-criteria.md | 1 |
| Form data validation | functional-requirements.md, non-functional-requirements.md | 1 |
| Privacy and security | security-and-privacy.md, non-functional-requirements.md | 1 |
| Lead entity | lead-scoring-spec.md, api-contracts.md | Future |
| Conversation entity | conversation-flows.md, whatsapp-integration.md | Future |
| LeadScore entity | lead-scoring-spec.md, ai-agent-design.md | Future |
| Notifications | api-contracts.md, system-architecture.md | Future |
| Users/Admin | system-architecture.md, security-and-privacy.md | Future |

## 26. Implementation Rule

Este documento no autoriza implementación automática de base de datos.

Para implementar PostgreSQL, Prisma o cualquier persistencia estructurada se requiere:

- Fase aprobada.
- Actualización de SDD si aplica.
- ADR técnico.
- API contracts vigentes.
- Revisión de seguridad y privacidad.
- QA correspondiente.

## 27. Final Statement

En Fase 1, el modelo de datos activo se limita a información mínima de contacto capturada por formulario o WhatsApp manual, con seguimiento humano.

El modelo estructurado con Lead, Contact, Conversation, Message, LeadScore, Notification, User, AdminNote y AuditLog queda documentado como arquitectura futura para backend, dashboard, AI Lead Assistant, WhatsApp Cloud API y automatizaciones.

No se implementará base de datos obligatoria, PostgreSQL, Prisma, dashboard completo, lead scoring automático ni almacenamiento de conversaciones en Fase 1.