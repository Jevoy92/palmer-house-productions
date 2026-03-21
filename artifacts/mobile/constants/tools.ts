import { PalId } from "./data";

export interface ToolField {
  key: string;
  label: string;
  placeholder: string;
  multiline?: boolean;
  required?: boolean;
}

export interface ToolDefinition {
  id: string;
  name: string;
  description: string;
  palId: PalId;
  icon: string;
  creditCost: number;
  fields: ToolField[];
  freeForAll?: boolean;
}

export const TOOLS: ToolDefinition[] = [
  {
    id: "hook-generator",
    name: "Hook Generator",
    description: "Generate scroll-stopping video hooks that capture attention in the first 3 seconds",
    palId: "reel",
    icon: "zap",
    creditCost: 1,
    fields: [
      { key: "industry", label: "Your Industry", placeholder: "e.g., Real estate, Fitness, SaaS", required: true },
      { key: "topic", label: "Video Topic", placeholder: "e.g., Why clients choose us", required: true },
      { key: "audience", label: "Target Audience", placeholder: "e.g., First-time homebuyers" },
      { key: "platform", label: "Platform", placeholder: "e.g., Instagram Reels, TikTok" },
    ],
  },
  {
    id: "caption-writer",
    name: "Caption Writer",
    description: "Write engaging social media captions with hashtags and CTAs",
    palId: "reel",
    icon: "edit-3",
    creditCost: 1,
    fields: [
      { key: "industry", label: "Your Industry", placeholder: "e.g., Photography, Consulting", required: true },
      { key: "topic", label: "Post Topic", placeholder: "e.g., Behind-the-scenes of a photoshoot", required: true },
      { key: "tone", label: "Tone", placeholder: "e.g., Professional, Playful, Inspiring" },
      { key: "platform", label: "Platform", placeholder: "e.g., Instagram, LinkedIn" },
      { key: "cta", label: "Call to Action", placeholder: "e.g., Book a call, Visit our website" },
    ],
  },
  {
    id: "trending-audio-advisor",
    name: "Trending Audio Advisor",
    description: "Get strategic audio suggestions for your short-form video content",
    palId: "reel",
    icon: "music",
    creditCost: 1,
    fields: [
      { key: "industry", label: "Your Industry", placeholder: "e.g., Beauty, Tech", required: true },
      { key: "contentType", label: "Content Type", placeholder: "e.g., Product showcase, Tutorial" },
      { key: "brandVibe", label: "Brand Vibe", placeholder: "e.g., Fun and energetic, Sleek and minimal" },
      { key: "goal", label: "Content Goal", placeholder: "e.g., Go viral, Build brand awareness" },
    ],
  },
  {
    id: "content-calendar",
    name: "30-Day Content Calendar",
    description: "Get a complete month of content planned with topics, captions, and posting times",
    palId: "reel",
    icon: "calendar",
    creditCost: 2,
    fields: [
      { key: "industry", label: "Your Industry", placeholder: "e.g., Fitness coaching", required: true },
      { key: "frequency", label: "Posting Frequency", placeholder: "e.g., 5 days per week" },
      { key: "platform", label: "Primary Platform", placeholder: "e.g., Instagram, TikTok" },
      { key: "goals", label: "Business Goals", placeholder: "e.g., Generate leads, Build community" },
      { key: "services", label: "Key Services/Products", placeholder: "e.g., 1-on-1 coaching, Online courses" },
    ],
  },
  {
    id: "video-script",
    name: "Video Script Writer",
    description: "Get a complete video script with scene directions and timing",
    palId: "reel",
    icon: "file-text",
    creditCost: 1,
    fields: [
      { key: "industry", label: "Your Industry", placeholder: "e.g., E-commerce, Law", required: true },
      { key: "topic", label: "Video Topic", placeholder: "e.g., How our process works", required: true },
      { key: "duration", label: "Target Duration", placeholder: "e.g., 60 seconds, 3 minutes" },
      { key: "style", label: "Video Style", placeholder: "e.g., Talking head, Cinematic, Screen recording" },
      { key: "cta", label: "Call to Action", placeholder: "e.g., Book a consultation" },
    ],
  },
  {
    id: "hashtag-strategy",
    name: "Hashtag Strategy",
    description: "Get a tiered hashtag strategy with high, medium, and niche hashtags",
    palId: "reel",
    icon: "hash",
    creditCost: 1,
    fields: [
      { key: "industry", label: "Your Industry", placeholder: "e.g., Interior design", required: true },
      { key: "focus", label: "Content Focus", placeholder: "e.g., Home staging tips" },
      { key: "location", label: "Location", placeholder: "e.g., Seattle, WA" },
      { key: "platform", label: "Platform", placeholder: "e.g., Instagram" },
      { key: "audience", label: "Target Audience", placeholder: "e.g., Homeowners looking to sell" },
    ],
  },
  {
    id: "teleprompter",
    name: "Teleprompter Script",
    description: "Convert your ideas into smooth, natural teleprompter-ready scripts",
    palId: "reel",
    icon: "monitor",
    creditCost: 0,
    freeForAll: true,
    fields: [
      { key: "script", label: "Your Script or Ideas", placeholder: "Paste your rough script or describe what you want to say...", multiline: true, required: true },
      { key: "style", label: "Speaking Style", placeholder: "e.g., Conversational, Authoritative" },
      { key: "duration", label: "Target Duration", placeholder: "e.g., 30 seconds, 2 minutes" },
    ],
  },
  {
    id: "brand-story-builder",
    name: "Brand Story Builder",
    description: "Craft a compelling brand origin story that builds emotional connection",
    palId: "spotlight",
    icon: "book-open",
    creditCost: 1,
    fields: [
      { key: "businessName", label: "Business Name", placeholder: "e.g., Palmer House Productions", required: true },
      { key: "industry", label: "Industry", placeholder: "e.g., Video production", required: true },
      { key: "origin", label: "Why You Started", placeholder: "e.g., Saw businesses struggling with video...", multiline: true },
      { key: "values", label: "Core Values", placeholder: "e.g., Authenticity, Excellence, Innovation" },
      { key: "differentiator", label: "What Makes You Different", placeholder: "e.g., We focus on strategy, not just pretty videos" },
    ],
  },
  {
    id: "testimonial-question-generator",
    name: "Testimonial Questions",
    description: "Generate strategic interview questions for powerful testimonial videos",
    palId: "spotlight",
    icon: "message-circle",
    creditCost: 1,
    fields: [
      { key: "industry", label: "Your Industry", placeholder: "e.g., Financial planning", required: true },
      { key: "clientType", label: "Client Type", placeholder: "e.g., Small business owner who doubled revenue" },
      { key: "result", label: "Key Result to Highlight", placeholder: "e.g., 3x increase in leads" },
      { key: "duration", label: "Video Length Target", placeholder: "e.g., 2-3 minutes" },
    ],
  },
  {
    id: "elevator-pitch",
    name: "Elevator Pitch",
    description: "Craft 15, 30, and 60-second elevator pitches for any situation",
    palId: "spotlight",
    icon: "mic",
    creditCost: 1,
    fields: [
      { key: "industry", label: "Your Industry", placeholder: "e.g., Marketing agency", required: true },
      { key: "audience", label: "Who You Serve", placeholder: "e.g., B2B SaaS companies", required: true },
      { key: "problem", label: "Problem You Solve", placeholder: "e.g., Inconsistent lead generation" },
      { key: "solution", label: "Your Solution", placeholder: "e.g., Done-for-you content systems" },
      { key: "differentiator", label: "Key Differentiator", placeholder: "e.g., We guarantee results" },
    ],
  },
  {
    id: "trust-signal-audit",
    name: "Trust Signal Audit",
    description: "Get an audit of your brand's trust signals with actionable improvements",
    palId: "spotlight",
    icon: "shield",
    creditCost: 1,
    fields: [
      { key: "industry", label: "Your Industry", placeholder: "e.g., Health coaching", required: true },
      { key: "current", label: "Current Trust Elements", placeholder: "e.g., Website, 50 Google reviews, Instagram with 2K followers" },
      { key: "audience", label: "Target Audience", placeholder: "e.g., Women 30-50 looking for wellness" },
      { key: "goal", label: "Main Conversion Goal", placeholder: "e.g., Book a discovery call" },
    ],
  },
  {
    id: "client-spotlight-planner",
    name: "Client Spotlight Planner",
    description: "Plan compelling client success story videos with narrative structure",
    palId: "spotlight",
    icon: "star",
    creditCost: 1,
    fields: [
      { key: "industry", label: "Your Industry", placeholder: "e.g., Web design agency", required: true },
      { key: "story", label: "Client's Success Story", placeholder: "e.g., Redesigned their site and doubled conversions", multiline: true, required: true },
      { key: "metrics", label: "Key Metrics", placeholder: "e.g., 200% increase in conversions, 50% more traffic" },
      { key: "format", label: "Video Format", placeholder: "e.g., 2-minute case study" },
    ],
  },
  {
    id: "about-page-script",
    name: "About Page Script",
    description: "Write a compelling About page script that builds trust and connection",
    palId: "spotlight",
    icon: "user",
    creditCost: 0,
    freeForAll: true,
    fields: [
      { key: "businessName", label: "Business Name", placeholder: "e.g., Your Company Name", required: true },
      { key: "industry", label: "Industry", placeholder: "e.g., Consulting", required: true },
      { key: "founderStory", label: "Founder's Story", placeholder: "Why did you start this business?", multiline: true },
      { key: "mission", label: "Mission", placeholder: "e.g., Help small businesses grow through video" },
      { key: "years", label: "Years in Business", placeholder: "e.g., 5 years" },
    ],
  },
  {
    id: "course-outline-builder",
    name: "Course Outline Builder",
    description: "Create a comprehensive course outline with modules and lessons",
    palId: "evergreen",
    icon: "layers",
    creditCost: 2,
    fields: [
      { key: "topic", label: "Course Topic", placeholder: "e.g., Mastering Instagram for Business", required: true },
      { key: "industry", label: "Your Industry", placeholder: "e.g., Social media marketing", required: true },
      { key: "audience", label: "Target Student", placeholder: "e.g., Small business owners new to Instagram" },
      { key: "outcome", label: "Desired Outcome", placeholder: "e.g., Consistent posting strategy that generates leads" },
      { key: "modules", label: "Number of Modules", placeholder: "e.g., 6-8" },
      { key: "format", label: "Course Format", placeholder: "e.g., Self-paced online, Live cohort" },
    ],
  },
  {
    id: "blog-to-video-converter",
    name: "Blog to Video Converter",
    description: "Transform written blog content into engaging video scripts",
    palId: "evergreen",
    icon: "repeat",
    creditCost: 1,
    fields: [
      { key: "blogContent", label: "Blog Content", placeholder: "Paste your blog post or article here...", multiline: true, required: true },
      { key: "duration", label: "Target Video Length", placeholder: "e.g., 3-5 minutes" },
      { key: "style", label: "Video Style", placeholder: "e.g., Educational talking head with graphics" },
    ],
  },
  {
    id: "lead-magnet-creator",
    name: "Lead Magnet Creator",
    description: "Design a high-value lead magnet that generates qualified leads",
    palId: "evergreen",
    icon: "gift",
    creditCost: 1,
    fields: [
      { key: "industry", label: "Your Industry", placeholder: "e.g., Financial planning", required: true },
      { key: "expertise", label: "Your Core Expertise", placeholder: "e.g., Retirement planning for entrepreneurs" },
      { key: "painPoint", label: "Audience Pain Point", placeholder: "e.g., Not knowing how much to save", required: true },
      { key: "desiredAction", label: "What You Want Them to Do Next", placeholder: "e.g., Book a free assessment" },
      { key: "format", label: "Preferred Format", placeholder: "e.g., PDF guide, Video series, Checklist" },
    ],
  },
  {
    id: "thought-leadership-topics",
    name: "Thought Leadership Topics",
    description: "Generate 10 authority-building content topics for your industry",
    palId: "evergreen",
    icon: "award",
    creditCost: 1,
    fields: [
      { key: "industry", label: "Your Industry", placeholder: "e.g., HR consulting", required: true },
      { key: "perspective", label: "Your Unique Perspective", placeholder: "e.g., Remote work is overrated for early-stage startups" },
      { key: "trends", label: "Industry Trends You See", placeholder: "e.g., AI replacing traditional recruitment" },
      { key: "audience", label: "Target Audience", placeholder: "e.g., CEOs of growing companies" },
    ],
  },
  {
    id: "workshop-planner",
    name: "Workshop Planner",
    description: "Plan an engaging workshop or webinar with detailed agenda",
    palId: "evergreen",
    icon: "clipboard",
    creditCost: 2,
    fields: [
      { key: "topic", label: "Workshop Topic", placeholder: "e.g., Building Your Video Content Strategy", required: true },
      { key: "industry", label: "Your Industry", placeholder: "e.g., Marketing", required: true },
      { key: "audience", label: "Target Audience", placeholder: "e.g., Small business owners" },
      { key: "format", label: "Format & Duration", placeholder: "e.g., 90-minute virtual workshop" },
      { key: "conversion", label: "Conversion Goal", placeholder: "e.g., Sign up for premium course" },
    ],
  },
  {
    id: "faq-video-series",
    name: "FAQ Video Series",
    description: "Plan a complete FAQ video series that answers your top customer questions",
    palId: "evergreen",
    icon: "help-circle",
    creditCost: 0,
    freeForAll: true,
    fields: [
      { key: "industry", label: "Your Industry", placeholder: "e.g., Dental practice", required: true },
      { key: "questions", label: "Common Customer Questions", placeholder: "List the questions you hear most often...", multiline: true },
      { key: "count", label: "Number of Videos", placeholder: "e.g., 10" },
      { key: "platform", label: "Target Platform", placeholder: "e.g., YouTube" },
      { key: "services", label: "Your Core Services", placeholder: "e.g., Cosmetic dentistry, Invisalign" },
    ],
  },
  {
    id: "sop-generator",
    name: "SOP Generator",
    description: "Create detailed standard operating procedures for your video production",
    palId: "system",
    icon: "clipboard",
    creditCost: 1,
    fields: [
      { key: "process", label: "Process to Document", placeholder: "e.g., Client onboarding, Video editing workflow", required: true },
      { key: "industry", label: "Your Industry", placeholder: "e.g., E-commerce", required: true },
      { key: "teamSize", label: "Team Size", placeholder: "e.g., 3 people" },
      { key: "tools", label: "Current Tools", placeholder: "e.g., Notion, Canva, CapCut" },
      { key: "frequency", label: "How Often This Runs", placeholder: "e.g., Weekly, Per client" },
    ],
  },
  {
    id: "batch-content-planner",
    name: "Batch Content Planner",
    description: "Plan efficient content batching sessions to maximize output",
    palId: "system",
    icon: "grid",
    creditCost: 1,
    fields: [
      { key: "industry", label: "Your Industry", placeholder: "e.g., Coaching", required: true },
      { key: "count", label: "Pieces to Create", placeholder: "e.g., 15 pieces of content" },
      { key: "time", label: "Available Time", placeholder: "e.g., 4 hours" },
      { key: "types", label: "Content Types", placeholder: "e.g., Reels, Stories, One long-form video" },
      { key: "equipment", label: "Equipment Available", placeholder: "e.g., iPhone, ring light, lapel mic" },
    ],
  },
  {
    id: "repurpose-strategy",
    name: "Repurpose Strategy",
    description: "Turn one piece of content into many across all platforms",
    palId: "system",
    icon: "share-2",
    creditCost: 1,
    fields: [
      { key: "industry", label: "Your Industry", placeholder: "e.g., Real estate", required: true },
      { key: "source", label: "Source Content", placeholder: "e.g., A 30-minute podcast episode", required: true },
      { key: "platforms", label: "Target Platforms", placeholder: "e.g., Instagram, YouTube, LinkedIn, TikTok" },
      { key: "capacity", label: "Team Capacity", placeholder: "e.g., Just me, VA + editor" },
    ],
  },
  {
    id: "team-delegation-template",
    name: "Delegation Template",
    description: "Create clear delegation templates for your content production team",
    palId: "system",
    icon: "users",
    creditCost: 1,
    fields: [
      { key: "process", label: "Process to Delegate", placeholder: "e.g., Social media management", required: true },
      { key: "industry", label: "Your Industry", placeholder: "e.g., Agency", required: true },
      { key: "roles", label: "Team Roles", placeholder: "e.g., Owner, VA, Video editor, Social media manager" },
      { key: "volume", label: "Content Volume", placeholder: "e.g., 5 posts per week" },
    ],
  },
  {
    id: "content-audit",
    name: "Content Audit",
    description: "Get a comprehensive audit of your content strategy with action items",
    palId: "system",
    icon: "search",
    creditCost: 0,
    freeForAll: true,
    fields: [
      { key: "industry", label: "Your Industry", placeholder: "e.g., Personal training", required: true },
      { key: "frequency", label: "Current Posting Frequency", placeholder: "e.g., 2-3 times per week, inconsistent" },
      { key: "platforms", label: "Platforms Used", placeholder: "e.g., Instagram, YouTube" },
      { key: "goals", label: "Business Goals", placeholder: "e.g., Get more clients, Build authority" },
      { key: "challenge", label: "Biggest Challenge", placeholder: "e.g., Running out of ideas, No time" },
    ],
  },
  {
    id: "workflow-optimizer",
    name: "Workflow Optimizer",
    description: "Streamline your content creation workflow for maximum efficiency",
    palId: "system",
    icon: "settings",
    creditCost: 1,
    fields: [
      { key: "industry", label: "Your Industry", placeholder: "e.g., Consulting", required: true },
      { key: "currentProcess", label: "Current Process", placeholder: "Describe how you currently create content...", multiline: true, required: true },
      { key: "timeSpent", label: "Time Spent Weekly", placeholder: "e.g., 10+ hours" },
      { key: "tools", label: "Current Tools", placeholder: "e.g., Canva, iPhone, iMovie" },
      { key: "painPoints", label: "Pain Points", placeholder: "e.g., Takes too long, inconsistent quality" },
    ],
  },
  {
    id: "visibility-checklist",
    name: "Visibility Checklist",
    description: "Get a comprehensive checklist to maximize your content's reach",
    palId: "reel",
    icon: "check-square",
    creditCost: 1,
    fields: [
      { key: "industry", label: "Your Industry", placeholder: "e.g., Photography", required: true },
      { key: "platform", label: "Primary Platform", placeholder: "e.g., Instagram" },
      { key: "contentType", label: "Content Type", placeholder: "e.g., Reels, Carousels, Stories" },
      { key: "goal", label: "Visibility Goal", placeholder: "e.g., Reach 10K accounts per post" },
      { key: "time", label: "Weekly Time for Promotion", placeholder: "e.g., 2-3 hours" },
    ],
  },
];

export function getToolsForPal(palId: PalId): ToolDefinition[] {
  return TOOLS.filter((t) => t.palId === palId);
}

export function getToolById(id: string): ToolDefinition | undefined {
  return TOOLS.find((t) => t.id === id);
}

export function getFreeTools(): ToolDefinition[] {
  return TOOLS.filter((t) => t.freeForAll);
}
