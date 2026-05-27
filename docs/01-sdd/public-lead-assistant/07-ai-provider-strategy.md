# Public Lead Assistant — AI Provider Strategy

## Resumen
Estrategia vigente:
- Reglas determinísticas como base.
- Gemini API como proveedor externo principal (opcional por flag).
- OpenAI como alternativa futura.
- Sin Ollama ni modelos locales en runtime.

## Fase activa
- El asistente funciona con reglas locales sin depender de IA externa.
- Cuando Gemini está habilitado, mejora la respuesta comercial sin romper guardrails.

## Fallback
- Si el proveedor externo falla o está deshabilitado, volver a reglas.
- Mantener continuidad del flujo del visitante.

## Restricciones
- No prometer resultados garantizados.
- No inventar precios.
- No afirmar automatizaciones no existentes.
- No ejecutar acciones externas automáticas.

## Cost and reliability
- Llamadas IA solo en eventos de alto valor.
- Sin llamadas por render.
- Reglas siempre disponibles para control de costo y resiliencia.
