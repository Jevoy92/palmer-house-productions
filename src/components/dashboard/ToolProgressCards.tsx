import { useEffect, useState } from 'react';
import { Video, User, Sparkles, Maximize } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';

interface ToolUsage {
  toolName: string;
  lastUsed: string | null;
  usageCount: number;
}

const TOOL_CONFIG = [
  { id: 'video-series-builder', name: 'Series Builder', icon: Video, color: 'text-pal-purple' },
  { id: 'persona-generator', name: 'Persona Generator', icon: User, color: 'text-pal-blue' },
  { id: 'production-assistant', name: 'Production Assistant', icon: Sparkles, color: 'text-pal-green' },
  { id: 'content-maximizer', name: 'Content Maximizer', icon: Maximize, color: 'text-pal-orange' },
];

export function ToolProgressCards() {
  const user: { id: string; email?: string; user_metadata?: any } | null = null;
  const [toolUsage, setToolUsage] = useState<Record<string, ToolUsage>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchToolUsage = async () => {
      const { data } = await supabase
        .from('credit_transactions')
        .select('tool_used, created_at')
        .eq('user_id', user.id)
        .eq('transaction_type', 'usage')
        .order('created_at', { ascending: false });

      const usage: Record<string, ToolUsage> = {};
      
      data?.forEach((transaction) => {
        const toolName = transaction.tool_used || 'Unknown';
        if (!usage[toolName]) {
          usage[toolName] = {
            toolName,
            lastUsed: transaction.created_at,
            usageCount: 1,
          };
        } else {
          usage[toolName].usageCount++;
        }
      });

      setToolUsage(usage);
      setLoading(false);
    };

    fetchToolUsage();
  }, [user]);

  const getLastUsedText = (lastUsed: string | null) => {
    if (!lastUsed) return 'Not used yet';
    
    const date = new Date(lastUsed);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {TOOL_CONFIG.map((tool) => (
          <Card key={tool.id} className="p-4 animate-pulse">
            <div className="h-16 bg-muted rounded" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {TOOL_CONFIG.map((tool) => {
        const Icon = tool.icon;
        const usage = toolUsage[tool.id] || { lastUsed: null, usageCount: 0 };
        
        return (
          <Card key={tool.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className={`flex items-center justify-center w-10 h-10 rounded-lg bg-muted`}>
                <Icon className={`w-5 h-5 ${tool.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground truncate">{tool.name}</p>
                <p className="text-xs text-muted-foreground">
                  {usage.usageCount > 0 ? `${usage.usageCount}x used` : 'Not used'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {getLastUsedText(usage.lastUsed)}
                </p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
