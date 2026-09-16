# Palmer House website integration inventory

Source: the **active Mobile Design Study**, 15 September 2026. This inventory describes the approved design and prototype behavior; it does not establish live payment terms.

## 1. What to port

**Option B is the selected direction:** visual package collection → product detail → pricing/custom estimate → plan → project details. Preserve its hierarchy, supplied 3D graphics, color treatment, sample videos, and Light/Dark/System behavior.

| Active source | Purpose |
| --- | --- |
| `prototype.html`, `prototype.js` | Customer-facing reference screens and interactions |
| `catalog.js` | Ten package tuples, package metadata, icon helper, old-ID aliases |
| `pricing-model.js` | Shared draft arithmetic and optional extras |
| `prototype.css` → `flow.css` → `appearance.css` | Current effective style order; later files override earlier rules |
| `appearance.js` | Persisted theme preference and appearance dialog |
| `generated-previews.js`, `portfolio.js` | Current video/caption manifest and fallback still helpers |

`index.html` is a **design-review board containing three phone previews**, not the production website layout. Do not transplant its phone frames or review controls into the live customer journey. A/C and their guided routes remain in the prototype for history; B is the integration target.

## 2. Package data and scope

Current tuple schema: `[id, lane, name, description, defaultSessions, defaultVideos, recommended]`. Convert to named fields in the website's existing data model if appropriate. Keep descriptions and IDs from `catalog.js`; use **packages** as the umbrella term without repeating “Package” in every short title.

| Canonical ID | Short name | Pal lane | Default scope | Draft default price | Recommended |
| --- | --- | --- | --- | --- | --- |
| `social-content` | Social Content | `reel` | 1 session + 6 videos | $1,350 | Yes |
| `commercials` | Commercials | `spotlight` | 1 session + 4 videos | $1,050 | Yes |
| `product-demos` | Product Demos | `spotlight` | 1 session + 4 videos | $1,050 | No |
| `customer-stories` | Customer Stories | `spotlight` | 1 session + 4 videos | $1,050 | No |
| `employee-spotlights` | Employee Spotlights | `spotlight` | 1 session + 4 videos | $1,050 | No |
| `onboarding` | Onboarding | `system` | 1 session + 6 videos | $1,350 | Yes |
| `safety-training` | Safety Training | `system` | 1 session + 6 videos | $1,350 | No |
| `sales-training` | Sales Training | `system` | 1 session + 6 videos | $1,350 | No |
| `video-sops` | Video SOPs | `system` | 1 session + 8 videos | $1,650 | No |
| `educational-videos` | Educational Videos | `evergreen` | One 5-minute episode | $1,050 | Yes |

Educational Videos' tuple has `0, 0` in the session/video slots because pricing uses **minutes**, not those fields. Never display “0 sessions / 0 videos.”

`packageDetails[id]` adds `icon` (original PNG basename), `formats` (ratio strings), `format` (display summary), `learn` (three examples), and `outcome` (one sentence). The detail page currently renders `learn` and `format`. Content approaches such as hot takes, objection answers, behind the scenes, FAQs, and case studies live inside these packages.

- Social Content supports `9:16`, `1:1`, and `16:9`, with framing agreed in scope.
- Four Spotlight packages list `16:9` / `9:16` options, agreed in scope.
- System and Evergreen list `16:9`.
- Multiple listed ratios do **not** mean every video includes every export. All current example clips themselves are 16:9.

Category order/counts: Reel Pal **1**, Spotlight Pal **4**, System Pal **4**, Evergreen Pal **1**. “From” prices are derived from minimum package defaults: **$1,350 / $1,050 / $1,350 / $1,050**. Preserve singular count wording.

### Pricing rules

- Non-Evergreen: `sessions × 450 + finishedVideos × 150` USD. One filming session is described as two hours.
- Evergreen: `1050 + ((minutes − 5) / 5) × 600` USD; current choices are **5 / 10 / 15 minutes**.
- Package detail fixes the default session count and allows **1–20 videos**, with **4 / 6 / 12** presets. Educational detail adjusts length by five-minute steps, bounded to 5–15.
- Custom estimator permits **1–4 sessions**, **1–20 videos**, or Evergreen length presets. Scope/capacity remains subject to the quote.
- Optional extras are unselected initially: Caption pack **$75**, Thumbnail set **$50**, 30-day posting plan **$100**, Brand kit integration **$150**, Rush editing **$200**. They are draft flat additions to the custom estimate, not per-video multipliers.
- Format currency with cents when needed, especially deposit/balance amounts. Final production prices, extras, tax/travel, availability, and payment policy must reconcile with the real site's business model/backend.

