import { ReactNode, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { createRipple } from '@/lib/animationUtils';

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'default' | 'glow' | 'lift' | 'pulse';
  showRipple?: boolean;
}

export const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ children, variant = 'default', showRipple = true, className, onClick, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (showRipple && e.currentTarget) {
        createRipple(e, e.currentTarget);
      }
      onClick?.(e);
    };

    const variants = {
      default: 'hover-lift click-feedback',
      glow: 'hover-glow click-feedback',
      lift: 'hover-lift',
      pulse: 'hover-pulse'
    };

    return (
      <button
        ref={ref}
        onClick={handleClick}
        className={cn(
          'relative overflow-hidden',
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

AnimatedButton.displayName = 'AnimatedButton';