# Non-Functional Requirements — Apps Marketing / Yoryi AI Studio

## 1. Purpose

Este documento define los requisitos no funcionales de la Fase 1 del proyecto `apps-marketing`.

La Fase 1 corresponde a la landing comercial de Apps Marketing / Yoryi AI Studio.

Los requisitos no funcionales describen las condiciones de calidad que debe cumplir el producto: rendimiento, responsive design, SEO técnico básico, accesibilidad, mantenibilidad, seguridad, privacidad, bajo costo operativo y preparación para evolución futura.

Este documento debe mantenerse alineado con:

- `AGENTS.md`
- `docs/01-sdd/sdd-index.md`
- `docs/01-sdd/prd.md`
- `docs/01-sdd/scope.md`
- `docs/01-sdd/user-stories.md`
- `docs/01-sdd/acceptance-criteria.md`
- `docs/01-sdd/functional-requirements.md`
- `docs/02-architecture/system-architecture.md`
- `docs/02-architecture/security-and-privacy.md`
- `docs/04-tests/qa-matrix.md`

## 2. Scope Context

La Fase 1 incluye:

- Landing comercial.
- CTA a WhatsApp manual.
- Formulario de contacto.
- SEO básico.
- Diseño responsive.
- Performance básica.
- Accesibilidad básica.
- Bajo costo operativo.
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
- Backend complejo obligatorio.

## 3. Requirement Format

Cada requisito no funcional contiene:

- ID.
- Nombre.
- Descripción.
- Prioridad.
- Fase.
- Criterio esperado.
- Historias relacionadas.
- Criterios de aceptación relacionados.
- Estado esperado.

---

# 4. Phase 1 Non-Functional Requirements

## NFR-01 — Performance inicial aceptable

### Description

La landing debe cargar rápido y ofrecer una experiencia fluida, especialmente en dispositivos móviles.

### Priority

Alta

### Phase

Fase 1

### Expected Criteria

La landing debe buscar:

- Carga rápida en mobile y desktop.
- Core Web Vitals en verde o dentro de un rango aceptable para producción inicial.
- Imágenes optimizadas.
- Componentes livianos.
- Evitar scripts innecesarios.
- Evitar dependencias pesadas sin justificación.
- Evitar animaciones que afecten rendimiento.

### Related User Stories

- US-10
- US-13

### Related Acceptance Criteria

- AC-09
- AC-10
- AC-11

### Related Functional Requirements

- FR-16
- FR-17
- FR-20

### Status

Activo en Fase 1.

---

## NFR-02 — Responsive design obligatorio

### Description

La landing debe funcionar correctamente en mobile, tablet y desktop.

### Priority

Alta

### Phase

Fase 1

### Expected Criteria

La landing debe cumplir:

- Sin desbordes horizontales.
- Texto legible en mobile.
- CTAs fáciles de tocar.
- Formulario usable en mobile.
- Secciones adaptadas a distintos tamaños de pantalla.
- Jerarquía visual clara.
- Navegación sencilla.
- Buen comportamiento en navegadores modernos.

### Related User Stories

- US-10
- US-08
- US-09

### Related Acceptance Criteria

- AC-07
- AC-08
- AC-09

### Related Functional Requirements

- FR-10
- FR-12
- FR-13
- FR-14

### Status

Activo en Fase 1.

---

## NFR-03 — SEO técnico básico

### Description

La landing debe cumplir fundamentos mínimos de SEO técnico y semántico para ser indexable y compartible.

### Priority

Alta

### Phase

Fase 1

### Expected Criteria

La landing debe incluir:

- Title definido.
- Meta description.
- H1 único.
- Headings ordenados.
- Open Graph básico.
- Contenido indexable.
- URLs limpias.
- Copy alineado al servicio.
- Sitemap y robots si aplica.
- Buen uso de texto real, no texto crítico como imagen.
- Estructura semántica correcta.

### Related User Stories

- US-11
- US-13

### Related Acceptance Criteria

- AC-10
- AC-11

### Related Functional Requirements

- FR-16
- FR-17

### Status

Activo en Fase 1.

---

## NFR-04 — Claridad comunicacional

### Description

