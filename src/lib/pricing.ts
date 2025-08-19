// Master Pricing Structure - Updated for 2024 Video Production Services
// Aligned with the Master Pricing Document for SEO optimization and clarity

export const PRICING = {
  // ========== MONTHLY RETAINER PACKAGE ==========
  MONTHLY_RETAINER: {
    name: "Content Systems Retainer",
    priceRange: "$5,000 - $15,000/month",
    basePrice: "$5,000",
    idealFor: "Businesses needing consistent video output for social, campaigns, and internal use",
    deliverables: [
      "8–20 short-form videos per month (60 sec or less)",
      "2–4 long-form videos (2–5 minutes)",
      "Monthly strategy + content planning session", 
      "Half- to full-day filming (on-site or studio)",
      "Editing, color correction, basic graphics",
      "Monthly performance review & adjustments"
    ],
    addOns: [
      { name: "Extra videos", price: "$500–$1,500 each" },
      { name: "Expedited delivery", price: "+20%" },
      { name: "Additional shoot days", price: "$2,000/day" },
      { name: "Animation or advanced motion graphics", price: "$500–$1,500/video" },
      { name: "Livestream support", price: "$2,000–$4,000/event" }
    ],
    minimumTerm: "3-month minimum",
    route: "/contact?service=monthly-retainer"
  },

  // ========== ONE-TIME PROJECT PACKAGES ==========
  // A. Brand & Storytelling Packages
  BRAND_STORYTELLING: {
    "BRAND_STORY": {
      name: "Brand Story Video",
      priceRange: "$5,000 - $10,000", 
      description: "Showcase values, mission, and people behind the brand",
      deliverables: ["Brand narrative video (2-3 minutes)", "Behind-the-scenes content", "Team introduction segments"],
      timeline: "2-3 weeks",
      route: "/packages/brand/brand-story"
    },
    "DOCUMENTARY_STYLE": {
      name: "Documentary-Style Package",
      priceRange: "$10,000 - $20,000",
      description: "Long-form storytelling and impact features", 
      deliverables: ["15-20 minute documentary", "Multiple interview segments", "B-roll footage library"],
      timeline: "4-6 weeks",
      route: "/packages/brand/documentary"
    },
    "TESTIMONIAL_PACKAGE": {
      name: "Testimonial Video Package",
      priceRange: "$3,500 - $6,500",
      description: "Customer success stories, credibility builders",
      deliverables: ["3-5 customer testimonials", "Case study videos", "Social media cuts"],
      timeline: "2-3 weeks", 
      route: "/packages/brand/testimonials"
    }
  },

  // B. Product & Sales Packages
  PRODUCT_SALES: {
    "PRODUCT_HIGHLIGHT": {
      name: "Product Highlight Package",
      priceRange: "$4,000 - $8,000",
      description: "Feature product launches, benefits, and demos",
      deliverables: ["Product demo video", "Feature highlight reels", "Comparison videos"],
      timeline: "2-3 weeks",
      route: "/packages/product/highlights"
    },
    "ECOMMERCE_UNBOXING": {
      name: "E-Commerce Unboxing Package", 
      priceRange: "$5,000 - $8,000",
      description: "Showcase packaging, product features, excitement factor",
      deliverables: ["Unboxing experience video", "Product feature highlights", "Social media versions"],
      timeline: "1-2 weeks",
      route: "/packages/product/unboxing"
    },
    "FAQ_PACKAGE": {
      name: "FAQ Video Package",
      priceRange: "$3,000 - $5,000", 
      description: "Answer customer questions, reduce support tickets",
      deliverables: ["10-15 FAQ videos", "Knowledge base integration", "Support documentation"],
      timeline: "2-3 weeks",
      route: "/packages/product/faq"
    },
    "CUSTOMER_ONBOARDING": {
      name: "Customer Onboarding Videos",
      priceRange: "$5,000 - $10,000",
      description: "Walkthroughs and training for SaaS & services", 
      deliverables: ["User onboarding series", "Feature tutorials", "Getting started guides"],
      timeline: "3-4 weeks",
      route: "/packages/product/onboarding"
    }
  },

  // C. Events & Experiences  
  EVENTS_EXPERIENCES: {
    "EVENT_COVERAGE": {
      name: "Event Coverage Package",
      priceRange: "$5,000 - $9,000",
      description: "Capture conferences, launches, and corporate events",
      deliverables: ["Full event documentation", "Highlight reel", "Speaker presentations"],
      timeline: "1-2 weeks post-event",
      route: "/packages/events/coverage"
    },
    "LIVE_EVENT_STREAMING": {
      name: "Live Event Streaming",
      priceRange: "$5,000 - $10,000", 
      description: "Multi-camera, live broadcast production",
      deliverables: ["Live streaming setup", "Multi-camera production", "Recording for later use"],
      timeline: "Event day + setup",
      route: "/packages/events/streaming"
    },
    "EVENT_HIGHLIGHT": {
      name: "Event Highlight Capsule",
      priceRange: "$3,000 - $6,000",
      description: "One-off event highlight reel",
      deliverables: ["Event highlight video", "Social media cuts", "Thank you video"],
      timeline: "1 week post-event", 
      route: "/packages/events/highlights"
    }
  },

  // D. Industry-Specific Packages
  INDUSTRY_SPECIFIC: {
    "REAL_ESTATE": {
      name: "Real Estate Branding Package",
      priceRange: "$5,000 - $10,000",
      description: "Property tours, agent branding, market updates",
      deliverables: ["Property showcase videos", "Agent introduction", "Market update series"],
      timeline: "2-3 weeks",
      route: "/packages/industry/real-estate"
    },
    "HOSPITALITY": {
      name: "Hospitality Experience Package", 
      priceRange: "$8,000 - $15,000",
      description: "Hotels, resorts, spas showcasing",
      deliverables: ["Property tour videos", "Experience highlights", "Guest testimonials"],
      timeline: "3-4 weeks",
      route: "/packages/industry/hospitality"
    },
    "FOOD_BEVERAGE": {
      name: "Food & Beverage Showcase",
      priceRange: "$4,000 - $8,000",
      description: "Restaurants, cafes, and bars",
      deliverables: ["Menu showcase videos", "Chef interviews", "Behind-the-scenes kitchen"],
      timeline: "2-3 weeks", 
      route: "/packages/industry/food-beverage"
    },
    "TRAVEL_TOURISM": {
      name: "Travel & Tourism Package",
      priceRange: "$6,000 - $12,000",
      description: "Destination marketing and tourism boards",
      deliverables: ["Destination showcase", "Activity highlights", "Visitor testimonials"],
      timeline: "3-5 weeks",
      route: "/packages/industry/travel-tourism"
    },
    "FASHION_LOOKBOOK": {
      name: "Fashion Lookbook Package", 
      priceRange: "$6,000 - $12,000",
      description: "Collections, seasonal drops, and designer reels",
      deliverables: ["Lookbook videos", "Designer interviews", "Collection showcases"],
      timeline: "2-4 weeks",
      route: "/packages/industry/fashion"
    },
    "SPORTS_RECREATION": {
      name: "Sports & Recreation Package",
      priceRange: "$5,000 - $10,000",
      description: "Teams, gyms, lifestyle brands", 
      deliverables: ["Training videos", "Team highlights", "Facility tours"],
      timeline: "2-3 weeks",
      route: "/packages/industry/sports"
    },
    "NONPROFIT_IMPACT": {
      name: "Non-Profit Impact Package",
      priceRange: "$4,000 - $7,000", 
      description: "Mission-driven storytelling for fundraising",
      deliverables: ["Impact story videos", "Donor testimonials", "Mission statements"],
      timeline: "3-4 weeks",
      route: "/packages/industry/nonprofit"
    },
    "CORPORATE_COMMUNICATIONS": {
      name: "Corporate Communications Package",
      priceRange: "$6,000 - $12,000",
      description: "Internal comms, leadership updates, HR videos",
      deliverables: ["Leadership messages", "Internal communications", "HR training videos"],
      timeline: "2-4 weeks",
      route: "/packages/industry/corporate"
    },
    "LEGAL_ADVISORY": {
      name: "Legal Advisory Package",
      priceRange: "$5,000 - $9,000",
      description: "Explainers, client education, and trust-building content", 
      deliverables: ["Legal explainer videos", "Client education series", "Trust-building content"],
      timeline: "3-4 weeks",
      route: "/packages/industry/legal"
    },
    "AUTOMOTIVE_SHOWCASE": {
      name: "Automotive Showcase Package",
      priceRange: "$6,000 - $12,000",
      description: "Dealerships, launches, custom builds",
      deliverables: ["Vehicle showcase videos", "Feature highlights", "Customer testimonials"], 
      timeline: "2-3 weeks",
      route: "/packages/industry/automotive"
    },
    "TECH_INNOVATION": {
      name: "Tech & Innovation Package",
      priceRange: "$7,000 - $15,000",
      description: "Product demos, innovation showcases",
      deliverables: ["Product demo videos", "Innovation showcases", "Technical explainers"],
      timeline: "3-5 weeks",
      route: "/packages/industry/tech"
    }
  },

  // E. Social & Community Content
  SOCIAL_COMMUNITY: {
    "MONTHLY_VLOG": {
      name: "Monthly Vlog Package", 
      priceRange: "$3,000 - $6,000",
      description: "Behind-the-scenes, updates, personal branding",
      deliverables: ["Monthly vlog series", "Behind-the-scenes content", "Personal brand videos"],
      timeline: "Ongoing monthly",
      route: "/packages/social/monthly-vlog"
    },
    "WEEKLY_NEWS": {
      name: "Weekly News Roundup",
      priceRange: "$4,000 - $8,000", 
      description: "Regular thought leadership content",
      deliverables: ["Weekly news videos", "Industry insights", "Thought leadership content"],
      timeline: "Ongoing weekly",
      route: "/packages/social/weekly-news"
    },
    "PODCAST_VIDEO": {
      name: "Podcast Video Package",
      priceRange: "$8,000 - $15,000",
      description: "Multi-camera podcast production + clips",
      deliverables: ["Full podcast episodes", "Highlight clips", "Social media cuts"],
      timeline: "Ongoing series", 
      route: "/packages/social/podcast"
    },
    "FITNESS_WELLNESS": {
      name: "Fitness & Wellness Package",
      priceRange: "$4,000 - $8,000",
      description: "Instructors, gyms, yoga, health brands",
      deliverables: ["Workout videos", "Wellness content", "Instructor highlights"],
      timeline: "2-3 weeks",
      route: "/packages/social/fitness"
    }
  },

  // F. Creative & Animation
  CREATIVE_ANIMATION: {
    "ANIMATION_PACKAGE": {
      name: "Animation Package",
      priceRange: "$5,000 - $10,000",
      description: "2D explainer animations monthly",
      deliverables: ["2D animated videos", "Explainer animations", "Motion graphics"],
      timeline: "3-4 weeks", 
      route: "/packages/creative/animation"
    },
    "MOTION_GRAPHICS_ADDON": {
      name: "Advanced Motion Graphics Add-On",
      priceRange: "$500 - $1,500/video",
      description: "Enhanced motion graphics for existing videos",
      deliverables: ["Custom motion graphics", "Animated elements", "Brand integration"],
      timeline: "1-2 weeks per video",
      route: "/packages/creative/motion-graphics"
    }
  },

  // ========== LEGACY PACKAGES (for compatibility) ==========
  DIY_DOWNLOADS: {
    "25_REELS": { 
      price: "$47", 
      name: "25 DIY Reels You Can Film From Home",
      format: "PDF + sample scripts",
      description: "Talking-head style reels for solo founders, coaches, and service providers who want fast content ideas. Platform breakdowns included.",
      paymentUrl: "https://payhip.com/b/u8wvz",
      route: "/packages/diy/reels"
    },
    "STRATEGY_BLUEPRINT": { 
      price: "$19", 
      name: "The Video Strategy Blueprint",
      format: "PDF",
      description: "A step-by-step guide to choosing the right videos for your brand's growth stage and audience behavior.",
      paymentUrl: "https://payhip.com/b/nIagA",
      route: "/packages/diy/strategy"
    },
    "SCRIPT_BUNDLE": { 
      price: "$47", 
      name: "Owner/Founder Script Bundle",
      format: "PDF",
      description: "Prewritten, plug-and-play scripts for: About Me, Social Proof, CTA, and FAQ videos.",
      paymentUrl: "https://payhip.com/b/jxGKl", 
      route: "/packages/diy/scripts"
    }
  },

  // Legacy compatibility - keeping old structure for existing components
  BUSINESS_VIDEO_ASSETS: {
    INTERNAL_ASSETS: { 
      price: "$4,500", 
      name: "Internal Business Video Assets",
      videos: "15 videos @ 1–2 min",
      categories: [
        "Onboarding & Training (new hire orientation, role-specific tutorials)",
        "Software Walkthroughs (step-by-step demos)",
        "Process & Policy Explainers (turn SOPs into video)",
        "Culture & Retention (leadership messages, recognition)"
      ],
      style: "Cinematic, repeatable videos for internal use",
      spotsAvailable: 4,
      maxSpots: 6,
      urgency: "Only 4 spots available this month"
    },
    EXTERNAL_ASSETS: { 
      price: "$4,500", 
      name: "External Business Video Assets",
      videos: "15 videos @ 1–2 min",
      categories: [
        "Customer FAQ Libraries (billing, service steps, expectations)",
        "Product/Service Explainers (clear and concise)",
        "Testimonial Capsules & Case Studies (build credibility)",
        "Behind-the-Scenes & Culture Stories (show how you work)",
        "Recruitment Videos (attract top talent)"
      ],
      delivery: "Delivered with thumbnails + captioned for posting",
      spotsAvailable: 5,
      maxSpots: 6,
      urgency: "Only 5 spots available this month"
    },
    ADVANCED_ASSETS: { 
      price: "$10,000+", 
      name: "Business Video Assets (Advanced/Safety & Compliance)",
      videos: "8–10 videos @ up to 5 min",
      categories: [
        "Safety & Compliance Training (manufacturing, healthcare, construction)",
        "Sales Training (pitch processes, objection handling)",
        "Advanced Software Walkthroughs (complex systems)",
        "Regulatory Compliance (industry-specific requirements)"
      ],
      style: "Extended format for complex processes and compliance needs",
      spotsAvailable: 2,
      maxSpots: 4,
      urgency: "Only 2 spots available this quarter"
    }
  },

  // Legacy compatibility - keeping old structure for existing components
  OTHER_BUNDLES: {
    YOUTUBE_ENGINE: { 
      price: "$6,500", 
      name: "YouTube Visibility Engine",
      videos: "3 long-form videos (8–10 minutes each)",
      includes: ["Content strategy + video series plan", "Full scripting + outline development", "On-set teleprompter support", "Cinematic delivery + YouTube pacing edits", "Thumbnails, SEO titles, descriptions"],
      spotsAvailable: 2,
      maxSpots: 4,
      urgency: "Only 2 spots available this quarter"
    },
    SEVEN_DAY_LAUNCH: { 
      price: "$2,500", 
      name: "The 7-Day Launch",
      sessions: "1 strategy session + 1 shoot day",
      delivery: ["1 hero brand video (90–120 seconds)", "3–5 cutdowns for social"],
      timeline: "Fast-turnaround edit timeline (7 business days)",
      spotsAvailable: 8,
      maxSpots: 12,
      urgency: "8 spots available this month"
    },
    THIRTY_REELS: { 
      price: "$4,800", 
      name: "30 Reels in 30 Days",
      shoot: "1 full-day shoot (up to 8 hours)",
      videos: "30 social-ready vertical videos (15–30 seconds each)",
      includes: "Captions + formatting for IG/LinkedIn/TikTok",
      spotsAvailable: 3,
      maxSpots: 5,
      urgency: "Only 3 spots available this month"
    },
    FOUNDER_BRAND_KIT: { 
      price: "$6,000", 
      name: "The Founder's Brand Kit",
      shoot: "1 shoot day with personal brand strategy",
      includes: ["Founder Bio Video (90–120 sec)", "2 Hook/Top-of-Funnel Videos", "Vibe Montage or Personal Style Sizzle", "Multi-Platform delivery + thumbnails"],
      spotsAvailable: 4,
      maxSpots: 6,
      urgency: "Only 4 spots available this month"
    },
    STARTER_SESSION: { 
      price: "$500", 
      name: "The Starter Session",
      session: "30-minute filming session",
      minimum: "3 edited one-minute videos",
      style: "Simple talking-head delivery, no stylized editing",
      spotsAvailable: 2,
      maxSpots: 6,
      urgency: "Only 2 spots left this month"
    }
  },

  // ========== BONUS PACK ==========
  BONUS_PACK: {
    name: "The Business Bonus Pack",
    totalValue: "$410",
    qualifies: ["Any package $4,500+"],
    items: [
      { item: "25 DIY Reels PDF + script pack", value: "$47" },
      { item: "The Video Strategy Blueprint", value: "$19" },
      { item: "Owner/Founder Script Bundle", value: "$47" },
      { item: "Personalized Script Feedback (1x)", value: "$97" },
      { item: "On-Camera Coaching Session (1x)", value: "$200" }
    ]
  }
} as const;

