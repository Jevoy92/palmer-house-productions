import { supabase } from "@/integrations/supabase/client";

export async function createCheckoutSession({
  type,
  priceId,
  planId,
  userId,
}: {
  type: 'subscription' | 'credits' | 'addon';
  priceId: string;
  planId?: string;
  userId: string;
}) {
  const baseUrl = window.location.origin;
  const successUrl = `${baseUrl}/dashboard?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${baseUrl}/pricing`;

  const { data, error } = await supabase.functions.invoke('create-checkout', {
    body: {
      type,
      priceId,
      planId,
      userId,
      successUrl,
      cancelUrl,
    },
  });

  if (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }

  if (data?.url) {
    window.location.href = data.url;
  }

  return data;
}
