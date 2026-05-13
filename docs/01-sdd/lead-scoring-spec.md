# Lead Scoring Spec — Apps Marketing / Yoryi AI Studio

## 1. Purpose

Este documento define la especificación futura de lead scoring para el proyecto `apps-marketing`.

El lead scoring automático no forma parte de la Fase 1.

En Fase 1, la evaluación de leads será manual y servirá para aprender qué variables comerciales importan antes de automatizar.

Este documento deja preparada la lógica futura para AI Lead Assistant, backend, dashboard y automatizaciones.

Debe mantenerse alineado con:

- `AGENTS.md`
- `docs/01-sdd/sdd-index.md`
- `docs/01-sdd/prd.md`
- `docs/01-sdd/scope.md`
- `docs/01-sdd/user-stories.md`
- `docs/01-sdd/acceptance-criteria.md`
- `docs/01-sdd/conversation-flows.md`
- `docs/02-architecture/ai-agent-design.md`
- `docs/02-architecture/ai-provider-strategy.md`
- `docs/04-tests/ai-evaluation-set.md`

## 2. Scope Context

### Fase 1

En Fase 1, el lead scoring será manual.

Permitido:

- Evaluar manualmente la calidad de un lead.
- Observar patrones de prospectos.
- Registrar notas simples si aplica.
- Clasificar de forma humana si el lead parece relevante.
- Aprender qué datos son necesarios para calificar mejor.

No permitido en Fase 1:

- Lead scoring automático.
- Modelo IA de scoring.
- AI Lead Assistant activo.
- OpenAI API.
- Ollama.
- Clasificación automática de intención.
- Dashboard completo de scoring.
- Automatizaciones de priorización.

### Fases futuras

En fases futuras, el sistema podrá calcular automáticamente un score comercial del lead usando:

- Datos capturados desde formulario.
- Conversaciones con AI Lead Assistant.
- Información del negocio.
- Servicio de interés.
- Urgencia.
- Claridad de necesidad.
- Potencial económico.
- Potencial de recurrencia.
- Encaje con el ICP.

## 3. Lead Scoring Principle

El principio rector es:

**Primero se aprende manualmente qué hace valioso a un lead. Después se automatiza el scoring.**

El scoring no debe reemplazar el criterio humano en las primeras fases.

Debe ayudar a priorizar oportunidades, no a cerrar ventas automáticamente.

## 4. Definition of Qualified Lead

Un lead calificado es un prospecto que cumple varias de estas condiciones:

- Pertenece al ICP definido.
- Tiene una necesidad comercial real.
- Entiende o busca mejorar captación, conversión o presencia digital.
- Tiene un servicio o negocio definido.
- Tiene urgencia o interés concreto.
- Comparte datos mínimos de contacto.
- Tiene capacidad o intención de invertir.
- Tiene potencial para una landing, web, sistema, dashboard o automatización futura.
- Puede convertirse en cliente o en oportunidad comercial relevante.

## 5. Manual Scoring in Phase 1

Durante Fase 1, Yoryi / Apps Marketing podrá evaluar leads manualmente usando una clasificación simple.

### 5.1 Clasificación manual sugerida

| Clasificación | Descripción | Acción sugerida |
|---|---|---|
| Lead frío | Curioso, sin urgencia, sin necesidad clara o fuera del ICP | Responder de forma simple o descartar |
| Lead medio | Tiene necesidad, pero falta claridad, presupuesto o urgencia | Hacer preguntas de diagnóstico |
| Lead caliente | Tiene necesidad clara, urgencia, encaje y potencial comercial | Priorizar seguimiento o propuesta |

### 5.2 Variables manuales a observar

En Fase 1, se recomienda observar:

- Tipo de negocio.
- Servicio de interés.
- Urgencia.
- Claridad del problema.
- Presupuesto aproximado.
- Canal de contacto.
- Calidad del mensaje.
- Nivel de decisión del prospecto.
- Potencial para servicios futuros.
- Encaje con el ICP.

### 5.3 Objetivo del scoring manual

El objetivo no es automatizar todavía.

El objetivo es aprender:

- Qué tipo de leads llegan desde la landing.
- Qué segmento convierte mejor.
- Qué servicios generan más interés.
- Qué preguntas aparecen con más frecuencia.
- Qué datos faltan para calificar mejor.
- Qué variables deben automatizarse en el futuro.

## 6. Future Automatic Scoring Model

El scoring automático futuro se calculará en una escala de 0 a 100.

### 6.1 Clasificación futura

| Score | Clasificación | Descripción |
|---:|---|---|
| 0–39 | Lead frío | Bajo encaje, baja claridad o baja intención |
| 40–69 | Lead medio | Tiene potencial, pero requiere diagnóstico |
| 70–100 | Lead caliente | Alta intención, buen encaje y prioridad comercial |

