import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Motion Tokens - matching CSS variables
export const MOTION = {
  MICRO: 0.24,
  REVEAL: 0.42,
  SLOW: 0.6,
  PARALLAX: 1.2,
} as const;

// Easing curves - matching CSS bezier curves
export const EASE = {
  POWER2_OUT: 'power2.out',
  POWER1_INOUT: 'power1.inOut', 
  BACK_OUT: 'back.out(1.8)',
} as const;

// Utility function to check for reduced motion preference
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Enhanced reveal animation with stagger
export const revealElements = (elements: string | Element[], options: {
  delay?: number;
  stagger?: number;
  y?: number;
  duration?: number;
} = {}) => {
  const {
    delay = 0,
    stagger = 0.08,
    y = 20,
    duration = MOTION.REVEAL,
  } = options;

  if (prefersReducedMotion()) {
    gsap.set(elements, { opacity: 1, y: 0 });
    return;
  }

  const tl = gsap.timeline({ delay });
  
  tl.fromTo(elements, 
    { 
      opacity: 0, 
      y,
      filter: 'blur(8px)'
    },
    { 
      opacity: 1, 
      y: 0,
      filter: 'blur(0px)',
      duration,
      ease: EASE.POWER2_OUT,
      stagger
    }
  );

  return tl;
};

// Scroll-triggered animation
export const scrollReveal = (trigger: string | Element, elements: string | Element[], options: {
  start?: string;
  end?: string;
  stagger?: number;
} = {}) => {
  const {
    start = 'top 80%',
    end = 'bottom 20%',
    stagger = 0.06,
  } = options;

  if (prefersReducedMotion()) {
    gsap.set(elements, { opacity: 1, y: 0 });
    return;
  }

  return ScrollTrigger.create({
    trigger,
    start,
    end,
    onEnter: () => {
      revealElements(elements, { stagger });
    },
  });
};

// Parallax effect for hero elements
export const heroParallax = (element: string | Element, intensity: number = 0.5) => {
  if (prefersReducedMotion()) return;

  return ScrollTrigger.create({
    trigger: element,
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
    onUpdate: (self) => {
      const y = self.progress * intensity * 100;
      gsap.set(element, { yPercent: -y });
    },
  });
};

// Button hover animation
export const buttonHover = (button: string | Element) => {
  if (prefersReducedMotion()) return;

  const element = typeof button === 'string' ? document.querySelector(button) : button;
  if (!element) return;

  const onEnter = () => {
    gsap.to(element, {
      scale: 1.04,
      duration: MOTION.MICRO,
      ease: EASE.BACK_OUT,
    });
  };

  const onLeave = () => {
    gsap.to(element, {
      scale: 1,
      duration: MOTION.MICRO,
      ease: EASE.POWER2_OUT,
    });
  };

  element.addEventListener('mouseenter', onEnter);
  element.addEventListener('mouseleave', onLeave);

  return () => {
    element.removeEventListener('mouseenter', onEnter);
    element.removeEventListener('mouseleave', onLeave);
  };
};

// Cleanup function for ScrollTrigger
export const cleanupScrollTrigger = () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
};

export default gsap;