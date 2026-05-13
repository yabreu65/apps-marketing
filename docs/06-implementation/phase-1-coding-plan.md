# Phase 1 Coding Plan — Apps Marketing / Yoryi AI Studio

## 1. Purpose
Este plan traduce la SDD aprobada en una estrategia técnica de implementación **frontend-first** para la Fase 1, manteniendo alcance, trazabilidad y criterios de calidad antes de escribir código de negocio.

## 2. Scope
### In Scope (Fase 1)
- Landing comercial completa.
- Hero, propuesta, problema, solución, servicios, casos de uso, beneficios, proceso.
- CTA a WhatsApp manual.
- Formulario de contacto simple.
- Footer.
- SEO básico.
- Responsive design.
- Performance básica.
- Seguridad y privacidad básica.
- Medición inicial de conversión.

### Out of Scope (Fase 1)
- AI Lead Assistant.
- WhatsApp Cloud API.
- OpenAI API / Ollama / AIProvider.
- Lead scoring automático / resumen automático / intent detection.
- Backend completo obligatorio / base de datos obligatoria.
- Dashboard completo / CRM avanzado / pagos / campañas masivas / automatizaciones avanzadas.

## 3. Technical Stack
- Next.js
- TypeScript
- Tailwind CSS
- Arquitectura frontend-first
- WhatsApp manual mediante `wa.me`
- Formulario simple
- SEO básico

## 4. Proposed Folder Structure
> Plan propuesto (sin implementación todavía):

- `src/app/page.tsx`
- `src/app/layout.tsx`
- `src/app/globals.css`
- `src/components/sections/`
- `src/components/ui/`
- `src/data/`
- `src/lib/`
- `src/types/`

## 5. Page Sections
1. **Hero**  
   - Purpose: comunicar oferta principal en <10s  
   - Related FR: FR-01, FR-02  
   - Related AC: AC-01, AC-02  
   - Related QA: QA-001, QA-002, QA-003  
   - Component suggested name: `HeroSection`

2. **Problem**  
   - Purpose: explicitar dolor de conversión  
   - Related FR: FR-04  
   - Related AC: AC-03  
   - Related QA: QA-005  
   - Component suggested name: `ProblemSection`

3. **Solution**  
   - Purpose: presentar solución fase 1 + límites  
   - Related FR: FR-05  
   - Related AC: AC-03, AC-04, AC-12, AC-14  
   - Related QA: QA-006  
   - Component suggested name: `SolutionSection`

4. **Services**  
   - Purpose: mostrar servicios y diferenciar futuros  
   - Related FR: FR-06  
   - Related AC: AC-04  
   - Related QA: QA-007  
   - Component suggested name: `ServicesSection`

5. **Use Cases**  
   - Purpose: mapear ICP a casos concretos  
   - Related FR: FR-07  
   - Related AC: AC-04  
   - Related QA: QA-008  
   - Component suggested name: `UseCasesSection`

6. **Benefits**  
   - Purpose: valor comercial concreto  
   - Related FR: FR-08  
   - Related AC: AC-04, AC-05  
   - Related QA: QA-009  
   - Component suggested name: `BenefitsSection`

7. **Process**  
   - Purpose: explicar pasos de trabajo  
   - Related FR: FR-09  
   - Related AC: AC-05  
   - Related QA: QA-010  
   - Component suggested name: `ProcessSection`

8. **CTA**  
   - Purpose: activar contacto comercial  
   - Related FR: FR-10, FR-11  
   - Related AC: AC-06, AC-07  
   - Related QA: QA-011, QA-012, QA-018  
   - Component suggested name: `CTASection`

9. **Contact Form**  
   - Purpose: captar lead con datos mínimos  
   - Related FR: FR-12, FR-13, FR-14  
   - Related AC: AC-08, AC-11  
   - Related QA: QA-014, QA-015, QA-016, QA-017  
   - Component suggested name: `ContactFormSection`

10. **Footer**  
   - Purpose: cierre informativo y contacto  
   - Related FR: FR-15  
   - Related AC: AC-05, AC-07  
   - Related QA: QA-021 (estructura), checklist release/footer  
   - Component suggested name: `FooterSection`

## 6. Components Plan
Componentes reutilizables propuestos:
- `Container`
- `SectionHeading`
- `Button`
- `Card`
- `CTAButton`
- `ContactForm`
- `ServiceCard`
- `UseCaseCard`
- `BenefitCard`
- `ProcessStep`

## 7. Data Content Plan
Mover contenido editable a `src/data/`:
- `services`
- `useCases`
- `benefits`
- `processSteps`
- `navigation`
- `contactData`
- `siteMetadata`

