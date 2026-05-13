# Security and Privacy — Apps Marketing / Yoryi AI Studio

## 1. Purpose

Este documento define las reglas de seguridad y privacidad del proyecto `apps-marketing`.

La Fase 1 corresponde a una landing comercial con CTA a WhatsApp manual, formulario de contacto, SEO básico, responsive y seguimiento humano/manual.

La Fase 1 no incluye backend completo, dashboard, base de datos obligatoria, AI Lead Assistant, WhatsApp Cloud API, OpenAI API ni Ollama.

Este documento deja preparadas las reglas para proteger datos personales desde el inicio y para escalar de forma segura hacia backend, dashboard, IA, WhatsApp Cloud API y automatizaciones futuras.

Debe mantenerse alineado con:

- `AGENTS.md`
- `docs/01-sdd/sdd-index.md`
- `docs/01-sdd/prd.md`
- `docs/01-sdd/scope.md`
- `docs/01-sdd/functional-requirements.md`
- `docs/01-sdd/non-functional-requirements.md`
- `docs/01-sdd/conversation-flows.md`
- `docs/02-architecture/system-architecture.md`
- `docs/02-architecture/data-model.md`
- `docs/02-architecture/api-contracts.md`
- `docs/02-architecture/ai-agent-design.md`
- `docs/02-architecture/whatsapp-integration.md`
- `docs/02-architecture/ai-provider-strategy.md`

## 2. Scope Context

### Fase 1 incluye

- Landing comercial pública.
- Formulario de contacto básico.
- CTA a WhatsApp manual.
- Seguimiento humano.
- Captura mínima de datos.
- SEO básico.
- Responsive.
- Bajo costo operativo.

### Fase 1 no incluye

- Backend completo obligatorio.
- Base de datos obligatoria.
- Dashboard completo.
- Autenticación.
- Roles.
- CRM avanzado.
- AI Lead Assistant.
- WhatsApp Cloud API.
- OpenAI API.
- Ollama.
- Lead scoring automático.
- Automatizaciones avanzadas.
- Pagos.

## 3. Security and Privacy Principle

El principio rector es:

**Capturar solo los datos necesarios, protegerlos desde el inicio y no usar automatización ni IA sobre datos personales hasta tener reglas claras.**

La seguridad no debe agregarse al final.  
Debe estar presente desde la primera landing.

La privacidad debe guiar:

- Qué datos se piden.
- Por qué se piden.
- Dónde se guardan.
- Quién puede verlos.
- Cuánto tiempo se conservan.
- Qué proveedores externos intervienen.
- Cuándo se puede usar IA sobre esos datos.

## 4. Phase 1 Data Collection

En Fase 1, la landing puede capturar datos mínimos mediante formulario o WhatsApp manual.

### Datos permitidos

| Dato | Uso | Estado |
|---|---|---|
| Nombre | Identificar al prospecto | Permitido |
| Email | Responder consulta | Permitido |
| WhatsApp / teléfono | Responder consulta | Permitido |
| Tipo de negocio | Entender contexto | Permitido |
| Servicio de interés | Orientar seguimiento | Permitido |
| Mensaje o necesidad | Diagnóstico inicial | Permitido |

### Datos no necesarios en Fase 1

No se deben pedir:

- Documento de identidad.
- Datos bancarios.
- Contraseñas.
- Información médica.
- Información legal sensible.
- Dirección exacta si no es necesaria.
- Datos de terceros.
- Archivos confidenciales.
- Información financiera detallada.
- Credenciales de acceso.

## 5. Phase 1 Privacy Rules

En Fase 1:

- Capturar solo datos mínimos.
- Explicar el propósito del formulario.
- No pedir datos sensibles innecesarios.
- No usar datos para IA.
- No enviar datos a OpenAI.
- No enviar datos a Ollama.
- No enviar datos a WhatsApp Cloud API.
- No compartir datos con terceros sin necesidad.
- No almacenar datos en lugares inseguros.
- No exponer datos personales en el frontend.
- No mostrar datos de un lead a otros usuarios.
- No usar conversaciones para entrenamiento sin consentimiento.

## 6. Contact Form Security

Si existe formulario de contacto, debe cumplir reglas mínimas.

### Validaciones básicas

El formulario debe validar:

- Nombre requerido.
- Email o WhatsApp requerido.
- Mensaje requerido.
- Formato básico de email.
- Longitud razonable de campos.
- Evitar campos vacíos.
- Evitar contenido excesivamente largo.
- Evitar payloads sospechosos.

### Protección básica

Según implementación, considerar:

- Validación del lado cliente.
- Validación del lado servidor si existe API.
- Sanitización de inputs.
- Protección anti-spam.
- Rate limiting simple si existe endpoint.
- Honeypot o captcha si el spam se vuelve problema.
- No exponer claves en frontend.
- No guardar secretos en código.

