/** Small Business Expo LA campaign: the single source of truth for dates, rates and copy.
 * Client-safe. The booth code itself lives only in the EXPO_BOOTH_CODE server secret. */
export const expoCampaign = {
  id: "sbe-la-2026",
  timezone: "America/Los_Angeles",
  enabled: false, // Expo campaign retired; demo stays public.
  // Offer is live from launch until Sunday Oct 4, 11:59:59 PM Pacific.
  startsAt: "2026-09-30T07:00:00Z",
  endsAt: "2026-10-05T06:59:59Z",
  deadlineLabel: "Sunday, October 4, 11:59 PM Pacific",
  event: {
    name: "Small Business Expo — Los Angeles",
    date: "2026-09-30",
    dateLabel: "Wednesday, September 30, 2026",
    venue: "Pasadena Convention Center, Exhibit Hall",
    address: "300 East Green Street, Pasadena, CA 91101",
    booth: "Booth 328",
    hallOpens: "2026-09-30T17:00:00Z", // 10:00 AM Pacific
    hallCloses: "2026-10-01T00:00:00Z", // 5:00 PM Pacific
    hoursLabel: "10:00 AM–5:00 PM Pacific",
  },
  followUpDate: "2026-10-02",
  followUpLabel: "Friday, October 2",
  contactEmail: "info@palmerhouseproductions.com",
  contactPhone: "(425) 473-0349",
  regularMonthly: 99,
  months: 3,
  offers: {
    public: { monthly: 79, couponId: "sbe-la-2026-public" },
    booth: { monthly: 69, couponId: "sbe-la-2026-booth" },
  },
  /** Guided (business) and Partner: percent off the first three monthly payments. */
  tierOffers: {
    public: { percentOff: 10, couponId: "sbe-la-2026-tier-public" },
    booth: { percentOff: 20, couponId: "sbe-la-2026-tier-booth" },
  },
  /** Discounted checkout sessions must be completed within this window. */
  checkoutWindowMinutes: 30,
} as const;

export type ExpoOffer = keyof typeof expoCampaign.offers;

export function expoOfferLive(now = Date.now()) {
  return (
    expoCampaign.enabled &&
    now >= Date.parse(expoCampaign.startsAt) &&
    now <= Date.parse(expoCampaign.endsAt)
  );
}

export function expoSavings(offer: ExpoOffer) {
  return (expoCampaign.regularMonthly - expoCampaign.offers[offer].monthly) * expoCampaign.months;
}

export type ExpoEventPhase = "before" | "today" | "live" | "after";
export function expoEventPhase(now = Date.now()): ExpoEventPhase {
  const opens = Date.parse(expoCampaign.event.hallOpens);
  const closes = Date.parse(expoCampaign.event.hallCloses);
  const dayStart = Date.parse("2026-09-30T07:00:00Z");
  if (now < dayStart) return "before";
  if (now >= opens && now < closes) return "live";
  if (now < closes) return "today";
  return "after";
}

export const expoPhaseLabel: Record<ExpoEventPhase, string> = {
  before: "Meet us at Booth 328",
  today: "Meet us today at Booth 328",
  live: "We're at Booth 328 now",
  after: "Thanks for meeting us in Los Angeles",
};

/** After the promised Friday passes, never show a date in the past. */
export function followUpPromise(now = Date.now()) {
  return now < Date.parse("2026-10-03T07:00:00Z")
    ? `I'll follow up with you by email ${expoCampaign.followUpLabel}.`
    : "I'll follow up with you by email within two business days.";
}

export const expoCodeStorageKey = "phs.expo-booth-code.v1";
