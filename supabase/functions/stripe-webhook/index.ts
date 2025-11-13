import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
});

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

serve(async (req) => {
  const signature = req.headers.get('stripe-signature');
  const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');

  if (!signature || !webhookSecret) {
    return new Response('Missing signature or webhook secret', { status: 400 });
  }

  try {
    const body = await req.text();
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    console.log('Webhook event received:', event.type);

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.user_id;
        const type = session.metadata?.type;

        console.log('Checkout completed:', { userId, type, sessionId: session.id });

        if (type === 'subscription') {
          const planId = session.metadata?.plan_id;
          const subscriptionId = session.subscription as string;

          // Update user subscription
          const { error: subError } = await supabase
            .from('user_subscriptions')
            .update({
              status: 'active',
              stripe_subscription_id: subscriptionId,
              current_period_start: new Date().toISOString(),
              current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            })
            .eq('user_id', userId);

          if (subError) {
            console.error('Error updating subscription:', subError);
          }

          // Get plan details and add credits
          const { data: plan } = await supabase
            .from('subscription_plans')
            .select('monthly_credits')
            .eq('id', planId)
            .single();

          if (plan) {
            await supabase.rpc('add_credits', {
              p_user_id: userId,
              p_amount: plan.monthly_credits,
              p_transaction_type: 'purchase',
              p_metadata: { subscription_id: subscriptionId },
            });
          }
        } else if (type === 'credits') {
          // Handle one-time credit purchase
          const amount = Math.floor((session.amount_total || 0) / 10); // $0.10 per credit
          
          await supabase.rpc('add_credits', {
            p_user_id: userId,
            p_amount: amount,
            p_transaction_type: 'purchase',
            p_metadata: { session_id: session.id },
          });
        } else if (type === 'addon') {
          const addonId = session.metadata?.addon_id;
          
          // Add addon to user
          const { error: addonError } = await supabase
            .from('user_addons')
            .insert({
              user_id: userId,
              addon_type: addonId,
              purchased_at: new Date().toISOString(),
              expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            });

          if (addonError) {
            console.error('Error adding addon:', addonError);
          }
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const userId = subscription.metadata?.user_id;

        console.log('Subscription updated:', { userId, subscriptionId: subscription.id });

        const { error } = await supabase
          .from('user_subscriptions')
          .update({
            status: subscription.status,
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            cancel_at_period_end: subscription.cancel_at_period_end,
          })
          .eq('stripe_subscription_id', subscription.id);

        if (error) {
          console.error('Error updating subscription:', error);
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;

        console.log('Subscription deleted:', { subscriptionId: subscription.id });

        // Get free plan
        const { data: freePlan } = await supabase
          .from('subscription_plans')
          .select('id')
          .eq('tier', 'free')
          .single();

        if (freePlan) {
          const { error } = await supabase
            .from('user_subscriptions')
            .update({
              plan_id: freePlan.id,
              status: 'canceled',
              stripe_subscription_id: null,
            })
            .eq('stripe_subscription_id', subscription.id);

          if (error) {
            console.error('Error canceling subscription:', error);
          }
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        const subscriptionId = invoice.subscription as string;

        console.log('Payment failed:', { subscriptionId });

        const { error } = await supabase
          .from('user_subscriptions')
          .update({ status: 'past_due' })
          .eq('stripe_subscription_id', subscriptionId);

        if (error) {
          console.error('Error updating subscription status:', error);
        }
        break;
      }

      default:
        console.log('Unhandled event type:', event.type);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
});
