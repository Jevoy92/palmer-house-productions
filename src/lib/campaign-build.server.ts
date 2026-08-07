import type { SupabaseClient } from "@supabase/supabase-js";
import { CampaignOutputSchema, LongFormOutputSchema } from "./studio-model";
import type { Json } from "./supabase/database.types";
import type { z } from "zod";

export type CampaignOutput = z.infer<typeof CampaignOutputSchema>;

export type CampaignBuildBrief = {
  goal: string;
  topic: string;
  offer: string;
  audience: string;
  anchorFormat: string;
  depth: string;
  brand: {
    businessName: string;
    creatorType: string;
    primaryGoal: string;
    description: string;
    industry: string;
    primaryAudience: string;
    offers: string[];
    platforms: string[];
    voice: string[];
    proof: string[];
    callsToAction: string[];
    avoidLanguage: string[];
  };
};

export function campaignBriefText(data: CampaignBuildBrief) {
  return `Business: ${data.brand.businessName}\nCategory / industry: ${data.brand.industry || "Not supplied"}\nWhat they do: ${data.brand.description || "Not supplied"}\nWhat they sell: ${data.brand.offers.join(" | ") || "Not supplied"}\nWho they serve: ${data.brand.primaryAudience || data.audience}\nCreator type: ${data.brand.creatorType}\nPrimary goal: ${data.brand.primaryGoal}\nActive platforms: ${data.brand.platforms.join(" | ") || "Not supplied"}\nVoice: ${data.brand.voice.join(", ")}\nVerified proof only: ${data.brand.proof.join(" | ") || "None supplied — do not invent any"}\nPreferred CTAs: ${data.brand.callsToAction.join(" | ")}\nAvoid: ${data.brand.avoidLanguage.join(" | ")}\n\nCampaign goal: ${data.goal}\nTopic and chosen direction: ${data.topic}\nOffer or next step: ${data.offer}\nAudience for this campaign: ${data.audience}\nAnchor format: ${data.anchorFormat}\nPlanning depth: ${data.depth}`;
}

const groundingRules = [
  "Ground every line in the supplied category, services, and customers. Use the vocabulary of that trade or field. If a sentence could be pasted onto a different company without changing a word, rewrite it.",
  "Write with calm confidence and concrete language. No hype, no filler, no marketing abstractions like 'leverage', 'authority positioning', or 'value proposition'. Never restate the brief back to the reader.",
  "Never invent proof, results, statistics, awards, or testimonials. If proof was not supplied, build around what can be filmed or written truthfully.",
];

export const campaignCoreInstructions = [
  "You are the Palmer House Campaign Architect building one campaign for one specific business. Everything you write must be usable by that business tomorrow with the people, tools, and location they already have.",
  ...groundingRules,
  "Every short-form script must be a complete word-for-word script the person can read on camera — 120 to 220 spoken words each, with a first line that earns the next three seconds. Never write an outline, a summary, or bullet directions in place of the spoken words.",
  "The production plan must be genuinely filmable by the person or team described, using ordinary gear.",
  "Use the Four Pals as an internal lane system: spotlight for trust and authority, reel for short-form attention, evergreen for durable education, system for internal clarity.",
  "For platformPosts, write genuinely platform-native work for YouTube, Instagram, TikTok, LinkedIn, Facebook, and Threads — not one caption copied six ways. Each post needs its own hook written in that platform's rhythm, and a body of real substance (at least 60 words), never a placeholder line. Use native interaction patterns only when they support the stated goal. Include at least one poll and one carousel or document.",
  "Required counts, follow them exactly: 8 to 12 platformPosts covering all six platforms; 3 to 5 shorts; 3 to 5 captions; 3 to 6 faq entries; 5 to 8 carousel slides; 3 to 5 messagePillars; 2 to 6 channelPlan entries; 4 to 10 production shots; 3 to 8 production b-roll items; 4 to 10 checklist items; 2 to 6 delivery notes; 1 to 4 wardrobe notes; 4 to 10 schedule entries.",
  "A separate writer is handling the long-form video script and the blog article, so do not summarize or reference them — just make everything you write stand on its own.",
  "Return only the requested structured result.",
].join(" ");

export const campaignLongFormInstructions = [
  "You are the Palmer House long-form writer. You produce two finished pieces from one idea: the main YouTube video script and the blog article version of the same story.",
  ...groundingRules,
  "VIDEO SCRIPT: build 6 to 9 scenes. Every scene's 'spoken' field must hold 150 to 250 words of actual verbatim on-camera speech for that scene — a scene with fewer than 150 spoken words is a failure. The 'script' field is the concatenation of every scene's spoken text as continuous readable prose, so the finished script lands between 1100 and 1800 words, roughly a 9 to 13 minute video. Never summarize, and never put outlines, bullets, stage directions, or placeholders like '[explain here]' inside 'spoken'. Each scene also needs a beat, a visible action or framing direction, concise on-screen text, and achievable b-roll from this business's real work.",
  "ARTICLE: this is not a transcript — rewrite the same idea for a reader who is scanning and searching. Give it a headline, a one-sentence dek, 5 to 7 sections that each carry a real heading and 200 to 300 words of substantive body prose (a section body under 150 words is a failure), 3 to 5 key takeaways, and a closing paragraph that leads to the offer. Total article length should land between 1100 and 1600 words. Never return an empty section body, a single line, or a bulleted stub.",
  "Return only the requested structured result.",
].join(" ");

const wordCount = (value: string) => value.trim().split(/\s+/).filter(Boolean).length;

