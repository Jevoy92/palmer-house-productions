# Unify site navigation and pricing

The site currently has three different ways to shop, four pricing destinations, a 12-item Explore menu with repeated links, and a separate slim header on the store pages. This makes navigation one consistent system.

## 1. One Pricing hub

A new `/pricing` page becomes the single answer to "what does this cost?" It explains the three ways to buy and sends people to the right place:

- **Production work** — a filming session and the videos you take home, with the estimate builder at `/production-pricing`
- **Studio plans** — monthly membership tiers, comparison stays at `/membership/pricing`
- **Packages** — the ten ready-made packages at `/shop`
- A quiet line at the bottom pointing to current offers

Each option shows a starting price, who it fits, and one button. The existing pricing pages stay exactly as they are; nothing is deleted and current links keep working.

## 2. Four navigation menus

Replaces the current Start here / Services / Pals / Explore / Work spread:

- **Services** — Video Production, Post-Production, Content Strategy, Industries, Our Process
- **Pals** — Meet the Pals, Lane Guide, Find Your Pal, and the four lane pages
- **Pricing** — Pricing overview, Production estimate, Studio plans, Packages, Current offers
- **Company** — About, Selected Work, Client Reviews, Blog, FAQ, Locations

Plus the standing items: Work, Offers, Login, cart, Get started.

Every link appears in exactly one menu. Today's duplicates — Browse Packages in two menus, Find Your Pal in two, Video System Assessment in two, Blog and Production Guide in two, Membership in two — are resolved. The "Start here" tools (Find Your Pal, Video System Assessment, Production Guide, Games) move into a single highlighted row inside the menus they belong to rather than their own dropdown.

The mobile menu mirrors the same four groups, so the two never drift apart.

## 3. Store pages get the real site header

The shop, production pricing, package detail and checkout pages currently use their own slim header with a different link set and a private theme toggle. They switch to the main site navigation, keeping the cart count and the plan/receipt behavior. One header, one footer, everywhere.

## 4. Footer matched to the nav

The footer columns are re-cut to the same four groups so the footer and header tell the same story, with Pricing added as its own column entry.

## Technical notes

- `src/data/nav.ts` is the single source: replace `startHereLinks`/`serviceLinks`/`exploreLinks` with `serviceLinks`, `palLinks`, `pricingLinks`, `companyLinks`; `footerColumns` derives from the same arrays.
- `src/routes/pricing.tsx` stops being a redirect and becomes the hub page, built with `PageShell` and existing Pal visuals; own `head()` metadata; add it to `public/sitemap.xml`.
- `SiteNav.tsx` renders the four dropdowns; `MobileGroup` list updated to match.
- `CollectionShell.tsx` swaps its bespoke header/footer for `SiteNav` + `SiteFooter`, keeping `pc-dock`, the cart link, and appearance handling intact so the store CSS keeps working.
- No changes to pricing logic, the cart store, Stripe checkout, or Studio routes.

## Verification

Click every menu item on desktop and mobile, confirm no dead or duplicated links, check the shop / pricing / package detail / checkout pages render with the site header and a working cart count, and confirm `/pricing`, `/production-pricing`, `/membership/pricing` and `/shop` all resolve.
