import { useEffect, useState } from 'react';
import { Calendar, TrendingUp, Zap, Target } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Progress } from '@/components/ui/progress';
import { getUserTier, getProgressToNextTier, ACHIEVEMENT_TIERS } from '@/lib/gamification';

interface UserStats {
  totalCreditsUsed: number;
  toolsUsedCount: number;
  favoriteToolName: string;
  favoriteToolCount: number;
  memberSince: string;
}

export function MemberProfile() {
  const { user } = useAuth();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchStats = async () => {
      // Fetch total credits used
      const { data: creditData } = await supabase
        .from('credit_transactions')
        .select('amount')
        .eq('user_id', user.id)
        .eq('transaction_type', 'usage');

      const totalCreditsUsed = creditData?.reduce((sum, t) => sum + Math.abs(t.amount), 0) || 0;

      // Fetch tool usage stats
      const { data: toolData } = await supabase
        .from('credit_transactions')
        .select('tool_used')
        .eq('user_id', user.id)
        .eq('transaction_type', 'usage')
        .not('tool_used', 'is', null);

      const toolCounts = toolData?.reduce((acc, t) => {
        const tool = t.tool_used || 'Unknown';
        acc[tool] = (acc[tool] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};

      const toolsUsedCount = Object.keys(toolCounts).length;
      const [favoriteToolName, favoriteToolCount] = Object.entries(toolCounts).sort(([, a], [, b]) => b - a)[0] || ['None', 0];

      // Fetch member since date
      const { data: profileData } = await supabase
        .from('profiles')
        .select('created_at')
        .eq('id', user.id)
        .single();

      setStats({
        totalCreditsUsed,
        toolsUsedCount,
        favoriteToolName,
        favoriteToolCount,
        memberSince: profileData?.created_at || new Date().toISOString(),
      });
      setLoading(false);
    };

    fetchStats();
  }, [user]);

  if (loading || !stats) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 bg-pal-purple/10 rounded-full border border-pal-purple/20 animate-pulse">
        <span className="text-sm font-medium text-pal-purple">Loading...</span>
      </div>
    );
  }

  const tier = getUserTier(stats.totalCreditsUsed);
  const progress = getProgressToNextTier(stats.totalCreditsUsed);
  const TierIcon = tier.icon;
  const memberDate = new Date(stats.memberSince);
  const daysSince = Math.floor((Date.now() - memberDate.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 px-3 py-1.5 bg-pal-purple/10 rounded-full border border-pal-purple/20 hover:bg-pal-purple/20 transition-all"
        >
          <TierIcon className="w-4 h-4 text-pal-purple" />
          <span className="text-sm font-medium text-pal-purple">Member</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          {/* Achievement Tier */}
          <div className="text-center space-y-2">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${tier.bgColor}`}>
              <TierIcon className={`w-8 h-8 ${tier.color}`} />
            </div>
            <div>
              <h4 className="font-semibold text-lg text-foreground">{tier.name}</h4>
              <p className="text-sm text-muted-foreground">{tier.description}</p>
            </div>
          </div>

          {/* Progress to Next Tier */}
          {progress.percentage < 100 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress to Next Tier</span>
                <span className="font-medium text-foreground">
                  {progress.current}/{progress.target}
                </span>
              </div>
              <Progress value={progress.percentage} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {progress.target - progress.current} more credits to unlock {ACHIEVEMENT_TIERS[ACHIEVEMENT_TIERS.indexOf(tier) + 1]?.name}
              </p>
            </div>
          )}

          {/* Member Stats */}
          <div className="space-y-3 pt-2 border-t">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted">
                <Calendar className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Member Since</p>
                <p className="text-sm font-medium text-foreground">
                  {memberDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted">
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Days Active</p>
                <p className="text-sm font-medium text-foreground">{daysSince} days</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted">
                <Zap className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Tools Mastered</p>
                <p className="text-sm font-medium text-foreground">{stats.toolsUsedCount} tools</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted">
                <Target className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Favorite Tool</p>
                <p className="text-sm font-medium text-foreground">
                  {stats.favoriteToolName} ({stats.favoriteToolCount}x)
                </p>
              </div>
            </div>
          </div>

          {/* Motivational Message */}
          <div className="pt-2 border-t">
            <p className="text-xs text-center text-muted-foreground italic">
              Keep creating amazing content! 🚀
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
