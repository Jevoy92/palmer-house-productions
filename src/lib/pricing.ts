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

  // 2. Group Coaching
  GROUP_COACHING: {
    CAMERA_READY_BRAND: {
      price: "$2,000",
      displayPrice: "$2,000",
      name: "The Camera-Ready Brand",
      duration: "6 weeks",
      format: "Weekly Zoom sessions (live)",
      maxSeats: "8–10 founders per cohort",
      spotsAvailable: 6,
      maxSpots: 10,
      includes: ["Assignments", "Feedback", "Private Circle group"],
      outcome: "Confidence + skill to record your first 3–5 brand videos yourself",
      commitment: "One-time",
      urgency: "Next cohort starts in 3 weeks"
    }
  },

  // 3. Monthly Content System
  MONTHLY_CONTENT: {
    SOCIAL_AUTHORITY_KIT: {
      price: "$3,000",
      displayPrice: "$3,000/month",
      name: "The Social Authority Kit",
      commitment: "3-month minimum",
      spotsAvailable: 3,
      maxSpots: 8,
      monthlyDelivery: {
        heroVideo: "1 Hero/Founder video (90–120 seconds)",
        socialReels: "6 Social Reels (30–45 seconds each)",
        clientVoice: "1 Client Voice/Social Proof video (60–90 seconds)",
        extras: "Captions + Thumbnails (Platform-optimized)"
      },
      urgency: "Only 3 spots available this quarter"
    }
  },

  // 4. One-Time Problem-Solving Bundles
  ONE_TIME_BUNDLES: {
    INTERNAL_FAQ: { 
      price: "$4,500", 
      name: "Internal FAQ Buildout",
      videos: "Up to 15 short videos (60–90 seconds each)",
      covers: ["HR onboarding", "hiring answers", "internal processes", "company explainer", "software tutorials"],
      style: "Clean talking-head style (no heavy stylizing)",
      spotsAvailable: 4,
      maxSpots: 6,
      urgency: "Only 4 spots available this month"
    },
    EXTERNAL_FAQ: { 
      price: "$4,500", 
      name: "External FAQ Buildout",
      videos: "Up to 15 short videos (60–90 seconds each)",
      covers: ["Customer onboarding", "top objections", "service breakdowns", "pricing explanations"],
      delivery: "Delivered with thumbnails + captioned for posting",
      spotsAvailable: 5,
      maxSpots: 6,
      urgency: "Only 5 spots available this month"
    },
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

  // 5. Built-In Bonus Bundle
  BONUS_PACK: {
    name: "The Business Bonus Pack",
    totalValue: "$410",
    qualifies: ["Monthly Social Authority Kit", "Any One-Time Bundle $4,500+"],
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
    case "authority":
      return `${PRICING.ONE_TIME_BUNDLES.YOUTUBE_ENGINE.name} or ${PRICING.MONTHLY_CONTENT.SOCIAL_AUTHORITY_KIT.name}`;
    case "social-growth":
    case "marketing":
      return `${PRICING.ONE_TIME_BUNDLES.THIRTY_REELS.name} or ${PRICING.MONTHLY_CONTENT.SOCIAL_AUTHORITY_KIT.name}`;
    case "education":
      return `${PRICING.ONE_TIME_BUNDLES.EXTERNAL_FAQ.name} or ${PRICING.GROUP_COACHING.CAMERA_READY_BRAND.name}`;
    case "onboarding":
      return `${PRICING.ONE_TIME_BUNDLES.INTERNAL_FAQ.name}`;
    case "quick-start":
      return `${PRICING.ONE_TIME_BUNDLES.SEVEN_DAY_LAUNCH.name} or ${PRICING.ONE_TIME_BUNDLES.STARTER_SESSION.name}`;
    default:
      return `${PRICING.ONE_TIME_BUNDLES.STARTER_SESSION.name} or ${PRICING.GROUP_COACHING.CAMERA_READY_BRAND.name}`;
  }
};

export const getServiceForPersonality = (personality: string): { service: string; reason: string } => {
  switch (personality) {
    case "quiet-visionary":
      return { 
        service: PRICING.GROUP_COACHING.CAMERA_READY_BRAND.name, 
        reason: "Perfect for building confidence and voice-over focused content" 
      };
    case "high-energy-leader":
      return { 
        service: PRICING.ONE_TIME_BUNDLES.THIRTY_REELS.name, 
        reason: "Ideal for high-volume content creation and dynamic presence" 
      };
    case "natural-teacher":
      return { 
        service: PRICING.ONE_TIME_BUNDLES.EXTERNAL_FAQ.name, 
        reason: "Great for educational content and answering customer questions" 
      };
    case "empathic-guide":
      return { 
        service: PRICING.MONTHLY_CONTENT.SOCIAL_AUTHORITY_KIT.name, 
        reason: "Perfect for consistent story-driven and testimonial content" 
      };
    default:
      return { 
        service: PRICING.ONE_TIME_BUNDLES.STARTER_SESSION.name, 
        reason: "A great starting point for most founders" 
      };
  }
};

export const getBonusPackEligibility = (selectedService: string): boolean => {
  const qualifyingServices = [
    "The Social Authority Kit",
    "Internal FAQ Buildout", 
    "External FAQ Buildout",
    "YouTube Visibility Engine",
    "30 Reels in 30 Days",
    "The Founder's Brand Kit"
  ];
  return qualifyingServices.includes(selectedService);
};