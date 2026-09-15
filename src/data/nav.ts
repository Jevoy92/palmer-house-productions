export type NavLink = { label: string; to: string; description?: string; badge?: string };
export type NavGroup = { label: string; links: NavLink[] };

export const startHereLinks: NavLink[] = [
  {
    label: "Find Your Pal",
    to: "/find-your-pal",
    description: "Choose the right video lane",
  },
  {
    label: "Video System Assessment",
    to: "/video-system-assessment",
    description: "Find the biggest content gap",
  },
  {
    label: "Current Offers",
    to: "/offers",
    description: "Bundles, BOGO, and monthly savings",
    badge: "New",
  },
  {
    label: "Browse Packages",
    to: "/shop",
    description: "Build a production plan",
  },
];

export const serviceLinks: NavLink[] = [
  {
    label: "Video Production",
    to: "/services/video-production",
    description: "Strategy, crews, and shoot days",
  },
  {
    label: "Post-Production",
    to: "/services/post-production",
    description: "Editing, motion, and delivery",
  },
  {
    label: "Content Strategy",
    to: "/content-strategy",
    description: "Build the system before filming",
  },
  {
    label: "Production Pricing",
    to: "/production-pricing",
    description: "Plan scope and investment",
  },
  {
    label: "Shop Packages",
    to: "/shop",
    description: "Ready-to-build video packages",
    badge: "New",
  },
];

export const palLinks: NavLink[] = [
  { label: "Meet the Pals", to: "/meet-the-pals" },
  { label: "Pal Lane Guide", to: "/pals" },
  { label: "Find Your Pal", to: "/find-your-pal" },
  { label: "Reel Pal", to: "/reel-pal" },
  { label: "Spotlight Pal", to: "/spotlight-pal" },
  { label: "Evergreen Pal", to: "/evergreen-pal" },
  { label: "System Pal", to: "/system-pal" },
];

export const industryLinks: NavLink[] = [
  { label: "Healthcare", to: "/industries/healthcare" },
  { label: "Manufacturing", to: "/industries/manufacturing" },
  { label: "Professional Services", to: "/industries/professional-services" },
  { label: "Technology", to: "/industries/technology" },
  { label: "Education", to: "/industries/education" },
  { label: "Government", to: "/industries/government" },
  { label: "Startups", to: "/startups" },
];

export const resourceLinks: NavLink[] = [
  { label: "Blog & Insights", to: "/blog" },
  { label: "Downloads & Templates", to: "/services/diy-downloads" },
  { label: "Games & Guided Tools", to: "/games" },
  { label: "Production Guide", to: "/production-guide" },
  { label: "Video System Assessment", to: "/video-system-assessment" },
  { label: "Free Webinar", to: "/webinar" },
];

export const exploreLinks: NavLink[] = [
  {
    label: "Our Process",
    to: "/process",
    description: "From discovery through delivery",
  },
  { label: "About Palmer House", to: "/about-us" },
  { label: "Selected Work", to: "/work" },
  { label: "Client Reviews", to: "/resources/reviews" },
  { label: "Blog & Insights", to: "/blog" },
  { label: "Production Guide", to: "/production-guide" },
  { label: "Industries", to: "/industries" },
  { label: "Locations", to: "/locations" },
  { label: "FAQ", to: "/faq" },
  { label: "Games & Tools", to: "/games" },
  { label: "Membership", to: "/membership" },
  { label: "Our View on AI", to: "/ai-pov" },
];

export const navGroups: NavGroup[] = [
  {
    label: "Services",
    links: serviceLinks,
  },
  {
    label: "Industries",
    links: industryLinks,
  },
  {
    label: "Meet the Pals",
    links: palLinks,
  },
  {
    label: "Resources",
    links: resourceLinks,
  },
  {
    label: "Locations",
    links: [
      { label: "Seattle, WA", to: "/locations/seattle-wa" },
      { label: "Bellevue, WA", to: "/locations/bellevue-wa" },
      { label: "Tacoma, WA", to: "/locations/tacoma-wa" },
      { label: "Portland, OR", to: "/locations/portland-or" },
    ],
  },
  {
    label: "Company",
    links: [
      { label: "About Us", to: "/about-us" },
      { label: "Pricing", to: "/production-pricing" },
      { label: "Current Offers", to: "/offers" },
      { label: "Selected Work", to: "/work" },
      { label: "Membership", to: "/membership" },
      { label: "Our View on AI", to: "/ai-pov" },
      { label: "FAQ", to: "/faq" },
      { label: "Client Reviews", to: "/resources/reviews" },
      { label: "Get Started", to: "/contact" },
    ],
  },
];

export const footerColumns: NavGroup[] = [
  {
    label: "Services",
    links: [
      { label: "Video Production", to: "/services/video-production" },
      { label: "Post-Production", to: "/services/post-production" },
      { label: "Consulting & Strategy", to: "/content-strategy" },
    ],
  },
  {
    label: "Meet the Pals",
    links: [
      { label: "Palmer House Pals", to: "/pals" },
      { label: "Reel Pal", to: "/reel-pal" },
      { label: "System Pal", to: "/system-pal" },
      { label: "Evergreen Pal", to: "/evergreen-pal" },
      { label: "Spotlight Pal", to: "/spotlight-pal" },
    ],
  },
  {
    label: "Resources",
    links: [
      { label: "Blog / Insights", to: "/blog" },
      { label: "Client Reviews", to: "/resources/reviews" },
      { label: "Downloads & Templates", to: "/services/diy-downloads" },
      { label: "FAQ", to: "/faq" },
      { label: "Free Webinar", to: "/webinar" },
    ],
  },
  {
    label: "Company",
    links: [
      { label: "About Us", to: "/about-us" },
      { label: "Pricing", to: "/production-pricing" },
      { label: "Production Guide", to: "/production-guide" },
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms of Service", to: "/terms" },
    ],
  },
];

export const locations: NavLink[] = [
  { label: "Seattle, WA", to: "/locations/seattle-wa" },
  { label: "Bellevue, WA", to: "/locations/bellevue-wa" },
  { label: "Tacoma, WA", to: "/locations/tacoma-wa" },
  { label: "Portland, OR", to: "/locations/portland-or" },
];

export const socials = [
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=100092553086353" },
  { label: "Instagram", href: "https://www.instagram.com/palmerhouseproductions" },
  { label: "YouTube", href: "https://www.youtube.com/channel/UCe7_R47Klv_JdupA1exogMw" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/palmer-house-productions/" },
  { label: "X", href: "https://x.com/palmerhouseviz" },
  { label: "Pinterest", href: "https://www.pinterest.com/palmerhouseproductions/" },
  { label: "TikTok", href: "https://www.tiktok.com/@palmerhouseproductions" },
  { label: "Threads", href: "https://www.threads.net/@palmerhouseproductions" },
];

export const contactInfo = {
  email: "info@palmerhouseproductions.com",
  phone: "425-533-9060",
  phoneHref: "tel:+14255339060",
};
