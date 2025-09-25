import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
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
  Camera
} from 'lucide-react';

const ReelPal = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (num: number) => {
    setOpenFAQ(openFAQ === num ? null : num);
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen relative overflow-hidden">
        {/* Animated 4-Color Background Bars */}
        <div className="fixed top-0 left-0 w-full h-screen -z-10">
          <div className="w-full h-full flex">
            <div className="w-1/4 h-full bg-gradient-to-b from-orange-400 to-orange-600 animate-pulse"></div>
            <div className="w-1/4 h-full bg-gradient-to-b from-purple-400 to-purple-600 animate-pulse" style={{animationDelay: '0.5s'}}></div>
            <div className="w-1/4 h-full bg-gradient-to-b from-green-400 to-green-600 animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="w-1/4 h-full bg-gradient-to-b from-blue-400 to-blue-600 animate-pulse" style={{animationDelay: '1.5s'}}></div>
          </div>
          {/* Animated Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-purple-500/10 to-blue-500/20"></div>
        </div>

        {/* Floating Animation Elements */}
        <div className="fixed inset-0 -z-5 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-bounce" style={{animationDuration: '3s'}}></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-orange-300/20 rounded-full blur-lg animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
          <div className="absolute bottom-32 left-1/4 w-28 h-28 bg-white/5 rounded-full blur-2xl animate-bounce" style={{animationDelay: '2s', animationDuration: '5s'}}></div>
          <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-purple-300/10 rounded-full blur-lg animate-bounce" style={{animationDelay: '0.5s', animationDuration: '3.5s'}}></div>
        </div>

        {/* Hero Section */}
        <section className="relative text-white min-h-[600px] flex items-center backdrop-blur-sm bg-black/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="backdrop-blur-md bg-white/10 p-8 rounded-3xl border border-white/20 shadow-2xl">
                <div className="bg-orange-500/90 text-white px-6 py-3 rounded-full text-sm font-bold w-fit mb-6 shadow-lg animate-pulse">📱 REEL PAL</div>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-2xl">"Let's make content that connects!"</h1>
                <p className="text-xl mb-8 opacity-95 drop-shadow-lg">Your go-to guide for short-form social content that captures hearts and drives real engagement across all platforms.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="bg-orange-500 text-white hover:bg-orange-600 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                    <Link to="/contact">🚀 Start Creating Content</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 shadow-xl">
                    <Link to="/pals">👥 Meet All Pals</Link>
                  </Button>
                </div>
              </div>
              
              <div className="text-center relative">
                <div className="relative z-10 transform hover:scale-110 transition-all duration-500">
                  <div className="absolute inset-0 bg-orange-400/30 rounded-full blur-3xl scale-125 animate-pulse"></div>
                  <img 
                    className="relative w-80 h-80 mx-auto rounded-full border-4 border-white/30 object-cover object-center shadow-2xl" 
                    src="/lovable-uploads/5d98b294-ca3c-40a4-8b87-6dae295d4294.png" 
                    alt="Reel Pal - Your Social Content Creation Guide" 
                  />
                </div>
                
                {/* Floating Elements Around Character */}
                <div className="absolute -top-5 -left-10 text-5xl animate-bounce">📱</div>
                <div className="absolute -top-3 -right-12 text-4xl animate-pulse">🎬</div>
                <div className="absolute -bottom-8 left-5 text-4xl animate-bounce" style={{animationDelay: '0.5s'}}>✨</div>
                <div className="absolute -bottom-5 -right-8 text-3xl animate-pulse" style={{animationDelay: '1s'}}>🚀</div>
                <div className="absolute top-1/2 -left-16 text-3xl animate-bounce" style={{animationDelay: '0.3s'}}>📺</div>
                <div className="absolute top-1/2 -right-16 text-3xl animate-bounce" style={{animationDelay: '1.2s'}}>🎭</div>
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
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">From viral TikToks to Instagram Reels that convert, I help you create content that not only looks great but actually drives results for your business.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-orange-50 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Video className="text-white h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">TikTok Content</h3>
                  <p className="text-muted-foreground">Trending content that captures attention and drives engagement on the world's fastest-growing platform.</p>
                </div>
                
                <div className="bg-purple-50 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <PlayCircle className="text-white h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">Instagram Reels</h3>
                  <p className="text-muted-foreground">Stories and Reels that showcase your brand personality and convert followers into customers.</p>
                </div>
                
                <div className="bg-green-50 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Video className="text-white h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">YouTube Shorts</h3>
                  <p className="text-muted-foreground">Quick, impactful videos that grow your YouTube presence and drive subscribers.</p>
                </div>
                
                <div className="bg-blue-50 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Wrench className="text-white h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">DIY Kits</h3>
                  <p className="text-muted-foreground">Complete content creation packages that enable you to create professional content in-house.</p>
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
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Reel Pal Packages</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Boost your social media presence with our proven content creation packages.</p>
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
            <div className="bg-gradient-to-br from-orange-500 to-orange-700 rounded-3xl p-12 lg:p-16 text-white shadow-2xl">
              <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-8">
                  Ready to Create Content That Connects?
                </h2>
                <p className="text-xl mb-12 max-w-3xl mx-auto opacity-90">
                  Let's work together to build your social media presence with content that actually converts. Book your strategy call today and let's make magic happen!
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Smartphone className="text-white h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Proven Systems</h3>
                    <p className="opacity-90">Strategies that actually work and drive real engagement</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Rocket className="text-white h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Fast Results</h3>
                    <p className="opacity-90">See improvement in your social media performance within weeks</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Camera className="text-white h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Professional Quality</h3>
                    <p className="opacity-90">Content that looks great and represents your brand perfectly</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-orange-50 shadow-xl">
                    <a 
                      href="https://palmerhouseproductions.zohobookings.com/#/4740771000000078004"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      🚀 Book Strategy Call
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 shadow-xl">
                    <Link to="/pals">👥 Explore All Pals</Link>
                  </Button>
                </div>
                
                <p className="text-white/80 mt-8">
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
                      src="/lovable-uploads/c70f84e1-b8ab-4479-a04d-7793a76d402f.png" 
                      alt="System Pal - Training & Internal Video Expert" 
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
                      src="/lovable-uploads/19c6453a-bac9-4e63-999a-5d7f6410b852.png" 
                      alt="Evergreen Pal - YouTube & Authority Content Expert" 
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
                      src="/lovable-uploads/04881cac-8132-4f58-b31d-07f97e89beaf.png" 
                      alt="Spotlight Pal - Cinematic Brand Video Expert" 
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
    </>
  );
};

export default ReelPal;