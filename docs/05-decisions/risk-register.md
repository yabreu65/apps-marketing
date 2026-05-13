# Risk Register — Apps Marketing / Yoryi AI Studio

## 1. Purpose

Este documento registra los riesgos principales del proyecto `apps-marketing`.

El objetivo es anticipar problemas de producto, alcance, arquitectura, seguridad, privacidad, conversión, costos y operación antes de iniciar implementación.

La Fase 1 corresponde a:

- Landing comercial.
- CTA a WhatsApp manual.
- Formulario de contacto.
- SEO básico.
- Responsive.
- Seguimiento humano/manual.

Este documento debe mantenerse alineado con:

- `AGENTS.md`
- `docs/01-sdd/sdd-index.md`
- `docs/01-sdd/prd.md`
- `docs/01-sdd/scope.md`
- `docs/01-sdd/non-functional-requirements.md`
- `docs/02-architecture/system-architecture.md`
- `docs/02-architecture/security-and-privacy.md`
- `docs/04-tests/qa-matrix.md`
- `docs/04-tests/regression-checklist.md`
- `docs/04-tests/release-checklist.md`
- `docs/05-decisions/adr-001-project-scope.md`
- `docs/05-decisions/adr-002-stack.md`
- `docs/05-decisions/adr-003-ai-provider.md`
- `docs/05-decisions/adr-004-whatsapp-provider.md`

---

# 2. Risk Management Principle

El principio rector de riesgos es:

**Primero validar oferta, mensaje y conversión con bajo costo. Después automatizar con backend, dashboard e IA cuando exista evidencia real.**

La Fase 1 debe evitar:

- Sobrediseño prematuro.
- Scope creep hacia IA.
- Costos antes de ingresos.
- Automatizaciones sin flujo validado.
- Captura excesiva de datos.
- Promesas comerciales exageradas.
- Dependencias técnicas innecesarias.

---

# 3. Risk Levels

## Probability

| Nivel | Descripción |
|---|---|
| Low | Poco probable |
| Medium | Puede ocurrir |
| High | Probable si no se controla |

## Impact

| Nivel | Descripción |
|---|---|
| Low | Impacto menor |
| Medium | Afecta calidad, tiempo o claridad |
| High | Puede bloquear release, ventas, seguridad o confianza |

## Status

| Estado | Descripción |
|---|---|
| Open | Riesgo activo |
| Mitigated | Riesgo mitigado parcialmente |
| Accepted | Riesgo aceptado |
| Closed | Riesgo cerrado |

---

# 4. Phase 1 Risk Register

| ID | Riesgo | Probabilidad | Impacto | Estado |
|---|---|---|---|---|
| R-001 | Scope creep hacia AI Lead Assistant | High | High | Open |
| R-002 | Landing visualmente buena pero con baja conversión | Medium | High | Open |
| R-003 | Mensaje comercial confuso | Medium | High | Open |
| R-004 | Atraer leads no calificados | Medium | Medium | Open |
| R-005 | Implementar backend antes de validación | Medium | Medium | Open |
| R-006 | Integrar WhatsApp Cloud API demasiado pronto | Medium | High | Open |
| R-007 | Usar OpenAI/Ollama antes de tiempo | Medium | High | Open |
| R-008 | Formulario pide demasiados datos | Medium | Medium | Open |
| R-009 | Problemas de privacidad en captura de leads | Medium | High | Open |
| R-010 | Secretos o API keys expuestas | Low | High | Open |
| R-011 | Performance deficiente en mobile | Medium | High | Open |
| R-012 | SEO básico incompleto | Medium | Medium | Open |
| R-013 | Responsive roto en mobile | Medium | High | Open |
| R-014 | CTA WhatsApp mal configurado | Medium | High | Open |
| R-015 | Formulario no funcional | Medium | High | Open |
| R-016 | Copy promete más de lo que se entrega | Medium | High | Open |
| R-017 | Costos futuros de IA sin control | Medium | High | Future |
| R-018 | Costos futuros de WhatsApp Cloud API sin control | Medium | High | Future |
| R-019 | Dependencia futura de proveedor IA | Medium | Medium | Future |
| R-020 | Riesgo de seguridad en dashboard futuro | Medium | High | Future |
| R-021 | Riesgo de datos sensibles en IA futura | Medium | High | Future |
| R-022 | Retraso por documentación excesiva sin implementación | Medium | Medium | Open |
| R-023 | Falta de medición post-release | Medium | Medium | Open |
| R-024 | Falta de seguimiento manual a leads | Medium | High | Open |
| R-025 | Confundir capacidades futuras con producto activo | High | High | Open |

