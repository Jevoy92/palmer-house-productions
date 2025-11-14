import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.81.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { toolType, inputs } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    // Get authorization header for user authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.error('No authorization header provided');
      return new Response(
        JSON.stringify({ error: 'Authentication required' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create Supabase client with user's auth token
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: {
        headers: { Authorization: authHeader },
      },
    });

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      console.error('Auth error:', authError);
      return new Response(
        JSON.stringify({ error: 'Invalid authentication' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('User authenticated:', user.id);
    console.log('Generating content for tool:', toolType);

    // STEP 1: Get tool credit cost from database
    const { data: toolCostData, error: toolCostError } = await supabase
      .from('tool_costs')
      .select('credit_cost')
      .eq('tool_name', toolType)
      .eq('is_active', true)
      .single();

    if (toolCostError || !toolCostData) {
      console.error('Error fetching tool cost:', toolCostError);
      return new Response(
        JSON.stringify({ error: 'Tool configuration not found' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const creditCost = toolCostData.credit_cost;
    console.log(`Tool ${toolType} costs ${creditCost} credits`);

    // STEP 2: Check user's current credit balance
    const { data: creditsData, error: creditsError } = await supabase
      .from('user_credits')
      .select('balance')
      .eq('user_id', user.id)
      .single();

    if (creditsError || !creditsData) {
      console.error('Error fetching user credits:', creditsError);
      return new Response(
        JSON.stringify({ error: 'Unable to verify credits' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const currentBalance = creditsData.balance;
    console.log(`User has ${currentBalance} credits, needs ${creditCost}`);

    // STEP 3: Check if user has enough credits
    if (currentBalance < creditCost) {
      console.log('Insufficient credits');
      return new Response(
        JSON.stringify({ 
          error: 'Insufficient credits',
          required: creditCost,
          current: currentBalance,
          message: `This tool requires ${creditCost} credits. You currently have ${currentBalance} credits.`
        }),
        { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Build tool-specific prompts
    let systemPrompt = '';
    let userPrompt = '';

    switch (toolType) {
      case 'content-system-builder':
        systemPrompt = `You are a content strategist expert. Generate a comprehensive multi-platform content system based on the user's content idea. Return detailed, actionable content for each platform.`;
        userPrompt = `Create a complete content system for this idea: "${inputs.idea}"
        
Industry: ${inputs.industry}
Goal: ${inputs.goal}

Generate a structured plan with:
1. STRATEGY: Overall content strategy (2-3 sentences)
2. YOUTUBE: Video title and compelling script hook (2-3 sentences)
3. LINKEDIN: Full professional post (3-4 paragraphs)
4. TWITTER: Thread with intro + 4 tweets
5. INSTAGRAM: Carousel concept + 5 slide ideas
6. BLOG: SEO-optimized title + detailed outline (5-7 sections)
7. EMAIL: Subject line + engaging body hook (2 paragraphs)
8. DOWNLOADS: 2-3 relevant digital download ideas with titles and descriptions

Format as JSON with these exact keys: strategy, youtube, linkedin, twitter, instagram, blog, email, downloads`;
        break;

      case 'series-builder':
        systemPrompt = `You are a content series strategist expert. Create cohesive content series that maintain audience engagement through a clear through-line and progressive structure.`;
        userPrompt = `Create a ${inputs.seriesLength}-part ${inputs.contentType} series:

Topic: ${inputs.topic}
Industry: ${inputs.industry}
${inputs.additionalContext ? `Additional Context: ${inputs.additionalContext}` : ''}

Generate a comprehensive series plan with:
1. SERIES_TITLE: Compelling overall series title
2. SERIES_CONCEPT: 2-3 sentence overview (what, why, who for)
3. THROUGH_LINE: The connecting theme that ties all entries together
4. ENTRIES: Array of ${inputs.seriesLength} entries, each with:
   - number: Entry number (1-${inputs.seriesLength})
   - title: Specific entry title
   - description: 2-3 sentence summary
   - keyTopics: Array of 3-5 main topics covered
   - hook: Opening hook/question to grab attention
   - cta: Specific call-to-action for this entry
5. PUBLISHING_CADENCE: Recommended publishing schedule (e.g., "Weekly on Tuesdays" or "Bi-weekly")

Ensure each entry:
- Builds on previous entries
- Has a clear value proposition
- Advances the overall series narrative
- Includes specific, actionable content

Format as JSON with these exact keys: seriesTitle, seriesConcept, throughLine, entries (array), publishingCadence`;
        break;

      case 'persona-generator':
        systemPrompt = `You are a marketing strategist expert specializing in audience research and brand voice development.`;
        userPrompt = `Based on this business information, create detailed audience personas and brand voice guidelines:

Business: ${inputs.business}
Products/Services: ${inputs.products}
Current Audience: ${inputs.audience || 'Unknown'}
Goals: ${inputs.goals}

Generate:
1. PERSONAS: 2-3 detailed audience personas with demographics, psychographics, pain points, goals, and content preferences
2. BRAND_VOICE: Comprehensive brand voice definition including tone, messaging pillars, do's and don'ts, and example phrases

Format as JSON with keys: personas (array), brandVoice (object)`;
        break;

      case 'content-maximizer':
        systemPrompt = `You are a content repurposing expert who maximizes content reach across platforms.`;
        userPrompt = `Repurpose this content for multiple platforms:

Original Content: ${inputs.content}
Content Type: ${inputs.contentType}
Target Platforms: ${inputs.platforms.join(', ')}

For each platform, provide:
- Optimal format and specifications
- Platform-specific caption/copy
- Hashtag recommendations
- Best posting times
- Call-to-action variations

Also include:
- Content calendar suggestions for next 2 weeks
- Key highlights/clips to extract (if video content)

Format as JSON with platform-specific adaptations and calendar suggestions`;
        break;

      case 'engagement-responder':
        systemPrompt = `You are a professional community manager expert in crafting engaging, on-brand responses.`;
        userPrompt = `Generate response options for this comment/message:

Comment: "${inputs.comment}"
Platform: ${inputs.platform}
Brand Voice: ${inputs.brandVoice || 'Professional and friendly'}
Desired Tone: ${inputs.tone}

Provide:
1. SENTIMENT: Analysis of the original comment (positive/negative/neutral)
2. RESPONSES: 3-5 response variations of different lengths
3. ESCALATION: Whether this requires human review (true/false with reason)
4. SUGGESTIONS: Recommended emojis and tone indicators

Format as JSON with keys: sentiment, responses (array), escalation (object), suggestions`;
        break;

      case 'production-assistant':
        systemPrompt = `You are a professional video production coordinator with expertise in pre-production planning.`;
        userPrompt = `Create a comprehensive production plan for this video:

Concept: ${inputs.concept}
Duration: ${inputs.duration}
Production Scale: ${inputs.scale}
Budget Range: ${inputs.budget || 'Not specified'}
Location Type: ${inputs.location}

Generate:
1. SHOT_LIST: Detailed shot descriptions with camera angles and equipment needs
2. CHECKLIST: Pre-production tasks, day-of-shoot checklist, post-production reminders
3. EQUIPMENT: Recommended gear based on budget and scale
4. LOCATION_TIPS: Scouting advice and considerations
5. SCHEDULE: Suggested shooting order and timeline

Format as JSON with these exact keys: shotList (array), checklist (object), equipment (array), locationTips (array), schedule (array)`;
        break;

      default:
        throw new Error('Invalid tool type');
    }

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits exhausted. Please add credits to continue.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      throw new Error('AI generation failed');
    }

    const data = await response.json();
    const generatedContent = data.choices[0].message.content;

    console.log('Content generated successfully');

    // STEP 4: Consume credits after successful generation
    const { data: consumeResult, error: consumeError } = await supabase.rpc('consume_credits', {
      p_user_id: user.id,
      p_amount: creditCost,
      p_tool_name: toolType,
      p_metadata: { 
        generated_at: new Date().toISOString(),
        tool_type: toolType
      }
    });

    if (consumeError) {
      console.error('Error consuming credits:', consumeError);
      // Still return the content but log the error
      // This is a trade-off: user got their content, so we don't want to fail
      console.error('WARNING: Credits were not deducted due to error');
    }

    console.log(`Credits consumed successfully. Result:`, consumeResult);

    // Get updated balance to return to user
    const { data: updatedCredits, error: balanceError } = await supabase
      .from('user_credits')
      .select('balance, monthly_allowance')
      .eq('user_id', user.id)
      .single();

    const newBalance = updatedCredits?.balance ?? (currentBalance - creditCost);
    const monthlyAllowance = updatedCredits?.monthly_allowance ?? 0;

    console.log(`New balance: ${newBalance}`);

    return new Response(
      JSON.stringify({ 
        content: generatedContent,
        credits: {
          consumed: creditCost,
          remaining: newBalance,
          monthlyAllowance: monthlyAllowance
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-content function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
