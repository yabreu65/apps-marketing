# Fase 30B — Apply Lead Diagnosis Columns to Supabase Staging

## Objetivo
Aplicar en Supabase staging las 4 columnas nuevas de diagnóstico en la tabla `Lead`, usando SQL fallback controlado (sin Prisma Migrate), y verificar funcionamiento end-to-end.

## Migración aplicada
- Carpeta: `prisma/migrations/20260519183000_add_lead_diagnosis_context`
- Archivo: `prisma/migrations/20260519183000_add_lead_diagnosis_context/migration.sql`
- Estado: **aplicada en staging**

## SQL aplicado
```sql
ALTER TABLE "Lead"
ADD COLUMN "diagnosisGoal" TEXT,
ADD COLUMN "diagnosisStage" TEXT,
ADD COLUMN "diagnosisUrgency" TEXT,
ADD COLUMN "diagnosisRecommendation" TEXT;
```

## Motivo de SQL fallback
Prisma Migrate sigue en estado **NO-GO** contra Supabase staging por error persistente de Schema Engine (`npx prisma migrate status`), por lo que se mantiene la estrategia de fallback SQL controlado en staging.

## Columnas agregadas en `Lead`
- `diagnosisGoal`
- `diagnosisStage`
- `diagnosisUrgency`
- `diagnosisRecommendation`

## Metadata post-migración
Runner ejecutado:
- `node --import tsx scripts/db/check-supabase-metadata.ts`

Resultado confirmado:
- Conexión a Supabase staging: OK (vía `DATABASE_URL` pooler + SSL relaxed en runner)
- Tablas esperadas presentes:
  - `Lead`
  - `LeadNote`
  - `LeadStatusHistory`
  - `LeadConversationMessage`
  - `PublicChatVisitor`
  - `PublicChatSession`
  - `PublicChatMessage`
  - `PublicVisitorMemory`
- `_prisma_migrations`: `false` (sin cambios manuales)
- Verificación de columnas en `Lead`: presentes las 4 columnas nuevas de diagnóstico.

## Smoke test realizado (staging)
Se ejecutó smoke funcional local apuntando a Supabase staging:

1. **Formulario sin diagnóstico**
   - `POST /api/leads` responde `201`
   - Lead creado correctamente
   - Campos diagnóstico en `null`

2. **Diagnóstico → Completar formulario**
   - `POST /api/leads` con contexto de diagnóstico responde `201`
   - Lead creado con:
     - `diagnosisGoal`
     - `diagnosisStage`
     - `diagnosisUrgency`
     - `diagnosisRecommendation`

3. **Dashboard interno (detalle)**
   - Renderiza bloque **“Diagnóstico orientativo”**
   - Muestra recomendación guardada

4. **Honeypot**
   - Envío con `website` lleno responde `202`
   - No crea lead en DB

## Validaciones ejecutadas
- `npx tsc --noEmit --pretty false --incremental false` ✅
- `npm run test` ✅
- `npm run lint` ✅ (warning conocido de `<img>` en `PublicHeader.tsx`, sin errores)
- `npm run build` ✅

## Advertencia: Prisma Migrate NO-GO
Se mantiene la advertencia:
- **No usar** `prisma migrate deploy` en staging por ahora.
- **No usar** `prisma migrate reset`.
- Continuar con fallback SQL controlado para cambios de esquema en staging hasta resolver el problema de Prisma Schema Engine.

## Nota TLS local para smoke
Para smoke local con runtime Prisma contra Supabase staging fue necesario:
- `NODE_TLS_REJECT_UNAUTHORIZED=0`

Esto se usó **solo para smoke local** y **no aplica a producción**.

## Estado final
- Migración de columnas de diagnóstico aplicada correctamente en Supabase staging.
- Flujo formulario + diagnóstico + dashboard verificado.
- Validaciones de calidad/compilación OK.

## GO / NO-GO
- **GO para commit/push** (sin deploy automático).
