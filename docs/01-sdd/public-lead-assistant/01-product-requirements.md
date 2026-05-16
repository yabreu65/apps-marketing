# Public Lead Assistant with Local Memory — Product Requirements (Fase 22.0)

## Resumen

Definimos el MVP local de un asistente comercial público para la landing, con memoria básica por visitante y enfoque consultivo. El objetivo es orientar mejor, diagnosticar intención y derivar a formulario o WhatsApp manual sin automatizaciones externas.

## Problema

Hoy el chat público orienta de forma limitada y no recuerda contexto previo del visitante. Eso genera:
- repreguntas repetidas,
- poca continuidad comercial,
- menor calidad de diagnóstico,
- menor tasa de derivación a CTA de contacto.

## Objetivo

Construir un asistente conversacional público, local-first, que:
1. detecte intención comercial,
2. guarde memoria mínima no sensible,
3. recomiende camino por fases,
4. derive a CTA correcto (formulario / WhatsApp manual),
5. opere con reglas por defecto y Ollama opcional.

## Alcance

Incluye:
- chat público consultivo en landing,
- `visitorKey` anónimo,
- sesiones y mensajes,
- memoria resumida por visitante,
- detección de intención mínima,
- estrategia de respuesta por reglas,
- proveedor IA local opcional (Ollama) con fallback,
- aviso de privacidad y borrado de memoria,
- CTA a formulario y WhatsApp manual.

## Fuera de alcance

No incluye:
- WhatsApp Cloud API / Meta API,
- envío real de mensajes,
- OpenAI,
- automatizaciones de seguimiento,
- despliegue productivo,
- Vercel setup,
- auth/roles nuevos,
- pricing automático,
- CRM completo,
- promesas de resultados garantizados.

## Usuarios objetivo

- **Visitante comercial**: busca orientación para su caso.
- **Negocio potencial**: necesita claridad sobre qué construir primero.
- **Equipo interno comercial**: requiere mejor contexto en leads derivados.

## Valor comercial esperado

- Mayor claridad en descubrimiento inicial.
- Mejor match entre necesidad real e implementación sugerida.
- Mayor conversión hacia formulario/WhatsApp manual.
- Menos respuestas genéricas y menor fricción al retornar al chat.

## Riesgos

1. **Memoria invasiva**: percepción negativa si no hay transparencia.
2. **Sugerencias erróneas por IA**: mitigado con reglas + fallback.
3. **Sobreventa de IA**: mitigado con copy y guardrails.
4. **Datos sensibles en chat**: mitigado con aviso explícito y filtrado.
5. **Dependencia de Ollama local**: mitigado con modo reglas por defecto.

## Dependencias

- Infra local actual (Next.js + APIs internas + DB local).
- Modelo de conversación interna ya implementado (para patrones de diseño).
- Estrategia de IA local ya usada en summary/suggestion internas.

## Definición de MVP local

MVP exitoso si:
- el visitante puede iniciar y continuar conversación,
- el sistema recuerda interés previo (sin ser invasivo),
- clasifica intención mínima requerida,
- sugiere camino por fases correcto por caso,
- deriva a CTA final,
- permite borrar memoria,
- funciona sin Ollama (reglas) y con Ollama opcional,
- no hace envíos reales ni automatizaciones.
