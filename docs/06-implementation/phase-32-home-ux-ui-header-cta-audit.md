# Phase 32 — Home UX/UI Header + CTA Audit

## Objetivo
Auditar la Home actual de `apps-marketing` desde el punto de vista de UX/UI, narrativa comercial, navegación del header y repetición de CTAs, especialmente alrededor de `Solicitar diagnóstico`.

La página busca ofrecer:

- desarrollo web,
- marketing digital,
- sistemas / automatización,
- IA aplicada al negocio.

## Alcance de la revisión

Revisión read-only. No se modificó código de la landing.

Archivos principales revisados:

- `/Users/yoryiabreu/proyectos/apps-marketing/src/app/page.tsx`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/components/sections/PublicHeader.tsx`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/components/sections/HeroSection.tsx`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/components/sections/ConceptEcosystemSection.tsx`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/components/sections/ProblemSection.tsx`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/components/sections/ServicesSection.tsx`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/components/sections/ProjectTypesSection.tsx`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/components/sections/MarketingSection.tsx`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/components/sections/AILeadIntelligenceSection.tsx`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/components/sections/ProjectDiagnosisSection.tsx`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/components/sections/ProcessSection.tsx`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/components/sections/UseCasesSection.tsx`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/components/sections/ContactFormSection.tsx`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/modules/lead-assistant/components/PublicLeadAssistantWidget.tsx`

## Orden actual de la Home

Según `/Users/yoryiabreu/proyectos/apps-marketing/src/app/page.tsx`, la Home renderiza:

1. Header
2. Hero
3. Ecosistema PAW
4. Problema real
5. Servicios por pilares
6. Ruta según etapa
7. Marketing
8. IA aplicada
9. Diagnóstico
10. Proceso
11. Casos de uso
12. Contacto
13. Footer
14. Widget público

## Diagnóstico general

La Home ya comunica bien la dirección estratégica:

> Web, marketing, sistemas e IA para captar clientes, convertir mejor y escalar con tecnología.

El posicionamiento principal es correcto. Ya no se percibe como una landing solo de IA ni solo de desarrollo web. El mensaje se acerca más a un estudio/product engineer que combina presencia digital, captación, procesos e IA aplicada.

La debilidad principal no está en el concepto, sino en la jerarquía: hay muchas secciones fuertes compitiendo por explicar “el sistema completo” y varios CTAs relacionados con diagnóstico que pueden sentirse repetitivos.

## Puntos fuertes

### 1. Posicionamiento principal claro

El Hero comunica una promesa comercial entendible:

- captar clientes,
- convertir mejor,
- escalar con tecnología.

Eso conecta mejor con negocio que un mensaje puramente técnico.

### 2. Oferta integrada

La combinación Web + Marketing + Sistemas + IA está bien planteada. La sección `Ecosistema PAW` ayuda a visualizar que no se venden piezas aisladas, sino una estructura conectada.

### 3. Buen mecanismo de conversión

El diagnóstico de 3 preguntas es una buena entrada para usuarios que no saben qué necesitan. Reduce fricción porque no obliga al visitante a entender de entrada si necesita web, marketing, sistema o IA.

### 4. Secciones con lógica comercial

La secuencia general funciona:

Problema → solución → rutas → marketing → IA → diagnóstico → formulario.

Eso tiene sentido para una landing consultiva.

### 5. Tono responsable sobre IA

La página no promete “IA mágica”. Usa conceptos como IA gradual, control humano y decisiones reales. Eso genera más confianza.

## Debilidades detectadas

### 1. La familia “diagnóstico” aparece demasiado

La repetición exacta de `Solicitar diagnóstico` no es excesiva por sí sola. Aparece principalmente en:

- Header desktop/mobile.
- Hero.

El problema real es que el concepto diagnóstico aparece en muchas variantes:

- Header: `Solicitar diagnóstico`
- Hero: `Solicitar diagnóstico`
- Services: `Ver diagnóstico orientativo`
- Diagnosis section: `Diagnóstico orientativo`, `Ver recomendación`
- Widget: `Diagnóstico comercial en 2 minutos`
- Contacto: `Diagnóstico inicial según tu etapa`

Esto puede hacer que la página se sienta demasiado centrada en “diagnóstico” en vez de alternar entre valor, prueba, decisión y contacto.

### 2. Header algo cargado

Header actual:

- Servicios
- Proyectos
- Marketing
- IA aplicada
- Diagnóstico
- Contacto
- CTA: Solicitar diagnóstico

Para una landing premium, seis items + CTA puede sentirse denso. El header debería ser una guía, no una segunda tabla de contenidos.

### 3. “Proyectos” no representa bien la sección

`Proyectos` apunta a `#ruta-etapa`, pero esa sección realmente es “Ruta según tu etapa / elige tu siguiente paso”.

El término “Proyectos” puede generar expectativa de portfolio, trabajos realizados o casos reales. Si el usuario hace click esperando ver proyectos construidos y encuentra una matriz de decisión, hay fricción semántica.

Alternativas mejores:

- `Ruta`
- `Etapas`
- `Qué necesito`
- `Solución ideal`

### 4. Marketing e IA pueden sentirse como bloques separados

La página dice que todo está conectado, pero Marketing e IA aparecen luego como secciones independientes. Se entiende, pero falta una transición narrativa más explícita:

- Marketing genera demanda.
- Web convierte.
- Sistema ordena.
- IA ayuda a priorizar, responder o automatizar por fases.

La sección Ecosistema PAW lo explica visualmente, pero conviene reforzarlo con copy entre secciones.

### 5. CTA final de Services puede competir con el diagnóstico

En `ServicesSection` aparece un bloque:

