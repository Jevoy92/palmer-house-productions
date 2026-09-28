# Studio rebuild — approved reference inventory

## Source and scope
Reconstructed from user-supplied mobile boards (8d946ab8 and ab81c4ed), desktop chat-editor1440×1000, mobile chat390×844, and recovered September27 requirements. The references are backed up outside the repository in Conversation Recovery. The cloud implementation was not found on any of32 remote branch heads. Base:9577ea3. Build locally; review before publishing.

## Locked design
- White light canvas and neutral black/charcoal dark canvas; neutral text, borders, inputs, and cards. Light/Dark/System preferences. The September 27 review supersedes the lavender canvas in the original reference: Pal colors appear only on selected controls, small highlights, and user bubbles. Switching Pals never recolors the app surfaces.
- Satoshi interface type, 14–16px readable body, restrained captions; display36–48px page titles, 20–24px chat identity. Every control styled deliberately.
- Desktop:72px topbar,244px persistent sidebar, flexible conversation and390px editor. Mobile: focused Pal header, edge-to-edge chat with16px margins, floating composer above5tab bottom navigation. Editor becomes accessible full-height sheet.
- Nav: Chat, Feed, Ideas, Campaigns, Library. Business tools: Calendar, Brand DNA, Video roadmap, Approvals. Recent chats and Settings remain accessible.
- Real eight-Pal portraits and supplied transparent3D icon family. No new line drawings for content imagery. Line icons remain appropriate for small toolbar controls as shown in references.
- Embedded campaign tabs display actual saved platform drafts, article/newsletter/script content, media. Edit/Open/Save actions must update the same stored assets, not duplicates.
- Library: search, type pills, campaign folders,2column mobile visual cards; actual content images with reliable image fallbacks. No tinted overlay on photography.
- Feed: Pal conversation threads grounded in saved workspace context, source links for factual research, persistent hearts/comments, save ideas/build campaign actions.
- Calendar: actual content preview first, copy action, then status/date/channel/notes. Roadmap: explain reusable scripts and gaps. Brand guide: visual reference images, typography specimens, color system and brand story.
- Motion: short content entrance, buttonfeedback, actual creation status; no fake timedprogress or invented research. Respect reducedmotion.

## Fidelity and functional review gates
Compare accepted images and actual browser captures at390×844 and1440×1000. Check palette, typography, content framing, nav/composer, panel widths, graphic styles and interactive state. Preserve auth/workspace boundaries, asynchronous conversation protections, and quote-first commerce. Synthetic review data stays confined to dev preview and clearly identified. Live AI/storage checks require deployed credentials; never present fixtures as successfullivegeneration.