---

# 5. Detailed Risks

## R-001 — Scope creep hacia AI Lead Assistant

### Description

Existe riesgo de mover AI Lead Assistant a Fase 1 antes de validar la landing comercial.

### Probability

High

### Impact

High

### Consequences

- Aumenta complejidad.
- Aumenta costo.
- Retrasa release.
- Requiere IA, prompts, QA y privacidad.
- Puede desordenar la arquitectura.
- Puede distraer del objetivo principal: conversión.

### Mitigation

- Mantener `ADR-001` como decisión madre.
- Mantener AI Lead Assistant como módulo futuro.
- Ejecutar regression checklist.
- No implementar IA sin fase aprobada.
- No ejecutar prompts productivos en Fase 1.

### Owner

Yoryi / Product

### Status

Open

---

## R-002 — Landing visualmente buena pero con baja conversión

### Description

La landing puede verse profesional, pero no generar contactos reales.

### Probability

Medium

### Impact

High

### Consequences

- Pocas consultas.
- Bajo CTR en WhatsApp.
- Formularios escasos.
- Validación comercial débil.
- Dificultad para justificar fases futuras.

### Mitigation

- Priorizar copy y CTA.
- Validar comprensión en menos de 10 segundos.
- Medir clicks a WhatsApp.
- Medir formularios enviados.
- Iterar hero, propuesta y CTA después del release.

### Owner

Yoryi / Marketing

### Status

Open

---

## R-003 — Mensaje comercial confuso

### Description

El visitante puede no entender qué ofrece Apps Marketing / Yoryi AI Studio.

### Probability

Medium

### Impact

High

### Consequences

- Rebote alto.
- Baja confianza.
- Leads poco claros.
- Usuarios confundidos entre landing, IA, marketing y sistemas.

### Mitigation

- Mantener hero simple.
- Reforzar propuesta de valor.
- Diferenciar Fase 1 de capacidades futuras.
- Usar lenguaje orientado a negocio.
- Evitar exceso de tecnicismos.

### Owner

Yoryi / Product

### Status

Open

---

## R-004 — Atraer leads no calificados

### Description

La landing puede atraer prospectos que no pertenecen al ICP o que solo buscan soluciones baratas.

### Probability

Medium

### Impact

Medium

### Consequences

- Pérdida de tiempo en seguimiento.
- Baja calidad comercial.
- Conversaciones poco accionables.
- Menor tasa de cierre.

### Mitigation

- Definir claramente el ICP.
- Explicar servicios y enfoque profesional.
- Usar copy que filtre mejor.
- Revisar calidad manual de leads.
- Ajustar mensaje según datos reales.

### Owner

Yoryi / Sales

### Status

Open

---

## R-005 — Implementar backend antes de validación

### Description

Existe riesgo de construir backend, base de datos o dashboard antes de validar la landing.

### Probability

Medium

### Impact

Medium

### Consequences

- Mayor tiempo de desarrollo.
- Mayor costo.
- Más mantenimiento.
- Más superficie de seguridad.
- Menos foco en conversión.

### Mitigation

- Mantener Fase 1 frontend-first.
- Permitir solo formulario simple.
- No implementar PostgreSQL/Prisma sin fase aprobada.
- Usar ADR si se decide backend mínimo.

### Owner

Yoryi / Architecture

### Status

Open

---

## R-006 — Integrar WhatsApp Cloud API demasiado pronto

### Description

WhatsApp Cloud API puede entrar antes de que exista volumen real de leads.

### Probability

Medium

### Impact

High

### Consequences

- Complejidad con Meta.
- Webhooks.
- Tokens.
- Templates.
- Costos.
- Riesgos de privacidad.
- Retraso del MVP.

### Mitigation

- Usar solo link `wa.me` en Fase 1.
- Mantener `ADR-004`.
- No crear webhooks en Fase 1.
- Evaluar API solo con flujo manual validado.

### Owner

Yoryi / Architecture

### Status

Open

---

## R-007 — Usar OpenAI/Ollama antes de tiempo

### Description

Existe riesgo de implementar IA antes de validar el flujo comercial manual.

### Probability

Medium

### Impact

High

### Consequences

- Costos o complejidad local.
- Necesidad de prompts y QA.
- Riesgos de privacidad.
- Respuestas incorrectas.
- Scope creep técnico.

### Mitigation

- Mantener `ADR-003`.
- No usar IA en Fase 1.
- Documentar prompts como futuros.
- Ejecutar IA solo con evaluación y fase aprobada.

### Owner

Yoryi / AI Architecture

