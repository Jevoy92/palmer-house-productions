import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
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

const EvergreenPal = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (num: number) => {
    setOpenFAQ(openFAQ === num ? null : num);
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-600 to-green-800 text-white min-h-[500px] flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold w-fit mb-4">EVERGREEN PAL</div>
                <h1 className="text-5xl md:text-6xl font-bold mb-6">"Let's build lasting authority!"</h1>
                <p className="text-xl mb-8 opacity-90">Your strategic partner for YouTube growth, thought leadership content, and building sustainable authority that drives long-term business success.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="bg-green-500 text-white hover:bg-green-600">
                    <a 
                      href="https://palmerhouseproductions.zohobookings.com/#/4740771000000078004"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Book a Strategy Call
                    </a>
                  </Button>
                </div>
              </div>
              <div className="text-center">
                <img 
                  className="w-80 h-80 mx-auto rounded-full border-4 border-white/20 object-cover object-center" 
                  src="/lovable-uploads/19c6453a-bac9-4e63-999a-5d7f6410b852.png" 
                  alt="cartoon character male with gray hair and beard, teal coat, holding golden play button with plants and educational elements, evergreen content creator mascot" 
                />
              </div>
            </div>
          </div>
        </section>

        {/* Expertise Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">What I Do Best</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">From YouTube optimization to thought leadership content, I help you build lasting authority that generates leads for years to come.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-green-50 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Youtube className="text-white h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">YouTube Strategy</h3>
                <p className="text-muted-foreground">Strategic content that builds subscriber growth and establishes your expertise in your industry.</p>
              </div>
              
              <div className="bg-blue-50 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="text-white h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">SEO Optimization</h3>
                <p className="text-muted-foreground">Content optimized for search that helps your ideal clients find you when they need your expertise.</p>
              </div>
              
              <div className="bg-purple-50 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Trophy className="text-white h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Thought Leadership</h3>
                <p className="text-muted-foreground">Authority-building content that positions you as the go-to expert in your field.</p>
              </div>
              
              <div className="bg-orange-50 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="text-white h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Long-term Growth</h3>
                <p className="text-muted-foreground">Sustainable strategies that compound over time, creating lasting business value.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Packages Section */}
        <section className="py-20 bg-muted/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Evergreen Pal Packages</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Build lasting authority with content strategies designed for long-term growth and sustainable lead generation.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Strategy Blueprint */}
              <div className="bg-background rounded-2xl p-8 text-center shadow-lg border-2 border-transparent hover:border-green-500 transition-all hover:scale-105">
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold w-fit mx-auto mb-6">STRATEGY</div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Video Strategy Blueprint</h3>
                <div className="text-4xl font-bold text-green-600 mb-6">$19</div>
                <ul className="space-y-4 mb-8 text-left">
                  <li className="flex items-center space-x-3">
                    <Check className="text-green-500 h-5 w-5" />
                    <span>Step-by-step video guide</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-green-500 h-5 w-5" />
                    <span>Growth stage strategies</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-green-500 h-5 w-5" />
                    <span>Audience behavior insights</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-green-500 h-5 w-5" />
                    <span>Content planning framework</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-green-500 h-5 w-5" />
                    <span>Instant PDF download</span>
                  </li>
                </ul>
                <Button asChild className="w-full bg-green-500 text-white hover:bg-green-600" size="lg">
                  <a href="https://payhip.com/b/nIagA" target="_blank" rel="noopener noreferrer">Get Strategy</a>
                </Button>
              </div>
              
              {/* Founder Brand Kit */}
              <div className="bg-background rounded-2xl p-8 text-center shadow-lg border-2 border-transparent hover:border-green-500 transition-all hover:scale-105 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">MOST POPULAR</div>
                </div>
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold w-fit mx-auto mb-6 mt-4">PERSONAL BRAND</div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Founder's Brand Kit</h3>
                <div className="text-4xl font-bold text-green-600 mb-6">$6,000</div>
                <ul className="space-y-4 mb-8 text-left">
                  <li className="flex items-center space-x-3">
                    <Check className="text-green-500 h-5 w-5" />
                    <span>1 shoot day + strategy</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-green-500 h-5 w-5" />
                    <span>Founder bio video (90-120 sec)</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-green-500 h-5 w-5" />
                    <span>2 hook/top-of-funnel videos</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-green-500 h-5 w-5" />
                    <span>Vibe montage/sizzle reel</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-green-500 h-5 w-5" />
                    <span>Multi-platform delivery</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-green-500 h-5 w-5" />
                    <span>Only 4 spots available</span>
                  </li>
                </ul>
                <Button asChild className="w-full bg-green-500 text-white hover:bg-green-600" size="lg">
                  <Link to="/contact">Book Now</Link>
                </Button>
              </div>
              
              {/* YouTube Engine */}
              <div className="bg-background rounded-2xl p-8 text-center shadow-lg border-2 border-transparent hover:border-green-500 transition-all hover:scale-105">
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold w-fit mx-auto mb-6">YOUTUBE</div>
                <h3 className="text-2xl font-bold text-foreground mb-4">YouTube Visibility Engine</h3>
                <div className="text-4xl font-bold text-green-600 mb-6">$6,500</div>
                <ul className="space-y-4 mb-8 text-left">
                  <li className="flex items-center space-x-3">
                    <Check className="text-green-500 h-5 w-5" />
                    <span>3 long-form videos (8-10 min)</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-green-500 h-5 w-5" />
                    <span>Content strategy + series plan</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-green-500 h-5 w-5" />
                    <span>Full scripting + outlines</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-green-500 h-5 w-5" />
                    <span>Teleprompter support</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-green-500 h-5 w-5" />
                    <span>SEO titles + descriptions</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-green-500 h-5 w-5" />
                    <span>Only 2 spots this quarter</span>
                  </li>
                </ul>
                <Button asChild className="w-full bg-green-500 text-white hover:bg-green-600" size="lg">
                  <Link to="/contact">Book Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">How We Work Together</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">My strategic 4-step process focuses on sustainable growth and long-term authority building that drives consistent results.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  <Target className="text-white h-8 w-8" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Strategic Planning</h3>
                <p className="text-muted-foreground">We identify your unique expertise and create a content strategy that builds lasting authority in your niche.</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  <Lightbulb className="text-white h-8 w-8" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Content Architecture</h3>
                <p className="text-muted-foreground">I design comprehensive content series that educate your audience and demonstrate your expertise systematically.</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  <Video className="text-white h-8 w-8" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Premium Production</h3>
                <p className="text-muted-foreground">High-quality video production that reflects your expertise and positions you as the authority in your field.</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  <BarChart className="text-white h-8 w-8" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Growth & Optimization</h3>
                <p className="text-muted-foreground">Continuous optimization based on performance data to maximize reach, engagement, and lead generation.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-muted/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
        </section>

        {/* Call to Action Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-8">
              <img 
                className="w-32 h-32 mx-auto rounded-full border-4 border-green-200 object-cover object-center" 
                src="/lovable-uploads/19c6453a-bac9-4e63-999a-5d7f6410b852.png" 
                alt="cartoon character male with gray hair and beard, teal coat, holding golden play button with plants and educational elements, evergreen content creator mascot" 
              />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Ready to Build Authority with Evergreen Pal?</h2>
            <p className="text-xl mb-12 max-w-3xl mx-auto text-muted-foreground">Let's create content that establishes you as the go-to expert in your field. Book a strategy call and let's build your lasting authority together.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                <div className="text-2xl font-bold text-green-600 mb-2">Strategic Focus</div>
                <p className="text-sm text-muted-foreground">Content that builds genuine expertise and authority over time</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                <div className="text-2xl font-bold text-blue-600 mb-2">Lasting Impact</div>
                <p className="text-sm text-muted-foreground">Videos that continue generating leads and building credibility for years</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6">
                <div className="text-2xl font-bold text-purple-600 mb-2">Proven Growth</div>
                <p className="text-sm text-muted-foreground">Sustainable strategies that compound over time for exponential results</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button asChild size="lg" className="bg-green-500 text-white hover:bg-green-600">
                <a 
                  href="https://palmerhouseproductions.zohobookings.com/#/4740771000000078004"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book Your Strategy Call
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white">
                <Link to="/video-packages">View Authority Examples</Link>
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground mt-6">🌱 This month: Get a FREE authority audit with any package booking!</p>
          </div>
        </section>

        {/* Related Pals Section */}
        <section className="py-20 bg-muted/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Meet My Fellow Pals</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Need more than just authority building? Check out my fellow Palmer House Pals who can help with other aspects of your video journey.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-background rounded-2xl p-8 text-center transition-all hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                <div className="mb-6">
                  <img 
                    className="w-24 h-24 mx-auto rounded-full object-cover object-center" 
                    src="/lovable-uploads/5d98b294-ca3c-40a4-8b87-6dae295d4294.png" 
                    alt="cartoon character female with brown hair in bun, orange shirt and jeans, holding smartphone, social media creator mascot" 
                  />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Reel Pal</h3>
                <p className="text-muted-foreground mb-4">Perfect for social media content and short-form videos</p>
                <Button asChild className="bg-yellow-500 text-white hover:bg-yellow-600">
                  <Link to="/reel-pal">Meet Reel Pal</Link>
                </Button>
              </div>
              
              <div className="bg-background rounded-2xl p-8 text-center transition-all hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                <div className="mb-6">
                  <img 
                    className="w-24 h-24 mx-auto rounded-full object-cover object-center" 
                    src="/lovable-uploads/1d3c7a2a-e5cb-4900-9b76-9eadb6620973.png" 
                    alt="System Pal - professional male character in gray jacket with green accents, surrounded by workflow icons, gears, folders, and organizational elements" 
                  />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">System Pal</h3>
                <p className="text-muted-foreground mb-4">Perfect for businesses needing training videos and internal systems</p>
                <Button asChild className="bg-purple-600 text-white hover:bg-purple-700">
                  <Link to="/system-pal">Meet System Pal</Link>
                </Button>
              </div>
              
              <div className="bg-background rounded-2xl p-8 text-center transition-all hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                <div className="mb-6">
                  <img 
                    className="w-24 h-24 mx-auto rounded-full object-cover object-center" 
                    src="/lovable-uploads/04881cac-8132-4f58-b31d-07f97e89beaf.png" 
                    alt="cartoon character red hair female wearing professional dark business suit, holding microphone, cinematic production mascot" 
                  />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Spotlight Pal</h3>
                <p className="text-muted-foreground mb-4">Your go-to for cinematic brand films and premium content</p>
                <Button asChild className="bg-red-600 text-white hover:bg-red-700">
                  <Link to="/spotlight-pal">Meet Spotlight Pal</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default EvergreenPal;