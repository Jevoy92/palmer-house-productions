import { defineTool } from "@lovable.dev/mcp-js";
import { supabaseForUser, unauthenticated, fail, ok } from "../supabase";

export default defineTool({
  name: "list_workspaces",
  title: "List workspaces",
  description: "List the Palmer House Studio workspaces the signed-in user belongs to.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async (_input, ctx) => {
    if (!ctx.isAuthenticated()) return unauthenticated();
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("workspaces")
      .select("id, name, slug, created_at")
      .order("created_at", { ascending: true });
    if (error) return fail(error.message);
    return ok({ workspaces: data ?? [] });
  },
});
