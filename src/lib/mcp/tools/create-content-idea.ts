import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser, unauthenticated, fail, ok } from "../supabase";

const LANES = ["spotlight", "reel", "evergreen", "system"] as const;

export default defineTool({
  name: "create_content_idea",
  title: "Create content idea",
  description:
    "Capture a new content idea in a Palmer House Studio workspace. Map it to one lane: spotlight (trust/proof), reel (attention), evergreen (education) or system (repeatability).",
  inputSchema: {
    workspace_id: z.string().uuid().describe("Workspace id from list_workspaces."),
    body: z.string().trim().min(1).describe("The idea itself, in plain language."),
    primary_lane: z.enum(LANES).optional().describe("Palmer House lane for this idea."),
    business_problem: z.string().trim().optional().describe("The business problem or decision this idea addresses."),
    source_url: z.string().url().optional().describe("Optional source link the idea came from."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  handler: async ({ workspace_id, body, primary_lane, business_problem, source_url }, ctx) => {
    if (!ctx.isAuthenticated()) return unauthenticated();
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("content_ideas")
      .insert({
        workspace_id,
        created_by: ctx.getUserId(),
        body,
        primary_lane: primary_lane ?? "reel",
        business_problem: business_problem ?? "",
        source_type: source_url ? "link" : "text",
        source_url: source_url ?? "",
      })
      .select("id, body, primary_lane, business_problem, status, created_at")
      .single();
    if (error) return fail(error.message);
    return ok({ idea: data });
  },
});
