# Proposal: PawTech Studio Landing Repositioning

## Intent

The current landing presents **PAW Tech** as a generic digital-services aggregator. The brand lacks a clear commercial identity, the narrative flow is scattered, and the ecosystem/marketing/AI sections dilute the core message. This change repositions the brand as **PawTech Studio** with the tagline *"Tecnología que deja huella"*, tightens the narrative to Hero → Problem → Services → Diagnosis → Authority → Process → Contact, and clarifies services to improve conversion.

## Scope

### In Scope
- Reorder `page.tsx` sections to the new narrative flow.
- Rewrite `HeroSection`, `ServicesSection`, `PublicHeader`, and `Footer` copy for PawTech Studio positioning.
- Add `AuthorityProductsSection` (BuildingOS, CocinaCore, PawTech Studio) with placeholder links.
- Reframe the existing `PublicLeadAssistantWidget` as *"Diagnóstico rápido con IA"* (conversion support, not primary product).
- Update `layout.tsx` SEO metadata and `PublicHeader` nav anchors.
- Sync `ContactFormSection` `SERVICE_OPTIONS` with clarified services.
- Minor copy updates in `UseCasesSection`, `ProjectDiagnosisSection`, and `src/data/use-cases.ts`.

### Out of Scope
- New logo asset design (keep current logo).
- AI Lead Assistant as a Phase 1 product (it remains a pre-existing conversion support element).
- WhatsApp Cloud API integration.
- Backend or API changes.
- Removing the widget entirely.

## Capabilities

> This change is a content/structural rebrand of the landing page. No new functional capabilities are introduced and no existing capability requirements are altered.

### New Capabilities
- None

### Modified Capabilities
- None

## Approach

1. **Reorder**: Remove `ConceptEcosystemSection`, `MarketingSection`, and `AILeadIntelligenceSection` from `page.tsx`; insert the new `AuthorityProductsSection` after `ProjectDiagnosisSection`.
2. **Rewrite**: Update hero headline, subtitle, eyebrow, and CTAs to reflect *"Páginas web, sistemas e IA para negocios que quieren dejar huella."* Clarify services list in `ServicesSection`.
3. **Add**: Create `AuthorityProductsSection.tsx` with simple descriptions for BuildingOS, CocinaCore, and PawTech Studio (placeholder `#` links until real URLs exist).
4. **Reframe**: Rename widget button and header to *"Diagnóstico rápido con IA"*.
5. **Sync**: Update nav anchors, footer copy, metadata, and form service options.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/app/page.tsx` | Modified | Section reorder and removals. |
| `src/app/layout.tsx` | Modified | SEO title/description rebrand. |
| `src/components/sections/HeroSection.tsx` | Modified | New headline, subtitle, CTAs. |
| `src/components/sections/PublicHeader.tsx` | Modified | Nav labels and anchors. |
| `src/components/sections/ServicesSection.tsx` | Modified | Clarified service list and copy. |
| `src/components/sections/Footer.tsx` | Modified | Brand name and description. |
| `src/components/sections/UseCasesSection.tsx` | Modified | Copy alignment. |
| `src/components/sections/ContactFormSection.tsx` | Modified | `SERVICE_OPTIONS` sync. |
| `src/components/sections/ProjectDiagnosisSection.tsx` | Modified | Minor copy tweaks. |
| `src/components/sections/AuthorityProductsSection.tsx` | New | Products authority section. |
| `src/modules/lead-assistant/components/PublicLeadAssistantWidget.tsx` | Modified | Button/header rename. |
| `src/data/use-cases.ts` | Modified | Copy alignment. |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Anchor link breakage after reorder | High | Update `PublicHeader` `NAV_ITEMS` and all section `id` attributes in one commit. |
| AI widget scope contradiction (Out of Scope in PRD) | Med | Document as pre-existing implementation; rename only, no new backend logic. |
| Review budget exceeds 400 lines | Med | Scope is copy + reorder + one new component (~300–500 lines). If budget is strict, split into "rebrand copy" PR then "reorder + authority" PR. |
| SEO/metadata drift | Low | Update `layout.tsx` title, description, and Open Graph tags. |

## Rollback Plan

- Revert `page.tsx` to restore the original section order and component imports.
- Revert copy changes in `HeroSection`, `ServicesSection`, `PublicHeader`, and `Footer`.
- Restore `layout.tsx` metadata to "PAW Tech".
- Rollback can be done via a single git revert if the change is committed as one unit.

## Dependencies

- None

## Success Criteria

- [ ] Every brand reference reads **PawTech Studio**; tagline is present.
- [ ] Section order matches Hero → Problem → Services → Diagnosis → Authority → Process → Use Cases → Contact.
- [ ] Services list explicitly covers: landing pages, professional websites, internal systems, dashboards, automation, AI chatbots/assistants, MVP SaaS.
- [ ] `AuthorityProductsSection` exists with BuildingOS, CocinaCore, and PawTech Studio cards.
- [ ] `PublicLeadAssistantWidget` button/header is renamed to *"Diagnóstico rápido con IA"*.
- [ ] All `PublicHeader` nav anchors scroll correctly to existing sections.
- [ ] SEO metadata and Open Graph tags are updated.
- [ ] Review diff stays within or justifies the 400-line budget.