### Status

Open

---

## R-008 — Formulario pide demasiados datos

### Description

Un formulario demasiado largo puede reducir conversión.

### Probability

Medium

### Impact

Medium

### Consequences

- Menos formularios enviados.
- Mayor fricción.
- Abandono en mobile.
- Percepción invasiva.

### Mitigation

- Pedir solo datos mínimos.
- Usar campos claros.
- Evitar datos sensibles.
- Permitir WhatsApp como alternativa.
- Revisar formularios enviados por semana.

### Owner

Yoryi / UX

### Status

Open

---

## R-009 — Problemas de privacidad en captura de leads

### Description

Capturar datos sin explicar su uso puede afectar confianza.

### Probability

Medium

### Impact

High

### Consequences

- Pérdida de confianza.
- Riesgo reputacional.
- Manejo inadecuado de datos.
- Problemas futuros al escalar.

### Mitigation

- Captura mínima.
- Mensaje simple de privacidad.
- No pedir datos sensibles.
- No enviar datos a IA en Fase 1.
- Mantener `security-and-privacy.md`.

### Owner

Yoryi / Security

### Status

Open

---

## R-010 — Secretos o API keys expuestas

### Description

Existe riesgo de subir `.env`, tokens o claves al repositorio.

### Probability

Low

### Impact

High

### Consequences

- Compromiso de seguridad.
- Costos inesperados.
- Exposición de servicios.
- Necesidad de rotar claves.

### Mitigation

- No commitear `.env`.
- Usar `.gitignore`.
- Revisar repositorio antes de release.
- No usar claves IA/WhatsApp en Fase 1.
- Ejecutar release checklist.

### Owner

Yoryi / Development

### Status

Open

---

## R-011 — Performance deficiente en mobile

### Description

La landing puede cargar lento por imágenes, animaciones o dependencias pesadas.

### Probability

Medium

### Impact

High

### Consequences

- Rebote alto.
- Mala experiencia mobile.
- Peor SEO.
- Menor conversión.

### Mitigation

- Optimizar imágenes.
- Evitar scripts innecesarios.
- Controlar animaciones.
- Validar Core Web Vitals.
- Priorizar mobile.

### Owner

Yoryi / Frontend

### Status

Open

---

## R-012 — SEO básico incompleto

### Description

La landing puede salir sin title, meta description, headings correctos u Open Graph.

### Probability

Medium

### Impact

Medium

### Consequences

- Menor indexación.
- Mala vista al compartir.
- Menor tráfico orgánico.
- Menor confianza.

### Mitigation

- Ejecutar SEO checklist.
- Revisar metadata.
- Validar H1 único.
- Mantener contenido indexable.
- Revisar Open Graph.

### Owner

Yoryi / SEO

### Status

Open

---

## R-013 — Responsive roto en mobile

### Description

La landing puede verse bien en desktop, pero romperse en mobile.

### Probability

Medium

### Impact

High

### Consequences

- Mala experiencia.
- Menos clicks a WhatsApp.
- Formularios abandonados.
- Menor conversión.

### Mitigation

- Diseñar mobile-first.
- Probar breakpoints.
- Validar formulario mobile.
- Probar en dispositivo real.
- Ejecutar responsive QA.

### Owner

Yoryi / Frontend

### Status

Open

---

## R-014 — CTA WhatsApp mal configurado

### Description

El link de WhatsApp puede tener número incorrecto, formato inválido o mensaje mal codificado.

### Probability

Medium

### Impact

High

### Consequences

- Leads perdidos.
- Conversión rota.
- Mala experiencia.
- Release bloqueado.

### Mitigation

- Probar link en mobile y desktop.
- Validar formato `wa.me`.
- Revisar mensaje precargado.
- Probar en producción.
- Ejecutar release checklist.

### Owner

Yoryi / QA

### Status

Open

---

## R-015 — Formulario no funcional

### Description

El formulario puede no enviar, no validar o no mostrar confirmación.

### Probability

Medium

### Impact

High

### Consequences

- Leads perdidos.
- Fricción.
- Baja confianza.
- Release bloqueado si no hay alternativa.

### Mitigation

- Validar campos.
- Probar envío.
- Mostrar errores claros.
- Tener WhatsApp como alternativa.
- Revisar en producción.

### Owner

Yoryi / QA

### Status

Open

---

## R-016 — Copy promete más de lo que se entrega

### Description

El contenido puede prometer IA, automatización o resultados que no existen en Fase 1.

### Probability

Medium

### Impact

High

### Consequences

