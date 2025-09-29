import { useEffect } from 'react';

export const AnimationOptimizer = () => {
  useEffect(() => {
    // Detect if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      document.documentElement.style.setProperty('--animation-duration', '0.01ms');
      document.documentElement.style.setProperty('--transition-duration', '0.01ms');
    }

    // For mobile, reduce animation complexity to prevent jank
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
      // Reduce transition durations on mobile
      document.documentElement.style.setProperty('--transition-duration', '200ms');
      
      // Disable will-change manipulations on mobile (they cause more harm than good)
      const style = document.createElement('style');
      style.textContent = `
        * {
          will-change: auto !important;
        }
        .transition-opacity {
          transition-duration: 200ms !important;
        }
      `;
      document.head.appendChild(style);
      
      return () => {
        document.head.removeChild(style);
      };
    }
  }, []);

  return null;
};