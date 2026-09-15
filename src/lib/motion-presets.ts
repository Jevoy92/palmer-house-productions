/** Shared Motion variants for staggered in-view reveals. Use with <Stagger>. */
export const staggerItem = {
  hidden: { opacity: 0, transform: "translate3d(0,20px,0)" },
  show: {
    opacity: 1,
    transform: "translate3d(0,0,0)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export const easeOutExpo = [0.22, 1, 0.36, 1] as const;
