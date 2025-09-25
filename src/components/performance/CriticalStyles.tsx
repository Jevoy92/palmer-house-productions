import { useEffect } from 'react';

export const CriticalStyles = () => {
  useEffect(() => {
    // Preload critical fonts
    const fontPreloads = [
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
    ];

    fontPreloads.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = href;
      link.onload = function() {
        // @ts-ignore
        this.onload = null;
        // @ts-ignore
        this.rel = 'stylesheet';
      };
      document.head.appendChild(link);
    });

    // Add critical CSS to reduce render blocking
    const criticalCSS = `
      /* Critical above-the-fold styles */
      .hero-section {
        min-height: 100vh;
        display: flex;
        align-items: center;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      }
      
      .hero-text {
        font-size: clamp(2rem, 5vw, 4rem);
        font-weight: 700;
        line-height: 1.2;
        margin-bottom: 1.5rem;
      }
      
      .hero-button {
        min-height: 48px;
        padding: 12px 24px;
        font-size: 1rem;
        font-weight: 600;
        border-radius: 12px;
        transition: all 0.2s ease;
      }
      
      @media (max-width: 768px) {
        .hero-text {
          font-size: clamp(1.5rem, 8vw, 2.5rem);
        }
        
        .hero-button {
          width: 100%;
          margin-bottom: 0.75rem;
        }
      }
    `;

    const style = document.createElement('style');
    style.textContent = criticalCSS;
    document.head.appendChild(style);

    return () => {
      // Cleanup is handled by React
    };
  }, []);

  return null;
};