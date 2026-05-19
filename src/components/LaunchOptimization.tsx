import { useEffect } from 'react';

// Launch optimization utilities
export const LaunchOptimization = () => {
  useEffect(() => {
    // SEO Optimization
    const metaViewport = document.querySelector('meta[name="viewport"]');
    if (!metaViewport) {
      const viewport = document.createElement('meta');
      viewport.setAttribute('name', 'viewport');
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
      document.head.appendChild(viewport);
    }

    // Performance optimization
    const preconnect = document.createElement('link');
    preconnect.setAttribute('rel', 'preconnect');
    preconnect.setAttribute('href', 'https://fonts.googleapis.com');
    document.head.appendChild(preconnect);

    // Analytics optimization
    const gtag = document.createElement('script');
    gtag.setAttribute('async', '');
    gtag.setAttribute('src', 'https://www.googletagmanager.com/gtag/js?id=G-HTFNMQRWLL');
    document.head.appendChild(gtag);

    // Mobile touch optimization
    document.documentElement.style.setProperty('touch-action', 'manipulation');
    
    // Accessibility improvements
    const skipLink = document.querySelector('a[href="#main-content"]');
    if (skipLink) {
      skipLink.addEventListener('focus', () => {
        skipLink.scrollIntoView({ behavior: 'smooth' });
      });
    }

  }, []);

  return null;
};

// Button text overflow fix utility
export const fixButtonOverflow = () => {
  const buttons = document.querySelectorAll('button, .button');
  buttons.forEach(button => {
    const element = button as HTMLElement;
    if (element.scrollWidth > element.clientWidth) {
      element.style.whiteSpace = 'normal';
      element.style.lineHeight = '1.2';
      element.style.padding = '12px 16px';
    }
  });
};

// Mobile responsiveness check
export const checkMobileResponsiveness = () => {
  const elements = document.querySelectorAll('[class*="text-"], [class*="px-"], [class*="py-"]');
  elements.forEach(element => {
    const el = element as HTMLElement;
    if (window.innerWidth < 768) {
      // Ensure minimum touch targets
      if (el.offsetHeight < 44) {
        el.style.minHeight = '44px';
      }
      // Fix text sizing for mobile
      if (el.textContent && el.textContent.length > 20) {
        el.style.wordBreak = 'break-word';
        el.style.hyphens = 'auto';
      }
    }
  });
};

// SEO optimization utilities
export const optimizeSEO = () => {
  // Ensure all images have alt text
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    if (!img.alt) {
      img.alt = 'Palmer House Productions - Professional Video Production';
    }
  });

  // Ensure all links have titles where appropriate
  const externalLinks = document.querySelectorAll('a[href^="http"]');
  externalLinks.forEach(link => {
    if (!link.getAttribute('title')) {
      link.setAttribute('title', link.textContent || 'External link');
    }
    if (!link.getAttribute('rel')) {
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });

  // Add structured data for contact information
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Palmer House Productions",
    "description": "Get in touch with Palmer House Productions for professional video production services.",
    "provider": {
      "@type": "Organization",
      "name": "Palmer House Productions",
      "url": "https://www.palmerhouseproductions.com"
    }
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(contactSchema);
  document.head.appendChild(script);
};