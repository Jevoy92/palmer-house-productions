import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface ActivityData {
  date: string;
  uses: number;
}

export function ActivityChart() {
  const { user } = useAuth();
  const [data, setData] = useState<ActivityData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchActivity = async () => {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

      const { data: activityData } = await supabase
        .from('credit_transactions')
        .select('created_at')
        .eq('user_id', user.id)
        .eq('transaction_type', 'usage')
        .gte('created_at', sevenDaysAgo.toISOString());

      // Group by date
      const grouped: Record<string, number> = {};
      activityData?.forEach((transaction) => {
        const date = new Date(transaction.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        grouped[date] = (grouped[date] || 0) + 1;
      });

      // Create array for last 7 days
      const chartData: ActivityData[] = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        chartData.push({
          date: dateStr,
          uses: grouped[dateStr] || 0,
        });
      }

      setData(chartData);
      setLoading(false);
    };

    fetchActivity();
  }, [user]);

  if (loading) {
    return (
      <div className="h-48 flex items-center justify-center bg-muted/50 rounded-lg animate-pulse">
        <p className="text-sm text-muted-foreground">Loading activity...</p>
      </div>
    );
  }

  const maxValue = Math.max(...data.map(d => d.uses), 1);

  return (
    <div className="h-48">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
            stroke="hsl(var(--border))"
          />
          <YAxis 
            tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
            stroke="hsl(var(--border))"
            domain={[0, maxValue + 1]}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--popover))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              fontSize: '12px',
            }}
            labelStyle={{ color: 'hsl(var(--foreground))' }}
          />
          <Bar 
            dataKey="uses" 
            fill="hsl(var(--pal-purple))" 
            radius={[4, 4, 0, 0]}
            name="Tool Uses"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
