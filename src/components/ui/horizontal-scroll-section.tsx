import React, { ReactNode, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { createHorizontalScroll } from '@/lib/gsap';

interface HorizontalScrollSectionProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  snap?: boolean;
}

export const HorizontalScrollSection = ({ 
  children, 
  className, 
  speed = 1, 
  snap = true 
}: HorizontalScrollSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !sectionsRef.current) return;

    const sections = sectionsRef.current.children;
    if (sections.length === 0) return;

    const cleanup = createHorizontalScroll(containerRef.current, {
      sections: Array.from(sections),
      speed,
      snap
    });

    return () => {
      if (cleanup && typeof cleanup.kill === 'function') {
        cleanup.kill();
      }
    };
  }, [speed, snap]);

  return (
    <div 
      ref={containerRef}
      className={cn(
        'horizontal-scroll-container overflow-hidden',
        className
      )}
    >
      <div 
        ref={sectionsRef}
        className="flex will-change-transform"
        style={{ width: `${React.Children.count(children) * 100}vw` }}
      >
        {React.Children.map(children, (child, index) => (
          <div 
            key={index}
            className="horizontal-scroll-section flex-shrink-0 w-screen h-screen flex items-center justify-center"
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};