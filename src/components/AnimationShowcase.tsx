import { AnimatedButton } from '@/components/ui/animated-button';
import { AnimatedCard } from '@/components/ui/animated-card';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';
import { EnhancedLink } from '@/components/ui/enhanced-link';

export const AnimationShowcase = () => {
  return (
    <section className="section-padding bg-video-white">
      <div className="max-w-7xl mx-auto container-padding">
        <header className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-corporate-dark mb-4">
            Animation System Demo
          </h2>
          <p className="text-lg text-corporate-gray max-w-3xl mx-auto">
            Experience our standardized animation system with smooth, professional interactions.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-12">
          {/* Button Variations */}
          <AnimatedCard variant="float" className="bg-video-white video-shadow rounded-2xl p-8">
            <h3 className="text-xl font-semibold mb-6 text-corporate-dark">Button Animations</h3>
            <div className="space-y-4">
              <AnimatedButton 
                variant="glow" 
                className="w-full bg-social-orange text-white py-3 px-6 rounded-lg font-medium"
              >
                Glow Effect
              </AnimatedButton>
              <AnimatedButton 
                variant="lift" 
                className="w-full bg-social-blue text-white py-3 px-6 rounded-lg font-medium"
              >
                Lift Effect
              </AnimatedButton>
              <AnimatedButton 
                variant="pulse" 
                className="w-full bg-social-purple text-white py-3 px-6 rounded-lg font-medium"
              >
                Pulse Effect
              </AnimatedButton>
            </div>
          </AnimatedCard>

          {/* Link Variations */}
          <AnimatedCard variant="lift" className="bg-video-white video-shadow rounded-2xl p-8">
            <h3 className="text-xl font-semibold mb-6 text-corporate-dark">Link Animations</h3>
            <div className="space-y-4">
              <EnhancedLink 
                to="#" 
                variant="underline" 
                className="block text-social-orange font-medium text-lg"
              >
                Underline Animation
              </EnhancedLink>
              <EnhancedLink 
                to="#" 
                variant="button" 
                className="block bg-social-cyan text-white py-2 px-4 rounded-md font-medium"
              >
                Button Link
              </EnhancedLink>
              <EnhancedLink 
                to="#" 
                variant="card" 
                className="block bg-social-pink/10 text-social-pink py-3 px-4 rounded-lg font-medium"
              >
                Card Link
              </EnhancedLink>
            </div>
          </AnimatedCard>

          {/* Loading States */}
          <AnimatedCard variant="glow" className="bg-video-white video-shadow rounded-2xl p-8">
            <h3 className="text-xl font-semibold mb-6 text-corporate-dark">Loading States</h3>
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-corporate-gray mb-3">Text Skeleton</p>
                <LoadingSkeleton variant="text" count={3} />
              </div>
              <div>
                <p className="text-sm font-medium text-corporate-gray mb-3">Circular Skeleton</p>
                <div className="flex gap-3">
                  <LoadingSkeleton variant="circular" className="w-12 h-12" />
                  <LoadingSkeleton variant="circular" className="w-8 h-8" />
                  <LoadingSkeleton variant="circular" className="w-6 h-6" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-corporate-gray mb-3">Loading Spinner</p>
                <div className="loading-spinner" />
              </div>
            </div>
          </AnimatedCard>

          {/* Card Variations */}
          <AnimatedCard variant="float" className="bg-gradient-social-1 text-white rounded-2xl p-8">
            <h3 className="text-xl font-semibold mb-4">Float Card</h3>
            <p className="opacity-90">Hover to see the floating animation effect with shadow enhancement.</p>
          </AnimatedCard>

          <AnimatedCard variant="pulse" className="bg-gradient-social-2 text-white rounded-2xl p-8">
            <h3 className="text-xl font-semibold mb-4">Pulse Card</h3>
            <p className="opacity-90">This card has a subtle pulsing animation that draws attention.</p>
          </AnimatedCard>

          <AnimatedCard variant="glow" className="bg-gradient-social-3 text-white rounded-2xl p-8">
            <h3 className="text-xl font-semibold mb-4">Glow Card</h3>
            <p className="opacity-90">Hover to see the glowing shadow effect that creates depth.</p>
          </AnimatedCard>
        </div>

        {/* Usage Examples */}
        <div className="mt-16 bg-cinematic-dark/5 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-corporate-dark mb-6">Quick Usage Guide</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-corporate-dark mb-3">CSS Classes</h4>
              <ul className="space-y-2 text-corporate-gray">
                <li><code className="bg-corporate-light px-2 py-1 rounded text-xs">hover-lift</code> - Lifts element on hover</li>
                <li><code className="bg-corporate-light px-2 py-1 rounded text-xs">hover-glow</code> - Adds glow shadow on hover</li>
                <li><code className="bg-corporate-light px-2 py-1 rounded text-xs">click-feedback</code> - Scale down on click</li>
                <li><code className="bg-corporate-light px-2 py-1 rounded text-xs">card-float</code> - Card floating animation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-corporate-dark mb-3">Components</h4>
              <ul className="space-y-2 text-corporate-gray">
                <li><code className="bg-corporate-light px-2 py-1 rounded text-xs">AnimatedButton</code> - Button with ripple effects</li>
                <li><code className="bg-corporate-light px-2 py-1 rounded text-xs">AnimatedCard</code> - Card with hover animations</li>
                <li><code className="bg-corporate-light px-2 py-1 rounded text-xs">EnhancedLink</code> - Links with advanced interactions</li>
                <li><code className="bg-corporate-light px-2 py-1 rounded text-xs">LoadingSkeleton</code> - Animated loading states</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};