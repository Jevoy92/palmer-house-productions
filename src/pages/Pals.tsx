import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { 
  Menu, 
  Wand2, 
  Handshake, 
  Route, 
  Rocket, 
  Smartphone, 
  Settings, 
  Sprout, 
  Star,
  Video,
  Wrench,
  PlayCircle,
  TrendingUp,
  GraduationCap,
  UserPlus,
  HelpCircle,
  Network,
  Youtube,
  BookOpen,
  Calendar,
  Crown,
  Film,
  Music,
  Trophy,
  Sparkles,
  Heart,
  Brain,
  Leaf
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MetaTags } from "@/components/seo/MetaTags";

const Pals = () => {
  const [headerScrolled, setHeaderScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHeaderScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <MetaTags 
        title="Meet the Palmer House Pals - Your Video Production Guides"
        description="Meet your specialized video production guides. Each Pal has unique superpowers to help you create the perfect content for your brand's journey."
      />
      
      <div className="bg-muted/5">
        <Navigation />

        {/* Hero Section */}
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-16">
              <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight text-foreground">Palmer House Pals</h1>
              <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto text-muted-foreground font-medium">Meet your specialized video production guides. Each Pal has unique superpowers to help you create the perfect content for your brand's journey.</p>
            </div>
            
            {/* Character Preview Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              <div className="bg-white rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-2 shadow-lg hover:shadow-xl">
                <img className="w-24 h-24 mx-auto rounded-full mb-4 border-4 border-yellow-400" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/25d8c66845-24a6f3cb81aba8920004.png" alt="cartoon character female with brown hair, yellow shirt, holding phone with social media icons, friendly mascot style" />
                <h3 className="text-xl font-bold text-foreground">Reel Pal</h3>
                <p className="text-sm text-muted-foreground mt-2">Social Content</p>
              </div>
              <div className="bg-white rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-2 shadow-lg hover:shadow-xl">
                <img className="w-24 h-24 mx-auto rounded-full mb-4 border-4 border-gray-400" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/25d8c66845-8fbf1beda1a411066413.png" alt="cartoon character female with red hair, gray professional outfit, holding clipboard with gears, technical mascot style" />
                <h3 className="text-xl font-bold text-foreground">System Pal</h3>
                <p className="text-sm text-muted-foreground mt-2">Backend Systems</p>
              </div>
              <div className="bg-white rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-2 shadow-lg hover:shadow-xl">
                <img className="w-24 h-24 mx-auto rounded-full mb-4 border-4 border-green-400" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/25d8c66845-e7363733c56c43638c8f.png" alt="cartoon character female with brown hair, teal outfit, holding plant with lightbulb, growth-focused mascot style" />
                <h3 className="text-xl font-bold text-foreground">Evergreen Pal</h3>
                <p className="text-sm text-muted-foreground mt-2">Long-term Growth</p>
              </div>
              <div className="bg-white rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-2 shadow-lg hover:shadow-xl">
                <img className="w-24 h-24 mx-auto rounded-full mb-4 border-4 border-red-400" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/8f0c5b28b6-8c6945ce46e0e60e28bf.png" alt="cartoon character blonde female, red blazer, holding microphone with studio lights, cinematic mascot style" />
                <h3 className="text-xl font-bold text-foreground">Spotlight Pal</h3>
                <p className="text-sm text-muted-foreground mt-2">Cinematic Brand</p>
              </div>
            </div>
          </div>
        </section>


        {/* Main Pals Showcase */}
        <section className="py-24 bg-muted/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-black text-foreground mb-8">Meet the Pals</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Four unique personalities, four specialized skill sets, one amazing video production experience.</p>
            </div>
            
            {/* Reel Pal */}
            <div className="bg-background rounded-3xl shadow-2xl p-12 mb-16 overflow-hidden relative transition-all duration-300 hover:-translate-y-2 hover:shadow-3xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-100 rounded-full -translate-y-32 translate-x-32 opacity-50"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                <div className="text-center lg:text-left">
                  <div className="inline-flex items-center bg-yellow-100 text-yellow-800 px-6 py-3 rounded-full text-sm font-bold mb-6">
                    <Smartphone className="mr-2 h-4 w-4" />
                    REEL PAL
                  </div>
                  <h3 className="text-4xl md:text-5xl font-black text-foreground mb-6">"Let's make content that connects!"</h3>
                  <p className="text-xl text-muted-foreground mb-8 leading-relaxed">Hi there! I'm your go-to for authentic, engaging short-form content that makes people stop scrolling. From TikToks to Instagram Reels, I help you create videos that feel genuine and drive real engagement.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center">
                        <Video className="text-white h-5 w-5" />
                      </div>
                      <span className="text-foreground font-semibold">Short-form Social Content</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center">
                        <Wrench className="text-white h-5 w-5" />
                      </div>
                      <span className="text-foreground font-semibold">DIY Creation Kits</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center">
                        <PlayCircle className="text-white h-5 w-5" />
                      </div>
                      <span className="text-foreground font-semibold">Starter Sessions</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center">
                        <TrendingUp className="text-white h-5 w-5" />
                      </div>
                      <span className="text-foreground font-semibold">Platform Optimization</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild className="bg-yellow-500 text-white hover:bg-yellow-600 transition-all transform hover:scale-105" size="lg">
                      <Link to="/reel-pal">Meet Reel Pal</Link>
                    </Button>
                  </div>
                </div>
                <div className="text-center">
                  <img className="w-80 h-80 mx-auto" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/25d8c66845-bae844072a2205552064.png" alt="cartoon character female with brown hair, bright yellow shirt, holding smartphone with heart icons and social media symbols floating around, friendly and energetic mascot style illustration" />
                </div>
              </div>
            </div>
            
            {/* System Pal */}
            <div className="bg-background rounded-3xl shadow-2xl p-12 mb-16 overflow-hidden relative transition-all duration-300 hover:-translate-y-2 hover:shadow-3xl">
              <div className="absolute top-0 left-0 w-64 h-64 bg-gray-100 rounded-full -translate-y-32 -translate-x-32 opacity-50"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                <div className="text-center order-2 lg:order-1">
                  <img className="w-80 h-80 mx-auto" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/25d8c66845-8585903249c27bf175cd.png" alt="cartoon character female with red hair, professional gray outfit, holding clipboard with checkmarks and gear icons, surrounded by system diagrams and workflow charts, technical but approachable mascot style" />
                </div>
                <div className="text-center lg:text-left order-1 lg:order-2">
                  <div className="inline-flex items-center bg-gray-200 text-gray-800 px-6 py-3 rounded-full text-sm font-bold mb-6">
                    <Settings className="mr-2 h-4 w-4" />
                    SYSTEM PAL
                  </div>
                  <h3 className="text-4xl md:text-5xl font-black text-foreground mb-6">"Let's build systems that scale!"</h3>
                  <p className="text-xl text-muted-foreground mb-8 leading-relaxed">Hey! I'm the organized one who loves creating video systems that work like clockwork. From employee training to customer onboarding, I build video infrastructure that grows with your business.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-600 rounded-xl flex items-center justify-center">
                        <GraduationCap className="text-white h-5 w-5" />
                      </div>
                      <span className="text-foreground font-semibold">Training Video Systems</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-600 rounded-xl flex items-center justify-center">
                        <UserPlus className="text-white h-5 w-5" />
                      </div>
                      <span className="text-foreground font-semibold">Onboarding Sequences</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-600 rounded-xl flex items-center justify-center">
                        <HelpCircle className="text-white h-5 w-5" />
                      </div>
                      <span className="text-foreground font-semibold">FAQ Video Libraries</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-600 rounded-xl flex items-center justify-center">
                        <Network className="text-white h-5 w-5" />
                      </div>
                      <span className="text-foreground font-semibold">Process Documentation</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild className="bg-gray-600 text-white hover:bg-gray-700 transition-all transform hover:scale-105" size="lg">
                      <Link to="/system-pal">Meet System Pal</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Evergreen Pal */}
            <div className="bg-background rounded-3xl shadow-2xl p-12 mb-16 overflow-hidden relative transition-all duration-300 hover:-translate-y-2 hover:shadow-3xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-green-100 rounded-full -translate-y-32 translate-x-32 opacity-50"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                <div className="text-center lg:text-left">
                  <div className="inline-flex items-center bg-green-100 text-green-800 px-6 py-3 rounded-full text-sm font-bold mb-6">
                    <Sprout className="mr-2 h-4 w-4" />
                    EVERGREEN PAL
                  </div>
                  <h3 className="text-4xl md:text-5xl font-black text-foreground mb-6">"Let's grow your authority!"</h3>
                  <p className="text-xl text-muted-foreground mb-8 leading-relaxed">Hello! I'm all about the long game. I help you create content that builds your reputation and authority over time. Think YouTube channels, educational series, and content that keeps delivering value for years.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                        <Youtube className="text-white h-5 w-5" />
                      </div>
                      <span className="text-foreground font-semibold">YouTube Development</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                        <BookOpen className="text-white h-5 w-5" />
                      </div>
                      <span className="text-foreground font-semibold">Educational Series</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                        <Calendar className="text-white h-5 w-5" />
                      </div>
                      <span className="text-foreground font-semibold">Monthly Content Plans</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                        <Crown className="text-white h-5 w-5" />
                      </div>
                      <span className="text-foreground font-semibold">Authority Building</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild className="bg-green-600 text-white hover:bg-green-700 transition-all transform hover:scale-105" size="lg">
                      <Link to="/evergreen-pal">Meet Evergreen Pal</Link>
                    </Button>
                  </div>
                </div>
                <div className="text-center">
                  <img className="w-80 h-80 mx-auto" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/25d8c66845-4fe72277118cbd131d82.png" alt="cartoon character female with brown hair in ponytail, teal cardigan, holding a growing plant with lightbulb and video play button symbols, surrounded by growth charts and evergreen trees, nurturing and wise mascot style" />
                </div>
              </div>
            </div>
            
            {/* Spotlight Pal */}
            <div className="bg-background rounded-3xl shadow-2xl p-12 mb-16 overflow-hidden relative transition-all duration-300 hover:-translate-y-2 hover:shadow-3xl">
              <div className="absolute top-0 left-0 w-64 h-64 bg-red-100 rounded-full -translate-y-32 -translate-x-32 opacity-50"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                <div className="text-center order-2 lg:order-1">
                  <img className="w-80 h-80 mx-auto" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/8f0c5b28b6-6ce39935cbfdf13bc919.png" alt="cartoon character blonde female, professional red blazer, holding microphone with studio lights and camera equipment around her, star and spotlight effects, glamorous but professional mascot style" />
                </div>
                <div className="text-center lg:text-left order-1 lg:order-2">
                  <div className="inline-flex items-center bg-red-100 text-red-800 px-6 py-3 rounded-full text-sm font-bold mb-6">
                    <Star className="mr-2 h-4 w-4" />
                    SPOTLIGHT PAL
                  </div>
                  <h3 className="text-4xl md:text-5xl font-black text-foreground mb-6">"Let's create cinematic magic!"</h3>
                  <p className="text-xl text-muted-foreground mb-8 leading-relaxed">Darling! I'm your creative visionary for high-end, cinematic content that tells powerful stories. From brand films to music videos, I help you create content that captivates and inspires audiences.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center">
                        <Film className="text-white h-5 w-5" />
                      </div>
                      <span className="text-foreground font-semibold">Brand Storytelling</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center">
                        <Music className="text-white h-5 w-5" />
                      </div>
                      <span className="text-foreground font-semibold">Music Videos</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center">
                        <Trophy className="text-white h-5 w-5" />
                      </div>
                      <span className="text-foreground font-semibold">Hero Content</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center">
                        <Sparkles className="text-white h-5 w-5" />
                      </div>
                      <span className="text-foreground font-semibold">Premium Experiences</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild className="bg-red-600 text-white hover:bg-red-700 transition-all transform hover:scale-105" size="lg">
                      <Link to="/spotlight-pal">Meet Spotlight Pal</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Strategic Service Guidance */}
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-black text-foreground mb-8">More Than Mascots</h2>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto">Each Pal helps you navigate our extensive service offerings with intention, ensuring you choose exactly what aligns with your goals and budget.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-yellow-50 rounded-3xl p-8 text-center border-2 border-yellow-200">
                <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Heart className="text-white h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Reel Pal</h3>
                <div className="space-y-3 text-left">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-foreground">Starter Package Focus</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-foreground">DIY Tool Recommendations</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-foreground">Platform-Specific Solutions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-foreground">Quick Turnaround Options</span>
                  </div>
                </div>
                <p className="text-muted-foreground mt-4 italic">"I'll help you find the perfect entry point that gets results fast!"</p>
              </div>
              
              <div className="bg-gray-50 rounded-3xl p-8 text-center border-2 border-gray-200">
                <div className="w-16 h-16 bg-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Brain className="text-white h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">System Pal</h3>
                <div className="space-y-3 text-left">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                    <span className="text-foreground">Enterprise Package Alignment</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                    <span className="text-foreground">Workflow Integration Services</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                    <span className="text-foreground">Training Program Selection</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                    <span className="text-foreground">Scalable Solution Design</span>
                  </div>
                </div>
                <p className="text-muted-foreground mt-4 italic">"I'll map out the perfect system that grows with your business!"</p>
              </div>
              
              <div className="bg-green-50 rounded-3xl p-8 text-center border-2 border-green-200">
                <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Leaf className="text-white h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Evergreen Pal</h3>
                <div className="space-y-3 text-left">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span className="text-foreground">Long-term Content Strategy</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span className="text-foreground">Authority Building Packages</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span className="text-foreground">ROI-Focused Recommendations</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span className="text-foreground">Sustainable Growth Planning</span>
                  </div>
                </div>
                <p className="text-muted-foreground mt-4 italic">"I'll guide you to investments that compound over time!"</p>
              </div>
              
              <div className="bg-red-50 rounded-3xl p-8 text-center border-2 border-red-200">
                <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Star className="text-white h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Spotlight Pal</h3>
                <div className="space-y-3 text-left">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    <span className="text-foreground">Premium Production Services</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    <span className="text-foreground">Brand Story Development</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    <span className="text-foreground">High-Impact Campaign Design</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    <span className="text-foreground">Cinematic Package Selection</span>
                  </div>
                </div>
                <p className="text-muted-foreground mt-4 italic">"I'll help you choose services that create unforgettable impact!"</p>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-24 bg-muted/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black text-foreground mb-8">Choose Your Adventure</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Still deciding? Here's a detailed comparison to help you pick the perfect Pal for your video journey.</p>
            </div>
            
            <div className="bg-background rounded-3xl shadow-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th className="px-8 py-6 text-left text-lg font-bold">Comparison</th>
                      <th className="px-8 py-6 text-center text-lg font-bold">
                        <div className="flex flex-col items-center">
                          <Smartphone className="h-6 w-6 mb-2" />
                          Reel Pal
                        </div>
                      </th>
                      <th className="px-8 py-6 text-center text-lg font-bold">
                        <div className="flex flex-col items-center">
                          <Settings className="h-6 w-6 mb-2" />
                          System Pal
                        </div>
                      </th>
                      <th className="px-8 py-6 text-center text-lg font-bold">
                        <div className="flex flex-col items-center">
                          <Sprout className="h-6 w-6 mb-2" />
                          Evergreen Pal
                        </div>
                      </th>
                      <th className="px-8 py-6 text-center text-lg font-bold">
                        <div className="flex flex-col items-center">
                          <Star className="h-6 w-6 mb-2" />
                          Spotlight Pal
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-muted/5">
                      <td className="px-8 py-6 font-bold text-foreground">Perfect For</td>
                      <td className="px-8 py-6 text-center text-muted-foreground">Social media growth</td>
                      <td className="px-8 py-6 text-center text-muted-foreground">Business operations</td>
                      <td className="px-8 py-6 text-center text-muted-foreground">Long-term authority</td>
                      <td className="px-8 py-6 text-center text-muted-foreground">Brand storytelling</td>
                    </tr>
                    <tr className="hover:bg-muted/5 bg-muted/2">
                      <td className="px-8 py-6 font-bold text-foreground">Timeline</td>
                      <td className="px-8 py-6 text-center">
                        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">1-2 weeks</span>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">2-4 weeks</span>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">Ongoing</span>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">4-8 weeks</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-muted/5">
                      <td className="px-8 py-6 font-bold text-foreground">Investment Range</td>
                      <td className="px-8 py-6 text-center text-muted-foreground font-semibold">$500 - $2,000</td>
                      <td className="px-8 py-6 text-center text-muted-foreground font-semibold">$2,000 - $10,000</td>
                      <td className="px-8 py-6 text-center text-muted-foreground font-semibold">$1,000 - $5,000/mo</td>
                      <td className="px-8 py-6 text-center text-muted-foreground font-semibold">$5,000 - $25,000</td>
                    </tr>
                    <tr className="hover:bg-muted/5 bg-muted/2">
                      <td className="px-8 py-6 font-bold text-foreground">Content Focus</td>
                      <td className="px-8 py-6 text-center text-muted-foreground">Short-form, viral</td>
                      <td className="px-8 py-6 text-center text-muted-foreground">Educational, structured</td>
                      <td className="px-8 py-6 text-center text-muted-foreground">Authority, evergreen</td>
                      <td className="px-8 py-6 text-center text-muted-foreground">Cinematic, premium</td>
                    </tr>
                    <tr className="hover:bg-muted/5">
                      <td className="px-8 py-6 font-bold text-foreground">Best Results</td>
                      <td className="px-8 py-6 text-center text-muted-foreground">Quick engagement</td>
                      <td className="px-8 py-6 text-center text-muted-foreground">Operational efficiency</td>
                      <td className="px-8 py-6 text-center text-muted-foreground">Sustained growth</td>
                      <td className="px-8 py-6 text-center text-muted-foreground">Brand elevation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Potential Outcomes */}
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-black text-foreground mb-8">What Your Pal Could Achieve</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Each Pal specializes in different types of transformative outcomes for your business. Here's what becomes possible.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-yellow-50 rounded-3xl p-8 border-2 border-yellow-200">
                <div className="flex items-center mb-6">
                  <img className="w-16 h-16 rounded-full mr-4" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/25d8c66845-9b37f82e5ee6d35a236c.png" alt="cartoon character female with brown hair, yellow shirt, small avatar style" />
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Reel Pal Transformation</h3>
                    <p className="text-yellow-600 font-semibold">Social Media Growth</p>
                  </div>
                </div>
                <blockquote className="text-lg text-foreground mb-6 italic">"With Reel Pal's guidance, you could transform from social media uncertainty to creating scroll-stopping content that builds genuine community and drives authentic engagement with your brand."</blockquote>
                <div className="flex space-x-6 text-sm">
                  <div className="text-center">
                    <div className="text-lg font-bold text-yellow-600">Viral Reach</div>
                    <div className="text-muted-foreground text-xs">Content that spreads</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-yellow-600">Brand Awareness</div>
                    <div className="text-muted-foreground text-xs">Recognition growth</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-yellow-600">Community Building</div>
                    <div className="text-muted-foreground text-xs">Loyal following</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-3xl p-8 border-2 border-gray-200">
                <div className="flex items-center mb-6">
                  <img className="w-16 h-16 rounded-full mr-4" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/25d8c66845-5375fe727564572cfda8.png" alt="cartoon character female with red hair, gray outfit, small avatar style" />
                  <div>
                    <h3 className="text-xl font-bold text-foreground">System Pal Transformation</h3>
                    <p className="text-gray-600 font-semibold">Operational Excellence</p>
                  </div>
                </div>
                <blockquote className="text-lg text-foreground mb-6 italic">"System Pal could help you eliminate training bottlenecks and create seamless onboarding experiences that scale effortlessly as your team grows, reducing stress and improving consistency."</blockquote>
                <div className="flex space-x-6 text-sm">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-600">Efficiency Gains</div>
                    <div className="text-muted-foreground text-xs">Streamlined operations</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-600">Scalable Systems</div>
                    <div className="text-muted-foreground text-xs">Growth-ready processes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-600">Team Alignment</div>
                    <div className="text-muted-foreground text-xs">Consistent execution</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 rounded-3xl p-8 border-2 border-green-200">
                <div className="flex items-center mb-6">
                  <img className="w-16 h-16 rounded-full mr-4" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/25d8c66845-86b2d84085b3635c8f10.png" alt="cartoon character female with brown hair, teal outfit, small avatar style" />
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Evergreen Pal Transformation</h3>
                    <p className="text-green-600 font-semibold">Authority Development</p>
                  </div>
                </div>
                <blockquote className="text-lg text-foreground mb-6 italic">"Evergreen Pal could position you as the go-to expert in your field through strategic content that builds lasting credibility and attracts premium opportunities year after year."</blockquote>
                <div className="flex space-x-6 text-sm">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">Thought Leadership</div>
                    <div className="text-muted-foreground text-xs">Industry recognition</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">Sustainable Growth</div>
                    <div className="text-muted-foreground text-xs">Long-term success</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">Premium Positioning</div>
                    <div className="text-muted-foreground text-xs">Higher value offers</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-red-50 rounded-3xl p-8 border-2 border-red-200">
                <div className="flex items-center mb-6">
                  <img className="w-16 h-16 rounded-full mr-4" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/8f0c5b28b6-f994443bd5f1f3a8b01d.png" alt="cartoon character blonde female, red blazer, small avatar style" />
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Spotlight Pal Transformation</h3>
                    <p className="text-red-600 font-semibold">Brand Elevation</p>
                  </div>
                </div>
                <blockquote className="text-lg text-foreground mb-6 italic">"Spotlight Pal could elevate your brand with cinematic storytelling that commands attention, builds emotional connections, and positions your business as a premium choice in your market."</blockquote>
                <div className="flex space-x-6 text-sm">
                  <div className="text-center">
                    <div className="text-lg font-bold text-red-600">Emotional Impact</div>
                    <div className="text-muted-foreground text-xs">Memorable experiences</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-red-600">Premium Perception</div>
                    <div className="text-muted-foreground text-xs">Elevated brand status</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-red-600">Market Differentiation</div>
                    <div className="text-muted-foreground text-xs">Competitive advantage</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default Pals;