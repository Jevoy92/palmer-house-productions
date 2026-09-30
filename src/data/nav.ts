export type NavLink = { label: string; to: string; description?: string; badge?: string };
export type NavGroup = { label: string; links: NavLink[] };

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
    label: "Our Process",
    to: "/process",
    description: "From discovery through delivery",
  },
  {
    label: "Industries",
    to: "/industries",
    description: "How we work in your field",
  },
];

export const palLinks: NavLink[] = [
  {
    label: "Find Your Pal",
    to: "/find-your-pal",
    description: "A package and a price in two choices",
  },
  { label: "Meet the Pals", to: "/meet-the-pals", description: "The eight characters" },
  { label: "Pal Lane Guide", to: "/pals", description: "Which lane fits your problem" },
  { label: "Reel Pal", to: "/reel-pal" },
  { label: "Spotlight Pal", to: "/spotlight-pal" },
  { label: "Evergreen Pal", to: "/evergreen-pal" },
  { label: "System Pal", to: "/system-pal" },
];

export const pricingLinks: NavLink[] = [
  {
    label: "Pricing Overview",
    to: "/pricing",
    description: "Every way to work with us",
  },
  {
    label: "Production Estimate",
    to: "/production-pricing",
    description: "Build an editable estimate",
  },
  {
    label: "Studio Plans",
    to: "/membership/pricing",
    description: "Monthly membership tiers",
  },
  {
    label: "Browse Packages",
    to: "/shop",
    description: "Ten packages with examples",
  },
  {
    label: "Current Offers",
    to: "/offers",
    description: "Bundles, BOGO, and savings",
    badge: "New",
  },
];

export const companyLinks: NavLink[] = [
  { label: "About Palmer House", to: "/about-us" },
  { label: "Selected Work", to: "/work" },
  { label: "Client Reviews", to: "/resources/reviews" },
  { label: "Blog & Insights", to: "/blog" },
  { label: "Guides & Tools", to: "/production-guide", description: "Guides, downloads, and games" },
  { label: "FAQ", to: "/faq" },
  { label: "Locations", to: "/locations" },
];

export const primaryLinks: NavLink[] = [
  {
    label: "Full production",
    to: "/services/video-production",
    description: "We plan, film and edit your videos.",
  },
  { label: "Studio", to: "/membership", description: "Create with our software and AI Pals." },
  {
    label: "Planning & prep",
    to: "/content-strategy",
    description: "Get your ideas, scripts and team ready.",
  },
];

export const resourceLinks: NavLink[] = [
  {
    label: "Meet the Pals",
    to: "/meet-the-pals",
    description: "Eight personalities. One connected Studio.",
  },
  {
    label: "Production guide",
    to: "/production-guide",
    description: "Prepare for your day on camera.",
  },
  { label: "Articles & ideas", to: "/blog", description: "Useful advice for your next project." },
  { label: "About Palmer House", to: "/about-us" },
  { label: "Questions & answers", to: "/faq" },
  { label: "Current offers", to: "/offers" },
];

export const footerColumns: NavGroup[] = [
  {
    label: "Work with us",
    links: [
      ...primaryLinks,
      { label: "Editing & finishing", to: "/services/post-production" },
      { label: "Talk to the team", to: "/contact" },
    ],
  },
  {
    label: "Choose your next step",
    links: [
      { label: "Browse video packages", to: "/shop" },
      { label: "Compare pricing", to: "/pricing" },
      { label: "Build a production estimate", to: "/production-pricing" },
      { label: "Studio plans", to: "/membership/pricing" },
      { label: "Your Studio account", to: "/studio" },
    ],
  },
  {
    label: "Get to know us",
    links: [
      { label: "Selected work", to: "/work" },
      { label: "Client reviews", to: "/resources/reviews" },
      { label: "Meet the Pals", to: "/meet-the-pals" },
      { label: "About Palmer House", to: "/about-us" },
      { label: "Guides & answers", to: "/production-guide" },
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
  phone: "425-473-0349",
  phoneHref: "tel:+14254730349",
};
