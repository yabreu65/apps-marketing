# Functional Requirements — Apps Marketing / Yoryi AI Studio

## 1. Purpose

Este documento define los requisitos funcionales de la Fase 1 del proyecto `apps-marketing`.

La Fase 1 corresponde a la landing comercial de Apps Marketing / Yoryi AI Studio.

Los requisitos funcionales describen qué debe hacer el sistema para cumplir con las historias de usuario y los criterios de aceptación definidos.

Este documento debe mantenerse alineado con:

- `AGENTS.md`
- `docs/01-sdd/sdd-index.md`
- `docs/01-sdd/prd.md`
- `docs/01-sdd/scope.md`
- `docs/01-sdd/user-stories.md`
- `docs/01-sdd/acceptance-criteria.md`
- `docs/01-sdd/non-functional-requirements.md`
- `docs/02-architecture/system-architecture.md`
- `docs/04-tests/qa-matrix.md`

## 2. Scope Context

La Fase 1 incluye:

- Landing comercial.
- Hero comercial.
- Propuesta de valor.
- Servicios.
- Casos de uso.
- Beneficios.
- Proceso de trabajo.
- CTA a WhatsApp manual.
- Formulario de contacto.
- SEO básico.
- Diseño responsive.
- Preparación para evolución futura.

La Fase 1 no incluye:

- AI Lead Assistant.
- WhatsApp Cloud API.
- OpenAI API.
- Ollama.
- Lead scoring automático.
- Dashboard completo.
- CRM avanzado.
- Automatizaciones avanzadas.
- Pagos.

## 3. Requirement Format

Cada requisito funcional contiene:

- ID.
- Nombre.
- Descripción.
- Prioridad.
- Fase.
- Requisitos relacionados.
- Historias relacionadas.
- Criterios de aceptación relacionados.
- Estado esperado.

---

# 4. Phase 1 Functional Requirements

## FR-01 — Mostrar hero comercial

### Description

La landing debe mostrar un hero comercial claro que comunique qué hace Apps Marketing / Yoryi AI Studio, para quién es y qué beneficio obtiene el visitante.

### Priority

Alta

### Phase

Fase 1

### Functional Details

El hero debe incluir:

- Headline principal.
- Subheadline o descripción breve.
- CTA principal.
- CTA secundario opcional.
- Mensaje orientado a conversión.
- Enfoque claro en landing pages, desarrollo web, marketing digital y preparación futura para IA.

El hero no debe presentar AI Lead Assistant como funcionalidad activa de Fase 1.

### Related User Stories

- US-01
- US-12

### Related Acceptance Criteria

- AC-01
- AC-02

### Status

Activo en Fase 1.

---

## FR-02 — Comunicar propuesta de valor

### Description

La landing debe comunicar una propuesta de valor clara, orientada a conversión y alineada con el ICP definido.

### Priority

Alta

### Phase

Fase 1

### Functional Details

La propuesta debe comunicar que Apps Marketing / Yoryi AI Studio ayuda a negocios de servicios a convertir visitantes en conversaciones comerciales y clientes.

Debe evitar mensajes genéricos o promesas exageradas.

Mensaje base recomendado:

**Creamos landing pages y sistemas digitales para que tu negocio convierta más visitantes en conversaciones comerciales y clientes.**

### Related User Stories

- US-01
- US-02
- US-04
- US-12

### Related Acceptance Criteria

- AC-01
- AC-02
- AC-03

### Status

Activo en Fase 1.

---

## FR-03 — Mostrar público objetivo

### Description

La landing debe indicar claramente para qué tipo de clientes está pensada la solución.

### Priority

Alta

### Phase

Fase 1

### Functional Details

La landing debe representar o mencionar segmentos como:

- Profesionales de servicios.
- Consultores.
- Freelancers high-ticket.
- Agencias pequeñas.
- Negocios locales.
- Pymes de servicios.

Debe evitar hablar a un público demasiado genérico sin foco comercial.

### Related User Stories

- US-02
- US-04
- US-12

### Related Acceptance Criteria

- AC-02
- AC-03

### Status

Activo en Fase 1.

---

## FR-04 — Mostrar problema principal

### Description

La landing debe explicar el problema principal que resuelve: negocios con tráfico, alcance o presencia digital, pero sin un sistema claro para convertir interés en contacto comercial.

### Priority

