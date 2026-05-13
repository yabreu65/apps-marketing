# Lead Scoring Prompt — Apps Marketing / Yoryi AI Studio

## 1. Purpose

Este documento define el prompt futuro para calcular o sugerir lead scoring dentro del proyecto `apps-marketing`.

Este prompt será usado en fases futuras por AI Lead Assistant o por un módulo interno de análisis comercial.

No forma parte de la Fase 1.

La Fase 1 corresponde únicamente a:

- Landing comercial.
- CTA a WhatsApp manual.
- Formulario de contacto.
- SEO básico.
- Responsive.
- Seguimiento humano/manual.
- Evaluación manual de leads.

Este prompt queda documentado para una fase futura, cuando existan backend, proveedor IA aprobado, política de datos, QA conversacional y reglas de privacidad.

Debe mantenerse alineado con:

- `AGENTS.md`
- `docs/01-sdd/sdd-index.md`
- `docs/01-sdd/conversation-flows.md`
- `docs/01-sdd/lead-scoring-spec.md`
- `docs/02-architecture/ai-agent-design.md`
- `docs/02-architecture/ai-provider-strategy.md`
- `docs/02-architecture/security-and-privacy.md`
- `docs/03-prompts/lead-assistant-system-prompt.md`
- `docs/03-prompts/lead-summary-prompt.md`
- `docs/03-prompts/fallback-prompt.md`
- `docs/04-tests/ai-evaluation-set.md`
- `docs/04-tests/conversation-test-cases.md`

---

# 2. Scope Warning

Este prompt es futuro.

No debe ejecutarse en producción durante Fase 1.

No autoriza implementación de:

- AI Lead Assistant.
- Ollama.
- OpenAI API.
- WhatsApp Cloud API.
- Lead scoring automático.
- Clasificación automática.
- Dashboard.
- Automatizaciones.
- CRM avanzado.

Para usar este prompt en producción se requiere:

- Fase aprobada.
- ADR de proveedor IA aprobado.
- Backend o canal aprobado.
- Política de privacidad revisada.
- Evaluación de calidad.
- Tests conversacionales.
- Estrategia de escalamiento humano.

---

# 3. Scoring Goal

El objetivo del lead scoring es ayudar a priorizar oportunidades comerciales.

El scoring debe estimar qué tan valioso, claro y accionable es un lead para Apps Marketing / Yoryi AI Studio.

El scoring no debe cerrar ventas automáticamente.

El scoring no debe reemplazar el criterio humano.

El scoring debe ayudar a responder:

- ¿Este lead encaja con el ICP?
- ¿Qué servicio parece necesitar?
- ¿Qué tan clara es su necesidad?
- ¿Qué tan urgente es?
- ¿Tiene potencial comercial?
- ¿Faltan datos importantes?
- ¿Debe escalarse a Yoryi?
- ¿Es frío, medio o caliente?

---

# 4. Lead Scoring Principles

El scoring debe ser:

- Explicable.
- Conservador cuando falten datos.
- Basado en evidencia del mensaje o formulario.
- Alineado al ICP.
- Alineado con la oferta del proyecto.
- Útil para priorización comercial.
- Fácil de revisar por una persona.

El scoring no debe:

- Inventar datos.
- Asumir presupuesto sin evidencia.
- Clasificar como caliente solo porque el usuario escribió mucho.
- Penalizar injustamente si faltan datos que se pueden preguntar.
- Prometer resultados.
- Tomar decisiones finales de venta.
- Descartar leads sin revisión humana cuando haya duda.

---

# 5. Future Scoring Variables

El score futuro se calcula sobre 100 puntos.

Variables:

| Variable | Máximo |
|---|---:|
| Service Fit | 20 |
| ICP Fit | 15 |
| Urgency | 15 |
| Problem Clarity | 15 |
| Budget Fit | 15 |
| Business Potential | 10 |
| Channel Fit | 5 |
| Decision Readiness | 5 |
| Total | 100 |

La lógica detallada está definida en:

- `docs/01-sdd/lead-scoring-spec.md`

---

# 6. Score Categories

| Score | Category | Description |
|---:|---|---|
| 0–39 | `cold` | Bajo encaje, baja claridad o baja intención |
| 40–69 | `medium` | Tiene potencial, pero requiere diagnóstico |
| 70–100 | `hot` | Alta intención, buen encaje y prioridad comercial |

