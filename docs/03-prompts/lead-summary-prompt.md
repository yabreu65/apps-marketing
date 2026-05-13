# Lead Summary Prompt — Apps Marketing / Yoryi AI Studio

## 1. Purpose

Este documento define el prompt futuro para generar resúmenes comerciales de leads dentro del proyecto `apps-marketing`.

Este prompt será utilizado en fases futuras por AI Lead Assistant o por un módulo interno de análisis de leads.

No forma parte de la Fase 1.

La Fase 1 corresponde únicamente a:

- Landing comercial.
- CTA a WhatsApp manual.
- Formulario de contacto.
- SEO básico.
- Responsive.
- Seguimiento humano/manual.

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
- `docs/03-prompts/lead-scoring-prompt.md`
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
- Resumen automático.
- Lead scoring automático.
- Clasificación automática de intención.
- Dashboard.
- Automatizaciones de seguimiento.

Para usar este prompt en producción se requiere:

- Fase aprobada.
- ADR de proveedor IA aprobado.
- Backend o canal aprobado.
- Política de privacidad revisada.
- Evaluación de calidad.
- Tests conversacionales.
- Estrategia de escalamiento humano.

---

# 3. Summary Goal

El objetivo del resumen comercial es transformar una conversación o formulario en una síntesis útil para seguimiento humano.

El resumen debe ayudar a Yoryi / Apps Marketing a entender rápidamente:

- Quién es el prospecto.
- Qué tipo de negocio tiene.
- Qué necesita.
- Qué problema quiere resolver.
- Qué servicio parece más adecuado.
- Qué nivel de urgencia tiene.
- Qué datos faltan.
- Qué próximo paso se recomienda.
- Si debe escalarse a humano.

El resumen no debe inventar información faltante.

---

# 4. Summary Principles

El resumen debe ser:

- Breve.
- Claro.
- Comercialmente útil.
- Fiel a la información recibida.
- Sin inventar datos.
- Sin exagerar intención.
- Sin prometer resultados.
- Orientado a próximo paso.
- Fácil de leer por una persona.

El resumen no debe ser:

- Una transcripción completa.
- Un texto largo sin estructura.
- Una interpretación inventada.
- Una propuesta comercial final.
- Un precio.
- Un cierre de venta.
- Un diagnóstico técnico profundo sin datos.

---

# 5. Future Use Cases

Este prompt podrá usarse en fases futuras para resumir:

- Formularios de contacto.
- Conversaciones con AI Lead Assistant.
- Conversaciones de WhatsApp Cloud API.
- Chats web futuros.
- Notas comerciales.
- Mensajes largos de prospectos.
- Historial breve de seguimiento.

---

# 6. Summary Input

El prompt podrá recibir información como:

```json
{
  "lead": {
    "name": "Carlos Pérez",
    "businessName": "CP Consultores",
    "businessType": "Consultoría",
    "serviceInterest": "landing_page",
    "source": "whatsapp",
    "urgency": "this_month",
    "budgetRange": null
  },
  "messages": [
    {
      "senderType": "lead",
      "content": "Hola, tengo una consultora y necesito una landing para captar más clientes por WhatsApp."
    },
    {
      "senderType": "assistant",
      "content": "Perfecto. ¿Ya tienes una web o landing actual?"
    },
    {
      "senderType": "lead",
      "content": "Tengo una web vieja, pero no convierte. Quiero mejorar este mes."
    }
  ]
}