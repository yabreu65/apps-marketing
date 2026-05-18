# Phase 28E — Mobile Visual Cleanup & Production QA

## Objetivo
Aplicar limpieza visual final mobile-first y validar QA de producción para dejar la landing lista antes de commit/deploy.

## Problemas visuales detectados
1. Hero mobile todavía demasiado alto para primer impacto.
2. Diagnóstico orientativo se veía pesado en mobile por densidad simultánea de opciones.
3. Botón flotante del chat competía con cierre (formulario/CTA final).
4. Artefactos visuales observados en capturas (overlay de inspector y burbuja "N").

## Cambios aplicados

### Hero mobile
- Archivo: `/Users/yoryiabreu/proyectos/apps-marketing/src/components/sections/HeroSection.tsx`
- Reducción de altura y densidad en mobile:
  - título más compacto
  - subtítulo más corto
  - chips reducidos en mobile
  - bloque “¿Qué resolvemos?” oculto en mobile (`lg:block`) y mantenido en desktop

### Diagnóstico mobile
- Archivo: `/Users/yoryiabreu/proyectos/apps-marketing/src/components/sections/ProjectDiagnosisSection.tsx`
- Decisión: **wizard mobile-only simple** (sin backend, sin dependencias)
  - Paso 1 / 2 / 3 con navegación `Volver` y `Siguiente`
  - Desktop mantiene layout de 3 columnas
  - Menor fricción visual y lectura más rápida en mobile

### Widget flotante
- Archivo: `/Users/yoryiabreu/proyectos/apps-marketing/src/modules/lead-assistant/components/PublicLeadAssistantWidget.tsx`
- Ajustes:
  - trigger más compacto en mobile
  - transición de ocultamiento del botón cuando el usuario entra en `#contact-form` o `#contacto` (IntersectionObserver)
  - mantiene comportamiento del chat sin cambiar lógica del agente
  - limpieza de markup duplicado observado

### Formulario mobile (polish leve)
- Archivo: `/Users/yoryiabreu/proyectos/apps-marketing/src/components/sections/ContactFormSection.tsx`
- Ajustes mínimos:
  - textarea de 5 a 4 filas
  - microcopy más breve en ayuda/privacidad

## Decisiones clave
- **Hero mobile**: compactado y simplificado, manteniendo propuesta y CTA.
- **Diagnóstico mobile**: wizard por pasos para sostener promesa de “3 preguntas rápidas”.
- **Widget flotante**: no se cambia lógica de chat; solo convivencia visual con cierre de conversión.

## QA production
Se ejecutaron validaciones de calidad:
- `npm run test`
- `npm run lint`
- `npm run build`

Intento de revisar con `npm run start` puede depender del entorno local/sandbox del hilo.

## Artefactos visuales detectados
- Overlay blanco con clases CSS y círculo negro con “N” en capturas correspondieron a **herramientas de desarrollo/inspección**, no a UI de producción final.
- No se detectó exposición de textos debug/session/memory/intent en copy público de landing.

## Alcance respetado
- Sin cambios de backend/DB/Prisma/auth/IA.
- Sin módulos nuevos.
- Sin reintroducir secciones excluidas en 28B.
- Sin dependencias nuevas.
- Sin commit y sin deploy.

## Recomendaciones futuras
1. Opcional: reducción adicional de 1 línea de copy en Hero mobile si se busca máxima velocidad percibida.
2. Opcional: test visual manual final en 390px y 430px con chat abierto/cerrado cerca de formulario.