---

# 7. Confidence Levels

Además del score, el resultado debe incluir nivel de confianza.

| Confidence | Description |
|---|---|
| `low` | Faltan datos críticos o el mensaje es ambiguo |
| `medium` | Hay datos parciales suficientes para estimar |
| `high` | Hay información clara y suficiente para calificar |

Regla:

Si faltan muchos datos críticos, el score debe tener menor confianza, incluso si el prospecto parece interesante.

---

# 8. Future Input

El prompt podrá recibir datos de un formulario, conversación o resumen.

Ejemplo:

```json
{
  "lead": {
    "name": "Carlos Pérez",
    "businessName": "CP Consultores",
    "businessType": "Consultoría",
    "serviceInterest": "landing_page",
    "source": "whatsapp",
    "urgency": "this_month",
    "budgetRange": "medium",
    "message": "Tengo una web vieja, pero no convierte. Quiero una landing para captar clientes por WhatsApp."
  },
  "summary": {
    "mainProblem": "Web actual no convierte",
    "recommendedNextStep": "Ofrecer diagnóstico y propuesta de landing comercial."
  }
}
```

También puede recibir datos incompletos:

```json
{
  "lead": {
    "businessType": "unknown",
    "serviceInterest": "not_sure",
    "message": "Quiero vender más por internet pero no sé qué necesito."
  }
}
```

---

# 9. Future Output

El resultado futuro debe ser estructurado.

Formato recomendado:

```json
{
  "leadScore": 0,
  "leadCategory": "cold",
  "confidence": "medium",
  "breakdown": {
    "serviceFit": 0,
    "icpFit": 0,
    "urgency": 0,
    "problemClarity": 0,
    "budgetFit": 0,
    "businessPotential": 0,
    "channelFit": 0,
    "decisionReadiness": 0
  },
  "explanation": "",
  "missingData": [],
  "recommendedNextStep": "",
  "needsHumanEscalation": false
}
```

---

# 10. System Prompt — Future Scoring Version

```txt
Eres un asistente especializado en lead scoring para Apps Marketing / Yoryi AI Studio.

Tu tarea es analizar la información de un lead y asignar un score comercial de 0 a 100.

Debes evaluar el lead usando estas variables:
1. Service Fit: máximo 20 puntos.
2. ICP Fit: máximo 15 puntos.
3. Urgency: máximo 15 puntos.
4. Problem Clarity: máximo 15 puntos.
5. Budget Fit: máximo 15 puntos.
6. Business Potential: máximo 10 puntos.
7. Channel Fit: máximo 5 puntos.
8. Decision Readiness: máximo 5 puntos.

Debes devolver:
- leadScore
- leadCategory
- confidence
- breakdown
- explanation
- missingData
- recommendedNextStep
- needsHumanEscalation

Reglas:
- No inventes información.
- No asumas presupuesto si no fue informado.
- Si faltan datos, reduce confidence.
- Si faltan datos críticos, marca missingData.
- No clasifiques como hot sin evidencia suficiente.
- No descartes automáticamente si el lead puede aclararse con preguntas.
- No des precios.
- No prometas resultados.
- No cierres ventas.
- No reemplaces la revisión humana.
- Si el lead pide precio, propuesta o quiere empezar pronto, marca needsHumanEscalation como true.
- Si el lead está fuera de alcance, marca serviceFit bajo y explica el motivo.
- Si hay incertidumbre, sé conservador.
```

---

# 11. User Prompt Template — Future Scoring Version

```txt
Analiza el siguiente lead para Apps Marketing / Yoryi AI Studio.

Contexto del negocio:
Apps Marketing / Yoryi AI Studio ofrece landing pages comerciales, desarrollo web, SEO básico, marketing digital, captación de leads, automatización comercial futura, IA aplicada a ventas y sistemas a medida.

ICP:
Pymes, profesionales independientes, consultores, freelancers high-ticket, agencias pequeñas y negocios locales de servicios en LatAm que venden por conversaciones como WhatsApp, DM, formulario o llamadas.

Reglas:
- No inventes datos.
- Usa solo la información disponible.
- Marca datos faltantes.
- Si faltan datos críticos, baja la confianza.
- No des precios.
- No prometas resultados.
- No cierres ventas.
- Sugiere próximo paso.
- Indica si requiere revisión humana.

Datos del lead:
{{lead_data}}

Resumen o conversación:
{{lead_summary_or_conversation}}

Devuelve JSON con:
- leadScore
- leadCategory
- confidence
- breakdown
- explanation
- missingData
- recommendedNextStep
- needsHumanEscalation
```

