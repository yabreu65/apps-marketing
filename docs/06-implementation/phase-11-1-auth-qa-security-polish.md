# Phase 11.1 — Auth QA & Security Polish

## Status

Local auth hardened.

## Purpose

Revisar y endurecer la autenticación local mínima para rutas internas.

## Includes

- Validación de password env.
- Rechazo de configuración insegura `change-me`.
- Redirect interno seguro.
- Cookie httpOnly.
- Logout verificado.
- Copy de seguridad actualizado.
- QA manual de rutas internas.

## Does Not Include

- Usuarios.
- Roles.
- OAuth.
- NextAuth/Auth.js.
- Auth en base de datos.
- Producción.
- Permisos avanzados.
- IA.
- WhatsApp sending.
- Automatizaciones.
- Pagos.

## Manual QA

1. `/internal/leads` sin cookie → redirige a `/internal/login` ✅
2. `/internal/leads/{id}` sin cookie → redirige a login con `redirect` ✅
3. Login con password incorrecto → `401` con error genérico ✅
4. Login con password correcto → redirige al destino interno válido ✅
5. Redirect externo inválido (`https://...` o `//...`) → fallback a `/internal/leads` ✅
6. Logout por `POST /api/internal/logout` limpia cookie ✅
7. Después de logout, `/internal/leads` vuelve a redirigir a login ✅
8. Si `INTERNAL_DASHBOARD_PASSWORD=change-me`, login rechazado con `503` ✅

## Security Note

Esta autenticación sigue siendo mínima/local. Antes de producción debe evolucionar a auth real con usuarios, roles y controles adecuados.
