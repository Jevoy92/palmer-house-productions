import { LucideIcon } from 'lucide-react';
import { ChevronRight } from 'lucide-react';

interface ToolCardProps {
  name: string;
  description: string;
  category: string;
  icon: LucideIcon;
  lastUsed?: string;
  usageCount?: number;
  onClick: () => void;
}

export function ToolCard({
  name,
  description,
  category,
  icon: Icon,
  lastUsed,
  usageCount,
  onClick,
}: ToolCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left group border-b border-border hover:bg-muted/50 transition-colors"
    >
      <div className="flex items-center gap-4 p-4">
        {/* Icon */}
        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-background border-2 border-border flex items-center justify-center group-hover:border-primary transition-colors">
          <Icon className="w-6 h-6 text-foreground" />
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-base text-foreground group-hover:text-primary transition-colors">
              {name}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {description}
          </p>
        </div>
        
        {/* Metadata & Arrow */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="hidden sm:flex flex-col items-end gap-1 text-xs text-muted-foreground">
            {lastUsed ? (
              <span>{lastUsed}</span>
            ) : (
              <span>Not used yet</span>
            )}
            {usageCount !== undefined && usageCount > 0 && (
              <span className="font-medium">{usageCount}x</span>
            )}
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
      </div>
    </button>
  );
}