/** Runs both AI passes and merges them into one validated campaign output. */
export async function buildCampaignOutput(brief: CampaignBuildBrief): Promise<CampaignOutput> {
  const { parseStructured } = await import("./ai.server");
  const briefText = campaignBriefText(brief);
  const [response, longForm] = await Promise.all([
    parseStructured(
      CampaignOutputSchema.omit({ anchor: true, article: true }),
      "palmer_house_campaign",
      campaignCoreInstructions,
      briefText,
    ),
    parseStructured(
      LongFormOutputSchema,
      "palmer_house_longform",
      campaignLongFormInstructions,
      briefText,
    ),
  ]);

  const sceneRead = longForm.anchor.scenes
    .map((scene) => scene.spoken.trim())
    .filter(Boolean)
    .join("\n\n");
  const anchor = {
    ...longForm.anchor,
    script:
      wordCount(sceneRead) > wordCount(longForm.anchor.script) ? sceneRead : longForm.anchor.script,
  };

  return CampaignOutputSchema.parse({
    ...(response as Record<string, unknown>),
    anchor,
    article: longForm.article,
  });
}

export function assetsFromOutput(output: CampaignOutput) {
  const rows: Array<{
    kind: string;
    title: string;
    content: string;
    metadata?: Json;
    sort_order: number;
  }> = [];
  rows.push({
    kind: "anchor_script",
    title: output.anchor.title,
    content: `${output.anchor.hook}\n\n${output.anchor.script}\n\nCTA: ${output.anchor.callToAction}`,
    metadata: { scenes: output.anchor.scenes, hook: output.anchor.hook } as Json,
    sort_order: 0,
  });
  output.shorts.forEach((item, index) =>
    rows.push({
      kind: "short_script",
      title: item.title,
      content: `${item.hook}\n\n${item.script}\n\nCTA: ${item.callToAction}`,
      sort_order: 10 + index,
    }),
  );
  output.captions.forEach((item, index) =>
    rows.push({
      kind: "caption",
      title: `${item.platform} caption`,
      content: item.copy,
      metadata: { platform: item.platform },
      sort_order: 20 + index,
    }),
  );
  output.faq.forEach((item, index) =>
    rows.push({ kind: "faq", title: item.question, content: item.answer, sort_order: 30 + index }),
  );
  rows.push({
    kind: "newsletter",
    title: output.newsletter.subject,
    content: output.newsletter.body,
    sort_order: 40,
  });
  rows.push({
    kind: "carousel",
    title: output.carousel.title,
    content: output.carousel.slides.join("\n\n"),
    metadata: { slides: output.carousel.slides },
    sort_order: 50,
  });
  rows.push({
    kind: "production_note",
    title: "Production plan",
    content: JSON.stringify(output.productionPlan),
    metadata: output.productionPlan as Json,
    sort_order: 60,
  });
  output.platformPosts.forEach((item, index) =>
    rows.push({
      kind: "platform_post",
      title: item.title,
      content: item.body,
      metadata: item as Json,
      sort_order: 70 + index,
    }),
  );
  if (output.article) {
    const article = output.article;
    rows.push({
      kind: "article",
      title: article.title,
      content: [
        article.dek,
        ...article.sections.map((section) => `## ${section.heading}\n\n${section.body}`),
        article.keyTakeaways.length
          ? `## Key takeaways\n\n- ${article.keyTakeaways.join("\n- ")}`
          : "",
        article.closing,
      ]
        .filter(Boolean)
        .join("\n\n"),
      metadata: article as Json,
      sort_order: 45,
    });
  }
  return rows;
}

/**
 * Writes the finished campaign. Each step reports its own failure so a single
 * rejected row can never silently roll the whole build back to an empty draft.
 */
export async function persistCampaign(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  client: SupabaseClient<any, any, any>,
  campaignId: string,
  workspaceId: string,
  output: CampaignOutput,
) {
  const campaignUpdate = await client
    .from("campaigns")
    .update({
      title: output.title,
      status: "ready",
      primary_lane: output.primaryLane,
      strategy: output.strategy,
      production_plan: output.productionPlan,
    })
    .eq("id", campaignId)
    .eq("workspace_id", workspaceId);
  if (campaignUpdate.error)
    throw new Error(`Could not save the campaign strategy: ${campaignUpdate.error.message}`);

  await client.from("campaign_assets").delete().eq("campaign_id", campaignId);
  const rows = assetsFromOutput(output).map((row) => ({
    ...row,
    campaign_id: campaignId,
    workspace_id: workspaceId,
  }));
  const assetInsert = await client.from("campaign_assets").insert(rows);
  if (assetInsert.error) {
    // Fall back to row-by-row so one rejected asset cannot lose the whole set.
    let saved = 0;
    for (const row of rows) {
      const single = await client.from("campaign_assets").insert(row);
      if (!single.error) saved += 1;
    }
    if (saved === 0)
      throw new Error(`Could not save the campaign content: ${assetInsert.error.message}`);
  }

  await client.from("calendar_items").delete().eq("campaign_id", campaignId);
  const now = new Date();
  const calendarInsert = await client.from("calendar_items").insert(
    output.schedule.map((item) => ({
      workspace_id: workspaceId,
      campaign_id: campaignId,
      title: item.title,
      channel: item.channel,
      publish_at: new Date(now.getTime() + item.dayOffset * 86_400_000).toISOString(),
    })),
  );
  // A calendar hiccup must not throw away a finished campaign.
  if (calendarInsert.error) console.error("calendar insert failed", calendarInsert.error.message);
}
