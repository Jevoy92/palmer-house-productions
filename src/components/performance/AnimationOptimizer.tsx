import { useEffect } from 'react';

export const AnimationOptimizer = () => {
  useEffect(() => {
    // Detect if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      document.documentElement.style.setProperty('--animation-duration', '0.01ms');
      document.documentElement.style.setProperty('--transition-duration', '0.01ms');
    }

    // Optimize animations for better performance
    const optimizeAnimations = () => {
      const animatedElements = document.querySelectorAll('[class*="transition"], [class*="animate"]');
      
      animatedElements.forEach((element) => {
        const htmlElement = element as HTMLElement;
        
        // Add will-change only when needed
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              htmlElement.style.willChange = 'transform, opacity';
            } else {
              htmlElement.style.willChange = 'auto';
            }
          });
        });
        
        observer.observe(htmlElement);
      });
    };

    // Run optimization after DOM is loaded
    setTimeout(optimizeAnimations, 100);

    // Optimize scroll-triggered animations
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // Pause animations for elements far from viewport
      const animatedElements = document.querySelectorAll('.animate-on-scroll');
      animatedElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const isNearViewport = rect.top < viewportHeight * 1.5 && rect.bottom > -viewportHeight * 0.5;
        
        if (!isNearViewport) {
          (element as HTMLElement).style.animationPlayState = 'paused';
        } else {
          (element as HTMLElement).style.animationPlayState = 'running';
        }
      });
    };

    // Throttle scroll handler
    let scrollTimeout: NodeJS.Timeout;
    const throttledScroll = () => {
      if (scrollTimeout) return;
      scrollTimeout = setTimeout(() => {
        handleScroll();
        scrollTimeout = null as any;
      }, 16); // ~60fps
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, []);

  return null;
};