---

# 12. Scoring Rules by Variable

## 12.1 Service Fit — 0 to 20

Evalúa si la necesidad del prospecto encaja con la oferta.

| Condition | Points |
|---|---:|
| Solicita landing, desarrollo web o captación de leads | 18–20 |
| Solicita SEO, marketing o mejora de conversión | 14–17 |
| Solicita automatización o IA con contexto comercial claro | 12–16 |
| Solicita algo ambiguo pero relacionado | 6–11 |
| Solicita algo fuera del alcance | 0–5 |

## 12.2 ICP Fit — 0 to 15

Evalúa si el prospecto pertenece al cliente ideal.

| Condition | Points |
|---|---:|
| Pyme, profesional o negocio de servicios con venta conversacional | 13–15 |
| Agencia pequeña, consultor o freelancer high-ticket | 11–15 |
| Negocio local con tráfico o pauta digital | 10–14 |
| Negocio parcialmente alineado | 5–9 |
| Fuera del ICP | 0–4 |

## 12.3 Urgency — 0 to 15

Evalúa qué tan pronto quiere iniciar.

| Condition | Points |
|---|---:|
| Quiere empezar esta semana o este mes | 13–15 |
| Quiere empezar en 1–2 meses | 9–12 |
| Está explorando opciones sin fecha clara | 5–8 |
| Solo tiene curiosidad | 0–4 |

## 12.4 Problem Clarity — 0 to 15

Evalúa claridad del problema.

| Condition | Points |
|---|---:|
| Describe problema, objetivo y contexto claramente | 13–15 |
| Tiene problema claro pero faltan detalles | 9–12 |
| Tiene necesidad general pero poco definida | 5–8 |
| No sabe qué necesita ni tiene objetivo claro | 0–4 |

## 12.5 Budget Fit — 0 to 15

Evalúa capacidad o intención de inversión.

| Condition | Points |
|---|---:|
| Tiene presupuesto claro y compatible | 13–15 |
| No indica monto, pero entiende que es inversión profesional | 9–12 |
| Quiere cotizar, pero sin claridad de presupuesto | 5–8 |
| Busca algo muy barato o sin capacidad aparente | 0–4 |

## 12.6 Business Potential — 0 to 10

Evalúa potencial de continuidad.

| Condition | Points |
|---|---:|
| Puede contratar landing + mantenimiento + automatización futura | 8–10 |
| Puede contratar landing o web y luego evolucionar | 6–8 |
| Solo necesita una solución puntual | 3–5 |
| Bajo potencial de continuidad | 0–2 |

## 12.7 Channel Fit — 0 to 5

Evalúa si vende por canales conversacionales.

| Condition | Points |
|---|---:|
| Usa WhatsApp/DM como canal principal | 5 |
| Usa formulario, llamadas o redes como canal relevante | 3–4 |
| No tiene canal conversacional claro | 0–2 |

## 12.8 Decision Readiness — 0 to 5

Evalúa si puede tomar decisión.

| Condition | Points |
|---|---:|
| Es dueño, socio o decisor directo | 5 |
| Participa en la decisión | 3–4 |
| Solo recopila información para otro | 1–2 |
| No tiene poder de decisión | 0 |

---

# 13. Expected JSON Output

```json
{
  "leadScore": 82,
  "leadCategory": "hot",
  "confidence": "high",
  "breakdown": {
    "serviceFit": 18,
    "icpFit": 14,
    "urgency": 15,
    "problemClarity": 13,
    "budgetFit": 12,
    "businessPotential": 8,
    "channelFit": 5,
    "decisionReadiness": 5
  },
  "explanation": "El lead tiene alta intención porque solicita una landing, pertenece al ICP, tiene problema claro y quiere avanzar este mes.",
  "missingData": ["budgetRange"],
  "recommendedNextStep": "Escalar a Yoryi para diagnóstico y propuesta.",
  "needsHumanEscalation": true
}
```

---

# 14. Examples

