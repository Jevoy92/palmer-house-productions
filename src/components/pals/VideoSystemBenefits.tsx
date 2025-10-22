import { LucideIcon } from 'lucide-react';

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface VideoSystemBenefitsProps {
  title?: string;
  subtitle?: string;
  benefits: Benefit[];
}

export const VideoSystemBenefits = ({ 
  title = "What You Get",
  subtitle = "Not just videos. A complete system.",
  benefits 
}: VideoSystemBenefitsProps) => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-xl text-muted-foreground">{subtitle}</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div 
                key={index}
                className="group text-center"
              >
                <div className="inline-flex w-16 h-16 rounded-2xl bg-primary/10 items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
