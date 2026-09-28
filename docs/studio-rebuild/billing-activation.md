# Studio billing activation and operations

## What changed

The subscription prices and Stripe recurring Price IDs are unchanged. Studio, Guided, and Partner include 1,000, 2,500, and 6,000 credits per month; the seven-day trial has 100 credits once per workspace creator. Credits replace the former hard campaign-count limit. Additional campaigns are possible with available credits, including purchased credits.

Every paid AI entry point now reserves credits atomically before contacting the provider: Pal replies, directions, website/reference analysis, campaigns, generated images, AI-written PDFs, custom portraits, and manual feed requests. Rendering a PDF from supplied text, reading documents, uploading files, and browsing saved work make no paid model call. Voice transcription also uses prepaid credits: **2 credits per started minute, up to five minutes per recording**. Members record or attach supported audio, review playback and the price, then explicitly choose Transcribe. See [voice activation and recovery](voice-transcription.md) for the separate OpenAI configuration and live checks.

Automatic Pal discussions cost zero customer credits, observe their existing time/context cooldown, and have a separate internal allowance: $0.10 per trial workspace and $0.50 per paid workspace per calendar month. They still require an active membership. The global provider cap also applies.

## Release gates

Apply these migrations in order if they are not yet deployed:

1. `20260927180000_studio_recovery.sql`
2. `20260927210000_studio_shared_memory.sql`
3. `20260928010000_studio_proactive_media.sql`
4. `20260928020000_studio_credit_ledger.sql`
5. `20260928030000_studio_voice_usage.sql`

Do not apply historical baseline migrations a second time. The ledger migration adds service-only credit grants, reservations, payment event records, refund debts, trial claims, and membership checkout leases. Members cannot directly edit subscriptions or the financial ledger. No live migration or real payment was performed during local verification.

Configure server secrets through the deployment secret manager, never in client bundles or Git:

| Setting                                              | Purpose                                                                                                                                                     |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `SUPABASE_SERVICE_ROLE_KEY` or `SUPABASE_SECRET_KEY` | Trusted server ledger operations; required before generation.                                                                                               |
| `SUPABASE_URL`                                       | Same project as the authenticated Studio workspace.                                                                                                         |
| `STRIPE_SECRET_KEY`                                  | Stripe server API. Use test mode for the checklist below first.                                                                                             |
| `STRIPE_WEBHOOK_SECRET`                              | Signing secret for this deployment's `/api/stripe-webhook`.                                                                                                 |
| `PUBLIC_SITE_URL`                                    | Canonical HTTPS deployment origin for Checkout/Portal returns.                                                                                              |
| `LOVABLE_API_KEY`                                    | Provider gateway credentials.                                                                                                                               |
| `STUDIO_TRANSCRIPTION_ENABLED`                       | Explicitly set `true` only after the separate voice smoke test. Defaults off.                                                                               |
| `STUDIO_TRANSCRIPTION_API_KEY` or `OPENAI_API_KEY`   | Server-only OpenAI credential for the fixed transcription endpoint. Lovable gateway credentials do not enable voice.                                        |
| `STUDIO_TRANSCRIPTION_MODEL`                         | Optional; only `gpt-transcribe` is priced and permitted.                                                                                                    |
| `AI_GATEWAY_URL`                                     | Optional OpenAI-compatible base URL; default Lovable gateway.                                                                                               |
| `STUDIO_CHAT_MODEL`                                  | Default `openai/gpt-6-luna`.                                                                                                                                |
| `STUDIO_BUILD_MODEL`                                 | Default `google/gemini-3.8-flash`.                                                                                                                          |
| `STUDIO_IMAGE_MODEL`                                 | Default `google/gemini-3.1-flash-image`.                                                                                                                    |
| `STUDIO_AI_MONTHLY_BUDGET_USD`                       | Global calendar-month generation safety cap. **Defaults to $100 for all workspaces combined.** Set a deliberate operating budget before inviting customers. |
| `STUDIO_BILLING_OPERATOR_IDS`                        | Comma-separated authenticated user UUIDs allowed to see internal, global estimated provider spend. Workspace owners/admins are not automatically operators. |
| `STUDIO_AI_SALES_READY`                              | Keep unset until migrations, provider routes, smoke tests, and checkout tests pass. Set to `true` to allow new memberships and credit sales.                |
| `STUDIO_CREDIT_TOPUPS_ENABLED`                       | Separately set to `true` to enable prepaid credit packs after the sales gate is ready.                                                                      |

