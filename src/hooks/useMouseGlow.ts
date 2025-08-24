import { useState, useEffect, useCallback, useRef } from 'react';
import { prefersReducedMotion } from '../lib/animationUtils';

interface MousePosition {
  x: number;
  y: number;
}

interface UseMouseGlowOptions {
  intensity?: number;
  radius?: number;
}

export const useMouseGlow = (options: UseMouseGlowOptions = {}) => {
  const { intensity = 0.8, radius = 150 } = options;
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const elementRef = useRef<HTMLElement>(null);
  const requestRef = useRef<number>();

  const updateMousePosition = useCallback((clientX: number, clientY: number) => {
    if (!elementRef.current) return;

    const rect = elementRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;

    setMousePosition({ x, y });
  }, []);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (prefersReducedMotion()) return;
    
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
    
    requestRef.current = requestAnimationFrame(() => {
      updateMousePosition(event.clientX, event.clientY);
    });
  }, [updateMousePosition]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave]);

  const glowStyle = {
    '--mouse-x': `${mousePosition.x}%`,
    '--mouse-y': `${mousePosition.y}%`,
    '--glow-intensity': intensity,
    '--glow-radius': `${radius}px`,
  } as React.CSSProperties;

  return {
    elementRef,
    isHovered,
    glowStyle,
    mousePosition,
  };
};