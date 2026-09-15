import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

// Native Playwright browser recording of real interactions with offline fixtures.
// Requires the Playwright FFmpeg runtime, e.g. `playwright install ffmpeg`.
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || "playwright");
const output = resolve(process.env.PREVIEW_OUT || "docs/studio-polish/captures");
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  executablePath:
    process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
});
const results = [];
try {
  for (const [label, origin] of [
    ["baseline", process.env.BASELINE_ORIGIN || "http://127.0.0.1:4176"],
    ["current", process.env.PREVIEW_ORIGIN || "http://127.0.0.1:4175"],
  ]) {
    if (!/^http:\/\/(127\.0\.0\.1|localhost):\d+$/.test(origin))
      throw new Error("Recording requires loopback fixtures.");
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      recordVideo: { dir: output, size: { width: 390, height: 844 } },
    });
    const page = await context.newPage();
    const video = page.video();
    const errors = [];
    const externalRequests = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("request", (request) => {
      if (!request.url().startsWith(origin) && !request.url().startsWith("data:"))
        externalRequests.push(request.url());
    });
    await page.goto(`${origin}/?view=home&state=populated&controls=0`, {
      waitUntil: "networkidle",
    });
    await page.waitForTimeout(1400);
    await page.getByRole("button", { name: "Open navigation", exact: true }).click();
    await page.waitForTimeout(1000);
    await page.getByRole("button", { name: "Close navigation", exact: true }).click();
    await page.waitForTimeout(700);
    await page.getByText("Continue with Kiana", { exact: true }).click();
    await page.waitForTimeout(1300);
    if (label === "baseline") {
      await page.getByRole("button", { name: /Moodboard/ }).click();
      await page.waitForTimeout(1000);
      await page.getByRole("button", { name: "Close", exact: true }).click();
    } else {
      await page.getByRole("button", { name: /Workspace setup,/ }).click();
      await page.waitForTimeout(1000);
      await page.getByRole("button", { name: "Close setup", exact: true }).click();
    }
    await page.waitForTimeout(700);
    const composer = page.getByPlaceholder("Tell Kiana what you are working on…", { exact: true });
    await composer.click();
    await composer.pressSequentially("Help customers prepare for a consultation.", { delay: 45 });
    await page.waitForTimeout(1000);
    await composer.press("Enter");
    await page.waitForTimeout(2000);
    await context.close();
    const path = resolve(output, `${label}-mobile-nav-chat.webm`);
    await video.saveAs(path);
    await video.delete();
    results.push({
      label,
      origin,
      path,
      capturedAt: new Date().toISOString(),
      viewport: [390, 844],
      errors,
      externalRequests,
    });
  }
} finally {
  await browser.close();
}
await writeFile(resolve(output, "recording-report.json"), JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
