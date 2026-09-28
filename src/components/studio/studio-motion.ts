import { useReducedMotion } from "motion/react";
import { STUDIO_SPRING, STUDIO_FADE, STUDIO_STILL } from "@/lib/ui-motion";
import { useStudioAppearance } from "./StudioAppearance";

export { STUDIO_SPRING, STUDIO_FADE, STUDIO_STILL };

/** Honor both the device setting and the member's Studio preference. */
export function useStudioMotion() {
  const systemReduced = useReducedMotion();
  const { appearance } = useStudioAppearance();
  const reduceMotion = Boolean(systemReduced || appearance.reduceMotion);
  return {
    reduceMotion,
    transition: reduceMotion ? STUDIO_STILL : STUDIO_SPRING,
    fadeTransition: reduceMotion ? STUDIO_STILL : STUDIO_FADE,
    enter: reduceMotion ? (false as const) : { opacity: 0, transform: "translateY(8px)" },
    exit: reduceMotion ? { opacity: 0 } : { opacity: 0, transform: "translateY(-6px)" },
  };
}