- Expectativas incorrectas.
- Pérdida de confianza.
- Leads confundidos.
- Scope creep.
- Riesgo reputacional.

### Mitigation

- Separar actual vs futuro.
- Evitar promesas garantizadas.
- Revisar hero y servicios.
- Ejecutar scope QA.
- Mantener ADR-001.

### Owner

Yoryi / Product

### Status

Open

---

# 6. Future Risks

## R-017 — Costos futuros de IA sin control

### Description

OpenAI API u otros proveedores pueden generar costos variables.

### Probability

Medium

### Impact

High

### Mitigation

- Definir presupuesto.
- Usar Ollama para pruebas.
- Implementar límites.
- Monitorear consumo.
- Usar AIProvider.
- Requerir ADR antes de producción.

### Status

Future

---

## R-018 — Costos futuros de WhatsApp Cloud API sin control

### Description

WhatsApp Cloud API puede generar costos según volumen, país, tipo de conversación o templates.

### Probability

Medium

### Impact

High

### Mitigation

- Revisar precios oficiales antes de activar.
- Estimar volumen.
- Definir presupuesto.
- Medir ROI.
- Documentar decisión en ADR.

### Status

Future

---

## R-019 — Dependencia futura de proveedor IA

### Description

Acoplar el sistema a un solo proveedor puede dificultar cambios futuros.

### Probability

Medium

### Impact

Medium

### Mitigation

- Implementar AIProvider.
- Separar lógica de negocio.
- Mantener Ollama y OpenAI como opciones.
- Usar mock provider para tests.

### Status

Future

---

## R-020 — Riesgo de seguridad en dashboard futuro

### Description

Cuando exista dashboard, los leads podrían quedar expuestos sin autenticación o permisos correctos.

### Probability

Medium

### Impact

High

### Mitigation

- Implementar auth.
- Definir roles.
- Proteger rutas.
- Evitar exposición pública.
- Auditar accesos.
- Revisar security checklist.

### Status

Future

---

## R-021 — Riesgo de datos sensibles en IA futura

### Description

Conversaciones reales podrían enviarse a modelos IA sin minimización o consentimiento.

### Probability

Medium

### Impact

High

### Mitigation

- Minimizar datos.
- No enviar datos sensibles.
- Revisar privacidad.
- Documentar proveedor.
- Mantener escalamiento humano.
- No usar IA sin ADR.

### Status

Future

---

# 7. Process Risks

## R-022 — Retraso por documentación excesiva sin implementación

### Description

Existe riesgo de seguir documentando indefinidamente y retrasar la landing.

### Probability

Medium

### Impact

Medium

### Consequences

- No se valida mercado.
- No llegan leads reales.
- Se pierde velocidad.
- Se posterga aprendizaje.

### Mitigation

- Cerrar SDD base.
- Aprobar Fase 1.
- Pasar a diseño/implementación.
- Usar release checklist.
- Evitar seguir expandiendo sin necesidad.

### Owner

Yoryi / Product

### Status

Open

---

## R-023 — Falta de medición post-release

### Description

Publicar sin medir puede impedir saber si la landing funciona.

### Probability

Medium

### Impact

Medium

### Consequences

- No se sabe si convierte.
- No se detectan problemas.
- No se priorizan mejoras.
- No hay base para decidir IA futura.

### Mitigation

- Medir clicks a WhatsApp.
- Medir formularios.
- Registrar calidad manual de leads.
- Revisar métricas semanalmente.
- Comparar con `success-metrics.md`.

### Owner

Yoryi / Marketing

### Status

Open

---

## R-024 — Falta de seguimiento manual a leads

### Description

Aunque la landing genere leads, pueden perderse si no se responde a tiempo.

### Probability

Medium

### Impact

High

### Consequences

- Oportunidades perdidas.
- Baja conversión.
- Mala percepción.
- Datos incompletos para validar.

### Mitigation

- Revisar WhatsApp frecuentemente.
- Usar respuestas manuales sugeridas.
- Registrar estados simples.
- Priorizar leads calientes.
- Evaluar automatización solo si hay volumen.

### Owner

Yoryi / Sales

### Status

Open

---

## R-025 — Confundir capacidades futuras con producto activo

### Description

Documentar muchos módulos futuros puede hacer que la implementación o el copy los trate como activos.

### Probability

High

### Impact

High

### Consequences

- Scope creep.
- Confusión técnica.
- Promesas incorrectas.
- Más tiempo de desarrollo.
- Release bloqueado.

### Mitigation

- Usar etiquetas “Fase 1” y “Futuro”.
- Mantener ADR-001.
- Ejecutar regression checklist.
- Revisar copy antes de release.
- No implementar módulos futuros sin ADR.