La landing debe comunicar la propuesta de valor de forma clara, directa y entendible para el ICP.

### Priority

Alta

### Phase

Fase 1

### Expected Criteria

La landing debe permitir que un visitante entienda en menos de 10 segundos:

- Qué ofrece Apps Marketing / Yoryi AI Studio.
- Para quién es.
- Qué problema resuelve.
- Qué acción debe tomar.
- Por qué debería confiar.

El copy debe evitar:

- Mensajes genéricos.
- Exceso de jerga técnica.
- Promesas exageradas.
- Confusión entre Fase 1 y módulos futuros.
- Vender AI Lead Assistant como si ya fuera parte del MVP inicial.

### Related User Stories

- US-01
- US-02
- US-04
- US-12

### Related Acceptance Criteria

- AC-01
- AC-02
- AC-03
- AC-05

### Related Functional Requirements

- FR-01
- FR-02
- FR-03
- FR-04
- FR-08

### Status

Activo en Fase 1.

---

## NFR-05 — Accesibilidad básica

### Description

La landing debe ofrecer una experiencia mínimamente accesible para usuarios con distintas capacidades y dispositivos.

### Priority

Media

### Phase

Fase 1

### Expected Criteria

La landing debe buscar:

- Buen contraste visual.
- Tamaños de texto legibles.
- Botones y enlaces identificables.
- Formularios con labels claros.
- Mensajes de error comprensibles.
- Navegación razonable con teclado cuando aplique.
- Uso semántico de HTML.
- Imágenes con texto alternativo cuando correspondan.

### Related User Stories

- US-10
- US-09
- US-12

### Related Acceptance Criteria

- AC-08
- AC-09
- AC-10

### Related Functional Requirements

- FR-12
- FR-13
- FR-14
- FR-16

### Status

Activo en Fase 1.

---

## NFR-06 — Bajo costo operativo

### Description

La Fase 1 debe evitar costos innecesarios y dependencias pagas prematuras.

### Priority

Alta

### Phase

Fase 1

### Expected Criteria

La Fase 1 no debe depender de:

- OpenAI API.
- Ollama en producción.
- WhatsApp Cloud API.
- Backend complejo obligatorio.
- Dashboard completo.
- CRM avanzado.
- Servicios pagos no indispensables.
- Infraestructura pesada.

Se permite usar herramientas simples y de bajo costo para:

- Hosting frontend.
- Formulario básico.
- Analítica básica.
- SEO básico.

### Related User Stories

- US-13
- US-14
- US-15

### Related Acceptance Criteria

- AC-12
- AC-13
- AC-14

### Related Functional Requirements

- FR-17
- FR-18
- FR-19
- FR-20

### Status

Activo en Fase 1.

---

## NFR-07 — Mantenibilidad del frontend

### Description

La landing debe construirse con una estructura mantenible para facilitar cambios de copy, secciones y evolución futura.

### Priority

Alta

### Phase

Fase 1

### Expected Criteria

La implementación futura debe favorecer:

- Componentes reutilizables.
- Separación clara de secciones.
- Código legible.
- Estilos consistentes.
- Evitar duplicación innecesaria.
- Fácil edición de textos.
- Fácil ajuste de CTAs.
- Preparación para agregar nuevas secciones sin reescribir la landing.

### Related User Stories

- US-13
- US-15

### Related Acceptance Criteria

- AC-11
- AC-14

### Related Functional Requirements

- FR-15
- FR-17
- FR-20

### Status

Activo en Fase 1.

---

## NFR-08 — Escalabilidad futura controlada

### Description

La Fase 1 debe quedar preparada para evolucionar hacia backend, dashboard e IA sin mezclar esas responsabilidades desde el inicio.

### Priority

Media

### Phase

Fase 1

### Expected Criteria

La arquitectura debe separar conceptualmente:

- Landing comercial.
- Captura de leads.
- Backend futuro.
- Dashboard futuro.
- AI Lead Assistant futuro.
- WhatsApp Cloud API futuro.
- Automatizaciones futuras.

La Fase 1 debe estar preparada para evolucionar, pero no debe implementar módulos futuros sin aprobación SDD y ADR.

### Related User Stories

- US-15
- US-13
- US-14

