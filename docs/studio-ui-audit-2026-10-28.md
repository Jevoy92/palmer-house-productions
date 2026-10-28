# Studio UI audit — October 28, 2026

## Scope and baseline

Reviewed the reported live Account settings screen read-only, then used the isolated Studio fixture harness for changes and interaction testing. This follow-up builds on Lovable's navigation cleanup at `79611ccc07978154f3f7df2e6e5aacb94305a0fa`. No billing rules, newsletter eligibility, credits, booking behavior, database migration, or deployment changes are included.

## Findings and fixes

| Finding | Resolution |
| --- | --- |
| Custom alert switch thumb started in the center and escaped the track | Replaced with the existing Radix Switch primitive. Explicit start alignment, 44 × 24 track, 20 px thumb and travel; off-left/on-right with 2 px inset. |
| Rapid preference clicks could start overlapping saves | Serialize the UI request, announce saving, retain keyboard focus and the last confirmed value if saving fails. Server preference payloads are unchanged. |
| Flat Settings tabs had tab roles without arrow-key navigation or associated panels | Use Radix Tabs for roving focus, Home/End and arrows, labelled panels, and horizontal phone scrolling. |
| Legacy `/studio/work?tab=…` repeated global navigation and highlighted Campaigns for every section | Preserve existing URLs and render the selected section directly, with the correct sidebar/bottom-bar selection. |
| Desktop Chat opened another global-navigation drawer while the sidebar was visible | Keep the Chat navigation trigger on phone layouts only. |
| Workspace header displayed a nonfunctional collapse icon | Remove the decorative control-shaped icon. |
| Drawer focus restoration could scroll the new page past its mobile header | Restore focus without scrolling. |
| Notifications used a hand-positioned popup without focus management or collision handling | Use Radix Popover, Escape/return focus, viewport collision padding and a bounded scrolling content region. |
| Read notifications and several selection cards forced white backgrounds in dark mode | Follow Studio surface tokens for notifications, Pal cards, onboarding, creation choices and member milestones. Expose current guide selection with `aria-pressed`. |
| Some previews only honored OS reduced motion; portal roots escaped CSS preference rules | Route animated previews through `useStudioMotion`; include portal roots themselves in both local and OS reduced-motion rules. |
| Tiny newsletter checkboxes and inconsistent switch rounding | Standardize native Studio checkboxes to 20 px; exclude switches from decorative button-radius overrides; increase off-state track contrast. |
| Offline harness imported newer social/newsletter/expo server modules | Alias those modules to explicit offline mocks. External requests remain blocked by the harness CSP. |

## Navigation sweep

Settings, Library, Campaigns, Brand DNA, Chat, Feed, Ideas, Calendar, Video roadmap and the legacy My Work entry were examined. Lovable removed the global related-pages strip and Settings sidebar; this follow-up removed the remaining My Work repetition and desktop Chat navigation trigger. Brand DNA's Business/Audience/Voice/Visual system controls and content filters remain because they operate within the current task rather than repeat site destinations.

## Verification

Browser checks use synthetic data, not customer accounts:

- Desktop 1440 × 1000 and phone 390 × 844 layouts. Screenshots retained outside the repository for Settings, Library, Campaigns, Brand DNA, Chat, Feed, Ideas, Calendar and roadmap.
- Measured switch thumb bounds: off left/right insets 2/22 px, on 22/2 px. All four thumbs contained. Space activation works; pending saves preserve focus. Failed save leaves the prior value and re-enables the controls.
- Settings End key activates Account and keeps focus on its tab; phone tab row scrolls without page overflow.
- Notifications focus the first control; Escape closes and restores focus to the bell. Local Reduce motion produces computed `animation-name: none` and `transition-duration: 0s` on the popup itself.
- Light/dark appearance checked; notification panel and selection surfaces follow the neutral Studio theme.
- Main desktop and phone pages showed no horizontal document overflow or broken loaded fixture images.
- Mobile drawer navigation, Library editor Preview/Edit keyboard switching and Escape dismissal, and Calendar script preview were exercised. Editor and Calendar panels stayed inside the phone viewport.
- Legacy My Work library URL opens Library, highlights Library, and contains no duplicate work-route link bar.
- Build, TypeScript, lint and 199 existing unit tests pass. Lint retains 19 existing Fast Refresh warnings; no lint errors.

## Limits

This is a UI and interaction pass. AI generation, real payment transactions, email delivery and production preference writes were not exercised. OS reduced-motion rules were reviewed in source; the local Studio Reduce motion setting was exercised in the browser. Offline social publishing is intentionally disabled. Publishing the updated website remains a separate deployment step.
