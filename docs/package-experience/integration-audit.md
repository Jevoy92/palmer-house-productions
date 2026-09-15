# Collection integration audit

Audited 15 September 2026 against repository `main` at `0f13f79`, before the integration edits. Read `AGENTS.md` and the route instructions. This document records implementation ownership and compatibility decisions; the approved design inventory remains in `approved-reference.md`.

## Public route plan

| Route or component                        | Responsibility                                                                                                                                                             |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/shop`                                   | Canonical ten-package collection, text search and optional `lane` filter. One responsive implementation for mobile and desktop.                                            |
| `/packages/$packageId`                    | Shared package detail: visual example, scope, price, and add/update plan. Resolve legacy IDs to canonical IDs. Accept validated `count` scope from the guide.              |
| `/production-pricing`                     | Approved rate reference and editable estimate; retain `/pricing` redirect.                                                                                                 |
| `/checkout`                               | Review the persisted plan and continue through the real quote/payment workflow. Do not copy prototype payment-success simulation or seed customer carts from demo samples. |
| `/find-your-pal`                          | Two steps: goal, then starting scope. Show the dynamic recommendation and link to its package detail; no automatic cart mutation.                                          |
| `CollectionShell`                         | Shared compact commerce header, navigation, theme controls, footer and safe-area action dock.                                                                              |
| `PageShell`, Pal routes, homepage, offers | Preserve marketing structure. Link into the canonical collection/detail rather than maintaining separate package configurators.                                            |

The old website had four recommended shop starters, a separate mobile/desktop pricing builder, and no public package detail route. The design review board's three phone frames are review tools and should not be copied into the production website.

## Data and compatibility

- The user subsequently confirmed **$450 per filming session plus $150 per finished video**, with Evergreen starting at **$1,050** and five-minute additions at **$600**. Consumers read catalog constants and shared price/scope helpers; do not copy old included-minute pricing or the old free-split claims.
- Ten canonical packages: Social Content; Commercials; Product Demos; Customer Stories; Employee Spotlights; Onboarding; Safety Training; Sales Training; Video SOPs; Educational Videos. Lane counts are 1 / 4 / 4 / 1.
- Catalog/cart owner resolves the 22 old package IDs, persisted selected items and keyed scope/add-on/cadence data. IDs can collapse into one canonical package, so migration must preserve an intentional scope without silently multiplying a purchase.
- Keep standalone edited-minute add-ons separate from the new finished-video production model. Preserve legitimate offer and monthly discount rules, with server validation authoritative for checkout.
- New detail links should keep the router's normal search validation and scroll restoration. `routeTree.gen.ts` remains generated.

## Consumer changes in this pass

| File(s)                                                                                                            | Change                                                                                                                                                                     |
| ------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/routes/find-your-pal.tsx`                                                                                     | Compact approved goal/scope guide, lane 3D artwork, catalog prices and scopes, canonical detail handoff.                                                                   |
| `src/components/site/HomeLandingExtras.tsx`                                                                        | Canonical names and IDs; dynamic scope/price; homepage cards link to shared detail. Removed duplicate old minute-based package customizer. Other homepage sections remain. |
| `src/components/site/PalLanePage.tsx` and four Pal routes                                                          | Current package descriptions, per-video model, dynamic lane package counts, detail and filtered-collection links.                                                          |
| `src/components/site/MissionComparison.tsx`                                                                        | Package terminology, variable scope instead of old fixed video counts, current session/video/episode rates.                                                                |
| `src/routes/offers.tsx`                                                                                            | Current duo package names and canonical detail links; existing offers and monthly behavior retained.                                                                       |
| `src/routes/contact.tsx`                                                                                           | Project choices derive from the active package catalog. Existing contact validation/submission remains.                                                                    |
| `src/lib/dream-suite.ts`                                                                                           | Canonical starter IDs for tools and recommendations.                                                                                                                       |
| `src/data/nav.ts`, `src/components/site/SiteNav.tsx`                                                               | Consistent package discovery/search labels; preserve menu and focus behavior.                                                                                              |
| `src/routes/services.video-production.tsx`, `src/routes/startups.tsx`                                              | Replace obsolete included-minute/free-split claims with approved session and finished-video rates. Formats are agreed in scope.                                            |
| `src/data/site-faqs.ts`, `src/routes/faq.tsx`, `src/routes/resources.reviews.tsx`, `src/components/site/Stats.tsx` | Current package names, no automatic multi-format bundle promise, direct collection links where relevant.                                                                   |

## Ownership and review boundaries

- Main integration owner: collection, detail, pricing, checkout, shared commerce CSS, media dialog and assets.
- Data owner: pricing catalog, cart migration, offer eligibility, server quote/Stripe validation.
- Consumer owner: the marketing and guide files listed above.
- Add the ten canonical detail URLs to the sitemap and verify metadata/legacy links when routes are finalized.
- Retain the marketing site's existing `PageShell` and unrelated content. Its theme tokens are separate from commerce; `.dark` originally changed generic UI tokens but left several brand white/ink colors unchanged. Scope Light/Dark/System consistently within `CollectionShell` instead of applying a partial global inversion.
- Membership and Studio routes, pricing and product behavior are outside this change. Historical blog examples, company mission wording, and equipment “kit” descriptions are not catalog names and are not blanket-replaced.

## Validation handoff

Check all four guide goals and both scopes, back navigation, keyboard radio selection, theme changes, and the selected scope arriving on detail. From homepage, every lane, offers and contact, confirm current package names and valid links. Cart/checkout verification must cover old persisted carts, scope edit/remove, add-ons and offers, server-validated totals and the actual supported submission flow. Media previews must retain their fictional AI-example disclosure and captions.

Validation completed for the consumer changes: targeted ESLint passed; a temporary direct-source Node VM check passed 63 assertions covering the four guide goals, two scopes each, approved prices, canonical URLs, Evergreen count handoff, selection, and forward/back behavior. Full integration build and browser validation are coordinated by the main integration owner.

## Final combined content audit

The ten production records match the approved source exactly for canonical ID, lane, name, description, default scope, formats, and default price. All 22 old IDs resolve, all ten supplied package icons and caption files exist, and all 76 navigation-data paths match registered routes. No obsolete 22-package list or included-minute production pricing remains in active public production consumers. The unused old QuoteBuilder and MobilePricingView components were removed after their routes moved to the new shared experience.

The final pass added the ten detail URLs to the sitemap, a mobile Find Your Pal navigation link, and optional estimate extras. The five extras use the existing production catalog rates; saved eligible legacy extras remain visible and counted when editing. This deliberately preserves existing extras pricing rather than importing draft extras prices from the study. The production estimator configures named packages and scope; separate arbitrary custom-estimate line IDs from the prototype are intentionally not ported.

Validation: the optional-extras implementation passed 23 direct-source assertions with the actual cart and pricing modules, covering price math, selection persistence, deselection, existing quantities/cadence/sessions, package switching, and saved eligible add-ons. Targeted ESLint passed. The main integration owner coordinates the full build and browser checks.
