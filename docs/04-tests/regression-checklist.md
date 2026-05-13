# Regression Checklist — Apps Marketing / Yoryi AI Studio

## 1. Purpose

Este documento define la checklist de regresión del proyecto `apps-marketing`.

La regresión sirve para asegurar que futuros cambios no rompan funcionalidades, contenido, reglas de alcance, SEO, responsive, seguridad, privacidad o decisiones SDD ya aprobadas.

La Fase 1 corresponde a:

- Landing comercial.
- CTA a WhatsApp manual.
- Formulario de contacto.
- SEO básico.
- Responsive.
- Performance básica.
- Seguimiento humano/manual.

Este documento debe mantenerse alineado con:

- `AGENTS.md`
- `docs/01-sdd/sdd-index.md`
- `docs/01-sdd/prd.md`
- `docs/01-sdd/scope.md`
- `docs/01-sdd/acceptance-criteria.md`
- `docs/01-sdd/functional-requirements.md`
- `docs/01-sdd/non-functional-requirements.md`
- `docs/02-architecture/system-architecture.md`
- `docs/04-tests/qa-matrix.md`
- `docs/04-tests/release-checklist.md`

---

# 2. Regression Principle

El principio rector de regresión es:

**Todo cambio debe mejorar el producto sin romper el alcance aprobado de Fase 1.**

Antes de aceptar un cambio, se debe verificar que:

- La landing siga comunicando claramente la propuesta.
- Los CTAs sigan funcionando.
- El formulario siga funcionando.
- El responsive no se rompa.
- El SEO básico se mantenga.
- La performance no empeore innecesariamente.
- No aparezcan dependencias futuras en Fase 1.
- No se introduzca IA activa.
- No se introduzca WhatsApp Cloud API.
- No se introduzca dashboard completo.
- No se introduzcan secretos o datos sensibles.

---

# 3. When to Run This Checklist

Esta checklist debe ejecutarse:

- Antes de cada release.
- Después de cambios importantes de layout.
- Después de modificar el hero.
- Después de modificar CTAs.
- Después de modificar formulario.
- Después de modificar SEO metadata.
- Después de agregar dependencias.
- Después de modificar componentes compartidos.
- Después de cambios de arquitectura.
- Después de cambios en contenido comercial.
- Después de cualquier intento de agregar módulos futuros.

---

# 4. Phase 1 Regression Checklist

## 4.1 Scope Regression

- [ ] La Fase 1 sigue siendo landing comercial.
- [ ] AI Lead Assistant sigue fuera de Fase 1.
- [ ] WhatsApp Cloud API sigue fuera de Fase 1.
- [ ] Ollama sigue fuera de Fase 1.
- [ ] OpenAI API sigue fuera de Fase 1.
- [ ] Lead scoring automático sigue fuera de Fase 1.
- [ ] Dashboard completo sigue fuera de Fase 1.
- [ ] CRM avanzado sigue fuera de Fase 1.
- [ ] Pagos siguen fuera de Fase 1.
- [ ] Automatizaciones avanzadas siguen fuera de Fase 1.
- [ ] No se agregaron features fuera de alcance sin ADR.
- [ ] El copy diferencia capacidades actuales de capacidades futuras.

---

## 4.2 Hero Regression

- [ ] El hero sigue comunicando qué hace Apps Marketing / Yoryi AI Studio.
- [ ] El hero sigue comunicando para quién es.
- [ ] El hero sigue comunicando el beneficio principal.
- [ ] El CTA principal sigue visible.
- [ ] El CTA secundario, si existe, sigue funcionando.
- [ ] El mensaje se entiende en menos de 10 segundos.
- [ ] El hero no vende AI Lead Assistant como funcionalidad activa.
- [ ] El hero no promete resultados garantizados.
- [ ] El hero no usa lenguaje confuso o demasiado técnico.

---

## 4.3 Value Proposition Regression

- [ ] La propuesta de valor sigue clara.
- [ ] La landing sigue orientada a conversión.
- [ ] El mensaje sigue alineado con el ICP.
- [ ] La página sigue explicando el problema principal.
- [ ] La página sigue explicando la solución.
- [ ] El copy mantiene el principio: primero validar, después automatizar.
- [ ] No se mezclan servicios futuros como si ya estuvieran activos.
- [ ] No se agregaron promesas comerciales imposibles de validar.

---

## 4.4 Services Regression

- [ ] La sección de servicios sigue visible.
- [ ] Landing pages comerciales siguen como servicio principal.
- [ ] Desarrollo web sigue presente.
- [ ] SEO básico sigue presente.
- [ ] Marketing digital inicial sigue presente.
- [ ] Automatización comercial aparece como futura si se menciona.
- [ ] IA aplicada a ventas aparece como futura si se menciona.
- [ ] Sistemas a medida aparecen como evolución futura si se menciona.
- [ ] Los servicios están explicados de forma simple.
- [ ] No se ofrecen servicios no documentados.

