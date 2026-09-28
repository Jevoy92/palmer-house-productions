import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";
const require = createRequire(import.meta.url);
const root = path.resolve(import.meta.dirname, "..");
function load(relative) {
  const filename = path.join(root, relative);
  const module = { exports: {} };
  const js = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
  }).outputText;
  vm.runInNewContext(
    js,
    {
      module,
      exports: module.exports,
      console,
      require(name) {
        if (name.endsWith(".css")) return {};
        if (name.endsWith(".png")) return `/fixture/${name.replace(/^\.\//, "")}`;
        if (name === "./StudioProvider")
          return { useStudio: () => ({ getArtifactUrl: async () => "" }) };
        if (name === "./StudioGraphic")
          return {
            StudioGraphic: ({ name }) =>
              React.createElement("img", { alt: "", "data-graphic": name }),
            studioGraphicForAsset: (kind) => (kind === "image" ? "image" : "library"),
          };
        return require(name);
      },
    },
    { filename },
  );
  return module.exports;
}
const helpers = load("src/components/studio/StudioAssetVisual.tsx");
const fixture = load("dev/studio-preview/fixtures.ts");
const asset = (overrides = {}) => ({
  id: "one",
  kind: "image",
  title: "One",
  content: "",
  metadata: {},
  updated_at: "2026-09-27",
  ...overrides,
});

test("previews select the asset's own full image before a stale thumbnail", () => {
  assert.equal(
    helpers.studioAssetMedia(
      asset({
        metadata: { imageUrl: "/fresh.png", thumbnailUrl: "/old.png", brandImage: "/brand.png" },
      }),
    ),
    "/fresh.png",
  );
  assert.equal(
    helpers.studioAssetMedia(
      asset({ metadata: { brandImage: "/brand.png", sourceUrl: "https://example.com" } }),
    ),
    "",
  );
});
test("unsafe URLs, PDF files, and video files are not rendered as img sources", () => {
  for (const url of [
    "javascript:alert(1)",
    "//tracking.example/image.png",
    "data:image/png;base64,aaa",
    "/guide.pdf",
    "/clip.mp4?token=example",
  ]) {
    assert.equal(helpers.studioAssetMedia(asset({ metadata: { mediaUrl: url } })), "", url);
  }
  assert.equal(
    helpers.studioAssetMedia(asset({ metadata: { imageUrl: "  /own-image.webp  " } })),
    "/own-image.webp",
  );
});
test("platform metadata does not mislabel a script or document as a social post", () => {
  assert.equal(
    helpers.studioAssetLabel(asset({ kind: "short_script", metadata: { platform: "instagram" } })),
    "Reel script",
  );
  assert.equal(
    helpers.studioAssetLabel(asset({ kind: "platform_post", metadata: { platform: "linkedin" } })),
    "LinkedIn",
  );
});
test("photo previews use meaningful per-asset alt text with a title fallback", () => {
  const render = (metadata) =>
    renderToStaticMarkup(
      React.createElement(helpers.StudioAssetVisual, {
        asset: asset({ title: "Morning loaf", metadata: { imageUrl: "/own.png", ...metadata } }),
      }),
    );
  assert.match(
    render({ imageAlt: "  Sliced sourdough on pale stone  " }),
    /alt="Sliced sourdough on pale stone"/,
  );
  assert.match(render({ imageAlt: "  " }), /alt="Preview of Morning loaf"/);
  assert.match(render({ imageAlt: { invalid: true } }), /alt="Preview of Morning loaf"/);
});
test("storyboards use only saved beats or real bracketed script directions", () => {
  const beats = helpers.studioAssetStoryboard(
    asset({ content: "[Opening: Flour on the bench.] Hello. [Close-up: Shape the loaf.]" }),
  );
  assert.deepEqual(JSON.parse(JSON.stringify(beats)), [
    { label: "Opening", text: "Flour on the bench." },
    { label: "Close-up", text: "Shape the loaf." },
  ]);
  assert.equal(
    helpers.studioAssetStoryboard(asset({ content: "A spoken script with no shot directions." }))
      .length,
    0,
  );
  assert.equal(
    helpers.studioAssetStoryboard(
      asset({
        metadata: {
          storyboard: [
            null,
            "invalid",
            { text: "" },
            { label: "Actual shot", text: "Open the door" },
          ],
        },
      }),
    ).length,
    1,
  );
});
test("script previews remain draft storyboards and editorial previews show their own text", () => {
  const script = fixture.assets.find((item) => item.kind === "short_script");
  const html = renderToStaticMarkup(
    React.createElement(helpers.StudioAssetVisual, { asset: script }),
  );
  assert.match(html, /Reel storyboard/);
  assert.match(html, /Flour falls onto the bench/);
  assert.match(html, /Script draft/);
  assert.doesNotMatch(html, /daybreak-bakery|<video/);
  const article = fixture.assets.find((item) => item.kind === "article");
  const paper = renderToStaticMarkup(
    React.createElement(helpers.StudioAssetVisual, { asset: article }),
  );
  assert.match(paper, /The journal/);
  assert.match(paper, /The craft behind every loaf/);
  assert.match(paper, /Our mornings begin/);
});
test("Daybreak photo assets have distinct files while written/script assets have native covers", () => {
  const photographic = fixture.assets.filter((item) =>
    ["platform_post", "caption", "image"].includes(item.kind),
  );
  const urls = photographic.map((item) => helpers.studioAssetMedia(item));
  assert.equal(photographic.length, 3);
  assert.equal(new Set(urls).size, 3);
  for (const url of urls) {
    assert.ok(
      url &&
        fs.existsSync(path.resolve(root, "dev/studio-preview", url.replace(/^\/fixture\//, ""))),
      url,
    );
    assert.doesNotMatch(url, /daybreak-bakery\.png/);
  }
  for (const item of fixture.assets.filter((item) => /script|article|newsletter/.test(item.kind)))
    assert.equal(helpers.studioAssetMedia(item), "");
});
