# Public Lead Assistant with Local Memory — User Stories

## Resumen

Historias base para el MVP local del asistente público, priorizando diagnóstico comercial, continuidad de contexto y derivación responsable.

## Historias

### US-001 — Orientación inicial
**Como visitante**, quiero que el chat me ayude a entender qué tipo de solución necesito, para no perder tiempo decidiendo entre landing, web, dashboard o IA.

**Criterios básicos**
- El asistente responde en tono consultivo.
- Explica diferencias de caminos sin vender IA de entrada.
- Termina con próxima pregunta o CTA útil.

---

### US-002 — Diagnóstico por intención
**Como visitante**, quiero que el chat detecte si mi problema es de captación, seguimiento o validación de producto, para recibir recomendación adecuada.

**Criterios básicos**
- Clasifica al menos las intenciones mínimas definidas.
- Caso `lead_followup_priority` prioriza dashboard/organización, no landing inicial.

---

### US-003 — Continuidad por memoria
**Como visitante recurrente**, quiero que el chat recuerde mi interés previo, para no repetir todo desde cero.

**Criterios básicos**
- Reconoce contexto previo por `visitorKey`.
- Menciona interés anterior de forma natural y breve.
- Permite seguir desde el punto anterior.

---

### US-004 — Control de privacidad
**Como visitante**, quiero poder borrar la memoria del chat, para tener control de mis datos conversacionales.

**Criterios básicos**
- Existe acción clara de “borrar memoria”.
- Se confirma el borrado.
- El contexto se reinicia.

---

### US-005 — Derivación comercial
**Como negocio potencial**, quiero terminar en un siguiente paso claro, para avanzar con diagnóstico real.

**Criterios básicos**
- CTA consistente a formulario o WhatsApp manual.
- No promete seguimiento automático ni mensajes automáticos.

---

### US-006 — Consulta de precio
**Como visitante**, quiero entender cómo estimar costo sin recibir números inventados, para evaluar viabilidad.

**Criterios básicos**
- No inventa precio fijo.
- Pide variables de alcance.
- Deriva a diagnóstico comercial.

---

### US-007 — Asistencia humana
**Como visitante**, quiero pedir ayuda humana directa, para resolver dudas complejas.

**Criterios básicos**
- Detecta intención `human_help`.
- Ofrece contacto manual claro.

---

### US-008 — Robustez de sistema
**Como sistema**, quiero fallback por reglas cuando Ollama no esté disponible, para no romper la experiencia.

**Criterios básicos**
- Si IA local falla, responde por reglas.
- No expone errores crudos al visitante.

---

### US-009 — Operación interna responsable
**Como operador interno**, quiero que el chat no ejecute acciones automáticas sobre leads, para mantener control humano.

**Criterios básicos**
- No crea ni envía mensajes externos automáticamente.
- No cambia estado de leads por sí solo.
- No persiste sugerencias sin acción explícita.
