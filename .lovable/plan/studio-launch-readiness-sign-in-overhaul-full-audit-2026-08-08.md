# Studio Launch Readiness: Sign-In Overhaul + Full Audit

## The problem with sign-in today

The Studio sign-in screen currently offers Google, email + password, and a magic link hidden inside a collapsed "Prefer a password-free sign in?" disclosure. Three things make it fragile for a non-technical user:

1. **Google failures are silent.** Any error shows the same generic line, "Google sign-in did not work. Please try again." There is no real reason surfaced, no retry guidance, and nothing logged.
2. **After Google succeeds, the page hard-navigates to `/studio` via a full browser reload.** If the session write and reload race, the user lands back on the sign-in screen looking like nothing happened — exactly the symptom reported.
3. **There is no password reset.** If someone made an account and forgot the password, there is no way back in. There is also no `/reset-password` page.

Additionally, the magic link is buried, and there is no visible confirmation of what happens after email sign-up.

## What we will build

### 1. Rebuilt sign-in experience

- Three clear options, all equally visible: **Continue with Google**, **Email me a sign-in link** (magic link promoted out of the hidden disclosure), and **Email + password**.
- Real error messages for Google, mapped to plain language ("Popup was blocked — allow popups and try again", "That account isn't connected yet", etc.), plus a fallback prompt to use the email link instead.
- Replace the blind reload with a session-confirmed navigation: wait for the auth session to be present, then route into the Studio. No more "clicked and nothing happened".
- Add a **Forgot password?** link and a new public `/reset-password` page that sets a new password.
- Clear post-signup and post-magic-link states ("Check your inbox — we sent a link to you@…"), including a resend option.
- Loading and disabled states on every button so a click always produces visible feedback.

### 2. Auth configuration verification

- Confirm the Google provider is enabled and using managed credentials.
- Confirm email sign-up settings (confirmation currently off) and that the email sender domain is healthy so magic links and resets actually land.
- Verify sign-in works on the published custom domain, not just preview.

### 3. Full Studio functional test pass

Drive the running app end-to-end and report pass/fail on each:

- Sign up fresh → onboarding (guide pick, industry, website, hobbies) → workspace created
- Brand DNA save, suggestions, reroll, brand guide preview
- Content Engine: generate campaign → all tabs populated (short form, long form 1000+ words, blog body, platform posts)
- Campaign delete, calendar scheduling, approvals
- Ask a Pal chat: formatting, save-as-idea, follow-ups
- Ideas capture and auto-lane assignment
- Notifications bell, checklist, celebrations
- Settings: profile, guide/Pal selection, sign out
- Billing/checkout link-out to Stripe
- Credits deduction and low-balance handling

### 4. Report

A written summary of what passed, what was fixed, and anything that still needs a decision or action from you.

## Technical notes

- Sign-in UI lives in `AuthExperience` inside `src/components/studio/StudioApp.tsx`; auth methods (`signIn`, `signUp`, `sendMagicLink`, `signOut`) live in `src/components/studio/StudioProvider.tsx`. Add `resetPassword` there.
- Google continues to go through `lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin })` — required for the managed broker. Replace `window.location.assign("/studio")` with a session check (`onAuthStateChange` / `getSession`) before navigating.
- New route `src/routes/reset-password.tsx`, public, added to the always-on path list in `src/lib/site-mode.ts` so the maintenance holding page does not swallow it.
- Testing driven headlessly against the local dev server with screenshots for the visual checks.

## What I may need from you

- Confirmation that email confirmation should stay **off** for launch (fastest sign-up, no inbox dependency). - Me confirming yes for now. 
- If Google sign-in should show "Palmer House" instead of Lovable on the consent screen, that requires your own Google Cloud OAuth credentials — I can flag it as a follow-up rather than block launch.