import { useEffect } from 'react';

export const MobileFirstOptimization = () => {
  useEffect(() => {
    // Enhanced mobile-first responsive design optimizations
    const optimizeForMobile = () => {
      // Ensure all interactive elements meet touch target requirements
      const interactiveElements = document.querySelectorAll('button, a[role="button"], .button, input, select, textarea');
      interactiveElements.forEach(element => {
        const el = element as HTMLElement;
        const rect = el.getBoundingClientRect();
        if (rect.height < 44 || rect.width < 44) {
          el.classList.add('min-touch-target');
        }
      });

      // Optimize text readability - ensure minimum 16px font size on mobile to prevent zoom
      if (window.innerWidth < 768) {
        const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea');
        inputs.forEach(input => {
          const inp = input as HTMLElement;
          const computedStyle = window.getComputedStyle(inp);
          const fontSize = parseFloat(computedStyle.fontSize);
          if (fontSize < 16) {
            inp.style.fontSize = '16px';
          }
        });
      }

      // Handle horizontal overflow gracefully
      const containers = document.querySelectorAll('[data-overflow-check]');
      containers.forEach(container => {
        const cont = container as HTMLElement;
        if (cont.scrollWidth > cont.clientWidth) {
          cont.style.overflowX = 'auto';
          cont.style.scrollbarWidth = 'thin';
        }
      });
    };

    // Performance-optimized scroll observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -10% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          element.classList.add('animate-fade-in');
        }
      });
    }, observerOptions);

    // Observe sections with animation potential
    const sections = document.querySelectorAll('section[data-animate]');
    sections.forEach(section => observer.observe(section));

    // Initial optimization
    optimizeForMobile();

    // Throttled resize handler for performance
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(optimizeForMobile, 150);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      clearTimeout(resizeTimeout);
    };
  }, []);

  return null;
};