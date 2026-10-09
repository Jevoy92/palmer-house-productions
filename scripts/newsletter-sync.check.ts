// Preference-sync checks against the real database with Resend mocked.
// Run: bun scripts/newsletter-sync.check.ts
import * as n from "../src/lib/newsletter.server";

process.env.RESEND_API_KEY = "re_test_mock";
process.env.RESEND_WEBHOOK_SECRET = "whsec_" + btoa("test-secret-for-newsletter-checks");
const EMAIL = `nl-check-${Date.now()}@example.com`;
type Call = { method: string; path: string; body: any };
let calls: Call[] = [];
let remote: { exists: boolean; unsubscribed: boolean; topics: Record<string, string> } = { exists: false, unsubscribed: false, topics: {} };
const realFetch = globalThis.fetch;
globalThis.fetch = (async (input: any, init: any = {}) => {
  const url = String(input instanceof Request ? input.url : input);
  if (!url.startsWith("https://api.resend.com")) return realFetch(input, init);
  const path = url.replace("https://api.resend.com", "");
  const method = init.method || "GET";
  const body = init.body ? JSON.parse(init.body) : null;
  calls.push({ method, path, body });
  const json = (v: unknown, s = 200) => new Response(JSON.stringify(v), { status: s });
  if (method === "GET" && /\/topics$/.test(path)) return json({ data: Object.entries(remote.topics).map(([id, subscription]) => ({ id, subscription })) });
  if (method === "GET") return remote.exists ? json({ id: "c_1", unsubscribed: remote.unsubscribed }) : json({ message: "nf" }, 404);
  if (method === "POST" && path === "/contacts") { remote.exists = true; return json({ id: "c_1" }); }
  return json({});
}) as typeof fetch;

let failures = 0;
const check = (name: string, ok: boolean) => { console.log(`${ok ? "PASS" : "FAIL"}  ${name}`); if (!ok) failures++; };
const db = n.admin();
const row = async () => (await db.from("newsletter_subscribers").select("*").eq("email", EMAIL).single()).data as any;
const sentUnsubFalse = () => calls.some((c) => c.method === "PATCH" && c.body?.unsubscribed === false);