---

## 4.5 Use Cases Regression

- [ ] Los casos de uso siguen representando al ICP.
- [ ] Profesionales de servicios siguen representados.
- [ ] Consultores/freelancers high-ticket siguen representados.
- [ ] Agencias pequeñas siguen representadas.
- [ ] Negocios locales siguen representados.
- [ ] Pymes de servicios siguen representadas.
- [ ] Los casos de uso ayudan a entender el valor.
- [ ] Los casos no prometen resultados garantizados.

---

## 4.6 Benefits Regression

- [ ] Los beneficios siguen visibles.
- [ ] Los beneficios siguen siendo concretos.
- [ ] Se mantiene claridad comercial.
- [ ] Se mantiene mejor captación como beneficio.
- [ ] Se mantiene confianza como beneficio.
- [ ] Se mantiene contacto simple como beneficio.
- [ ] Se mantiene preparación futura sin prometer IA activa.
- [ ] No se agregaron beneficios imposibles de medir.

---

## 4.7 Process Regression

- [ ] El proceso de trabajo sigue visible.
- [ ] Diagnóstico sigue como primer paso.
- [ ] Propuesta sigue como paso posterior.
- [ ] Diseño y copy siguen contemplados.
- [ ] Desarrollo sigue contemplado.
- [ ] Publicación sigue contemplada.
- [ ] Optimización sigue contemplada.
- [ ] El proceso no promete automatización inmediata.
- [ ] El proceso se entiende fácilmente.

---

## 4.8 WhatsApp CTA Regression

- [ ] El CTA principal a WhatsApp sigue visible.
- [ ] El link de WhatsApp abre correctamente.
- [ ] El link funciona en mobile.
- [ ] El link funciona en desktop.
- [ ] El mensaje precargado, si existe, es correcto.
- [ ] El mensaje precargado no promete IA activa.
- [ ] El CTA usa WhatsApp manual.
- [ ] No se agregó WhatsApp Cloud API.
- [ ] No se agregaron webhooks.
- [ ] No se agregaron templates.
- [ ] No se agregaron respuestas automáticas.
- [ ] No se agregaron campañas masivas.

---

## 4.9 Contact Form Regression

- [ ] El formulario sigue visible.
- [ ] El formulario incluye nombre.
- [ ] El formulario incluye email o WhatsApp.
- [ ] El formulario incluye tipo de negocio.
- [ ] El formulario incluye servicio de interés.
- [ ] El formulario incluye mensaje o necesidad principal.
- [ ] Los campos requeridos se validan.
- [ ] El email se valida si se usa email.
- [ ] El formulario muestra mensaje de éxito.
- [ ] El formulario muestra errores claros.
- [ ] El formulario funciona en mobile.
- [ ] El formulario no pide datos sensibles.
- [ ] El formulario no depende de IA.
- [ ] El formulario no calcula lead scoring automático.
- [ ] El formulario no requiere dashboard completo.

---

## 4.10 SEO Regression

- [ ] El title sigue definido.
- [ ] La meta description sigue definida.
- [ ] Existe un solo H1.
- [ ] La jerarquía H2/H3 sigue ordenada.
- [ ] Open Graph sigue configurado si aplica.
- [ ] El contenido principal sigue siendo indexable.
- [ ] No se reemplazó texto crítico por imágenes.
- [ ] Las URLs siguen limpias.
- [ ] Sitemap existe si aplica.
- [ ] Robots existe si aplica.
- [ ] El copy sigue alineado con servicios e ICP.
- [ ] No se agregó contenido irrelevante para el posicionamiento.

---

## 4.11 Responsive Regression

- [ ] No hay desbordes horizontales en mobile.
- [ ] No hay desbordes horizontales en tablet.
- [ ] No hay desbordes horizontales en desktop.
- [ ] Los textos son legibles en mobile.
- [ ] Los CTAs son fáciles de tocar en mobile.
- [ ] El formulario es usable en mobile.
- [ ] Las secciones mantienen jerarquía visual.
- [ ] Las imágenes no rompen el layout.
- [ ] El footer se adapta correctamente.
- [ ] La experiencia mobile sigue siendo prioritaria.

---

## 4.12 Performance Regression

- [ ] La landing mantiene carga rápida.
- [ ] Las imágenes están optimizadas.
- [ ] No se agregaron scripts pesados innecesarios.
- [ ] No se agregaron dependencias grandes sin justificación.
- [ ] Las animaciones no afectan rendimiento.
- [ ] Core Web Vitals sigue en verde o rango aceptable.
- [ ] LCP sigue aceptable.
- [ ] CLS sigue bajo.
- [ ] INP sigue aceptable.
- [ ] La landing sigue liviana para mobile.

---

## 4.13 Accessibility Regression

