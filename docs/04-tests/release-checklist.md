# Release Checklist — Apps Marketing / Yoryi AI Studio

## 1. Purpose

Este documento define la checklist de release para la Fase 1 del proyecto `apps-marketing`.

La Fase 1 corresponde a la landing comercial de Apps Marketing / Yoryi AI Studio.

El objetivo de esta checklist es confirmar que la landing está lista para publicarse o entregarse sin romper el alcance aprobado, sin introducir módulos futuros y cumpliendo los criterios mínimos de calidad, conversión, seguridad, privacidad, SEO, responsive y performance.

Este documento debe mantenerse alineado con:

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
- `docs/04-tests/qa-matrix.md`
- `docs/04-tests/regression-checklist.md`

---

# 2. Release Principle

El principio rector de release es:

**No se publica una landing bonita; se publica una landing clara, funcional, medible, segura y alineada con la SDD.**

La Fase 1 solo puede considerarse lista para release si:

- La landing comunica claramente la propuesta de valor.
- El CTA a WhatsApp manual funciona.
- El formulario funciona o tiene solución aprobada.
- El diseño es responsive.
- El SEO básico está implementado.
- La performance es aceptable.
- No se piden datos sensibles.
- No hay secretos expuestos.
- No hay IA activa.
- No hay WhatsApp Cloud API.
- No hay dashboard completo.
- No hay funcionalidades fuera de alcance.

---

# 3. Release Scope

## 3.1 Included in Phase 1 Release

La release de Fase 1 incluye:

- Landing comercial.
- Hero.
- Propuesta de valor.
- Problema.
- Solución.
- Servicios.
- Casos de uso.
- Beneficios.
- Proceso de trabajo.
- CTA a WhatsApp manual.
- Formulario de contacto.
- Footer.
- SEO básico.
- Responsive design.
- Performance básica.
- Seguridad y privacidad básica.
- Medición inicial de conversión.

## 3.2 Not Included in Phase 1 Release

La release de Fase 1 no incluye:

- AI Lead Assistant.
- Chatbot inteligente.
- WhatsApp Cloud API.
- OpenAI API.
- Ollama.
- Lead scoring automático.
- Resumen automático.
- Dashboard completo.
- CRM avanzado.
- Pagos.
- Automatizaciones avanzadas.
- Campañas masivas.
- Backend completo obligatorio.

---

# 4. Pre-Release Documentation Checklist

Antes de publicar, confirmar:

- [ ] `AGENTS.md` está actualizado.
- [ ] `docs/01-sdd/sdd-index.md` está actualizado.
- [ ] `docs/01-sdd/prd.md` está aprobado.
- [ ] `docs/01-sdd/scope.md` está aprobado.
- [ ] `docs/01-sdd/user-stories.md` está aprobado.
- [ ] `docs/01-sdd/acceptance-criteria.md` está aprobado.
- [ ] `docs/01-sdd/functional-requirements.md` está aprobado.
- [ ] `docs/01-sdd/non-functional-requirements.md` está aprobado.
- [ ] `docs/02-architecture/system-architecture.md` está alineado.
- [ ] `docs/02-architecture/security-and-privacy.md` está revisado.
- [ ] `docs/04-tests/qa-matrix.md` está completo.
- [ ] `docs/04-tests/regression-checklist.md` fue revisado.
- [ ] No existen contradicciones entre documentación y alcance de Fase 1.
- [ ] Cualquier cambio de alcance fue documentado en ADR.

---

# 5. Product Release Checklist

## 5.1 Hero

- [ ] El hero comunica qué hace Apps Marketing / Yoryi AI Studio.
- [ ] El hero comunica para quién es.
- [ ] El hero comunica el beneficio principal.
- [ ] El hero incluye CTA principal.
- [ ] El hero se entiende en menos de 10 segundos.
- [ ] El hero no promete resultados garantizados.
- [ ] El hero no presenta AI Lead Assistant como funcionalidad activa.

## 5.2 Propuesta de valor

- [ ] La propuesta de valor es clara.
- [ ] La propuesta está orientada a conversión.
- [ ] La propuesta habla al ICP definido.
- [ ] La propuesta evita lenguaje genérico.
- [ ] La propuesta diferencia Fase 1 de capacidades futuras.
- [ ] El mensaje principal está alineado con `product-vision.md`.

## 5.3 Problema y solución

