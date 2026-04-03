import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPTS: Record<string, string> = {
  "what-to-post": `You are a hyper-specialized content strategist for Dick's Restaurant Supply, a commercial restaurant equipment company. You understand their business deeply: they sell, install, and service commercial kitchen equipment (fryers, ovens, refrigeration, prep tables, ventilation, etc.) to restaurants, cafeterias, hotels, and food service operations.

Your job is to analyze the current time of day, day of week, season, and any context provided — then suggest 3 specific, high-performing content ideas they should post RIGHT NOW.

For each idea, provide:
1. **Content Angle** — The specific topic/hook
2. **Why Now** — Why this timing matters (time of day, season, industry trend)
3. **Platform** — Best platform for this post
4. **Hook Line** — The opening line that stops the scroll
5. **Estimated Impact** — Low/Medium/High with brief reasoning

Think about:
- Restaurant owners browse social media during slow hours (2-4pm, after close 10pm+)
- Seasonal equipment needs (summer = ice machines, winter = heating, spring = patio)
- Industry pain points (equipment breakdowns, health inspections, staff turnover)
- Local market (Pacific Northwest focus)
- Competitor weaknesses (most equipment suppliers post BORING content)

Be specific to Dick's. Not generic. Every suggestion should feel like it was written by someone who works there.`,

  "content-engine": `You are a full-stack content engine for Dick's Restaurant Supply. Given a single activity, event, or idea from their business, you produce a COMPLETE content package.

You MUST output ALL of the following sections in this exact order with these exact headers:

## 📝 Blog Post (SEO-Optimized, 800-1000 words)
Write a complete, publishable blog post. Include a compelling title, introduction, subheadings, and conclusion. Optimize for search terms restaurant owners would use.

## 🎬 YouTube Script (1,500 words, Authority Format)
Write a full YouTube script with:
- Cold open / hook (first 15 seconds)
- Intro + channel branding moment
- Main content with 3-5 key points
- B-roll suggestions in [brackets]
- Call to action
- End screen prompt
Format as a natural, conversational script — not bullet points.

## 📱 Reel/Short Script (30-60 seconds, Traffic Driver)
Write a punchy short-form script designed to drive traffic to the YouTube video:
- Hook (first 3 seconds)
- Quick value delivery
- Tease the full video
- CTA: "Full breakdown on our YouTube"
Include [visual cues] and timing notes.

## 📄 Facebook/LinkedIn Post (Text-only, Copy-Paste Ready)
Write an engaging social post (150-250 words) that:
- Opens with a pattern interrupt
- Delivers standalone value
- Links to the YouTube video
- Uses appropriate emoji (not excessive)
- Includes 3-5 relevant hashtags

## 🎯 Filming Plan (Simple Execution Guide)
- Location suggestions
- Equipment needed (camera, lighting basics)
- Shot list (5-7 shots)
- Estimated filming time
- Tips for the team

Make everything specific to Dick's Restaurant Supply and the commercial kitchen equipment industry. Write like you understand their customers (restaurant owners, kitchen managers, food service directors). No fluff. Every word earns its place.`,
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { toolId, inputs } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = SYSTEM_PROMPTS[toolId];
    if (!systemPrompt) {
      return new Response(
        JSON.stringify({ error: `Unknown tool: ${toolId}` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    let userMessage = "";

    if (toolId === "what-to-post") {
      const now = new Date();
      const timeStr = now.toLocaleString("en-US", { timeZone: "America/Los_Angeles", hour: "numeric", minute: "2-digit", hour12: true });
      const dayStr = now.toLocaleString("en-US", { timeZone: "America/Los_Angeles", weekday: "long" });
      const dateStr = now.toLocaleString("en-US", { timeZone: "America/Los_Angeles", month: "long", day: "numeric", year: "numeric" });

      userMessage = `Current time: ${timeStr}, ${dayStr}, ${dateStr} (Pacific Time)
Location: Pacific Northwest (Seattle/Tacoma area)
Business: Dick's Restaurant Supply — commercial kitchen equipment sales, installation, and service

${inputs.context ? `Additional context from the team: ${inputs.context}` : "No additional context provided."}
${inputs.recentActivity ? `Recent business activity: ${inputs.recentActivity}` : ""}

Generate 3 highly specific content suggestions for RIGHT NOW. Make each one feel like insider knowledge, not generic marketing advice.`;
    } else if (toolId === "content-engine") {
      userMessage = `Turn this into a complete content package for Dick's Restaurant Supply:

INPUT: "${inputs.activity}"

${inputs.additionalNotes ? `Additional notes: ${inputs.additionalNotes}` : ""}

Remember: Dick's sells, installs, and services commercial kitchen equipment. Their audience is restaurant owners, kitchen managers, and food service operators. Generate ALL sections (Blog, YouTube Script, Reel Script, Social Post, Filming Plan).`;
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited — please wait a moment and try again." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI generation failed" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("demo-generate error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
