import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import spotlightPalImage from '@/assets/pals/female-spotlight-pal-cinematography.png';
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

const SpotlightPal = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (num: number) => {
    setOpenFAQ(openFAQ === num ? null : num);
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen relative overflow-hidden">
        {/* Static 4-Color Background Bars */}
        <div className="fixed top-0 left-0 w-full h-screen -z-10">
          <div className="w-full h-full flex">
            <div className="w-1/4 h-full bg-gradient-to-b from-orange-400 to-orange-600"></div>
            <div className="w-1/4 h-full bg-gradient-to-b from-purple-400 to-purple-600"></div>
            <div className="w-1/4 h-full bg-gradient-to-b from-green-400 to-green-600"></div>
            <div className="w-1/4 h-full bg-gradient-to-b from-blue-400 to-blue-600"></div>
          </div>
          {/* Static Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 via-red-500/10 to-blue-500/20"></div>
        </div>

        {/* Floating Animation Elements */}
        <div className="fixed inset-0 -z-5 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-bounce" style={{animationDuration: '3s'}}></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-red-300/20 rounded-full blur-lg animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
          <div className="absolute bottom-32 left-1/4 w-28 h-28 bg-white/5 rounded-full blur-2xl animate-bounce" style={{animationDelay: '2s', animationDuration: '5s'}}></div>
          <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-red-300/10 rounded-full blur-lg animate-bounce" style={{animationDelay: '0.5s', animationDuration: '3.5s'}}></div>
        </div>

        {/* Hero Section */}
        <section className="relative min-h-[600px] flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="bg-white p-12 rounded-3xl shadow-2xl border border-gray-100">
                <div className="bg-red-500 text-white px-6 py-3 rounded-full text-sm font-bold w-fit mb-6 shadow-lg">🎬 SPOTLIGHT PAL</div>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">"Let's create cinematic magic!"</h1>
                <p className="text-xl mb-8 text-muted-foreground">Your premier partner for cinematic brand films, premium commercials, and high-end video content that elevates your brand to iconic status.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="bg-red-500 text-white hover:bg-red-600 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                    <Link to="/contact">🚀 Book Strategy Call</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white shadow-xl">
                    <Link to="/pals">👥 Meet All Pals</Link>
                  </Button>
                </div>
              </div>
              
              <div className="text-center relative">
                <div className="relative z-10 transform hover:scale-105 transition-all duration-500">
                  <img 
                    className="relative w-full max-w-lg mx-auto object-contain" 
                    src={spotlightPalImage} 
                    alt="Spotlight Pal - Your Cinematic Production Expert" 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Expertise Section */}
        <section className="py-20 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/20">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">What I Do Best</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">From cinematic brand stories to premium commercials, I create video content that doesn't just look beautiful—it transforms how people see your brand.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-background rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all">
                  <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Film className="text-white h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">Brand Films</h3>
                  <p className="text-muted-foreground">Cinematic storytelling that captures your brand's essence and creates emotional connections with your audience.</p>
                </div>
                
                <div className="bg-background rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all">
                  <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Camera className="text-white h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">Premium Commercials</h3>
                  <p className="text-muted-foreground">High-end advertising content that showcases your products and services with Hollywood-level production value.</p>
                </div>
                
                <div className="bg-background rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all">
                  <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Sparkles className="text-white h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">Award Shows & Events</h3>
                  <p className="text-muted-foreground">Spectacular event coverage and promotional content that captures the energy and prestige of your special moments.</p>
                </div>
                
                <div className="bg-background rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Award className="text-white h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">Executive Profiles</h3>
                  <p className="text-muted-foreground">Distinguished leadership videos that position executives as industry visionaries and thought leaders.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Packages Section */}
        <section className="py-20 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/20">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Spotlight Pal Packages</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Premium video content that commands attention and creates lasting impact.</p>
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
                  answer: "Premium content typically generates significantly higher engagement, brand recognition, and conversion rates. Many clients see 300-500% increases in brand inquiries and enhanced market positioning that drives long-term value."
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
            <div className="mb-8">
              <img 
                className="w-32 h-32 mx-auto rounded-full border-4 border-red-200 object-cover object-center" 
                src="/lovable-uploads/04881cac-8132-4f58-b31d-07f97e89beaf.png" 
                alt="cartoon character red hair female wearing professional dark business suit, holding microphone, cinematic production mascot" 
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
                    <img 
                      className="w-24 h-24 mx-auto rounded-full object-cover object-center border-4 border-orange-200" 
                      src={reelPalHeadshot} 
                      alt="Female Reel Pal - Social media content creator in orange hoodie" 
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
                    <img 
                      className="w-24 h-24 mx-auto rounded-full object-cover object-center border-4 border-purple-200" 
                      src={systemPalHeadshot} 
                      alt="Female System Pal - Workflow optimization expert with glasses" 
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
                    <img 
                      className="w-24 h-24 mx-auto rounded-full object-cover object-center border-4 border-green-200" 
                      src={evergreenPalHeadshot} 
                      alt="Male Evergreen Pal - Authority building expert in blue cardigan" 
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
    </>
  );
};

export default SpotlightPal;