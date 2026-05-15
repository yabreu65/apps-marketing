# Phase 11.3 — Internal Security Headers & CSRF Guard mínimo

## Status

Local internal security hardening completed.

## Purpose

Reforzar rutas internas sensibles con controles básicos de origen y respuestas no cacheables.

## Includes

- Helper `isSameOriginRequest(request)` para mutaciones internas.
- Helper `internalNoStoreHeaders()` con `Cache-Control` y `Pragma`.
- Validación de origen en:
  - `POST /api/internal/login`
  - `POST /api/internal/logout`
  - `PATCH /api/admin/leads/[id]/status`
  - `POST /api/admin/leads/[id]/notes`
- Respuestas API internas con headers `no-store`.
- Respuestas de error consistentes (`403` para origen inválido).

## Does Not Include

- Auth completa.
- Usuarios y roles.
- OAuth / NextAuth/Auth.js.
- Auth DB.
- Redis / rate-limit distribuido.
- Producción.
- IA.
- WhatsApp sending.
- Automatizaciones.
- Pagos.

## Security Notes

- El guard de origen es mínimo y local.
- Si falta `Origin` y `Referer`, en desarrollo se permite para no romper pruebas locales.
- Antes de producción se recomienda reforzar con controles CSRF robustos (token/session-bound) y auth completa.
