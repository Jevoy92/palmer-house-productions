import test, { before, after, beforeEach } from "node:test";
import assert from "node:assert/strict";
import postgres from "postgres";
if (process.env.PALMER_TEST_DATABASE !== "1")
  throw new Error("Disposable database opt-in required.");
const db = postgres({
  host: "127.0.0.1",
  port: 55432,
  username: "postgres",
  password: process.env.TEST_DATABASE_PASSWORD,
  database: "palmer_audit_test",
  max: 20,
});
before(async () =>
  assert.equal(
    (await db`select purpose from palmer_test_marker`)[0].purpose,
    "disposable-audit-tests",
  ),
);
beforeEach(async () => {
  await db`delete from expo_demo_usage`;
});
after(async () => {
  await db.end();
});
const reserve = ({
  session = crypto.randomUUID(),
  network = "a".repeat(64),
  kind = "chat",
  sessionCap = 40,
  dayCap = 600,
  networkCap = 100,
  budget = 1000,
  cost = 5,
} = {}) =>
  db`select reserve_expo_demo(${session},${network},${kind},${sessionCap},${dayCap},${networkCap},${budget},${cost})`;
test("20 concurrent requests obey one remaining global operation", async () => {
  const results = await Promise.allSettled(
    Array.from({ length: 20 }, () => reserve({ dayCap: 1 })),
  );
  assert.equal(results.filter((r) => r.status === "fulfilled").length, 1);
  assert.equal(Number((await db`select count(*) n from expo_demo_usage`)[0].n), 1);
});
test("different sessions cannot overspend the weighted budget", async () => {
  const results = await Promise.allSettled(
    Array.from({ length: 20 }, (_, i) =>
      reserve({ kind: i % 2 ? "campaign" : "image", cost: i % 2 ? 25 : 50, budget: 100 }),
    ),
  );
  const [sum] = await db`select sum(reserved_cents) n from expo_demo_usage`;
  assert.ok(Number(sum.n) <= 100);
  assert.ok(results.some((r) => r.status === "rejected"));
});
test("session reset cannot bypass the network allowance", async () => {
  const results = await Promise.allSettled(
    Array.from({ length: 12 }, () => reserve({ networkCap: 2 })),
  );
  assert.equal(results.filter((r) => r.status === "fulfilled").length, 2);
});
test("per-kind session allowance and rolling-day expiry", async () => {
  const session = crypto.randomUUID();
  await reserve({ session, sessionCap: 1 });
  await assert.rejects(reserve({ session, sessionCap: 1 }), /allowance/);
  await db`update expo_demo_usage set created_at=now()-interval '25 hours'`;
  await reserve({ session, sessionCap: 1 });
});
test("invalid limits and browser roles cannot reserve", async () => {
  for (const args of [{ budget: 0 }, { cost: -1 }, { sessionCap: 0 }, { kind: "unknown" }])
    await assert.rejects(reserve(args));
  const [r] =
    await db`select has_function_privilege('anon','reserve_expo_demo(text,text,text,integer,integer,integer,integer,integer)','execute') a, has_function_privilege('authenticated','reserve_expo_demo(text,text,text,integer,integer,integer,integer,integer)','execute') u, has_function_privilege('service_role','reserve_expo_demo(text,text,text,integer,integer,integer,integer,integer)','execute') s`;
  assert.deepEqual([r.a, r.u, r.s], [false, false, true]);
});
