import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ToolCardProps {
  name: string;
  description: string;
  category: string;
  icon: LucideIcon;
  lastUsed?: string;
  usageCount?: number;
  gradient: string;
  onClick: () => void;
}

export function ToolCard({
  name,
  description,
  category,
  icon: Icon,
  lastUsed,
  usageCount,
  gradient,
  onClick,
}: ToolCardProps) {
  return (
    <Card
      onClick={onClick}
      className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-pal-purple/20"
    >
      {/* Image/Gradient Header */}
      <div className={`relative h-40 ${gradient} flex items-center justify-center`}>
        <div className="absolute inset-0 bg-black/10" />
        <Icon className="w-16 h-16 text-white relative z-10 group-hover:scale-110 transition-transform" />
        
        {/* Category Badge */}
        <Badge className="absolute top-3 left-3 bg-white/90 text-foreground hover:bg-white">
          {category}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-lg group-hover:text-pal-purple transition-colors">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
        
        {/* Usage Info */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
          {lastUsed ? (
            <span>Last used: {lastUsed}</span>
          ) : (
            <span>Not used yet</span>
          )}
          {usageCount !== undefined && usageCount > 0 && (
            <span className="font-medium">{usageCount}x used</span>
          )}
        </div>
      </div>
    </Card>
  );
}
