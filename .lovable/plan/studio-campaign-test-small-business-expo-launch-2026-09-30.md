# Studio campaign test + Small Business Expo launch

The expo is today (hall opens 10:00 AM Pacific). Work is ordered so the most urgent pieces go live first. Each phase gets published when it works.

## Phase 0 — Real Studio campaign test (about 15 min)
Signed in as your JP Enterprises account:
- Start a new conversation with your Pal and ask for a campaign idea.
- Record a voice note. The test browser plays a short recorded audio clip as if it were a microphone, so this is a real recording going through real transcription.
- Build the campaign from the conversation.
- Check the credit balance before and after each step: the chat reply, the voice note (2 credits per started minute) and the campaign.
- Reload the page and confirm the campaign and its drafts are still there.
- Report the credits used at each step, with screenshots.

## Phase 1 — Expo live before the hall opens
- **/expo page:** event details (Sept 30, Pasadena Convention Center, Booth 328, 10 AM–5 PM), the Studio explanation, the offer, a real countdown ("Intro offer ends in", ending Sunday Oct 4, 11:59 PM Pacific), a "Have a booth code?" box, and the information form.
- **Home page:** an event section right after the top section, plus a slim announcement bar. The three ways to work with us stay visible.
- **Event wording changes by time:** "We're at Booth 328 now" during hall hours, then "Thanks for meeting us in Los Angeles". The offer stays live until Sunday.
- **Membership pricing, /pricing and /offers:** show the monthly Studio plan at "$79/month for 3 months, then $99", with the booth code box nearby. The yearly plan keeps its real price.
- **Checkout:**
  - Public visitors get $20 off the monthly Studio plan for 3 months, applied automatically.
  - PALMERLA gets $30 off instead ($69). The two discounts never stack.
  - The fourth month goes back to $99.
  - Only the first Studio subscription per workspace gets the offer. Yearly, Guided, Partner, top-ups and production are excluded.
- **Booth code:** checked on our side before payment. It's never shown on public pages. A wrong or expired code shows a clear message and doesn't charge a different price without asking.
- **Discount setup:** we create the two discounts in your live Stripe account. Creating them doesn't charge anyone. Everything is tested with fake cards in test mode first, then switched back to live.

## Phase 2 — One follow-up list for Friday
- **One contact list** for everyone who fills in the form, creates an account through the expo page or buys. There's one record per email, with a status (lead, account or paid), their offer and their interest.
- **Info form:**
  - Name and email are required. Company, phone, what they want to create, and Studio / Production / Planning are optional.
  - The button says "Send me the details Friday", followed by Jevoy's success message.
- **After payment:** the thank-you page shows "You're in… I'll follow up Friday, October 2 — Jevoy".
- **Staff view:**
  - A private page where staff can see the Friday list, add paper signups, add notes and export to CSV.
  - It previews the right Friday email for each person: bought Studio, bought production, or hasn't bought yet.
- **Sending on Friday:** emails go from your brand sending address only when staff press send. The app checks what each person has bought at that moment. Nothing is scheduled on its own.

## Phase 3 — Bundle savings audit (after the expo launch is live)
- Check the Visibility + Trust Duo (10%), monthly production (20% with Studio included) and the "every second edited minute free" offer on every page where they show.
- Fix any page that shows different numbers. Show the price bought separately, the bundle price and the exact savings. Combinations we can't price show "Request a bundle quote".
- Monthly production buyers are never charged a second Studio plan.

## What I need from you
- Nothing to start. If PALMERLA is already taken in Stripe, I'll tell you the alternative before staff hand it out.

## Technical details
- One server-side campaign config (`src/lib/expo-campaign.ts`) holds the id `sbe-la-2026`, the start time, the deadline `2026-10-05T06:59:59Z`, the eligible monthly live and test price IDs, and the coupon and promotion IDs. The booth code is kept in a server-only secret, not in the client bundle.
- Checkout server fn: re-check eligibility against server time, the price ID, the workspace's past Studio subscriptions and the code, then create the Checkout Session with one `discounts: [{coupon}]` entry. The coupons are `amount_off` 2000/3000 USD, `duration: repeating` and `duration_in_months: 3`. The session gets `expires_at` = now + 30 min and metadata `campaign_id`/`offer`.
- Webhook: upsert the contact with the paid status (idempotent on session id). Access is still granted only by the existing webhook path.
- New table `expo_contacts` (email normalized, unique per campaign) plus `expo_contact_events`, with GRANTs. RLS makes it staff-only through `has_role(auth.uid(),'admin')`. The public form inserts through a server fn with zod validation and a honeypot.
- Test mode: set `STRIPE_USE_TEST=true` temporarily, create matching test coupons with curl, and use a test clock to check invoices 1–3 = $79/$69 and invoice 4 = $99. Then switch back to live and publish.
- Voice test: Chromium `--use-fake-device-for-media-stream --use-file-for-fake-audio-capture=/tmp/voice.wav`, with the WAV generated by TTS.
