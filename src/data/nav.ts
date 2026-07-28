export type NavLink = { label: string; to: string };
export type NavGroup = { label: string; links: NavLink[] };

export const navGroups: NavGroup[] = [
  {
    label: "Services",
    links: [
      { label: "Video Production", to: "/services/video-production" },
      { label: "Post-Production", to: "/services/post-production" },
      { label: "Consulting & Strategy", to: "/content-strategy" },
    ],
  },
  {
    label: "Industries",
    links: [
      { label: "Healthcare", to: "/industries/healthcare" },
      { label: "Manufacturing", to: "/industries/manufacturing" },
      { label: "Professional Services", to: "/industries/professional-services" },
      { label: "Technology", to: "/industries/technology" },
      { label: "Education", to: "/industries/education" },
      { label: "Government", to: "/industries/government" },
      { label: "Startups", to: "/startups" },
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
      { label: "Downloads & Templates", to: "/services/diy-downloads" },
      { label: "Production Guide", to: "/production-guide" },
      { label: "Video System Assessment", to: "/video-system-assessment" },
      { label: "Free Webinar", to: "/webinar" },
    ],
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
