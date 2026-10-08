# Palmer House Membership: filming benefits

## The offer
| Plan | Price | Filming benefit |
|---|---|---|
| Studio | $99/mo | 25% off the filming session fee ($337.50 instead of $450) |
| Guided | $499/mo | 50% off the filming session fee ($225) |
| Partner | $1,199/mo | One included filming session every month ($450 value) |

- The benefit applies only to the $450 session fee. Extra videos ($150 each), editing, Evergreen pieces and add-ons stay at full price.
- Partner's included session resets each calendar month and doesn't roll over. A second session that month gets the 50% Guided rate.
- All plans include Studio access and the monthly Palmer House newsletter. Existing credits and strategy time don't change.
- Annual members get the same benefits.

## What members will see
1. **Pricing and membership pages:** each plan card lists its filming benefit plus "Monthly newsletter". The "Preferred production pricing" line is replaced with the exact discount.
2. **Studio billing page:** a "Your filming benefit" card shows the discount, or for Partner, "1 session available this month" / "Used — resets on [date]", with a "Book a filming session" button.
3. **Booking checkout:** a signed-in member booking production sees the discount as a separate "Member filming benefit" line before paying the 50% deposit. The deposit is calculated on the discounted total. If Partner's included session covers everything, there's nothing to pay at checkout and the booking is confirmed straight to the team, using the same HoneyBook intake and team email.
4. **Guests** (not signed in) pay normal prices, with a note: "Members save up to 100% on filming. See membership."
5. **Terms page:** a short "Membership filming benefits" section covers what is and isn't included, monthly reset and no rollover, and that benefits end when the membership ends.

## Newsletter
The newsletter is listed as a benefit only. Building and sending it is a separate project, added to the roadmap.

## Technical details
- `studio-model.ts`: add `filmingBenefit` to each plan (`{ kind: "discount", percent: 25 | 50 }` or `{ kind: "included", perMonth: 1 }`) and update the feature lists.
- `stripe-checkout.ts` `createDepositCheckout`: accept an optional access token and workspace ID. On the server, verify membership (active subscription and plan) and apply the benefit to the session-fee portion only. The deposit is 50% of the discounted total. Client totals are never trusted.
- New table `filming_benefit_redemptions` (workspace, period month, checkout session, status), unique on (workspace, month) for Partner included sessions. Locked to the server (RLS, member read-only), using the same reservation pattern as social posts. It's released if the checkout expires or is cancelled.
- $0 Partner bookings: a server function records the redemption and sends the existing deposit-booked team email and intake link without Stripe.
- Ads: the "subscription created" event stays as is. No new events.
- Verify in Stripe test mode: one checkout per tier, a second Partner booking in the same month, and a guest. No live charges.
