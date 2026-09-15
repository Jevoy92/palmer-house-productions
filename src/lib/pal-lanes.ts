import claraPortrait from "@/assets/pal-portraits/clara.webp";
import cyrusPortrait from "@/assets/pal-portraits/cyrus.webp";
import kareemPortrait from "@/assets/pal-portraits/kareem.webp";
import kianaPortrait from "@/assets/pal-portraits/kiana.webp";
import raquelPortrait from "@/assets/pal-portraits/raquel.webp";
import ryderPortrait from "@/assets/pal-portraits/ryder.webp";
import samiraPortrait from "@/assets/pal-portraits/samira.webp";
import silasPortrait from "@/assets/pal-portraits/silas.webp";
import claraHeadshot from "@/assets/pal-headshots/clara.webp";
import cyrusHeadshot from "@/assets/pal-headshots/cyrus.webp";
import kareemHeadshot from "@/assets/pal-headshots/kareem.webp";
import kianaHeadshot from "@/assets/pal-headshots/kiana.webp";
import raquelHeadshot from "@/assets/pal-headshots/raquel.webp";
import ryderHeadshot from "@/assets/pal-headshots/ryder.webp";
import samiraHeadshot from "@/assets/pal-headshots/samira.webp";
import silasHeadshot from "@/assets/pal-headshots/silas.webp";
import palCrew from "@/assets/hero/pal-crew.png";
import type { PalName } from "@/lib/studio-model";
import type { PalAccent } from "@/lib/pricing-catalog";
import type { GlyphName } from "@/components/site/Glyphs";

export const PAL_PORTRAITS: Record<PalName, string> = {
  clara: claraPortrait,
  cyrus: cyrusPortrait,
  kareem: kareemPortrait,
  kiana: kianaPortrait,
  raquel: raquelPortrait,
  ryder: ryderPortrait,
  samira: samiraPortrait,
  silas: silasPortrait,
};

export const PAL_HEADSHOTS: Record<PalName, string> = {
  clara: claraHeadshot,
  cyrus: cyrusHeadshot,
  kareem: kareemHeadshot,
  kiana: kianaHeadshot,
  raquel: raquelHeadshot,
  ryder: ryderHeadshot,
  samira: samiraHeadshot,
  silas: silasHeadshot,
};

export const PAL_CREW = palCrew;

export type LaneInfo = {
  id: PalAccent;
  label: string;
  problem: string;
  promise: string;
  pals: [PalName, PalName];
  duo: string;
  to: "/reel-pal" | "/spotlight-pal" | "/evergreen-pal" | "/system-pal";
  glyph: GlyphName;
  outputs: string[];
};

export const LANES: LaneInfo[] = [
  {
    id: "reel",
    label: "Reel Pal",
    problem: "Get Seen",
    promise: "Short-form hooks, retention, and a publishing rhythm that keeps you visible.",
    pals: ["ryder", "raquel"],
    duo: "Ryder & Raquel",
    to: "/reel-pal",
    glyph: "reel",
    outputs: ["15–90s reels", "Hook variations", "Caption-ready cuts"],
  },
  {
    id: "spotlight",
    label: "Spotlight Pal",
    problem: "Build Trust",
    promise: "Founder stories, client proof, and offer films that make quality visible first.",
    pals: ["kareem", "kiana"],
    duo: "Kareem & Kiana",
    to: "/spotlight-pal",
    glyph: "camera",
    outputs: ["Founder stories", "Client proof", "Offer films"],
  },
  {
    id: "evergreen",
    label: "Evergreen Pal",
    problem: "Explain Clearly",
    promise: "Structured long-form answers that educate buyers and keep working for years.",
    pals: ["cyrus", "clara"],
    duo: "Cyrus & Clara",
    to: "/evergreen-pal",
    glyph: "library",
    outputs: ["5–15 min episodes", "Web explainers", "Repurpose masters"],
  },
  {
    id: "system",
    label: "System Pal",
    problem: "Train & Scale",
    promise: "Onboarding, SOP, and training libraries so knowledge stops living in heads.",
    pals: ["silas", "samira"],
    duo: "Silas & Samira",
    to: "/system-pal",
    glyph: "workflow",
    outputs: ["Onboarding", "SOP walkthroughs", "Training libraries"],
  },
];

export const laneById = Object.fromEntries(LANES.map((l) => [l.id, l])) as Record<
  PalAccent,
  LaneInfo
>;

export function laneVar(lane: PalAccent, suffix: "" | "-soft" | "-text" | "-deep" = "") {
  return `var(--${lane}${suffix})`;
}
