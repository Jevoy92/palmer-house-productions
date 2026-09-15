import aboutCrew from "@/assets/pal-scenes/about-crew.webp";
import assessment from "@/assets/pal-scenes/assessment.webp";
import blog from "@/assets/pal-scenes/blog.webp";
import checkoutReview from "@/assets/pal-scenes/checkout-review.webp";
import contact from "@/assets/pal-scenes/contact.webp";
import contentStrategy from "@/assets/pal-scenes/content-strategy.webp";
import diyDownloads from "@/assets/pal-scenes/diy-downloads.webp";
import emptyCart from "@/assets/pal-scenes/empty-cart.webp";
import faqHelp from "@/assets/pal-scenes/faq-help.webp";
import games from "@/assets/pal-scenes/games.webp";
import industries from "@/assets/pal-scenes/industries.webp";
import locations from "@/assets/pal-scenes/locations.webp";
import membershipStudio from "@/assets/pal-scenes/membership-studio.webp";
import offersBundle from "@/assets/pal-scenes/offers-bundle.webp";
import postProduction from "@/assets/pal-scenes/post-production.webp";
import processPlanning from "@/assets/pal-scenes/process-planning.webp";
import productionGuide from "@/assets/pal-scenes/production-guide.webp";
import reviews from "@/assets/pal-scenes/reviews.webp";
import startups from "@/assets/pal-scenes/startups.webp";
import success from "@/assets/pal-scenes/success.webp";
import webinar from "@/assets/pal-scenes/webinar.webp";
import type { PalAccent } from "@/lib/pricing-catalog";

/**
 * Custom-rendered Pal scenes. Each image is rendered on a flat background
 * that exactly matches the lane's `--{lane}-soft` token, so it can sit
 * inside a lane-tinted frame with no visible seam.
 */
export type PalScene = {
  src: string;
  alt: string;
  lane: PalAccent;
  /** Intrinsic aspect ratio, for reserving layout space. */
  ratio: "4/3" | "1/1" | "3/4" | "16/9";
};

export const PAL_SCENES = {
  aboutCrew: {
    src: aboutCrew,
    alt: "Kiana, Kareem, and Clara around a cinema camera on set",
    lane: "spotlight",
    ratio: "4/3",
  },
  assessment: {
    src: assessment,
    alt: "Silas inspecting a video system score with a magnifying glass",
    lane: "system",
    ratio: "4/3",
  },
  blog: {
    src: blog,
    alt: "Clara writing at a laptop with article cards floating behind her",
    lane: "evergreen",
    ratio: "4/3",
  },
  checkoutReview: {
    src: checkoutReview,
    alt: "Raquel holding a completed checklist and giving a thumbs up",
    lane: "reel",
    ratio: "3/4",
  },
  contact: {
    src: contact,
    alt: "Kiana wearing a headset, waving, and holding a calendar",
    lane: "spotlight",
    ratio: "4/3",
  },
  contentStrategy: {
    src: contentStrategy,
    alt: "Cyrus presenting a content calendar with connected video ideas",
    lane: "evergreen",
    ratio: "4/3",
  },
  diyDownloads: {
    src: diyDownloads,
    alt: "Cyrus holding a folder of templates with a download icon",
    lane: "evergreen",
    ratio: "4/3",
  },
  emptyCart: {
    src: emptyCart,
    alt: "Ryder holding an empty basket with a playful shrug",
    lane: "reel",
    ratio: "1/1",
  },
  faqHelp: {
    src: faqHelp,
    alt: "Samira at a help desk surrounded by question bubbles",
    lane: "system",
    ratio: "4/3",
  },
  games: {
    src: games,
    alt: "Ryder with a game controller and Raquel lifting a trophy",
    lane: "reel",
    ratio: "4/3",
  },
  industries: {
    src: industries,
    alt: "Clara surrounded by icons for healthcare, trades, food, real estate, fitness, and law",
    lane: "evergreen",
    ratio: "4/3",
  },
  locations: {
    src: locations,
    alt: "Silas pointing at a Pacific Northwest map with service locations",
    lane: "system",
    ratio: "4/3",
  },
  membershipStudio: {
    src: membershipStudio,
    alt: "Silas and Samira showing the Studio dashboard on a laptop and phone",
    lane: "system",
    ratio: "4/3",
  },
  offersBundle: {
    src: offersBundle,
    alt: "Ryder holding a gift box with a 10% off tag next to Kareem with a clapperboard",
    lane: "reel",
    ratio: "4/3",
  },
  postProduction: {
    src: postProduction,
    alt: "Kareem at an editing desk with timeline and color scopes",
    lane: "spotlight",
    ratio: "4/3",
  },
  processPlanning: {
    src: processPlanning,
    alt: "Clara and Samira planning a storyboard on an easel",
    lane: "evergreen",
    ratio: "4/3",
  },
  productionGuide: {
    src: productionGuide,
    alt: "Kareem holding open a production guide beside a light and microphone",
    lane: "spotlight",
    ratio: "4/3",
  },
  reviews: {
    src: reviews,
    alt: "Kiana holding a five-star review card",
    lane: "spotlight",
    ratio: "4/3",
  },
  startups: {
    src: startups,
    alt: "Ryder launching a toy rocket from his palm",
    lane: "reel",
    ratio: "4/3",
  },
  success: {
    src: success,
    alt: "The Pals celebrating with confetti under a green checkmark",
    lane: "spotlight",
    ratio: "16/9",
  },
  webinar: {
    src: webinar,
    alt: "Cyrus presenting a webinar screen with a play button and chart",
    lane: "evergreen",
    ratio: "4/3",
  },
} satisfies Record<string, PalScene>;

export type PalSceneName = keyof typeof PAL_SCENES;
