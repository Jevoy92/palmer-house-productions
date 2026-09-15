# Palmer House site and Studio refinement contract

Updated September 14, 2026. User instructions supersede older four-page plans.

## Outcome

Restore the useful dedicated Studio pages, simplify navigation through clear grouping, and improve the existing public site and Studio as one coherent product. Preserve functionality and actual user data. The public polish from ec0a976 is explicitly authorized for restoration.

## Journeys and scope

Public: existing homepage, work, services, Pal discovery and all four lane detail pages, process, pricing, membership, inquiry, location and supporting routes. Inventory shared components and route-specific motion across the public site; retain static legal content and existing integrations.

Studio: sign-in and first-run onboarding; Home; Conversations and thread detail; Create campaign; Campaigns and results; Ideas; Library; Approvals; Calendar; Video roadmap; Brand DNA; Settings; Billing; Member success. Preserve existing deep links. My Work may remain as a compatibility overview but must not replace dedicated workflows.

Primary member journeys: resume work; capture an idea or talk to a Pal; deliberately build a campaign; inspect/edit/approve its outputs; schedule the work; maintain brand context. Home should surface real attention items and recent work instead of repeating every feature.

## Invariants

- Existing Satoshi/JetBrains typography and four brand lane colors; accessible darker ink variants for small text.
- Studio light theme, flat fills, clear grouping, compact rectangular controls and restrained rounded panels. No blanket card grids or ornamental dashboards.
- Keep genuine portfolio material, Pal identities, real data and working integrations. Remove unsupported numbers introduced as decorative examples.
- Production auth, permissions, payments and real communications remain intact. Synthetic visual fixtures use a separate development entry with local mocks and no API traffic.
- No rewriting published git history. Preserve concurrent Lovable edits; review any overlapping changes.

## Motion contract

One restrained spring family: visualDuration 0.24, bounce 0. Opacity fades are 0.16 seconds; reduced motion is immediate and fully operable. Use literal transform and opacity on hot paths. Movement must explain state, selection, hierarchy or continuity. Public narrative beats can take longer with the same family; frequent Studio controls stay short. No fake progress percentages, scroll-hiding core text, infinite attention pulses, layout-property animation or unbounded celebratory effects.

## Evidence and gates

Baseline source: 7d3d674 for Studio; ec0a976 for the restored public work. Save runnable checkpoints and comparable captures at 1440x900, 390x844 and an intermediate width. Review hover/press/focus/scroll, keyboard and reduced motion; record interaction evidence if the available tooling supports it and state any gap honestly.

Use inspected Linear product surfaces for shell/control hierarchy, Attio empty-workspace behavior and Notion setup focus. Public external references have separate jobs: Apple/Samsung explanation and product scale, Holo approachable dimensional storytelling, Instrument portfolio-to-inquiry, Linear interaction control. Verify live references and never claim blind or unmeasured superiority.

Functional gates: preserved dedicated routes, empty/loading/error recovery, draft recovery, thread identity, microphone cleanup, usable long conversation history, accessible menus/dialogs, visible focus and semantic controls, no horizontal overflow or missing imagery. Do not send live test inquiries or charge accounts.

Run relevant build/type/lint and meaningful regression tests. Use official MotionScore methodology when accessible. Record actual lab loading/layout measurements and conditions; no claims of real-user Core Web Vitals without field evidence. Independent critic reviews the actual rendered candidate against the contract and reference evidence without builder scores. Repair concrete defects and retain only improvements.

## Current state

The visual and workflow implementation and independent rendered review are complete; the full gauntlet remains incomplete because the measured mobile LCP target and authenticated integration gates are still open. Dedicated Studio pages and public polish are restored. The isolated fixture harness exercises the actual components without signing in or sending backend requests. See README.md and performance/README.md for verified checks, measured results, and remaining release checks. The original public checkout is left intact.
