# Studio recovery backend — 27 September 2026

## Persistence

- `studio_pal_profiles` stores custom names, base voice, personality, and a private avatar path. `workspace_settings.active_pal_profile_id` stores the shared active selection independently of the existing AI-memory JSON. Historical chat and generated files keep an immutable `originatingPal` identity snapshot.
- Feed posts, comments, and reactions use separate workspace-scoped tables, with membership RLS and composite workspace foreign keys. The database reaction key is `(post_id, user_id, reaction)`; setting a reaction is idempotent and does not replace another member's data.
- Generated discussions use `create_studio_feed_discussion`: the opener and 2–4 replies are one database transaction. No partial discussion remains when a reply insert fails. References come only from saved campaigns/member-provided brand references; model-proposed URLs must match this set exactly. This feature does not claim to conduct external web research.
- `campaign_assets.campaign_id` can be null for standalone image/PDF library items. New `image` and `document` kinds use canonical metadata `storagePath`, `mimeType`, `generated`, `title`, `byteSize`, `originatingPal`, and `createdBy`.
- Image/PDF bytes and avatars live in the existing **private** `campaign-assets` bucket under `<workspace UUID>/...`. Stored paths never contain bearer tokens or expiring URLs. Reads resolve fresh user-scoped signed URLs lasting one hour.
- PDF edits create a new private file, then update the existing library row only if `updated_at` still matches the editor's version. A stale edit removes its temporary upload and leaves the existing document intact.

## AI and context

All Pal identities share the same capabilities. The selected personality changes writing tone only. The existing `ai.server.ts` provider supplies structured text and the image endpoint; no video generation is implemented. Image generation uses `STUDIO_IMAGE_MODEL` when configured and otherwise `google/gemini-3.1-flash-image` through the existing Lovable gateway. [Lovable's official AI documentation](https://docs.lovable.dev/features/ai) lists Gemini 3.1 Flash Image as supported; the live image API response contract has not been verified with a configured credential. Provider refusals, quota errors, empty image responses, unsupported output, and storage errors are shown as failures; no sample image or pretend output is saved.

The shared workspace digest now includes saved Brand DNA, current asset text, campaigns, ideas, calendar items, conversation attachment summaries, and completed roadmap entries. It recognizes the database's `complete` status and the historic `done` alias. Failed knowledge reads stop generation rather than inventing an empty workspace.

PDF files use `pdf-lib`, measured text wrapping, page breaks, headings, page numbers, and a selectable text layer. The embedded standard font supports Latin text and typographic punctuation; unsupported scripts/symbols are rejected with a readable error rather than silently replaced. If the member supplies content, the server exports that text directly. Otherwise the real AI provider drafts a document first.

## Deployment and verification boundary

Apply `supabase/migrations/20260927180000_studio_recovery.sql` through the normal migration deployment process before enabling these new persistence features. The migration and matching TypeScript declarations are included in the local source changes; no live database migration was applied during implementation. Existing workspace loading remains usable if these new tables are unavailable, with a separate recovery error state.

No live AI generation, private workspace read, storage upload, or external service write was used in verification. Server regression tests execute the real handlers against isolated auth/provider/storage adapters; PDF tests create and parse actual bytes. Existing browser lifecycle tests use a separate local Vite server and synthetic state.

Useful checks:

- `node --test scripts/studio-recovery.test.mjs`
- `node --test scripts/studio-conversation-lifecycle.test.mjs` (requires the repository's documented Playwright runtime/Chrome overrides)
- Full TypeScript/build and changed-file ESLint checks.

The database RLS/transaction migration still needs deployment-environment verification after migration application; local handler tests do not claim to exercise a live PostgreSQL service.

### Verified locally

- 15 new recovery tests plus 7 existing brand-voice tests pass, including actual multi-page PDF creation and text extraction.
- All 11 existing Studio lifecycle browser regressions pass across the full run and one targeted rerun after updating the archive-menu selector.
- 21 offline PostgreSQL checks pass against the migration using PGlite. These execute actual RLS, column grants, composite foreign keys, reaction uniqueness, and generated-discussion rollback in an isolated database with the relevant prior table shape. This does not inspect or alter a deployed database.
- The optional reproduction script is `scripts/studio-recovery-migration.check.mjs`. Install `@electric-sql/pglite` in a temporary directory and run it with `STUDIO_PGLITE_MODULE=/absolute/path/to/@electric-sql/pglite/dist/index.js node scripts/studio-recovery-migration.check.mjs`. PGlite is not a production dependency.
- Local AI credential configured: **false**. Local Supabase URL and publishable key configured: **true**. Gateway base URL: `https://ai.gateway.lovable.dev/v1`. Deployment secrets were not inspected. Live image/text provider behavior remains an environment verification step.
