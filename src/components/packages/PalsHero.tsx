import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Video, Menu } from "lucide-react";
import { Link } from "react-router-dom";

// Import character images
import reelPalImage from '@/assets/pals/female-reel-pal-edited.png';
import maleReelPalImage from '@/assets/pals/male-reel-pal-edited.png';
import systemPalImage from '@/assets/pals/female-system-pal-edited.png';
import maleSystemPalImage from '@/assets/pals/male-system-pal-edited.png';
import evergreenPalImage from '@/assets/pals/female-evergreen-pal-final.png';
import maleEvergreenPalImage from '@/assets/pals/male-evergreen-pal-edited.png';
import spotlightPalImage from '@/assets/pals/female-spotlight-pal-edited.png';
import maleSpotlightPalImage from '@/assets/pals/male-spotlight-pal-edited.png';

export const PalsHero = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const navigateToPage = (pal: string) => {
    switch (pal) {
      case 'reel-pal':
        navigate('/reel-pal');
        break;
      case 'system-pal':
        navigate('/system-pal');
        break;
      case 'evergreen-pal':
        navigate('/evergreen-pal');
        break;
      case 'spotlight-pal':
        navigate('/spotlight-pal');
        break;
    }
  };

  return (
    <div className="relative">
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
    </div>
  );
};