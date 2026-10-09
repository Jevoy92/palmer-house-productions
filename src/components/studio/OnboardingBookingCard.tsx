import { ArrowRight, CalendarCheck } from "lucide-react";
import {
  BOOKING_EXPECTATIONS,
  STUDIO_ONBOARDING_HOURS,
  isActivePaidMember,
  STUDIO_ONBOARDING_BOOKING_URL,
} from "@/lib/booking-links";
import { Button } from "@/components/ui/button";
import { useStudio } from "./StudioProvider";

/**
 * Paid-member onboarding call. Shown only for an active paid membership loaded from the
 * server. Opening the link never marks the call as booked or completed.
 */
export function OnboardingBookingCard({ compact = false }: { compact?: boolean }) {
  const { subscription } = useStudio();
  if (!isActivePaidMember(subscription)) return null;
  return (
    <section
      className={`${compact ? "mt-4" : "mt-6"} rounded-[1.25rem] border border-border bg-system-soft p-5`}
      aria-labelledby="studio-onboarding-title"
    >
      <div className="flex items-start gap-3">
        <CalendarCheck className="mt-0.5 size-5 shrink-0 text-system" aria-hidden="true" />
        <div>
          <p className="studio-eyebrow text-system">Included with your membership</p>
          <h2 id="studio-onboarding-title" className="mt-1 text-lg font-bold">
            Book your Studio onboarding
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            A 30-minute video call with our team to set up your Studio, Brand DNA and first
            campaign. Available {STUDIO_ONBOARDING_HOURS}.
            {compact ? "" : ` ${BOOKING_EXPECTATIONS}`}
          </p>
          <Button asChild className="mt-4 min-h-11">
            <a href={STUDIO_ONBOARDING_BOOKING_URL} target="_blank" rel="noopener noreferrer">
              Book your Studio onboarding <ArrowRight size={16} aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