## 8. Form Strategy
- Campos mínimos: nombre, contacto (email o WhatsApp), tipo de negocio, servicio de interés, mensaje.
- Validación básica de requeridos y formato.
- Mensajes de error claros y no técnicos.
- Mensaje de éxito explícito.
- Sin backend completo obligatorio.
- Sin scoring automático.
- Sin IA.
- Opciones de envío simple permitidas en fase 1 (manual o integración liviana no acoplada a backend completo).

## 9. WhatsApp Strategy
- CTA principal con link `https://wa.me/<phone_number>`.
- Mensaje precargado opcional.
- Canal 100% manual.
- Sin WhatsApp Cloud API.
- Sin bot.
- Sin automatización.

## 10. SEO Strategy
- `title` y `description` definidos.
- Open Graph básico.
- Un H1 único.
- Jerarquía semántica de headings.
- Contenido indexable (texto real).

## 11. Responsive Strategy
- Enfoque mobile-first.
- Breakpoints consistentes.
- CTAs tocables en mobile.
- Formulario usable en mobile/tablet/desktop.

## 12. Performance Strategy
- Imágenes optimizadas.
- Dependencias mínimas.
- Evitar scripts innecesarios.
- Controlar animaciones para no afectar CWV.

## 13. Accessibility Strategy
- Labels claros en formulario.
- Contraste suficiente.
- Botones/links identificables.
- Alt text cuando aplique.
- Navegación básica con teclado.

## 14. Security and Privacy Strategy
- No exponer secretos.
- No pedir datos sensibles.
- Validación de formulario.
- Mensaje breve de privacidad/uso de datos.
- No usar IA sobre datos personales en fase 1.

## 15. Implementation Order
1. Revisar estructura actual del proyecto.
2. Confirmar setup Next.js + Tailwind.
3. Crear data files.
4. Crear UI base reusable.
5. Implementar secciones de contenido (hero, problema, solución, servicios, casos, beneficios, proceso, footer).
6. Integrar CTA WhatsApp manual como parte de la landing.
7. Integrar formulario como parte de la landing.
8. Cerrar integración progresiva de la landing completa.
9. Agregar SEO básico.
10. QA manual con matriz.
11. Ejecutar regression checklist.
12. Ejecutar release checklist.

## 16. QA Mapping
| Feature | FR | NFR | AC | QA |
|---|---|---|---|---|
| Hero y propuesta | FR-01, FR-02, FR-03 | NFR-04, NFR-11 | AC-01, AC-02, AC-03 | QA-001, QA-002, QA-003, QA-004 |
| Problema/Solución | FR-04, FR-05 | NFR-04, NFR-14 | AC-03, AC-04, AC-12, AC-14 | QA-005, QA-006 |
| Servicios/Casos/Beneficios/Proceso | FR-06, FR-07, FR-08, FR-09 | NFR-04, NFR-11 | AC-04, AC-05 | QA-007, QA-008, QA-009, QA-010 |
| WhatsApp manual | FR-10, FR-11, FR-19 | NFR-02, NFR-14, NFR-15 | AC-06, AC-07, AC-12, AC-13 | QA-011, QA-012, QA-013, QA-018 |
| Formulario | FR-12, FR-13, FR-14 | NFR-05, NFR-09, NFR-10 | AC-08, AC-11, AC-12 | QA-014, QA-015, QA-016, QA-017, QA-033, QA-034 |
| SEO/Responsive/Performance | FR-16, FR-17 | NFR-01, NFR-02, NFR-03, NFR-12, NFR-13 | AC-09, AC-10, AC-11 | QA-019, QA-020, QA-021, QA-022, QA-023, QA-024, QA-025, QA-026, QA-027, QA-039 |
| Scope guard | FR-18, FR-19, FR-20 | NFR-06, NFR-08, NFR-14, NFR-15 | AC-12, AC-13, AC-14 | QA-035, QA-036, QA-037, QA-038, QA-040 |

## 17. Definition of Done
La Fase 1 queda lista cuando:
- Secciones completas y consistentes con FR/AC.
- WhatsApp manual y formulario funcionando.
- SEO básico, responsive y performance mínima validados.
- Checklists QA/Regression/Release completadas.
- Sin violaciones de alcance de fase 1.

## 18. Out of Scope Reminder
En esta fase NO se implementa:
- AI Lead Assistant
- WhatsApp Cloud API
- Ollama / OpenAI
- Dashboard
- Backend completo
- Lead scoring automático
- Pagos
- Automatizaciones

## 19. Risks During Implementation
- Scope creep hacia módulos futuros.
- Pérdida de consistencia visual entre secciones.
- Formulario sin mensajes claros.
- Caída de performance por assets no optimizados.
- Ambigüedad entre capacidades actuales y futuras en el copy.

## 20. Next Step After This Plan
Tras aprobar este plan, iniciar implementación por componentes y secciones en iteraciones pequeñas con validación QA continua contra `qa-matrix`, `regression-checklist` y `release-checklist`.
