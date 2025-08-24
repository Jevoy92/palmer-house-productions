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

// Advanced GSAP Effects

// Horizontal scrolling container
export const createHorizontalScroll = (
  container: string | Element,
  items: string | Element[] | NodeListOf<Element>,
  options: {
    trigger?: string | Element;
    start?: string;
    end?: string;
    snap?: boolean;
  } = {}
) => {
  if (prefersReducedMotion()) return;

  const containerEl = typeof container === 'string' ? document.querySelector(container) : container;
  if (!containerEl) return;

  let itemElements: Element[] = [];
  
  if (typeof items === 'string') {
    itemElements = Array.from(document.querySelectorAll(items));
  } else if (items instanceof NodeList) {
    itemElements = Array.from(items);
  } else {
    itemElements = Array.isArray(items) ? items : [];
  }
  
  if (itemElements.length === 0) return;

  const {
    trigger = containerEl,
    start = 'top top',
    end = `+=${itemElements.length * 100}%`,
    snap = true
  } = options;

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger,
      start,
      end,
      scrub: 1,
      pin: true,
      snap: snap ? {
        snapTo: 1 / itemElements.length,
        duration: { min: 0.2, max: 0.5 },
        delay: 0.1
      } : undefined,
    }
  });

  // Create horizontal scroll animation
  timeline.to(itemElements, {
    xPercent: -100 * (itemElements.length - 1),
    ease: 'none'
  });

  return timeline;
};

// Magnetic button effect
export const magneticButton = (
  button: string | Element,
  options: {
    strength?: number;
    speed?: number;
    scaleFactor?: number;
  } = {}
) => {
  if (prefersReducedMotion()) return;

  const {
    strength = 0.3,
    speed = MOTION.MICRO,
    scaleFactor = 1.05
  } = options;

  const element = typeof button === 'string' ? document.querySelector(button) : button;
  if (!element) return;

  const onMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(element, {
      x: x * strength,
      y: y * strength,
      scale: scaleFactor,
      duration: speed,
      ease: EASE.POWER2_OUT,
    });
  };

  const onMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      scale: 1,
      duration: speed * 2,
      ease: EASE.BACK_OUT,
    });
  };

  element.addEventListener('mousemove', onMouseMove);
  element.addEventListener('mouseleave', onMouseLeave);

  return () => {
    element.removeEventListener('mousemove', onMouseMove);
    element.removeEventListener('mouseleave', onMouseLeave);
  };
};

// Morphing text animation
export const morphText = (
  element: string | Element,
  texts: string[],
  options: {
    duration?: number;
    interval?: number;
    stagger?: number;
  } = {}
) => {
  if (prefersReducedMotion()) return;

  const {
    duration = MOTION.REVEAL,
    interval = 2000,
    stagger = 0.05
  } = options;

  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el) return;

  let currentIndex = 0;
  
  const animate = () => {
    const currentText = texts[currentIndex];
    const nextIndex = (currentIndex + 1) % texts.length;
    const nextText = texts[nextIndex];

    // Split text into characters for stagger effect
    el.innerHTML = currentText.split('').map(char => `<span style="display: inline-block;">${char === ' ' ? '&nbsp;' : char}</span>`).join('');
    
    const chars = el.querySelectorAll('span');
    
    // Animate out current text
    gsap.to(chars, {
      y: -20,
      opacity: 0,
      duration: duration / 2,
      stagger,
      ease: EASE.POWER2_OUT,
      onComplete: () => {
        // Set new text and animate in
        el.innerHTML = nextText.split('').map(char => `<span style="display: inline-block; opacity: 0; transform: translateY(20px);">${char === ' ' ? '&nbsp;' : char}</span>`).join('');
        const newChars = el.querySelectorAll('span');
        
        gsap.to(newChars, {
          y: 0,
          opacity: 1,
          duration: duration / 2,
          stagger,
          ease: EASE.POWER2_OUT,
        });
      }
    });

    currentIndex = nextIndex;
  };

  const intervalId = setInterval(animate, interval);
  
  return () => clearInterval(intervalId);
};

// Scroll-triggered counter animation
export const animateCounter = (
  element: string | Element,
  targetValue: number,
  options: {
    duration?: number;
    trigger?: string | Element;
    start?: string;
    suffix?: string;
    prefix?: string;
  } = {}
) => {
  if (prefersReducedMotion()) {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (el) el.textContent = `${options.prefix || ''}${targetValue}${options.suffix || ''}`;
    return;
  }

  const {
    duration = MOTION.SLOW,
    trigger = element,
    start = 'top 80%',
    suffix = '',
    prefix = ''
  } = options;

  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el) return;

  const counter = { value: 0 };

  return gsap.to(counter, {
    value: targetValue,
    duration,
    ease: EASE.POWER2_OUT,
    onUpdate: () => {
      el.textContent = `${prefix}${Math.round(counter.value)}${suffix}`;
    },
    scrollTrigger: {
      trigger,
      start,
      toggleActions: 'play none none none'
    }
  });
};

// Enhanced cinematic text reveal
export const cinematicReveal = (
  element: string | Element,
  options: {
    splitBy?: 'words' | 'chars' | 'lines';
    stagger?: number;
    duration?: number;
    blur?: boolean;
    scale?: boolean;
  } = {}
) => {
  if (prefersReducedMotion()) {
    gsap.set(element, { opacity: 1 });
    return;
  }

  const {
    splitBy = 'words',
    stagger = 0.08,
    duration = MOTION.REVEAL,
    blur = true,
    scale = false
  } = options;

  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el || !el.textContent) return;

  // Split text based on option
  const text = el.textContent;
  let splitText: string[] = [];
  
  if (splitBy === 'words') {
    splitText = text.split(' ');
  } else if (splitBy === 'chars') {
    splitText = text.split('');
  } else if (splitBy === 'lines') {
    splitText = text.split('\n');
  }

  // Create spans for each part
  el.innerHTML = splitText.map(part => 
    `<span style="display: inline-block; opacity: 0; transform: translateY(20px)${blur ? ' filter: blur(8px);' : ''}${scale ? ' scale(0.8);' : ''}">${part === ' ' || part === '' ? '&nbsp;' : part}${splitBy === 'words' ? '&nbsp;' : ''}</span>`
  ).join('');

  const spans = el.querySelectorAll('span');

  return gsap.to(spans, {
    opacity: 1,
    y: 0,
    filter: blur ? 'blur(0px)' : undefined,
    scale: scale ? 1 : undefined,
    duration,
    stagger,
    ease: EASE.POWER2_OUT,
  });
};

// Cleanup function for ScrollTrigger
export const cleanupScrollTrigger = () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
};

export default gsap;