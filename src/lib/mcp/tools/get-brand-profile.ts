import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser, unauthenticated, fail, ok } from "../supabase";

export default defineTool({
  name: "get_brand_profile",
  title: "Get brand profile",
  description:
    "Read the brand profile for a workspace: business name, industry, audience, voice traits, offers, proof points and platforms.",
  inputSchema: {
    workspace_id: z.string().uuid().describe("Workspace id from list_workspaces."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ workspace_id }, ctx) => {
    if (!ctx.isAuthenticated()) return unauthenticated();
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("brand_profiles")
      .select("*")
      .eq("workspace_id", workspace_id)
      .maybeSingle();
    if (error) return fail(error.message);
    if (!data) return fail("No brand profile exists for this workspace yet.");
    return ok({ brand_profile: data });
  },
});
