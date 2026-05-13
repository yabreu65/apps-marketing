# QA Matrix — Apps Marketing / Yoryi AI Studio

## 1. Purpose

Este documento define la matriz principal de pruebas del proyecto `apps-marketing`.

La Fase 1 corresponde a la landing comercial de Apps Marketing / Yoryi AI Studio.

El objetivo de esta matriz es asegurar que la landing cumpla con los requisitos funcionales, no funcionales, criterios de aceptación y límites de alcance definidos en la SDD.

Este documento también deja preparadas pruebas futuras para backend, dashboard, AI Lead Assistant, WhatsApp Cloud API, lead scoring y automatizaciones.

Debe mantenerse alineado con:

- `AGENTS.md`
- `docs/01-sdd/sdd-index.md`
- `docs/01-sdd/prd.md`
- `docs/01-sdd/scope.md`
- `docs/01-sdd/user-stories.md`
- `docs/01-sdd/acceptance-criteria.md`
- `docs/01-sdd/functional-requirements.md`
- `docs/01-sdd/non-functional-requirements.md`
- `docs/02-architecture/system-architecture.md`
- `docs/02-architecture/security-and-privacy.md`
- `docs/04-tests/regression-checklist.md`
- `docs/04-tests/release-checklist.md`

---

# 2. Scope Context

## Fase 1 incluye

- Landing comercial.
- Hero comercial.
- Propuesta de valor.
- Servicios.
- Casos de uso.
- Beneficios.
- Proceso de trabajo.
- CTA a WhatsApp manual.
- Formulario de contacto.
- SEO básico.
- Responsive design.
- Performance básica.
- Seguridad y privacidad básica.
- Medición inicial de conversión.
- Preparación para evolución futura.

## Fase 1 no incluye

- AI Lead Assistant.
- WhatsApp Cloud API.
- OpenAI API.
- Ollama.
- Lead scoring automático.
- Dashboard completo.
- CRM avanzado.
- Automatizaciones avanzadas.
- Pagos.
- Backend completo obligatorio.

---

# 3. QA Principle

El principio rector de QA es:

**Probar que la Fase 1 cumple su objetivo comercial sin invadir fases futuras.**

La matriz debe validar:

- Claridad comercial.
- Conversión.
- Funcionalidad básica.
- Responsive.
- SEO.
- Performance.
- Seguridad básica.
- Privacidad.
- No dependencia de IA.
- No dependencia de WhatsApp Cloud API.
- No scope creep.

---

# 4. Test Types

La Fase 1 debe considerar estos tipos de pruebas:

| Tipo | Descripción | Fase |
|---|---|---:|
| Content QA | Revisión de copy, mensaje y claridad | 1 |
| Functional QA | Pruebas de CTA, formulario y navegación | 1 |
| Responsive QA | Validación mobile, tablet y desktop | 1 |
| SEO QA | Revisión de metadatos y estructura semántica | 1 |
| Performance QA | Carga, Core Web Vitals, peso visual | 1 |
| Accessibility QA | Contraste, labels, legibilidad y navegación básica | 1 |
| Security QA | Formulario, secretos, datos sensibles | 1 |
| Privacy QA | Captura mínima y uso claro de datos | 1 |
| Scope QA | Confirmar que no se implementan módulos futuros | 1 |
| AI QA | Evaluación futura del AI Lead Assistant | Futuro |

---

# 5. Phase 1 QA Matrix

