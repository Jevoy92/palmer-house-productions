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
    type Topic = { id: string; subscription: string };
    const event = JSON.parse(body) as {
      type: string;
      created_at: string;
      data: { id?: string; email?: string; to?: string[]; unsubscribed?: boolean; topics?: Topic[]; bounce?: { type?: string } };
    };
    await db.from("newsletter_webhook_events").update({ event_type: event.type }).eq("svix_id", id);
    const at = event.created_at || new Date().toISOString();
    const emails =
      event.type === "email.bounced" || event.type === "email.complained" ? (event.data.to ?? []) : [event.data.email ?? ""];
    for (const raw of emails) {
      const email = n.normalizeEmail(raw);
      if (!email) continue;
      const row = await db.from("newsletter_subscribers").select("*").eq("email", email).maybeSingle();
      const sub = row.data as import("@/lib/newsletter.server").Subscriber | null;
      if (!sub) continue;
      const patch: Record<string, unknown> = { updated_at: new Date().toISOString() };
      // A remote change only beats a local choice made earlier than the event.
      const remoteNewer = at > sub.prefs_changed_at;
      if (event.type === "contact.updated") {
        // Global unsubscribe always wins, whatever the ordering.
        if (event.data.unsubscribed && !sub.unsubscribed_all) {
          await n.recordConsent(db, sub, "all", "unsubscribe_all", "resend");
          Object.assign(patch, { unsubscribed_all: true, resubscribe_requested: false });
        }
        if (event.data.id) patch.resend_contact_id = event.data.id;
      } else if (event.type === "contact.topics.updated") {
        const t = event.data.topics ?? [];
        const pick = (topicId: string) => t.find((x) => x.id === topicId)?.subscription;
        for (const [key, topicId] of [["monthly", n.MONTHLY_TOPIC], ["weekly", n.WEEKLY_TOPIC]] as const) {
          const v = pick(topicId);
          if (!v) continue;
          const on = v === "opt_in";
          // Opt-outs always apply; remote opt-ins apply only if newer than the local choice
          // and never for suppressed or globally unsubscribed contacts.
          if (on === sub[key]) continue;
          if (!on || (remoteNewer && !sub.suppressed && !sub.unsubscribed_all)) {
            await n.recordConsent(db, sub, key, on ? "opt_in" : "opt_out", "resend");
            patch[key] = on;
          }
        }
        patch.remote_changed_at = at;
      } else if (event.type === "contact.deleted") {
        if (sub.monthly) await n.recordConsent(db, sub, "monthly", "opt_out", "resend");
        if (sub.weekly) await n.recordConsent(db, sub, "weekly", "opt_out", "resend");
        Object.assign(patch, { monthly: false, weekly: false, resend_contact_id: null, remote_changed_at: at });
      } else if (event.type === "email.bounced" && event.data.bounce?.type === "Permanent") {
        if (!sub.suppressed) await n.recordConsent(db, sub, "all", "suppressed_bounce", "resend");
        Object.assign(patch, { suppressed: true, suppressed_reason: "hard_bounce", suppressed_at: at, sync_state: "pending" });
      } else if (event.type === "email.complained") {
        if (!sub.suppressed) await n.recordConsent(db, sub, "all", "suppressed_complaint", "resend");
        Object.assign(patch, { suppressed: true, suppressed_reason: "complaint", suppressed_at: at, sync_state: "pending" });
      } else continue;
      await db.from("newsletter_subscribers").update(patch).eq("id", sub.id);
      if (patch.sync_state === "pending") await n.syncSubscriber(db, sub.id);
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
