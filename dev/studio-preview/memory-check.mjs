// UI checks use only synthetic loopback state. No live accounts or provider calls.
import assert from "node:assert/strict";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const origin = process.env.PREVIEW_ORIGIN || "http://127.0.0.1:4175";
if (!/^http:\/\/(127\.0\.0\.1|localhost):\d+$/.test(origin))
  throw new Error("Use the isolated loopback preview.");
const out = "/private/tmp/studio-memory-review";
await mkdir(out, { recursive: true });
const browser = await chromium.launch({
  executablePath:
    process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
});
const results = [],
  errors = [],
  external = [];
try {
  for (const width of [1440, 390]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    page.on("pageerror", (error) => errors.push(String(error)));
    page.on("request", (request) => {
      if (!request.url().startsWith(origin) && !/^data:|^blob:/.test(request.url()))
        external.push(request.url());
    });
    await page.goto(`${origin}/?view=settings&controls=0`, { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "Shared memory", exact: true }).click();
    await page.getByRole("heading", { name: "Shared memory", exact: true }).waitFor();
    await page.getByRole("button", { name: "Add memory", exact: true }).click();
    await page.getByLabel("Title", { exact: true }).fill("A durable preference");
    await page
      .getByLabel("What should every Pal remember?", { exact: true })
      .fill("Use a direct, plain voice for commuter updates.");
    await page.getByRole("button", { name: "Save memory", exact: true }).click();
    const entry = page
      .getByRole("article")
      .filter({ has: page.getByRole("heading", { name: "A durable preference", exact: true }) });
    await entry.waitFor();
    await entry.getByRole("button", { name: "Edit A durable preference", exact: true }).click();
    await page
      .getByLabel("What should every Pal remember?", { exact: true })
      .fill("Use a direct voice and include opening hours.");
    await page.getByRole("button", { name: "Save memory", exact: true }).click();
    await entry
      .getByText("Use a direct voice and include opening hours.", { exact: true })
      .waitFor();
    const downloadWait = page.waitForEvent("download");
    await page.getByRole("button", { name: "Export memory", exact: true }).click();
    const download = await downloadWait;
    const exported = JSON.parse(await readFile(await download.path(), "utf8"));
    assert.equal(exported.format, "palmer-house-workspace-memory");
    assert.equal(exported.entries.find((row) => row.title === "A durable preference").revision, 2);
    await entry.getByRole("button", { name: "Forget A durable preference", exact: true }).click();
    await entry.getByRole("button", { name: "Keep note", exact: true }).click();
    assert.equal(await entry.count(), 1);
    await entry.getByRole("button", { name: "Forget A durable preference", exact: true }).click();
    await entry.getByRole("button", { name: "Confirm forget", exact: true }).click();
    await entry.waitFor({ state: "detached" });
    assert.ok(await page.locator("body").evaluate((el) => el.scrollWidth <= window.innerWidth + 1));
    await page.screenshot({ path: `${out}/memory-${width}.png`, fullPage: true });
    results.push({ width, result: "pass", checks: "add/edit/export/cancel-forget/forget/layout" });
    await page.goto(`${origin}/?view=settings&controls=0&outcome=error`, {
      waitUntil: "networkidle",
    });
    await page.getByRole("button", { name: "Shared memory", exact: true }).click();
    await page.getByRole("button", { name: "Add memory", exact: true }).click();
    await page.getByLabel("Title", { exact: true }).fill("Keep my unsaved draft");
    await page
      .getByLabel("What should every Pal remember?", { exact: true })
      .fill("Retry this draft later.");
    await page.getByRole("button", { name: "Save memory", exact: true }).click();
    await page.getByRole("alert").first().waitFor();
    assert.equal(
      await page.getByLabel("Title", { exact: true }).inputValue(),
      "Keep my unsaved draft",
    );
    results.push({ width, result: "pass", checks: "save failure preserves draft" });
    await page.close();
  }
  assert.deepEqual(errors, []);
  assert.deepEqual(external, []);
  await writeFile(`${out}/report.json`, JSON.stringify({ results, errors, external }, null, 2));
  console.log(JSON.stringify({ results, errors, external }));
} finally {
  await browser.close();
}
