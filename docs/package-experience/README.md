# Approved package experience

The selected Option B design is integrated into the current Palmer House site. The implementation replaces the old shop and production-pricing builders with one responsive collection → detail → estimate → plan flow.

## What changed

- Ten clear production packages, using the approved names, descriptions, 3D artwork, and current 30-second fictional AI example videos with English captions and transcripts.
- Mobile preserves the approved visual cards, per-Pal shelves, detail hierarchy, large price figures, and bottom actions. Desktop uses a split collection hero, responsive card grids, side-by-side detail, and an estimate/plan sidebar.
- Light, Dark, and System preferences persist across commerce routes and synchronize between tabs. Light canvases remain white. These scoped styles do not alter Studio or membership.
- The user confirmed **$450 per two-hour filming session + $150 per finished video**. Evergreen is **$1,050 for five minutes + $600 per additional five minutes**. Existing optional-extra prices remain unchanged.
- The homepage, four Pal pages, guide, offers, contact choices, FAQs, navigation, and sitemap point to the canonical ten-package catalog. The two unused old pricing builders were removed.
- Old package URLs resolve to canonical products. Saved carts migrate without silently discarding incompatible or over-limit scope; ambiguous items remain available for human scope review. Item quantities, extras, eligible discounts, and monthly cadence stay consistent across every amount display.

## Quote and payment behavior

Production packages request a confirmed quote before payment. A configured `VITE_CONTACT_FORM_ENDPOINT` receives the complete plan and project details. Otherwise the configured HoneyBook form is offered; with neither configured, the customer opens an explicitly unsent email draft addressed to Palmer House. No simulated confirmation or payment screen was carried over from the design prototype.

This checkout currently displays the email-draft path in the local environment. Direct CRM receipt was tested using mocks, not a real submission. To enable on-site receipt in the deployment, use the existing contact endpoint setting with a server that accepts the `PlanRequest` JSON payload. HTTP failure/timeout retains the plan and details and does not claim receipt. HoneyBook handoffs also do not claim a completed submission.

Pure digital-download carts retain the existing server-created Stripe checkout. Mixed/production/unresolved legacy carts never start a production charge. The success route displays verified paid amount/items, preserves new and unrelated cart additions, and does not clear the plan again on receipt revisits. The repository has no automated DIY download delivery service; the receipt offers the order reference and contact path without claiming files or emails were delivered.

## Entry points

- `/shop`: featured product and four category shelves.
- `/shop?lane=all`: ten-package grid; lane and text search remain supported.
- `/packages/video-sops`: example canonical detail route; all ten IDs use the same component.
- `/production-pricing`: rates, package scope, and optional extras. `/pricing` retains its redirect.
- `/find-your-pal`: two-step goal and scope guide.
- `/checkout`: plan and project details; `/checkout-success` verifies digital payment receipts.

## Verification

See [verification.md](verification.md) for the browser, arithmetic, migration, payment-adapter, visual comparison, and regression results. The small [capture set](captures) includes accepted mobile references and final mobile/desktop renders. [approved-reference.md](approved-reference.md) records the original design inventory; [integration-audit.md](integration-audit.md) records consumer compatibility decisions.

Run with the repository's existing scripts:

```sh
bun install --frozen-lockfile
bun run dev
bun run build
node node_modules/typescript/bin/tsc --noEmit
node --test scripts/package-pricing.test.mjs scripts/package-estimate.test.mjs scripts/checkout-request.test.mjs scripts/checkout-success.test.mjs
```

No dependencies or lockfile changes were needed. Video files stay on their existing hosted URLs; posters are used until the customer explicitly opens a preview. Caption and icon assets are local.
