import type { Tables } from "./supabase/database.types";
type Asset = Tables<"campaign_assets">;

/** Shared by the real provider and isolated preview so edits have identical semantics. */
export function prepareAssetUpdate(
  previous: Asset | undefined,
  values: Partial<Asset>,
): Partial<Asset> {
  let patch = values;
  const previousMetadata =
    previous?.metadata && typeof previous.metadata === "object" && !Array.isArray(previous.metadata)
      ? previous.metadata
      : {};
  if (
    previous &&
    previous.kind !== "platform_post" &&
    values.content !== undefined &&
    values.content !== previous.content &&
    values.metadata === undefined
  ) {
    // Plain editing cannot safely reconstruct scenes, slides, or article
    // sections. Retain those structures and mark the saved text as the
    // display authority, including after a fresh workspace load.
    patch = { ...values, metadata: { ...previousMetadata, studioTextOverride: true } };
  } else if (
    values.content !== undefined &&
    values.metadata &&
    typeof values.metadata === "object" &&
    !Array.isArray(values.metadata)
  ) {
    const structured = { ...values.metadata };
    delete structured.studioTextOverride;
    patch = { ...values, metadata: structured };
  }
  if (previous?.kind === "platform_post") {
    const metadata = patch.metadata ?? previous.metadata;
    if (metadata && typeof metadata === "object" && !Array.isArray(metadata)) {
      // The plain-text editor and platform editor share one saved post. Keep
      // their two representations aligned without dropping native features.
      patch = {
        ...patch,
        metadata: {
          ...previousMetadata,
          ...metadata,
          ...(values.content !== undefined ? { body: values.content } : {}),
          ...(values.title !== undefined ? { title: values.title } : {}),
        },
      };
    }
  }
  return patch;
}
