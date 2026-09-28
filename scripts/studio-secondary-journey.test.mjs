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
const mock = {
  brandReferences: [],
  workspace: { id: "workspace", name: "Sample business" },
  brand: null,
  campaigns: [],
  assets: [],
  ideas: [],
  videoProgress: [],
  createIdea: async () => {},
  updateVideoProgress: async () => {},
};
function load(relative) {
  const module = { exports: {} };
  const filename = path.join(root, relative);
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
      Date,
      Intl,
      require(name) {
        if (name.endsWith(".css")) return {};
        if (name === "./StudioProvider") return { useStudio: () => mock };
        if (name === "./StudioGraphic")
          return { StudioGraphic: () => null, studioGraphicForAsset: () => "image" };
        if (name === "./StudioMarkdown")
          return { StudioMarkdown: ({ children }) => React.createElement("div", null, children) };
        if (name === "./StudioAssetActions") return { StudioCopyButton: () => null };
        if (name === "@/lib/supabase/client") return { supabase: {} };
        if (name === "@tanstack/react-router")
          return {
            Link: ({ to, children, ...props }) =>
              React.createElement("a", { href: to, ...props }, children),
          };
        if (name === "@/lib/studio-intelligence") return load("src/lib/studio-intelligence.ts");
        if (name.startsWith("./")) {
          const base = path.resolve(path.dirname(filename), name);
          const source = fs.existsSync(base + ".tsx") ? base + ".tsx" : base + ".ts";
          return load(path.relative(root, source));
        }
        return require(name);
      },
    },
    { filename },
  );
  return module.exports;
}
const { parseLocalSchedule } = load("src/components/studio/StudioCalendarEditor.tsx");
const { brandColorInk, StudioBrandGuide } = load("src/components/studio/StudioBrandGuide.tsx");
function luminance(hex) {
  const c = hex.replace("#", "");
  const full = c.length === 3 ? [...c].map((v) => v + v).join("") : c;
  const v = [0, 2, 4]
    .map((i) => parseInt(full.slice(i, i + 2), 16) / 255)
    .map((x) => (x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4));
  return v[0] * 0.2126 + v[1] * 0.7152 + v[2] * 0.0722;
}
test("schedule preserves a real local time, including midnight", () => {
  const midnight = parseLocalSchedule("2026-09-30", "00:00");
  assert.equal(midnight?.getHours(), 0);
  assert.equal(midnight?.getDate(), 30);
  assert.equal(parseLocalSchedule("2028-02-29", "09:35")?.getMinutes(), 35);
});
test("schedule refuses rolled-over dates and malformed or missing time", () => {
  for (const [date, time] of [
    ["2026-02-29", "09:00"],
    ["2026-04-31", "09:00"],
    ["2026-09-30", "24:00"],
    ["2026-09-30", "09:60"],
    ["", "09:00"],
    ["2026-09-30", ""],
    ["2026-09-30T09:00", "09:00"],
  ])
    assert.equal(parseLocalSchedule(date, time), null, `${date} ${time}`);
});
test("schedule refuses nonexistent daylight-saving local times", () => {
  const previous = process.env.TZ;
  process.env.TZ = "America/Los_Angeles";
  try {
    assert.equal(parseLocalSchedule("2026-03-08", "02:30"), null);
    assert.ok(parseLocalSchedule("2026-03-08", "03:30"));
  } finally {
    if (previous) process.env.TZ = previous;
    else delete process.env.TZ;
  }
});
test("brand palette chooses readable text across saturated and neutral colors", () => {
  for (const hex of [
    "#E8720C",
    "#57258a",
    "#0A9B8F",
    "#8CA263",
    "#ff0000",
    "#777777",
    "#000",
    "#fff",
    "#ffeeee",
  ]) {
    const ink = brandColorInk(hex);
    const a = luminance(hex),
      b = luminance(ink);
    assert.ok((Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05) >= 4.5, hex);
  }
});
test("an empty brand guide uses neutral surfaces and useful next-step copy", () => {
  const html = renderToStaticMarkup(
    React.createElement(StudioBrandGuide, { draft: {}, completion: 0 }),
  );
  assert.match(html, /background:var\(--studio-soft\)/);
  assert.match(html, /Not set/);
  assert.match(html, /Add your story in Brand DNA/);
  assert.doesNotMatch(html, /#57258a|src="undefined"/);
});
test("brand guide retains the owner’s actual story, audience and language rules", () => {
  const html = renderToStaticMarkup(
    React.createElement(StudioBrandGuide, {
      draft: {
        business_name: "Daybreak",
        description: "Bread made every morning.",
        primary_audience: "Our neighborhood",
        avoid_language: "No invented awards",
        primaryColor: "#E8720C",
      },
      completion: 60,
    }),
  );
  for (const copy of [
    "Daybreak",
    "Bread made every morning.",
    "Our neighborhood",
    "No invented awards",
  ])
    assert.ok(html.includes(copy));
  assert.match(html, /color:#000/);
});
test("private Studio route remains excluded from public search indexing", () => {
  const route = fs.readFileSync(path.join(root, "src/routes/studio.tsx"), "utf8");
  assert.match(route, /name:\s*"robots",\s*content:\s*"noindex, nofollow"/);
});
