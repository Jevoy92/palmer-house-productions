import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MetaTags } from '@/components/seo/MetaTags';
import { usePageTransition } from '@/components/PageTransition';
import { StructuredData } from '@/components/seo/StructuredData';
import { 
  Camera, 
  Cog, 
  Youtube, 
  Film, 
  Smartphone, 
  Rocket, 
  Wand2, 
  Users, 
  GraduationCap,
  CircleHelp,
  Calendar,
  Trophy,
  Music,
  Megaphone,
  Upload,
  Download,
  MessageCircle,
  Check,
  Video,
  Menu
} from 'lucide-react';

// Import character images
import reelPalImage from '@/assets/pals/female-reel-pal-edited.png';
import maleReelPalImage from '@/assets/pals/male-reel-pal-edited.png';
import systemPalImage from '@/assets/pals/female-system-pal-edited.png';
import evergreenPalImage from '@/assets/pals/female-evergreen-pal-final.png';
import spotlightPalImage from '@/assets/pals/female-spotlight-pal-edited.png';

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
    <div className="bg-gray-50 overflow-x-hidden font-sans">
      <MetaTags
        title="Meet Your Video Pals - Palmer House Productions"
        description="Discover our specialized Video Pals: Reel Pal for social content, System Pal for training videos, Evergreen Pal for authority building, and Spotlight Pal for cinematic storytelling."
        keywords="video production, social media content, training videos, YouTube content, cinematic videos, Palmer House Productions"
      />

      {/* StructuredData removed temporarily for build fix */}

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
              <Link to="/services" className="hover:opacity-80 transition-opacity cursor-pointer">Solutions</Link>
              <Link to="/about" className="hover:opacity-80 transition-opacity cursor-pointer">About</Link>
              <Link to="/contact" className="hover:opacity-80 transition-opacity cursor-pointer">Contact</Link>
              <Link to="/contact" className="bg-white text-pal-blue font-semibold px-5 py-2.5 rounded-full hover:bg-opacity-90 transition-all cursor-pointer">Get Started</Link>
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
            className="group relative w-full md:w-1/4 h-full bg-pal-orange flex flex-col justify-end items-center overflow-hidden transition-all duration-500 ease-in-out md:hover:w-1/3 cursor-pointer"
            onClick={() => navigateToPage('reel-pal')}
          >
            <div className="absolute top-0 left-0 w-full h-full p-8 text-white flex flex-col items-center text-center transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100 group-hover:top-1/4 md:top-1/3 md:group-hover:top-[15%]">
              <h2 className="text-4xl font-extrabold mb-4">Reel Pal</h2>
              <p className="text-lg font-light leading-relaxed max-w-xs">Short-form social content, DIY kits, and our Starter Session.</p>
            </div>
            <div className="relative w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] xl:w-[450px] xl:h-[450px] transform transition-transform duration-500 ease-in-out group-hover:scale-110 opacity-0 animate-[slideUp_1s_ease-out_forwards]">
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
            className="group relative w-full md:w-1/4 h-full bg-pal-purple flex flex-col justify-end items-center overflow-hidden transition-all duration-500 ease-in-out md:hover:w-1/3 cursor-pointer"
            onClick={() => navigateToPage('system-pal')}
          >
            <div className="absolute top-0 left-0 w-full h-full p-8 text-white flex flex-col items-center text-center transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100 group-hover:top-1/4 md:top-1/3 md:group-hover:top-[15%]">
              <h2 className="text-4xl font-extrabold mb-4">System Pal</h2>
              <p className="text-lg font-light leading-relaxed max-w-xs">Backend video systems like training, onboarding, and FAQ buildouts.</p>
            </div>
            <div className="relative w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] xl:w-[450px] xl:h-[450px] transform transition-transform duration-500 ease-in-out group-hover:scale-110 opacity-0 animate-[slideUp_1s_ease-out_0.2s_forwards]">
              <img 
                className="w-full h-full object-contain" 
                src={systemPalImage} 
                alt="System Pal character in purple jacket"
                loading="eager"
              />
            </div>
          </div>

          {/* Evergreen Pal Card */}
          <div 
            className="group relative w-full md:w-1/4 h-full bg-pal-green flex flex-col justify-end items-center overflow-hidden transition-all duration-500 ease-in-out md:hover:w-1/3 cursor-pointer"
            onClick={() => navigateToPage('evergreen-pal')}
          >
            <div className="absolute top-0 left-0 w-full h-full p-8 text-white flex flex-col items-center text-center transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100 group-hover:top-1/4 md:top-1/3 md:group-hover:top-[15%]">
              <h2 className="text-4xl font-extrabold mb-4">Evergreen Pal</h2>
              <p className="text-lg font-light leading-relaxed max-w-xs">Long-term authority content like YouTube engines and monthly plans.</p>
            </div>
            <div className="relative w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] xl:w-[450px] xl:h-[450px] transform transition-transform duration-500 ease-in-out group-hover:scale-110 opacity-0 animate-[slideUp_1s_ease-out_0.4s_forwards]">
              <img 
                className="w-full h-full object-contain" 
                src={evergreenPalImage} 
                alt="Evergreen Pal character in green jacket"
                loading="eager"
              />
            </div>
          </div>

          {/* Spotlight Pal Card */}
          <div 
            className="group relative w-full md:w-1/4 h-full bg-pal-blue flex flex-col justify-end items-center overflow-hidden transition-all duration-500 ease-in-out md:hover:w-1/3 cursor-pointer"
            onClick={() => navigateToPage('spotlight-pal')}
          >
            <div className="absolute top-0 left-0 w-full h-full p-8 text-white flex flex-col items-center text-center transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100 group-hover:top-1/4 md:top-1/3 md:group-hover:top-[15%]">
              <h2 className="text-4xl font-extrabold mb-4">Spotlight Pal</h2>
              <p className="text-lg font-light leading-relaxed max-w-xs">Cinematic brand storytelling, music videos, commercials, and hero content.</p>
            </div>
            <div className="relative w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] xl:w-[450px] xl:h-[450px] transform transition-transform duration-500 ease-in-out group-hover:scale-110 opacity-0 animate-[slideUp_1s_ease-out_0.6s_forwards]">
              <img 
                className="w-full h-full object-contain" 
                src={spotlightPalImage} 
                alt="Spotlight Pal character in blue jacket"
                loading="eager"
              />
            </div>
          </div>
        </section>

        {/* Spacer */}
        <div className="h-[5vh] bg-white relative z-10"></div>

        {/* Intro Section */}
        <section className="bg-white py-20 lg:py-32 relative z-20">
          <div className="container mx-auto px-6 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700">
                Meet Your Video Production Dream Team
              </h2>
              <p className="text-xl text-gray-600 mb-12 leading-relaxed animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700 delay-200">
                Each Video Pal specializes in different aspects of video production, ensuring you get exactly the right expertise for your project. From quick social content to cinematic masterpieces, we've got you covered.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="p-6 bg-pal-orange/5 rounded-2xl border border-pal-orange/20 animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700 delay-300">
                  <div className="w-16 h-16 bg-pal-orange/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Smartphone className="text-2xl text-pal-orange" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Reel Pal</h3>
                  <p className="text-gray-600 text-sm">Perfect for social media and quick content creation</p>
                </div>
                <div className="p-6 bg-pal-purple/5 rounded-2xl border border-pal-purple/20 animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700 delay-400">
                  <div className="w-16 h-16 bg-pal-purple/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Cog className="text-2xl text-pal-purple" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">System Pal</h3>
                  <p className="text-gray-600 text-sm">Specializes in internal training and educational content</p>
                </div>
                <div className="p-6 bg-pal-green/5 rounded-2xl border border-pal-green/20 animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700 delay-500">
                  <div className="w-16 h-16 bg-pal-green/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Youtube className="text-2xl text-pal-green" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Evergreen Pal</h3>
                  <p className="text-gray-600 text-sm">Builds long-term authority through strategic content</p>
                </div>
                <div className="p-6 bg-pal-blue/5 rounded-2xl border border-pal-blue/20 animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700 delay-600">
                  <div className="w-16 h-16 bg-pal-blue/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Film className="text-2xl text-pal-blue" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Spotlight Pal</h3>
                  <p className="text-gray-600 text-sm">Creates premium cinematic brand experiences</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* System Pal Solutions */}
        <section className="bg-gray-50 py-20 lg:py-32 relative z-20">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="text-center lg:text-left animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700">
                <h2 className="text-base font-semibold text-pal-purple uppercase tracking-wider">System Pal</h2>
                <h3 className="mt-2 text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">Automate & Educate with Backend Video</h3>
                <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                  Build a powerful internal video library that streamlines your processes. From comprehensive employee training and seamless onboarding to a robust FAQ video hub, System Pal is your partner in creating efficient, scalable backend video systems.
                </p>
                <div className="mt-10 space-y-8">
                  <div className="flex items-start gap-4 animate-on-scroll opacity-0 transform translate-x-10 transition-all duration-700 delay-200">
                    <div className="flex-shrink-0 w-12 h-12 bg-pal-purple/10 text-pal-purple rounded-lg flex items-center justify-center">
                      <GraduationCap className="text-2xl" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">Training Videos</h4>
                      <p className="mt-1 text-gray-600">Create engaging and repeatable training modules for any department, ensuring consistency and comprehension.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 animate-on-scroll opacity-0 transform translate-x-10 transition-all duration-700 delay-400">
                    <div className="flex-shrink-0 w-12 h-12 bg-pal-purple/10 text-pal-purple rounded-lg flex items-center justify-center">
                      <Rocket className="text-2xl" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">Onboarding Flows</h4>
                      <p className="mt-1 text-gray-600">Design a welcoming and informative video-based onboarding experience for new hires.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 animate-on-scroll opacity-0 transform translate-x-10 transition-all duration-700 delay-600">
                    <div className="flex-shrink-0 w-12 h-12 bg-pal-purple/10 text-pal-purple rounded-lg flex items-center justify-center">
                      <CircleHelp className="text-2xl" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">FAQ Buildouts</h4>
                      <p className="mt-1 text-gray-600">Build a comprehensive library of video answers to common questions, saving your team time and effort.</p>
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
                <h3 className="mt-2 text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">Quick & Creative Content</h3>
                <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                  Perfect for entrepreneurs and small businesses ready to dive into video content. Get started with our DIY kits, short-form social content creation, and our signature Starter Session to launch your video journey.
                </p>
                <div className="mt-10 space-y-8">
                  <div className="flex items-start gap-4 animate-on-scroll opacity-0 transform translate-x-10 transition-all duration-700 delay-200">
                    <div className="flex-shrink-0 w-12 h-12 bg-pal-orange/10 text-pal-orange rounded-lg flex items-center justify-center">
                      <Smartphone className="text-2xl" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">Social Content</h4>
                      <p className="mt-1 text-gray-600">Engaging short-form videos optimized for Instagram Reels, TikTok, and YouTube Shorts.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 animate-on-scroll opacity-0 transform translate-x-10 transition-all duration-700 delay-400">
                    <div className="flex-shrink-0 w-12 h-12 bg-pal-orange/10 text-pal-orange rounded-lg flex items-center justify-center">
                      <Wand2 className="text-2xl" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">DIY Kits</h4>
                      <p className="mt-1 text-gray-600">Complete packages with templates, scripts, and guides for creating your own content.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 animate-on-scroll opacity-0 transform translate-x-10 transition-all duration-700 delay-600">
                    <div className="flex-shrink-0 w-12 h-12 bg-pal-orange/10 text-pal-orange rounded-lg flex items-center justify-center">
                      <Camera className="text-2xl" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">Starter Session</h4>
                      <p className="mt-1 text-gray-600">One-on-one consultation to plan your video strategy and get you started on the right path.</p>
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
        <section className="bg-gray-50 py-20 lg:py-32 relative z-20">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="text-center lg:text-left animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700">
                <h2 className="text-base font-semibold text-pal-green uppercase tracking-wider">Evergreen Pal</h2>
                <h3 className="mt-2 text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">Long-Term Authority Building</h3>
                <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                  Establish your expertise with consistent, high-quality content that builds trust over time. Our YouTube engine and monthly content plans ensure your brand stays top-of-mind while positioning you as an industry leader.
                </p>
                <div className="mt-10 space-y-8">
                  <div className="flex items-start gap-4 animate-on-scroll opacity-0 transform translate-x-10 transition-all duration-700 delay-200">
                    <div className="flex-shrink-0 w-12 h-12 bg-pal-green/10 text-pal-green rounded-lg flex items-center justify-center">
                      <Youtube className="text-2xl" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">YouTube Engine</h4>
                      <p className="mt-1 text-gray-600">Systematic approach to building a thriving YouTube channel with optimized content and growth strategies.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 animate-on-scroll opacity-0 transform translate-x-10 transition-all duration-700 delay-400">
                    <div className="flex-shrink-0 w-12 h-12 bg-pal-green/10 text-pal-green rounded-lg flex items-center justify-center">
                      <Calendar className="text-2xl" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">Monthly Plans</h4>
                      <p className="mt-1 text-gray-600">Consistent content delivery with strategic planning to maintain audience engagement and growth.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 animate-on-scroll opacity-0 transform translate-x-10 transition-all duration-700 delay-600">
                    <div className="flex-shrink-0 w-12 h-12 bg-pal-green/10 text-pal-green rounded-lg flex items-center justify-center">
                      <Trophy className="text-2xl" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">Authority Content</h4>
                      <p className="mt-1 text-gray-600">Thought leadership videos that showcase your expertise and build credibility in your industry.</p>
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
                <h3 className="mt-2 text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">Cinematic Brand Storytelling</h3>
                <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                  Elevate your brand with premium video content that captivates and converts. From cinematic brand stories and music videos to commercial productions and hero content, Spotlight Pal delivers Hollywood-quality results.
                </p>
                <div className="mt-10 space-y-8">
                  <div className="flex items-start gap-4 animate-on-scroll opacity-0 transform translate-x-10 transition-all duration-700 delay-200">
                    <div className="flex-shrink-0 w-12 h-12 bg-pal-blue/10 text-pal-blue rounded-lg flex items-center justify-center">
                      <Film className="text-2xl" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">Brand Storytelling</h4>
                      <p className="mt-1 text-gray-600">Compelling narratives that connect emotionally with your audience and communicate your brand values.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 animate-on-scroll opacity-0 transform translate-x-10 transition-all duration-700 delay-400">
                    <div className="flex-shrink-0 w-12 h-12 bg-pal-blue/10 text-pal-blue rounded-lg flex items-center justify-center">
                      <Music className="text-2xl" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">Music Videos</h4>
                      <p className="mt-1 text-gray-600">Creative and artistic video productions that bring musical visions to life with stunning visuals.</p>
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
        <section className="bg-gray-50 py-20 lg:py-32 relative z-20">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700">Our Seamless Workflow</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700 delay-200">From upload to final cut, our process is designed for clarity and speed.</p>
            </div>
            <div className="relative flex flex-col md:flex-row justify-between items-center w-full max-w-5xl mx-auto">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-300 hidden md:block border-t-2 border-dashed border-gray-400"></div>

              <div className="flex flex-col items-center relative z-10 p-4 w-full md:w-1/4 animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700 delay-300">
                <div className="w-16 h-16 bg-pal-orange/20 border-2 border-pal-orange rounded-full flex items-center justify-center mb-4">
                  <Upload className="text-pal-orange text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2">1. Upload</h3>
                <p className="text-gray-600 text-sm text-center">Securely upload your raw footage and assets to our dedicated portal.</p>
              </div>

              <div className="flex flex-col items-center relative z-10 p-4 w-full md:w-1/4 mt-8 md:mt-0 animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700 delay-450">
                <div className="w-16 h-16 bg-pal-purple/20 border-2 border-pal-purple rounded-full flex items-center justify-center mb-4">
                  <Wand2 className="text-pal-purple text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2">2. Edit</h3>
                <p className="text-gray-600 text-sm text-center">Our editors work their magic, crafting the first draft based on your brief.</p>
              </div>

              <div className="flex flex-col items-center relative z-10 p-4 w-full md:w-1/4 mt-8 md:mt-0 animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700 delay-600">
                <div className="w-16 h-16 bg-pal-green/20 border-2 border-pal-green rounded-full flex items-center justify-center mb-4">
                  <MessageCircle className="text-pal-green text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2">3. Review</h3>
                <p className="text-gray-600 text-sm text-center">Provide feedback directly on the video with our intuitive review tools.</p>
              </div>

              <div className="flex flex-col items-center relative z-10 p-4 w-full md:w-1/4 mt-8 md:mt-0 animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700 delay-750">
                <div className="w-16 h-16 bg-pal-blue/20 border-2 border-pal-blue rounded-full flex items-center justify-center mb-4">
                  <Download className="text-pal-blue text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2">4. Deliver</h3>
                <p className="text-gray-600 text-sm text-center">Download your finalized, high-resolution video in multiple formats.</p>
              </div>
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
                  <span className="text-4xl font-extrabold text-pal-orange">$299</span>
                  <span className="text-gray-600">/video</span>
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
                    <span className="text-gray-600">2 revisions</span>
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
                  <span className="text-4xl font-extrabold text-pal-purple">$599</span>
                  <span className="text-gray-600">/video</span>
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
                    <span className="text-gray-600">3 revisions</span>
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
                  <span className="text-4xl font-extrabold text-pal-green">$999</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-center gap-3">
                    <Check className="text-pal-green" size={16} />
                    <span className="text-gray-600">4 long-form videos/month</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="text-pal-green" size={16} />
                    <span className="text-gray-600">YouTube optimization</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="text-pal-green" size={16} />
                    <span className="text-gray-600">Content strategy planning</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="text-pal-green" size={16} />
                    <span className="text-gray-600">Unlimited revisions</span>
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
                  <span className="text-4xl font-extrabold text-pal-blue">$2,999</span>
                  <span className="text-gray-600">/project</span>
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

        {/* Footer */}
        <footer className="bg-pal-footer-green text-white pt-20 pb-8 px-4 sm:px-8 md:px-12 relative z-20">
          <div className="container mx-auto flex flex-col items-center">
            <div className="flex items-center gap-4 mb-8">
              <Video className="text-5xl" />
              <span className="text-5xl font-bold">Video Pals</span>
            </div>
            <div className="w-full flex flex-col md:flex-row justify-between items-center text-center border-t border-white/20 pt-6 mt-8">
              <p className="text-sm text-white/70 mb-4 md:mb-0">© 2024 Palmer House Productions. All rights reserved.</p>
              <div className="flex items-center gap-6 text-sm">
                <Link to="/privacy" className="hover:underline cursor-pointer">Privacy Policy</Link>
                <Link to="/terms" className="hover:underline cursor-pointer">Terms of Service</Link>
                <Link to="/contact" className="hover:underline cursor-pointer">Contact Us</Link>
              </div>
            </div>
          </div>
        </footer>
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