# ADR-002 — Technology Stack

## Status

Accepted

## Date

2026-05-13

## Project

Apps Marketing / Yoryi AI Studio

---

# 1. Context

El proyecto `apps-marketing` necesita una base técnica moderna, simple y escalable.

El producto iniciará con una landing comercial orientada a conversión, pero debe quedar preparado para evolucionar hacia:

- Captura estructurada de leads.
- Backend.
- Dashboard interno.
- AI Lead Assistant.
- WhatsApp Cloud API.
- Automatizaciones.
- Integraciones futuras.

La decisión técnica debe respetar el alcance definido en `ADR-001 — Project Scope`:

**Fase 1 = landing comercial.**

AI Lead Assistant, WhatsApp Cloud API, OpenAI API, Ollama, dashboard completo, lead scoring automático, CRM, pagos y automatizaciones quedan fuera de Fase 1.

---

# 2. Decision

Se decide usar el siguiente stack objetivo:

## Fase 1

- Next.js.
- TypeScript.
- Tailwind CSS.
- Frontend landing-first.
- Formulario simple.
- WhatsApp manual mediante link `wa.me`.
- SEO básico.
- Deploy frontend simple.

## Fases futuras

- Backend en Node.js.
- NestJS o Express.
- PostgreSQL.
- Prisma.
- Dashboard interno.
- Ollama como proveedor IA local inicial.
- OpenAI API como proveedor IA opcional futuro.
- WhatsApp Cloud API como canal futuro.
- Arquitectura modular preparada para automatizaciones.

---

# 3. Phase 1 Stack

## 3.1 Next.js

Next.js será usado para construir la landing comercial.

### Razones

- Buen soporte para SEO.
- Buen rendimiento.
- Buen ecosistema React.
- Compatible con despliegues modernos.
- Permite escalar luego hacia rutas, API routes o integración backend.
- Facilita estructura modular por componentes.

### Uso en Fase 1

Next.js se usará para:

- Landing principal.
- Layout base.
- Metadata SEO.
- Componentes de secciones.
- Renderizado optimizado.
- Responsive UI.

---

## 3.2 TypeScript

TypeScript será el lenguaje principal del proyecto.

### Razones

- Mayor seguridad al refactorizar.
- Mejor mantenibilidad.
- Mejor autocompletado.
- Menos errores en estructuras de datos.
- Escala mejor cuando el proyecto agregue backend, dashboard e IA.

### Uso en Fase 1

TypeScript se usará para:

- Componentes.
- Tipos de contenido.
- Configuración de secciones.
- Tipos del formulario.
- Utilidades simples.

---

## 3.3 Tailwind CSS

Tailwind CSS será usado para estilos.

### Razones

- Rapidez de desarrollo.
- Consistencia visual.
- Buen soporte responsive.
- Fácil creación de landing moderna.
- Evita CSS desordenado en etapas iniciales.
- Permite construir sistema visual reutilizable.

### Uso en Fase 1

Tailwind se usará para:

- Layout.
- Secciones.
- Cards.
- Botones.
- Responsive design.
- Espaciados.
- Tipografía.
- Estados visuales.

---

## 3.4 Frontend-first Architecture

La Fase 1 será frontend-first.

Esto significa que el foco técnico será:

- Landing comercial.
- UI responsive.
- SEO básico.
- CTA a WhatsApp manual.
- Formulario simple.
- Performance.
- Conversión.

No se construirá backend completo en Fase 1 salvo decisión posterior aprobada.

---

# 4. Phase 1 Explicit Non-Decisions

En Fase 1 no se decide implementar:

- Backend completo.
- PostgreSQL.
- Prisma.
- Dashboard completo.
- Autenticación.
- Roles.
- AI Lead Assistant.
- Ollama.
- OpenAI API.
- WhatsApp Cloud API.
- Lead scoring automático.
- Automatizaciones.
- Pagos.

Estos elementos quedan documentados como futuros, no como alcance activo.

---

# 5. Future Backend Stack

## 5.1 Node.js

Node.js será la base del backend futuro.

### Razones

- Continuidad con TypeScript.
- Buen ecosistema para APIs.
- Compatible con NestJS y Express.
- Buen soporte para integraciones.
- Facilita compartir tipos y lógica futura.

---

## 5.2 NestJS or Express

La decisión final entre NestJS o Express queda para una fase futura.

### NestJS — Ventajas

- Arquitectura más estructurada.
- Mejor para sistemas grandes.
- Buen soporte para módulos.
- Inyección de dependencias.
- Escala bien hacia dashboard, IA y WhatsApp API.

### Express — Ventajas

- Más simple.
- Menos sobrecarga inicial.
- Bueno para API pequeña.
- Rápido de implementar.

### Decisión actual

No se elige definitivamente entre NestJS y Express en Fase 1.

Se documenta como decisión futura.

Recomendación preliminar:

- Usar Express si el backend futuro comienza muy pequeño.
- Usar NestJS si se confirma dashboard, roles, IA, WhatsApp Cloud API y módulos complejos.

---

# 6. Future Database Stack

## 6.1 PostgreSQL

PostgreSQL será la base de datos objetivo futura.

### Razones

- Robusta.
- Relacional.
- Escalable.
- Excelente para leads, usuarios, conversaciones y estados.
- Compatible con Prisma.
- Adecuada para dashboards y reportes.

### No aplica en Fase 1

PostgreSQL no es obligatorio en Fase 1.

---

## 6.2 Prisma

Prisma será el ORM objetivo futuro.

### Razones

- Buen soporte TypeScript.
- Tipado fuerte.
- Migraciones.
- Productividad.
- Buena integración con PostgreSQL.
- Facilita modelo de datos evolutivo.

### No aplica en Fase 1

Prisma no es obligatorio en Fase 1.

---

# 7. Future AI Stack

## 7.1 Ollama

Ollama será considerado como proveedor IA local inicial en fases futuras.

### Razones

- Bajo costo para desarrollo.
- Pruebas locales.
- Control inicial.
- Útil para validar prompts.
- Reduce dependencia temprana de APIs pagas.

### Uso futuro posible

- AI Lead Assistant.
- Intent detection.
- Resúmenes.
- Scoring experimental.
- QA interno.

### No aplica en Fase 1

Ollama no se usa en Fase 1.

---

## 7.2 OpenAI API

OpenAI API será proveedor IA opcional futuro.

### Razones

- Mayor calidad.
- Mejor rendimiento potencial.
- Escalabilidad.
- Útil si Ollama no alcanza calidad suficiente.
- Posible proveedor premium.

### Uso futuro posible

- AI Lead Assistant en producción.
- Resúmenes de mayor calidad.
- Lead scoring más robusto.
- Fallback de Ollama.
- Casos premium.

### No aplica en Fase 1

OpenAI API no se usa en Fase 1.

---

## 7.3 AIProvider Abstraction

Cuando se implemente IA, se deberá usar una abstracción de proveedor:

```txt
AIProvider
   ├── OllamaProvider
   └── OpenAIProvider