# Phase 11.2 — Login Rate Limit Local

## Status

Local login hardening completed.

## Purpose

Agregar protección mínima contra intentos repetidos de login fallido.

## Includes

- Rate-limit in-memory.
- Bloqueo temporal después de varios intentos fallidos.
- Limpieza de intentos al login exitoso.
- Respuesta `429` para bloqueo.
- Mensajes seguros en UI.

## Does Not Include

- Usuarios.
- Roles.
- OAuth.
- NextAuth/Auth.js.
- Auth DB.
- Redis.
- Rate-limit productivo distribuido.
- Producción.
- IA.
- WhatsApp sending.
- Automatizaciones.
- Pagos.

## Limits

- Máximo 5 intentos fallidos.
- Ventana de 10 minutos.
- Bloqueo de 10 minutos.

## Security Note

Este rate-limit es in-memory y local. Antes de producción debe reemplazarse o reforzarse con una solución persistente/distribuida.
