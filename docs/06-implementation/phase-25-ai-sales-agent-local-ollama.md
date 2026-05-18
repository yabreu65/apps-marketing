# Phase 2.5 — AI Sales Agent local con Ollama

## Objetivo
Implementar una primera arquitectura de agente comercial para el chat público usando Ollama local, con fallback seguro por reglas.

## Alcance implementado
- Agent Orchestrator para chat público:
  - `/Users/yoryiabreu/proyectos/apps-marketing/src/modules/lead-assistant/agent/public-sales-agent.ts`
- Prompt comercial del agente:
  - `/Users/yoryiabreu/proyectos/apps-marketing/src/modules/lead-assistant/agent/public-sales-agent-prompt.ts`
- Cliente local de Ollama:
  - `/Users/yoryiabreu/proyectos/apps-marketing/src/modules/lead-assistant/agent/ollama-agent-client.ts`
- Herramientas de validación y upsert controlado de lead:
  - `/Users/yoryiabreu/proyectos/apps-marketing/src/modules/lead-assistant/agent/agent-tools.ts`
- Cargador de conocimiento en markdown:
  - `/Users/yoryiabreu/proyectos/apps-marketing/src/modules/lead-assistant/agent/knowledge-loader.ts`
- Base de conocimiento inicial:
  - `/Users/yoryiabreu/proyectos/apps-marketing/src/modules/lead-assistant/knowledge/services.md`
  - `/Users/yoryiabreu/proyectos/apps-marketing/src/modules/lead-assistant/knowledge/business-types.md`
  - `/Users/yoryiabreu/proyectos/apps-marketing/src/modules/lead-assistant/knowledge/qualification.md`
  - `/Users/yoryiabreu/proyectos/apps-marketing/src/modules/lead-assistant/knowledge/objections.md`
  - `/Users/yoryiabreu/proyectos/apps-marketing/src/modules/lead-assistant/knowledge/handoff.md`
  - `/Users/yoryiabreu/proyectos/apps-marketing/src/modules/lead-assistant/knowledge/limits.md`

## Integración
Se integró el nuevo orquestador en:
- `/Users/yoryiabreu/proyectos/apps-marketing/src/modules/lead-assistant/server/public-chat-service.ts`

Flujo:
1. Se recibe mensaje del visitante
2. Se construye decisión comercial + fallback por reglas
3. Se invoca Ollama con prompt estructurado y conocimiento
4. Se valida respuesta (guardrails)
5. Se guarda conversación y memoria
6. Se crea/actualiza lead de forma controlada cuando el agente lo indica
7. Si falla Ollama, se usa fallback por reglas

## Variables de entorno
- `LEAD_AGENT_ENABLED=true`
- `LEAD_AGENT_PROVIDER=ollama`
- `OLLAMA_BASE_URL=http://localhost:11434`
- `OLLAMA_MODEL=llama3:latest`
- `LEAD_AGENT_FALLBACK_ENABLED=true`

## Restricciones respetadas
- Sin OpenAI
- Sin Claude
- Sin WhatsApp Cloud API real
- Sin envío automático por WhatsApp
- Sin acciones libres del modelo sin validación backend
