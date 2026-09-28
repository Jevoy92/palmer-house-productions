# Studio visual assets and secondary surfaces

## Reference direction

Reviewed the supplied `ab81c4ed-f591-4c18-a74c-766f0e5047ee.png`, `8d946ab8-2cff-4fad-8ad5-5644f5a29a4b.png`, and `chat-desktop-editor-1440x1000.png` screenshots in Downloads. The useful pattern is a calm workspace, real Pal portraits, actual content visible before metadata, compact format identity, and direct editing/copy actions. The revised direction uses neutral white/black surfaces with restrained Pal accents. Dark mode changes the workspace surfaces without tinting or replacing the content images.

## Supplied 3D graphics

The source is the user's `Palmer-House-3D-Icon-Pack.zip`, preserved in `../Mobile Design Study/source-icons/`. Original extracted PNGs live under the study's `assets/package-icons-3d/` and `assets/outcome-icons-3d/` directories. All active files are unchanged 512 × 512 RGBA PNGs with transparent backgrounds. Hash comparison against the supplied originals passed for every mapped image.

`StudioGraphic.tsx` exports:

- `StudioGraphic({ name, size = 64, className, alt = "", style })`: decorative by default; provide alt text only if the adjacent UI does not already name the object.
- `STUDIO_GRAPHICS`: the semantic source/label/lane map.
- `StudioGraphicName`: a typed name union.
- `studioGraphicForAsset(kind, platform?)`: a format fallback.

Prefer actual attached or generated media for content cards. These illustrations identify features and content formats; they are never previews of a user's generated asset.

| Semantic names            | Supplied artwork           | Active source               |
| ------------------------- | -------------------------- | --------------------------- |
| chat, newsletter          | evergreen-faq-deep-dive    | `/studio/graphics/`         |
| feed                      | reel-services              | existing `/packages/icons/` |
| ideas                     | reel-pov                   | `/studio/graphics/`         |
| campaigns                 | system-sales-enablement    | existing `/packages/icons/` |
| library                   | system-client-handoff      | `/studio/graphics/`         |
| calendar                  | reel-momentum              | `/studio/graphics/`         |
| brand                     | spotlight-proof-builder    | existing `/packages/icons/` |
| roadmap                   | system-sop                 | existing `/packages/icons/` |
| facebook / social post    | reel-objection             | `/studio/graphics/`         |
| article                   | evergreen-case-study       | `/studio/graphics/`         |
| pdf / document, evergreen | outcome-evergreen          | `/studio/graphics/`         |
| script                    | spotlight-bts              | `/studio/graphics/`         |
| image                     | reel-day-in-life           | `/studio/graphics/`         |
| reel, spotlight, system   | corresponding outcome icon | `/studio/graphics/`         |

The social-post graphic represents a conversation rather than an official Facebook logo. Format text supplies the precise channel name. Twelve additional originals were copied into `public/studio/graphics/`; four assets already existed in `public/packages/icons/` and are referenced there. No duplicate masters were added. Typical display sizes are 40–66 px for content identity and 80–96 px for a restrained empty state or feature introduction.

Existing real Pal portraits remain in `src/assets/pal-avatars/` and `src/assets/pal-headshots/`. Continue using `PalAvatar` and `palDirectory`; do not replace the named Pals with generic symbols.

## Generated synthetic preview image

- Output: `dev/studio-preview/media/daybreak-bakery.png`
- Dimensions: 1672 × 941, RGB, approximately 16:9.
- Purpose: the explicitly synthetic Daybreak Bakery development fixture only. It is not seeded into customer workspaces or presented as a customer's uploaded photography.
- Provenance: OpenAI built-in image generation tool, 2026-09-27, one new image, opaque background. No existing image was edited. The generated output was copied without alteration from `/Users/yourboyjevoy/.codex/generated_images/01a0a68f-8c3d-7573-bbab-e23667c9c039/exec-f5fc8d9e-1b8d-4302-ba8a-b7a78e014752.png`.
- Visual check: flour-dusted hands kneading dough, warm window light, rustic loaves in the background, no visible face or branding.

Final prompt:

> Use case: photorealistic-natural. Asset type: wide landscape photograph for a fictional Daybreak Bakery social-post preview in a software design fixture. Primary request: a close view of a baker's flour-dusted hands kneading a soft mound of bread dough on a worn wooden worktable inside a small artisan bakery, with a few rustic sourdough loaves softly visible behind. Crop above the shoulders so no face is visible. Natural, credible hand anatomy and physically plausible kneading gesture. Warm golden early-morning window light from the side, subtle flour texture in the air, tactile linen apron and dough, shallow depth of field, candid editorial food photography. Wide 16:9 composition, hands and dough centered and readable in a narrow mobile crop. No text, logo, watermark, UI, border, collage, or graphic overlays. Create a single standalone photographic image.

