import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import evergreenPalImage from '@/assets/pals/female-evergreen-pal-seo-strategy.png';
import evergreenPalHeadshot from '@/assets/pals/male-evergreen-pal-headshot.jpg';
import reelPalHeadshot from '@/assets/pals/female-reel-pal-headshot-2.jpg';
import systemPalHeadshot from '@/assets/pals/female-system-pal-circular-2.jpg';
import spotlightPalHeadshot from '@/assets/pals/female-spotlight-pal-circular-2.jpg';
import { 
  TrendingUp, 
  Youtube, 
  Search, 
  Trophy, 
  Check, 
  MessageCircle, 
  Lightbulb, 
  Video, 
  Rocket,
  ChevronDown,
  ChevronUp,
  Target,
  BarChart
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const EvergreenPal = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [openExpertise, setOpenExpertise] = useState<number | null>(0);

  const toggleFAQ = (num: number) => {
    setOpenFAQ(openFAQ === num ? null : num);
  };

  const toggleExpertise = (num: number) => {
    setOpenExpertise(openExpertise === num ? null : num);
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen relative overflow-hidden bg-background">
        {/* Floating Animation Elements */}
        <div className="fixed inset-0 -z-5 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-bounce" style={{animationDuration: '3s'}}></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-green-300/20 rounded-full blur-lg animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
          <div className="absolute bottom-32 left-1/4 w-28 h-28 bg-white/5 rounded-full blur-2xl animate-bounce" style={{animationDelay: '2s', animationDuration: '5s'}}></div>
          <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-green-300/10 rounded-full blur-lg animate-bounce" style={{animationDelay: '0.5s', animationDuration: '3.5s'}}></div>
        </div>

        {/* Hero Section */}
        <section className="relative min-h-[600px] flex items-center pt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
            <div className="bg-white rounded-3xl p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="bg-blue-500 text-white px-6 py-3 rounded-full text-sm font-bold w-fit mb-6 shadow-lg">🌱 EVERGREEN PAL</div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">"Removing confusion from your offering"</h1>
                  <p className="text-lg md:text-xl mb-8 text-muted-foreground">Prospects don't understand what you do? Build evergreen content that makes your value crystal clear and brings in qualified leads while you sleep.</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild size="lg" className="bg-blue-500 text-white hover:bg-blue-600 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                      <Link to="/contact">🚀 Book Strategy Call</Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white shadow-xl">
                      <Link to="/pals">👥 Meet All Pals</Link>
                    </Button>
                  </div>
                </div>
                
                <div className="text-center relative">
                  <div className="relative z-10 transform hover:scale-105 transition-all duration-500">
                    <img 
                      className="relative w-full max-w-lg mx-auto object-contain" 
                      src={evergreenPalImage} 
                      alt="Evergreen Pal - Your SEO & Content Strategy Expert" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pain Points Section */}
        <section className="py-20 bg-blue-50 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Problems I Solve</h2>
              <p className="text-xl text-muted-foreground">Sound familiar? Let's fix it.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="group p-6 rounded-2xl bg-white/95 backdrop-blur-sm border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center group-hover:bg-red-200 transition-colors">
                    <MessageCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Prospects don't understand what you actually do</h3>
                    <p className="text-sm text-muted-foreground">Your website sounds smart, but visitors leave confused. Leads ghost because they don't "get it."</p>
                  </div>
                </div>
              </div>
              
              <div className="group p-6 rounded-2xl bg-white/95 backdrop-blur-sm border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center group-hover:bg-red-200 transition-colors">
                    <Search className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Zero visibility when people search for your solution</h3>
                    <p className="text-sm text-muted-foreground">Your ideal customers are Googling their problems, but finding your competitors instead.</p>
                  </div>
                </div>
              </div>
              
              <div className="group p-6 rounded-2xl bg-white/95 backdrop-blur-sm border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center group-hover:bg-red-200 transition-colors">
                    <Lightbulb className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Support team drowning in the same basic questions</h3>
                    <p className="text-sm text-muted-foreground">You're explaining pricing, process, and value over and over instead of closing deals.</p>
                  </div>
                </div>
              </div>
              
              <div className="group p-6 rounded-2xl bg-white/95 backdrop-blur-sm border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center group-hover:bg-red-200 transition-colors">
                    <TrendingUp className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">No consistent flow of qualified inbound leads</h3>
                    <p className="text-sm text-muted-foreground">You're stuck chasing leads instead of attracting the right people who are ready to buy.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What I Do Best Section */}
        <section className="py-20 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">What I Do Best</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">From homepage explainers to YouTube series, I help you create content that makes your offering crystal clear and drives inbound leads on autopilot.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* Left Features */}
              <div className="space-y-6 lg:order-1">
                <Collapsible open={openExpertise === 0} onOpenChange={() => toggleExpertise(0)}>
                  <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                    <CollapsibleTrigger className="w-full text-left">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-2">Homepage Explainers</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Get prospects to understand your value in 90 seconds or less.
                          </p>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-200 flex-shrink-0 mt-1 ${openExpertise === 0 ? 'rotate-180' : ''}`} />
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2">
                      <p className="text-sm text-muted-foreground pt-2 border-t">
                        Clear, concise videos that explain what you do and why it matters. Perfect for your homepage or product pages to convert confused visitors into qualified leads.
                      </p>
                    </CollapsibleContent>
                    <div className="flex gap-3 text-2xl mt-4">
                      <span>🏠</span>
                      <span>💡</span>
                      <span>✅</span>
                      <span>🎯</span>
                    </div>
                  </div>
                </Collapsible>

                <Collapsible open={openExpertise === 1} onOpenChange={() => toggleExpertise(1)}>
                  <div className="bg-purple-50 rounded-2xl p-6 border border-purple-100">
                    <CollapsibleTrigger className="w-full text-left">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-2">FAQ Videos</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Answer objections before they happen with clear, educational content.
                          </p>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-200 flex-shrink-0 mt-1 ${openExpertise === 1 ? 'rotate-180' : ''}`} />
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2">
                      <p className="text-sm text-muted-foreground pt-2 border-t">
                        Turn your top 10 frequently asked questions into a searchable video knowledge base. Reduce support burden while educating prospects at scale.
                      </p>
                    </CollapsibleContent>
                    <div className="flex gap-3 text-2xl mt-4">
                      <span>❓</span>
                      <span>💬</span>
                      <span>📚</span>
                      <span>🎓</span>
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
                      <img 
                        src={evergreenPalImage}
                        alt="Evergreen Pal"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Features */}
              <div className="space-y-6 lg:order-3">
                <Collapsible open={openExpertise === 2} onOpenChange={() => toggleExpertise(2)}>
                  <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100">
                    <CollapsibleTrigger className="w-full text-left">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-2">YouTube SEO Content</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Build authority and get discovered by your ideal customers searching for solutions.
                          </p>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-200 flex-shrink-0 mt-1 ${openExpertise === 2 ? 'rotate-180' : ''}`} />
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2">
                      <p className="text-sm text-muted-foreground pt-2 border-t">
                        Long-form educational videos optimized for YouTube search. Position yourself as the go-to expert while generating qualified leads 24/7.
                      </p>
                    </CollapsibleContent>
                    <div className="flex gap-3 text-2xl mt-4">
                      <span>📺</span>
                      <span>🔍</span>
                      <span>📈</span>
                      <span>⭐</span>
                    </div>
                  </div>
                </Collapsible>

                <Collapsible open={openExpertise === 3} onOpenChange={() => toggleExpertise(3)}>
                  <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100">
                    <CollapsibleTrigger className="w-full text-left">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-2">Service Walkthroughs</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Show exactly how your service works and what results clients can expect.
                          </p>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-200 flex-shrink-0 mt-1 ${openExpertise === 3 ? 'rotate-180' : ''}`} />
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2">
                      <p className="text-sm text-muted-foreground pt-2 border-t">
                        Detailed walkthroughs and pricing primers that address common objections. Help prospects visualize working with you before they book a call.
                      </p>
                    </CollapsibleContent>
                    <div className="flex gap-3 text-2xl mt-4">
                      <span>🚶</span>
                      <span>📋</span>
                      <span>💰</span>
                      <span>✨</span>
                    </div>
                  </div>
                </Collapsible>
              </div>
            </div>
          </div>
        </section>

        {/* Packages Section */}
        <section className="py-20 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/20">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Evergreen Pal Packages</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Remove confusion from your offering with clear, educational content that drives qualified leads.</p>
              </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Strategy Blueprint */}
              <div className="bg-background rounded-2xl p-8 text-center shadow-lg border-2 border-transparent hover:border-blue-500 transition-all hover:scale-105">
                <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold w-fit mx-auto mb-6">STRATEGY</div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Video Strategy Blueprint</h3>
                <div className="text-4xl font-bold text-blue-600 mb-6">$19</div>
                <ul className="space-y-4 mb-8 text-left">
                  <li className="flex items-center space-x-3">
                    <Check className="text-blue-500 h-5 w-5" />
                    <span>Step-by-step video guide</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-blue-500 h-5 w-5" />
                    <span>Growth stage strategies</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-blue-500 h-5 w-5" />
                    <span>Audience behavior insights</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-blue-500 h-5 w-5" />
                    <span>Content planning framework</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-blue-500 h-5 w-5" />
                    <span>Instant PDF download</span>
                  </li>
                </ul>
                <Button asChild className="w-full bg-blue-500 text-white hover:bg-blue-600" size="lg">
                  <a href="https://payhip.com/b/nIagA" target="_blank" rel="noopener noreferrer">Get Strategy</a>
                </Button>
              </div>
              
              {/* Founder Brand Kit */}
              <div className="bg-background rounded-2xl p-8 text-center shadow-lg border-2 border-transparent hover:border-blue-500 transition-all hover:scale-105 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">MOST POPULAR</div>
                </div>
                <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold w-fit mx-auto mb-6 mt-4">PERSONAL BRAND</div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Founder's Brand Kit</h3>
                <div className="text-4xl font-bold text-blue-600 mb-6">$6,000</div>
                <ul className="space-y-4 mb-8 text-left">
                  <li className="flex items-center space-x-3">
                    <Check className="text-blue-500 h-5 w-5" />
                    <span>1 shoot day + strategy</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-blue-500 h-5 w-5" />
                    <span>Founder bio video (90-120 sec)</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-blue-500 h-5 w-5" />
                    <span>2 hook/top-of-funnel videos</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-blue-500 h-5 w-5" />
                    <span>Vibe montage/sizzle reel</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-blue-500 h-5 w-5" />
                    <span>Multi-platform delivery</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-blue-500 h-5 w-5" />
                    <span>Only 4 spots available</span>
                  </li>
                </ul>
                <Button asChild className="w-full bg-blue-500 text-white hover:bg-blue-600" size="lg">
                  <Link to="/contact">Book Now</Link>
                </Button>
              </div>
              
              {/* YouTube Engine */}
              <div className="bg-background rounded-2xl p-8 text-center shadow-lg border-2 border-transparent hover:border-blue-500 transition-all hover:scale-105">
                <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold w-fit mx-auto mb-6">YOUTUBE</div>
                <h3 className="text-2xl font-bold text-foreground mb-4">YouTube Visibility Engine</h3>
                <div className="text-4xl font-bold text-blue-600 mb-6">$6,500</div>
                <ul className="space-y-4 mb-8 text-left">
                  <li className="flex items-center space-x-3">
                    <Check className="text-blue-500 h-5 w-5" />
                    <span>3 long-form videos (8-10 min)</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-blue-500 h-5 w-5" />
                    <span>Content strategy + series plan</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-blue-500 h-5 w-5" />
                    <span>Full scripting + outlines</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-blue-500 h-5 w-5" />
                    <span>Teleprompter support</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-blue-500 h-5 w-5" />
                    <span>SEO titles + descriptions</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-blue-500 h-5 w-5" />
                    <span>Only 2 spots this quarter</span>
                  </li>
                </ul>
                <Button asChild className="w-full bg-blue-500 text-white hover:bg-blue-600" size="lg">
                  <Link to="/contact">Book Now</Link>
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
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">My strategic 4-step process focuses on sustainable growth and long-term authority building that drives consistent results.</p>
              </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  <Target className="text-white h-8 w-8" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Strategic Planning</h3>
                <p className="text-muted-foreground">We identify your unique expertise and create a content strategy that builds lasting authority in your niche.</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  <Lightbulb className="text-white h-8 w-8" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Content Architecture</h3>
                <p className="text-muted-foreground">I design comprehensive content series that educate your audience and demonstrate your expertise systematically.</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  <Video className="text-white h-8 w-8" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Premium Production</h3>
                <p className="text-muted-foreground">High-quality video production that reflects your expertise and positions you as the authority in your field.</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  <BarChart className="text-white h-8 w-8" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Growth & Optimization</h3>
                <p className="text-muted-foreground">Continuous optimization based on performance data to maximize reach, engagement, and lead generation.</p>
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
                <p className="text-xl text-muted-foreground">Everything you need to know about working with Evergreen Pal.</p>
              </div>
            
            <div className="space-y-6">
              {[
                {
                  question: "How long does it take to see results on YouTube?",
                  answer: "While immediate engagement can happen quickly, meaningful authority building typically takes 3-6 months. However, the content we create continues working for years, generating leads and establishing credibility long after publication."
                },
                {
                  question: "Do you help with YouTube channel setup and optimization?",
                  answer: "Absolutely! I provide complete channel optimization including branding, descriptions, playlists, and strategic channel setup. This foundation is crucial for long-term success and discoverability."
                },
                {
                  question: "What makes your approach different from other YouTube strategies?",
                  answer: "I focus on sustainable, evergreen content that builds real authority rather than chasing viral trends. My approach creates content that continues attracting your ideal clients for years, not just weeks."
                },
                {
                  question: "Can you help repurpose content for other platforms?",
                  answer: "Yes! Part of the Evergreen strategy includes repurposing your YouTube content for LinkedIn, podcasts, blog posts, and other platforms to maximize your content investment and reach."
                },
                {
                  question: "How do you ensure the content aligns with my expertise?",
                  answer: "We start with deep discovery sessions to understand your unique insights, experiences, and expertise. I help you identify and articulate the knowledge that sets you apart in your industry."
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
                className="w-32 h-32 mx-auto rounded-full border-4 border-green-200 object-cover object-center" 
                src={evergreenPalHeadshot} 
                alt="Evergreen Pal - Male content strategist and SEO expert with brown hair and blue cardigan" 
              />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Ready to Build Authority with Evergreen Pal?</h2>
            <p className="text-xl mb-12 max-w-3xl mx-auto text-muted-foreground">Let's create content that establishes you as the go-to expert in your field. Book a strategy call and let's build your lasting authority together.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                <div className="text-2xl font-bold text-blue-600 mb-2">Strategic Focus</div>
                <p className="text-sm text-muted-foreground">Content that builds genuine expertise and authority over time</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                <div className="text-2xl font-bold text-blue-600 mb-2">Lasting Impact</div>
                <p className="text-sm text-muted-foreground">Videos that continue generating leads and building credibility for years</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                <div className="text-2xl font-bold text-blue-600 mb-2">Proven Growth</div>
                <p className="text-sm text-muted-foreground">Sustainable strategies that compound over time for exponential results</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button asChild size="lg" className="bg-blue-500 text-white hover:bg-blue-600">
                <a 
                  href="https://palmerhouseproductions.zohobookings.com/#/4740771000000078004"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book Your Strategy Call
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-2 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white">
                <Link to="/video-packages">View Authority Examples</Link>
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground mt-6">🌱 This month: Get a FREE authority audit with any package booking!</p>
          </div>
        </section>

        {/* Related Pals Section */}
        <section className="py-20 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/20">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Meet My Fellow Pals</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Need more than just authority building? Check out my fellow Palmer House Pals who can help with other aspects of your video journey.</p>
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
                
                <div className="bg-background rounded-2xl p-8 text-center shadow-lg border-2 border-transparent hover:border-red-500 transition-all hover:scale-105">
                  <div className="mb-6">
                    <img 
                      className="w-24 h-24 mx-auto rounded-full object-cover object-center border-4 border-red-200" 
                      src={spotlightPalHeadshot} 
                      alt="Female Spotlight Pal - Cinematic production expert with purple hair" 
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">Spotlight Pal</h3>
                  <p className="text-muted-foreground mb-4">Your go-to for cinematic brand films and premium content</p>
                  <Button asChild className="bg-red-600 text-white hover:bg-red-700">
                    <Link to="/spotlight-pal">🎬 Meet Spotlight Pal</Link>
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

export default EvergreenPal;