import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { palNames } from "./studio-model";
import { buildAssetImageBrief, assetImagePrompt } from "./studio-image-brief";
export { generateStudioPalAvatar, getStudioAssetImageUrl } from "./studio-media-server";
import type { Json } from "./supabase/database.types";
import {
  ArtifactInputSchema,
  FeedPostInputSchema,
  PalProfileInputSchema,
  StudioAuthSchema,
  assertWorkspaceStoragePath,
  feedReactions,
  safeFeedSources,
  safeStudioAuthor,
  type StudioAuthor,
  type StudioFeedComment,
  type StudioFeedPost,
  type StudioFeedReaction,
  type StudioPalProfile,
} from "./studio-recovery";

const json = (value: unknown) => value as Json;
const auth = async (data: { accessToken: string; workspaceId: string }) =>
  (await import("./studio-auth.server")).authorizedStudioClient(data.accessToken, data.workspaceId);

export const loadStudioRecovery = createServerFn({ method: "POST" })
  .validator(StudioAuthSchema)
  .handler(async ({ data }) => {
    const { client } = await auth(data);
    const [pals, posts] = await Promise.all([
      client
        .from("studio_pal_profiles")
        .select("*")
        .eq("workspace_id", data.workspaceId)
        .order("created_at"),
      client
        .from("studio_feed_posts")
        .select("*")
        .eq("workspace_id", data.workspaceId)
        .order("created_at", { ascending: false })
        .limit(60),
    ]);
    if (pals.error || posts.error)
      throw new Error(
        "Saved Pals and the feed are not available in this workspace yet. Please retry or contact your workspace owner.",
      );
    const ids = (posts.data || []).map((post) => post.id);
    const [comments, reactions] = ids.length
      ? await Promise.all([
          client
            .from("studio_feed_comments")
            .select("*")
            .eq("workspace_id", data.workspaceId)
            .in("post_id", ids)
            .order("created_at")
            .limit(1000),
          client
            .from("studio_feed_reactions")
            .select("*")
            .eq("workspace_id", data.workspaceId)
            .in("post_id", ids)
            .limit(3000),
        ])
      : [
          { data: [], error: null },
          { data: [], error: null },
        ];
    if (comments.error || reactions.error)
      throw new Error("Could not load saved feed discussions. Please retry.");
    const profiles = await Promise.all(
      (pals.data || []).map(async (profile) => {
        let avatarUrl: string | null = null;
        if (profile.avatar_path) {
          assertWorkspaceStoragePath(data.workspaceId, profile.avatar_path);
          const result = await client.storage
            .from("campaign-assets")
            .createSignedUrl(profile.avatar_path, 3600);
          avatarUrl = result.data?.signedUrl || null;
        }
        return { ...profile, avatar_url: avatarUrl } as StudioPalProfile;
      }),
    );
    return {
      customPals: profiles,
      posts: (posts.data || []).map((post) => ({
        ...post,
        sources: safeFeedSources(post.sources),
        author: safeStudioAuthor(post.author, post.created_by, data.workspaceId),
      })) as unknown as StudioFeedPost[],
      comments: (comments.data || []).map((comment) => ({
        ...comment,
        author: safeStudioAuthor(comment.author, comment.created_by, data.workspaceId),
      })) as StudioFeedComment[],
      reactions: (reactions.data || []) as StudioFeedReaction[],
    };
  });

export const saveStudioPalProfile = createServerFn({ method: "POST" })
  .validator(StudioAuthSchema.extend({ profile: PalProfileInputSchema }))
  .handler(async ({ data }) => {
    const { client, user } = await auth(data);
    const values = data.profile;
    if (values.avatarPath) {
      assertWorkspaceStoragePath(data.workspaceId, values.avatarPath);
      const file = await client.storage.from("campaign-assets").download(values.avatarPath);
      if (file.error || !file.data)
        throw new Error("The avatar file is unavailable. Upload it again.");
      const { validateImageBytes } = await import("./studio-artifact.server");
      if (file.data.size > 5 * 1024 * 1024) throw new Error("Choose an avatar under 5 MB.");
      validateImageBytes(new Uint8Array(await file.data.arrayBuffer()), file.data.type);
    }
    const fields = {
      name: values.name,
      base_pal: values.basePal,
      personality: values.personality,
      ...(values.avatarPath !== undefined ? { avatar_path: values.avatarPath } : {}),
      updated_at: new Date().toISOString(),
    };
    const query = values.id
      ? client
          .from("studio_pal_profiles")
          .update(fields)
          .eq("id", values.id)
          .eq("workspace_id", data.workspaceId)
      : client
          .from("studio_pal_profiles")
          .insert({ ...fields, workspace_id: data.workspaceId, created_by: user.id });
    const result = await query.select().single();
    if (result.error || !result.data)
      throw new Error("Could not save your Pal profile. Please retry.");
    return result.data as StudioPalProfile;
  });

