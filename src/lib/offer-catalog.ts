import type { SelectedMap } from "./pricing-catalog";

export type OfferCode = "STARTERDUO" | "EDIT2FOR1";

export type ProductionOffer = {
  code: OfferCode;
  name: string;
  eyebrow: string;
  description: string;
  terms: string;
  itemIds: string[];
  accent: "reel" | "spotlight" | "evergreen" | "system";
};

export const PRODUCTION_OFFERS: ProductionOffer[] = [
  {
    code: "STARTERDUO",
    name: "Visibility + Trust Duo",
    eyebrow: "Bundle and save 10%",
    description:
      "Pair Social Content with Commercials so attention and credibility launch together.",
    terms: "10% off both packages when booked together as a one-time production.",
    itemIds: ["social-content", "commercials"],
    accent: "spotlight",
  },
  {
    code: "EDIT2FOR1",
    name: "Two Edited Minutes for One",
    eyebrow: "BOGO output offer",
    description:
      "Add two standalone edited minutes when you already have footage that needs another life.",
    terms: "Every second standalone edited minute is free. One-time bookings only.",
    itemIds: ["extra-edited-video"],
    accent: "reel",
  },
];

export function isOfferCode(value: unknown): value is OfferCode {
  return value === "STARTERDUO" || value === "EDIT2FOR1";
}

export function offerUnitPrice({
  code,
  itemId,
  baseUnitPrice,
  addOnUnitPrice = 0,
  qty,
  selected,
}: {
  code?: OfferCode;
  itemId: string;
  baseUnitPrice: number;
  addOnUnitPrice?: number;
  qty: number;
  selected: SelectedMap;
}): number {
  let discountedBase = baseUnitPrice;

  if (code === "STARTERDUO") {
    const eligible = (selected["social-content"] ?? 0) > 0 && (selected["commercials"] ?? 0) > 0;
    if (eligible && (itemId === "social-content" || itemId === "commercials")) {
      discountedBase = Math.round(baseUnitPrice * 0.9);
    }
  }

  if (code === "EDIT2FOR1" && itemId === "extra-edited-video" && qty >= 2) {
    const chargedUnits = Math.ceil(qty / 2);
    discountedBase = (baseUnitPrice * chargedUnits) / qty;
  }

  return discountedBase + addOnUnitPrice;
}
