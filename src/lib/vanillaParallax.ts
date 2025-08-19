// Vanilla parallax controller using data-speed attributes
// Positive speeds move with scroll, negative speeds move counter to scroll

export const initVanillaParallax = (): (() => void) => {
  const items = Array.from(document.querySelectorAll('[data-parallax]')) as HTMLElement[];
  
  if (!items.length) {
    return () => {}; // Return empty cleanup function
  }

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    // Disable parallax for users who prefer reduced motion
    items.forEach(el => {
      el.style.transform = 'none';
    });
    return () => {};
  }

  let scrollY = 0;
  let ticking = false;
  
  // Extract speeds once for performance
  const speeds = items.map(el => parseFloat(el.dataset.speed || '0.1'));

  const updateParallax = () => {
    items.forEach((el, i) => {
      const speed = speeds[i];
      const yPos = scrollY * speed;
      el.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });
    ticking = false;
  };

  const onScroll = () => {
    scrollY = window.scrollY || window.pageYOffset;
    
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  };

  // Initial positioning
  onScroll();
  
  // Add scroll listener with passive flag for better performance
  window.addEventListener('scroll', onScroll, { passive: true });

  // Return cleanup function
  return () => {
    window.removeEventListener('scroll', onScroll);
    // Reset transforms
    items.forEach(el => {
      el.style.transform = '';
    });
  };
};