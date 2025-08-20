// Animation utility functions for performance optimization

export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const createRipple = (event: React.MouseEvent, element: HTMLElement) => {
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;
  
  const ripple = document.createElement('span');
  ripple.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    left: ${x}px;
    top: ${y}px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    pointer-events: none;
    animation: ripple 0.6s linear;
    z-index: 1;
  `;
  
  element.appendChild(ripple);
  
  setTimeout(() => {
    ripple.remove();
  }, 600);
};

export const observeAnimationElements = () => {
  if (prefersReducedMotion()) return;
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          element.classList.add('animate-fade-in');
          observer.unobserve(element);
        }
      });
    },
    { threshold: 0.1, rootMargin: '50px' }
  );

  // Observe all elements with data-animate attribute
  document.querySelectorAll('[data-animate]').forEach((el) => {
    observer.observe(el);
  });

  return observer;
};

export const staggerAnimation = (elements: NodeListOf<Element>, delay = 100) => {
  if (prefersReducedMotion()) return;
  
  elements.forEach((element, index) => {
    const htmlElement = element as HTMLElement;
    htmlElement.style.animationDelay = `${index * delay}ms`;
    htmlElement.classList.add('animate-fade-in');
  });
};

// Performance optimized scroll handler
export const createScrollHandler = (callback: () => void) => {
  let ticking = false;
  
  return () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        callback();
        ticking = false;
      });
      ticking = true;
    }
  };
};