Alta

### Phase

Fase 1

### Functional Details

La sección de problema debe comunicar dolores como:

- Mensaje comercial poco claro.
- Web que no convierte.
- Tráfico sin leads.
- Falta de CTA efectivo.
- Consultas desordenadas.
- Dependencia de redes sociales sin sistema propio.
- Falta de seguimiento comercial.

### Related User Stories

- US-04
- US-12

### Related Acceptance Criteria

- AC-02
- AC-03

### Status

Activo en Fase 1.

---

## FR-05 — Mostrar solución propuesta

### Description

La landing debe presentar la solución de Fase 1: landing comercial, captación manual mediante WhatsApp/formulario y preparación futura para automatización.

### Priority

Alta

### Phase

Fase 1

### Functional Details

La sección de solución debe explicar:

- Landing comercial orientada a conversión.
- Estructura clara de servicios.
- CTA a WhatsApp manual.
- Formulario de contacto.
- SEO básico.
- Responsive.
- Evolución futura hacia backend, dashboard e IA.

Debe separar claramente lo activo en Fase 1 de lo futuro.

### Related User Stories

- US-01
- US-03
- US-05
- US-15

### Related Acceptance Criteria

- AC-03
- AC-04
- AC-12
- AC-14

### Status

Activo en Fase 1.

---

## FR-06 — Mostrar servicios principales

### Description

La landing debe presentar los servicios principales de Apps Marketing / Yoryi AI Studio.

### Priority

Alta

### Phase

Fase 1

### Functional Details

Los servicios deben incluir:

- Landing pages comerciales.
- Desarrollo web.
- SEO básico.
- Marketing digital inicial.
- Automatización comercial futura.
- IA aplicada a ventas en fases posteriores.
- Sistemas a medida como evolución futura.

Los servicios futuros deben comunicarse como evolución, no como implementación activa del MVP inicial.

### Related User Stories

- US-03
- US-05
- US-12

### Related Acceptance Criteria

- AC-03
- AC-04

### Status

Activo en Fase 1.

---

## FR-07 — Mostrar casos de uso

### Description

La landing debe incluir casos de uso o ejemplos por tipo de cliente para ayudar al visitante a identificarse con la solución.

### Priority

Media

### Phase

Fase 1

### Functional Details

Los casos de uso pueden representar:

- Profesionales de servicios.
- Consultores.
- Agencias pequeñas.
- Negocios locales.
- Pymes de servicios.
- Freelancers high-ticket.

Cada caso debe explicar de forma simple cómo una landing o sistema digital puede ayudar a captar más contactos comerciales.

### Related User Stories

- US-02
- US-06
- US-12

### Related Acceptance Criteria

- AC-03
- AC-04

### Status

Activo en Fase 1.

---

## FR-08 — Mostrar beneficios concretos

### Description

La landing debe mostrar beneficios claros, entendibles y alineados con conversión comercial.

### Priority

Alta

### Phase

Fase 1

### Functional Details

Los beneficios deben incluir ideas como:

- Mayor claridad comercial.
- Mejor captación de leads.
- Mejor presencia digital.
- Más confianza.
- Contacto más simple.
- Base para escalar.
- Preparación para automatización futura.

Debe evitar promesas como “garantizamos ventas” o resultados no verificables.

### Related User Stories

- US-05
- US-06
- US-12

### Related Acceptance Criteria

- AC-04
- AC-05

### Status

Activo en Fase 1.

---

## FR-09 — Mostrar proceso de trabajo

### Description

La landing debe explicar el proceso de trabajo de forma simple para reducir incertidumbre y aumentar confianza.

### Priority

Media

### Phase

Fase 1

### Functional Details

El proceso recomendado debe incluir:

1. Diagnóstico.
2. Propuesta.
3. Diseño y copy.
4. Desarrollo.
5. Publicación.
6. Optimización.

El proceso debe ser claro, comercial y fácil de entender.

### Related User Stories

- US-07
- US-12

### Related Acceptance Criteria

- AC-05

### Status

Activo en Fase 1.

---

## FR-10 — Mostrar CTA principal a WhatsApp manual

### Description

La landing debe incluir un CTA principal que permita contactar a Apps Marketing / Yoryi AI Studio mediante WhatsApp manual.

### Priority

Alta

### Phase

Fase 1

### Functional Details

