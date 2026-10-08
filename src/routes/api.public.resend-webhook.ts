import { createFileRoute } from "@tanstack/react-router";

// Verifies Resend (Svix) signatures, then mirrors contact preference changes made in Resend
// (unsubscribe links, preference page) back into our consent records.
async function verify(secret: string, id: string, ts: string, body: string, header: string) {
  const age = Math.abs(Date.now() / 1000 - Number(ts));
  if (!Number.isFinite(age) || age > 300) return false;
  const raw = Uint8Array.from(atob(secret.replace(/^whsec_/, "")), (c) => c.charCodeAt(0));
  const key = await crypto.subtle.importKey("raw", raw, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`${id}.${ts}.${body}`)));
  const expected = btoa(String.fromCharCode(...sig));
  return header.split(" ").some((part) => {
    const [, value] = part.split(",");
    if (!value || value.length !== expected.length) return false;
    let diff = 0;
    for (let i = 0; i < value.length; i++) diff |= value.charCodeAt(i) ^ expected.charCodeAt(i);
    return diff === 0;
  });
}

async function handle({ request }: { request: Request }) {
  const secret = process.env["RESEND_WEBHOOK_SECRET"];
  if (!secret) return Response.json({ error: "Not configured" }, { status: 503 });
  const id = request.headers.get("svix-id");
  const ts = request.headers.get("svix-timestamp");
  const sig = request.headers.get("svix-signature");
  const body = await request.text();
  if (!id || !ts || !sig || !(await verify(secret, id, ts, body, sig)))
    return Response.json({ error: "Invalid signature" }, { status: 401 });

  const n = await import("@/lib/newsletter.server");
  const db = n.admin();
  const seen = await db.from("newsletter_webhook_events").insert({ svix_id: id, event_type: "pending" });
  if (seen.error) return Response.json({ received: true, duplicate: true });

  try {
    const event = JSON.parse(body) as { type: string; data: { id: string; email: string; unsubscribed?: boolean } };
    await db.from("newsletter_webhook_events").update({ event_type: event.type }).eq("svix_id", id);
    if (event.type === "contact.updated" || event.type === "contact.deleted") {
      const email = n.normalizeEmail(event.data.email || "");
      const row = await db.from("newsletter_subscribers").select("*").eq("email", email).maybeSingle();
      const sub = row.data as import("@/lib/newsletter.server").Subscriber | null;
      if (sub) {
        let monthly = sub.monthly, weekly = sub.weekly, all = sub.unsubscribed_all;
        if (event.type === "contact.deleted") {
          monthly = false;
          weekly = false;
        } else {
          if (event.data.unsubscribed) all = true; // global unsubscribe always wins
          // Skip topic overwrite while our own change is still on its way to Resend.
          if (sub.sync_state !== "pending") {
            const t = await n.fetchContactTopics(event.data.id);
            monthly = t.monthly;
            weekly = t.weekly;
          }
        }
        if (all && !sub.unsubscribed_all) await n.recordConsent(db, sub, "all", "unsubscribe_all", "resend");
        if (monthly !== sub.monthly) await n.recordConsent(db, sub, "monthly", monthly ? "opt_in" : "opt_out", "resend");
        if (weekly !== sub.weekly) await n.recordConsent(db, sub, "weekly", weekly ? "opt_in" : "opt_out", "resend");
        await db
          .from("newsletter_subscribers")
          .update({
            monthly,
            weekly,
            unsubscribed_all: all,
            resend_contact_id: event.type === "contact.deleted" ? null : event.data.id,
            updated_at: new Date().toISOString(),
          })
          .eq("id", sub.id);
      }
    }
    await n.retryPending(db);
  } catch (e) {
    await db.from("newsletter_webhook_events").delete().eq("svix_id", id); // let Resend retry
    console.error("Resend webhook failed", (e as Error).message);
    return Response.json({ error: "Could not process" }, { status: 500 });
  }
  return Response.json({ received: true });
}

export const Route = createFileRoute("/api/public/resend-webhook")({
  server: { handlers: { POST: handle } },
});
