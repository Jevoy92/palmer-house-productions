# One small real purchase to test payments

The smallest credit pack costs $20, which is more than your $5. So we'll use a temporary $1 test pack that only your account can see, then refund it.

## Steps
1. Add a hidden "Test pack" priced at $1 for 10 credits. It shows only in the JP Enterprises workspace. No other member ever sees it.
2. You open the live site, go to Studio, then Billing, buy the Test pack with your real card, and tell me when it's done.
3. I check three things: Stripe recorded the payment, the 10 credits arrived in your workspace, and the receipt and thank-you page look right.
4. I refund the $1 in full through Stripe. It usually shows back on your card within 5 to 10 days.
5. I remove the Test pack and publish again, so only the real $20 and $50 packs remain.
6. Without charging anything, I also open the membership checkout and the video deposit checkout, to confirm both reach the Stripe payment page with the right amounts.

## What this proves
Real card payment, the automatic credit delivery, receipts and refunds all work end to end on your live account.

## Technical details
- Add a `test` pack (10 credits, $1) to the top-up catalog, gated server-side to workspace `9c9fa0dc-655e-4635-83b3-d0c4fc30c21b`. The UI shows it only for that workspace, and checkout rejects it for any other workspace.
- Publish, then after the purchase verify the `studio_credit_grants` row from the webhook and the Stripe session status.
- Refund via the Stripe refunds API on the payment intent. Then remove the pack and publish again.
- Payment links made directly in Stripe aren't used, because they skip the app's credit delivery.
