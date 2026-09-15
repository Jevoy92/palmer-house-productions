# Integration verification — 15 September 2026

## Result

The implementation was checked against the active approved Option B reference, including collection, detail, pricing, themes, and plan behavior. No material visual mismatch remains in those surfaces. Desktop is an intentional responsive adaptation of the same mobile content and components.

Base repository: `Jevoy92/palmer-house-productions`, main `0f13f794ffd998b98ca5b09a7c523323261d31e5`. Development branch: `codex/approved-package-experience`.

## Visual evidence and fidelity ledger

Screenshots came directly from the Codex in-app browser. Both the accepted reference and the final rendered screenshots were inspected with `view_image`; no screenshot was reconstructed or edited. Matched mobile viewport: **390 × 844**; additional layout checks: **320 × 780**, **768 × 1024**, **1440 × 1000**, and the app's wider native viewport. Browser scrollbar chrome reduces the captured content width slightly. Temporary viewport overrides were reset afterward.

| Comparison point | Accepted evidence | Render evidence and result |
| --- | --- | --- |
| White canvas and Pal color | `captures/approved-mobile.png` | `captures/products-mobile.png`: white canvas, soft orange/plum/teal/green card bodies. Fixed missing card-body tints. |
| Collection hierarchy and copy | Same reference | Same final capture: “Good work. Ready to be seen.”, supporting line, featured Social Content, then four category shelves. Same supplied poster and 3D icon. |
| Typography and action weight | Collection/detail references | Fixed a high-specificity font reset that thinned buttons. Satoshi, strong headings, price hierarchy, compact supporting copy and bold actions now match. |
| Product media and detail | `captures/approved-detail-mobile.png` | `captures/detail-mobile.png`: full-width 16:9 media, overlay controls, title/icon, $1,650, uses, scope and sticky action. Removed a media minimum height that clipped the Watch action at 320px. |
| Pricing hierarchy | `captures/approved-pricing-mobile.png` | `captures/pricing-mobile.png`: $450 / +$150 / $1,050 rate order and large type, followed by editable estimate. |
| Supplied artwork | Collection/detail references | Original transparent 3D package and category PNGs, not substituted line icons. Posters frame the active revised examples, including the Video SOP whiteboard video. |
| Preview overlays | Collection reference | Restored collection Watch to bottom-left and AI concept label to top-right; detail preserves its opposite lower overlay arrangement. |
| Desktop adaptation | Approved mobile information order | `captures/products-desktop.png`, `detail-desktop.png`, `pricing-desktop.png`: wide split hero, product detail columns, sticky estimate, shared responsive components. |
| Responsive controls | Approved mobile docks | 320px media/labels and sticky actions fit; fixed the narrow Evergreen selector label. Tablet cards fill their colored bodies and align actions. No document-level horizontal overflow at checked widths. |

### Above-the-fold copy check

Collection headline, subline, featured-package name, description, default $1,350 and six-video scope match. Detail names/descriptions/default scopes match all ten approved catalog records. Pricing headline and the $450 / +$150 / $1,050 hierarchy match. Added a mobile “Find your Pal” link so the existing guide remains discoverable; desktop includes the existing Our Work navigation.

Intentional production adaptations:

- Detail/checkout explicitly label “filming sessions” and “finished videos”; compact collection cards use “sessions” and “videos.” Saved quantity, cadence, extras, and offers are explained when they affect the displayed amount.
- The estimator chooses a named package and scope, instead of creating arbitrary custom estimate IDs. Its action reads “Review this estimate.”
- Optional extras retain the actual repository's prices instead of importing unconfirmed draft extras rates. The confirmed base pricing is the approved model.
- Existing supported included-work details and payment terms replace prototype-only promises. Production is quote-first; no illustrative deposit percentage or fake payment success is used.
- Wider layouts and responsive footers adapt the approved mobile structure; the prototype's review-board phone frames are not customer UI.

## Browser checks

Verified by in-app browser actions on the integrated site:

- Package count and lane browsing; ten visible cards in the tablet all-packages grid, all images loaded.
- Social Content changed from 6 to 7 videos and 1 to 2 sessions: **$1,950**, retained through the plan and pricing view.
- Caption Pack +$75 persisted to plan: **$2,025**; card/detail/pricing amounts now use the same receipt calculation.
- Plan survives reload; scope and quantity editing keep the saved configuration.
- Guide goal/scope selection navigates to the intended canonical package with its chosen count.
- Evergreen 10-minute selection: **$1,650**, including at 320px.
- Legacy `/packages/reel-services` redirects to `/packages/social-content`.
- Project form initially has no premature errors; blank submission focuses the required name field and shows name/email/city errors. The real local email path is clearly labeled unsent. No messages or payments were submitted.
- Dark selection persists between routes/tabs; System selection matches the device's light preference. Light remains white.
- Video SOP preview loads **30.05 seconds**, plays unmuted with the English text track showing, and advances. Closing removes the video and returns focus to its trigger.
- Desktop collection, product detail, pricing, and checkout summary; mobile collection/detail/price/guide/plan/details; narrow-phone and tablet overflow checks.

## Automated checks

- Production build passes using the locked dependencies.
- Full TypeScript check passes.
- ESLint passes for every changed/new TypeScript and test file; generated route tree is excluded.
- **58 non-browser tests pass**, including new package pricing, estimate consistency, quote-request and receipt tests plus existing voice/import tests.
- **11 existing Studio lifecycle browser tests pass** using local-only fixtures and the installed Chrome binary. The repository does not declare Playwright; its pre-existing harness was run with the bundled runtime via `NODE_PATH` and `STUDIO_TEST_BROWSER`, without changing dependencies.
- Package pricing tests exhaustively check **723 supported scopes** against receipt/server arithmetic. Additional tests cover alias migration, cadence, extra compatibility, malformed data, duplicate/unknown items, quote-only production guards, digital-only checkout, network failures, receipt verification and idempotent purchase reconciliation.
- Temporary direct-source audit: all ten catalog records match the approved source; all 22 legacy aliases resolve; icon/caption paths exist; all 76 nav-data paths match routes; canonical package URLs appear in the sitemap.

No live Stripe charge, CRM submission, email send, main-branch merge, or production deployment was performed. Current local production quote handoff uses an email draft because the contact endpoint/HoneyBook settings are absent. The fallback is complete and usable; direct receipt and digital payment adapters were validated with mocked provider responses.
