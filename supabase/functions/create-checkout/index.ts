import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    });

    const { type, priceId, planId, userId, successUrl, cancelUrl } = await req.json();

    console.log('Creating checkout session:', { type, priceId, planId, userId });

    // Create checkout session based on type
    let sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: type === 'subscription' ? 'subscription' : 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      client_reference_id: userId,
      metadata: {
        user_id: userId,
        plan_id: planId || '',
        type: type,
      },
    };

    if (type === 'subscription') {
      sessionParams.line_items = [
        {
          price: priceId,
          quantity: 1,
        },
      ];
      sessionParams.subscription_data = {
        metadata: {
          user_id: userId,
          plan_id: planId,
        },
      };
    } else if (type === 'credits') {
      sessionParams.line_items = [
        {
          price: priceId,
          quantity: 1,
        },
      ];
      sessionParams.payment_intent_data = {
        metadata: {
          user_id: userId,
          type: 'credits',
        },
      };
    } else if (type === 'addon') {
      sessionParams.line_items = [
        {
          price: priceId,
          quantity: 1,
        },
      ];
      sessionParams.payment_intent_data = {
        metadata: {
          user_id: userId,
          addon_id: planId,
          type: 'addon',
        },
      };
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    console.log('Checkout session created:', session.id);

    return new Response(
      JSON.stringify({ url: session.url, sessionId: session.id }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
