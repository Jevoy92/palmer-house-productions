
export const GlimpseHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-video-white overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 gradient-social-1 rounded-full opacity-20 float-animation"></div>
        <div className="absolute top-40 right-20 w-24 h-24 gradient-social-3 rounded-full opacity-30 float-animation" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 gradient-social-2 rounded-full opacity-15 float-animation" style={{animationDelay: '4s'}}></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 gradient-social-4 rounded-full opacity-25 float-animation" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-social-purple to-social-pink rounded-full text-white font-semibold text-lg mb-6 video-shadow animate-pulse-social">
            🌐 The Glimpse
          </div>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-display font-black mb-8 tracking-tight leading-none">
          See Your Customer Journey
          <br />
          <span className="text-gradient-1">Before It's Real</span>
        </h1>
        
        <p className="text-2xl md:text-3xl text-corporate-gray mb-6 font-medium max-w-5xl mx-auto leading-tight">
          A guided brand vision session that gives you a <span className="text-gradient-2 font-bold">living, breathing preview</span> of your next-level experience.
        </p>
        
        <p className="text-xl text-corporate-gray mb-12 font-medium max-w-4xl mx-auto">
          Built in real time. Delivered in an hour. Hosted for as long as you want.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-24">
          <button className="px-10 py-5 gradient-social-1 text-white font-bold text-lg rounded-2xl hover:scale-105 transition-all duration-300 video-shadow-lg">
            Book Your Glimpse 🗺️
          </button>
          <button className="px-10 py-5 bg-video-white border-2 border-social-purple text-corporate-dark font-bold text-lg rounded-2xl hover:bg-social-purple hover:text-white transition-all duration-300 video-shadow">
            Talk to Us First 📞
          </button>
        </div>
        
        <div className="text-lg text-corporate-gray italic max-w-3xl mx-auto">
          "Before they'll follow you, they need to see where you're going."
        </div>
      </div>
      
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
        <div className="w-2 h-12 gradient-social-1 rounded-full animate-bounce"></div>
      </div>
    </section>
  );
};
