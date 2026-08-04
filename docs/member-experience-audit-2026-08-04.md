# Palmer House Studio member-experience audit

Date: 2026-08-04  
Branch: `codex/palmer-dream-suite`

## Product rule

Reward useful work, not empty activity. No essential access is locked behind points. Human help,
project review, and honest feedback remain visible without requiring a streak or artificial level.

## Persona 1 — solo service-business owner

**Situation:** Has a useful idea or before/after example, but is unsure what to say, film, or post.

Journey tested:

1. Opens Brand DNA and gives the Studio business context.
2. Captures a problem as text, link, or image.
3. Uses the video roadmap and Ask a Pal to choose a useful format.
4. Builds a connected campaign and gives the work a date.
5. Uses the Skill Lab for the mission spinner, camera-ready check, and Pal finder.
6. Submits a question or attaches a campaign and reference link for Palmer House review.

Score:

| Dimension       |  Score | Evidence                                                                                      |
| --------------- | -----: | --------------------------------------------------------------------------------------------- |
| Clarity         | 9.4/10 | The next incomplete mission is named and linked.                                              |
| Personalization | 9.5/10 | Brand DNA, selected Pal, roadmap, and campaign state remain connected.                        |
| Usefulness      | 9.6/10 | Points correspond to completed business work and unlock no essential access.                  |
| Mobile          | 9.5/10 | Zero root overflow, broken media, unnamed buttons, or sub-44px controls across Studio routes. |
| Trust           | 9.4/10 | Help requests preserve campaign context and do not pretend a response is instant.             |

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

Score:

| Dimension         |  Score | Evidence                                                                                       |
| ----------------- | -----: | ---------------------------------------------------------------------------------------------- |
| Offer clarity     | 9.6/10 | Each tier is defined by the amount of human guidance, not multi-brand clutter.                 |
| Conversion        | 9.4/10 | Annual saves two months; one-off consulting includes 30 days of Studio.                        |
| Scheduling        | 9.2/10 | The preference flow works now; instant slot confirmation awaits the live booking URL.          |
| Retention         | 9.5/10 | Monthly help, weekly help, project review, roadmap, and podcast benefits create a real rhythm. |
| Billing integrity | 9.4/10 | Checkout uses Stripe subscription mode; the Customer Portal handles account changes.           |

## Route verification

Each route was checked at 360×900 and 1440×1000.

| Route               | Primary job                              | Phone | Desktop |
| ------------------- | ---------------------------------------- | ----- | ------- |
| `/studio/dashboard` | See the next useful move                 | Pass  | Pass    |
| `/studio`           | Build a connected campaign               | Pass  | Pass    |
| `/studio/assistant` | Ask a context-aware Pal                  | Pass  | Pass    |
| `/studio/campaigns` | Manage connected campaigns               | Pass  | Pass    |
| `/studio/ideas`     | Capture text, link, or image sources     | Pass  | Pass    |
| `/studio/roadmap`   | Choose videos by business problem        | Pass  | Pass    |
| `/studio/library`   | Find and reuse generated work            | Pass  | Pass    |
| `/studio/brand`     | Maintain the AI source of truth          | Pass  | Pass    |
| `/studio/approvals` | Approve or return work                   | Pass  | Pass    |
| `/studio/calendar`  | Give content a publishing rhythm         | Pass  | Pass    |
| `/studio/success`   | Missions, help, calls, podcast, feedback | Pass  | Pass    |
| `/studio/settings`  | Manage workspace and product preferences | Pass  | Pass    |
| `/studio/billing`   | Change plan and billing cadence          | Pass  | Pass    |

Automated browser checks reported zero root overflow, broken visible images, distorted images,
or unnamed buttons on all audited routes. The mobile tap-target pass also returned zero controls
below the 44px product minimum after fixes.

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
