# Full site and Studio audit, plus AI cost projection

## What you get
One report, in plain language, saved to your Files, covering:

1. **Broken links and dead ends**: every public page and every Studio screen. This includes links that go nowhere, buttons that do nothing, flows that stop without a next step, and forms that seem to work but never send.
2. **Consistency**: headings, spacing, buttons, Pal colors, tag style (no pills), dark/light themes, mobile vs desktop, header and footer on every page.
3. **Animation quality**: smooth, finite, and respects "reduce motion". Anything janky, missing or overdone gets flagged, with screenshots.
4. **AI features**: each Studio AI tool is run once with a real signed-in test account. The report shows which ones work, which fail, and what a failure looks like to a member.
5. **Payments**: membership checkout, credit top-ups, the billing portal, package checkout and the success pages, all in test mode. No real charges.
6. **Contact and lead forms**: contact, the HoneyBook widget, webinar, assessments and waitlist. For each one, the report shows whether the message really arrives and what the visitor sees.
7. **Cost projection**: see below.

Each issue is rated **Broken / Confusing / Polish** and includes the page it's on and a suggested fix. After you review the report, I fix issues only once you approve.

## Cost projection and credit recommendation
- Find which AI model each feature actually uses today: chat, campaign building, images, portraits, PDFs, the Feed and voice.
- Estimate the real dollar cost of each credit action, e.g. one Pal reply, one campaign or one image.
- Build usage profiles (light, typical, heavy, extreme) and calculate your monthly cost and margin for each plan: Trial, $99, $499 and $1,199.
- Compare 2–3 model options per feature (cheaper, current, premium), with the quality trade-off.
- Recommend new allowances. This includes your idea of giving every signup a heavy-user allowance, and shows exactly where margins stay healthy and where they break.
- Recommend friendlier credit rules, such as a small free cushion, no charge when generation fails, and warnings before running out.

## Needs from you
Nothing to start. The payment checks use test mode only. The voice feature stays off until you add the transcription key.

## Technical details
- Crawl every route in `src/routes` with Playwright at desktop and mobile sizes. Collect console errors, failed requests, 404 links, horizontal overflow and missing alt text.
- Sign in as a test Studio member and drive each AI server function once. Record latency, errors and the model used (`studio-ai-config.server.ts`, `ai.server.ts`, gateway logs).
- Cost math: token and image usage from AI gateway request logs, multiplied by provider pricing. Compare this with `studio-credits.ts` credits and `studioCreditAllowance`. Reuse `scripts/studio-economics.mjs` and `docs/studio-rebuild/ai-economics.md` where they are still accurate.
- Stripe: read-only checks of products and prices, plus test-mode checkout sessions. Also check that the webhook secret exists and that the credit ledger migrations are applied (two are still pending).
- Output: `/mnt/documents/palmer-house-audit.md` with screenshots, plus a spreadsheet of costs and margins.
