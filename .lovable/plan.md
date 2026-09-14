# Simplify Studio: four destinations, one way to create

The Studio has grown twelve screens and three different places to start work. This collapses it into four places, moves creation into the conversation with your Pal, and gives campaigns real visual cards.

## 1. Four destinations

The sidebar becomes:

- **Home** — your Pal, continue/start a conversation, what's in motion, what needs you
- **Conversations** — the persistent chat, and where all creating happens
- **My Work** — one page with tabs: Campaigns · Library · Needs review · Calendar · Video roadmap
- **My Brand** — Brand DNA

Settings, Billing and Member success move into the account menu at the top right. Old addresses (`/studio/campaigns`, `/studio/library`, etc.) keep working and land on the right tab, so nothing breaks or gets lost.

## 2. Create moves into the conversation

`/studio/create` and the "Create" menu item go away. The campaign builder becomes something the Pal runs:

- You say what you have — a thought, a link, a file, a voice note (the composer already accepts all of these).
- The Pal replies with three angles as choosable cards inside the conversation.
- Picking one builds the campaign; the drafts open in a work panel beside the chat, with the same editors, previews and approvals as today.
- The big "+ Create" button in the sidebar and header becomes "New conversation", always pre-filled with "I have something to turn into content."

Nothing is deleted — the existing builder screens become the work panel, so platform drafts, production plan and scheduling all still work.

## 3. Content ideas merged away

The Content ideas tab is removed. Capture happens in the conversation ("Save this idea"), and saved ideas appear as an **Ideas** filter inside My Work → Campaigns, shown as small cards with a single "Build this" action. The multi-step capture form (source-type tabs, problem field, lane chips, starter ideas) is dropped.

## 4. Campaign cards revamped

Today's cards are a purple block with a duplicated wall of description text. New card:

- Illustrated header using the existing lane artwork, lane color as a thin marker
- Campaign title, two lines max
- One honest status line: approved count, asset count, date
- A progress bar and a single arrow action
- Hover lift, no body-copy dump

Same card used on Home, Campaigns and anywhere campaigns are listed.

## 5. Less text everywhere

Long page intros shrink to a short title plus one sentence. Repeated explainer paragraphs inside cards are removed. Tiny all-caps labels that carry real information get bumped to a readable size.

## Technical notes

- `StudioApp.tsx` (~7,300 lines) holds every view; this splits the reworked pieces out: `MyWork.tsx` (tabbed shell), `CampaignCard` upgraded to use `AssetIllustration`, `IdeasBoard` reduced to a filter view.
- Routes: add `/studio/work` with a tab search param; keep existing route files as redirects into it. Delete `studio.create.tsx` and `studio.ideas.tsx` after redirects land.
- Conversation-driven creation reuses the existing `suggestDirections` and campaign build server functions — no new backend work, no change to Stripe metering or campaign allowances.
- Nav config (`navSections`) collapses to four entries; account items move to the header menu.

## Verification

Sign in as a real workspace, confirm: existing campaigns still open and edit, old links still resolve, a conversation can produce a real saved campaign, ideas saved from chat appear in My Work, and the layout holds on mobile.
