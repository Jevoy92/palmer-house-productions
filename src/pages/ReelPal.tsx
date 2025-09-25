import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Smartphone,
  Video,
  Wrench,
  PlayCircle,
  MessageCircle,
  Lightbulb,
  Rocket,
  ChevronDown,
  ChevronUp,
  Check,
  Menu,
  Camera,
  Film,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MetaTags } from "@/components/seo/MetaTags";
import { ScrollBars } from "@/components/ScrollBars";

const ReelPal = () => {
  const [faqOpen, setFaqOpen] = useState<{ [key: number]: boolean }>({});
  const [isLoaded, setIsLoaded] = useState(false);

  const toggleFAQ = (num: number) => {
    setFaqOpen(prev => ({
      ...prev,
      [num]: !prev[num]
    }));
  };

  useEffect(() => {
    setIsLoaded(true);
    
    // Trigger animations on scroll
    const animateElements = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        if (isVisible) {
          element.classList.add('opacity-100', 'translate-y-0', 'translate-x-0');
          element.classList.remove('opacity-0', 'translate-y-10', 'translate-x-10');
        }
      });
    };

    window.addEventListener('scroll', animateElements);
    animateElements(); // Initial check

    return () => {
      window.removeEventListener('scroll', animateElements);
    };
  }, []);

  return (
    <div className="bg-gray-50 overflow-x-hidden font-sans">
      <ScrollBars />
      <MetaTags 
        title="Reel Pal - Your Social Content Creation Guide | Palmer House Productions"
        description="Meet Reel Pal, your go-to guide for authentic, engaging short-form content. From TikToks to Instagram Reels, create videos that drive real engagement."
      />
      
      <main className="relative">
        {/* Fixed 4-Color Background Bars */}
        <div className="fixed top-0 left-0 w-full h-screen -z-10">
          <div className="w-full h-full flex">
            <div className="w-1/4 h-full bg-pal-orange transition-all duration-700 ease-in-out"></div>
            <div className="w-1/4 h-full bg-pal-purple transition-all duration-700 ease-in-out"></div>
            <div className="w-1/4 h-full bg-pal-green transition-all duration-700 ease-in-out"></div>
            <div className="w-1/4 h-full bg-pal-blue transition-all duration-700 ease-in-out"></div>
          </div>
          {/* Reel Pal Orange Overlay */}
          <div className="absolute inset-0 bg-pal-orange/30"></div>
        </div>

        {/* Floating Animation Elements */}
        <div className="fixed inset-0 -z-5 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-pal-orange/20 rounded-full blur-lg animate-float-delayed"></div>
          <div className="absolute bottom-32 left-1/4 w-28 h-28 bg-white/5 rounded-full blur-2xl animate-float-slow"></div>
          <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-pal-orange/10 rounded-full blur-lg animate-float"></div>
        </div>

        {/* Header */}
        <header className="absolute top-0 left-0 w-full z-20 py-6 px-4 sm:px-8 md:px-12">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Video className="text-white text-3xl" />
              <h1 className="text-3xl font-bold text-white">Reel Pal</h1>
            </div>
            <nav className="hidden md:flex items-center gap-8 text-white font-medium">
              <Link to="/pals" className="hover:opacity-80 transition-opacity cursor-pointer">All Pals</Link>
              <Link to="/services" className="hover:opacity-80 transition-opacity cursor-pointer">Solutions</Link>
              <Link to="/contact" className="hover:opacity-80 transition-opacity cursor-pointer">Contact</Link>
            </nav>
            <button className="md:hidden text-white text-2xl">
              <Menu />
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="h-[950px] md:h-[850px] lg:h-[900px] xl:h-[1000px] w-full flex flex-col justify-center items-center relative z-10 text-white text-center">
          <div className="absolute top-0 left-0 w-full h-full bg-pal-orange/10"></div>
          
          <div className="relative z-20 max-w-4xl mx-auto px-6">
            <div className="backdrop-blur-md bg-white/5 p-8 lg:p-16 rounded-3xl border border-white/10 shadow-2xl animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700">
              <div className="bg-pal-orange text-white px-8 py-4 rounded-full text-lg font-bold w-fit mx-auto mb-8 shadow-lg animate-pulse">
                📱 REEL PAL
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-8 leading-tight">
                <span className="block text-white drop-shadow-2xl">"Let's make content</span>
                <span className="block text-yellow-300 drop-shadow-2xl">that connects!"</span>
              </h1>
              
              <p className="text-xl lg:text-2xl mb-12 text-white/95 leading-relaxed drop-shadow-md max-w-3xl mx-auto">
                Your go-to guide for short-form social content that captures hearts and drives real engagement across all platforms.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button asChild size="lg" className="bg-pal-orange hover:bg-pal-orange/80 text-white font-bold shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 px-8 py-4 text-lg">
                  <Link to="/contact">🚀 Start Creating Content</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/20 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 font-bold shadow-xl px-8 py-4 text-lg">
                  <Link to="/pals">👥 Meet All Pals</Link>
                </Button>
              </div>
            </div>
            
            {/* Character Image */}
            <div className="mt-12 relative animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700 delay-300">
              <div className="relative z-10 transform hover:scale-110 transition-all duration-500">
                <div className="absolute inset-0 bg-pal-orange/30 rounded-full blur-3xl scale-125"></div>
                <img 
                  className="relative w-64 h-64 lg:w-80 lg:h-80 mx-auto rounded-full border-4 border-white/30 object-cover object-center shadow-2xl" 
                  src="/lovable-uploads/5d98b294-ca3c-40a4-8b87-6dae295d4294.png" 
                  alt="Reel Pal - Your Social Content Creation Guide" 
                />
              </div>
              
              {/* Floating Elements Around Character */}
              <div className="absolute -top-5 -left-10 text-5xl animate-bounce">📱</div>
              <div className="absolute -top-3 -right-12 text-4xl animate-pulse">🎬</div>
              <div className="absolute -bottom-8 left-5 text-4xl animate-bounce" style={{animationDelay: '0.5s'}}>✨</div>
              <div className="absolute -bottom-5 -right-8 text-3xl animate-pulse" style={{animationDelay: '1s'}}>🚀</div>
              <div className="absolute top-1/2 -left-16 text-3xl animate-float">📺</div>
              <div className="absolute top-1/2 -right-16 text-3xl animate-float-delayed">🎭</div>
            </div>
          </div>
        </section>

        {/* Spacer */}
        <div className="h-[5vh] bg-white/10 backdrop-blur-sm relative z-10"></div>

        {/* Expertise Section */}
        <section className="py-20 lg:py-32 bg-white/10 backdrop-blur-sm relative z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 drop-shadow-2xl animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700">
                What I Do Best
              </h2>
              <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-md animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700 delay-200">
                From viral TikToks to Instagram Reels that convert, I help you create content that not only looks great but actually drives results for your business.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 text-center border border-white/20 shadow-2xl hover:bg-white/20 transition-all duration-500 transform hover:scale-105 animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700 delay-300">
                <div className="w-20 h-20 bg-pal-orange/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border border-white/30">
                  <Video className="text-white h-10 w-10 drop-shadow-lg" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">TikTok Content</h3>
                <p className="text-white/80 leading-relaxed">Trending content that captures attention and drives engagement on the world's fastest-growing platform.</p>
              </div>
              
              <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 text-center border border-white/20 shadow-2xl hover:bg-white/20 transition-all duration-500 transform hover:scale-105 animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700 delay-400">
                <div className="w-20 h-20 bg-pal-purple/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border border-white/30">
                  <PlayCircle className="text-white h-10 w-10 drop-shadow-lg" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">Instagram Reels</h3>
                <p className="text-white/80 leading-relaxed">Stories and Reels that showcase your brand personality and convert followers into customers.</p>
              </div>
              
              <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 text-center border border-white/20 shadow-2xl hover:bg-white/20 transition-all duration-500 transform hover:scale-105 animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700 delay-500">
                <div className="w-20 h-20 bg-pal-blue/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border border-white/30">
                  <Video className="text-white h-10 w-10 drop-shadow-lg" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">YouTube Shorts</h3>
                <p className="text-white/80 leading-relaxed">Quick, impactful videos that grow your YouTube presence and drive subscribers.</p>
              </div>
              
              <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 text-center border border-white/20 shadow-2xl hover:bg-white/20 transition-all duration-500 transform hover:scale-105 animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700 delay-600">
                <div className="w-20 h-20 bg-pal-green/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border border-white/30">
                  <Wrench className="text-white h-10 w-10 drop-shadow-lg" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">DIY Kits</h3>
                <p className="text-white/80 leading-relaxed">Complete content creation packages that enable you to create professional content in-house.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Packages Section */}
        <section className="py-20 lg:py-32 bg-white/5 backdrop-blur-sm relative z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 drop-shadow-2xl animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700">
                Reel Pal Packages
              </h2>
              <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-md animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700 delay-200">
                Boost your social media presence with our proven content creation packages.
              </p>
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
        <section className="py-20 lg:py-32 bg-white/10 backdrop-blur-sm relative z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 drop-shadow-2xl animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700">
                How We Work Together
              </h2>
              <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-md animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700 delay-200">
                My proven 4-step process ensures we create content that not only looks amazing but drives real results for your business.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700 delay-300">
                <div className="w-24 h-24 bg-pal-orange/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 relative border border-white/20 shadow-2xl">
                  <MessageCircle className="text-white h-12 w-12 drop-shadow-lg" />
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-pal-orange rounded-full flex items-center justify-center text-white text-lg font-bold shadow-xl">1</div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">Discovery Call</h3>
                <p className="text-white/80 leading-relaxed">We dive deep into your brand, audience, and goals to create a personalized content strategy.</p>
              </div>
              
              <div className="text-center animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700 delay-400">
                <div className="w-24 h-24 bg-pal-purple/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 relative border border-white/20 shadow-2xl">
                  <Lightbulb className="text-white h-12 w-12 drop-shadow-lg" />
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-pal-purple rounded-full flex items-center justify-center text-white text-lg font-bold shadow-xl">2</div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">Content Planning</h3>
                <p className="text-white/80 leading-relaxed">I create a detailed content calendar with trending topics and platform-specific optimizations.</p>
              </div>
              
              <div className="text-center animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700 delay-500">
                <div className="w-24 h-24 bg-pal-green/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 relative border border-white/20 shadow-2xl">
                  <Video className="text-white h-12 w-12 drop-shadow-lg" />
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-pal-green rounded-full flex items-center justify-center text-white text-lg font-bold shadow-xl">3</div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">Production</h3>
                <p className="text-white/80 leading-relaxed">Professional filming and editing that brings your content to life with trending effects and music.</p>
              </div>
              
              <div className="text-center animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700 delay-600">
                <div className="w-24 h-24 bg-pal-blue/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 relative border border-white/20 shadow-2xl">
                  <Rocket className="text-white h-12 w-12 drop-shadow-lg" />
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-pal-blue rounded-full flex items-center justify-center text-white text-lg font-bold shadow-xl">4</div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">Launch & Optimize</h3>
                <p className="text-white/80 leading-relaxed">Strategic posting schedule with performance tracking and continuous optimization for maximum reach.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 lg:py-32 bg-white/5 backdrop-blur-sm relative z-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 drop-shadow-2xl animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700">
                Frequently Asked Questions
              </h2>
              <p className="text-xl lg:text-2xl text-white/90 leading-relaxed drop-shadow-md animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700 delay-200">
                Everything you need to know about working with Reel Pal.
              </p>
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
                <div key={index} className="backdrop-blur-md bg-white/10 rounded-3xl border border-white/20 shadow-2xl animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700" style={{animationDelay: `${300 + index * 100}ms`}}>
                  <button
                    className="w-full px-8 py-6 text-left flex justify-between items-center text-white hover:bg-white/10 transition-all rounded-3xl"
                    onClick={() => toggleFAQ(index)}
                  >
                    <span className="text-xl font-bold drop-shadow-lg">{faq.question}</span>
                    {faqOpen[index] ? 
                      <ChevronUp className="h-6 w-6 drop-shadow-lg" /> : 
                      <ChevronDown className="h-6 w-6 drop-shadow-lg" />
                    }
                  </button>
                  {faqOpen[index] && (
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
        <section className="py-20 lg:py-32 bg-white/10 backdrop-blur-sm relative z-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="backdrop-blur-md bg-white/10 rounded-3xl p-12 lg:p-16 border border-white/20 shadow-2xl animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 drop-shadow-2xl">
                Ready to Create Content That Connects?
              </h2>
              <p className="text-xl lg:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
                Let's work together to build your social media presence with content that actually converts. Book your strategy call today and let's make magic happen!
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="text-center">
                  <div className="w-20 h-20 bg-pal-orange/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-white/30">
                    <Zap className="text-white h-10 w-10 drop-shadow-lg" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">Proven Systems</h3>
                  <p className="text-white/80">Strategies that actually work and drive real engagement</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-pal-purple/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-white/30">
                    <Rocket className="text-white h-10 w-10 drop-shadow-lg" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">Fast Results</h3>
                  <p className="text-white/80">See improvement in your social media performance within weeks</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-pal-green/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-white/30">
                    <Camera className="text-white h-10 w-10 drop-shadow-lg" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">Professional Quality</h3>
                  <p className="text-white/80">Content that looks great and represents your brand perfectly</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button asChild size="lg" className="bg-pal-orange hover:bg-pal-orange/80 text-white font-bold shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 px-12 py-6 text-xl">
                  <a 
                    href="https://palmerhouseproductions.zohobookings.com/#/4740771000000078004"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    🚀 Book Strategy Call
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 font-bold shadow-xl px-12 py-6 text-xl">
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
        <section className="py-20 lg:py-32 bg-white/5 backdrop-blur-sm relative z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 drop-shadow-2xl animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700">
                Meet My Fellow Pals
              </h2>
              <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-md animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700 delay-200">
                Each Video Pal specializes in different content types. Find the perfect Pal for your specific video needs.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 text-center border border-white/20 shadow-2xl hover:bg-white/20 transition-all duration-500 transform hover:scale-105 animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700 delay-300">
                <div className="mb-6">
                  <img 
                    className="w-24 h-24 mx-auto rounded-full object-cover object-center border-4 border-pal-purple/30" 
                    src="/lovable-uploads/c70f84e1-b8ab-4479-a04d-7793a76d402f.png" 
                    alt="System Pal - Training & Internal Video Expert" 
                  />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 drop-shadow-lg">System Pal</h3>
                <p className="text-white/80 mb-4 leading-relaxed">Perfect for training videos, onboarding, and internal business content</p>
                <Button asChild className="bg-pal-purple hover:bg-pal-purple/80 text-white font-bold shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                  <Link to="/system-pal">🎓 Meet System Pal</Link>
                </Button>
              </div>
              
              <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 text-center border border-white/20 shadow-2xl hover:bg-white/20 transition-all duration-500 transform hover:scale-105 animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700 delay-400">
                <div className="mb-6">
                  <img 
                    className="w-24 h-24 mx-auto rounded-full object-cover object-center border-4 border-pal-green/30" 
                    src="/lovable-uploads/19c6453a-bac9-4e63-999a-5d7f6410b852.png" 
                    alt="Evergreen Pal - YouTube & Authority Content Expert" 
                  />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 drop-shadow-lg">Evergreen Pal</h3>
                <p className="text-white/80 mb-4 leading-relaxed">Ideal for long-term YouTube growth and authority building</p>
                <Button asChild className="bg-pal-green hover:bg-pal-green/80 text-white font-bold shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                  <Link to="/evergreen-pal">🌱 Meet Evergreen Pal</Link>
                </Button>
              </div>
              
              <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 text-center border border-white/20 shadow-2xl hover:bg-white/20 transition-all duration-500 transform hover:scale-105 animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700 delay-500">
                <div className="mb-6">
                  <img 
                    className="w-24 h-24 mx-auto rounded-full object-cover object-center border-4 border-pal-blue/30" 
                    src="/lovable-uploads/04881cac-8132-4f58-b31d-07f97e89beaf.png" 
                    alt="Spotlight Pal - Cinematic Brand Video Expert" 
                  />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 drop-shadow-lg">Spotlight Pal</h3>
                <p className="text-white/80 mb-4 leading-relaxed">Your go-to for cinematic brand films and premium content</p>
                <Button asChild className="bg-pal-blue hover:bg-pal-blue/80 text-white font-bold shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                  <Link to="/spotlight-pal">🎬 Meet Spotlight Pal</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ReelPal;