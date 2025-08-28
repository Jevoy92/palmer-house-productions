import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { MetaTags } from '@/components/seo/MetaTags';
import { 
  Smartphone, Settings, Sprout, Star, Video, Wrench, Play, TrendingUp,
  GraduationCap, UserPlus, HelpCircle, Youtube, BookOpen, Calendar, Crown,
  Film, Music, Trophy, Wand2, Heart, Brain, Leaf, Eye, Users, Menu,
  ChevronDown, ChevronUp, Sparkles, Handshake, Route, Rocket
} from 'lucide-react';

export default function PalmerHousePals() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <MetaTags
        title="Palmer House Pals - Your Video Production Guides"
        description="Meet your specialized video production guides. Each Pal has unique superpowers to help you create the perfect content for your brand's journey."
        keywords="video production guides, video strategy, social media video, business systems video, evergreen content, cinematic video, Palmer House Productions"
      />
      
      {/* Header */}
      <header className={`bg-white shadow-lg sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'backdrop-blur-sm bg-white/90' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold text-gray-900">Palmer House Productions</div>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <button onClick={() => navigate('/')} className="text-gray-700 hover:text-primary transition-colors cursor-pointer">Home</button>
              <span className="text-primary font-semibold cursor-pointer">Meet the Pals</span>
              <button onClick={() => navigate('/video-packages')} className="text-gray-700 hover:text-primary transition-colors cursor-pointer">Services</button>
              <button onClick={() => navigate('/arsenal')} className="text-gray-700 hover:text-primary transition-colors cursor-pointer">Portfolio</button>
              <button onClick={() => navigate('/contact')} className="text-gray-700 hover:text-primary transition-colors cursor-pointer">Contact</button>
              <Button 
                onClick={() => navigate('/contact')}
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-secondary transition-colors"
              >
                Book Strategy Call
              </Button>
            </nav>
            <div className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="text-xl" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[hsl(230,77%,65%)] to-[hsl(260,47%,57%)] text-white h-[700px] flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight">Palmer House Pals</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto opacity-90 font-medium">Meet your specialized video production guides. Each Pal has unique superpowers to help you create the perfect content for your brand's journey.</p>
          </div>
          
          {/* Character Preview Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-2">
              <img className="w-20 h-20 mx-auto rounded-full mb-3 border-4 border-yellow-400" src="/lovable-uploads/a21e6847-9612-495a-8413-097941406e9e.png" alt="Reel Pal character" />
              <h3 className="text-lg font-bold">Reel Pal</h3>
              <p className="text-sm opacity-80">Social Content</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-2">
              <img className="w-20 h-20 mx-auto rounded-full mb-3 border-4 border-gray-400" src="/lovable-uploads/945e6d63-02d8-4c0d-a4ae-b691cc806a74.png" alt="System Pal character" />
              <h3 className="text-lg font-bold">System Pal</h3>
              <p className="text-sm opacity-80">Backend Systems</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-2">
              <img className="w-20 h-20 mx-auto rounded-full mb-3 border-4 border-green-400" src="/lovable-uploads/2537d3fc-b210-4170-93a2-d927fe38eea0.png" alt="Evergreen Pal character" />
              <h3 className="text-lg font-bold">Evergreen Pal</h3>
              <p className="text-sm opacity-80">Long-term Growth</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-2">
              <img className="w-20 h-20 mx-auto rounded-full mb-3 border-4 border-red-400" src="/lovable-uploads/dcada800-4488-4970-82eb-2c356d3e789d.png" alt="Spotlight Pal character" />
              <h3 className="text-lg font-bold">Spotlight Pal</h3>
              <p className="text-sm opacity-80">Cinematic Brand</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/contact')}
              className="bg-white text-primary px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              Find Your Perfect Pal
            </Button>
            <Button 
              variant="outline"
              className="border-2 border-white text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-primary transition-all transform hover:scale-105"
            >
              Watch Our Story
            </Button>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-primary bg-opacity-10 text-primary px-6 py-2 rounded-full text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              HOW THE PALS WORK
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-8">Your Video Journey,<br/>Perfectly Guided</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">Each Pal represents a different expertise in video production. They're not just mascots—they're your strategic guides who understand exactly what you need and how to get you there.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform">
                <Handshake className="text-white text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">1. Meet Your Pals</h3>
              <p className="text-gray-600 text-lg leading-relaxed">Get to know each Pal's personality, strengths, and the unique video solutions they specialize in.</p>
            </div>
            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-accent to-secondary rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform">
                <Route className="text-white text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">2. Choose Your Path</h3>
              <p className="text-gray-600 text-lg leading-relaxed">Select the Pal whose expertise aligns perfectly with your video goals and business objectives.</p>
            </div>
            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform">
                <Rocket className="text-white text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">3. Launch Together</h3>
              <p className="text-gray-600 text-lg leading-relaxed">Dive into tailored packages and services designed specifically around your chosen Pal's expertise.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Pals Showcase */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-8">Meet the Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Four unique personalities, four specialized skill sets, one amazing video production experience.</p>
          </div>
          
          {/* Reel Pal */}
          <div className="bg-white rounded-3xl shadow-2xl p-12 mb-16 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-100 rounded-full -translate-y-32 translate-x-32 opacity-50"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center bg-yellow-100 text-yellow-800 px-6 py-3 rounded-full text-sm font-bold mb-6">
                  <Smartphone className="w-4 h-4 mr-2" />
                  REEL PAL
                </div>
                <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">"Let's make content that connects!"</h3>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">Hi there! I'm your go-to for authentic, engaging short-form content that makes people stop scrolling. From TikToks to Instagram Reels, I help you create videos that feel genuine and drive real engagement.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center">
                      <Video className="text-white w-5 h-5" />
                    </div>
                    <span className="text-gray-700 font-semibold">Short-form Social Content</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center">
                      <Wrench className="text-white w-5 h-5" />
                    </div>
                    <span className="text-gray-700 font-semibold">DIY Creation Kits</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center">
                      <Play className="text-white w-5 h-5" />
                    </div>
                    <span className="text-gray-700 font-semibold">Starter Sessions</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center">
                      <TrendingUp className="text-white w-5 h-5" />
                    </div>
                    <span className="text-gray-700 font-semibold">Platform Optimization</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={() => navigate('/pals/reel-pal')}
                    className="bg-yellow-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-yellow-600 transition-all transform hover:scale-105"
                  >
                    Start with Reel Pal
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-2 border-yellow-500 text-yellow-500 px-8 py-4 rounded-xl font-bold hover:bg-yellow-500 hover:text-white transition-all"
                  >
                    See Reel Examples
                  </Button>
                </div>
              </div>
              <div className="text-center">
                <img className="w-80 h-80 mx-auto" src="/lovable-uploads/a21e6847-9612-495a-8413-097941406e9e.png" alt="Reel Pal character" />
              </div>
            </div>
          </div>
          
          {/* System Pal */}
          <div className="bg-white rounded-3xl shadow-2xl p-12 mb-16 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-64 h-64 bg-gray-100 rounded-full -translate-y-32 -translate-x-32 opacity-50"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
              <div className="text-center order-2 lg:order-1">
                <img className="w-80 h-80 mx-auto" src="/lovable-uploads/945e6d63-02d8-4c0d-a4ae-b691cc806a74.png" alt="System Pal character" />
              </div>
              <div className="text-center lg:text-left order-1 lg:order-2">
                <div className="inline-flex items-center bg-gray-200 text-gray-800 px-6 py-3 rounded-full text-sm font-bold mb-6">
                  <Settings className="w-4 h-4 mr-2" />
                  SYSTEM PAL
                </div>
                <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">"Let's build systems that scale!"</h3>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">Hey! I'm the organized one who loves creating video systems that work like clockwork. From employee training to customer onboarding, I build video infrastructure that grows with your business.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-600 rounded-xl flex items-center justify-center">
                      <GraduationCap className="text-white w-5 h-5" />
                    </div>
                    <span className="text-gray-700 font-semibold">Training Video Systems</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-600 rounded-xl flex items-center justify-center">
                      <UserPlus className="text-white w-5 h-5" />
                    </div>
                    <span className="text-gray-700 font-semibold">Onboarding Sequences</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-600 rounded-xl flex items-center justify-center">
                      <HelpCircle className="text-white w-5 h-5" />
                    </div>
                    <span className="text-gray-700 font-semibold">FAQ Video Libraries</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-600 rounded-xl flex items-center justify-center">
                      <Settings className="text-white w-5 h-5" />
                    </div>
                    <span className="text-gray-700 font-semibold">Process Documentation</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={() => navigate('/pals/system-pal')}
                    className="bg-gray-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-700 transition-all transform hover:scale-105"
                  >
                    Build with System Pal
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-2 border-gray-600 text-gray-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-600 hover:text-white transition-all"
                  >
                    View System Examples
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Evergreen Pal */}
          <div className="bg-white rounded-3xl shadow-2xl p-12 mb-16 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-100 rounded-full -translate-y-32 translate-x-32 opacity-50"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center bg-green-100 text-green-800 px-6 py-3 rounded-full text-sm font-bold mb-6">
                  <Sprout className="w-4 h-4 mr-2" />
                  EVERGREEN PAL
                </div>
                <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">"Let's grow your authority!"</h3>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">Hello! I'm all about the long game. I help you create content that builds your reputation and authority over time. Think YouTube channels, educational series, and content that keeps delivering value for years.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                      <Youtube className="text-white w-5 h-5" />
                    </div>
                    <span className="text-gray-700 font-semibold">YouTube Development</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                      <BookOpen className="text-white w-5 h-5" />
                    </div>
                    <span className="text-gray-700 font-semibold">Educational Series</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                      <Calendar className="text-white w-5 h-5" />
                    </div>
                    <span className="text-gray-700 font-semibold">Monthly Content Plans</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                      <Crown className="text-white w-5 h-5" />
                    </div>
                    <span className="text-gray-700 font-semibold">Authority Building</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={() => navigate('/pals/evergreen-pal')}
                    className="bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 transition-all transform hover:scale-105"
                  >
                    Grow with Evergreen Pal
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-xl font-bold hover:bg-green-600 hover:text-white transition-all"
                  >
                    See Growth Plans
                  </Button>
                </div>
              </div>
              <div className="text-center">
                <img className="w-80 h-80 mx-auto" src="/lovable-uploads/2537d3fc-b210-4170-93a2-d927fe38eea0.png" alt="Evergreen Pal character" />
              </div>
            </div>
          </div>
          
          {/* Spotlight Pal */}
          <div className="bg-white rounded-3xl shadow-2xl p-12 mb-16 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-64 h-64 bg-red-100 rounded-full -translate-y-32 -translate-x-32 opacity-50"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
              <div className="text-center order-2 lg:order-1">
                <img className="w-80 h-80 mx-auto" src="/lovable-uploads/dcada800-4488-4970-82eb-2c356d3e789d.png" alt="Spotlight Pal character" />
              </div>
              <div className="text-center lg:text-left order-1 lg:order-2">
                <div className="inline-flex items-center bg-red-100 text-red-800 px-6 py-3 rounded-full text-sm font-bold mb-6">
                  <Star className="w-4 h-4 mr-2" />
                  SPOTLIGHT PAL
                </div>
                <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">"Let's create cinematic magic!"</h3>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">Darling! I'm your creative visionary for high-end, cinematic content that tells powerful stories. From brand films to music videos, I help you create content that captivates and inspires audiences.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center">
                      <Film className="text-white w-5 h-5" />
                    </div>
                    <span className="text-gray-700 font-semibold">Brand Storytelling</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center">
                      <Music className="text-white w-5 h-5" />
                    </div>
                    <span className="text-gray-700 font-semibold">Music Videos</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center">
                      <Trophy className="text-white w-5 h-5" />
                    </div>
                    <span className="text-gray-700 font-semibold">Hero Content</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center">
                      <Wand2 className="text-white w-5 h-5" />
                    </div>
                    <span className="text-gray-700 font-semibold">Premium Experiences</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={() => navigate('/pals/spotlight-pal')}
                    className="bg-red-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-red-700 transition-all transform hover:scale-105"
                  >
                    Shine with Spotlight Pal
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-2 border-red-600 text-red-600 px-8 py-4 rounded-xl font-bold hover:bg-red-600 hover:text-white transition-all"
                  >
                    View Cinematic Portfolio
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[hsl(230,77%,65%)] to-[hsl(260,47%,57%)] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-black mb-8">Ready to Meet Your Perfect Pal?</h2>
          <p className="text-xl mb-12 max-w-4xl mx-auto opacity-90 leading-relaxed">Every great video journey starts with choosing the right guide. Book a strategy call and we'll help you discover which Pal is perfect for your unique goals and vision.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-opacity-25 transition-all cursor-pointer">
              <div className="w-20 h-20 bg-yellow-500 bg-opacity-80 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Smartphone className="text-white text-2xl" />
              </div>
              <h3 className="font-bold text-lg mb-2">Need Quick Social Content?</h3>
              <p className="text-sm opacity-80 mb-4">Start with Reel Pal</p>
              <Button 
                onClick={() => navigate('/pals/reel-pal')}
                className="bg-yellow-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
              >
                Choose Reel Pal
              </Button>
            </div>
            
            <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-opacity-25 transition-all cursor-pointer">
              <div className="w-20 h-20 bg-gray-600 bg-opacity-80 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Settings className="text-white text-2xl" />
              </div>
              <h3 className="font-bold text-lg mb-2">Building Video Systems?</h3>
              <p className="text-sm opacity-80 mb-4">Start with System Pal</p>
              <Button 
                onClick={() => navigate('/pals/system-pal')}
                className="bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
              >
                Choose System Pal
              </Button>
            </div>
            
            <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-opacity-25 transition-all cursor-pointer">
              <div className="w-20 h-20 bg-green-600 bg-opacity-80 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Sprout className="text-white text-2xl" />
              </div>
              <h3 className="font-bold text-lg mb-2">Growing Long-term Authority?</h3>
              <p className="text-sm opacity-80 mb-4">Start with Evergreen Pal</p>
              <Button 
                onClick={() => navigate('/pals/evergreen-pal')}
                className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Choose Evergreen Pal
              </Button>
            </div>
            
            <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-opacity-25 transition-all cursor-pointer">
              <div className="w-20 h-20 bg-red-600 bg-opacity-80 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Star className="text-white text-2xl" />
              </div>
              <h3 className="font-bold text-lg mb-2">Creating Cinematic Brand Stories?</h3>
              <p className="text-sm opacity-80 mb-4">Start with Spotlight Pal</p>
              <Button 
                onClick={() => navigate('/pals/spotlight-pal')}
                className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Choose Spotlight Pal
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              onClick={() => navigate('/contact')}
              className="bg-white text-primary px-12 py-5 rounded-xl font-bold text-xl hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              Book Your Strategy Call
            </Button>
            <Button 
              variant="outline"
              className="border-3 border-white text-white px-12 py-5 rounded-xl font-bold text-xl hover:bg-white hover:text-primary transition-all transform hover:scale-105"
            >
              Explore All Services
            </Button>
          </div>
          
          <div className="mt-12 text-center opacity-75">
            <p className="text-lg">🎬 Still not sure? No problem! Our strategy call is completely free.</p>
          </div>
        </div>
      </section>
    </>
  );
}