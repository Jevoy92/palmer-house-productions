import { useUiMotion } from "@/lib/ui-motion";

/** Public reveals share the Studio spring, with a short independent opacity fade. */
export function useSiteMotion() {
  const motion = useUiMotion();
  return {
    ...motion,
    transition: { ...motion.transition, opacity: motion.fadeTransition },
  };
}