## Calendar and roadmap behavior

The calendar drawer shows the saved draft, channel/business identity, attached image/video, word count, and last update before schedule metadata. Private generated images resolve through the provider's signed artifact URL method. No-media and load-failure states are explicit. Videos use native controls and never autoplay. Copy uses the saved copy; schedule saves still use `updateCalendarItem`. Saving a calendar entry does not publish to a social channel, and the UI says so.

The roadmap explains the outcome and when each video helps, with a collapsible starting brief. Suggestions use the existing Brand DNA/campaign scoring function, not an implied new AI analysis. Completed counts are labeled as statuses the user sets, rather than a universal 'health' score. Suggested items exclude those marked complete or not needed; All video ideas includes both. Saving creates a real idea, avoids duplicate simultaneous clicks, preserves existing progress, and reports partial success if saving the idea succeeds but updating its roadmap status fails. Status updates preserve linked campaign IDs and surface errors.

The Ideas board retains its capture and direction workflow. It adds supplied 3D identity to capture, starter suggestions, and saved idea cards. Actual uploaded image sources use signed `campaign-assets` URLs restricted to the current workspace path; loading/failure states do not invent a thumbnail. Original copy, source links, categorization, campaign handoff, and archive/undo actions remain.

These surfaces use `studio-support.css` and inherit the shared Studio theme tokens, including the portaled calendar drawer. No global shell CSS or provider behavior was changed as part of this support work.

## Validation

- All 16 unique mapped image files exist, retain full alpha transparency, and match the supplied source hashes.
- Focused ESLint: no errors. One fast-refresh advisory for the component/helper export module.
- Full repository `tsc --noEmit` passed after the integration fixes.
- Native Chrome review at 390 × 844 and 1440 × 1000: calendar copy/media, roadmap cards, and Brand Guide imagery inspected; Ideas cards inspected at both sizes. Both light and dark renderings were reviewed. The supplied PNGs remain transparent on both surfaces.
- Mobile calendar and Brand Guide drawer bounds verified at left 0/right 375 in a 390px viewport with a 15px reserved scrollbar gutter. Calendar footer remains visible while the body scrolls. A dark primary-button contrast issue and `100vw` drawer-width offset were fixed during this review.
- Calendar save enters a disabled pending state, completes, closes the dialog, and restores focus to its opening button in the local fixture. Roadmap save disables repeated clicks, exposes Open in Ideas, changes Recommended to Planned, and increments the in-progress count. Changing that video to Complete increments the completed count and removes it from Suggested next. These checks use synthetic local state, not production database writes.
- Screenshots were inspected inline through native CUA browser capture (no filesystem screenshot exports); the bakery output was separately inspected from its saved file. Live private-storage image loading still depends on configured Supabase access and was not exercised against customer data.

## Library content diversity — 2026-09-27

The fixture previously assigned the same kneading photograph to social posts, both scripts, and the standalone image. Seven existing asset IDs are retained, with three separate photographs and four native content covers. This changes the synthetic fixture and shared presentation logic, not customer assets.

| Asset                                                  | Presentation                                             | Source                                              |
| ------------------------------------------------------ | -------------------------------------------------------- | --------------------------------------------------- |
| `sample-facebook` / Made before sunrise                | Fresh pastries social photograph                         | `dev/studio-preview/media/daybreak-pastries.png`    |
| `sample-caption` / The person behind your morning loaf | Fictional baker portrait and people-story copy           | `dev/studio-preview/media/daybreak-baker-story.png` |
| `sample-image` / A loaf, ready to share                | Sourdough still life                                     | `dev/studio-preview/media/daybreak-sourdough.png`   |
| `sample-article` / The craft behind every loaf         | Editorial cover with real title, excerpt, and word count | Saved article content                               |
| `sample-anchor` / Before the doors open                | Dark story outline with three saved scene directions     | Saved script and storyboard metadata                |
| `sample-short` / The first loaf of the day             | Light timed reel storyboard                              | Saved script and storyboard metadata                |
| `sample-newsletter` / Something worth waking up for    | Letter cover with real title, excerpt, and word count    | Saved newsletter content                            |

The original kneading photo remains a synthetic brand-craft reference. It is no longer assigned as a Library card image. Script covers explicitly remain drafts; their supplied 3D symbols identify scene stages, not generated footage. Small mobile covers reduce secondary detail while retaining content identity. Dedicated styles live in `studio-asset-visual.css` so Library layout and motion can evolve independently.

