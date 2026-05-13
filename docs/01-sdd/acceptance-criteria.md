# Acceptance Criteria — Apps Marketing

## 1. Purpose

Este documento define los criterios de aceptación para la Fase 1 del proyecto `apps-marketing`.

La Fase 1 corresponde a la landing comercial de Apps Marketing / Yoryi AI Studio.

Los criterios de aceptación permiten validar que la landing cumple con el alcance definido antes de iniciar o aprobar implementación.

Este documento debe mantenerse alineado con:

- `AGENTS.md`
- `docs/01-sdd/sdd-index.md`
- `docs/01-sdd/prd.md`
- `docs/01-sdd/scope.md`
- `docs/01-sdd/user-stories.md`
- `docs/01-sdd/functional-requirements.md`
- `docs/01-sdd/non-functional-requirements.md`
- `docs/04-tests/qa-matrix.md`

## 2. Scope Context

La Fase 1 incluye:

- Landing comercial.
- Hero claro.
- Propuesta de valor.
- Servicios.
- Casos de uso.
- Beneficios.
- Proceso de trabajo.
- CTA a WhatsApp manual.
- Formulario de contacto.
- SEO básico.
- Diseño responsive.
- Performance básica.
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

## 3. Acceptance Criteria Format

Cada criterio se define con:

- ID.
- Nombre.
- Descripción.
- Historias relacionadas.
- Condiciones de aceptación.
- Tipo de validación.
- Estado esperado para Fase 1.

---

# 4. Phase 1 Acceptance Criteria

## AC-01 — Hero comunica la propuesta principal

### Description

El hero debe comunicar de forma clara qué hace Apps Marketing / Yoryi AI Studio, para quién es y qué beneficio obtiene el visitante.

### Related User Stories

- US-01

### Acceptance Conditions

La landing cumple este criterio si:

- El hero incluye un headline claro.
- El hero incluye una descripción breve de la propuesta de valor.
- El usuario puede entender que el proyecto ofrece landing pages, desarrollo web, marketing digital y soluciones futuras con IA.
- El mensaje evita vender AI Lead Assistant como funcionalidad activa de Fase 1.
- El hero incluye al menos un CTA principal visible.

### Validation

- Revisión visual.
- Test cualitativo de comprensión.
- QA manual.

### Expected Status

Obligatorio para Fase 1.

---

## AC-02 — La propuesta se entiende en menos de 10 segundos

### Description

Un visitante debe poder entender rápidamente qué ofrece la landing y qué acción debe tomar.

### Related User Stories

- US-01
- US-02
- US-04
- US-12

### Acceptance Conditions

La landing cumple este criterio si un usuario de prueba puede responder en menos de 10 segundos:

- Qué ofrece Apps Marketing / Yoryi AI Studio.
- Para quién es.
- Qué problema resuelve.
- Qué acción debería tomar.
- Por qué podría confiar.

### Validation

- Test cualitativo con usuarios.
- Revisión de copy.
- Revisión del hero y secciones iniciales.

### Expected Status

Obligatorio para Fase 1.

---

## AC-03 — El público objetivo está claramente identificado

### Description

La landing debe dejar claro que la oferta está dirigida a negocios de servicios, profesionales independientes, consultores, agencias pequeñas y pymes que necesitan mejorar conversión.

### Related User Stories

- US-02
- US-03
- US-04

### Acceptance Conditions

La landing cumple este criterio si:

- Menciona o representa al ICP definido.
- Incluye ejemplos de segmentos prioritarios.
- Evita hablarle de forma genérica a cualquier tipo de negocio.
- Conecta la oferta con problemas reales de captación, claridad y conversión.
- No posiciona la Fase 1 como un sistema avanzado de IA.

### Validation

- Revisión de contenido.
- Comparación con `target-customers.md`.
- QA de mensaje comercial.

### Expected Status

Obligatorio para Fase 1.

---

## AC-04 — Servicios, casos de uso y beneficios son visibles

### Description

La landing debe presentar de forma clara los servicios principales, casos de uso y beneficios esperados.

### Related User Stories

- US-03
- US-05
- US-06
- US-12

### Acceptance Conditions

La landing cumple este criterio si incluye secciones o bloques para:

