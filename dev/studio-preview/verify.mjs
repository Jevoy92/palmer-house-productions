import assert from "node:assert/strict";
import { writeFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || "playwright");
const browser = await chromium.launch({
  executablePath:
    process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
});
const origin = process.env.PREVIEW_ORIGIN || "http://127.0.0.1:4175";
if (!/^http:\/\/(127\.0\.0\.1|localhost):\d+$/.test(origin))
  throw new Error("Checks require the isolated loopback preview.");
const out = resolve(process.env.PREVIEW_OUT || "docs/studio-polish/captures");
await mkdir(out, { recursive: true });
const report = [];
const external = [];
const errors = [];
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
page.on("request", (r) => {
  if (!r.url().startsWith(origin) && !r.url().startsWith("data:")) external.push(r.url());
});
page.on("pageerror", (e) => errors.push(e.message));
async function go(view, state = "populated", outcome = "success", controls = 0) {
  await page.goto(
    `${origin}/?view=${view}&state=${state}&outcome=${outcome}&controls=${controls}`,
    { waitUntil: "networkidle" },
  );
  await page.waitForTimeout(500);
}
async function shot(name) {
  await page.waitForTimeout(350);
  await page.screenshot({ path: `${out}/interaction-${name}-390x844.png` });
}
async function check(name, fn) {
  if (process.env.CASE_PREFIX && !name.startsWith(process.env.CASE_PREFIX)) return;
  try {
    await fn();
    report.push({ name, result: "pass" });
  } catch (e) {
    report.push({ name, result: "fail", error: String(e) });
    await shot(name + "-failure");
  }
}
await check("navigation-focus", async () => {
  await go("home");
  const trigger = page.getByRole("button", { name: "Open navigation", exact: true });
  await trigger.click();
  await page.getByRole("dialog").waitFor();
  await shot("navigation");
  for (let n = 0; n < 14; n++) await page.keyboard.press("Tab");
  assert(await page.evaluate(() => !!document.activeElement.closest('[role="dialog"]')));
  await page.keyboard.press("Escape");
  await page.getByRole("dialog").waitFor({ state: "hidden" });
  await page.waitForTimeout(300);
  assert(await trigger.evaluate((el) => el === document.activeElement));
});
await check("setup-focus", async () => {
  await go("home");
  const trigger = page.getByRole("button", { name: /Workspace setup,/ });
  await trigger.click();
  await page.getByRole("dialog").waitFor();
  await shot("setup");
  await page.keyboard.press("Escape");
  await page.getByRole("dialog").waitFor({ state: "hidden" });
  await page.waitForTimeout(300);
  assert(await trigger.evaluate((el) => el === document.activeElement));
});
await check("library-edit-persist", async () => {
  await go("library");
  await page.getByRole("button", { name: "Read & edit", exact: true }).first().click();
  await page.getByRole("dialog").waitFor();
  await page.getByLabel("Draft content").fill("Synthetic revised furniture draft for visual QA.");
  await page.getByRole("dialog").getByRole("combobox").selectOption("review");
  await shot("library-edit");
  await page.getByRole("button", { name: "Save changes", exact: true }).click();
  await page.getByRole("dialog").waitFor({ state: "hidden" });
  await page.waitForTimeout(300);
  assert(
    await page
      .getByText("Synthetic revised furniture draft for visual QA.", { exact: true })
      .isVisible(),
  );
});
await check("library-error-retains-draft", async () => {
  await go("library", "populated", "error");
  await page.getByRole("button", { name: "Read & edit", exact: true }).first().click();
  await page.getByLabel("Draft content").fill("Keep this synthetic edit when save fails.");
  await page.getByRole("button", { name: "Save changes", exact: true }).click();
  await page.getByRole("alert").waitFor();
  assert.equal(
    await page.getByLabel("Draft content").inputValue(),
    "Keep this synthetic edit when save fails.",
  );
  await shot("library-error");
});
await check("chat-error-retains-draft", async () => {
  await go("conversations", "populated", "error");
  await page
    .getByRole("textbox", { name: "Message Kiana", exact: true })
    .fill("Keep this synthetic question after failure.");
  await page.getByRole("button", { name: "Send message", exact: true }).click();
  await page.waitForTimeout(1100);
  assert.equal(
    await page.getByRole("textbox", { name: "Message Kiana", exact: true }).inputValue(),
    "Keep this synthetic question after failure.",
  );
  await shot("chat-error");
});
await check("chat-pending-transition", async () => {
  await go("assistant", "populated", "pending", 1);
  await page
    .getByRole("textbox", { name: "Message Kiana", exact: true })
    .fill("Synthetic pending question.");
  await page.getByRole("button", { name: "Send message", exact: true }).click();
  await page.waitForTimeout(250);
  assert(await page.getByRole("button", { name: "Send message", exact: true }).isDisabled());
  await shot("chat-pending");
  await page.getByText("Local fixtures", { exact: true }).click();
  await page.getByRole("button", { name: "Resolve pending", exact: true }).click();
  await page.getByText("Local fixtures", { exact: true }).click();
  await page.waitForTimeout(700);
  assert.equal(
    await page.getByRole("textbox", { name: "Message Kiana", exact: true }).inputValue(),
    "",
  );
  await shot("chat-resolved");
});
await check("workspace-error-retry", async () => {
  await go("home", "error");
  await page.getByRole("button", { name: "Try again", exact: true }).click();
  await page.getByText("Good to see you, Jamie.", { exact: true }).waitFor();
});
await check("support-synthetic-request", async () => {
  await go("success");
  await page.getByText("Review a project", { exact: true }).click();
  assert(await page.getByRole("radio", { name: "Review a project", exact: true }).isChecked());
  await page.getByRole("radio", { name: "Review a project", exact: true }).focus();
  await page.keyboard.press("ArrowLeft");
  assert(await page.getByRole("radio", { name: "Ask a question", exact: true }).isChecked());
  await page.keyboard.press("ArrowRight");
  await page.getByLabel("Attach a Studio campaign").selectOption({ index: 1 });
  await page
    .getByLabel("What should we know?")
    .fill("Please review this synthetic sample campaign.");
  await page.getByRole("button", { name: "Send to Palmer House", exact: true }).click();
  await page.getByText("Recent requests", { exact: true }).waitFor();
  assert.equal(await page.getByLabel("What should we know?").inputValue(), "");
  await shot("support-saved");
  await page.getByText("Your Studio progress · 5 of 6 missions complete", { exact: true }).click();
  assert(await page.getByText("Open the Skill Lab:", { exact: false }).isVisible());
});
await check("support-error-retains-draft", async () => {
  await go("success", "populated", "error");
  await page
    .getByLabel("What should we know?")
    .fill("Keep this synthetic support question on failure.");
  await page.getByRole("button", { name: "Send to Palmer House", exact: true }).click();
  await page.waitForTimeout(850);
  assert.equal(
    await page.getByLabel("What should we know?").inputValue(),
    "Keep this synthetic support question on failure.",
  );
  assert(
    await page
      .getByText("Preview request failed. Your draft is still available; try again.", {
        exact: true,
      })
      .isVisible(),
  );
  await shot("support-error");
});
await writeFile(
  `${out}/${process.env.CASE_PREFIX || "interaction"}-report.json`,
  JSON.stringify({ report, external, errors }, null, 2),
);
console.log(JSON.stringify({ report, external, errors }, null, 2));
await browser.close();
