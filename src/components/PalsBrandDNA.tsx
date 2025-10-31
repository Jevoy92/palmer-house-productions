import { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

// Import Pal avatars
import evergreenPalAvatar from '@/assets/pals/evergreen-pal-3d-avatar.png';
import spotlightPalAvatar from '@/assets/pals/spotlight-pal-3d-avatar.png';
import systemPalAvatar from '@/assets/pals/system-pal-3d-avatar.png';

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
    video: "/assets/reel-pal-female.mp4",
    link: "/reel-pal",
    features: [
      {
        title: "Captures Your Style",
        description: "Understands your creative vision. So every asset feels like it came from inside your team.",
        detailedDescription: "Reel Pal analyzes your existing content library, brand guidelines, and visual identity to deeply understand what makes your content uniquely yours. From color palettes and editing rhythms to tone of voice and brand personality, every piece of content maintains perfect consistency with your established style. It's like having a team member who's studied every video you've ever made and knows exactly how to replicate that magic.",
      },
      {
        title: "Learns Buying Triggers",
        description: "It goes beyond tone. Our AI ad maker learns how your customers think when they're ready to buy.",
        detailedDescription: "Through advanced behavioral analysis and conversion tracking, Reel Pal identifies the specific moments, phrases, and visual cues that move your audience from casual viewers to engaged customers. It understands the psychology behind purchase decisions in your niche—whether that's urgency, social proof, or aspirational messaging—and weaves these elements naturally into your short-form content to maximize conversion rates without feeling pushy or salesy.",
      },
      {
        title: "Knows Your Audience",
        description: "Learns your customer's mindset, habits, and pain points, then builds content they actually care about.",
        detailedDescription: "Reel Pal goes deep into audience intelligence, analyzing engagement patterns across platforms to understand what resonates with your specific demographic. It tracks which content types perform best at different times, which topics generate the most saves and shares, and what pain points drive the most meaningful conversations. This insight powers content that doesn't just get views—it builds genuine connections and community around your brand.",
      },
      {
        title: "Keeps Data Private",
        description: "Your brand data stays private. It's never shared, trained on, or reused.",
        detailedDescription: "Your proprietary brand information, customer insights, and creative assets are protected with enterprise-grade security. Unlike generic AI tools that use your data to improve their models for everyone, Reel Pal keeps your competitive advantages locked down. Your data is encrypted, never shared with third parties, and never used to train models that could benefit your competitors. What you build with Reel Pal stays yours—forever.",
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
        detailedDescription: "Evergreen Pal masters your brand's visual language and communication style to create long-form content that feels authentically yours. From the pacing of your tutorials to the way you explain complex topics, every video maintains the distinctive voice and visual aesthetic that your audience recognizes and trusts. It ensures that whether you're creating a 30-second clip or a 30-minute deep-dive, the content remains unmistakably on-brand.",
      },
      {
        title: "SEO Optimization",
        description: "Crafts content that ranks. Our AI understands search intent and creates videos that attract organic traffic.",
        detailedDescription: "Evergreen Pal is built with search visibility at its core. It analyzes trending keywords, search intent patterns, and competitor gaps to create videos that rank on both YouTube and Google. From optimized titles and descriptions to strategic content structure and engagement hooks, every element is designed to maximize organic discoverability. Your content doesn't just live on your site—it becomes a traffic-generating asset that compounds in value over time.",
      },
      {
        title: "Knows Your Audience",
        description: "Learns your customer's mindset, habits, and pain points, then builds content they actually care about.",
        detailedDescription: "Through comprehensive audience analysis, Evergreen Pal develops a deep understanding of the questions your customers are asking, the problems they're trying to solve, and the learning styles that resonate with them most. It identifies content gaps in your market and creates educational videos that position you as the go-to authority. The result is evergreen content that serves your audience's needs today and continues to attract new viewers for years to come.",
      },
      {
        title: "Keeps Data Private",
        description: "Your brand data stays private. It's never shared, trained on, or reused.",
        detailedDescription: "Your proprietary brand information, customer insights, and creative assets are protected with enterprise-grade security. Unlike generic AI tools that use your data to improve their models for everyone, Evergreen Pal keeps your competitive advantages locked down. Your data is encrypted, never shared with third parties, and never used to train models that could benefit your competitors. What you build with Evergreen Pal stays yours—forever.",
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
        detailedDescription: "Spotlight Pal elevates your brand's visual storytelling to cinematic standards while preserving your unique creative signature. It understands that premium content requires more than just technical excellence—it needs to embody your brand's emotional tone, aesthetic preferences, and storytelling approach. From color grading choices to camera movement styles, every production decision aligns with your established creative vision while meeting the highest professional standards.",
      },
      {
        title: "Cinematic Quality",
        description: "Professional-grade production values. Every frame is crafted with attention to lighting, composition, and storytelling.",
        detailedDescription: "Spotlight Pal delivers broadcast-quality production with meticulous attention to every technical detail. Advanced understanding of cinematography principles ensures perfect exposure, dynamic composition, and purposeful camera work. Color science expertise creates consistent, mood-appropriate grading. Audio is crisp and balanced. Motion graphics integrate seamlessly. The result is content that commands attention and communicates sophistication—the kind of quality that builds brand prestige and justifies premium positioning.",
      },
      {
        title: "Knows Your Audience",
        description: "Learns your customer's mindset, habits, and pain points, then builds content they actually care about.",
        detailedDescription: "Spotlight Pal recognizes that premium content must resonate on an emotional level with your target audience. It studies what visual language speaks to your demographic—whether that's aspirational luxury, authentic craftsmanship, or innovative technology. By understanding the values and aesthetics that move your audience, it creates cinematic experiences that don't just look beautiful—they forge deep emotional connections that drive brand loyalty and premium pricing power.",
      },
      {
        title: "Keeps Data Private",
        description: "Your brand data stays private. It's never shared, trained on, or reused.",
        detailedDescription: "Your proprietary brand information, customer insights, and creative assets are protected with enterprise-grade security. Unlike generic AI tools that use your data to improve their models for everyone, Spotlight Pal keeps your competitive advantages locked down. Your data is encrypted, never shared with third parties, and never used to train models that could benefit your competitors. What you build with Spotlight Pal stays yours—forever.",
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
        detailedDescription: "System Pal acts as your brand's creative guardian, ensuring perfect consistency across every piece of content your team produces. It maintains comprehensive brand guidelines, template libraries, and style standards that keep your entire content operation aligned. Whether you have one creator or fifty, System Pal ensures that every video, regardless of who creates it or when, maintains the exact look, feel, and voice that makes your brand recognizable and trustworthy.",
      },
      {
        title: "Workflow Automation",
        description: "Streamlines your production pipeline. From planning to publishing, System Pal keeps everything running smoothly.",
        detailedDescription: "System Pal transforms chaotic content creation into a well-oiled machine. It orchestrates the entire production lifecycle—from content ideation and scripting through filming, editing, approval workflows, and multi-platform distribution. Automated task assignments, deadline tracking, version control, and approval routing eliminate bottlenecks. Integration with your existing tools means everything happens in one unified system. The result: faster turnaround times, fewer mistakes, and content that ships on schedule, every time.",
      },
      {
        title: "Knows Your Audience",
        description: "Learns your customer's mindset, habits, and pain points, then builds content they actually care about.",
        detailedDescription: "System Pal aggregates performance data across all your content channels to build an ever-evolving understanding of what resonates with your audience. It identifies patterns in engagement, conversion, and retention that inform future content strategy. By tracking what topics, formats, and styles perform best with specific audience segments, it helps you make data-driven decisions about where to invest your production resources for maximum impact and ROI.",
      },
      {
        title: "Keeps Data Private",
        description: "Your brand data stays private. It's never shared, trained on, or reused.",
        detailedDescription: "Your proprietary brand information, customer insights, and creative assets are protected with enterprise-grade security. Unlike generic AI tools that use your data to improve their models for everyone, System Pal keeps your competitive advantages locked down. Your data is encrypted, never shared with third parties, and never used to train models that could benefit your competitors. What you build with System Pal stays yours—forever.",
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
          <div className="space-y-6 lg:order-1">
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
          <div className="relative flex flex-col items-center lg:order-2">
            <div className="relative w-full max-w-sm aspect-square flex items-center justify-center">
              {currentPal.video ? (
                <video 
                  src={currentPal.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-contain transition-opacity duration-300"
                  aria-label={currentPal.name}
                />
              ) : (
                <img 
                  src={currentPal.avatar} 
                  alt={currentPal.name}
                  className="w-full h-full object-contain transition-opacity duration-300"
                />
              )}
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
