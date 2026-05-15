# Phase 14F — RYZ Visual Direction Rebuild

## Status

Completed locally.

## Objetivo

Rehacer la dirección visual de la landing pública tomando `public/figma.png` como referencia de atmósfera premium AI/tech: fondos oscuros, glows morados, círculos decorativos, mock SaaS protagonista, CTAs fuertes y mayor jerarquía visual.

## Referencia usada

La imagen se usó como dirección visual, no como copia. Se tomaron señales como:

- Hero oscuro con glow/orb morado protagonista.
- Navegación superior limpia.
- Headline grande y directo.
- Mock dashboard tipo AI command center.
- Banda de confianza sin logos falsos.
- Cards premium con bordes sutiles y profundidad.
- CTA naranja/morado como acento.

## Qué se cambió visualmente

- Hero reconstruido con fondo protagonista, círculos/glows morados, headline grande, top bar premium, CTAs dobles y mock dashboard lateral.
- `body` enriquecido con radiales suaves para dar continuidad visual entre secciones.
- Credibility strip convertido en banda premium de capacidades reales, sin logos falsos.
- Why Us reforzado con layout más amplio, cards premium y copy corto.
- Services rediseñado con cards más visuales, labels claros y fondo con profundidad.
- Product Showcase reconstruido como mock SaaS grande con sidebar, métricas, pipeline, Lead Score, resumen IA local y timeline.
- AI Lead Intelligence ajustado para verse como bloque premium y mantener claims responsables.
- Process convertido a sección tipo “How it works” con números grandes y menor densidad.
- CTA final rediseñado como panel premium con glows, doble CTA y copy amplio.

## Por qué ahora se acerca más a la referencia

- El above-the-fold tiene más impacto: gran titular + visual dashboard protagonista + glows morados.
- La página se siente menos plana: cada bloque clave tiene profundidad, gradientes y separación clara.
- El mock visual comunica producto/AI studio sin usar screenshots o assets externos.
- La navegación y los CTAs tienen una presencia más startup/tech premium.

## Qué NO se copió

- No se copiaron textos de la referencia.
- No se copiaron imágenes ni assets.
- No se usaron logos de clientes o marcas ficticias.
- No se inventaron testimonios.
- No se replicó la composición exacta.

## Secciones modificadas

- `src/app/globals.css`
- `src/components/sections/HeroSection.tsx`
- `src/components/sections/CredibilityStripSection.tsx`
- `src/components/sections/WhyUsSection.tsx`
- `src/components/sections/ServicesSection.tsx`
- `src/components/sections/ProductShowcaseSection.tsx`
- `src/components/sections/AILeadIntelligenceSection.tsx`
- `src/components/sections/ProcessSection.tsx`
- `src/components/sections/FinalCtaSection.tsx`

## Mobile QA

- Hero mantiene layout de una columna antes de `lg` y mock debajo del copy.
- CTAs usan `flex-wrap` para evitar overflow.
- Cards pasan a una columna o dos columnas según breakpoint.
- El mock SaaS oculta sidebar en mobile para no romper layout.
- No se agregaron imágenes pesadas ni librerías nuevas.

## Claim Safety

- IA comunicada como local/opcional/controlada.
- Ollama aparece como capacidad local, sin envío a terceros.
- Product showcase se marca como demo conceptual local.
- No se promete WhatsApp automático.
- No se prometen decisiones automáticas.
- No se prometen resultados garantizados.

## Validation

- `npm run lint`: OK
- `npm run build`: OK

## Scope validation

- No backend changes.
- No Prisma changes.
- No API changes.
- No auth changes.
- No dashboard changes.
- No deploy.
- No fake logos/testimonials.
- No copied text/assets.
- No external/productive AI claims.
