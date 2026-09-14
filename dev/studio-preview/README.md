# Isolated Studio visual preview

This serves the actual Studio components with synthetic local fixtures on a separate development server. It never mounts the real StudioProvider. A dedicated Vite config aliases every auth/database/server import to offline mocks; its CSP also blocks external connections. Nothing is wired into the normal app, production build, auth flow, or database.

Run from the repository root:

```sh
./node_modules/.bin/vite --config dev/studio-preview/vite.config.ts
```

Open `http://127.0.0.1:4175/?view=home&state=populated`. Expand **Local fixtures** in the top-left corner to switch pages, fixtures, and mock request outcomes. Pending requests stay pending until **Resolve pending** is selected. Error requests exercise the component's real error handler. Reset restores the initial deterministic data.

Fixture states: `populated`, `empty`, `loading`, `error`, `onboarding`, `signed-out`, `conversation-loading`.

Views: `home`, `conversations`, `assistant` (populated chat), `engine`, `ideas`, `campaigns`, `campaign`, `library`, `approvals`, `calendar`, `roadmap`, `brand`, `settings`, `billing`, `work`, `success`. Dedicated navigation routes are preserved; no four-page collapse or redirect policy is imposed.

For repeatable screenshots use e.g. `?view=campaign&state=populated&controls=0`. This hides the controls while retaining a small Synthetic preview label. `route` can override the initial memory-router URL. All app links navigate the memory router without changing the fixture query string.

For before/after comparisons, point the same harness at an existing baseline checkout:

```sh
STUDIO_PREVIEW_SOURCE=/absolute/path/to/baseline ./node_modules/.bin/vite --config dev/studio-preview/vite.config.ts --port 4176
```

The development transform exposes a historical private StudioContext at compile time only, leaving its source untouched. Do not start the historical application's real provider. Newer UI states absent from the baseline will naturally be absent there. This harness rejects `vite build` and binds to loopback only.

All names, content, IDs, sessions, and requests are synthetic. The fixtures contain no customer information or usable credentials. Upload controls do not read or transmit file contents. OAuth and billing actions explicitly fail with a preview-only message. Fixture behavior is for visual/interactivity checks, not evidence of real backend operation.

## Repeatable visual checks

With the isolated server running, use `node dev/studio-preview/capture.mjs` for matched Home screenshots at 1440×900 and 390×844. `PREVIEW_CASES` accepts comma-separated `view:state` pairs; `PREVIEW_LABEL` names the capture set. Use `PREVIEW_ORIGIN=http://127.0.0.1:4176` for a baseline server.

`node dev/studio-preview/verify.mjs` exercises the actual mobile navigation, Setup, Library editor, chat recovery/pending states, workspace retry, and support form against local mocks. It writes screenshots and a JSON result report. `CASE_PREFIX=support` limits a rerun to the support cases.

Both scripts launch a separate headless browser, never the user's browser profile. They require Playwright; set `PLAYWRIGHT_MODULE` to an installed Playwright module path if it is not on the repository's module path. `CHROME_PATH` can override the default macOS Chrome executable. `PREVIEW_OUT` overrides the output folder. These scripts are for this synthetic preview, not a production endpoint.

`PREVIEW_VIEWPORTS=1440x900,390x844,1024x768` adds intermediate-width screenshots. `PREVIEW_REDUCED_MOTION=1` enables Chrome's reduced-motion preference for the capture run.

`node dev/studio-preview/record.mjs` records real mobile browser interactions against the baseline and current fixture servers: navigation, setup, and typing/submitting a synthetic chat. It uses native Playwright video capture, requires its FFmpeg runtime (`playwright install ffmpeg`), and writes WebM clips plus `recording-report.json`. No motion is reconstructed from screenshots.
