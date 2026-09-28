import test from "node:test";
import assert from "node:assert/strict";
import { composePalOpening } from "../src/lib/pal-greetings.ts";
import { palPersonas, personaPrompt } from "../src/lib/pal-personas.ts";

test("each Pal opens the same real workspace in a distinct voice with shared capabilities", () => {
  const openings = Object.keys(palPersonas).map((pal) => {
    const opening = composePalOpening(pal, {
      businessName: "Daybreak",
      campaignTitle: "Morning rituals",
    });
    assert.match(opening.body, /“Morning rituals” is in your campaigns/);
    assert.doesNotMatch(opening.body, /I researched|I found|I created|I saved/);
    assert.match(personaPrompt(pal), /Every Pal has the same workspace capabilities/);
    assert.match(personaPrompt(pal), /cannot generate a finished video/);
    return opening;
  });
  assert.equal(new Set(openings.map((item) => item.headline)).size, 8);
  assert.equal(new Set(openings.map((item) => item.body)).size, 8);
  assert.equal(new Set(openings.map((item) => item.suggestions[0])).size, 8);
});

test("returning thread takes priority over unrelated campaign and calendar facts", () => {
  const opening = composePalOpening("clara", {
    threadTitle: "Customer welcome guide",
    campaignTitle: "Spring sale",
    upcomingTitle: "Friday post",
  });
  assert.match(opening.body, /Customer welcome guide/);
  assert.doesNotMatch(opening.body, /Spring sale|Friday post/);
  assert.equal(opening.contextLabel, "Your conversation");
});

test("fresh workspaces never imply saved work exists and custom names remain authored", () => {
  const opening = composePalOpening("kiana", {
    memberName: "Avery Adams",
    businessName: "Daybreak",
    customName: "Maya",
  });
  assert.equal(opening.headline, "Hi Avery. I’m Maya.");
  assert.doesNotMatch(opening.body, /campaigns|calendar|saved|memory/);
  assert.match(opening.body, /Daybreak/);
  const first = composePalOpening("ryder", {}, 0);
  const next = composePalOpening("ryder", {}, 1);
  assert.notEqual(first.headline, next.headline);
});

test("openings use an available memory or idea without inventing its contents", () => {
  const memory = composePalOpening("samira", { memoryTitle: "Customer promise" });
  assert.equal(memory.contextLabel, "From shared memory");
  assert.match(memory.body, /shared memory includes “Customer promise”/);
  const idea = composePalOpening("silas", { ideaTitle: "  One   good   idea  ", draftCount: 7 });
  assert.match(idea.body, /saved “One good idea”/);
  assert.match(idea.suggestions[1], /7 saved drafts/);
});
