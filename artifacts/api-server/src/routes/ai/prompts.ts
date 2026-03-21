interface PalContext {
  palCategory?: string;
  businessType?: string;
  industry?: string;
  targetAudience?: string;
}

const PAL_DESCRIPTIONS: Record<string, string> = {
  reel: "visibility and awareness through short-form video content that grabs attention and expands reach",
  spotlight: "trust and credibility through testimonials, case studies, and social proof content",
  system: "operational systems and processes through educational and instructional video content",
  evergreen: "long-lasting authority content that continues to deliver value over time",
};

function buildPalContext(pal?: PalContext): string {
  if (!pal?.palCategory) return "";
  const desc = PAL_DESCRIPTIONS[pal.palCategory] || pal.palCategory;
  let ctx = `The user's content strategy focuses on ${desc}.`;
  if (pal.businessType) ctx += ` Their business type is: ${pal.businessType}.`;
  if (pal.industry) ctx += ` Industry: ${pal.industry}.`;
  if (pal.targetAudience) ctx += ` Target audience: ${pal.targetAudience}.`;
  return ctx;
}

const TOOL_PROMPTS: Record<string, (inputs: Record<string, string>, pal?: PalContext) => string> = {
  "script-writer": (inputs, pal) => {
    const palCtx = buildPalContext(pal);
    return `You are an expert video script writer for business owners creating content for social media.
${palCtx}

Write a complete, ready-to-film video script based on the following details:
- Platform: ${inputs.platform || "Instagram Reels"}
- Topic: ${inputs.topic || "not specified"}
- Tone: ${inputs.tone || "professional but approachable"}
- Duration: ${inputs.duration || "60 seconds"}
${inputs.additionalNotes ? `- Additional notes: ${inputs.additionalNotes}` : ""}

Format the script with:
1. **HOOK** (first 3 seconds - attention grabber)
2. **BODY** (main content with clear talking points)
3. **CTA** (call to action)

Include visual/action cues in [brackets]. Make it conversational and natural-sounding. Do not use hashtags in the script body.`;
  },

  "content-planner": (inputs, pal) => {
    const palCtx = buildPalContext(pal);
    return `You are a strategic content planner for business owners who need a structured video content calendar.
${palCtx}

Create a detailed 30-day content plan based on:
- Business/Industry: ${inputs.industry || "general business"}
- Goals: ${inputs.goals || "grow audience and build authority"}
- Posting frequency: ${inputs.frequency || "3-4 times per week"}
- Platforms: ${inputs.platforms || "Instagram, TikTok"}
${inputs.additionalNotes ? `- Additional context: ${inputs.additionalNotes}` : ""}

For each content piece, include:
- **Day & Date** (Day 1, Day 2, etc.)
- **Content Type** (Reel, Story, Carousel, Live, etc.)
- **Topic/Title**
- **Key Talking Points** (2-3 bullets)
- **CTA**

Group content into weekly themes. Include a mix of educational, entertaining, and promotional content.`;
  },

  "what-to-post": (inputs, pal) => {
    const palCtx = buildPalContext(pal);
    return `You are a creative content strategist helping business owners figure out exactly what to post next.
${palCtx}

Based on the following information, suggest 5 specific video ideas they should create right now:
- Business type: ${inputs.businessType || "not specified"}
- Current challenge: ${inputs.challenge || "not sure what to post"}
- Audience: ${inputs.audience || "potential customers"}
- Recent content themes: ${inputs.recentContent || "none specified"}
${inputs.additionalNotes ? `- Additional context: ${inputs.additionalNotes}` : ""}

For each idea, provide:
1. **Video Title/Concept**
2. **Why This Works Now** (1-2 sentences on strategy)
3. **Hook Suggestion** (opening line)
4. **Key Points to Cover** (3-4 bullets)
5. **Best Platform** and optimal length

Rank them from highest to lowest potential impact.`;
  },

  "hook-generator": (inputs, pal) => {
    const palCtx = buildPalContext(pal);
    return `You are a scroll-stopping hook specialist who creates attention-grabbing video openings.
${palCtx}

Generate 10 unique, compelling hooks for this video topic:
- Topic: ${inputs.topic || "not specified"}
- Platform: ${inputs.platform || "Instagram Reels/TikTok"}
- Target audience: ${inputs.audience || "business professionals"}
- Tone: ${inputs.tone || "bold and direct"}
${inputs.additionalNotes ? `- Additional context: ${inputs.additionalNotes}` : ""}

Include a variety of hook styles:
- Question hooks (curiosity-driven)
- Bold statement hooks (pattern interrupt)
- Story hooks ("I just..." or "When I...")
- Statistic/fact hooks
- Controversial/hot take hooks

For each hook, add a brief note on WHY it works psychologically. Format as a numbered list.`;
  },

  "brief-builder": (inputs, pal) => {
    const palCtx = buildPalContext(pal);
    return `You are a professional video production brief writer helping business owners plan their video projects.
${palCtx}

Create a comprehensive production brief based on:
- Project type: ${inputs.projectType || "promotional video"}
- Business: ${inputs.business || "not specified"}
- Objective: ${inputs.objective || "increase brand awareness"}
- Budget range: ${inputs.budget || "not specified"}
- Timeline: ${inputs.timeline || "2-4 weeks"}
${inputs.additionalNotes ? `- Additional details: ${inputs.additionalNotes}` : ""}

Include these sections:
1. **Project Overview** - Objective, target audience, key message
2. **Creative Direction** - Tone, style, visual references
3. **Deliverables** - Formats, dimensions, versions needed
4. **Script/Messaging Framework** - Key talking points, CTA
5. **Production Requirements** - Location, talent, props, equipment
6. **Timeline & Milestones** - Pre-production, shoot, post-production
7. **Distribution Plan** - Where and how the content will be shared

Make it professional and ready to share with a production team or videographer.`;
  },

  "content-audit": (inputs, pal) => {
    const palCtx = buildPalContext(pal);
    return `You are a content strategist performing a thorough video content audit for a business owner.
${palCtx}

Analyze and provide strategic recommendations based on:
- Business: ${inputs.business || "not specified"}
- Current platforms: ${inputs.platforms || "Instagram, YouTube"}
- Content types they currently create: ${inputs.currentContent || "mixed"}
- Posting frequency: ${inputs.frequency || "inconsistent"}
- Main goals: ${inputs.goals || "grow and engage audience"}
- Biggest content challenge: ${inputs.challenge || "not sure what's working"}
${inputs.additionalNotes ? `- Additional context: ${inputs.additionalNotes}` : ""}

Provide a comprehensive audit with:
1. **Content Mix Analysis** - What's working, what's missing
2. **Platform Strategy** - Are they on the right platforms?
3. **Frequency & Consistency** - Recommendations for posting schedule
4. **Content Gaps** - Topics and formats they should explore
5. **Engagement Opportunities** - Ways to increase interaction
6. **Quick Wins** - 3-5 things they can implement this week
7. **90-Day Strategy** - Prioritized action plan

Be specific and actionable. Avoid generic advice.`;
  },
};

export function getSystemPrompt(
  toolId: string,
  inputs: Record<string, string>,
  pal?: PalContext,
): string {
  const builder = TOOL_PROMPTS[toolId];
  if (!builder) {
    return `You are a helpful AI assistant for video content creation. Help the user with their request about "${toolId}". Be specific, actionable, and professional.`;
  }
  return builder(inputs, pal);
}

export type { PalContext };
