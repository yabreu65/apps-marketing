# Phase 27 — Public Language and Form Handoff Policy

## Objetivo
Alinear el lenguaje público de landing + chat con un tono comercial claro para clientes no técnicos y ajustar la política de derivación a formulario/WhatsApp para evitar presión temprana.

## Problema detectado
- En UI pública aparecían términos internos (ej. "leads") que no son claros para visitantes.
- El bloque de handoff podía aparecer demasiado pronto aunque el usuario todavía estaba en diagnóstico inicial.

## Criterio aplicado: lenguaje público vs interno
- Interno (código, DB, dashboard): se mantiene `Lead`, `leadAction`, etc.
- Público (visitor-facing): se reemplaza por lenguaje humano como "consultas", "contactos interesados", "seguimiento de consultas".

## Términos reemplazados (público)
- "Pierdo seguimiento de leads" → "Pierdo seguimiento de consultas"
- "Lead scoring" (UI público) → "Priorización comercial"
- "Sistema de seguimiento de leads" → "Sistema de seguimiento de consultas"
- Textos de secciones públicas con "Leads" → "Consultas" cuando aplica.

## Política de handoff (formulario/WhatsApp)
Se incorporó un gate conversacional en el widget público:

- NO mostrar CTA fuerte de handoff en mensajes muy tempranos/ambiguos.
- Sí mostrar cuando:
  - hay intención alta explícita (precio, propuesta, avanzar, urgencia, etc.), o
  - hay al menos contexto mínimo útil (2+ señales entre negocio, canal, problema/objetivo) y 2+ turnos del visitante.

Esto hace que formulario/WhatsApp aparezcan como consecuencia natural y no como presión inicial.

## Política de formulario
- Prioridad para "Completar formulario" cuando el usuario busca recomendación ordenada/propuesta.

## Política de WhatsApp
- Prioridad para WhatsApp cuando la intención es avanzar rápido o contacto directo.

## Prompt del agente (reglas públicas)
Se reforzó para evitar jerga técnica con visitantes:
- No usar "lead", "lead scoring", "pipeline", "CRM", "handoff", "session", "memoria" en respuestas públicas (salvo pedido explícito del usuario).
- Pedir contexto primero y no forzar CTA en cada respuesta.

## Archivos modificados
- `/Users/yoryiabreu/proyectos/apps-marketing/src/modules/lead-assistant/components/PublicLeadAssistantWidget.tsx`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/modules/lead-assistant/agent/public-sales-agent-prompt.ts`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/modules/lead-assistant/core/suggested-actions.ts`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/modules/lead-assistant/config/appsMarketingAssistantConfig.ts`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/modules/lead-assistant/core/handoff-summary.ts`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/components/sections/AILeadIntelligenceSection.tsx`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/components/sections/ProductShowcaseSection.tsx`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/components/sections/WhyUsSection.tsx`
- `/Users/yoryiabreu/proyectos/apps-marketing/src/components/sections/HeroSection.tsx`

## Validaciones
- `npm run test`
- `npm run lint`
- `npm run build`

## Alcance respetado
- Sin cambios en Prisma/schema/migraciones.
- Sin cambios en auth o endpoints.
- Sin deploy y sin commit.
