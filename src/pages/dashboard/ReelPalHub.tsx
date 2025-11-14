import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Lightbulb, ArrowRight, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

interface ChecklistItem {
  id: string;
  title: string;
  category: string;
}

const REEL_PAL_CHECKLIST: ChecklistItem[] = [
  // Social Reels
  { id: 'reel-about-business', title: 'About the business', category: 'Social Reels' },
  { id: 'reel-about-service', title: 'About the service or product', category: 'Social Reels' },
  { id: 'reel-how-helps', title: 'How this helps', category: 'Social Reels' },
  { id: 'reel-testimonial', title: 'Customer testimonial', category: 'Social Reels' },
  { id: 'reel-behind-scenes', title: 'Behind the scenes', category: 'Social Reels' },
  { id: 'reel-team-intro', title: 'Team introduction', category: 'Social Reels' },
  // Web Video
  { id: 'reel-about-video', title: 'About video', category: 'Web Video' },
  { id: 'reel-pricing', title: 'Pricing explainers', category: 'Web Video' },
  { id: 'reel-process', title: 'Process explainers', category: 'Web Video' },
  { id: 'reel-faq', title: 'FAQ video', category: 'Web Video' },
  { id: 'reel-service-overview', title: 'Service overview', category: 'Web Video' },
  { id: 'reel-portfolio', title: 'Portfolio showcase', category: 'Web Video' },
];

export default function ReelPalHub() {
  const { user } = useAuth();
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchProgress = async () => {
      const { data } = await (supabase as any)
        .from('user_video_checklist')
        .select('video_id, completed')
        .eq('user_id', user.id)
        .eq('pal', 'reel');

      if (data) {
        const completed = new Set<string>(
          data.filter((item: any) => item.completed).map((item: any) => item.video_id)
        );
        setCompletedItems(completed);
      }
      setLoading(false);
    };

    fetchProgress();
  }, [user]);

  const toggleItem = async (itemId: string) => {
    if (!user) return;

    const isCompleted = completedItems.has(itemId);
    const newCompletedItems = new Set(completedItems);

    if (isCompleted) {
      newCompletedItems.delete(itemId);
    } else {
      newCompletedItems.add(itemId);
    }

    setCompletedItems(newCompletedItems);

    const { error } = await (supabase as any)
      .from('user_video_checklist')
      .upsert({
        user_id: user.id,
        video_id: itemId,
        pal: 'reel',
        completed: !isCompleted,
        completed_at: !isCompleted ? new Date().toISOString() : null,
      }, {
        onConflict: 'user_id,video_id'
      });

    if (error) {
      console.error('Error updating checklist:', error);
      toast.error('Failed to update checklist');
      // Revert on error
      setCompletedItems(completedItems);
    } else {
      toast.success(isCompleted ? 'Item unchecked' : 'Item completed!');
    }
  };

  const categories = Array.from(new Set(REEL_PAL_CHECKLIST.map(item => item.category)));
  const progress = (completedItems.size / REEL_PAL_CHECKLIST.length) * 100;

  if (loading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3" />
          <div className="h-24 bg-muted rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6 max-w-7xl">
      {/* Header */}
      <div className="border-l-4 border-pal-purple pl-4">
        <h1 className="text-3xl font-bold text-foreground">Reel Pal</h1>
        <p className="text-muted-foreground">Master short-form content and social media</p>
      </div>

      {/* Video Production Progress */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Video Production Progress</h2>
              <p className="text-sm text-muted-foreground">
                {completedItems.size} of {REEL_PAL_CHECKLIST.length} videos filmed
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-foreground">{Math.round(progress)}%</div>
              <p className="text-xs text-muted-foreground">Complete</p>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </Card>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/tools/content-system-builder">
            <Button variant="outline" className="w-full justify-start h-auto py-4">
              <Lightbulb className="w-4 h-4 mr-2" />
              Write 5 Hooks
            </Button>
          </Link>
          <Link to="/tools/series-builder">
            <Button variant="outline" className="w-full justify-start h-auto py-4">
              <ArrowRight className="w-4 h-4 mr-2" />
              Plan 10 Shorts
            </Button>
          </Link>
          <Link to="/tools/engagement-responder">
            <Button variant="outline" className="w-full justify-start h-auto py-4">
              <MessageCircle className="w-4 h-4 mr-2" />
              Engagement Starters
            </Button>
          </Link>
        </div>
      </div>

      {/* Video Production Checklist */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 11 12 14 22 4"></polyline>
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
          </svg>
          Video Production Checklist
        </h2>

        {categories.map(category => {
          const categoryItems = REEL_PAL_CHECKLIST.filter(item => item.category === category);
          const categoryCompleted = categoryItems.filter(item => completedItems.has(item.id)).length;

          return (
            <Card key={category} className="mb-4">
              <div className="p-4 border-b flex items-center justify-between bg-muted/30">
                <h3 className="font-semibold text-foreground">{category}</h3>
                <span className="text-sm text-muted-foreground">
                  {categoryCompleted}/{categoryItems.length}
                </span>
              </div>
              <div className="p-4 space-y-2">
                {categoryItems.map(item => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-2 rounded hover:bg-muted/50 transition-colors"
                  >
                    <Checkbox
                      id={item.id}
                      checked={completedItems.has(item.id)}
                      onCheckedChange={() => toggleItem(item.id)}
                    />
                    <label
                      htmlFor={item.id}
                      className={`flex-1 cursor-pointer text-sm ${
                        completedItems.has(item.id) ? 'line-through text-muted-foreground' : 'text-foreground'
                      }`}
                    >
                      {item.title}
                    </label>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
