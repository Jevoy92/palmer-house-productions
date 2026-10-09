import { ArrowUpRight, CalendarDays } from "lucide-react";
import { QUICK_CHAT_BOOKING_URL, QUICK_CHAT_DETAILS, QUICK_CHAT_HOURS } from "@/lib/booking-links";

/** Free Friday introduction. Opening the link never marks anything as booked. */
export function QuickChatCard({ className = "" }: { className?: string }) {
  return (
    <section
      aria-labelledby="quick-chat-title"
      className={`rounded-[2rem] border border-border bg-spotlight-soft p-6 shadow-soft ${className}`}
    >
      <div className="flex items-start gap-4">
        <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-spotlight text-white">
          <CalendarDays className="size-6" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-spotlight-text">
            Free quick chat · 15 min
          </p>
          <h3 id="quick-chat-title" className="mt-1 text-xl font-extrabold leading-tight">
            Rather talk it through?
          </h3>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        Pick a time for a short introduction with our team. {QUICK_CHAT_HOURS}.
      </p>
      <p className="mt-2 text-xs font-semibold text-muted-foreground">{QUICK_CHAT_DETAILS}</p>
      <a
        href={QUICK_CHAT_BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl bg-spotlight px-5 text-sm font-bold text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-spotlight"
      >
        Book a Friday quick chat
        <ArrowUpRight className="size-4" aria-hidden="true" />
        <span className="sr-only">(opens Google Calendar in a new tab)</span>
      </a>
      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
        Your meeting link arrives in Google’s confirmation.
      </p>
    </section>
  );
}

/** Paid clients already have their own next step — no intro chat required. */
export function PaidClientNote({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-[2rem] border border-border bg-white p-6 ${className}`}>
      <p className="text-sm font-bold">Already a client?</p>
      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
        <li>
          <span className="font-semibold text-foreground">Paid a video deposit:</span> use the planning-call
          link in your confirmation email or receipt.
        </li>
        <li>
          <span className="font-semibold text-foreground">Paid Studio member:</span> book onboarding from Start
          Here in your Studio.
        </li>
      </ul>
      <p className="mt-3 text-xs text-muted-foreground">You don’t need an introduction call first.</p>
    </div>
  );
}
