

# Build the Sudden Wealth Film System as a Standalone Page

## Current situation
The website source code (Navigation, App.tsx, all pages) was removed from the project during a restructuring to the monorepo/mobile architecture. The published site still works from a previous deployment. We will build the SWFS page as a standalone React app within this project so it can be deployed independently and linked from the main site nav later.

## What we will build

A complete, single-page React application at the project root (`src/`) that renders the full Sudden Wealth Film System landing page. This restores a working `dev` script and gives the preview something to render.

### Page sections (matching your content brief exactly)

1. **Fixed header** — Palmer House Productions logo + tagline
2. **Hero** — Headline, subheadline, long description, two CTAs (Book a Private Call, View the System), three stat cards (Core Asset, Monetization, Control)
3. **Who This Is For** — Eyebrow + headline + 6 audience cards (lottery winners, athletes, exited founders, inheritance, lawsuit, newly public HNWI)
4. **Why It Matters** — Narrative control messaging
5. **What You Get** — 6 deliverable cards (Hero Film, Announcement Cuts, Short-Form Assets, Story Capture, Distribution Prep, Media Vault)
6. **Platform Ecosystem** — Three channel groups (Streaming, Social, Creator Economy) with platform logos/names
7. **Managing Your New Public Life** — 6 ongoing service items (Content Production, Account Management, Sponsorship, Revenue Activation, Narrative Strategy, Distribution Coordination)
8. **Investment Tiers** — Three pricing cards: Foundation ($45K), Wealth Identity System ($85K, "Most Selected" badge), Legacy Engine ($175K/yr, "Full Partnership" badge) with feature lists and CTAs
9. **Payment terms** — 50% upfront / 5% discount for full payment
10. **Founder Quote** — Jevoy Palmer testimonial block
11. **Testimonials** — 3 client reviews
12. **Closing CTA** — Final consultation button
13. **Footer** — Distribution disclaimer, copyright, locations

### Design approach
- Dark, cinematic palette: deep charcoal backgrounds (#0A0A0A, #111), gold/amber accents (#C9A84C) for CTAs and highlights, white text
- Palmer House brand purple (#6B3FA0) as secondary accent
- Clean typography with Inter font family
- Responsive: mobile-first, looks premium on all viewports
- No external dependencies beyond what's already in the workspace catalog (React, Tailwind, Framer Motion, Lucide icons)

## Technical approach

### Files to create

| File | Purpose |
|------|---------|
| `src/main.tsx` | React entry point |
| `src/App.tsx` | Single route rendering the SWFS page |
| `src/index.css` | Tailwind imports + custom styles |
| `src/pages/SuddenWealthFilmSystem.tsx` | Full landing page component |
| `src/components/swfs/HeroSection.tsx` | Hero with stats |
| `src/components/swfs/AudienceSection.tsx` | Who This Is For |
| `src/components/swfs/DeliverablesSection.tsx` | What You Get |
| `src/components/swfs/PlatformSection.tsx` | Platform Ecosystem |
| `src/components/swfs/ServicesSection.tsx` | Managing Your Public Life |
| `src/components/swfs/PricingSection.tsx` | 3 investment tiers |
| `src/components/swfs/TestimonialsSection.tsx` | Reviews + founder quote |
| `src/components/swfs/Footer.tsx` | Footer with disclaimer |
| `src/components/swfs/SWFSHeader.tsx` | Fixed top navigation bar |
| `vite.config.ts` | Vite config for the standalone page |
| `index.html` | HTML entry point |
| `tailwind.config.ts` | Tailwind config |

### Fix the build errors

We also need to fix the pre-existing TypeScript errors in `lib/integrations-openai-ai-server/` (3 files with type casting issues) and add a `dev` script to the root `package.json` so the preview works.

### Nav placement recommendation (for future integration)

When the main site code is restored, the SWFS page should go under **Services** as a premium sub-item:

```text
Services ▾
  ├── Video Production
  ├── Content Systems
  ├── ...existing items...
  └── Sudden Wealth Film System  ← NEW (with a "Premium" badge)
```

It could also work as a top-level nav item between "Services" and "Industries" if you want maximum visibility for this high-ticket offering.

