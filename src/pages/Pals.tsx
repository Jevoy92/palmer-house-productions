import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MetaTags } from '@/components/seo/MetaTags';
import { usePageTransition } from '@/components/PageTransition';
import { StructuredData } from '@/components/seo/StructuredData';
import { ScrollBars } from '@/components/ScrollBars';
import { 
  Cog, 
  Youtube, 
  Film, 
  Smartphone, 
  Rocket, 
  Users, 
  GraduationCap,
  CircleHelp,
  Video,
  Menu,
  Wand2,
  Camera,
  Calendar,
  Trophy,
  Music,
  Megaphone,
  Upload,
  MessageCircle,
  Download,
  Check
} from 'lucide-react';

// Import character images
import reelPalImage from '@/assets/pals/female-reel-pal-edited.png';
import maleReelPalImage from '@/assets/pals/male-reel-pal-edited.png';
import systemPalImage from '@/assets/pals/female-system-pal-edited.png';
import maleSystemPalImage from '@/assets/pals/male-system-pal-edited.png';
import evergreenPalImage from '@/assets/pals/female-evergreen-pal-final.png';
import maleEvergreenPalImage from '@/assets/pals/male-evergreen-pal-edited.png';
import spotlightPalImage from '@/assets/pals/female-spotlight-pal-edited.png';
import maleSpotlightPalImage from '@/assets/pals/male-spotlight-pal-edited.png';
import { PRICING } from "@/lib/pricing";


