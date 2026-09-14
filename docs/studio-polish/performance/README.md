# Studio and public performance evidence

These are local measurements and source findings from September 14, 2026. They do not represent production field data or a score for every app route.

## Method

The motion audit used the live Motion+ `motion://skills/performance-audit` methodology, fetched through the MCP server. Source review classified animated properties by rendering cost, then the official MotionScore CLI measured the URLs listed below in an isolated headless Chrome profile. All runs used `--agent --no-upload`; nothing was uploaded to an account or cloud audit service.

The official React accessibility/MotionConfig docs and Motion+ dropdown source informed the implementation. A shared spring uses `visualDuration: 0.24`, `bounce: 0`; opacity uses 0.16 seconds, linear. Reduced motion uses zero duration and skips nonessential entrances/exits. The shared implementation lives in `src/lib/ui-motion.ts`; existing Studio imports remain compatible.

Lighthouse 13.4.1 ran separately and sequentially for desktop and mobile, with only the performance category. It used a running local compiled production worker at `http://127.0.0.1:5176/`, served through official Wrangler local dev. Browser profiles were isolated and results were not uploaded. These are lab measurements against a warm local server, with Lighthouse's simulated network/CPU throttling and normal storage reset. They are not deployed-site measurements.

- Desktop preset: 1350×940, device scale factor 1, simulated 40ms RTT/10,240kbps, CPU multiplier 1.
- Default mobile: 412×823, device scale factor 1.75, simulated 150ms RTT/1,638.4kbps, CPU multiplier 4.

An earlier default Vite preview on port 5176 rendered a server-module error. Its MotionScore result was discarded. Only the later verified compiled homepage is represented by the valid production files.

## Public findings and changes

- The mounted work gallery previously rendered 28 looping autoplay videos via two layers of duplication. It now shows seven user-playable videos in a horizontally scrollable, keyboard-focusable rail. Each film has an inspected poster extracted at six seconds from its existing local video. `preload="none"` defers media downloads until playback.
- Process portraits and their decorative lines are static. Membership's large scroll parallax and passive-card hover movement were removed.
- Hero/work/shop/recommendation entrances use the shared transform/opacity contract. The critical Hero content is now visible in server HTML, rather than waiting for hydration to reveal its opacity.
- Mobile navigation and shop feedback have explicit reduced-motion behavior. Navigation disclosures expose expanded state, close on Escape, and return focus. Public controls have a visible focus ring.
- The assessment's real step progress now updates `transform: scaleX(...)` instead of animating width. No automatic loop or animated width/height remains in the owned mounted public route/component sources.
- The mobile comparison is a labeled, focusable scroll region with a visible hint and sticky row headers.
- Hero lane portraits use lazy loading, asynchronous decoding, low fetch priority, and explicit dimensions. The Hero and Steps use visually inspected 192px WebP derivatives of the exact existing art: 26,746 bytes for all four, versus 1,370,102 bytes for the originals. Larger placements retain their originals. The 36px navigation mark uses a 108px lossless WebP derivative (3,778 bytes versus 58,480). No art was regenerated or cropped.
- The self-hosted font setup removes the remote Google Fonts stylesheet; the existing Satoshi font is preloaded.

Public runtime coverage is the homepage. The route source pass also covered membership, work, shop, Find Your Pal, video system assessment, and their shared public navigation/components. A homepage grade is not a claim that every route or interaction was exercised.

## Initial valid results

| Run                                                             | Result    | Scope                                               |
| --------------------------------------------------------------- | --------- | --------------------------------------------------- |
| Public MotionScore, development 5175                            | S, 95/100 | 20 detected animations; all S; desktop and mobile S |
| Public MotionScore, compiled production before visible-Hero fix | S, 95/100 | 20 detected animations; all S; desktop and mobile S |
| Lighthouse desktop, before visible-Hero fix                     | 97        | LCP 1.06s; CLS 0; TBT 0ms                           |
| Lighthouse mobile, before visible-Hero fix                      | 73        | LCP 4.89s; CLS 0; TBT 0ms                           |

The initial mobile LCP was an unmet performance result. That run identified unnecessary JavaScript, large headshots, and a render-blocking Google Fonts stylesheet. Source review also confirmed that Hero text started at opacity zero until hydration; the critical container was changed to `initial={false}`.