## 7. Future Scoring Variables

El score futuro podrá componerse de las siguientes variables.

## 7.1 Service Fit — 0 a 20 puntos

Evalúa qué tan alineado está el servicio solicitado con la oferta de Apps Marketing / Yoryi AI Studio.

### Puntaje sugerido

| Condición | Puntos |
|---|---:|
| Solicita una landing comercial, desarrollo web o captación de leads | 18–20 |
| Solicita SEO, marketing digital o mejora de conversión | 14–17 |
| Solicita automatización o IA futura con base comercial clara | 12–16 |
| Solicita algo ambiguo pero relacionado | 6–11 |
| Solicita algo fuera del alcance del proyecto | 0–5 |

### Ejemplos de alto fit

- “Necesito una landing para captar clientes.”
- “Tengo una web pero no convierte.”
- “Quiero que más personas me escriban por WhatsApp.”
- “Necesito mejorar mi presencia digital.”

## 7.2 ICP Fit — 0 a 15 puntos

Evalúa si el prospecto pertenece al cliente ideal definido.

### Puntaje sugerido

| Condición | Puntos |
|---|---:|
| Profesional, pyme o negocio de servicios con venta conversacional | 13–15 |
| Agencia pequeña, consultor o freelancer high-ticket | 11–15 |
| Negocio local con pauta digital o tráfico existente | 10–14 |
| Negocio parcialmente alineado | 5–9 |
| Fuera del ICP | 0–4 |

## 7.3 Urgency — 0 a 15 puntos

Evalúa qué tan pronto quiere iniciar el prospecto.

### Puntaje sugerido

| Urgencia | Puntos |
|---|---:|
| Quiere empezar esta semana o este mes | 13–15 |
| Quiere empezar en 1–2 meses | 9–12 |
| Está explorando opciones sin fecha clara | 5–8 |
| Solo tiene curiosidad | 0–4 |

## 7.4 Problem Clarity — 0 a 15 puntos

Evalúa qué tan claro tiene el prospecto su problema.

### Puntaje sugerido

| Claridad | Puntos |
|---|---:|
| Describe problema, objetivo y contexto claramente | 13–15 |
| Tiene problema claro pero faltan detalles | 9–12 |
| Tiene necesidad general pero poco definida | 5–8 |
| No sabe qué necesita ni tiene objetivo claro | 0–4 |

### Señales de claridad

- Explica qué vende.
- Explica qué no le funciona.
- Menciona canal actual de captación.
- Tiene objetivo concreto.
- Sabe si necesita landing, web, marketing o automatización.

## 7.5 Budget Fit — 0 a 15 puntos

Evalúa si el prospecto parece tener capacidad de inversión.

### Puntaje sugerido

| Condición | Puntos |
|---|---:|
| Tiene presupuesto claro y compatible | 13–15 |
| No indica monto, pero entiende que es inversión profesional | 9–12 |
| Quiere cotizar, pero sin claridad de presupuesto | 5–8 |
| Busca algo muy barato o sin capacidad aparente | 0–4 |

### Nota

En Fase 1 no es obligatorio pedir presupuesto directamente, pero puede explorarse de forma consultiva.

Ejemplo:

“¿Quieres que lo pensemos como una solución inicial o como un sistema por etapas?”

## 7.6 Business Potential — 0 a 10 puntos

Evalúa si el prospecto puede generar oportunidades futuras.

### Puntaje sugerido

| Potencial | Puntos |
|---|---:|
| Puede contratar landing + mantenimiento + automatización futura | 8–10 |
| Puede contratar landing o web y luego evolucionar | 6–8 |
| Solo necesita una solución puntual | 3–5 |
| Bajo potencial de continuidad | 0–2 |

## 7.7 Channel Fit — 0 a 5 puntos

Evalúa si el negocio vende por canales conversacionales, especialmente WhatsApp o DM.

### Puntaje sugerido

| Canal | Puntos |
|---|---:|
| Usa WhatsApp/DM como canal principal | 5 |
| Usa formulario, llamadas o redes como canal relevante | 3–4 |
| No tiene canal conversacional claro | 0–2 |

## 7.8 Decision Readiness — 0 a 5 puntos

Evalúa si el prospecto parece estar en condiciones de tomar decisión.

### Puntaje sugerido

| Condición | Puntos |
|---|---:|
| Es dueño, socio o decisor directo | 5 |
| Participa en la decisión | 3–4 |
| Solo recopila información para otro | 1–2 |
| No tiene poder de decisión | 0 |

## 8. Future Score Formula

La fórmula futura sugerida es:

```txt
Lead Score =
Service Fit +
ICP Fit +
Urgency +
Problem Clarity +
Budget Fit +
Business Potential +
Channel Fit +
Decision Readiness