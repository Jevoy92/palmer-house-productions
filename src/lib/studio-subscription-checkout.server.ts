import Stripe from "stripe";
import { studioBillingAdmin } from "./studio-credit-runtime.server";
import { studioPlanPrices, type StudioPlanKey } from "./studio-model";

/** Recoverable one-pending-checkout-per-workspace lease. Never create a second
 * subscription just because a browser returned before its webhook arrived. */
export async function openStudioMembershipCheckout(input: {
  workspaceId: string;
  email?: string;
  plan: StudioPlanKey;
  interval: "month" | "year";
  origin: string;
}) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    maxNetworkRetries: 0,
    timeout: 30000,
  });
  const admin = studioBillingAdmin();
  const subscription = await admin
    .from("workspace_subscriptions")
    .select("stripe_customer_id,billing_hold")
    .eq("workspace_id", input.workspaceId)
    .single();
  if (subscription.error) throw new Error("Could not check your membership.");
  if (subscription.data?.billing_hold)
    throw new Error(
      "A previous billing issue needs review before starting another membership. Contact Palmer House.",
    );
  const debt = await admin
    .from("studio_credit_debts")
    .select("credits")
    .eq("workspace_id", input.workspaceId)
    .maybeSingle();
  if (debt.error) throw new Error("Could not verify your billing balance. No checkout was opened.");
  if (debt.data?.credits)
    throw new Error(
      "A billing adjustment needs to be resolved before starting another membership. Contact Palmer House.",
    );
  let customerId = subscription.data?.stripe_customer_id;
  if (!customerId) {
    const customer = await stripe.customers.create(
      { metadata: { workspace_id: input.workspaceId } },
      { idempotencyKey: `studio-customer:${input.workspaceId}` },
    );
    customerId = customer.id;
    const saved = await admin
      .from("workspace_subscriptions")
      .update({ stripe_customer_id: customerId })
      .eq("workspace_id", input.workspaceId);
    if (saved.error) throw new Error("Could not save your billing account. Please retry.");
  }
  // Check Stripe too: webhook processing may still be catching up.
  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    status: "all",
    limit: 100,
  });
  if (
    subscriptions.has_more ||
    subscriptions.data.some((row) => !["canceled", "incomplete_expired"].includes(row.status))
  )
    throw new Error(
      "A membership already exists or its payment is pending. Use Manage membership before starting another.",
    );
  for (let attempt = 0; attempt < 2; attempt++) {
    const claimed = await admin.rpc("claim_studio_membership_checkout", {
      target_workspace_id: input.workspaceId,
      plan_key: input.plan,
      interval_key: input.interval,
    });
    if (claimed.error || !claimed.data)
      throw new Error(claimed.error?.message || "Could not open checkout.");
    const row = claimed.data;
    const finish = async (sessionId: string | null, clear = false) => {
      const result = await admin.rpc("finish_studio_membership_checkout", {
        target_workspace_id: input.workspaceId,
        request_token: row.lease_token,
        stripe_session_id: sessionId,
        clear_attempt: clear,
      });
      if (result.error) throw new Error("Your checkout is being saved. Please retry in a moment.");
    };
    let session: Stripe.Checkout.Session | undefined;
    try {
      const plan = row.plan as StudioPlanKey,
        interval = row.interval_name as "month" | "year";
      session = row.session_id
        ? await stripe.checkout.sessions.retrieve(row.session_id)
        : await stripe.checkout.sessions.create(
            {
              mode: "subscription",
              customer: customerId,
              client_reference_id: input.workspaceId,
              line_items: [{ quantity: 1, price: studioPlanPrices[plan][interval] }],
              allow_promotion_codes: true,
              success_url: `${input.origin}/studio/billing?checkout=success`,
              cancel_url: `${input.origin}/studio/billing?checkout=canceled`,
              subscription_data: { metadata: { workspace_id: input.workspaceId, plan, interval } },
              metadata: { workspace_id: input.workspaceId, plan, interval },
            },
            { idempotencyKey: `studio-membership:${row.attempt_id}` },
          );
      if (session.status === "complete") {
        const priorId =
          typeof session.subscription === "string"
            ? session.subscription
            : session.subscription?.id;
        const prior = priorId ? await stripe.subscriptions.retrieve(priorId) : null;
        if (prior && ["canceled", "incomplete_expired"].includes(prior.status)) {
          await finish(session.id, true);
          continue;
        }
        await finish(session.id);
        throw new Error(
          "Your checkout has completed and billing is updating. Refresh Usage & billing shortly.",
        );
      }
      if (plan !== input.plan || interval !== input.interval || session.status === "expired") {
        if (session.status === "open") await stripe.checkout.sessions.expire(session.id);
        await finish(session.id, true);
        continue;
      }
      await finish(session.id);
      if (!session.url) throw new Error("Stripe did not return a checkout URL.");
      return { ok: true as const, url: session.url };
    } catch (error) {
      // A timed-out creation can be recovered using the SAME persisted attempt key.
      await admin.rpc("finish_studio_membership_checkout", {
        target_workspace_id: input.workspaceId,
        request_token: row.lease_token,
        stripe_session_id: session?.id || null,
        clear_attempt: false,
      });
      throw error;
    }
  }
  throw new Error("The selected plan changed while checkout was opening. Please retry.");
}
