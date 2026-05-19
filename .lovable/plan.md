# Palmer House Hybrid Recovery Plan

Source of truth:
1. **Base layer** — orphaned commit `55e64cb` (Nov 14, 2025) for real TSX source of ~90% of the site.
2. **Patch layer** — live deployment bundle (already archived in `/tmp/live_bundle/`) for everything added/changed after Nov 14.

SWFS (`src/pages/SuddenWealthFilmSystem.tsx` + `src/components/swfs/*`) is preserved untouched and moves from `/` to `/sudden-wealth-film-system`.

**Nothing publishes until the user signs off on a side-by-side preview.** The live cache is currently the only intact copy of production — a premature deploy overwrites it.

---

## Phase 0 — Protect what's live (do this first, before any code lands)

Before pulling anything in, lock down deploys so we can't accidentally overwrite production while rebuilding:

1. Tag the orphan: create branch `website-restore` from `55e64cb` on GitHub and push it (user action — I can't run git).
2. User pauses auto-deploy from `main` in Lovable until cutover.
3. I confirm `/tmp/live_bundle/` is still intact (routes.txt, 142 chunks, route_map.json, rendered HTML for all 86 routes).

Deliverable: a recovery branch exists on GitHub, deploys paused, archive verified.

## Phase 1 — Import the Nov 14 base into this project

I read every file from commit `55e64cb` via the GitHub API (raw.githubusercontent.com per file using the commit SHA) and write them into this project's `src/`, **except** anything that would clobber SWFS:

- Keep as-is: `src/pages/SuddenWealthFilmSystem.tsx`, `src/components/swfs/*`, `src/integrations/supabase/*`, `supabase/config.toml`.
- Overwrite: `src/App.tsx`, `src/main.tsx`, `src/index.css`, `tailwind.config.ts`, `index.html`, all other `src/pages/*`, `src/components/*`, `src/hooks/*`, `src/lib/*`, `public/*`.
- Merge: `package.json` dependencies (union — never downgrade what SWFS needs).

Then in `App.tsx`:
- Mount the Nov 14 router at `/` (Home, Pals, Contact, etc.).
- Add one route: `/sudden-wealth-film-system` → existing `SuddenWealthFilmSystem` component.

Verification: preview loads `/`, `/pals`, `/contact`, `/blog`, `/sudden-wealth-film-system` without runtime errors. SWFS pixel-identical to today.

## Phase 2 — Diff against live bundle, identify post-Nov-14 deltas

Cross-reference the imported Nov 14 routes against `/tmp/live_bundle/routes.txt` (86 routes from production). Categorize each route:

- **Match** — exists in Nov 14 source, no work needed.
- **New** — exists only in live bundle (Webinar funnel, Video System Assessment, anything else added after Nov 14).
- **Changed** — exists in both, but live chunk has different content (HoneyBook PID update, copy revisions, etc.).

For each "changed" route, I diff the Nov 14 rendered output against the archived live HTML to flag actual content drift vs. cosmetic differences.

Deliverable: `/tmp/live_bundle/delta.json` listing exactly which routes need patching.

## Phase 3 — Patch post-Nov-14 features from the live bundle

For each route in the delta, I reconstruct the component by reading:
- The minified chunk (`/tmp/live_bundle/assets/<Route>-<hash>.js`) for structure, props, state, handlers.
- The archived rendered HTML for copy, headings, alt text, JSON-LD.
- Existing design tokens + memory rules (no gradients, no pills, Pal-color variants, team voice).

Priority order (smallest blast radius first):

1. `index.html` head: title, meta, canonical, og-image, HoneyBook PID script, fonts (read straight from live `index.html`).
2. **Webinar funnel** (`/webinar*`) — per memory `[Webinar Funnel]`.
3. **Video System Assessment** (`/video-system*`) — per memory `[Video System Quiz]`.
4. Any copy/contact updates surfaced in Phase 2 diff.
5. HoneyBook integration parity (PID, intercepts).

Each patched route is reviewed in preview before moving to the next.

## Phase 4 — Verify & cut over

1. Run through Phase 1 verification list again on every route.
2. Run SEO + security scanners.
3. User reviews preview side-by-side with production.
4. Only then: unpause deploys, publish, monitor.

---

## Technical notes

- Reading from commit `55e64cb`: I fetch a tree listing via `https://api.github.com/repos/<owner>/<repo>/git/trees/55e64cb?recursive=1`, then pull each blob via `https://raw.githubusercontent.com/<owner>/<repo>/55e64cb/<path>`. To do this I need the GitHub repo path — see question below.
- The orphan is reachable for ~90 days from the reflog event, but creating `website-restore` makes it permanent. Do that first.
- `src/integrations/supabase/types.ts` and `client.ts` are auto-managed — I will not overwrite them; the Nov 14 versions are dropped.
- `package.json` merge strategy: take Nov 14 deps, then add any deps SWFS uses that aren't already there. No version downgrades.
- No design system rewrites in this pass — the Nov 14 tokens are authoritative; SWFS already uses semantic tokens so it survives the theme swap.

## What I need from you to start Phase 0

1. The **GitHub repo path** for this project (e.g. `your-org/palmer-house`) so I can pull files from commit `55e64cb`.
2. Confirm you've **created `website-restore` branch from `55e64cb`** and **paused auto-deploy** from `main`.

Once those two are done, say **"go Phase 1"** and I'll import the Nov 14 source.
