import { useState, useEffect } from 'react';
import { Sparkles, Users, Target, Zap } from 'lucide-react';

export const PalsHero = () => {
  const [animatedIn, setAnimatedIn] = useState(false);

  useEffect(() => {
    setAnimatedIn(true);
  }, []);

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-accent/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10" />
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-secondary rounded-full animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-accent rounded-full animate-pulse delay-2000" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className={`transition-all duration-1000 ${animatedIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Icon Grid */}
          <div className="flex justify-center items-center gap-4 mb-8">
            <div className="p-3 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 text-white">
              <Zap className="w-6 h-6" />
            </div>
            <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
              <Target className="w-6 h-6" />
            </div>
            <div className="p-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white">
              <Users className="w-6 h-6" />
            </div>
            <div className="p-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <Sparkles className="w-6 h-6" />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 tracking-tight">
            Meet the{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Palmer House Pals
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
            Your personal video production guides, each specialized in different solutions to help you 
            <span className="text-primary font-semibold"> find your perfect video journey</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Target className="w-5 h-5 text-primary" />
              <span>Personalized recommendations</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-border" />
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="w-5 h-5 text-secondary" />
              <span>Expert guidance</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-border" />
            <div className="flex items-center gap-2 text-muted-foreground">
              <Sparkles className="w-5 h-5 text-accent" />
              <span>Tailored solutions</span>
            </div>
          </div>

          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 max-w-3xl mx-auto">
            <h3 className="text-lg font-semibold text-foreground mb-3">
              How it works
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
              <div className="flex flex-col items-center text-center">
                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center mb-2">1</div>
                <span>Meet each Pal</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-8 h-8 rounded-full bg-secondary/20 text-secondary font-bold flex items-center justify-center mb-2">2</div>
                <span>Find your guide</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-8 h-8 rounded-full bg-accent/20 text-accent font-bold flex items-center justify-center mb-2">3</div>
                <span>Start your journey</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};