# SDD Index — apps-marketing

## Purpose
Este documento define la fuente única de verdad para ejecutar la SDD expandida por fases, manteniendo el foco en **landing comercial primero** y dejando la IA como evolución posterior.

## Core Product Decision
La decisión central es no confundir velocidad con dirección: **primero se valida oferta y conversión con landing + captura manual**, y recién después se escala a backend, dashboard, AI Lead Assistant y automatizaciones.

## Development Phases
1. Landing comercial
2. Captura básica de leads
3. Formulario / WhatsApp manual
4. Backend futuro
5. Dashboard interno futuro
6. AI Lead Assistant
7. Automatizaciones futuras

## Full Document Reading Order
> Regla: `AGENTS.md` SIEMPRE se lee primero.

### Global Rules
1. `AGENTS.md`
2. `docs/01-sdd/sdd-index.md`

### Vision
3. `docs/00-vision/product-vision.md`
4. `docs/00-vision/business-model.md`
5. `docs/00-vision/target-customers.md`
6. `docs/00-vision/success-metrics.md`

### Product SDD
7. `docs/01-sdd/prd.md`
8. `docs/01-sdd/scope.md`
9. `docs/01-sdd/user-stories.md`
10. `docs/01-sdd/acceptance-criteria.md`
11. `docs/01-sdd/conversation-flows.md`
12. `docs/01-sdd/lead-scoring-spec.md`
13. `docs/01-sdd/functional-requirements.md`
14. `docs/01-sdd/non-functional-requirements.md`

### Architecture
15. `docs/02-architecture/system-architecture.md`
16. `docs/02-architecture/data-model.md`
17. `docs/02-architecture/api-contracts.md`
18. `docs/02-architecture/ai-agent-design.md`
19. `docs/02-architecture/whatsapp-integration.md`
20. `docs/02-architecture/ai-provider-strategy.md`
21. `docs/02-architecture/security-and-privacy.md`

### Future AI Prompts
22. `docs/03-prompts/lead-assistant-system-prompt.md`
23. `docs/03-prompts/lead-summary-prompt.md`
24. `docs/03-prompts/lead-scoring-prompt.md`
25. `docs/03-prompts/fallback-prompt.md`

### Tests
26. `docs/04-tests/qa-matrix.md`
27. `docs/04-tests/ai-evaluation-set.md`
28. `docs/04-tests/conversation-test-cases.md`
29. `docs/04-tests/regression-checklist.md`
30. `docs/04-tests/release-checklist.md`

### Decisions
31. `docs/05-decisions/adr-001-project-scope.md`
32. `docs/05-decisions/adr-002-stack.md`
33. `docs/05-decisions/adr-003-ai-provider.md`
34. `docs/05-decisions/adr-004-whatsapp-provider.md`
35. `docs/05-decisions/risk-register.md`

## SDD Rules
1. No code antes de aprobación SDD de la fase activa.
2. No mover AI Lead Assistant al MVP inicial.
3. No agregar features sin actualizar SDD y ADR.
4. Toda decisión importante debe registrarse en `docs/05-decisions/`.
5. Si un documento existe en la SDD expandida, se mantiene: si no aplica a fase activa, se marca como futuro.
6. Todo cambio debe mantener trazabilidad PRD -> historias -> criterios -> arquitectura -> tests.

