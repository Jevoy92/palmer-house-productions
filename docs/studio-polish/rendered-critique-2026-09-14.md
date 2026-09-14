# Rendered review — 14 September 2026

Reviewed the actual local Studio components through the isolated fixture harness at `127.0.0.1:4175`, and the public homepage at `127.0.0.1:5175`. Studio data is entirely synthetic. This review does not verify authentication, billing, production data access, server persistence, or delivered messages.

## Evidence

- Baseline `7d3d674`: matched populated and empty Home at 1440×900 and 390×844, using the same fixture harness at port 4176. The source was extracted to a temporary directory; its provider was never mounted.
- Current Studio: Home, Conversations, populated chat, Create, Ideas, Campaigns, campaign detail, Library, Approvals, Calendar, Roadmap, Brand DNA, Settings, Billing, Work, and Member support at both viewports. Additional loading, workspace error, onboarding, signed-out, conversation-loading, and empty content states were captured.
- Public homepage: first fold plus eleven section headings at both viewports. These were visually inspected, including the portfolio, process, formats, region, comparison, testimonials, Pals, FAQ, and final CTA.
- Screenshots and timestamped layout reports are in `captures/`. Early `current-pages-*` images span live edits and therefore are review evidence, not a single final revision. Final acceptance should use a fresh capture after edits stop.
- Reference observations are recorded in `mobbin-references-2026-09-14.md`. Applicable principles: compact stable navigation, task controls adjacent to content, a short empty-state explanation with one useful action, and restrained use of decorated surfaces.

## Concrete findings sent to the builder

1. The floating Moodboard control overlapped the mobile composer and send button. It also obscured Home's Recent campaigns heading. The builder replaced it with Setup in the top bar. A fresh interaction check confirmed Setup closes with Escape and returns focus after its exit animation.
2. Mobile Calendar initially showed only Sunday–Tuesday of a wide month grid, hiding the scheduled Thursday item. The builder changed the initial narrow-screen view to List. The subsequent empty Calendar capture confirms the new default.
3. Create's first input was below the initial mobile viewport because the page stacked action links, a full brand summary, three step rows, and a second large heading. Roadmap and Brand DNA also spent much of the first viewport on introductory material and stacked controls. These observations were sent for compact layout repairs.
4. Campaign and Library artwork repeated abstract camera/phone illustrations despite containing actual written work. During the review the builder replaced those decorations with format labels, meaningful metadata, and a full Library editor.
5. Member support placed the help form after missions and promotional panels. It now starts with a standard page heading, direct section links, the support form, and included guidance. Benefits remain below; all missions, achievements, points, and Skill Lab access remain in an expandable progress section. Native radio inputs make help-type selection keyboard accessible. Failed requests show a recovery message and retain the draft.
6. The public comparison table clips later columns at 390px without an explicit horizontal-scroll hint. This was sent to the public-page owner. The Community event story portfolio video also showed a black resting frame while other videos showed footage; this is a poster/first-frame observation, not evidence of a loading failure.

## Interaction verification

`captures/interaction-report.json` records seven passing checks, with no external Studio requests or runtime errors:

- Mobile navigation traps focus, closes on Escape, and restores its trigger.
- Setup closes and restores focus after exit motion.
- Library full-editor changes and review status persist in local fixture state.
- Failed Library saves retain the edited draft and show an error.
- Failed chat submission creates the correct conversation view and restores the draft.
- Pending chat disables submission; resolving the mock completes the response.
- Workspace retry recovers the fixture from its error gate.

`captures/support-report.json` additionally records successful keyboard radio selection, a synthetic project-review request with campaign context, retained progress access, and draft recovery after a failed support request. Those checks also recorded no external requests or runtime errors. The repeatable scripts live in `dev/studio-preview/`.

The initial Setup assertion ran before the exit animation completed. The initial Library status selector was too strict. A pending-chat test also exposed overlap from the development toolbar itself; that toolbar is now collapsed by default. These were test/harness artifacts, not product regressions.

The Studio route captures recorded no document-level horizontal overflow, runtime errors, or external requests. Inner scrolling regions still require visual judgment; the Calendar and public comparison findings demonstrate why document width alone is insufficient.

## Final viewport and motion checkpoint

The `final-*` set captures populated/empty Home, Brand DNA, Calendar, and Member support at 1440×900, 390×844, and 1024×768. Home includes the new Setup control in the header. Populated Home at desktop and mobile was refreshed at 19:01 UTC after the existing JetBrains font was served locally; both images were visually inspected. The `reduced-motion-*` set uses Chrome's `prefers-reduced-motion: reduce` emulation at desktop and mobile sizes. These sets had no runtime errors, external requests, broken images, or document-level horizontal overflow.

The intermediate Calendar finding is resolved in the later `calendar-tablet-*` evidence. At 1024×768 it defaults to List using the measured content width. Explicit Month exposes a visible scrolling hint and a focusable calendar region; keyboard ArrowRight scrolling moved the region 178px and fully revealed Saturday. Month remained selected across 1440px, 390px, and 1024px resizes; explicit List also remained selected after resizing wide. Document width matched the viewport throughout, with no runtime errors or external requests. The two screenshots and `calendar-tablet-verification.json` record this later check; the earlier `final-calendar-*` images precede that repair.

Member progress now animates a full-width, left-origin `scaleX` transform rather than layout width. Mission entrances use the shared Studio motion contract. Reduced motion selects the shared zero-duration transition.

A finite S95 settling estimate is not a guarantee of 60 fps. Settled screenshots and synthetic interaction checks are also not proof that every state has completed a blind comparison gauntlet. This evidence covers the stated local fixtures, viewports, and interactions only.

Real mobile before/after clips are `captures/baseline-mobile-nav-chat.webm` and `captures/current-mobile-nav-chat.webm`. Native Playwright recording captured navigation, setup, and composer interaction against the isolated fixture servers. `captures/recording-report.json` records both origins, timestamps, and zero external requests/runtime errors. Frames were decoded and visually inspected from both recordings. The clips preserve the actual browser recording; no animation was manufactured from still screenshots.