## 3. Legacy product IDs

Preserve old deep links through canonical resolution or the site's normal redirect mechanism. Current prototype `?p=<id>#detail` resolves aliases before choosing the package.

| Old IDs | Canonical ID |
| --- | --- |
| `reel-services`, `reel-objection`, `reel-proof`, `reel-day-in-life`, `reel-pov`, `reel-momentum`, `spotlight-objection-crusher`, `spotlight-bts` | `social-content` |
| `spotlight-brand-presence` | `commercials` |
| `spotlight-offer-clarity`, `system-client-handoff` | `product-demos` |
| `spotlight-proof-builder` | `customer-stories` |
| `system-onboarding` | `onboarding` |
| `system-sop`, `system-training`, `system-tool-tutorial` | `video-sops` |
| `system-sales-enablement` | `sales-training` |
| `evergreen-faq-deep-dive`, `evergreen-how-it-works`, `evergreen-myth-vs-reality`, `evergreen-case-study`, `evergreen-founder-pov` | `educational-videos` |

Employee Spotlights and Safety Training have no old direct equivalent. Use canonical IDs consistently in cart items, analytics, media lookup, editing, and any backend handoff.

## 4. Plan and checkout: real interactions versus simulations

**Preserve the useful interaction design:** adding different packages creates separate plan lines; re-adding the same package updates its quantity/price; Edit restores its scope; Remove supports the empty state. The featured card reflects saved scope and “In your plan.” Pricing can create multiple independent custom estimates, with category, quantities, extras, and price retained when editing.

Prototype package plan fields are `{id, lane, name, size, price, scope}`. Custom estimates add `type: 'estimate'`, a configuration object `{lane, sessions, videos, minutes, extras, editingId}`, and extra display names. `size` means finished videos or episode minutes depending on lane. The current plan exists **only in page memory** and resets on reload; generated `estimate-N` IDs are temporary UI identifiers.

**Do not copy these as live transactional behavior:**

- `#contact` validates required **name, email, filming city**, with optional timing and ongoing-content interest. Submit only calls `go('received')`; it sends nothing and saves no request. Connect the actual site's supported quote/contact workflow before presenting success as real.
- `#received` is simulated confirmation. No order, booking, email, or CRM record is created.
- `#payment` / `#paid` are explicitly separate design examples. Apple Pay and card choices are visual placeholders, the failure action is synthetic, and the success button processes no payment.
- The shown **10% deposit**, **90% balance**, and **$0 example tax/travel** are illustrative, unverified terms. They are not a payment integration or a live amount to charge.
- `?sample=1` and payment-route fallbacks seed a $1,350 Social Content plan for demonstrations. Do not seed real customer carts from these demo paths.
- Existing timeline claims, Pal-team names, and extras come from supplied design copy. Preserve only business details supported by the actual site/service workflow.

The intended sequence is quote-first: review requested work → submit project details → confirm scope, schedule, final price, and terms → use the real payment flow when applicable. Client-side arithmetic is a displayed estimate; existing server/payment logic remains authoritative for actual transactions.

## 5. Assets and media

All paths below are relative to the study root. Rebase them through the website's public-asset system so nested product routes and caption downloads resolve correctly.

| Asset | Active source |
| --- | --- |
| Font | `assets/fonts/Satoshi-Variable.woff2` (weights 300–900) |
| Brand mark | `assets/php-mark.webp` |
| Category graphics | `assets/outcome-icons-3d/{reel,spotlight,system,evergreen}.png` |
| Package graphics | `assets/package-icons-3d/<original-name>.png`, resolved explicitly by `packageIcon(p)` |
| Current videos/posters | Ten remote hosted MP4/poster URL pairs in `generated-previews.js` |
| English captions | `video-previews-v2/captions/<canonical-id>.vtt`, one file per package |
| Fallback portfolio stills | Seven files in `assets/work/`, mapped by `portfolio.js` |

Package icon basenames, in catalog order: **reel-services; spotlight-brand-presence; spotlight-offer-clarity; spotlight-proof-builder; evergreen-founder-pov; system-onboarding; spotlight-objection-crusher; system-sales-enablement; system-sop; evergreen-how-it-works**. The original PNG filenames intentionally do not match new IDs. Use the helper/map rather than constructing a new-ID filename. All are supplied transparent 512px artwork; decorative adjacent images use empty alt text.