export const selectStudioPalProfile = createServerFn({ method: "POST" })
  .validator(StudioAuthSchema.extend({ id: z.string().uuid().nullable() }))
  .handler(async ({ data }) => {
    const { client } = await auth(data);
    if (data.id)
      await (
        await import("./studio-auth.server")
      ).resolveStudioAuthor(client, data.workspaceId, "kiana", data.id);
    const result = await client
      .from("workspace_settings")
      .update({ active_pal_profile_id: data.id })
      .eq("workspace_id", data.workspaceId)
      .select()
      .single();
    if (result.error) throw new Error("Could not save your Pal selection.");
    return result.data;
  });

export const uploadStudioPalAvatar = createServerFn({ method: "POST" })
  .validator(StudioAuthSchema.extend({ dataUrl: z.string().max(7_000_000) }))
  .handler(async ({ data }) => {
    const { client } = await auth(data);
    const match = data.dataUrl.match(/^data:(image\/(?:png|jpeg|webp));base64,([A-Za-z0-9+/=]+)$/);
    if (!match) throw new Error("Choose a PNG, JPEG, or WebP avatar.");
    const bytes = Buffer.from(match[2], "base64");
    if (!bytes.length || bytes.length > 5 * 1024 * 1024)
      throw new Error("Choose an avatar under 5 MB.");
    (await import("./studio-artifact.server")).validateImageBytes(bytes, match[1]);
    const extension = match[1] === "image/jpeg" ? "jpg" : match[1].split("/")[1];
    const path = `${data.workspaceId}/pals/${crypto.randomUUID()}.${extension}`;
    const result = await client.storage
      .from("campaign-assets")
      .upload(path, bytes, { contentType: match[1], upsert: false });
    if (result.error) throw new Error("Could not upload your avatar. Please retry.");
    return { path };
  });

export const resolveStudioPalAvatar = createServerFn({ method: "POST" })
  .validator(StudioAuthSchema.extend({ path: z.string().max(600) }))
  .handler(async ({ data }) => {
    const { client } = await auth(data);
    const path = assertWorkspaceStoragePath(data.workspaceId, data.path);
    const result = await client.storage.from("campaign-assets").createSignedUrl(path, 3600);
    if (result.error || !result.data) throw new Error("Could not load this avatar. Please retry.");
    return result.data.signedUrl;
  });

export const getStudioArtifactUrl = createServerFn({ method: "POST" })
  .validator(StudioAuthSchema.extend({ assetId: z.string().uuid() }))
  .handler(async ({ data }) => {
    const { client } = await auth(data);
    const asset = await client
      .from("campaign_assets")
      .select("metadata")
      .eq("workspace_id", data.workspaceId)
      .eq("id", data.assetId)
      .maybeSingle();
    if (asset.error || !asset.data)
      throw new Error("This file is unavailable in the active workspace.");
    const metadata = asset.data.metadata as Record<string, unknown>;
    if (typeof metadata?.storagePath !== "string")
      throw new Error("This library item has no downloadable file.");
    const path = assertWorkspaceStoragePath(data.workspaceId, metadata.storagePath);
    const result = await client.storage.from("campaign-assets").createSignedUrl(path, 3600);
    if (result.error || !result.data) throw new Error("Could not open this file. Please retry.");
    return result.data.signedUrl;
  });