// ========== PRICING CATEGORIES FOR NAVIGATION ==========
export const PRICING_CATEGORIES = [
  {
    id: "brand-storytelling",
    name: "Brand & Storytelling",
    description: "Showcase your values, mission, and brand story",
    icon: "🎬",
    priceRange: "$3,500 - $20,000", 
    packages: Object.keys(PRICING.BRAND_STORYTELLING),
    route: "/packages/brand",
    featured: true
  },
  {
    id: "product-sales", 
    name: "Product & Sales",
    description: "Highlight products, demos, and sales enablement",
    icon: "📦",
    priceRange: "$3,000 - $10,000",
    packages: Object.keys(PRICING.PRODUCT_SALES), 
    route: "/packages/product",
    featured: true
  },
  {
    id: "events-experiences",
    name: "Events & Experiences", 
    description: "Capture and stream your important events",
    icon: "🎪",
    priceRange: "$3,000 - $10,000",
    packages: Object.keys(PRICING.EVENTS_EXPERIENCES),
    route: "/packages/events",
    featured: false
  },
  {
    id: "industry-specific",
    name: "Industry Solutions",
    description: "Specialized packages for specific industries", 
    icon: "🏢",
    priceRange: "$4,000 - $15,000",
    packages: Object.keys(PRICING.INDUSTRY_SPECIFIC),
    route: "/packages/industry",
    featured: true
  },
  {
    id: "social-community",
    name: "Social & Community",
    description: "Build community with regular content", 
    icon: "👥",
    priceRange: "$3,000 - $15,000",
    packages: Object.keys(PRICING.SOCIAL_COMMUNITY),
    route: "/packages/social",
    featured: false
  },
  {
    id: "creative-animation",
    name: "Creative & Animation",
    description: "Motion graphics and animated content",
    icon: "✨", 
    priceRange: "$500 - $10,000",
    packages: Object.keys(PRICING.CREATIVE_ANIMATION),
    route: "/packages/creative",
    featured: false
  }
] as const;

