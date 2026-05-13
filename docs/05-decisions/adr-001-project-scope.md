# ADR-001 — Project Scope

## Status

Accepted

## Date

2026-05-13

## Project

Apps Marketing / Yoryi AI Studio

---

# 1. Context

El proyecto `apps-marketing` nace como una iniciativa enfocada en:

- Desarrollo web.
- Landing pages.
- Marketing digital.
- SEO.
- Automatización comercial.
- Desarrollo con inteligencia artificial.
- Sistemas a medida.

Desde el inicio se identificó una oportunidad futura importante: construir un módulo llamado **AI Lead Assistant**, capaz de captar clientes, entender necesidades, calificar leads, resumir oportunidades y ayudar al cierre comercial.

Sin embargo, también se decidió que el primer entregable no debe ser el asistente inteligente.

Antes de automatizar, el proyecto necesita validar:

- La oferta comercial.
- El mensaje de marca.
- El público objetivo.
- La propuesta de valor.
- La conversión de la landing.
- El flujo manual de contacto.
- La calidad de los leads recibidos.

Por eso, la primera fase debe enfocarse en una landing comercial profesional.

---

# 2. Decision

La decisión oficial del proyecto es:

**La Fase 1 será una landing comercial para Apps Marketing / Yoryi AI Studio.**

El primer entregable oficial no será AI Lead Assistant.

AI Lead Assistant queda definido como módulo futuro.

---

# 3. Phase 1 Scope

La Fase 1 incluye:

- Home / landing principal.
- Hero comercial.
- Propuesta de valor.
- Problema que resuelve.
- Solución propuesta.
- Servicios.
- Casos de uso.
- Beneficios.
- Proceso de trabajo.
- CTA a WhatsApp manual.
- Formulario de contacto.
- SEO básico.
- Responsive design.
- Performance básica.
- Seguridad y privacidad básica.
- Medición inicial de conversión.
- Preparación estructural para evolución futura.

---

# 4. Phase 1 Out of Scope

La Fase 1 no incluye:

- AI Lead Assistant.
- Chatbot inteligente.
- WhatsApp Cloud API.
- OpenAI API.
- Ollama.
- AIProvider.
- Lead scoring automático.
- Resumen automático de leads.
- Clasificación automática de intención.
- Dashboard completo.
- CRM avanzado.
- Pagos.
- Campañas masivas.
- Automatizaciones avanzadas.
- Backend completo obligatorio.
- Base de datos obligatoria.
- Historial automatizado de conversaciones.

---

# 5. Rationale

La razón principal de esta decisión es reducir riesgo y validar primero el negocio.

Construir AI Lead Assistant desde el inicio aumentaría:

- Complejidad técnica.
- Costos.
- Riesgo de scope creep.
- Dependencia de proveedores IA.
- Riesgo de privacidad.
- Tiempo antes de validar la oferta.
- Probabilidad de construir automatización sobre un flujo comercial todavía no probado.

La landing comercial permite validar de forma más simple:

- Si el mensaje atrae al ICP.
- Si los visitantes entienden la propuesta.
- Si el CTA a WhatsApp genera conversaciones.
- Si el formulario genera leads.
- Qué preguntas hacen los prospectos.
- Qué servicios despiertan más interés.
- Qué patrones podrían automatizarse después.

---

# 6. Product Principle

El principio rector del proyecto es:

**Primero validamos oferta y conversión. Después automatizamos.**

Esto significa:

- Primero landing.
- Luego captura básica.
- Luego backend.
- Luego dashboard.
- Luego AI Lead Assistant.
- Luego automatizaciones.

No se debe invertir el orden sin una decisión formal documentada.

---

# 7. Roadmap Decision

El roadmap aprobado es:

1. Landing comercial.
2. Captura básica de leads.
3. Formulario / WhatsApp manual.
4. Backend futuro.
5. Dashboard interno futuro.
6. AI Lead Assistant.
7. Automatizaciones futuras.

---

# 8. Implications

Esta decisión implica que:

- La documentación debe separar Fase 1 de fases futuras.
- La arquitectura debe evitar sobreingeniería prematura.
- Los documentos de IA pueden existir, pero marcados como futuros.
- Los prompts pueden documentarse, pero no ejecutarse en Fase 1.
- WhatsApp debe ser manual en Fase 1.
- OpenAI y Ollama no se usan en Fase 1.
- No debe crearse dashboard completo en Fase 1.
- No debe implementarse backend completo salvo decisión posterior.
- La medición inicial se centra en conversión manual.

