/**
 * Internal queue marker that keeps the email processor awake while customer emails await retry.
 * It carries no recipient or content and must never reach the provider, templates or send log.
 */
export const RETRY_WAKE_MARKER = "customer_email_retry_wake";

export function isRetryWakeMarker(queue: string, payload: unknown): boolean {
  return (
    queue === "transactional_emails" &&
    !!payload &&
    typeof payload === "object" &&
    (payload as Record<string, unknown>).internal === RETRY_WAKE_MARKER
  );
}
