import { useEffect, useRef } from 'react';
import { Play, Zap, Target, Layers, Rocket, Users } from 'lucide-react';
import { FloatingCards } from './ui/floating-cards';
import { cinematicReveal, morphText, animateCounter } from '@/lib/gsap';

export const ShowcaseSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const morphRef = useRef<HTMLSpanElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  const showcaseCards = [
    {
      title: 'Cinematic Storytelling',
      description: 'Transform your brand narrative with movie-quality production values and compelling visual storytelling.',
      icon: <Play className="w-8 h-8" />,
      color: 'from-social-orange to-social-pink'
    },
    {
      title: 'Lightning Fast Delivery',
      description: 'Rapid turnaround times without compromising quality. Get your content when you need it.',
      icon: <Zap className="w-8 h-8" />,
      color: 'from-social-blue to-social-cyan'
    },
    {
      title: 'Precision Targeting',
      description: 'Content designed specifically for your audience and platform requirements.',
      icon: <Target className="w-8 h-8" />,
      color: 'from-social-purple to-social-pink'
    },
    {
      title: 'Scalable Systems',
      description: 'Build content libraries that grow with your business and adapt to changing needs.',
      icon: <Layers className="w-8 h-8" />,
      color: 'from-social-cyan to-social-blue'
    },
    {
      title: 'Growth Acceleration',
      description: 'Fuel your business expansion with content that converts and builds authority.',
      icon: <Rocket className="w-8 h-8" />,
      color: 'from-social-pink to-social-purple'
    },
    {
      title: 'Team Collaboration',
      description: 'Seamlessly integrate with your team and existing workflows for maximum efficiency.',
      icon: <Users className="w-8 h-8" />,
      color: 'from-social-orange to-social-cyan'
    }
  ];

  const morphTexts = [
    'Revolutionary',
    'Cinematic', 
    'Professional',
    'Scalable',
    'Strategic'
  ];

  useEffect(() => {
    // Cinematic title reveal
    if (titleRef.current) {
      cinematicReveal(titleRef.current, {
        splitBy: 'words',
        stagger: 0.15,
        blur: true,
        scale: true
      });
    }

    // Morphing text animation
    if (morphRef.current) {
      morphText(morphRef.current, morphTexts, {
        interval: 2500,
        duration: 0.8
      });
    }

    // Counter animation
    if (counterRef.current) {
      animateCounter(counterRef.current, 500, {
        suffix: '+',
        prefix: '',
        duration: 2
      });
    }
  }, []);

  return (
    <section className="relative py-20 lg:py-32 bg-video-black overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-social-purple/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-social-blue/10 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-8 lg:px-16">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 
            ref={titleRef}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-video-white mb-6 opacity-0"
          >
            <span 
              ref={morphRef}
              className="bg-gradient-to-r from-social-orange via-social-pink to-social-purple bg-clip-text text-transparent"
            >
              Revolutionary
            </span>
            <br />
            Video Production
          </h2>
          
          <p className="text-xl md:text-2xl text-video-white/70 mb-8 max-w-3xl mx-auto">
            We've delivered 
            <span 
              ref={counterRef}
              className="text-social-orange font-bold mx-2"
            >
              0
            </span>
            projects with precision and creativity
          </p>
        </div>

        {/* Floating Cards Grid */}
        <FloatingCards cards={showcaseCards} />

        {/* Call to Action */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-video-black/80 to-video-black/40 backdrop-blur-xl border border-white/10 rounded-full px-8 py-4">
            <span className="text-video-white/60 text-sm font-medium">Ready to get started?</span>
            <button className="bg-gradient-to-r from-social-orange to-social-pink text-white px-6 py-2 rounded-full text-sm font-medium hover:scale-105 transition-transform duration-300">
              Let's Talk
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-video-white/40">
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-video-white/40 mb-2" />
        <span className="text-xs font-medium">Scroll</span>
      </div>
    </section>
  );
};