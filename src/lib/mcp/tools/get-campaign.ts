import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser, unauthenticated, fail, ok } from "../supabase";

export default defineTool({
  name: "get_campaign",
  title: "Get campaign",
  description: "Read one campaign with its strategy, production plan and generated assets (scripts, captions, posts).",
  inputSchema: {
    campaign_id: z.string().uuid().describe("Campaign id from list_campaigns."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ campaign_id }, ctx) => {
    if (!ctx.isAuthenticated()) return unauthenticated();
    const supabase = supabaseForUser(ctx);
    const { data: campaign, error } = await supabase
      .from("campaigns")
      .select("*")
      .eq("id", campaign_id)
      .maybeSingle();
    if (error) return fail(error.message);
    if (!campaign) return fail("Campaign not found, or you do not have access to it.");
    const { data: assets, error: assetError } = await supabase
      .from("campaign_assets")
      .select("id, kind, title, content, status, sort_order, metadata")
      .eq("campaign_id", campaign_id)
      .order("sort_order", { ascending: true });
    if (assetError) return fail(assetError.message);
    return ok({ campaign, assets: assets ?? [] });
  },
});