El CTA debe:

- Ser visible en el hero o sección principal.
- Abrir WhatsApp o WhatsApp Web.
- Usar un enlace manual tipo `https://wa.me/...`.
- Poder incluir mensaje precargado.
- Tener texto orientado a conversión.
- Funcionar en mobile y desktop.

No debe usar WhatsApp Cloud API en Fase 1.

### Related User Stories

- US-08
- US-13

### Related Acceptance Criteria

- AC-06
- AC-07
- AC-12

### Status

Activo en Fase 1.

---

## FR-11 — Mostrar CTA secundario

### Description

La landing debe incluir al menos una ruta secundaria de contacto o exploración, como formulario, sección de servicios o diagnóstico.

### Priority

Media

### Phase

Fase 1

### Functional Details

El CTA secundario puede apuntar a:

- Formulario de contacto.
- Sección de servicios.
- Sección de proceso.
- Solicitud de diagnóstico.

Debe complementar el CTA principal sin competir con él.

### Related User Stories

- US-07
- US-09
- US-13

### Related Acceptance Criteria

- AC-07
- AC-11

### Status

Activo en Fase 1.

---

## FR-12 — Incluir formulario de contacto

### Description

La landing debe incluir un formulario de contacto básico que permita capturar información mínima del prospecto.

### Priority

Alta

### Phase

Fase 1

### Functional Details

El formulario debe incluir como mínimo:

- Nombre.
- Email o WhatsApp.
- Tipo de negocio.
- Servicio de interés.
- Mensaje o necesidad principal.

El formulario debe poder funcionar con una solución simple en Fase 1. No debe requerir backend complejo obligatorio.

### Related User Stories

- US-09
- US-13

### Related Acceptance Criteria

- AC-07
- AC-08
- AC-12

### Status

Activo en Fase 1.

---

## FR-13 — Validar campos básicos del formulario

### Description

El formulario debe validar la información mínima necesaria antes de enviarse.

### Priority

Alta

### Phase

Fase 1

### Functional Details

El formulario debe validar:

- Nombre requerido.
- Al menos un canal de contacto requerido: email o WhatsApp.
- Mensaje o necesidad principal.
- Formato básico de email si se usa email.
- Longitud razonable de los campos.

Debe mostrar mensajes claros de error o confirmación.

### Related User Stories

- US-09

### Related Acceptance Criteria

- AC-08

### Status

Activo en Fase 1.

---

## FR-14 — Confirmar envío del formulario

### Description

Después de enviar el formulario, el usuario debe recibir una confirmación clara de que su mensaje fue recibido o registrado.

### Priority

Media

### Phase

Fase 1

### Functional Details

La confirmación puede ser:

- Mensaje visual en la misma página.
- Redirección a sección de gracias.
- Notificación básica de éxito.
- Mensaje de error si el envío falla.

No debe depender de AI Lead Assistant.

### Related User Stories

- US-09
- US-13

### Related Acceptance Criteria

- AC-08
- AC-11

### Status

Activo en Fase 1.

---

## FR-15 — Incluir footer informativo

### Description

La landing debe incluir un footer con información mínima de marca y contacto.

### Priority

Media

### Phase

Fase 1

### Functional Details

El footer puede incluir:

- Nombre de marca.
- Servicios principales.
- Contacto.
- WhatsApp.
- Links relevantes.
- Información legal básica si aplica.
- Año actual.

### Related User Stories

- US-12

### Related Acceptance Criteria

- AC-05
- AC-07

### Status

Activo en Fase 1.

---

## FR-16 — Implementar SEO básico

### Description

La landing debe incluir elementos básicos de SEO para ser indexable, compartible y entendible por buscadores.

### Priority

Alta

### Phase

Fase 1

### Functional Details

Debe incluir:

- Title.
- Meta description.
- H1 único.
- Headings semánticos.
- Open Graph básico.
- Contenido indexable.
- URLs limpias.
- Copy alineado a servicios.
- Sitemap y robots si aplica.

### Related User Stories

- US-11
- US-13

### Related Acceptance Criteria

- AC-10
- AC-11

### Status

Activo en Fase 1.

---

## FR-17 — Permitir medición básica de conversión

### Description

La landing debe permitir medir si los visitantes inician contacto comercial.

### Priority

Alta

### Phase

Fase 1

### Functional Details

La medición debe contemplar:

