# Change Proposal — Improve Public Chat Conversion Intelligence

## Problem

El chat público orienta bien, pero no maximiza conversión a lead cuando el visitante no llega a WhatsApp ni formulario.

## Goal

Incrementar la tasa de conversión de visitantes del chat a contacto real (formulario o WhatsApp manual) sin salir del alcance actual del proyecto.

## In Scope

1. Mejorar flujo de conversación para cierre comercial en 2-3 turnos.
2. CTA adaptativo según intención y estado de conversación.
3. Captura asistida mínima en chat (nombre + medio de contacto) como paso opcional.
4. Señales de prioridad comercial (urgencia, claridad, timing) para ordenar follow-up.
5. Métricas de funnel del chat (apertura, interacción, click CTA, envío).

## Out of Scope

- WhatsApp Cloud API / automatización oficial.
- CRM completo.
- Promesas automáticas de scoring final sin validación humana.

## Success Metrics

- +20% click-through a CTA principal desde chat.
- +15% envíos de formulario iniciados desde chat.
- Menor abandono después del segundo turno.

## Risks

- Fricción si se pide demasiada info temprano.
- Sobrecarga de CTAs si no hay jerarquía clara.
- Falsos positivos en clasificación de intención.

## Mitigations

- Pedir datos solo después de valor inicial.
- Un CTA primario contextual + opciones secundarias discretas.
- Mantener fallback por reglas y validación por tests.

## Rollout

1. Etapa 1: CTA adaptativo + mini cierre.
2. Etapa 2: scoring de señales + resumen enriquecido.
3. Etapa 3: métricas y ajuste por datos reales.