> Si no sabes por dónde empezar, usamos un diagnóstico breve...

CTA:

> Ver diagnóstico orientativo

Es correcto, pero llega muy cerca de otros CTAs similares. Podría cambiarse por una intención distinta:

- `Ver qué solución me conviene`
- `Elegir mi punto de partida`
- `Comparar caminos`
- `Ver ruta según tu etapa`

Así se conserva la conversión sin repetir tanto “diagnóstico”.

### 6. Hay riesgo de exceso de explicación

La Home está completa, pero puede sentirse larga si cada sección vuelve a explicar lo mismo con otras palabras. El visitante necesita una idea progresiva, no que cada bloque vuelva a vender toda la propuesta completa.

## Revisión de navegación del header

### Estado actual

Todos los anchors principales existen:

- `#soluciones` ✅
- `#ruta-etapa` ✅
- `#marketing` ✅
- `#ia-local` ✅
- `#diagnostico` ✅
- `#contacto` ✅

No se detectó anchor roto en el header.

### Problema UX

El header tiene demasiadas opciones para una decisión inicial. La página quiere que el usuario entienda la oferta y avance hacia diagnóstico/contacto, pero el header ofrece varias rutas al mismo tiempo.

### Recomendación de header

Versión recomendada:

- Servicios
- Ecosistema
- Marketing
- IA aplicada
- Contacto
- CTA: Solicitar diagnóstico

O versión más orientada a conversión:

- Servicios
- Qué necesito
- Marketing
- IA aplicada
- Contacto
- CTA: Solicitar diagnóstico

En ambos casos, eliminaría o renombraría `Proyectos`.

## Revisión de CTAs

### CTAs actuales principales

- Header: `Solicitar diagnóstico`
- Hero: `Solicitar diagnóstico`
- Hero secundario: `Completar formulario`
- Services: `Ver diagnóstico orientativo`
- Diagnóstico: `Ver recomendación`
- Diagnóstico resultado: `Completar formulario`
- Widget: `Diagnóstico comercial en 2 minutos`

### Evaluación

Mantendría `Solicitar diagnóstico` en:

- Header.
- Hero.

Pero cambiaría el CTA de Services para que tenga otra intención. La repetición de “diagnóstico” no rompe la página, pero baja sensación premium porque todo parece empujar al mismo botón.

### Propuesta de jerarquía de CTAs

- Header: `Solicitar diagnóstico`
- Hero primario: `Solicitar diagnóstico`
- Hero secundario: `Completar formulario`
- Services: `Elegir mi punto de partida`
- Ruta por etapa: sin CTA agresivo, solo cards de orientación
- Diagnóstico: `Ver recomendación`
- Resultado diagnóstico: `Completar formulario`
- Widget: evaluar si conviene cambiar a `Orientación rápida` para no repetir diagnóstico

## Evaluación por objetivo comercial

### Desarrollo web

Está bien representado en:

- Hero.
- Ecosistema PAW.
- Services.
- Ruta según etapa.
- Use Cases.

Mejoraría con ejemplos más tangibles: landing, sitio profesional, web catálogo, web conectada a lead capture.

### Marketing digital

Está presente y bien alineado a conversión. Lo más fuerte es que no se vende como “postear por postear”, sino como captación y seguimiento.

Oportunidad: conectar más explícitamente marketing con web y CRM/sistema.

### IA aplicada

Está bien planteada de forma responsable. No promete IA real fuera de alcance. Habla de asistente, priorización y recomendaciones.

Oportunidad: aclarar mejor ejemplos prácticos:

- asistente de consultas,
- resumen de leads,
- clasificación por intención,
- recomendaciones de próximo paso,
- automatización gradual con control humano.

### Sistemas / automatización

Está bien, pero podría sentirse menos visible que Web/Marketing/IA. Conviene reforzarlo como la capa que evita perder consultas y ordena operación.

## Prioridades recomendadas

### P0 — Ajustes rápidos de alta claridad

1. Renombrar `Proyectos` en header.
2. Reducir header a máximo 5 items.
3. Cambiar CTA de Services para no repetir diagnóstico.
4. Revisar texto del widget para que no compita con el CTA principal.

### P1 — Mejora narrativa

1. Agregar una transición clara entre Ecosistema PAW y Problema/Servicios.
2. Reforzar que Marketing + Web + Sistema + IA son capas del mismo flujo.
3. Hacer que Contacto cierre más fuerte con “cuéntanos tu caso y te respondemos con camino recomendado”.

### P2 — Polish visual/conversión

1. Revisar si algunas secciones pueden compactarse.
2. Evitar repetir “captar / convertir / ordenar / diagnóstico” demasiadas veces.
3. Mejorar microcopy de CTAs secundarios.

## Riesgos

- Quitar demasiado el CTA de diagnóstico puede bajar conversiones tempranas.
- Mantener demasiadas variantes de diagnóstico puede hacer que la página se sienta repetitiva.
- Usar “Proyectos” sin portfolio real puede crear expectativa equivocada.
- Prometer IA demasiado fuerte puede sonar a automatización real ya lista; conviene mantener lenguaje gradual.

## Recomendación final

La página está bien encaminada para vender tu trabajo como desarrollo web + marketing + IA aplicada. La base es sólida.

El próximo paso no debería ser rediseñar todo. Debería ser una fase corta de normalización de navegación y CTAs:

1. Simplificar header.
2. Renombrar `Proyectos`.
3. Variar los CTAs para que no todo diga diagnóstico.
4. Reforzar la narrativa: Web convierte, Marketing atrae, Sistemas ordenan, IA potencia.

## Ready for proposal

Sí. Está lista para una mini fase de mejora UX/copy/header sin tocar backend ni APIs.
