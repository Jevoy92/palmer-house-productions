import { createUserScopedSupabase } from "./supabase/client";
import type { PalName } from "./studio-model";
import type { StudioAuthor } from "./studio-recovery";

export async function authorizedStudioClient(accessToken: string, workspaceId: string) {
  const client = createUserScopedSupabase(accessToken);
  const { data, error } = await client.auth.getUser(accessToken);
  if (error || !data.user) throw new Error("Your session has expired. Please sign in again.");
  const membership = await client
    .from("workspace_members")
    .select("role")
    .eq("workspace_id", workspaceId)
    .eq("user_id", data.user.id)
    .maybeSingle();
  if (membership.error || !membership.data)
    throw new Error("You do not have access to this workspace.");
  return { client, user: data.user, role: membership.data.role };
}
export type StudioServerClient = ReturnType<typeof createUserScopedSupabase>;
export async function resolveStudioAuthor(
  client: StudioServerClient,
  workspaceId: string,
  pal: PalName,
  profileId?: string,
): Promise<{ author: StudioAuthor; personality: string }> {
  if (!profileId)
    return {
      author: { kind: "pal", pal, name: pal[0].toUpperCase() + pal.slice(1) },
      personality: "",
    };
  const profile = await client
    .from("studio_pal_profiles")
    .select("*")
    .eq("workspace_id", workspaceId)
    .eq("id", profileId)
    .maybeSingle();
  if (profile.error || !profile.data)
    throw new Error("This custom Pal is unavailable in the active workspace.");
  return {
    author: {
      kind: "pal",
      name: profile.data.name,
      pal: profile.data.base_pal as PalName,
      profileId: profile.data.id,
      avatarPath: profile.data.avatar_path,
    },
    personality: profile.data.personality,
  };
}
export async function studioMemberAuthor(
  client: StudioServerClient,
  userId: string,
): Promise<StudioAuthor> {
  const result = await client.from("profiles").select("full_name").eq("id", userId).maybeSingle();
  if (result.error) throw new Error("Could not load your member profile.");
  return { kind: "member", name: result.data?.full_name || "Workspace member", userId };
}