- [ ] El problema principal está explicado.
- [ ] Se entiende el dolor de tráfico sin conversión.
- [ ] Se entiende el valor de una landing comercial.
- [ ] La solución se presenta como landing + captación manual.
- [ ] La solución no depende de IA.
- [ ] La solución no depende de WhatsApp Cloud API.

## 5.4 Servicios

- [ ] Landing pages comerciales están visibles.
- [ ] Desarrollo web está visible.
- [ ] SEO básico está visible.
- [ ] Marketing digital inicial está visible.
- [ ] Automatización comercial se comunica como futura si aparece.
- [ ] IA aplicada a ventas se comunica como futura si aparece.
- [ ] Sistemas a medida se comunican como evolución futura si aparecen.
- [ ] No se ofrecen servicios no documentados.

## 5.5 Casos de uso

- [ ] Casos de uso para profesionales de servicios.
- [ ] Casos de uso para consultores/freelancers high-ticket.
- [ ] Casos de uso para agencias pequeñas.
- [ ] Casos de uso para negocios locales.
- [ ] Casos de uso para pymes de servicios.
- [ ] Los casos ayudan al visitante a identificarse.
- [ ] Los casos no prometen resultados imposibles.

## 5.6 Beneficios

- [ ] Beneficios claros y concretos.
- [ ] Beneficio de claridad comercial.
- [ ] Beneficio de mejor captación.
- [ ] Beneficio de confianza.
- [ ] Beneficio de contacto simple.
- [ ] Beneficio de preparación futura.
- [ ] No hay beneficios exagerados o no medibles.

## 5.7 Proceso de trabajo

- [ ] El proceso está visible.
- [ ] Incluye diagnóstico.
- [ ] Incluye propuesta.
- [ ] Incluye diseño y copy.
- [ ] Incluye desarrollo.
- [ ] Incluye publicación.
- [ ] Incluye optimización.
- [ ] El proceso es simple y entendible.

---

# 6. Functional Release Checklist

## 6.1 WhatsApp Manual

- [ ] Existe CTA principal a WhatsApp.
- [ ] El CTA es visible en hero o sección principal.
- [ ] El CTA funciona en mobile.
- [ ] El CTA funciona en desktop.
- [ ] El link abre WhatsApp o WhatsApp Web.
- [ ] El número está correctamente configurado.
- [ ] El mensaje precargado funciona si aplica.
- [ ] El mensaje precargado es claro y comercial.
- [ ] El mensaje no promete bot ni IA activa.
- [ ] No se usa WhatsApp Cloud API.
- [ ] No existen webhooks de WhatsApp.
- [ ] No existen templates.
- [ ] No existen respuestas automáticas.

## 6.2 Formulario

- [ ] El formulario está visible.
- [ ] El formulario incluye nombre.
- [ ] El formulario incluye email o WhatsApp.
- [ ] El formulario incluye tipo de negocio.
- [ ] El formulario incluye servicio de interés.
- [ ] El formulario incluye mensaje o necesidad principal.
- [ ] Los campos requeridos se validan.
- [ ] El email se valida si se usa.
- [ ] El formulario funciona en mobile.
- [ ] El formulario muestra confirmación al enviar.
- [ ] El formulario muestra errores claros.
- [ ] El formulario no pide datos sensibles.
- [ ] El formulario no depende de AI Lead Assistant.
- [ ] El formulario no calcula lead scoring automático.

## 6.3 Footer

- [ ] El footer está presente.
- [ ] Incluye marca.
- [ ] Incluye servicios o links relevantes.
- [ ] Incluye contacto.
- [ ] Incluye WhatsApp si aplica.
- [ ] Incluye información legal básica si aplica.
- [ ] El footer funciona en mobile y desktop.

---

# 7. SEO Release Checklist

- [ ] Title definido.
- [ ] Meta description definida.
- [ ] H1 único.
- [ ] Headings H2/H3 ordenados.
- [ ] Open Graph básico configurado.
- [ ] Contenido principal indexable.
- [ ] El texto crítico no está solo en imágenes.
- [ ] URLs limpias.
- [ ] Sitemap configurado si aplica.
- [ ] Robots configurado si aplica.
- [ ] Copy alineado con servicios.
- [ ] Copy alineado con ICP.
- [ ] No hay metadatos vacíos.
- [ ] No hay contenido irrelevante para posicionamiento.
- [ ] La página se puede compartir correctamente en redes si aplica.

---

# 8. Responsive Release Checklist

