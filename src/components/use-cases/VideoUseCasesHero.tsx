
export const VideoUseCasesHero = () => {
  return (
    <section className="py-[clamp(4rem,12vw,8rem)] relative z-10">
      <div className="max-w-7xl mx-auto px-[clamp(1rem,4vw,2rem)] relative z-10">
        {/* Hero Section - White Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-[clamp(2rem,8vw,4rem)] video-shadow-xl text-center">
          <div className="inline-block px-6 py-3 bg-pal-purple text-white font-bold text-[clamp(1rem,2.5vw,1.125rem)] mb-[clamp(2rem,5vw,2rem)] rounded-full video-shadow">
            📍 Seattle Business Case Studies
          </div>
          <h1 className="text-[clamp(2rem,7vw,4rem)] font-display font-black mb-[clamp(2rem,5vw,2rem)] text-corporate-dark tracking-tight">
            Real Seattle <span className="text-pal-purple">Business Stories</span>
          </h1>
          <p className="text-[clamp(1.125rem,3vw,1.25rem)] text-corporate-gray max-w-4xl mx-auto font-medium leading-relaxed">
            See how local businesses transform their operations with 
            <br />
            <span className="text-pal-orange font-bold">strategic video content systems.</span>
          </p>
        </div>
      </div>
    </section>
  );
};
