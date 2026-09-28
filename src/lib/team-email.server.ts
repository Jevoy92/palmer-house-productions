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
