import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const normalize = (value) =>
  String(value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
const record = (value) => value !== null && typeof value === "object" && !Array.isArray(value);

function appendUnique(current, additions, max, field) {
  if (!Array.isArray(current) || !current.every((item) => typeof item === "string")) {
    throw new Error(
      `Existing ${field} must be a string array; inspect the profile before importing.`,
    );
  }
  const next = [...current];
  const known = new Set(current.map((item) => item.trim().toLowerCase()));
  for (const item of additions) {
    if (!known.has(item.trim().toLowerCase())) {
      next.push(item);
      known.add(item.trim().toLowerCase());
    }
  }
  if (next.length > max)
    throw new Error(
      `${field} would exceed ${max} entries. Review existing entries; nothing was changed.`,
    );
  return next;
}

export function buildVoiceImport(current, fixture, workspaceId) {
  if (
    !UUID.test(workspaceId) ||
    current?.workspace_id !== workspaceId ||
    !UUID.test(current?.id ?? "")
  ) {
    throw new Error(
      "An existing brand row in the explicitly selected workspace is required. This importer never creates one.",
    );
  }
  if (
    fixture.schemaVersion !== 1 ||
    fixture.scope !== "voice-only" ||
    fixture.status !== "editorial-draft"
  ) {
    throw new Error("Use the reviewed version-one voice-only editorial fixture.");
  }
  if (!/^[a-z0-9-]+$/.test(fixture.id) || !Array.isArray(fixture.target?.businessNames)) {
    throw new Error("Invalid voice fixture identity.");
  }
  if (
    !fixture.target.businessNames.some(
      (name) => normalize(name) === normalize(current.business_name),
    )
  ) {
    throw new Error(
      "The selected brand name is not a recognized NatureWorks name. Verify the existing client; do not create or rename a brand.",
    );
  }
  let hostname;
  try {
    const website = /^https?:\/\//i.test(current.website)
      ? current.website
      : `https://${current.website}`;
    hostname = new URL(website).hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    throw new Error(
      "The existing NatureWorks website is missing or invalid. Verify the selected profile first.",
    );
  }
  if (hostname !== fixture.target.websiteHost || hostname !== "gonatureworks.com") {
    throw new Error(
      "The selected brand must already identify gonatureworks.com. Verify the existing client before importing.",
    );
  }
  if (!record(current.brand_details))
    throw new Error("Existing brand_details must be an object; no replacement was attempted.");
  if (
    current.brand_details.aiRules !== undefined &&
    typeof current.brand_details.aiRules !== "string"
  ) {
    throw new Error("Existing AI rules are not text; inspect the profile before importing.");
  }
  const start = `[[VOICE ${fixture.id} START]]`;
  const end = `[[VOICE ${fixture.id} END]]`;
  const block = `${start}\n${fixture.guidance}\n${end}`;
  const existingRules = current.brand_details.aiRules ?? "";
  let aiRules = existingRules;
  if (existingRules.includes(start) || existingRules.includes(end)) {
    if (!existingRules.includes(block))
      throw new Error(
        "This voice section was edited after import. Preserve those edits and reconcile manually.",
      );
  } else {
    if (/\[\[VOICE natureworks-howard-voice-/.test(existingRules)) {
      throw new Error(
        "Another Howard voice version is present. Review it before adding a new version.",
      );
    }
    aiRules = `${existingRules}${existingRules ? "\n\n" : ""}${block}`;
  }
  if (aiRules.length > 16000)
    throw new Error(
      "Combined AI rules exceed the 16,000-character context budget. Reconcile the guidance first.",
    );
  if (
    !Array.isArray(current.content_examples) ||
    !current.content_examples.every((item) => typeof item === "string")
  ) {
    throw new Error("Existing content_examples must be a text array; inspect it before importing.");
  }
  const contentExamples = [...current.content_examples];
  for (const id of fixture.activeExampleIds) {
    const example = fixture.examples.find((item) => item.id === id);
    if (!example || !["hook", "body", "ending"].every((key) => typeof example[key] === "string")) {
      throw new Error(`Missing complete script example: ${id}.`);
    }
    const marker = `[VOICE SAMPLE ${fixture.id}/${id}]`;
    const text = `${marker}\nOriginal editorial draft for style reference; not a quotation, verified proof, or approved offer. ${example.title}\nHook: ${example.hook}\nBody: ${example.body}\nEnding: ${example.ending}\nSource passage IDs: ${example.sourceParagraphs.join(", ")}.`;
    const found = contentExamples.find(
      (item) => typeof item === "string" && item.startsWith(marker),
    );
    if (found && found !== text)
      throw new Error(`Script ${id} was edited after import. Preserve it and reconcile manually.`);
    if (!found) contentExamples.push(text);
  }
  if (!contentExamples.every((item) => typeof item === "string") || contentExamples.length > 32) {
    throw new Error(
      "Content examples must be text and total no more than 32. Review existing examples; none were removed.",
    );
  }
  // Deliberately allowlist four voice fields. No colors, fonts, design, offers, proof,
  // identity, personal story, workspace, billing, or customer data can enter the patch.
  const patch = {
    voice_traits: appendUnique(current.voice_traits, fixture.voiceTraits, 12, "voice_traits"),
    avoid_language: appendUnique(
      current.avoid_language,
      fixture.avoidLanguage,
      20,
      "avoid_language",
    ),
    brand_details: { ...current.brand_details, aiRules },
    content_examples: contentExamples,
  };
  const changedFields = Object.keys(patch).filter(
    (key) => JSON.stringify(current[key]) !== JSON.stringify(patch[key]),
  );
  return { patch, changedFields };
}

export async function runImport({ env, args = [], fetchImpl = fetch, print = console.log }) {
  const apply = args.includes("--apply");
  if (args.some((arg) => arg !== "--apply"))
    throw new Error("Only --apply is supported. Omit it for a read-only preview.");
  const workspaceId = env["STUDIO_WORKSPACE_ID"] ?? "";
  const expectedRevision = env["STUDIO_EXPECTED_UPDATED_AT"];
  const key = env["STUDIO_SUPABASE_PUBLISHABLE_KEY"] ?? "";
  const token = env["STUDIO_USER_ACCESS_TOKEN"] ?? "";
  const base = new URL(env["STUDIO_SUPABASE_URL"] ?? "https://invalid.invalid");
  if (!UUID.test(workspaceId))
    throw new Error("Set STUDIO_WORKSPACE_ID to the existing NatureWorks workspace UUID.");
  if (
    base.protocol !== "https:" ||
    base.username ||
    base.password ||
    base.pathname !== "/" ||
    base.search ||
    base.hash ||
    base.hostname === "invalid.invalid"
  ) {
    throw new Error("Set STUDIO_SUPABASE_URL to the existing project HTTPS origin.");
  }
  if (!key || !token || key.startsWith("sb_secret_"))
    throw new Error(
      "Use a publishable key and a temporary signed-in user access token; no service-role or secret key.",
    );
  for (const credential of [key, token]) {
    try {
      const payload = JSON.parse(
        Buffer.from(credential.split(".")[1] ?? "", "base64url").toString(),
      );
      if (payload.role === "service_role") throw new Error("service_role");
    } catch (error) {
      if (error.message === "service_role")
        throw new Error("Service-role credentials are not permitted for this import.");
    }
  }
  const fixture = JSON.parse(
    await readFile(
      new URL("../docs/clients/natureworks/howard-voice.json", import.meta.url),
      "utf8",
    ),
  );
  const headers = { apikey: key, Authorization: `Bearer ${token}` };
  async function request(path, options = {}) {
    const response = await fetchImpl(new URL(path, base), {
      ...options,
      headers: { ...headers, ...options.headers },
      redirect: "error",
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok)
      throw new Error(
        `Studio request failed (${response.status}). No provider response or credentials were logged.`,
      );
    return response.json();
  }
  const user = await request("/auth/v1/user");
  if (!UUID.test(user?.id ?? "")) throw new Error("A valid signed-in Studio user is required.");
  const membershipQuery = new URLSearchParams({
    select: "role",
    workspace_id: `eq.${workspaceId}`,
    user_id: `eq.${user.id}`,
  });
  const membership = await request(`/rest/v1/workspace_members?${membershipQuery}`);
  if (
    !Array.isArray(membership) ||
    membership.length !== 1 ||
    !["owner", "admin"].includes(membership[0].role)
  ) {
    throw new Error("Only an existing workspace owner or admin may use this import.");
  }
  const brandQuery = new URLSearchParams({ select: "*", workspace_id: `eq.${workspaceId}` });
  const rows = await request(`/rest/v1/brand_profiles?${brandQuery}`);
  if (!Array.isArray(rows) || rows.length !== 1)
    throw new Error("Exactly one existing brand profile is required; no row was created.");
  const current = rows[0];
  const { patch, changedFields } = buildVoiceImport(current, fixture, workspaceId);
  if (!changedFields.length) {
    print("This exact voice version is already present. No write performed.");
    return { status: "unchanged" };
  }
  // Preview never logs the current profile or access token. Its timestamp is the
  // operator's concurrency guard for a later, explicitly requested apply.
  print(
    JSON.stringify(
      {
        mode: apply ? "apply" : "preview",
        voiceVersion: fixture.id,
        expectedUpdatedAt: current.updated_at,
        changedFields,
        newTraits: fixture.voiceTraits,
        newAvoidLanguage: fixture.avoidLanguage,
        activeScriptIds: fixture.activeExampleIds,
        rulesCharacters: patch.brand_details.aiRules.length,
      },
      null,
      2,
    ),
  );
  if (!apply) return { status: "preview", changedFields };
  if (!expectedRevision || expectedRevision !== current.updated_at) {
    throw new Error(
      "Set STUDIO_EXPECTED_UPDATED_AT to the timestamp from the reviewed preview. If it changed, preview again. No write performed.",
    );
  }
  const query = new URLSearchParams({
    id: `eq.${current.id}`,
    workspace_id: `eq.${workspaceId}`,
    updated_at: `eq.${expectedRevision}`,
    select: "id,updated_at",
  });
  const updated = await request(`/rest/v1/brand_profiles?${query}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Prefer: "return=representation" },
    body: JSON.stringify(patch),
  });
  if (!Array.isArray(updated) || updated.length !== 1 || updated[0].id !== current.id) {
    throw new Error(
      "The profile changed or access was denied before the write. Preview again; do not assume the import applied.",
    );
  }
  print(
    "Voice enrichment applied to the existing brand. Review it in Brand Studio; individual scripts remain editorial drafts.",
  );
  return { status: "applied" };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  runImport({ env: process.env, args: process.argv.slice(2) }).catch((error) => {
    console.error(error instanceof Error ? error.message : "Voice import failed.");
    process.exitCode = 1;
  });
}
