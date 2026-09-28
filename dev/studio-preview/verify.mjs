import assert from "node:assert/strict";
import { writeFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";

// All requests and writes belong to the synthetic preview, never the live Studio.
const origin = process.env.PREVIEW_ORIGIN || "http://127.0.0.1:4175";
if (!/^http:\/\/(127\.0\.0\.1|localhost):\d+$/.test(origin))
  throw new Error("Checks require the isolated loopback preview.");
const out = resolve(process.env.PREVIEW_OUT || "/private/tmp/studio-chat-review");
await mkdir(out, { recursive: true });
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || "playwright");
const browser = await chromium.launch({
  executablePath:
    process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
});
const report = [],
  external = [],
  errors = [];
let page;
async function go(view, state = "populated", outcome = "success", controls = 0) {
  await page.goto(
    `${origin}/?view=${view}&state=${state}&outcome=${outcome}&controls=${controls}`,
    { waitUntil: "networkidle" },
  );
}
async function shot(name) {
  const { width, height } = page.viewportSize();
  await page.screenshot({ path: `${out}/interaction-${name}-${width}x${height}.png` });
}
async function focusInside(dialog, count = 16) {
  await dialog.waitFor();
  for (let n = 0; n < count; n++) {
    await page.keyboard.press("Tab");
    assert(
      await dialog.evaluate((el) => el.contains(document.activeElement)),
      "Focus escaped dialog",
    );
  }
}
async function focused(locator) {
  assert(
    await locator.evaluate((el) => el === document.activeElement),
    "Focus did not return to opener",
  );
}
async function closeDialog(dialog) {
  await page.keyboard.press("Escape");
  await dialog.waitFor({ state: "hidden" });
  await page.waitForTimeout(250); // Radix restores focus after its closing animation.
}
async function openLibraryEditor() {
  const trigger = page
    .locator(".studio-library-card")
    .first()
    .getByRole("button", { name: /^Open / });
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await dialog.waitFor();
  await dialog.getByRole("tab", { name: "Edit", exact: true }).click();
  return { trigger, dialog, text: dialog.getByRole("textbox").first() };
}
async function check(name, fn) {
  if (process.env.CASE_PREFIX && !name.startsWith(process.env.CASE_PREFIX)) return;
  page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  page.setDefaultTimeout(12000);
  page.on("request", (request) => {
    if (!request.url().startsWith(origin) && !/^(data|blob):/.test(request.url()))
      external.push({ case: name, url: request.url() });
  });
  page.on("pageerror", (error) => errors.push({ case: name, message: error.message }));
  try {
    await fn();
    report.push({ name, result: "pass" });
  } catch (error) {
    report.push({ name, result: "fail", error: String(error) });
    await shot(name + "-failure").catch(() => {});
  } finally {
    await page.close();
  }
}
try {
  for (const view of ["home", "assistant"]) {
    await check(`navigation-focus-${view}`, async () => {
      await go(view);
      const trigger = page.getByRole("button", {
        name: view === "assistant" ? "Open Studio navigation" : "Open navigation",
        exact: true,
      });
      await trigger.click();
      const dialog = page.getByRole("dialog", { name: "Your Studio", exact: true });
      await focusInside(dialog);
      await shot(`navigation-${view}`);
      await closeDialog(dialog);
      await focused(trigger);
    });
  }
  // The former setup drawer is replaced by the Pal picker and custom Pal drawer.
  await check("custom-pal-focus", async () => {
    await go("assistant");
    const trigger = page.getByRole("button", { name: "Change Pal, currently Kiana", exact: true });
    await trigger.click();
    const picker = page.getByRole("dialog", { name: "Who do you want on this?", exact: true });
    await focusInside(picker);
    await closeDialog(picker);
    await focused(trigger);
    await trigger.click();
    await picker.getByRole("button", { name: "Create a Pal", exact: true }).click();
    const custom = page.getByRole("dialog", { name: "Create your Pal", exact: true });
    await focusInside(custom);
    await shot("custom-pal-focus");
    await closeDialog(custom);
    await focused(trigger);
  });
  await check("library-edit-persist", async () => {
    await go("library");
    const { trigger, dialog, text } = await openLibraryEditor();
    const updated = "Synthetic revised Daybreak bakery draft for visual QA.";
    await text.fill(updated);
    await shot("library-edit");
    await dialog.getByRole("button", { name: "Save changes", exact: true }).click();
    await dialog.getByText("Saved to Library", { exact: true }).waitFor();
    await closeDialog(dialog);
    await focused(trigger);
    const reopened = await openLibraryEditor();
    assert.equal(await reopened.text.inputValue(), updated);
    await reopened.dialog.getByRole("tab", { name: "Preview", exact: true }).click();
    assert(await reopened.dialog.getByText(updated, { exact: true }).isVisible());
  });
  await check("library-error-retains-draft", async () => {
    await go("library", "populated", "error");
    const { dialog, text } = await openLibraryEditor();
    await text.fill("Keep this synthetic edit when save fails.");
    await dialog.getByRole("button", { name: "Save changes", exact: true }).click();
    await dialog.getByRole("alert").waitFor();
    assert.equal(await text.inputValue(), "Keep this synthetic edit when save fails.");
    assert(await dialog.getByRole("button", { name: "Save changes", exact: true }).isEnabled());
    await shot("library-error");
  });
  await check("chat-error-retains-draft", async () => {
    await go("conversations", "populated", "error");
    const composer = page.getByRole("textbox", { name: "Message Kiana", exact: true });
    await composer.fill("Keep this synthetic question after failure.");
    await page.getByRole("button", { name: "Send message", exact: true }).click();
    await page
      .getByText("Preview request failed. Your draft is still available; try again.", {
        exact: true,
      })
      .waitFor();
    assert.equal(await composer.inputValue(), "Keep this synthetic question after failure.");
    assert(await page.getByRole("button", { name: "Send message", exact: true }).isEnabled());
    await shot("chat-error");
  });
  await check("chat-pending-transition", async () => {
    await go("assistant", "populated", "pending", 1);
    const composer = page.getByRole("textbox", { name: "Message Kiana", exact: true });
    const responses = page.locator(".studio-chat-artifact");
    const before = await responses.count();
    await composer.fill("Synthetic pending question.");
    await page.getByRole("button", { name: "Send message", exact: true }).click();
    assert(await page.getByRole("button", { name: "Send message", exact: true }).isDisabled());
    await shot("chat-pending");
    await page.getByText("Local fixtures", { exact: true }).click();
    await page.getByRole("button", { name: "Resolve pending", exact: true }).click();
    await page.getByText("Local fixtures", { exact: true }).click();
    await page.waitForFunction(
      () => document.querySelector('[aria-label="Message Kiana"]').value === "",
    );
    assert.equal(await responses.count(), before + 1, "Pending reply was not appended");
    await shot("chat-resolved");
  });
  await check("workspace-error-retry", async () => {
    await go("home", "error");
    await page.getByRole("button", { name: "Try again", exact: true }).click();
    await page.getByRole("heading", { name: /Good to see you, Alex\./ }).waitFor();
    assert.equal(await page.getByRole("button", { name: "Try again", exact: true }).count(), 0);
  });
  await check("support-synthetic-request", async () => {
    await go("success");
    await page.getByText("Review a project", { exact: true }).click();
    const project = page.getByRole("radio", { name: "Review a project", exact: true });
    assert(await project.isChecked());
    await project.focus();
    await page.keyboard.press("ArrowLeft");
    assert(await page.getByRole("radio", { name: "Ask a question", exact: true }).isChecked());
    await page.keyboard.press("ArrowRight");
    await page.getByLabel("Attach a Studio campaign").selectOption({ index: 1 });
    await page
      .getByLabel("What should we know?")
      .fill("Please review this synthetic sample campaign.");
    await page.getByRole("button", { name: "Send to Palmer House", exact: true }).click();
    await page.waitForFunction(() => {
      const field = Array.from(document.querySelectorAll("label"))
        .find((label) => label.textContent.includes("What should we know?"))
        ?.querySelector("textarea");
      return field?.value === "";
    });
    await page.getByText("Recent requests", { exact: true }).waitFor();
    assert(await page.getByText(/^project review$/i).isVisible());
    assert.equal(await page.getByLabel("What should we know?").inputValue(), "");
    await shot("support-saved");
    await page.getByText(/Your Studio progress · \d+ of \d+ missions complete/).click();
    assert(await page.getByText("Open the Skill Lab:", { exact: false }).isVisible());
  });
  await check("support-error-retains-draft", async () => {
    await go("success", "populated", "error");
    await page
      .getByLabel("What should we know?")
      .fill("Keep this synthetic support question on failure.");
    await page.getByRole("button", { name: "Send to Palmer House", exact: true }).click();
    await page
      .getByText("Preview request failed. Your draft is still available; try again.", {
        exact: true,
      })
      .waitFor();
    assert.equal(
      await page.getByLabel("What should we know?").inputValue(),
      "Keep this synthetic support question on failure.",
    );
    await shot("support-error");
  });
  await check("chat-custom-pal-authorship", async () => {
    await go("assistant");
    await page.getByRole("button", { name: "Change Pal, currently Kiana", exact: true }).click();
    await page.getByRole("button", { name: "Create a Pal", exact: true }).click();
    const dialog = page.getByRole("dialog", { name: "Create your Pal", exact: true });
    await dialog.getByRole("textbox", { name: "Name", exact: true }).fill("Maya");
    await dialog
      .getByRole("textbox", { name: "Personality", exact: true })
      .fill("Warm, curious, and concise. Ask one thoughtful question at a time.");
    await dialog.getByRole("button", { name: "Meet your Pal", exact: true }).click();
    await dialog.waitFor({ state: "hidden" });
    await page.getByRole("textbox", { name: "Message Maya", exact: true }).waitFor();
    assert.match(await page.locator(".studio-chat-author").first().innerText(), /Kiana/);
    await page.getByRole("button", { name: "Change Pal, currently Maya", exact: true }).click();
    assert.equal(
      await page
        .getByRole("dialog")
        .getByRole("button", { name: "Maya Your custom Pal", exact: true })
        .getAttribute("aria-pressed"),
      "true",
    );
  });
  await check("chat-artifact-error-retains-request", async () => {
    await go("assistant", "populated", "error");
    await page.getByRole("button", { name: "Add files or create content", exact: true }).click();
    await page.getByRole("button", { name: "Create PDF", exact: true }).click();
    const dialog = page.getByRole("dialog");
    await dialog.getByRole("textbox", { name: "Title", exact: true }).fill("Retry this guide");
    await dialog
      .getByRole("textbox", { name: "What should we make?", exact: true })
      .fill("Keep this request after generation fails.");
    await dialog.getByRole("button", { name: "Create PDF", exact: true }).click();
    await dialog.getByRole("alert").waitFor();
    assert.equal(
      await dialog.getByRole("textbox", { name: "Title", exact: true }).inputValue(),
      "Retry this guide",
    );
    assert.equal(
      await dialog.getByRole("textbox", { name: "What should we make?", exact: true }).inputValue(),
      "Keep this request after generation fails.",
    );
  });
  for (const [width, height] of [
    [390, 844],
    [1440, 1000],
  ]) {
    await check(`chat-dark-controls-${width}`, async () => {
      await page.setViewportSize({ width, height });
      await go("assistant");
      await page.evaluate(() => {
        localStorage.setItem(
          "palmer.studio.appearance.v1",
          JSON.stringify({ theme: "dark", largerText: false, reduceMotion: true }),
        );
        window.dispatchEvent(new CustomEvent("studio:appearance"));
      });
      await page.waitForFunction(() => document.documentElement.dataset.studioTheme === "dark");
      await page
        .getByRole("textbox", { name: "Message Kiana", exact: true })
        .fill("A draft to enable the send control");
      async function contrast(locator) {
        const ratio = await locator.evaluate((element) => {
          const style = getComputedStyle(element);
          const light = (rgb) => {
            const values = rgb
              .match(/[\d.]+/g)
              .slice(0, 3)
              .map(Number)
              .map((v) => v / 255)
              .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
            return values[0] * 0.2126 + values[1] * 0.7152 + values[2] * 0.0722;
          };
          const a = light(style.color),
            b = light(style.backgroundColor);
          return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
        });
        assert(ratio >= 4.5, `Dark action contrast is ${ratio.toFixed(2)}:1`);
      }
      await contrast(page.getByRole("tab", { name: "Facebook", exact: true }));
      await contrast(page.getByRole("button", { name: "Send message", exact: true }));
      await page.getByRole("button", { name: "Edit", exact: true }).click();
      const editor = page.locator(".studio-chat-editor");
      await editor
        .getByRole("textbox")
        .first()
        .fill("Fresh bread, made by hand. A synthetic edit for dark mode checks.");
      await contrast(editor.getByRole("tab", { name: "Edit", exact: true }));
      await contrast(editor.getByRole("button", { name: "Save changes", exact: true }));
      const dimensions = await page.evaluate(() => ({
        width: document.documentElement.scrollWidth,
        height: document.documentElement.scrollHeight,
      }));
      assert.equal(dimensions.width, width, "Horizontal page overflow");
      assert.equal(dimensions.height, height, "Chat escapes the viewport");
      await shot("dark-editor");
    });
  }
} finally {
  await browser.close();
}
const result = { report, external, errors };
await writeFile(
  `${out}/${process.env.CASE_PREFIX || "interaction"}-report.json`,
  JSON.stringify(result, null, 2),
);
console.log(JSON.stringify(result, null, 2));
if (report.some((item) => item.result === "fail") || external.length || errors.length)
  process.exitCode = 1;
