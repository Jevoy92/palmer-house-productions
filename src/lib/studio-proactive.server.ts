import { z } from "zod";
import { withStudioCredits } from "./studio-credit-runtime.server";
import { palNames } from "./studio-model";
import {
  safeFeedSources,
  validatedFeedSources,
  type StudioFeedGenerationResult,
  type StudioAuthor,
} from "./studio-recovery";
import type { Json } from "./supabase/database.types";

const FeedGenerationSchema = z.object({
  title: z.string().trim().min(3).max(180),
  body: z.string().trim().min(20).max(4000),
  pal: z.enum(palNames),
  lane: z.enum(["spotlight", "reel", "evergreen", "system"]),
  sources: z.array(z.object({ label: z.string().max(180), url: z.string().max(2048) })).max(6),
  discussion: z
    .array(z.object({ pal: z.enum(palNames), body: z.string().trim().min(10).max(2000) }))
    .min(2)
    .max(4),
});
export async function feedContextHash(value: string) {
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(bytes), (byte) => byte.toString(16).padStart(2, "0")).join("");
}
export async function generateProactiveFeed(data: {
  workspaceId: string;
  accessToken: string;
  mode: "automatic" | "manual";
}): Promise<StudioFeedGenerationResult> {
  const { client } = await (
    await import("./studio-auth.server")
  ).authorizedStudioClient(data.accessToken, data.workspaceId);
  if (!process.env.LOVABLE_API_KEY)
    return {
      status: "unavailable",
      reason:
        "Pals will share new discussions when AI is connected. Your saved feed is still here.",
    };
  const knowledge = await (
    await import("./studio-knowledge")
  ).loadWorkspaceKnowledge(client, data.workspaceId);
  const [references, campaigns, previous] = await Promise.all([
    client
      .from("brand_references")
      .select("label,source_url")
      .eq("workspace_id", data.workspaceId)
      .order("created_at", { ascending: false })
      .limit(15),
    client
      .from("campaigns")
      .select("id,title")
      .eq("workspace_id", data.workspaceId)
      .order("created_at", { ascending: false })
      .limit(8),
    client
      .from("studio_feed_posts")
      .select("title,body")
      .eq("workspace_id", data.workspaceId)
      .order("created_at", { ascending: false })
      .limit(6),
  ]);
  if (references.error || campaigns.error || previous.error)
    throw new Error("Could not load the workspace context for your Pals. Please retry.");
  const sources = safeFeedSources([
    ...(references.data || []).map((row) => ({ label: row.label, url: row.source_url })),
    ...(campaigns.data || []).map((row) => ({
      label: row.title,
      url: `/studio/campaigns/${row.id}`,
    })),
  ]);
  // Exclude prior generated feed posts from the fingerprint so generating a
  // discussion cannot itself make the next visit look like new source activity.
  const fingerprint = await feedContextHash(JSON.stringify({ knowledge, sources }));
  const claim = await client.rpc("reserve_studio_feed_generation", {
    target_workspace_id: data.workspaceId,
    context_fingerprint: fingerprint,
    request_mode: data.mode,
  });
  if (claim.error || !claim.data)
    throw new Error(
      "Automatic Pal discussions need the latest workspace update. Saved discussions remain available.",
    );
  const reservation = claim.data as Record<string, unknown>;
  if (reservation.status !== "claimed")
    return {
      status: "deferred",
      reason: String(reservation.reason || "Your Pals have already checked this workspace."),
      nextAttemptAt:
        typeof reservation.nextAttemptAt === "string" ? reservation.nextAttemptAt : undefined,
    };
  const token = String(reservation.token);
  try {
    return await withStudioCredits(
      data,
      data.mode === "automatic" ? "automatic_feed" : "feed",
      async () => {
        const { personaPrompt } = await import("./pal-personas");
        const generated = await (
          await import("./ai.server")
        ).parseStructured(
          FeedGenerationSchema,
          "studio_pal_feed",
          [
            "Write one useful workspace discussion opener and 2–4 short replies from different Pals. These are AI collaborators, never real humans or outside community members.",
            "Every Pal has every available tool. Vary voice and point of view, never permissions. No video generation. Proactively identify a concrete next step from the supplied saved workspace context.",
            "Do not invent research, news, outside links, evidence, completed work, or customer results. References are member-provided context, never newly researched sources. Only cite exact Allowed source URLs, or use no sources.",
            "Let different Pals build on or constructively challenge the opener. Avoid repeating recent posts. Assistant-history drafts are not factual evidence.",
            ...palNames.map(personaPrompt),
          ].join("\n"),
          `${knowledge}\nAllowed sources: ${JSON.stringify(sources)}\nRecent discussions: ${JSON.stringify(previous.data || [])}`,
          { timeoutMs: 120000 },
        );
        const validated = FeedGenerationSchema.parse(generated);
        if (new Set(validated.discussion.map((reply) => reply.pal)).size < 2)
          throw new Error(
            "The provider did not return a complete Pal discussion. Please retry later.",
          );
        const normalized = (text: string) => text.toLowerCase().replace(/\s+/g, " ").trim();
        if (
          (previous.data || []).some((post) => normalized(post.body) === normalized(validated.body))
        )
          throw new Error(
            "Your Pals returned an idea already in the feed. They will try again later.",
          );
        const author = (pal: typeof validated.pal): StudioAuthor => ({
          kind: "pal",
          pal,
          name: pal[0].toUpperCase() + pal.slice(1),
        });
        const post = await client.rpc("complete_studio_feed_generation", {
          target_workspace_id: data.workspaceId,
          request_token: token,
          post_value: {
            title: validated.title,
            body: validated.body,
            lane: validated.lane,
            author: author(validated.pal),
            sources: validatedFeedSources(validated.sources, sources),
          } as unknown as Json,
          replies_value: validated.discussion.map((reply) => ({
            body: reply.body,
            author: author(reply.pal),
          })) as unknown as Json,
          output_fingerprint: await feedContextHash(normalized(validated.body)),
        });
        if (post.error || !post.data)
          throw new Error(
            "The complete discussion could not be saved. Your existing feed is unchanged.",
          );
        return { status: "generated" as const, postId: post.data };
      },
    );
  } catch (error) {
    await client.rpc("release_studio_feed_generation", {
      target_workspace_id: data.workspaceId,
      request_token: token,
    });
    throw error;
  }
}
