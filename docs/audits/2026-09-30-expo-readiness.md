# Expo readiness audit — September 30, 2026

Reviewed GitHub main at `10560b031c52467e22890082fbc1a908ba29aed5` and the published public site. Verdict: the public base-tier offer is reachable, but the complete requested Expo experience is not ready.

## Confirmed on the published site

- `/expo` loads; entering `PALMERLA` changes the public $79 offer to $69/month for the first three months, then $99.
- The offer CTA reaches the Studio sign-in page with Studio/monthly purchase intent retained. Authenticated checkout and actual charging were not tested.
- Membership pricing switches between annual and monthly, with monthly prices $99 / $499 / $1,199. Current credits display consistently as 12,000 / 25,000 / 50,000. Older search-index excerpts showing 3,500 are stale.
- `/contact` loads its HoneyBook form. No customer inquiry or follow-up email was submitted.
- The observed desktop sign-in layout renders correctly. No site-origin console errors were seen in the inspected Expo flow; extension-origin errors were excluded. This is not an exhaustive device or route audit.

## Fixed in this audit

1. **Campaign validation:** chat passes up to 4,000 characters of Pal context, while the campaign schema previously rejected anything above 1,200. Aligned the schema to 4,000 and added regression cases, preserving empty/oversized-input rejection.
2. **Expo follow-up reliability:** only paid subscription checkout sessions mark contacts paid. Failed Expo contact writes now return through the webhook retry path instead of being silently discarded. Membership and contact deduplication remain intact.
3. **Contact consistency:** changed public phone references and structured data to the approved `(425) 473-0349` instead of the old number.
4. **Billing test maintenance:** restored source-alias resolution and made regular-price recovery fixtures independent of the Expo's calendar window.

## Remaining launch blockers / Lovable handoff

### 1. All-tier Expo discounts

The current server only makes the `creator` plan eligible. Guided/Partner checkout removes the booth code and the Expo terms explicitly exclude those tiers. This contradicts the approved all-tier addendum.

Implement the agreed public 10% / booth 20% introductory discounts on Guided and Partner, retaining the base-tier $79/$69 offer and the agreed three-month duration. Confirm actual Stripe coupons, product restrictions, live/test mode, expiration, and renewal amounts before changing public claims. At today's monthly catalog prices, Guided would be $449.10 public / $399.20 booth, and Partner $1,079.10 public / $959.20 booth. Do not add another $99 charge: software is already included in those plans.

The live code validator accepted PALMERLA, but this audit could not verify the underlying Stripe coupon configuration or complete a paid checkout. Provider configuration remains a separate verification gate.

### 2. Guest Expo demo and offline operation

There is no production `/expo/demo`, guest session, local-model integration, service worker, or next-visitor reset. `dev/studio-preview` is a development fixture, not an Expo implementation. Do not promise an offline personalized AI demo yet.

Implement the supplied demo brief: no-auth ephemeral sessions, immediate Pal greetings, per-visitor reset, compact native content previews and expanded viewing, explicit live/local/example modes, and honest offline limitations. Test on the actual Expo laptop with its network disconnected.

### 3. Friday follow-up coverage

Information-form submissions and campaign-tagged paid checkouts enter `expo_contacts`. Account creation alone does not. Add consent-aware Expo signup attribution and idempotent list capture if every interested account signup must receive Friday's email. Preserve buyer status and avoid duplicate messages. The audit sent no emails and did not verify email delivery or scheduling.

### 4. Campaign completeness and recovery

Existing signed-in chat has centered content, compact tabbed previews, expansion/editing, reduced-motion support, persisted campaign links, and brand/conversation context. However:

- Pasting a URL into ordinary chat does not automatically research that site; explicit website/content-link analysis exists separately.
- Campaign persistence marks `ready` before all assets finish saving and can accept a partially successful fallback. Calendar failures are logged without failing the build.
- Generation uses a synchronous request with provider timeouts, rather than a durable resumable job.

Before treating generation as production-certified, enforce complete persistence or an explicit partial state, implement recovery, and test real authenticated generation with a provider failure and a database-write failure. These architectural changes were not attempted during this small launch audit.

## Validation and limits

- Production build passed with `npm run build`.
- Campaign regression tests: 3 passed.
- Billing/credit tests: 23 passed, including pending payment, asynchronous payment success, and retry after contact-write failure.
- Public purchase-intent tests: 4 passed.
- A broader test attempt did not pass completely: existing checkout tests have stale mocks/expectations (including an old assumption that production deposits cannot be paid); the package-pricing mock does not resolve a current source alias. These failures are not proof of live failures, but the broader suite cannot be certified green.
- Conversation UI tests could not run because their Playwright browser executable is unavailable. No authenticated campaign run, mobile viewport test, Stripe payment, real lead submission, or email-delivery test was completed.
- `npm ci` fails because `package-lock.json` is out of sync with `package.json`. Dependencies were installed for validation with `npm install --package-lock=false --ignore-scripts`; no dependency versions or lockfiles were changed. Reconcile the project's canonical lockfile before requiring clean npm CI.

GitHub changes sync to the Lovable editor. Republish the site through the normal Lovable deployment workflow and verify the new build before claiming these fixes are live.
