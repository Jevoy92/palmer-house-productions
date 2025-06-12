
import { useEffect, useRef, useState } from 'react';

interface UseAnimatedCounterProps {
  end: number;
  duration?: number;
  start?: number;
  prefix?: string;
  suffix?: string;
}

export const useAnimatedCounter = ({ 
  end, 
  duration = 2000, 
  start = 0, 
  prefix = '', 
  suffix = '' 
}: UseAnimatedCounterProps) => {
  const [count, setCount] = useState(start);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsVisible(true);
          hasAnimated.current = true;
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTimestamp: number;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      const currentCount = Math.floor(progress * (end - start) + start);
      setCount(currentCount);
      
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    
    requestAnimationFrame(step);
  }, [isVisible, end, start, duration]);

  const displayValue = end === Infinity ? '∞' : `${prefix}${count.toLocaleString()}${suffix}`;

  return { ref, displayValue, isAnimating: isVisible && count < end };
};
