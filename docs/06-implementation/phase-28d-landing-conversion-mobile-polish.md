# Phase 28D — Landing Conversion & Mobile Polish

## Objetivo
Reducir densidad visual y fatiga de decisión en la landing, reforzar jerarquía de CTA y mejorar percepción mobile-first sin cambiar arquitectura ni backend.

## Diagnóstico usado
Se aplicó el diagnóstico de Fase 28C:
1. Hero con lectura todavía extensa.
2. Carga acumulada en Ecosystem + Services + Ruta.
3. Formulario con fricción percibida en mobile.
4. Widget flotante compitiendo visualmente en algunos tramos.

## Cambios aplicados

### Hero
Archivo: `/Users/yoryiabreu/proyectos/apps-marketing/src/components/sections/HeroSection.tsx`
- Copy recortado y más directo.
- CTA principal reforzado: `Solicitar diagnóstico`.
- CTA secundario simplificado: `Ver servicios`.
- Menos chips (de 4 a 3).
- Menor densidad y spacing más compacto en mobile.

### Ecosystem
Archivo: `/Users/yoryiabreu/proyectos/apps-marketing/src/components/sections/EcosystemSection.tsx`
- Cards más compactas (menos texto y menor altura).
- Badges más discretos.
- Redacción orientada a escaneo rápido.
- Mantiene autoridad sin competir tanto con Services.

### Services
Archivo: `/Users/yoryiabreu/proyectos/apps-marketing/src/components/sections/ServicesSection.tsx`
- Bullets reducidos (2 por bloque).
- Frases más cortas y enfocadas en beneficio.
- Menor carga visual en mobile.
- Cierre con siguiente paso de diagnóstico.

### Ruta según etapa
Archivo: `/Users/yoryiabreu/proyectos/apps-marketing/src/components/sections/ProjectTypesSection.tsx`
- Copy reducido por card.
- Mayor escaneabilidad.
- Micro-acción discreta: `Me pasa esto`.
- Menor sensación de catálogo.

### Diagnóstico
Archivo: `/Users/yoryiabreu/proyectos/apps-marketing/src/components/sections/ProjectDiagnosisSection.tsx`
- Introducción más breve y accionable.
- Ajuste de copy CTA para continuidad comercial.
- Spacing vertical reducido para flujo más ágil.

### Formulario
Archivo: `/Users/yoryiabreu/proyectos/apps-marketing/src/components/sections/ContactFormSection.tsx`
- Copy superior simplificado (para qué se piden datos).
- Microcopy más breve en ayudas.
- Ajuste de spacing vertical del bloque.
- Validaciones y estructura de campos intactas.

### Widget flotante
Archivo: `/Users/yoryiabreu/proyectos/apps-marketing/src/modules/lead-assistant/components/PublicLeadAssistantWidget.tsx`
- Offset mobile ajustado con safe-area (`env(safe-area-inset-bottom)`).
- z-index suavizado para menor agresividad visual.
- Texto público técnico `Handoff` reemplazado por `Resumen`.
- Conserva comportamiento y lógica actual del chat.

### Cierre final
Archivo: `/Users/yoryiabreu/proyectos/apps-marketing/src/components/sections/FinalCtaSection.tsx`
- Copy reducido para evitar repetición con Hero/Services.
- Enfoque en cierre directo y decisión final.
- CTA principal y alternativa por WhatsApp mantenidas.

## Reducción de densidad visual
- Menos texto por sección crítica.
- Menos altura acumulada en bloques intermedios.
- Menos chips y menos bullets largos.
- Spacing vertical más contenido en mobile.

## Ajustes mobile
- Hero más rápido de escanear.
- Secciones intermedias más compactas.
- Formulario percibido como más simple.
- Widget flotante menos invasivo en borde inferior.

## Alcance respetado
- Sin nuevos módulos.
- Sin cambios de arquitectura.
- Sin cambios de backend, DB, Prisma, auth o IA.
- Sin nuevas dependencias.
- Sin deploy y sin commit.

## Validaciones realizadas
- `npm run test`
- `npm run lint`
- `npm run build`