---

# 9. Accepted Trade-offs

## 9.1 Se acepta menor automatización inicial

La Fase 1 no automatiza conversaciones ni scoring.

Esto se acepta porque el objetivo inicial es aprender del mercado.

## 9.2 Se acepta seguimiento manual

Los leads serán revisados manualmente al inicio.

Esto permite entender patrones antes de crear lógica automática.

## 9.3 Se acepta no tener dashboard inicial

La gestión puede ser manual o simple hasta validar volumen real de leads.

## 9.4 Se acepta no usar IA al principio

La IA se incorpora cuando exista flujo comercial validado.

## 9.5 Se acepta menor complejidad técnica

La Fase 1 prioriza velocidad, claridad, bajo costo y validación.

---

# 10. Risks

## 10.1 Riesgo: retrasar demasiado la IA

Mitigación:

- Documentar AI Lead Assistant desde el inicio.
- Mantener prompts, arquitectura y tests futuros preparados.
- Revisar señales de activación después de validar landing.

## 10.2 Riesgo: landing sin conversión

Mitigación:

- Priorizar copy, CTA, ICP y claridad.
- Medir clicks, formularios y calidad de leads.
- Iterar rápido.

## 10.3 Riesgo: scope creep hacia IA

Mitigación:

- Mantener este ADR como decisión madre.
- Requerir nuevo ADR para mover IA a una fase activa.
- Usar regression checklist y release checklist.

## 10.4 Riesgo: confundir servicios futuros con activos

Mitigación:

- Separar claramente “Fase 1” y “Futuro” en copy, SDD y arquitectura.

## 10.5 Riesgo: crear documentación futura excesiva

Mitigación:

- Documentar módulos futuros como preparación, no como autorización de implementación.

---

# 11. Change Control

Esta decisión solo puede modificarse mediante:

- Actualización de PRD.
- Actualización de Scope.
- Actualización de SDD Index.
- Actualización de Architecture docs.
- Actualización de QA Matrix.
- Nuevo ADR o modificación formal de este ADR.
- Aprobación explícita de Yoryi.

No se puede mover AI Lead Assistant a Fase 1 sin decisión formal.

---

# 12. Validation

La decisión se considera válida si:

- La Fase 1 se mantiene enfocada en landing comercial.
- La landing puede captar leads por WhatsApp manual y formulario.
- La documentación mantiene IA como futuro.
- No se implementa WhatsApp Cloud API en Fase 1.
- No se implementa OpenAI/Ollama en Fase 1.
- No se implementa dashboard completo en Fase 1.
- La arquitectura permite evolucionar sin rehacer todo.

---

# 13. Related Documents

Este ADR se relaciona con:

- `AGENTS.md`
- `docs/01-sdd/sdd-index.md`
- `docs/00-vision/product-vision.md`
- `docs/00-vision/business-model.md`
- `docs/00-vision/target-customers.md`
- `docs/00-vision/success-metrics.md`
- `docs/01-sdd/prd.md`
- `docs/01-sdd/scope.md`
- `docs/01-sdd/user-stories.md`
- `docs/01-sdd/acceptance-criteria.md`
- `docs/01-sdd/functional-requirements.md`
- `docs/01-sdd/non-functional-requirements.md`
- `docs/02-architecture/system-architecture.md`
- `docs/02-architecture/ai-agent-design.md`
- `docs/02-architecture/whatsapp-integration.md`
- `docs/04-tests/qa-matrix.md`
- `docs/04-tests/regression-checklist.md`
- `docs/04-tests/release-checklist.md`

---

# 14. Decision Summary

Se decide construir primero una landing comercial para Apps Marketing / Yoryi AI Studio.

AI Lead Assistant, WhatsApp Cloud API, Ollama, OpenAI API, lead scoring automático, dashboard completo, CRM, pagos y automatizaciones quedan fuera de Fase 1.

La Fase 1 debe validar oferta, mensaje, ICP, conversión y captación manual antes de invertir en automatización e IA.

---

# 15. Final Statement

La decisión oficial es:

**Fase 1 = landing comercial.**

**AI Lead Assistant = módulo futuro.**

**Primero conversión manual. Después automatización inteligente.**