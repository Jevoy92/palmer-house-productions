/** Server-only billing configuration. Explicit test mode must never use live credentials. */
export function stripeTestMode() {
  return process.env.STRIPE_USE_TEST === "true";
}
export function stripeSecretKey() {
  const testing = stripeTestMode();
  const key = testing ? process.env.STRIPE_TEST_API_KEY : process.env.STRIPE_SECRET_KEY;
  const prefix = testing ? /^(sk|rk)_test_/ : /^(sk|rk)_live_/;
  return key && prefix.test(key) ? key : undefined;
}
export function stripeWebhookSecrets() {
  const secret = stripeTestMode()
    ? process.env.STRIPE_TEST_WEBHOOK_SECRET
    : process.env.STRIPE_WEBHOOK_SECRET;
  return secret ? [secret] : [];
}
export function stripeEventMatchesMode(livemode: boolean) {
  return livemode === !stripeTestMode();
}
