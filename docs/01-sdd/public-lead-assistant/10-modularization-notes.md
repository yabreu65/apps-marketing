# Public Lead Assistant — Modularization Notes (Phase 22)

## Goal

Implementar el asistente público primero dentro de `apps-marketing`, pero con arquitectura lista para futura extracción.

## Module boundary used

`src/modules/lead-assistant/`

- `components/` → UI pública del widget.
- `config/` → configuración de negocio específica de apps-marketing.
- `core/` → intención, respuesta, memoria resumen, safety y acciones sugeridas.
- `ai/` → prompt + IA local opcional (Ollama) con fallback.
- `server/` → servicios de orquestación chat/memoria.
- `types/` → contratos y tipos compartidos del módulo.
- `tests/` → unit tests del core.

## Design rules applied

- Sin hardcodear reglas de negocio en el componente.
- Config desacoplada (`appsMarketingAssistantConfig`).
- Lógica separada por capas (UI/core/AI/memory service).
- Fallback obligatorio a reglas si IA local no está disponible.

## Phase 23 extraction readiness

En Fase 23 se puede extraer el core a módulo reutilizable con bajo acoplamiento:

1. Mantener `core/`, `types/`, `ai/` como base portable.
2. Reemplazar `config/appsMarketingAssistantConfig.ts` por configuración por cliente.
3. Sustituir `server/public-memory-service.ts` por adapter de persistencia objetivo (DB/API).
4. Publicar package interno o mover a `yoryi-ai-core` en fase dedicada.

## Current limits

- Aún no es paquete externo.
- Persistencia de memoria actual orientada a local-first.
- Integraciones externas siguen fuera de alcance (WhatsApp/Meta/OpenAI).
