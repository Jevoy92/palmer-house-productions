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
        <section className="py-20 bg-white/10 backdrop-blur-sm relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-2xl">What I Do Best</h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto drop-shadow-lg">From viral TikToks to Instagram Reels that convert, I help you create content that not only looks great but actually drives results for your business.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 text-center border border-white/20 shadow-2xl hover:bg-white/20 transition-all duration-500 transform hover:scale-105">
                <div className="w-20 h-20 bg-orange-500/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border border-white/30">
                  <Video className="text-white h-10 w-10 drop-shadow-lg" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">TikTok Content</h3>
                <p className="text-white/80 leading-relaxed">Trending content that captures attention and drives engagement on the world's fastest-growing platform.</p>
              </div>
              
              <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 text-center border border-white/20 shadow-2xl hover:bg-white/20 transition-all duration-500 transform hover:scale-105">
                <div className="w-20 h-20 bg-purple-500/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border border-white/30">
                  <PlayCircle className="text-white h-10 w-10 drop-shadow-lg" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">Instagram Reels</h3>
                <p className="text-white/80 leading-relaxed">Stories and Reels that showcase your brand personality and convert followers into customers.</p>
              </div>
              
              <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 text-center border border-white/20 shadow-2xl hover:bg-white/20 transition-all duration-500 transform hover:scale-105">
                <div className="w-20 h-20 bg-green-500/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border border-white/30">
                  <Video className="text-white h-10 w-10 drop-shadow-lg" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">YouTube Shorts</h3>
                <p className="text-white/80 leading-relaxed">Quick, impactful videos that grow your YouTube presence and drive subscribers.</p>
              </div>
              
              <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 text-center border border-white/20 shadow-2xl hover:bg-white/20 transition-all duration-500 transform hover:scale-105">
                <div className="w-20 h-20 bg-blue-500/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border border-white/30">
                  <Wrench className="text-white h-10 w-10 drop-shadow-lg" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">DIY Kits</h3>
                <p className="text-white/80 leading-relaxed">Complete content creation packages that enable you to create professional content in-house.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Packages Section */}
        <section className="py-20 bg-white/5 backdrop-blur-sm relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-2xl">Reel Pal Packages</h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto drop-shadow-lg">Boost your social media presence with our proven content creation packages.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Starter Session */}
              <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 text-center border border-white/20 shadow-2xl hover:bg-white/20 transition-all duration-500 transform hover:scale-105">
                <div className="bg-orange-500/90 text-white px-6 py-3 rounded-full text-sm font-bold w-fit mx-auto mb-6 shadow-lg">STARTER</div>
                <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">The Starter Session</h3>
                <div className="text-4xl font-bold text-orange-300 mb-6 drop-shadow-2xl">$500</div>
                <ul className="space-y-4 mb-8 text-left">
                  <li className="flex items-center space-x-3">
                    <Check className="text-orange-400 h-6 w-6 drop-shadow-lg" />
                    <span className="text-white/90">30-minute filming session</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-orange-400 h-6 w-6 drop-shadow-lg" />
                    <span className="text-white/90">Minimum 3 edited videos</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-orange-400 h-6 w-6 drop-shadow-lg" />
                    <span className="text-white/90">One-minute video format</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-orange-400 h-6 w-6 drop-shadow-lg" />
                    <span className="text-white/90">Simple talking-head style</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-orange-400 h-6 w-6 drop-shadow-lg" />
                    <span className="text-white/90">Professional delivery</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-orange-400 h-6 w-6 drop-shadow-lg" />
                    <span className="text-white/90">Limited availability</span>
                  </li>
                </ul>
                <Button asChild className="w-full bg-orange-500 text-white hover:bg-orange-600 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105" size="lg">
                  <Link to="/contact">📱 Book Session</Link>
                </Button>
              </div>
              
              {/* DIY Package */}
              <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 text-center border border-white/20 shadow-2xl hover:bg-white/20 transition-all duration-500 transform hover:scale-105">
                <div className="bg-purple-500/90 text-white px-6 py-3 rounded-full text-sm font-bold w-fit mx-auto mb-6 shadow-lg">DIY</div>
                <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">25 DIY Reels</h3>
                <div className="text-4xl font-bold text-purple-300 mb-6 drop-shadow-2xl">$47</div>
                <ul className="space-y-4 mb-8 text-left">
                  <li className="flex items-center space-x-3">
                    <Check className="text-purple-400 h-6 w-6 drop-shadow-lg" />
                    <span className="text-white/90">25 talking-head reel ideas</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-purple-400 h-6 w-6 drop-shadow-lg" />
                    <span className="text-white/90">Platform breakdowns included</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-purple-400 h-6 w-6 drop-shadow-lg" />
                    <span className="text-white/90">Sample scripts provided</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-purple-400 h-6 w-6 drop-shadow-lg" />
                    <span className="text-white/90">Film from home setup</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-purple-400 h-6 w-6 drop-shadow-lg" />
                    <span className="text-white/90">Instant PDF download</span>
                  </li>
                </ul>
                <Button asChild className="w-full bg-purple-500 text-white hover:bg-purple-600 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105" size="lg">
                  <a href="https://payhip.com/b/u8wvz" target="_blank" rel="noopener noreferrer">🛒 Buy Now</a>
                </Button>
              </div>
              
              {/* Content Creation Package */}
              <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 text-center border border-white/20 shadow-2xl hover:bg-white/20 transition-all duration-500 transform hover:scale-105 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">POPULAR</div>
                </div>
                <div className="bg-green-500/90 text-white px-6 py-3 rounded-full text-sm font-bold w-fit mx-auto mb-6 mt-4 shadow-lg">CONTENT</div>
                <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">30 Reels in a Day</h3>
                <div className="text-4xl font-bold text-green-300 mb-6 drop-shadow-2xl">$3,000</div>
                <ul className="space-y-4 mb-8 text-left">
                  <li className="flex items-center space-x-3">
                    <Check className="text-green-400 h-6 w-6 drop-shadow-lg" />
                    <span className="text-white/90">1 full-day shoot (8 hours)</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-green-400 h-6 w-6 drop-shadow-lg" />
                    <span className="text-white/90">30 social-ready videos</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-green-400 h-6 w-6 drop-shadow-lg" />
                    <span className="text-white/90">15-30 seconds each</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-green-400 h-6 w-6 drop-shadow-lg" />
                    <span className="text-white/90">Captions + formatting</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-green-400 h-6 w-6 drop-shadow-lg" />
                    <span className="text-white/90">IG/LinkedIn/TikTok ready</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-green-400 h-6 w-6 drop-shadow-lg" />
                    <span className="text-white/90">Only 3 spots available</span>
                  </li>
                </ul>
                <Button asChild className="w-full bg-green-500 text-white hover:bg-green-600 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105" size="lg">
                  <Link to="/contact">🚀 Book Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-white/10 backdrop-blur-sm relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-2xl">How We Work Together</h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto drop-shadow-lg">My proven 4-step process ensures we create content that not only looks amazing but drives real results for your business.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-24 h-24 bg-orange-500/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 relative border border-white/20 shadow-2xl">
                  <MessageCircle className="text-white h-12 w-12 drop-shadow-lg" />
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-xl">1</div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">Discovery Call</h3>
                <p className="text-white/80 leading-relaxed">We dive deep into your brand, audience, and goals to create a personalized content strategy.</p>
              </div>
              
              <div className="text-center">
                <div className="w-24 h-24 bg-purple-500/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 relative border border-white/20 shadow-2xl">
                  <Lightbulb className="text-white h-12 w-12 drop-shadow-lg" />
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-xl">2</div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">Content Planning</h3>
                <p className="text-white/80 leading-relaxed">I create a detailed content calendar with trending topics and platform-specific optimizations.</p>
              </div>
              
              <div className="text-center">
                <div className="w-24 h-24 bg-green-500/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 relative border border-white/20 shadow-2xl">
                  <Video className="text-white h-12 w-12 drop-shadow-lg" />
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-xl">3</div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">Production</h3>
                <p className="text-white/80 leading-relaxed">Professional filming and editing that brings your content to life with trending effects and music.</p>
              </div>
              
              <div className="text-center">
                <div className="w-24 h-24 bg-blue-500/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 relative border border-white/20 shadow-2xl">
                  <Rocket className="text-white h-12 w-12 drop-shadow-lg" />
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-xl">4</div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">Launch & Optimize</h3>
                <p className="text-white/80 leading-relaxed">Strategic posting schedule with performance tracking and continuous optimization for maximum reach.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white/5 backdrop-blur-sm relative z-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-2xl">Frequently Asked Questions</h2>
              <p className="text-xl text-white/90 drop-shadow-lg">Everything you need to know about working with Reel Pal.</p>
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
                <div key={index} className="backdrop-blur-md bg-white/10 rounded-3xl border border-white/20 shadow-2xl">
                  <div 
                    className="w-full px-8 py-6 text-left flex justify-between items-center text-white hover:bg-white/10 transition-all rounded-3xl cursor-pointer" 
                    onClick={() => toggleFAQ(index + 1)}
                  >
                    <h3 className="text-xl font-bold drop-shadow-lg">{faq.question}</h3>
                    {openFAQ === index + 1 ? (
                      <ChevronUp className="text-white h-6 w-6 drop-shadow-lg" />
                    ) : (
                      <ChevronDown className="text-white h-6 w-6 drop-shadow-lg" />
                    )}
                  </div>
                  {openFAQ === index + 1 && (
                    <div className="px-8 pb-6">
                      <p className="text-white/80 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white/10 backdrop-blur-sm relative z-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="backdrop-blur-md bg-white/10 rounded-3xl p-12 lg:p-16 border border-white/20 shadow-2xl text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 drop-shadow-2xl">
                Ready to Create Content That Connects?
              </h2>
              <p className="text-xl mb-12 max-w-3xl mx-auto opacity-95 drop-shadow-lg">
                Let's work together to build your social media presence with content that actually converts. Book your strategy call today and let's make magic happen!
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="text-center">
                  <div className="w-20 h-20 bg-orange-500/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-white/30">
                    <Smartphone className="text-white h-10 w-10 drop-shadow-lg" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 drop-shadow-lg">Proven Systems</h3>
                  <p className="text-white/80">Strategies that actually work and drive real engagement</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-purple-500/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-white/30">
                    <Rocket className="text-white h-10 w-10 drop-shadow-lg" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 drop-shadow-lg">Fast Results</h3>
                  <p className="text-white/80">See improvement in your social media performance within weeks</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-green-500/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-white/30">
                    <Camera className="text-white h-10 w-10 drop-shadow-lg" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 drop-shadow-lg">Professional Quality</h3>
                  <p className="text-white/80">Content that looks great and represents your brand perfectly</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 px-12 py-6 text-xl">
                  <a 
                    href="https://palmerhouseproductions.zohobookings.com/#/4740771000000078004"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    🚀 Book Strategy Call
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 shadow-xl px-12 py-6 text-xl">
                  <Link to="/pals">👥 Explore All Pals</Link>
                </Button>
              </div>
              
              <p className="text-white/70 mt-8 text-lg">
                💎 <strong>Limited Time:</strong> Free content audit with every strategy call
              </p>
            </div>
          </div>
        </section>

        {/* Related Pals Section */}
        <section className="py-20 bg-white/5 backdrop-blur-sm relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-2xl">Meet My Fellow Pals</h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto drop-shadow-lg">Each Video Pal specializes in different content types. Find the perfect Pal for your specific video needs.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 text-center border border-white/20 shadow-2xl hover:bg-white/20 transition-all duration-500 transform hover:scale-105">
                <div className="mb-6">
                  <img 
                    className="w-24 h-24 mx-auto rounded-full object-cover object-center border-4 border-purple-300/30" 
                    src="/lovable-uploads/c70f84e1-b8ab-4479-a04d-7793a76d402f.png" 
                    alt="System Pal - Training & Internal Video Expert" 
                  />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 drop-shadow-lg">System Pal</h3>
                <p className="text-white/80 mb-4 leading-relaxed">Perfect for training videos, onboarding, and internal business content</p>
                <Button asChild className="bg-purple-500 text-white hover:bg-purple-600 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                  <Link to="/system-pal">🎓 Meet System Pal</Link>
                </Button>
              </div>
              
              <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 text-center border border-white/20 shadow-2xl hover:bg-white/20 transition-all duration-500 transform hover:scale-105">
                <div className="mb-6">
                  <img 
                    className="w-24 h-24 mx-auto rounded-full object-cover object-center border-4 border-green-300/30" 
                    src="/lovable-uploads/19c6453a-bac9-4e63-999a-5d7f6410b852.png" 
                    alt="Evergreen Pal - YouTube & Authority Content Expert" 
                  />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 drop-shadow-lg">Evergreen Pal</h3>
                <p className="text-white/80 mb-4 leading-relaxed">Ideal for long-term YouTube growth and authority building</p>
                <Button asChild className="bg-green-500 text-white hover:bg-green-600 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                  <Link to="/evergreen-pal">🌱 Meet Evergreen Pal</Link>
                </Button>
              </div>
              
              <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 text-center border border-white/20 shadow-2xl hover:bg-white/20 transition-all duration-500 transform hover:scale-105">
                <div className="mb-6">
                  <img 
                    className="w-24 h-24 mx-auto rounded-full object-cover object-center border-4 border-blue-300/30" 
                    src="/lovable-uploads/04881cac-8132-4f58-b31d-07f97e89beaf.png" 
                    alt="Spotlight Pal - Cinematic Brand Video Expert" 
                  />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 drop-shadow-lg">Spotlight Pal</h3>
                <p className="text-white/80 mb-4 leading-relaxed">Your go-to for cinematic brand films and premium content</p>
                <Button asChild className="bg-blue-500 text-white hover:bg-blue-600 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                  <Link to="/spotlight-pal">🎬 Meet Spotlight Pal</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ReelPal;