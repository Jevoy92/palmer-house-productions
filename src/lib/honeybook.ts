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
};

export type QuoteSummary = {
  reference: string;
  items: QuoteLineItem[];
  subtotal: number;
  tax: number;
  total: number;
};

// ⚠️ Paste your HoneyBook lead form URL here.
export const HONEYBOOK_LEAD_FORM_URL = "";

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
  // 👉 If your HB form has named custom fields, map them here:
  // url.searchParams.set("notes", `Quote ${quote.reference}: ${quote.items.map(i => i.name).join(", ")} = $${quote.total.toFixed(2)}`);
  return url.toString();
}

/** Fires the HB hand-off. Safe to call even before URL is configured. */
export function openHoneyBookBooking(quote: QuoteSummary): void {
  if (!HONEYBOOK_LEAD_FORM_URL) {
    const params = new URLSearchParams({
      quote: quote.reference,
      total: quote.total.toFixed(2),
      services: quote.items.map((item) => item.name).join(", "),
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
