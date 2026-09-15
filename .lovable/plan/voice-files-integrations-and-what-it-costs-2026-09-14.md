# Voice, files, integrations, and what it costs

Three separate things: (1) accept far more kinds of input, (2) pull real outside context in from Google, (3) know what each conversation actually costs you.

---

## 1. Input: voice, files, links, everything

Today the create screen accepts three things: typed text, a public link, an image. That becomes one intake bar used everywhere — the conversation composer and the create screen — with five ways in.

**Voice**
- Hold-to-record or tap-to-record in the composer. The recording is captured as clean audio in the browser and transcribed on our side.
- The transcript appears in the box as editable text before anything is sent, so a misheard word is fixed in a second.
- Long recordings are split and stitched automatically, so a ten-minute ramble in the truck still works.
- Practical limit: roughly 20 minutes per recording. Longer recordings are chunked.

**Documents**
- PDF, Word, plain text, Markdown, CSV. Text is extracted and summarized into the conversation, and the original is stored in the workspace so it can be re-read later.
- Limit: 25 MB per file, up to 5 files per message. A long PDF gets condensed rather than pasted whole, so cost stays predictable.
- Scanned PDFs with no text layer are read as images instead.

**Images**
- JPG, PNG, WebP, HEIC. Multiple images per message. Used for moodboards, whiteboard photos, screenshots of reviews or DMs.
- Limit: 10 MB each, 8 per message.

**Links**
- Any public page, plus better handling for YouTube (transcript), LinkedIn/Instagram posts, Google Docs shared links, and PDFs hosted online.

**Audio/video files**
- MP3, M4A, WAV, MP4, MOV uploads (a recorded sales call, a webinar, a client zoom). Transcribed the same way as voice.
- Limit: 200 MB, about 90 minutes. Longer files are split.

Everything that comes in is stored against the conversation and added to the workspace knowledge base, so the Pals keep the context permanently instead of per-message.

---

## 2. Integrations that actually help content

Ranked by how much they improve what the Pals produce, versus setup pain.

**Worth doing, in order**

1. **Google Business Profile** — the highest-value one. Real customer reviews in the customer's own words, the questions people ask, which photos get views, what services are listed. This is the single best source for brand voice, proof points, and "what customers actually care about." Read-only connection to the business, not a personal account.
2. **YouTube (their channel)** — existing videos, titles, descriptions, and view/retention data. Tells us what already works for them and what has been covered, so the Pals stop suggesting things they have already made.
3. **Google Drive / Docs** — let them point at a folder: capability statements, past proposals, brand documents, case studies. One-time import into Brand DNA rather than a live sync.
4. **Google Search Console** — the exact search phrases already bringing people to their site. Turns "what should I post about" into a ranked list based on real demand.
5. **Instagram / LinkedIn (their own accounts)** — past posts and engagement, for voice matching and gap-finding.

**Skip for now**
- Gmail and Google Calendar. Privacy-heavy, low content value, and they make the Google verification review much harder.
- Analytics beyond Search Console. Interesting to you, not useful to a Pal writing a script.

**How it works for the member**
One "Connect your business" step in Brand DNA. They pick what to connect, we import once, show them what we found in plain language ("we read 84 reviews and 12 videos"), and they approve what becomes part of their brand profile. Nothing connects silently, and each connection can be disconnected.

**Honest dependency:** Google Business Profile, YouTube and Search Console all require an app verification review with Google for the data scopes involved. That is a form and a review period, not code. I will lay out exactly what each one needs before we build it, and we can start with Drive/Docs import, which needs the least.

---

## 3. Cost, using your real numbers

This uses actual gateway usage from your workspace, not estimates. Every completed campaign build in your logs ran a set of calls costing between 0.005 and 0.031 credits each, with a full build landing around **0.12–0.20 credits**.

An agentic conversation model changes the shape: instead of one big build, you pay a little per exchange, and the expensive call only fires when a member asks to actually build something.

**Per-member monthly profiles** (moderate use: ~60 chat exchanges, 4 campaign builds, 10 voice notes, 5 documents)

| Setup | Chat model | Cost / member / month | Feel |
| --- | --- | --- | --- |
| Cheapest | Gemini Flash Lite | about $0.35 | Fast, fine for chat, noticeably shallower strategy |
| Recommended | Gemini Flash for chat, GPT-5.4 for builds | about $1.10 | Snappy conversation, strong finished work |
| Premium | GPT-5.5 throughout | about $4.50 | Best reasoning, slower, hard to justify at your price points |

Heavy users (200 exchanges, 12 builds) roughly triple those figures: about $1, $3.30, and $13.50 respectively.

Voice and documents are cheap and worth not worrying about: transcription runs about $0.006 per minute of audio, so 30 minutes of voice notes a month is under a quarter. Document reading is a few cents per member.

**Against your pricing:** at $99/month the recommended setup costs roughly 1% of revenue for a moderate member and about 3% for a heavy one. That is comfortable. The premium setup is the one that stops making sense at the low tier.

**The one thing to fix regardless:** the Studio currently calls a model that has been retired. Moving to a current model is required maintenance, not an upgrade, and it is also cheaper and better.

**What protects you:** keep the current per-campaign allowance exactly as it is — that is the meter tied to Stripe and it stays untouched. Conversation stays unmetered but bounded (a cap on how much history and how much document text goes into any single call), which is what keeps the per-member number stable even when someone talks all day.

---

## Suggested order

1. Voice input and the unified intake bar (immediate, visible win).
2. Documents and audio/video files.
3. Model switch off the retired model, plus the context bounds that hold costs flat.
4. Google Drive/Docs import into Brand DNA.
5. Google Business Profile and YouTube, once verification is through.

---

## Technical notes

- Voice uses browser Web Audio capture encoded to WAV, uploaded to a server function, transcribed via `google/gemini-3.5-transcribe`. Chunked at 14 MB per request with transcripts concatenated.
- File intake extends `content_ideas.source_type` and `source_media_path` and reuses the existing private storage buckets; a new `conversation_attachments` table links files to a conversation so context persists.
- PDF/Office text extraction runs in the Worker runtime, so pure-JS parsers only (no native binaries).
- `src/lib/ai.server.ts` pins `openai/gpt-5-mini`, which is deprecated in the current catalog; split into a chat model and a build model and route OpenAI models through the Responses API.
- The workspace knowledge digest in `src/lib/studio-knowledge.ts` gains attachment summaries with a hard character budget, which is the cost control.
- Google integrations use per-member OAuth through the app connector flow, tokens stored server-side, never in the browser.
- Campaign metering through `reserve_campaign_usage` and Stripe is unchanged; no credit-style deductions are introduced.
