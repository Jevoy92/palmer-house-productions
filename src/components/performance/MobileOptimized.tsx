import { ReactNode } from 'react';

interface MobileOptimizedProps {
  children: ReactNode;
  className?: string;
}

// Component that applies mobile-first optimizations
export const MobileOptimized = ({ children, className = "" }: MobileOptimizedProps) => {
  return (
    <div className={`
      /* Touch optimizations */
      touch-manipulation
      /* Prevent tap highlight on mobile */
      [&_button]:select-none
      [&_a]:select-none
      /* Ensure minimum touch target size */
      [&_button]:min-h-[44px]
      [&_button]:min-w-[44px]
      /* Improve text rendering */
      antialiased
      ${className}
    `}>
      {children}
    </div>
  );
};

// Hook for mobile-specific styles
export const useMobileStyles = () => {
  return {
    // Mobile-optimized button styles
    mobileButton: `
      min-h-[48px] 
      px-6 py-3 
      text-base 
      font-medium 
      touch-manipulation 
      select-none
      transition-all duration-200
      active:scale-95
    `,
    // Mobile-optimized text styles
    mobileHeading: `
      text-2xl sm:text-3xl lg:text-4xl xl:text-5xl
      font-bold
      leading-tight
      tracking-tight
    `,
    // Mobile-optimized grid
    mobileGrid: `
      grid 
      grid-cols-1 
      gap-4 
      sm:gap-6 
      md:gap-8
      sm:grid-cols-2 
      lg:grid-cols-3 
      xl:grid-cols-4
    `,
    // Mobile-optimized card
    mobileCard: `
      bg-card 
      rounded-2xl 
      p-4 sm:p-6 lg:p-8 
      shadow-lg 
      border 
      border-border
      transition-all duration-200
      hover:shadow-xl
      active:scale-[0.98]
    `
  };
};