- Landing pages comerciales.
- Desarrollo web.
- SEO básico.
- Marketing digital inicial.
- Automatización comercial futura.
- IA aplicada a ventas en fases posteriores.
- Casos de uso por tipo de cliente.
- Beneficios concretos y entendibles.

Los servicios futuros deben estar marcados o comunicados como evolución, no como funcionalidad activa de Fase 1.

### Validation

- Revisión visual.
- Revisión de contenido.
- Comparación con PRD y scope.

### Expected Status

Obligatorio para Fase 1.

---

## AC-05 — La landing comunica confianza y proceso de trabajo

### Description

El visitante debe entender cómo se trabajaría con Apps Marketing / Yoryi AI Studio y percibir profesionalismo.

### Related User Stories

- US-05
- US-06
- US-07
- US-12

### Acceptance Conditions

La landing cumple este criterio si:

- Incluye un proceso de trabajo claro.
- Explica pasos como diagnóstico, propuesta, diseño, desarrollo, publicación y optimización.
- Presenta beneficios concretos.
- Usa un tono profesional y cercano.
- Evita promesas exageradas.
- No garantiza resultados imposibles o no medibles.

### Validation

- Revisión de contenido.
- QA de tono.
- Test cualitativo.

### Expected Status

Obligatorio para Fase 1.

---

## AC-06 — CTA principal a WhatsApp manual funciona

### Description

El visitante debe poder iniciar contacto mediante un enlace manual a WhatsApp.

### Related User Stories

- US-07
- US-08

### Acceptance Conditions

La landing cumple este criterio si:

- Existe al menos un CTA principal hacia WhatsApp manual.
- El CTA es visible en el hero o sección principal.
- El enlace abre WhatsApp o WhatsApp Web correctamente.
- El enlace puede incluir mensaje precargado.
- El CTA no depende de WhatsApp Cloud API.
- El CTA no requiere bot inteligente.
- El texto del CTA orienta a una acción comercial clara.

### Validation

- Prueba manual del enlace.
- QA mobile.
- QA desktop.

### Expected Status

Obligatorio para Fase 1.

---

## AC-07 — Existen rutas claras de contacto

### Description

La landing debe ofrecer más de una forma de contacto comercial.

### Related User Stories

- US-08
- US-09

### Acceptance Conditions

La landing cumple este criterio si:

- Incluye CTA a WhatsApp manual.
- Incluye formulario de contacto.
- Los CTAs están presentes en secciones relevantes.
- El usuario no tiene que buscar demasiado para contactar.
- Las rutas de contacto son visibles en mobile y desktop.
- El formulario y WhatsApp manual no dependen de backend complejo en Fase 1.

### Validation

- QA visual.
- QA funcional.
- QA mobile y desktop.

### Expected Status

Obligatorio para Fase 1.

---

## AC-08 — Formulario captura datos mínimos

### Description

El formulario debe capturar información suficiente para iniciar seguimiento comercial manual.

### Related User Stories

- US-09

### Acceptance Conditions

La landing cumple este criterio si el formulario incluye como mínimo:

- Nombre.
- Email o WhatsApp.
- Tipo de negocio.
- Servicio de interés.
- Mensaje o necesidad principal.

También debe cumplir:

- Validación básica de campos requeridos.
- Mensajes claros de error o confirmación.
- Diseño usable en mobile.
- No solicitar información innecesaria.
- No requerir AI Lead Assistant para funcionar.

### Validation

- QA funcional del formulario.
- QA mobile.
- Revisión de campos.
- Prueba de envío o simulación si aún no hay backend.

### Expected Status

Obligatorio para Fase 1.

---

## AC-09 — La landing es responsive

### Description

La landing debe funcionar correctamente en mobile, tablet y desktop.

### Related User Stories

- US-10

### Acceptance Conditions

La landing cumple este criterio si:

- El contenido se adapta correctamente a pantallas móviles.
- Los CTAs son visibles y fáciles de tocar.
- El formulario es usable en mobile.
- No hay desbordes horizontales.
- Las secciones mantienen jerarquía visual.
- El texto es legible.
- Las imágenes o elementos visuales no rompen el layout.

### Validation