// ========== HELPER FUNCTIONS ==========
export const getPackagesByCategory = (categoryId: string) => {
  switch (categoryId) {
    case "brand-storytelling":
      return PRICING.BRAND_STORYTELLING;
    case "product-sales":
      return PRICING.PRODUCT_SALES;
    case "events-experiences": 
      return PRICING.EVENTS_EXPERIENCES;
    case "industry-specific":
      return PRICING.INDUSTRY_SPECIFIC;
    case "social-community":
      return PRICING.SOCIAL_COMMUNITY;
    case "creative-animation":
      return PRICING.CREATIVE_ANIMATION;
    default:
      return {};
  }
};

export const getFeaturedPackages = () => {
  return PRICING_CATEGORIES.filter(cat => cat.featured);
};

export const getAllPackages = () => {
  return [
    ...Object.values(PRICING.BRAND_STORYTELLING),
    ...Object.values(PRICING.PRODUCT_SALES), 
    ...Object.values(PRICING.EVENTS_EXPERIENCES),
    ...Object.values(PRICING.INDUSTRY_SPECIFIC),
    ...Object.values(PRICING.SOCIAL_COMMUNITY),
    ...Object.values(PRICING.CREATIVE_ANIMATION)
  ];
};

export const getRecommendationForUseCase = (useCase: string): string => {
  switch (useCase) {
    case "team-training":
    case "onboarding":
      return "Customer Onboarding Videos";
    case "customer-education":
    case "education":
      return "FAQ Video Package";
    case "authority":
      return "Podcast Video Package"; 
    case "social-growth":
    case "marketing":
      return "Monthly Vlog Package";
    case "brand-story":
      return "Brand Story Video";
    default:
      return "Brand Story Video";
  }
};

export const getServiceForPersonality = (personality: string): { service: string; reason: string } => {
  switch (personality) {
    case "quiet-visionary":
      return { 
        service: "Customer Onboarding Videos", 
        reason: "Perfect for systematic communication and education" 
      };
    case "high-energy-leader":
      return { 
        service: "Monthly Vlog Package", 
        reason: "Ideal for regular, dynamic content creation" 
      };
    case "natural-teacher":
      return { 
        service: "FAQ Video Package", 
        reason: "Great for educational content and answering questions" 
      };
    case "empathic-guide":
      return { 
        service: "Testimonial Video Package", 
        reason: "Perfect for building trust through customer stories" 
      };
    default:
      return { 
        service: "Brand Story Video", 
        reason: "A great starting point for most businesses" 
      };
  }
};

export const getBonusPackEligibility = (packagePrice: number): boolean => {
  return packagePrice >= 4500;
};