
export const VideoUseCasesHero = () => {
  return (
    <section className="py-16 sm:py-24 lg:py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Hero Section - White Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 sm:p-12 lg:p-16 video-shadow-xl text-center">
          <div className="inline-block px-6 py-3 bg-pal-purple text-white font-bold text-lg mb-8 rounded-full video-shadow">
            📍 Seattle Business Case Studies
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black mb-8 text-corporate-dark tracking-tight">
            Real Seattle <span className="text-pal-purple">Business Stories</span>
          </h1>
          <p className="text-lg xl:text-xl text-corporate-gray max-w-4xl mx-auto font-medium leading-relaxed">
            See how local businesses transform their operations with 
            <br />
            <span className="text-pal-orange font-bold">strategic video content systems.</span>
          </p>
        </div>
      </div>
    </section>
  );
};
