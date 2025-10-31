import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { OptimizedImage } from '@/components/performance/OptimizedImage';
import { LazySection } from '@/components/performance/LazySection';
import { MobileOptimized, useMobileStyles } from '@/components/performance/MobileOptimized';
import reelPalImage from '@/assets/pals/female-reel-pal-social-engagement.png';
import systemPalHeadshot from '@/assets/pals/male-system-pal-headshot.jpg';
import evergreenPalHeadshot from '@/assets/pals/male-evergreen-pal-headshot-2.jpg';
import spotlightPalHeadshot from '@/assets/pals/male-spotlight-pal-headshot.jpg';
import { 
  Video,
  PlayCircle,
  Wrench,
  Check,
  MessageCircle,
  Lightbulb,
  Rocket,
  ChevronDown,
  ChevronUp,
  Smartphone,
  Camera,
  Calendar
} from 'lucide-react';

const ReelPal = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [openExpertise, setOpenExpertise] = useState<number | null>(0);
  const mobileStyles = useMobileStyles();

  const toggleFAQ = (num: number) => {
    setOpenFAQ(openFAQ === num ? null : num);
  };

  const toggleExpertise = (num: number) => {
    setOpenExpertise(openExpertise === num ? null : num);
  };

  return (
    <>
      <Navigation />
      <MobileOptimized>
        <div className="min-h-screen bg-white">
        
        {/* Hero Section */}
        <section className="relative py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="bg-orange-500 text-white px-4 py-2 rounded-full text-xs font-bold w-fit mb-6">📱 REEL PAL</div>
                <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-display font-bold mb-6">"Removing invisibility from your brand"</h1>
                <p className="text-[clamp(1.125rem,2vw,1.25rem)] mb-8 text-muted-foreground">Stop posting inconsistently. Build a short-form content system that keeps your brand visible, relevant, and top-of-mind.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="bg-orange-500 text-white hover:bg-orange-600">
                    <Link to="/contact">🚀 Start Creating Content</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-2">
                    <Link to="/pals">👥 Meet All Pals</Link>
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-center">
                <img 
                  src={reelPalImage}
                  alt="Reel Pal - Your Social Content Creation Guide"
                  className="w-full max-w-md object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Pain Points Section */}
        <section className="py-16 bg-orange-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-[clamp(1.875rem,4vw,2.5rem)] font-display font-bold mb-4">Problems I Solve</h2>
              <p className="text-[clamp(1.125rem,2vw,1.25rem)] text-muted-foreground">Sound familiar? Let's fix it.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <div className="p-8 rounded-2xl bg-white border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Inconsistent posting and low online visibility</h3>
                    <p className="text-sm text-muted-foreground">You post when you remember, but there's no rhythm. Your audience forgets you exist.</p>
                  </div>
                </div>
              </div>
              
              <div className="p-8 rounded-2xl bg-white border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">No clear social media strategy or rhythm</h3>
                    <p className="text-sm text-muted-foreground">You're throwing content at the wall hoping something sticks. No plan means no progress.</p>
                  </div>
                </div>
              </div>
              
              <div className="p-8 rounded-2xl bg-white border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Founders burning out trying to stay "visible"</h3>
                    <p className="text-sm text-muted-foreground">Creating content feels like a full-time job on top of your actual job.</p>
                  </div>
                </div>
              </div>
              
              <div className="p-8 rounded-2xl bg-white border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                    <Video className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Brand recognition dropping between launches</h3>
                    <p className="text-sm text-muted-foreground">You spike when you have news, then disappear. People don't remember who you are.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What You Get Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-[clamp(1.875rem,4vw,2.5rem)] font-display font-bold mb-4">What You Get</h2>
              <p className="text-[clamp(1.125rem,2vw,1.25rem)] text-muted-foreground">Not just videos. A complete system.</p>
            </div>
            
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
              <div className="text-center">
                <div className="inline-flex w-14 h-14 rounded-xl bg-orange-100 items-center justify-center mb-4">
                  <Smartphone className="w-7 h-7 text-orange-600" />
                </div>
                <h3 className="font-semibold text-base mb-2">Short-form video systems</h3>
                <p className="text-sm text-muted-foreground">Reels, Shorts, TikToks ready to post on a consistent schedule.</p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex w-14 h-14 rounded-xl bg-orange-100 items-center justify-center mb-4">
                  <Calendar className="w-7 h-7 text-orange-600" />
                </div>
                <h3 className="font-semibold text-base mb-2">Monthly content calendars with ready hooks</h3>
                <p className="text-sm text-muted-foreground">Never stare at a blank screen again. Your content is planned and ready.</p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex w-14 h-14 rounded-xl bg-orange-100 items-center justify-center mb-4">
                  <MessageCircle className="w-7 h-7 text-orange-600" />
                </div>
                <h3 className="font-semibold text-base mb-2">Caption and CTA templates</h3>
                <p className="text-sm text-muted-foreground">Copy-paste captions that drive engagement and conversions.</p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex w-14 h-14 rounded-xl bg-orange-100 items-center justify-center mb-4">
                  <Lightbulb className="w-7 h-7 text-orange-600" />
                </div>
                <h3 className="font-semibold text-base mb-2">Visual storytelling frameworks</h3>
                <p className="text-sm text-muted-foreground">Turn your expertise into scroll-stopping content that positions you as a leader.</p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex w-14 h-14 rounded-xl bg-orange-100 items-center justify-center mb-4">
                  <Camera className="w-7 h-7 text-orange-600" />
                </div>
                <h3 className="font-semibold text-base mb-2">Cutdown libraries from long-form videos</h3>
                <p className="text-sm text-muted-foreground">Maximize your content ROI by repurposing everything you create.</p>
              </div>
            </div>
          </div>
        </section>

        {/* What I Do Best Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-[clamp(1.875rem,4vw,2.5rem)] font-display font-bold mb-4">What I Do Best</h2>
              <p className="text-[clamp(1.125rem,2vw,1.25rem)] text-muted-foreground max-w-3xl mx-auto">From viral TikToks to Instagram Reels that convert, I help you create content that not only looks great but actually drives results for your business.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* TikTok Content */}
              <Collapsible open={openExpertise === 0} onOpenChange={() => toggleExpertise(0)}>
                <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100">
                  <CollapsibleTrigger className="w-full text-left">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <Video className="text-white h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-bold">TikTok Content</h3>
                      </div>
                      {openExpertise === 0 ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-4">
                    <p className="text-sm text-muted-foreground">Trending content that captures attention and drives engagement on the world's fastest-growing platform.</p>
                  </CollapsibleContent>
                </div>
              </Collapsible>

              {/* Instagram Reels */}
              <Collapsible open={openExpertise === 1} onOpenChange={() => toggleExpertise(1)}>
                <div className="bg-purple-50 rounded-2xl p-6 border border-purple-100">
                  <CollapsibleTrigger className="w-full text-left">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <PlayCircle className="text-white h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-bold">Instagram Reels</h3>
                      </div>
                      {openExpertise === 1 ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-4">
                    <p className="text-sm text-muted-foreground">Stories and Reels that showcase your brand personality and convert followers into customers.</p>
                  </CollapsibleContent>
                </div>
              </Collapsible>

              {/* YouTube Shorts */}
              <Collapsible open={openExpertise === 2} onOpenChange={() => toggleExpertise(2)}>
                <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
                  <CollapsibleTrigger className="w-full text-left">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <Video className="text-white h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-bold">YouTube Shorts</h3>
                      </div>
                      {openExpertise === 2 ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-4">
                    <p className="text-sm text-muted-foreground">Quick, impactful videos that grow your YouTube presence and drive subscribers.</p>
                  </CollapsibleContent>
                </div>
              </Collapsible>

              {/* DIY Kits */}
              <Collapsible open={openExpertise === 3} onOpenChange={() => toggleExpertise(3)}>
                <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                  <CollapsibleTrigger className="w-full text-left">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <Wrench className="text-white h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-bold">DIY Kits</h3>
                      </div>
                      {openExpertise === 3 ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-4">
                    <p className="text-sm text-muted-foreground">Complete content creation packages that enable you to create professional content in-house.</p>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            </div>
          </div>
        </section>

        {/* Packages Section */}
        <section className="py-20 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/20">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Reel Pal Packages</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Remove invisibility from your brand with consistent, strategic content.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Starter Session */}
                <div className="bg-background rounded-2xl p-8 text-center shadow-lg border-2 border-transparent hover:border-orange-500 transition-all hover:scale-105">
                  <div className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold w-fit mx-auto mb-6">STARTER</div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">The Starter Session</h3>
                  <div className="text-4xl font-bold text-orange-600 mb-6">$500</div>
                  <ul className="space-y-4 mb-8 text-left">
                    <li className="flex items-center space-x-3">
                      <Check className="text-orange-500 h-5 w-5" />
                      <span>30-minute filming session</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <Check className="text-orange-500 h-5 w-5" />
                      <span>Minimum 3 edited videos</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <Check className="text-orange-500 h-5 w-5" />
                      <span>One-minute video format</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <Check className="text-orange-500 h-5 w-5" />
                      <span>Simple talking-head style</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <Check className="text-orange-500 h-5 w-5" />
                      <span>Professional delivery</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <Check className="text-orange-500 h-5 w-5" />
                      <span>Limited availability</span>
                    </li>
                  </ul>
                  <Button asChild className="w-full bg-orange-500 text-white hover:bg-orange-600" size="lg">
                    <Link to="/contact">📱 Book Session</Link>
                  </Button>
                </div>
                
                {/* DIY Package */}
                <div className="bg-background rounded-2xl p-8 text-center shadow-lg border-2 border-transparent hover:border-purple-500 transition-all hover:scale-105">
                  <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold w-fit mx-auto mb-6">DIY</div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">25 DIY Reels</h3>
                  <div className="text-4xl font-bold text-purple-600 mb-6">$47</div>
                  <ul className="space-y-4 mb-8 text-left">
                    <li className="flex items-center space-x-3">
                      <Check className="text-purple-500 h-5 w-5" />
                      <span>25 talking-head reel ideas</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <Check className="text-purple-500 h-5 w-5" />
                      <span>Platform breakdowns included</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <Check className="text-purple-500 h-5 w-5" />
                      <span>Sample scripts provided</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <Check className="text-purple-500 h-5 w-5" />
                      <span>Film from home setup</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <Check className="text-purple-500 h-5 w-5" />
                      <span>Instant PDF download</span>
                    </li>
                  </ul>
                  <Button asChild className="w-full bg-purple-500 text-white hover:bg-purple-600" size="lg">
                    <a href="https://payhip.com/b/u8wvz" target="_blank" rel="noopener noreferrer">🛒 Buy Now</a>
                  </Button>
                </div>
                
                {/* Content Creation Package */}
                <div className="bg-background rounded-2xl p-8 text-center shadow-lg border-2 border-transparent hover:border-green-500 transition-all hover:scale-105 relative">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">POPULAR</div>
                  </div>
                  <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold w-fit mx-auto mb-6 mt-4">CONTENT</div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">30 Reels in a Day</h3>
                  <div className="text-4xl font-bold text-green-600 mb-6">$3,000</div>
                  <ul className="space-y-4 mb-8 text-left">
                    <li className="flex items-center space-x-3">
                      <Check className="text-green-500 h-5 w-5" />
                      <span>1 full-day shoot (8 hours)</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <Check className="text-green-500 h-5 w-5" />
                      <span>30 social-ready videos</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <Check className="text-green-500 h-5 w-5" />
                      <span>15-30 seconds each</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <Check className="text-green-500 h-5 w-5" />
                      <span>Captions + formatting</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <Check className="text-green-500 h-5 w-5" />
                      <span>IG/LinkedIn/TikTok ready</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <Check className="text-green-500 h-5 w-5" />
                      <span>Only 3 spots available</span>
                    </li>
                  </ul>
                  <Button asChild className="w-full bg-green-500 text-white hover:bg-green-600" size="lg">
                    <Link to="/contact">🚀 Book Now</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/20">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">How We Work Together</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">My proven 4-step process ensures we create content that not only looks amazing but drives real results for your business.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 relative shadow-lg">
                    <MessageCircle className="text-white h-8 w-8" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">Discovery Call</h3>
                  <p className="text-muted-foreground">We dive deep into your brand, audience, and goals to create a personalized content strategy.</p>
                </div>
                
                <div className="text-center">
                  <div className="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 relative shadow-lg">
                    <Lightbulb className="text-white h-8 w-8" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">Content Planning</h3>
                  <p className="text-muted-foreground">I create a detailed content calendar with trending topics and platform-specific optimizations.</p>
                </div>
                
                <div className="text-center">
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 relative shadow-lg">
                    <Video className="text-white h-8 w-8" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">Production</h3>
                  <p className="text-muted-foreground">Professional filming and editing that brings your content to life with trending effects and music.</p>
                </div>
                
                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 relative shadow-lg">
                    <Rocket className="text-white h-8 w-8" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">Launch & Optimize</h3>
                  <p className="text-muted-foreground">Strategic posting schedule with performance tracking and continuous optimization for maximum reach.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 relative z-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/20">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
                <p className="text-xl text-muted-foreground">Everything you need to know about working with Reel Pal.</p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    question: "What types of content do you create?",
                    answer: "I specialize in short-form content optimized for TikTok, Instagram Reels, YouTube Shorts, and LinkedIn. This includes talking-head videos, behind-the-scenes content, product showcases, educational content, and trending format adaptations."
                  },
                  {
                    question: "How quickly can I expect my videos?",
                    answer: "Turnaround times vary by package. The Starter Session delivers within 5-7 business days, DIY products are instant downloads, and the 30 Reels package delivers all content within 2 weeks of filming."
                  },
                  {
                    question: "Do you provide captions and descriptions?",
                    answer: "Yes! All video packages include platform-optimized captions, hashtag research, and posting recommendations. We also provide multiple format versions for different platforms when needed."
                  },
                  {
                    question: "What if I need revisions?",
                    answer: "Each package includes specified revision rounds. The Starter Session includes 1 round of revisions, while the 30 Reels package includes 2 rounds to ensure your content perfectly matches your vision."
                  },
                  {
                    question: "Can you help with content strategy?",
                    answer: "Absolutely! Every project starts with a strategy session where we discuss your goals, audience, and brand voice. I provide ongoing strategic guidance to help your content perform better and reach more people."
                  }
                ].map((faq, index) => (
                  <div key={index} className="bg-background rounded-2xl p-8 shadow-lg">
                    <div 
                      className="flex justify-between items-center cursor-pointer" 
                      onClick={() => toggleFAQ(index + 1)}
                    >
                      <h3 className="text-xl font-bold text-foreground">{faq.question}</h3>
                      {openFAQ === index + 1 ? (
                        <ChevronUp className="text-muted-foreground h-6 w-6" />
                      ) : (
                        <ChevronDown className="text-muted-foreground h-6 w-6" />
                      )}
                    </div>
                    {openFAQ === index + 1 && (
                      <div className="mt-4">
                        <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative z-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 lg:p-16 shadow-2xl border border-white/20">
              <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-foreground">
                  Ready to Create Content That Connects?
                </h2>
                <p className="text-xl mb-12 max-w-3xl mx-auto text-muted-foreground">
                  Let's work together to build your social media presence with content that actually converts. Book your strategy call today and let's make magic happen!
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Smartphone className="text-white h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">Proven Systems</h3>
                    <p className="text-muted-foreground">Strategies that actually work and drive real engagement</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Rocket className="text-white h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">Fast Results</h3>
                    <p className="text-muted-foreground">See improvement in your social media performance within weeks</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Camera className="text-white h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">Professional Quality</h3>
                    <p className="text-muted-foreground">Content that looks great and represents your brand perfectly</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Button asChild size="lg" className="bg-orange-500 text-white hover:bg-orange-600 shadow-xl">
                    <a 
                      href="https://palmerhouseproductions.zohobookings.com/#/4740771000000078004"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      🚀 Book Strategy Call
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white shadow-xl">
                    <Link to="/pals">👥 Explore All Pals</Link>
                  </Button>
                </div>
                
                <p className="text-muted-foreground mt-8">
                  💎 <strong>Limited Time:</strong> Free content audit with every strategy call
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Related Pals Section */}
        <section className="py-20 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/20">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Meet My Fellow Pals</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Each Video Pal specializes in different content types. Find the perfect Pal for your specific video needs.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-background rounded-2xl p-8 text-center shadow-lg border-2 border-transparent hover:border-purple-500 transition-all hover:scale-105">
                  <div className="mb-6">
                    <img 
                      className="w-24 h-24 mx-auto rounded-full object-cover object-center border-4 border-purple-200" 
                      src={systemPalHeadshot} 
                      alt="System Pal - Male training systems expert with glasses and blue jacket" 
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">System Pal</h3>
                  <p className="text-muted-foreground mb-4">Perfect for training videos, onboarding, and internal business content</p>
                  <Button asChild className="bg-purple-500 text-white hover:bg-purple-600">
                    <Link to="/system-pal">🎓 Meet System Pal</Link>
                  </Button>
                </div>
                
                <div className="bg-background rounded-2xl p-8 text-center shadow-lg border-2 border-transparent hover:border-green-500 transition-all hover:scale-105">
                  <div className="mb-6">
                    <img 
                      className="w-24 h-24 mx-auto rounded-full object-cover object-center border-4 border-green-200" 
                      src={evergreenPalHeadshot} 
                      alt="Evergreen Pal - Male authority building expert with blue cardigan" 
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">Evergreen Pal</h3>
                  <p className="text-muted-foreground mb-4">Ideal for long-term YouTube growth and authority building</p>
                  <Button asChild className="bg-green-500 text-white hover:bg-green-600">
                    <Link to="/evergreen-pal">🌱 Meet Evergreen Pal</Link>
                  </Button>
                </div>
                
                <div className="bg-background rounded-2xl p-8 text-center shadow-lg border-2 border-transparent hover:border-blue-500 transition-all hover:scale-105">
                  <div className="mb-6">
                    <img 
                      className="w-24 h-24 mx-auto rounded-full object-cover object-center border-4 border-blue-200" 
                      src={spotlightPalHeadshot} 
                      alt="Spotlight Pal - Male cinematic production expert in blue jacket" 
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">Spotlight Pal</h3>
                  <p className="text-muted-foreground mb-4">Your go-to for cinematic brand films and premium content</p>
                  <Button asChild className="bg-blue-500 text-white hover:bg-blue-600">
                    <Link to="/spotlight-pal">🎬 Meet Spotlight Pal</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        </div>
      </MobileOptimized>
    </>
  );
};

export default ReelPal;