import { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export const PageTransition = ({ children, className }: PageTransitionProps) => {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayLocation, setDisplayLocation] = useState(location);

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setIsTransitioning(true);
      
      // Start exit animation
      const exitTimer = setTimeout(() => {
        setDisplayLocation(location);
        
        // Start enter animation
        const enterTimer = setTimeout(() => {
          setIsTransitioning(false);
        }, 50);

        return () => clearTimeout(enterTimer);
      }, 300);

      return () => clearTimeout(exitTimer);
    }
  }, [location, displayLocation]);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className={cn(
        "transition-all duration-300 ease-power2-out",
        isTransitioning 
          ? "opacity-0 translate-y-4 scale-[0.98]" 
          : "opacity-100 translate-y-0 scale-100"
      )}>
        {children}
      </div>
      
      {/* Loading overlay */}
      {isTransitioning && (
        <div className="absolute inset-0 bg-video-white/20 backdrop-blur-sm flex items-center justify-center z-10">
          <div className="loading-spinner" />
        </div>
      )}
    </div>
  );
};