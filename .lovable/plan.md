# PR #4 release diagnostics (read-only findings)

Nothing was edited, merged, published, charged, emailed or changed.

## Configured settings (set / not set only)
- LOVABLE_API_KEY: set
- SUPABASE_SERVICE_ROLE_KEY: set (platform-provided). SUPABASE_SECRET_KEY: not set
- STRIPE_TEST_API_KEY: set
- STRIPE_TEST_WEBHOOK_SECRET: set
- STRIPE_SECRET_KEY: set
- STRIPE_WEBHOOK_SECRET: set
- STRIPE_USE_TEST: not configured, so test mode is off (live key in use)

## Stripe account
- Connected account (from the Stripe connector metadata): acct_1PhlBCGcAcCB6YlQ, display name "Palmer House Productions".
- Unavailable: proof that STRIPE_SECRET_KEY / STRIPE_TEST_API_KEY belong to this same account. Checking that needs a call made with each key, which was not done.

## AI models (code defaults; no override settings are set)
- Studio chat: openai/gpt-6-luna
- Studio build: google/gemini-3.8-flash
- Studio images: google/gemini-3.1-flash-image
- Voice transcription: google/gemini-3.5-transcribe
- Demo text: EXPO_DEMO_MODEL is not set, so it uses the build model google/gemini-3.8-flash. Demo images: google/gemini-3.1-flash-image
- Gateway URL: default (AI_GATEWAY_URL not set)

## Test database or staging
- One backend serves both the preview and the published site. There is no isolated test database or staging runtime.
- Stripe test mode is the only isolation for payments. It switches the whole app, not just one branch.
- Draft workspaces with their own isolated backends exist as a platform feature. No draft was checked or created.

## Can PR #4 run in preview before merging?
- The preview runs commit 7b97267 on an internal edit branch. Commit aa6399d5 is not in this checkout.
- Unavailable: running a GitHub PR branch in this preview without merging it first. That is not verified here.

## Runtime
- The preview is a local dev server (`bun run dev` running Vite on Node, port 8080). It is not the production Cloudflare Workers runtime. Behavior that only exists on Workers is verified only after publishing.

## Not verified
- Whether the 20261020000100 migration exists in this checkout. Its applied state and grants were not checked again.
- Whether PR #4's code matches what is deployed.

## Proposed next step (only if approved)
None. This report answers the questions only. Approving it changes nothing.
