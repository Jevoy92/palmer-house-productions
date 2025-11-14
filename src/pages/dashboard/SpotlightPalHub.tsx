import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Camera, TrendingUp, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

interface ChecklistItem {
  id: string;
  title: string;
  category: string;
}

const SPOTLIGHT_PAL_CHECKLIST: ChecklistItem[] = [
  // Professional Productions
  { id: 'spotlight-company-overview', title: 'Company overview', category: 'Professional Productions' },
  { id: 'spotlight-exec-interviews', title: 'Executive interviews', category: 'Professional Productions' },
  { id: 'spotlight-product-demo', title: 'Product demonstrations', category: 'Professional Productions' },
  { id: 'spotlight-brand-story', title: 'Brand story', category: 'Professional Productions' },
  // High-Production Value
  { id: 'spotlight-commercials', title: 'Commercials', category: 'High-Production Value' },
  { id: 'spotlight-testimonial-series', title: 'Testimonial series', category: 'High-Production Value' },
  { id: 'spotlight-event-coverage', title: 'Event coverage', category: 'High-Production Value' },
  { id: 'spotlight-documentary', title: 'Documentary-style', category: 'High-Production Value' },
];

export default function SpotlightPalHub() {
  const { user } = useAuth();
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchProgress = async () => {
      // @ts-ignore - user_video_checklist table exists but types haven't regenerated yet
      const { data } = await supabase
        .from('user_video_checklist')
        .select('video_id, completed')
        .eq('user_id', user.id)
        .eq('pal', 'spotlight');

      if (data) {
        // @ts-ignore
        const completed = new Set(
          data.filter(item => item.completed).map(item => item.video_id)
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

    // @ts-ignore - user_video_checklist table exists but types haven't regenerated yet
    const { error } = await supabase
      .from('user_video_checklist')
      .upsert({
        user_id: user.id,
        video_id: itemId,
        pal: 'spotlight',
        completed: !isCompleted,
        completed_at: !isCompleted ? new Date().toISOString() : null,
      }, {
        onConflict: 'user_id,video_id'
      });

    if (error) {
      console.error('Error updating checklist:', error);
      toast.error('Failed to update checklist');
      setCompletedItems(completedItems);
    } else {
      toast.success(isCompleted ? 'Item unchecked' : 'Item completed!');
    }
  };

  const categories = Array.from(new Set(SPOTLIGHT_PAL_CHECKLIST.map(item => item.category)));
  const progress = (completedItems.size / SPOTLIGHT_PAL_CHECKLIST.length) * 100;

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
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Spotlight Pal Video System</h1>
          <p className="text-muted-foreground">Create cinematic brand content</p>
        </div>
        <Link to="/spotlight-pal">
          <Button variant="outline">
            <TrendingUp className="w-4 h-4 mr-2" />
            Learn More
          </Button>
        </Link>
      </div>

      {/* Progress Card */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Overall Progress</h2>
              <p className="text-sm text-muted-foreground">
                {completedItems.size} of {SPOTLIGHT_PAL_CHECKLIST.length} videos completed
              </p>
            </div>
            <div className="text-3xl font-bold text-pal-blue">{Math.round(progress)}%</div>
          </div>
          <Progress value={progress} className="h-3" />
        </div>
      </Card>

      {/* Checklist by Category */}
      {categories.map(category => {
        const categoryItems = SPOTLIGHT_PAL_CHECKLIST.filter(item => item.category === category);
        const categoryCompleted = categoryItems.filter(item => completedItems.has(item.id)).length;
        const categoryProgress = (categoryCompleted / categoryItems.length) * 100;

        return (
          <Card key={category} className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-pal-blue/10 flex items-center justify-center">
                    <Camera className="w-5 h-5 text-pal-blue" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{category}</h3>
                    <p className="text-sm text-muted-foreground">
                      {categoryCompleted} of {categoryItems.length} completed
                    </p>
                  </div>
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  {Math.round(categoryProgress)}%
                </span>
              </div>

              <Progress value={categoryProgress} className="h-2" />

              <div className="space-y-3 pt-2">
                {categoryItems.map(item => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <Checkbox
                      id={item.id}
                      checked={completedItems.has(item.id)}
                      onCheckedChange={() => toggleItem(item.id)}
                    />
                    <label
                      htmlFor={item.id}
                      className={`flex-1 cursor-pointer ${
                        completedItems.has(item.id) ? 'line-through text-muted-foreground' : 'text-foreground'
                      }`}
                    >
                      {item.title}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        );
      })}

      {/* CTA */}
      <Card className="p-6 bg-gradient-to-br from-pal-blue/10 to-transparent">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Ready to Create?</h3>
            <p className="text-sm text-muted-foreground">
              Start producing your cinematic content with Spotlight Pal
            </p>
          </div>
          <Link to="/tools/production-assistant">
            <Button>
              <Upload className="w-4 h-4 mr-2" />
              Start Creating
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
