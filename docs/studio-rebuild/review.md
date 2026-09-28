# Studio rebuild review

This checkpoint implements the recovered Studio requirements against the approved screenshots. It is on `codex/studio-recovery-rebuild`, based on `main` at `9577ea3`. Review locally before merging or publishing.

## What changed

- Chat is the Studio entry point, with saved campaign tabs, native draft previews, a desktop inspector and mobile editor sheet.
- The existing eight Pals keep distinct voices. Custom names, personalities, portraits and historical author identities persist through workspace-scoped records.
- Feed discussions use saved workspace context. Members can comment, heart, save an idea and build a campaign.
- Library uses actual media, text previews and the supplied transparent 3D artwork. Chat and Library edit the same assets.
- Calendar puts the actual post or script before scheduling details. Month planning uses existing unscheduled drafts. Brand DNA has a visual guide; the roadmap describes reusable video concepts and scripts.
- Light, Dark and System preferences, larger text and reduced motion apply across the Studio. Completion messages sit below navigation.
- Image and PDF generation use server-authenticated storage and Library records. Video generation is not included.

## Reference comparison

The supplied desktop editor and mobile boards were compared with actual component captures at 1440 × 1000 and 390 × 844.

| Reference feature          | Implementation and review result                                                                                                                                     |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Desktop shell proportions  | 72px top bar, 244px sidebar, 390px right inspector. Verified viewport height and width without document overflow.                                                    |
| Calm light / dark palettes | White-lilac and charcoal-violet, with purple actions and hairline borders. Photographs keep their original colors. Dark action text uses a contrasting foreground.   |
| Pal-led chat               | Same compact portrait/name header as the supplied rendered mobile screenshot; history and creation remain reachable. Previous messages retain their original author. |
| Campaign in conversation   | Seven actual asset tabs, platform identity, saved status, photo, Edit/Open actions and persistent composer. Editor saves update the conversation and Library.        |
| Visual Library             | Search, type pills, campaign folder, two-column mobile cards and full-width media. Mobile editing opens from the preview to keep cards compact.                      |
| Editor structure           | Preview/Edit tabs, readable textarea, image, Pal refinement and a fixed save footer. Mobile sheet keeps actions visible and restores focus.                          |
| Graphics                   | Reused 16 unique supplied transparent 3D PNGs and existing Pal portraits; actual content media takes priority over format graphics.                                  |
| Motion                     | Short entrances and request-based activity. Device and in-app reduced-motion preferences disable movement; no simulated completion progress.                         |

### Intentional content differences

The bakery photo is a new, fictional development-fixture image rather than a recovered customer file. The seven tabs show the actual fixture formats, including Newsletter and Image, instead of duplicating a channel label. Editor refinement says it continues in chat. Save status reports the real current state. Decorative phone hardware from the concept boards is omitted from the working app.

## Review locally

Run `./node_modules/.bin/vite --config dev/studio-preview/vite.config.ts` and open:

- Chat: `http://127.0.0.1:4175/?view=assistant&state=populated&controls=0`
- Library: `http://127.0.0.1:4175/?view=library&state=populated&controls=0`
- Feed: `http://127.0.0.1:4175/?view=feed&state=populated&controls=0`

The review uses actual UI components with isolated, labeled synthetic fixtures. Navigating between pages retains fixture changes; reloading resets them. The preview does not connect to a customer account or publish content.

## Verification and deployment boundary

TypeScript includes the preview fixture contract. Production build passes; Vite retains its bundle-size advisory. Backend checks pass: 15 recovery tests, seven existing voice tests and 21 isolated PostgreSQL checks. The 11 existing conversation lifecycle regressions also pass. All 14 updated preview regression checks pass, with zero browser errors and zero external requests. Additional browser review covers Feed saves/comments, Calendar and roadmap actions. Changed implementation files have no lint errors; five development fast-refresh advisories remain. See `chat-spec.md`, `visuals.md` and `../studio-recovery/backend-handoff.md` for detailed evidence.

Before live release, apply the new Supabase migration and verify live image/text generation, private uploads and signed downloads with the deployed AI credentials. No AI credential is configured locally, so this checkpoint does not claim that paid live generation has been verified. PDF output is real and paginated; the current font supports Latin/WinAnsi text.

Recovered conversation transcripts and user screenshots are backed up outside the repository. They are not included in the implementation commit.
