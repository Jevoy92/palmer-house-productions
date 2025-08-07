import { useEffect } from 'react';

export const MobileFirstOptimization = () => {
  useEffect(() => {
    // Mobile-first responsive design enhancements
    const optimizeForMobile = () => {
      // Fix button touch targets
      const buttons = document.querySelectorAll('button, a[role="button"], .button');
      buttons.forEach(button => {
        const btn = button as HTMLElement;
        const rect = btn.getBoundingClientRect();
        if (rect.height < 44 || rect.width < 44) {
          btn.style.minHeight = '44px';
          btn.style.minWidth = '44px';
          btn.style.padding = '12px 16px';
        }
      });

      // Optimize text for mobile readability
      const textElements = document.querySelectorAll('p, span, div');
      textElements.forEach(element => {
        const el = element as HTMLElement;
        if (window.innerWidth < 768) {
          const computedStyle = window.getComputedStyle(el);
          const fontSize = parseFloat(computedStyle.fontSize);
          if (fontSize < 16) {
            el.style.fontSize = '16px';
          }
        }
      });

      // Fix horizontal overflow
      const containers = document.querySelectorAll('div, section');
      containers.forEach(container => {
        const cont = container as HTMLElement;
        if (cont.scrollWidth > cont.clientWidth) {
          cont.style.overflowX = 'auto';
        }
      });

      // Optimize form inputs for mobile
      const inputs = document.querySelectorAll('input, textarea, select');
      inputs.forEach(input => {
        const inp = input as HTMLElement;
        inp.style.minHeight = '44px';
        inp.style.fontSize = '16px'; // Prevents zoom on iOS
      });
    };

    // Run optimization on load and resize
    optimizeForMobile();
    window.addEventListener('resize', optimizeForMobile);

    // Intersection Observer for performance
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          element.classList.add('animate-fade-in');
        }
      });
    });

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => observer.observe(section));

    return () => {
      window.removeEventListener('resize', optimizeForMobile);
      observer.disconnect();
    };
  }, []);

  return null;
};