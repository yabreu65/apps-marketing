# Phase 14G — Visual Reference V1 Implementation

## Status

Completed locally.

## Objective

Adaptar la landing pública de `apps-marketing` a una dirección visual más cercana a la referencia V1: AI studio premium, fondo dark navy, glows morados, hero impactante, dashboard mock protagonista, glass cards, banda de capacidades, proceso visual y CTA final con profundidad.

## Visual Reference Used

Referencia principal: `public/figma.png`.

Se tomó como inspiración de atmósfera visual, no como copia exacta.

## Sections Modified

- `src/app/globals.css`
- `src/components/sections/HeroSection.tsx`
- `src/components/sections/CredibilityStripSection.tsx`
- `src/components/sections/WhyUsSection.tsx`
- `src/components/sections/ServicesSection.tsx`
- `src/components/sections/ProductShowcaseSection.tsx`
- `src/components/sections/ProcessSection.tsx`
- `src/components/sections/FinalCtaSection.tsx`

## What Was Taken From The Reference

- Dark navy base with richer section depth.
- Purple radial glows and decorative orb/circle language.
- Premium top navigation inside the hero.
- Large editorial headline with stronger visual hierarchy.
- Dashboard mock as the main visual element.
- Glass-card style with subtle borders, blur and shadows.
- Capability strip instead of fake customer logos.
- Process section with numbered circular steps and connector line.
- Final CTA panel with glow/orb treatment.

## What Was Avoided For Safety / Ethics

- No external images.
- No copied HTML pasted as-is.
- No Tailwind CDN.
- No Google Fonts CDN.
- No fake logos.
- No fake testimonials.
- No invented customers.
- No `+120 clientes`.
- No `5.0 en Clutch`.
- No fake success cases.
- No fake business metrics presented as real outcomes.
- No `Yoryl`; brand remains `Yoryi`.

## Visual System Changes

Added reusable visual classes in `globals.css`:

- `glass-card`
- `text-gradient`
- `purple-gradient-bg`
- `glow-effect`
- `hero-orb`
- `section-aurora`
- `section-violet-depth`
- `mock-panel`

These classes keep the landing consistent while staying inside the existing Next.js + Tailwind setup.

## Claims Reviewed

Confirmed:

- IA is communicated as local / optional / controlled.
- Ollama is described as local.
- No data is claimed to be sent to third-party AI services.
- Lead score and summary are positioned as support for human decision-making.
- No automatic decisions are promised.
- No WhatsApp automation is promised.
- No guaranteed results are promised.
- Product showcase is labeled as a local conceptual demo.

## Mobile QA

- Hero stacks into a single-column flow before desktop.
- Mock sidebar is hidden on mobile.
- CTA buttons wrap and remain tappable.
- Cards collapse to mobile-friendly grids.
- Product mock uses responsive grid structure.
- Process connector line is desktop-only to avoid mobile overflow.
- No external assets or heavy images were added.

## Scope Validation

- No backend changes.
- No Prisma changes.
- No API changes.
- No auth changes.
- No dashboard internal changes.
- No deploy.
- No external images.
- No fake logos.
- No fake testimonials.
- No copied text.
- No Tailwind CDN.

## Validation

- `npm run lint`: OK
- `npm run build`: OK
- Browser DOM QA at `http://localhost:3001`: headline, CTAs, conceptual demo label and no fake-client claims found.
- Mobile viewport QA at `390x844`: headline, CTAs, conceptual demo label and final WhatsApp CTA present.