### Related Acceptance Criteria

- AC-12
- AC-13
- AC-14

### Related Functional Requirements

- FR-18
- FR-19
- FR-20

### Status

Activo en Fase 1.

---

## NFR-09 — Seguridad básica del formulario

### Description

El formulario de contacto debe manejar datos mínimos con cuidado y evitar exposición innecesaria de información sensible.

### Priority

Alta

### Phase

Fase 1

### Expected Criteria

El formulario debe:

- Capturar solo datos necesarios.
- Validar campos básicos.
- Evitar solicitar información sensible innecesaria.
- Mostrar mensajes claros.
- Evitar exponer datos en el frontend de forma insegura.
- Prepararse para futura política de privacidad.
- Evitar almacenar información sin una decisión técnica documentada.

### Related User Stories

- US-09
- US-13

### Related Acceptance Criteria

- AC-08
- AC-11
- AC-12

### Related Functional Requirements

- FR-12
- FR-13
- FR-14
- FR-17

### Status

Activo en Fase 1.

---

## NFR-10 — Privacidad básica

### Description

La Fase 1 debe respetar principios básicos de privacidad en la captura de datos de contacto.

### Priority

Alta

### Phase

Fase 1

### Expected Criteria

La landing debe:

- Capturar solo datos necesarios para contacto comercial.
- Informar de forma simple para qué se usa el formulario.
- Evitar pedir datos sensibles.
- Evitar compartir datos con terceros sin necesidad.
- Prepararse para incluir aviso de privacidad si aplica.
- Mantener coherencia con `security-and-privacy.md`.

### Related User Stories

- US-09
- US-13

### Related Acceptance Criteria

- AC-08
- AC-11
- AC-12

### Related Functional Requirements

- FR-12
- FR-13
- FR-14
- FR-17

### Status

Activo en Fase 1.

---

## NFR-11 — Coherencia visual y de marca

### Description

La landing debe transmitir profesionalismo, confianza y consistencia visual.

### Priority

Media

### Phase

Fase 1

### Expected Criteria

La landing debe mantener:

- Estilo visual consistente.
- Paleta coherente.
- Tipografía legible.
- Espaciado ordenado.
- Jerarquía clara.
- CTAs reconocibles.
- Diseño alineado con una marca AI-first, pero sin sobreprometer IA en Fase 1.

### Related User Stories

- US-01
- US-05
- US-12

### Related Acceptance Criteria

- AC-01
- AC-04
- AC-05

### Related Functional Requirements

- FR-01
- FR-02
- FR-08
- FR-15

### Status

Activo en Fase 1.

---

## NFR-12 — Compatibilidad con navegadores modernos

### Description

La landing debe funcionar correctamente en navegadores modernos de uso común.

### Priority

Media

### Phase

Fase 1

### Expected Criteria

Debe validarse comportamiento en:

- Chrome.
- Safari.
- Firefox.
- Edge.
- Mobile browsers modernos.

No se requiere soporte avanzado para navegadores obsoletos salvo decisión explícita.

### Related User Stories

- US-10
- US-13

### Related Acceptance Criteria

- AC-09
- AC-11

### Related Functional Requirements

- FR-10
- FR-12
- FR-16
- FR-17

### Status

Activo en Fase 1.

---

## NFR-13 — Observabilidad básica de conversión

### Description

La Fase 1 debe permitir observar si los visitantes toman acciones comerciales básicas.

### Priority

Media

### Phase

Fase 1

### Expected Criteria

La observabilidad inicial puede ser manual o simple.

Debe permitir revisar:

- Clicks a WhatsApp.
- Formularios enviados.
- Calidad manual de leads.
- Conversión aproximada visita -> contacto.
- Comprensión del mensaje.
- Problemas reportados por usuarios.

No requiere dashboard completo en Fase 1.

### Related User Stories

- US-13
- US-15

### Related Acceptance Criteria

- AC-11
- AC-12
- AC-14

### Related Functional Requirements

- FR-17
- FR-20

### Status

Activo en Fase 1.

---

## NFR-14 — Separación entre fase actual y capacidades futuras

### Description

La documentación, el copy y la arquitectura deben separar claramente lo que existe en Fase 1 de lo que se implementará en fases futuras.

### Priority

Alta

### Phase

Fase 1

### Expected Criteria

Debe quedar claro que:

- AI Lead Assistant es futuro.
- WhatsApp Cloud API es futuro.
- Ollama es futuro.
- OpenAI API es futuro.
- Dashboard completo es futuro.
- CRM avanzado es futuro.
- Automatizaciones avanzadas son futuras.

La landing puede mencionar capacidades futuras, pero no debe presentarlas como funcionalidad activa.

### Related User Stories

- US-14
- US-15
- US-13

### Related Acceptance Criteria

- AC-12
- AC-13
- AC-14

### Related Functional Requirements

- FR-18
- FR-19
- FR-20

### Status

Activo en Fase 1 como restricción de calidad y alcance.

---

## NFR-15 — Evitar scope creep técnico

### Description

La Fase 1 debe mantenerse enfocada en la landing comercial, evitando agregar módulos técnicos que no fueron aprobados.

### Priority

Alta

### Phase

Fase 1

### Expected Criteria

No se debe agregar sin SDD + ADR:

- Backend complejo.
- Dashboard completo.
- AI Lead Assistant.
- WhatsApp Cloud API.
- OpenAI API.
- Ollama.
- CRM.
- Pagos.
- Automatizaciones avanzadas.
- Campañas masivas.

Cualquier cambio de alcance debe actualizar:

- PRD.
- Scope.
- Acceptance Criteria.
- Functional Requirements.
- Non-Functional Requirements.
- Architecture.
- QA Matrix.
- ADR correspondiente.

### Related User Stories

- US-14
- US-15

### Related Acceptance Criteria

- AC-12
- AC-13
- AC-14

### Related Functional Requirements

- FR-18
- FR-19
- FR-20

### Status

Activo en Fase 1 como restricción obligatoria.

---

# 5. Future Non-Functional Requirements — No Fase 1

Estos requisitos quedan documentados para fases futuras.  
No autorizan implementación en Fase 1.

## FNFR-01 — Disponibilidad del backend futuro

### Future Phase

Fase 2 / Fase 3

### Description

Cuando exista backend, deberá definirse disponibilidad esperada, manejo de errores y continuidad operativa.

### Status

Futuro, no activo en Fase 1.

---

## FNFR-02 — Seguridad avanzada de datos

### Future Phase

Fase 2 / Fase 3

### Description

Cuando se guarden leads en base de datos, deberán definirse reglas de protección, acceso, retención y auditoría.

### Status

Futuro, no activo en Fase 1.

---

## FNFR-03 — Observabilidad del dashboard

### Future Phase

Fase 3

### Description

Cuando exista dashboard, deberá tener métricas, logs y seguimiento de errores adecuados.

### Status

Futuro, no activo en Fase 1.

---

## FNFR-04 — Calidad de respuestas del AI Lead Assistant

### Future Phase

Fase 4

### Description

Cuando exista AI Lead Assistant, deberá evaluarse precisión, tono, consistencia, seguridad y tasa de escalamiento humano.

### Status

Futuro, no activo en Fase 1.

---

## FNFR-05 — Latencia del proveedor IA

### Future Phase

Fase 4

### Description

Cuando se use Ollama u OpenAI, deberá definirse latencia aceptable para respuestas del asistente.

### Status

Futuro, no activo en Fase 1.

---

## FNFR-06 — Cumplimiento de reglas WhatsApp Cloud API

### Future Phase

Fase 4

### Description

Cuando se implemente WhatsApp Cloud API, deberán respetarse reglas oficiales, opt-in, plantillas, límites y políticas de mensajería.

### Status

Futuro, no activo en Fase 1.

---

## FNFR-07 — Escalabilidad de automatizaciones

### Future Phase

Fase 5

### Description

Cuando existan automatizaciones, deberán definirse límites, monitoreo, manejo de errores y mecanismos de desactivación.

### Status

Futuro, no activo en Fase 1.

---

# 6. Traceability Matrix

## Phase 1 Non-Functional Requirements

