import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
const origin = process.env.PREVIEW_ORIGIN || "http://127.0.0.1:4175";
if (!/^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin))
  throw new Error("Local synthetic preview only");
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || "playwright");
const browser = await chromium.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
});
const out = process.env.PREVIEW_OUT || "/private/tmp/studio-draft-image";
await mkdir(out, { recursive: true });
const results = [],
  errors = [],
  external = [];
try {
  for (const outcome of ["success", "error", "pending"]) {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    page.setDefaultTimeout(10000);
    page.on("pageerror", (error) => errors.push(String(error)));
    page.on("request", (request) => {
      if (!request.url().startsWith(origin) && !/^(blob|data):/.test(request.url()))
        external.push(request.url());
    });
    try {
      await page.goto(
        `${origin}/?view=library&state=populated&outcome=${outcome}&controls=${outcome === "pending" ? 1 : 0}`,
        { waitUntil: "networkidle" },
      );
      const other = await page
        .locator(".studio-library-card")
        .nth(1)
        .locator("img")
        .first()
        .getAttribute("src");
      await page
        .locator(".studio-library-card")
        .first()
        .getByRole("button", { name: /^Open / })
        .click();
      const dialog = page.getByRole("dialog");
      await dialog.getByRole("tab", { name: "Edit", exact: true }).click();
      await dialog.getByRole("button", { name: "Image for this draft" }).click();
      const direction = dialog.getByRole("textbox", { name: /Visual direction/ });
      await direction.fill(
        "A close view of golden croissants beside the bakery counter in morning light.",
      );
      await dialog.getByRole("combobox", { name: "Image format" }).selectOption("social");
      if (outcome === "success") {
        const text = dialog.getByRole("textbox", { name: /Post text/ });
        await text.fill("Our croissants are ready for the morning. Stop by Daybreak Bakery.");
        assert.equal(
          await dialog
            .getByRole("button", { name: "Generate draft image", exact: true })
            .isEnabled(),
          false,
        );
        await dialog.getByRole("button", { name: "Save changes", exact: true }).click();
        await page.waitForFunction(() =>
          [...document.querySelectorAll("button")].some(
            (button) => button.textContent.trim() === "Generate draft image" && !button.disabled,
          ),
        );
      }
      await dialog.getByRole("button", { name: "Generate draft image", exact: true }).click();
      if (outcome === "pending") {
        await dialog.getByRole("button", { name: "Creating draft image…", exact: true }).waitFor();
        await dialog.getByRole("button", { name: "Close draft editor", exact: true }).click();
        assert(await dialog.isVisible(), "Closing lost an in-flight image request");
        await page.keyboard.press("Escape");
        assert(await dialog.isVisible(), "Escape lost an in-flight image request");
      }
      if (outcome === "error") {
        await dialog.getByRole("alert").waitFor();
        assert.match(await direction.inputValue(), /golden croissants/);
        assert(
          await dialog
            .getByRole("button", { name: "Generate draft image", exact: true })
            .isEnabled(),
        );
      } else if (outcome === "success") {
        await dialog
          .getByText("Saved to this draft and your Library. Other drafts keep their own images.", {
            exact: true,
          })
          .waitFor();
        await dialog.getByRole("tab", { name: "Preview", exact: true }).click();
        const image = dialog.locator(".studio-native-media img");
        await image.waitFor();
        assert(
          await image.evaluate((el) => el.complete && el.naturalWidth > 0),
          "Private linked image failed to reopen in native preview",
        );
        await dialog.getByRole("button", { name: "Close draft editor", exact: true }).click();
        await dialog.waitFor({ state: "hidden" });
        assert.equal(
          await page
            .locator(".studio-library-card")
            .filter({ hasText: "The person behind your morning loaf" })
            .locator("img")
            .first()
            .getAttribute("src"),
          other,
          "Another draft's image was replaced",
        );
      }
      await page.screenshot({ path: `${out}/${outcome}.png` });
      results.push({ name: outcome, result: "pass" });
    } catch (error) {
      results.push({ name: outcome, result: "fail", error: String(error) });
      await page.screenshot({ path: `${out}/${outcome}-failure.png` }).catch(() => {});
    } finally {
      await page.close();
    }
  }
} finally {
  await browser.close();
}
const report = { results, errors, external };
await writeFile(`${out}/report.json`, JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
if (errors.length || external.length || results.some((item) => item.result === "fail"))
  process.exitCode = 1;
