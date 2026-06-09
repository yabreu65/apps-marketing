# Exploration: pawtech-studio-landing-repositioning

## Current State

The landing page (`src/app/page.tsx`) is already built and functional with a dark/neon tech aesthetic. It currently presents **PAW Tech** as a digital services provider offering "web, marketing, systems, and AI" with the following section order:

1. `PublicHeader` — sticky nav with logo `logoTech.png`, links: Servicios, Ecosistema, Ruta, Diagnóstico, Contacto.
2. `HeroSection` — "Web, marketing, sistemas e IA para captar clientes, convertir mejor y escalar con tecnología."
3. `ProblemSection` — 4 pain points (captación dispersa, seguimiento manual, poca visibilidad, procesos desconectados).
4. `ConceptEcosystemSection` — complex SVG connector diagram showing Web / Marketing / Systems / IA as an ecosystem.
5. `ProjectDiagnosisSection` — 3-question interactive diagnosis with recommendation.
6. `ServicesSection` — 4 pillars (Web, Marketing, Systems, IA) with status labels.
7. `ProjectTypesSection` — 6 stages (Estoy empezando, Ya recibo consultas, Pierdo seguimiento, Necesito sistema, Quiero IA, Quiero validar SaaS).
8. `MarketingSection` — 3 marketing pillars + side panel.
9. `AILeadIntelligenceSection` — 4 AI capability cards (asistente, resumen, clasificación, próximos pasos).
10. `ProcessSection` — 4-step process (Descubrimos, Diseñamos, Construimos, Optimizamos).
11. `UseCasesSection` — 5 cards from `src/data/use-cases.ts`.
12. `ContactFormSection` — full form with validation, diagnosis context, and API submission.
13. `Footer` — PAW Tech branding, 3-column links, social links.
14. `PublicLeadAssistantWidget` — floating chat widget labeled "Chatear con Sussy" with avatar `/sussy-asesora.png`.

**SEO metadata** in `layout.tsx` currently titles the page as "PAW Tech".

**Brand assets**: `public/logoTech.png` and `public/logo_pawtech.svg` exist.

**AI Lead Assistant** is already implemented (widget + backend API) despite being explicitly listed as **Out of Scope** in the Phase 1 PRD/Scope. This is a pre-existing architectural fact that the repositioning must handle.

---

## Affected Areas

| File | Why Affected |
|------|--------------|
| `src/app/page.tsx` | Section reorder (Hero → Problem → Services → Diagnosis → Authority → Process → Contact). Remove or reposition Marketing, AI, Ecosystem sections. |
| `src/app/layout.tsx` | Update metadata title/description from "PAW Tech" to "PawTech Studio". |
| `src/components/sections/HeroSection.tsx` | Rewrite H1, subtitle, eyebrow, and CTAs to match PawTech Studio positioning and tagline. |
| `src/components/sections/PublicHeader.tsx` | Update logo alt text, nav labels ("Ecosistema" → clearer label), and CTA copy. |
| `src/components/sections/Footer.tsx` | Update brand name to PawTech Studio, update description, and possibly footer links. |
| `src/components/sections/ServicesSection.tsx` | Clarify service list to: landing pages, professional websites, internal systems, dashboards, automation, AI chatbots/assistants, MVP SaaS. |
| `src/components/sections/ConceptEcosystemSection.tsx` | **Decision needed**: This complex ecosystem diagram is visually heavy and may dilute the commercial clarity. Recommend replacing or collapsing into a simpler "How we work" visual. |
| `src/components/sections/AILeadIntelligenceSection.tsx` | **Decision needed**: Per PRD/Scope, AI is Out of Scope for Phase 1, but the widget already exists. If kept, its section copy must frame IA as "evolution/advanced" not "current product". |
| `src/components/sections/MarketingSection.tsx` | **Decision needed**: May be redundant if ServicesSection is already clear. Could merge marketing content into Services or remove to reduce scroll length. |
| `src/components/sections/ProjectTypesSection.tsx` | Minor copy updates to align with PawTech Studio language. |
| `src/components/sections/UseCasesSection.tsx` | Minor copy updates; may need new case for "BuildingOS/CocinaCore" as proof of work. |
| `src/components/sections/ProjectDiagnosisSection.tsx` | Keep functional logic. Minor copy updates for brand tone. |
| `src/components/sections/ContactFormSection.tsx` | Keep form logic. Update SERVICE_OPTIONS if service names change. |
| `src/modules/lead-assistant/components/PublicLeadAssistantWidget.tsx` | Rename floating button from "Chatear con Sussy" to "Diagnóstico rápido con IA" or "Hablar con asesor IA". Update header title/subtitle. |
| `src/data/use-cases.ts` | Update use-case titles/outcomes if needed to match new positioning. |