| NFR | Description | Related US | Related AC | Related FR | Phase | Status |
|---|---|---|---|---|---:|---|
| NFR-01 | Performance inicial aceptable | US-10, US-13 | AC-09, AC-10, AC-11 | FR-16, FR-17, FR-20 | 1 | Active |
| NFR-02 | Responsive design obligatorio | US-10, US-08, US-09 | AC-07, AC-08, AC-09 | FR-10, FR-12, FR-13, FR-14 | 1 | Active |
| NFR-03 | SEO técnico básico | US-11, US-13 | AC-10, AC-11 | FR-16, FR-17 | 1 | Active |
| NFR-04 | Claridad comunicacional | US-01, US-02, US-04, US-12 | AC-01, AC-02, AC-03, AC-05 | FR-01, FR-02, FR-03, FR-04, FR-08 | 1 | Active |
| NFR-05 | Accesibilidad básica | US-10, US-09, US-12 | AC-08, AC-09, AC-10 | FR-12, FR-13, FR-14, FR-16 | 1 | Active |
| NFR-06 | Bajo costo operativo | US-13, US-14, US-15 | AC-12, AC-13, AC-14 | FR-17, FR-18, FR-19, FR-20 | 1 | Active |
| NFR-07 | Mantenibilidad frontend | US-13, US-15 | AC-11, AC-14 | FR-15, FR-17, FR-20 | 1 | Active |
| NFR-08 | Escalabilidad futura controlada | US-15, US-13, US-14 | AC-12, AC-13, AC-14 | FR-18, FR-19, FR-20 | 1 | Active |
| NFR-09 | Seguridad básica del formulario | US-09, US-13 | AC-08, AC-11, AC-12 | FR-12, FR-13, FR-14, FR-17 | 1 | Active |
| NFR-10 | Privacidad básica | US-09, US-13 | AC-08, AC-11, AC-12 | FR-12, FR-13, FR-14, FR-17 | 1 | Active |
| NFR-11 | Coherencia visual y marca | US-01, US-05, US-12 | AC-01, AC-04, AC-05 | FR-01, FR-02, FR-08, FR-15 | 1 | Active |
| NFR-12 | Compatibilidad navegadores modernos | US-10, US-13 | AC-09, AC-11 | FR-10, FR-12, FR-16, FR-17 | 1 | Active |
| NFR-13 | Observabilidad básica de conversión | US-13, US-15 | AC-11, AC-12, AC-14 | FR-17, FR-20 | 1 | Active |
| NFR-14 | Separación fase actual/futuro | US-14, US-15, US-13 | AC-12, AC-13, AC-14 | FR-18, FR-19, FR-20 | 1 | Active |
| NFR-15 | Evitar scope creep técnico | US-14, US-15 | AC-12, AC-13, AC-14 | FR-18, FR-19, FR-20 | 1 | Active |

## Future Non-Functional Requirements

| FNFR | Description | Future Phase | Status |
|---|---|---:|---|
| FNFR-01 | Disponibilidad del backend futuro | 2 / 3 | Future |
| FNFR-02 | Seguridad avanzada de datos | 2 / 3 | Future |
| FNFR-03 | Observabilidad del dashboard | 3 | Future |
| FNFR-04 | Calidad de respuestas del AI Lead Assistant | 4 | Future |
| FNFR-05 | Latencia del proveedor IA | 4 | Future |
| FNFR-06 | Cumplimiento de reglas WhatsApp Cloud API | 4 | Future |
| FNFR-07 | Escalabilidad de automatizaciones | 5 | Future |

## Traceability Rule

Todo requisito no funcional activo debe mapear al menos a:

- Una historia de usuario.
- Un criterio de aceptación.
- Un requisito funcional relacionado cuando aplique.
- Una validación en QA Matrix.
- Una decisión de alcance vigente.

Los requisitos futuros no autorizan implementación en Fase 1.

## Final Statement

Los requisitos no funcionales activos de Fase 1 están limitados a calidad de landing, rendimiento, responsive, SEO básico, claridad comunicacional, accesibilidad básica, bajo costo operativo, privacidad, seguridad básica, mantenibilidad y preparación futura.

AI Lead Assistant, WhatsApp Cloud API, Ollama, OpenAI API, dashboard completo, CRM avanzado, pagos y automatizaciones inteligentes quedan fuera de Fase 1.