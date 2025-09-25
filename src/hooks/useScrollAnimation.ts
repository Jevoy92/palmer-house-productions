import { useEffect } from 'react';

export const useScrollAnimation = () => {
  useEffect(() => {
    const animateElements = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
        if (isVisible) {
          element.classList.add('opacity-100', 'translate-y-0');
          element.classList.remove('opacity-0', 'translate-y-10');
        }
      });
    };

    // Initial check
    animateElements();
    
    // Add scroll listener
    window.addEventListener('scroll', animateElements);
    
    return () => {
      window.removeEventListener('scroll', animateElements);
    };
  }, []);
};