export const generateStudioArtifact = createServerFn({ method: "POST" })
  .validator(StudioAuthSchema.extend({ artifact: ArtifactInputSchema }))
  .handler(async ({ data }) => {
    const { client, user } = await auth(data);
    const input = data.artifact;
    const target = input.targetAssetId
      ? await client
          .from("campaign_assets")
          .select("id,kind,title,content,metadata,campaign_id,updated_at")
          .eq("workspace_id", data.workspaceId)
          .eq("id", input.targetAssetId)
          .maybeSingle()
      : null;
    if (target && (target.error || !target.data))
      throw new Error("This output is not in the active workspace.");
    if (target?.data && input.campaignId && target.data.campaign_id !== input.campaignId)
      throw new Error("The image target does not belong to this campaign.");
    const campaignId = input.campaignId || target?.data?.campaign_id || null;
    const imageBrief =
      input.kind === "image"
        ? buildAssetImageBrief(
            target?.data || { kind: "image", title: input.title, content: input.prompt },
            input.imagePurpose,
          )
        : undefined;
    const { resolveStudioAuthor } = await import("./studio-auth.server");
    const origin = await resolveStudioAuthor(
      client,
      data.workspaceId,
      input.pal || "kiana",
      input.palProfileId,
    );
    // Validate ownership BEFORE any billable model call or storage write.
    if (input.campaignId) {
      const campaign = await client
        .from("campaigns")
        .select("id")
        .eq("workspace_id", data.workspaceId)
        .eq("id", input.campaignId)
        .maybeSingle();
      if (campaign.error || !campaign.data)
        throw new Error("This campaign is not in the active workspace.");
    }
    if (input.conversationId) {
      const conversation = await client
        .from("conversations")
        .select("id")
        .eq("workspace_id", data.workspaceId)
        .eq("id", input.conversationId)
        .maybeSingle();
      if (conversation.error || !conversation.data)
        throw new Error("This conversation is not in the active workspace.");
    }
    const { loadWorkspaceKnowledge } = await import("./studio-knowledge");
    const knowledge = await loadWorkspaceKnowledge(client, data.workspaceId);
    let bytes: Uint8Array;
    let mimeType: string;
    let extension: string;
    let content = input.content || "";
    if (input.kind === "image") {
      const image = await (
        await import("./ai.server")
      ).generateStudioImage(assetImagePrompt(imageBrief!, input.prompt, knowledge));
      ({ bytes, mimeType, extension } = image);
      content = input.prompt;
    } else {
      if (!content) {
        const generated = await (
          await import("./ai.server")
        ).parseStructured(
          z.object({ content: z.string().min(40).max(30000) }),
          "studio_document",
          "Write a complete, useful document for this workspace. Use clear headings and paragraphs. Ground claims in supplied context; never invent proof or describe actions as completed. Output the document body only in content.",
          `${knowledge}\nDocument title: ${input.title}\nRequest: ${input.prompt}`,
        );
        content = generated.content;
      }
      bytes = await (
        await import("./studio-artifact.server")
      ).renderStudioPdf(input.title, content);
      mimeType = "application/pdf";
      extension = "pdf";
    }
    const id = crypto.randomUUID();
    const path = `${data.workspaceId}/generated/${id}.${extension}`;
    const upload = await client.storage
      .from("campaign-assets")
      .upload(path, bytes, { contentType: mimeType, upsert: false });
    if (upload.error)
      throw new Error("The file was generated but could not be saved. Please retry.");
    let saved = false;
    try {
      const metadata = {
        storagePath: path,
        mimeType,
        generated: true,
        title: input.title,
        byteSize: bytes.length,
        originatingPal: origin.author,
        prompt: input.prompt,
        createdBy: user.id,
        ...(imageBrief ? { imageBrief } : {}),
        ...(target?.data
          ? {
              targetAssetId: target.data.id,
              sourceUpdatedAt: target.data.updated_at,
              imageAlt: `Image for ${target.data.title}`,
            }
          : {}),
      };
      const asset = await client
        .from("campaign_assets")
        .insert({
          id,
          workspace_id: data.workspaceId,
          campaign_id: campaignId,
          kind: input.kind === "pdf" ? "document" : "image",
          title: input.title,
          content,
          metadata: json(metadata),
          status: "draft",
        })
        .select("id")
        .single();
      if (asset.error) throw new Error("Could not add the generated file to your library.");
      saved = true;
      let associationWarning: string | undefined;
      if (target?.data) {
        const linked = await client.rpc("associate_studio_asset_image", {
          target_workspace_id: data.workspaceId,
          source_asset_id: target.data.id,
          image_asset_id: id,
          expected_source_updated_at: target.data.updated_at,
        });
        if (linked.error)
          associationWarning =
            "The image is saved in Library. Its source changed or could not be updated, so it has not replaced that output's visual.";
      }
      let messageId: string | undefined;
      if (input.conversationId) {
        const message = await client
          .from("assistant_messages")
          .insert({
            workspace_id: data.workspaceId,
            conversation_id: input.conversationId,
            role: "assistant",
            pal: origin.author.pal || "kiana",
            user_id: user.id,
            body: `${input.title} is saved in your library.`,
            metadata: json({
              assetIds: [id],
              originatingPal: origin.author,
              ...(campaignId ? { campaignId } : {}),
            }),
          })
          .select("id")
          .single();
        if (message.error) {
          // The real artifact remains saved. Never describe this as generation failure.
          return {
            assetId: id,
            storagePath: path,
            mimeType,
            url: "",
            title: input.title,
            kind: input.kind,
            warning:
              "Your file is saved in Library. It could not be attached to this conversation.",
          };
        }
        messageId = message.data.id;
      }
      const signed = await client.storage.from("campaign-assets").createSignedUrl(path, 3600);
      return {
        assetId: id,
        storagePath: path,
        mimeType,
        url: signed.data?.signedUrl || "",
        messageId,
        title: input.title,
        kind: input.kind,
        targetAssetId: target?.data?.id,
        warning: associationWarning,
      };
    } catch (error) {
      if (!saved) await client.storage.from("campaign-assets").remove([path]);
      throw error;
    }
  });

