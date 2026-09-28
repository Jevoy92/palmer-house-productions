# Lovable handoff — Studio refinement

## What is ready

Actual React screens and authenticated server handlers, not a separate static mockup. Pals share workspace knowledge, while their personality prompts and portraits remain distinct. Studio themes stay neutral. Draft images attach to one exact output. The Feed can request one grounded discussion when a workspace is opened. Navigation, Calendar, Ideas, Brand DNA and the roadmap have working local flows.

## Database updates

Apply the normal project migrations in order through the project's usual deployment process. The local rebuild adds these four migrations; check the remote migration history before applying anything twice:

1. `20260927180000_studio_recovery.sql` — custom Pals, saved Feed/discussions and generated artifacts.
2. `20260927210000_studio_shared_memory.sql` — canonical workspace memory, RLS and revision-controlled mutations.
3. `20260928010000_studio_proactive_media.sql` — atomic Feed generation reservation/completion and exact per-output image associations.
4. `20260928020000_studio_credit_ledger.sql` — prepaid credits, provider budget reservations, invoice-backed renewals, payment event idempotency, refund adjustments, and one pending membership checkout.

Read `billing-activation.md` for payment setup and reconciliation before enabling sales. See `ai-economics.md` for model pricing, workload simulations, and service labor assumptions.

No live database was modified during this work. Keep existing private storage policies; test signed portrait and artifact URLs using two independent workspace accounts.

## AI configuration

The existing server-only `LOVABLE_API_KEY` contract remains. Runtime config is in `src/lib/studio-ai-config.server.ts`:

- `AI_GATEWAY_URL`: compatible API base URL.
- `STUDIO_CHAT_MODEL`, `STUDIO_BUILD_MODEL`, `STUDIO_IMAGE_MODEL`: operation-specific models.
- `STUDIO_AI_MODEL`: fallback override for text/build models.

Use model IDs supported by the deployed gateway. Structured chat output and image response formats must match the adapters in `src/lib/ai.server.ts`. Changing a model or compatible endpoint does not modify stored memory, Brand DNA, assets, calendars or conversations. A provider with a different API protocol needs an adapter, not a migration of the memory store.

## Live acceptance checks

1. Create one conversation with each Pal. Confirm the voice changes while the same saved business facts remain available.
2. Save a Shared memory note, switch Pals and text model, then confirm the note still informs the next request. Edit/forget it and verify subsequent retrieval.
3. Generate two images from two different drafts. Check subject relevance, separate Library rows, distinct `mediaAssetId` associations and reopening signed media. Edit a source while generation is pending and verify the stale result stays in Library without overwriting the draft association.
4. Generate a custom Pal portrait from an appearance description; save/reopen it without adding a content-Library item.
5. Open a workspace in two tabs. Verify a single automatic Feed discussion, 2–4 grounded replies, cooldown behavior, and a retained saved Feed when AI is unavailable.
6. Generate a PDF, reopen/download it, and verify text. The current PDF font supports Latin/WinAnsi text and explicitly reports unsupported glyphs.
7. Verify live account, storage, billing and any outbound publishing integrations separately. The Studio's Calendar itself schedules locally saved work; it does not publish to social accounts.

Automatic Feed policy: one reservation per workspace; 5-minute lease; 6-hour automatic cooldown after changed context, 24 hours if unchanged; manual refresh spacing of 5 minutes; 10-minute backoff after failure. No unverified external-research claims are permitted.

## Local preview and evidence

Use the existing `dev/studio-preview` harness at port 4175. It uses fictional fixtures and never calls a live model. See `quality-audit.md` for current evidence, scores and limitations. The synthetic preview uses fictional data. GitHub synchronization does not verify deployed Stripe, AI, or database configuration; complete the live checks above and the billing activation checklist before enabling sales.