const ins = await db.from("newsletter_subscribers").insert({ email: EMAIL, monthly: true }).select("id").single();
const id = ins.data!.id as string;
try {
  // 1. New monthly subscriber creates the contact opted in to monthly only.
  calls = [];
  await n.syncSubscriber(db, id);
  const create = calls.find((c) => c.method === "POST" && c.path === "/contacts");
  check("creates contact with monthly opt_in, weekly opt_out", !!create && create.body.topics.find((t: any) => t.id === n.MONTHLY_TOPIC).subscription === "opt_in" && create.body.topics.find((t: any) => t.id === n.WEEKLY_TOPIC).subscription === "opt_out");
  check("sync marked synced", (await row()).sync_state === "synced");
  remote.topics = { [n.MONTHLY_TOPIC]: "opt_in", [n.WEEKLY_TOPIC]: "opt_out" };

  // 2. Remote opt-out of monthly, then a routine (non-preference) refresh: remote wins.
  remote.topics[n.MONTHLY_TOPIC] = "opt_out";
  calls = [];
  await n.markPending(db, id, {}, false);
  await n.syncSubscriber(db, id);
  check("routine refresh adopts remote monthly opt-out", (await row()).monthly === false);
  check("routine refresh does not PATCH topics", !calls.some((c) => c.method === "PATCH" && c.path.endsWith("/topics")));

  // 3. Remote global unsubscribe + routine retry never sends unsubscribed:false.
  remote.unsubscribed = true;
  calls = [];
  await n.markPending(db, id, {}, false);
  await n.syncSubscriber(db, id);
  check("remote global unsubscribe adopted locally", (await row()).unsubscribed_all === true);
  check("no unsubscribed:false during routine retry", !sentUnsubFalse());

  // 4. Member opts in to monthly while globally unsubscribed but without explicit re-opt-in flag: still blocked.
  calls = [];
  await n.markPending(db, id, { monthly: true });
  await n.syncSubscriber(db, id);
  check("no unsubscribed:false without explicit re-opt-in", !sentUnsubFalse());

  // 5. Explicit signed-in re-opt-in sends unsubscribed:false exactly once, then clears the flag.
  calls = [];
  await n.markPending(db, id, { monthly: true, unsubscribed_all: false, resubscribe_requested: true });
  await n.syncSubscriber(db, id);
  check("explicit re-opt-in sends unsubscribed:false", sentUnsubFalse());
  check("re-opt-in flag cleared", (await row()).resubscribe_requested === false);
  remote.unsubscribed = false;
  remote.topics[n.MONTHLY_TOPIC] = "opt_in";

  // 6. Weekly opt-out never touches monthly.
  calls = [];
  await n.markPending(db, id, { weekly: false });
  await n.syncSubscriber(db, id);
  const tp = calls.find((c) => c.method === "PATCH" && c.path.endsWith("/topics"));
  check("weekly opt-out keeps monthly opt_in", tp?.body.topics.find((t: any) => t.id === n.MONTHLY_TOPIC).subscription === "opt_in");

  // 7. Webhooks: signature, stale opt-in ignored, opt-out applied, bounce suppresses.
  const { Route } = await import("../src/routes/api.public.resend-webhook");
  const POST = (Route.options as any).server.handlers.POST as (a: { request: Request }) => Promise<Response>;
  const sign = async (body: string, msgId: string) => {
    const ts = String(Math.floor(Date.now() / 1000));
    const raw = Uint8Array.from(atob(process.env.RESEND_WEBHOOK_SECRET!.slice(6)), (c) => c.charCodeAt(0));
    const key = await crypto.subtle.importKey("raw", raw, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
    const sig = btoa(String.fromCharCode(...new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`${msgId}.${ts}.${body}`)))));
    return new Request("http://x/api/public/resend-webhook", { method: "POST", body, headers: { "svix-id": msgId, "svix-timestamp": ts, "svix-signature": `v1,${sig}` } });
  };
  const bad = await POST({ request: new Request("http://x", { method: "POST", body: "{}", headers: { "svix-id": "m0", "svix-timestamp": String(Math.floor(Date.now() / 1000)), "svix-signature": "v1,AAAA" } }) });
  check("rejects bad signature (401)", bad.status === 401);

  await n.markPending(db, id, { monthly: false }); // local opt-out now
  const stale = JSON.stringify({ type: "contact.topics.updated", created_at: new Date(Date.now() - 3600_000).toISOString(), data: { email: EMAIL, topics: [{ id: n.MONTHLY_TOPIC, subscription: "opt_in" }] } });
  await POST({ request: await sign(stale, `m1-${id}`) });
  check("stale remote opt-in does not re-enable a newer local opt-out", (await row()).monthly === false);

  await n.markPending(db, id, { monthly: true });
  const optOut = JSON.stringify({ type: "contact.topics.updated", created_at: new Date(Date.now() - 3600_000).toISOString(), data: { email: EMAIL, topics: [{ id: n.MONTHLY_TOPIC, subscription: "opt_out" }, { id: n.WEEKLY_TOPIC, subscription: "opt_out" }] } });
  await POST({ request: await sign(optOut, `m2-${id}`) });
  check("remote opt-out always applies", (await row()).monthly === false);
  const dup = await POST({ request: await sign(optOut, `m2-${id}`) });
  check("duplicate webhook ignored", (await dup.json()).duplicate === true);

  calls = [];
  const bounce = JSON.stringify({ type: "email.bounced", created_at: new Date().toISOString(), data: { to: [EMAIL], bounce: { type: "Permanent" } } });
  await POST({ request: await sign(bounce, `m3-${id}`) });
  const r = await row();
  check("hard bounce suppresses", r.suppressed === true);
  check("suppression pushed as unsubscribed:true, never false", !sentUnsubFalse());
  const ev = await db.from("newsletter_consent_events").select("action,source").eq("subscriber_id", id);
  check("consent events recorded", (ev.data ?? []).some((e: any) => e.action === "suppressed_bounce"));
} finally {
  await db.from("newsletter_webhook_events").delete().like("svix_id", `%${id}`);
  await db.from("newsletter_subscribers").delete().eq("id", id);
}
console.log(failures ? `\n${failures} failed` : "\nall passed");
process.exit(failures ? 1 : 0);
