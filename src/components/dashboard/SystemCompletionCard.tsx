import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy, Target } from 'lucide-react';

interface SystemCompletionCardProps {
  totalProgress: number;
  palProgress: {
    reel: number;
    evergreen: number;
    spotlight: number;
    system: number;
  };
}

export function SystemCompletionCard({ totalProgress, palProgress }: SystemCompletionCardProps) {
  const pals = [
    { id: 'reel', name: 'Reel Pal', emoji: '📱', color: 'text-blue-500' },
    { id: 'evergreen', name: 'Evergreen Pal', emoji: '🌲', color: 'text-green-500' },
    { id: 'spotlight', name: 'Spotlight Pal', emoji: '🎬', color: 'text-purple-500' },
    { id: 'system', name: 'System Pal', emoji: '⚙️', color: 'text-orange-500' },
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-lg">Complete Video System Progress</h3>
        </div>
        <span className="text-2xl font-bold text-primary">{totalProgress}%</span>
      </div>

      <Progress value={totalProgress} className="h-3 mb-6" />

      <div className="space-y-4">
        {pals.map((pal) => (
          <div key={pal.id} className="flex items-center gap-3">
            <span className="text-2xl">{pal.emoji}</span>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">{pal.name}</span>
                <span className={`text-sm font-semibold ${pal.color}`}>
                  {palProgress[pal.id as keyof typeof palProgress]}%
                </span>
              </div>
              <Progress value={palProgress[pal.id as keyof typeof palProgress]} className="h-2" />
            </div>
          </div>
        ))}
      </div>

      {totalProgress === 100 && (
        <div className="mt-6 p-4 bg-primary/10 border border-primary rounded-lg text-center">
          <Target className="w-8 h-8 text-primary mx-auto mb-2" />
          <p className="font-semibold text-primary">🎉 Complete Video System Achieved!</p>
          <p className="text-sm text-muted-foreground mt-1">
            You've built a comprehensive video marketing system for your business
          </p>
        </div>
      )}
    </Card>
  );
}