### New image provenance

All three new files are original opaque RGB outputs from the OpenAI built-in image generation tool on 2026-09-27. Each was generated separately and copied unchanged. They belong only to the fictional development preview, not production customer data. No source photo was edited, and no real baker's identity was used.

| File                       | Dimensions  | Original generated output                       |
| -------------------------- | ----------- | ----------------------------------------------- |
| `daybreak-pastries.png`    | 1448 × 1086 | `exec-a267f766-0b74-4a01-9d24-88492e0a5d2e.png` |
| `daybreak-baker-story.png` | 1448 × 1086 | `exec-1a2534a5-0952-4dab-a687-94dda5fcfd37.png` |
| `daybreak-sourdough.png`   | 1254 × 1254 | `exec-d826fcf6-010e-473c-8794-cbda5f8e6e99.png` |

Original output directory: `/Users/yourboyjevoy/.codex/generated_images/01a0a68f-8c3d-7573-bbab-e23667c9c039/`.

**Pastry photograph — final prompt**

> Use case: photorealistic-natural. Asset type: social-post photograph for a fictional Daybreak Bakery software preview. Primary request: a fresh tray of flaky croissants and spiral morning buns just set on a bakery counter before opening. Eye-level close editorial composition with the tray in the foreground, warm golden window light catching the layers of pastry, understated cream tile and wood bakery interior softly blurred behind. No people or hands. Natural textures, restrained warm browns and cream, candid independent bakery photography. Landscape 4:3 framing, distinct and readable as a small library thumbnail. One standalone photograph, no text, logos, watermarks, UI, collage, borders, or graphics.

**Baker portrait — final prompt**

> Use case: photorealistic-natural. Asset type: people-story social photograph for a fictional Daybreak Bakery software preview. Primary request: a candid portrait of a friendly adult woman baker in her late thirties with dark curly hair tied back, wearing a cream shirt and a simple cocoa-brown linen apron, holding one finished round sourdough loaf at waist level in a small neighborhood bakery. She stands beside a wooden rack of breads, looking warmly toward the camera. Natural believable hands, relaxed expression, authentic texture, documentary editorial style, soft daylight from a nearby window. Landscape 4:3 composition framed waist-up, face and loaf clearly visible in a mobile crop. Warm neutral colors, no kneading or flour-cloud action. Single photographic frame, no text, logos, watermark, UI, collage, border, or graphic overlays.

**Sourdough still life — final prompt**

> Use case: photorealistic-natural. Asset type: standalone food photograph for a fictional Daybreak Bakery software preview. Primary request: a quiet overhead still life of a sliced rustic sourdough loaf on a pale stone tabletop, several slices fanned beside the loaf revealing an airy crumb, a folded natural linen cloth and a few crumbs. No people or hands. Morning sidelight, subtle long soft shadows, crisp realistic crust and crumb texture, simple considered editorial food photography. Square composition with the entire loaf and several slices visible, mostly neutral ivory, linen, and golden-brown bread. This should feel visibly different from a busy bakery work scene. One standalone photograph, no text, branding, watermark, UI, collage, frame, or illustration.

### Shared asset visual behavior

- Prefer the current asset's full image, then its own cover/thumbnail/poster. Campaign, brand, and generic source URLs are never substituted.
- Reject unsafe URL schemes and known PDF, audio, or video files as image sources. Native format covers remain available.
- Respect nonempty `metadata.imageAlt`; otherwise use a concise title fallback.
- Resolve private stored media only for image assets with a storage path. Key resolution by asset identity/version so recycled cards cannot flash another asset's signed URL. Loading and failure remain explicit.
- Present articles, newsletters, FAQs, and PDF documents as typed covers. Present unillustrated scripts as saved storyboards or actual script directions; do not invent missing scenes.

### Library validation

- All three new photograph files visually inspected; photographic assignments are distinct and point to existing files.
- Native Chrome review at 1440 × 1000 and 390 × 844, including grid and mobile list: photographs, article, newsletter, and both script covers inspected. A compact-cover title clipping issue was corrected and rechecked.
- Focused regression suite: `scripts/studio-asset-visual.test.mjs` covers media priority, unsafe/non-image sources, format labels, alt text, real storyboard parsing, server-rendered native covers, and fixture file diversity.
- Scoped ESLint passes with no errors; helper exports carry fast-refresh advisories. Full repository TypeScript check passes.
- Live private Supabase image loading was not exercised against customer data. Browser captures were inspected inline; no filesystem screenshot export was available through the native capture API.
