# Pal Feed and Chat refinement

Make Feed and Chat read like a conversation with recognizable teammates, in the style of the Design Monks reference: a narrow column, small avatars, visible names, quiet timestamps, soft compact messages and a low-profile composer. This changes only how things look. Routes, data, AI behavior, credits, billing and permissions stay the same.

## 1. Shared layout
- Messages and the composer share one reading width (about 680px) and sit centered in the workspace.
- About 16–20px between speakers and 6–10px inside a group. 12–16px side margins on mobile.
- The Chat header shrinks from 108px to about 64–76px: a small Pal portrait, the name and a short status. Pal picker, new conversation, history, next steps and mobile navigation stay reachable.

## 2. Feed (/studio/feed)
- Each post and its replies read as one thread. Pal and member replies appear together in time order, instead of Pal replies sitting above the action buttons and member replies below them.
- Remove the card border and shadow around each thread and the nested reply boxes. Topics are separated by a faint line.
- Small avatars with names and a light role or lane label. The topic title becomes a modest label, not a large heading.
- Love, comments, Save idea, Build campaign, saved state, filters and credit notes all stay. Main actions go in a light compact row. Secondary ones move into a "More" menu that works by keyboard and touch.
- Photos in the Feed get a height limit and link to their asset page.
- The side panel becomes clearly secondary, or its links move into the header. Saved ideas stay reachable.
- The "share a thought" box becomes more compact. Posting works exactly as today and does not trigger automatic Pal replies.

## 3. Chat (/studio/conversations)
- Pal messages stay on the left and yours on the right. Your messages get one soft tint. Pal messages sit on a very light surface.
- Bubbles are compact (about 10–14px by 14–16px padding, 14–18px corners) with 32–36px avatars.
- The speaker's name sits above the bubble and stays visible on mobile. Each old message keeps the Pal that actually wrote it, even after you switch Pals.
- Back-to-back messages from the same speaker are grouped.
- Copy, Save idea, Build campaign, Ask again, key points and follow-up chips get a smaller, quieter row.
- New chats keep the full Pal welcome. Returning chats show a single dismissible greeting line. The large "working on it" panel becomes a compact avatar, name and status row.
- The "What's new" banner and the Pal welcome no longer stack into several large blocks, and onboarding stays reachable.

## 4. Answer formatting
- A chat-only text style: normal sentence-case headings at a modest size, 15–16px body text at about 1.55 line height, and tidy lists.
- No decorative bars or uppercase labels in ordinary answers. Links, tables and code stay, and long URLs wrap.
- Drafts and the calendar editor keep their current document formatting. The large-text preference still works.

## 5. Attachments and composer
- Image, PDF and campaign cards use one border, a small title, type and status, a preview and one main button. Tabs, editing, saving, unsaved-change protection, copy, export and the mobile editor stay.
- The composer is one surface at the conversation width, with an attach button, a highlighted Send button, a clear focus state and growth as you type.
- Voice, attachments, image and PDF creation, drafts, errors, retry, length limits, credit costs, Enter vs Shift+Enter and typing in other languages all keep working.

## 6. Motion and personality
- Pal names, portraits and colors stay. Spotlight, Reel, System and Evergreen are used as small accents only.
- Gentle entrance and honest "thinking" states. Reduced-motion settings are respected. No fake activity.

## 7. Checks
- Screenshots before and after at 390px and 1280px, in light and dark.
- Cover a new chat, an established chat, a long answer, older messages from different Pals, a Feed thread with Pal and member replies (collapsed and expanded), an attachment with its editor, and composer states.
- Keyboard focus, 44px touch targets, large text and reduced motion.
- Loading earlier messages and keeping your scroll position still work.
- Nothing is published.

## Technical details
- Files: StudioFeed.tsx, studio-feed.css, StudioAssistant.tsx, studio-chat.css, StudioMarkdown.tsx (new `variant="chat"`), StudioChatArtifacts.tsx, PalPresence.tsx, and the related shell and appearance CSS.
- Add one `--pal-read` width token in studio-chat.css to replace the current 820px timeline and 870px composer widths.
- Feed: merge the Pal and member reply lists into one list sorted by created_at, inside each post_id thread. Collapse to the latest few with a "Show N earlier" control.
- Chat grouping uses each message's saved author Pal and its order. Mobile styles stop hiding the speaker name.
- Clean up conflicting cascade layers instead of adding another override layer.
