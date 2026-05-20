

# Generate Palmer House Productions Brand System Document (DOCX)

## What we will create

A single downloadable DOCX file containing 5 brand systems:

1. **Palmer House Productions** (master brand)
2. **Reel Pal** (Ryder & Raquel) — Visibility + Momentum
3. **Spotlight Pal** (Kareem & Kiana) — Trust + Founder Presence
4. **Evergreen Pal** (Cyrus & Clara) — Authority + Long-Form
5. **System Pal** (Silas & Samira) — Internal Video Systems

## Content per brand system

Each section will include:
- **Brand Identity**: Name, tagline, mission, target audience
- **Color Palette**: Primary, secondary, accent colors with hex codes (pulled from existing `colors.ts` and Tailwind config)
- **Typography**: Font pairings for headlines and body
- **Voice & Tone**: 3 "do this" and 3 "don't do this" rules, plus 5 example sentences
- **Capability Signals**: The 6 diagnostic stats per Pal (from memory)
- **Character Duo**: Male/female character names, roles, and personality

## Source data

All values pulled from existing codebase:
- `artifacts/mobile/constants/colors.ts` — Pal color system
- `artifacts/mobile/constants/data.ts` — Pal definitions, taglines, characters
- `attached_assets/branding-1774057461247.json` — Master brand colors/typography
- Memory entries for Pal Bible canon, capability signals, color system

## Technical approach

- Use the `docx` npm package (DOCX skill) to generate a professional multi-section document
- Color swatches represented as colored table cells with hex codes
- Palmer House purple (#6B3FA0), Reel orange (#E8720C), Spotlight purple (hsl 270,40%,25%), Evergreen sage (#5B8A2D), System teal (#0A9B8F)
- Output to `/mnt/documents/palmer-house-brand-system.docx`
- QA via LibreOffice PDF conversion + image inspection

## Files created

- `/mnt/documents/palmer-house-brand-system.docx`

