# OpenAI Ads pixel + Instagram/Facebook posting add-on (bundle.social)

## Part 1: OpenAI Ads tracking pixel
- Add the Ads Manager script (Pixel ID Nw2z7d44jrvrEMCiiYbJG5) once to the page header of every page.
- Debug mode stays on until Ads Manager's event stream shows visits arriving, then it gets switched off.
- Conversion events (for example a membership purchase) come later, after you create them in Ads Manager.

## Part 2: Social Publishing add-on, $19/month
**Offer**
- $19 per workspace per month, on top of any plan, with 100 posts per month included.
- One post means one post to one account, so sending a piece to both Instagram and Facebook uses 2.
- A post counts when it's scheduled or posted. If it fails or is cancelled before it goes out, it's returned to the member. Retries never count twice.
- AI credits are unchanged. Video posting stays off.

**What members see**
- **Settings → Connected accounts:** "Add Social Publishing · $19/mo" opens Stripe checkout. After paying, "Connect Instagram & Facebook" opens bundle.social's secure connect page. Linked accounts are listed, with a Disconnect button.
- **Post now / Schedule** on finished campaign pieces and Library images. A confirmation screen shows the caption, the photo, the accounts, and "uses 2 of your 100 posts".
- **Calendar:** each post shows Scheduled, Posted, or Failed with the reason, and can be cancelled before it goes out.
- **Alerts under the bell:** posted, failed, and when 80 of the 100 posts are used.
- **Billing page:** shows the add-on, posts used this month, and a Cancel option through the Stripe portal.

**For you**
- A counter on the staff page showing total posts this month against bundle.social's 10,000 limit, with a warning at 75%.

## What you need to do
1. Paste your bundle.social API key into a secure form I'll open.
2. Paste the bundle.social webhook signing secret after I give you the address to enter in bundle.social.

## Order of work
1. Pixel.
2. Save the bundle.social key. Create the $19/month Stripe price in both test and live mode. Add an on/off switch so posting stays off until it's tested.
3. Database for connected accounts, posts, and the monthly post allowance.
4. Add-on checkout and turning access on or off through the existing Stripe webhook.
5. Connect flow, Post/Schedule with confirmation, Calendar status, alerts.
6. Test: buy the add-on with Stripe's fake test card, connect your Instagram/Facebook, publish one test post, confirm it counts as 1–2 posts, then delete the post and refund the test charge.

## Technical details
- Pixel: an inline `scripts` entry early in the `head()` of `src/routes/__root.tsx`.
- Tables (RLS limited to workspace members; grants for authenticated and service_role):
  - `social_publishing_addons`: workspace_id, status, stripe_subscription_id, period start/end, included posts (100).
  - `social_connections`: workspace_id, bundle team id, platform, account name, status.
  - `social_posts`: workspace_id, asset_id, platforms, caption, media_path, scheduled_at, status, provider_post_id, error, destinations_reserved.
- A security-definer function reserves/finalizes/releases destination posts atomically, the same way credits work today.
- Server functions use requireSupabaseAuth and keep the bundle.social key server-side. Each workspace maps to its own bundle.social team. Media goes out through short-lived signed URLs.
- A webhook at `/api/public/social/webhook` checks the signature before updating post status.
- The add-on is a separate Stripe subscription. The existing webhook sees its price ID and updates `social_publishing_addons` without touching the plan or credits.
- Flag `STUDIO_SOCIAL_POSTING_ENABLED`. Video assets are rejected on the server.
