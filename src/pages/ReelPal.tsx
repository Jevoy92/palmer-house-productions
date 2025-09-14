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
      
      <div className="bg-gray-50 overflow-x-hidden font-sans">
        <Navigation />

        <main className="relative">
          {/* Dynamic 4-Colored Background Bars */}
          <div className="fixed top-0 left-0 w-full h-screen -z-10">
            <div className="w-full h-full flex">
              <div className="w-1/4 h-full bg-pal-orange transition-all duration-700 ease-in-out opacity-90"></div>
              <div className="w-1/4 h-full bg-pal-purple transition-all duration-700 ease-in-out opacity-80"></div>
              <div className="w-1/4 h-full bg-pal-green transition-all duration-700 ease-in-out opacity-80"></div>
              <div className="w-1/4 h-full bg-pal-blue transition-all duration-700 ease-in-out opacity-80"></div>
            </div>
            {/* Floating Elements */}
            <div className="absolute top-1/4 left-1/6 w-32 h-32 bg-white/10 rounded-full animate-bounce" style={{animationDelay: '2s', animationDuration: '3s'}}></div>
            <div className="absolute bottom-1/4 right-1/6 w-24 h-24 bg-white/5 rounded-full animate-bounce" style={{animationDelay: '3s', animationDuration: '4s'}}></div>
            <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-white/10 rounded-full animate-bounce" style={{animationDelay: '1s', animationDuration: '2.5s'}}></div>
            {/* Reel Pal Focus Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-pal-orange/60 via-transparent to-transparent"></div>
          </div>

          {/* Hero Section */}
          <section className="min-h-screen flex items-center justify-center relative z-10 px-4 sm:px-6 lg:px-8 pt-20">
            <div className="max-w-7xl mx-auto w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="text-center lg:text-left order-2 lg:order-1">
                  <div className="bg-white/30 backdrop-blur-lg text-white px-6 py-3 rounded-full text-sm font-bold w-fit mx-auto lg:mx-0 mb-8 border border-white/40 shadow-lg">
                    REEL PAL
                  </div>
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-8 leading-tight drop-shadow-2xl">
                    "Let's make content that{' '}
                    <span className="text-yellow-200 drop-shadow-lg">connects!</span>"
                  </h1>
                  <p className="text-lg md:text-xl text-white/95 mb-12 leading-relaxed max-w-2xl mx-auto lg:mx-0 drop-shadow-lg">
                    Your go-to guide for short-form social content that captures hearts and drives real engagement. I specialize in authentic content that resonates with your audience across all platforms.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                    <button className="bg-white/25 backdrop-blur-lg text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-white/35 transition-all shadow-xl hover:shadow-2xl border border-white/40 hover:scale-105">
                      Book a Strategy Call
                    </button>
                  </div>
                </div>
                <div className="text-center order-1 lg:order-2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent rounded-full blur-3xl"></div>
                    <img 
                      className="relative w-80 h-80 md:w-96 md:h-96 mx-auto rounded-full border-4 border-white/40 object-cover object-center shadow-2xl hover:scale-105 transition-transform duration-500" 
                      src="/lovable-uploads/5d98b294-ca3c-40a4-8b87-6dae295d4294.png" 
                      alt="cartoon character female with brown hair in bun, orange shirt and jeans, holding smartphone with video camera and film strip elements, energetic social media creator mascot" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* White Section Separator */}
          <div className="h-[10vh] bg-white relative z-10"></div>

          {/* Expertise Section */}
          <section className="bg-white py-20 lg:py-32 relative z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-pal-orange to-yellow-500 bg-clip-text text-transparent mb-6">
                  What I Do Best
                </h2>
                <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                  From viral TikToks to Instagram Reels that convert, I help you create content that not only looks great but actually drives results for your business.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* TikTok Content */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-orange-400/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative bg-white/90 backdrop-blur-lg rounded-3xl p-8 text-center border border-yellow-400/20 shadow-xl group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500">
                    <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-12 transition-transform duration-500 shadow-lg">
                      <Video className="text-white text-3xl" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">TikTok Content</h3>
                    <p className="text-gray-600 leading-relaxed">Trending content that captures attention and drives engagement on the world's fastest-growing platform.</p>
                  </div>
                </div>

                {/* Instagram Reels */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-blue-400/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative bg-white/90 backdrop-blur-lg rounded-3xl p-8 text-center border border-blue-400/20 shadow-xl group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-400 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-12 transition-transform duration-500 shadow-lg">
                      <PlayCircle className="text-white text-3xl" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">Instagram Reels</h3>
                    <p className="text-gray-600 leading-relaxed">Stories and Reels that showcase your brand personality and convert followers into customers.</p>
                  </div>
                </div>

                {/* YouTube Shorts */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-400/20 to-red-400/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative bg-white/90 backdrop-blur-lg rounded-3xl p-8 text-center border border-red-400/20 shadow-xl group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500">
                    <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-400 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-12 transition-transform duration-500 shadow-lg">
                      <Video className="text-white text-3xl" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">YouTube Shorts</h3>
                    <p className="text-gray-600 leading-relaxed">Quick, impactful videos that grow your YouTube presence and drive subscribers.</p>
                  </div>
                </div>

                {/* DIY Kits */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-green-400/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative bg-white/90 backdrop-blur-lg rounded-3xl p-8 text-center border border-green-400/20 shadow-xl group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-400 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-12 transition-transform duration-500 shadow-lg">
                      <Wrench className="text-white text-3xl" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">DIY Kits</h3>
                    <p className="text-gray-600 leading-relaxed">Complete content creation packages that enable you to create professional content in-house.</p>
                  </div>
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
                    src="/lovable-uploads/19c6453a-bac9-4e63-999a-5d7f6410b852.png" 
                    alt="cartoon character male with gray hair and beard, teal coat, holding golden play button with plants and educational elements, evergreen content creator mascot" 
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
        </main>
      </div>
    </>
  );
};

export default ReelPal;