import test from "node:test";
import assert from "node:assert/strict";
import {
  submitWebinarInterest,
  assessmentRecommendation,
  assessmentBrief,
} from "../src/lib/public-resources.ts";
const details = { name: "Local Test", email: "test@example.test", company: "Fictional" };
test("missing webinar endpoint never reports received or creates a request", async () => {
  let calls = 0;
  assert.deepEqual(
    await submitWebinarInterest(details, {
      endpoint: "",
      fetcher: async () => {
        calls++;
      },
    }),
    { status: "draft" },
  );
  assert.equal(calls, 0);
});
test("failed webinar request preserves an explicit error, not registration", async () => {
  for (const fetcher of [
    async () => ({ ok: false }),
    async () => {
      throw new Error("offline");
    },
  ])
    assert.equal(
      (await submitWebinarInterest(details, { endpoint: "https://test.invalid", fetcher })).status,
      "error",
    );
});
test("webinar accepted means interest only, and includes no booking claim", async () => {
  let payload;
  const result = await submitWebinarInterest(details, {
    endpoint: "https://test.invalid",
    fetcher: async (_url, options) => {
      payload = JSON.parse(options.body);
      return { ok: true };
    },
  });
  assert.deepEqual(result, { status: "accepted" });
  assert.equal(payload.projectType, "Webinar interest");
  assert.match(payload.message, /confirm the date/);
});
test("assessment separates production category from how someone needs help", () => {
  const answers = {
    businessType: "Services",
    teamSize: "Just me",
    videoHabits: "None",
    goal: "Stop repeating the same explanations to customers or staff",
    bottleneck: "No confidence on camera",
  };
  const prep = assessmentRecommendation(answers);
  assert.equal(prep.lane, "system");
  assert.equal(prep.intent, "preparation");
  assert.equal(
    assessmentRecommendation({ ...answers, bottleneck: "No time to plan or shoot" }).intent,
    "production",
  );
  assert.equal(
    assessmentRecommendation({
      ...answers,
      bottleneck: "No system to organize or reuse what we make",
    }).intent,
    "studio",
  );
  assert.equal(
    assessmentRecommendation({
      ...answers,
      goal: "Share our expertise through longer educational videos",
    }).lane,
    "evergreen",
  );
  assert.equal(assessmentRecommendation({ ...answers, teamSize: "100+" }).intent, prep.intent);
  assert.match(assessmentBrief(answers), /No confidence on camera/);
});
