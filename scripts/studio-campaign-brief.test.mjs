import test from "node:test";
import assert from "node:assert/strict";
import { CampaignBriefSchema } from "../src/lib/studio-model.ts";

const baseBrief = {
  workspaceId: "c439cd54-5a21-49c8-a7a1-0c710402b097",
  campaignId: "c871bd0c-c3f5-4230-9c72-83308a8f9d16",
  accessToken: "test-access-token-no-real-secret",
  goal: "Help local homeowners prepare for winter",
  offer: "Book a maintenance visit",
  audience: "Local homeowners",
  anchorFormat: "authority_video",
  depth: "strategic",
  brand: {
    businessName: "Example Heating",
    description: "Heating repair and maintenance for local homeowners.",
    voice: ["Clear", "Helpful"],
    proof: [],
    callsToAction: ["Book a maintenance visit"],
    avoidLanguage: [],
  },
};

test("a campaign accepts the complete bounded Pal reply used by chat", () => {
  const reply =
    "Show the actual furnace filter and explain how homeowners can check its size before buying a replacement. ";
  const topic = ["Prepare your heating for winter", reply.repeat(45)].join("\n\n").slice(0, 4000);
  assert.equal(topic.length, 4000);
  const parsed = CampaignBriefSchema.parse({ ...baseBrief, topic });
  assert.equal(parsed.topic, topic);
});

test("a full idea plus its selected strategic direction fits the campaign request", () => {
  const idea = "Discuss winter maintenance for local homes. ".repeat(30).slice(0, 1200);
  const topic = `${idea}\n\nStrategic direction: Walk through a real service visit, showing the filter, thermostat and vents so the homeowner knows what to check before scheduling help.`;
  assert.ok(topic.length > 1200);
  assert.equal(CampaignBriefSchema.parse({ ...baseBrief, topic }).topic, topic);
});

test("campaign topics still reject unbounded input and empty directions", () => {
  assert.equal(CampaignBriefSchema.safeParse({ ...baseBrief, topic: "x".repeat(4001) }).success, false);
  assert.equal(CampaignBriefSchema.safeParse({ ...baseBrief, topic: "" }).success, false);
});
