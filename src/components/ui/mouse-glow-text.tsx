import { useMouseGlow } from '../../hooks/useMouseGlow';
import { prefersReducedMotion } from '../../lib/animationUtils';

interface MouseGlowTextProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  intensity?: number;
  radius?: number;
}

export const MouseGlowText = ({ 
  children, 
  className = '', 
  glowColor = 'hsl(var(--social-orange))',
  intensity = 0.8,
  radius = 120
}: MouseGlowTextProps) => {
  const { elementRef, isHovered, glowStyle } = useMouseGlow({ intensity, radius });

  if (prefersReducedMotion()) {
    return <span className={className}>{children}</span>;
  }

  return (
    <span
      ref={elementRef}
      className={`relative inline-block cursor-pointer ${className}`}
      style={glowStyle}
    >
      {/* Base text layer */}
      <span className="relative z-10 select-none">
        {children}
      </span>
      
      {/* Glow effect layer */}
      <span
        className={`absolute inset-0 select-none transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: `radial-gradient(${radius}px circle at var(--mouse-x) var(--mouse-y), ${glowColor} 0%, transparent 50%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: `brightness(${1 + intensity})`,
        }}
      >
        {children}
      </span>
      
      {/* Additional glow layer for more intensity */}
      <span
        className={`absolute inset-0 select-none transition-opacity duration-500 ${
          isHovered ? 'opacity-70' : 'opacity-0'
        }`}
        style={{
          background: `radial-gradient(${radius * 1.5}px circle at var(--mouse-x) var(--mouse-y), ${glowColor} 0%, transparent 30%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: 'blur(2px)',
          zIndex: -1,
        }}
      >
        {children}
      </span>
    </span>
  );
};