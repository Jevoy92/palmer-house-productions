
import { Video, Film, Users, Megaphone } from 'lucide-react';

export const Services = () => {
  const services = [
    {
      icon: Video,
      title: "Video Content Systems",
      description: "Transform your expertise into scalable video assets—from SOPs and training videos to evergreen content that automates your business processes.",
      gradient: "gradient-cinematic-primary",
      features: ["30 Reels Library", "FAQ Video Series", "Process Documentation", "Evergreen YouTube Content"]
    },
    {
      icon: Film,
      title: "Strategic Video Planning", 
      description: "Comprehensive video strategy that aligns with your business goals. Get scripts, coaching, and blueprints for sustainable content growth.",
      gradient: "gradient-cinematic-secondary",
      features: ["Custom Script Bundle", "1-on-1 Strategy Coaching", "Video Content Calendar", "Performance Analytics Setup"]
    },
    {
      icon: Users,
      title: "Brand Story & Authority",
      description: "Build trust and credibility through authentic storytelling. Founder films, customer testimonials, and brand narratives that convert.",
      gradient: "gradient-cinematic-accent",
      features: ["Founder Documentary", "Customer Success Stories", "Brand Identity Videos", "Authority Content Series"]
    },
    {
      icon: Megaphone,
      title: "Launch & Visibility Systems",
      description: "Go-to-market video strategies that drive results. From product launches to visibility campaigns that scale your reach.",
      gradient: "gradient-cinematic-primary",
      features: ["7-Day Launch Sequence", "Visibility Engine Setup", "PR & Media Kit", "Campaign Performance Tracking"]
    }
  ];

  return (
    <section id="services" className="py-16 sm:py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block px-4 py-2.5 bg-primary/10 text-primary font-semibold text-sm mb-6 animate-fade-blur-in rounded-full">
            💼 Service Categories
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-black mb-6 text-foreground tracking-tight leading-tight px-2 animate-fade-blur-in" style={{animationDelay: '0.1s'}}>
            Our services help founders grow smarter,{' '}
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              move faster, and build with clarity
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto font-medium leading-relaxed px-2 animate-fade-blur-in" style={{animationDelay: '0.2s'}}>
            Strategic video production focused on business systems that reduce repetitive work and scale your operations efficiently.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div 
                key={index}
                className="group bg-card border border-border rounded-xl p-6 sm:p-8 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 animate-fade-blur-in"
                style={{animationDelay: `${0.3 + index * 0.1}s`}}
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent size={28} className="text-primary-foreground sm:w-8 sm:h-8" />
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-bold mb-4 text-foreground leading-tight">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-base sm:text-lg font-medium mb-4">
                  {service.description}
                </p>
                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm text-muted-foreground/80">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
