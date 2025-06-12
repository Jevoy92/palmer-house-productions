
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter';

export const Hero = () => {
  const handleStartJourney = () => {
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreTrails = () => {
    const servicesElement = document.getElementById('services');
    if (servicesElement) {
      servicesElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Animated counters
  const journeysCounter = useAnimatedCounter({ end: 50, suffix: "+" });
  const milesCounter = useAnimatedCounter({ end: 1, suffix: "M+" });
  const storiesCounter = useAnimatedCounter({ end: Infinity, prefix: "" });

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-video-white overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 gradient-social-1 rounded-full opacity-20 float-animation"></div>
        <div className="absolute top-40 right-20 w-24 h-24 gradient-social-2 rounded-full opacity-30 float-animation" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 gradient-social-3 rounded-full opacity-15 float-animation" style={{animationDelay: '4s'}}></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 gradient-social-4 rounded-full opacity-25 float-animation" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-social-purple to-social-pink rounded-full text-white font-semibold text-lg mb-6 video-shadow animate-pulse-social">
            🎬 Visual Storytelling Explorers
          </div>
        </div>
        
        <h1 className="text-7xl md:text-9xl font-display font-black mb-8 tracking-tight leading-none">
          Palmer House
          <br />
          <span className="text-gradient-1">Productions</span>
        </h1>
        
        <p className="text-2xl md:text-4xl text-corporate-gray mb-12 font-medium max-w-4xl mx-auto leading-tight">
          We film the <span className="text-gradient-2 font-bold">road less traveled</span>.
          <br />
          Stories as <span className="text-gradient-3 font-bold">original</span> as the path you walk.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-24">
          <button 
            onClick={handleStartJourney}
            className="px-10 py-5 gradient-social-1 text-white font-bold text-lg rounded-2xl hover:scale-105 transition-all duration-300 video-shadow-lg"
          >
            Start Your Journey 🗺️
          </button>
          <button 
            onClick={handleExploreTrails}
            className="px-10 py-5 bg-video-white border-2 border-social-purple text-corporate-dark font-bold text-lg rounded-2xl hover:bg-social-purple hover:text-white transition-all duration-300 video-shadow"
          >
            Explore Our Trails ▶️
          </button>
        </div>
        
        {/* Social Proof */}
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div ref={journeysCounter.ref} className="text-3xl font-black text-gradient-1 mb-2">
              {journeysCounter.displayValue}
            </div>
            <div className="text-sm text-corporate-gray font-medium">Journeys Captured</div>
          </div>
          <div className="text-center">
            <div ref={milesCounter.ref} className="text-3xl font-black text-gradient-2 mb-2">
              {milesCounter.displayValue}
            </div>
            <div className="text-sm text-corporate-gray font-medium">Miles of Discovery</div>
          </div>
          <div className="text-center">
            <div ref={storiesCounter.ref} className="text-3xl font-black text-gradient-3 mb-2">
              {storiesCounter.displayValue}
            </div>
            <div className="text-sm text-corporate-gray font-medium">Stories Untold</div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
        <div className="w-2 h-12 gradient-social-1 rounded-full animate-bounce"></div>
      </div>
    </section>
  );
};
