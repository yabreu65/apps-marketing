# Scope — Apps Marketing / Yoryi AI Studio

## 1. Purpose

Este documento define el alcance oficial de la Fase 1 del proyecto `apps-marketing`.

Su objetivo es evitar ambigüedad, controlar el scope creep y separar claramente lo que entra en el MVP inicial de lo que queda para fases futuras.

Este documento debe mantenerse alineado con:

- `AGENTS.md`
- `docs/01-sdd/sdd-index.md`
- `docs/01-sdd/prd.md`
- `docs/01-sdd/user-stories.md`
- `docs/01-sdd/acceptance-criteria.md`

## 2. Scope Principle

El principio rector del alcance es:

**Primero se valida la oferta y la conversión con una landing comercial. Después se automatiza.**

La Fase 1 no debe intentar construir toda la plataforma futura.  
La Fase 1 debe construir una landing profesional, clara, responsive y orientada a captar contactos comerciales mediante WhatsApp manual y formulario.

## 3. Phase 1 Goal

El objetivo de la Fase 1 es crear una landing comercial para Apps Marketing / Yoryi AI Studio que permita:

- Presentar la propuesta de valor.
- Explicar los servicios.
- Comunicar confianza.
- Captar leads mediante WhatsApp manual.
- Captar leads mediante formulario.
- Validar el interés del mercado.
- Medir conversión inicial.
- Preparar la base para fases futuras.

## 4. In Scope — Phase 1

La Fase 1 incluye únicamente lo siguiente:

### 4.1 Landing comercial

Debe construirse una landing principal para Apps Marketing / Yoryi AI Studio.

Debe incluir:

- Home / landing principal.
- Hero comercial.
- Propuesta de valor.
- Problema que resuelve.
- Solución propuesta.
- Servicios principales.
- Casos de uso.
- Beneficios.
- Proceso de trabajo.
- CTA principal.
- CTA secundario.
- Formulario de contacto.
- Footer.

### 4.2 Hero comercial

El hero debe comunicar rápidamente:

- Qué hace Apps Marketing / Yoryi AI Studio.
- Para quién es.
- Qué problema resuelve.
- Qué beneficio obtiene el cliente.
- Qué acción debe tomar el visitante.

El usuario debe poder entender la oferta en menos de 10 segundos.

### 4.3 Propuesta de valor

La landing debe comunicar una propuesta clara:

**Creamos landing pages y sistemas digitales para que tu negocio convierta más visitantes en conversaciones comerciales y clientes.**

La propuesta debe evitar prometer automatización o IA como funcionalidad activa de Fase 1.

### 4.4 Servicios principales

La landing debe mostrar servicios como:

- Landing pages comerciales.
- Desarrollo web.
- SEO básico.
- Marketing digital inicial.
- Automatización comercial futura.
- IA aplicada a ventas en fases posteriores.
- Sistemas a medida como evolución futura.

### 4.5 Casos de uso

La landing debe mostrar casos de uso para:

- Profesionales de servicios.
- Consultores.
- Freelancers high-ticket.
- Agencias pequeñas.
- Negocios locales.
- Pymes de servicios.

### 4.6 Beneficios

La landing debe explicar beneficios concretos:

- Mayor claridad comercial.
- Mejor captación de leads.
- Mejor presencia digital.
- Más confianza.
- Mejor conversión.
- Contacto más simple.
- Base preparada para futuras automatizaciones.

### 4.7 Proceso de trabajo

Debe explicarse un proceso simple, por ejemplo:

1. Diagnóstico.
2. Propuesta.
3. Diseño y copy.
4. Desarrollo.
5. Publicación.
6. Optimización.

### 4.8 CTA a WhatsApp manual

La Fase 1 permite un CTA hacia WhatsApp manual.

Debe ser un enlace directo, por ejemplo:

- `https://wa.me/...`
- Link con mensaje precargado.

No debe usar WhatsApp Cloud API en Fase 1.

