# Exploración minuciosa — estado actual de `apps-marketing`

Fecha: 2026-05-23  
Proyecto: `/Users/yoryiabreu/proyectos/apps-marketing`

## Exploration: Estado actual de la app

## 1) Current State

- Stack: Next.js App Router + TypeScript strict + Tailwind + Prisma/Postgres.  
  Evidencia:  
  `/Users/yoryiabreu/proyectos/apps-marketing/package.json`  
  `/Users/yoryiabreu/proyectos/apps-marketing/tsconfig.json`  
  `/Users/yoryiabreu/proyectos/apps-marketing/prisma/schema.prisma`
- Home actual montada con: Header, Hero, Marquee/benefits, Problem, Services, Diagnosis CTA, Ecosystem, Diagnosis 3 preguntas, Contact Form, Footer y widget público.  
  Evidencia:  
  `/Users/yoryiabreu/proyectos/apps-marketing/src/app/page.tsx`
- Pipeline lead operativo (form -> `/api/leads` -> dashboard interno).  
  Evidencia:  
  `/Users/yoryiabreu/proyectos/apps-marketing/src/components/sections/ContactFormSection.tsx`  
  `/Users/yoryiabreu/proyectos/apps-marketing/src/app/api/leads/route.ts`  
  `/Users/yoryiabreu/proyectos/apps-marketing/src/app/internal/leads/page.tsx`

## 2) Affected Areas (mapa de módulos)

- Landing/UI:  
  `/Users/yoryiabreu/proyectos/apps-marketing/src/app/page.tsx`  
  `/Users/yoryiabreu/proyectos/apps-marketing/src/components/sections/*`
- Motion/animaciones:  
  `/Users/yoryiabreu/proyectos/apps-marketing/src/components/ui/MotionReveal.tsx`  
  `/Users/yoryiabreu/proyectos/apps-marketing/src/components/ui/ScrambleText.tsx`  
  `/Users/yoryiabreu/proyectos/apps-marketing/src/components/ui/ScatteredTextReveal.tsx`  
  `/Users/yoryiabreu/proyectos/apps-marketing/src/app/globals.css`
- Diagnóstico y traspaso a formulario:  
  `/Users/yoryiabreu/proyectos/apps-marketing/src/components/sections/ProjectDiagnosisSection.tsx`  
  `/Users/yoryiabreu/proyectos/apps-marketing/src/lib/diagnosis-context.ts`  
  `/Users/yoryiabreu/proyectos/apps-marketing/src/data/diagnosis-response-copy.ts`
- Seguridad/auth interna y admin APIs:  
  `/Users/yoryiabreu/proyectos/apps-marketing/src/app/api/admin/leads/**/route.ts`  
  `/Users/yoryiabreu/proyectos/apps-marketing/src/lib/internal-auth.ts`  
  `/Users/yoryiabreu/proyectos/apps-marketing/src/lib/internal-security.ts`

## 3) Hallazgos clave

- **Navegación rota**: “Proyectos” apunta a `#ruta-etapa`, pero esa sección no está renderizada en Home.  
  Evidencia:  
  `/Users/yoryiabreu/proyectos/apps-marketing/src/components/sections/PublicHeader.tsx`  
  `/Users/yoryiabreu/proyectos/apps-marketing/src/app/page.tsx` (ProjectTypesSection comentada).
- **Riesgo alto de seguridad en admin APIs**: routes admin sin validación robusta de sesión interna en cada handler.  
  Evidencia:  
  `/Users/yoryiabreu/proyectos/apps-marketing/src/app/api/admin/leads/route.ts`
- **Cookie interna predecible** (`AUTH_COOKIE_VALUE = "ok"`), sin firma.  
  Evidencia:  
  `/Users/yoryiabreu/proyectos/apps-marketing/src/lib/internal-auth.ts`
- **Inconsistencia de dominio**: filtro “No estoy seguro” vs valor tipado real “No estoy seguro (quiero orientación)”.  
  Evidencia:  
  `/Users/yoryiabreu/proyectos/apps-marketing/src/app/internal/leads/page.tsx`  
  `/Users/yoryiabreu/proyectos/apps-marketing/src/types/lead.ts`
- **Variable CSS usada pero no definida**: `--cyan-accent` se usa en secciones pero no está en `:root`.  
  Evidencia:  
  `/Users/yoryiabreu/proyectos/apps-marketing/src/components/sections/ProblemSection.tsx`  
  `/Users/yoryiabreu/proyectos/apps-marketing/src/components/sections/ProjectDiagnosisSection.tsx`  
  `/Users/yoryiabreu/proyectos/apps-marketing/src/app/globals.css`
- **Deuda por componentes no cableados**: hay secciones armadas que hoy no entran en el render principal.

## 4) Riesgos y deuda técnica priorizada

### Alta
1. Seguridad de `/api/admin/*`.
2. Cookie interna fija/predecible.
3. Link principal roto en navegación.

### Media
1. Deuda de módulos/secciones no conectadas.
2. Inconsistencia de valores de interés de servicio.
3. Peso visual/performance por motion + assets grandes.

### Baja
1. Warning de `<img>` en header (mejorable con `next/image`).
2. Detalle de variable CSS faltante.

## 5) Recomendación de próximos pasos por fases

### Quick wins
- Arreglar ancla `#ruta-etapa`.
- Declarar `--cyan-accent`.
- Alinear valor “No estoy seguro”.
- Migrar logo del header a `next/image`.

### Estructural
- Hardening de auth/admin APIs.
- Reemplazar cookie fija por mecanismo firmado/seguro.
- Limpiar/ordenar secciones legacy o no usadas.

## 6) Ready for Proposal

**Sí: YES (condicionado).**  
Priorizar primero seguridad + coherencia de navegación, luego refinamientos visuales/performance.

## 7) Lo que NO se puede verificar solo por código

- Core Web Vitals/Lighthouse reales en dispositivos y red real.
- Comportamiento visual exacto en todos los breakpoints.
- Seguridad efectiva en entorno deploy real (dominios/cookies/secrets productivos).

## Key Learnings

1. El mayor riesgo actual es seguridad de admin APIs, no UI.
2. La landing está funcional pero con incoherencias de navegación y deuda de módulos no conectados.
3. El flujo diagnóstico+lead funciona, pero requiere hardening para producción.
