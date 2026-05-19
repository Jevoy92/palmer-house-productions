import { LucideIcon } from 'lucide-react';

interface PainPoint {
  icon: LucideIcon;
  problem: string;
  impact: string;
}

interface PainPointsSectionProps {
  title?: string;
  subtitle?: string;
  painPoints: PainPoint[];
}

export const PainPointsSection = ({ 
  title = "Problems We Solve",
  subtitle = "Sound familiar? Let's fix it.",
  painPoints 
}: PainPointsSectionProps) => {
  return (
    <section className="py-20 bg-gradient-to-b from-background via-primary/5 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-xl text-muted-foreground">{subtitle}</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {painPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <div 
                key={index}
                className="group p-6 rounded-2xl bg-white/95 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center group-hover:bg-destructive/20 transition-colors">
                    <Icon className="w-6 h-6 text-destructive" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{point.problem}</h3>
                    <p className="text-sm text-muted-foreground">{point.impact}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