---

## Approaches

### 1. Full Reposition with Section Reorder (Hybrid)

Reorder sections to the proposed narrative flow, rewrite key copy for brand clarity, add a new authority/products section, and preserve all reusable UI components.

- **Pros**: Matches the user's requested narrative flow (Hero → Problem → Services → Diagnosis → Authority → Process → Contact). Improves commercial clarity and conversion hierarchy. Keeps the dark/neon style intact.
- **Cons**: Requires creating a new section component. Section reorder may break existing anchor links (`#sistema-conectado`, `#marketing`, `#ia-local`). Requires updating `PublicHeader` nav anchors.
- **Effort**: Medium

### 2. Copy-Only Rebrand (Minimal)

Keep the existing section order but change all brand references from "PAW Tech" to "PawTech Studio", update the hero copy, and rename the widget button.

- **Pros**: Low risk. Fastest to implement. No new components.
- **Cons**: Does not improve the narrative flow. Keeps the complex Ecosystem diagram and redundant Marketing/AI sections that dilute the commercial message. Misses the user's core request for clearer hierarchy.
- **Effort**: Low

### 3. Modular Consolidation (Refactor)

Merge Ecosystem, Marketing, and AI sections into a single unified "Capabilities" section with 4 clear cards (Web, Systems, Automation, AI), then add the authority section.

- **Pros**: Reduces page length and cognitive load. Creates a cleaner single-scroll experience.
- **Cons**: Higher effort. Requires significant redesign of existing complex components (SVG connectors in Ecosystem, grid layouts in Marketing). Risk of over-engineering a Phase 1 landing.
- **Effort**: High

---

## Recommendation

**Adopt Approach 1 (Full Reposition with Section Reorder)**.

Rationale:
- The user explicitly requested the narrative flow change and the addition of an authority section. A copy-only rebrand would not meet the business goal.
- The current Ecosystem and Marketing sections are visually impressive but add cognitive load. The repositioning should prioritize clarity over visual complexity.
- The dark/neon style and existing reusable components (`Container`, `MotionReveal`, `SectionHeading`, `Card`, `Button`) make the reorder low-risk.
- The diagnosis, problem, process, form, and use-cases sections are already well-built and can be preserved with minimal copy tweaks.

---

## Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| **AI Lead Assistant already exists despite Phase 1 Out-of-Scope** | The PRD/Scope explicitly say "No AI in Phase 1", but the widget is fully implemented. Renaming it is technically a copy change, but keeping it active contradicts the SDD. | Document this as a pre-existing implementation that is being repositioned, not newly added. The user wants the button renamed, not removed. If strict SDD compliance is required, an ADR should be created to document this existing exception. |
| **Anchor link breakage** | High | The `PublicHeader` nav links point to `#sistema-conectado`, `#marketing`, `#ia-local`, `#ruta-etapa`. Reordering/removing sections will break these. Must update all `id` attributes and `NAV_ITEMS` in `PublicHeader` simultaneously. |
| **Logo asset mismatch** | Medium | The current logo is `logoTech.png` (PAW Tech). If the PawTech Studio rebrand requires a new logo asset, the design asset must be provided or the existing SVG must be confirmed as usable. |
| **Section removal (Ecosystem, Marketing, AI)** | Medium | Removing `ConceptEcosystemSection`, `MarketingSection`, and `AILeadIntelligenceSection` from `page.tsx` is easy, but if they contain important business logic or SEO content, that content must be absorbed elsewhere. |
| **SEO metadata** | Low | `layout.tsx` title/description and Open Graph tags must be updated. If not updated, social shares and search results will still show "PAW Tech". |
| **Service option drift** | Low | The `ContactFormSection` `SERVICE_OPTIONS` array must stay in sync with the rewritten `ServicesSection`. |
| **Widget avatar confusion** | Low | The widget uses `/sussy-asesora.png`. If renamed to "Diagnóstico rápido con IA", the avatar may no longer match the label. Consider whether the avatar should be updated or removed. |

