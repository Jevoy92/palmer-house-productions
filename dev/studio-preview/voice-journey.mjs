/** Synthetic browser walkthrough: no live microphone, uploads, AI, or credit charges. */
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || "playwright");
const browser = await chromium.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
});
const origin = "http://127.0.0.1:4175",
  out = "/private/tmp/studio-voice-review";
await mkdir(out, { recursive: true });
const results = [],
  errors = [],
  external = [];
async function check(name, fn, width = 390) {
  const page = await browser.newPage({ viewport: { width, height: 844 } });
  page.setDefaultTimeout(10000);
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("request", (r) => {
    if (!r.url().startsWith(origin) && !r.url().startsWith("blob:") && !r.url().startsWith("data:"))
      external.push(r.url());
  });
  try {
    await fn(page);
    results.push({ name, result: "pass" });
  } catch (error) {
    results.push({ name, result: "fail", error: String(error) });
    await page.screenshot({ path: `${out}/${name}-failure.png`, fullPage: true }).catch(() => {});
  } finally {
    await page.close();
  }
}
async function go(page, extra = "") {
  await page.goto(`${origin}/?view=assistant&state=populated&controls=0&voice=ready${extra}`, {
    waitUntil: "networkidle",
  });
  await page.getByRole("button", { name: "Add files or create content", exact: true }).click();
}
async function record(page) {
  await page.getByRole("button", { name: "Record a voice note", exact: true }).click();
  await page.getByRole("button", { name: "Stop recording", exact: true }).click();
  await page.getByText("Review your voice note", { exact: true }).waitFor();
}
for (const width of [390, 1440])
  await check(
    `review-charge-and-transcript-${width}`,
    async (page) => {
      await go(page);
      await record(page);
      await page.getByRole("button", { name: "Transcribe · 2 credits", exact: true }).waitFor();
      assert.equal(
        await page.getByRole("button", { name: "Send message", exact: true }).isDisabled(),
        true,
      );
      assert.equal(await page.locator("audio[controls]").count(), 1);
      await page.screenshot({ path: `${out}/voice-review-${width}.png` });
      await page.getByRole("button", { name: "Transcribe · 2 credits", exact: true }).click();
      await page
        .getByText("Transcript added. Review it before sending.", { exact: true })
        .waitFor();
      assert.equal(await page.locator('[aria-label="Review voice note"]').count(), 0);
      assert.equal(
        await page.locator("textarea").inputValue(),
        "Sample attachment context for local visual testing.",
      );
      const attempts = await page.evaluate(() =>
        JSON.parse(sessionStorage.getItem("studio-preview-voice-attempts")),
      );
      assert.equal(attempts.length, 1);
      assert.match(attempts[0], /^[a-f0-9-]{36}$/);
    },
    width,
  );
await check("dark-review-has-readable-action-contrast", async (page) => {
  await page.addInitScript(() =>
    localStorage.setItem(
      "palmer.studio.appearance.v1",
      JSON.stringify({ theme: "dark", textSize: "standard", reduceMotion: false }),
    ),
  );
  await go(page);
  await record(page);
  const color = await page
    .getByRole("button", { name: "Transcribe · 2 credits", exact: true })
    .evaluate((button) => getComputedStyle(button).color);
  assert.equal(color, "rgb(22, 22, 22)");
  await page.screenshot({ path: `${out}/voice-review-dark-390.png` });
});
await check("failure-preserves-recording-and-request-key", async (page) => {
  await go(page, "&voiceResult=fail-once");
  await record(page);
  await page.getByRole("button", { name: "Transcribe · 2 credits", exact: true }).click();
  await page.getByRole("alert").filter({ hasText: "Transcription is busy" }).waitFor();
  assert.equal(await page.locator("audio[controls]").count(), 1);
  await page.getByRole("link", { name: "Save recording", exact: true }).waitFor();
  await page.getByRole("button", { name: "Transcribe · 2 credits", exact: true }).click();
  await page.getByText("Transcript added. Review it before sending.", { exact: true }).waitFor();
  const attempts = await page.evaluate(() =>
    JSON.parse(sessionStorage.getItem("studio-preview-voice-attempts")),
  );
  assert.equal(attempts.length, 2);
  assert.equal(attempts[0], attempts[1]);
});
await check("no-credits-keeps-audio-and-discard-is-free", async (page) => {
  await go(page, "&voiceResult=empty");
  await record(page);
  await page.getByRole("button", { name: "Transcribe · 2 credits", exact: true }).click();
  await page.getByRole("alert").filter({ hasText: "Not enough Studio credits" }).waitFor();
  await page.getByRole("button", { name: "Discard", exact: true }).click();
  assert.equal(await page.locator("audio[controls]").count(), 0);
  assert.equal(
    await page.getByRole("button", { name: "Record a voice note", exact: true }).isDisabled(),
    false,
  );
});
await check("review-survives-closing-attachment-tools", async (page) => {
  await go(page);
  await record(page);
  await page.getByRole("button", { name: "Close attachment tools", exact: true }).click();
  await page.getByRole("button", { name: "Transcribe · 2 credits", exact: true }).waitFor();
  assert.equal(await page.locator("audio[controls]").count(), 1);
  await page.getByRole("button", { name: "Discard", exact: true }).click();
});
await check("unconfigured-voice-disabled-documents-available", async (page) => {
  await page.goto(`${origin}/?view=assistant&state=populated&controls=0`, {
    waitUntil: "networkidle",
  });
  await page.getByRole("button", { name: "Add files or create content", exact: true }).click();
  assert.equal(
    await page.getByRole("button", { name: "Record a voice note", exact: true }).isDisabled(),
    true,
  );
  assert.equal(
    await page.getByRole("button", { name: "Attach a file", exact: true }).isDisabled(),
    false,
  );
});
await browser.close();
results.push(
  { name: "no-browser-errors", result: errors.length ? "fail" : "pass", errors },
  { name: "no-external-requests", result: external.length ? "fail" : "pass", external },
);
await writeFile(`${out}/report.json`, JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
if (results.some((r) => r.result === "fail")) process.exitCode = 1;
