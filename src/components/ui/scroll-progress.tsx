import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { createScrollProgress } from '@/lib/gsap';

interface ScrollProgressProps {
  className?: string;
  trigger?: string;
  height?: string;
}

export const ScrollProgress = ({ 
  className, 
  trigger = 'body',
  height = '4px' 
}: ScrollProgressProps) => {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!progressRef.current) return;

    const cleanup = createScrollProgress(progressRef.current, {
      trigger
    });

    return () => {
      if (cleanup && typeof cleanup.kill === 'function') {
        cleanup.kill();
      }
    };
  }, [trigger]);

  return (
    <div 
      className={cn(
        'fixed top-0 left-0 z-50 bg-social-orange origin-left',
        className
      )}
      style={{ 
        width: '100%', 
        height,
        transform: 'scaleX(0)'
      }}
      ref={progressRef}
    />
  );
};