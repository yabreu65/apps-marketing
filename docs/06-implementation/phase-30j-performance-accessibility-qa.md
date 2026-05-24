# Phase 30J — Performance + Accessibility QA

## Goal
Aplicar ajustes de bajo riesgo para mejorar performance/a11y y limpiar warning visible.

## Files inspected
- `/Users/yoryiabreu/proyectos/apps-marketing/src/components/sections/PublicHeader.tsx`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/app/globals.css`

## Files modified
- `/Users/yoryiabreu/proyectos/apps-marketing/src/components/sections/PublicHeader.tsx`

## What changed
- Se reemplazó `<img>` por `next/image` en logo de header para evitar warning de lint/LCP.
- Se mantuvieron atributos accesibles en menú mobile (`aria-expanded`, `aria-label`, Escape close).

## What did not change
- No cambios de infraestructura.
- No optimización agresiva de assets pesados en esta fase.

## Validation
- `npm run test` ✅
- `npm run lint` ✅
- `npm run build` ✅

## Risks / follow-ups
- Medir CWV reales en entorno preview antes de producción.
