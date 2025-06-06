
export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-apple-gray/20 to-white"></div>
      
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-sf font-semibold mb-8 tracking-tight text-black leading-none">
          Palmer House
          <br />
          <span className="apple-blue">Productions</span>
        </h1>
        
        <p className="text-2xl md:text-3xl text-apple-gray-5 mb-12 font-light max-w-4xl mx-auto leading-relaxed">
          Cinematic storytelling that moves your brand forward.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-24">
          <button className="px-8 py-4 bg-apple-blue text-white font-medium rounded-xl hover:bg-apple-blue/90 transition-all duration-200 apple-shadow">
            Get Started
          </button>
          <button className="px-8 py-4 border border-apple-gray-2 text-apple-gray-6 font-medium rounded-xl hover:bg-apple-gray transition-all duration-200">
            Watch Our Work
          </button>
        </div>
      </div>
      
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
        <div className="w-1 h-8 bg-apple-gray-3 rounded-full animate-pulse"></div>
      </div>
    </section>
  );
};
