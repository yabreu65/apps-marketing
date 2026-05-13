# Success Metrics — Apps Marketing 

## Purpose

Este documento define las métricas que permitirán evaluar si la Fase 1 del proyecto cumple su objetivo principal: validar la oferta comercial, captar leads y medir la capacidad de conversión de la landing.

La Fase 1 no medirá automatización ni IA, porque esos módulos pertenecen a fases futuras.

## North Star Metric

La métrica principal de Fase 1 será:

**Visitantes de la landing -> Contactos comerciales iniciados**

Un contacto comercial puede originarse por:

- Click en CTA principal hacia WhatsApp manual.
- Envío del formulario de contacto.
- Click en CTA secundario de servicios.
- Solicitud explícita de diagnóstico o consulta.

## Métricas Fase 1 — Landing

### 1. Conversión visita -> lead

Objetivo inicial:

**3% o más**

Definición:

Un lead es un visitante que realiza al menos una acción de contacto:

- Envía formulario.
- Hace click en WhatsApp.
- Solicita diagnóstico.
- Pide información sobre servicios.

### 2. CTR del CTA principal a WhatsApp

Definición:

Porcentaje de visitantes que hacen click en el CTA principal hacia WhatsApp manual.

Ejemplo de CTA:

**Solicitar diagnóstico por WhatsApp**

Esta métrica ayuda a saber si la propuesta de valor y el llamado a la acción son claros.

### 3. Formularios enviados por semana

Definición:

Cantidad de formularios completados semanalmente.

Esta métrica permite medir intención comercial más estructurada que el simple click a WhatsApp.

### 4. Core Web Vitals

Objetivo:

**Core Web Vitals en verde o dentro de un rango aceptable para producción inicial.**

Métricas principales:

- LCP aceptable.
- CLS bajo.
- INP correcto.
- Carga rápida en móvil.
- Buen rendimiento en desktop.

### 5. SEO básico

La Fase 1 debe cumplir como mínimo:

- Title definido.
- Meta description definida.
- Estructura semántica correcta.
- Uso correcto de headings.
- Open Graph básico.
- Sitemap y robots si aplica.
- Contenido indexable.
- URLs limpias.
- Copy alineado al servicio principal.

## Métricas de calidad

### 1. Comprensión del mensaje

Objetivo:

**El usuario debe entender la oferta en menos de 10 segundos.**

Validación cualitativa:

Preguntar a usuarios de prueba:

- ¿Qué ofrece esta página?
- ¿Para quién es?
- ¿Qué problema resuelve?
- ¿Qué acción deberías tomar?
- ¿Por qué deberías confiar?

Si el usuario no puede responder eso rápidamente, el hero, la propuesta de valor o el copy principal deben corregirse.

### 2. Rebote en hero

Objetivo:

Reducir el abandono temprano en la primera sección.

Métrica:

**Rebote en hero por debajo del baseline inicial.**

El baseline inicial se medirá después de publicar la primera versión.

### 3. Claridad del servicio

Validación:

El visitante debe poder identificar fácilmente:

- Qué servicios se ofrecen.
- Qué beneficio obtiene.
- Cómo contactar.
- Qué diferencia a Apps Marketing / Yoryi AI Studio.
- Qué pasos siguen después del contacto.

### 4. Calidad del lead

Aunque Fase 1 no tendrá lead scoring automático, sí debe permitir evaluar manualmente si los contactos generados son útiles.

Indicadores cualitativos:

- El prospecto entiende qué servicio busca.
- El prospecto comparte información mínima de contacto.
- El prospecto tiene una necesidad comercial real.
- El prospecto pertenece al ICP definido.
- El prospecto tiene potencial para servicios futuros.

## Métricas futuras — No Fase 1

Estas métricas no aplican al MVP inicial, pero quedan documentadas para fases posteriores.

### AI Lead Assistant

- Lead scoring automático.
- Precisión de clasificación de intención.
- Tiempo medio de primera respuesta automatizada.
- Porcentaje de conversaciones completadas.
- Tasa de leads calificados por IA.
- Tasa de cierre asistida por IA.
- Porcentaje de conversaciones escaladas a humano.
- Calidad del resumen generado por IA.

### Backend / Dashboard

- Leads registrados.
- Leads por estado.
- Tiempo medio de seguimiento.
- Conversión lead -> reunión.
- Conversión reunión -> cliente.
- Fuente del lead.
- Historial de contacto.
- Evolución de oportunidades por semana o mes.

### Automatizaciones

- Follow-ups enviados.
- Respuestas automáticas exitosas.
- Reducción de tiempo manual.
- Oportunidades recuperadas.
- Tasa de respuesta posterior al seguimiento.
- Tareas comerciales automatizadas.

## Success Criteria Fase 1

La Fase 1 se considerará exitosa si:

- La landing comunica claramente la oferta.
- El usuario entiende el servicio en menos de 10 segundos.
- Existen CTA visibles hacia WhatsApp manual y formulario.
- La página es responsive.
- El SEO básico está implementado.
- Core Web Vitals está en verde o dentro de un rango aceptable.
- La landing puede generar contactos comerciales medibles.
- La propuesta de valor está alineada con el ICP.
- La captación inicial funciona sin depender de IA.
- La captación inicial funciona sin backend complejo.
- La captación inicial funciona sin WhatsApp Cloud API.
- El proyecto queda preparado para evolucionar a backend, dashboard e IA en fases futuras.

## Out of Scope Metrics for Phase 1

No se medirán como éxito de Fase 1:

- Lead scoring automático.
- Tasa de respuesta automatizada.
- Conversaciones gestionadas por IA.
- Dashboard completo.
- Campañas pagas.
- Automatizaciones avanzadas.
- Integraciones con CRM.
- WhatsApp Cloud API.
- OpenAI API.
- Ollama.
- Clasificación automática de intención.
- Resúmenes automáticos de leads.

## Review Cadence

Durante Fase 1, las métricas deben revisarse en ciclos cortos.

### Revisión inicial

Después de publicar la primera versión de la landing:

- Verificar funcionamiento de CTA.
- Verificar formulario.
- Verificar responsive.
- Verificar SEO básico.
- Verificar velocidad inicial.
- Verificar claridad del hero.

### Revisión semanal

Revisar:

- Cantidad de visitas.
- Clicks a WhatsApp.
- Formularios enviados.
- Calidad manual de leads.
- Secciones con mayor interacción si existe analítica.
- Problemas reportados por usuarios.

### Revisión mensual

Evaluar:

- Conversión visita -> lead.
- Calidad de los leads recibidos.
- Necesidad de ajustar copy.
- Necesidad de ajustar oferta.
- Necesidad de pasar a la siguiente fase.
- Potencial para backend, dashboard o AI Lead Assistant.

## Phase 1 Metric Ownership

Las métricas de Fase 1 deben ayudar a tomar decisiones concretas:

- Si hay visitas pero no leads, revisar propuesta de valor y CTA.
- Si hay clicks pero pocos formularios, revisar fricción del formulario.
- Si hay leads de baja calidad, revisar mensaje e ICP.
- Si el usuario no entiende la oferta, revisar hero y secciones iniciales.
- Si la web carga lento, priorizar performance antes de agregar nuevas funciones.
- Si la landing convierte, avanzar hacia captura estructurada y backend.