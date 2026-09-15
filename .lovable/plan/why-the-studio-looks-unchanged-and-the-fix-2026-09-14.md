# Why the Studio looks unchanged — and the fix

## What I checked

The address you're on, `/studio`, still opens the old **Content Engine** screen. The new Pal welcome screen was built, but it lives on a different address (`/studio/dashboard`, the "Home" item in the sidebar). So nothing you're looking at on the main screen is the redesign.

Confirmed in the code: `/studio` renders the engine view, `/studio/dashboard` renders the home view with the new "Continue with your Pal" invite.

## The fix

1. **Make `/studio` open Home.** The Pal welcome — artwork, "Good to see you, [name]", continue-or-start-a-conversation — becomes the first thing you see. The Content Engine moves to its own address so nothing is lost, and the sidebar "Create" keeps pointing at it.
2. **Put the Pal first on that screen.** Right now the welcome invite sits below the old dashboard stack (attention list, campaign ledger, strategist cards). It moves to the top, large and clearly your Pal, with the recent-work strip beneath it. Progress levels and workflow readouts drop to the lower part of the page.
3. **First-time view.** If there's no conversation yet, your Pal introduces itself and offers three starting prompts instead of an empty ledger.

## After that (the rest of the approved redesign)

Phase 2 — one chat instead of two: the Create screen's chat and "Ask a Pal" merge into the same saved thread, so anything you start in one place is there in the other. Your chosen Pal stays your guide everywhere, and each of the eight gets a distinct voice.

## Technical notes

- Swap `src/routes/studio.index.tsx` to `view="home"`; add a route for the engine view and repoint the Create nav item and any links that assume `/studio` is the engine.
- Reorder `Dashboard()` in `StudioApp.tsx` so `ConversationInvite` renders first; move the tier/progression block below the fold. No data or backend changes.
