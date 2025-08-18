export const PRICING = {
  // 1. Instant Digital Downloads (DIY Starters)
  DIY_DOWNLOADS: {
    "25_REELS": { 
      price: "$47", 
      name: "25 DIY Reels You Can Film From Home",
      format: "PDF + sample scripts",
      description: "Talking-head style reels for solo founders, coaches, and service providers who want fast content ideas. Platform breakdowns included.",
      paymentUrl: "https://payhip.com/b/u8wvz"
    },
    "STRATEGY_BLUEPRINT": { 
      price: "$19", 
      name: "The Video Strategy Blueprint",
      format: "PDF",
      description: "A step-by-step guide to choosing the right videos for your brand's growth stage and audience behavior.",
      paymentUrl: "https://payhip.com/b/nIagA"
    },
    "SCRIPT_BUNDLE": { 
      price: "$47", 
      name: "Owner/Founder Script Bundle",
      format: "PDF",
      description: "Prewritten, plug-and-play scripts for: About Me, Social Proof, CTA, and FAQ videos.",
      paymentUrl: "https://payhip.com/b/jxGKl"
    }
  },

  // 2. Business Video Assets
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

  // 3. Other Video Bundles
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

  // 3. Built-In Bonus Bundle
  BONUS_PACK: {
    name: "The Business Bonus Pack",
    totalValue: "$410",
    qualifies: ["Any Business Video Assets Package $4,500+"],
    items: [
      { item: "25 DIY Reels PDF + script pack", value: "$47" },
      { item: "The Video Strategy Blueprint", value: "$19" },
      { item: "Owner/Founder Script Bundle", value: "$47" },
      { item: "Personalized Script Feedback (1x)", value: "$97" },
      { item: "On-Camera Coaching Session (1x)", value: "$200" }
    ]
  },

} as const;

// Helper functions for new pricing structure
export const getRecommendationForUseCase = (useCase: string): string => {
  switch (useCase) {
    case "team-training":
    case "onboarding":
      return `${PRICING.BUSINESS_VIDEO_ASSETS.INTERNAL_ASSETS.name} or ${PRICING.BUSINESS_VIDEO_ASSETS.ADVANCED_ASSETS.name}`;
    case "customer-education":
    case "education":
      return `${PRICING.BUSINESS_VIDEO_ASSETS.EXTERNAL_ASSETS.name}`;
    case "authority":
      return `${PRICING.OTHER_BUNDLES.YOUTUBE_ENGINE.name}`;
    case "social-growth":
    case "marketing":
      return `${PRICING.OTHER_BUNDLES.THIRTY_REELS.name}`;
    case "quick-start":
      return `${PRICING.OTHER_BUNDLES.SEVEN_DAY_LAUNCH.name} or ${PRICING.OTHER_BUNDLES.STARTER_SESSION.name}`;
    default:
      return `${PRICING.OTHER_BUNDLES.STARTER_SESSION.name} or ${PRICING.BUSINESS_VIDEO_ASSETS.INTERNAL_ASSETS.name}`;
  }
};

export const getServiceForPersonality = (personality: string): { service: string; reason: string } => {
  switch (personality) {
    case "quiet-visionary":
      return { 
        service: PRICING.BUSINESS_VIDEO_ASSETS.INTERNAL_ASSETS.name, 
        reason: "Perfect for systematic internal communication and training" 
      };
    case "high-energy-leader":
      return { 
        service: PRICING.OTHER_BUNDLES.THIRTY_REELS.name, 
        reason: "Ideal for high-volume content creation and dynamic presence" 
      };
    case "natural-teacher":
      return { 
        service: PRICING.BUSINESS_VIDEO_ASSETS.EXTERNAL_ASSETS.name, 
        reason: "Great for educational content and answering customer questions" 
      };
    case "empathic-guide":
      return { 
        service: PRICING.BUSINESS_VIDEO_ASSETS.EXTERNAL_ASSETS.name, 
        reason: "Perfect for testimonial content and customer trust-building" 
      };
    default:
      return { 
        service: PRICING.OTHER_BUNDLES.STARTER_SESSION.name, 
        reason: "A great starting point for most founders" 
      };
  }
};

export const getBonusPackEligibility = (selectedService: string): boolean => {
  const qualifyingServices = [
    "Internal Business Video Assets",
    "External Business Video Assets", 
    "Business Video Assets (Advanced/Safety & Compliance)",
    "YouTube Visibility Engine",
    "30 Reels in 30 Days",
    "The Founder's Brand Kit"
  ];
  return qualifyingServices.includes(selectedService);
};