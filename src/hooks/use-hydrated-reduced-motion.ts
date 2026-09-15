import { useReducedMotion } from "motion/react";
import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

/**
 * Defers reduced-motion-dependent rendering until after hydration.
 *
 * The server and first client render both return false. React rechecks the
 * external-store snapshot after hydration, then applies the user's preference
 * without changing the HTML or Motion inline styles during hydration.
 */
export function useHydratedReducedMotion() {
  const reduce = useReducedMotion();
  const hydrated = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

  return hydrated && Boolean(reduce);
}
