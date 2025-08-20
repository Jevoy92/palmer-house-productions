import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface PreloaderProps {
  onComplete?: () => void;
  className?: string;
}

export const Preloader = ({ onComplete, className }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsVisible(false);
            onComplete?.();
          }, 500);
          return 100;
        }
        return prev + Math.random() * 2 + 3; // Slower increment for 2-second duration
      });
    }, 80); // Slightly faster interval for smoother animation

    return () => clearInterval(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className={cn(
      "fixed inset-0 z-50 bg-cinematic-charcoal flex items-center justify-center",
      "transition-opacity duration-500",
      progress >= 100 ? "opacity-0" : "opacity-100",
      className
    )}>
      <div className="text-center space-y-8">
        {/* Logo Animation */}
        <div className="relative">
          <div className="text-6xl font-bold text-video-white animate-pulse">
            PH
          </div>
          <div className="absolute inset-0 text-6xl font-bold text-transparent bg-gradient-cinematic-primary bg-clip-text animate-fade-blur-in">
            PH
          </div>
        </div>

        {/* Company Name */}
        <div className="animate-slide-in-left" style={{ animationDelay: '0.3s' }}>
          <h1 className="text-2xl font-semibold text-video-white tracking-wide">
            Palmer House Productions
          </h1>
          <p className="text-cinematic-glow text-sm mt-2">
            Crafting Your Story
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-80 mx-auto space-y-3" style={{ animationDelay: '0.6s' }}>
          <div className="h-1 bg-cinematic-dark rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-cinematic-primary transition-all duration-300 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-cinematic-glow">
            <span>Loading...</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="hero-orb hero-orb--1 w-32 h-32 absolute top-20 left-20 animate-float-gentle" />
          <div className="hero-orb hero-orb--2 w-24 h-24 absolute bottom-20 right-20 animate-float-gentle" style={{ animationDelay: '2s' }} />
        </div>
      </div>
    </div>
  );
};