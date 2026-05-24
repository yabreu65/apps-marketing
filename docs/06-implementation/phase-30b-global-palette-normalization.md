# Phase 30B — Global Palette Normalization

Date: 2026-05-23  
Project: `apps-marketing`

## Objetivo
Aplicar una normalización inicial de tokens globales en `src/app/globals.css` para alinear la identidad visual con un estilo dark premium de tecnología, marketing e IA aplicada.

## Qué se cambió

Se actualizó el bloque `:root` en:
- `/Users/yoryiabreu/proyectos/apps-marketing/src/app/globals.css`

### 1) Tokens base normalizados (compatibles con variables existentes)
Se mantuvieron las variables ya usadas por componentes y se ajustaron valores para coherencia:
- `--bg-primary`
- `--bg-secondary`
- `--card-bg`
- `--purple-primary`
- `--purple-deep`
- `--purple-soft`
- `--orange-cta`
- `--orange-hover`
- `--orange-soft`
- `--text-primary`
- `--text-secondary`
- `--text-muted`
- `--border-subtle`

### 2) Tokens cyan agregados explícitamente
Se agregaron:
- `--cyan-accent`
- `--cyan-accent-soft`
- `--cyan-accent-deep`

### 3) Naranjas CTA corregidos
Se dejó exactamente:
- `--orange-cta: #f97316`
- `--orange-hover: #ea580c`
- `--orange-soft: #fdba74`

### 4) Headings globales
Se reemplazó el color hardcodeado por token:
- de `color: #d0daff;`
- a `color: var(--text-main);`

También se agregó alias:
- `--text-main: var(--text-primary);`

### 5) `.text-gradient`
Se actualizó para usar tokens de marca:
- `var(--warm-white)`
- `var(--brand-purple-soft)`
- `var(--cyan-accent)`

Se agregó alias:
- `--brand-purple-soft: var(--purple-soft);`

## Por qué se cambió
- Unificar semántica visual de marca en tokens globales.
- Evitar colores hardcodeados en tipografía principal.
- Corregir inconsistencia de CTA (naranja real para conversión).
- Introducir acento cyan explícito para capa tech/data.
- Preparar una base estable para fases siguientes sin romper componentes actuales.

## Qué NO se tocó
- No se cambió layout.
- No se cambió copy.
- No se cambió lógica.
- No se tocaron APIs ni backend.
- No se refactorizaron componentes.
- No se hizo rediseño por sección.
- No se reemplazaron aún todos los gradientes hardcodeados de secciones (queda para fase posterior de UI polish).

## Validaciones ejecutadas
Ejecutado en `/Users/yoryiabreu/proyectos/apps-marketing`:

1. `npm run test` ✅
2. `npm run lint` ✅ (sin errores; 1 warning existente por uso de `<img>` en header)
3. `npm run build` ✅ (compilación OK; mismo warning de lint)

## Próximo paso recomendado
1. Revisar visualmente Home en desktop y mobile con la nueva base de tokens.
2. Luego ajustar fondos/gradientes sección por sección (Hero, Problem, Services, Ecosystem, Diagnosis, Contact) para converger a una paleta totalmente consistente sin cambios bruscos.
