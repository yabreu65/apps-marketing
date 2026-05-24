# Phase 30K-A — Admin Security Hardening (minimum)

## Goal
Agregar una barrera mínima y reutilizable de seguridad para `/api/admin/*` sin romper contratos funcionales.

## Files inspected
- `/Users/yoryiabreu/proyectos/apps-marketing/src/app/api/admin/**/route.ts`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/lib/internal-security.ts`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/lib/internal-auth.ts`

## Files modified
- `/Users/yoryiabreu/proyectos/apps-marketing/src/lib/internal-admin-auth.ts` (nuevo)
- `/Users/yoryiabreu/proyectos/apps-marketing/src/app/api/admin/leads/route.ts`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/app/api/admin/leads/[id]/status/route.ts`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/app/api/admin/leads/[id]/notes/route.ts`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/app/api/admin/leads/[id]/conversation/route.ts`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/app/api/admin/leads/[id]/conversation/suggestion/route.ts`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/app/api/admin/leads/[id]/summary/route.ts`

## What changed
- Se agregó guard reutilizable `requireInternalAdminAccess(request, headers)`.
- Todas las rutas admin ahora validan:
  - same-origin
  - cookie interna válida
- Las rutas devuelven `401/403` cuando corresponde, manteniendo shape de respuestas exitosas.

## What did not change
- No cambios en payload de éxito de rutas admin.
- No cambios de DB schema.

## Validation
- `npm run test` ✅
- `npm run lint` ✅
- `npm run build` ✅

## Risks / follow-ups
- Mantener DX local requiere login interno activo para usar endpoints admin.
