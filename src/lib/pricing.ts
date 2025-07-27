export const PRICING = {
  // DIY Resources - Standardized to $199
  DIY_RESOURCES: {
    displayPrice: "$199",
    description: "DIY Resources starting at",
    individual: {
      "25_REELS": { price: "$47", name: "25 DIY Reels PDF + script pack" },
      "STRATEGY_BLUEPRINT": { price: "$19", name: "The Video Strategy Blueprint" },
      "SCRIPT_BUNDLE": { price: "$67", name: "Owner/Founder Script Bundle" },
      "CONFIDENCE_COURSE": { price: "$99", name: "On-Camera Confidence Mini Course" }
    }
  },
  
  // Monthly Tiers
  MONTHLY_TIERS: {
    TRAILHEAD: { 
      price: 1500, 
      displayPrice: "$1,500/month",
      name: "Trailhead",
      description: "Perfect for social media growth and lead generation"
    },
    BASECAMP: { 
      price: 3500, 
      displayPrice: "$3,500/month",
      name: "Basecamp", 
      description: "Ideal for customer education and multi-platform campaigns"
    },
    SUMMIT: { 
      price: 7500, 
      displayPrice: "$7,500/month",
      name: "Summit",
      description: "Advanced team training and authority building"
    },
    PINNACLE: { 
      price: 20000, 
      displayPrice: "$20,000/month",
      name: "Pinnacle",
      description: "Enterprise-level video solutions"
    }
  },
  
  // One-time Services
  ONE_TIME: {
    COACHING: { price: 2000, displayPrice: "$2,000", name: "Camera-Ready Brand Coaching" },
    MONTHLY_CONTENT: { price: 3000, displayPrice: "$3,000/month", name: "Social Authority Kit" }
  },
  
  // Bundles
  BUNDLES: {
    FAQ_INTERNAL: { price: 4500, displayPrice: "$4,500", name: "Internal FAQ Buildout" },
    FAQ_EXTERNAL: { price: 4500, displayPrice: "$4,500", name: "External FAQ Buildout" },
    YOUTUBE_ENGINE: { price: 6500, displayPrice: "$6,500", name: "YouTube Visibility Engine" },
    SEVEN_DAY_LAUNCH: { price: 2500, displayPrice: "$2,500", name: "The 7-Day Launch" },
    THIRTY_REELS: { price: 4800, displayPrice: "$4,800", name: "30 Reels in 30 Days" },
    FOUNDER_BRAND_KIT: { price: 6000, displayPrice: "$6,000", name: "The Founder's Brand Kit" },
    STARTER_SESSION: { price: 500, displayPrice: "$500", name: "The Starter Session" }
  }
} as const;

// Helper functions for recommendations
export const getRecommendationForUseCase = (useCase: string): string => {
  switch (useCase) {
    case "team-training":
    case "authority":
      return `${PRICING.MONTHLY_TIERS.SUMMIT.name} or ${PRICING.MONTHLY_TIERS.PINNACLE.name} tier`;
    case "social-growth":
    case "marketing":
      return `${PRICING.MONTHLY_TIERS.TRAILHEAD.name} or ${PRICING.MONTHLY_TIERS.BASECAMP.name} tier`;
    case "education":
      return `${PRICING.MONTHLY_TIERS.BASECAMP.name} or ${PRICING.MONTHLY_TIERS.SUMMIT.name} tier`;
    default:
      return `${PRICING.MONTHLY_TIERS.TRAILHEAD.name} tier`;
  }
};

export const getTierForPersonality = (personality: string): { tier: string; reason: string } => {
  switch (personality) {
    case "quiet-visionary":
      return { 
        tier: PRICING.MONTHLY_TIERS.TRAILHEAD.name, 
        reason: "Perfect for voiceover-focused content" 
      };
    case "high-energy-leader":
      return { 
        tier: PRICING.MONTHLY_TIERS.SUMMIT.name, 
        reason: "Ideal for walk-and-talk and behind-scenes content" 
      };
    case "natural-teacher":
      return { 
        tier: PRICING.MONTHLY_TIERS.BASECAMP.name, 
        reason: "Great for educational content with coaching support" 
      };
    case "empathic-guide":
      return { 
        tier: PRICING.MONTHLY_TIERS.PINNACLE.name, 
        reason: "Perfect for story-driven and testimonial content" 
      };
    default:
      return { 
        tier: PRICING.MONTHLY_TIERS.TRAILHEAD.name, 
        reason: "A great starting point for most founders" 
      };
  }
};