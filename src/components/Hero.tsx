
export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10 animate-pulse"></div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent animate-fade-in">
          Palmer House Productions
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light">
          Where vision finds voice—and your story finds its path.
        </p>
        
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-8"></div>
        
        <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
          A cinematic video agency for the bold, the brave, and the brands that refuse to be boxed in. 
          We partner with entrepreneurs, creators, and founders who are ready to be seen—not as generic 
          service providers, but as something real, rare, and unforgettable.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-semibold rounded-lg hover:from-amber-400 hover:to-orange-400 transition-all duration-300 transform hover:scale-105">
            Start Your Journey
          </button>
          <button className="px-8 py-3 border border-amber-400 text-amber-400 font-semibold rounded-lg hover:bg-amber-400 hover:text-slate-950 transition-all duration-300">
            View Our Work
          </button>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-amber-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-amber-400 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};
