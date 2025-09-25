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
  Camera,
  Film
} from 'lucide-react';

const ReelPal = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (num: number) => {
    setOpenFAQ(openFAQ === num ? null : num);
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-orange-500 to-orange-700 text-white min-h-[500px] flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold w-fit mb-4">REEL PAL</div>
                <h1 className="text-5xl md:text-6xl font-bold mb-6">"Let's make content that connects!"</h1>
                <p className="text-xl mb-8 opacity-90">Your go-to guide for short-form social content that captures hearts and drives real engagement across all platforms.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="bg-orange-500 text-white hover:bg-orange-600">
                    <Link to="/contact">🚀 Start Creating Content</Link>
                  </Button>
                </div>
              </div>
              <div className="text-center">
                <img 
                  className="w-80 h-80 mx-auto rounded-full border-4 border-white/20 object-cover object-center" 
                  src="/lovable-uploads/5d98b294-ca3c-40a4-8b87-6dae295d4294.png" 
                  alt="Reel Pal - Your Social Content Creation Guide" 
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
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">From viral TikToks to Instagram Reels that convert, I help you create content that not only looks great but actually drives results for your business.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-orange-50 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Video className="text-white h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">TikTok Content</h3>
                <p className="text-muted-foreground">Trending content that captures attention and drives engagement on the world's fastest-growing platform.</p>
              </div>
              
              <div className="bg-blue-50 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <PlayCircle className="text-white h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Instagram Reels</h3>
                <p className="text-muted-foreground">Stories and Reels that showcase your brand personality and convert followers into customers.</p>
              </div>
              
              <div className="bg-green-50 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Video className="text-white h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">YouTube Shorts</h3>
                <p className="text-muted-foreground">Quick, impactful videos that grow your YouTube presence and drive subscribers.</p>
              </div>
              
              <div className="bg-orange-50 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Wrench className="text-white h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">DIY Kits</h3>
                <p className="text-muted-foreground">Complete content creation packages that enable you to create professional content in-house.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Packages Section */}
        <section className="py-20 bg-muted/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Reel Pal Packages</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Boost your social media presence with our proven content creation packages.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Starter Session */}
              <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 text-center border border-white/20 shadow-2xl hover:bg-white/20 transition-all duration-500 transform hover:scale-105 animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700 delay-300">
                <div className="bg-pal-orange/90 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-bold w-fit mx-auto mb-6 shadow-lg">STARTER</div>
                <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">The Starter Session</h3>
                <div className="text-5xl font-black text-yellow-300 mb-6 drop-shadow-2xl">$500</div>
                <ul className="space-y-4 mb-8 text-left">
                  <li className="flex items-center space-x-3">
                    <Check className="text-pal-orange h-6 w-6 drop-shadow-lg" />
                    <span className="text-white/90">30-minute filming session</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-pal-orange h-6 w-6 drop-shadow-lg" />
                    <span className="text-white/90">Minimum 3 edited videos</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-pal-orange h-6 w-6 drop-shadow-lg" />
                    <span className="text-white/90">One-minute video format</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-pal-orange h-6 w-6 drop-shadow-lg" />
                    <span className="text-white/90">Simple talking-head style</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-pal-orange h-6 w-6 drop-shadow-lg" />
                    <span className="text-white/90">Professional delivery</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-pal-orange h-6 w-6 drop-shadow-lg" />
                    <span className="text-white/90">Limited availability</span>
                  </li>
                </ul>
                <Button asChild className="w-full bg-pal-orange hover:bg-pal-orange/80 text-white font-bold shadow-xl hover:shadow-2xl transition-all transform hover:scale-105" size="lg">
                  <Link to="/contact">📱 Book Session</Link>
                </Button>
              </div>
              
              {/* DIY Package */}
              <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 text-center border border-white/20 shadow-2xl hover:bg-white/20 transition-all duration-500 transform hover:scale-105 animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700 delay-400">
                <div className="bg-pal-purple/90 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-bold w-fit mx-auto mb-6 shadow-lg">DIY</div>
                <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">25 DIY Reels</h3>
                <div className="text-5xl font-black text-yellow-300 mb-6 drop-shadow-2xl">$47</div>
                <ul className="space-y-4 mb-8 text-left">
                  <li className="flex items-center space-x-3">
                    <Check className="text-pal-purple h-6 w-6 drop-shadow-lg" />
                    <span className="text-white/90">25 talking-head reel ideas</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-pal-purple h-6 w-6 drop-shadow-lg" />
                    <span className="text-white/90">Platform breakdowns included</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-pal-purple h-6 w-6 drop-shadow-lg" />
                    <span className="text-white/90">Sample scripts provided</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-pal-purple h-6 w-6 drop-shadow-lg" />
                    <span className="text-white/90">Film from home setup</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-pal-purple h-6 w-6 drop-shadow-lg" />
                    <span className="text-white/90">Instant PDF download</span>
                  </li>
                </ul>
                <Button asChild className="w-full bg-pal-purple hover:bg-pal-purple/80 text-white font-bold shadow-xl hover:shadow-2xl transition-all transform hover:scale-105" size="lg">
                  <a href="https://payhip.com/b/u8wvz" target="_blank" rel="noopener noreferrer">🛒 Buy Now</a>
                </Button>
              </div>
              
              {/* Script Bundle */}
              <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 text-center border border-white/20 shadow-2xl hover:bg-white/20 transition-all duration-500 transform hover:scale-105 animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700 delay-500">
                <div className="bg-pal-green/90 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-bold w-fit mx-auto mb-6 shadow-lg">SCRIPTS</div>
                <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">Script Bundle</h3>
                <div className="text-5xl font-black text-yellow-300 mb-6 drop-shadow-2xl">$47</div>
                <ul className="space-y-4 mb-8 text-left">
                  <li className="flex items-center space-x-3">
                    <Check className="text-pal-green h-6 w-6 drop-shadow-lg" />
                    <span className="text-white/90">About Me video scripts</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-pal-green h-6 w-6 drop-shadow-lg" />
                    <span className="text-white/90">Social proof templates</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-pal-green h-6 w-6 drop-shadow-lg" />
                    <span className="text-white/90">Call-to-action scripts</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-pal-green h-6 w-6 drop-shadow-lg" />
                    <span className="text-white/90">FAQ video templates</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-pal-green h-6 w-6 drop-shadow-lg" />
                    <span className="text-white/90">Plug-and-play format</span>
                  </li>
                </ul>
                <Button asChild className="w-full bg-pal-green hover:bg-pal-green/80 text-white font-bold shadow-xl hover:shadow-2xl transition-all transform hover:scale-105" size="lg">
                  <a href="https://payhip.com/b/jxGKl" target="_blank" rel="noopener noreferrer">📝 Get Scripts</a>
                </Button>
              </div>
              
              {/* 30 Reels Package */}
              <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 text-center border border-pal-blue/40 shadow-2xl hover:bg-white/20 transition-all duration-500 transform hover:scale-105 relative animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700 delay-600">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-pal-blue text-white px-6 py-3 rounded-full text-sm font-bold shadow-xl">⭐ MOST POPULAR</div>
                </div>
                <div className="bg-pal-blue/90 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-bold w-fit mx-auto mb-6 mt-4 shadow-lg">DONE FOR YOU</div>
                <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">30 Reels in 30 Days</h3>
                <div className="text-5xl font-black text-yellow-300 mb-6 drop-shadow-2xl">$4,800</div>
                <ul className="space-y-4 mb-8 text-left">
                  <li className="flex items-center space-x-3">
                    <Check className="text-pal-blue h-6 w-6 drop-shadow-lg" />
                    <span className="text-white/90">1 full-day shoot (8 hours)</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-pal-blue h-6 w-6 drop-shadow-lg" />
                    <span className="text-white/90">30 social-ready videos</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-pal-blue h-6 w-6 drop-shadow-lg" />
                    <span className="text-white/90">15-30 seconds each</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-pal-blue h-6 w-6 drop-shadow-lg" />
                    <span className="text-white/90">Captions + formatting</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-pal-blue h-6 w-6 drop-shadow-lg" />
                    <span className="text-white/90">IG/LinkedIn/TikTok ready</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-pal-blue h-6 w-6 drop-shadow-lg" />
                    <span className="text-white/90">Only 3 spots available</span>
                  </li>
                </ul>
                <Button asChild className="w-full bg-pal-blue hover:bg-pal-blue/80 text-white font-bold shadow-xl hover:shadow-2xl transition-all transform hover:scale-105" size="lg">
                  <Link to="/contact">🚀 Book Now</Link>
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
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">My proven 4-step process ensures we create content that not only looks amazing but drives real results for your business.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  <MessageCircle className="text-white h-8 w-8" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Discovery Call</h3>
                <p className="text-muted-foreground">We dive deep into your brand, audience, and goals to create a personalized content strategy.</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  <Lightbulb className="text-white h-8 w-8" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Content Planning</h3>
                <p className="text-muted-foreground">I create a detailed content calendar with trending topics and platform-specific optimizations.</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  <Video className="text-white h-8 w-8" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Production</h3>
                <p className="text-muted-foreground">Professional filming and editing that brings your content to life with trending effects and music.</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  <Rocket className="text-white h-8 w-8" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Launch & Optimize</h3>
                <p className="text-muted-foreground">Strategic posting schedule with performance tracking and continuous optimization for maximum reach.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-muted/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
                    <div className="mt-4">
                      <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-gradient-to-br from-orange-500 to-orange-700 rounded-3xl p-12 lg:p-16 text-white">
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
                <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-orange-50">
                  <a 
                    href="https://palmerhouseproductions.zohobookings.com/#/4740771000000078004"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    🚀 Book Strategy Call
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link to="/pals">👥 Explore All Pals</Link>
                </Button>
              </div>
              
              <p className="text-white/80 mt-8">
                💎 <strong>Limited Time:</strong> Free content audit with every strategy call
              </p>
            </div>
          </div>
        </section>

        {/* Related Pals Section */}
        <section className="py-20 bg-muted/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
        </section>
      </div>
    </>
  );
};

export default ReelPal;