import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authorizedStudioClient } from "./studio-auth.server";
import { StudioAuthSchema } from "./studio-recovery";
import {
  loadWorkspaceMemory,
  MemoryInputSchema,
  type StudioMemoryEntry,
  type StudioMemoryExport,
} from "./studio-memory";
import type { Json } from "./supabase/database.types";

export const loadStudioMemory = createServerFn({ method: "POST" })
  .validator(StudioAuthSchema)
  .handler(async ({ data }) => {
    const { client } = await authorizedStudioClient(data.accessToken, data.workspaceId);
    return loadWorkspaceMemory(client, data.workspaceId);
  });

function mutationError(error: { code?: string; message?: string } | null) {
  if (!error) return;
  if (error.code === "PGRST202" || error.code === "42883")
    throw new Error(
      "Shared memory needs the latest database migration. Your existing workspace is still available.",
    );
  const known = ["Memory changed", "Memory limit", "Memory content limit", "Legacy notes changed"];
  if (known.some((message) => error.message?.startsWith(message))) throw new Error(error.message);
  throw new Error("Could not save shared memory. Please reload and retry.");
}
export const saveStudioMemory = createServerFn({ method: "POST" })
  .validator(StudioAuthSchema.extend({ memory: MemoryInputSchema }))
  .handler(async ({ data }) => {
    const { client } = await authorizedStudioClient(data.accessToken, data.workspaceId);
    const result = await client.rpc("save_workspace_memory", {
      target_workspace_id: data.workspaceId,
      memory_id: data.memory.id || null,
      memory_title: data.memory.title,
      memory_content: data.memory.content,
      expected_revision: data.memory.expectedRevision || null,
    });
    mutationError(result.error);
    if (!result.data) throw new Error("Memory was not saved. Please retry.");
    return result.data as unknown as StudioMemoryEntry;
  });
export const forgetStudioMemory = createServerFn({ method: "POST" })
  .validator(
    StudioAuthSchema.extend({
      id: z.string().uuid(),
      expectedRevision: z.number().int().positive(),
    }),
  )
  .handler(async ({ data }) => {
    const { client } = await authorizedStudioClient(data.accessToken, data.workspaceId);
    const result = await client.rpc("forget_workspace_memory", {
      target_workspace_id: data.workspaceId,
      memory_id: data.id,
      expected_revision: data.expectedRevision,
    });
    mutationError(result.error);
    return { ok: true };
  });
export const forgetStudioLegacyMemory = createServerFn({ method: "POST" })
  .validator(StudioAuthSchema.extend({ expectedValue: z.unknown() }))
  .handler(async ({ data }) => {
    const { client } = await authorizedStudioClient(data.accessToken, data.workspaceId);
    const result = await client.rpc("forget_workspace_legacy_memory", {
      target_workspace_id: data.workspaceId,
      expected_value: data.expectedValue as Json,
    });
    mutationError(result.error);
    return { ok: true };
  });
export const exportStudioMemory = createServerFn({ method: "POST" })
  .validator(StudioAuthSchema)
  .handler(async ({ data }): Promise<StudioMemoryExport> => {
    const { client } = await authorizedStudioClient(data.accessToken, data.workspaceId);
    const snapshot = await loadWorkspaceMemory(client, data.workspaceId);
    return {
      format: "palmer-house-workspace-memory",
      version: 1,
      exportedAt: new Date().toISOString(),
      workspaceId: data.workspaceId,
      entries: snapshot.entries,
      legacyUnreviewedNotes: snapshot.legacy,
    };
  });