- [ ] Mobile validado.
- [ ] Tablet validado.
- [ ] Desktop validado.
- [ ] No hay desbordes horizontales.
- [ ] Textos legibles en mobile.
- [ ] CTAs tocables en mobile.
- [ ] Formulario usable en mobile.
- [ ] Secciones mantienen jerarquía visual.
- [ ] Imágenes no rompen layout.
- [ ] Footer responsive.
- [ ] Navegación responsive si aplica.
- [ ] La experiencia mobile es prioritaria.

---

# 9. Performance Release Checklist

- [ ] Carga inicial aceptable.
- [ ] Imágenes optimizadas.
- [ ] No hay imágenes innecesariamente pesadas.
- [ ] No hay scripts innecesarios.
- [ ] No hay dependencias pesadas sin justificación.
- [ ] Animaciones no afectan usabilidad.
- [ ] Core Web Vitals en verde o rango aceptable.
- [ ] LCP aceptable.
- [ ] CLS bajo.
- [ ] INP aceptable.
- [ ] La landing se siente rápida en mobile.
- [ ] La landing se siente rápida en desktop.

---

# 10. Accessibility Release Checklist

- [ ] Buen contraste visual.
- [ ] Tamaños de texto legibles.
- [ ] Botones identificables.
- [ ] Links reconocibles.
- [ ] Formulario con labels claros.
- [ ] Mensajes de error comprensibles.
- [ ] Imágenes con alt text cuando corresponde.
- [ ] Navegación con teclado razonable si aplica.
- [ ] No hay elementos visuales que impidan leer contenido.
- [ ] La jerarquía visual ayuda a entender la página.

---

# 11. Security Release Checklist

- [ ] No hay secretos en el código.
- [ ] No hay `.env` commiteado.
- [ ] No hay API keys expuestas.
- [ ] No hay tokens expuestos.
- [ ] No hay claves privadas en frontend.
- [ ] No se muestran stack traces al usuario.
- [ ] No se muestran errores internos.
- [ ] El formulario valida entradas.
- [ ] El formulario evita payloads excesivos.
- [ ] No se guarda información sensible en frontend.
- [ ] No se usan scripts externos sospechosos.
- [ ] No se agregaron dependencias desconocidas sin revisión.
- [ ] No se subieron datos reales de leads al repositorio.

---

# 12. Privacy Release Checklist

- [ ] El formulario captura solo datos necesarios.
- [ ] No se piden documentos personales.
- [ ] No se piden datos bancarios.
- [ ] No se piden contraseñas.
- [ ] No se piden datos sensibles innecesarios.
- [ ] Se informa el uso básico de los datos si aplica.
- [ ] No se comparten datos con terceros sin decisión.
- [ ] No se envían datos a IA.
- [ ] No se almacenan conversaciones automáticamente.
- [ ] No se usan datos reales en pruebas públicas.
- [ ] Si hay proveedor de formulario, está documentado.
- [ ] Si hay analytics, no recolecta datos innecesarios.

---

# 13. Analytics and Metrics Checklist

- [ ] Se puede medir o revisar clicks a WhatsApp.
- [ ] Se puede medir o revisar formularios enviados.
- [ ] Se puede estimar conversión visita -> contacto.
- [ ] Se puede revisar calidad manual de leads.
- [ ] Se puede validar comprensión del mensaje.
- [ ] Las métricas están alineadas con `success-metrics.md`.
- [ ] No se implementó dashboard completo sin aprobación.
- [ ] No se implementó tracking invasivo.
- [ ] No se envían datos sensibles a herramientas externas.

---

# 14. Scope Control Release Checklist

Antes de publicar, confirmar:

- [ ] No hay AI Lead Assistant activo.
- [ ] No hay chatbot inteligente.
- [ ] No hay Ollama.
- [ ] No hay OpenAI API.
- [ ] No hay AIProvider productivo.
- [ ] No hay prompts productivos ejecutándose.
- [ ] No hay WhatsApp Cloud API.
- [ ] No hay webhooks de WhatsApp.
- [ ] No hay lead scoring automático.
- [ ] No hay resumen automático.
- [ ] No hay dashboard completo.
- [ ] No hay CRM avanzado.
- [ ] No hay pagos.
- [ ] No hay automatizaciones avanzadas.
- [ ] No hay campañas masivas.
- [ ] No hay backend completo obligatorio.
- [ ] Todo módulo futuro se comunica como futuro.

---

# 15. Future Readiness Checklist

