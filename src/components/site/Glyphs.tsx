import {
  CalendarDays,
  CheckCheck,
  Clock3,
  Gift,
  MapPin,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import story from "@/assets/hero/icon-story.webp";
import production from "@/assets/hero/icon-production.webp";
import library from "@/assets/hero/icon-library.webp";
import publish from "@/assets/hero/icon-publish.webp";
import type { PalAccent } from "@/lib/pricing-catalog";

export type GlyphName =
  | "reel"
  | "camera"
  | "library"
  | "workflow"
  | "script"
  | "calendar"
  | "mic"
  | "chart"
  | "chat"
  | "play"
  | "pin"
  | "shield"
  | "clock"
  | "spark"
  | "gift"
  | "cart"
  | "search"
  | "layers"
  | "handshake"
  | "edit"
  | "publish"
  | "bulb"
  | "teleprompter"
  | "light";

// Use the supplied dimensional artwork for storytelling. Small utility symbols
// stay familiar, static and easy to recognize instead of animating on every card.
const artwork: Partial<Record<GlyphName, string>> = {
  reel: "/packages/icons/reel-services.png",
  camera: production,
  library,
  workflow: "/studio/graphics/outcome-system.png",
  script: story,
  mic: "/packages/icons/evergreen-founder-pov.png",
  chart: "/studio/graphics/reel-momentum.png",
  chat: "/studio/graphics/reel-objection.png",
  play: "/packages/icons/system-onboarding.png",
  layers: library,
  handshake: "/studio/graphics/system-client-handoff.png",
  edit: story,
  publish,
  bulb: "/studio/graphics/reel-pov.png",
  teleprompter: "/packages/icons/evergreen-how-it-works.png",
  light: production,
};
const utilities: Partial<Record<GlyphName, LucideIcon>> = {
  calendar: CalendarDays,
  pin: MapPin,
  shield: ShieldCheck,
  clock: Clock3,
  spark: Sparkles,
  gift: Gift,
  cart: ShoppingBag,
  search: Search,
};
export function Glyph({
  name,
  lane = "spotlight",
  className = "size-16",
  title,
}: {
  name: GlyphName;
  lane?: PalAccent;
  className?: string;
  title?: string;
}) {
  const src = artwork[name];
  if (src)
    return (
      <img
        src={src}
        alt={title ?? ""}
        loading="lazy"
        decoding="async"
        className={`site-graphic ${className}`}
      />
    );
  const Icon = utilities[name] ?? CheckCheck;
  return (
    <Icon
      className={className}
      strokeWidth={1.5}
      style={{ color: `var(--${lane}-text)` }}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    />
  );
}
export function GlyphBadge({
  name,
  lane = "spotlight",
  size = "md",
  className = "",
}: {
  name: GlyphName;
  lane?: PalAccent;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const box = size === "sm" ? "size-12" : size === "lg" ? "size-24" : "size-16";
  const glyph = artwork[name]
    ? "size-full"
    : size === "sm"
      ? "size-6"
      : size === "lg"
        ? "size-12"
        : "size-8";
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-xl ${box} ${className}`}
      style={artwork[name] ? undefined : { background: `var(--${lane}-soft)` }}
    >
      <Glyph name={name} lane={lane} className={glyph} />
    </span>
  );
}