export const createStudioFeedPost = createServerFn({ method: "POST" })
  .validator(StudioAuthSchema.extend({ post: FeedPostInputSchema }))
  .handler(async ({ data }) => {
    const { client, user } = await auth(data);
    // Manually submitted text is always attributed to its member, never a fake Pal reply.
    const author = await (await import("./studio-auth.server")).studioMemberAuthor(client, user.id);
    const result = await client
      .from("studio_feed_posts")
      .insert({
        workspace_id: data.workspaceId,
        created_by: user.id,
        title: data.post.title,
        body: data.post.body,
        lane: data.post.lane,
        asset_id: data.post.assetId || null,
        author: json(author),
        sources: [],
        generated: false,
      })
      .select("id")
      .single();
    if (result.error) throw new Error("Could not save your feed post. Please retry.");
    return result.data.id;
  });

export const commentOnStudioFeed = createServerFn({ method: "POST" })
  .validator(
    StudioAuthSchema.extend({
      postId: z.string().uuid(),
      body: z.string().trim().min(1).max(2000),
    }),
  )
  .handler(async ({ data }) => {
    const { client, user } = await auth(data);
    const author = await (await import("./studio-auth.server")).studioMemberAuthor(client, user.id);
    const result = await client
      .from("studio_feed_comments")
      .insert({
        workspace_id: data.workspaceId,
        post_id: data.postId,
        created_by: user.id,
        body: data.body,
        author: json(author),
      })
      .select("id")
      .single();
    if (result.error) throw new Error("Could not save your comment. Please retry.");
    return result.data.id;
  });

export const reactToStudioFeed = createServerFn({ method: "POST" })
  .validator(
    StudioAuthSchema.extend({
      postId: z.string().uuid(),
      reaction: z.enum(feedReactions),
      active: z.boolean(),
    }),
  )
  .handler(async ({ data }) => {
    const { client, user } = await auth(data);
    // Explicit desired state + unique key: parallel people and repeated requests
    // cannot overwrite one another or create duplicate reactions.
    const result = data.active
      ? await client.from("studio_feed_reactions").upsert(
          {
            workspace_id: data.workspaceId,
            post_id: data.postId,
            user_id: user.id,
            reaction: data.reaction,
          },
          { onConflict: "post_id,user_id,reaction", ignoreDuplicates: true },
        )
      : await client
          .from("studio_feed_reactions")
          .delete()
          .eq("workspace_id", data.workspaceId)
          .eq("post_id", data.postId)
          .eq("user_id", user.id)
          .eq("reaction", data.reaction);
    if (result.error) throw new Error("Could not save your reaction. Please retry.");
    return { ok: true };
  });

