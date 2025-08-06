
export const DiscoveryCallHero = () => {
  const handleBookCall = () => {
    window.open('https://calendly.com/palmerhouseproductions-info/discovery-call', '_blank');
  };

  return (
    <section className="pt-24 pb-16 bg-video-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 gradient-social-1 rounded-full opacity-20 float-animation"></div>
        <div className="absolute top-40 right-20 w-24 h-24 gradient-social-3 rounded-full opacity-30 float-animation" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-3 gradient-social-2 rounded-full text-white font-bold text-lg mb-8 video-shadow">
            🔍 Discovery Call
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-black mb-6 text-corporate-dark tracking-tight">
            Discovery <span className="text-gradient-1">Call</span>
          </h1>
          <p className="text-lg text-corporate-gray mb-8 max-w-3xl mx-auto font-medium">
            Free consultation to align your goals with the right video strategy.
          </p>
          <p className="text-base text-corporate-gray mb-8 max-w-2xl mx-auto">
            <span className="text-gradient-2 font-bold">15 minutes to clarity.</span>
          </p>
        </div>

        {/* Jevoy Intro Video Placeholder */}
        <div className="bg-white rounded-3xl p-8 video-shadow mb-16 max-w-4xl mx-auto">
          <div className="aspect-video bg-gradient-to-br from-social-purple to-social-pink rounded-2xl flex items-center justify-center mb-6">
            <div className="text-center text-white">
              <div className="text-6xl mb-4">🎬</div>
              <h3 className="text-2xl font-bold mb-2">Meet Jevoy</h3>
              <p className="text-lg opacity-90">Founder & Creative Director</p>
              <p className="text-sm opacity-75 mt-2">Explaining "The Glimpse" Process</p>
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-corporate-dark mb-4">
              "Every great video strategy starts with understanding your story."
            </h3>
            <p className="text-corporate-gray leading-relaxed">
              In this 3-minute intro, Jevoy explains how the Discovery Call process works, 
              what to expect, and how we'll map your perfect video journey together.
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleBookCall}
            className="px-6 py-4 gradient-social-1 text-white font-bold text-base rounded-xl hover:scale-105 transition-all duration-300 video-shadow-lg min-h-[44px]"
          >
            Book Discovery Call
          </button>
          <button
            onClick={() => {
              const quizElement = document.querySelector('#video-needs-quiz');
              if (quizElement) {
                quizElement.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="px-6 py-4 bg-video-white border-2 border-social-purple text-corporate-dark font-bold text-base rounded-xl hover:bg-social-purple hover:text-white transition-all duration-300 video-shadow min-h-[44px]"
          >
            Take Quiz
          </button>
        </div>
      </div>
    </section>
  );
};
