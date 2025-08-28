import reelPalImage from '@/assets/pals/reel-pal.png';
import systemPalImage from '@/assets/pals/system-pal.png';
import evergreenPalImage from '@/assets/pals/evergreen-pal.png';
import spotlightPalImage from '@/assets/pals/spotlight-pal.png';

export interface Pal {
  id: string;
  name: string;
  tagline: string;
  quote: string;
  description: string;
  personality: string[];
  communication: string[];
  strengths: string[];
  services: string[];
  packages: string[];
  perfectFor: string[];
  ctaText: string;
  ctaUrl: string;
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
    bg: string;
    text: string;
  };
  image: string;
}

export const PALS_DATA: Pal[] = [
  {
    id: "reel-pal",
    name: "Reel Pal",
    tagline: "Your Social Media Video Expert",
    quote: "Let's make content that stops the scroll!",
    description: "I'm all about creating snappy, engaging content that captures attention in seconds. Whether it's trending sounds, quick tutorials, or behind-the-scenes glimpses, I help you connect with your audience where they spend most of their time - on their phones.",
    personality: [
      "Creative & energetic",
      "Trend-focused",
      "Quick & efficient",
      "Social media savvy"
    ],
    communication: [
      "Uses current slang and trending phrases",
      "Speaks in quick, punchy sentences",
      "References popular culture and memes",
      "Emphasizes visual storytelling"
    ],
    strengths: [
      "Short-form content creation",
      "Social media optimization",
      "Quick turnaround times",
      "Trend awareness",
      "Platform-specific formatting",
      "Viral content strategies"
    ],
    services: [
      "Social media video content",
      "Reels and TikToks",
      "DIY video kits",
      "Starter video sessions",
      "Content calendar planning",
      "Trend analysis"
    ],
    packages: [
      "Starter Session ($497)",
      "Social Media Package ($1,497/month)",
      "DIY Video Kit ($197)"
    ],
    perfectFor: [
      "Small businesses wanting social presence",
      "Content creators needing consistency",
      "Brands targeting younger demographics",
      "Quick-turnaround projects",
      "Budget-conscious clients"
    ],
    ctaText: "Start Creating",
    ctaUrl: "/video-packages",
    colorScheme: {
      primary: "hsl(var(--social-yellow))",
      secondary: "hsl(var(--social-orange))",
      accent: "hsl(45 100% 50%)",
      bg: "hsl(45 100% 97%)",
      text: "hsl(var(--corporate-dark))"
    },
    image: reelPalImage
  },
  {
    id: "system-pal",
    name: "System Pal",
    tagline: "Your Business Systems Video Expert",
    quote: "Let's build systems that scale your success.",
    description: "I'm the organized one who turns your chaotic processes into streamlined video systems. From employee onboarding to customer education, I create structured content that saves time, reduces confusion, and scales your business operations.",
    personality: [
      "Organized & systematic",
      "Process-oriented",
      "Detail-focused",
      "Efficiency-driven"
    ],
    communication: [
      "Uses clear, step-by-step language",
      "Focuses on organization and structure",
      "Emphasizes efficiency and productivity",
      "Speaks in logical sequences"
    ],
    strengths: [
      "Process documentation",
      "Training video systems",
      "Workflow optimization",
      "Scalable solutions",
      "Knowledge management",
      "Systematic approach"
    ],
    services: [
      "Employee training videos",
      "Process documentation",
      "Onboarding systems",
      "FAQ video libraries",
      "Standard operating procedures",
      "Customer education content"
    ],
    packages: [
      "Training System Package ($2,997)",
      "Onboarding Solution ($1,997)",
      "Process Documentation ($897)"
    ],
    perfectFor: [
      "Growing companies with new hires",
      "Businesses with complex processes",
      "Teams needing standardization",
      "Remote work environments",
      "Customer support improvements"
    ],
    ctaText: "Streamline Now",
    ctaUrl: "/video-packages",
    colorScheme: {
      primary: "hsl(var(--social-cyan))",
      secondary: "hsl(var(--social-blue))",
      accent: "hsl(190 100% 40%)",
      bg: "hsl(190 100% 97%)",
      text: "hsl(var(--corporate-dark))"
    },
    image: systemPalImage
  },
  {
    id: "evergreen-pal",
    name: "Evergreen Pal",
    tagline: "Your Long-term Content Expert",
    quote: "Building your digital legacy, one video at a time.",
    description: "I think long-term and create content that compounds over time. Whether it's establishing thought leadership on YouTube or building an educational video library, I help you create valuable content that continues generating results for years.",
    personality: [
      "Strategic & thoughtful",
      "Long-term focused",
      "Educational mindset",
      "Authority builder"
    ],
    communication: [
      "Uses thoughtful, measured language",
      "Focuses on value and education",
      "Emphasizes long-term benefits",
      "Speaks with authority and expertise"
    ],
    strengths: [
      "Educational content creation",
      "SEO optimization",
      "Authority building",
      "Long-term strategy",
      "Thought leadership",
      "Content that ages well"
    ],
    services: [
      "YouTube channel development",
      "Educational video series",
      "Authority content",
      "Monthly content plans",
      "Thought leadership videos",
      "Evergreen tutorials"
    ],
    packages: [
      "YouTube Engine ($3,997/month)",
      "Authority Package ($2,497)",
      "Monthly Content Plan ($1,997/month)"
    ],
    perfectFor: [
      "Established professionals building authority",
      "Companies with expertise to share",
      "Long-term growth strategies",
      "Educational content needs",
      "Thought leadership goals"
    ],
    ctaText: "Build Authority",
    ctaUrl: "/video-packages",
    colorScheme: {
      primary: "hsl(var(--social-green))",
      secondary: "hsl(120 60% 50%)",
      accent: "hsl(140 60% 35%)",
      bg: "hsl(120 60% 97%)",
      text: "hsl(var(--corporate-dark))"
    },
    image: evergreenPalImage
  },
  {
    id: "spotlight-pal",
    name: "Spotlight Pal",
    tagline: "Your Cinematic Storytelling Expert",
    quote: "Every frame tells your story.",
    description: "I'm the artist who brings cinematic magic to your brand. From emotional brand stories to high-end commercials, I create premium content that elevates your image and creates lasting emotional connections with your audience.",
    personality: [
      "Artistic & creative",
      "Story-focused",
      "Quality-driven",
      "Emotionally intelligent"
    ],
    communication: [
      "Uses rich, descriptive language",
      "Focuses on emotion and storytelling",
      "Emphasizes visual beauty and artistry",
      "Speaks about impact and legacy"
    ],
    strengths: [
      "Cinematic production",
      "Brand storytelling",
      "High-end visuals",
      "Emotional connection",
      "Premium quality",
      "Artistic vision"
    ],
    services: [
      "Brand storytelling videos",
      "Commercial production",
      "Music videos",
      "Hero content creation",
      "Documentary-style content",
      "Premium brand films"
    ],
    packages: [
      "Cinematic Package ($7,997)",
      "Brand Story Video ($4,997)",
      "Commercial Production ($9,997)"
    ],
    perfectFor: [
      "Premium brands needing cinematic content",
      "Milestone celebrations and launches",
      "High-end product showcases",
      "Emotional brand storytelling",
      "Award-worthy content goals"
    ],
    ctaText: "Tell Your Story",
    ctaUrl: "/video-packages",
    colorScheme: {
      primary: "hsl(var(--social-purple))",
      secondary: "hsl(var(--social-pink))",
      accent: "hsl(320 100% 60%)",
      bg: "hsl(320 100% 97%)",
      text: "hsl(var(--corporate-dark))"
    },
    image: spotlightPalImage
  }
];

export const getPalById = (id: string): Pal | undefined => {
  return PALS_DATA.find(pal => pal.id === id);
};

export const getPalRecommendation = (needs: string[]): Pal => {
  // Simple recommendation logic based on keywords
  const keywords = needs.join(' ').toLowerCase();
  
  if (keywords.includes('social') || keywords.includes('quick') || keywords.includes('reels')) {
    return PALS_DATA[0]; // Reel Pal
  }
  
  if (keywords.includes('training') || keywords.includes('onboard') || keywords.includes('system')) {
    return PALS_DATA[1]; // System Pal
  }
  
  if (keywords.includes('authority') || keywords.includes('youtube') || keywords.includes('long-term')) {
    return PALS_DATA[2]; // Evergreen Pal
  }
  
  if (keywords.includes('cinematic') || keywords.includes('brand') || keywords.includes('premium')) {
    return PALS_DATA[3]; // Spotlight Pal
  }
  
  // Default to Reel Pal for beginners
  return PALS_DATA[0];
};