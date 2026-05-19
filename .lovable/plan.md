# Palmer House Brand & Design Guide — Downloadable Artifact

## Goal
Produce a single, high-level brand + design guide you can use while building social/brand assets for Palmer House and the Pals. Deliver as **both HTML and Markdown** in `/mnt/documents/` so you can download either, then we delete when done. Nothing touches the project source.

## Source of truth
I'll pull from what's already canon in memory + codebase, not invent new system:

- **Pal color system** (Reel/Orange, Spotlight/Purple, System/Teal, Evergreen/Sage) — from `artifacts/mobile/constants/colors.ts` and the Pal color memory
- **8-character canon** (Ryder/Raquel, Kareem/Kiana, Silas/Samira, Cyrus/Clara) — from data.ts + character-asset-standardization memory
- **Brand laws** from memory: no gradients, no pills, no dark backgrounds as base, button system, mix-blend-mode: multiply for characters on pure white, "We Don't Make Videos. We Translate Businesses." tagline, Palmer House as translation company (7 house rules)
- **Typography**: Inter (body) + Playfair Display (serif) from current `src/index.css`, plus the display/heading pairing the main site uses
- **Production pricing language** + tier structure (only at a naming/positioning level, not a price sheet)
- **Industry → Pal lane mapping**
- **Contact**: (425) 533-9060, palmerhouseproductions.com
- **TV compliance line**: "major streaming platform in 2025" — no celebrity names

## What I'll borrow from your uploaded `PHP_Brand_Hub.html`
- Overall section structure (Hero → Identity → Color → Type → Voice → Components → Pals → Usage → Do/Don't)
- Card-based "swatch + token + usage" pattern for colors
- Clean editorial layout vibe

## What I'll cut from the upload (doesn't match current brand)
- Dark `--stage-black` page background and radial gradients (violates no-gradients + no-dark-base rules)
- Any "Curtain / Stage / Sage-Reel" naming that conflicts with our actual Pal color names
- Decorative serif display flourishes that don't appear on the live site
- Anything implying a team beyond Jevoy Palmer
- Anything not aligned with the 4-Pal taxonomy

## Guide contents (high level)
1. **Brand essence** — mission, tagline, the translation-company metaphor, 7 house rules, tone of voice
2. **Logo & wordmark usage** — clear space, min size, do/don't (kept short, no fabricated lockups)
3. **Color system** — primary neutrals + the 4 Pal lanes with hex, when to use each, `-soft` variant rule, no-gradient rule
4. **Typography** — Inter + Playfair Display pairing, sizes/weights, the "no pills, uppercase + center dot" tag style
5. **Character cast** — the 8 Pals, who they are, which lane, visual treatment rule (multiply blend on pure white)
6. **Voice & copy** — sentence patterns, banned phrases, TV compliance line
7. **Social/asset checklist** — quick reference for building a post: pick lane → pick character → apply color → apply type → check do/don't
8. **Do / Don't grid** — gradients, pills, dark base, raw Tailwind colors, celebrity names, generic stock characters

## Deliverables
- `/mnt/documents/palmer-house-brand-guide.html` — styled, print-friendly, light theme, matches site rules (no gradients, no pills, semantic-feeling)
- `/mnt/documents/palmer-house-brand-guide.md` — same content, plain Markdown for easy copy/paste into Notion/Docs
- Both surfaced via `<presentation-artifact>` tags so you can download in one click

## Out of scope
- No edits to project source, SWFS page, or site code
- No new logos/illustrations generated — guide references existing canon only
- Not a full 50-page brand bible; this is a working reference you can scan in 5 minutes
