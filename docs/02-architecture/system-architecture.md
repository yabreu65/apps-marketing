# System Architecture — Apps Marketing / Yoryi AI Studio

## 1. Purpose

Este documento define la arquitectura del proyecto `apps-marketing`.

La arquitectura debe permitir construir primero una landing comercial simple, rápida y orientada a conversión, sin introducir complejidad innecesaria en Fase 1.

También debe dejar preparada la evolución futura hacia backend, dashboard, AI Lead Assistant, WhatsApp Cloud API, automatizaciones e integraciones.

Este documento debe mantenerse alineado con:

- `AGENTS.md`
- `docs/01-sdd/sdd-index.md`
- `docs/01-sdd/prd.md`
- `docs/01-sdd/scope.md`
- `docs/01-sdd/user-stories.md`
- `docs/01-sdd/acceptance-criteria.md`
- `docs/01-sdd/functional-requirements.md`
- `docs/01-sdd/non-functional-requirements.md`
- `docs/02-architecture/data-model.md`
- `docs/02-architecture/api-contracts.md`
- `docs/02-architecture/ai-agent-design.md`
- `docs/02-architecture/whatsapp-integration.md`
- `docs/02-architecture/ai-provider-strategy.md`
- `docs/02-architecture/security-and-privacy.md`
- `docs/04-tests/qa-matrix.md`

## 2. Architecture Principle

El principio rector de arquitectura es:

**Construir primero una landing comercial simple, medible y escalable. Después agregar backend, dashboard e IA cuando exista validación comercial.**

La arquitectura debe evitar:

- Sobrediseño prematuro.
- Dependencia temprana de IA.
- Dependencia temprana de WhatsApp Cloud API.
- Backend obligatorio antes de validar la landing.
- Dashboard completo antes de tener leads reales.
- Costos operativos innecesarios.

## 3. Phase 1 Architecture Summary

La Fase 1 se enfoca en una landing comercial.

### Fase 1 incluye

- Frontend con Next.js.
- TypeScript.
- Tailwind CSS.
- Landing responsive.
- SEO básico.
- CTA a WhatsApp manual.
- Formulario de contacto simple.
- Métricas básicas de conversión.
- Estructura preparada para crecer.

### Fase 1 no incluye

- Backend completo obligatorio.
- Base de datos obligatoria.
- Dashboard completo.
- AI Lead Assistant.
- WhatsApp Cloud API.
- OpenAI API.
- Ollama.
- Lead scoring automático.
- Automatizaciones avanzadas.
- CRM avanzado.
- Pagos.

## 4. Phase 1 High-Level Architecture

```txt
Usuario / Visitante
        ↓
Landing Next.js
        ↓
Secciones comerciales
        ↓
CTA WhatsApp manual / Formulario
        ↓
Seguimiento humano manual