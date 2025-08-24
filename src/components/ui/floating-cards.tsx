import { useEffect, useRef } from 'react';
import { scrollReveal, cleanupScrollTrigger } from '@/lib/gsap';
import { Card } from './card';

interface FloatingCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  delay?: number;
}

interface FloatingCardsProps {
  cards: FloatingCard[];
  className?: string;
}

export const FloatingCards = ({ cards, className = '' }: FloatingCardsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Set up scroll-triggered reveals
    scrollReveal(containerRef.current, '.floating-card', {
      stagger: 0.15,
      start: 'top 85%'
    });

    return () => cleanupScrollTrigger();
  }, []);

  return (
    <div ref={containerRef} className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {cards.map((card, index) => (
        <Card 
          key={index}
          className="floating-card relative overflow-hidden bg-gradient-to-br from-video-black/80 to-video-black/40 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 group cursor-pointer opacity-0"
          style={{ animationDelay: `${card.delay || index * 0.1}s` }}
        >
          {/* Background gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
          
          {/* Content */}
          <div className="relative z-10 p-6">
            <div className="mb-4 text-2xl group-hover:scale-110 transition-transform duration-300">
              {card.icon}
            </div>
            
            <h3 className="text-xl font-bold text-video-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-white/70 transition-all duration-300">
              {card.title}
            </h3>
            
            <p className="text-sm text-video-white/70 group-hover:text-video-white/90 transition-colors duration-300 leading-relaxed">
              {card.description}
            </p>
          </div>

          {/* Hover effect shimmer */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
        </Card>
      ))}
    </div>
  );
};