- QA mobile.
- QA tablet.
- QA desktop.
- Pruebas con navegador responsive.

### Expected Status

Obligatorio para Fase 1.

---

## AC-10 — SEO básico implementado

### Description

La landing debe incluir fundamentos mínimos de SEO para ser indexable y compartible.

### Related User Stories

- US-11

### Acceptance Conditions

La landing cumple este criterio si incluye:

- Title definido.
- Meta description.
- Headings semánticos.
- Un solo H1 principal.
- Open Graph básico.
- Contenido indexable.
- URLs limpias.
- Copy alineado a servicios.
- Sitemap y robots si aplica.

También debe evitar:

- Texto crítico renderizado solo como imagen.
- Headings desordenados.
- Meta tags vacíos.
- Contenido irrelevante para el ICP.

### Validation

- Revisión técnica.
- Lighthouse o herramienta similar.
- QA SEO manual.

### Expected Status

Obligatorio para Fase 1.

---

## AC-11 — La landing permite medir conversión inicial

### Description

La Fase 1 debe permitir evaluar si la landing genera interés comercial real.

### Related User Stories

- US-13

### Acceptance Conditions

La landing cumple este criterio si permite medir al menos:

- Clicks hacia WhatsApp manual.
- Formularios enviados.
- Conversión visita a contacto.
- Calidad manual de los leads.
- Comprensión del mensaje.

La medición puede ser manual o mediante herramientas simples en Fase 1.

### Validation

- Revisión de métricas disponibles.
- Comparación con `success-metrics.md`.
- QA de CTAs y formulario.

### Expected Status

Obligatorio para Fase 1.

---

## AC-12 — La propuesta puede validarse sin automatización

### Description

La Fase 1 debe validar la oferta comercial sin depender de IA, dashboard ni integraciones complejas.

### Related User Stories

- US-13

### Acceptance Conditions

La landing cumple este criterio si:

- Puede captar contactos mediante WhatsApp manual.
- Puede captar contactos mediante formulario.
- No depende de AI Lead Assistant.
- No depende de WhatsApp Cloud API.
- No depende de OpenAI API.
- No depende de Ollama.
- No depende de dashboard completo.
- Permite seguimiento manual inicial.

### Validation

- Revisión de alcance.
- Comparación con `scope.md`.
- QA funcional.

### Expected Status

Obligatorio para Fase 1.

---

## AC-13 — No existen dependencias activas de IA en Fase 1

### Description

La Fase 1 no debe implementar funcionalidades inteligentes ni automatizadas con IA.

### Related User Stories

- US-14

### Acceptance Conditions

La landing cumple este criterio si no incluye:

- AI Lead Assistant activo.
- Chatbot IA.
- Lead scoring automático.
- Clasificación automática de intención.
- Resumen automático de leads.
- OpenAI API.
- Ollama.
- AIProvider productivo.
- Prompts ejecutados en producción.

Puede mencionar IA como servicio futuro o evolución, siempre que no se presente como funcionalidad activa de Fase 1.

### Validation

- Revisión de alcance.
- Revisión de copy.
- Revisión de arquitectura.
- QA documental.

### Expected Status

Obligatorio para Fase 1.

---

## AC-14 — La estructura queda preparada para escalar

### Description

Aunque Fase 1 no implemente backend ni IA, la landing debe diseñarse con una estructura que permita evolución futura.

### Related User Stories

- US-15

### Acceptance Conditions

La landing cumple este criterio si:

- La estructura de secciones es modular.
- El copy diferencia fase actual de capacidades futuras.
- No hay acoplamiento innecesario a servicios externos.
- Se evita construir componentes que bloqueen backend futuro.
- Se mantiene separación conceptual entre landing, captura, dashboard e IA.
- Las futuras capacidades se documentan sin implementarse.

### Validation

- Revisión de arquitectura.
- Revisión de estructura frontend cuando exista implementación.
- Comparación con `system-architecture.md`.

### Expected Status

Obligatorio para Fase 1.

---

# 5. Future Acceptance Criteria — No Fase 1

Los siguientes criterios quedan documentados como futuros.  
No autorizan implementación en Fase 1.

## FAC-01 — Backend futuro registra leads

