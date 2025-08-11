/**
 * Palmer House Productions Branding Constants
 * 
 * This file contains all branding assets and constants to ensure consistency
 * across the application and prevent loss of brand assets.
 */

// Logo configuration
export const LOGO = {
  // Main Palmer House Productions logo
  url: "/lovable-uploads/9781932b-3e6b-492b-a04c-fbbfa0d34cf8.png",
  alt: "Palmer House Productions logo",
  width: "auto",
  height: "32px", // h-8 in Tailwind
  className: "h-8 w-auto"
} as const;

// Company information
export const COMPANY = {
  name: "Palmer House Productions",
  tagline: "Professional Video Production Services",
  description: "Creating compelling video content that drives results"
} as const;

// Brand colors (already defined in design system)
export const BRAND_COLORS = {
  primary: "hsl(var(--primary))",
  secondary: "hsl(var(--secondary))",
  accent: "hsl(var(--accent))"
} as const;