# Phase 30K-B — Admin Security Hardening (full)

## Goal
Endurecer autenticación interna y validación de acceso para superficies admin.

## Files inspected
- `/Users/yoryiabreu/proyectos/apps-marketing/src/lib/internal-auth.ts`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/middleware.ts`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/app/api/internal/login/route.ts`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/app/api/internal/logout/route.ts`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/app/api/admin/**/route.ts`

## Files modified
- `/Users/yoryiabreu/proyectos/apps-marketing/src/lib/internal-auth.ts`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/middleware.ts`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/app/api/internal/login/route.ts`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/app/api/internal/login/route.test.ts`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/lib/internal-auth.test.ts`

## What changed
- Cookie interna pasó de valor fijo a token firmado con HMAC + expiración.
- Middleware ahora valida token firmado en vez de comparar string fijo.
- Login interno emite token con `INTERNAL_AUTH_COOKIE_MAX_AGE_SECONDS`.
- Se agregó soporte de secreto interno (`INTERNAL_AUTH_SECRET`, con fallback controlado).

## What did not change
- No cambios en contratos exitosos de endpoints admin.
- No cambios de DB ni de modelos Prisma.

## Validation
- `npm run test` ✅
- `npm run lint` ✅
- `npm run build` ✅

## Risks / follow-ups
- Recomendado en deploy: definir `INTERNAL_AUTH_SECRET` dedicado y rotarlo por ambiente.
