# Conversation Flows — Apps Marketing / Yoryi AI Studio

## 1. Purpose

Este documento define los flujos de contacto y conversación del proyecto `apps-marketing`.

La Fase 1 no incluye bot inteligente ni AI Lead Assistant.  
Por eso, este documento separa claramente:

- Flujos activos de Fase 1: contacto manual por WhatsApp y formulario.
- Flujos futuros: AI Lead Assistant, WhatsApp Cloud API, lead scoring y automatizaciones.

Este documento debe mantenerse alineado con:

- `AGENTS.md`
- `docs/01-sdd/sdd-index.md`
- `docs/01-sdd/prd.md`
- `docs/01-sdd/scope.md`
- `docs/01-sdd/user-stories.md`
- `docs/01-sdd/acceptance-criteria.md`
- `docs/01-sdd/functional-requirements.md`
- `docs/01-sdd/lead-scoring-spec.md`
- `docs/02-architecture/ai-agent-design.md`
- `docs/02-architecture/whatsapp-integration.md`

## 2. Scope Context

### Fase 1 incluye

- CTA a WhatsApp manual.
- Mensaje precargado opcional.
- Formulario de contacto.
- Seguimiento humano/manual.
- Evaluación manual del lead.
- Registro manual o simple de la oportunidad, si aplica.

### Fase 1 no incluye

- Bot inteligente.
- WhatsApp Cloud API.
- OpenAI API.
- Ollama.
- AI Lead Assistant.
- Lead scoring automático.
- Clasificación automática de intención.
- Resumen automático de leads.
- Automatización de seguimiento.
- CRM avanzado.

## 3. Conversation Principle

El principio rector es:

**Primero se valida la conversación comercial de forma manual. Después se automatiza.**

La Fase 1 debe permitir aprender:

- Qué preguntas hacen los prospectos.
- Qué servicios generan más interés.
- Qué objeciones aparecen.
- Qué datos mínimos son necesarios para calificar un lead.
- Qué mensajes ayudan a convertir.
- Qué patrones podrían automatizarse en fases futuras.

## 4. Phase 1 Active Flow — WhatsApp Manual

## 4.1 Objetivo del flujo

Permitir que un visitante de la landing inicie una conversación comercial por WhatsApp sin fricción.

El flujo debe ser simple, directo y no depender de APIs ni automatizaciones.

## 4.2 Entrada del flujo

El visitante hace click en un CTA como:

- “Solicitar diagnóstico por WhatsApp”
- “Hablar sobre mi proyecto”
- “Quiero mejorar mi web”
- “Necesito captar más clientes”

## 4.3 Mensaje precargado recomendado

El link manual a WhatsApp puede incluir un mensaje precargado como:

```txt
Hola, vengo desde la landing de Apps Marketing / Yoryi AI Studio. Quiero recibir orientación para mejorar la presencia digital y captación de clientes de mi negocio.