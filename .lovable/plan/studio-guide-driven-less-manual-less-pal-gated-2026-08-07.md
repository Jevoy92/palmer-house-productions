# Studio: guide-driven, less manual, less Pal-gated

A single pass that makes the Studio feel finished for a customer who has never heard of the Pals, while making the guide you pick actually change the experience.

## 1. Pick your guide (and it matters)

- A "Your guide" picker in Settings and as one step in onboarding — the same 8-character grid used in Ask a Pal, no longer buried there.
- The chosen guide is stored once and read everywhere. Nobody starts on Kiana by default; a new account is asked once, and can skip (falls back to a neutral "Palmer House" voice, not a character).
- What the guide changes as you move around: the greeting and briefing byline, the accent color on eyebrows/tip surfaces/progress rings for that character's lane, the wording of hints, which quick tips appear on each page, and the avatar in the header and chat.
- Switching guides in Settings re-themes immediately, with a short confirmation from the new guide.

Lane colors stay the four canon Pal colors; the guide just decides which one leads.

## 2. Real character art, used properly

Current headshots are flat squares with baked-in white/purple backgrounds — that's the Kiana image that looks wrong.

- Produce 8 transparent-background portrait PNGs from the canon character renders (plus the existing full-body renders kept for larger placements), hosted as CDN assets.
- One shared `PalAvatar` component (sizes: xs chip, sm header, md card, lg hero) used in the header, guide picker, chat, checklists, campaign results, and onboarding. No more one-off `<img>` with a colored box behind it.

## 3. Stop asking for a Pal lane up front

- Content ideas and campaign creation lose the lane selector entirely. You describe the idea; that's it.
- The lane is assigned by the AI on the results page, shown as a labeled category with the matching character so people learn the system by seeing it, not by choosing it.
- Anywhere a lane is still shown, it reads as a content category ("Reel — short social"), not as a person you had to pick.

## 4. Much less manual thinking

Every free-text field and every "what should I make?" moment gets a suggestion plus a reroll:

- Brand DNA: each field already has guided suggestions; add "Fill from my website" for all fields at once and a reroll on each one.
- An **Opportunity Board** on the dashboard: 3 auto-generated, brand-specific topics with a one-line reason and a "Refresh" button, saveable straight to ideas.
- Content Engine: pre-fills a suggested core idea from Brand DNA and recent activity; reroll before generating.
- Assistant, ideas, and calendar entries all get regenerate actions with the same control.

## 5. Text tools get equal weight

Today the whole product reads as video-first. Campaign results and the dashboard will present two balanced tracks:

- **Video** — anchor video, shorts, shot direction.
- **Written** — long-form article, newsletter, platform posts, engagement replies, personas.

Dashboard tool cards and campaign result navigation are reorganized so the written track is not buried behind the video tabs.

## 6. Required video checklists per Pal

Each of the four lanes gets a fixed, industry-independent list of videos the business needs, distinct from the others:

- **Spotlight** — homepage clarity video, founder story, why-us, offer explainer, proof/testimonial, objection answer.
- **Reel** — hook-first tip, myth-buster, day-in-the-life, quick win, customer question, behind-the-scenes.
- **Evergreen** — how it works, pricing explainer, process walkthrough, FAQ, comparison, results breakdown.
- **System** — onboarding welcome, what-to-expect, support/how-to, internal culture, partner/referral, annual recap.

Each item shows a state (recommended → planned → filmed → complete), can be sent to the Content Engine in one click, and rolls into a per-lane and overall completion percentage. The existing roadmap becomes this checklist rather than a separate list.

## 7. Light gamification

- Tiers driven by real activity (campaigns built, checklist items completed, assets approved): Explorer → Creator → Producer → Studio → Legend, with a compact progress card.
- Confetti already fires on campaign completion; add it for finishing a lane checklist and for reaching a tier — nothing more.
- No points spam, no badges on every screen.

## 8. Nudges that respect what you've done

- The dashboard banner becomes a small rotating strip of next-best moves, each one derived from actual state (Brand DNA completion, unreviewed assets, empty checklist lanes, upcoming calendar dates).
- Anything you've completed drops out of the rotation permanently. The Brand DNA prompt disappears at strong completion — it is showing on the two live workspaces only because their Brand DNA is at 13% and 0%.
- Each card is dismissible for the session; the checklist keeps its subtle pulse only when something genuinely needs attention.

## Design

Everything follows the existing Studio system pulled from the Holo reference: light background, generous type scale, square-cornered cards, uppercase micro-labels with dot separators, no pills, no gradients, dot pagination. Character color only as accent.

## Technical notes

- Guide selection reuses `workspace_settings.preferred_pal` (already present) with `profiles.favorite_pal` kept in sync; a `usePalTheme()` hook exposes name, lane, tokens, avatar, and tip copy.
- Lane becomes optional on idea/campaign creation and is populated by the generation step; existing rows keep their lane.
- Checklist items extend `universalVideoLibrary` to 24 lane-balanced entries and persist through the existing `workspace_video_items` table — no schema change needed.
- Tier calculation is derived at read time from campaigns, approved assets, and checklist progress; no new tables.
- Opportunity Board and field rerolls run through the existing AI server functions with a small cached-suggestions path so refresh is cheap.
- New transparent avatars are added as CDN assets; the opaque square headshots are removed from the Studio surfaces.

## Decisions I made so you don't have to

- Guide is per-workspace, not per-user, so a team sees one consistent voice.
- Checklists are organized by the four lanes (each fronted by its two characters) rather than eight separate lists, so the total stays at 24 videos instead of 48.
- Skipping the guide picker is allowed and yields a neutral Palmer House voice.