---

## Ready for Proposal

**Yes** — with the following clarifications for the orchestrator to relay to the user:

1. **Logo asset**: Does the user have a new PawTech Studio logo, or should the existing `logo_pawtech.svg` be used?
2. **AI Lead Assistant scope contradiction**: The widget already exists in the codebase but is listed as Out of Scope in the SDD. Should we (a) keep it and rename as requested, (b) hide it, or (c) require an ADR to formalize its presence before proceeding?
3. **Section removal**: The user wants to remove/replace the Ecosystem, Marketing, and AI sections. Should their content be absorbed into Services or simply removed?
4. **Products data**: For the new "Productos desarrollados por PawTech Studio" section (BuildingOS, CocinaCore, PawTech Studio), what are the exact descriptions, URLs, and screenshots to use?

Once these are clarified, the next phase is `sdd-propose`.

---

## Key Learnings

- The current landing has **11 sections + header/footer/widget**, which is a long scroll. The repositioning should reduce this to ~8 focused sections to improve conversion clarity.
- The `ConceptEcosystemSection` is the most complex component (371 lines, custom SVG connectors). Removing it will significantly reduce page weight and cognitive load.
- The `ProjectDiagnosisSection` and `ContactFormSection` are the most interactive components and are well-built. They should be preserved with minimal changes.
- The `PublicLeadAssistantWidget` is 541 lines and tightly coupled to the lead-assistant module. Renaming its button is trivial, but its existence is the biggest SDD scope question.
- The codebase already uses a consistent design system (`--purple-primary`, `--cyan-accent`, `--orange-cta`, `glass-card`, `hover-lift`, `motion-fade-up`). The rebrand should reuse these tokens exactly.
- The `src/data/use-cases.ts` and `src/data/project-diagnosis.ts` (not fully read but referenced) may need copy updates to align with the new PawTech Studio tone.

## Detailed Section Reorder Plan

**Proposed new `page.tsx` order:**

1. `PublicHeader` — updated nav anchors
2. `HeroSection` — new copy + CTAs
3. `ProblemSection` — preserve, minor copy tweaks
4. `ServicesSection` — clarified services
5. `ProjectDiagnosisSection` — preserve
6. **`AuthorityProductsSection`** — **NEW**: BuildingOS, CocinaCore, PawTech Studio
7. `ProcessSection` — preserve
8. `UseCasesSection` — preserve with minor copy
9. `ContactFormSection` — preserve, update SERVICE_OPTIONS
10. `Footer` — updated brand
11. `PublicLeadAssistantWidget` — renamed button

**Removed from page:** `ConceptEcosystemSection`, `MarketingSection`, `AILeadIntelligenceSection`, `ProjectTypesSection` (or merge its 6 stages into Services/Diagnosis).

**Note**: `ProjectTypesSection` currently shows 6 stages. The user narrative flow may absorb this into the Services or Diagnosis sections. Decision needed.

## Files to Create

- `src/components/sections/AuthorityProductsSection.tsx` — new component

## Files to Modify

- `src/app/page.tsx` — section reorder
- `src/app/layout.tsx` — metadata
- `src/components/sections/HeroSection.tsx` — copy
- `src/components/sections/PublicHeader.tsx` — nav, brand
- `src/components/sections/Footer.tsx` — brand, links
- `src/components/sections/ServicesSection.tsx` — copy, chips
- `src/components/sections/UseCasesSection.tsx` — copy
- `src/components/sections/ContactFormSection.tsx` — SERVICE_OPTIONS
- `src/modules/lead-assistant/components/PublicLeadAssistantWidget.tsx` — button label, header title
- `src/data/use-cases.ts` — copy updates

## Estimated Review Budget Impact

- Full reposition with new section + reorder + copy across ~12 files: likely **300–500 lines** of changes (additions + deletions).
- Decision needed before apply: **Yes** — confirm whether the user accepts the 3 clarifications above.
- Chained PRs recommended: **No** — this is a single cohesive rebrand; splitting would create an inconsistent intermediate state.
- 400-line budget risk: **Medium** — may slightly exceed 400 lines depending on the new AuthorityProductsSection length. If budget is strict, consider removing the `ConceptEcosystemSection` deletion (reduces deletions) or splitting into "rebrand copy" + "section reorder" PRs.
