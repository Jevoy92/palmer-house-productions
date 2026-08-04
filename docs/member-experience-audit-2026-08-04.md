# Palmer House Studio member-experience audit

Date: 2026-08-04  
Branch: `codex/palmer-dream-suite`

## Product rule

Reward useful work, not empty activity. No essential access is locked behind points. Human help,
project review, and honest feedback remain visible without requiring a streak or artificial level.

## Repeat audit — iteration two

The owner-preview workspace was run again as both personas after the content-intake, Pal-planning,
motion, and tap-target corrections. The second pass deliberately used a clean browser tab so stale
hot-reload warnings could not hide a current runtime problem.

| Area              | First-pass friction                                                                                  | Second-pass result                                                                                                                                                                                                                                                               |
| ----------------- | ---------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Starting material | The main Content Engine assumed the member could already state an idea.                              | Members can start with writing, a public link, or a real JPEG/PNG/WebP. The source is separated into visible evidence, business problem, audience decision, and a campaign-safe angle.                                                                                           |
| Pal guidance      | The workflow was contextual, but the owner preview echoed generic suggested questions too literally. | Suggested questions resolve into concrete campaign subjects. The selected Pal remains the lens, while Brand DNA, campaigns, and calendar remain the working context.                                                                                                             |
| Direct action     | Recommendations were useful but could still feel advisory.                                           | Every recommended move includes **Save idea** and **Plan next week** shortcuts; Brand DNA memory changes remain approval-only.                                                                                                                                                   |
| Campaign result   | Platform writing and a production plan were present, but the visual direction remained static.       | The result includes a controlled Remotion direction check with real campaign inputs, player controls, no autoplay, no loop, and a legible paused state.                                                                                                                          |
| Exportable motion | No separate production composition existed.                                                          | A matching HyperFrames campaign-direction composition now exists with editable timeline targets, deterministic finite motion, Satoshi, and the exact Evergreen lane token. Its complete check passes lint, runtime, 9 layout samples, motion, and 37/37 WCAG AA contrast checks. |
| Mobile controls   | A few 44px controls landed fractionally below the target after browser rounding.                     | Rechecked at 360×900 and 1440×1000: no audited interactive target is below 44px.                                                                                                                                                                                                 |

No console errors or warnings remained in the clean final browser session.

## Audience, Brand Guide, and campaign-graphics expansion

The Studio no longer assumes every member is a conventional small business. Onboarding now records
both the kind of work the member does and the result they want, with paths for businesses, authors,
musicians, creators, podcasters, streamers, nonprofits, agencies, coaches, speakers, and a custom
answer. Those answers now travel with Brand DNA into campaign generation and Pal guidance.

Brand DNA is now a progressive Brand Guide workspace rather than a short profile form. It accepts
identity, audience, offer, voice, visual, photo, motion, editing, platform, proof, AI-rule, website,
social, guide, logo, moodboard, product, photo, and font inputs. A 16-part completion meter makes
missing context visible, and the member can export the current source of truth as a dense,
print-ready guide. References persist in `brand_references` behind workspace-member RLS.

Campaign results now include a purpose-bound carousel graphic builder. It receives the campaign
strategy and Brand DNA directly, offers five controlled visual systems, renders a seven-slide
1080x1350 set in the correct lane color, and downloads either one SVG or the full printable set.
There is deliberately no unrelated prompt playground.

Member Success now distinguishes remote and on-site filming-space consulting, and introduces the
high-touch `$25,000` 90-Day Video Leverage Partnership with weekly strategy, a complete brand and
campaign roadmap, review, and a choice of Zoom or an on-site environment session. The public
membership page carries the same offer without displacing the recurring plans.

The production Supabase project received migration `studio_brand_guide_profiles`. Column, table,
migration-history, and RLS-policy checks passed after deployment. Supabase's advisor reported no
new migration-specific security problem; two pre-existing warnings concern intentionally callable
campaign-usage RPCs, and unused-index notices are expected on this newly seeded workspace.

## Persona 1 — solo service-business owner

**Situation:** Has a useful idea or before/after example, but is unsure what to say, film, or post.

Journey tested:

1. Opens Brand DNA and gives the Studio business context.
2. Captures a problem as text, link, or image.
3. Uses the video roadmap and Ask a Pal to choose a useful format.
4. Builds a connected campaign and gives the work a date.
5. Uses the Skill Lab for the mission spinner, camera-ready check, and Pal finder.
6. Submits a question or attaches a campaign and reference link for Palmer House review.

Second-pass score (first pass → final):

