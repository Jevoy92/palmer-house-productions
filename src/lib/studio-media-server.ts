import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { withStudioCredits } from "./studio-credit-runtime.server";
import {
  StudioAuthSchema,
  assertWorkspaceStoragePath,
  type StudioPalAvatar,
} from "./studio-recovery";
import { palNames } from "./studio-model";
import { palAvatarPrompt, palAvatarStyleVersion } from "./studio-image-brief";

export const generateStudioPalAvatar = createServerFn({ method: "POST" })
  .validator(
    StudioAuthSchema.extend({
      name: z.string().trim().max(60).default("My Pal"),
      description: z.string().trim().min(8).max(1200),
      basePal: z.enum(palNames).optional(),
    }),
  )
  .handler(
    async ({ data }): Promise<StudioPalAvatar> =>
      withStudioCredits(data, "avatar", async () => {
        const { client } = await (
          await import("./studio-auth.server")
        ).authorizedStudioClient(data.accessToken, data.workspaceId);
        const image = await (
          await import("./ai.server")
        ).generateStudioImage(palAvatarPrompt(data.name, data.description));
        if (image.bytes.length > 5 * 1024 * 1024)
          throw new Error(
            "The portrait is too large to use as an avatar. Try a simpler portrait or upload an image under 5 MB.",
          );
        const path = `${data.workspaceId}/pals/${crypto.randomUUID()}.${image.extension}`;
        const uploaded = await client.storage.from("campaign-assets").upload(path, image.bytes, {
          contentType: image.mimeType,
          upsert: false,
          metadata: { styleVersion: palAvatarStyleVersion, purpose: "pal-avatar" },
        });
        if (uploaded.error) throw new Error("The portrait could not be saved. Please retry.");
        const signed = await client.storage.from("campaign-assets").createSignedUrl(path, 3600);
        // The portrait exists even if URL signing is temporarily unavailable.
        return {
          storagePath: path,
          mimeType: image.mimeType,
          url: signed.data?.signedUrl || "",
          styleVersion: palAvatarStyleVersion,
        };
      }),
  );

export const getStudioAssetImageUrl = createServerFn({ method: "POST" })
  .validator(StudioAuthSchema.extend({ assetId: z.string().uuid() }))
  .handler(async ({ data }) => {
    const { client } = await (
      await import("./studio-auth.server")
    ).authorizedStudioClient(data.accessToken, data.workspaceId);
    const source = await client
      .from("campaign_assets")
      .select("id,kind,campaign_id,metadata")
      .eq("workspace_id", data.workspaceId)
      .eq("id", data.assetId)
      .maybeSingle();
    if (source.error || !source.data)
      throw new Error("This output is unavailable in the active workspace.");
    let image = source.data;
    const sourceMetadata = source.data.metadata as Record<string, unknown>;
    if (sourceMetadata?.mediaAssetId) {
      const mediaId = z.string().uuid().safeParse(sourceMetadata.mediaAssetId);
      if (!mediaId.success) throw new Error("This output's image association is invalid.");
      const linked = await client
        .from("campaign_assets")
        .select("id,kind,campaign_id,metadata")
        .eq("workspace_id", data.workspaceId)
        .eq("id", mediaId.data)
        .maybeSingle();
      const linkedMetadata = linked.data?.metadata as Record<string, unknown> | undefined;
      if (
        linked.error ||
        !linked.data ||
        linked.data.kind !== "image" ||
        linkedMetadata?.targetAssetId !== source.data.id ||
        linked.data.campaign_id !== source.data.campaign_id
      )
        throw new Error("This image is not associated with this output.");
      image = linked.data;
    }
    const metadata = image.metadata as Record<string, unknown>;
    if (
      image.kind !== "image" ||
      typeof metadata?.storagePath !== "string" ||
      !["image/png", "image/jpeg", "image/webp"].includes(String(metadata.mimeType))
    )
      throw new Error("This output has no saved still image.");
    const path = assertWorkspaceStoragePath(data.workspaceId, metadata.storagePath);
    const signed = await client.storage.from("campaign-assets").createSignedUrl(path, 3600);
    if (signed.error || !signed.data?.signedUrl)
      throw new Error("Could not open this image. Please retry.");
    return signed.data.signedUrl;
  });