- Clicks en CTA de WhatsApp.
- Formularios enviados.
- Conversión visita -> contacto.
- Calidad manual de leads.
- Revisión de comprensión del mensaje.

La medición puede ser manual o mediante herramientas simples en Fase 1.

### Related User Stories

- US-13

### Related Acceptance Criteria

- AC-11
- AC-12

### Status

Activo en Fase 1.

---

## FR-18 — Evitar dependencias activas de IA

### Description

La Fase 1 no debe implementar funcionalidades activas de IA.

### Priority

Alta

### Phase

Fase 1

### Functional Details

No debe incluir:

- AI Lead Assistant activo.
- Chatbot IA.
- Ollama.
- OpenAI API.
- Lead scoring automático.
- Clasificación automática de intención.
- Resumen automático de leads.
- AIProvider productivo.
- Prompts ejecutados en producción.

Puede mencionar IA como servicio futuro siempre que no se presente como funcionalidad activa.

### Related User Stories

- US-14
- US-15

### Related Acceptance Criteria

- AC-13
- AC-14

### Status

Activo en Fase 1 como restricción funcional.

---

## FR-19 — Evitar WhatsApp Cloud API en Fase 1

### Description

La Fase 1 debe limitar WhatsApp a un enlace manual y no debe implementar integración oficial con WhatsApp Cloud API.

### Priority

Alta

### Phase

Fase 1

### Functional Details

Permitido:

- Link manual a WhatsApp.
- Mensaje precargado opcional.

No permitido:

- Webhooks.
- Templates.
- Respuestas automáticas.
- Mensajería automatizada.
- Integración con Meta WhatsApp Cloud API.

### Related User Stories

- US-08
- US-14

### Related Acceptance Criteria

- AC-06
- AC-12
- AC-13

### Status

Activo en Fase 1 como restricción funcional.

---

## FR-20 — Preparar estructura para evolución futura

### Description

La landing debe diseñarse de forma que permita evolución futura hacia backend, dashboard e IA sin rehacer completamente el proyecto.

### Priority

Media

### Phase

Fase 1

### Functional Details

La estructura debe permitir futura incorporación de:

- Backend.
- Dashboard.
- Captura estructurada de leads.
- AI Lead Assistant.
- WhatsApp Cloud API.
- Automatizaciones.

En Fase 1 esto significa preparación conceptual y estructural, no implementación activa de esos módulos.

### Related User Stories

- US-15
- US-13

### Related Acceptance Criteria

- AC-14

### Status

Activo en Fase 1.

---

# 5. Future Functional Requirements — No Fase 1

Estos requisitos quedan documentados para fases futuras.  
No autorizan implementación en Fase 1.

## FFR-01 — Registrar leads en backend

### Future Phase

Fase 2 / Fase 3

### Description

El sistema futuro podrá registrar leads en una base de datos.

### Status

Futuro, no activo en Fase 1.

---

## FFR-02 — Mostrar leads en dashboard

### Future Phase

Fase 3

### Description

El sistema futuro podrá mostrar leads, estados, notas y seguimiento en un dashboard interno.

### Status

Futuro, no activo en Fase 1.

---

## FFR-03 — Implementar AI Lead Assistant

### Future Phase

Fase 4

### Description

El sistema futuro podrá incluir un asistente inteligente para captar, orientar y calificar leads.

### Status

Futuro, no activo en Fase 1.

---

## FFR-04 — Integrar WhatsApp Cloud API

### Future Phase

Fase 4

### Description

El sistema futuro podrá integrar WhatsApp Cloud API para automatizar conversaciones bajo reglas oficiales.

### Status

Futuro, no activo en Fase 1.

---

## FFR-05 — Implementar lead scoring automático

### Future Phase

Fase 4

### Description

El sistema futuro podrá calcular un score automático para priorizar prospectos.

### Status

Futuro, no activo en Fase 1.

---

## FFR-06 — Generar resumen automático de leads

### Future Phase

Fase 4

### Description

El sistema futuro podrá generar resúmenes comerciales automáticos a partir de conversaciones o formularios.

### Status

Futuro, no activo en Fase 1.

---

## FFR-07 — Usar Ollama como proveedor IA inicial

### Future Phase

Fase 4

### Description

El sistema futuro podrá usar Ollama local como proveedor inicial para desarrollo y validación del AI Lead Assistant.

