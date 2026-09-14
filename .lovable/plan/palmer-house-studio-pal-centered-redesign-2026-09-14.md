# Palmer House Studio — Pal-centered redesign

Turn the Studio from a twelve-destination dashboard into a workspace built around one ongoing conversation with your chosen Pal. Everything that exists today (campaign building, ideas, library, calendar, approvals, Brand DNA, billing) is kept and reconnected — nothing is rebuilt from scratch and nothing is thrown away.

## What I confirmed in the current code first

- The Studio UI is one 7,176-line file (`StudioApp.tsx`) holding all twelve views plus the shell.
- There really are two separate chats: the provider's `askPal` (saves to the `assistant_messages` table, used by Ask a Pal) and `suggestDirections` (memory-only, used inside Create/Content Engine).
- Saved messages have no conversation record — they are one flat list per workspace, loaded oldest-first and capped at 80, then trimmed to the last 14 on screen. So older history is genuinely unreachable today.
- Billing meters **campaign builds** against a plan allowance through Stripe. The credit tables in the database are leftovers from the older marketing site and are not referenced by any Studio code.

## Phase 1 — Conversations that actually persist

- Add a `conversations` record (id, workspace, title, chosen Pal, last activity, archived flag) and link every message and every piece of generated work to one.
- Move all existing messages into a single per-workspace conversation titled "Earlier conversations" so no history is lost.
- Load the newest messages first, with "Load earlier" paging so you can scroll back through everything.
- Remember the last open conversation and reopen it after refresh or sign-in.
- Rename, reopen, and archive conversations. Workspace isolation rules stay exactly as they are.
- Context sent to the Pal stays bounded: recent messages from this conversation plus the existing workspace knowledge digest (brand voice, campaigns, ideas, calendar, approved memory). No promise of infinite memory.

## Phase 2 — One chat, one Pal

- Merge the two chats into a single conversation engine. Create, Ask a Pal, and the home screen all open the same thread.
- Your saved Pal is the guide everywhere — home, chat, and creation. The lane of the content no longer reassigns your Pal; the lane just colors the work.
- Switching Pals keeps the conversation and correctly attributes who said what.
- The "no Pal" option is resolved properly so the screen never shows one name while sending another.
- Each of the eight Pals gets a distinct personality layer: their own greeting, phrasing rules, what they push you toward, and what they tend to ask about — all driven from the single Pal directory so there is one source of truth.

## Phase 3 — The new home screen

`/studio` becomes the welcome screen. Existing links keep working.

- Your Pal's artwork, large and clearly theirs.
- "Good to see you, [first name]."
- "Continue your conversation with [Pal]" plus the real title and first line of the last thread.
- "Start a new conversation" as the quieter second action.
- A short recent-work strip.
- First-time users get a brief introduction from their Pal and three starting prompts.
- One compact attention item only when something genuinely needs you (e.g. pieces awaiting approval). Progress levels, workflow maps, and operational readouts move to secondary views. Status copy states facts only.

## Phase 4 — Four places instead of twelve

- **Home**, **Conversations**, **My Work**, **My Brand**.
- My Work has three tabs: **Content** (ideas, campaigns, library), **Plans** (calendar, video roadmap), **Needs review** (approvals), with filters rather than more menu items.
- My Brand opens today's Brand DNA with plainer labels.
- Account settings, usage and billing, and member support move into the account menu.
- The scattered Create buttons collapse into one "New conversation". Existing editors stay reachable inside My Work.

## Phase 5 — The Pal does the work with you

Saying "I have a video idea", "help me explain my business", or "can we keep working on that script" leads somewhere real.

- The conversation reuses the existing text, link, and image intake, direction generation, campaign building, asset editing, and calendar scheduling.
- It only asks for what is missing; audience, offer, and voice come from saved Brand DNA.
- In-context choices: Develop this idea · Build this campaign · Save this idea · Edit this draft · Add to my calendar. Each one triggers the real backend action, not a mock.
- A work panel slides in beside the conversation when something is being drafted or edited, using the existing platform editors, previews, approvals, and exports.
- Nothing auto-generates a full campaign just because you asked a question.

## Phase 6 — Billing left honest

Campaign allowance metering and Stripe entitlements stay exactly as they are, just presented in plain language in the account area. Nothing is relabeled as credits and no prices are invented. I will report what a future shared-credit model would still need.

## Look and feel

Satoshi, white and warm neutral surfaces, flat color, the four lane colors (Spotlight #3D1A66, Reel #E8720C, Evergreen #5B8A2D, System #0A9B8F). Generous spacing, larger type on the small labels that carry meaning, visible focus states, restrained motion. The public marketing site is untouched.

## Verification before I report back

Sign in, resume the right conversation, page back through old history, switch Pals mid-thread, create real saved work from chat, reopen and edit and approve and schedule it, confirm Brand DNA still shapes output, confirm allowance behavior, and walk the same journey on a phone. Plus the project's existing type and build checks, and a visual pass on each screen.

## Technical notes

- New `conversations` table + `conversation_id` on `assistant_messages` (and on generated campaigns/ideas where they originate from chat), with grants and RLS scoped to workspace membership, matching existing policies. Backfill migration for current messages.
- `StudioProvider` gains conversation state: list, active id, paged message loading, create/rename/archive. `askPal` writes into the active conversation and returns the saved rows rather than optimistic-only ones.
- `suggestDirections` becomes an action the conversation engine can invoke, not a parallel chat.
- `StudioApp.tsx` is split: shell/nav, home, conversation, work panel, and My Work sections move into their own files under `src/components/studio/`. Behavior preserved; the file is too large to keep editing safely.
- Pal personality data (voice rules, opening line, probing questions) is added to `src/lib/pal-directory.ts` and consumed by the assistant prompt in `studio-server.ts`, replacing any lane-based coach assignment.
- Routes: `/studio` renders home; `studio.assistant`, `studio.ideas`, `studio.library`, etc. remain and redirect or map into the new sections.
