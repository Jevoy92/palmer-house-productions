// Runs the retry-wake routines against a throwaway local Postgres with real pgmq SQL and the
// live dispatcher/wake definitions (cron/net/vault are local stand-ins). Never sends email.
import { test, expect, beforeEach } from "bun:test";
import { SQL } from "bun";
import { isRetryWakeMarker } from "../src/lib/email-retry-wake.ts";

const db = new SQL({ hostname: "127.0.0.1", port: 55432, username: "postgres", database: "postgres", max: 12, tls: false });
const markers = async () =>
  (await db`select msg_id, vt, message from pgmq.q_transactional_emails where message->>'internal'='customer_email_retry_wake'`) as any[];
const claim = (k: string) => db`select public.claim_customer_email(${k}, 'studio-welcome', 'a@b.co', '{}'::jsonb) as v`;
const settle = async (id: number | bigint) => (await db`select public.settle_customer_email_retry_wake(${id}) as r`)[0].r;
const armed = async () => (await db`select count(*)::int n from cron.job where jobname='process-email-queue'`)[0].n === 1;

beforeEach(async () => {
  await db`delete from public.customer_email_outbox`;
  await db`delete from pgmq.q_transactional_emails`;
  await db`delete from cron.job`;
});

test("concurrent claims create one content-free marker and arm the dispatcher", async () => {
  await Promise.all(Array.from({ length: 10 }, (_, i) => claim("k" + i)));
  const m = await markers();
  expect(m.length).toBe(1);
  expect(Object.keys(m[0].message).sort()).toEqual(["internal", "v"]);
  expect(await armed()).toBe(true);
  expect(isRetryWakeMarker("transactional_emails", m[0].message)).toBe(true);
  expect(isRetryWakeMarker("auth_emails", m[0].message)).toBe(false);
});

test("marker stays (hidden with backoff) while work remains, then is removed and dispatcher disarms", async () => {
  await claim("k1");
  const [m] = await markers();
  expect(await settle(m.msg_id)).toBe("kept"); // fresh claim = possible crash, keep watching
  const [after] = await markers();
  expect(new Date(after.vt).getTime()).toBeGreaterThan(Date.now() + 4000);
  expect(((await db`select * from pgmq.read('transactional_emails', 30, 10)`) as any[]).length).toBe(0);
  await db`select public.email_queue_dispatch()`;
  expect(await armed()).toBe(true); // marker keeps the existing dispatcher armed
  await db`select public.finish_customer_email('k1', 'queued', null)`;
  expect(await settle(m.msg_id)).toBe("removed");
  expect((await markers()).length).toBe(0);
  await db`select public.email_queue_dispatch()`;
  expect(await armed()).toBe(false);
});

test("failed enqueue keeps one marker; backoff bounds the hide time; abandoned rows release it", async () => {
  await claim("k2");
  await db`select public.finish_customer_email('k2', 'failed', 'down')`;
  const m = await markers();
  expect(m.length).toBe(1); // re-arm on failure did not duplicate
  expect(await settle(m[0].msg_id)).toBe("kept");
  const hide = (new Date((await markers())[0].vt).getTime() - Date.now()) / 1000;
  expect(hide).toBeGreaterThan(60); // next attempt ~2 min away
  expect(hide).toBeLessThanOrEqual(301);
  await db`update public.customer_email_outbox set status='abandoned' where idempotency_key='k2'`;
  expect(await settle(m[0].msg_id)).toBe("removed");
});

test("crashed stale claim keeps the marker and is re-claimable; marker re-arms if lost", async () => {
  await claim("k3");
  await db`delete from pgmq.q_transactional_emails`; // simulate a lost marker
  await db`update public.customer_email_outbox set updated_at = now() - interval '11 minutes' where idempotency_key='k3'`;
  const [r] = await claim("k3");
  expect((typeof r.v === "string" ? JSON.parse(r.v) : r.v).claimed).toBe(true);
  expect((await markers()).length).toBe(1);
});

test("settle refuses ordinary email messages", async () => {
  const [{ id }] = await db`select pgmq.send('transactional_emails', '{"to":"x@y.co","message_id":"m1"}'::jsonb) as id`;
  expect(await settle(id)).toBe("not_marker");
  expect(((await db`select 1 from pgmq.q_transactional_emails where msg_id=${id}`) as any[]).length).toBe(1);
});

test("only the server role can run the routines", async () => {
  const rows = (await db`select p.proname, has_function_privilege('anon', p.oid, 'execute') a, has_function_privilege('authenticated', p.oid, 'execute') u, has_function_privilege('service_role', p.oid, 'execute') s
    from pg_proc p where p.proname in ('arm_customer_email_retry_wake','settle_customer_email_retry_wake','claim_customer_email','finish_customer_email')`) as any[];
  expect(rows.length).toBe(4);
  for (const r of rows) expect([r.a, r.u, r.s]).toEqual([false, false, true]);
});