### Status

Futuro, no activo en Fase 1.

---

## FFR-08 — Usar OpenAI API como proveedor opcional

### Future Phase

Fase 4+

### Description

El sistema futuro podrá usar OpenAI API como proveedor opcional si se requiere mayor calidad, rendimiento o disponibilidad.

### Status

Futuro, no activo en Fase 1.

---

# 6. Traceability Matrix

## Phase 1 Functional Requirements

| FR | Description | Related US | Related AC | Phase | Status |
|---|---|---|---|---:|---|
| FR-01 | Mostrar hero comercial | US-01, US-12 | AC-01, AC-02 | 1 | Active |
| FR-02 | Comunicar propuesta de valor | US-01, US-02, US-04, US-12 | AC-01, AC-02, AC-03 | 1 | Active |
| FR-03 | Mostrar público objetivo | US-02, US-04, US-12 | AC-02, AC-03 | 1 | Active |
| FR-04 | Mostrar problema principal | US-04, US-12 | AC-02, AC-03 | 1 | Active |
| FR-05 | Mostrar solución propuesta | US-01, US-03, US-05, US-15 | AC-03, AC-04, AC-12, AC-14 | 1 | Active |
| FR-06 | Mostrar servicios principales | US-03, US-05, US-12 | AC-03, AC-04 | 1 | Active |
| FR-07 | Mostrar casos de uso | US-02, US-06, US-12 | AC-03, AC-04 | 1 | Active |
| FR-08 | Mostrar beneficios concretos | US-05, US-06, US-12 | AC-04, AC-05 | 1 | Active |
| FR-09 | Mostrar proceso de trabajo | US-07, US-12 | AC-05 | 1 | Active |
| FR-10 | CTA principal a WhatsApp manual | US-08, US-13 | AC-06, AC-07, AC-12 | 1 | Active |
| FR-11 | CTA secundario | US-07, US-09, US-13 | AC-07, AC-11 | 1 | Active |
| FR-12 | Formulario de contacto | US-09, US-13 | AC-07, AC-08, AC-12 | 1 | Active |
| FR-13 | Validar campos del formulario | US-09 | AC-08 | 1 | Active |
| FR-14 | Confirmar envío del formulario | US-09, US-13 | AC-08, AC-11 | 1 | Active |
| FR-15 | Footer informativo | US-12 | AC-05, AC-07 | 1 | Active |
| FR-16 | SEO básico | US-11, US-13 | AC-10, AC-11 | 1 | Active |
| FR-17 | Medición básica de conversión | US-13 | AC-11, AC-12 | 1 | Active |
| FR-18 | Evitar dependencias activas de IA | US-14, US-15 | AC-13, AC-14 | 1 | Active |
| FR-19 | Evitar WhatsApp Cloud API | US-08, US-14 | AC-06, AC-12, AC-13 | 1 | Active |
| FR-20 | Preparar evolución futura | US-15, US-13 | AC-14 | 1 | Active |

## Future Functional Requirements

| FFR | Description | Future Phase | Status |
|---|---|---:|---|
| FFR-01 | Registrar leads en backend | 2 / 3 | Future |
| FFR-02 | Mostrar leads en dashboard | 3 | Future |
| FFR-03 | Implementar AI Lead Assistant | 4 | Future |
| FFR-04 | Integrar WhatsApp Cloud API | 4 | Future |
| FFR-05 | Lead scoring automático | 4 | Future |
| FFR-06 | Resumen automático de leads | 4 | Future |
| FFR-07 | Ollama proveedor IA inicial | 4 | Future |
| FFR-08 | OpenAI API proveedor opcional | 4+ | Future |

## Traceability Rule

Todo requisito funcional activo debe mapear al menos a:

- Una historia de usuario.
- Un criterio de aceptación.
- Una validación en QA Matrix.
- Una decisión de alcance vigente.

Los requisitos futuros no autorizan implementación en Fase 1.

## Final Statement

Los requisitos funcionales activos de Fase 1 están limitados a la landing comercial, contacto manual por WhatsApp, formulario, SEO básico, claridad comercial, responsive y preparación futura.

AI Lead Assistant, WhatsApp Cloud API, Ollama, OpenAI API, dashboard completo, CRM avanzado, pagos y automatizaciones inteligentes quedan fuera de Fase 1.