## 7. Contact Form Privacy Message

La landing debería mostrar un texto simple cerca del formulario.

Ejemplo:

```txt
Usaremos tus datos solo para responder tu consulta comercial. No pedimos información sensible ni compartimos tus datos con terceros sin necesidad.
```

Versión corta:

```txt
Tus datos serán usados únicamente para responder esta consulta.
```

## 8. WhatsApp Manual Privacy

En Fase 1, WhatsApp será manual.

### Reglas

- El usuario inicia conversación voluntariamente.
- No se envían campañas.
- No se envían mensajes masivos.
- No se automatiza conversación.
- No se usa WhatsApp Cloud API.
- No se usa bot.
- No se extraen conversaciones automáticamente.
- No se almacena historial automáticamente.
- El seguimiento es humano/manual.

### Recomendación

No pedir por WhatsApp:

- Documentos personales.
- Datos bancarios.
- Contraseñas.
- Información sensible.
- Accesos a cuentas.
- Archivos confidenciales sin necesidad clara y acuerdo previo.

## 9. Phase 1 Data Storage

En Fase 1 no hay base de datos obligatoria.

Los datos pueden estar temporalmente en:

- Email recibido.
- WhatsApp manual.
- Herramienta simple de formularios.
- Registro manual.
- Hoja de cálculo interna, si se decide.

### Reglas

- Evitar almacenamiento duplicado innecesario.
- Evitar compartir hojas públicas.
- Evitar links abiertos sin restricción.
- No publicar datos personales.
- No subir datos de leads a repositorios.
- No poner datos reales en documentación.
- No usar datos reales en pruebas públicas.

## 10. Secrets and Environment Variables

En Fase 1 puede haber pocas o ninguna variable sensible.

Si existen, pueden incluir:

```txt
CONTACT_EMAIL=
FORM_PROVIDER_KEY=
NEXT_PUBLIC_SITE_URL=
```

### Reglas

- No commitear `.env`.
- No exponer claves privadas en frontend.
- No subir secretos a GitHub.
- No pegar tokens en documentación.
- No compartir claves por canales inseguros.
- Usar variables de entorno para secretos.
- Rotar claves si se exponen accidentalmente.

## 11. Frontend Security

La landing debe evitar errores básicos de seguridad.

### Reglas

- No insertar HTML no confiable.
- No usar datos de usuario sin sanitizar.
- No exponer tokens.
- No incluir scripts externos innecesarios.
- No cargar dependencias desconocidas sin revisión.
- No guardar información sensible en localStorage.
- No depender de lógica de seguridad solo en el cliente.
- No mostrar errores técnicos al usuario final.

## 12. Analytics and Tracking

La Fase 1 puede usar analítica básica si se aprueba.

### Permitido

- Medición de visitas.
- Clicks en CTA.
- Formularios enviados.
- Rendimiento.
- Métricas agregadas.

### Reglas

- Evitar recolectar datos innecesarios.
- Evitar tracking invasivo.
- Revisar herramientas antes de usarlas.
- Informar si se requiere aviso de privacidad.
- No enviar datos sensibles a herramientas de analytics.
- No usar datos personales para campañas sin consentimiento.

## 13. Future Backend Security

Cuando exista backend, deberán definirse reglas adicionales.

### Requisitos futuros

- Validación server-side.
- Autenticación.
- Autorización.
- Roles.
- Rate limiting.
- Logs seguros.
- Manejo de errores.
- Protección contra abuso.
- Protección de endpoints.
- Sanitización de inputs.
- Protección de webhooks.
- Variables de entorno.
- Backups si hay base de datos.
- Política de retención.

## 14. Future Dashboard Security

Cuando exista dashboard, se deberá proteger acceso a leads.

### Requisitos futuros

- Login.
- Roles.
- Sesiones seguras.
- Protección de rutas privadas.
- Control de permisos.
- Registro de acciones importantes.
- No exponer leads sin autenticación.
- Logout.
- Manejo seguro de tokens.
- Auditoría básica si aplica.

### Roles futuros posibles

| Rol | Descripción |
|---|---|
| `owner` | Dueño del proyecto |
| `admin` | Administra leads y configuración |
| `operator` | Gestiona seguimiento comercial |

## 15. Future Database Security

Cuando exista PostgreSQL u otra base de datos:

- Usar conexión segura.
- Proteger `DATABASE_URL`.
- No exponer base de datos públicamente.
- Usar backups.
- Validar migraciones.
- Evitar datos reales en seeds públicos.
- Limitar acceso administrativo.
- Definir retención de datos.
- Evitar logs con datos sensibles.
- Separar ambientes: local, staging y producción.

## 16. Future WhatsApp Cloud API Security

Cuando se implemente WhatsApp Cloud API:

- Proteger tokens.
- Validar webhooks.
- Usar variables de entorno.
- No exponer tokens en frontend.
- Verificar payloads.
- Evitar duplicados.
- Manejar errores de proveedor.
- Registrar eventos de forma segura.
- Respetar opt-in y políticas oficiales.
- Definir retención de conversaciones.
- Escalar a humano cuando sea necesario.

## 17. Future AI Privacy

Cuando se implemente IA:

- No enviar datos a modelos sin decisión aprobada.
- No enviar datos sensibles innecesarios.
- No usar conversaciones para entrenamiento sin consentimiento.
- No incluir datos reales en prompts de prueba públicos.
- No revelar prompts internos.
- No revelar datos de otros leads.
- No guardar respuestas de IA sin política clara.
- No permitir que el modelo tome decisiones finales sin humano.
- No usar IA para campañas sin consentimiento.

## 18. Future AI Provider Data Rules

### Ollama

Ollama puede ejecutarse localmente, pero igual requiere reglas:

- Controlar dónde se ejecuta.
- Controlar qué datos recibe.
- Revisar logs locales.
- No asumir que local significa automáticamente seguro.
- Proteger el servidor donde corre.
- No exponer el endpoint local públicamente sin protección.

### OpenAI API

OpenAI API será proveedor opcional futuro.

Antes de usarlo se debe definir:

- Qué datos se envían.
- Por qué se envían.
- Si se envían mensajes completos o resumidos.
- Qué datos se excluyen.
- Qué política aplica.
- Qué consentimiento se requiere.
- Qué costo se acepta.
- Qué fallback existe.

## 19. Data Minimization

El sistema debe aplicar minimización de datos.

### Fase 1

Pedir solo:

- Nombre.
- Canal de contacto.
- Tipo de negocio.
- Servicio de interés.
- Mensaje.

### Futuro

Agregar datos solo si son necesarios para:

- Seguimiento.
- Dashboard.
- Scoring.
- Resumen.
- Automatización.
- Reportes.

No agregar campos “por si acaso” sin justificación.

## 20. Data Retention

### Fase 1

La retención puede ser manual y simple.

Recomendaciones:

- No conservar leads irrelevantes indefinidamente.
- Eliminar datos de prueba.
- Evitar duplicados.
- No usar datos reales en ambientes públicos.
- Revisar periódicamente registros manuales.

### Futuro

Cuando exista backend, definir:

- Tiempo de conservación.
- Eliminación de leads.
- Exportación si aplica.
- Corrección de datos.
- Anonimización si aplica.
- Auditoría.
- Backups.
- Política de retención.

## 21. Data Access Rules

### Fase 1

Acceso limitado a:

- Yoryi / Apps Marketing.
- Herramientas necesarias para responder consultas.

### Futuro

Definir permisos por rol:

| Acción | Owner | Admin | Operator |
|---|---:|---:|---:|
| Ver leads | Sí | Sí | Sí |
| Editar leads | Sí | Sí | Limitado |
| Eliminar leads | Sí | Limitado | No |
| Ver configuración | Sí | Sí | No |
| Exportar datos | Sí | Limitado | No |
| Ver logs | Sí | Limitado | No |

## 22. Logging Rules

### Fase 1

Si hay logs:

- No registrar datos sensibles.
- No registrar secretos.
- No registrar tokens.
- No registrar payloads completos si no es necesario.
- No mostrar errores técnicos al usuario final.

### Futuro

Cuando exista backend:

- Logs de errores.
- Logs de eventos relevantes.
- Logs de seguridad.
- Logs de webhooks.
- Logs de IA sin datos sensibles innecesarios.
- Mecanismo de revisión.

## 23. Error Handling Security

Los errores deben ser seguros.

### Usuario final

Mostrar mensajes claros:

```txt
No pudimos procesar tu solicitud en este momento. Intenta nuevamente o escríbenos por WhatsApp.
```

### No mostrar al usuario

- Stack traces.
- Tokens.
- Variables de entorno.
- Detalles internos de servidor.
- Información de otros leads.
- Payloads completos.

## 24. Spam and Abuse Protection

La Fase 1 debe considerar abuso básico del formulario.

Medidas posibles:

- Validación de campos.
- Honeypot.
- Captcha si es necesario.
- Rate limiting si hay endpoint.
- Bloqueo de payloads excesivos.
- Revisión manual de mensajes sospechosos.

## 25. File Uploads

La Fase 1 no debe incluir carga de archivos.

Si en el futuro se habilitan uploads:

- Validar tipo de archivo.
- Validar tamaño.
- Escanear riesgos si aplica.
- No ejecutar archivos.
- Guardar en almacenamiento seguro.
- Controlar acceso.
- Definir retención.
- Evitar archivos sensibles innecesarios.

## 26. Payment Data

La Fase 1 no incluye pagos.

No se deben capturar:

- Tarjetas.
- Cuentas bancarias.
- Datos de pago.
- Información financiera sensible.

Si en el futuro se implementan pagos:

- Usar proveedor especializado.
- No almacenar tarjetas directamente.
- Cumplir reglas del proveedor.
- Separar datos comerciales de datos de pago.

## 27. Production Readiness Security Checklist

Antes de publicar Fase 1:

- [ ] No hay secretos en el código.
- [ ] No hay `.env` commiteado.
- [ ] Formulario valida campos mínimos.
- [ ] No se piden datos sensibles.
- [ ] WhatsApp es manual.
- [ ] No hay IA activa.
- [ ] No hay WhatsApp Cloud API.
- [ ] No hay backend complejo no aprobado.
- [ ] SEO básico no expone datos privados.
- [ ] Errores no muestran detalles técnicos.
- [ ] Links de contacto funcionan.
- [ ] Si hay analytics, no recolecta datos innecesarios.
- [ ] Si hay proveedor de formulario, está documentado.
- [ ] Si hay almacenamiento de leads, está justificado.

## 28. Future Security Checklist

Antes de activar backend, dashboard, IA o WhatsApp Cloud API:

- [ ] ADR aprobado.
- [ ] Requisitos actualizados.
- [ ] API contracts actualizados.
- [ ] Data model actualizado.
- [ ] Política de privacidad revisada.
- [ ] Variables de entorno definidas.
- [ ] Auth definida si aplica.
- [ ] Roles definidos si aplica.
- [ ] Webhooks protegidos si aplica.
- [ ] Proveedor IA revisado si aplica.
- [ ] Costos revisados si aplica.
- [ ] QA de seguridad definido.
- [ ] Estrategia de fallback definida.
- [ ] Reglas de retención definidas.

## 29. Security Risks

| Riesgo | Fase | Mitigación |
|---|---:|---|
| Pedir demasiados datos en formulario | 1 | Captura mínima |
| Exponer secretos en frontend | 1 | Variables de entorno |
| Spam en formulario | 1 | Validación / honeypot / captcha si aplica |
| Confundir WhatsApp manual con automatización | 1 | Copy claro |
| Guardar leads sin política | 1 / Futuro | Reglas de retención |
| Enviar datos a IA sin control | Futuro | ADR + minimización |
| Webhook WhatsApp inseguro | Futuro | Validación y secretos |
| Dashboard sin auth | Futuro | Autenticación y roles |
| Logs con datos sensibles | Futuro | Logging seguro |
| Scope creep técnico | Todas | SDD + ADR |

## 30. Out of Scope for Phase 1

No se implementará en Fase 1:

- Autenticación.
- Roles.
- Dashboard privado.
- Base de datos obligatoria.
- WhatsApp Cloud API.
- AI Lead Assistant.
- OpenAI API.
- Ollama.
- Pagos.
- Uploads.
- CRM avanzado.
- Automatizaciones.
- Mensajería masiva.
- Scoring automático.
- Resúmenes automáticos.
- Almacenamiento automático de conversaciones.

## 31. Traceability

| Security Area | Related Docs | Phase |
|---|---|---:|
| Formulario básico | functional-requirements.md, non-functional-requirements.md | 1 |
| Privacidad formulario | data-model.md, non-functional-requirements.md | 1 |
| WhatsApp manual | whatsapp-integration.md, conversation-flows.md | 1 |
| Backend futuro | api-contracts.md, data-model.md | 2 / 3 |
| Dashboard futuro | system-architecture.md, data-model.md | 3 |
| AI futura | ai-agent-design.md, ai-provider-strategy.md | 4 |
| WhatsApp Cloud API futura | whatsapp-integration.md, api-contracts.md | 4 |
| Lead scoring futuro | lead-scoring-spec.md | 4 |
| Riesgos | risk-register.md | Todas |

## 32. Implementation Rule

Este documento no autoriza implementación de backend, dashboard, IA ni WhatsApp Cloud API.

Para implementar módulos que procesen datos personales de forma estructurada se requiere:

- Fase aprobada.
- SDD actualizada.
- ADR aprobado.
- Revisión de privacidad.
- Revisión de seguridad.
- QA correspondiente.
- Definición de retención.
- Definición de acceso.
- Definición de proveedores externos.

## 33. Final Statement

En Fase 1, la seguridad y privacidad se enfocan en capturar datos mínimos mediante formulario o WhatsApp manual, evitar datos sensibles, proteger secretos, validar entradas básicas y no usar IA ni automatización sobre datos personales.

Backend, dashboard, base de datos, WhatsApp Cloud API, Ollama, OpenAI API, AI Lead Assistant, lead scoring automático, almacenamiento de conversaciones y automatizaciones quedan como capacidades futuras que requieren revisión formal de seguridad, privacidad, SDD y ADR antes de implementación.