## 14.1 Hot Lead

### Input

```txt
Tengo una consultora y necesito una landing para captar clientes por WhatsApp. Tengo una web actual, pero no convierte. Quiero resolverlo este mes.
```

### Expected Output

```json
{
  "leadScore": 84,
  "leadCategory": "hot",
  "confidence": "high",
  "breakdown": {
    "serviceFit": 20,
    "icpFit": 15,
    "urgency": 15,
    "problemClarity": 15,
    "budgetFit": 8,
    "businessPotential": 8,
    "channelFit": 5,
    "decisionReadiness": 3
  },
  "explanation": "El lead solicita una landing, pertenece al ICP, tiene problema claro, usa WhatsApp como canal comercial y expresa urgencia para este mes. Falta presupuesto y confirmar si es decisor.",
  "missingData": ["budgetRange", "decisionReadiness"],
  "recommendedNextStep": "Escalar a Yoryi para diagnóstico y propuesta de landing comercial.",
  "needsHumanEscalation": true
}
```

## 14.2 Medium Lead

### Input

```txt
Quiero vender más por internet, pero no sé si necesito web, landing o marketing.
```

### Expected Output

```json
{
  "leadScore": 52,
  "leadCategory": "medium",
  "confidence": "medium",
  "breakdown": {
    "serviceFit": 11,
    "icpFit": 7,
    "urgency": 5,
    "problemClarity": 7,
    "budgetFit": 5,
    "businessPotential": 6,
    "channelFit": 3,
    "decisionReadiness": 3
  },
  "explanation": "El lead tiene una necesidad relacionada con conversión digital, pero falta información sobre tipo de negocio, urgencia, presupuesto y canal actual. Requiere diagnóstico antes de priorizar.",
  "missingData": ["businessType", "urgency", "budgetRange", "currentChannel", "mainGoal"],
  "recommendedNextStep": "Hacer preguntas de diagnóstico para definir si necesita landing, web o marketing.",
  "needsHumanEscalation": false
}
```

## 14.3 Cold Lead

### Input

```txt
Solo estoy mirando ideas, todavía no tengo negocio ni sé qué quiero hacer.
```

### Expected Output

```json
{
  "leadScore": 18,
  "leadCategory": "cold",
  "confidence": "high",
  "breakdown": {
    "serviceFit": 4,
    "icpFit": 2,
    "urgency": 1,
    "problemClarity": 2,
    "budgetFit": 2,
    "businessPotential": 2,
    "channelFit": 0,
    "decisionReadiness": 5
  },
  "explanation": "El usuario no tiene negocio definido, necesidad clara ni urgencia. No encaja todavía con el ICP para una oferta comercial.",
  "missingData": ["businessType", "serviceInterest", "mainProblem", "urgency", "budgetRange"],
  "recommendedNextStep": "Responder de forma simple y ofrecer orientación general sin priorizar seguimiento comercial.",
  "needsHumanEscalation": false
}
```

## 14.4 Pricing Lead

### Input

```txt
¿Cuánto cuesta hacer una landing para mi clínica? Quiero tenerla lista pronto.
```

### Expected Output

```json
{
  "leadScore": 76,
  "leadCategory": "hot",
  "confidence": "medium",
  "breakdown": {
    "serviceFit": 20,
    "icpFit": 13,
    "urgency": 13,
    "problemClarity": 10,
    "budgetFit": 7,
    "businessPotential": 7,
    "channelFit": 3,
    "decisionReadiness": 3
  },
  "explanation": "El lead pide precio para una landing, pertenece a un segmento con potencial y expresa urgencia. Faltan alcance, objetivo, presupuesto y si es decisor.",
  "missingData": ["scope", "mainGoal", "budgetRange", "decisionReadiness"],
  "recommendedNextStep": "Escalar a Yoryi o pedir contexto mínimo para orientar alcance y propuesta.",
  "needsHumanEscalation": true
}
```

## 14.5 Out of Scope Lead

### Input

```txt
Quiero comprar una base de datos para enviar WhatsApp masivo.
```

### Expected Output

