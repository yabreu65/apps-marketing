# Phase 30B — Quick Fixes + Palette Verification

## Goal
Corregir incoherencias rápidas y verificar consistencia de paleta ya normalizada.

## Files inspected
- `/Users/yoryiabreu/proyectos/apps-marketing/src/components/sections/PublicHeader.tsx`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/app/page.tsx`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/app/globals.css`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/app/internal/leads/page.tsx`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/types/lead.ts`

## Files modified
- `/Users/yoryiabreu/proyectos/apps-marketing/src/app/page.tsx`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/app/internal/leads/page.tsx`

## What changed
- Se solucionó ancla rota `#ruta-etapa` reintroduciendo `ProjectTypesSection` en Home.
- Se alineó opción de filtro interno “No estoy seguro” con el valor tipado real: `No estoy seguro (quiero orientación)`.
- Se verificó que `--cyan-accent` existe y que tokens naranja CTA están correctamente en naranja.

## What did not change
- No reescritura completa de `globals.css`.
- No rediseño total de secciones.

## Validation
- `npm run test` ✅
- `npm run lint` ✅
- `npm run build` ✅

## Risks / follow-ups
- Quedan gradientes hardcodeados para fase de polish visual por secciones.
