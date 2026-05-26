# Phase 32B — Home UX/UI Professional Review

## Objetivo
Revisar minuciosamente la UX/UI actual de la Home de `apps-marketing` y proponer cómo hacerla más profesional, más clara para el usuario y más fácil de entender.

La página busca vender una oferta integral:

- Desarrollo web.
- Marketing digital.
- Sistemas / automatización.
- IA aplicada al negocio.

## Alcance

Exploración SDD read-only. No se modificó código.

Archivos revisados:

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

## Estado actual

La Home actual renderiza esta estructura:

1. Header
2. Hero
3. Ecosistema PAW
4. Problema real
5. Servicios
6. Ruta según etapa
7. Marketing
8. IA aplicada
9. Diagnóstico
10. Proceso
11. Casos de uso
12. Contacto
13. Footer
14. Widget público

La dirección general es correcta. La página ya comunica una oferta integral y no una pieza aislada. El mensaje principal funciona:

> Web, marketing, sistemas e IA para captar clientes, convertir mejor y escalar con tecnología.

Pero la página tiene un problema de jerarquía editorial: demasiadas secciones intentan explicar el valor desde ángulos parecidos. Eso puede hacer que la experiencia se sienta larga, repetitiva y menos premium.

## Puntos fuertes

### 1. Oferta amplia y actual

La combinación Web + Marketing + Sistemas + IA es potente. Tiene sentido para negocios que necesitan captar mejor, convertir más y ordenar procesos.

### 2. Hero con promesa comercial

El Hero no se queda en “hacemos páginas web”. Habla de clientes, conversión, crecimiento y tecnología. Eso es mucho más fuerte para venta.

### 3. Ecosistema PAW como gran diferenciador

La sección Ecosistema PAW tiene potencial para ser el gran momento visual de la Home. Ayuda a explicar que no se venden piezas separadas, sino un flujo conectado.

### 4. Diagnóstico de 3 preguntas

El diagnóstico es una buena mecánica de conversión porque ayuda a usuarios que todavía no saben si necesitan web, marketing, sistema o IA.

### 5. Tono responsable con IA

La IA se presenta como gradual, con control humano y sin promesas exageradas. Eso genera confianza.

## Debilidades UX/UI

### 1. Demasiadas secciones compitiendo

Actualmente el usuario pasa por muchas secciones fuertes:

- Ecosistema PAW.
- Problema real.
- Servicios.
- Ruta según etapa.
- Marketing.
- IA aplicada.
- Diagnóstico.
- Proceso.
- Casos de uso.
- Contacto.

Varias repiten ideas similares: captar, ordenar, convertir, diagnosticar, crecer con tecnología. La página necesita más jerarquía, no necesariamente más diseño.

### 2. Header cargado

Header actual:

- Servicios.
- Proyectos.
- Marketing.
- IA aplicada.
- Diagnóstico.
- Contacto.
- CTA: Solicitar diagnóstico.

Para una landing premium, esto es mucho. El header debería reducir carga cognitiva.

Además, `Proyectos` apunta a `#ruta-etapa`, pero esa sección no es un portfolio. Eso puede confundir.

### 3. Diagnóstico aparece demasiado

El problema no es solo el botón `Solicitar diagnóstico`. El problema es la repetición del concepto:

- Solicitar diagnóstico.
- Diagnóstico orientativo.
- Ver diagnóstico orientativo.
- Diagnóstico comercial en 2 minutos.
- Diagnóstico inicial según tu etapa.
- Ver recomendación.

El diagnóstico debe sentirse como el CTA dominante, no como ruido repetido.

### 4. Ecosistema PAW puede ser visual pero no suficientemente accionable

La sección es fuerte visualmente, pero debe responder rápido:

- Qué significa para el cliente.
- Qué gana.
- Qué capa conviene activar primero.

Si no, puede sentirse decorativa.

### 5. Servicios, Marketing e IA se pisan

`ServicesSection` ya incluye Marketing e IA como pilares. Después aparecen Marketing e IA como secciones separadas. Puede funcionar, pero falta una transición más clara para que no se sienta repetido.

### 6. Ruta según etapa necesita más protagonismo

`ProjectTypesSection` debería ser una sección de decisión fuerte. Hoy funciona, pero visualmente se siente más simple que otras secciones.

### 7. Contacto llega tarde

El formulario está bien, pero aparece después de muchas secciones. Si el usuario ya entendió antes, puede cansarse antes de llegar.

## Estructura recomendada para una Home más profesional

Orden recomendado:

1. Header
2. Hero
3. Problema real
4. Ecosistema PAW
5. Servicios por pilares
6. Ruta según tu etapa
7. Marketing + IA aplicada compactadas como “capas avanzadas”
8. Diagnóstico
9. Proceso breve
10. Contacto
11. Footer
12. Widget público

Evaluaría compactar o retirar `UseCasesSection`, porque puede repetir lo que ya dicen Servicios y Ruta.

## Header recomendado

### Opción recomendada

- Servicios
- Ecosistema
- Ruta
- Diagnóstico
- Contacto
- CTA: Solicitar diagnóstico

### Alternativa si querés destacar marketing

- Servicios
- Marketing
- IA aplicada
- Diagnóstico
- Contacto
- CTA: Solicitar diagnóstico

No recomiendo mantener `Proyectos` si no hay portfolio real.

## Estrategia de CTAs recomendada

### Mantener

- Header: `Solicitar diagnóstico`
- Hero: `Solicitar diagnóstico`
- Diagnóstico: `Ver recomendación`

### Cambiar

En Services, cambiar:

`Ver diagnóstico orientativo`

Por una opción con otra intención:

- `Ver qué solución me conviene`
- `Elegir mi punto de partida`
- `Comparar caminos`

