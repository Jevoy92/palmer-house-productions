# Replace AI example videos with animated product loops

## What changes
All 10 "AI concept" example videos (and their AI-made cover photos) come off the site. Each package gets a short, silent, looping animation instead: flat Pal colors, simple shapes and words that show what the deliverable is. No people, no faces, nothing that looks like fake footage.

Where they appear today:
- Package shop cards and each package detail page (the "Watch example · 0:30" button)
- The home page tiles that use the AI cover photos

## The 10 loops (one idea each)
- Social content: a phone feed where a hook line pops, then captions build
- Sales training: two speech bubbles trade an objection and a reply, a checkmark lands
- Commercials: a 30-second timeline filling scene by scene, ending on a call-to-action card
- Product demos: a product outline with callout labels drawing in one by one
- Customer stories: a quote card with before/after marks and a star row
- Employee spotlights: a name card with role and three values ticking in
- Educational videos: a chapter list with a progress bar moving through lessons
- Onboarding: a day 1 / week 1 / month 1 checklist completing
- Safety training: a step card with warning icon, then "do this" confirmation
- Video SOPs: numbered process steps linking together into a finished loop

Each loop runs 6 to 8 seconds, plays quietly on the card, pauses for people who prefer less motion, and has a text label for screen readers.

## Wording
- "AI concept" labels become "Format preview"
- The watch dialog goes away; the card shows the loop plus a one-line description of what's included
- FAQ and AI-approach page text updated so it no longer mentions AI example videos; real client work stays on Our work

## Technical details
- Build loops as lightweight in-page animations (CSS/SVG in React, lane colors from existing tokens), not video files: crisp, tiny, no hosting, easy to edit.
- Rewrite `PreviewMedia.tsx` to render a `FormatLoop` by package id; drop video, captions, dialog.
- Strip `videoSrc`, `poster`, `transcript`, `captions` from `package-previews.ts` (keep title/description); delete `public/packages/captions/*.vtt`.
- `PublicHome.tsx` tiles use the same loop component instead of AI posters.
- Update copy in `CollectionPage.tsx`, `faq.tsx`, `ai-pov.tsx`.
- Verify in browser on shop, detail and home pages, desktop and mobile, with reduced motion on.
