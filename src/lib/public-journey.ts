/** Public choices carry context; they never authorize a charge or booking. */
export const inquiryIntents = {
  production: {
    label: "Full video production",
    message: "I'd like help planning, filming, and editing a video project.",
  },
  preparation: {
    label: "Planning & shoot preparation",
    message:
      "I'd like help with strategy, concepts, scripting, wardrobe, or getting ready to be on camera. Please help me scope the support.",
  },
  studio: {
    label: "Studio & account help",
    message: "I'd like help with Palmer House Studio and its tools.",
  },
  editing: {
    label: "Editing existing footage",
    message: "I have footage and would like help with editing and delivery.",
  },
  intensive: {
    label: "Clarity Intensive",
    message:
      "I'd like to discuss the $500, 75-minute Clarity Intensive. Please confirm availability, the session focus, and the included 30 days of Studio access.",
  },
  advisory: {
    label: "90-Day Video Leverage Partnership",
    message:
      "I'd like to discuss the $25,000, application-only 90-Day Video Leverage Partnership and whether it fits my project.",
  },
  call: {
    label: "Introductory call",
    message: "I'd like an introductory conversation about the right next step for my project.",
  },
} as const;
export type InquiryIntent = keyof typeof inquiryIntents;
export function parseInquiryIntent(value: unknown): InquiryIntent | undefined {
  return typeof value === "string" && Object.hasOwn(inquiryIntents, value)
    ? (value as InquiryIntent)
    : undefined;
}
export type StudioPurchaseIntent = {
  plan: "creator" | "business" | "partner";
  interval: "month" | "year";
};
export function parseStudioPurchaseIntent(
  value: Record<string, unknown>,
): StudioPurchaseIntent | null {
  return typeof value.plan === "string" &&
    typeof value.interval === "string" &&
    ["creator", "business", "partner"].includes(value.plan) &&
    ["month", "year"].includes(value.interval)
    ? {
        plan: value.plan as StudioPurchaseIntent["plan"],
        interval: value.interval as StudioPurchaseIntent["interval"],
      }
    : null;
}
export const studioIntentKey = "phs.studio-purchase-intent.v1";
export function readStoredStudioIntent(
  raw: string | null,
  now = Date.now(),
): StudioPurchaseIntent | null {
  try {
    const value = JSON.parse(raw ?? "null");
    return value &&
      typeof value.expiresAt === "number" &&
      value.expiresAt > now &&
      value.expiresAt <= now + 86400000
      ? parseStudioPurchaseIntent(value)
      : null;
  } catch {
    return null;
  }
}
export function rememberStudioIntent(intent: StudioPurchaseIntent): void {
  try {
    window.localStorage.setItem(
      studioIntentKey,
      JSON.stringify({ ...intent, expiresAt: Date.now() + 86400000 }),
    );
  } catch {
    /* URL still carries the choice. */
  }
}
export function currentStudioIntent(): StudioPurchaseIntent | null {
  if (typeof window === "undefined") return null;
  const query = parseStudioPurchaseIntent(
    Object.fromEntries(new URLSearchParams(window.location.search)),
  );
  if (query) {
    rememberStudioIntent(query);
    return query;
  }
  try {
    return readStoredStudioIntent(window.localStorage.getItem(studioIntentKey));
  } catch {
    return null;
  }
}
export function studioAuthReturnUrl(): string {
  const intent = currentStudioIntent();
  return `${window.location.origin}/studio${intent ? `/billing?plan=${intent.plan}&interval=${intent.interval}` : ""}`;
}
export function clearStudioIntent(): void {
  try {
    window.localStorage.removeItem(studioIntentKey);
  } catch {
    /* No persistent choice. */
  }
  const url = new URL(window.location.href);
  url.searchParams.delete("plan");
  url.searchParams.delete("interval");
  window.history.replaceState(window.history.state, "", url);
}
export function productionDraft(search: Record<string, unknown>): {
  count?: number;
  sessions?: number;
} {
  const integer = (v: unknown, min: number, max: number) =>
    (typeof v === "string" || typeof v === "number") &&
    v !== "" &&
    Number.isInteger(Number(v)) &&
    Number(v) >= min &&
    Number(v) <= max
      ? Number(v)
      : undefined;
  return { count: integer(search.count, 0, 20), sessions: integer(search.sessions, 1, 4) };
}
