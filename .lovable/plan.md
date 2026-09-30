# Finish and verify everything still open

## 1. Check what's already done (no changes)
- Open Studio signed in as Jevoy and confirm: the credit-increase alert shows under the bell, and Settings shows "How we keep you updated" and saves a choice.
- Confirm a campaign built from chat stays linked to its conversation after reload.

## 2. Expo booth discount
- Carry the booth code from the Expo page into Studio checkout so the Stripe page shows $69 (not $99). Verify with Stripe test mode only; no real payment.
- Open the staff Expo leads page and confirm it lists leads and exports CSV.

## 3. Test workspace
- Keep Jevoy's test workspace membership switched on so Studio features can be tested without a paid subscription.

## 4. New security warning from the expo work
- Fix only the warning introduced by the new staff-role check. Leave the 17 older warnings untouched.

## 5. Compact campaign results + Expo demo (from the brief)
- Build compact inline campaign results in chat for Studio users, following the attached mockups: expandable previews, build animation, recovery if a build fails.
- Build the Expo demo with live AI first; guest reset between visitors. Offline mode after the show.

## 6. Final end-to-end run
- Signed in: voice note, Pal reply, build campaign, confirm credits drop by the right amount and the campaign reloads intact.
- Report anything blocked (email sending for alert preferences stays a separate step unless you want it).

## Technical notes
- Booth code passes via billing route search param into createSubscriptionCheckout; server re-validates against EXPO_BOOTH_CODE.
- has_role warning: restrict EXECUTE to what the RLS policy needs, rescan.
- Test workspace: set workspace_subscriptions status active for JP Enterprises.