En Contacto, hacer el cierre más comercial:

- `Quiero que evalúen mi proyecto`
- `Enviar mi caso`

En el widget, evaluar cambiar:

`Diagnóstico comercial en 2 minutos`

Por algo menos competitivo con el CTA principal:

- `Orientación rápida`
- `Ayuda para elegir`
- `Consulta guiada`

## Mejoras por sección

### Hero

Debe mantenerse fuerte, pero en mobile necesita ser más compacto.

Recomendaciones:

- Reducir subtítulo si se ve demasiado largo.
- Mantener CTA principal + secundario.
- Evitar que el Hero consuma demasiada altura antes del problema.

### Problema real

Debe ir antes de Ecosistema PAW si queremos que el usuario primero sienta el dolor y luego vea el sistema.

Problemas recomendados:

- Consultas dispersas.
- Seguimiento manual.
- Poca claridad de prioridades.
- Marketing sin sistema.

### Ecosistema PAW

Debe ser el gran momento visual de la página.

Copy sugerido:

> Web, marketing, sistemas e IA trabajando como un solo ecosistema.

Microcopy sugerido:

> Elegimos qué capa activar según tu etapa.

### Servicios

Debe ser la sección más clara y escaneable.

Cada card debería responder:

- Qué hacemos.
- Para quién sirve.
- Resultado esperado.
- Primer paso.

### Ruta según etapa

Debe convertirse en un selector de situación más fuerte:

- Estoy empezando.
- Ya recibo consultas.
- Pierdo seguimiento.
- Necesito sistema.
- Quiero IA.
- Quiero validar SaaS.

CTA sugerido:

`Elegir mi punto de partida`

### Marketing

Debe diferenciarse de Servicios hablando más de:

- mensaje,
- oferta,
- adquisición,
- contenido,
- campañas,
- medición.

Evitar repetir demasiado “procesos”, porque eso pertenece más a Sistemas.

### IA aplicada

Debe sonar menos técnica y más comercial:

> IA para responder mejor, priorizar oportunidades y reducir tareas repetitivas.

Ejemplos concretos:

- asistente de consultas,
- resumen de leads,
- clasificación por intención,
- recomendaciones de próximo paso,
- automatización gradual con control humano.

### Diagnóstico

Mantenerlo como gran momento de conversión, pero limpiar su UI:

- Menos encabezados internos.
- Panel de preguntas más liviano.
- Resultado más ejecutivo.
- CTA principal más claro:

`Enviar mi diagnóstico y completar formulario`

### Proceso

Debe ser breve y de confianza. No debería agregar demasiada carga.

### Casos de uso

Tiene riesgo de redundancia. Si se mantiene, debe ser muy concreto:

- Landing para captar consultas.
- Web profesional.
- Dashboard comercial.
- Sistema interno.
- MVP SaaS.
- Asistente IA.

Si no, compactarlo dentro de Servicios o Ruta.

### Contacto

Título sugerido:

> Contanos tu negocio y te respondemos con el mejor camino para avanzar

Mantener microconfianza:

- respuesta manual,
- sin compromiso,
- sin datos sensibles,
- recomendación según etapa.

## Recomendaciones mobile-first

1. Reducir altura acumulada antes del diagnóstico.
2. Evitar cards largas en stack.
3. Hacer `Ruta según etapa` más tocable y menos informativa.
4. Cuidar que el widget no tape CTAs.
5. Reducir textos dentro de cards.
6. Mantener un CTA principal por sección.

## Jerarquía visual recomendada

La Home debería tener solo dos grandes momentos visuales:

1. Ecosistema PAW como momento visual de posicionamiento.
2. Diagnóstico como momento de conversión.

El resto debe apoyar, no competir.

Regla clave:

> Si todo tiene glow, cards, bordes, gradientes y CTA, nada destaca.

## Plan de implementación recomendado

### Fase 1 — Corrección UX rápida

- Renombrar `Proyectos` a `Ruta`.
- Agregar o priorizar `Ecosistema` en header.
- Cambiar CTA de Services.
- Reducir repetición de “diagnóstico”.

### Fase 2 — Reorden narrativo

- Mover Problema antes de Ecosistema PAW.
- Revisar si `UseCasesSection` se compacta o retira.
- Mejorar transición Servicios → Marketing → IA.
- Hacer Ruta según etapa más protagonista.

### Fase 3 — Pulido visual premium

- Ajustar spacing vertical.
- Reducir cards comprimidas.
- Mejorar mobile.
- Unificar peso visual de secciones.

### Fase 4 — Conversión

- Mejorar diagnóstico.
- Mejorar contacto.
- Revisar widget para que acompañe sin competir.

## Riesgos

- Si se eliminan demasiadas secciones, puede perderse explicación para usuarios nuevos.
- Si se deja todo, la página se puede sentir larga y repetitiva.
- Si Ecosistema PAW se sobrediseña, puede parecer una demo visual más que argumento comercial.
- Si se insiste demasiado con IA, puede sonar a promesa mayor a lo implementado.
- Si el widget compite con el diagnóstico, puede dispersar la acción principal.

## Recomendación final

No hace falta rediseñar todo. La página necesita una fase quirúrgica de UX/UI:

1. Header más simple.
2. CTAs con intención diferenciada.
3. Problema antes del Ecosistema PAW.
4. Ruta según etapa más fuerte.
5. Marketing e IA menos repetidos y más conectados.
6. Diagnóstico más limpio.
7. Contacto más comercial.

Con eso la Home se vería más profesional, más directa y más fácil de entender.

## Ready for Proposal

Sí. Está listo para una propuesta de cambios frontend/copy sin tocar backend ni APIs.