## Document Status Table
| Documento | Tipo | Propósito | Estado esperado |
|---|---|---|---|
| `AGENTS.md` | Gobernanza | Reglas madre, alcance y disciplina | Aprobado y vigente |
| `docs/00-vision/product-vision.md` | Visión | Dirección estratégica del producto | Alineado a roadmap |
| `docs/00-vision/business-model.md` | Visión | Modelo de negocio y monetización | Consistente con fase activa |
| `docs/00-vision/target-customers.md` | Visión | ICP y segmentos prioritarios | Validado para go-to-market |
| `docs/00-vision/success-metrics.md` | Visión | Métricas de éxito por fase | Medible |
| `docs/01-sdd/prd.md` | SDD | Problema, objetivo y alcance del entregable | Cerrado para fase activa |
| `docs/01-sdd/scope.md` | SDD | In/Out de alcance | Sin ambigüedad |
| `docs/01-sdd/user-stories.md` | SDD | Necesidades por actor | Priorizadas |
| `docs/01-sdd/acceptance-criteria.md` | SDD | Condiciones de aceptación | Verificables |
| `docs/01-sdd/conversation-flows.md` | SDD | Flujo de contacto/comercial | Coherente con fase |
| `docs/01-sdd/lead-scoring-spec.md` | SDD futuro | Base para scoring futuro | Marcado como futuro |
| `docs/01-sdd/functional-requirements.md` | SDD | Comportamientos requeridos | Trazables |
| `docs/01-sdd/non-functional-requirements.md` | SDD | Restricciones de calidad | Trazables |
| `docs/02-architecture/system-architecture.md` | Arquitectura | Vista de componentes por fase | Alineada a SDD |
| `docs/02-architecture/data-model.md` | Arquitectura | Modelo de datos por madurez | Sin sobreingeniería fase 1 |
| `docs/02-architecture/api-contracts.md` | Arquitectura | Contratos presentes/futuros | Consistente con roadmap |
| `docs/02-architecture/ai-agent-design.md` | Arquitectura futura | Diseño del módulo AI | Marcado como futuro |
| `docs/02-architecture/whatsapp-integration.md` | Arquitectura | Estrategia manual vs API | Alineada a fase 1 |
| `docs/02-architecture/ai-provider-strategy.md` | Arquitectura futura | Estrategia de proveedores IA | Marcado como futuro |
| `docs/02-architecture/security-and-privacy.md` | Arquitectura | Seguridad y privacidad | Aplicable a fase activa |
| `docs/03-prompts/*.md` | IA futura | Prompts del módulo AI Lead Assistant | Marcados como futuro |
| `docs/04-tests/qa-matrix.md` | Pruebas | Cobertura por área/fase | Actualizada |
| `docs/04-tests/ai-evaluation-set.md` | Pruebas futuras | Evaluación del módulo IA | Marcado como futuro |
| `docs/04-tests/conversation-test-cases.md` | Pruebas / Futuro IA | Casos de contacto manual y futuras conversaciones IA | Verificables por fase |
| `docs/04-tests/regression-checklist.md` | Pruebas | Control de regresión | Ejecutable |
| `docs/04-tests/release-checklist.md` | Pruebas | Go/No-Go de release | Ejecutable |
| `docs/05-decisions/adr-001-project-scope.md` | Decisión | Alcance oficial del proyecto | Vigente |
| `docs/05-decisions/adr-002-stack.md` | Decisión | Stack y evolución técnica | Vigente |
| `docs/05-decisions/adr-003-ai-provider.md` | Decisión | Política de proveedor IA | Vigente |
| `docs/05-decisions/adr-004-whatsapp-provider.md` | Decisión | Política WhatsApp | Vigente |
| `docs/05-decisions/risk-register.md` | Riesgos | Riesgos y mitigaciones | Actualizado |

## Definition of SDD Complete
La SDD de una fase se considera completa cuando:
- Objetivo, alcance y límites están cerrados.
- Requisitos, historias y criterios no se contradicen.
- Arquitectura soporta la fase activa sin invadir fases futuras.
- Estrategia de pruebas permite verificar aceptación y regresión.
- Decisiones clave y riesgos están documentados en ADRs/risk register.
- Existe aprobación explícita para pasar a coding.

## Phase 1 Approval Checklist
- [ ] Fase 1 confirmada como landing comercial
- [ ] Secciones MVP definidas (hero, valor, servicios, casos, beneficios, proceso)
- [ ] CTA WhatsApp manual y formulario definidos
- [ ] SEO básico y responsive incluidos en criterios
- [ ] Out-of-scope de fase 1 explícito y vigente
- [ ] Sin dependencias IA obligatorias en fase 1
- [ ] Riesgos principales identificados con mitigación
- [ ] Aprobación explícita SDD para iniciar coding

## Future Module Boundaries
- **AI Lead Assistant**: módulo futuro; no puede entrar a fase 1.
- **WhatsApp Cloud API**: futura; solo después de backend y gobierno de datos.
- **OpenAI API / Ollama / scoring automático / CRM avanzado / campañas masivas / pagos / dashboard completo**: fuera de fase 1.

## Traceability Rules
1. Cada user story debe mapear a criterios de aceptación concretos.
2. Cada criterio de aceptación debe mapear a FR/NFR.
3. Cada FR/NFR debe mapear a una decisión o componente de arquitectura.
4. Cada requisito crítico debe mapear a pruebas (qa-matrix/casos/checklists).
5. Ningún cambio de alcance se implementa sin actualizar PRD, scope, criterios, arquitectura, tests y ADRs.
