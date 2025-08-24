import { useEffect, useRef, forwardRef } from 'react';
import { magneticButton } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import { Button, ButtonProps } from './button';

interface MagneticButtonProps extends ButtonProps {
  magnetStrength?: number;
  scaleOnHover?: number;
  children: React.ReactNode;
}

export const MagneticButton = forwardRef<HTMLButtonElement, MagneticButtonProps>(
  ({ className, magnetStrength = 0.3, scaleOnHover = 1.05, children, ...props }, ref) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const combinedRef = ref || buttonRef;

    useEffect(() => {
      if (!buttonRef.current) return;

      const cleanup = magneticButton(buttonRef.current, {
        strength: magnetStrength,
        scaleFactor: scaleOnHover,
      });

      return cleanup;
    }, [magnetStrength, scaleOnHover]);

    return (
      <Button
        ref={combinedRef}
        className={cn(
          "relative overflow-hidden transition-all duration-300",
          "before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-100%] before:transition-transform before:duration-700",
          "hover:before:translate-x-[100%]",
          className
        )}
        {...props}
      >
        <span className="relative z-10">{children}</span>
      </Button>
    );
  }
);

MagneticButton.displayName = 'MagneticButton';