# Palmer House Studio and public-site refinement

September 14, 2026. Candidate for creative review, based on `7d3d674`. The implementation restores the useful Studio pages while simplifying how members find and use them. It also restores the approved public-site polish from `ec0a976` and applies a shared motion system across both surfaces.

## What changed

Studio navigation now groups Home and Conversations, production tools, and business context. Campaign creation, Campaigns, Ideas, Library, Approvals, Calendar, Video Roadmap, Brand DNA, and Member support remain distinct, reachable workflows. Settings and Billing remain in the account menu; historical links continue to work. Home surfaces recent work, upcoming dates, and a conversation with the member's Pal.

The restored Ideas page supports text, links, images, uploads, business-problem context, generated directions, filtering, editing, archive/undo, and a direct handoff into campaign creation. Library and Approvals expose full content for reading and editing. Saved plain-text edits remain visible when reopening a campaign, while structured metadata is preserved. Calendar has a date/status editor, a narrow-screen List default, and accessible scrolling when a wider mode is explicitly chosen.

The Studio shell uses a quiet navigation rail, compact controls, readable contrast, meaningful lane colors, and flatter lists. Brand DNA and the campaign builder bring the actual inputs higher on mobile. Setup moves into the header so it no longer covers the composer. Member support leads with asking for help; benefits and progress remain available below.

Conversation fixes preserve drafts and attachments across route changes, keep thread identity consistent, preserve the viewport when loading older messages, roll back failed optimistic exchanges, prevent stale requests from replacing newer conversations, and stop recording when leaving the composer. Workspace loading failures offer a real retry instead of appearing to be a new account.

The public-site restoration replaces detached graphics, blank pills, and repeated white cards with consistent brand-colored tags, clearer sections, and purposeful Pal imagery. The work rail now has seven user-playable films with genuine poster frames rather than 28 looping autoplay instances. Small headshot placements use inspected derivatives totaling 27 KB instead of 1.37 MB; original artwork remains available for larger placements. Public navigation, comparison scrolling, progress, and reduced-motion behavior were refined. Critical Hero text is visible in server HTML; the existing fonts are served locally, with Satoshi preloaded.

Motion uses the existing Motion library and inspected Motion+ guidance: one restrained spring, short opacity fades, explicit transform/opacity paths, and immediate reduced-motion alternatives. Timer-based generation percentages, infinite attention effects, and loaded-history message entrances were removed. No new runtime library or lockfile change was needed.

## Review and evidence

- [Refinement contract](contract.md)
- [Independent rendered critique](rendered-critique-2026-09-14.md)
- [Inspected product references](mobbin-references-2026-09-14.md)
- [Motion source inventory](motion-inventory.md)
- [Measured performance and conditions](performance/README.md)
- [Eleven lifecycle regression checks](lifecycle-tests.md)
- [Runnable isolated preview and capture scripts](../../dev/studio-preview/README.md)

Matched Home comparisons use the same synthetic workspace and data. Desktop: [before](captures/baseline-home-populated-1440x900.png), [after](captures/final-home-populated-1440x900.png). Mobile: [before](captures/baseline-home-populated-390x844.png), [after](captures/final-home-populated-390x844.png).

The local audit also retains route/state captures, reduced-motion captures, raw Lighthouse reports, and native browser recordings under `docs/studio-polish/`. These larger generated files are ignored by Git; the scripts reproduce them. The before/after clips are named `baseline-mobile-nav-chat.webm` and `current-mobile-nav-chat.webm`. They record real synthetic-preview interactions, not reconstructed animation.

## Validation and limits

TypeScript, the production build, scoped lint, lifecycle tests, and synthetic browser interaction checks were run. Rendered reviews include 1440×900, 390×844, and 1024×768. The independent critic found and returned concrete issues, including the obstructed composer, excessive mobile introductions, and Calendar clipping; fixes were verified in the running UI. Numerical lab and motion results, including initial failures and subsequent changes, are recorded with their conditions in the performance report.

Studio screenshots and interaction tests use actual components with synthetic local data. They do not certify live authentication, database persistence, generation, billing, or support-message delivery. The mobile lab LCP target remains unmet after several measured approaches, so the full gauntlet is incomplete. Real backend integration, public inquiry success/failure coverage, and final creative review also remain release checks. No live inquiry, support request, payment, or production-data mutation was made during this audit. These changes do not claim field Core Web Vitals, blanket accessibility compliance, or visual superiority to external references.

Run the real application with `pnpm dev`. Run the separate Studio preview using the command in its README. This Cloudflare-targeted build was checked using `wrangler dev --local --config .output/server/wrangler.json`; the generated `vite preview` suggestion did not correctly locate its server entry in this environment.

Recommendation: review the restored information architecture and visual candidate. Before publication, profile the remaining critical loading path and exercise an authenticated workspace's create → edit → approve → schedule flow, plus inquiry validation and recovery in a non-delivering test environment.