| ID | Área | Caso de prueba | Validación esperada | Related AC | Related FR | Related NFR | Prioridad | Estado |
|---|---|---|---|---|---|---|---|---|
| QA-001 | Hero | Verificar que el hero comunica qué hace Apps Marketing / Yoryi AI Studio | El visitante entiende oferta, público y beneficio principal | AC-01, AC-02 | FR-01, FR-02 | NFR-04, NFR-11 | Alta | Activo |
| QA-002 | Hero | Verificar CTA principal visible en hero | CTA visible y orientado a conversión | AC-01, AC-06 | FR-01, FR-10 | NFR-04 | Alta | Activo |
| QA-003 | Claridad | Test de comprensión en menos de 10 segundos | Usuario responde qué ofrece, para quién es y qué acción tomar | AC-02 | FR-02, FR-03, FR-04 | NFR-04 | Alta | Activo |
| QA-004 | ICP | Verificar que el público objetivo está claro | La landing habla a pymes, profesionales, consultores, agencias pequeñas y negocios de servicios | AC-03 | FR-03 | NFR-04 | Alta | Activo |
| QA-005 | Problema | Verificar que el problema principal está explicado | Se entiende el dolor: tráfico/interés sin conversión ni sistema claro | AC-02, AC-03 | FR-04 | NFR-04 | Alta | Activo |
| QA-006 | Solución | Verificar que la solución se presenta como landing + captación manual | No se vende IA como funcionalidad activa | AC-04, AC-12, AC-13 | FR-05, FR-18 | NFR-06, NFR-14 | Alta | Activo |
| QA-007 | Servicios | Verificar que los servicios principales son visibles | Landing, web, SEO, marketing, automatización futura e IA futura están correctamente diferenciados | AC-04 | FR-06 | NFR-04, NFR-14 | Alta | Activo |
| QA-008 | Casos de uso | Verificar casos de uso por segmento | Casos ayudan al visitante a identificarse | AC-04 | FR-07 | NFR-04 | Media | Activo |
| QA-009 | Beneficios | Verificar beneficios concretos | Beneficios claros sin promesas exageradas | AC-04, AC-05 | FR-08 | NFR-04, NFR-11 | Alta | Activo |
| QA-010 | Proceso | Verificar proceso de trabajo | Diagnóstico, propuesta, diseño/copy, desarrollo, publicación y optimización son entendibles | AC-05 | FR-09 | NFR-04 | Media | Activo |
| QA-011 | WhatsApp | Verificar CTA a WhatsApp manual | Link abre WhatsApp o WhatsApp Web correctamente | AC-06, AC-07 | FR-10 | NFR-02 | Alta | Activo |
| QA-012 | WhatsApp | Verificar mensaje precargado si existe | Mensaje es claro, comercial y no promete automatización | AC-06 | FR-10, FR-19 | NFR-14 | Media | Activo |
| QA-013 | WhatsApp | Confirmar que no se usa WhatsApp Cloud API | No hay webhooks, tokens, templates ni automatización | AC-12, AC-13 | FR-19 | NFR-06, NFR-14, NFR-15 | Alta | Activo |
| QA-014 | Formulario | Verificar campos mínimos | Nombre, email o WhatsApp, tipo de negocio, servicio de interés y mensaje están disponibles | AC-08 | FR-12 | NFR-09, NFR-10 | Alta | Activo |
| QA-015 | Formulario | Verificar validación básica | Campos requeridos y formato de email se validan | AC-08 | FR-13 | NFR-05, NFR-09 | Alta | Activo |
| QA-016 | Formulario | Verificar confirmación de envío | Usuario recibe mensaje claro de éxito o error | AC-08, AC-11 | FR-14 | NFR-05 | Alta | Activo |
| QA-017 | Formulario | Verificar que no se piden datos sensibles | No se piden documentos, contraseñas, datos bancarios ni datos innecesarios | AC-08, AC-12 | FR-12, FR-13 | NFR-09, NFR-10 | Alta | Activo |
| QA-018 | Contacto | Verificar rutas claras de contacto | Usuario puede contactar por WhatsApp o formulario sin fricción | AC-07 | FR-10, FR-11, FR-12 | NFR-02 | Alta | Activo |
| QA-019 | Responsive | Verificar mobile | Landing funciona correctamente en mobile sin desbordes | AC-09 | FR-10, FR-12, FR-16 | NFR-02 | Alta | Activo |
| QA-020 | Responsive | Verificar tablet | Layout se adapta correctamente a tablet | AC-09 | FR-10, FR-12 | NFR-02 | Media | Activo |
| QA-021 | Responsive | Verificar desktop | Landing se ve correctamente en desktop | AC-09 | FR-01, FR-02, FR-06, FR-08, FR-09, FR-15, FR-16 | NFR-02, NFR-11, NFR-12 | Alta | Activo |
| QA-022 | SEO | Verificar title y meta description | Title y meta description existen y están alineados al servicio | AC-10 | FR-16 | NFR-03 | Alta | Activo |
| QA-023 | SEO | Verificar headings semánticos | Existe un solo H1 y jerarquía correcta H2/H3 | AC-10 | FR-16 | NFR-03 | Alta | Activo |
| QA-024 | SEO | Verificar Open Graph básico | La página se comparte con título, descripción e imagen si aplica | AC-10 | FR-16 | NFR-03 | Media | Activo |
| QA-025 | SEO | Verificar contenido indexable | El contenido principal no está solo en imágenes | AC-10 | FR-16 | NFR-03 | Alta | Activo |
| QA-026 | Performance | Verificar carga inicial | Landing carga rápido y sin dependencias innecesarias | AC-09, AC-11 | FR-16, FR-17 | NFR-01 | Alta | Activo |
| QA-027 | Performance | Verificar Core Web Vitals | LCP, CLS e INP están en verde o rango aceptable | AC-10, AC-11 | FR-16, FR-17 | NFR-01 | Alta | Activo |
| QA-028 | Accessibility | Verificar contraste y legibilidad | Texto y CTAs son legibles | AC-09, AC-10 | FR-01, FR-12, FR-16 | NFR-05 | Media | Activo |
| QA-029 | Accessibility | Verificar labels del formulario | Campos tienen labels o descripciones claras | AC-08 | FR-12, FR-13 | NFR-05 | Alta | Activo |
| QA-030 | Accessibility | Verificar navegación básica con teclado si aplica | CTAs y formulario son accesibles razonablemente | AC-08, AC-09 | FR-10, FR-12 | NFR-05 | Media | Activo |
| QA-031 | Security | Verificar que no hay secretos expuestos | No hay tokens, API keys ni `.env` en frontend/repositorio | AC-12, AC-13 | FR-18, FR-19 | NFR-09, NFR-15 | Alta | Activo |
| QA-032 | Security | Verificar errores seguros del formulario | No se muestran stack traces ni errores internos | AC-08 | FR-13, FR-14 | NFR-09 | Alta | Activo |
| QA-033 | Privacy | Verificar mensaje de privacidad del formulario | Se informa uso básico de datos para responder consulta | AC-08, AC-11 | FR-12 | NFR-10 | Media | Activo |
| QA-034 | Privacy | Verificar captura mínima | Solo se piden datos necesarios para contacto comercial | AC-08, AC-12 | FR-12 | NFR-09, NFR-10 | Alta | Activo |
| QA-035 | Scope | Confirmar que no existe AI Lead Assistant activo | No hay chatbot IA ni prompts productivos ejecutándose | AC-13 | FR-18 | NFR-06, NFR-14, NFR-15 | Alta | Activo |
| QA-036 | Scope | Confirmar que no se usa OpenAI/Ollama | No hay llamadas ni dependencias productivas de IA | AC-13 | FR-18 | NFR-06, NFR-14 | Alta | Activo |
| QA-037 | Scope | Confirmar que no hay dashboard completo | No se implementa panel administrativo en Fase 1 | AC-12 | FR-18, FR-20 | NFR-06, NFR-15 | Alta | Activo |
| QA-038 | Scope | Confirmar que no hay pagos | No hay checkout, Stripe, MercadoPago ni suscripciones | AC-12 | FR-18 | NFR-06, NFR-15 | Media | Activo |
| QA-039 | Medición | Verificar medición de conversión inicial | Se puede revisar clicks WhatsApp, formularios o métricas manuales | AC-11 | FR-17 | NFR-13 | Media | Activo |
| QA-040 | Evolución futura | Verificar separación fase actual/futuro | El copy y arquitectura diferencian capacidades actuales de futuras | AC-14 | FR-20 | NFR-07, NFR-08, NFR-14, NFR-15 | Alta | Activo |

