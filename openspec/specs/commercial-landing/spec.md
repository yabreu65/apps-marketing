# Commercial Landing Specification

## Purpose

Define the Phase 1 PawTech Studio landing position without expanding scope into new AI, backend, dashboard, or WhatsApp API capabilities.

## Requirements

### Requirement: Brand positioning and narrative order

The system MUST present the landing as **PawTech Studio**, include the tagline **"Tecnología que deja huella"**, and follow this narrative order: Hero, Problem, Services, Diagnosis, Authority, Process, Use Cases, Contact.

#### Scenario: Visitor understands the repositioned offer

- GIVEN a first-time visitor lands on the home page
- WHEN the visitor scans the hero and the first sections
- THEN the page identifies the brand as PawTech Studio
- AND the visitor can recognize the tagline and commercial flow

#### Scenario: Legacy brand references are avoided

- GIVEN the landing content is rendered across header, body, and footer
- WHEN a visitor reviews brand references
- THEN the primary visible brand naming remains PawTech Studio
- AND no section presents the old naming as the active commercial identity

### Requirement: Commercial services and authority proof

The system MUST present a service hierarchy covering web development, systems and dashboards, automation, MVP SaaS, and applied AI. The landing MUST include an authority section referencing BuildingOS, CocinaCore, and PawTech Studio products with `#` links until real URLs exist.

#### Scenario: Services are grouped by commercial value

- GIVEN a visitor compares service options
- WHEN the services section is viewed
- THEN the visitor can distinguish the core offer areas in a clear hierarchy
- AND the copy avoids a generic all-in-one narrative

#### Scenario: Authority section supports trust before contact

- GIVEN a visitor reaches the authority section
- WHEN product references are displayed
- THEN BuildingOS, CocinaCore, and PawTech Studio products are shown as proof of work
- AND each reference exposes a placeholder `#` link

### Requirement: Phase 1 scope-safe conversion framing

The system MUST keep contact conversion within manual Phase 1 scope. WhatsApp and contact CTAs MUST remain manual. Any existing AI widget MUST be framed only as quick diagnosis or conversion support and MUST NOT be presented as a new Phase 1 AI product. The current logo MAY remain unchanged.

#### Scenario: Manual contact path remains primary

- GIVEN a visitor chooses to contact the business
- WHEN the visitor uses the primary CTA or contact form
- THEN the offered path remains manual WhatsApp and/or contact form submission
- AND the page does not imply WhatsApp API, chatbot automation, or lead scoring

#### Scenario: Existing widget is repositioned without scope expansion

- GIVEN the floating assistant widget is visible
- WHEN the visitor reads its label or header
- THEN it is described as rapid diagnosis support
- AND it is not described as the main product or autonomous sales automation

### Requirement: Phase 1 quality baseline

The system MUST preserve Phase 1 baseline quality for SEO, responsiveness, and accessibility. The landing MUST expose PawTech Studio metadata, remain usable on mobile, tablet, and desktop, and SHOULD preserve accessible navigation, headings, and CTA discoverability.

#### Scenario: Metadata and semantic structure match the repositioning

- GIVEN the landing is indexed or shared
- WHEN metadata and headings are inspected
- THEN title, description, and share context align with PawTech Studio positioning
- AND the page keeps a single clear H1 with ordered headings

#### Scenario: Responsive and accessible CTA flow remains intact

- GIVEN a visitor browses on a mobile device or assistive workflow
- WHEN navigating sections and CTAs
- THEN the content remains readable and actionable
- AND navigation and contact actions stay discoverable without horizontal overflow

## Acceptance Criteria

- Primary brand and metadata are PawTech Studio with the tagline present.
- Narrative order, service hierarchy, authority references, and manual CTA scope match this spec.
- The widget is reframed as quick diagnosis support and baseline SEO, responsive, and accessibility expectations remain in scope.
