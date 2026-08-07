# Remove Authentication, Open the Dashboard

Strip sign-in entirely so the dashboard, settings, and tool pages are directly viewable with no login. Dashboard data areas render in an empty/zero state since there is no signed-in user.

## What changes for you

- `/auth` no longer exists. Any link to it is removed.
- `/dashboard`, `/dashboard/pals/:palId`, `/settings`, and all `/tools/*` pages load immediately for anyone.
- Sign in / Sign out / account buttons disappear from the site nav, dashboard sidebar, and mobile top bar.
- Personalized panels (credits balance, activity chart, progress, member profile, recent items) show zeros, empty lists, or a neutral greeting instead of user data.

## Technical changes

**Deleted**
- `src/pages/Auth.tsx`
- `src/components/auth/ProtectedRoute.tsx`
- `src/contexts/AuthContext.tsx` (including `AuthProvider` and `useAuth`)

**`src/App.tsx`**
- Drop the `/auth` route, the `Auth` and `ProtectedRoute` imports, and the `AuthProvider` wrapper.
- Unwrap all protected routes so they render their page directly.
- Remove `/auth` from the layout/path lists that suppress nav and footer chrome; keep the dashboard/tools/settings entries.
- Also removes the duplicate `/dashboard/pals/:palId` route line while editing.

**Auth consumers** — remove the `useAuth` import and user-dependent fetches in:
`src/components/Hero.tsx`, `src/components/Navigation.tsx`, `src/pages/AppPricing.tsx`, `src/pages/Memberships.tsx`, `src/pages/Settings.tsx`, `src/pages/Dashboard.tsx`, `src/pages/dashboard/PalHub.tsx`, and the dashboard components `ActivityChart`, `ContinueCreating`, `CreditsBalance`, `DashboardHeader`, `DashboardStats`, `MemberProfile`, `MobileTopBar`, `PalAvatarSelector`, `SimplifiedSidebar`, `ToolProgressCards`.

Handling per component:
- Supabase queries filtered by `user.id` are removed; state initializes to its empty value (0 balance, `[]` lists, 0% progress) and loading resolves immediately.
- Greetings using `user.email` / `full_name` fall back to a generic "there".
- Save/update actions tied to a user (favorite Pal, profile edits, checklist toggles) become local UI state only, since there is no account to persist to.
- Sign-in / sign-out buttons and their handlers are deleted rather than disabled.

**Not touched**
- Backend tables, RLS policies, and the `handle_new_user` trigger stay as they are, so auth can be reintroduced later without a migration.
- Edge functions and Stripe checkout flows are unchanged.
