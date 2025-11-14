import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Video, User, Sparkles, Maximize, MessageCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { ToolCard } from './ToolCard';

const TOOLS = [
  {
    id: 'series-builder',
    name: 'Video Series Builder',
    description: 'Turn one idea into a complete content system with AI-powered planning',
    category: 'VIDEO TOOLS',
    icon: Video,
    gradient: 'bg-gradient-to-br from-pal-purple to-pal-purple/70',
  },
  {
    id: 'persona-generator',
    name: 'Persona Generator',
    description: 'Define your ideal audience and brand voice for targeted content',
    category: 'AI ASSISTANT',
    icon: User,
    gradient: 'bg-gradient-to-br from-pal-blue to-pal-blue/70',
  },
  {
    id: 'production-assistant',
    name: 'Production Assistant',
    description: 'Streamline your pre-production workflow with automated planning',
    category: 'PRODUCTION',
    icon: Sparkles,
    gradient: 'bg-gradient-to-br from-pal-green to-pal-green/70',
  },
  {
    id: 'content-maximizer',
    name: 'Content Maximizer',
    description: 'Repurpose content across all platforms to maximize reach',
    category: 'MARKETING',
    icon: Maximize,
    gradient: 'bg-gradient-to-br from-pal-orange to-pal-orange/70',
  },
  {
    id: 'engagement-responder',
    name: 'Engagement Responder',
    description: 'Automate community engagement with AI-powered responses',
    category: 'SOCIAL',
    icon: MessageCircle,
    gradient: 'bg-gradient-to-br from-pal-purple to-pal-blue',
  },
];

export function ContinueCreating() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [toolUsage, setToolUsage] = useState<Record<string, { lastUsed: string; count: number }>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchUsage = async () => {
      const { data } = await supabase
        .from('credit_transactions')
        .select('tool_used, created_at')
        .eq('user_id', user.id)
        .eq('transaction_type', 'usage')
        .order('created_at', { ascending: false });

      const usage: Record<string, { lastUsed: string; count: number }> = {};
      
      data?.forEach((transaction) => {
        const toolId = transaction.tool_used || '';
        if (!usage[toolId]) {
          usage[toolId] = {
            lastUsed: transaction.created_at,
            count: 1,
          };
        } else {
          usage[toolId].count++;
        }
      });

      setToolUsage(usage);
      setLoading(false);
    };

    fetchUsage();
  }, [user]);

  const getLastUsedText = (lastUsed?: string) => {
    if (!lastUsed) return undefined;
    
    const date = new Date(lastUsed);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    return `${Math.floor(diffDays / 30)}mo ago`;
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TOOLS.map((tool) => (
          <div key={tool.id} className="h-64 bg-muted rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div>
      {/* Mobile: Horizontal Scroll */}
      <div className="md:hidden overflow-x-auto -mx-6 px-6 pb-2">
        <div className="flex gap-4" style={{ width: 'max-content' }}>
          {TOOLS.map((tool) => {
            const usage = toolUsage[tool.id];
            return (
              <div key={tool.id} style={{ width: '280px' }}>
                <ToolCard
                  {...tool}
                  lastUsed={getLastUsedText(usage?.lastUsed)}
                  usageCount={usage?.count}
                  onClick={() => navigate(`/tools/${tool.id}`)}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Desktop: Grid */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
        {TOOLS.map((tool) => {
          const usage = toolUsage[tool.id];
          return (
            <ToolCard
              key={tool.id}
              {...tool}
              lastUsed={getLastUsedText(usage?.lastUsed)}
              usageCount={usage?.count}
              onClick={() => navigate(`/tools/${tool.id}`)}
            />
          );
        })}
      </div>
    </div>
  );
}
