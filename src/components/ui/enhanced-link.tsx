import { ReactNode, useState } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface EnhancedLinkProps extends LinkProps {
  children: ReactNode;
  variant?: 'default' | 'underline' | 'button' | 'card';
  showRipple?: boolean;
  className?: string;
}

export const EnhancedLink = ({ 
  children, 
  variant = 'default',
  showRipple = true,
  className,
  ...props 
}: EnhancedLinkProps) => {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (showRipple && e.currentTarget) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const newRipple = {
        id: Date.now(),
        x,
        y
      };
      
      setRipples(prev => [...prev, newRipple]);
      
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
      }, 600);
    }
    
    props.onClick?.(e);
  };

  const variants = {
    default: "hover-lift",
    underline: "link-underline",
    button: "hover-glow click-feedback",
    card: "card-float"
  };

  return (
    <Link
      {...props}
      onClick={handleClick}
      className={cn(
        "relative overflow-hidden",
        variants[variant],
        className
      )}
    >
      {children}
      
      {/* Ripple Effects */}
      {showRipple && ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute pointer-events-none rounded-full bg-video-white/20 animate-ping"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
            animationDuration: '0.6s'
          }}
        />
      ))}
    </Link>
  );
};