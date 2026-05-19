import { useEffect } from 'react';

// Critical CSS that should be inlined for above-the-fold content
const criticalCSS = `
  /* Above-the-fold critical styles */
  .hero-section {
    min-height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .navigation {
    position: sticky;
    top: 0;
    z-index: 50;
    backdrop-filter: blur(8px);
  }
  
  /* Prevent layout shift */
  .aspect-video {
    aspect-ratio: 16 / 9;
  }
  
  .aspect-square {
    aspect-ratio: 1 / 1;
  }
  
  /* Font display optimization */
  @font-face {
    font-family: 'Inter';
    font-display: swap;
  }
  
  /* Reduce cumulative layout shift */
  img, video {
    height: auto;
    max-width: 100%;
  }
  
  /* Smooth transitions */
  * {
    transition-property: opacity, transform;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 200ms;
  }
`;

export const CriticalCSS = () => {
  useEffect(() => {
    // Inject critical CSS if not already present
    if (!document.querySelector('#critical-css')) {
      const style = document.createElement('style');
      style.id = 'critical-css';
      style.textContent = criticalCSS;
      document.head.insertBefore(style, document.head.firstChild);
    }

    // Preconnect to external domains
    const preconnectDomains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://payhip.com',
      'https://palmerhouseproductions.zohobookings.com'
    ];

    preconnectDomains.forEach(domain => {
      if (!document.querySelector(`link[href="${domain}"]`)) {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      }
    });

    // Resource hints for better performance
    const resourceHints = [
      { rel: 'dns-prefetch', href: 'https://www.googletagmanager.com' },
      { rel: 'dns-prefetch', href: 'https://www.google-analytics.com' }
    ];

    resourceHints.forEach(hint => {
      if (!document.querySelector(`link[href="${hint.href}"]`)) {
        const link = document.createElement('link');
        link.rel = hint.rel;
        link.href = hint.href;
        document.head.appendChild(link);
      }
    });

  }, []);

  return null;
};