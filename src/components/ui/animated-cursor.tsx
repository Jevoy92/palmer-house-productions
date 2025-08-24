import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { prefersReducedMotion } from '@/lib/gsap';

export const AnimatedCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !cursorRef.current || !followerRef.current) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;

    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0.1,
        ease: 'power2.out'
      });
      
      gsap.to(follower, {
        x: mouseX,
        y: mouseY,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const onMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (target.matches('button, a, [role="button"]')) {
        gsap.to([cursor, follower], {
          scale: 1.5,
          duration: 0.2,
          ease: 'back.out(1.8)'
        });
      }
    };

    const onMouseLeave = () => {
      gsap.to([cursor, follower], {
        scale: 1,
        duration: 0.2,
        ease: 'power2.out'
      });
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', onMouseEnter, true);
    document.addEventListener('mouseleave', onMouseLeave, true);

    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter, true);
      document.removeEventListener('mouseleave', onMouseLeave, true);
      document.body.style.cursor = 'auto';
    };
  }, []);

  if (prefersReducedMotion()) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-4 h-4 bg-social-orange rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 border border-social-orange/50 rounded-full pointer-events-none z-[9998]"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  );
};