---

# 6. Phase 1 Manual Test Checklist

## 6.1 Content QA

- [ ] El hero explica claramente la oferta.
- [ ] El ICP está representado.
- [ ] El problema está claro.
- [ ] La solución está clara.
- [ ] Los servicios están visibles.
- [ ] Los beneficios son concretos.
- [ ] El proceso de trabajo se entiende.
- [ ] El tono es profesional y cercano.
- [ ] No se prometen resultados garantizados.
- [ ] No se vende AI Lead Assistant como activo en Fase 1.

## 6.2 Functional QA

- [ ] CTA principal visible.
- [ ] CTA WhatsApp abre correctamente.
- [ ] Mensaje precargado funciona si aplica.
- [ ] Formulario visible.
- [ ] Formulario valida campos requeridos.
- [ ] Formulario muestra confirmación o error.
- [ ] Footer contiene información mínima.
- [ ] Navegación entre secciones funciona si aplica.

## 6.3 Responsive QA

- [ ] Mobile sin desbordes.
- [ ] Tablet sin desbordes.
- [ ] Desktop correcto.
- [ ] CTAs tocables en mobile.
- [ ] Formulario usable en mobile.
- [ ] Textos legibles.
- [ ] Imágenes o elementos visuales no rompen layout.

## 6.4 SEO QA

