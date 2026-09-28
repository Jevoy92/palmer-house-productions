# Palmer House product design

## Current direction — September 28, 2026

The approved Option B collection → product detail → pricing flow is the canonical production purchasing experience. Preserve its visual examples, scope controls, included rows, working estimate, and persistent action dock. Desktop adapts that hierarchy; it does not replace it with generic subscription tiers.

The public site and Studio are one brand with three clear ways to work:

1. **Full production:** the human team plans, films, and edits a scoped project.
2. **Studio & software:** customers create and organize drafts with AI assistants.
3. **Planning & preparation:** human support with strategy, concepts, scripts, wardrobe, and on-camera preparation.

Packages sit inside full production, not alongside it as a separate service. Existing-footage editing and DIY resources remain available as narrower next steps.

## Runtime sources of truth

- `src/styles.css`: Satoshi variable display/body, JetBrains Mono utility labels, core tokens.
- `src/components/site/public-shell.css`: public neutral surfaces, shared navigation/footer, hero and section scale, accessible theme variants, reduced-motion rules.
- `src/components/site/public-home.css`: home, Studio demonstration and public storytelling compositions.
- `src/components/collection/collection.css`: approved Option B purchase component tokens and responsive layout.
- `src/components/studio/studio.css` and Studio component styles: workspace interface.
- `src/lib/pricing-catalog.ts`: production prices, package scope, inclusions.
- `src/lib/studio-model.ts` and `studio-credits.ts`: membership/consulting offers, credit allowances and action costs.
- `src/lib/pal-personas.ts`: conversational personality; `pal-directory.ts` and `pal-lanes.ts`: identities and supplied imagery.

Historical brand materials are references, not overrides for this approved UI. Where the archived HTML brand hub differs in fonts, beige backgrounds, or legacy offerings, the current implementation and this document take precedence.

## Visual rules

White or charcoal page surfaces. No beige page backgrounds or entire pages tinted for the selected Pal. Orange, purple, teal and green clarify selections, identities, or categories. In dark mode use the accessible lighter accent text variants. Theme choices are light, dark and system.

Use a strong concise heading, readable body copy, meaningful whitespace, restrained borders, and consistent action hierarchy. Use existing dimensional artwork for meaningful concepts; use familiar small utility icons for navigation and controls. Avoid floating decorative circles, repeated casts of all eight Pals, and excessive card nesting.

Use actual portfolio work for evidence. Fictional AI package examples must retain their explicit label. Do not reuse unrelated imagery just to fill a card. Show meaningful type-specific content when no contextual image exists.

## Pals and brand voice

Pals are AI creative assistants and brand characters, not the human production crew. All Pals can use the same Studio tools and shared workspace memory; choosing a Pal changes conversational style, not access to capabilities. Customer work and memory are stored independently of the model provider.

Express **Explorer** through customer agency, portable work, creative choice, and freedom to move between self-directed tools and human help. **Creator** supplies craft; **Sage** supplies clarity. This is a qualitative positioning choice, not a personality-test result. Avoid adventure clichés or visual costumes.

Use plain customer language before internal lane names. Distinct Pal voice can add warmth after the next step is clear. Do not promise outcomes, automatic publishing, production availability, or features unsupported by the actual product.

## Interaction contract

- Selection and relevant scope must persist through detail, estimate, plan, inquiry, sign-in and billing review.
- Production inquiry is not a charge or booking. An email draft is not a sent request.
- Studio plan selection is not authorization to charge. Review before checkout.
- Digital PDF fulfillment is currently manual and disclosed before payment.
- Every form has visible validation, pending, failure and honest completion/handoff states.
- Keyboard controls, focus restoration, escape dismissal, active navigation and touch targets must work.
- Motion is finite and purposeful: small entrances, hover/selection feedback, real loading states. Never imply background work or research happened when it did not.
- `useHydratedReducedMotion` prevents server/client initial-style mismatch. Honor reduced motion in CSS as well.
- Illustrative public Studio examples are explicitly labeled, interactive samples, not fabricated live AI sessions.

## Verification boundary

Test all five journeys (uncertain owner, production buyer, DIY creator, prep-only customer, returning visitor), both themes and system preference, mobile/desktop, keyboard/reduced motion, and empty/error states. Mock transactions and providers. Live AI credentials, deployed SQL migrations, authentication redirect allowlists, payment/webhook activation and manual fulfillment require deployment verification and are not established by a local build.
