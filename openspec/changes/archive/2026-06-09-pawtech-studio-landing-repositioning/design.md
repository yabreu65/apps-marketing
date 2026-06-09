# Design: PawTech Studio Landing Repositioning

## Technical Approach

Implement the repositioning as a landing-only content and composition change. Keep the existing Next.js App Router page, section component pattern, Tailwind utility styling, design tokens, manual contact flow, current logo asset, and existing interactive diagnosis/form logic. Update `src/app/page.tsx` to the required order: Hero → Problem → Services → Diagnosis → Authority → Process → Use Cases → Contact, then reframe the floating assistant as quick diagnosis support without adding AI/backend scope.

## Architecture Decisions

| Decision | Choice | Alternatives considered | Rationale |
|---|---|---|---|
| Narrative composition | Reorder imports/rendering in `src/app/page.tsx`; remove `ConceptEcosystemSection`, `MarketingSection`, `AILeadIntelligenceSection`, and `ProjectTypesSection` from the homepage composition. | Keep all sections and only rewrite copy. | The spec requires a tighter commercial flow; the current long page dilutes conversion and has obsolete anchors. Components can remain in the repo unless a later ADR approves deletion. |
| Authority proof | Create `src/components/sections/AuthorityProductsSection.tsx` using existing `Container`, `SectionHeading`, `Card`/glass styling, and placeholder `#` links. | Add products to `UseCasesSection` or footer only. | A dedicated section makes BuildingOS, CocinaCore, and PawTech Studio visible before the process/contact steps, as required by the spec. |
| AI widget scope | Change labels/header/footer copy in `PublicLeadAssistantWidget` to “Diagnóstico rápido con IA” / conversion support; do not change API calls, prompts, scoring, or backend behavior. | Hide widget or expand it into a product feature. | The widget is pre-existing; this change must reduce scope ambiguity without introducing a new Phase 1 AI product. |
| Contact path | Preserve contact form submission and manual WhatsApp CTA behavior only. | Add WhatsApp Cloud API or automated routing. | Phase 1 explicitly allows manual contact only and excludes WhatsApp API, CRM, dashboard, and automation expansion. |
| Logo | Keep `/logoTech.png`, update alt text to PawTech Studio. | Redesign or swap logo asset. | User decision says current logo is retained and redesign is deferred. |

## Data Flow

Visitor scrolls through static/composed landing sections, optionally runs the existing diagnosis, then submits the manual contact form or WhatsApp handoff.

```text
page.tsx
  ├─ static sections: Header/Hero/Problem/Services/Authority/Process/UseCases/Footer
  ├─ ProjectDiagnosisSection ──saveDiagnosisContext──→ ContactFormSection
  └─ PublicLeadAssistantWidget ──existing chat/contact CTAs──→ form or manual WhatsApp
```

## File Changes

| File | Action | Description |
|---|---|---|
| `src/app/page.tsx` | Modify | Reorder sections; import/render `AuthorityProductsSection`; stop rendering removed homepage sections. |
| `src/app/layout.tsx` | Modify | Update title, description, and Open Graph to PawTech Studio and “Tecnología que deja huella”. |
| `src/components/sections/AuthorityProductsSection.tsx` | Create | Product authority cards for BuildingOS, CocinaCore, and PawTech Studio with `#` links. |
| `src/components/sections/PublicHeader.tsx` | Modify | Update brand alt text, nav labels/anchors (`#soluciones`, `#diagnostico`, `#autoridad`, `#proceso`, `#casos`, `#contacto`) and CTA copy. |
| `src/components/sections/HeroSection.tsx` | Modify | Rebrand eyebrow/headline/subtitle to PawTech Studio and tagline; keep one H1 and existing CTAs. |
| `src/components/sections/ServicesSection.tsx` | Modify | Clarify service hierarchy: landing pages, websites, systems/dashboards, automation, AI assistants/chatbots, MVP SaaS; keep phase-safe wording. |
| `src/components/sections/ContactFormSection.tsx` | Modify | Sync `SERVICE_OPTIONS` with service hierarchy and keep manual response/privacy copy. |
| `src/components/sections/Footer.tsx` | Modify | Update PawTech Studio naming, tagline, links, and manual/phase-safe language. |
| `src/components/sections/ProjectDiagnosisSection.tsx` | Modify | Minor copy only; keep state and `saveDiagnosisContext` behavior. |
| `src/components/sections/UseCasesSection.tsx` / `src/data/use-cases.ts` | Modify | Align examples with the new brand/services narrative. |
| `src/modules/lead-assistant/components/PublicLeadAssistantWidget.tsx` | Modify | Rename visible widget/header/footer labels only. |

## Interfaces / Contracts

No API, database, Prisma, or route contracts change. New component contract should be a named export with local static data:

```ts
export function AuthorityProductsSection(): JSX.Element
```

Each product card must expose `{ name, description, href: '#' }`; no external URL dependency is introduced.

## Testing Strategy

| Layer | What to Test | Approach |
|---|---|---|
| Unit | Widget copy remains scope-safe. | Update/add Vitest assertions in `src/modules/lead-assistant/tests/public-widget-copy.test.ts` if it covers visible labels. |
| Regression | Existing form, diagnosis, public chat, and lead validation behavior. | Run `npm test`; avoid changing backend/API logic. |
| Quality | Metadata, anchors, responsive layout, heading order, CTA discoverability. | Run `npm run lint`; manual browser check at mobile/tablet/desktop widths. |

## Migration / Rollout

No migration required. Rollback is a single revert of landing composition/copy and the new authority component.

## Open Questions

- None blocking. Real product URLs remain deferred; use `#` links per spec.
