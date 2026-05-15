# Phase 12E — Lead Scoring by Local Rules

## Propósito

Agregar una estimación comercial explicable en el detalle del lead para priorizar seguimiento sin automatizar decisiones.

## Archivos creados

- `src/types/lead-score.ts`
- `src/lib/lead-score.ts`
- `src/components/internal/LeadScorePanel.tsx`

## Integración

- `src/app/internal/leads/[id]/page.tsx`

## Reglas generales del score

- Escala de `0` a `100`.
- Score base inicial: `20`.
- Ajustes por señales positivas y faltantes/riesgos.
- Normalización final con clamp `0..100`.

## Niveles

- `low`: 0–39
- `medium`: 40–69
- `high`: 70–100

## Señales usadas

- `serviceInterest`
- `message`
- datos de contacto (`email` / `phone`)
- `status`
- `notes`
- `statusHistory`
- `businessType`

## Señales positivas

Ejemplos:
- Canal de contacto disponible.
- Tipo de negocio informado.
- Mensaje con contexto suficiente.
- Notas internas presentes.
- Historial de actividad comercial.

## Señales faltantes / riesgos

Ejemplos:
- Falta email y teléfono.
- Mensaje demasiado corto.
- Tipo de negocio no especificado.

## Límites y garantías

- No se persiste scoring en DB.
- No cambia status automáticamente.
- No modifica el lead automáticamente.
- No usa OpenAI.
- No usa servicios externos.
- No ejecuta automatizaciones.

## QA manual mínimo (leads existentes)

| Caso | Lead (ID) | Resultado |
|---|---|---|
| lead `new` | `cmp6xd1500000kqwsk1p71uq1` | OK (visible en bloque Lead Score) |
| lead `contacted` | `cmp6wkojy00060fws7nmd4r30` | OK |
| lead `MVP SaaS` | `cmp6wkokm00070fwsljnchblc` | OK |
| lead `sitio web profesional` | `cmp6xd1500000kqwsk1p71uq1` | OK |
| lead con notas | `cmp6wkojy00060fws7nmd4r30` | OK |
| lead sin notas | `cmp6xd1500000kqwsk1p71uq1` | OK |
| lead con mensaje corto | `cmp6xd1500000kqwsk1p71uq1` | OK (penalización esperada) |
| lead con email/teléfono | `cmp6xdfc20000h8wske0siw2y` | OK |
| lead sin teléfono | `cmp6xd1500000kqwsk1p71uq1` | OK |
| lead con status `proposal` | `cmp6wkokm00070fwsljnchblc` | OK |

## Resultado QA

- Bloque renderiza correctamente en `/internal/leads/[id]`.
- Señales y acción recomendada se muestran de forma explicable.
- No hubo cambios automáticos de status ni escritura de score en DB.

## Futuro recomendado

- Scoring IA opcional con Ollama como capa complementaria, manteniendo fallback determinístico y trazabilidad de razones.