- [ ] El contraste sigue siendo suficiente.
- [ ] Los textos siguen siendo legibles.
- [ ] Los botones se identifican claramente.
- [ ] Los enlaces son reconocibles.
- [ ] El formulario tiene labels claros.
- [ ] Los mensajes de error son comprensibles.
- [ ] Las imágenes tienen alt text cuando corresponde.
- [ ] La navegación con teclado es razonable cuando aplica.
- [ ] No se introdujeron elementos inaccesibles innecesarios.

---

## 4.14 Security Regression

- [ ] No hay secretos en el código.
- [ ] No hay `.env` commiteado.
- [ ] No hay API keys expuestas.
- [ ] No hay tokens expuestos.
- [ ] No se muestran stack traces al usuario.
- [ ] No se muestran errores internos.
- [ ] El formulario valida entradas.
- [ ] El formulario evita payloads excesivos.
- [ ] No se guarda información sensible en frontend.
- [ ] No se agregaron scripts externos sin revisión.
- [ ] No se agregaron dependencias desconocidas sin revisión.

---

## 4.15 Privacy Regression

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

---

## 4.16 Analytics Regression

- [ ] La medición básica de conversión sigue posible.
- [ ] Se pueden identificar clicks a WhatsApp si se decidió medirlos.
- [ ] Se pueden identificar formularios enviados.
- [ ] No se agregó tracking invasivo.
- [ ] No se envían datos sensibles a analytics.
- [ ] Las métricas siguen alineadas con `success-metrics.md`.
- [ ] No se creó dashboard completo sin aprobación.

---

## 4.17 Future Readiness Regression

- [ ] La estructura sigue permitiendo crecer a backend futuro.
- [ ] La estructura sigue permitiendo dashboard futuro.
- [ ] La estructura sigue permitiendo AI Lead Assistant futuro.
- [ ] La estructura sigue permitiendo WhatsApp Cloud API futuro.
- [ ] No se acopló la landing a un proveedor IA.
- [ ] No se acopló la landing a un backend obligatorio.
- [ ] No se mezcló lógica futura en Fase 1.
- [ ] Los documentos futuros siguen marcados como futuros.

---

# 5. Future Module Regression Checklist

Estos checks aplican solo cuando esas fases sean aprobadas.

## 5.1 Backend Future Regression

- [ ] Crear lead sigue funcionando.
- [ ] Listar leads sigue funcionando.
- [ ] Ver detalle de lead sigue funcionando.
- [ ] Actualizar estado sigue funcionando.
- [ ] Validaciones server-side siguen funcionando.
- [ ] No se exponen datos sin autenticación.
- [ ] Errores de API siguen formato estándar.
- [ ] Logs no exponen datos sensibles.

---

## 5.2 Dashboard Future Regression

- [ ] Login sigue funcionando.
- [ ] Roles siguen funcionando.
- [ ] Lista de leads sigue visible.
- [ ] Detalle de lead sigue visible.
- [ ] Estados de lead siguen editables según permisos.
- [ ] Notas internas siguen funcionando.
- [ ] Dashboard no expone datos a usuarios no autorizados.
- [ ] Métricas siguen calculándose correctamente.

---

## 5.3 AI Lead Assistant Future Regression

- [ ] Detecta intención correctamente.
- [ ] Hace preguntas útiles.
- [ ] No inventa datos.
- [ ] No da precios finales.
- [ ] No promete resultados.
- [ ] No pide datos sensibles.
- [ ] Genera resúmenes claros.
- [ ] Sugiere scoring explicable.
- [ ] Escala a humano cuando corresponde.
- [ ] Usa fallback cuando hay baja confianza.
- [ ] Rechaza prompt injection.
- [ ] Respeta el dominio permitido.

---

## 5.4 WhatsApp Cloud API Future Regression

- [ ] Webhook recibe eventos correctamente.
- [ ] Webhook valida payloads.
- [ ] Mensajes duplicados no se procesan doble.
- [ ] Respuestas se envían correctamente.
- [ ] Errores del proveedor se manejan.
- [ ] Ventana de atención se respeta.
- [ ] Templates se usan solo cuando corresponde.
- [ ] Usuario puede ser escalado a humano.
- [ ] No se envían campañas no autorizadas.
- [ ] Tokens no se exponen.

---

# 6. Regression Severity

| Severidad | Descripción | Acción |
|---|---|---|
| Critical | Rompe contacto, seguridad, privacidad o scope | Bloquea release |
| High | Rompe CTA, formulario, responsive, SEO o performance crítica | Corregir antes de release |
| Medium | Afecta claridad, experiencia o conversión parcialmente | Corregir si impacta conversión |
| Low | Ajuste visual o mejora menor | Puede ir a backlog |

---

# 7. Regression Evidence Template

```txt
Regression ID:
Date:
Change tested:
Environment:
Browser:
Device:
Checklist area:
Expected result:
Actual result:
Passed:
Severity:
Evidence:
Notes: