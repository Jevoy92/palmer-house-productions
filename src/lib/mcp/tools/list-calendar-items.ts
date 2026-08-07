import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser, unauthenticated, fail, ok } from "../supabase";

export default defineTool({
  name: "list_calendar_items",
  title: "List calendar items",
  description: "List scheduled content calendar items for a workspace, optionally within a date range.",
  inputSchema: {
    workspace_id: z.string().uuid().describe("Workspace id from list_workspaces."),
    from: z.string().datetime().optional().describe("ISO timestamp lower bound for publish_at."),
    to: z.string().datetime().optional().describe("ISO timestamp upper bound for publish_at."),
    limit: z.number().int().min(1).max(200).optional().describe("Max rows to return (default 50)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ workspace_id, from, to, limit }, ctx) => {
    if (!ctx.isAuthenticated()) return unauthenticated();
    const supabase = supabaseForUser(ctx);
    let query = supabase
      .from("calendar_items")
      .select("id, title, channel, publish_at, status, notes, campaign_id")
      .eq("workspace_id", workspace_id)
      .order("publish_at", { ascending: true })
      .limit(limit ?? 50);
    if (from) query = query.gte("publish_at", from);
    if (to) query = query.lte("publish_at", to);
    const { data, error } = await query;
    if (error) return fail(error.message);
    return ok({ items: data ?? [] });
  },
});