export const refreshStudioPalFeed = createServerFn({ method: "POST" })
  .validator(StudioAuthSchema.extend({ mode: z.enum(["automatic", "manual"]).default("manual") }))
  .handler(async ({ data }) =>
    (await import("./studio-proactive.server")).generateProactiveFeed(data),
  );

export const linkStudioCampaignToConversation = createServerFn({ method: "POST" })
  .validator(
    StudioAuthSchema.extend({
      campaignId: z.string().uuid(),
      conversationId: z.string().uuid(),
      pal: z.enum(palNames),
      palProfileId: z.string().uuid().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const { client, user } = await auth(data);
    const [campaign, conversation] = await Promise.all([
      client
        .from("campaigns")
        .select("id,title")
        .eq("workspace_id", data.workspaceId)
        .eq("id", data.campaignId)
        .maybeSingle(),
      client
        .from("conversations")
        .select("id")
        .eq("workspace_id", data.workspaceId)
        .eq("id", data.conversationId)
        .maybeSingle(),
    ]);
    if (campaign.error || !campaign.data || conversation.error || !conversation.data)
      throw new Error("This campaign and conversation must belong to the active workspace.");
    const origin = await (
      await import("./studio-auth.server")
    ).resolveStudioAuthor(client, data.workspaceId, data.pal, data.palProfileId);
    const result = await client.from("assistant_messages").insert({
      workspace_id: data.workspaceId,
      conversation_id: data.conversationId,
      user_id: user.id,
      role: "assistant",
      pal: origin.author.pal || data.pal,
      body: `${campaign.data.title} is ready to review.`,
      metadata: json({
        campaignId: data.campaignId,
        originatingPal: origin.author,
        studioCampaignLink: true,
      }),
    });
    if (result.error && result.error.code !== "23505")
      throw new Error("The campaign is saved but could not be linked to this conversation.");
    return { ok: true };
  });

export const reviseStudioDocument = createServerFn({ method: "POST" })
  .validator(
    StudioAuthSchema.extend({
      assetId: z.string().uuid(),
      title: z.string().trim().min(2).max(180),
      content: z.string().trim().min(1).max(30000),
      expectedUpdatedAt: z.string().min(10).max(60),
    }),
  )
  .handler(async ({ data }) => {
    const { client } = await auth(data);
    const asset = await client
      .from("campaign_assets")
      .select("*")
      .eq("workspace_id", data.workspaceId)
      .eq("id", data.assetId)
      .maybeSingle();
    if (asset.error || !asset.data || asset.data.kind !== "document")
      throw new Error("This document is unavailable in the active workspace.");
    const metadata = asset.data.metadata as Record<string, Json>;
    if (metadata.mimeType !== "application/pdf" || typeof metadata.storagePath !== "string")
      throw new Error("This item is not a saved PDF document.");
    const previousPath = assertWorkspaceStoragePath(data.workspaceId, metadata.storagePath);
    const bytes = await (
      await import("./studio-artifact.server")
    ).renderStudioPdf(data.title, data.content);
    const path = `${data.workspaceId}/generated/${crypto.randomUUID()}.pdf`;
    const upload = await client.storage
      .from("campaign-assets")
      .upload(path, bytes, { contentType: "application/pdf", upsert: false });
    if (upload.error)
      throw new Error("Could not save the revised PDF. Your original is unchanged.");
    const saved = await client
      .from("campaign_assets")
      .update({
        title: data.title,
        content: data.content,
        metadata: { ...metadata, title: data.title, storagePath: path, byteSize: bytes.length },
        updated_at: new Date().toISOString(),
      })
      .eq("id", data.assetId)
      .eq("workspace_id", data.workspaceId)
      .eq("updated_at", data.expectedUpdatedAt)
      .select()
      .maybeSingle();
    if (saved.error || !saved.data) {
      await client.storage.from("campaign-assets").remove([path]);
      throw new Error(
        "This document changed while you were editing. Reopen its latest version and retry.",
      );
    }
    await client.storage.from("campaign-assets").remove([previousPath]);
    return saved.data;
  });