### 4.9 Formulario de contacto

La landing debe incluir un formulario básico.

Campos mínimos:

- Nombre.
- Email o WhatsApp.
- Tipo de negocio.
- Servicio de interés.
- Mensaje o necesidad principal.

El formulario puede implementarse inicialmente con una solución simple, siempre que no obligue a construir un backend complejo antes de tiempo.

### 4.10 SEO básico

La Fase 1 debe incluir SEO básico:

- Title.
- Meta description.
- Headings semánticos.
- Open Graph básico.
- Contenido indexable.
- URLs limpias.
- Copy alineado con servicios.
- Sitemap y robots si aplica.

### 4.11 Responsive design

La landing debe funcionar correctamente en:

- Mobile.
- Tablet.
- Desktop.

La experiencia mobile es prioritaria porque muchos contactos llegarán desde redes sociales o WhatsApp.

### 4.12 Performance básica

La landing debe buscar:

- Carga rápida.
- Buen rendimiento inicial.
- Core Web Vitals en verde o rango aceptable.
- Imágenes optimizadas.
- Componentes livianos.

### 4.13 Preparación para evolución futura

La estructura debe permitir crecer luego hacia:

- Backend.
- Dashboard.
- Captura estructurada de leads.
- AI Lead Assistant.
- Automatizaciones.
- WhatsApp Cloud API.

Esto no significa implementar esas funcionalidades en Fase 1.

## 5. Out of Scope — Phase 1

La Fase 1 no incluye:

### 5.1 AI Lead Assistant

No se implementará bot inteligente en Fase 1.

Queda fuera:

- Chatbot IA.
- Clasificación automática de intención.
- Resumen automático de leads.
- Lead scoring automático.
- Conversaciones automatizadas.
- Prompts productivos.
- Integración con modelos IA.

### 5.2 WhatsApp Cloud API

No se implementará WhatsApp Cloud API en Fase 1.

Fase 1 solo permite:

- Link manual a WhatsApp.
- Mensaje precargado opcional.

Queda fuera:

- Webhooks de WhatsApp.
- Templates.
- Mensajería automatizada.
- Respuestas automáticas.
- Integración oficial vía Meta.

### 5.3 OpenAI API / Ollama

No se usará OpenAI API ni Ollama en Fase 1.

Queda fuera:

- Modelos locales.
- Modelos externos.
- AIProvider.
- Prompts activos.
- Clasificación automática.
- Generación automática de respuestas.

### 5.4 Backend completo

No es obligatorio construir backend completo en Fase 1.

Queda fuera:

- API completa.
- Autenticación.
- Roles.
- Panel administrativo.
- Gestión avanzada de leads.
- Base de datos obligatoria.

### 5.5 Dashboard completo

No se implementará dashboard completo en Fase 1.

Queda fuera:

- Dashboard de leads.
- Estados de prospectos.
- Historial de conversaciones.
- Métricas internas avanzadas.
- Gestión comercial interna.

### 5.6 CRM avanzado

No se implementará CRM avanzado.

Queda fuera:

- Pipeline comercial.
- Estados complejos.
- Automatización de seguimiento.
- Recordatorios.
- Integraciones CRM externas.

### 5.7 Campañas masivas

No se implementarán campañas masivas.

Queda fuera:

- Email marketing avanzado.
- WhatsApp marketing.
- Automatizaciones de campaña.
- Segmentación avanzada.
- Ads management.

### 5.8 Pagos

No se implementarán pagos en Fase 1.

Queda fuera:

- Stripe.
- MercadoPago.
- Checkout.
- Facturación.
- Suscripciones.

## 6. Future Scope

Las siguientes funcionalidades quedan documentadas como futuras.

### 6.1 Fase 2 — Captura básica de leads

Puede incluir:

- Formulario más estructurado.
- Guardado simple de leads.
- Notificación por email.
- Preparación para backend.
- Validación básica de datos.

