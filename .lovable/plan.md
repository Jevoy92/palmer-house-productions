## Reconstruct Palmer House Site From Live Bundle

History didn't have the pre-SWFS snapshot, so we rebuild from the live `palmerhouseproductions.com` deploy. That bundle is intact and downloadable — I verified the route table (147 routes incl. all blog posts, industries, locations, pals, dashboard, evergreen-pal, memberships, etc.) plus chunked JS/CSS and the HoneyBook integration.

This is a real rebuild, not a sync. Source `.tsx` was never committed; we have minified JS + the rendered DOM as the blueprint. Reconstructed files will match behavior and design, not be byte-identical to whatever the original source was.

### Ground rules during rebuild

1. **Do not publish** until the new build matches the live site. The live deploy is currently our only copy of the real product — overwriting it loses everything.
2. SWFS stays — it moves from `/` to `/sudden-wealth-film-system`.
3. Work proceeds route-by-route so each step is verifiable in preview before moving on.

### Phase 1 — Archive the live deployment (foundation)

- Download `index.html`, `sitemap.xml`, `robots.txt`, `og-image.jpg`, favicons.
- Download every `assets/*.js` and `assets/*.css` chunk referenced from index.html and from the lazy-loaded route map.
- Download all `assets/*` images, fonts, videos referenced inside the chunks.
- Save full route table (147 paths) and chunk→route mapping into `/tmp/live_bundle/manifest.json`.
- Save rendered HTML of every route by crawling the live site (gives us copy, headings, alt text, JSON-LD, meta tags exactly as deployed).

### Phase 2 — Restore app shell

- Replace `src/App.tsx` with React Router `<BrowserRouter>` + the 147-route table.
- Restore `src/main.tsx` with HelmetProvider, QueryClientProvider, Toaster, etc. (read from minified bundle).
- Restore `index.html` head: title, meta, canonical, og-image, HoneyBook PID script, fonts.
- Create stub pages for every route so routing compiles. SWFS demoted to `/sudden-wealth-film-system`.

### Phase 3 — Rebuild shared infrastructure

Order matters — these are used by every page:
1. `tailwind.config.ts` + `index.css` design tokens (Pal colors, button variants per memory).
2. `components/Navigation.tsx` (xl breakpoint per memory).
3. `components/Footer.tsx` (vertical hover strips per memory).
4. `components/WaitlistDialog.tsx` + `HoneyBookContact.tsx`.
5. Layout wrappers, Preloader, shared UI primitives.

Each component is reconstructed by reading its minified chunk + the rendered DOM from the archived HTML, then rewritten in clean TSX using existing design-system tokens.

### Phase 4 — Rebuild pages in priority order

Tier 1 (homepage + commercial core):
- `/` (Index — hero carousel, 8 platforms)
- `/pals`, `/memberships`, `/app-pricing`
- `/contact`, `/discovery-call`, `/auth`

Tier 2 (Pal lanes + character sub-routes):
- `/evergreen-pal`, `/evergreen-pal/:character`
- System / Spotlight / Reel Pal pages + characters

Tier 3 (industries + locations — SEO):
- 6 industry pages, 4 location pages

Tier 4 (content):
- `/blog` index + 15 blog post pages
- `/faq`, `/about`, `/about-us`, `/company/team`, `/company/values`, `/privacy`

Tier 5 (tools + dashboard):
- `/glimpse`, `/arsenal`, `/pathways`, `/compass`, `/content-strategy`, `/production-guide`
- `/dashboard/*` (auth-gated client area)

### Phase 5 — Verify & cut over

- Diff each rebuilt page against archived live HTML (visual + DOM).
- Run the SEO/security scanners.
- Only after the user reviews preview side-by-side with production, publish.

### Technical notes

- Bundle URL: `https://palmerhouseproductions.com/assets/index-BYzSLobo.js` (660KB) holds the route table + most page code; `router-BrxUvig6.js` has lazy chunk map.
- 147 unique route paths confirmed via regex against `index.js`.
- Existing `src/components/swfs/` and `src/pages/SuddenWealthFilmSystem.tsx` are preserved untouched; only mounted at a new path.
- Memory rules apply throughout: no gradients, no rounded-full pills, Pal-color button variants only, team voice, light theme.
- This will take many iterations — expect dozens of follow-up turns. I'll commit progress per tier so we can roll back per-page if anything regresses.

### What I need from you to start

Confirm: **"Go — start Phase 1"** and I'll begin archiving the live bundle + crawling all 147 routes into `/tmp/live_bundle/`. After Phase 1 I'll show you the manifest before touching `src/`.