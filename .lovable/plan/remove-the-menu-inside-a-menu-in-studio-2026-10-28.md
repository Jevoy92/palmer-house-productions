# Remove the "menu inside a menu" in Studio

## What's causing it
Every Studio page except Chat shows three layers of navigation at once:
1. The left sidebar (Chat, Feed, Ideas, Campaigns, Library, Calendar, Brand DNA, Video roadmap, Settings).
2. An extra strip above each page ("← Chat · Brand DNA ↗ · Library ↗ · Studio tools ▾") that repeats the same links, plus a dropdown that repeats them again.
3. On Settings, a second vertical side menu inside a boxed card — and one item (Brand DNA) duplicates the sidebar.

On phones, the menu button drawer and bottom bar already cover every destination, so the extra strip adds nothing there either.

## Fixes
1. **Remove the extra strip on every Studio page** (desktop and phone). The sidebar, phone drawer and bottom bar stay as the only navigation.
2. **Flatten Settings:** drop the boxed card with its own side menu. Settings becomes a normal page: title, then a single row of simple tabs (Workspace, Shared memory, Team, Usage & plan, Account) that scrolls sideways on phones.
3. **Remove the duplicate Brand DNA tab** from Settings; Brand DNA lives only in the sidebar. Anything unique in that tab (if any) moves to the Brand DNA page or Workspace tab rather than being lost.
4. **Sweep other Studio pages** for the same pattern (a page-level side menu or dropdown repeating sidebar items) and apply the same treatment; report what was found.

## Checks
- Screenshot Settings, Library, Campaigns and Brand DNA on desktop and phone to confirm one navigation layer each.
- Build passes; no billing, newsletter, credits or booking logic touched. Not published.

## Technical details
- Delete `StudioPageTrail` usage in `StudioWorkspaceShell.tsx` (line ~352) and remove `StudioPageTrail.tsx` + `studio-page-trail.css`.
- Settings in `StudioApp.tsx` (~4646): remove `brands` tab, replace `aside` grid with horizontal `role="tablist"` buttons, remove outer bordered card wrapper.
