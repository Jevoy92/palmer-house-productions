/** Fictional local billing UI only. Does not open Stripe or send network requests. */
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
const origin = "http://127.0.0.1:4175";
const out = "/private/tmp/studio-billing-review";
await mkdir(out, { recursive: true });
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || "playwright");
const browser = await chromium.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
});
const results = [],
  errors = [],
  external = [];
async function check(name, fn, width = 390) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  page.setDefaultTimeout(10000);
  page.on("pageerror", (e) => errors.push({ name, error: String(e) }));
  page.on("request", (r) => {
    if (!r.url().startsWith(origin) && !/^(data|blob):/.test(r.url())) external.push(r.url());
  });
  try {
    await fn(page);
    results.push({ name, result: "pass" });
  } catch (e) {
    results.push({ name, result: "fail", error: String(e) });
    await page.screenshot({ path: `${out}/${name}-failure.png`, fullPage: true }).catch(() => {});
  } finally {
    await page.close();
  }
}
async function go(page, extra = "") {
  await page.goto(`${origin}/?view=billing&state=populated&controls=0${extra}`, {
    waitUntil: "networkidle",
  });
  await page.getByRole("heading", { name: "Your creative balance." }).waitFor();
}
for (const width of [390, 1440])
  for (const theme of ["light", "dark"])
    await check(
      `credits-${theme}-${width}`,
      async (page) => {
        await page.addInitScript(
          (theme) =>
            localStorage.setItem(
              "palmer.studio.appearance.v1",
              JSON.stringify({ theme, textSize: "standard", reduceMotion: false }),
            ),
          theme,
        );
        await go(page);
        await page.locator(".studio-credit-number strong").waitFor();
        assert.equal(
          await page
            .getByRole("progressbar", { name: "Included credits used or reserved" })
            .getAttribute("aria-valuenow"),
          "28",
        );
        assert.equal(
          await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1),
          false,
        );
        assert.equal(
          await page.getByRole("button", { name: "Buy 500 credits", exact: true }).isEnabled(),
          true,
        );
        await page.screenshot({ path: `${out}/credits-${theme}-${width}.png`, fullPage: true });
      },
      width,
    );
await check("topup-failure-no-fake-grant", async (page) => {
  await go(page);
  await page.getByRole("button", { name: "Buy 500 credits", exact: true }).click();
  await page.getByRole("alert").filter({ hasText: "No payment was taken" }).waitFor();
  assert.equal(
    await page.getByRole("button", { name: "Buy 500 credits", exact: true }).isEnabled(),
    true,
  );
  await page.locator(".studio-credit-number strong").waitFor();
});
await check("empty-balance-preserves-work", async (page) => {
  await go(page, "&credits=empty");
  await page.getByText("Your work is safe. Your balance is empty.").waitFor();
  await page.getByRole("link", { name: "Library", exact: true }).last().click();
  await page.getByRole("heading", { name: "Library", exact: true }).waitFor();
});
await check("member-cannot-buy", async (page) => {
  await go(page, "&billingRole=member");
  assert.equal(
    await page.getByRole("button", { name: "Buy 500 credits", exact: true }).isEnabled(),
    false,
  );
  await page
    .getByText("Only your workspace owner or billing admin can purchase credits.")
    .waitFor();
});
await check("meter-failure-retry", async (page) => {
  await page.goto(`${origin}/?view=billing&state=populated&controls=0&credits=error`, {
    waitUntil: "networkidle",
  });
  await page.getByText("Preview: balance service unavailable. Your work is safe.").waitFor();
  await page.getByRole("button", { name: "Check again", exact: true }).click();
  assert.equal(await page.getByRole("button", { name: "Buy 500 credits", exact: true }).count(), 0);
});
await check("credit-cost-before-image", async (page) => {
  await page.goto(`${origin}/?view=assistant&state=populated&controls=0`, {
    waitUntil: "networkidle",
  });
  await page.getByRole("button", { name: "Add files or create content", exact: true }).click();
  assert.equal(
    await page.getByRole("button", { name: "Record a voice note", exact: true }).isDisabled(),
    true,
  );
  await page.getByRole("button", { name: "Create image", exact: true }).click();
  await page.getByRole("dialog").getByText("30 credits for this creation").waitFor();
});
await browser.close();
results.push(
  { name: "no-browser-errors", result: errors.length ? "fail" : "pass", errors },
  { name: "no-external-requests", result: external.length ? "fail" : "pass", external },
);
await writeFile(`${out}/report.json`, JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
if (results.some((r) => r.result === "fail")) process.exitCode = 1;
