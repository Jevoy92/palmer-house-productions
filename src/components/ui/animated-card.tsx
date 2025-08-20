import { ReactNode, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'float' | 'lift' | 'glow' | 'pulse';
  animateOnScroll?: boolean;
}

export const AnimatedCard = forwardRef<HTMLDivElement, AnimatedCardProps>(
  ({ children, variant = 'float', animateOnScroll = true, className, ...props }, ref) => {
    const variants = {
      float: 'card-float',
      lift: 'hover-lift',
      glow: 'hover-glow',
      pulse: 'hover-pulse'
    };

    return (
      <div
        ref={ref}
        data-animate={animateOnScroll ? 'true' : undefined}
        className={cn(
          'transform-gpu',
          variants[variant],
          animateOnScroll && 'opacity-0',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

AnimatedCard.displayName = 'AnimatedCard';