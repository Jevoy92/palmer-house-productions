# Responsive UI patterns in this project

A concise guide to building layouts that adapt beautifully from mobile to desktop using our design system and Tailwind utilities.

## Breakpoints we rely on
- Mobile-first: styles apply to all sizes by default
- sm ≥ 640px, md ≥ 768px, lg ≥ 1024px, xl ≥ 1280px

Use progressive enhancement like:
- grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
- flex flex-col sm:flex-row

## Fluid containers
- Use max-w-screen-*, gap-*, and responsive padding: px-4 sm:px-6 lg:px-8
- Prefer min-h-screen for main areas

## Spacing and wrapping
- Use gap-* for grid/flex spacing instead of margins
- Allow text/actions to wrap: flex-wrap and whitespace-nowrap on small actionable items

## Cards and surfaces
- Use bg-card and border-border to ensure solid surfaces across themes
- For scrollable areas: max-h-[70vh] overflow-y-auto

## Dropdowns, menus, and z-index
- Our Select/menus default to bg-popover with z-50 in ui/select.tsx
- When needed, add className="z-50" to force stacking over modals/sections

## Modals/dialogs
- Set responsive width on DialogContent via className, e.g.
  - w-[min(100vw-2rem,80rem)] sm:max-w-2xl lg:max-w-5xl
- Keep content scrollable: max-h-[70vh] overflow-y-auto

## Buttons and touch targets
- Maintain min-h-[44px] and px-4 for comfortable taps

## Forms
- Use grid grid-cols-1 sm:grid-cols-2 for two-up fields
- For helper text + actions, stack then row: flex flex-col sm:flex-row

## Animations
- Prefer data-[state=*] utilities already wired in our shadcn wrappers
- Use animate-fade-in (already defined) with IntersectionObserver where needed

## Accessibility
- Single H1 per page
- Descriptive alt text for images
- Use semantic sections: header, main, section, nav, footer

## Performance
- Lazy-load media, keep images responsive, defer non-critical scripts

Reference
- Tailwind responsive docs: https://tailwindcss.com/docs/responsive-design
- Radix UI (shadcn) components behavior: https://ui.shadcn.com