| Dimension       |  First |  Final | Evidence                                                                                  |
| --------------- | -----: | -----: | ----------------------------------------------------------------------------------------- |
| Clarity         | 8.8/10 | 9.6/10 | Text, link, and image inputs all end in the same three-step campaign path.                |
| Personalization | 9.1/10 | 9.7/10 | Brand DNA, selected Pal, roadmap, campaigns, and calendar remain connected.               |
| Usefulness      | 9.2/10 | 9.7/10 | Recommendations become saved ideas, dated work, platform posts, and a shoot plan.         |
| Mobile          | 9.0/10 | 9.7/10 | Zero root overflow, broken media, distortion, or sub-44px controls across audited routes. |
| Trust           | 9.2/10 | 9.6/10 | Source analysis avoids invented proof; memory changes and publishing require approval.    |

## Persona 2 — owner who wants ongoing human direction

**Situation:** Wants the tools, but also wants Jevoy's judgment for campaigns, filming space,
positioning, and bigger-picture decisions.

Journey tested:

1. Compares Studio, Guided, and Partner with monthly/annual billing.
2. Sees Guided as one private hour per month at $499.
3. Sees Partner as one private hour per week at $1,199 monthly or $11,990 annually.
4. Opens Member Success and chooses a call focus, preferred date, and preferred time.
5. Reserves an included session and sees the allowance decrement.
6. Submits a project for review with the campaign and reference attached.
7. Sends a MINDYOURBIZNIZ topic request and sees the next six-month eligibility date.
8. Can leave an honest public review or send private product feedback after meaningful usage.

Second-pass score (first pass → final):

| Dimension         |  First |  Final | Evidence                                                                                                           |
| ----------------- | -----: | -----: | ------------------------------------------------------------------------------------------------------------------ |
| Offer clarity     | 9.0/10 | 9.7/10 | Each tier is defined by human guidance and campaign capacity, not multi-brand clutter.                             |
| Conversion        | 8.9/10 | 9.6/10 | Annual saves two months; one-off consulting includes 30 days of Studio.                                            |
| Scheduling        | 8.7/10 | 9.4/10 | Focus, preferred date, preferred time, and context are captured; instant confirmation awaits the live booking URL. |
| Retention         | 9.0/10 | 9.7/10 | Useful missions, monthly/weekly help, review, roadmap, and podcast benefits form a real rhythm.                    |
| Billing integrity | 9.1/10 | 9.6/10 | Checkout uses Stripe subscription mode; plan allowance and Customer Portal paths are explicit.                     |

## Route verification

Each route was checked at 360×900 and 1440×1000.

| Route               | Primary job                               | Phone | Desktop |
| ------------------- | ----------------------------------------- | ----- | ------- |
| `/studio/dashboard` | See the next useful move                  | Pass  | Pass    |
| `/studio`           | Turn text, link, or image into a campaign | Pass  | Pass    |
| `/studio/assistant` | Ask a context-aware Pal                   | Pass  | Pass    |
| `/studio/campaigns` | Manage connected campaigns                | Pass  | Pass    |
| `/studio/ideas`     | Capture text, link, or image sources      | Pass  | Pass    |
| `/studio/roadmap`   | Choose videos by business problem         | Pass  | Pass    |
| `/studio/library`   | Find and reuse generated work             | Pass  | Pass    |
| `/studio/brand`     | Maintain the AI source of truth           | Pass  | Pass    |
| `/studio/approvals` | Approve or return work                    | Pass  | Pass    |
| `/studio/calendar`  | Give content a publishing rhythm          | Pass  | Pass    |
| `/studio/success`   | Missions, help, calls, podcast, feedback  | Pass  | Pass    |
| `/studio/settings`  | Manage workspace and product preferences  | Pass  | Pass    |
| `/studio/billing`   | Change plan and billing cadence           | Pass  | Pass    |

Automated browser checks reported zero root overflow, broken visible images, distorted images,
or unnamed buttons on all audited routes. The mobile tap-target pass also returned zero controls
below the 44px product minimum after fixes.

## Motion verification

- In-product preview: `src/remotion/CampaignTeaser.tsx` through a lazy-loaded, controlled
  `@remotion/player` surface. It is finite, paused by default, non-looping, and reduced-motion safe.
- Export composition: `hyperframes/campaign-direction/index.html`. HyperFrames `check` passes with
  zero lint, runtime, layout, or motion issues and 37/37 text contrast checks.

## External connections still required for live operation

- `VITE_STRATEGY_BOOKING_URL` for instant calendar slot confirmation. Without it, the Studio safely
  records the member's preferred focus, date, and time for Palmer House to confirm.
- `VITE_PUBLIC_REVIEW_URL` for the direct public review destination.
- Stripe secret, webhook secret, and publishable configuration for live subscription checkout.
- A Palmer House notification destination for new help, project-review, call, and podcast requests.

## Review policy

Public review and private feedback are both available after value has been delivered. The product
does not ask only satisfied members for reviews, request a specific star rating, or offer an
incentive in exchange for a review.
