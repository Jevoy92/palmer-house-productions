/**
 * Real Google appointment pages. Google enforces notice, buffers, availability,
 * conflicts and reminders; Zoom links live only in Google's booking description.
 * Opening a link never marks anything as scheduled or completed.
 */
export const VIDEO_PLANNING_BOOKING_URL =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3UqCFDIKMt5ZiLcrqfv1kRk_8QxkEpyMja4FQL1r8XZCbzo6AYnWWGT0DufhagShSghbi86R2Y";
/** Free 15-minute introduction for new inquiries (not for paid clients' planning/onboarding). */
export const QUICK_CHAT_BOOKING_URL =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1I3r54YzhE8Hv0WJ9ANGYv-0nWWNX5YHOslGAeJpMsneJ1dJi_D1xJMuSibt_1SVayBqNQo1AU";
export const STUDIO_ONBOARDING_BOOKING_URL =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2V7tGgzn1YlRpMiWrhzHDZX2aHiF8YwNwWplzuhWpnTZyMM3vE4k3V12S8EKID_VK7y8b88EZU";

/** Weekly availability configured on the Google pages (Pacific time). */
export const VIDEO_PLANNING_HOURS = "Tuesdays and Thursdays, 9 am–5 pm Pacific";
export const STUDIO_ONBOARDING_HOURS = "Mondays and Wednesdays, 9 am–5 pm Pacific (not Wednesdays noon–1 pm)";

export const QUICK_CHAT_HOURS = "Fridays, 9 am–5 pm Pacific";
export const QUICK_CHAT_DETAILS = "Free · 15 minutes · Book at least 24 hours ahead, up to 14 days out";

/** Friendly service expectations — not cancellation, expiry, refund or forfeiture terms. */
export const BOOKING_EXPECTATIONS =
  "Please book within 7 days of your purchase, and aim to meet within 14 days. Appointments require at least 24 hours’ notice. If the times don’t work, contact us and we’ll help.";

const DAY = 86_400_000;
/** Purchase-based target dates; returns null when no verified purchase time exists. */
export function bookingTargets(purchasedAt: string | number | null | undefined) {
  if (purchasedAt == null || purchasedAt === "") return null;
  const start = new Date(typeof purchasedAt === "number" ? purchasedAt : purchasedAt);
  if (Number.isNaN(start.getTime())) return null;
  const fmt = (d: Date) =>
    new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Los_Angeles",
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(d);
  return {
    bookBy: fmt(new Date(start.getTime() + 7 * DAY)),
    meetBy: fmt(new Date(start.getTime() + 14 * DAY)),
  };
}

const PAID_PLANS = new Set(["creator", "business", "partner"]);
/** Active paid membership only. A free signup or trial is not a purchase. */
export function isActivePaidMember(
  sub:
    | { plan?: string | null; status?: string | null; billing_hold?: boolean | null; current_period_end?: string | null }
    | null
    | undefined,
  now = Date.now(),
) {
  if (!sub || !PAID_PLANS.has(String(sub.plan)) || sub.status !== "active" || sub.billing_hold) return false;
  if (sub.current_period_end && new Date(sub.current_period_end).getTime() < now) return false;
  return true;
}
