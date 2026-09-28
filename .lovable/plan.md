# Pay-on-the-spot checkout, real sign-in emails, and full Studio test

## What you'll get
1. **Video projects: pay a deposit right from the estimate.** On the production pricing page, "Book this" opens a secure Stripe checkout for a **50% deposit** of the estimate total. After paying, the customer sees a thank-you page with a button to your HoneyBook intake form. Our team also gets an email with the order details. The rest is invoiced later through HoneyBook.
2. **Studio memberships: pay right there.** The Pricing and Membership pages send people straight to checkout, not to "review estimate." Visitors who aren't signed in create an account first, then land on checkout, then go into Studio with their credits already added.
3. **Credit top-ups.** The $20 and $50 credit packs in Usage & billing go through Stripe checkout, and the credits appear right after payment.
4. **Real email sign-in.** Sign-up confirmation, magic links and password reset emails come from your notify.palmerhouseproductions.com address. Email confirmation gets switched back on once delivery works, so fake emails can't sign up.
5. **Full end-to-end test (Stripe test mode, no real money).** I'll sign in and test:
   - buying a membership, buying a top-up, and paying a video deposit with Stripe's test card
   - starting a conversation, adding a voice note, building a campaign draft, approving it
   - checking the credit balance goes down by the right amount at each step (voice: 2 credits per started minute)
   - Ask a Pal, images, PDFs, Feed, Brand DNA, Settings and sign-out

   You'll get a short report of anything that fails, with fixes.

## What I can't do for you
- **HoneyBook test:** I can send a test inquiry through the form on your contact page. I can't sign in to your HoneyBook account, so you'll need to confirm it arrived. The test will be named "TEST - Palmer House site check."
- **Going live:** after testing passes, you switch Stripe from test mode to live mode. Then you make one small real purchase and refund it.

## Needed from you
- Nothing up front. If the email domain still isn't verified, I'll tell you which records to add where your domain is managed.
- Confirm that 50% is the right deposit. It's easy to change.

## Technical details
- Deposit: a new server function creates a Stripe Checkout session (`mode: payment`) for the deposit amount. It checks the quote on the server so the price can't be tampered with, and stores the quote reference in the session metadata. The success route shows the HoneyBook button, and a transactional email to the team is sent through the existing email queue.
- Memberships and top-ups reuse the existing `stripe-checkout.ts`, `studio-subscription-checkout.server.ts` and `studio-credit-server.ts`, along with the webhook and ledger functions that were just added. Signed-out visitors are sent to /auth with the plan they picked saved, then come back to checkout.
- Email: check the domain status, scaffold or confirm the auth email templates, and turn auto-confirm off once delivery works.
- Testing: Playwright with a minted test session, Stripe test card 4242, and database reads of the credit usage records to confirm charges.
