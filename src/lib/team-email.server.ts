import * as React from "react";
import { render } from "@react-email/render";
import { TEMPLATES } from "@/lib/email-templates/registry";

/** Server-only: queue a fixed-recipient team notification (no user session needed). */
export async function queueTeamEmail(
  templateName: string,
  data: Record<string, unknown>,
  idempotencyKey: string,
) {
  const template = TEMPLATES[templateName];
  if (!template?.to) throw new Error("Team template needs a fixed recipient");
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const element = React.createElement(template.component, data);
  const html = await render(element);
  const text = await render(element, { plainText: true });
  const subject = typeof template.subject === "function" ? template.subject(data) : template.subject;
  const messageId = crypto.randomUUID();
  await supabaseAdmin.from("email_send_log").insert({
    message_id: messageId,
    template_name: templateName,
    recipient_email: template.to,
    status: "pending",
  });
  const { error } = await supabaseAdmin.rpc("enqueue_email", {
    queue_name: "transactional_emails",
    payload: {
      message_id: messageId,
      to: template.to,
      from: "Palmer House Productions <noreply@palmerhouseproductions.com>",
      sender_domain: "notify.palmerhouseproductions.com",
      subject,
      html,
      text,
      purpose: "transactional",
      label: templateName,
      idempotency_key: idempotencyKey,
      queued_at: new Date().toISOString(),
    },
  });
  if (error) console.error("Team email enqueue failed", error.message);
}

type CustomerEmailResult = "queued" | "duplicate" | "suppressed" | "skipped" | "failed";

/**
 * Server-only: queue a one-time customer email through the existing transactional queue.
 * Durable idempotency lives in customer_email_outbox: one atomic claim per key, so concurrent
 * or retried webhooks never double-queue. Failed enqueues stay "failed" with a backoff and are
 * re-claimed by retryCustomerEmails() (run from the queue processor cron), reusing the first data.
 * The deterministic message_id also lets the queue processor drop a duplicate after "sent".
 * Suppression honors only the transactional list (bounces, complaints, app-email unsubscribes);
 * newsletter preferences are separate and never block receipts or booking emails.
 * Never throws — payment fulfillment must succeed even if email delivery does not.
 */
export async function queueCustomerEmail(
  templateName: string,
  to: string,
  data: Record<string, unknown>,
  idempotencyKey: string,
): Promise<CustomerEmailResult> {
  try {
    const recipient = to.trim().toLowerCase();
    const template = TEMPLATES[templateName];
    if (!template || template.to || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient)) return "skipped";
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const claim = await supabaseAdmin.rpc("claim_customer_email", {
      p_key: idempotencyKey,
      p_template: templateName,
      p_recipient: recipient,
      p_data: data as never,
    });
    if (claim.error) throw new Error(claim.error.message);
    const c = claim.data as { claimed: boolean; data?: Record<string, unknown>; recipient?: string; template?: string };
    if (!c?.claimed) return "duplicate";
    return await enqueueClaimed(supabaseAdmin, idempotencyKey, c.template ?? templateName, c.recipient ?? recipient, c.data ?? data);
  } catch (err) {
    console.error("Customer email not queued", templateName, err instanceof Error ? err.message : err);
    return "failed";
  }
}

type Admin = (typeof import("@/integrations/supabase/client.server"))["supabaseAdmin"];

async function enqueueClaimed(
  db: Admin,
  key: string,
  templateName: string,
  recipient: string,
  data: Record<string, unknown>,
): Promise<CustomerEmailResult> {
  const finish = (status: "queued" | "failed" | "suppressed", error: string | null) =>
    db.rpc("finish_customer_email", { p_key: key, p_status: status, p_error: error as never });
  try {
    const template = TEMPLATES[templateName];
    if (!template) throw new Error("Unknown template");
    const suppressed = await db.from("suppressed_emails").select("email").eq("email", recipient).maybeSingle();
    if (suppressed.error) throw new Error(suppressed.error.message);
    if (suppressed.data) {
      await db.from("email_send_log").insert({ message_id: key, template_name: templateName, recipient_email: recipient, status: "suppressed" });
      await finish("suppressed", null);
      return "suppressed";
    }
    const unsubscribeToken = await unsubscribeTokenFor(db, recipient);
    const element = React.createElement(template.component, data);
    const html = await render(element);
    const text = await render(element, { plainText: true });
    const subject = typeof template.subject === "function" ? template.subject(data) : template.subject;
    const { error } = await db.rpc("enqueue_email", {
      queue_name: "transactional_emails",
      payload: {
        message_id: key,
        to: recipient,
        from: "Palmer House Productions <noreply@palmerhouseproductions.com>",
        reply_to: "info@palmerhouseproductions.com",
        sender_domain: "notify.palmerhouseproductions.com",
        subject,
        html,
        text,
        purpose: "transactional",
        label: templateName,
        idempotency_key: key,
        unsubscribe_token: unsubscribeToken,
        queued_at: new Date().toISOString(),
      },
    });
    if (error) throw new Error(error.message);
    await db.from("email_send_log").insert({ message_id: key, template_name: templateName, recipient_email: recipient, status: "pending" });
    await finish("queued", null);
    return "queued";
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    await db.from("email_send_log").insert({ message_id: key, template_name: templateName, recipient_email: recipient, status: "failed", error_message: message });
    await finish("failed", message);
    console.error("Customer email enqueue failed; will retry", templateName, message);
    return "failed";
  }
}

async function unsubscribeTokenFor(db: Admin, email: string): Promise<string> {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  const fresh = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
  const up = await db.from("email_unsubscribe_tokens").upsert({ token: fresh, email }, { onConflict: "email", ignoreDuplicates: true });
  if (up.error) throw new Error(up.error.message);
  const row = await db.from("email_unsubscribe_tokens").select("token").eq("email", email).maybeSingle();
  if (row.error || !row.data) throw new Error("Unsubscribe token unavailable");
  return row.data.token;
}

/** Re-attempts failed (or crashed) customer emails whose backoff has elapsed. Never throws. */
export async function retryCustomerEmails(limit = 5): Promise<number> {
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const due = await supabaseAdmin
      .from("customer_email_outbox")
      .select("idempotency_key,template_name,recipient_email,template_data,status,updated_at,next_attempt_at")
      .in("status", ["failed", "claimed"])
      .order("updated_at", { ascending: true })
      .limit(limit * 4);
    if (due.error || !due.data) return 0;
    const now = Date.now();
    const ready = due.data
      .filter((r) =>
        r.status === "failed"
          ? !r.next_attempt_at || new Date(r.next_attempt_at).getTime() <= now
          : new Date(r.updated_at).getTime() < now - 10 * 60_000,
      )
      .slice(0, limit);
    let n = 0;
    for (const r of ready) {
      const res = await queueCustomerEmail(r.template_name, r.recipient_email, r.template_data as Record<string, unknown>, r.idempotency_key);
      if (res === "queued") n++;
    }
    return n;
  } catch {
    return 0;
  }
}
