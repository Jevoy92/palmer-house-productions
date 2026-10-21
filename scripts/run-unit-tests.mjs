import { readdirSync } from "node:fs";
import { spawnSync } from "node:child_process";
// The browser lifecycle suite has its own harness; visual journeys are run separately.
const files = readdirSync("scripts")
  .filter((name) => name.endsWith(".test.mjs") && name !== "studio-conversation-lifecycle.test.mjs")
  .map((name) => `scripts/${name}`);
const result = spawnSync(process.execPath, ["--test", ...files], { stdio: "inherit" });
process.exit(result.status ?? 1);
