# Phase 30G — Diagnosis Conversion Flow

## Goal
Mejorar la transición entre diagnóstico y formulario sin cambiar contratos de lead.

## Files inspected
- `/Users/yoryiabreu/proyectos/apps-marketing/src/components/sections/ProjectDiagnosisSection.tsx`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/components/sections/ContactFormSection.tsx`

## Files modified
- `/Users/yoryiabreu/proyectos/apps-marketing/src/components/sections/ProjectDiagnosisSection.tsx`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/components/sections/ContactFormSection.tsx`

## What changed
- Se mejoró legibilidad del select de diagnóstico en desktop (estilo neutral + foco consistente).
- Si hay diagnóstico guardado, el formulario propone automáticamente `serviceInterest` con la recomendación (solo si el campo está vacío).

## What did not change
- No cambios en endpoint `/api/leads`.
- No cambios en payload obligatorio.

## Validation
- `npm run test` ✅
- `npm run lint` ✅
- `npm run build` ✅

## Risks / follow-ups
- Monitorear si usuarios sobreescriben interés sugerido con frecuencia.
