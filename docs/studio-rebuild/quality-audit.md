# Studio quality audit — September 28, 2026

## Result and scope

The local Studio now has neutral light/dark/system surfaces, distinct Pal welcomes and activity scenes, contextual navigation, per-draft image generation, shared model-independent memory, and a clearer content workflow. Approvals has been removed from the interface; old bookmarks redirect to Library.

This is an implementation and synthetic business-owner audit of the Studio. It is not a production certification, a public marketing-site SEO audit, or a measured Lighthouse report. Review data is fictional Daybreak Bakery content. No live customer data, AI credits, publishing account, payment, or database deployment was used.

## Design scorecard

Scores are editorial judgments against this project's approved references, not an automated certification.

| Area                             | Score / 10                    | Evidence and remaining limit                                                                                                                                                                                                            |
| -------------------------------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Visual hierarchy and consistency | 8.5                           | White/charcoal foundations, restrained Pal accents, supplied 3D scenes/icons, platform-specific previews. Long secondary forms can still be dense.                                                                                      |
| Mobile and desktop usability     | 8.5                           | 390×844 and 1440×1000 checks, reachable composer, mobile sheets, compact calendar list, no page overflow in the checked screens. Physical-device keyboard and safe-area testing remain.                                                 |
| Navigation                       | 9                             | Related-page links and Studio tools menu supplement sidebar/bottom navigation. Calendar post titles open previews. Focus returns after menus/dialogs. Legacy Approvals routes resolve to Library.                                       |
| Pal experience                   | 8.5                           | Eight distinct, contextual openings; authored answers retain their original Pal; custom name/personality/portrait flow; common capabilities. Live model personality quality is unverified.                                              |
| Motion and feedback              | 8.5                           | Brief entrances, word reveal, filter transitions, genuine working scenes, save/reaction feedback; device and in-app reduced motion. Activity scenes are static illustrations with UI motion, not generated animated films.              |
| Content and image relevance      | 9                             | Each output stores its own image brief. Editor sends exact asset identity; private association is checked on the server. Native covers/storyboards use actual saved text. Final AI image quality still depends on the configured model. |
| Accessibility                    | 8                             | Keyboard filters/tabs, menu/dialog focus, labels, error retention, reduced motion, palette contrast checks. No claim of a complete WCAG or assistive-technology certification.                                                          |
| Persistence and memory           | 9                             | Workspace-scoped canonical memory, provenance, revision conflicts, exports and explicit forgetting; cross-Pal context and model changes tested. Live migrations still need deployment.                                                  |
| Performance                      | Not scored                    | Production build passes. Studio client chunk is about 676 kB minified / 192 kB gzip and triggers Vite's size warning. No production Core Web Vitals measurement was taken.                                                              |
| Search indexing / SEO            | Appropriate for a private app | Studio routes inherit noindex/nofollow. Public marketing SEO, sitemap and search ranking were outside this Studio pass.                                                                                                                 |
| Production readiness             | Conditional                   | Local behavior and build verified. Live credentials, migrations, storage, paid generation, account/billing and publishing integrations require deployment checks.                                                                       |

## Business-owner journeys verified

1. Open a returning chat, switch through all eight Pals, preserve earlier authorship, dismiss a welcome, and start a new conversation.
2. Type, send, recover failed input, open history, load earlier messages, archive, and avoid late responses crossing conversations.
3. Create a custom Pal with name/personality, describe a portrait, preview/save it, and retain fields after generation failure.
4. Open a campaign inside chat; use keyboard platform tabs; preview and edit saved content.
5. Browse/filter/search Library; switch list/grid; save/unsave; preserve failed edits and focus.
6. Generate an image for one specific draft; require text to be saved first; keep image direction after failure; prevent closing away an in-flight request; reopen the private linked image; preserve other drafts' artwork.
7. Heart/comment/save a Feed discussion; retain failed comments. Backend tests cover automatic visit generation, exact allowed citations, atomic replies, cooldown, duplicate prevention and failed-provider cleanup.
8. Capture and edit Ideas, keep source context, filter by purpose, save a roadmap suggestion and open it in the campaign builder.
9. Open Calendar posts directly; copy/edit draft text; preserve failed changes; save dates, midnight times, status and notes; navigate months; plan only future days and usable unscheduled drafts.
10. Edit Brand DNA; remain on the current step after a failed save; preview a visual guide; keep valid reference images when one upload is unavailable.
11. Understand the roadmap as reusable video concepts/scripts, then save a starting brief or update production progress.
12. Use related-page links, the Studio tools menu and mobile navigation; verify empty and error states in both themes.

