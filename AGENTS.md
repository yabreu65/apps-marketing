# AGENTS.md — apps-marketing

## Project Goal
Construir un producto SaaS escalable de Apps Marketing / Yoryi AI Studio, iniciando por una **landing comercial orientada a conversión** y evolucionando por fases hacia automatización e IA.

## Main Decision
El **primer entregable oficial** del proyecto es la landing comercial.
**AI Lead Assistant NO es el MVP inicial**: se desarrolla en fases posteriores.

## Roadmap Priority
1. Landing comercial
2. Captura básica de leads
3. Formulario / WhatsApp manual
4. Backend futuro
5. Dashboard interno futuro
6. AI Lead Assistant
7. Automatizaciones futuras

## MVP Phase 1 Scope
- Home / landing principal
- Hero comercial
- Propuesta de valor
- Servicios
- Casos de uso
- Beneficios
- Proceso de trabajo
- CTA a WhatsApp manual
- Formulario de contacto
- SEO básico
- Diseño responsive
- Estructura preparada para escalar

## Out of Scope Phase 1
- Bot inteligente
- WhatsApp Cloud API
- OpenAI API
- Ollama
- Lead scoring automático
- CRM avanzado
- Campañas masivas
- Pagos
- Dashboard completo

## Future AI Strategy
- La IA entra después de validar la fase comercial.
- Orden de adopción objetivo: Ollama local (primario futuro) -> OpenAI API (opcional futuro).
- Toda incorporación IA debe pasar por actualización de SDD + ADR correspondiente.

## Future WhatsApp Strategy
- Fase 1: enlace manual a WhatsApp.
- Fases futuras: evaluar WhatsApp Cloud API cuando exista backend y gobierno de datos.
- No adelantar API oficial a fase 1.

## Required Reading Order (obligatorio antes de implementar)

Antes de modificar documentación, arquitectura o código, todo agente debe leer en este orden:

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

## Rules for Agents
1. No escribir código antes de aprobación SDD.
2. No mover AI Lead Assistant a fase 1.
3. No agregar features fuera de alcance sin actualizar SDD.
4. Toda decisión importante debe documentarse en `docs/05-decisions`.
5. No borrar ni renombrar archivos/estructura sin decisión explícita registrada.
6. Mantener trazabilidad entre PRD -> historias -> criterios -> arquitectura -> tests.
7. Si un documento existe en la SDD expandida, no debe ignorarse: si no aplica a la fase activa, debe marcarse como futuro, no eliminarse.
8. Todo documento debe separar claramente: Phase 1, Future Phase y Out of Scope.

## Rules for Codex / Claude / AI Tools
- AI es herramienta de ejecución, no reemplazo de decisión de producto.
- Verificar coherencia contra SDD antes de proponer cambios.
- Si hay conflicto con alcance fase 1, prevalece SDD/ADR-001.
- No generar código de aplicación cuando el estado sea documentación/planeación.
- Cualquier excepción de alcance debe quedar en ADR y checklist de fase.

## Definition of Ready for Coding
Se puede empezar a codificar **solo si**:
- PRD y scope de fase están claros y cerrados.
- Historias y criterios de aceptación están definidos.
- Requisitos funcionales/no funcionales vigentes.
- Arquitectura base y límites de fase aprobados.
- Checklist de aprobación de fase 1 completo.

## Definition of Done for SDD
SDD está “Done” cuando:
- Documentos núcleo existen, están alineados y sin contradicciones.
- El alcance fase 1 y el out-of-scope están explícitos.
- Hay trazabilidad completa entre negocio, especificación, arquitectura y pruebas.
- Riesgos principales y decisiones críticas están registradas.
- Existe criterio explícito para iniciar coding.

## Non-Negotiable Rules
- **No code before SDD approval.**
- **Do not move AI Lead Assistant into Phase 1.**
- **Do not add features without updating SDD first.**
- **Document important decisions in `docs/05-decisions`.**
