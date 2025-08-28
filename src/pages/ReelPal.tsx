import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { 
  Smartphone,
  Settings,
  Sprout,
  Star,
  Video,
  Wrench,
  PlayCircle,
  TrendingUp,
  Eye,
  Users,
  ChartLine,
  MessageCircle,
  Lightbulb,
  Rocket,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MetaTags } from "@/components/seo/MetaTags";

const ReelPal = () => {
  const [faqOpen, setFaqOpen] = useState<{ [key: number]: boolean }>({});

  const toggleFAQ = (num: number) => {
    setFaqOpen(prev => ({
      ...prev,
      [num]: !prev[num]
    }));
  };

  return (
    <>
      <MetaTags 
        title="Reel Pal - Your Social Content Creation Guide | Palmer House Productions"
        description="Meet Reel Pal, your go-to guide for authentic, engaging short-form content. From TikToks to Instagram Reels, create videos that drive real engagement."
      />
      
      <div className="bg-muted/5">
        <Navigation />

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-secondary text-white min-h-[500px] flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold w-fit mb-4">REEL PAL</div>
                <h1 className="text-5xl md:text-6xl font-bold mb-6">"Let's make content that connects!"</h1>
                <p className="text-xl mb-8 opacity-90">Your go-to guide for short-form social content that captures hearts and drives real engagement. I specialize in authentic content that resonates with your audience across all platforms.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="bg-yellow-500 text-white hover:bg-yellow-600">
                    <Link to="/contact">Book a Strategy Call</Link>
                  </Button>
                </div>
              </div>
              <div className="text-center">
                <img 
                  className="w-80 h-80 mx-auto rounded-full border-4 border-white/20 object-cover object-center" 
                  src="/lovable-uploads/5d98b294-ca3c-40a4-8b87-6dae295d4294.png" 
                  alt="cartoon character female with brown hair in bun, orange shirt and jeans, holding smartphone with video camera and film strip elements, energetic social media creator mascot" 
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
              <div className="bg-yellow-50 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
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
              
              <div className="bg-red-50 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Video className="text-white h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">YouTube Shorts</h3>
                <p className="text-muted-foreground">Quick, impactful videos that grow your YouTube presence and drive subscribers.</p>
              </div>
              
              <div className="bg-green-50 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
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
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Starter Session */}
              <div className="bg-background rounded-2xl p-8 text-center shadow-lg border-2 border-transparent hover:border-yellow-500 transition-all hover:scale-105">
                <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold w-fit mx-auto mb-6">STARTER</div>
                <h3 className="text-2xl font-bold text-foreground mb-4">The Starter Session</h3>
                <div className="text-4xl font-bold text-yellow-600 mb-6">$500</div>
                <ul className="space-y-4 mb-8 text-left">
                  <li className="flex items-center space-x-3">
                    <Check className="text-yellow-500 h-5 w-5" />
                    <span>30-minute filming session</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-yellow-500 h-5 w-5" />
                    <span>Minimum 3 edited videos</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-yellow-500 h-5 w-5" />
                    <span>One-minute video format</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-yellow-500 h-5 w-5" />
                    <span>Simple talking-head style</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-yellow-500 h-5 w-5" />
                    <span>Professional delivery</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-yellow-500 h-5 w-5" />
                    <span>Limited availability</span>
                  </li>
                </ul>
                <Button asChild className="w-full bg-yellow-500 text-white hover:bg-yellow-600" size="lg">
                  <Link to="/contact">Book Session</Link>
                </Button>
              </div>
              
              {/* DIY Package */}
              <div className="bg-background rounded-2xl p-8 text-center shadow-lg border-2 border-transparent hover:border-yellow-500 transition-all hover:scale-105">
                <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold w-fit mx-auto mb-6">DIY</div>
                <h3 className="text-2xl font-bold text-foreground mb-4">25 DIY Reels</h3>
                <div className="text-4xl font-bold text-yellow-600 mb-6">$47</div>
                <ul className="space-y-4 mb-8 text-left">
                  <li className="flex items-center space-x-3">
                    <Check className="text-yellow-500 h-5 w-5" />
                    <span>25 talking-head reel ideas</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-yellow-500 h-5 w-5" />
                    <span>Platform breakdowns included</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-yellow-500 h-5 w-5" />
                    <span>Sample scripts provided</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-yellow-500 h-5 w-5" />
                    <span>Film from home setup</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-yellow-500 h-5 w-5" />
                    <span>Instant PDF download</span>
                  </li>
                </ul>
                <Button asChild className="w-full bg-yellow-500 text-white hover:bg-yellow-600" size="lg">
                  <a href="https://payhip.com/b/u8wvz" target="_blank" rel="noopener noreferrer">Buy Now</a>
                </Button>
              </div>
              
              {/* Script Bundle */}
              <div className="bg-background rounded-2xl p-8 text-center shadow-lg border-2 border-transparent hover:border-yellow-500 transition-all hover:scale-105">
                <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold w-fit mx-auto mb-6">SCRIPTS</div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Script Bundle</h3>
                <div className="text-4xl font-bold text-yellow-600 mb-6">$47</div>
                <ul className="space-y-4 mb-8 text-left">
                  <li className="flex items-center space-x-3">
                    <Check className="text-yellow-500 h-5 w-5" />
                    <span>About Me video scripts</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-yellow-500 h-5 w-5" />
                    <span>Social proof templates</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-yellow-500 h-5 w-5" />
                    <span>Call-to-action scripts</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-yellow-500 h-5 w-5" />
                    <span>FAQ video templates</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-yellow-500 h-5 w-5" />
                    <span>Plug-and-play format</span>
                  </li>
                </ul>
                <Button asChild className="w-full bg-yellow-500 text-white hover:bg-yellow-600" size="lg">
                  <a href="https://payhip.com/b/jxGKl" target="_blank" rel="noopener noreferrer">Get Scripts</a>
                </Button>
              </div>
              
              {/* 30 Reels Package */}
              <div className="bg-background rounded-2xl p-8 text-center shadow-lg border-2 border-transparent hover:border-yellow-500 transition-all hover:scale-105 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-yellow-500 text-white px-4 py-2 rounded-full text-sm font-semibold">MOST POPULAR</div>
                </div>
                <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold w-fit mx-auto mb-6 mt-4">DONE FOR YOU</div>
                <h3 className="text-2xl font-bold text-foreground mb-4">30 Reels in 30 Days</h3>
                <div className="text-4xl font-bold text-yellow-600 mb-6">$4,800</div>
                <ul className="space-y-4 mb-8 text-left">
                  <li className="flex items-center space-x-3">
                    <Check className="text-yellow-500 h-5 w-5" />
                    <span>1 full-day shoot (8 hours)</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-yellow-500 h-5 w-5" />
                    <span>30 social-ready videos</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-yellow-500 h-5 w-5" />
                    <span>15-30 seconds each</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-yellow-500 h-5 w-5" />
                    <span>Captions + formatting</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-yellow-500 h-5 w-5" />
                    <span>IG/LinkedIn/TikTok ready</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-yellow-500 h-5 w-5" />
                    <span>Only 3 spots available</span>
                  </li>
                </ul>
                <Button asChild className="w-full bg-yellow-500 text-white hover:bg-yellow-600" size="lg">
                  <Link to="/contact">Book Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>


        {/* Process Section */}
        <section className="py-20 bg-muted/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">How We Work Together</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">My proven 4-step process ensures we create content that not only looks amazing but drives real results for your business.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  <MessageCircle className="text-white h-8 w-8" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Discovery Call</h3>
                <p className="text-muted-foreground">We dive deep into your brand, audience, and goals to create a personalized content strategy.</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  <Lightbulb className="text-white h-8 w-8" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Content Planning</h3>
                <p className="text-muted-foreground">I create a detailed content calendar with trending topics and platform-specific optimizations.</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  <Video className="text-white h-8 w-8" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Production</h3>
                <p className="text-muted-foreground">Professional filming and editing that brings your content to life with trending effects and music.</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  <Rocket className="text-white h-8 w-8" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Launch & Optimize</h3>
                <p className="text-muted-foreground">Strategic posting schedule with performance tracking and continuous optimization for maximum reach.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
              <p className="text-xl text-muted-foreground">Everything you need to know about working with Reel Pal.</p>
            </div>
            
            <div className="space-y-6">
              <div className="bg-muted/5 rounded-2xl p-8">
                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFAQ(1)}>
                  <h3 className="text-xl font-bold text-foreground">What platforms do you create content for?</h3>
                  {faqOpen[1] ? <ChevronUp className="text-muted-foreground h-6 w-6" /> : <ChevronDown className="text-muted-foreground h-6 w-6" />}
                </div>
                {faqOpen[1] && (
                  <div className="mt-6 text-muted-foreground">
                    <p>I specialize in short-form content for TikTok, Instagram Reels, YouTube Shorts, and Facebook Reels. Each platform has unique requirements, and I optimize content specifically for each one to maximize engagement and reach.</p>
                  </div>
                )}
              </div>
              
              <div className="bg-muted/5 rounded-2xl p-8">
                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFAQ(2)}>
                  <h3 className="text-xl font-bold text-foreground">How long does it take to see results?</h3>
                  {faqOpen[2] ? <ChevronUp className="text-muted-foreground h-6 w-6" /> : <ChevronDown className="text-muted-foreground h-6 w-6" />}
                </div>
                {faqOpen[2] && (
                  <div className="mt-6 text-muted-foreground">
                    <p>Most clients start seeing increased engagement within the first week of posting. Significant follower growth typically begins around week 2-3, with substantial results by month 2. Consistency is key!</p>
                  </div>
                )}
              </div>
              
              <div className="bg-muted/5 rounded-2xl p-8">
                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFAQ(3)}>
                  <h3 className="text-xl font-bold text-foreground">Do I need to be on camera?</h3>
                  {faqOpen[3] ? <ChevronUp className="text-muted-foreground h-6 w-6" /> : <ChevronDown className="text-muted-foreground h-6 w-6" />}
                </div>
                {faqOpen[3] && (
                  <div className="mt-6 text-muted-foreground">
                    <p>Not necessarily! While personal branding videos perform well, I can create engaging content using product shots, behind-the-scenes footage, animations, and text-based videos. We'll find what works best for your comfort level and brand.</p>
                  </div>
                )}
              </div>
              
              <div className="bg-muted/5 rounded-2xl p-8">
                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFAQ(4)}>
                  <h3 className="text-xl font-bold text-foreground">What's included in the DIY kit?</h3>
                  {faqOpen[4] ? <ChevronUp className="text-muted-foreground h-6 w-6" /> : <ChevronDown className="text-muted-foreground h-6 w-6" />}
                </div>
                {faqOpen[4] && (
                  <div className="mt-6 text-muted-foreground">
                    <p>I've curated Amazon affiliate kits at $250, $500, and custom budgets beyond that. Each kit contains carefully selected equipment and tools to help you create professional content at your budget level.</p>
                  </div>
                )}
              </div>
              
              <div className="bg-muted/5 rounded-2xl p-8">
                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFAQ(5)}>
                  <h3 className="text-xl font-bold text-foreground">Can you help with content strategy beyond just video creation?</h3>
                  {faqOpen[5] ? <ChevronUp className="text-muted-foreground h-6 w-6" /> : <ChevronDown className="text-muted-foreground h-6 w-6" />}
                </div>
                {faqOpen[5] && (
                  <div className="mt-6 text-muted-foreground">
                    <p>Absolutely! I provide comprehensive content strategy including optimal posting times, hashtag research, audience analysis, trend identification, and performance analytics. It's not just about creating videos—it's about creating a sustainable growth system.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-8">
                <img 
                  className="w-32 h-32 mx-auto rounded-full border-4 border-yellow-200 object-cover object-center" 
                  src="/lovable-uploads/5d98b294-ca3c-40a4-8b87-6dae295d4294.png" 
                  alt="cartoon character female with brown hair in bun, orange shirt and jeans, holding smartphone, social media creator mascot" 
                />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Ready to Go Viral with Reel Pal?</h2>
            <p className="text-xl mb-12 max-w-3xl mx-auto text-muted-foreground">Let's create content that doesn't just look good—but actually grows your business. Book a strategy call and let's turn your social media into your biggest marketing asset.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
                <div className="text-2xl font-bold text-yellow-600 mb-2">Creative Excellence</div>
                <p className="text-sm text-muted-foreground">Trending content that captures attention and drives engagement</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                <div className="text-2xl font-bold text-blue-600 mb-2">Proven Results</div>
                <p className="text-sm text-muted-foreground">Clients consistently see increased followers and engagement</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                <div className="text-2xl font-bold text-green-600 mb-2">Personal Touch</div>
                <p className="text-sm text-muted-foreground">Dedicated support and customized content strategies</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button asChild size="lg" className="bg-yellow-500 text-white hover:bg-yellow-600">
                <Link to="/contact">Book Your Strategy Call</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-white">
                <Link to="/services/diy-downloads">Start with DIY Kit</Link>
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground mt-6">🎉 Limited Time: Book this month and get a FREE content audit worth $300!</p>
          </div>
        </section>

        {/* Related Pals Section */}
        <section className="py-20 bg-muted/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Meet My Fellow Pals</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Need more than just social content? Check out my fellow Palmer House Pals who can help with other aspects of your video journey.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-background rounded-2xl p-8 text-center transition-all hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                <div className="mb-6">
                  <img 
                    className="w-24 h-24 mx-auto rounded-full" 
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/25d8c66845-3499219619cfd6454f31.png" 
                    alt="cartoon character female with red hair, gray professional outfit, holding clipboard with gears and system icons" 
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
                    className="w-24 h-24 mx-auto rounded-full" 
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/25d8c66845-772ba728bd8c24b597ce.png" 
                    alt="cartoon character female with brown hair, teal outfit, holding growing plant with video play button" 
                  />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Evergreen Pal</h3>
                <p className="text-muted-foreground mb-4">Ideal for long-term YouTube growth and authority building</p>
                <Button asChild className="bg-green-600 text-white hover:bg-green-700">
                  <Link to="/evergreen-pal">Meet Evergreen Pal</Link>
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

export default ReelPal;