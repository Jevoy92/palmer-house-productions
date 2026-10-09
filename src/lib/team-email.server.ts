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

/**
 * Server-only: queue a one-time customer email through the existing transactional queue.
 * The idempotency key doubles as the message id, so webhook retries never send twice.
 * Never throws — payment fulfillment must succeed even if email delivery does not.
 * Returns what happened so tests and logs can see it.
 */
export async function queueCustomerEmail(
  templateName: string,
  to: string,
  data: Record<string, unknown>,
  idempotencyKey: string,
): Promise<"queued" | "duplicate" | "suppressed" | "skipped" | "failed"> {
  try {
    const recipient = to.trim().toLowerCase();
    const template = TEMPLATES[templateName];
    if (!template || template.to || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient)) return "skipped";
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const prior = await supabaseAdmin
      .from("email_send_log")
      .select("status")
      .eq("message_id", idempotencyKey)
      .in("status", ["pending", "sent", "suppressed"])
      .limit(1);
    if (prior.error) throw new Error(prior.error.message);
    if (prior.data?.length) return "duplicate";
    const suppressed = await supabaseAdmin
      .from("suppressed_emails")
      .select("email")
      .eq("email", recipient)
      .maybeSingle();
    if (suppressed.data) {
      await supabaseAdmin.from("email_send_log").insert({
        message_id: idempotencyKey,
        template_name: templateName,
        recipient_email: recipient,
        status: "suppressed",
      });
      return "suppressed";
    }
    const element = React.createElement(template.component, data);
    const html = await render(element);
    const text = await render(element, { plainText: true });
    const subject = typeof template.subject === "function" ? template.subject(data) : template.subject;
    const log = await supabaseAdmin.from("email_send_log").insert({
      message_id: idempotencyKey,
      template_name: templateName,
      recipient_email: recipient,
      status: "pending",
    });
    if (log.error) throw new Error(log.error.message);
    const { error } = await supabaseAdmin.rpc("enqueue_email", {
      queue_name: "transactional_emails",
      payload: {
        message_id: idempotencyKey,
        to: recipient,
        from: "Palmer House Productions <noreply@palmerhouseproductions.com>",
        reply_to: "info@palmerhouseproductions.com",
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
    if (error) {
      // Free the key so a later retry of the same event can queue it again.
      await supabaseAdmin
        .from("email_send_log")
        .update({ status: "failed", error_message: error.message })
        .eq("message_id", idempotencyKey)
        .eq("status", "pending");
      throw new Error(error.message);
    }
    return "queued";
  } catch (err) {
    console.error("Customer email not queued", templateName, err instanceof Error ? err.message : err);
    return "failed";
  }
}
