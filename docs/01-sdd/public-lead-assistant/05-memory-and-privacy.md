# Public Lead Assistant with Local Memory — Memory & Privacy

## Resumen

Definimos el uso de memoria local para mejorar continuidad conversacional sin comprometer privacidad ni crear comportamiento invasivo.

## Qué se guarda

- `visitorKey` anónimo.
- Sesiones de chat públicas.
- Mensajes (visitante/asistente).
- Memoria resumida de contexto comercial.
- Intereses detectados.
- Último tema (`lastTopic`).

## Qué NO se guarda

- Contraseñas.
- Datos bancarios.
- Documentos sensibles.
- Tokens/credenciales.
- Datos no necesarios para orientación comercial.

## visitorKey

- Identificador anónimo local.
- Sirve para continuidad entre sesiones del mismo navegador/visitante.
- No representa usuario autenticado.

## Memoria resumida

- Debe almacenar contexto útil (interés, etapa, urgencia) en formato breve.
- Debe evitar texto literal excesivo o datos sensibles.

## Aviso de privacidad (copy requerido)

> “Este chat puede guardar contexto para mejorar la atención. No compartas contraseñas, datos bancarios ni información sensible.”

## Borrado de memoria

- Debe existir acción explícita para borrar memoria por `visitorKey`.
- Al borrar:
  - se elimina memoria y sesiones asociadas del módulo público,
  - se reinicia contexto conversacional,
  - no afecta leads internos existentes.

## Datos sensibles prohibidos

- Si se detecta contenido sensible, el asistente debe:
  - advertir al usuario,
  - sugerir no compartir ese tipo de dato,
  - continuar con preguntas seguras.

## Límites locales

- Solución pensada para entorno local-first.
- No implica cumplimiento productivo completo (consent management, retention policy avanzada, auditoría legal formal).

## Futuro para producción

Antes de producción debe definirse:
- política de retención,
- consentimiento y base legal,
- controles de acceso,
- cifrado/seguridad reforzada,
- auditoría y trazabilidad.
