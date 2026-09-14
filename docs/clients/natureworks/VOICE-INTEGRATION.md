# NatureWorks voice enrichment

Prepared September 14, 2026 for the existing NatureWorks client in Palmer House Studio. This is a writing-voice update. The proposed NatureWorks website design guide is internal proposal material and is excluded from this integration.

## What is included

[howard-voice.json](howard-voice.json) contains a curated voice profile for Howard Lehmann, ten complete talking-head shorts, three approximately 15-second variations, and three approximately 90-second variations. All 16 are original editorial drafts based on the supplied interview. They are not quotations, published copy, verified project outcomes, or a claim that Howard approved each script. Duration estimates use the stated reading rates; they are not measured performances.

The voice is specific because it preserves Howard's reasoning: notice something ordinary in the yard, explain what it may mean, and help the homeowner decide what to do next. His authority comes through the physical detail and the explanation. He can be interested in a gathering area or quiet corner without inflating the promise. He is comfortable distinguishing a finding from an unresolved outcome.

The six examples selected for the live profile cover learning a new yard, explaining work stages, interpreting irrigation symptoms, gathering and quiet, describing a problem without technical vocabulary, and developing a scope from the client's ideas. The other ten remain in the repository library for review and adaptation. They are not automatically inserted into every prompt.

Private source evidence stays outside this repository. The fixture retains paragraph references for audit: irrigation and diagnostic reasoning P033–P039/P049–P052/P057; patio use P065–P070; observing a new property P080–P085 with the ready-customer qualification P092–P094; selective care P142; scope and work sequence P150–P158. The source has unlabeled and sometimes mixed speakers. The analysis separates probable Howard answers from interviewer suggestions and other-speaker interjections. No raw transcript, private client quote, invoice, customer name, or contact data is included here.

## Existing destinations and preservation

| Existing field | Import behavior |
| --- | --- |
| `voice_traits` | Append five concise traits, preserving existing entries; refuse to exceed the current 12-entry generation limit. |
| `avoid_language` | Append six language boundaries, preserving existing entries; refuse to exceed 20 entries. |
| `brand_details.aiRules` | Append one versioned guidance block. Preserve existing rules and every other key in `brand_details`. |
| `content_examples` | Append six complete, labeled original drafts. Preserve existing examples and their order. |

Business name, website, offers, verified proof, calls to action, biography, mission, values, colors, fonts, visual style, imagery direction, billing, workspace identity, and other clients are not changed by the importer. No new client or database table is created. The JSON file is a reviewed source fixture, not a global Howard system prompt.

The existing Brand Studio exposes the voice traits, language boundaries and AI rules at `/studio/brand`. The imported `content_examples` column is consumed by generation; this bounded change does not add a new script-library screen. The full source library remains editable in this repository. A future Script Lab is separate work.

## Why the small runtime change is necessary

At the inspected revision, campaign and direction requests omitted detailed AI rules and examples. The patch resolves those saved fields from the authorized workspace on the server, through `loadWorkspaceVoice` and the existing `loadWorkspaceKnowledge` digest. It does not rely on browser-supplied voice text or change the request schemas.

| Existing generation path | Voice delivery after this patch |
| --- | --- |
| `generateStudioCampaign` | Shared knowledge contains the saved voice. `campaignBriefText` supplies it to both the core campaign and long-form calls. Shorts, captions, FAQs, newsletter, carousel, platform posts, article and long-form script therefore receive the same source. |
| `generateContentDirections` | Existing shared knowledge now contains the same saved voice. The prompt no longer suggests inventing a founder's memory or mistake when no personal evidence exists. |
| `askStudioPal` | Existing shared knowledge contains the saved voice. The guide may keep its Pal voice while draft client copy uses the client's writing voice. |
| `analyzeStudioContentSource` | The source-derived idea receives saved writing voice separately from source evidence. Examples cannot establish what an image or linked page proves. |
| `analyzeStudioWebsite` | Remains factual website extraction. The curated voice does not contaminate what the site was observed to say. |

Examples are labeled as style data and are passed whole. Oversized samples are omitted with a notice rather than cut before an important qualification. Up to 12 examples fit within a 12,000-character sample budget. Rules above 16,000 characters require editing before generation; the six selected examples and this fixture's complete guidance fit comfortably. No voice data yields the existing fallback, not a NatureWorks default.

## Reviewed import workflow

The importer uses Node 22 or newer and built-in APIs; it installs no package and runs no migration. Its default mode reads the selected existing profile and reports the proposed voice changes. It performs no write unless `--apply` is supplied with the revision from a reviewed preview.

