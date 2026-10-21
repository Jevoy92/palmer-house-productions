# Audit remediation — October 20, 2026

## Changes

- Production and mixed carts request a confirmed quote before payment. The public Stripe endpoint accepts standalone digital items only. Existing payment receipts remain verifiable.
- The request handoff keeps package scope, estimate, name, email, company, city, timing and ongoing-support preference in a complete copyable brief. HoneyBook submission is an explicit next step, with no unsupported prefill promise or false submitted confirmation.
- Explicit Stripe test mode cannot fall back to live credentials. API key prefixes and webhook event mode must match configuration; only the selected signing secret is accepted.
- Free-demo usage is reserved transactionally in PostgreSQL, with a signed guest identity, per-kind session allowances, network limits, a rolling 24-hour call limit and a weighted spending allowance. Missing bookkeeping fails closed.
- Demo provider requests have bounded input/output, an approved model rate profile and conservative per-operation reserves. These are estimated exposure controls, not a reconciliation against actual provider invoices.
- Website research resolves public IPv4 addresses, pins the connection to a validated address and rechecks each redirect. TLS verification remains enabled; requests, response size and content type are bounded.
- Dark-mode Pal selectors and artwork are readable, the Studio mark remains visible, and the redundant collection theme control is removed.
- The finder now asks which specific training, story or demonstration is needed. Package choice and scope carry through to the plan.
- Script previews present scene-specific shot directions instead of misleading repeated pictures. Carousels use one shared photograph plus designed text slides. The mobile script detail has one vertical scrolling region.
- Membership descriptions specify one discounted session per project. A failed benefit lookup no longer claims the included session is unused.
- Public demo greetings, mode labels and format-preview explanations are clearer. Existing assets remain in place; generated Pal films were not installed.
- Repaired stale tests, type errors and formatting failures; added a repeatable unit runner and CI with a disposable PostgreSQL service. Corrected the stale Lovable editor link in README.

## Verification

- 195 unit tests pass, including billing modes, production payment gate, signed identity, fail-closed budget checks, voice validation, credits, fulfillment, shared memory and SSRF policy.
- 15 database integration tests pass: 5 real PostgreSQL budget tests, 4 booking-email/outbox tests and 6 retry-wake tests. The application SQL routines are loaded unchanged; external email transport and queue/cron services are local test doubles. No email is sent.
- The global-cap race test admits exactly one of 20 simultaneous requests when the limit is one. Different sessions on one network cannot bypass its limit.
- TypeScript and production build pass. Lint has zero errors and 19 existing Fast Refresh export warnings. Build retains the existing large-chunk advisory.
- Browser retest: desktop and 390px mobile finder, Safety Training selection, scope/price carry-through, required fields, complete request brief and copy action, cart removal, light/dark sign-in, Pal switching/focus, mobile script scene navigation/copy/single scrolling region, and digital payment-unavailable recovery with retained details.
- A real public fetch to example.com returned HTTP 200 through the pinned transport locally. Cloudflare transport behavior still needs a deployed smoke test.
- No real charges, customer bookings, inquiries, emails or paid AI generation were made during remediation.

## Release order — do not skip the database migration

1. Apply `supabase/migrations/20261020000100_atomic_demo_budget.sql` to the CURRENT connected Supabase project (`mjuyfbnisdhchziwjrvo`). This is additive. Do not use the older Studio project.
2. Confirm the `reserve_expo_demo(text,text,text,integer,integer,integer,integer,integer)` function exists, service_role can execute it, and anon/authenticated cannot.
3. Configure a dedicated random server-only `EXPO_DEMO_IDENTITY_SECRET`. The service-role secret is a supported fallback, but rotating it invalidates guest cookies.
4. Review demo allowance configuration and provider cost profiles. Defaults: $10 estimated reserves per rolling 24 hours; 600 total calls; 100 per network; per session 40 chat / 6 research / 4 campaigns / 8 images. Operation reserves: 5c chat / 1c research / 25c campaign / 50c image. Failed attempts retain their reserve. Existing usage rows receive a conservative 50c reserve and may temporarily exhaust the first-day allowance.
5. Only enable `EXPO_DEMO_TRUST_CF_IP=true` after confirming the trusted edge overwrites that header. Otherwise unknown network addresses share a conservative bucket. No user content or raw IP address is stored in demo accounting.
6. Release the code after the migration. Run one controlled live demo and inspect accounting, public website research, and provider output. Unknown/unpriced models are blocked until explicitly priced.
7. Verify Stripe Checkout and webhook delivery with test credentials and an isolated test database. Explicit `STRIPE_USE_TEST=true` requires `sk_test_` or `rk_test_` credentials and the test webhook signing secret. Never share test and live billing state. Then verify production configuration without creating a real charge.

## Current external blocker

The current Lovable project is `f52a0363-e08b-4253-828c-ce70e0c11242`; its reported latest commit matches the audited base. Its database is enabled, but the connected Lovable authorization lacks `projects:write`, which the database query tool requires even for SELECT. The direct Supabase connector also cannot access the current project. No production migration or deployment was performed.

Reauthorize Lovable with its current permissions, or apply the migration in the current project's SQL editor and perform the listed deployment checks. Keep this change on a separate branch until then. Manual PDF delivery remains explicitly disclosed; there is no claim of instant download.

## Local check commands

`npm run check` runs lint, types, all 195 unit tests and the production build. `PALMER_TEST_DATABASE=1 npm run test:db:setup` initializes an empty disposable PostgreSQL database named `palmer_audit_test` on localhost:55432; `PALMER_TEST_DATABASE=1 npm run test:db` exercises the integration checks. Setup refuses nonempty databases, and integration tests require the disposable marker. See the GitHub workflow for a reproducible PostgreSQL service.
