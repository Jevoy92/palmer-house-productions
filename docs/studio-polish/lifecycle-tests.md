# Studio lifecycle verification

The focused suite in `scripts/studio-conversation-lifecycle.test.mjs` runs the real React provider, conversation UI, microphone intake, router, and Ideas page in a separate local Vite entry. It stubs authentication, storage, database access, microphone capture, and AI calls. Browser requests to other origins are blocked. It does not sign into an account, upload a real source, generate a real campaign, send a real conversation, or modify the production database.

Eleven checks cover:

- Workspace read errors and retry.
- Failed model/storage requests, optimistic rollback, and atomic exchange saving on retry.
- Out-of-order thread reads, archiving, and replies finishing after switching threads.
- Recorder cleanup on leaving, including a microphone permission request that resolves late.
- First-send URL identity and draft/file recovery across route remounts.
- New starting prompts and archive navigation.
- Standalone idea capture, direction retry without duplicate saving, and creation handoff.
- Link/image source metadata and changing an idea's category.
- Platform-post content, metadata, and campaign-cache consistency after successful saves, with failed saves leaving all representations intact.
- Persistent plain-text overrides that preserve structured script metadata across reloads, and are cleared by a deliberate structured edit.

The test uses the installed Vite/React/TypeScript dependencies. Playwright and a browser are development tools only; no additional runtime dependency or lockfile change is needed. If Playwright and its Chromium browser are available in the normal Node environment, run:

```sh
node --test scripts/studio-conversation-lifecycle.test.mjs
```

On the Codex desktop runtime used for this audit, run from the `palmer-house-studio` checkout:

```sh
STUDIO_TEST_BROWSER='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' \
NODE_PATH='/Users/yourboyjevoy/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules' \
'/Users/yourboyjevoy/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node' \
--test scripts/studio-conversation-lifecycle.test.mjs
```

`STUDIO_TEST_BROWSER` optionally selects an installed Chromium-based browser. Otherwise Playwright uses its own installed Chromium. The local loopback server and browser require permission to run in an environment that blocks listening sockets. Test cache files are created in a temporary directory and removed afterward. File watching is disabled so concurrent workspace edits do not interrupt tests.

Result on September 14, 2026: **11 passed, 0 failed**. These checks verify state behavior with controlled data. Real backend integration and authenticated screenshots are separate validation steps; this suite does not claim to exercise them.
