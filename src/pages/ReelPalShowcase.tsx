import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { MetaTags } from '@/components/seo/MetaTags';
import { 
  TrendingUp, 
  Video, 
  MessageCircle, 
  Lightbulb, 
  Rocket, 
  Eye, 
  Users, 
  ChartLine, 
  Star, 
  ChevronDown, 
  ChevronUp,
  Wrench,
  Instagram,
  Youtube,
  Menu
} from 'lucide-react';

export default function ReelPalShowcase() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // Handle scroll effect for header
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      setIsScrolled(window.scrollY > 50);
    });
  }

  return (
    <>
      <MetaTags
        title="Reel Pal Showcase - Social Media Video Expert | Palmer House Productions"
        description="Experience Reel Pal's expertise in creating viral TikToks, Instagram Reels, and short-form content that drives real engagement and business results."
        keywords="reel pal, social media video, TikTok creation, Instagram Reels, short-form content, viral videos, social media marketing"
      />

      {/* Header */}
      <header 
        className={`bg-video-white shadow-lg sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? 'backdrop-blur-sm bg-video-white/90' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold text-corporate-dark">Palmer House Productions</div>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <span className="text-corporate-gray hover:text-primary transition-colors cursor-pointer">Home</span>
              <span className="text-primary font-semibold cursor-pointer">Meet the Pals</span>
              <span className="text-corporate-gray hover:text-primary transition-colors cursor-pointer">Services</span>
              <span className="text-corporate-gray hover:text-primary transition-colors cursor-pointer">Portfolio</span>
              <span className="text-corporate-gray hover:text-primary transition-colors cursor-pointer">Contact</span>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Book Strategy Call
              </Button>
            </nav>
            <div className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6 text-corporate-gray" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="gradient-social-2 text-video-white h-[500px] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-social-yellow/20 text-social-yellow px-4 py-2 rounded-full text-sm font-semibold w-fit mb-4 border border-social-yellow/30">
                REEL PAL
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                "Let's make content that connects!"
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Your go-to guide for short-form social content that captures hearts and drives real engagement. 
                I specialize in authentic content that resonates with your audience across all platforms.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-social-yellow text-corporate-dark hover:bg-social-yellow/90 font-semibold">
                  Book a Strategy Call
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-video-white text-video-white hover:bg-video-white hover:text-corporate-dark"
                >
                  View Portfolio
                </Button>
              </div>
            </div>
            <div className="text-center">
              <img 
                className="w-80 h-80 mx-auto rounded-full border-4 border-video-white/20" 
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/25d8c66845-bb993d7dd66fd010bb42.png" 
                alt="Reel Pal - Social Media Video Expert"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-20 bg-video-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-corporate-dark mb-6">
              What I Do Best
            </h2>
            <p className="text-xl text-corporate-gray max-w-3xl mx-auto">
              From viral TikToks to Instagram Reels that convert, I help you create content that not only looks great but actually drives results for your business.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-social-yellow/10 rounded-2xl p-8 text-center transition-all duration-300 hover:transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-social-yellow rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="text-video-white text-2xl" size={24} />
              </div>
              <h3 className="text-xl font-bold text-corporate-dark mb-4">TikTok Content</h3>
              <p className="text-corporate-gray">Trending content that captures attention and drives engagement on the world's fastest-growing platform.</p>
            </div>
            
            <div className="bg-social-blue/10 rounded-2xl p-8 text-center transition-all duration-300 hover:transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-social-blue rounded-full flex items-center justify-center mx-auto mb-6">
                <Instagram className="text-video-white text-2xl" size={24} />
              </div>
              <h3 className="text-xl font-bold text-corporate-dark mb-4">Instagram Reels</h3>
              <p className="text-corporate-gray">Stories and Reels that showcase your brand personality and convert followers into customers.</p>
            </div>
            
            <div className="bg-social-pink/10 rounded-2xl p-8 text-center transition-all duration-300 hover:transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-social-pink rounded-full flex items-center justify-center mx-auto mb-6">
                <Youtube className="text-video-white text-2xl" size={24} />
              </div>
              <h3 className="text-xl font-bold text-corporate-dark mb-4">YouTube Shorts</h3>
              <p className="text-corporate-gray">Quick, impactful videos that grow your YouTube presence and drive subscribers.</p>
            </div>
            
            <div className="bg-social-green/10 rounded-2xl p-8 text-center transition-all duration-300 hover:transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-social-green rounded-full flex items-center justify-center mx-auto mb-6">
                <Wrench className="text-video-white text-2xl" size={24} />
              </div>
              <h3 className="text-xl font-bold text-corporate-dark mb-4">DIY Kits</h3>
              <p className="text-corporate-gray">Complete content creation packages that enable you to create professional content in-house.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20 bg-corporate-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-corporate-dark mb-6">
              Reel Pal Packages
            </h2>
            <p className="text-xl text-corporate-gray max-w-3xl mx-auto">
              Choose the perfect package to kickstart your social media content journey. From quick wins to comprehensive strategies.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter Package */}
            <div className="bg-video-white rounded-2xl p-8 text-center shadow-lg border-2 border-transparent hover:border-social-yellow hover:scale-105 transition-all duration-300">
              <div className="bg-social-yellow/20 text-social-yellow px-4 py-2 rounded-full text-sm font-semibold w-fit mx-auto mb-6">
                STARTER
              </div>
              <h3 className="text-2xl font-bold text-corporate-dark mb-4">Starter Session</h3>
              <div className="text-4xl font-bold text-social-yellow mb-6">$500</div>
              <ul className="space-y-4 mb-8 text-left">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-social-yellow rounded-full"></div>
                  <span>5 short-form videos</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-social-yellow rounded-full"></div>
                  <span>Platform optimization</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-social-yellow rounded-full"></div>
                  <span>Content strategy session</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-social-yellow rounded-full"></div>
                  <span>Basic editing included</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-social-yellow rounded-full"></div>
                  <span>1 revision round</span>
                </li>
              </ul>
              <Button className="w-full bg-social-yellow text-corporate-dark hover:bg-social-yellow/90 mb-4">
                Get Started
              </Button>
              <Button variant="outline" className="w-full border-2 border-social-yellow text-social-yellow hover:bg-social-yellow hover:text-corporate-dark">
                Learn More
              </Button>
            </div>
            
            {/* Growth Package */}
            <div className="bg-video-white rounded-2xl p-8 text-center shadow-lg border-2 border-transparent hover:border-social-yellow hover:scale-105 transition-all duration-300 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-social-yellow text-corporate-dark px-4 py-2 rounded-full text-sm font-semibold">
                  MOST POPULAR
                </div>
              </div>
              <div className="bg-social-yellow/20 text-social-yellow px-4 py-2 rounded-full text-sm font-semibold w-fit mx-auto mb-6 mt-4">
                GROWTH
              </div>
              <h3 className="text-2xl font-bold text-corporate-dark mb-4">Content Boost</h3>
              <div className="text-4xl font-bold text-social-yellow mb-6">$1,200</div>
              <ul className="space-y-4 mb-8 text-left">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-social-yellow rounded-full"></div>
                  <span>15 short-form videos</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-social-yellow rounded-full"></div>
                  <span>Multi-platform optimization</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-social-yellow rounded-full"></div>
                  <span>Content calendar planning</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-social-yellow rounded-full"></div>
                  <span>Advanced editing & effects</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-social-yellow rounded-full"></div>
                  <span>Unlimited revisions</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-social-yellow rounded-full"></div>
                  <span>Performance analytics</span>
                </li>
              </ul>
              <Button className="w-full bg-social-yellow text-corporate-dark hover:bg-social-yellow/90 mb-4">
                Choose Growth
              </Button>
              <Button variant="outline" className="w-full border-2 border-social-yellow text-social-yellow hover:bg-social-yellow hover:text-corporate-dark">
                Book Strategy Call
              </Button>
            </div>
            
            {/* DIY Package */}
            <div className="bg-video-white rounded-2xl p-8 text-center shadow-lg border-2 border-transparent hover:border-social-yellow hover:scale-105 transition-all duration-300">
              <div className="bg-social-yellow/20 text-social-yellow px-4 py-2 rounded-full text-sm font-semibold w-fit mx-auto mb-6">
                DIY KIT
              </div>
              <h3 className="text-2xl font-bold text-corporate-dark mb-4">DIY Creator Kit</h3>
              <div className="text-4xl font-bold text-social-yellow mb-6">$800</div>
              <ul className="space-y-4 mb-8 text-left">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-social-yellow rounded-full"></div>
                  <span>Complete content templates</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-social-yellow rounded-full"></div>
                  <span>Video editing tutorials</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-social-yellow rounded-full"></div>
                  <span>Content planning tools</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-social-yellow rounded-full"></div>
                  <span>Brand style guide</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-social-yellow rounded-full"></div>
                  <span>30 days of support</span>
                </li>
              </ul>
              <Button className="w-full bg-social-yellow text-corporate-dark hover:bg-social-yellow/90 mb-4">
                Buy Now
              </Button>
              <Button variant="outline" className="w-full border-2 border-social-yellow text-social-yellow hover:bg-social-yellow hover:text-corporate-dark">
                View Samples
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-20 bg-video-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-corporate-dark mb-6">
              Ready to Create Amazing Content?
            </h2>
            <p className="text-xl text-corporate-gray max-w-3xl mx-auto">
              Join the thousands of creators who have transformed their social media presence with Reel Pal's proven strategies and engaging content solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-social-yellow/10 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-social-yellow rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="text-video-white text-2xl" size={24} />
              </div>
              <div className="text-3xl font-bold text-social-yellow mb-2">2M+</div>
              <p className="text-corporate-gray">Total Views Generated</p>
            </div>
            
            <div className="bg-social-blue/10 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-social-blue rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="text-video-white text-2xl" size={24} />
              </div>
              <div className="text-3xl font-bold text-social-blue mb-2">150+</div>
              <p className="text-corporate-gray">Happy Clients Served</p>
            </div>
            
            <div className="bg-social-green/10 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-social-green rounded-full flex items-center justify-center mx-auto mb-6">
                <ChartLine className="text-video-white text-2xl" size={24} />
              </div>
              <div className="text-3xl font-bold text-social-green mb-2">450%</div>
              <p className="text-corporate-gray">Average Growth Rate</p>
            </div>
            
            <div className="bg-social-purple/10 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-social-purple rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="text-video-white text-2xl" size={24} />
              </div>
              <div className="text-3xl font-bold text-social-purple mb-2">4.9/5</div>
              <p className="text-corporate-gray">Client Satisfaction Rating</p>
            </div>
          </div>
          
          <div className="text-center mt-16">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-social-yellow text-corporate-dark hover:bg-social-yellow/90">
                Start Your Journey Today
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-social-yellow text-social-yellow hover:bg-social-yellow hover:text-corporate-dark">
                Book Free Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-corporate-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-corporate-dark mb-6">
              How We Work Together
            </h2>
            <p className="text-xl text-corporate-gray max-w-3xl mx-auto">
              My proven 4-step process ensures we create content that not only looks amazing but drives real results for your business.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-social-yellow rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <MessageCircle className="text-video-white text-2xl" size={28} />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-social-orange rounded-full flex items-center justify-center text-video-white text-sm font-bold">
                  1
                </div>
              </div>
              <h3 className="text-xl font-bold text-corporate-dark mb-4">Discovery Call</h3>
              <p className="text-corporate-gray">We dive deep into your brand, audience, and goals to create a personalized content strategy.</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-social-yellow rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <Lightbulb className="text-video-white text-2xl" size={28} />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-social-orange rounded-full flex items-center justify-center text-video-white text-sm font-bold">
                  2
                </div>
              </div>
              <h3 className="text-xl font-bold text-corporate-dark mb-4">Content Planning</h3>
              <p className="text-corporate-gray">I create a detailed content calendar with trending topics and platform-specific optimizations.</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-social-yellow rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <Video className="text-video-white text-2xl" size={28} />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-social-orange rounded-full flex items-center justify-center text-video-white text-sm font-bold">
                  3
                </div>
              </div>
              <h3 className="text-xl font-bold text-corporate-dark mb-4">Production</h3>
              <p className="text-corporate-gray">Professional filming and editing that brings your content to life with trending effects and music.</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-social-yellow rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <Rocket className="text-video-white text-2xl" size={28} />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-social-orange rounded-full flex items-center justify-center text-video-white text-sm font-bold">
                  4
                </div>
              </div>
              <h3 className="text-xl font-bold text-corporate-dark mb-4">Launch & Optimize</h3>
              <p className="text-corporate-gray">Strategic posting schedule with performance tracking and continuous optimization for maximum reach.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-video-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-corporate-dark mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-corporate-gray">Everything you need to know about working with Reel Pal.</p>
          </div>
          
          <div className="space-y-6">
            {[
              {
                question: "What platforms do you create content for?",
                answer: "I specialize in short-form content for TikTok, Instagram Reels, YouTube Shorts, and Facebook Reels. Each platform has unique requirements, and I optimize content specifically for each one to maximize engagement and reach."
              },
              {
                question: "How long does it take to see results?",
                answer: "Most clients start seeing increased engagement within the first week of posting. Significant follower growth typically begins around week 2-3, with substantial results by month 2. Consistency is key!"
              },
              {
                question: "Do I need to be on camera?",
                answer: "Not necessarily! While personal branding videos perform well, I can create engaging content using product shots, behind-the-scenes footage, animations, and text-based videos. We'll find what works best for your comfort level and brand."
              },
              {
                question: "What's included in the DIY kit?",
                answer: "The DIY Creator Kit includes 30+ video templates, step-by-step editing tutorials, content planning worksheets, brand style guides, trending hashtag lists, and 30 days of email support. Everything you need to create professional content independently."
              },
              {
                question: "Can you help with content strategy beyond just video creation?",
                answer: "Absolutely! I provide comprehensive content strategy including optimal posting times, hashtag research, audience analysis, trend identification, and performance analytics. It's not just about creating videos—it's about creating a sustainable growth system."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-corporate-light rounded-2xl p-8">
                <div 
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="text-xl font-bold text-corporate-dark">{faq.question}</h3>
                  {openFAQ === index ? (
                    <ChevronUp className="text-corporate-gray" size={24} />
                  ) : (
                    <ChevronDown className="text-corporate-gray" size={24} />
                  )}
                </div>
                {openFAQ === index && (
                  <div className="mt-6 text-corporate-gray animate-fade-in">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 gradient-social-2 text-video-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <img 
              className="w-32 h-32 mx-auto rounded-full border-4 border-video-white/20" 
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/25d8c66845-084a4815eb9cd20133f5.png" 
              alt="Reel Pal waving"
            />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Go Viral with Reel Pal?</h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto opacity-90">
            Let's create content that doesn't just look good—but actually grows your business. 
            Book a strategy call and let's turn your social media into your biggest marketing asset.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-video-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-3xl font-bold text-social-yellow mb-2">500K+</div>
              <p className="text-sm opacity-80">Views Generated</p>
            </div>
            <div className="bg-video-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-3xl font-bold text-social-yellow mb-2">50+</div>
              <p className="text-sm opacity-80">Happy Clients</p>
            </div>
            <div className="bg-video-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-3xl font-bold text-social-yellow mb-2">95%</div>
              <p className="text-sm opacity-80">Client Satisfaction</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-social-yellow text-corporate-dark hover:bg-social-yellow/90 text-lg px-10 py-4">
              Book Your Strategy Call
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-video-white text-video-white hover:bg-video-white hover:text-primary text-lg px-10 py-4"
            >
              Start with DIY Kit
            </Button>
          </div>
          
          <p className="text-sm opacity-75 mt-6">🎉 Limited Time: Book this month and get a FREE content audit worth $300!</p>
        </div>
      </section>

      {/* Related Pals Section */}
      <section className="py-20 bg-corporate-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-corporate-dark mb-6">
              Meet My Fellow Pals
            </h2>
            <p className="text-xl text-corporate-gray max-w-3xl mx-auto">
              Need more than just social content? Check out my fellow Palmer House Pals who can help with other aspects of your video journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-video-white rounded-2xl p-8 text-center transition-all duration-300 hover:transform hover:-translate-y-2 cursor-pointer shadow-lg">
              <div className="mb-6">
                <img 
                  className="w-24 h-24 mx-auto rounded-full" 
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/25d8c66845-3499219619cfd6454f31.png" 
                  alt="System Pal"
                />
              </div>
              <h3 className="text-xl font-bold text-corporate-dark mb-3">System Pal</h3>
              <p className="text-corporate-gray mb-4">Perfect for businesses needing training videos and internal systems</p>
              <Button className="bg-corporate-gray text-video-white hover:bg-corporate-dark">
                Meet System Pal
              </Button>
            </div>
            
            <div className="bg-video-white rounded-2xl p-8 text-center transition-all duration-300 hover:transform hover:-translate-y-2 cursor-pointer shadow-lg">
              <div className="mb-6">
                <img 
                  className="w-24 h-24 mx-auto rounded-full" 
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/25d8c66845-772ba728bd8c24b597ce.png" 
                  alt="Evergreen Pal"
                />
              </div>
              <h3 className="text-xl font-bold text-corporate-dark mb-3">Evergreen Pal</h3>
              <p className="text-corporate-gray mb-4">Ideal for long-term YouTube growth and authority building</p>
              <Button className="bg-social-green text-video-white hover:bg-social-green/90">
                Meet Evergreen Pal
              </Button>
            </div>
            
            <div className="bg-video-white rounded-2xl p-8 text-center transition-all duration-300 hover:transform hover:-translate-y-2 cursor-pointer shadow-lg">
              <div className="mb-6">
                <img 
                  className="w-24 h-24 mx-auto rounded-full" 
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/8f0c5b28b6-3b90b01dce247861b422.png" 
                  alt="Spotlight Pal"
                />
              </div>
              <h3 className="text-xl font-bold text-corporate-dark mb-3">Spotlight Pal</h3>
              <p className="text-corporate-gray mb-4">Your go-to for cinematic brand films and premium content</p>
              <Button className="bg-social-pink text-video-white hover:bg-social-pink/90">
                Meet Spotlight Pal
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}