export default function Pals() {
  const { transitionTo } = usePageTransition();
  const [isLoaded, setIsLoaded] = useState(false);

  const transitionToPage = (targetPath: string) => {
    transitionTo(targetPath);
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

  const navigateToPage = (pal: string) => {
    switch (pal) {
      case 'reel-pal':
        transitionToPage('/reel-pal');
        break;
      case 'system-pal':
        transitionToPage('/system-pal');
        break;
      case 'evergreen-pal':
        transitionToPage('/evergreen-pal');
        break;
      case 'spotlight-pal':
        transitionToPage('/spotlight-pal');
        break;
    }
  };

  return (
    <div className="bg-muted overflow-x-hidden font-sans">
      <ScrollBars />
        <MetaTags 
          title="Video Systems That Remove Friction, Waste & Invisibility | Palmer House Productions"
          description="Meet the Video Pals: specialized video systems that solve business problems. Remove friction with System Pal, invisibility with Reel Pal, confusion with Evergreen Pal, and weak proof with Spotlight Pal."
          keywords="video production systems, business video solutions, training video systems, social media content systems, evergreen content, Seattle video production"
          ogTitle="Video Systems That Remove Friction, Waste & Invisibility"
          ogDescription="Specialized video systems that solve real business problems: training systems, social content, authority building, and proof content."
          canonicalUrl="https://www.palmerhouseproductions.com/pals"
        />

      <StructuredData type="services" />

      <main className="relative">
        {/* Sticky Background Bars */}
        <div className="fixed top-0 left-0 w-full h-screen -z-10">
          <div className="w-full h-full flex">
            <div className="w-1/4 h-full bg-pal-orange transition-all duration-700 ease-in-out"></div>
            <div className="w-1/4 h-full bg-pal-purple transition-all duration-700 ease-in-out"></div>
            <div className="w-1/4 h-full bg-pal-green transition-all duration-700 ease-in-out"></div>
            <div className="w-1/4 h-full bg-pal-blue transition-all duration-700 ease-in-out"></div>
          </div>
        </div>

        {/* Header */}
        <header className="absolute top-0 left-0 w-full z-20 py-6 px-4 sm:px-8 md:px-12">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Video className="text-white text-3xl" />
              <h1 className="text-3xl font-bold text-white">Video Pals</h1>
            </div>
            <nav className="hidden md:flex items-center gap-8 text-white font-medium">
              <button onClick={() => transitionToPage('/services')} className="hover:opacity-80 transition-opacity cursor-pointer">Solutions</button>
              <button onClick={() => transitionToPage('/about')} className="hover:opacity-80 transition-opacity cursor-pointer">About</button>
              <button onClick={() => transitionToPage('/contact')} className="hover:opacity-80 transition-opacity cursor-pointer">Contact</button>
            </nav>
            <button className="md:hidden text-white text-2xl">
              <Menu />
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="h-[950px] md:h-[850px] lg:h-[900px] xl:h-[1000px] w-full flex flex-col md:flex-row relative z-10">
          {/* Reel Pal Card */}
          <div 
            className="group relative w-full md:w-1/4 h-full bg-pal-orange flex flex-row md:flex-col justify-between md:justify-end items-center overflow-hidden transition-all duration-500 ease-in-out md:hover:w-1/3 cursor-pointer"
            onClick={() => navigateToPage('reel-pal')}
          >
            <div className="absolute top-0 left-0 w-full h-full p-8 text-white flex flex-col items-center text-center transition-all duration-500 ease-in-out opacity-100 md:opacity-0 group-hover:opacity-100 top-1/4 md:group-hover:top-1/4 md:top-1/3 md:group-hover:top-[15%]">
              <h2 className="text-2xl md:text-4xl font-extrabold mb-2 md:mb-4">Reel Pal</h2>
              <p className="text-sm md:text-lg font-light leading-relaxed max-w-xs">Solving invisibility with consistent social presence.</p>
            </div>
            <div className="relative w-[200px] h-[200px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] xl:w-[450px] xl:h-[450px] transform transition-transform duration-500 ease-in-out group-hover:scale-110 opacity-0 animate-[slideUp_1s_ease-out_forwards] ml-auto md:ml-0">
              <img 
                className="absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ease-in-out opacity-100 group-hover:opacity-0" 
                src={reelPalImage} 
                alt="Female Reel Pal character in orange hoodie"
                loading="eager"
              />
              <img 
                className="absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100" 
                src={maleReelPalImage} 
                alt="Male Reel Pal character in orange hoodie"
                loading="eager"
              />
            </div>
          </div>

          {/* System Pal Card */}
          <div 
            className="group relative w-full md:w-1/4 h-full bg-pal-purple flex flex-row md:flex-col justify-between md:justify-end items-center overflow-hidden transition-all duration-500 ease-in-out md:hover:w-1/3 cursor-pointer"
            onClick={() => navigateToPage('system-pal')}
          >
            <div className="absolute top-0 left-0 w-full h-full p-8 text-white flex flex-col items-center text-center transition-all duration-500 ease-in-out opacity-100 md:opacity-0 group-hover:opacity-100 top-1/4 md:group-hover:top-1/4 md:top-1/3 md:group-hover:top-[15%]">
              <h2 className="text-2xl md:text-4xl font-extrabold mb-2 md:mb-4">System Pal</h2>
              <p className="text-sm md:text-lg font-light leading-relaxed max-w-xs">Removing friction from internal processes.</p>
            </div>
            <div className="relative w-[200px] h-[200px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] xl:w-[450px] xl:h-[450px] transform transition-transform duration-500 ease-in-out group-hover:scale-110 opacity-0 animate-[slideUp_1s_ease-out_0.2s_forwards] ml-auto md:ml-0">
              <img 
                className="absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ease-in-out opacity-100 group-hover:opacity-0" 
                src={systemPalImage} 
                alt="Female System Pal character in teal jacket"
                loading="eager"
              />
              <img 
                className="absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100" 
                src={maleSystemPalImage} 
                alt="Male System Pal character in teal jacket"
                loading="eager"
              />
            </div>
          </div>

          {/* Evergreen Pal Card */}
          <div 
            className="group relative w-full md:w-1/4 h-full bg-pal-green flex flex-row md:flex-col justify-between md:justify-end items-center overflow-hidden transition-all duration-500 ease-in-out md:hover:w-1/3 cursor-pointer"
            onClick={() => navigateToPage('evergreen-pal')}
          >
            <div className="absolute top-0 left-0 w-full h-full p-8 text-white flex flex-col items-center text-center transition-all duration-500 ease-in-out opacity-100 md:opacity-0 group-hover:opacity-100 top-1/4 md:group-hover:top-1/4 md:top-1/3 md:group-hover:top-[15%]">
              <h2 className="text-2xl md:text-4xl font-extrabold mb-2 md:mb-4">Evergreen Pal</h2>
              <p className="text-sm md:text-lg font-light leading-relaxed max-w-xs">Eliminating confusion about your offering.</p>
            </div>
            <div className="relative w-[200px] h-[200px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] xl:w-[450px] xl:h-[450px] transform transition-transform duration-500 ease-in-out group-hover:scale-110 opacity-0 animate-[slideUp_1s_ease-out_0.4s_forwards] ml-auto md:ml-0">
              <img 
                className="absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ease-in-out opacity-100 group-hover:opacity-0" 
                src={evergreenPalImage} 
                alt="Female Evergreen Pal character in green cardigan"
                loading="eager"
              />
              <img 
                className="absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100" 
                src={maleEvergreenPalImage} 
                alt="Male Evergreen Pal character in blue cardigan"
                loading="eager"
              />
            </div>
          </div>

          {/* Spotlight Pal Card */}
          <div 
            className="group relative w-full md:w-1/4 h-full bg-pal-blue flex flex-row md:flex-col justify-between md:justify-end items-center overflow-hidden transition-all duration-500 ease-in-out md:hover:w-1/3 cursor-pointer"
            onClick={() => navigateToPage('spotlight-pal')}
          >
            <div className="absolute top-0 left-0 w-full h-full p-8 text-white flex flex-col items-center text-center transition-all duration-500 ease-in-out opacity-100 md:opacity-0 group-hover:opacity-100 top-1/4 md:group-hover:top-1/4 md:top-1/3 md:group-hover:top-[15%]">
              <h2 className="text-2xl md:text-4xl font-extrabold mb-2 md:mb-4">Spotlight Pal</h2>
              <p className="text-sm md:text-lg font-light leading-relaxed max-w-xs">Making your wins and proof visible.</p>
            </div>
            <div className="relative w-[200px] h-[200px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] xl:w-[450px] xl:h-[450px] transform transition-transform duration-500 ease-in-out group-hover:scale-110 opacity-0 animate-[slideUp_1s_ease-out_0.6s_forwards] ml-auto md:ml-0">
              <img 
                className="absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ease-in-out opacity-100 group-hover:opacity-0" 
                src={spotlightPalImage} 
                alt="Female Spotlight Pal character in blue jacket"
                loading="eager"
              />
              <img 
                className="absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100" 
                src={maleSpotlightPalImage} 
                alt="Male Spotlight Pal character in blue jacket"
                loading="eager"
              />
            </div>
          </div>
        </section>

        {/* Spacer */}
        <div className="h-[5vh] bg-white relative z-10"></div>

        {/* Campaign Hook Section */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-20 lg:py-32 relative z-20">
          <div className="container mx-auto px-6 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-extrabold text-corporate-dark mb-8 animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700">
                What's slowing down your business?
              </h2>
              <p className="text-2xl md:text-3xl text-corporate-gray mb-12 leading-relaxed animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700 delay-200">
                Your <span className="text-primary font-bold">people</span>, your <span className="text-corporate-dark font-bold">process</span>, or your <span className="text-accent font-bold">visibility</span>?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700 delay-300">
                <button 
                  onClick={() => transitionToPage('/contact')} 
                  className="px-8 py-4 bg-primary text-white rounded-full font-bold text-lg hover:bg-primary/90 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105"
                >
                  Let's Build the Video System That Solves It
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Intro Section */}
        <section className="bg-white py-20 lg:py-32 relative z-20">
          <div className="container mx-auto px-6 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-extrabold text-corporate-dark mb-6 animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700">
                Meet Your Video Systems Specialists
              </h2>
              <p className="text-xl text-corporate-gray mb-12 leading-relaxed animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700 delay-200">
                We help businesses remove friction, waste, and invisibility using video systems. Each Video Pal specializes in removing different types of waste from your business—whether it's friction in your processes, invisibility in your marketing, or confusion about your offering.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="p-6 bg-pal-orange/5 rounded-2xl border border-pal-orange/20 animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700 delay-300">
                  <div className="w-16 h-16 bg-pal-orange/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Smartphone className="text-2xl text-pal-orange" />
                  </div>
                  <h3 className="text-lg font-bold text-corporate-dark mb-2">Reel Pal</h3>
                  <p className="text-corporate-gray text-sm">Removes invisibility with consistent social content systems</p>
                </div>
                <div className="p-6 bg-pal-purple/5 rounded-2xl border border-pal-purple/20 animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700 delay-400">
                  <div className="w-16 h-16 bg-pal-purple/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Cog className="text-2xl text-pal-purple" />
                  </div>
                  <h3 className="text-lg font-bold text-corporate-dark mb-2">System Pal</h3>
                  <p className="text-corporate-gray text-sm">Removes friction from training, onboarding, and processes</p>
                </div>
                <div className="p-6 bg-pal-green/5 rounded-2xl border border-pal-green/20 animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700 delay-500">
                  <div className="w-16 h-16 bg-pal-green/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Youtube className="text-2xl text-pal-green" />
                  </div>
                  <h3 className="text-lg font-bold text-corporate-dark mb-2">Evergreen Pal</h3>
                  <p className="text-corporate-gray text-sm">Eliminates confusion with clear explanatory content</p>
                </div>
                <div className="p-6 bg-pal-blue/5 rounded-2xl border border-pal-blue/20 animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700 delay-600">
                  <div className="w-16 h-16 bg-pal-blue/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Film className="text-2xl text-pal-blue" />
                  </div>
                  <h3 className="text-lg font-bold text-corporate-dark mb-2">Spotlight Pal</h3>
                  <p className="text-corporate-gray text-sm">Makes your wins visible with testimonials and proof content</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* System Pal Solutions */}
        <section className="bg-muted py-20 lg:py-32 relative z-20">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="text-center lg:text-left animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700">
                <h2 className="text-base font-semibold text-pal-purple uppercase tracking-wider">System Pal</h2>
                <h3 className="mt-2 text-4xl md:text-5xl font-extrabold text-corporate-dark leading-tight">Removing Friction From Your Business</h3>
                <p className="mt-6 text-lg text-corporate-gray leading-relaxed">
                  <strong className="text-corporate-dark">The Problem:</strong> Teams waste time answering the same questions. Onboarding is inconsistent. Processes exist only in people's heads.
                </p>
                <p className="mt-4 text-lg text-corporate-gray leading-relaxed">
                  <strong className="text-corporate-dark">The Solution:</strong> Video systems that document your processes once and scale them forever. Onboarding video series, role-specific training modules, step-by-step workflow videos, and digital SOP libraries that turn institutional knowledge into accessible assets.
                </p>
                <p className="mt-4 text-lg text-corporate-dark leading-relaxed font-semibold">
                  Business Impact: Reduce training time by 50%, eliminate repetitive explanations, and scale your operations without scaling your headcount.
                </p>
                <div className="mt-10 space-y-8">
                  <div className="flex items-start gap-4 animate-on-scroll opacity-0 transform translate-x-10 transition-all duration-700 delay-200">
                    <div className="flex-shrink-0 w-12 h-12 bg-pal-purple/10 text-pal-purple rounded-lg flex items-center justify-center">
                      <GraduationCap className="text-2xl" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-corporate-dark">Training Videos</h4>
                      <p className="mt-1 text-corporate-gray">Create engaging and repeatable training modules for any department, ensuring consistency and comprehension.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 animate-on-scroll opacity-0 transform translate-x-10 transition-all duration-700 delay-400">
                    <div className="flex-shrink-0 w-12 h-12 bg-pal-purple/10 text-pal-purple rounded-lg flex items-center justify-center">
                      <Rocket className="text-2xl" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-corporate-dark">Onboarding Flows</h4>
                      <p className="mt-1 text-corporate-gray">Design a welcoming and informative video-based onboarding experience for new hires.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 animate-on-scroll opacity-0 transform translate-x-10 transition-all duration-700 delay-600">
                    <div className="flex-shrink-0 w-12 h-12 bg-pal-purple/10 text-pal-purple rounded-lg flex items-center justify-center">
                      <CircleHelp className="text-2xl" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-corporate-dark">FAQ Buildouts</h4>
                      <p className="mt-1 text-corporate-gray">Build a comprehensive library of video answers to common questions, saving your team time and effort.</p>
                    </div>
                  </div>
                </div>
                <div className="mt-12 flex justify-center lg:justify-start">
                  <button 
                    onClick={() => navigateToPage('system-pal')}
                    className="bg-pal-purple text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl animate-on-scroll opacity-0 transform translate-y-5 transition-all duration-700 delay-800"
                  >
                    Build Your System
                  </button>
                </div>
              </div>
              <div className="relative flex justify-center items-center h-[450px] lg:h-auto animate-on-scroll opacity-0 transform translate-x-10 transition-all duration-700 delay-300">
                <div className="absolute w-full h-full bg-pal-purple rounded-3xl transform -rotate-6"></div>
                <div className="relative z-10 w-[400px] h-[400px] lg:w-[500px] lg:h-[500px] xl:w-[550px] xl:h-[550px]">
                  <img className="object-contain w-full h-full" src={systemPalImage} alt="System Pal 3D character" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reel Pal Solutions */}
        <section className="bg-white py-20 lg:py-32 relative z-20">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="relative flex justify-center items-center h-[450px] lg:h-auto order-2 lg:order-1 animate-on-scroll opacity-0 transform translate-x-10 transition-all duration-700">
                <div className="absolute w-full h-full bg-pal-orange rounded-3xl transform rotate-6"></div>
                <div className="relative z-10 w-[400px] h-[400px] lg:w-[500px] lg:h-[500px] xl:w-[550px] xl:h-[550px]">
                  <img className="object-contain w-full h-full" src={reelPalImage} alt="Reel Pal 3D character" />
                </div>
              </div>
              <div className="text-center lg:text-left order-1 lg:order-2 animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700">
                <h2 className="text-base font-semibold text-pal-orange uppercase tracking-wider">Reel Pal</h2>
                <h3 className="mt-2 text-4xl md:text-5xl font-extrabold text-corporate-dark leading-tight">Quick & Creative Content</h3>
                <p className="mt-6 text-lg text-corporate-gray leading-relaxed">
                  Perfect for entrepreneurs and small businesses ready to dive into video content. Get started with our DIY kits, short-form social content creation, and our signature Starter Session to launch your video journey.
                </p>
                <div className="mt-10 space-y-8">
                  <div className="flex items-start gap-4 animate-on-scroll opacity-0 transform translate-x-10 transition-all duration-700 delay-200">
                    <div className="flex-shrink-0 w-12 h-12 bg-pal-orange/10 text-pal-orange rounded-lg flex items-center justify-center">
                      <Smartphone className="text-2xl" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-corporate-dark">Social Content</h4>
                      <p className="mt-1 text-corporate-gray">Engaging short-form videos optimized for Instagram Reels, TikTok, and YouTube Shorts.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 animate-on-scroll opacity-0 transform translate-x-10 transition-all duration-700 delay-400">
                    <div className="flex-shrink-0 w-12 h-12 bg-pal-orange/10 text-pal-orange rounded-lg flex items-center justify-center">
                      <Wand2 className="text-2xl" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-corporate-dark">DIY Kits</h4>
                      <p className="mt-1 text-corporate-gray">Complete packages with templates, scripts, and guides for creating your own content.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 animate-on-scroll opacity-0 transform translate-x-10 transition-all duration-700 delay-600">
                    <div className="flex-shrink-0 w-12 h-12 bg-pal-orange/10 text-pal-orange rounded-lg flex items-center justify-center">
                      <Camera className="text-2xl" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-corporate-dark">Starter Session</h4>
                      <p className="mt-1 text-corporate-gray">One-on-one consultation to plan your video strategy and get you started on the right path.</p>
                    </div>
                  </div>
                </div>
                <div className="mt-12 flex justify-center lg:justify-start">
                  <button 
                    onClick={() => navigateToPage('reel-pal')}
                    className="bg-pal-orange text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl animate-on-scroll opacity-0 transform translate-y-5 transition-all duration-700 delay-800"
                  >
                    Start Creating
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Evergreen Pal Solutions */}
        <section className="bg-muted py-20 lg:py-32 relative z-20">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="text-center lg:text-left animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700">
                <h2 className="text-base font-semibold text-pal-green uppercase tracking-wider">Evergreen Pal</h2>
                <h3 className="mt-2 text-4xl md:text-5xl font-extrabold text-corporate-dark leading-tight">Long-Term Authority Building</h3>
                <p className="mt-6 text-lg text-corporate-gray leading-relaxed">
                  Establish your expertise with consistent, high-quality content that builds trust over time. Our YouTube engine and monthly content plans ensure your brand stays top-of-mind while positioning you as an industry leader.
                </p>
                <div className="mt-10 space-y-8">
                  <div className="flex items-start gap-4 animate-on-scroll opacity-0 transform translate-x-10 transition-all duration-700 delay-200">
                    <div className="flex-shrink-0 w-12 h-12 bg-pal-green/10 text-pal-green rounded-lg flex items-center justify-center">
                      <Youtube className="text-2xl" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-corporate-dark">YouTube Engine</h4>
                      <p className="mt-1 text-corporate-gray">Systematic approach to building a thriving YouTube channel with optimized content and growth strategies.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 animate-on-scroll opacity-0 transform translate-x-10 transition-all duration-700 delay-400">
                    <div className="flex-shrink-0 w-12 h-12 bg-pal-green/10 text-pal-green rounded-lg flex items-center justify-center">
                      <Calendar className="text-2xl" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-corporate-dark">Monthly Plans</h4>
                      <p className="mt-1 text-corporate-gray">Consistent content delivery with strategic planning to maintain audience engagement and growth.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 animate-on-scroll opacity-0 transform translate-x-10 transition-all duration-700 delay-600">
                    <div className="flex-shrink-0 w-12 h-12 bg-pal-green/10 text-pal-green rounded-lg flex items-center justify-center">
                      <Trophy className="text-2xl" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-corporate-dark">Authority Content</h4>
                      <p className="mt-1 text-corporate-gray">Thought leadership videos that showcase your expertise and build credibility in your industry.</p>
                    </div>
                  </div>
                </div>
                <div className="mt-12 flex justify-center lg:justify-start">
                  <button 
                    onClick={() => navigateToPage('evergreen-pal')}
                    className="bg-pal-green text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl animate-on-scroll opacity-0 transform translate-y-5 transition-all duration-700 delay-800"
                  >
                    Build Authority
                  </button>
                </div>
              </div>
              <div className="relative flex justify-center items-center h-[450px] lg:h-auto animate-on-scroll opacity-0 transform translate-x-10 transition-all duration-700 delay-300">
                <div className="absolute w-full h-full bg-pal-green rounded-3xl transform -rotate-6"></div>
                <div className="relative z-10 w-[400px] h-[400px] lg:w-[500px] lg:h-[500px] xl:w-[550px] xl:h-[550px]">
                  <img className="object-contain w-full h-full" src={evergreenPalImage} alt="Evergreen Pal 3D character" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Spotlight Pal Solutions */}
        <section className="bg-white py-20 lg:py-32 relative z-20">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="relative flex justify-center items-center h-[450px] lg:h-auto order-2 lg:order-1 animate-on-scroll opacity-0 transform translate-x-10 transition-all duration-700">
                <div className="absolute w-full h-full bg-pal-blue rounded-3xl transform rotate-6"></div>
                <div className="relative z-10 w-[400px] h-[400px] lg:w-[500px] lg:h-[500px] xl:w-[550px] xl:h-[550px]">
                  <img className="object-contain w-full h-full" src={spotlightPalImage} alt="Spotlight Pal 3D character" />
                </div>
              </div>
              <div className="text-center lg:text-left order-1 lg:order-2 animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700">
                <h2 className="text-base font-semibold text-pal-blue uppercase tracking-wider">Spotlight Pal</h2>
                <h3 className="mt-2 text-4xl md:text-5xl font-extrabold text-corporate-dark leading-tight">Cinematic Brand Storytelling</h3>
                <p className="mt-6 text-lg text-corporate-gray leading-relaxed">
                  Elevate your brand with premium video content that captivates and converts. From cinematic brand stories and music videos to commercial productions and hero content, Spotlight Pal delivers Hollywood-quality results.
                </p>
                <div className="mt-10 space-y-8">
                  <div className="flex items-start gap-4 animate-on-scroll opacity-0 transform translate-x-10 transition-all duration-700 delay-200">
                    <div className="flex-shrink-0 w-12 h-12 bg-pal-blue/10 text-pal-blue rounded-lg flex items-center justify-center">
                      <Film className="text-2xl" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-corporate-dark">Brand Storytelling</h4>
                      <p className="mt-1 text-corporate-gray">Compelling narratives that connect emotionally with your audience and communicate your brand values.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 animate-on-scroll opacity-0 transform translate-x-10 transition-all duration-700 delay-400">
                    <div className="flex-shrink-0 w-12 h-12 bg-pal-blue/10 text-pal-blue rounded-lg flex items-center justify-center">
                      <Music className="text-2xl" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-corporate-dark">Music Videos</h4>
                      <p className="mt-1 text-corporate-gray">Creative and artistic video productions that bring musical visions to life with stunning visuals.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 animate-on-scroll opacity-0 transform translate-x-10 transition-all duration-700 delay-600">
                    <div className="flex-shrink-0 w-12 h-12 bg-pal-blue/10 text-pal-blue rounded-lg flex items-center justify-center">
                      <Megaphone className="text-2xl" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">Commercials</h4>
                      <p className="mt-1 text-gray-600">Professional commercial productions designed to drive action and deliver measurable results.</p>
                    </div>
                  </div>
                </div>
                <div className="mt-12 flex justify-center lg:justify-start">
                  <button 
                    onClick={() => navigateToPage('spotlight-pal')}
                    className="bg-pal-blue text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl animate-on-scroll opacity-0 transform translate-y-5 transition-all duration-700 delay-800"
                  >
                    Create Cinematic Content
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Workflow Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          {/* Animated Background Bars */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100"></div>
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-0 left-0 w-1/4 h-full bg-pal-orange animate-pulse" style={{animationDelay: '0s'}}></div>
              <div className="absolute top-0 left-1/4 w-1/4 h-full bg-pal-purple animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute top-0 left-2/4 w-1/4 h-full bg-pal-green animate-pulse" style={{animationDelay: '1s'}}></div>
              <div className="absolute top-0 left-3/4 w-1/4 h-full bg-pal-blue animate-pulse" style={{animationDelay: '1.5s'}}></div>
            </div>
            {/* Floating Elements */}
            <div className="absolute top-1/4 left-1/6 w-32 h-32 bg-pal-orange/5 rounded-full animate-bounce" style={{animationDelay: '2s', animationDuration: '3s'}}></div>
            <div className="absolute bottom-1/4 right-1/6 w-24 h-24 bg-pal-purple/5 rounded-full animate-bounce" style={{animationDelay: '3s', animationDuration: '4s'}}></div>
            <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-pal-green/5 rounded-full animate-bounce" style={{animationDelay: '1s', animationDuration: '2.5s'}}></div>
          </div>

          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-pal-orange via-pal-purple to-pal-blue bg-clip-text text-transparent mb-6">
                Our Seamless Workflow
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                From upload to final cut, our process is designed for clarity and speed.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {/* Step 1 - Upload */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-pal-orange/20 to-pal-orange/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                 <div className="relative bg-white/90 backdrop-blur-lg rounded-3xl p-8 text-center border border-pal-orange/20 shadow-xl group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500">
                   <div className="w-20 h-20 bg-gradient-to-br from-pal-orange to-pal-orange/70 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-12 transition-transform duration-500 shadow-lg">
                     <Upload className="text-white text-3xl" />
                   </div>
                   <div className="absolute top-4 right-4 w-8 h-8 bg-pal-orange/10 rounded-full flex items-center justify-center">
                     <span className="text-pal-orange font-bold text-lg">1</span>
                   </div>
                   <h3 className="text-2xl font-bold mb-4 text-gray-900">Upload</h3>
                   <p className="text-gray-600 leading-relaxed">Securely upload your raw footage and assets to our dedicated portal.</p>
                 </div>
              </div>

              {/* Step 2 - Edit */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-pal-purple/20 to-pal-purple/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                 <div className="relative bg-white/90 backdrop-blur-lg rounded-3xl p-8 text-center border border-pal-purple/20 shadow-xl group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500">
                   <div className="w-20 h-20 bg-gradient-to-br from-pal-purple to-pal-purple/70 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-12 transition-transform duration-500 shadow-lg">
                     <Wand2 className="text-white text-3xl" />
                   </div>
                   <div className="absolute top-4 right-4 w-8 h-8 bg-pal-purple/10 rounded-full flex items-center justify-center">
                     <span className="text-pal-purple font-bold text-lg">2</span>
                   </div>
                   <h3 className="text-2xl font-bold mb-4 text-gray-900">Edit</h3>
                   <p className="text-gray-600 leading-relaxed">Our editors work their magic, crafting the first draft based on your brief.</p>
                 </div>
              </div>

              {/* Step 3 - Review */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-pal-green/20 to-pal-green/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                 <div className="relative bg-white/90 backdrop-blur-lg rounded-3xl p-8 text-center border border-pal-green/20 shadow-xl group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500">
                   <div className="w-20 h-20 bg-gradient-to-br from-pal-green to-pal-green/70 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-12 transition-transform duration-500 shadow-lg">
                     <MessageCircle className="text-white text-3xl" />
                   </div>
                   <div className="absolute top-4 right-4 w-8 h-8 bg-pal-green/10 rounded-full flex items-center justify-center">
                     <span className="text-pal-green font-bold text-lg">3</span>
                   </div>
                   <h3 className="text-2xl font-bold mb-4 text-gray-900">Review</h3>
                   <p className="text-gray-600 leading-relaxed">Provide feedback directly on the video with our intuitive review tools.</p>
                 </div>
              </div>

              {/* Step 4 - Deliver */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-pal-blue/20 to-pal-blue/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                 <div className="relative bg-white/90 backdrop-blur-lg rounded-3xl p-8 text-center border border-pal-blue/20 shadow-xl group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500">
                   <div className="w-20 h-20 bg-gradient-to-br from-pal-blue to-pal-blue/70 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-12 transition-transform duration-500 shadow-lg">
                     <Download className="text-white text-3xl" />
                   </div>
                   <div className="absolute top-4 right-4 w-8 h-8 bg-pal-blue/10 rounded-full flex items-center justify-center">
                     <span className="text-pal-blue font-bold text-lg">4</span>
                   </div>
                   <h3 className="text-2xl font-bold mb-4 text-gray-900">Deliver</h3>
                   <p className="text-gray-600 leading-relaxed">Download your finalized, high-resolution video in multiple formats.</p>
                 </div>
              </div>
            </div>

            {/* Call-to-Action */}
            <div className="text-center mt-16">
              <button className="bg-gradient-to-r from-pal-orange via-pal-purple to-pal-blue text-white font-bold py-4 px-12 rounded-full text-xl hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl">
                Start Your Project Today
              </button>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="bg-white py-20 lg:py-32 relative z-20">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700">Choose Your Video Pal Package</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700 delay-200">Flexible pricing options designed to fit every budget and project scope.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white border-2 border-pal-orange/20 rounded-2xl p-8 text-center relative overflow-hidden animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700 delay-300">
                <div className="absolute top-0 left-0 w-full h-2 bg-pal-orange"></div>
                <div className="w-16 h-16 bg-pal-orange/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Smartphone className="text-2xl text-pal-orange" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Reel Pal</h3>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-pal-orange">{PRICING.OTHER_BUNDLES.STARTER_SESSION.price}</span>
                  <span className="text-gray-600"> - {PRICING.OTHER_BUNDLES.THIRTY_REELS.price}</span>
                </div>
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-center gap-3">
                    <Check className="text-pal-orange" size={16} />
                    <span className="text-gray-600">15-60 second videos</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="text-pal-orange" size={16} />
                    <span className="text-gray-600">Social media optimization</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="text-pal-orange" size={16} />
                    <span className="text-gray-600">DIY content kit included</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="text-pal-orange" size={16} />
                    <span className="text-gray-600">Multiple package options</span>
                  </li>
                </ul>
                <button 
                  onClick={() => navigateToPage('reel-pal')}
                  className="w-full bg-pal-orange text-white font-bold py-3 px-6 rounded-full hover:bg-opacity-90 transition-all"
                >
                  Get Started
                </button>
              </div>

              <div className="bg-white border-2 border-pal-purple/20 rounded-2xl p-8 text-center relative overflow-hidden animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700 delay-400">
                <div className="absolute top-0 left-0 w-full h-2 bg-pal-purple"></div>
                <div className="w-16 h-16 bg-pal-purple/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Cog className="text-2xl text-pal-purple" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">System Pal</h3>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-pal-purple">{PRICING.BUSINESS_VIDEO_ASSETS.INTERNAL_ASSETS.price}</span>
                  <span className="text-gray-600"> - {PRICING.BUSINESS_VIDEO_ASSETS.ADVANCED_ASSETS.price}</span>
                </div>
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-center gap-3">
                    <Check className="text-pal-purple" size={16} />
                    <span className="text-gray-600">Training & onboarding videos</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="text-pal-purple" size={16} />
                    <span className="text-gray-600">FAQ video buildouts</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="text-pal-purple" size={16} />
                    <span className="text-gray-600">System integration support</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="text-pal-purple" size={16} />
                    <span className="text-gray-600">Multiple complexity levels</span>
                  </li>
                </ul>
                <button 
                  onClick={() => navigateToPage('system-pal')}
                  className="w-full bg-pal-purple text-white font-bold py-3 px-6 rounded-full hover:bg-opacity-90 transition-all"
                >
                  Build System
                </button>
              </div>

              <div className="bg-white border-2 border-pal-green/20 rounded-2xl p-8 text-center relative overflow-hidden animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700 delay-500">
                <div className="absolute top-0 left-0 w-full h-2 bg-pal-green"></div>
                <div className="w-16 h-16 bg-pal-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Youtube className="text-2xl text-pal-green" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Evergreen Pal</h3>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-pal-green">{PRICING.DIY_DOWNLOADS.STRATEGY_BLUEPRINT.price}</span>
                  <span className="text-gray-600"> - {PRICING.OTHER_BUNDLES.YOUTUBE_ENGINE.price}</span>
                </div>
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-center gap-3">
                    <Check className="text-pal-green" size={16} />
                    <span className="text-gray-600">Long-form content strategy</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="text-pal-green" size={16} />
                    <span className="text-gray-600">YouTube optimization</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="text-pal-green" size={16} />
                    <span className="text-gray-600">Authority building content</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="text-pal-green" size={16} />
                    <span className="text-gray-600">DIY guides included</span>
                  </li>
                </ul>
                <button 
                  onClick={() => navigateToPage('evergreen-pal')}
                  className="w-full bg-pal-green text-white font-bold py-3 px-6 rounded-full hover:bg-opacity-90 transition-all"
                >
                  Build Authority
                </button>
              </div>

              <div className="bg-white border-2 border-pal-blue/20 rounded-2xl p-8 text-center relative overflow-hidden animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700 delay-600">
                <div className="absolute top-0 left-0 w-full h-2 bg-pal-blue"></div>
                <div className="w-16 h-16 bg-pal-blue/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Film className="text-2xl text-pal-blue" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Spotlight Pal</h3>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-pal-blue">{PRICING.OTHER_BUNDLES.SEVEN_DAY_LAUNCH.price}</span>
                  <span className="text-gray-600"> - {PRICING.OTHER_BUNDLES.FOUNDER_BRAND_KIT.price}</span>
                </div>
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-center gap-3">
                    <Check className="text-pal-blue" size={16} />
                    <span className="text-gray-600">Cinematic production</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="text-pal-blue" size={16} />
                    <span className="text-gray-600">Brand storytelling</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="text-pal-blue" size={16} />
                    <span className="text-gray-600">Commercial production</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="text-pal-blue" size={16} />
                    <span className="text-gray-600">Premium support</span>
                  </li>
                </ul>
                <button 
                  onClick={() => navigateToPage('spotlight-pal')}
                  className="w-full bg-pal-blue text-white font-bold py-3 px-6 rounded-full hover:bg-opacity-90 transition-all"
                >
                  Create Cinematic Content
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <style>{`
        @keyframes slideUp {
          from { 
            transform: translateY(100%); 
            opacity: 0; 
          }
          to { 
            transform: translateY(0); 
            opacity: 1; 
          }
        }
      `}</style>
    </div>
  );
}