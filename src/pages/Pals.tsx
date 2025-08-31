import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { 
  Smartphone, 
  Settings, 
  Sprout, 
  Star,
  Video,
  Wrench,
  PlayCircle,
  TrendingUp,
  GraduationCap,
  UserPlus,
  HelpCircle,
  Network,
  Youtube,
  BookOpen,
  Calendar,
  Crown,
  Film,
  Music,
  Trophy,
  Sparkles,
  Heart,
  Brain,
  Leaf,
  ArrowRight,
  Zap,
  Target,
  Lightbulb
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MetaTags } from "@/components/seo/MetaTags";

const Pals = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedPal, setSelectedPal] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const pals = [
    {
      id: 'reel',
      name: 'Reel Pal',
      tagline: "Let's make content that connects!",
      description: "Your go-to for authentic, engaging short-form content that makes people stop scrolling.",
      image: "/lovable-uploads/5d98b294-ca3c-40a4-8b87-6dae295d4294.png",
      color: 'social-orange',
      icon: Smartphone,
      features: ['Short-form Social Content', 'DIY Creation Kits', 'Starter Sessions', 'Platform Optimization'],
      route: '/reel-pal',
      position: { x: -20, y: 0 }
    },
    {
      id: 'system',
      name: 'System Pal',
      tagline: "Let's streamline your systems!",
      description: "The organized one who creates video systems that work like clockwork for your business.",
      image: "/lovable-uploads/1d3c7a2a-e5cb-4900-9b76-9eadb6620973.png",
      color: 'social-purple',
      icon: Settings,
      features: ['Training Video Systems', 'Onboarding Sequences', 'FAQ Video Libraries', 'Process Documentation'],
      route: '/system-pal',
      position: { x: 20, y: -10 }
    },
    {
      id: 'evergreen',
      name: 'Evergreen Pal',
      tagline: "Let's grow your authority!",
      description: "All about the long game - building your reputation and authority over time.",
      image: "/lovable-uploads/19c6453a-bac9-4e63-999a-5d7f6410b852.png",
      color: 'social-green',
      icon: Sprout,
      features: ['YouTube Development', 'Educational Series', 'Monthly Content Plans', 'Authority Building'],
      route: '/evergreen-pal',
      position: { x: -15, y: 15 }
    },
    {
      id: 'spotlight',
      name: 'Spotlight Pal',
      tagline: "Let's create cinematic magic!",
      description: "Your creative visionary for high-end, cinematic content that tells powerful stories.",
      image: "/lovable-uploads/04881cac-8132-4f58-b31d-07f97e89beaf.png",
      color: 'social-pink',
      icon: Star,
      features: ['Brand Films', 'Music Videos', 'Commercial Content', 'Cinematic Storytelling'],
      route: '/spotlight-pal',
      position: { x: 25, y: 5 }
    }
  ];

  return (
    <>
      <MetaTags 
        title="Meet the Palmer House Pals - Your Video Production Guides"
        description="Meet your specialized video production guides. Each Pal has unique superpowers to help you create the perfect content for your brand's journey."
      />
      
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10 overflow-hidden">
        <Navigation />

        {/* 3D Hero Section */}
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center perspective-1000">
          {/* Floating Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-primary/20 rounded-full animate-float-random"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${3 + Math.random() * 4}s`
                }}
              />
            ))}
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20">
              <h1 
                className="text-7xl md:text-9xl font-black mb-8 text-foreground transform-gpu"
                style={{
                  transform: `translateY(${scrollY * 0.2}px)`
                }}
              >
                Palmer House
                <span className="block text-transparent bg-gradient-to-r from-social-purple via-social-pink to-social-orange bg-clip-text">
                  Pals
                </span>
              </h1>
              <p className="text-2xl md:text-3xl mb-16 max-w-4xl mx-auto text-muted-foreground/80 font-light">
                Four unique personalities, infinite creative possibilities
              </p>
            </div>

            {/* 3D Floating Character Cards */}
            <div className="relative h-96 transform-gpu preserve-3d">
              {pals.map((pal, index) => {
                const Icon = pal.icon;
                const isSelected = selectedPal === pal.id;
                const mouseInfluence = {
                  x: (mousePosition.x - window.innerWidth / 2) * 0.01,
                  y: (mousePosition.y - window.innerHeight / 2) * 0.01
                };

                return (
                  <div
                    key={pal.id}
                    className={`absolute w-72 h-80 cursor-pointer transition-all duration-700 transform-gpu preserve-3d ${
                      isSelected ? 'z-30 scale-110' : 'z-10'
                    }`}
                    style={{
                      left: `${25 + (index * 15) + pal.position.x}%`,
                      top: `${20 + pal.position.y}%`,
                      transform: `
                        translateX(${mouseInfluence.x * (index + 1)}px)
                        translateY(${mouseInfluence.y * (index + 1)}px)
                        rotateX(${mouseInfluence.y * 2}deg)
                        rotateY(${mouseInfluence.x * 2}deg)
                        translateZ(${isSelected ? 50 : 0}px)
                      `
                    }}
                    onMouseEnter={() => setSelectedPal(pal.id)}
                    onMouseLeave={() => setSelectedPal(null)}
                  >
                    {/* Card */}
                    <div className={`relative w-full h-full bg-card/90 backdrop-blur-md rounded-3xl shadow-2xl border border-border/20 overflow-hidden transform-gpu transition-all duration-500 ${
                      isSelected ? 'shadow-3xl' : ''
                    }`}>
                      {/* Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br from-${pal.color}/20 to-transparent opacity-${isSelected ? '100' : '40'} transition-opacity duration-500`} />
                      
                      {/* Character Image */}
                      <div className="relative z-10 p-8 text-center">
                        <div className={`w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-${pal.color} shadow-lg transform transition-all duration-500 ${
                          isSelected ? 'scale-110 rotate-3' : ''
                        }`}>
                          <img 
                            src={pal.image} 
                            alt={pal.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className={`w-12 h-12 mx-auto mb-4 bg-${pal.color}/20 rounded-full flex items-center justify-center transform transition-all duration-500 ${
                          isSelected ? 'scale-110' : ''
                        }`}>
                          <Icon className={`w-6 h-6 text-${pal.color}`} />
                        </div>
                        
                        <h3 className="text-2xl font-bold text-foreground mb-2">{pal.name}</h3>
                        <p className="text-sm text-muted-foreground opacity-80">{pal.description}</p>
                      </div>

                      {/* Hover Details */}
                      <div className={`absolute inset-0 bg-card/95 backdrop-blur-md transition-all duration-500 ${
                        isSelected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
                      }`}>
                        <div className="p-8 h-full flex flex-col justify-center">
                          <h4 className="text-xl font-bold text-foreground mb-4 text-center">{pal.tagline}</h4>
                          <div className="space-y-2 mb-6">
                            {pal.features.slice(0, 3).map((feature, idx) => (
                              <div key={idx} className="flex items-center space-x-2">
                                <div className={`w-2 h-2 bg-${pal.color} rounded-full`} />
                                <span className="text-sm text-muted-foreground">{feature}</span>
                              </div>
                            ))}
                          </div>
                          <Button asChild className={`w-full bg-${pal.color} hover:bg-${pal.color}/90 text-white`}>
                            <Link to={pal.route} className="flex items-center justify-center space-x-2">
                              <span>Meet {pal.name}</span>
                              <ArrowRight className="w-4 h-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Interactive Comparison Section */}
        <section className="py-32 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-7xl font-black text-foreground mb-8">
                Choose Your
                <span className="block text-transparent bg-gradient-to-r from-social-cyan to-social-blue bg-clip-text">
                  Adventure
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Each Pal brings their unique expertise to transform your content strategy
              </p>
            </div>

            {/* Floating Comparison Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
              {pals.map((pal, index) => {
                const Icon = pal.icon;
                const isEven = index % 2 === 0;
                
                return (
                  <div
                    key={pal.id}
                    className={`group relative transform-gpu transition-all duration-700 hover:scale-105 ${
                      isEven ? 'lg:translate-x-8' : 'lg:-translate-x-8'
                    }`}
                    style={{
                      animationDelay: `${index * 0.2}s`
                    }}
                  >
                    <div className="bg-card/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-border/20 hover:shadow-2xl transition-all duration-500 overflow-hidden relative">
                      {/* Gradient Background */}
                      <div className={`absolute inset-0 bg-gradient-to-br from-${pal.color}/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                      
                      {/* Content */}
                      <div className="relative z-10">
                        <div className="flex items-start space-x-6 mb-6">
                          <div className={`w-16 h-16 bg-${pal.color}/20 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className={`w-8 h-8 text-${pal.color}`} />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-foreground mb-2">{pal.name}</h3>
                            <p className="text-lg text-muted-foreground italic">"{pal.tagline}"</p>
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground mb-6 leading-relaxed">{pal.description}</p>
                        
                        <div className="grid grid-cols-2 gap-3 mb-8">
                          {pal.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center space-x-2">
                              <div className={`w-1.5 h-1.5 bg-${pal.color} rounded-full flex-shrink-0`} />
                              <span className="text-sm text-muted-foreground">{feature}</span>
                            </div>
                          ))}
                        </div>
                        
                        <Button asChild className={`w-full bg-${pal.color}/10 hover:bg-${pal.color}/20 text-${pal.color} border border-${pal.color}/20 group-hover:scale-105 transition-all duration-300`}>
                          <Link to={pal.route} className="flex items-center justify-center space-x-2">
                            <span>Explore {pal.name}</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              {[
                { icon: Zap, title: "Lightning Fast", value: "24hr", desc: "Turnaround Time" },
                { icon: Target, title: "Precision Focus", value: "100%", desc: "Custom Solutions" },
                { icon: Lightbulb, title: "Creative Spark", value: "∞", desc: "Possibilities" }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-8 bg-card/60 backdrop-blur-md rounded-2xl border border-border/20 hover:scale-105 transition-all duration-500 group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-4xl font-black text-foreground mb-2">{stat.value}</div>
                  <div className="text-lg font-semibold text-foreground mb-1">{stat.title}</div>
                  <div className="text-sm text-muted-foreground">{stat.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dynamic CTA Section */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-bold mb-8">
                <Sparkles className="w-4 h-4" />
                <span>Ready to Transform Your Content?</span>
              </div>
              
              <h2 className="text-6xl md:text-8xl font-black text-foreground mb-8">
                Your Perfect
                <span className="block text-transparent bg-gradient-to-r from-social-purple via-social-pink to-social-orange bg-clip-text">
                  Pal Awaits
                </span>
              </h2>
              
              <p className="text-2xl text-muted-foreground mb-16 max-w-4xl mx-auto leading-relaxed">
                Whether you're creating viral TikToks, building training systems, growing your YouTube presence, or crafting cinematic masterpieces - your specialized guide is ready to help.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button asChild size="xl" className="bg-gradient-to-r from-social-purple to-social-pink text-white hover:scale-105 transition-all duration-300 shadow-lg">
                  <Link to="/video-packages" className="flex items-center space-x-2">
                    <span>Start Your Journey</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                
                <Button asChild variant="outline" size="xl" className="border-2 hover:scale-105 transition-all duration-300">
                  <Link to="/contact" className="flex items-center space-x-2">
                    <Heart className="w-5 h-5" />
                    <span>Get Personal Guidance</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Pals;