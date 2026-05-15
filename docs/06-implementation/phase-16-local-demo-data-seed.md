# Phase 16 — Local Demo Data Seed

## Status

Completed (local only).

## Purpose

Generar dataset demo profesional para QA/manual review del dashboard interno y flujos comerciales, sin tocar producción ni Vercel.

## Includes

- Script local idempotente:
  - `scripts/seed-local-demo-data.ts`
- Script npm:
  - `db:seed:local`
- Dataset demo de 12 leads con prefijo `[DEMO]`
- Notas internas demo
- Historial de status demo

## Seed Strategy

- Antes de crear nuevos datos, el script elimina **solo** leads cuyo `name` empieza con `[DEMO]`.
- No borra leads no-demo.
- Luego recrea el dataset completo con datos ficticios realistas.

## Demo Dataset Coverage

Cubre casos para:

- Landing comercial
- Sitio web profesional
- MVP SaaS
- Sistema web a medida
- Dashboard / panel interno
- IA aplicada al negocio
- SEO / marketing digital
- No estoy seguro
- Lead archivado
- Lead cerrado
- Lead sin teléfono
- Lead solo WhatsApp

También incluye variantes de:

- leads fríos y calientes
- mensajes cortos y completos
- con/sin notas
- con/sin historial
- estados `new`, `contacted`, `qualified`, `proposal`, `closed`, `archived`

## Notes & Status History Examples

- `new -> contacted`
- `contacted -> qualified`
- `qualified -> proposal`
- `proposal -> closed`
- `contacted -> archived`

## Safety

- No usa OpenAI.
- No usa Ollama.
- No usa servicios externos.
- No envía WhatsApp.
- No cambia auth.
- No cambia schema Prisma.
- No toca producción/Vercel.

## Command

```bash
npm run db:seed:local
```

## Validation

- Seed ejecutado localmente: ✅ (12 leads demo activos)
- `npm run test`: ✅
- `npm run lint`: ✅
- `npm run build`: ✅
