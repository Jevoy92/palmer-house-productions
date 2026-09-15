// =============================================================================
// HoneyBook hand-off
// -----------------------------------------------------------------------------
// The QuoteBuilder on /pricing is a marketing/price-discovery tool.
// Real booking happens in your HoneyBook lead form.
//
// HOW TO WIRE THIS UP LATER:
//   1. Paste your HoneyBook lead form share URL into HONEYBOOK_LEAD_FORM_URL.
//      (HoneyBook → Lead capture → Lead forms → "Coaching" or
//      "Free Video Consultation" → Share → copy URL.)
//   2. Pick a mode: "new-tab" (default, simplest) or "modal".
//   3. (Optional) If your HB form exposes URL-prefill custom fields,
//      map quote -> query params inside buildHoneyBookUrl().
// =============================================================================

export type QuoteLineItem = {
  id: string;
  name: string;
  price: number;
  cadence?: "one-time" | "monthly";
  configuration?: string;
};

export type QuoteSummary = {
  reference: string;
  items: QuoteLineItem[];
  subtotal: number;
  tax: number;
  total: number;
  offerCode?: string;
  cadenceMix?: "one-time" | "monthly" | "mixed";
  customer?: {
    name: string;
    email: string;
    company?: string;
    recipient?: string;
    note?: string;
    gift?: boolean;
    expandedScriptwriting?: boolean;
  };
};

// Configure in Lovable/Vercel as VITE_HONEYBOOK_LEAD_FORM_URL. Keeping the
// value outside source control prevents accidental production/vendor drift.
export const HONEYBOOK_LEAD_FORM_URL =
  (import.meta.env.VITE_HONEYBOOK_LEAD_FORM_URL as string | undefined) ?? "";

// "new-tab" → opens HB form in a new tab with prefilled query params
// "modal"   → opens HB form inside an iframe modal (set up <HoneyBookModal/>)
export const HONEYBOOK_MODE: "new-tab" | "modal" = "new-tab";

/** Build a HB form URL with quote context as query params. */
export function buildHoneyBookUrl(quote: QuoteSummary): string {
  if (!HONEYBOOK_LEAD_FORM_URL) return "";
  const url = new URL(HONEYBOOK_LEAD_FORM_URL);
  url.searchParams.set("quote_ref", quote.reference);
  url.searchParams.set("quote_total", quote.total.toFixed(2));
  url.searchParams.set("quote_items", quote.items.map((i) => i.name).join(", "));
  url.searchParams.set(
    "quote_details",
    JSON.stringify(
      quote.items.map(({ id, name, price, cadence, configuration }) => ({
        id,
        name,
        price,
        cadence,
        configuration,
      })),
    ),
  );
  if (quote.offerCode) url.searchParams.set("offer_code", quote.offerCode);
  if (quote.cadenceMix) url.searchParams.set("cadence", quote.cadenceMix);
  if (quote.customer?.name) url.searchParams.set("name", quote.customer.name);
  if (quote.customer?.email) url.searchParams.set("email", quote.customer.email);
  if (quote.customer?.company) url.searchParams.set("company", quote.customer.company);
  if (quote.customer?.recipient) url.searchParams.set("gift_recipient", quote.customer.recipient);
  if (quote.customer?.note) url.searchParams.set("notes", quote.customer.note);
  if (quote.customer?.gift) url.searchParams.set("gift", "yes");
  if (quote.customer?.expandedScriptwriting) {
    url.searchParams.set("expanded_scriptwriting", "yes");
  }
  return url.toString();
}

/** Fires the HB hand-off. Safe to call even before URL is configured. */
export function openHoneyBookBooking(quote: QuoteSummary): void {
  if (!HONEYBOOK_LEAD_FORM_URL) {
    const params = new URLSearchParams({
      quote: quote.reference,
      total: quote.total.toFixed(2),
      services: quote.items.map((item) => item.name).join(", "),
      details: JSON.stringify(quote.items),
      ...(quote.customer?.name ? { name: quote.customer.name } : {}),
      ...(quote.customer?.email ? { email: quote.customer.email } : {}),
      ...(quote.customer?.company ? { company: quote.customer.company } : {}),
      ...(quote.offerCode ? { offer: quote.offerCode } : {}),
      ...(quote.cadenceMix ? { cadence: quote.cadenceMix } : {}),
      ...(quote.customer?.recipient ? { recipient: quote.customer.recipient } : {}),
      ...(quote.customer?.note ? { note: quote.customer.note } : {}),
      ...(quote.customer?.gift ? { gift: "yes" } : {}),
      ...(quote.customer?.expandedScriptwriting ? { expanded_scriptwriting: "yes" } : {}),
    });
    window.location.assign(`/contact?${params.toString()}`);
    return;
  }

  const url = buildHoneyBookUrl(quote);

  if (HONEYBOOK_MODE === "new-tab") {
    window.open(url, "_blank", "noopener,noreferrer");
    return;
  }
  // For "modal" mode, the QuoteSummaryDialog handles the iframe render.
  // This function still works as a fallback opener.
  window.open(url, "_blank", "noopener,noreferrer");
}

export function generateQuoteReference(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 6; i++) {
    out += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `PH-${out}`;
}
