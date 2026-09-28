# Test every payment with fake cards (Stripe test mode)

No real money is involved at any point.

## Steps
1. You paste your test-mode secret key (starts with `sk_test_`) into a secure box. It's found in Stripe test mode under Developers → API keys.
2. I recreate your products in test mode: the Studio memberships ($99, $499, $1,199) and the credit packs ($20 for 500 credits, $50 for 1,500).
3. I set up the test-mode payment notices, so credits and memberships get delivered automatically after a test payment. You may need to copy one signing value from Stripe for this. I'll tell you exactly where to find it.
4. Using Stripe's practice card (4242 4242 4242 4242), I run:
   - a Studio membership sign-up, and check that access unlocks and credits are added
   - a credit pack purchase, and check the credits arrive
   - a video deposit, and check that 50% is charged, the thank-you page and HoneyBook intake button appear, and our team email is sent
   - a declined card, and check that members see a clear message and nothing is added
5. I make a test refund and cancel the test membership, to make sure access is removed properly.
6. I switch back to your live key and live products, publish, and confirm the live checkout pages open correctly.

## Technical details
- Save the test key using the Stripe key update flow. Use the Stripe tools to create the test products and prices, then map their IDs where the app resolves prices, keeping the live IDs ready to restore.
- Webhook: add a test-mode endpoint in Stripe pointing at the existing billing webhook route. Store its signing secret temporarily.
- Verify each step through the rows in `studio_credit_grants` and the entitlement tables, the Stripe session status, and the email queue.
- Restore: put back the live key, live price IDs and the live webhook secret, publish, then do a smoke check that no charge is made.
