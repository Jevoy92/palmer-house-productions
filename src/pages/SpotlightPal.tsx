import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { OptimizedImage } from '@/components/performance/OptimizedImage';
import { LazySection } from '@/components/performance/LazySection';
import { MobileOptimized, useMobileStyles } from '@/components/performance/MobileOptimized';
import spotlightPalImage from '@/assets/pals/female-spotlight-pal-cinematography.png';
import spotlightPalHeadshot from '@/assets/pals/female-spotlight-pal-circular-3.jpg';
import reelPalHeadshot from '@/assets/pals/female-reel-pal-circular-headshot.jpg';
import systemPalHeadshot from '@/assets/pals/female-system-pal-circular-3.jpg';
import evergreenPalHeadshot from '@/assets/pals/male-evergreen-pal-circular-headshot.jpg';
import { 
  Camera, 
  Film, 
  Sparkles, 
  Award, 
  Check, 
  MessageCircle, 
  Lightbulb, 
  Video, 
  Rocket,
  ChevronDown,
  ChevronUp,
  Star,
  Zap
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const SpotlightPal = () => {
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
          <div className="min-h-screen relative overflow-hidden bg-background">
        {/* Floating Animation Elements */}
        <div className="fixed inset-0 -z-5 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-bounce" style={{animationDuration: '3s'}}></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-red-300/20 rounded-full blur-lg animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
          <div className="absolute bottom-32 left-1/4 w-28 h-28 bg-white/5 rounded-full blur-2xl animate-bounce" style={{animationDelay: '2s', animationDuration: '5s'}}></div>
          <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-red-300/10 rounded-full blur-lg animate-bounce" style={{animationDelay: '0.5s', animationDuration: '3.5s'}}></div>
        </div>

        {/* Hero Section */}
        <section className="relative min-h-[500px] sm:min-h-[600px] flex items-center pt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl border border-white/20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="bg-red-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm font-bold w-fit mb-4 sm:mb-6 shadow-lg">🎬 SPOTLIGHT PAL</div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-foreground leading-tight">"Making your wins visible"</h1>
                  <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-muted-foreground">Great work going unseen? Turn customer wins, team achievements, and brand moments into proof that builds trust and drives sales.</p>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Button asChild size="lg" className={`${mobileStyles.mobileButton} bg-red-500 text-white hover:bg-red-600 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105`}>
                      <Link to="/contact">🚀 Book Strategy Call</Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className={`${mobileStyles.mobileButton} border-red-500 text-red-500 hover:bg-red-500 hover:text-white shadow-xl`}>
                      <Link to="/pals">👥 Meet All Pals</Link>
                    </Button>
                  </div>
                </div>
                
                <div className="text-center relative">
                  <div className="relative z-10 transform hover:scale-105 transition-all duration-500">
                    <OptimizedImage 
                      src={spotlightPalImage}
                      alt="Spotlight Pal - Your Cinematic Production Expert"
                      className="relative w-full max-w-lg mx-auto object-contain"
                      priority={true}
                      loading="eager"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What I Do Best Section */}
        <LazySection className="py-12 sm:py-16 lg:py-20 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">What I Do Best</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">From testimonials to brand films, I capture your wins in cinematic quality that builds trust and makes your success impossible to ignore.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* Left Features */}
              <div className="space-y-6 lg:order-1">
                <Collapsible open={openExpertise === 0} onOpenChange={() => toggleExpertise(0)}>
                  <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
                    <CollapsibleTrigger className="w-full text-left">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-2">Customer Testimonials</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Real stories from real customers that build trust and close more deals.
                          </p>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-200 flex-shrink-0 mt-1 ${openExpertise === 0 ? 'rotate-180' : ''}`} />
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2">
                      <p className="text-sm text-muted-foreground pt-2 border-t">
                        Professional video testimonials that showcase authentic customer experiences. These powerful social proof pieces turn prospects into believers and dramatically increase conversion rates.
                      </p>
                    </CollapsibleContent>
                    <div className="flex gap-3 text-2xl mt-4">
                      <span>⭐</span>
                      <span>🎤</span>
                      <span>💯</span>
                      <span>🤝</span>
                    </div>
                  </div>
                </Collapsible>

                <Collapsible open={openExpertise === 1} onOpenChange={() => toggleExpertise(1)}>
                  <div className="bg-purple-50 rounded-2xl p-6 border border-purple-100">
                    <CollapsibleTrigger className="w-full text-left">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-2">Case Study Reels</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Show measurable impact and results that demonstrate your value.
                          </p>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-200 flex-shrink-0 mt-1 ${openExpertise === 1 ? 'rotate-180' : ''}`} />
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2">
                      <p className="text-sm text-muted-foreground pt-2 border-t">
                        Data-driven proof of results videos that tell the story of transformation. Perfect for B2B companies that need to demonstrate ROI and tangible outcomes to close enterprise deals.
                      </p>
                    </CollapsibleContent>
                    <div className="flex gap-3 text-2xl mt-4">
                      <span>📊</span>
                      <span>📈</span>
                      <span>🎯</span>
                      <span>✅</span>
                    </div>
                  </div>
                </Collapsible>
              </div>

              {/* Center Phone Mockup */}
              <div className="relative flex flex-col items-center lg:order-2">
                <div className="relative w-full flex items-center justify-center">
                  <div className="relative w-[280px] h-[560px] bg-black rounded-[3rem] shadow-2xl border-[8px] border-gray-800 overflow-hidden">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-7 bg-black rounded-b-3xl z-10"></div>
                    
                    {/* Screen Content */}
                    <div className="relative h-full bg-white p-6 pt-12 flex items-center justify-center">
                      <OptimizedImage 
                        src={spotlightPalImage}
                        alt="Spotlight Pal"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Features */}
              <div className="space-y-6 lg:order-3">
                <Collapsible open={openExpertise === 2} onOpenChange={() => toggleExpertise(2)}>
                  <div className="bg-yellow-50 rounded-2xl p-6 border border-yellow-100">
                    <CollapsibleTrigger className="w-full text-left">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-2">Event Highlights</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Capture the energy of your launches, conferences, and milestone moments.
                          </p>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-200 flex-shrink-0 mt-1 ${openExpertise === 2 ? 'rotate-180' : ''}`} />
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2">
                      <p className="text-sm text-muted-foreground pt-2 border-t">
                        Dynamic event coverage that preserves the excitement and momentum of your biggest moments. Perfect for product launches, conferences, and company milestones that deserve cinematic treatment.
                      </p>
                    </CollapsibleContent>
                    <div className="flex gap-3 text-2xl mt-4">
                      <span>🎉</span>
                      <span>🎬</span>
                      <span>✨</span>
                      <span>🏆</span>
                    </div>
                  </div>
                </Collapsible>

                <Collapsible open={openExpertise === 3} onOpenChange={() => toggleExpertise(3)}>
                  <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                    <CollapsibleTrigger className="w-full text-left">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-2">Brand Hero Videos</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Cinematic brand films that elevate your homepage and command attention.
                          </p>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-200 flex-shrink-0 mt-1 ${openExpertise === 3 ? 'rotate-180' : ''}`} />
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2">
                      <p className="text-sm text-muted-foreground pt-2 border-t">
                        Story-driven hero videos that capture your brand essence in stunning visual narratives. These premium pieces position you as an industry leader and create unforgettable first impressions.
                      </p>
                    </CollapsibleContent>
                    <div className="flex gap-3 text-2xl mt-4">
                      <span>🎥</span>
                      <span>🌟</span>
                      <span>💎</span>
                      <span>🎭</span>
                    </div>
                  </div>
                </Collapsible>
              </div>
            </div>
          </div>
        </LazySection>

        {/* Packages Section */}
        <section className="py-20 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/20">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Spotlight Pal Packages</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Make your wins visible with video content that builds proof and trust.</p>
              </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* 7-Day Launch */}
              <div className="bg-background rounded-2xl p-8 text-center shadow-lg border-2 border-transparent hover:border-red-500 transition-all hover:scale-105 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">MOST POPULAR</div>
                </div>
                <div className="bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-semibold w-fit mx-auto mb-6 mt-4">HERO</div>
                <h3 className="text-2xl font-bold text-foreground mb-4">The 7-Day Launch</h3>
                <div className="text-4xl font-bold text-red-600 mb-6">$2,500</div>
                <ul className="space-y-4 mb-8 text-left">
                  <li className="flex items-center space-x-3">
                    <Check className="text-red-500 h-5 w-5" />
                    <span>1 strategy session + shoot day</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-red-500 h-5 w-5" />
                    <span>1 hero brand video (90-120 sec)</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-red-500 h-5 w-5" />
                    <span>3–5 cutdowns for social</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-red-500 h-5 w-5" />
                    <span>Fast turnaround (7 business days)</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-red-500 h-5 w-5" />
                    <span>Professional cinematic quality</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-red-500 h-5 w-5" />
                    <span>8 spots available this month</span>
                  </li>
                </ul>
                <Button asChild className="w-full bg-red-500 text-white hover:bg-red-600" size="lg">
                  <Link to="/contact">Book Launch</Link>
                </Button>
              </div>
              
              {/* Music Video */}
              <div className="bg-background rounded-2xl p-8 text-center shadow-lg border-2 border-transparent hover:border-red-500 transition-all hover:scale-105">
                <div className="bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-semibold w-fit mx-auto mb-6">MUSIC</div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Music Video Production</h3>
                <div className="text-4xl font-bold text-red-600 mb-6">Custom</div>
                <ul className="space-y-4 mb-8 text-left">
                  <li className="flex items-center space-x-3">
                    <Check className="text-red-500 h-5 w-5" />
                    <span>Cinematic music video creation</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-red-500 h-5 w-5" />
                    <span>Creative concept development</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-red-500 h-5 w-5" />
                    <span>Professional video production</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-red-500 h-5 w-5" />
                    <span>Multi-location shooting</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-red-500 h-5 w-5" />
                    <span>Advanced post-production</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-red-500 h-5 w-5" />
                    <span>Artist collaboration focused</span>
                  </li>
                </ul>
                <Button asChild className="w-full bg-red-500 text-white hover:bg-red-600" size="lg">
                  <Link to="/contact">Get Quote</Link>
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
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">My meticulous 4-phase approach ensures every frame reflects your brand's prestige and creates lasting impact.</p>
              </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  <Star className="text-white h-8 w-8" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Vision Development</h3>
                <p className="text-muted-foreground">We craft a creative vision that captures your brand's essence and translates it into cinematic storytelling.</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  <Lightbulb className="text-white h-8 w-8" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Pre-Production</h3>
                <p className="text-muted-foreground">Detailed planning including location scouting, casting, storyboarding, and all logistics for a flawless shoot.</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  <Camera className="text-white h-8 w-8" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Premium Production</h3>
                <p className="text-muted-foreground">Hollywood-level filming with professional crews, premium equipment, and artistic direction that exceeds expectations.</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  <Zap className="text-white h-8 w-8" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Post & Launch</h3>
                <p className="text-muted-foreground">Award-worthy editing, color grading, and sound design, plus strategic launch support for maximum impact.</p>
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
                <p className="text-xl text-muted-foreground">Everything you need to know about working with Spotlight Pal.</p>
              </div>
            
            <div className="space-y-6">
              {[
                {
                  question: "What makes your production different from other video companies?",
                  answer: "I bring Hollywood-level production values to brand storytelling. Every project receives cinematic treatment with premium equipment, professional crews, and artistic direction that creates truly memorable content."
                },
                {
                  question: "How long does a premium video production take?",
                  answer: "Timeline varies by scope. A signature brand story typically takes 4-6 weeks from concept to delivery, while premier campaigns can take 8-12 weeks. Iconic legacy projects are scheduled based on creative requirements."
                },
                {
                  question: "Do you handle all aspects of production?",
                  answer: "Absolutely! From initial creative development and casting to final delivery and launch strategy, I manage every detail to ensure a seamless, stress-free experience for you."
                },
                {
                  question: "Can you work with celebrity talent or influencers?",
                  answer: "Yes! I have connections with talent agencies and can facilitate celebrity partnerships, influencer collaborations, and professional actor casting to elevate your brand's reach and credibility."
                },
                {
                  question: "What kind of ROI can I expect from premium video content?",
                  answer: "Premium content typically generates significantly higher engagement, brand recognition, and conversion rates. Many clients see substantial increases in brand inquiries and enhanced market positioning that drives long-term value."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-background rounded-2xl p-8">
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
                    <div className="mt-6 text-muted-foreground">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-6 sm:mb-8">
              <OptimizedImage 
                src={spotlightPalHeadshot}
                alt="Female Spotlight Pal - Cinematic production expert with purple hair"
                className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full border-4 border-red-200 object-cover object-center"
                loading="lazy"
              />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Ready to Shine with Spotlight Pal?</h2>
            <p className="text-xl mb-12 max-w-3xl mx-auto text-muted-foreground">Let's create cinematic content that elevates your brand to iconic status. Book a strategy call and let's bring your vision to life with Hollywood-level production.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                <div className="text-2xl font-bold text-red-600 mb-2">Cinematic Quality</div>
                <p className="text-sm text-muted-foreground">Hollywood-level production that makes your brand unforgettable</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6">
                <div className="text-2xl font-bold text-purple-600 mb-2">Premium Experience</div>
                <p className="text-sm text-muted-foreground">White-glove service from concept to delivery and beyond</p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
                <div className="text-2xl font-bold text-yellow-600 mb-2">Award-Worthy Results</div>
                <p className="text-sm text-muted-foreground">Content that wins awards and drives exceptional business results</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button asChild size="lg" className="bg-red-500 text-white hover:bg-red-600">
                <a 
                  href="https://palmerhouseproductions.zohobookings.com/#/4740771000000078004"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book Your Strategy Call
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-2 border-red-500 text-red-600 hover:bg-red-500 hover:text-white">
                <Link to="/video-packages">View Premium Portfolio</Link>
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground mt-6">🎬 This month: Get a FREE creative consultation with any package booking!</p>
          </div>
        </section>

        {/* Related Pals Section */}
        <section className="py-20 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/20">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Meet My Fellow Pals</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Need more than just premium content? Check out my fellow Palmer House Pals who can help with other aspects of your video journey.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-background rounded-2xl p-8 text-center shadow-lg border-2 border-transparent hover:border-orange-500 transition-all hover:scale-105">
                  <div className="mb-6">
                    <OptimizedImage 
                      src={reelPalHeadshot}
                      alt="Female Reel Pal - Social media content creator in orange hoodie"
                      className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full object-cover object-center border-4 border-orange-200"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">Reel Pal</h3>
                  <p className="text-muted-foreground mb-4">Perfect for social media content and short-form videos</p>
                  <Button asChild className="bg-yellow-500 text-white hover:bg-yellow-600">
                    <Link to="/reel-pal">🎥 Meet Reel Pal</Link>
                  </Button>
                </div>
                
                <div className="bg-background rounded-2xl p-8 text-center shadow-lg border-2 border-transparent hover:border-purple-500 transition-all hover:scale-105">
                  <div className="mb-6">
                    <OptimizedImage 
                      src={systemPalHeadshot}
                      alt="Female System Pal - Workflow optimization expert with glasses"
                      className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full object-cover object-center border-4 border-purple-200"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">System Pal</h3>
                  <p className="text-muted-foreground mb-4">Perfect for businesses needing training videos and internal systems</p>
                  <Button asChild className="bg-purple-600 text-white hover:bg-purple-700">
                    <Link to="/system-pal">🎓 Meet System Pal</Link>
                  </Button>
                </div>
                
                <div className="bg-background rounded-2xl p-8 text-center shadow-lg border-2 border-transparent hover:border-green-500 transition-all hover:scale-105">
                  <div className="mb-6">
                    <OptimizedImage 
                      src={evergreenPalHeadshot}
                      alt="Male Evergreen Pal - Authority building expert in blue cardigan"
                      className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full object-cover object-center border-4 border-green-200"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">Evergreen Pal</h3>
                  <p className="text-muted-foreground mb-4">Ideal for long-term YouTube growth and authority building</p>
                  <Button asChild className="bg-green-600 text-white hover:bg-green-700">
                    <Link to="/evergreen-pal">🌱 Meet Evergreen Pal</Link>
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

export default SpotlightPal;