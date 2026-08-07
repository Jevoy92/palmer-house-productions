import { useEffect, useState } from 'react';
import { TrendingUp, Trophy, Flame } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ActivityChart } from './ActivityChart';
import { FavoritePalCard } from './FavoritePalCard';
import { getUserTier } from '@/lib/gamification';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import femaleReelPal from '@/assets/pals/female-reel-pal-circular-headshot.jpg';
import maleEvergreenPal from '@/assets/pals/male-evergreen-pal-circular-headshot.jpg';
import femaleSpotlightPal from '@/assets/pals/female-spotlight-pal-circular-3.jpg';
import femaleSystemPal from '@/assets/pals/female-system-pal-circular.jpg';

const PAL_AVATARS: Record<string, string> = {
  reel: femaleReelPal,
  evergreen: maleEvergreenPal,
  spotlight: femaleSpotlightPal,
  system: femaleSystemPal,
};

interface StatsData {
  totalCreditsUsed: number;
  toolsMastered: number;
  currentStreak: number;
  topTools: Array<{ name: string; count: number }>;
}

interface DashboardStatsProps {
  favoritePal?: string;
  onChangePal?: () => void;
}

export function DashboardStats({ favoritePal = 'reel', onChangePal }: DashboardStatsProps) {
  const user: { id: string; email?: string; user_metadata?: any } | null = null;
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchStats = async () => {
      // Fetch credits used
      const { data: creditData } = await supabase
        .from('credit_transactions')
        .select('amount, tool_used, created_at')
        .eq('user_id', user.id)
        .eq('transaction_type', 'usage');

      const totalCreditsUsed = creditData?.reduce((sum, t) => sum + Math.abs(t.amount), 0) || 0;

      // Count tools with 5+ uses
      const toolCounts: Record<string, number> = {};
      creditData?.forEach((t) => {
        if (t.tool_used) {
          toolCounts[t.tool_used] = (toolCounts[t.tool_used] || 0) + 1;
        }
      });

      const toolsMastered = Object.values(toolCounts).filter((count) => count >= 5).length;

      // Get top 3 tools
      const topTools = Object.entries(toolCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 3);

      // Calculate streak (simplified - consecutive days with activity)
      const activityDates = creditData?.map((t) => new Date(t.created_at)) || [];
      const uniqueDates = Array.from(new Set(activityDates.map(d => d.toDateString()))).map(d => new Date(d));
      uniqueDates.sort((a, b) => b.getTime() - a.getTime());
      
      let currentStreak = 0;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      for (let i = 0; i < uniqueDates.length; i++) {
        const checkDate = new Date(today);
        checkDate.setDate(checkDate.getDate() - i);
        const dateStr = checkDate.toDateString();
        
        if (uniqueDates.some(d => d.toDateString() === dateStr)) {
          currentStreak++;
        } else if (i > 0) {
          break;
        }
      }

      setStats({
        totalCreditsUsed,
        toolsMastered,
        currentStreak,
        topTools,
      });
      setLoading(false);
    };

    fetchStats();
  }, [user]);

  if (loading || !stats) {
    return (
      <div className="space-y-6 animate-pulse">
        <Card>
          <CardHeader className="h-32 bg-muted" />
        </Card>
      </div>
    );
  }

  const tier = getUserTier(stats.totalCreditsUsed);
  const TierIcon = tier.icon;
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'there';
  const initials = userName.slice(0, 2).toUpperCase();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="space-y-6">
      {/* User Profile Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-3">
            <div className="relative inline-block">
              <Avatar className="w-20 h-20 border-4 border-pal-purple/20">
                <AvatarImage src={PAL_AVATARS[favoritePal]} alt="Profile" />
                <AvatarFallback className="text-lg font-semibold bg-pal-purple text-white">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className={`absolute -bottom-1 -right-1 w-8 h-8 rounded-full ${tier.bgColor} border-4 border-background flex items-center justify-center`}>
                <TierIcon className={`w-4 h-4 ${tier.color}`} />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">
                {getGreeting()}, {userName}
              </h3>
              {stats.currentStreak > 0 && (
                <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                  <Flame className="w-4 h-4 text-pal-orange" />
                  {stats.currentStreak} day streak!
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-pal-purple" />
            7-Day Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ActivityChart />
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Trophy className="w-4 h-4 text-pal-purple" />
            Your Stats
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Credits Used</span>
            <span className="text-sm font-semibold text-foreground">{stats.totalCreditsUsed}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Tools Mastered</span>
            <span className="text-sm font-semibold text-foreground">{stats.toolsMastered}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Achievement Tier</span>
            <span className={`text-sm font-semibold ${tier.color}`}>{tier.name}</span>
          </div>
        </CardContent>
      </Card>

      {/* Top Tools */}
      {stats.topTools.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Top Tools</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {stats.topTools.map((tool, index) => (
              <div key={tool.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-muted-foreground w-4">#{index + 1}</span>
                  <span className="text-sm text-foreground">{tool.name}</span>
                </div>
                <span className="text-sm font-medium text-muted-foreground">{tool.count}x</span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Favorite Pal Card */}
      {onChangePal && (
        <FavoritePalCard favoritePal={favoritePal} onChangePal={onChangePal} />
      )}
    </div>
  );
}
