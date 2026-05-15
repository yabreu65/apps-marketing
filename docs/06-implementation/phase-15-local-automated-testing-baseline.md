# Phase 15 — Local Automated Testing Baseline

## Status

Baseline de unit tests locales completada.

## Framework

- Vitest instalado como runner de pruebas unitarias TypeScript.

## Scripts disponibles

- `npm run test` → ejecución CI-like (`vitest run`).
- `npm run test:watch` → modo interactivo (`vitest`).

## Tests creados

- `src/lib/lead-score.test.ts`
- `src/lib/lead-summary.test.ts`
- `src/lib/internal-auth.test.ts`
- `src/lib/lead-validation.test.ts`
- `src/lib/lead-note-validation.test.ts`
- `src/lib/lead-status.test.ts`
- `src/lib/internal-security.test.ts`
- `src/lib/api-response.test.ts`

## Helpers cubiertos

- Validación de lead.
- Validación de notas.
- Estados de lead (catálogo, labels, badges).
- Seguridad interna básica (same-origin + no-store headers).
- Formato de respuestas API.
- Scoring local por reglas.
- Summary local por reglas.
- Redirect interno seguro.

## Alcance

- Unit tests locales y determinísticos sobre funciones puras/helpers.

## Límites de esta fase

- Sin E2E.
- Sin tests de DB.
- Sin tests con Ollama real.
- Sin tests de API server end-to-end.
- Sin tests de componentes UI.

## Observación técnica

- Se mantiene warning de engine por Node 20 vs paquetes que recomiendan Node 22.
- Es observación **no bloqueante** para esta fase (tests/lint/build pasan).

## Próximos pasos recomendados

1. API route tests aislados (sin red externa).
2. Component tests críticos (formulario/diagnóstico/chat).
3. Baseline Playwright local en fase posterior.