Current media records contain `{title, duration, kind, hasAudio, transcript, exampleType, status, videoSrc, poster, captions}`. All ten active entries are approximately **30.05 seconds**, with sound, transcript, captions, and reviewed status. **Use the active manifest**, especially Video SOPs' revised **shared-whiteboard** example; earlier room-reset and silent clips are not the approved media sources.

- Preserve visible **AI concept / fictional example** disclosure. Customer Stories is a fictional demonstration, not an authentic review or customer endorsement.
- Cards display posters and a deliberate watch action; they do not load autoplaying video players.
- Native video dialog uses controls, inline playback, and captions; clicking Watch opens and starts the spoken clip. Closing pauses/removes it and restores trigger focus; Escape works. Include the transcript and load-error/direct-video fallback.
- The separate gallery pauses other videos when one starts. Hosted media requires network access. Captions are local same-origin assets.

## 6. Visual fidelity and responsive adaptation

The current source is mobile-first and caps the customer flow at **680px**. The existing ≥700px rules increase spacing and use four detail-fact columns; they are not a complete wide-desktop site layout. Build the wider website composition around the same content order and components instead of treating the review board's three-phone grid as the desktop design.

| Element | Current effective mobile treatment |
| --- | --- |
| Page | White light-mode canvas; 24px normal gutters, 18px at ≤350px; Satoshi, 16px body |
| Header | 76px tall; Products/Pricing navigation; Plan and 44px appearance control |
| Collection | Featured Social Content card; per-Pal shelves; 224px shelf cards (212px narrow), 12px gap; local horizontal scroll/snap |
| Single-package lanes | Full-width single card for Reel/Evergreen; no false carousel affordance |
| Cards | 15px radius, thin neutral border, tinted Pal body, 16:9 poster, short title, scope, price, watch button |
| Detail | Full-width 16:9 image; overlay back/plan/theme controls; title + 3D icon; large price and scope; uses, quantity controls, included work, facts |
| Detail sizing | 22px content gutters (18px narrow), 29px title (27px narrow), 38px price (36px narrow), 12px scope-panel radius |
| Quantity/action | Main and sticky-footer controls share one value; primary action ≥52px, ordinary controls generally ≥44px |
| Footer | Sticky bottom action; safe-area padding using `env(safe-area-inset-bottom)`; no content hidden behind it |
| Pricing | Strong $450 / +$150 / $1,050 rate hierarchy, then editable estimate, optional extras, explanatory questions |
| Motion/access | Reduced-motion support, visible focus, labelled controls, keyboard-scrollable multi-card shelves, native dialogs, status announcements |

### Themes and tokens

Default preference is **System**, with Light and Dark options. `appearance.js` applies `html[data-theme='light'|'dark']` and `data-appearance` synchronously before styles; persists `palmer-house-appearance` in localStorage; follows OS changes; syncs other same-origin tabs/frames. Public API is `PalmerAppearance.get()/set(mode)/open()/close()` and event `palmer:appearance` with `{mode, theme}`. Adapt to the site's existing theme provider if present rather than creating competing providers.

Core semantic tokens: `--canvas`, `--surface`, `--surface-raised`, `--ink`, `--muted`, `--line`, `--accent`, `--action`, `--action-text`, `--control-bg`, `--control-border`, `--selected-bg`, `--selected-text`, `--focus`, `--error`; plus per-lane `--lane`, `--lane-ink`, `--lane-soft`, `--lane-action`, `--lane-action-text`.

| Token | Light | Dark |
| --- | --- | --- |
| Canvas / surface / raised | `#ffffff` / `#ffffff` / `#f5f6f8` | `#0f1113` / `#14171a` / `#1a1d21` |
| Ink / muted | `#1f2328` / `#59616c` | `#f5f6f7` / `#adb5c0` |
| Line / control border | `#e0e3e8` / `#858e9a` | `#353a42` / `#737e8d` |
| Default action / label | `#3d1a66` / `#ffffff` | `#c5a1ee` / `#20132f` |

Light lane accents are orange **#e8720c**, plum **#3d1a66**, teal **#0a9b8f**, green **#5b8a2d**. Dark equivalents are **#ff9b49**, **#c5a1ee**, **#54d2c3**, **#adce78**. Copy the full lane text/tint/action pairs from `appearance.css`; hue alone is not enough for contrast. Light page backgrounds stay white, not beige. In dark mode the brand mark is inverted and input/control borders remain visible.
