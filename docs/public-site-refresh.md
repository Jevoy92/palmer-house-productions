# Public website alignment — September 2026

## Shipped direction

The public site now introduces three ways to work with Palmer House: full production, Studio/software, and planning/preparation. Production packages retain the approved Option B collection → detail → pricing → plan flow. Shared white/charcoal themes, restrained Pal accents, supplied dimensional artwork, shorter copy, compact navigation/footer and finite motion align the public experience with Studio.

The Pals have distinct source-backed voices, shared Studio capabilities, and a clear relationship to the human production team. Explorer is expressed through customer agency and ownership, supported by Creator craft and Sage clarity. This is an evidence-based qualitative design assessment, not a personality test.

See `DESIGN.md` for the durable visual, voice and interaction contract.

## Customer path fixes

- Production package counts and filming sessions survive navigation to the estimator, including the local Pricing tab. A filtered package page returns to its category.
- Preparation, editing, consulting, assessment and Studio inquiries retain their context.
- Selected Studio plan and billing interval survive sign-in entry and return to a review state. Selection never starts a charge automatically.
- Missing/failed contact or webinar integration does not claim delivery. An email handoff explicitly remains unsent until the customer sends it.
- The assessment recommends a useful starting point, not an unsupported business score. Training maps to System; preparation and software needs get their own next steps.
- Existing DIY PDFs remain manually fulfilled. That is disclosed on the product, plan, and confirmation pages before a purchase is represented as complete.
- Marketing now distinguishes fictional package examples from portfolio evidence, drafts from publishing, trial credits from guaranteed deliverables, and a scope request from a booking.

## Voice usage

Voice transcription is bounded to five minutes and priced at two credits per started minute. Review and playback happen before transcribing. Server-verified duration, atomic credit reservation, durable duplicate protection, private storage and conservative recovery protect members and provider exposure. See `studio-rebuild/voice-transcription.md` and `studio-rebuild/billing-activation.md` for deployment requirements and economics.

## Verification completed locally

- 105 targeted automated checks for public intent/resource logic, production pricing/estimates, quote/payment verification, voice, credits/economics, onboarding and brand voice.
- 18 voice SQL checks and 41 existing credit-ledger SQL checks using a disposable PostgreSQL-compatible test database.
- 148 rendered desktop/mobile checks across 73 unique public routes, including all 10 packages, 6 industry pages, 4 location pages and 16 articles. No runtime/hydration errors, broken or pending images, missing image alt attributes, unnamed buttons, or horizontal overflow in those states.
- 73 discovered internal destinations returned successfully. Indexable marketing pages have descriptions and canonical links; the private plan route deliberately uses noindex.
- Independent customer/visual/brand reviews covered the five requested journeys, scope and plan carrythrough, inquiry validation, explicit unsent email states, Pal/demo interactions, mobile/desktop, light/dark/system, keyboard navigation and reduced motion.
- Voice browser simulation covered review cost, retry preservation, insufficient credits, closing/reopening tools, disabled configuration, documents and dark action contrast. All providers and transactions were mocked or blocked.
- TypeScript, changed-source ESLint, formatting and production build pass. Vite still reports large existing shared application/Studio chunks; this local audit is not a field-performance or formal accessibility certification.

## Deployment checks still required

Apply the voice migration after the existing billing migration; configure the server-only transcription credential and enable flag only for controlled live verification. Confirm provider/model availability, upload and function duration limits, usage accounting and recovery against the deployment. No production database migration or live paid AI request was performed in this pass.

Confirm authentication return URLs permit `/studio/billing` with a selected plan/interval. Payment, webhook, CRM/email durability and manual fulfillment need live test-mode verification with the deployed credentials. No real charge, customer booking or external inquiry was created.

The Clarity Intensive exists in the catalog at $500/75 minutes with 30 days of Studio access; the team must confirm scheduling and access rather than implying automated entitlement. There is no published webinar date or verified reservation integration; it is an interest inquiry.

Screenshots, exploratory reports and synthetic review captures are kept outside the repository. No customer workspace captures were uploaded with this implementation.
