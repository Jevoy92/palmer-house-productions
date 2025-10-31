import { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { IPhoneVideoPlayer } from './ui/iphone-video-player';

// Import Pal avatars
import evergreenPalAvatar from '@/assets/pals/evergreen-pal-3d-avatar.png';
import spotlightPalAvatar from '@/assets/pals/spotlight-pal-3d-avatar.png';
import systemPalAvatar from '@/assets/pals/system-pal-3d-avatar.png';
import reelPalAvatar from '@/assets/pals/reel-pal-3d-avatar.png';

interface PalFeature {
  title: string;
  description: string;
  detailedDescription: string;
  icon?: React.ReactNode;
}

interface PalData {
  name: string;
  tagline: string;
  description: string;
  avatar?: string;
  video?: string;
  features: PalFeature[];
  link: string;
}

const palsData: PalData[] = [
  {
    name: "Reel Pal",
    tagline: "Your Social Media Video Expert",
    description: "Reel Pal specializes in creating viral-worthy short-form content. From TikTok to Instagram Reels, it understands what makes your audience engage.",
    video: "/assets/reel_pal_v2.mp4",
    link: "/reel-pal",
    features: [
      {
        title: "Visibility & Reach",
        description: "Your audience scrolls fast. Reel Pal helps your brand ride that momentum with short-form content engineered for the platforms your people use.",
        detailedDescription: "We craft posts that not only get seen but spark interaction, so your reach grows and your message lands. Your content becomes part of the conversation, not just noise in the feed.",
      },
      {
        title: "Rapid Onboarding for Creation",
        description: "No more 'what do we shoot next?' wobble. Reel Pal sets up a streamlined process from concept to publish.",
        detailedDescription: "Templates, approved brand elements, and a clear cadence mean your team steps into creation confidently from day one. No guesswork, just execution.",
      },
      {
        title: "Audience Engagement Framework",
        description: "Likes are nice. Comments, shares, conversion are better. Reel Pal builds content with hooks, loops, and CTA strategies.",
        detailedDescription: "We turn viewers into participants — helping you build a following that cares, not just watches. Every piece is designed to drive meaningful interaction.",
      },
      {
        title: "Brand Momentum Engine",
        description: "One great post is good. A sustained flow of aligned content is transformative.",
        detailedDescription: "Reel Pal supports you with a production schedule, reused asset strategy, and repurposing plan so you're always staying visible, always staying relevant. Consistency builds trust, and trust builds brands.",
      },
    ]
  },
  {
    name: "Evergreen Pal",
    tagline: "Your Long-Form Content Specialist",
    description: "Evergreen Pal creates timeless, SEO-optimized content that continues to drive value. Perfect for tutorials, testimonials, and educational videos.",
    video: "/assets/evergreen_pal.mp4",
    link: "/evergreen-pal",
    features: [
      {
        title: "Authority Building Content",
        description: "You want to be recognized for expertise, not just activity. Evergreen Pal helps you create deep, value-rich content.",
        detailedDescription: "We create content that informs, educates, and positions you as a leader in your field. Your expertise becomes your competitive advantage.",
      },
      {
        title: "Evergreen Visibility Strategy",
        description: "Trends fade. Evergreen Pal designs videos and formats that keep working.",
        detailedDescription: "Optimized for longevity, search-friendly, repurpose-ready, and platform-flexible so your message continues to show up well beyond the launch window. Your content becomes an asset that compounds over time.",
      },
      {
        title: "Thought-Leadership Training Assets",
        description: "Your subject matter matters. Evergreen Pal captures it once and delivers it many times.",
        detailedDescription: "Masterclasses, walkthroughs, story-led talks that train your audience and build trust with minimal extra effort. One shoot, infinite reach.",
      },
      {
        title: "Sustainable Production Model",
        description: "One shoot. Many uses. Evergreen Pal helps you squeeze maximum value from your production.",
        detailedDescription: "Convert sessions into shorter clips, repurpose into social teasers, archive for later. So you build less, but achieve more. Efficiency meets excellence.",
      },
    ]
  },
  {
    name: "Spotlight Pal",
    tagline: "Your Premium Production Expert",
    description: "Spotlight Pal delivers cinematic, high-end video production. Perfect for brand films, product launches, and premium content.",
    video: "/assets/spotlight_pal.mp4",
    link: "/spotlight-pal",
    features: [
      {
        title: "Brand Storytelling Showcase",
        description: "Your brand is bigger than a product. It's a story. Spotlight Pal helps you craft cinematic narratives and hero visuals.",
        detailedDescription: "We create strategic presentations that place your brand in its best light and make your message compelling. Every frame tells your story.",
      },
      {
        title: "High-Impact Launches & Moments",
        description: "Big moments demand big visuals. Whether you're launching a service, hosting a summit, or stepping into new territory.",
        detailedDescription: "Spotlight Pal ensures your presence is bold, connected, and crafted for attention. When it matters most, you show up unforgettable.",
      },
      {
        title: "Client/Investor Presentation Assets",
        description: "When the stakes are high, your visuals must be flawless. Spotlight Pal provides polished assets for keynote presentations.",
        detailedDescription: "Investor decks and client-facing launches mean you lead with confidence and look professional every step of the way. First impressions become lasting partnerships.",
      },
      {
        title: "Creative Ownership & Trust",
        description: "Your work, your brand, your ownership. Spotlight Pal guarantees your footage, strategies, and scripts remain fully yours.",
        detailedDescription: "You won't find reused assets or shared templates in other brands. Collaboration is transparent, ownership is clear, and trust is built into the partnership. What's yours stays yours.",
      },
    ]
  },
  {
    name: "System Pal",
    tagline: "Your Content Operations Manager",
    description: "System Pal orchestrates your entire video content operation. It manages workflows, coordinates teams, and ensures consistent output.",
    video: "/assets/system_pal.mp4",
    link: "/system-pal",
    features: [
      {
        title: "Operational Training Modules",
        description: "When your team grows, things can slip. System Pal creates clear video-based training modules.",
        detailedDescription: "Make onboarding new people seamless — everyone sees the same playbook, understands the same standards, and gets up to speed fast. Consistency at scale.",
      },
      {
        title: "Internal Onboarding Accelerator",
        description: "Start new hires off right. System Pal codes your workflows and sets standard-operating procedures in motion.",
        detailedDescription: "Approved schematic videos mean your internal ramp-up is fast, consistent, and reliable. New team members become productive faster.",
      },
      {
        title: "Process Automation Documentation",
        description: "Repeating the same tasks over and over drains your team. System Pal documents your key processes into video guides.",
        detailedDescription: "From client communication to file handling to publishing, templates and checklists mean you spend less time explaining and more time doing. Clarity creates capacity.",
      },
      {
        title: "Scalable Growth Infrastructure",
        description: "As you expand, your systems need to expand too. System Pal gives you a foundation that supports growth without chaos.",
        detailedDescription: "Structured content, documented steps, and workflows that flex quietly behind your brand's voice. You grow, your systems grow with you.",
      },
    ]
  },
];

export const PalsBrandDNA = () => {
  const [currentPalIndex, setCurrentPalIndex] = useState(0);
  const [openFeatures, setOpenFeatures] = useState<Record<number, boolean>>({});
  const currentPal = palsData[currentPalIndex];

  const toggleFeature = (index: number) => {
    setOpenFeatures(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

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
          <div className="space-y-6 order-2 lg:order-1">
            <Collapsible open={openFeatures[0]} onOpenChange={() => toggleFeature(0)}>
              <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                <CollapsibleTrigger className="w-full text-left">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{currentPal.features[0].title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {currentPal.features[0].description}
                      </p>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-200 flex-shrink-0 mt-1 ${openFeatures[0] ? 'rotate-180' : ''}`} />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2">
                  <p className="text-sm text-muted-foreground mb-4 pt-2 border-t">
                    {currentPal.features[0].detailedDescription}
                  </p>
                </CollapsibleContent>
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-400"></div>
                  <div className="w-8 h-8 rounded-full bg-gray-400"></div>
                  <div className="w-8 h-8 rounded-full bg-pink-400"></div>
                  <div className="w-8 h-8 rounded-full bg-purple-400"></div>
                </div>
              </div>
            </Collapsible>

            <Collapsible open={openFeatures[1]} onOpenChange={() => toggleFeature(1)}>
              <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                <CollapsibleTrigger className="w-full text-left">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{currentPal.features[1].title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {currentPal.features[1].description}
                      </p>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-200 flex-shrink-0 mt-1 ${openFeatures[1] ? 'rotate-180' : ''}`} />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2">
                  <p className="text-sm text-muted-foreground mb-4 pt-2 border-t">
                    {currentPal.features[1].detailedDescription}
                  </p>
                </CollapsibleContent>
                <div className="flex gap-3 text-2xl mb-3">
                  <span>😊</span>
                  <span>😐</span>
                  <span>🎯</span>
                </div>
                <div className="h-2 bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 to-green-500 rounded-full"></div>
              </div>
            </Collapsible>
          </div>

          {/* Center Avatar with Navigation */}
          <div className="relative flex flex-col items-center order-1 lg:order-2">
            <div className="relative w-full flex items-center justify-center">
              <IPhoneVideoPlayer
                videoSrc={currentPal.video}
                imageSrc={currentPal.avatar}
                alt={currentPal.name}
                autoplay={true}
                loop={true}
                muted={true}
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
          <div className="space-y-6 order-3 lg:order-3">
            <Collapsible open={openFeatures[2]} onOpenChange={() => toggleFeature(2)}>
              <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                <CollapsibleTrigger className="w-full text-left">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{currentPal.features[2].title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {currentPal.features[2].description}
                      </p>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-200 flex-shrink-0 mt-1 ${openFeatures[2] ? 'rotate-180' : ''}`} />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2">
                  <p className="text-sm text-muted-foreground mb-4 pt-2 border-t">
                    {currentPal.features[2].detailedDescription}
                  </p>
                </CollapsibleContent>
                <div className="flex gap-2 text-2xl">
                  <span>𝕏</span>
                  <span>🔗</span>
                  <span>📷</span>
                  <span>🎵</span>
                  <span>💼</span>
                </div>
              </div>
            </Collapsible>

            <Collapsible open={openFeatures[3]} onOpenChange={() => toggleFeature(3)}>
              <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                <CollapsibleTrigger className="w-full text-left">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{currentPal.features[3].title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {currentPal.features[3].description}
                      </p>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-200 flex-shrink-0 mt-1 ${openFeatures[3] ? 'rotate-180' : ''}`} />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2">
                  <p className="text-sm text-muted-foreground mb-4 pt-2 border-t">
                    {currentPal.features[3].detailedDescription}
                  </p>
                </CollapsibleContent>
                <div className="inline-flex items-center gap-2 px-4 py-2 border-2 border-border rounded-full text-sm font-medium">
                  <span>🔒</span>
                  <span>100% guarantee</span>
                </div>
              </div>
            </Collapsible>
          </div>
        </div>
      </div>
    </section>
  );
};
