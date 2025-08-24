import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { createTextMorph } from '@/lib/gsap';

interface MorphingTextProps {
  texts: string[];
  className?: string;
  duration?: number;
  stagger?: number;
  triggerElement?: string;
}

export const MorphingText = ({ 
  texts, 
  className, 
  duration = 1, 
  stagger = 2,
  triggerElement 
}: MorphingTextProps) => {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!textRef.current || texts.length === 0) return;

    const cleanup = createTextMorph(textRef.current, texts, {
      duration,
      stagger,
      trigger: triggerElement
    });

    return () => {
      if (cleanup && typeof cleanup.kill === 'function') {
        cleanup.kill();
      }
    };
  }, [texts, duration, stagger, triggerElement]);

  return (
    <span 
      ref={textRef}
      className={cn('morphing-text', className)}
    >
      {texts[0] || ''}
    </span>
  );
};