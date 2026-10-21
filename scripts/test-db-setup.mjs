import postgres from "postgres";
import { readFile } from "node:fs/promises";
if (process.env.PALMER_TEST_DATABASE !== "1")
  throw new Error("Set PALMER_TEST_DATABASE=1 for the disposable local test database only.");
const options = {
  host: "127.0.0.1",
  port: 55432,
  username: "postgres",
  password: process.env.TEST_DATABASE_PASSWORD,
  max: 1,
};
const admin = postgres({ ...options, database: "postgres" });
if (!(await admin`select 1 from pg_database where datname='palmer_audit_test'`).length)
  await admin.unsafe("CREATE DATABASE palmer_audit_test");
for (const role of ["anon", "authenticated", "service_role"]) {
  if (!(await admin`select 1 from pg_roles where rolname=${role}`).length)
    await admin.unsafe(`CREATE ROLE ${role}`);
}
await admin.end();
const db = postgres({ ...options, database: "palmer_audit_test" });
if ((await db`select 1 from information_schema.tables where table_schema='public'`).length) {
  await db.end();
  throw new Error(
    "Test database is not empty. Use a fresh disposable database; this setup never drops existing data.",
  );
}
await db`create table palmer_test_marker (purpose text)`;
await db`insert into palmer_test_marker values ('disposable-audit-tests')`;
for (const file of [
  "scripts/fixtures/queue-test.sql",
  "drizzle/migrations/0003_customer_email_outbox.sql",
  "drizzle/migrations/0005_customer_email_retry_wake.sql",
  "supabase/migrations/20260930135525_a11ef627-f0a8-465a-b0ed-ec82ff78689d.sql",
  "supabase/migrations/20261020000100_atomic_demo_budget.sql",
]) {
  await db.unsafe(await readFile(new URL(`../${file}`, import.meta.url), "utf8"));
}
await db.end();
console.log("Disposable database ready. No live services or email transport configured.");