### Future Phase

Fase 2 / Fase 3

### Description

El sistema futuro podrá registrar leads en una base de datos.

### Status

Futuro, no activo en Fase 1.

---

## FAC-02 — Dashboard futuro muestra leads

### Future Phase

Fase 3

### Description

El sistema futuro podrá mostrar leads, estados y notas en un dashboard interno.

### Status

Futuro, no activo en Fase 1.

---

## FAC-03 — AI Lead Assistant futuro califica leads

### Future Phase

Fase 4

### Description

El asistente futuro podrá conversar, detectar intención, resumir y calificar leads.

### Status

Futuro, no activo en Fase 1.

---

## FAC-04 — WhatsApp Cloud API futuro automatiza conversaciones

### Future Phase

Fase 4

### Description

La integración futura con WhatsApp Cloud API podrá permitir mensajería automatizada bajo reglas oficiales.

### Status

Futuro, no activo en Fase 1.

---

## FAC-05 — Ollama futuro permite IA local inicial

### Future Phase

Fase 4

### Description

Ollama podrá usarse como proveedor IA inicial para desarrollo y validación de AI Lead Assistant.

### Status

Futuro, no activo en Fase 1.

---

## FAC-06 — OpenAI API futuro puede agregarse como proveedor opcional

### Future Phase

Fase 4+

### Description

OpenAI API podrá agregarse como proveedor opcional si se requiere mayor calidad, velocidad o confiabilidad.

### Status

Futuro, no activo en Fase 1.

---

# 6. Traceability Summary

## Phase 1 Acceptance Criteria

| AC | Description | Related Stories | Phase | Status |
|---|---|---|---:|---|
| AC-01 | Hero comunica propuesta principal | US-01 | 1 | Active |
| AC-02 | Propuesta entendible en menos de 10 segundos | US-01, US-02, US-04, US-12 | 1 | Active |
| AC-03 | Público objetivo identificado | US-02, US-03, US-04 | 1 | Active |
| AC-04 | Servicios, casos de uso y beneficios visibles | US-03, US-05, US-06, US-12 | 1 | Active |
| AC-05 | Confianza y proceso de trabajo | US-05, US-06, US-07, US-12 | 1 | Active |
| AC-06 | CTA a WhatsApp manual funciona | US-07, US-08 | 1 | Active |
| AC-07 | Rutas claras de contacto | US-08, US-09 | 1 | Active |
| AC-08 | Formulario captura datos mínimos | US-09 | 1 | Active |
| AC-09 | Landing responsive | US-10 | 1 | Active |
| AC-10 | SEO básico implementado | US-11 | 1 | Active |
| AC-11 | Medición de conversión inicial | US-13 | 1 | Active |
| AC-12 | Validación sin automatización | US-13 | 1 | Active |
| AC-13 | Sin dependencias activas de IA | US-14 | 1 | Active |
| AC-14 | Estructura preparada para escalar | US-15 | 1 | Active |

## Future Acceptance Criteria

| FAC | Description | Future Phase | Status |
|---|---|---:|---|
| FAC-01 | Backend registra leads | 2 / 3 | Future |
| FAC-02 | Dashboard muestra leads | 3 | Future |
| FAC-03 | AI Lead Assistant califica leads | 4 | Future |
| FAC-04 | WhatsApp Cloud API automatiza conversaciones | 4 | Future |
| FAC-05 | Ollama IA local inicial | 4 | Future |
| FAC-06 | OpenAI API opcional | 4+ | Future |

## Acceptance Rule

Todo criterio activo de Fase 1 debe tener:

- Al menos una historia relacionada.
- Validación posible.
- Cobertura en QA Matrix.
- Relación futura con requisitos funcionales o no funcionales.

Los criterios futuros deben permanecer documentados, pero no autorizan implementación fuera del alcance aprobado.

## Final Statement

Los criterios activos de Fase 1 validan exclusivamente la landing comercial, el contacto manual por WhatsApp, el formulario, SEO básico, responsive, claridad comercial y preparación futura.

AI Lead Assistant, WhatsApp Cloud API, Ollama, OpenAI API, dashboard completo, CRM avanzado y automatizaciones quedan fuera de Fase 1.