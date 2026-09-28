# Accepted chat design inventory

Source references: user-supplied `ab81c4ed-f591-4c18-a74c-766f0e5047ee.png`, `8d946ab8-2cff-4fad-8ad5-5644f5a29a4b.png`, `chat-desktop-editor-1440x1000.png`, and `review-assistant-populated-390x844.png` in Downloads. Reviewed before implementation. The light reference is the active palette; dark styling follows the same geometry when the existing app requests dark mode.

## Composition and tokens

- Near-white lavender canvas, white draft cards, pale lavender assistant bubbles and saturated purple actions. Ink is a deep purple-black. Hairline lavender borders; restrained shadows; 16–22px card corners and pill-shaped composer.
- Retain the app font. Header 22px/700; campaign 20px/700; message 14–15px with 1.6 line height; UI 12–13px. No decorative banner above the conversation.
- Persistent Pal portrait/name header, small history and information controls. Desktop history is an optional panel; the editor occupies a real right column. Mobile editor becomes a full-height accessible sheet.
- User messages align right in lavender; each assistant response retains its original author. Campaign cards sit inside the conversation with horizontally scrolling platform tabs and readable native draft previews. Edit/Open/Saved actions sit below the artifact.
- Composer stays visible below scrolling messages, with attachments, creation actions, and purple send button. Shell owns bottom navigation and global chrome.

## Assets and content

- Reuse existing eight Pal avatars/headshots. Generated custom avatars must come from actual generation or upload, with a supplied Pal portrait as an explicitly selected starting appearance.
- Show actual campaign assets/media only. Never substitute the bakery reference media for a real workspace's content. No stock hero or generic illustration in an artifact card.
- Visible labels: Chat, Change Pal, New conversation, Create a Pal, Preview, Edit, Save changes, Saved to Library, Copy text, Open campaign. Generated output cards are bound to persisted asset IDs.

## Interaction contract

- Keep existing URL-owned conversation lifecycle, draft/file recovery, stale-read protection, load-older scroll anchoring, archive behavior, and microphone cancellation.
- Switching Pals changes subsequent replies and greetings; previously persisted messages retain origin name and portrait.
- Inline campaign tabs select real assets. Editor saves via `updateAsset` so all views receive the same persisted content; failed saves preserve edits. Mobile sheet traps focus and restores its opener.
- Activity movement is shown only while a real request is pending; reduced-motion preference disables movement. Proactive greeting uses real workspace context without pretending research ran.
- Custom Pal flow captures name, personality, base Pal, and uploaded/generated avatar. Provider owns persistence and generation. Image/PDF actions save real artifacts to Library, with failures surfaced rather than simulated output.
- Social preview chrome is illustrative and labelled; no simulated external like/comment/publish operation.

## Verification

Run existing conversation lifecycle tests, TypeScript/build and scoped lint. Inspect desktop and mobile actual fixture screenshots against the four accepted references. Verify opening/editing/copying a persisted asset, Pal switching, pending/error recovery, and narrow-screen overflow.

### Verified implementation — 2026-09-27

The in-app browser was unavailable; used the existing isolated Playwright/Chrome fixture harness. Inspected the supplied designs and actual screenshots with `view_image` at 1440×1000 and 390×844, including light/dark chat and the desktop editor/mobile sheet. The desktop editor uses a 390px inspector and a 620px draft column, matching the supplied composition. Opening an editor brings the corresponding campaign card into view; long restored answers open at the beginning of the answer.

Passed in both viewports: platform tabs; saving an edit updates the underlying asset and inline card; standard Pal switching retains original message authorship; a named custom Pal saves and becomes selected; image and PDF results appear as linked Library artifacts in chat; PDFs render as documents and expose export; theme preference changes. A simulated generation error keeps the title and request intact. No browser JavaScript errors or horizontal overflow; document bounds equal each viewport. Scoped chat ESLint and project TypeScript checks pass.

These interaction checks use the actual components and an offline fixture provider. They do not certify deployed database migrations, live image generation, live storage signing, or production account persistence. Generation and custom-Pal features require the accompanying backend migration/configuration. Standard Pal switching continues to work without touching custom-Pal settings when no custom Pal is active.

The maintained `dev/studio-preview/verify.mjs` now covers the current mobile Library editor and custom Pal drawer. It retains navigation focus, failed-save draft recovery, pending chat, workspace retry, support request keyboard controls and support errors. Added checks cover originating Pal authorship, failed artifact generation, desktop/mobile dark action contrast (at least 4.5:1) and viewport bounds. Each case uses a fresh isolated browser context. Screenshots and reports default to `/private/tmp/studio-chat-review`; failed cases, page errors or unexpected external requests make the command fail.

The checks exposed missing return focus on controlled dialogs. Navigation, Pal picker/custom creation, chat tools, and the mobile editor now restore their originating control after closing. Accent action text follows the light/dark foreground token, including platform tabs, the composer and editor actions. Chat scrolling respects the saved Reduce motion setting. Refinement copy accurately explains that proposed changes are reviewed in chat.

Final maintained verifier run: **14/14 pass**, zero browser page errors, zero external requests. Full project TypeScript and scoped chat/verifier ESLint pass. Report: `/private/tmp/studio-chat-review/interaction-report.json`; corrected dark editor captures: `interaction-dark-editor-1440x1000.png` and `interaction-dark-editor-390x844.png` in the same directory.

### Interaction polish — 2026-09-27

The approved geometry stays intact. Motion explains a user action: the selected filter follows keyboard/click selection; Library cards retain their position while filtering or changing view; successful heart/save actions give one brief confirmation; comments reveal their input; draft tabs crossfade; the desktop editor and attachment tools open gently. These use the installed Motion/react library, the shared 160ms fade and restrained spring, with no new animation dependency. Saved Reduce motion and operating-system preferences disable the transitions.

Filter rows have a single tab stop with arrow/Home/End navigation and keep the selected pill visible without scrolling the page. Campaign/editor tabs expose linked panels and keyboard selection. Comments focus the input on open and return to their trigger on Escape; hidden comment controls are inert. Removing the last Saved item restores focus to the filter. Search reset, result counts, inline comment errors and pending-input protection make state changes clear.

Pal changes affect accents only. Chat/Library shadows and overlays use neutral black alpha, disabled actions use neutral muted colors, and feed companion panels inherit the neutral surface. Chat activity now depends on an actual local message/campaign/file request, so saving settings or shared memory never displays invented AI thinking.

The verifier additionally exercises these interactions, saved Reduce motion persistence, shared-memory create/edit/export/forget, and all four Pal accent families in light and dark themes. Palette checks compare actual computed canvas/sidebar/card colors and require primary action contrast of at least 4.5:1.

Final expanded suite: **22/22 pass**, zero browser page errors and zero external requests. A focused Feed rerun also passes after adding focus restoration to the empty-filter reset. The earlier 14-case report above is superseded by `/private/tmp/studio-chat-review/interaction-report.json`. Latest captures in that directory include `interaction-polish-library-list-390x844.png`, `interaction-polish-feed-filter-390x844.png`, and light/dark desktop palette captures. Library list, native covers, and dark editor were visually inspected after the final media updates.
