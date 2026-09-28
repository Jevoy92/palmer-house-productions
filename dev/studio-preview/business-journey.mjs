/** Independent owner-journey checks. All mutations stay in the loopback synthetic provider. */
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
const origin = process.env.PREVIEW_ORIGIN || "http://127.0.0.1:4175";
if (!/^http:\/\/(127\.0\.0\.1|localhost):\d+$/.test(origin))
  throw new Error("Synthetic loopback preview required.");
const out = resolve(process.env.PREVIEW_OUT || "/private/tmp/studio-owner-journey");
await mkdir(out, { recursive: true });
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || "playwright");
const browser = await chromium.launch({
  executablePath:
    process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
});
const results = [],
  external = [],
  errors = [];
async function go(page, view, state = "populated", outcome = "success") {
  await page.goto(`${origin}/?view=${view}&state=${state}&outcome=${outcome}&controls=0`, {
    waitUntil: "networkidle",
  });
  await page.locator(".studio-workspace-content").waitFor();
}
async function theme(page, value) {
  await go(page, "settings");
  await page
    .getByRole("button", { name: value === "dark" ? "Dark" : "Light", exact: true })
    .click();
}
async function check(name, fn, width = 390, height = 844) {
  if (process.env.CASE_PREFIX && !name.startsWith(process.env.CASE_PREFIX)) return;
  const page = await browser.newPage({ viewport: { width, height } });
  page.setDefaultTimeout(12000);
  page.on("pageerror", (e) => errors.push({ name, error: String(e) }));
  page.on("request", (r) => {
    if (!r.url().startsWith(origin) && !/^(data|blob):/.test(r.url()))
      external.push({ name, url: r.url() });
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
async function calendarPost(page) {
  await page.getByRole("button", { name: "List", exact: true }).click();
  await page.getByRole("button", { name: "Preview Made before sunrise", exact: true }).click();
  const dialog = page.getByRole("dialog");
  await dialog.waitFor();
  return dialog;
}
try {
  for (const [width, height] of [
    [390, 844],
    [1440, 1000],
  ])
    for (const appearance of ["light", "dark"])
      for (const view of ["calendar", "brand", "roadmap", "ideas"]) {
        await check(
          `surface-${view}-${appearance}-${width}`,
          async (page) => {
            await theme(page, appearance);
            await go(page, view);
            assert.equal(
              await page.getByRole("heading", { level: 1 }).count(),
              1,
              "one primary heading",
            );
            const bounds = await page.evaluate(() => ({
              width: document.documentElement.clientWidth,
              scroll: document.documentElement.scrollWidth,
            }));
            assert(
              bounds.scroll <= bounds.width + 1,
              `horizontal page overflow ${JSON.stringify(bounds)}`,
            );
            const trail = page.getByRole("navigation", { name: "Related Studio pages" });
            assert(await trail.isVisible());
            await trail.getByRole("button", { name: "Studio tools", exact: true }).click();
            const menu = page.getByRole("menu");
            await menu.waitFor();
            for (const name of ["Calendar", "Brand DNA", "Video roadmap", "Settings & memory"])
              assert(await menu.getByRole("menuitem", { name, exact: true }).isVisible());
            await page.keyboard.press("Escape");
            assert(
              await trail
                .getByRole("button", { name: "Studio tools", exact: true })
                .evaluate((el) => el === document.activeElement),
              "tools returns focus",
            );
            assert.equal(
              await page.getByRole("link", { name: "Approvals", exact: true }).count(),
              0,
            );
            await page.screenshot({ path: `${out}/${view}-${appearance}-${width}.png` });
          },
          width,
          height,
        );
      }
  await check("calendar-post-copy-edit-and-schedule", async (page) => {
    await go(page, "calendar");
    const dialog = await calendarPost(page);
    assert(
      await dialog
        .getByRole("img", { name: "Fresh croissants and morning buns on a tray in the bakery" })
        .isVisible(),
    );
    await dialog.getByRole("button", { name: "Edit text", exact: true }).click();
    const input = dialog.getByRole("textbox", { name: "Draft text", exact: true });
    await input.fill("A warm loaf, made before sunrise. Synthetic owner edit.");
    assert(await dialog.getByRole("button", { name: "Save schedule", exact: true }).isDisabled());
    await dialog.getByRole("button", { name: "Close calendar item", exact: true }).click();
    await dialog.getByRole("button", { name: "Keep editing", exact: true }).click();
    assert.equal(
      await input.inputValue(),
      "A warm loaf, made before sunrise. Synthetic owner edit.",
    );
    await dialog.getByRole("button", { name: "Save text", exact: true }).click();
    await input.waitFor({ state: "hidden" });
    await dialog
      .getByText("A warm loaf, made before sunrise. Synthetic owner edit.", { exact: true })
      .waitFor();
    await dialog.getByLabel("Date", { exact: true }).fill("2026-10-03");
    await dialog.getByLabel(/^Time/).fill("00:00");
    await dialog.getByRole("button", { name: "Save schedule", exact: true }).click();
    await dialog.waitFor({ state: "hidden" });
    await page.getByRole("button", { name: "Next calendar period", exact: true }).click();
    await page.getByRole("button", { name: "Preview Made before sunrise", exact: true }).click();
    assert.equal(await page.getByRole("dialog").getByLabel(/^Time/).inputValue(), "00:00");
  });
  await check("calendar-error-keeps-copy-and-schedule", async (page) => {
    await go(page, "calendar", "populated", "error");
    const dialog = await calendarPost(page);
    await dialog.getByRole("button", { name: "Edit text", exact: true }).click();
    const input = dialog.getByRole("textbox", { name: "Draft text", exact: true });
    await input.fill("Keep my synthetic edited post after failure.");
    await dialog.getByRole("button", { name: "Save text", exact: true }).click();
    await dialog.getByRole("alert").waitFor();
    assert.equal(await input.inputValue(), "Keep my synthetic edited post after failure.");
    assert(await input.isEnabled());
    await dialog.getByRole("button", { name: "Cancel text edit", exact: true }).click();
    await dialog.getByLabel("Date", { exact: true }).fill("2026-10-05");
    await dialog.getByRole("button", { name: "Save schedule", exact: true }).click();
    await dialog.getByRole("alert").waitFor();
    assert.equal(await dialog.getByLabel("Date", { exact: true }).inputValue(), "2026-10-05");
  });
  await check("calendar-period-navigation-matches-list", async (page) => {
    await go(page, "calendar");
    await page.getByRole("button", { name: "List", exact: true }).click();
    await page.getByRole("button", { name: "Preview Made before sunrise", exact: true }).waitFor();
    await page.getByRole("button", { name: "Next calendar period", exact: true }).click();
    assert.equal(
      await page.getByRole("button", { name: "Preview Made before sunrise", exact: true }).count(),
      0,
    );
    await page.getByRole("button", { name: "Previous calendar period", exact: true }).click();
    await page.getByRole("button", { name: "Preview Made before sunrise", exact: true }).waitFor();
  });
  await check("brand-failed-save-stays-on-step", async (page) => {
    await go(page, "brand", "populated", "error");
    const input = page.getByRole("textbox", { name: "Business or project name", exact: true });
    await input.fill("Daybreak Owner Test");
    await page.getByRole("button", { name: "Save and continue", exact: true }).click();
    await page.getByRole("alert").waitFor();
    assert.equal(await input.inputValue(), "Daybreak Owner Test");
    assert(await page.getByRole("heading", { name: "Business", exact: true }).isVisible());
  });
  await check("brand-guide-visual-identity", async (page) => {
    await go(page, "brand");
    await page.getByRole("button", { name: "Preview guide", exact: true }).click();
    const dialog = page.getByRole("dialog");
    await dialog.waitFor();
    assert(await dialog.getByRole("heading", { name: "Daybreak Bakery", exact: true }).isVisible());
    await dialog.getByRole("img", { name: "Morning craft", exact: true }).first().waitFor();
    assert.equal(await dialog.locator(".studio-brand-swatches > div").count(), 3);
    for (const swatch of await dialog.locator(".studio-brand-swatches > div").all()) {
      const colors = await swatch.evaluate((el) => ({
        bg: getComputedStyle(el).backgroundColor,
        fg: getComputedStyle(el).color,
      }));
      assert.notEqual(colors.bg, colors.fg);
    }
    await page.keyboard.press("Escape");
    await dialog.waitFor({ state: "hidden" });
  });
  await check("roadmap-to-idea-to-campaign", async (page) => {
    await go(page, "roadmap");
    const card = page.locator(".studio-roadmap-card").first();
    await card.getByRole("button", { name: "Save idea", exact: true }).click();
    const open = card.getByRole("link", { name: "Open in Ideas", exact: true });
    await open.waitFor();
    await page.waitForFunction(
      () => document.querySelector(".studio-roadmap-card select")?.value === "planned",
    );
    assert.equal(await card.getByRole("combobox").inputValue(), "planned");
    await open.click();
    const idea = page.locator(".studio-saved-idea").first();
    await idea.getByRole("link", { name: "Build this", exact: true }).click();
    await page.getByRole("heading", { name: "Content Engine", exact: true }).waitFor();
    assert(await page.getByRole("heading", { level: 1 }).isVisible());
  });
  await check("roadmap-failed-save-keeps-actions", async (page) => {
    await go(page, "roadmap", "populated", "error");
    const card = page.locator(".studio-roadmap-card").first();
    await card.getByRole("button", { name: "Save idea", exact: true }).click();
    await card.getByRole("alert").waitFor();
    assert(await card.getByRole("button", { name: "Save idea", exact: true }).isEnabled());
    assert.equal(await card.getByRole("combobox").inputValue(), "recommended");
  });
  await check("ideas-failed-save-preserves-source", async (page) => {
    await go(page, "ideas", "empty", "error");
    const draft = page.locator("textarea").first();
    await draft.fill("Show the people who make our bread every morning.");
    await page.getByRole("button", { name: "Save source", exact: true }).click();
    await page.getByRole("alert").waitFor();
    assert.equal(await draft.inputValue(), "Show the people who make our bread every morning.");
    assert.equal(await page.locator(".studio-saved-idea").count(), 0);
  });
  for (const outcome of ["success", "error"])
    await check(`ideas-edit-${outcome}`, async (page) => {
      await go(page, "ideas", "populated", outcome);
      const card = page.locator(".studio-saved-idea").first();
      await card.getByRole("button", { name: /^Edit idea / }).click();
      const input = card.getByRole("textbox", { name: "Idea text", exact: true });
      await input.fill("Show the people behind our daily bread. Edited by the owner.");
      await card.getByRole("button", { name: "Save idea changes", exact: true }).click();
      if (outcome === "success") {
        await input.waitFor({ state: "hidden" });
        await card
          .getByRole("heading", {
            name: "Show the people behind our daily bread. Edited by the owner.",
            exact: true,
          })
          .waitFor();
      } else {
        await card.getByRole("alert").waitFor();
        assert.equal(
          await input.inputValue(),
          "Show the people behind our daily bread. Edited by the owner.",
        );
        assert(
          await card.getByRole("button", { name: "Save idea changes", exact: true }).isEnabled(),
        );
      }
    });
  for (const view of ["calendar", "ideas", "library", "roadmap"])
    await check(`empty-${view}`, async (page) => {
      await go(page, view, "empty");
      assert.equal(await page.getByRole("heading", { level: 1 }).count(), 1);
      assert.equal(await page.locator('img[src=""], img[src="undefined"]').count(), 0);
      if (view === "roadmap") assert((await page.locator(".studio-roadmap-card").count()) > 0);
      if (view === "ideas")
        assert(await page.getByRole("button", { name: "Save source", exact: true }).isVisible());
      if (view === "library") assert.equal(await page.locator(".studio-library-card").count(), 0);
    });
} finally {
  await browser.close();
}
await writeFile(
  `${out}/business-journey-report.json`,
  JSON.stringify({ results, external, errors }, null, 2),
);
console.log(JSON.stringify({ results, external, errors }, null, 2));
if (results.some((r) => r.result === "fail") || errors.length || external.length)
  process.exitCode = 1;
