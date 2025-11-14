import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function HeroBanner() {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-pal-purple via-pal-purple/90 to-pal-blue p-6 md:p-8">
      {/* Decorative grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 rounded-full mb-4">
          <Sparkles className="w-4 h-4 text-white" />
          <span className="text-sm font-medium text-white">Palmer House Pals Content OS</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
          Automate Your Content Creation with AI-Powered Tools
        </h1>

        <p className="text-base text-white/90 mb-5 leading-relaxed">
          Build video series, generate personas, and maximize content reach—all powered by your favorite Pals
        </p>

        <Button
          size="lg"
          onClick={() => navigate('/tools/video-series-builder')}
          className="bg-white text-pal-purple hover:bg-white/90 shadow-lg hover:shadow-xl transition-all"
        >
          Start Creating
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
