import reelPalImage from '@/assets/pals/reel-pal.png';
import systemPalImage from '@/assets/pals/system-pal.png';
import evergreenPalImage from '@/assets/pals/evergreen-pal.png';
import spotlightPalImage from '@/assets/pals/spotlight-pal.png';

export interface Package {
  id: string;
  name: string;
  badge?: string;
  price: string;
  popular?: boolean;
  features: string[];
  ctaText: string;
  ctaSecondary: string;
}

export interface ExpertiseArea {
  icon: string;
  title: string;
  description: string;
  bgColor: string;
  iconColor: string;
}

export interface ProcessStep {
  step: number;
  icon: string;
  title: string;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Stats {
  value: string;
  label: string;
  color: string;
}

export interface Pal {
  id: string;
  name: string;
  tagline: string;
  quote: string;
  description: string;
  expertise: ExpertiseArea[];
  packages: Package[];
  stats: Stats[];
  process: ProcessStep[];
  faqs: FAQ[];
  personality: string[];
  communication: string[];
  strengths: string[];
  services: string[];
  perfectFor: string[];
  ctaText: string;
  ctaUrl: string;
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
    bg: string;
    text: string;
    gradient: string;
  };
  image: string;
}

export const PALS_DATA: Pal[] = [
  {
    id: "reel-pal",
    name: "Reel Pal",
    tagline: "Your Social Media Video Expert",
    quote: "Let's make content that connects!",
    description: "Your go-to guide for short-form social content that captures hearts and drives real engagement. I specialize in authentic content that resonates with your audience across all platforms.",
    expertise: [
      {
        icon: "fab fa-tiktok",
        title: "TikTok Content",
        description: "Trending content that captures attention and drives engagement on the world's fastest-growing platform.",
        bgColor: "bg-social-yellow/10",
        iconColor: "text-social-yellow"
      },
      {
        icon: "fab fa-instagram",
        title: "Instagram Reels",
        description: "Stories and Reels that showcase your brand personality and convert followers into customers.",
        bgColor: "bg-social-blue/10",
        iconColor: "text-social-blue"
      },
      {
        icon: "fab fa-youtube",
        title: "YouTube Shorts",
        description: "Quick, impactful videos that grow your YouTube presence and drive subscribers.",
        bgColor: "bg-red-50",
        iconColor: "text-red-500"
      },
      {
        icon: "fas fa-tools",
        title: "DIY Kits",
        description: "Complete content creation packages that enable you to create professional content in-house.",
        bgColor: "bg-green-50",
        iconColor: "text-green-500"
      }
    ],
    packages: [
      {
        id: "starter",
        name: "Starter Session",
        badge: "STARTER",
        price: "$500",
        features: [
          "5 short-form videos",
          "Platform optimization",
          "Content strategy session",
          "Basic editing included",
          "1 revision round"
        ],
        ctaText: "Get Started",
        ctaSecondary: "Learn More"
      },
      {
        id: "growth",
        name: "Content Boost",
        badge: "GROWTH",
        price: "$1,200",
        popular: true,
        features: [
          "15 short-form videos",
          "Multi-platform optimization",
          "Content calendar planning",
          "Advanced editing & effects",
          "Unlimited revisions",
          "Performance analytics"
        ],
        ctaText: "Choose Growth",
        ctaSecondary: "Book Strategy Call"
      },
      {
        id: "diy",
        name: "DIY Creator Kit",
        badge: "DIY KIT",
        price: "$800",
        features: [
          "Complete content templates",
          "Video editing tutorials",
          "Content planning tools",
          "Brand style guide",
          "30 days of support"
        ],
        ctaText: "Buy Now",
        ctaSecondary: "View Samples"
      }
    ],
    stats: [
      { value: "2M+", label: "Total Views Generated", color: "text-social-yellow" },
      { value: "150+", label: "Happy Clients Served", color: "text-social-blue" },
      { value: "450%", label: "Average Growth Rate", color: "text-green-500" },
      { value: "4.9/5", label: "Client Satisfaction Rating", color: "text-social-purple" }
    ],
    process: [
      {
        step: 1,
        icon: "fas fa-comments",
        title: "Discovery Call",
        description: "We dive deep into your brand, audience, and goals to create a personalized content strategy."
      },
      {
        step: 2,
        icon: "fas fa-lightbulb",
        title: "Content Planning",
        description: "I create a detailed content calendar with trending topics and platform-specific optimizations."
      },
      {
        step: 3,
        icon: "fas fa-video",
        title: "Production",
        description: "Professional filming and editing that brings your content to life with trending effects and music."
      },
      {
        step: 4,
        icon: "fas fa-rocket",
        title: "Launch & Optimize",
        description: "Strategic posting schedule with performance tracking and continuous optimization for maximum reach."
      }
    ],
    faqs: [
      {
        question: "What platforms do you create content for?",
        answer: "I specialize in short-form content for TikTok, Instagram Reels, YouTube Shorts, and Facebook Reels. Each platform has unique requirements, and I optimize content specifically for each one to maximize engagement and reach."
      },
      {
        question: "How long does it take to see results?",
        answer: "Most clients start seeing increased engagement within the first week of posting. Significant follower growth typically begins around week 2-3, with substantial results by month 2. Consistency is key!"
      },
      {
        question: "Do I need to be on camera?",
        answer: "Not necessarily! While personal branding videos perform well, I can create engaging content using product shots, behind-the-scenes footage, animations, and text-based videos. We'll find what works best for your comfort level and brand."
      },
      {
        question: "What's included in the DIY kit?",
        answer: "The DIY Creator Kit includes 30+ video templates, step-by-step editing tutorials, content planning worksheets, brand style guides, trending hashtag lists, and 30 days of email support. Everything you need to create professional content independently."
      },
      {
        question: "Can you help with content strategy beyond just video creation?",
        answer: "Absolutely! I provide comprehensive content strategy including optimal posting times, hashtag research, audience analysis, trend identification, and performance analytics. It's not just about creating videos—it's about creating a sustainable growth system."
      }
    ],
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
      text: "hsl(var(--corporate-dark))",
      gradient: "linear-gradient(135deg, hsl(var(--social-yellow)), hsl(var(--social-orange)))"
    },
    image: reelPalImage
  },
  {
    id: "system-pal",
    name: "System Pal",
    tagline: "Your Business Systems Video Expert",
    quote: "Let's build systems that scale your success.",
    description: "I'm the organized one who turns your chaotic processes into streamlined video systems. From employee onboarding to customer education, I create structured content that saves time, reduces confusion, and scales your business operations.",
    expertise: [
      {
        icon: "fas fa-clipboard-list",
        title: "Process Documentation",
        description: "Turn complex workflows into clear, step-by-step video guides that anyone can follow.",
        bgColor: "bg-social-cyan/10",
        iconColor: "text-social-cyan"
      },
      {
        icon: "fas fa-users-cog",
        title: "Training Systems",
        description: "Scalable video training programs that onboard employees efficiently and consistently.",
        bgColor: "bg-social-blue/10",
        iconColor: "text-social-blue"
      },
      {
        icon: "fas fa-graduation-cap",
        title: "Employee Onboarding",
        description: "Comprehensive video libraries that get new hires up to speed quickly.",
        bgColor: "bg-green-50",
        iconColor: "text-green-500"
      },
      {
        icon: "fas fa-question-circle",
        title: "FAQ Solutions",
        description: "Video-based knowledge bases that reduce support tickets and improve efficiency.",
        bgColor: "bg-purple-50",
        iconColor: "text-purple-500"
      }
    ],
    packages: [
      {
        id: "training-system",
        name: "Training System Package",
        badge: "ENTERPRISE",
        price: "$2,997",
        features: [
          "Complete training video system",
          "Process documentation videos",
          "Employee onboarding sequence",
          "Knowledge base creation",
          "6 months of updates",
          "Team training included"
        ],
        ctaText: "Streamline Now",
        ctaSecondary: "Schedule Demo"
      },
      {
        id: "onboarding-solution",
        name: "Onboarding Solution",
        badge: "POPULAR",
        price: "$1,997",
        popular: true,
        features: [
          "Complete onboarding video series",
          "Role-specific training modules",
          "Company culture videos",
          "Process walkthroughs",
          "3 months of support",
          "Custom branding"
        ],
        ctaText: "Get Started",
        ctaSecondary: "View Examples"
      },
      {
        id: "process-docs",
        name: "Process Documentation",
        badge: "STARTER",
        price: "$897",
        features: [
          "Up to 10 process videos",
          "Screen recording setup",
          "Basic editing included",
          "Process templates",
          "1 month of support"
        ],
        ctaText: "Document Now",
        ctaSecondary: "Learn More"
      }
    ],
    stats: [
      { value: "85%", label: "Training Time Reduction", color: "text-social-cyan" },
      { value: "200+", label: "Companies Streamlined", color: "text-social-blue" },
      { value: "92%", label: "Employee Retention Improvement", color: "text-green-500" },
      { value: "50%", label: "Support Ticket Reduction", color: "text-social-purple" }
    ],
    process: [
      {
        step: 1,
        icon: "fas fa-search",
        title: "Process Audit",
        description: "We analyze your current workflows to identify inefficiencies and documentation gaps."
      },
      {
        step: 2,
        icon: "fas fa-sitemap",
        title: "System Design",
        description: "Create a comprehensive training system blueprint tailored to your organization."
      },
      {
        step: 3,
        icon: "fas fa-video",
        title: "Content Creation",
        description: "Produce high-quality training videos with clear instructions and professional presentation."
      },
      {
        step: 4,
        icon: "fas fa-rocket",
        title: "Implementation",
        description: "Deploy your training system and provide ongoing support for maximum adoption."
      }
    ],
    faqs: [
      {
        question: "How long does it take to create a complete training system?",
        answer: "A comprehensive training system typically takes 4-8 weeks depending on complexity. We work in phases to ensure you can start using parts of the system while we complete the rest."
      },
      {
        question: "Can you work with our existing processes?",
        answer: "Absolutely! We specialize in documenting and improving existing workflows. We'll work with your team to understand current processes and create videos that enhance what's already working."
      },
      {
        question: "What if our processes change frequently?",
        answer: "We build modular training systems that are easy to update. Plus, our packages include ongoing support to help you modify content as your processes evolve."
      },
      {
        question: "Do you provide training on how to use the system?",
        answer: "Yes! We include comprehensive training for your team on how to use, update, and maintain the video training system. We want you to be completely self-sufficient."
      },
      {
        question: "Can employees access the training videos remotely?",
        answer: "Definitely! All our training systems are designed to be accessible from anywhere, making them perfect for remote teams or distributed workforces."
      }
    ],
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
      text: "hsl(var(--corporate-dark))",
      gradient: "linear-gradient(135deg, hsl(var(--social-cyan)), hsl(var(--social-blue)))"
    },
    image: systemPalImage
  },
  {
    id: "evergreen-pal",
    name: "Evergreen Pal",
    tagline: "Your Long-term Content Expert",
    quote: "Building your digital legacy, one video at a time.",
    description: "I think long-term and create content that compounds over time. Whether it's establishing thought leadership on YouTube or building an educational video library, I help you create valuable content that continues generating results for years.",
    expertise: [
      {
        icon: "fab fa-youtube",
        title: "YouTube Strategy",
        description: "Long-term channel growth strategies that build authority and generate consistent leads.",
        bgColor: "bg-social-green/10",
        iconColor: "text-social-green"
      },
      {
        icon: "fas fa-graduation-cap",
        title: "Educational Content",
        description: "In-depth tutorials and courses that establish you as the go-to expert in your field.",
        bgColor: "bg-blue-50",
        iconColor: "text-blue-500"
      },
      {
        icon: "fas fa-crown",
        title: "Authority Building",
        description: "Thought leadership content that positions you as an industry expert and trusted advisor.",
        bgColor: "bg-yellow-50",
        iconColor: "text-yellow-600"
      },
      {
        icon: "fas fa-chart-line",
        title: "SEO Optimization",
        description: "Search-optimized content that continues driving traffic and leads for years to come.",
        bgColor: "bg-purple-50",
        iconColor: "text-purple-500"
      }
    ],
    packages: [
      {
        id: "youtube-engine",
        name: "YouTube Engine",
        badge: "PREMIUM",
        price: "$3,997/month",
        popular: true,
        features: [
          "Weekly YouTube videos",
          "SEO optimization",
          "Thumbnail design",
          "Content strategy",
          "Analytics reporting",
          "Channel growth coaching"
        ],
        ctaText: "Start Building",
        ctaSecondary: "Strategy Call"
      },
      {
        id: "authority-package",
        name: "Authority Package",
        badge: "PROFESSIONAL",
        price: "$2,497",
        features: [
          "10 authority-building videos",
          "Thought leadership positioning",
          "Professional editing",
          "Multi-platform optimization",
          "Content calendar",
          "3 months of support"
        ],
        ctaText: "Build Authority",
        ctaSecondary: "View Examples"
      },
      {
        id: "monthly-content",
        name: "Monthly Content Plan",
        badge: "ONGOING",
        price: "$1,997/month",
        features: [
          "4 evergreen videos per month",
          "Content strategy sessions",
          "SEO optimization",
          "Performance tracking",
          "Content repurposing",
          "Monthly strategy calls"
        ],
        ctaText: "Start Monthly",
        ctaSecondary: "Learn More"
      }
    ],
    stats: [
      { value: "15M+", label: "Total Video Views", color: "text-social-green" },
      { value: "500+", label: "Authority Videos Created", color: "text-blue-500" },
      { value: "300%", label: "Average Channel Growth", color: "text-yellow-600" },
      { value: "95%", label: "Long-term Client Retention", color: "text-social-purple" }
    ],
    process: [
      {
        step: 1,
        icon: "fas fa-target",
        title: "Authority Assessment",
        description: "We identify your expertise areas and map out a long-term content strategy for maximum impact."
      },
      {
        step: 2,
        icon: "fas fa-calendar-alt",
        title: "Content Planning",
        description: "Create a comprehensive content calendar with evergreen topics that build on each other."
      },
      {
        step: 3,
        icon: "fas fa-video",
        title: "Premium Production",
        description: "Produce high-quality, educational content that showcases your expertise and builds trust."
      },
      {
        step: 4,
        icon: "fas fa-chart-line",
        title: "Growth & Optimization",
        description: "Monitor performance and continuously optimize for maximum reach and authority building."
      }
    ],
    faqs: [
      {
        question: "How long does it take to see authority-building results?",
        answer: "Authority building is a long-term strategy. You'll start seeing increased recognition within 3-6 months, with significant authority establishment typically occurring within 12-18 months of consistent content creation."
      },
      {
        question: "What makes content 'evergreen'?",
        answer: "Evergreen content addresses timeless problems and provides lasting value. Unlike trending content, evergreen videos continue attracting viewers and generating leads months or years after publication."
      },
      {
        question: "Do you help with YouTube channel optimization?",
        answer: "Absolutely! Our YouTube Engine package includes complete channel optimization, from SEO strategy to thumbnail design, ensuring your content gets maximum visibility and engagement."
      },
      {
        question: "Can you work with existing content I've created?",
        answer: "Yes! We can audit your existing content and create a strategy that builds on what's already working while filling gaps to create a comprehensive authority-building system."
      },
      {
        question: "What's the difference between evergreen and viral content?",
        answer: "Viral content gets quick attention but fades fast. Evergreen content builds steady, long-term traffic and positions you as an expert. We focus on content that continues working for your business for years."
      }
    ],
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
      text: "hsl(var(--corporate-dark))",
      gradient: "linear-gradient(135deg, hsl(var(--social-green)), hsl(120 60% 50%))"
    },
    image: evergreenPalImage
  },
  {
    id: "spotlight-pal",
    name: "Spotlight Pal",
    tagline: "Your Cinematic Storytelling Expert",
    quote: "Every frame tells your story.",
    description: "I'm the artist who brings cinematic magic to your brand. From emotional brand stories to high-end commercials, I create premium content that elevates your image and creates lasting emotional connections with your audience.",
    expertise: [
      {
        icon: "fas fa-film",
        title: "Cinematic Production",
        description: "High-end video production with professional lighting, camera work, and post-production.",
        bgColor: "bg-social-purple/10",
        iconColor: "text-social-purple"
      },
      {
        icon: "fas fa-heart",
        title: "Brand Storytelling",
        description: "Emotional narratives that connect with your audience and build lasting brand loyalty.",
        bgColor: "bg-social-pink/10",
        iconColor: "text-social-pink"
      },
      {
        icon: "fas fa-trophy",
        title: "Commercial Production",
        description: "Award-worthy commercials and promotional videos that showcase your brand's premium quality.",
        bgColor: "bg-yellow-50",
        iconColor: "text-yellow-600"
      },
      {
        icon: "fas fa-magic",
        title: "Visual Effects",
        description: "Advanced post-production and visual effects that create stunning, memorable content.",
        bgColor: "bg-blue-50",
        iconColor: "text-blue-500"
      }
    ],
    packages: [
      {
        id: "cinematic-package",
        name: "Cinematic Package",
        badge: "PREMIUM",
        price: "$7,997",
        popular: true,
        features: [
          "Full cinematic production",
          "Professional crew and equipment",
          "Advanced post-production",
          "Multiple video deliverables",
          "Color grading and sound design",
          "Unlimited revisions"
        ],
        ctaText: "Create Magic",
        ctaSecondary: "View Portfolio"
      },
      {
        id: "brand-story",
        name: "Brand Story Video",
        badge: "STORYTELLING",
        price: "$4,997",
        features: [
          "Complete brand story video",
          "Professional interviews",
          "B-roll footage",
          "Emotional storytelling",
          "Music licensing",
          "Social media versions"
        ],
        ctaText: "Tell Your Story",
        ctaSecondary: "See Examples"
      },
      {
        id: "commercial-production",
        name: "Commercial Production",
        badge: "COMMERCIAL",
        price: "$9,997",
        features: [
          "30-60 second commercial",
          "Concept development",
          "Full production crew",
          "Location scouting",
          "Professional talent",
          "Broadcast-ready delivery"
        ],
        ctaText: "Start Production",
        ctaSecondary: "Schedule Meeting"
      }
    ],
    stats: [
      { value: "50M+", label: "Total Video Views", color: "text-social-purple" },
      { value: "100+", label: "Premium Productions", color: "text-social-pink" },
      { value: "25", label: "Industry Awards Won", color: "text-yellow-600" },
      { value: "98%", label: "Client Satisfaction Rate", color: "text-blue-500" }
    ],
    process: [
      {
        step: 1,
        icon: "fas fa-lightbulb",
        title: "Creative Concept",
        description: "We develop a unique creative concept that perfectly captures your brand's essence and story."
      },
      {
        step: 2,
        icon: "fas fa-clipboard-list",
        title: "Pre-Production",
        description: "Detailed planning including storyboarding, location scouting, and crew coordination."
      },
      {
        step: 3,
        icon: "fas fa-video",
        title: "Cinematic Production",
        description: "Professional filming with high-end equipment and experienced crew to capture stunning visuals."
      },
      {
        step: 4,
        icon: "fas fa-palette",
        title: "Post-Production",
        description: "Advanced editing, color grading, sound design, and visual effects to create the final masterpiece."
      }
    ],
    faqs: [
      {
        question: "What makes your production 'cinematic'?",
        answer: "We use professional-grade cameras, lighting equipment, and techniques typically reserved for film production. This includes advanced camera movements, dramatic lighting, color grading, and sound design that creates a premium, movie-like quality."
      },
      {
        question: "How long does a cinematic production take?",
        answer: "Production timelines vary by project complexity. A brand story video typically takes 4-6 weeks from concept to delivery, while full commercial productions can take 8-12 weeks including pre-production, filming, and post-production."
      },
      {
        question: "Do you handle talent and location sourcing?",
        answer: "Yes! We manage all aspects of production including professional talent casting, location scouting, and securing necessary permits. Our team handles the logistics so you can focus on your business."
      },
      {
        question: "Can you match our existing brand aesthetic?",
        answer: "Absolutely. We study your brand guidelines, existing marketing materials, and desired aesthetic to ensure the final product aligns perfectly with your brand identity while elevating it to a cinematic level."
      },
      {
        question: "What deliverables do we receive?",
        answer: "You'll receive the main video in multiple formats, plus additional versions optimized for different platforms (social media, website, broadcast). We also provide raw footage and project files for future use."
      }
    ],
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
      text: "hsl(var(--corporate-dark))",
      gradient: "linear-gradient(135deg, hsl(var(--social-purple)), hsl(var(--social-pink)))"
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