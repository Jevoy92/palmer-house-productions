import { useEffect, useState } from 'react';
import { Coins, TrendingUp, Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Progress } from '@/components/ui/progress';

interface CreditData {
  balance: number;
  monthly_allowance: number;
  last_refill_date: string;
}

export function CreditsBalance() {
  const user: { id: string; email?: string; user_metadata?: any } | null = null;
  const [credits, setCredits] = useState<CreditData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchCredits = async () => {
      const { data, error } = await supabase
        .from('user_credits')
        .select('balance, monthly_allowance, last_refill_date')
        .eq('user_id', user.id)
        .single();

      if (!error && data) {
        setCredits(data);
      }
      setLoading(false);
    };

    fetchCredits();

    // Set up realtime subscription for credit updates
    const channel = supabase
      .channel('credits-updates')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'user_credits',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          setCredits(payload.new as CreditData);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  if (loading || !credits) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 bg-muted/50 rounded-full animate-pulse">
        <Coins className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm font-medium text-muted-foreground">Loading...</span>
      </div>
    );
  }

  const percentageUsed = ((credits.monthly_allowance - credits.balance) / credits.monthly_allowance) * 100;
  const isLow = credits.balance < credits.monthly_allowance * 0.2; // Less than 20%
  const nextRefillDate = new Date(credits.last_refill_date);
  nextRefillDate.setMonth(nextRefillDate.getMonth() + 1);
  const daysUntilRefill = Math.ceil((nextRefillDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all ${
            isLow 
              ? 'bg-destructive/10 border-destructive/30 text-destructive hover:bg-destructive/20' 
              : 'bg-pal-purple/10 border-pal-purple/30 text-pal-purple hover:bg-pal-purple/20'
          }`}
        >
          <Coins className="w-4 h-4" />
          <span className="text-sm font-bold tabular-nums">{credits.balance}</span>
          <span className="text-xs font-medium opacity-70">credits</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          {/* Header */}
          <div className="space-y-1">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <Coins className="w-4 h-4 text-pal-purple" />
              Your Credits
            </h4>
            <p className="text-sm text-muted-foreground">
              Track your monthly content generation allowance
            </p>
          </div>

          {/* Balance Display */}
          <div className="space-y-2">
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-foreground tabular-nums">
                {credits.balance}
              </span>
              <span className="text-sm text-muted-foreground">
                of {credits.monthly_allowance} credits
              </span>
            </div>
            <Progress value={100 - percentageUsed} className="h-2 [&>div]:bg-pal-purple" />
            <p className="text-xs text-muted-foreground">
              {credits.balance === credits.monthly_allowance ? (
                "✨ Full balance available"
              ) : isLow ? (
                `⚠️ Running low - consider topping up`
              ) : (
                `${Math.round(100 - percentageUsed)}% remaining this month`
              )}
            </p>
          </div>

          {/* Refill Info */}
          <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
            <Calendar className="w-4 h-4 text-muted-foreground mt-0.5" />
            <div className="space-y-1 flex-1">
              <p className="text-sm font-medium text-foreground">Next Refill</p>
              <p className="text-xs text-muted-foreground">
                Your credits reset in {daysUntilRefill} {daysUntilRefill === 1 ? 'day' : 'days'}
              </p>
              <p className="text-xs text-muted-foreground">
                +{credits.monthly_allowance} credits on {nextRefillDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-2 pt-2 border-t border-border">
            <Button 
              className="w-full bg-pal-purple hover:bg-pal-purple/90 text-white" 
              size="sm"
              disabled
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Top Up Credits
              <span className="ml-2 text-xs opacity-60">(Coming Soon)</span>
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Need more? Upgrade your plan for higher monthly allowance
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
