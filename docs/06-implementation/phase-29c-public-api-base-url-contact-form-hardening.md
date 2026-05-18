# Phase 29C — Public API Base URL + Contact Form Hardening

## Objetivo
Preparar el frontend público para separación futura frontend/API y endurecer el endpoint público `/api/leads` con cambios mínimos, seguros y reversibles.

## Diagnóstico de partida
- Frontend público usaba rutas relativas hardcodeadas (`/api/leads`, `/api/public/chat`).
- `/api/leads` no tenía guardrail explícito de origin, honeypot ni rate-limit.
- Se necesitaba compatibilidad local y camino de separación hacia API externa.

## Cambios aplicados

### 1) Helper de URL pública
- Nuevo archivo: `/Users/yoryiabreu/proyectos/apps-marketing/src/lib/public-api-url.ts`
- Exporta `buildPublicApiUrl(path)`:
  - usa `NEXT_PUBLIC_API_BASE_URL` si existe
  - fallback automático a ruta relativa si está vacío

### 2) Integración en frontend público
- `/Users/yoryiabreu/proyectos/apps-marketing/src/components/sections/ContactFormSection.tsx`
  - `fetch('/api/leads')` -> `fetch(buildPublicApiUrl('/api/leads'))`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/modules/lead-assistant/components/PublicLeadAssistantWidget.tsx`
  - `GET/POST /api/public/chat`
  - `DELETE /api/public/chat/memory`
  ahora usan `buildPublicApiUrl(...)` con fallback local.

### 3) Hardening mínimo en `/api/leads`
- Archivo: `/Users/yoryiabreu/proyectos/apps-marketing/src/app/api/leads/route.ts`
- Agregado:
  - origin guard (`isAllowedPublicApiRequest`)
  - rate-limit local en memoria por IP
  - honeypot `website`:
    - si llega con valor, responde 202 y evita persistencia en DB

### 4) Seguridad pública reutilizable
- Nuevo archivo: `/Users/yoryiabreu/proyectos/apps-marketing/src/lib/public-security.ts`
- `isAllowedPublicApiRequest(request)`:
  - si `PUBLIC_API_ALLOWED_ORIGINS` está definido, valida origin/referer contra allowlist
  - si no está definido, fallback a política same-origin existente

### 5) Variables de entorno
- Actualizado `/Users/yoryiabreu/proyectos/apps-marketing/.env.example`:
  - `NEXT_PUBLIC_API_BASE_URL=""`
  - `PUBLIC_API_ALLOWED_ORIGINS=""`

## Pruebas agregadas/ajustadas
- Nuevo test helper:
  - `/Users/yoryiabreu/proyectos/apps-marketing/src/lib/public-api-url.test.ts`
- Ajuste de tests API leads:
  - `/Users/yoryiabreu/proyectos/apps-marketing/src/app/api/leads/route.test.ts`
  - se mockea `isAllowedPublicApiRequest`
  - caso nuevo honeypot (202, sin DB write)

## Compatibilidad local
- Si `NEXT_PUBLIC_API_BASE_URL` está vacío, todo sigue operando con rutas relativas.
- No se cambió backend principal ni esquema Prisma.
- No se cambió flujo de chat ni IA.

## Alcance respetado
- Sin migraciones
- Sin cambios de schema
- Sin deploy
- Sin commit
- Sin separación backend total (solo preparación)

## Validaciones
- `npm run test`
- `npm run lint`
- `npm run build`

## Rollback
1. Revertir `public-api-url.ts` y su uso en formulario/chat.
2. Quitar guardrails añadidos en `/api/leads`.
3. Volver `.env.example` a estado previo.
