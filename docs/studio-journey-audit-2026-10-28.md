# Studio journey verification — 28 October 2026

## Scope and confidence

This follow-up goes beyond the shared-control/layout pass in PR #5. It exercised the actual Studio components through the isolated local browser preview at desktop 1440×1000 and mobile 390×844. All business data was synthetic. Browser interactions used the computer-use browser controls. No live payments, messages, bookings, or account changes were made.

This is evidence for the listed UI journeys, **not a claim that every feature or production integration has passed end to end**.

## Findings corrected

1. **Mobile campaign actions overlapped bottom navigation.** Clicking Next could activate Library instead. The campaign action bar now clears the navigation and safe area. Retested Socials → Blog & written → Film plan → Publish with clicks; hit testing confirms the button owns its center point.
2. **Settings billing link had an unreliable click area.** Its style depended on a chat stylesheet, leaving an inline anchor with a block SVG. The apparent link rectangle extended across empty space; keyboard worked but center clicks missed. It now has its own inline-flex 44px target and focus styling. Settings → Usage & plan → billing passes with a click.
3. **Returning Pal greetings were identical.** They now use the existing personality-specific opening composer. Kiana and Ryder display different greetings, while earlier messages retain Kiana's authorship.
4. **Campaign review requests silently failed.** Added a pending lock, disabled/busy feedback, visible retryable errors, and reset on completion. Verified injected failure displays an alert and enables retry.
5. **Campaign social previews could depend on stale generated output.** Saved assets now supply the displayed title/body; generated post IDs determine identity even when asset order differs. Legacy drafts without IDs retain ordered fallback. Presentation details remain available. Verified a Library edit appears in campaign Socials on mobile.
6. **Preview edit semantics diverged from production.** Extracted the existing edit-patch behavior into a shared pure helper, used by both providers. Structured content overrides and platform metadata updates now follow the same rules in the preview.
7. **Draft editor accessible naming included the character count.** Added a stable Post text/Script name independent of the changing counter.

## Browser journeys observed

| Area              | Observed result                                                                                                                                                                      |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Calendar          | Open post preview; edit and save text; change time with keyboard; save notes; reopen with values retained; edited text appears in Library.                                           |
| Library           | Open desktop side editor and mobile dialog; edit/save; saved filter; search; no-results guidance; image filter; list view; failed save retains editable draft.                       |
| Campaigns         | Library → campaign handoff; stage navigation; saved text appears in Socials; mobile Next controls reach written content, film plan, and publish overview.                            |
| Roadmap → Ideas   | Save customer-proof brief; Open in Ideas; Build this carries the selected brief into Content Engine.                                                                                 |
| Content Engine    | Synthetic angle request shows progress and results; build shows progress and coordinated output. These are fixture responses, not live AI quality tests.                             |
| Feed → Ideas      | Heart state changes; comment submits and appears; Save idea appears in Ideas.                                                                                                        |
| Chat              | Pending request shows Pal activity and blocks duplicate send; resolving appends a fixture response; injected error retains question and allows retry.                                |
| Pals              | Switch Kiana → Ryder; old messages keep original author; create a named custom Pal with a starting portrait; composer updates to its name. Generated portraits were not tested live. |
| Brand DNA         | Change business name; Save and continue reaches Audience; guide reflects edited name and existing colors/visual reference.                                                           |
| Shared memory     | Add titled memory and verify it appears in the workspace list. Provider/model portability is architectural, not a live model-switch test here.                                       |
| Settings          | Workspace, Shared memory, Team, Usage & plan, Account accessible; Usage link reaches billing. Previous PR tested tab keyboard control and switch states.                             |
| Billing           | Meter and cost list render; synthetic checkout failure states no payment was taken; member top-up buttons disabled; empty balance still permits opening/editing saved work.          |
| Guide             | Open guide; Next changes step; checklist displays progress and destinations.                                                                                                         |
| Search            | Global search routes to Library with query; Library filters and no-results state respond.                                                                                            |
| Mobile navigation | Chat drawer → Library closes drawer; bottom navigation remains present; modal draft editor opens and closes.                                                                         |
| Recovery/empty    | Workspace error → Try again restores dashboard; empty Library explains next step and offers conversation link.                                                                       |

## Corrections to preliminary observations

- The apparent time reset came from automation filling a native time input without the expected React change event. Keyboard input persisted correctly. No calendar time fix was warranted.
- The first social-preview failure also exposed incomplete mock edit behavior. The live provider already synchronizes valid platform metadata. The rendering hardening and shared helper remove dependence on that synchronization and improve test fidelity; the initial preview failure alone was not proof of a production data loss bug.
- Intermediate stale content during existing exit/enter animations was not treated as a failed navigation.

## Remaining limitations / known unavailable functionality

- Team explicitly says invitations are not available yet. This is not a complete team-administration feature.
- Live AI text/image/PDF generation, real voice input and metering, external research, social-account connection/publishing, Stripe checkout/webhooks, billing portal, email delivery, authentication, real storage/download persistence, and database authorization were not exercised against production in this pass.
- The harness uses in-memory records and a memory router. It proves local handoffs and state changes, not persistence across reloads or production routing/authentication.
- Synthetic credit allowance is deliberately fixture data and is not the current plan's real allowance.
- No claim of exhaustive accessibility conformance or every control on every route. This report lists actual coverage; earlier layout checks are documented separately.

## Automated validation

- Added five regression tests covering reordered post IDs, empty saved text, legacy matching, structured override retention, and platform metadata preservation.
- Final local check: lint, TypeScript, 204 unit tests, and production build pass. Existing lint/build warnings remain; see local check log.
- GitHub CI status must be checked on the exact PR commit before merging.
