import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

// Import Pal avatars
import reelPalAvatar from '@/assets/pals/reel-pal-3d-avatar.png';
import evergreenPalAvatar from '@/assets/pals/evergreen-pal-3d-avatar.png';
import spotlightPalAvatar from '@/assets/pals/spotlight-pal-3d-avatar.png';
import systemPalAvatar from '@/assets/pals/system-pal-3d-avatar.png';

interface PalFeature {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface PalData {
  name: string;
  tagline: string;
  description: string;
  avatar: string;
  features: PalFeature[];
  link: string;
}

const palsData: PalData[] = [
  {
    name: "Reel Pal",
    tagline: "Your Social Media Video Expert",
    description: "Reel Pal specializes in creating viral-worthy short-form content. From TikTok to Instagram Reels, it understands what makes your audience engage.",
    avatar: reelPalAvatar,
    link: "/reel-pal",
    features: [
      {
        title: "Captures Your Style",
        description: "Understands your creative vision. So every asset feels like it came from inside your team.",
      },
      {
        title: "Learns Buying Triggers",
        description: "It goes beyond tone. Our AI ad make learns how your customers think when they're ready to buy.",
      },
      {
        title: "Knows Your Audience",
        description: "Learns your customer's mindset, habits, and pain points, then builds content they actually care about.",
      },
      {
        title: "Keeps Data Private",
        description: "Your brand data stays private. It's never shared, trained on, or reused.",
      },
    ]
  },
  {
    name: "Evergreen Pal",
    tagline: "Your Long-Form Content Specialist",
    description: "Evergreen Pal creates timeless, SEO-optimized content that continues to drive value. Perfect for tutorials, testimonials, and educational videos.",
    avatar: evergreenPalAvatar,
    link: "/evergreen-pal",
    features: [
      {
        title: "Captures Your Style",
        description: "Understands your creative vision. So every asset feels like it came from inside your team.",
      },
      {
        title: "SEO Optimization",
        description: "Crafts content that ranks. Our AI understands search intent and creates videos that attract organic traffic.",
      },
      {
        title: "Knows Your Audience",
        description: "Learns your customer's mindset, habits, and pain points, then builds content they actually care about.",
      },
      {
        title: "Keeps Data Private",
        description: "Your brand data stays private. It's never shared, trained on, or reused.",
      },
    ]
  },
  {
    name: "Spotlight Pal",
    tagline: "Your Premium Production Expert",
    description: "Spotlight Pal delivers cinematic, high-end video production. Perfect for brand films, product launches, and premium content.",
    avatar: spotlightPalAvatar,
    link: "/spotlight-pal",
    features: [
      {
        title: "Captures Your Style",
        description: "Understands your creative vision. So every asset feels like it came from inside your team.",
      },
      {
        title: "Cinematic Quality",
        description: "Professional-grade production values. Every frame is crafted with attention to lighting, composition, and storytelling.",
      },
      {
        title: "Knows Your Audience",
        description: "Learns your customer's mindset, habits, and pain points, then builds content they actually care about.",
      },
      {
        title: "Keeps Data Private",
        description: "Your brand data stays private. It's never shared, trained on, or reused.",
      },
    ]
  },
  {
    name: "System Pal",
    tagline: "Your Content Operations Manager",
    description: "System Pal orchestrates your entire video content operation. It manages workflows, coordinates teams, and ensures consistent output.",
    avatar: systemPalAvatar,
    link: "/system-pal",
    features: [
      {
        title: "Captures Your Style",
        description: "Understands your creative vision. So every asset feels like it came from inside your team.",
      },
      {
        title: "Workflow Automation",
        description: "Streamlines your production pipeline. From planning to publishing, System Pal keeps everything running smoothly.",
      },
      {
        title: "Knows Your Audience",
        description: "Learns your customer's mindset, habits, and pain points, then builds content they actually care about.",
      },
      {
        title: "Keeps Data Private",
        description: "Your brand data stays private. It's never shared, trained on, or reused.",
      },
    ]
  },
];

export const PalsBrandDNA = () => {
  const [currentPalIndex, setCurrentPalIndex] = useState(0);
  const currentPal = palsData[currentPalIndex];

  const nextPal = () => {
    setCurrentPalIndex((prev) => (prev + 1) % palsData.length);
  };

  const prevPal = () => {
    setCurrentPalIndex((prev) => (prev - 1 + palsData.length) % palsData.length);
  };

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Powered By Badge */}
        <div className="flex justify-center mb-6">
          <div className="px-4 py-2 rounded-full border-2 border-primary text-sm font-medium">
            Powered By Palmer House Productions
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-semibold mb-4">
            {currentPal.name}
          </h2>
          <p className="text-xl text-muted-foreground mb-2">
            {currentPal.tagline}
          </p>
          <p className="text-muted-foreground">
            {currentPal.description}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative">
          {/* Left Features */}
          <div className="space-y-6 lg:order-1">
            <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
              <h3 className="text-lg font-semibold mb-2">{currentPal.features[0].title}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {currentPal.features[0].description}
              </p>
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-400"></div>
                <div className="w-8 h-8 rounded-full bg-gray-400"></div>
                <div className="w-8 h-8 rounded-full bg-pink-400"></div>
                <div className="w-8 h-8 rounded-full bg-purple-400"></div>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
              <h3 className="text-lg font-semibold mb-2">{currentPal.features[1].title}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {currentPal.features[1].description}
              </p>
              <div className="flex gap-3 text-2xl mb-3">
                <span>😊</span>
                <span>😐</span>
                <span>🎯</span>
              </div>
              <div className="h-2 bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 to-green-500 rounded-full"></div>
            </div>
          </div>

          {/* Center Avatar with Navigation */}
          <div className="relative flex flex-col items-center lg:order-2">
            <div className="relative w-full max-w-sm aspect-square flex items-center justify-center">
              <img 
                src={currentPal.avatar} 
                alt={currentPal.name}
                className="w-full h-full object-contain transition-opacity duration-300"
              />
            </div>
            
            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8">
              <Button
                onClick={prevPal}
                variant="outline"
                size="icon"
                className="rounded-full w-12 h-12"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <Link to={currentPal.link}>
                <Button className="rounded-full px-8">
                  Learn More
                </Button>
              </Link>
              <Button
                onClick={nextPal}
                variant="outline"
                size="icon"
                className="rounded-full w-12 h-12"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>

            {/* Pal Indicator Dots */}
            <div className="flex gap-2 mt-4">
              {palsData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPalIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentPalIndex 
                      ? 'bg-primary w-8' 
                      : 'bg-muted-foreground/30'
                  }`}
                  aria-label={`Go to ${palsData[index].name}`}
                />
              ))}
            </div>
          </div>

          {/* Right Features */}
          <div className="space-y-6 lg:order-3">
            <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
              <h3 className="text-lg font-semibold mb-2">{currentPal.features[2].title}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {currentPal.features[2].description}
              </p>
              <div className="flex gap-2 text-2xl">
                <span>𝕏</span>
                <span>🔗</span>
                <span>📷</span>
                <span>🎵</span>
                <span>💼</span>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
              <h3 className="text-lg font-semibold mb-2">{currentPal.features[3].title}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {currentPal.features[3].description}
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 border-2 border-border rounded-full text-sm font-medium">
                <span>🔒</span>
                <span>100% guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