La Fase 1 debe quedar preparada para evolucionar, pero sin implementar módulos futuros.

- [ ] La estructura permite agregar backend futuro.
- [ ] La estructura permite agregar dashboard futuro.
- [ ] La estructura permite agregar AI Lead Assistant futuro.
- [ ] La estructura permite agregar WhatsApp Cloud API futuro.
- [ ] La estructura permite mejorar formulario en fases futuras.
- [ ] La estructura permite agregar analítica más avanzada en el futuro.
- [ ] La landing no queda acoplada a un proveedor IA.
- [ ] La landing no queda acoplada a un backend obligatorio.
- [ ] La landing no queda acoplada a WhatsApp Cloud API.
- [ ] Las capacidades futuras están documentadas, no implementadas.

---

# 16. Build and Deployment Checklist

Antes de release técnico:

- [ ] El proyecto instala dependencias correctamente.
- [ ] El proyecto compila correctamente.
- [ ] No hay errores críticos de TypeScript.
- [ ] No hay errores críticos de lint si aplica.
- [ ] No hay warnings graves que afecten producción.
- [ ] Variables de entorno revisadas.
- [ ] Dominio o URL de producción configurada.
- [ ] SSL activo si aplica.
- [ ] Preview revisado antes de producción.
- [ ] Producción revisada después de deploy.
- [ ] Links internos funcionando.
- [ ] Links externos funcionando.
- [ ] WhatsApp funcionando en producción.
- [ ] Formulario funcionando en producción.

---

# 17. Browser Checklist

Validar al menos:

- [ ] Chrome desktop.
- [ ] Safari desktop si aplica.
- [ ] Firefox desktop si aplica.
- [ ] Edge desktop si aplica.
- [ ] Chrome mobile.
- [ ] Safari iOS si aplica.
- [ ] Android browser si aplica.

---

# 18. Manual QA Before Release

Ejecutar casos críticos:

- [ ] QA-001 Hero comunica propuesta.
- [ ] QA-003 Comprensión en menos de 10 segundos.
- [ ] QA-011 CTA WhatsApp manual.
- [ ] QA-014 Campos mínimos del formulario.
- [ ] QA-015 Validación del formulario.
- [ ] QA-019 Responsive mobile.
- [ ] QA-022 Title y meta description.
- [ ] QA-023 Headings semánticos.
- [ ] QA-026 Carga inicial.
- [ ] QA-031 No secretos expuestos.
- [ ] QA-034 Captura mínima de datos.
- [ ] QA-035 No AI Lead Assistant activo.
- [ ] QA-036 No OpenAI/Ollama.
- [ ] QA-037 No dashboard completo.
- [ ] QA-040 Separación fase actual/futuro.

---

# 19. Release Blocking Issues

La release queda bloqueada si ocurre cualquiera de estos casos:

- [ ] CTA principal a WhatsApp roto.
- [ ] Formulario roto sin alternativa aprobada.
- [ ] Landing inutilizable en mobile.
- [ ] Hero confuso o contradictorio.
- [ ] Se piden datos sensibles.
- [ ] Hay secretos expuestos.
- [ ] Hay `.env` commiteado.
- [ ] Hay errores técnicos visibles al usuario.
- [ ] SEO básico ausente.
- [ ] Performance extremadamente mala.
- [ ] Se implementó IA en Fase 1.
- [ ] Se implementó WhatsApp Cloud API en Fase 1.
- [ ] Se implementó dashboard completo en Fase 1.
- [ ] Se implementaron pagos en Fase 1.
- [ ] Se contradice `AGENTS.md`.
- [ ] Se contradice `sdd-index.md`.
- [ ] Se rompe el scope aprobado.

---

# 20. Release Approval

## 20.1 Required Approval

Antes de publicar Fase 1 debe confirmarse:

- [ ] SDD revisada.
- [ ] QA Matrix revisada.
- [ ] Regression Checklist ejecutada.
- [ ] Release Checklist ejecutada.
- [ ] Issues críticos resueltos.
- [ ] Scope validado.
- [ ] Yoryi aprueba release.

## 20.2 Release Decision

Marcar una opción:

- [ ] Approved for release.
- [ ] Approved with known non-critical issues.
- [ ] Not approved.
- [ ] Needs changes before release.

## 20.3 Release Notes

Completar antes de publicar:

```txt
Release version:
Release date:
Environment:
Approved by:
Known issues:
Notes:
