# Shared workspace memory

## Canonical storage and model changes

Member-saved notes live in `public.workspace_memories`, scoped to a workspace. Each record has a title, content, immutable creator, timestamps, and integer revision. The table contains no model names, provider conversation IDs, embeddings, or opaque provider state. Switching `STUDIO_CHAT_MODEL`, `STUDIO_BUILD_MODEL`, `STUDIO_AI_MODEL`, `STUDIO_IMAGE_MODEL`, or the compatible gateway endpoint does not change these rows.

`studio-ai-config.server.ts` holds runtime model/endpoint configuration separately. Existing defaults and the server-only `LOVABLE_API_KEY` contract remain unchanged. A different endpoint still needs compatible authentication, structured output, and image support; this change does not certify arbitrary providers. No credential is stored in memory or exported by the memory feature.

Every Studio generation reconstructs context from user-scoped Supabase reads. Shared retrieval covers chat (built-in and custom Pals), campaigns, content directions, Feed discussions, image/PDF generation, website analysis, and content-source analysis. Source analysis treats workspace context as background, not evidence of what a website or image contains. Audio transcription remains faithful source extraction without injected memory; its resulting attachment summary enters shared workspace context.

## Retrieval boundaries

- All member-saved memory is included: up to 50 notes, 2,000 characters per note, and 30,000 total content characters. Database mutations enforce these bounds. The loader refuses an oversized canonical store instead of silently dropping approved notes.
- Recent shared chat context contains up to 20 recent message candidates, with archived conversations excluded. Excerpts include the original member/assistant role, Pal, conversation title and ID, message ID, and timestamp; bodies are limited to 700 characters. Assistant drafts are expressly unverified, never promoted to factual proof. Older messages remain stored but are not all included in each request.
- Brand DNA, saved voice, recent campaigns/ideas/calendar work, current library assets, attachment summaries, and completed roadmap items retain their existing bounded retrieval.
- Existing `workspace_settings.ai_memory` is retained as **legacy notes with unknown approval provenance**. No migration silently treats these notes as approved facts. Up to 12,000 characters are included as unreviewed background; export contains the complete stored value. Members can review useful facts and save them explicitly.
- No automatic long-term fact extraction, embedding index, or exhaustive historical search is claimed. A lasting fact should be added to Shared memory.

## Member controls

Settings → Shared memory supports inspect, add, edit, forget, reload, and JSON export. Changes apply across the workspace's Pals. Exports contain canonical notes plus the unreviewed legacy value, not the entire Brand DNA, history, or asset store. No import flow is included.

Forgetting deletes a canonical row; it is absent from subsequent memory retrieval and exports. Legacy notes have a separate clear action. Neither action removes the same fact from other source records, existing conversation replies, local downloaded exports, database backups, or requests that already loaded their context. Original source data must be edited separately to remove it there.

## Concurrency and tenant boundaries

New-table direct writes are revoked for authenticated and anonymous roles. Reads use membership RLS. Authenticated server handlers also verify membership before RPC calls. Mutation functions validate `auth.uid()` and membership independently, use a workspace advisory transaction lock, and compare the expected revision. A stale edit or forget fails with a conflict instead of overwriting someone else's update. A forgotten ID cannot be resurrected by an old edit. Creator/workspace identity cannot be changed through the APIs.

Clearing legacy notes compares the current JSON to the displayed version and updates only `ai_memory`; unrelated settings are preserved. The UI scope and request guards reject late memory loads from another account/workspace.

## Deployment

Apply `supabase/migrations/20260927210000_studio_shared_memory.sql` using the usual deployment process. It adds one table, one index, a read policy, and three narrowly scoped mutation functions. It does not rewrite existing notes or run an AI backfill. The recovery migration `20260927180000_studio_recovery.sql` remains a separate prerequisite for custom Pals, Feed, and file artifacts.

No live migration was applied. Before the memory migration exists, the workspace continues to read its existing context and the Shared memory panel reports that the feature is unavailable. Genuine read/permission failures stop generation rather than silently claiming empty memory.

## Verification

- `node --test scripts/studio-memory.test.mjs`: 8 tests pass. Actual handler/provider adapters verify that two model/endpoint configurations receive identical canonical context; all eight Pal handlers retrieve the same facts; forgetting removes notes from future prompts/exports; provenance, tenant filters, schema fallback, and budget behavior hold.
- `scripts/studio-memory-migration.check.mjs`: 20 actual offline PostgreSQL checks pass via PGlite. These cover RLS, RPC auth, direct-write denial, stale revisions, independent member additions, forget, limits, and legacy/settings isolation. Parallel same-revision requests produce one success and one conflict. PGlite serializes operations on one connection; this is not a production multi-connection load test.
- Run SQL checks with a temporary `@electric-sql/pglite` install: `STUDIO_PGLITE_MODULE=/absolute/path/to/pglite/dist/index.js node scripts/studio-memory-migration.check.mjs`. PGlite is not a production dependency.
- `dev/studio-preview/memory-check.mjs`: all 4 desktop/mobile scenarios pass (1440 and 390 pixels), covering add/edit/export/cancel-forget/forget/layout and failed-save draft preservation. Zero browser errors and external requests. Local artifacts: `/private/tmp/studio-memory-review/report.json`, `memory-1440.png`, and `memory-390.png`. No account, gateway request, or live database is used.
- Combined memory/recovery/voice run: 30/30 tests pass. All 11 conversation lifecycle regressions are covered across the full run and a targeted rerun after adding the signed-image URL method to the synthetic fixture. Source TypeScript and scoped ESLint pass; root owns the final full build.
- Live provider calls, remote database RLS, and deployed storage still require deployment-environment verification; the local AI credential remains unconfigured.
