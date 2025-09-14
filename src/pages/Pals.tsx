import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MetaTags } from '@/components/seo/MetaTags';
import { usePageTransition } from '@/components/PageTransition';
import { StructuredData } from '@/components/seo/StructuredData';
import { ScrollBars } from '@/components/ScrollBars';
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
import maleSystemPalImage from '@/assets/pals/male-system-pal-edited.png';
import evergreenPalImage from '@/assets/pals/female-evergreen-pal-final.png';
import maleEvergreenPalImage from '@/assets/pals/male-evergreen-pal-edited.png';
import spotlightPalImage from '@/assets/pals/female-spotlight-pal-edited.png';
import maleSpotlightPalImage from '@/assets/pals/male-spotlight-pal-edited.png';

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
      
      elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8;
        
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
      <ScrollBars />
      <MetaTags
        title="Meet Your Video Pals - Palmer House Productions"
        description="Discover our specialized Video Pals: Reel Pal for social content, System Pal for training videos, Evergreen Pal for authority building, and Spotlight Pal for cinematic storytelling."
        keywords="video production, social media content, training videos, YouTube content, cinematic videos, Palmer House Productions"
      />

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

        {/* Hero Section with Character Cards */}
        <section className="min-h-screen flex relative z-10">
          {/* Reel Pal Card */}
          <div 
            className="group relative w-full md:w-1/4 h-full bg-pal-orange flex flex-col justify-end items-center overflow-hidden transition-all duration-500 ease-in-out md:hover:w-1/3 cursor-pointer"
            onClick={() => navigateToPage('reel-pal')}
          >
            <div className="absolute top-0 left-0 w-full h-full p-8 text-white flex flex-col items-center text-center transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100 group-hover:top-1/4 md:top-1/3 md:group-hover:top-[15%]">
              <h2 className="text-4xl font-extrabold mb-4">Reel Pal</h2>
              <p className="text-lg font-light leading-relaxed max-w-xs">Quick social content creation and DIY video kits for growing brands.</p>
            </div>
            <div className="relative w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] xl:w-[450px] xl:h-[450px] transform transition-transform duration-500 ease-in-out group-hover:scale-110 opacity-0 animate-[slideUp_1s_ease-out_0s_forwards]">
              <img 
                className="absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ease-in-out opacity-100 group-hover:opacity-0" 
                src={reelPalImage} 
                alt="Female Reel Pal character in orange jacket"
                loading="eager"
              />
              <img 
                className="absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100" 
                src={maleReelPalImage} 
                alt="Male Reel Pal character in orange jacket"
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
              <p className="text-lg font-light leading-relaxed max-w-xs">Internal training videos, onboarding, and FAQ systems for growing teams.</p>
            </div>
            <div className="relative w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] xl:w-[450px] xl:h-[450px] transform transition-transform duration-500 ease-in-out group-hover:scale-110 opacity-0 animate-[slideUp_1s_ease-out_0.2s_forwards]">
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
            className="group relative w-full md:w-1/4 h-full bg-pal-green flex flex-col justify-end items-center overflow-hidden transition-all duration-500 ease-in-out md:hover:w-1/3 cursor-pointer"
            onClick={() => navigateToPage('evergreen-pal')}
          >
            <div className="absolute top-0 left-0 w-full h-full p-8 text-white flex flex-col items-center text-center transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100 group-hover:top-1/4 md:top-1/3 md:group-hover:top-[15%]">
              <h2 className="text-4xl font-extrabold mb-4">Evergreen Pal</h2>
              <p className="text-lg font-light leading-relaxed max-w-xs">Long-term authority content like YouTube engines and monthly plans.</p>
            </div>
            <div className="relative w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] xl:w-[450px] xl:h-[450px] transform transition-transform duration-500 ease-in-out group-hover:scale-110 opacity-0 animate-[slideUp_1s_ease-out_0.4s_forwards]">
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
            className="group relative w-full md:w-1/4 h-full bg-pal-blue flex flex-col justify-end items-center overflow-hidden transition-all duration-500 ease-in-out md:hover:w-1/3 cursor-pointer"
            onClick={() => navigateToPage('spotlight-pal')}
          >
            <div className="absolute top-0 left-0 w-full h-full p-8 text-white flex flex-col items-center text-center transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100 group-hover:top-1/4 md:top-1/3 md:group-hover:top-[15%]">
              <h2 className="text-4xl font-extrabold mb-4">Spotlight Pal</h2>
              <p className="text-lg font-light leading-relaxed max-w-xs">Cinematic brand storytelling, music videos, commercials, and hero content.</p>
            </div>
            <div className="relative w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] xl:w-[450px] xl:h-[450px] transform transition-transform duration-500 ease-in-out group-hover:scale-110 opacity-0 animate-[slideUp_1s_ease-out_0.6s_forwards]">
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

        {/* Intro Section */}
        <section className="relative py-20 lg:py-32 z-20 overflow-hidden">
          {/* Colorful gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-pal-orange/5 via-pal-purple/5 to-pal-green/5"></div>
          
          {/* Floating color orbs */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-pal-orange/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-pal-blue/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
          
          <div className="container mx-auto px-6 lg:px-8 text-center relative z-10">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700">
                Meet Your Video Production Dream Team
              </h2>
              <p className="text-xl text-gray-600 mb-12 leading-relaxed animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700 delay-200">
                Each Video Pal specializes in different aspects of video production, ensuring you get exactly the right expertise for your project. From quick social content to cinematic masterpieces, we've got you covered.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="group p-6 bg-white rounded-2xl border border-pal-orange/20 shadow-lg hover:shadow-xl transition-all duration-300 animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700 delay-300 hover:scale-105">
                  <div className="w-16 h-16 bg-gradient-to-br from-pal-orange to-pal-orange/80 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:rotate-12 transition-transform duration-300">
                    <Smartphone className="text-2xl text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Reel Pal</h3>
                  <p className="text-gray-600 text-sm">Perfect for social media and quick content creation</p>
                </div>
                <div className="group p-6 bg-white rounded-2xl border border-pal-purple/20 shadow-lg hover:shadow-xl transition-all duration-300 animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700 delay-400 hover:scale-105">
                  <div className="w-16 h-16 bg-gradient-to-br from-pal-purple to-pal-purple/80 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:rotate-12 transition-transform duration-300">
                    <Cog className="text-2xl text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">System Pal</h3>
                  <p className="text-gray-600 text-sm">Specializes in internal training and educational content</p>
                </div>
                <div className="group p-6 bg-white rounded-2xl border border-pal-green/20 shadow-lg hover:shadow-xl transition-all duration-300 animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700 delay-500 hover:scale-105">
                  <div className="w-16 h-16 bg-gradient-to-br from-pal-green to-pal-green/80 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:rotate-12 transition-transform duration-300">
                    <Youtube className="text-2xl text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Evergreen Pal</h3>
                  <p className="text-gray-600 text-sm">Builds long-term authority through strategic content</p>
                </div>
                <div className="group p-6 bg-white rounded-2xl border border-pal-blue/20 shadow-lg hover:shadow-xl transition-all duration-300 animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700 delay-600 hover:scale-105">
                  <div className="w-16 h-16 bg-gradient-to-br from-pal-blue to-pal-blue/80 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:rotate-12 transition-transform duration-300">
                    <Film className="text-2xl text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Spotlight Pal</h3>
                  <p className="text-gray-600 text-sm">Creates premium cinematic brand experiences</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Get Started CTA */}
        <section className="relative py-32 z-20 overflow-hidden">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-pal-orange/20 via-pal-purple/20 to-pal-blue/20"></div>
          
          <div className="container mx-auto px-6 lg:px-8 text-center relative z-10">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-8 animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700">
                Ready to Meet Your Video Pal?
              </h2>
              <p className="text-xl text-gray-600 mb-12 leading-relaxed animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700 delay-200">
                Discover which Video Pal is perfect for your project and start creating content that converts.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700 delay-400">
                <button 
                  onClick={() => transitionToPage('/contact')}
                  className="bg-gradient-to-r from-pal-orange via-pal-purple to-pal-blue text-white font-bold py-4 px-8 rounded-full text-lg hover:scale-105 transition-all shadow-xl hover:shadow-2xl"
                >
                  Get Started Today
                </button>
                <button 
                  onClick={() => transitionToPage('/video-packages')}
                  className="border-2 border-gray-300 text-gray-700 font-bold py-4 px-8 rounded-full text-lg hover:border-pal-purple hover:text-pal-purple transition-all"
                >
                  View All Packages
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