```json
{
  "leadScore": 8,
  "leadCategory": "cold",
  "confidence": "high",
  "breakdown": {
    "serviceFit": 1,
    "icpFit": 2,
    "urgency": 3,
    "problemClarity": 2,
    "budgetFit": 0,
    "businessPotential": 0,
    "channelFit": 0,
    "decisionReadiness": 0
  },
  "explanation": "La solicitud está fuera del alcance y puede implicar prácticas no permitidas. No se debe ofrecer compra de bases de datos ni WhatsApp masivo no autorizado.",
  "missingData": [],
  "recommendedNextStep": "Responder de forma segura y redirigir hacia estrategias legítimas de captación y conversión.",
  "needsHumanEscalation": true
}
```

---

# 15. Missing Data Rules

El scoring debe marcar datos faltantes.

Datos relevantes:

- `businessType`
- `businessName`
- `serviceInterest`
- `mainProblem`
- `urgency`
- `budgetRange`
- `currentWebsite`
- `currentChannel`
- `decisionReadiness`
- `contactChannel`

Si falta información, el prompt debe:

- Reducir confianza.
- Evitar score extremo.
- Recomendar pregunta de seguimiento.
- No inventar.

---

# 16. Human Escalation Rules

`needsHumanEscalation` debe ser `true` si:

- El lead score es 70 o más.
- El usuario pide precio.
- El usuario pide propuesta.
- El usuario quiere empezar pronto.
- La consulta es compleja.
- La IA tiene baja confianza.
- La solicitud está fuera de alcance.
- El usuario pide hablar con humano.
- Hay riesgo de prometer algo indebido.

---

# 17. Safety Rules

El scoring no debe:

- Penalizar por datos sensibles no compartidos.
- Pedir documentos personales.
- Pedir datos bancarios.
- Inferir capacidad económica sin evidencia.
- Hacer discriminación por atributos personales.
- Usar información sensible para scoring.
- Clasificar leads usando datos no comerciales.
- Sugerir prácticas invasivas o spam.

---

# 18. Out of Scope Handling

Si el lead pide algo fuera de alcance:

- `serviceFit` debe ser bajo.
- `leadCategory` normalmente será `cold`.
- `recommendedNextStep` debe indicar respuesta segura.
- `needsHumanEscalation` puede ser `true` si hay riesgo.
- No proponer servicios no documentados.
- No convertir el caso en oportunidad comercial falsa.

---

# 19. Scoring Quality Checklist

Un buen scoring debe cumplir:

- [ ] Score total entre 0 y 100.
- [ ] Breakdown suma el score total.
- [ ] Category coincide con rango.
- [ ] Confidence refleja datos disponibles.
- [ ] Explanation es clara.
- [ ] Missing data está marcado.
- [ ] No inventa presupuesto.
- [ ] No inventa urgencia.
- [ ] No promete resultados.
- [ ] Sugiere próximo paso.
- [ ] Escala a humano si corresponde.

---

# 20. Out of Scope for Phase 1

Este prompt no se usará en Fase 1.

No se implementará en Fase 1:

- Lead scoring automático.
- AI Lead Assistant.
- Ollama.
- OpenAI API.
- AIProvider.
- WhatsApp Cloud API.
- Dashboard.
- Resumen automático.
- Clasificación automática.
- Automatizaciones conversacionales.

---

# 21. Implementation Rule

Este documento no autoriza implementación.

Para usar este prompt se requiere:

- Fase aprobada.
- Proveedor IA aprobado.
- ADR actualizado.
- Backend o canal definido.
- Política de privacidad revisada.
- Tests conversacionales.
- Evaluación de calidad.
- Fallback definido.
- Escalamiento humano definido.

---

# 22. Traceability

| Prompt Area | Related Docs | Phase |
|---|---|---:|
| Lead scoring | lead-scoring-spec.md | 4 |
| Lead summary | lead-summary-prompt.md | 4 |
| AI agent behavior | ai-agent-design.md | 4 |
| AI provider | ai-provider-strategy.md | 4 |
| Privacy | security-and-privacy.md | 1 / Future |
| Evaluation | ai-evaluation-set.md, conversation-test-cases.md | 4 |

---

# 23. Final Statement

Este documento define el prompt futuro para lead scoring automático.

En Fase 1 no se calculará lead scoring automático con IA.

El scoring automático será parte de una fase futura vinculada a AI Lead Assistant, backend, dashboard, proveedor IA aprobado y pruebas conversacionales.

Durante Fase 1, la evaluación de leads será manual y observacional.