### 6.2 Fase 3 — Backend / Dashboard inicial

Puede incluir:

- Backend Node.js / NestJS o Express.
- PostgreSQL.
- Prisma.
- Dashboard simple.
- Lista de leads.
- Estado de seguimiento.
- Notas internas.

### 6.3 Fase 4 — AI Lead Assistant

Puede incluir:

- Asistente conversacional.
- Detección de intención.
- Lead scoring.
- Resumen automático.
- Ollama local como proveedor inicial.
- OpenAI API como proveedor opcional.
- WhatsApp Cloud API como canal futuro.

### 6.4 Fase 5 — Automatizaciones avanzadas

Puede incluir:

- Follow-ups.
- Propuestas asistidas.
- Integraciones CRM.
- Analítica avanzada.
- Automatizaciones personalizadas.

## 7. Scope Boundaries

### 7.1 Permitido en Fase 1

Está permitido:

- Mejorar copy.
- Ajustar secciones de la landing.
- Optimizar responsive.
- Optimizar SEO básico.
- Mejorar performance.
- Agregar CTA manuales.
- Mejorar formulario.
- Mejorar claridad visual.
- Preparar estructura escalable.

### 7.2 No permitido en Fase 1 sin ADR

No está permitido sin actualizar SDD y ADR:

- Agregar IA activa.
- Agregar WhatsApp Cloud API.
- Agregar backend complejo.
- Agregar dashboard.
- Agregar CRM.
- Agregar pagos.
- Agregar automatizaciones.
- Agregar campañas masivas.
- Cambiar el producto principal de Fase 1.

## 8. Scope Control Rules

### SCR-01 — No code before SDD approval

No se debe iniciar implementación sin aprobación de SDD de fase.

### SCR-02 — No AI in Phase 1

AI Lead Assistant no puede moverse a Fase 1 sin una decisión explícita documentada en ADR.

### SCR-03 — Manual WhatsApp only

WhatsApp en Fase 1 debe ser manual.

### SCR-04 — Form allowed

Formulario básico sí está permitido en Fase 1.

### SCR-05 — SEO and responsive required

SEO básico y responsive son parte obligatoria de Fase 1.

### SCR-06 — Future does not mean active

Que un módulo esté documentado como futuro no significa que esté autorizado para implementación en Fase 1.

### SCR-07 — Scope changes require ADR

Todo cambio importante de alcance requiere:

- Actualización de PRD.
- Actualización de scope.
- Actualización de criterios.
- ADR correspondiente.
- Revisión de QA Matrix.

## 9. Traceability

Este documento debe mantener trazabilidad con:

- `docs/01-sdd/prd.md`
- `docs/01-sdd/user-stories.md`
- `docs/01-sdd/acceptance-criteria.md`
- `docs/01-sdd/functional-requirements.md`
- `docs/01-sdd/non-functional-requirements.md`
- `docs/04-tests/qa-matrix.md`
- `docs/05-decisions/adr-001-project-scope.md`

## 10. Phase 1 Acceptance Boundary

La Fase 1 se considera dentro de alcance si entrega:

- Landing publicada o lista para publicar.
- Hero claro.
- Servicios visibles.
- Casos de uso visibles.
- Beneficios visibles.
- Proceso de trabajo visible.
- CTA a WhatsApp manual.
- Formulario de contacto.
- SEO básico.
- Responsive funcional.
- Performance aceptable.
- Sin dependencia de IA.
- Sin dependencia de WhatsApp Cloud API.
- Sin dashboard completo.

## 11. Final Scope Statement

El alcance oficial de Fase 1 es:

**Construir una landing comercial profesional para Apps Marketing / Yoryi AI Studio, orientada a conversión, con WhatsApp manual, formulario de contacto, SEO básico y diseño responsive, preparada para evolucionar hacia backend, dashboard e IA en fases futuras.**

Todo lo que exceda esta definición debe tratarse como futuro o requerir una actualización formal de SDD y ADR.