Set `STUDIO_CHAT_MODEL` and `STUDIO_BUILD_MODEL` explicitly when deploying, or remove the legacy `STUDIO_AI_MODEL` override. The legacy fallback takes precedence over the new defaults; leaving a shared Flash override in place makes a one-credit chat reject its cost envelope instead of using Luna.

The model registry in `studio-credit-runtime.server.ts` intentionally rejects unpriced routes. The documented Lovable model is available, but the exact `openai/gpt-6-luna` gateway route uses the provider's naming convention and has **not been verified by a live request**. Verify it before opening sales. Changing a model requires an approved price entry and a successful request within that operation's cost envelope. Workspace memory is independent of these settings.

### Stripe configuration

Register these events for the signed webhook:

- `checkout.session.completed`
- `checkout.session.async_payment_succeeded`
- `invoice.paid`
- `invoice.payment_failed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `charge.refunded`
- `charge.dispute.created`

The endpoint returns a non-2xx response when persistence fails so Stripe retries. The event and financial write commit in one database transaction. A completed but unpaid Checkout does not grant credits; an invoice-paid event must match a known recurring price. Credit purchases also recheck the PaymentIntent and reject already-refunded/disputed payments.

Use the existing six recurring prices in `src/lib/studio-model.ts` (month/year for creator/business/partner); verify the connected Stripe account contains those IDs before release. The annual membership costs ten times the monthly price and replenishes credits each month, not all twelve months at purchase. Top-ups use server-priced Checkout line items: 500 credits for $20, or 1,500 for $50; no client-supplied amount and no automatic recharge.

Configure Customer Portal for payment methods, invoices, cancellation, and same-interval plan changes. **Schedule month/year interval changes at renewal; do not enable immediate interval-changing proration in the portal.** An interval-changing proration fails closed and needs reconciliation. Enable Stripe's one-subscription limit as a second safeguard: https://docs.stripe.com/payments/checkout/limit-subscriptions. The app additionally uses one recoverable pending checkout per workspace, reuses its session, expires an open superseded plan checkout, and checks Stripe for an existing or pending subscription before opening another.

## Credit and renewal rules

- Included credits expire at their monthly window end; unused included credits do not roll over.
- Purchased credits have no automatic expiry and are consumed after included credits. An active Studio membership is required to use them. Cancellation does not delete purchased balance.
- January 31 annual anchors progress to February's last day, then March 31; the window is always calculated from the paid annual anchor rather than repeatedly adding to a clamped date.
- A paid same-interval upgrade adds a prorated difference for the unused portion of the current monthly credit window, once. The next monthly window uses the new full allowance. An unpaid upgrade earns no additional credits. Downgrades preserve the current paid credit allowance until renewal.
- Payment failure, expired trials, expired paid periods, canceled memberships, and billing holds block new provider calls while keeping saved work accessible.
- Existing paid accounts without the new paid-period fields catch up when Usage & billing loads: the server retrieves their actual latest Stripe invoice and checks its paid status and invoice-line price. A legacy database row saying `active` alone cannot grant usage. If their most recent invoice is an unsupported proration or Stripe is unavailable, reconcile their verified paid invoice before opening generation.
- Failed generations release customer credits once. Provider costs already incurred remain visible internally and consume the safety budgets.
- Completed output is never refunded merely because the final bookkeeping write times out. The prepaid debit remains reserved for operator reconciliation, and the saved output still returns successfully.

## Spend controls and what the meter means

Costs are **estimates**, not Stripe or provider invoices. They use reported token counts where available and conservatively reserve the full call ceiling when usage is missing or the provider fails. Rates include a 25% contingency and the post-promotional Flash text price, so the January 2027 price change is already covered. Image estimates use the fixed 1K portrait / 2K image resolution plus text token estimates; verify the gateway honors `image_config.image_size` and its output-token cap during the image smoke test.

Text requests conservatively cap input using UTF-8 byte counts and an output cap: 4,000 tokens normally, 7,000 for AI-written PDFs, and 12,000 per campaign pass. A campaign has at most two provider calls; other actions have one. Automatic SDK retries are off. Large context is shortened for the request with a marker; the original workspace knowledge remains stored unchanged. This bounds spending but is not a guarantee that every old message is in every prompt.

Global budget checks serialize reservations across workspaces. A second workspace-level cap bounds **failed and still-running** generation spend to the plan's credit cost allowance plus its small automatic-discussion budget. Successful work is governed by prepaid credits, so a calendar-month cap cannot incorrectly block legitimate credits refreshed in the middle of the month. Old consumed top-ups never create a permanent extra failed-generation allowance.

The operator meter shows combined monthly estimated spend, provider calls, reserved exposure, and the configured global cap. Customer billing administrators see credits and purchases, not Palmer House's private provider cost data. Provider usage records contain operation, model, tokens, image count, validated audio duration for voice, timestamps, and estimated cost; prompts and private document contents are not logged there.

## Reconciliation procedures

### Reserved requests after a process crash

Do not run a blind expiry job that refunds every old reservation: a file may have been saved before the process died. Inspect `studio_credit_usage` reserved rows older than 15 minutes. Generated images/PDFs and campaign assets carry their `usageReservationId` in asset metadata. Match the reservation to actual saved output and provider records.

- If output exists, complete the reservation with the verified/estimated provider usage.
- If no output exists, release it once with `finish_studio_credits`, retaining any incurred provider estimate.
- If uncertain, keep it reserved while investigating; do not trigger a second generation automatically.

These RPCs are service-only. Never expose reconciliation or service credentials as a browser action. The two-minute membership checkout lease can be reclaimed after an interrupted network request using its original idempotency key. An unknown checkout older than 23 hours deliberately requires operator reconciliation before a fresh payment session can be created.

### Refunds and disputes

A partial top-up refund reverses the corresponding fraction of credits (rounded up); repeated events do not multiply the reversal. Already-spent refunded credits become debt and pause generation. A failed in-flight operation that later releases its reservation also releases the corresponding debt, so a refund/failed-generation race does not charge the user for failed work. Full subscription refunds and disputes place a billing hold.

Debt and subscription holds require a human billing review. After a verified dispute win, corrected refund, or agreed repayment, reconcile the applicable grant/debt and clear the hold. Automatic dispute-win reinstatement is intentionally not implemented. Do not blindly clear all debt or replay paid grants; retain an auditable support record and verify Stripe's actual financial state.

## Required live release walkthrough

1. Keep both sales flags off; apply migrations and configure secrets in a test deployment.
2. Confirm an expired trial, nonmember, and empty balance cannot start any paid request. Create another workspace with the same creator and verify no second free trial grant.
3. Run one Luna reply, one two-pass Flash campaign, one 2K image, one 1K portrait, and an AI-written PDF. Verify each provider model ID, token usage, actual image resolution, saved result, and credit charge. Confirm supplied-text PDF exports use zero AI credits.
4. Simulate provider and storage failures: customer credits return once; internal cost remains recorded. Test parallel reservations against a nearly empty balance.
5. In Stripe test mode, buy each credit pack; replay its completion event and async-success event. Verify one grant only. Test abandoned/pending payment: zero credits until paid.
6. Start, cancel, retry, and change a membership checkout. Verify one open session or subscription. Replay webhooks out of order; simulate failed recurring payment and later recovery.
7. Advance a Stripe test clock through monthly and annual credit boundaries. Test a paid same-interval upgrade and downgrade. Verify annual customers get monthly credit windows.
8. Refund unused and partly used top-ups; test a refund while a generation fails. Test subscription refund/dispute and the manual resolution workflow.
9. Cross the configured global budget in test data and verify generation stops before a provider request. Verify customer owners cannot read internal costs.
10. Set an operating budget appropriate to forecast volume, enable `STUDIO_AI_SALES_READY=true`, then enable credit top-ups. Monitor Stripe webhook failures, reserved requests, and estimated/provider invoice variance during the first customer cohort.

## Local evidence

The implementation was verified with offline PostgreSQL and mocked provider/Stripe tests. It was not verified against a live Stripe charge, live provider generation, deployed migrations, a Stripe test clock, or a production tax configuration. No subscription prices were changed and no automatic off-session charges were introduced. See the economics report for fee/tax/hosting assumptions and the distinction between AI contribution margin and total business profit.
