# Tasks: PawTech Studio Landing Repositioning

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 300–400 |
| 400-line budget risk | Medium |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | ask-always |
| Chain strategy | pending |

Decision needed before apply: Yes
Chained PRs recommended: No
Chain strategy: pending
400-line budget risk: Medium

## Phase 1: Authority Products Section (New Component)

- [x] 1.1 Create `src/components/sections/AuthorityProductsSection.tsx` with BuildingOS, CocinaCore, and PawTech Studio cards using `Container`/`SectionHeading`/`Card` components and `#` placeholder links
- [x] 1.2 Define static product data shape `{ name, description, href: '#' }` inside the component

## Phase 2: Copy Rebrand and Content Rewrite

- [x] 2.1 Update `src/app/layout.tsx` metadata: title to "PawTech Studio", description/tags to reflect tagline "Tecnología que deja huella"
- [x] 2.2 Rewrite `src/components/sections/HeroSection.tsx`: eyebrow to "PawTech Studio", headline/subtitle to new tagline and service framing
- [x] 2.3 Update `src/components/sections/PublicHeader.tsx`: brand alt text, `NAV_ITEMS` anchors to new section order (`#soluciones`, `#diagnostico`, `#autoridad`, `#proceso`, `#casos`, `#contacto`)
- [x] 2.4 Rewrite `src/components/sections/ServicesSection.tsx` with clarified service hierarchy: landing pages, websites, systems/dashboards, automation, AI assistants/chatbots, MVP SaaS
- [x] 2.5 Update `src/components/sections/ContactFormSection.tsx`: sync `SERVICE_OPTIONS` array with revised service list
- [x] 2.6 Update `src/components/sections/Footer.tsx`: brand name to PawTech Studio, add tagline, update links copy
- [x] 2.7 Update `src/data/use-cases.ts` and `src/components/sections/UseCasesSection.tsx` for brand/copy alignment
- [x] 2.8 Minor copy tweaks to `src/components/sections/ProjectDiagnosisSection.tsx` for brand tone

## Phase 3: Section Reorder and Widget Reframe

- [x] 3.1 Reorder `src/app/page.tsx`: import `AuthorityProductsSection`, remove `ConceptEcosystemSection`, `MarketingSection`, `AILeadIntelligenceSection`, `ProjectTypesSection` renders; compose in the required narrative order
- [x] 3.2 Update `src/modules/lead-assistant/components/PublicLeadAssistantWidget.tsx`: rename floating trigger and header labels to "Diagnóstico rápido con IA"

## Phase 4: Testing and Verification

- [x] 4.1 Update `src/modules/lead-assistant/tests/public-widget-copy.test.ts`: replace old label assertions with new "Diagnóstico rápido con IA" and scope-safe copy
- [x] 4.2 Run `npm test` to confirm existing form, diagnosis, chat, and lead validation tests pass without regression
- [x] 4.3 Run `npm run lint` and verify no new warnings; manual check mobile/tablet/desktop responsive layout and anchor scroll behavior
