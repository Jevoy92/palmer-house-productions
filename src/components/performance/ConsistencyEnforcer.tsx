import { useEffect } from 'react';

export const ConsistencyEnforcer = () => {
  useEffect(() => {
    // Standardize button hover effects
    const standardizeButtons = () => {
      const buttons = document.querySelectorAll('button, [role="button"], .btn');
      
      buttons.forEach((button) => {
        const htmlButton = button as HTMLElement;
        
        // Remove inconsistent transition classes
        htmlButton.classList.remove('transition-all');
        
        // Add standardized classes
        if (!htmlButton.classList.contains('interactive-element')) {
          htmlButton.classList.add('interactive-element');
        }
      });
    };

    // Standardize card hover effects
    const standardizeCards = () => {
      const cards = document.querySelectorAll('.group, [class*="hover:scale"]');
      
      cards.forEach((card) => {
        const htmlCard = card as HTMLElement;
        
        // Remove inconsistent hover effects
        htmlCard.classList.remove('hover:scale-105', 'hover:scale-[1.02]');
        
        // Add standardized hover effect
        if (!htmlCard.classList.contains('hover-lift')) {
          htmlCard.classList.add('hover-lift');
        }
      });
    };

    // Apply font loading optimization
    const optimizeFonts = () => {
      // Preload critical fonts
      const criticalFonts = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap'
      ];

      criticalFonts.forEach(fontUrl => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = fontUrl;
        link.onload = () => {
          link.rel = 'stylesheet';
        };
        document.head.appendChild(link);
      });
    };

    // Optimize image loading
    const optimizeImages = () => {
      const images = document.querySelectorAll('img[loading="lazy"]');
      
      images.forEach((img) => {
        const htmlImg = img as HTMLImageElement;
        
        // Add proper error handling
        htmlImg.addEventListener('error', () => {
          htmlImg.style.display = 'none';
          console.warn(`Failed to load image: ${htmlImg.src}`);
        });
        
        // Add loading placeholder
        if (!htmlImg.complete) {
          htmlImg.style.backgroundColor = 'hsl(var(--muted))';
          htmlImg.style.minHeight = '200px';
        }
      });
    };

    // Run optimizations
    const runOptimizations = () => {
      standardizeButtons();
      standardizeCards();
      optimizeFonts();
      optimizeImages();
    };

    // Initial run
    runOptimizations();

    // Run again after dynamic content loads
    const observer = new MutationObserver((mutations) => {
      let shouldOptimize = false;
      
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          shouldOptimize = true;
        }
      });
      
      if (shouldOptimize) {
        setTimeout(runOptimizations, 100);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
};