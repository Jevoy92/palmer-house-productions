import { isCompletedRoadmapStatus } from "./studio-recovery.ts";
import { buildBrandVoiceContext } from "./studio-voice.ts";

/**
 * Workspace knowledge base.
 *
 * Every AI surface in the Studio reads from the same digest so a member never
 * has to restate context they already gave us. The digest is intentionally
 * compact: it is prepended to prompts, so it summarises rather than dumps.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Client = { from: (table: string) => any };

const clip = (value: unknown, max = 220) => {
  const text = typeof value === "string" ? value.trim() : "";
  if (!text) return "";
  return text.length > max ? `${text.slice(0, max)}…` : text;
};

const list = (label: string, rows: string[]) =>
  rows.length ? `${label}:\n${rows.map((row) => `- ${row}`).join("\n")}` : "";

export async function loadWorkspaceVoice(client: Client, workspaceId: string) {
  const brand = await client
    .from("brand_profiles")
    .select("voice_traits, avoid_language, brand_details, content_examples")
    .eq("workspace_id", workspaceId)
    .maybeSingle();
  if (brand.error)
    throw new Error("Could not load saved brand voice. Please retry before generating.");
  return buildBrandVoiceContext(brand.data);
}

export async function loadWorkspaceKnowledge(client: Client, workspaceId: string) {
  const [campaigns, ideas, calendar, settings, videos, assets, brand] = await Promise.all([
    client
      .from("campaigns")
      .select("title, topic, goal, primary_lane, status, strategy, updated_at")
      .eq("workspace_id", workspaceId)
      .order("updated_at", { ascending: false })
      .limit(8),
    client
      .from("content_ideas")
      .select("body, primary_lane, status, created_at")
      .eq("workspace_id", workspaceId)
      .order("created_at", { ascending: false })
      .limit(10),
    client
      .from("calendar_items")
      .select("title, channel, status, publish_at")
      .eq("workspace_id", workspaceId)
      .order("publish_at")
      .limit(10),
    client
      .from("workspace_settings")
      .select("ai_memory, preferred_pal")
      .eq("workspace_id", workspaceId)
      .maybeSingle(),
    client
      .from("workspace_video_items")
      .select("item_key, status")
      .eq("workspace_id", workspaceId)
      .limit(30),
    client
      .from("campaign_assets")
      .select("id, title, kind, content, status, campaign_id, updated_at")
      .eq("workspace_id", workspaceId)
      .order("updated_at", { ascending: false })
      .limit(14),
    client
      .from("brand_profiles")
      .select(
        "business_name, description, industry, creator_type, primary_goal, primary_audience, offers, proof_points, calls_to_action, platforms, personal_interests, personal_story, brand_details, voice_traits, avoid_language, content_examples",
      )
      .eq("workspace_id", workspaceId)
      .maybeSingle(),
  ]);

  if ([campaigns, ideas, calendar, settings, videos, assets, brand].some((result) => result.error))
    throw new Error("Could not load shared workspace context. Please retry before generating.");

  // Voice notes, documents and recordings the member dropped into conversations.
  // Summaries only — the full text stays in the database so prompts stay bounded.
  const attachments = await client
    .from("conversation_attachments")
    .select("kind, label, summary")
    .eq("workspace_id", workspaceId)
    .order("created_at", { ascending: false })
    .limit(8);
  if (attachments.error) throw new Error("Could not load shared conversation files. Please retry.");
  const attachmentRows = (attachments.data || []).map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (row: any) => `${row.kind}: ${row.label} — ${clip(row.summary, 200)}`,
  );

  const campaignRows = (campaigns.data || []).map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (row: any) =>
      `${row.title} (${row.primary_lane}, ${row.status}) — ${clip(
        (row.strategy && row.strategy.bigIdea) || row.topic,
      )}`,
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ideaRows = (ideas.data || []).map((row: any) => `${clip(row.body, 160)} [${row.status}]`);
  const calendarRows = (calendar.data || []).map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (row: any) => `${row.title} — ${row.channel}, ${String(row.publish_at).slice(0, 10)}`,
  );
  const doneVideos = (videos.data || [])
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .filter((row: any) => isCompletedRoadmapStatus(row.status))
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((row: any) => String(row.item_key));

  const memory = settings.data?.ai_memory;
  const sections = [
    brand.data ? `Saved Brand DNA: ${JSON.stringify(brand.data).slice(0, 10000)}` : "",
    buildBrandVoiceContext(brand.data),
    list("Campaigns already built (never repeat these angles verbatim)", campaignRows),
    list("Ideas captured but not yet produced", ideaRows),
    list("Already scheduled", calendarRows),
    list(
      "Current library assets (continue or revise these instead of duplicating)",
      (assets.data || []).map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (row: any) =>
          `${row.title} [${row.kind}, ${row.status}; id ${row.id}] — ${clip(row.content, 500)}`,
      ),
    ),
    list("Files and voice notes the member has shared", attachmentRows),
    doneVideos.length ? `Roadmap videos already finished: ${doneVideos.join(", ")}` : "",
    memory && Object.keys(memory).length ? `Approved memory: ${JSON.stringify(memory)}` : "",
  ].filter(Boolean);

  if (!sections.length)
    return "This workspace has no prior activity yet. This is their first piece of work.";
  return `WORKSPACE KNOWLEDGE BASE — treat this as already-known context. Build on it, never ask the member to repeat it, and never duplicate work that already exists.\n\n${sections.join(
    "\n\n",
  )}`;
}