### Owner

Yoryi / Product

### Status

Open

---

# 8. Risk Matrix

| Impact \ Probability | Low | Medium | High |
|---|---|---|---|
| High | R-010 | R-002, R-003, R-006, R-007, R-009, R-011, R-013, R-014, R-015, R-016, R-017, R-018, R-020, R-021, R-024 | R-001, R-025 |
| Medium |  | R-004, R-005, R-008, R-012, R-019, R-022, R-023 |  |
| Low |  |  |  |

---

# 9. Release Blocking Risks

La release de Fase 1 queda bloqueada si ocurre alguno de estos riesgos sin mitigar:

- CTA WhatsApp roto.
- Formulario roto sin alternativa aprobada.
- Landing inutilizable en mobile.
- Hero confuso.
- Datos sensibles solicitados.
- Secretos expuestos.
- IA activa en Fase 1.
- WhatsApp Cloud API activa en Fase 1.
- Dashboard completo activo en Fase 1.
- Pagos activos en Fase 1.
- OpenAI/Ollama activos en Fase 1.
- Copy prometiendo resultados garantizados.
- Contradicción con `AGENTS.md`, `sdd-index.md` o ADR-001.

---

# 10. Monitoring Plan

Después del release de Fase 1 se debe revisar:

## Weekly Review

- Clicks a WhatsApp.
- Formularios enviados.
- Calidad manual de leads.
- Preguntas frecuentes.
- Objeciones.
- Problemas de comprensión.
- Errores en mobile.
- Problemas de formulario.
- Señales de demanda por IA.
- Señales de demanda por dashboard.
- Señales de demanda por automatización.

## Monthly Review

- Conversión visita -> lead.
- Calidad de ICP.
- Servicios más solicitados.
- Necesidad de ajustar copy.
- Necesidad de mejorar SEO.
- Necesidad de backend.
- Necesidad real de AI Lead Assistant.
- Riesgos nuevos.

---

# 11. Risk Response Types

| Tipo | Uso |
|---|---|
| Avoid | Evitar el riesgo eliminando la acción |
| Mitigate | Reducir probabilidad o impacto |
| Transfer | Pasar riesgo a proveedor o herramienta |
| Accept | Aceptar conscientemente |
| Monitor | Observar hasta tener más datos |

---

# 12. Open Questions

- ¿Qué herramienta se usará inicialmente para el formulario?
- ¿Se medirá WhatsApp con analytics desde Fase 1 o manualmente?
- ¿Cuál será el dominio final?
- ¿Cuál será el número de WhatsApp oficial?
- ¿Qué rango de servicios se mostrará primero en la landing?
- ¿Qué señales mínimas habilitarán Fase 2?
- ¿Qué volumen de leads justificaría backend?
- ¿Qué volumen de conversaciones justificaría AI Lead Assistant?
- ¿Qué presupuesto futuro se aceptaría para IA?
- ¿Qué presupuesto futuro se aceptaría para WhatsApp Cloud API?

---

# 13. Traceability

| Risk Area | Related Docs |
|---|---|
| Scope creep | AGENTS.md, sdd-index.md, adr-001-project-scope.md |
| Stack | adr-002-stack.md, system-architecture.md |
| AI provider | adr-003-ai-provider.md, ai-provider-strategy.md |
| WhatsApp | adr-004-whatsapp-provider.md, whatsapp-integration.md |
| Privacy | security-and-privacy.md, data-model.md |
| QA | qa-matrix.md, regression-checklist.md, release-checklist.md |
| Conversion | success-metrics.md, product-vision.md |
| Lead quality | target-customers.md, lead-scoring-spec.md |
| Future AI | ai-agent-design.md, ai-evaluation-set.md |

---

# 14. Final Statement

Los riesgos principales del proyecto se concentran en tres áreas:

1. **Scope creep**: mover IA, WhatsApp Cloud API, dashboard o automatizaciones a Fase 1.
2. **Conversión**: publicar una landing que no comunique bien o no genere leads.
3. **Seguridad y privacidad**: capturar datos sin reglas claras o activar proveedores externos antes de tiempo.

La estrategia oficial es mantener Fase 1 simple, clara y medible:

**Landing comercial + WhatsApp manual + formulario + SEO básico + responsive + seguimiento humano.**

AI Lead Assistant, WhatsApp Cloud API, Ollama, OpenAI API, dashboard completo, CRM, pagos y automatizaciones quedan como riesgos y capacidades futuras que requieren SDD, ADR, QA, privacidad y validación comercial antes de implementarse.