- [ ] Title definido.
- [ ] Meta description definida.
- [ ] H1 único.
- [ ] Headings ordenados.
- [ ] Open Graph básico.
- [ ] Contenido indexable.
- [ ] URLs limpias.
- [ ] Sitemap/robots si aplica.

## 6.5 Performance QA

- [ ] Imágenes optimizadas.
- [ ] No hay scripts innecesarios.
- [ ] No hay dependencias pesadas sin justificación.
- [ ] Core Web Vitals en verde o rango aceptable.
- [ ] Carga inicial aceptable en mobile.
- [ ] Animaciones no afectan usabilidad.

## 6.6 Security and Privacy QA

- [ ] No hay secretos en código.
- [ ] No hay `.env` commiteado.
- [ ] No se piden datos sensibles.
- [ ] Formulario usa validación básica.
- [ ] Mensajes de error son seguros.
- [ ] No se exponen datos personales.
- [ ] Si hay analytics, no recolecta datos innecesarios.
- [ ] Si hay proveedor de formulario, está documentado.

## 6.7 Scope QA

- [ ] No hay AI Lead Assistant activo.
- [ ] No hay WhatsApp Cloud API.
- [ ] No hay Ollama.
- [ ] No hay OpenAI API.
- [ ] No hay lead scoring automático.
- [ ] No hay dashboard completo.
- [ ] No hay CRM avanzado.
- [ ] No hay pagos.
- [ ] No hay automatizaciones avanzadas.

---

# 7. Future QA Matrix — No Fase 1

Estos casos quedan documentados para fases futuras.  
No autorizan implementación en Fase 1.

