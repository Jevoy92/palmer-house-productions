import { resolve } from "node:path";
import { mkdir, writeFile } from "node:fs/promises";

// Use a separate headless browser, never the user's existing browser profile.
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || "playwright");
const origin = process.env.PREVIEW_ORIGIN || "http://127.0.0.1:4175";
if (!/^http:\/\/(127\.0\.0\.1|localhost):\d+$/.test(origin)) {
  throw new Error("Fixture captures are restricted to a local preview server.");
}
const output = resolve(process.env.PREVIEW_OUT || "docs/studio-polish/captures");
const label = process.env.PREVIEW_LABEL || "current";
const pairs = (process.env.PREVIEW_CASES || "home:populated,home:empty").split(",");
const viewports = (process.env.PREVIEW_VIEWPORTS || "1440x900,390x844")
  .split(",")
  .map((value) => value.split("x").map(Number));
const reducedMotion = process.env.PREVIEW_REDUCED_MOTION === "1" ? "reduce" : "no-preference";
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  executablePath:
    process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
});
const results = [];
try {
  for (const [width, height] of viewports) {
    for (const pair of pairs) {
      const [view, state] = pair.split(":");
      const page = await browser.newPage({ viewport: { width, height }, reducedMotion });
      const errors = [];
      const externalRequests = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("request", (request) => {
        if (!request.url().startsWith(origin) && !request.url().startsWith("data:"))
          externalRequests.push(request.url());
      });
      page.on("response", (response) => {
        if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
      });
      await page.goto(`${origin}/?view=${view}&state=${state}&controls=0`, {
        waitUntil: "networkidle",
      });
      // Capture the settled layout after finite entrance/completion motion.
      await page.waitForTimeout(3500);
      const name = `${label}-${view}-${state}-${width}x${height}`;
      await page.screenshot({ path: resolve(output, `${name}.png`) });
      if (process.env.PREVIEW_FULL_PAGE === "1") {
        await page.screenshot({ path: resolve(output, `${name}-full.png`), fullPage: true });
      }
      const layout = await page.evaluate(() => ({
        viewport: [window.innerWidth, window.innerHeight],
        document: [document.documentElement.scrollWidth, document.documentElement.scrollHeight],
        brokenImages: Array.from(document.images)
          .filter((image) => !image.complete || !image.naturalWidth)
          .map((image) => ({ src: image.getAttribute("src"), alt: image.alt })),
        text: document.body.innerText.slice(0, 6000),
      }));
      results.push({
        name,
        origin,
        capturedAt: new Date().toISOString(),
        reducedMotion,
        ...layout,
        errors,
        externalRequests,
      });
      await page.close();
    }
  }
} finally {
  await browser.close();
}
await writeFile(resolve(output, `${label}-capture-report.json`), JSON.stringify(results, null, 2));
console.log(
  JSON.stringify(
    results.map(({ name, viewport, document, errors, externalRequests }) => ({
      name,
      viewport,
      document,
      errors,
      externalRequests,
    })),
    null,
    2,
  ),
);
