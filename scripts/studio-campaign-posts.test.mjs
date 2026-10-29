import test from "node:test";
import assert from "node:assert/strict";
import { campaignPostEntries } from "../src/lib/studio-campaign-posts.ts";
const output = {
  platformPosts: [
    {
      id: "first",
      title: "Original first",
      body: "Old first",
      platform: "facebook",
      slides: ["Keep slide"],
    },
    { id: "second", title: "Original second", body: "Old second", platform: "instagram" },
  ],
};
const asset = (id, content, order) => ({
  id: `asset-${id}`,
  kind: "platform_post",
  title: `Saved ${id}`,
  content,
  metadata: { id },
  sort_order: order,
});
test("campaign preview and copy use saved text, matching identity rather than array order", () => {
  const entries = campaignPostEntries(output, [
    asset("second", "New second", 0),
    asset("first", "New first", 1),
  ]);
  assert.equal(entries[0].post.body, "New first");
  assert.equal(entries[0].asset.id, "asset-first");
  assert.equal(entries[1].post.body, "New second");
  assert.deepEqual(entries[0].post.slides, ["Keep slide"]);
  assert.equal(output.platformPosts[0].body, "Old first");
});
test("cleared drafts stay empty and missing drafts do not borrow a different identified post", () => {
  const entries = campaignPostEntries(output, [asset("second", "", 0)]);
  assert.equal(entries[0].post.body, "Old first");
  assert.equal(entries[0].asset, undefined);
  assert.equal(entries[1].post.body, "");
});
test("legacy drafts without generated IDs use sorted order", () => {
  const entries = campaignPostEntries(output, [
    { ...asset("legacy", "Saved legacy", 70), metadata: {} },
  ]);
  assert.equal(entries[0].post.body, "Saved legacy");
});

import { prepareAssetUpdate } from "../src/lib/studio-asset-update.ts";
test("plain article edits remain authoritative without destroying structured source", () => {
  const previous = {
    kind: "article",
    content: "Original",
    metadata: { sections: [{ body: "Original" }], imageUrl: "/cover.webp" },
  };
  const patch = prepareAssetUpdate(previous, { content: "Edited" });
  assert.equal(patch.metadata.studioTextOverride, true);
  assert.deepEqual(patch.metadata.sections, previous.metadata.sections);
  assert.equal(patch.metadata.imageUrl, "/cover.webp");
  assert.equal(prepareAssetUpdate(previous, { status: "approved" }).metadata, undefined);
});
test("platform edits synchronize body/title while preserving image and platform fields", () => {
  const patch = prepareAssetUpdate(
    {
      kind: "platform_post",
      content: "Old",
      metadata: { platform: "facebook", body: "Old", imageUrl: "/cover.webp" },
    },
    { content: "New", title: "New title" },
  );
  assert.equal(patch.metadata.body, "New");
  assert.equal(patch.metadata.title, "New title");
  assert.equal(patch.metadata.imageUrl, "/cover.webp");
  assert.equal(patch.metadata.platform, "facebook");
});
