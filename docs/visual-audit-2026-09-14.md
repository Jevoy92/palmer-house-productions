# Public site visual audit — September 14, 2026

The review started with the four supplied Lovable screenshots and followed the same patterns across the public site's shared components, homepage, service pages, Pal directory and detail pages, location template, Process, Find Your Pal, and Membership.

## Findings and changes

| Finding | Change |
| --- | --- |
| White pills and repeated white card grids flattened the page hierarchy. | Added public-scoped cream/mist surfaces and consistent lane colors. Formats wrap into readable colored tags, while feature and FAQ content uses divider rows. |
| Different Pal lanes shared purple labels and indistinguishable cards. | Reel uses orange, Spotlight purple, Evergreen green, and System teal across service cards, portraits, tags, and page accents. Darker text shades maintain readable contrast. |
| Large decorative diagrams and tiny overlapping full-body characters competed with useful content. | Replaced them with existing portrait assets and concise production, guide, and campaign overviews built from real text. |
| Homepage content remained faint until a scroll animation revealed it. | All introductory paragraphs are now readable immediately. |
| The homepage presented unsupported reach and engagement figures. | Replaced these with factual descriptions of lane applications and deliverables. |
| The assessment CTA led to Contact. | It now opens Find Your Pal. |
| The header logo depended on a Lovable-only asset route. | Bundled the existing Palmer House play/PH mark with the site. |

The brand palette remains Spotlight `#3D1A66`, Reel `#E8720C`, Evergreen `#5B8A2D`, and System `#0A9B8F`. New shared tokens are scoped to public marketing surfaces. Studio changes arriving from Lovable were retained when updating the checkout.

## Validation

- Production build, TypeScript, lint for every changed TSX file, and whitespace checks pass.
- Reviewed desktop layouts at 1440 × 1000 and mobile layouts at 390 × 844.
- Mobile overflow and image checks passed for the homepage, both service pages, Pal directory, four Pal detail pages, Seattle location, Process, Find Your Pal, Membership, and Contact.
- Tested mobile navigation, homepage FAQ expansion, Pal recommendation, and the finder day/night toggle.
- A fresh development-server reload showed no browser errors. The intermediate logo hot-reload timestamp mismatch disappeared after the clean restart.
- Existing build warnings about bundle size and the Vite path-resolution plugin remain; they do not fail the build.

This is a visual and usability pass over public marketing pages. Checkout, account data, payment processing, and Studio generation behavior were not changed by this work.