## Reproducible evidence

- 66 unit/server/helper tests passed across the recovery, voice, memory, asset visual, calendar planning, Pal greetings, proactive media and secondary-journey suites.
- 11 production-provider conversation lifecycle checks passed with isolated local services.
- 24 new offline PostgreSQL checks passed for proactive feed leases and per-output image associations, including auth, workspace boundaries, stale revisions, duplicates and transactional replies. PGlite is a test tool, not a production dependency or load test.
- 30 business-owner browser journeys passed.
- 27 core interaction/Pal checks passed across the full run plus the corrected mobile new-conversation journey rerun.
- 3 draft-image browser checks passed: success, retained-input failure and protected pending state.
- Browser suites reported zero page errors and zero external requests.
- TypeScript and production build passed. Scoped lint: no errors; existing component/helper fast-refresh warnings remain.

Scripts: `scripts/studio-*.test.mjs`, `scripts/pal-greetings.test.mjs`, `scripts/studio-proactive-migration.check.mjs`, `dev/studio-preview/verify.mjs`, `dev/studio-preview/business-journey.mjs`, and `dev/studio-preview/draft-image-check.mjs`.

Captures and machine-readable reports are kept outside Git in `../Studio Rebuild Review/Final Studio audit/`.

## Issues found and corrected

- Returning chats and Pal switches lacked a personal opening. Added contextual, dismissible welcomes with distinct voices; background refreshes do not interrupt the conversation.
- Working avatars were generic. Added each Pal's own scene during actual requests, with reduced-motion support.
- Image generation had no reachable exact-draft control. Added it to draft editors and fixed private-image resolution in chat and Library.
- Shared campaign imagery could blur the subject of individual outputs. Added per-output briefs and validated image associations; unrelated drafts remain unchanged.
- Calendar list ignored the selected month; month navigation could skip February; overflow events were unreachable; midnight could move to 10 AM. Corrected all four.
- Month planning could place new work in the past or guess a platform. It now uses future days and known channels, and reports partial completion accurately.
- Brand save failures advanced the workflow. Failed edits now remain on the step with a persistent error; reference fields have labels.
- Ideas could not be corrected in place. Added Edit/Save/Cancel with error retention and pending locks.
- Pal-switch success toasts stacked over the conversation. The visible new Pal and welcome now provide the confirmation.

## Honest boundaries

- The local preview uses clearly labeled synthetic model results. Production handlers are wired, but real text/image quality and paid generation were not verified here.
- Feed discussions are grounded in stored Studio context. They do not claim to have browsed the web. External research needs a real retrieval integration with source provenance.
- Uploaded Idea images/links stay attached; direction suggestions use the owner's written context rather than claiming to analyze that source.
- Avatar creation produces a still portrait. The activity treatment animates supplied artwork; custom cinematic action clips remain a future asset-production option.
- Video generation is not exposed. Scripts, storyboards, thumbnails and optional attached footage are separate concepts.
- The Motion React runtime is used. No callable Motion+ AI Kit MCP was available in this session, so no premium MotionScore result is claimed.
- Long-lived conversation/file storage is canonical. Runtime prompts retrieve a bounded recent/relevant context window, not every historical token at once.
