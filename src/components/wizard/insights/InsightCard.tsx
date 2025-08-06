import { Card, CardContent } from "@/components/ui/card";
import { WizardInsight } from "../utils/wizardScoring";
import { CheckCircle, Lightbulb, AlertTriangle, TrendingUp } from "lucide-react";

interface InsightCardProps {
  insight: WizardInsight;
  isAnimated?: boolean;
}

export const InsightCard = ({ insight, isAnimated = false }: InsightCardProps) => {
  const getIcon = (category: string) => {
    switch (category) {
      case 'quick-win': return <CheckCircle className="w-5 h-5" />;
      case 'strategy': return <Lightbulb className="w-5 h-5" />;
      case 'warning': return <AlertTriangle className="w-5 h-5" />;
      case 'opportunity': return <TrendingUp className="w-5 h-5" />;
      default: return <Lightbulb className="w-5 h-5" />;
    }
  };

  const getColorScheme = (category: string) => {
    switch (category) {
      case 'quick-win': return 'text-social-green border-social-green/20 bg-social-green/5';
      case 'strategy': return 'text-social-purple border-social-purple/20 bg-social-purple/5';
      case 'warning': return 'text-social-orange border-social-orange/20 bg-social-orange/5';
      case 'opportunity': return 'text-social-cyan border-social-cyan/20 bg-social-cyan/5';
      default: return 'text-corporate-dark border-corporate-light bg-video-white';
    }
  };

  return (
    <Card className={`
      border video-shadow-sm hover:video-shadow transition-all duration-300
      ${getColorScheme(insight.category)}
      ${isAnimated ? 'animate-fade-in' : ''}
    `}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3 mb-3">
          <div className={`flex-shrink-0 ${insight.category === 'warning' ? 'text-social-orange' : 'text-current'}`}>
            {getIcon(insight.category)}
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-corporate-dark mb-1">{insight.title}</h4>
            <p className="text-corporate-gray text-sm leading-relaxed">
              {insight.description}
            </p>
          </div>
        </div>
        
        {insight.actionItems.length > 0 && (
          <div className="mt-3 pt-3 border-t border-current/10">
            <h5 className="font-semibold text-xs text-corporate-dark mb-2">Action Items:</h5>
            <ul className="space-y-1">
              {insight.actionItems.map((item, index) => (
                <li key={index} className="text-xs text-corporate-gray flex items-start gap-2">
                  <span className="text-current flex-shrink-0 mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};