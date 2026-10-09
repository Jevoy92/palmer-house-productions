import {
  bookingTargets,
  STUDIO_ONBOARDING_BOOKING_URL,
  VIDEO_PLANNING_BOOKING_URL,
} from "./booking-links";
import { HONEYBOOK_LEAD_FORM_URL } from "./honeybook";

export function intakeUrlFor(reference: string) {
  return `${HONEYBOOK_LEAD_FORM_URL}${HONEYBOOK_LEAD_FORM_URL.includes("?") ? "&" : "?"}quote_ref=${encodeURIComponent(reference)}`;
}

export function clientBookingEmailData(input: {
  reference: string;
  customerName?: string;
  covered?: boolean;
  depositPaid?: string;
  purchasedAt?: number | null;
}) {
  const targets = bookingTargets(input.purchasedAt ?? null);
  return {
    reference: input.reference,
    customerName: input.customerName ?? "",
    covered: Boolean(input.covered),
    depositPaid: input.depositPaid ?? "",
    intakeUrl: intakeUrlFor(input.reference),
    bookingUrl: VIDEO_PLANNING_BOOKING_URL,
    bookBy: targets?.bookBy ?? "",
    meetBy: targets?.meetBy ?? "",
  };
}

export function studioWelcomeEmailData(input: { planName: string; purchasedAt?: number | null; origin?: string }) {
  const targets = bookingTargets(input.purchasedAt ?? null);
  return {
    planName: input.planName,
    bookingUrl: STUDIO_ONBOARDING_BOOKING_URL,
    studioUrl: `${input.origin || "https://www.palmerhouseproductions.com"}/studio`,
    bookBy: targets?.bookBy ?? "",
    meetBy: targets?.meetBy ?? "",
  };
}
