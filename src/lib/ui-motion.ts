import { useReducedMotion, type Transition } from "motion/react";

/** Shared, interruption-safe motion for Palmer House interfaces. */
export const STUDIO_SPRING = {
  type: "spring",
  visualDuration: 0.24,
  bounce: 0,
} as const satisfies Transition;

export const STUDIO_FADE = {
  duration: 0.16,
  ease: "linear",
} as const satisfies Transition;

export const STUDIO_STILL = { duration: 0 } as const satisfies Transition;

export function useUiMotion() {
  const reduceMotion = Boolean(useReducedMotion());
  return {
    reduceMotion,
    transition: reduceMotion ? STUDIO_STILL : STUDIO_SPRING,
    fadeTransition: reduceMotion ? STUDIO_STILL : STUDIO_FADE,
    enter: reduceMotion ? (false as const) : { opacity: 0, transform: "translateY(8px)" },
    exit: reduceMotion ? { opacity: 0 } : { opacity: 0, transform: "translateY(-6px)" },
  };
}
