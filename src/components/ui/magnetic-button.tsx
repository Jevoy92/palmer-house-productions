import { ReactNode, forwardRef, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { createMagneticElement } from '@/lib/gsap';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  intensity?: number;
  variant?: 'default' | 'secondary' | 'outline';
}

export const MagneticButton = forwardRef<HTMLButtonElement, MagneticButtonProps>(
  ({ children, intensity = 0.3, variant = 'default', className, ...props }, ref) => {
    const internalRef = useRef<HTMLButtonElement>(null);
    const buttonRef = ref || internalRef;

    useEffect(() => {
      const element = typeof buttonRef === 'object' && buttonRef?.current;
      if (!element) return;

      const cleanup = createMagneticElement(element, intensity);
      return cleanup;
    }, [intensity, buttonRef]);

    const variants = {
      default: 'bg-social-orange hover:bg-social-orange/90 text-white',
      secondary: 'bg-video-white hover:bg-video-white/90 text-charcoal',
      outline: 'border-2 border-social-orange hover:bg-social-orange text-social-orange hover:text-white'
    };

    return (
      <button
        ref={buttonRef}
        className={cn(
          'px-6 py-3 rounded-lg font-medium transition-colors duration-300',
          'shadow-lg hover:shadow-xl',
          'will-change-transform',
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

MagneticButton.displayName = 'MagneticButton';