| ID | Área futura | Caso de prueba | Resultado esperado | Future Phase |
|---|---|---|---|---:|
| FQA-001 | Backend | Crear lead mediante API | Lead creado y validado | 2 / 3 |
| FQA-002 | Backend | Listar leads | Lista paginada disponible | 3 |
| FQA-003 | Backend | Actualizar estado de lead | Estado actualizado correctamente | 3 |
| FQA-004 | Dashboard | Ver detalle de lead | Datos visibles solo con acceso autorizado | 3 |
| FQA-005 | Dashboard | Agregar nota interna | Nota asociada al lead | 3 |
| FQA-006 | AI | Detectar intención | Intención correcta según mensaje | 4 |
| FQA-007 | AI | Generar resumen | Resumen claro sin inventar datos | 4 |
| FQA-008 | AI | Calcular lead score | Score consistente con spec | 4 |
| FQA-009 | AI | Fallback baja confianza | Pide aclaración o escala | 4 |
| FQA-010 | AI | Prompt injection | Rechaza y mantiene reglas | 4 |
| FQA-011 | WhatsApp | Recibir webhook | Evento validado y normalizado | 4 |
| FQA-012 | WhatsApp | Enviar respuesta | Mensaje enviado correctamente | 4 |
| FQA-013 | WhatsApp | Manejar mensaje duplicado | No duplica conversación | 4 |
| FQA-014 | WhatsApp | Escalar a humano | Lead marcado para revisión | 4 |
| FQA-015 | Automatización | Enviar follow-up | Follow-up enviado solo bajo reglas aprobadas | 5 |
| FQA-016 | Seguridad | Proteger dashboard | Acceso requiere auth | 3 |
| FQA-017 | Privacidad | Retención de datos | Datos respetan política definida | 3 / 4 |
| FQA-018 | IA Provider | Falla proveedor IA | Fallback seguro y escalamiento | 4 |

---

# 8. Phase 1 Entry Criteria for QA

QA de Fase 1 puede comenzar cuando:

- El PRD está aprobado.
- Scope está aprobado.
- User stories están trazadas.
- Acceptance criteria están definidos.
- Functional requirements están definidos.
- Non-functional requirements están definidos.
- System architecture está alineada.
- Landing tiene implementación o prototipo navegable.
- CTAs y formulario están disponibles para probar.
- No hay contradicciones con `AGENTS.md` ni `sdd-index.md`.

---

# 9. Phase 1 Exit Criteria

La Fase 1 puede considerarse lista para release cuando:

- Todos los casos QA críticos pasan.
- Hero y propuesta son claros.
- CTA WhatsApp funciona.
- Formulario funciona o tiene solución aprobada.
- Responsive validado.
- SEO básico validado.
- Performance aceptable.
- No hay datos sensibles innecesarios.
- No hay secretos expuestos.
- No existen dependencias activas de IA.
- No existe WhatsApp Cloud API.
- No existe dashboard completo.
- Release checklist está completado.
- Riesgos críticos están mitigados o aceptados.

---

# 10. Severity Levels

| Severidad | Descripción | Acción |
|---|---|---|
| Critical | Rompe contacto, privacidad, seguridad o alcance | Bloquea release |
| High | Afecta conversión, CTA, formulario, responsive o SEO básico | Corregir antes de release |
| Medium | Afecta claridad, experiencia o detalles visuales importantes | Corregir si impacta conversión |
| Low | Mejora menor o ajuste visual | Puede ir a backlog |

---

# 11. Bug Classification

Los bugs deben clasificarse como:

| Tipo | Ejemplo |
|---|---|
| Content | Copy confuso, servicio mal explicado |
| Functional | CTA roto, formulario no envía |
| Responsive | Layout roto en mobile |
| SEO | Falta title, H1 duplicado |
| Performance | Imagen pesada, carga lenta |
| Accessibility | Bajo contraste, campos sin labels |
| Security | Secreto expuesto, error técnico visible |
| Privacy | Solicita datos innecesarios |
| Scope | Aparece funcionalidad fuera de Fase 1 |
| Future Risk | Algo bloquea evolución futura |

---

# 12. QA Evidence

Cuando se ejecute QA, se recomienda registrar:

- Fecha de prueba.
- Ambiente.
- Navegador.
- Dispositivo.
- Caso probado.
- Resultado.
- Evidencia si aplica.
- Bug asociado si existe.
- Responsable.
- Estado.

Formato sugerido:

```txt
QA-ID:
Fecha:
Ambiente:
Navegador:
Dispositivo:
Resultado:
Evidencia:
Notas: