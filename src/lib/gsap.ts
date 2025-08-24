import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { SplitText } from 'gsap/SplitText';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

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

// Advanced Animations

// Horizontal scroll gallery
export const createHorizontalScroll = (container: string | Element, options: {
  sections: string | Element[];
  speed?: number;
  snap?: boolean;
} = { sections: [] }) => {
  if (prefersReducedMotion()) return;

  const containerEl = typeof container === 'string' ? document.querySelector(container) : container;
  if (!containerEl) return;

  const sections = Array.isArray(options.sections) ? options.sections : 
    typeof options.sections === 'string' ? document.querySelectorAll(options.sections) : [];
  
  if (sections.length === 0) return;

  const totalWidth = sections.length * 100;
  
  gsap.set(sections, { xPercent: (i) => i * 100 });
  
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: containerEl,
      start: 'top top',
      end: `+=${totalWidth}%`,
      scrub: options.speed || 1,
      pin: true,
      snap: options.snap ? { snapTo: 1 / (sections.length - 1), duration: 0.5 } : undefined,
    }
  });

  tl.to(sections, {
    xPercent: (i) => (i - (sections.length - 1)) * 100,
    ease: 'none'
  });

  return tl;
};

// Magnetic element effect
export const createMagneticElement = (element: string | Element, intensity: number = 0.5) => {
  if (prefersReducedMotion()) return;

  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el) return;

  let isHovering = false;

  const onMouseMove = (e: MouseEvent) => {
    if (!isHovering) return;
    
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * intensity;
    const deltaY = (e.clientY - centerY) * intensity;
    
    gsap.to(el, {
      x: deltaX,
      y: deltaY,
      duration: 0.3,
      ease: EASE.POWER2_OUT
    });
  };

  const onMouseEnter = () => {
    isHovering = true;
    gsap.to(el, {
      scale: 1.05,
      duration: MOTION.MICRO,
      ease: EASE.BACK_OUT
    });
  };

  const onMouseLeave = () => {
    isHovering = false;
    gsap.to(el, {
      x: 0,
      y: 0,
      scale: 1,
      duration: MOTION.REVEAL,
      ease: EASE.POWER2_OUT
    });
  };

  el.addEventListener('mousemove', onMouseMove);
  el.addEventListener('mouseenter', onMouseEnter);
  el.addEventListener('mouseleave', onMouseLeave);

  return () => {
    el.removeEventListener('mousemove', onMouseMove);
    el.removeEventListener('mouseenter', onMouseEnter);
    el.removeEventListener('mouseleave', onMouseLeave);
  };
};

// Text morphing animation
export const createTextMorph = (element: string | Element, texts: string[], options: {
  duration?: number;
  stagger?: number;
  trigger?: string | Element;
} = {}) => {
  if (prefersReducedMotion()) return;

  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el || texts.length === 0) return;

  const { duration = 1, stagger = 2, trigger } = options;
  
  const tl = gsap.timeline({ 
    repeat: -1,
    repeatDelay: stagger 
  });

  texts.forEach((text, index) => {
    tl.to(el, {
      text: text,
      duration,
      ease: 'none'
    }, index * (duration + stagger));
  });

  if (trigger) {
    ScrollTrigger.create({
      trigger,
      start: 'top center',
      onEnter: () => tl.play(),
      onLeave: () => tl.pause()
    });
  }

  return tl;
};

// Staggered reveal with clip-path
export const clipPathReveal = (elements: string | Element[], options: {
  direction?: 'left' | 'right' | 'top' | 'bottom';
  stagger?: number;
  duration?: number;
  trigger?: string | Element;
} = {}) => {
  if (prefersReducedMotion()) return;

  const { direction = 'left', stagger = 0.1, duration = MOTION.REVEAL, trigger } = options;
  
  const clipPaths = {
    left: { from: 'inset(0 100% 0 0)', to: 'inset(0 0% 0 0)' },
    right: { from: 'inset(0 0 0 100%)', to: 'inset(0 0% 0 0)' },
    top: { from: 'inset(100% 0 0 0)', to: 'inset(0% 0 0 0)' },
    bottom: { from: 'inset(0 0 100% 0)', to: 'inset(0% 0 0% 0)' }
  };

  gsap.set(elements, { clipPath: clipPaths[direction].from });

  const tl = gsap.timeline();
  tl.to(elements, {
    clipPath: clipPaths[direction].to,
    duration,
    stagger,
    ease: EASE.POWER2_OUT
  });

  if (trigger) {
    ScrollTrigger.create({
      trigger,
      start: 'top 80%',
      onEnter: () => tl.restart()
    });
  }

  return tl;
};

// Number counter animation
export const animateCounter = (element: string | Element, options: {
  from?: number;
  to: number;
  duration?: number;
  ease?: string;
  trigger?: string | Element;
  format?: (value: number) => string;
} = { to: 100 }) => {
  if (prefersReducedMotion()) return;

  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el) return;

  const { from = 0, to, duration = MOTION.SLOW, ease = EASE.POWER2_OUT, trigger, format } = options;
  
  const counter = { value: from };
  
  const tl = gsap.timeline();
  tl.to(counter, {
    value: to,
    duration,
    ease,
    onUpdate: () => {
      const displayValue = format ? format(counter.value) : Math.round(counter.value);
      el.textContent = displayValue.toString();
    }
  });

  if (trigger) {
    ScrollTrigger.create({
      trigger,
      start: 'top 80%',
      onEnter: () => tl.restart()
    });
  }

  return tl;
};

// Smooth page transitions
export const createPageTransition = (options: {
  duration?: number;
  ease?: string;
} = {}) => {
  const { duration = 0.6, ease = EASE.POWER2_OUT } = options;

  const exitAnimation = (element: Element) => {
    return gsap.to(element, {
      opacity: 0,
      y: -50,
      scale: 0.95,
      duration: duration / 2,
      ease
    });
  };

  const enterAnimation = (element: Element) => {
    gsap.set(element, { opacity: 0, y: 50, scale: 0.95 });
    return gsap.to(element, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration,
      ease,
      delay: duration / 4
    });
  };

  return { exitAnimation, enterAnimation };
};

// Scroll-driven progress bar
export const createScrollProgress = (element: string | Element, options: {
  trigger?: string | Element;
  start?: string;
  end?: string;
} = {}) => {
  if (prefersReducedMotion()) return;

  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el) return;

  const { trigger = 'body', start = 'top top', end = 'bottom bottom' } = options;

  return gsap.to(el, {
    scaleX: 1,
    transformOrigin: 'left',
    ease: 'none',
    scrollTrigger: {
      trigger,
      start,
      end,
      scrub: true
    }
  });
};

// Cleanup function for ScrollTrigger
export const cleanupScrollTrigger = () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
};

export default gsap;