The first rebuild after the Hero and font fixes measured mobile performance 69, LCP 3.62s, CLS 0.0034, and TBT 596ms. Lighthouse reported that the host CPU appeared slower than expected; this overlapped other local browser checks. It is retained as `public-production-after-fonts-busy-host-lighthouse-mobile.json` and is not a clean comparison for the overall score. LCP remained above the 2.5s gate. A further bounded change deferred gallery video metadata and reduced priority for the small Hero portraits; its final rebuilt measurement is reported separately below.

## Follow-up measurements

After the visible-Hero, fonts, and deferred-video changes, the public homepage's MotionScore is **S, 97/100**: all eight detected animations are S (four WAAPI, four scroll), desktop and mobile are S, and the tool reports no findings. This run precedes only the small-image source substitutions, which do not alter motion behavior.

The first idle Lighthouse run after deferred video loading reported desktop 97 (LCP 1.14s, CLS 0, TBT 0) and mobile 70 (LCP 5.50s, CLS 0, TBT 0), with no CPU warnings. Its mobile LCP element is the visible Hero headline with opacity 1. The unthrottled trace observed FCP and LCP at 157ms; the simulated mobile figures are FCP 3.91s and LCP 5.50s. These are distinct measurements, not interchangeable. No video requests appear in that trace. The remaining four headshot PNGs total roughly 1.37MB; the image-optimization rebuild replaces those small placements with the inspected derivatives above. This intermediate evidence is retained in the `before-image-optimization` reports.

## Final rebuilt Lighthouse results

The final compiled homepage was verified to return HTTP 200 with the correct headline, eight small-portrait placements using the optimized assets, and seven videos with `preload="none"`. Wrangler was restarted after the build finished. No other builds, tests, or browser checks ran during the sequential measurements. Both reports have no runtime errors or CPU warnings.

| Final run                        | Performance | LCP   | CLS | TBT |
| -------------------------------- | ----------- | ----- | --- | --- |
| Desktop, 2026-09-14 19:17:49 UTC | 97          | 1.15s | 0   | 0ms |
| Mobile, 2026-09-14 19:16:41 UTC  | 70          | 5.65s | 0   | 0ms |

**The mobile LCP target of 2.5 seconds remains unmet.** The mobile report's total transferred bytes fell to 704,623, and it made no video requests. The asset savings are real, but they did not improve the simulated critical rendering path. The LCP element remains the visible Hero headline; its unthrottled observed LCP is 173ms, while Lighthouse's simulated mobile LCP is 5.65s and FCP is 3.91s. The remaining report estimates 450ms savings from blocking stylesheets (27KB shared CSS and 1.2KB route CSS) and identifies unused JavaScript. It does not establish a single cause for the full simulated delay. Local HTTP/1.1 and the emitted module requests are conditions to investigate, not a proven diagnosis or a substitute for a deployed measurement.

The final raw reports are `public-production-lighthouse-mobile.json` and `public-production-lighthouse-desktop.json`. Earlier valid runs remain separately named so the evidence is not selectively replaced by the best result.

## Studio measured results

| Fixture                              | Result    | Remaining findings                                                                                                                 |
| ------------------------------------ | --------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Content Engine, populated            | S, 96/100 | All 10 detected animations S/WAAPI. One low mount recalculation at main/html; CLI also recommends avoiding off-screen entrances.   |
| Assistant, before loaded-history fix | S, 88/100 | Eight S and two C mobile transform-style findings; two low mount recalculations.                                                   |
| Assistant, after loaded-history fix  | S, 91/100 | All four detected animations S/WAAPI; no C findings. Two low initialization recalculations remain at main/html/chat scroll region. |

The Assistant rerun followed an actual source change: the two loaded-history message wrappers became static. No claim is made that the app is free of every forced layout or that every state was exercised.

## Studio fixture conditions

The Assistant and Content Engine use the same current source as the app inside the separate local development fixture at port 4177. All workspace data, sessions, and actions there are synthetic; no backend/account behavior is certified by these runs. The fixture exposes real mounted UI states for source/layout/motion checks.

The compact Content Engine and Video Roadmap were visually checked through CUA at 390×844 and 1440×900. At 390×844, the Engine textarea began at 548.25px and the Find three angles action ended at 738.25px. The first Roadmap card appeared at roughly 402px. Lane filtering was exercised. A fresh History cache miss opened the saved campaign view with all seven stage tabs. This confirms fixture UI behavior, not live generation or persistence.

Raw MotionScore text and compact JSON summaries, plus full Lighthouse JSON reports, are stored in this directory. Numeric results are copied from the tools; no source-only score was invented.
