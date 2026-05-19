import React, { useState, useEffect } from 'react';

interface ScrollBarsProps {
  className?: string;
}

export const ScrollBars: React.FC<ScrollBarsProps> = ({ className = '' }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate individual bar heights based on scroll progress
  const getBarHeight = (barIndex: number) => {
    const triggerPoint = (barIndex * 25); // Each bar triggers at 25% intervals
    const barProgress = Math.max(0, Math.min(25, scrollProgress - triggerPoint));
    return (barProgress / 25) * 100; // Convert to percentage
  };

  return (
    <div className={`fixed left-0 top-0 w-full h-full pointer-events-none z-30 ${className}`}>
      <div className="flex w-full h-full">
        {/* Bar 1 - Orange (Reel Pal) */}
        <div className="flex-1 relative overflow-hidden">
          <div 
            className="absolute bottom-0 left-0 w-full transition-all duration-700 ease-out"
            style={{
              height: `${getBarHeight(0)}%`,
              background: 'hsl(22 89% 58%)',
              opacity: scrollProgress > 0 ? 0.15 : 0
            }}
          />
        </div>
        
        {/* Bar 2 - Purple (System Pal) */}
        <div className="flex-1 relative overflow-hidden">
          <div 
            className="absolute bottom-0 left-0 w-full transition-all duration-700 ease-out"
            style={{
              height: `${getBarHeight(1)}%`,
              background: 'hsl(253 55% 62%)',
              opacity: scrollProgress > 25 ? 0.15 : 0
            }}
          />
        </div>
        
        {/* Bar 3 - Green (Evergreen Pal) */}
        <div className="flex-1 relative overflow-hidden">
          <div 
            className="absolute bottom-0 left-0 w-full transition-all duration-700 ease-out"
            style={{
              height: `${getBarHeight(2)}%`,
              background: 'hsl(111 46% 55%)',
              opacity: scrollProgress > 50 ? 0.15 : 0
            }}
          />
        </div>
        
        {/* Bar 4 - Blue (Spotlight Pal) */}
        <div className="flex-1 relative overflow-hidden">
          <div 
            className="absolute bottom-0 left-0 w-full transition-all duration-700 ease-out"
            style={{
              height: `${getBarHeight(3)}%`,
              background: 'hsl(214 63% 57%)',
              opacity: scrollProgress > 75 ? 0.15 : 0
            }}
          />
        </div>
      </div>
    </div>
  );
};