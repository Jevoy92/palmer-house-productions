
import { useState, useEffect } from "react";
import { Play, Check, Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export const Hero = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleStartSystem = () => {
    navigate('/video-packages');
  };

  const handleNavClick = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    // Initialize animations and interactive effects
    if (typeof window !== 'undefined') {
      import('../lib/gsap').then(({ revealElements }) => {
        revealElements('.hero-content > *', { stagger: 0.1, delay: 0.2 });
      });

      // Add floating animations
      const floatingElements = document.querySelectorAll('[data-float]');
      floatingElements.forEach((el, index) => {
        (el as HTMLElement).style.animation = `float-gentle ${6 + index * 0.5}s ease-in-out infinite`;
      });

      // Add dash line animations
      const lines = document.querySelectorAll('[data-dash]');
      lines.forEach((line, index) => {
        setTimeout(() => {
          (line as SVGElement).style.strokeDasharray = '5,5';
          (line as SVGElement).style.animation = 'dash 3s linear infinite';
        }, index * 300);
      });

      // Add CSS for dash animation
      const style = document.createElement('style');
      style.textContent = `
        @keyframes dash {
          to { stroke-dashoffset: -10; }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <section className="relative w-full h-[900px] overflow-hidden bg-[#121212] text-white">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50"></div>
      
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col h-full">
          
          {/* Integrated Header */}
          <header className="flex justify-between items-center py-8">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-brand-orange rounded-lg flex items-center justify-center">
                <Play className="text-white w-4 h-4 sm:w-5 sm:h-5 fill-white translate-x-px" />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-semibold tracking-wide block">Palmer House</span>
                <span className="text-xs font-light tracking-[0.2em] text-neutral-400">PRODUCTIONS</span>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-10 text-lg">
              <button 
                onClick={() => handleNavClick('/video-packages')}
                className="text-neutral-300 hover:text-white transition-colors cursor-pointer"
              >
                Services
              </button>
              <button 
                onClick={() => handleNavClick('/video-use-cases')}
                className="text-neutral-300 hover:text-white transition-colors cursor-pointer"
              >
                Work
              </button>
              <button 
                onClick={() => handleNavClick('/about-us')}
                className="text-neutral-300 hover:text-white transition-colors cursor-pointer"
              >
                About
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </header>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-20 left-0 right-0 bg-black/90 backdrop-blur-md border-t border-neutral-800 z-50">
              <nav className="px-6 py-4 space-y-4">
                <button 
                  onClick={() => handleNavClick('/video-packages')}
                  className="block w-full text-left text-neutral-300 hover:text-white transition-colors py-2"
                >
                  Services
                </button>
                <button 
                  onClick={() => handleNavClick('/video-use-cases')}
                  className="block w-full text-left text-neutral-300 hover:text-white transition-colors py-2"
                >
                  Work
                </button>
                <button 
                  onClick={() => handleNavClick('/about-us')}
                  className="block w-full text-left text-neutral-300 hover:text-white transition-colors py-2"
                >
                  About
                </button>
              </nav>
            </div>
          )}
          
          {/* Main Hero Content */}
          <div className="flex flex-1 items-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 w-full">
              {/* Left Column - Headline and Description */}
              <div className="flex flex-col justify-center hero-content">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6 lg:mb-8 text-white animate-fade-blur-in">
                  Build Video<br/>
                  Content<br/>
                  Systems
                </h1>
                <p className="text-lg sm:text-xl text-neutral-300 leading-relaxed max-w-lg mb-8 lg:mb-12 animate-fade-blur-in" style={{animationDelay: '0.1s'}}>
                  Save time and money, drive authority, and scale your business.
                </p>
                
                <div className="flex animate-fade-blur-in" style={{animationDelay: '0.2s'}}>
                  <button 
                    onClick={handleStartSystem}
                    className="bg-brand-orange text-white text-lg font-medium px-8 sm:px-10 py-3 sm:py-4 rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-[0_0_20px_rgba(255,125,59,0.4)] hover:scale-105"
                  >
                    Start Your System
                  </button>
                </div>
              </div>
              
              {/* Right Column - Visual System */}
              <div className="relative flex items-center justify-center animate-fade-blur-in" style={{animationDelay: '0.3s'}}>
                {/* Connection Lines SVG - Hidden on mobile */}
                <div className="absolute inset-0 pointer-events-none z-0 hidden md:block">
                  <svg width="100%" height="100%" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path data-dash d="M295 295 C 295 200, 400 200, 420 190" stroke="#3B82F6" strokeWidth="1.5" strokeOpacity="0.5"></path>
                    <path data-dash d="M295 295 C 200 295, 200 230, 180 215" stroke="#3B82F6" strokeWidth="1.5" strokeOpacity="0.5"></path>
                    <path data-dash d="M295 305 C 200 305, 200 380, 220 400" stroke="#3B82F6" strokeWidth="1.5" strokeOpacity="0.5"></path>
                    <path data-dash d="M220 400 C 220 440, 280 440, 300 440" stroke="#3B82F6" strokeWidth="1.5" strokeOpacity="0.5"></path>
                    <path data-dash d="M420 190 C 470 190, 470 140, 490 130" stroke="#3B82F6" strokeWidth="1.5" strokeOpacity="0.5"></path>
                  </svg>
                </div>

                {/* Central Monitor - Always visible, responsive sizing */}
                <div className="relative z-10 w-32 h-20 sm:w-40 sm:h-24 lg:w-48 lg:h-32 bg-[#212121]/50 backdrop-blur-md rounded-lg p-2 border border-brand-orange/50 shadow-[0_0_30px_rgba(255,125,59,0.3)] cursor-pointer hover:scale-105 transition-transform duration-300">
                  <div className="w-full h-full rounded-md flex items-center justify-center bg-gradient-to-br from-brand-orange/30 to-brand-orange/10">
                     <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-brand-orange rounded-md flex items-center justify-center">
                        <Play className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white fill-white" />
                    </div>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 sm:w-20 lg:w-24 h-2 bg-[#212121]/50 border-x border-b border-brand-orange/50 rounded-b-md"></div>
                </div>

                {/* Mobile: Simplified card layout below monitor */}
                <div className="block md:hidden absolute -bottom-16 left-1/2 -translate-x-1/2 flex space-x-4">
                  {/* Onboarding Card - Mobile simplified */}
                  <div className="w-20 h-12 bg-[#212121]/50 backdrop-blur-md rounded-lg p-2 border border-brand-orange/50 shadow-[0_0_20px_rgba(255,125,59,0.2)] flex items-center justify-center">
                    <div className="w-4 h-4 bg-brand-orange rounded-sm flex items-center justify-center">
                      <Play className="w-2 h-2 text-white fill-white" />
                    </div>
                  </div>
                  
                  {/* Checkmark Card - Mobile simplified */}
                  <div className="w-20 h-12 bg-[#212121]/50 backdrop-blur-md rounded-lg p-2 border border-brand-orange/50 shadow-[0_0_20px_rgba(255,125,59,0.2)] flex items-center justify-center">
                     <Check className="w-5 h-5 text-brand-orange" />
                  </div>
                  
                  {/* Video Item Card - Mobile simplified */}
                  <div className="w-20 h-12 bg-[#212121]/50 backdrop-blur-md rounded-lg p-2 border border-brand-blue/50 shadow-[0_0_20px_rgba(59,130,246,0.2)] flex items-center justify-center">
                    <div className="w-5 h-5 bg-brand-blue rounded-md flex items-center justify-center">
                      <Play className="w-2 h-2 text-white fill-white" />
                    </div>
                  </div>
                </div>

                {/* Desktop/Tablet: Full floating card system */}
                <div className="hidden md:block">
                  {/* Onboarding Card - Responsive positioning */}
                  <div data-float className="absolute top-4 right-0 md:top-8 md:right-4 lg:top-16 lg:right-0 z-10 w-32 md:w-36 lg:w-44 bg-[#212121]/50 backdrop-blur-md rounded-lg p-3 border border-brand-orange/50 shadow-[0_0_20px_rgba(255,125,59,0.2)] cursor-pointer hover:scale-105 transition-all duration-300">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-5 h-5 lg:w-6 lg:h-6 bg-brand-orange rounded-sm flex items-center justify-center">
                        <Play className="w-2 h-2 lg:w-3 lg:h-3 text-white fill-white" />
                      </div>
                      <span className="font-medium text-xs lg:text-sm">Onboarding</span>
                    </div>
                    <div className="space-y-1.5">
                      <div className="h-1.5 lg:h-2 w-3/4 bg-brand-blue/30 rounded-full overflow-hidden">
                        <div className="h-full bg-brand-blue rounded-full w-0 transition-all duration-2000"></div>
                      </div>
                      <div className="h-1.5 lg:h-2 w-full bg-brand-blue/30 rounded-full overflow-hidden">
                        <div className="h-full bg-brand-blue rounded-full w-0 transition-all duration-2000"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Checkmark Card - Responsive positioning */}
                  <div data-float className="absolute top-8 left-8 md:top-12 md:left-12 lg:top-24 lg:left-24 z-10 w-20 h-14 lg:w-24 lg:h-16 bg-[#212121]/50 backdrop-blur-md rounded-lg p-3 border border-brand-orange/50 shadow-[0_0_20px_rgba(255,125,59,0.2)] flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300">
                     <Check className="w-6 h-6 lg:w-8 lg:h-8 text-brand-orange opacity-0 transition-all duration-500" />
                  </div>

                  {/* Video Item Card - Responsive positioning */}
                  <div data-float className="absolute top-24 left-2 md:top-32 md:left-4 lg:top-40 lg:left-8 z-10 w-20 h-14 lg:w-24 lg:h-16 bg-[#212121]/50 backdrop-blur-md rounded-lg p-3 border border-brand-blue/50 shadow-[0_0_20px_rgba(59,130,246,0.2)] flex items-center justify-center cursor-pointer hover:scale-105 transition-all duration-300">
                    <div className="w-6 h-6 lg:w-8 lg:h-8 bg-brand-blue rounded-md flex items-center justify-center">
                      <Play className="w-3 h-3 lg:w-4 lg:h-4 text-white fill-white" />
                    </div>
                  </div>

                  {/* List Card - Hidden on tablet, shown on desktop */}
                  <div data-float className="hidden lg:block absolute bottom-32 left-16 z-10 w-32 h-20 bg-[#212121]/50 backdrop-blur-md rounded-lg p-3 border border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.2)] flex items-center space-x-3 cursor-pointer hover:scale-105 transition-all duration-300">
                    <span className="text-2xl lg:text-3xl font-bold text-red-400">1</span>
                    <div className="flex-1 space-y-2">
                      <div className="h-2 lg:h-2.5 w-full bg-red-400/30 rounded-full"></div>
                      <div className="h-2 lg:h-2.5 w-3/4 bg-red-400/30 rounded-full"></div>
                    </div>
                  </div>

                  {/* FAQs Card - Simplified positioning */}
                  <div data-float className="absolute bottom-8 left-32 md:bottom-12 md:left-36 lg:bottom-16 lg:left-48 z-10 w-24 lg:w-28 bg-[#212121]/50 backdrop-blur-md rounded-lg p-3 border border-brand-purple/50 shadow-[0_0_20px_rgba(151,71,255,0.2)] flex items-center space-x-2 cursor-pointer hover:scale-105 transition-all duration-300">
                    <div className="flex flex-col space-y-1">
                      <div className="w-2 h-2 lg:w-2.5 lg:h-2.5 bg-brand-purple/50 rounded-full transition-all duration-300"></div>
                      <div className="w-2 h-2 lg:w-2.5 lg:h-2.5 bg-brand-purple/50 rounded-full transition-all duration-300"></div>
                    </div>
                    <span className="font-medium text-xs lg:text-sm">FAQs</span>
                  </div>

                  {/* Playlist Card - Responsive positioning */}
                  <div data-float className="absolute bottom-12 right-2 md:bottom-16 md:right-4 lg:bottom-20 lg:right-8 z-10 w-28 lg:w-36 bg-[#212121]/50 backdrop-blur-md rounded-lg p-3 border border-brand-purple/50 shadow-[0_0_20px_rgba(151,71,255,0.2)] flex items-center space-x-3 cursor-pointer hover:scale-105 transition-all duration-300">
                    <div className="flex-1 space-y-2">
                      <div className="h-2 lg:h-2.5 w-full bg-brand-purple/30 rounded-full"></div>
                      <div className="h-2 lg:h-2.5 w-3/4 bg-brand-purple/30 rounded-full"></div>
                    </div>
                    <div className="w-6 h-6 lg:w-8 lg:h-8 bg-brand-purple rounded-full flex items-center justify-center">
                      <Play className="w-2 h-2 lg:w-3 lg:h-3 text-white fill-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-purple/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-brand-orange/10 rounded-full blur-[100px]"></div>

    </section>
  );
};
