// Server-only reads (call inside handlers). STRIPE_USE_TEST="true" switches every
// Stripe call to the test key + test prices without touching the live key.
export function stripeTestMode() {
  return process.env.STRIPE_USE_TEST === "true" && Boolean(process.env.STRIPE_TEST_API_KEY);
}
export function stripeSecretKey() {
  return stripeTestMode() ? process.env.STRIPE_TEST_API_KEY : process.env.STRIPE_SECRET_KEY;
}
export function stripeWebhookSecrets() {
  return [process.env.STRIPE_WEBHOOK_SECRET, process.env.STRIPE_TEST_WEBHOOK_SECRET].filter(
    (s): s is string => Boolean(s),
  );
}
