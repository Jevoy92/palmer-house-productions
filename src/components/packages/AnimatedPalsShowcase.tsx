import { OptimizedImage } from "@/components/performance/OptimizedImage";
import animatedPalsImage from "@/assets/pals/animated-pals-showcase.png";

export const AnimatedPalsShowcase = () => {
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 sm:p-12 lg:p-16 video-shadow-xl mb-12">
      <div className="text-center">
        <div className="inline-block px-6 py-3 bg-pal-green text-white font-bold text-lg mb-8 rounded-full video-shadow">
          🎬 Meet Your Content Creation Team
        </div>
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-black mb-6 text-corporate-dark tracking-tight">
          Choose Your <span className="text-pal-purple">Perfect Pal</span>
        </h2>
        <p className="text-base md:text-lg xl:text-xl text-corporate-gray mb-12 max-w-4xl mx-auto font-medium">
          Each Pal specializes in different aspects of video content creation. Explore our four specialized service categories below.
        </p>
        
        {/* Animated Showcase */}
        <div className="max-w-4xl mx-auto mb-8">
          <OptimizedImage
            src={animatedPalsImage}
            alt="Animated 3D showcase of Palmer House Productions' four content creation Pals - Reel Pal, System Pal, Evergreen Pal, and Spotlight Pal"
            className="w-full h-auto rounded-2xl video-shadow-lg"
            loading="eager"
            priority
          />
        </div>
        
        {/* Pal Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div className="text-center p-4 rounded-xl bg-pal-orange/10 hover:bg-pal-orange/20 transition-all duration-300">
            <div className="text-2xl mb-2">📱</div>
            <h3 className="font-bold text-pal-orange text-sm md:text-base">Reel Pal</h3>
            <p className="text-xs text-corporate-gray mt-1">Social Content</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-pal-purple/10 hover:bg-pal-purple/20 transition-all duration-300">
            <div className="text-2xl mb-2">⚙️</div>
            <h3 className="font-bold text-pal-purple text-sm md:text-base">System Pal</h3>
            <p className="text-xs text-corporate-gray mt-1">Training & Systems</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-pal-green/10 hover:bg-pal-green/20 transition-all duration-300">
            <div className="text-2xl mb-2">🌱</div>
            <h3 className="font-bold text-pal-green text-sm md:text-base">Evergreen Pal</h3>
            <p className="text-xs text-corporate-gray mt-1">Authority Building</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-pal-blue/10 hover:bg-pal-blue/20 transition-all duration-300">
            <div className="text-2xl mb-2">🎬</div>
            <h3 className="font-bold text-pal-blue text-sm md:text-base">Spotlight Pal</h3>
            <p className="text-xs text-corporate-gray mt-1">Premium Content</p>
          </div>
        </div>
      </div>
    </div>
  );
};