1. Sign in to the existing NatureWorks workspace and verify its workspace ID and current brand. Historical repository evidence refers to more than one NatureWorks-related workspace; do not guess an ID or create another workspace.
2. Supply `STUDIO_SUPABASE_URL`, `STUDIO_SUPABASE_PUBLISHABLE_KEY`, `STUDIO_USER_ACCESS_TOKEN`, and `STUDIO_WORKSPACE_ID` through a temporary local environment. Use the existing project's publishable key and an authorized signed-in user's short-lived token. Do not put credentials or current profile exports in Git. The importer rejects service-role credentials and requires an existing workspace owner/admin membership.
3. Run `node scripts/natureworks-voice-import.mjs`. Review the fixture and the preview's field list, active sample IDs and `expectedUpdatedAt`. No existing private profile contents are printed.
4. Set `STUDIO_EXPECTED_UPDATED_AT` to that reviewed timestamp, then run `node scripts/natureworks-voice-import.mjs --apply` when the specific import is authorized. The PATCH selects the existing row ID, workspace ID and unchanged `updated_at`; a concurrent edit produces a conflict rather than replacing newer work.
5. Open the same Brand Studio record and inspect the result. Repeat preview: it should report the version already present and perform no write. Existing voice sections or samples edited after import trigger a reconciliation error instead of being overwritten.

The importer requires both a recognized NatureWorks name and the existing `gonatureworks.com` website. A mismatch, missing row, duplicate row, exhausted array limit, invalid saved field, other voice version, denied role or changed revision stops the import. Correct the selection or reconcile the existing profile; do not loosen the identity check just to bypass an error.

Code publication alone does not import the profile or approve scripts. No model training, audio voice cloning, sending, posting, subscription change or website identity approval occurs here. Review any generated copy before its normal publishing workflow.

## Verification and continuation

Run the focused suite from the repository root:

```sh
node --experimental-strip-types --test scripts/natureworks-voice-import.test.mjs scripts/studio-voice.test.mjs
```

All 18 focused tests passed in a complete staged copy of the verified source. The suite covers preservation, repeat imports, edited data, wrong workspace/client, array limits, draft/source labels, read-only preview, role checks, revision checks, zero-row writes, credential rejection, workspace-scoped voice loading, whole-example limits and empty-profile fallback. All test network behavior is mocked. Full Studio TypeScript checking, the Vite client/SSR/Nitro production build and lint for the seven changed/new code files also passed. Whole-repository lint still reports 2,191 errors and six warnings across 46 untouched files; each affected file was verified byte-identical to the pinned source. These existing findings are outside this patch. Recheck the connected branch before publication and rerun checks if its head has changed.

After an authorized live import, compare new drafts across directions, short scripts, long form, newsletter and Ask a Pal. Useful test topics are a wet patch with an unknown cause; learning how guests move through a patio; and explaining why a graded yard is opened again. Check for concrete observations, natural sentences, retained uncertainty, complete spoken scripts, appropriate endings and no invented outcome, price, offer, biography or testimonial. This qualitative live-generation check has not yet been performed.

If reverting, a Git revert removes the runtime/code change but does not undo database data. In the selected existing brand, review and remove only the exact imported block and six unedited sample markers if necessary. Preserve shared or subsequently edited traits and rules; do not replace the whole brand profile with an old snapshot.

## Verified source revision

The production-build staging copy excluded `.env` and made no model, email or database calls. The source package-lock disagrees with the package manifest for the Lovable config version; staging used a pnpm-imported lock with the manifest-required 2.13.1 and the existing entities override. No dependency or lockfile change is proposed.

Current `main` was independently resolved through the GitHub branch endpoint to [`ec5fa07fb30b9b75a0c5d2c8575a8e8456ab059f`](https://github.com/Jevoy92/palmer-house-productions/commit/ec5fa07fb30b9b75a0c5d2c8575a8e8456ab059f), dated August 17, 2026. Relevant sources: [Brand Studio save/editor](https://github.com/Jevoy92/palmer-house-productions/blob/ec5fa07fb30b9b75a0c5d2c8575a8e8456ab059f/src/components/studio/StudioApp.tsx), [database types](https://github.com/Jevoy92/palmer-house-productions/blob/ec5fa07fb30b9b75a0c5d2c8575a8e8456ab059f/src/lib/supabase/database.types.ts), [shared knowledge](https://github.com/Jevoy92/palmer-house-productions/blob/ec5fa07fb30b9b75a0c5d2c8575a8e8456ab059f/src/lib/studio-knowledge.ts), [server entry points](https://github.com/Jevoy92/palmer-house-productions/blob/ec5fa07fb30b9b75a0c5d2c8575a8e8456ab059f/src/lib/studio-server.ts), and [campaign generation passes](https://github.com/Jevoy92/palmer-house-productions/blob/ec5fa07fb30b9b75a0c5d2c8575a8e8456ab059f/src/lib/campaign-build.server.ts).
