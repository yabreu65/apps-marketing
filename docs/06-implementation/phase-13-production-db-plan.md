# Phase 13 — Production DB Plan

## Status

Planning completed (no deployment, no production changes).

## Purpose

Definir un plan profesional para migrar de PostgreSQL local (Docker) a PostgreSQL managed en producción sin romper el flujo actual.

## 1) Auditoría del estado actual

### DB local actual
- PostgreSQL corre en `docker-compose.local.yml` (contenedor `apps-marketing-postgres`, puerto `5432`).
- Prisma usa `DATABASE_URL` para conectar.
- Esquema actual en `prisma/schema.prisma`:
  - `Lead`
  - `LeadNote`
  - `LeadStatusHistory`

### Dependencia de `DATABASE_URL`
- `prisma.config.ts` requiere `env('DATABASE_URL')` para migraciones y comandos Prisma.
- `src/lib/prisma.ts` crea `Pool` con `process.env.DATABASE_URL`.
- Si falta o es inválida, las rutas que usan Prisma fallan en runtime.

### Rutas que usan Prisma
- Públicas:
  - `POST /api/leads` (captura lead)
- Internas/admin:
  - `GET /api/admin/leads`
  - `PATCH /api/admin/leads/[id]/status`
  - `GET/POST /api/admin/leads/[id]/notes`
  - `POST /api/admin/leads/[id]/summary` (lee contexto del lead)
- UI server-side interna:
  - `/internal/leads`
  - `/internal/leads/[id]`

### Qué pasa en Vercel sin `DATABASE_URL`
- `POST /api/leads` puede devolver 500 (fallo de conexión).
- Dashboard interno y APIs admin fallan en lectura/escritura.
- Riesgo directo de perder capturas del formulario público.

### Migraciones existentes
- `20260514160452_init_leads`
- `20260514201533_add_lead_notes_timeline`

### Datos actuales
- Datos locales/test de desarrollo.
- No deben considerarse dataset de producción.

### Qué NO llevar todavía a producción
- Auth local mínima sin usuarios/roles.
- Flujo AI local/Ollama (dependiente de máquina local).
- Supuestos de entorno local (`localhost`, Docker local, fallback manuales sin observabilidad productiva).

## 2) Opciones de proveedor PostgreSQL (sin contratar aún)

### Neon
- Integración con Vercel: muy buena.
- PostgreSQL nativo: sí.
- Variables de entorno: simple (`DATABASE_URL`).
- Prisma migrations: compatible.
- Plan inicial: suele tener tier gratuito/de arranque.
- Pros: ramas DB, UX moderna, muy usado con Vercel.
- Contras: límites en free tier y cold-start/latencia según plan/región.

### Supabase (Postgres)
- Integración con Vercel: buena.
- PostgreSQL nativo: sí.
- Variables de entorno: simple.
- Prisma migrations: compatible.
- Plan inicial: suele tener tier inicial.
- Pros: ecosistema amplio, dashboard robusto.
- Contras: superficie mayor (features extra que no necesitan hoy).

### Railway
- Integración con Vercel: buena.
- PostgreSQL nativo: sí.
- Variables de entorno: simple.
- Prisma migrations: compatible.
- Plan inicial: suele permitir comenzar rápido.
- Pros: DX simple, setup rápido.
- Contras: costos/límites pueden escalar con uso.

### Render PostgreSQL
- Integración con Vercel: aceptable.
- PostgreSQL nativo: sí.
- Variables de entorno: simple.
- Prisma migrations: compatible.
- Plan inicial: existe opción de arranque según disponibilidad.
- Pros: estabilidad y separación clara de servicios.
- Contras: experiencia menos “plug-and-play” que Neon para Vercel.

### Vercel Postgres / Marketplace
- Integración con Vercel: excelente.
- PostgreSQL: sí (según proveedor asociado).
- Variables de entorno: muy cómoda desde dashboard.
- Prisma migrations: compatible.
- Plan inicial: depende del partner/plan.
- Pros: onboarding directo dentro de Vercel.
- Contras: posible acoplamiento al ecosistema Vercel/partner.

## 3) Estrategia recomendada

### Recomendación principal
**Neon + Vercel** (managed PostgreSQL) por simplicidad y compatibilidad con Prisma.

### Alternativa sólida
**Supabase Postgres** si priorizan dashboard operacional y ecosistema más amplio.

### Principios de entorno
- Separar `local` / `preview` / `production`.
- Nunca reutilizar DB local para producción.
- Nunca commitear `.env`.
- Mantener migraciones Prisma como única fuente de verdad.

## 4) Variables de entorno requeridas (producción/preview)

```env
DATABASE_URL="postgresql://..."
INTERNAL_DASHBOARD_PASSWORD="..."
INTERNAL_AUTH_COOKIE_NAME="apps_marketing_internal_auth"
WHATSAPP_VERIFY_TOKEN="..."
ENABLE_LOCAL_AI_SUMMARY="false"
OLLAMA_BASE_URL="http://localhost:11434"
OLLAMA_MODEL="llama3:latest"
OLLAMA_TIMEOUT_MS="25000"
```

> Nota: en producción normalmente `ENABLE_LOCAL_AI_SUMMARY=false`.

## 5) Plan de ejecución sugerido (siguiente fase)

1. Crear DB managed (sin tocar local).
2. Configurar `DATABASE_URL` en entorno **preview** primero.
3. Ejecutar migraciones Prisma contra preview DB.
4. Probar `POST /api/leads` + `/internal/leads` en preview.
5. Recién después promover a `production`.
6. Definir backup/restore básico y runbook de incidentes.

## 6) Riesgos y mitigaciones

- Riesgo: deploy sin `DATABASE_URL` válida.
  - Mitigación: checklist pre-release con verificación obligatoria de env vars.
- Riesgo: drift de esquema entre local y managed.
  - Mitigación: solo migraciones Prisma versionadas.
- Riesgo: auth interna mínima expuesta.
  - Mitigación: bloquear acceso público y planear auth real (fase posterior).

## 7) Resultado de esta fase

- Se completó planificación técnica de DB productiva.
- No hubo cambios de infraestructura real.
- No hubo deploy.
- Flujo local permanece estable.
