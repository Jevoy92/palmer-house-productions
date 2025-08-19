import { CheckCircle, Users, Video, Rocket } from 'lucide-react';

export const ProcessOverview = () => {
  const steps = [
    {
      number: "01",
      title: "Discovery & Strategy",
      description: "We dive deep into your business goals, target audience, and current challenges to create a custom video strategy that aligns with your objectives.",
      icon: Users,
      gradient: "gradient-social-1",
      deliverables: ["Strategy Blueprint", "Content Calendar", "Script Outlines", "Production Timeline"]
    },
    {
      number: "02", 
      title: "Pre-Production Planning",
      description: "Detailed planning ensures every shot serves a purpose. We handle scripting, storyboarding, location scouting, and technical preparation.",
      icon: CheckCircle,
      gradient: "gradient-social-2",
      deliverables: ["Final Scripts", "Shot Lists", "Location Plans", "Equipment Setup"]
    },
    {
      number: "03",
      title: "Production & Filming",
      description: "Professional filming with cinematic quality. Our team handles everything from lighting to audio, ensuring your brand looks exceptional.",
      icon: Video,
      gradient: "gradient-social-3",
      deliverables: ["Raw Footage", "B-Roll Content", "Audio Recording", "Behind-the-Scenes"]
    },
    {
      number: "04",
      title: "Post-Production & Delivery",
      description: "Expert editing, color grading, and sound design bring your vision to life. We deliver optimized videos for all your marketing channels.",
      icon: Rocket,
      gradient: "gradient-social-4",
      deliverables: ["Final Videos", "Multiple Formats", "Thumbnail Options", "Usage Guidelines"]
    }
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-primary/10 text-primary font-semibold text-sm mb-6 rounded-full">
            ⚡ Our Process
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black mb-6 text-foreground tracking-tight">
            How We Turn Your Vision Into 
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"> Powerful Video</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-medium">
            Our proven 4-step process ensures every project delivers exceptional results while staying on time and on budget.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div 
                key={index}
                className="group bg-card border border-border rounded-2xl p-8 hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
              >
                <div className="flex items-start gap-6 mb-6">
                  <div className="flex-shrink-0">
                    <div className="text-6xl font-black text-muted-foreground/20 leading-none">
                      {step.number}
                    </div>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent size={32} className="text-primary-foreground" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-display font-bold mb-4 text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6 text-lg">
                  {step.description}
                </p>

                <div className="space-y-3">
                  <h4 className="font-semibold text-muted-foreground/90 text-sm uppercase tracking-wide">
                    Key Deliverables
                  </h4>
                  {step.deliverables.map((deliverable, deliverableIndex) => (
                    <div key={deliverableIndex} className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                      <span className="text-muted-foreground/80 font-medium">{deliverable}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <div className="bg-card border border-border rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to Transform Your Business with Video?
            </h3>
            <p className="text-muted-foreground text-lg mb-6">
              Our process has helped 200+ businesses create video content that drives real results. Let's discuss your project.
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-bold text-lg rounded-xl hover:scale-105 transition-all duration-300">
              Start Your Project
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};