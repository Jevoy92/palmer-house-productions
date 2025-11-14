import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { SystemCompletionCard } from '@/components/dashboard/SystemCompletionCard';
import { MetaTags } from '@/components/seo/MetaTags';
import { ArrowLeft, Video, CheckCircle2, Target, Lightbulb, Trophy, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

interface VideoChecklistItem {
  id: string;
  title: string;
  completed: boolean;
}

interface VideoCategory {
  name: string;
  items: VideoChecklistItem[];
}

const PAL_CONFIG: any = {
  reel: {
    name: 'Reel Pal',
    emoji: '📱',
    description: 'Master short-form content for social media success',
    borderColor: 'border-blue-500',
    proTips: [
      'Hook viewers in the first 3 seconds',
      'Use trending audio to boost visibility',
      'Post consistently at peak times'
    ],
    checklists: [
      {
        name: 'Social Reels',
        items: [
          { id: 'reel-about-business', title: 'About the Business' },
          { id: 'reel-about-service', title: 'About Service/Product' },
          { id: 'reel-how-helps', title: 'How This Helps' },
          { id: 'reel-testimonial', title: 'Customer Testimonial' },
          { id: 'reel-behind-scenes', title: 'Behind the Scenes' },
          { id: 'reel-team-intro', title: 'Team Introduction' },
        ]
      },
      {
        name: 'Web Video',
        items: [
          { id: 'reel-about-video', title: 'About Video' },
          { id: 'reel-pricing', title: 'Pricing Explainer' },
          { id: 'reel-process', title: 'Process Explainer' },
          { id: 'reel-faq', title: 'FAQ Video' },
          { id: 'reel-service', title: 'Service Overview' },
          { id: 'reel-portfolio', title: 'Portfolio Showcase' },
        ]
      }
    ]
  },
  evergreen: {
    name: 'Evergreen Pal',
    emoji: '🌲',
    description: 'Create lasting, SEO-optimized content',
    borderColor: 'border-green-500',
    proTips: [
      'Focus on timeless topics',
      'Optimize for search intent',
      'Create comprehensive pillar content'
    ],
    checklists: [
      {
        name: 'Educational Content',
        items: [
          { id: 'evergreen-tutorial', title: 'How-To Tutorial' },
          { id: 'evergreen-insights', title: 'Industry Insights' },
          { id: 'evergreen-practices', title: 'Best Practices' },
          { id: 'evergreen-mistakes', title: 'Common Mistakes' },
          { id: 'evergreen-started', title: 'Getting Started Guide' },
        ]
      },
      {
        name: 'Long-Form Value',
        items: [
          { id: 'evergreen-guide', title: 'Ultimate Guide' },
          { id: 'evergreen-case', title: 'Case Study' },
          { id: 'evergreen-dive', title: 'Deep Dive' },
          { id: 'evergreen-leadership', title: 'Thought Leadership' },
          { id: 'evergreen-trends', title: 'Industry Trends' },
        ]
      }
    ]
  },
  spotlight: {
    name: 'Spotlight Pal',
    emoji: '🎬',
    description: 'Professional productions that command attention',
    borderColor: 'border-purple-500',
    proTips: [
      'Invest in professional lighting',
      'Plan your shots carefully',
      'Use high-quality audio'
    ],
    checklists: [
      {
        name: 'Professional Productions',
        items: [
          { id: 'spotlight-overview', title: 'Company Overview' },
          { id: 'spotlight-executive', title: 'Executive Interviews' },
          { id: 'spotlight-product', title: 'Product Demonstrations' },
          { id: 'spotlight-brand', title: 'Brand Story' },
        ]
      },
      {
        name: 'High-Production Value',
        items: [
          { id: 'spotlight-commercial', title: 'Commercial' },
          { id: 'spotlight-testimonials', title: 'Testimonial Series' },
          { id: 'spotlight-event', title: 'Event Coverage' },
          { id: 'spotlight-documentary', title: 'Documentary-Style' },
        ]
      }
    ]
  },
  system: {
    name: 'System Pal',
    emoji: '⚙️',
    description: 'Streamline operations with training videos',
    borderColor: 'border-orange-500',
    proTips: [
      'Keep training videos under 5 minutes',
      'Update regularly as processes change',
      'Add timestamps for easy navigation'
    ],
    checklists: [
      {
        name: 'Training & Documentation',
        items: [
          { id: 'system-onboarding', title: 'Onboarding Videos' },
          { id: 'system-process', title: 'Process Documentation' },
          { id: 'system-tools', title: 'Tool Tutorials' },
          { id: 'system-safety', title: 'Safety Procedures' },
        ]
      },
      {
        name: 'Internal Operations',
        items: [
          { id: 'system-sops', title: 'SOPs' },
          { id: 'system-knowledge', title: 'Knowledge Base' },
          { id: 'system-comms', title: 'Team Communications' },
          { id: 'system-policy', title: 'Policy Updates' },
        ]
      }
    ]
  },
};

export default function PalHub() {
  const { palId } = useParams<{ palId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [userAchievements, setUserAchievements] = useState<Set<string>>(new Set());
  const [checklistProgress, setChecklistProgress] = useState<Record<string, boolean>>({});
  const [currentTip, setCurrentTip] = useState(0);
  const [totalSystemProgress, setTotalSystemProgress] = useState(0);
  const [palProgress, setPalProgress] = useState({ reel: 0, evergreen: 0, spotlight: 0, system: 0 });
  const [userIndustry, setUserIndustry] = useState<string>('');
  const [newAchievement, setNewAchievement] = useState<any>(null);

  const config = palId ? PAL_CONFIG[palId] : null;

  useEffect(() => {
    if (!user || !palId || !config) {
      navigate('/dashboard');
      return;
    }

    fetchUserIndustry();
    fetchAchievements();
    fetchChecklist();
    fetchSystemProgress();

    const tipInterval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % config.proTips.length);
    }, 8000);

    return () => clearInterval(tipInterval);
  }, [user, palId, config, navigate]);

  const fetchUserIndustry = async () => {
    if (!user) return;
    
    const { data } = await supabase
      .from('profiles')
      .select('industry')
      .eq('id', user.id)
      .single();
    
    if (data?.industry) {
      setUserIndustry(data.industry.replace(/_/g, ' '));
    }
  };

  const fetchSystemProgress = async () => {
    if (!user) return;

    const { data: totalData } = await supabase.rpc('get_total_system_completion', {
      p_user_id: user.id
    });
    
    if (totalData !== null) {
      setTotalSystemProgress(totalData);
    }

    const pals = ['reel', 'evergreen', 'spotlight', 'system'];
    const progress: any = {};

    for (const pal of pals) {
      const { data: palChecklist } = await supabase
        .from('user_video_checklist')
        .select('completed')
        .eq('user_id', user.id)
        .eq('pal', pal);

      if (palChecklist && palChecklist.length > 0) {
        const completed = palChecklist.filter(item => item.completed).length;
        progress[pal] = Math.round((completed / palChecklist.length) * 100);
      } else {
        progress[pal] = 0;
      }
    }

    setPalProgress(progress);
  };

  const fetchAchievements = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('user_achievements')
      .select('achievement_code')
      .eq('user_id', user.id);

    if (data) {
      setUserAchievements(new Set(data.map(a => a.achievement_code)));
    }
  };

  const fetchChecklist = async () => {
    if (!user || !palId) return;

    const { data } = await supabase
      .from('user_video_checklist')
      .select('video_id, completed')
      .eq('user_id', user.id)
      .eq('pal', palId);

    if (data) {
      const progress: Record<string, boolean> = {};
      data.forEach(item => {
        progress[item.video_id] = item.completed;
      });
      setChecklistProgress(progress);
    }
  };

  const handleChecklistToggle = async (videoId: string, currentStatus: boolean) => {
    if (!user || !palId) return;

    const newStatus = !currentStatus;

    try {
      const { error } = await supabase
        .from('user_video_checklist')
        .upsert({
          user_id: user.id,
          pal: palId,
          video_id: videoId,
          completed: newStatus,
          completed_at: newStatus ? new Date().toISOString() : null,
        });

      if (error) throw error;

      setChecklistProgress((prev) => ({
        ...prev,
        [videoId]: newStatus,
      }));

      setTimeout(async () => {
        await fetchAchievements();
        await fetchSystemProgress();
        
        const { data: newAchievements } = await supabase
          .from('user_achievements')
          .select('achievement_code, achievements(name, description, icon, points)')
          .eq('user_id', user.id)
          .order('earned_at', { ascending: false })
          .limit(1);

        if (newAchievements && newAchievements.length > 0) {
          const latest = newAchievements[0];
          if (!userAchievements.has(latest.achievement_code)) {
            setNewAchievement(latest);
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 }
            });
            setTimeout(() => setNewAchievement(null), 5000);
          }
        }
      }, 500);

      toast.success(newStatus ? 'Video marked complete!' : 'Video marked incomplete');
    } catch (error) {
      console.error('Error updating checklist:', error);
      toast.error('Failed to update checklist');
    }
  };

  if (!config) return null;

  const totalItems = config.checklists.reduce((sum: number, cat: VideoCategory) => sum + cat.items.length, 0);
  const completedItems = Object.values(checklistProgress).filter(Boolean).length;
  const progressPercent = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  return (
    <>
      <MetaTags title={`${config.name} - Palmer House Content OS`} description={config.description} />

      <DashboardLayout>
      <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">
        {newAchievement && (
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            <Card className="p-8 text-center animate-scale-in shadow-2xl pointer-events-auto max-w-md">
              <Sparkles className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Achievement Unlocked!</h2>
              <p className="text-4xl mb-3">{(newAchievement.achievements as any)?.icon}</p>
              <h3 className="text-xl font-semibold mb-2">{(newAchievement.achievements as any)?.name}</h3>
              <p className="text-muted-foreground mb-4">{(newAchievement.achievements as any)?.description}</p>
              <Badge variant="secondary" className="text-lg">
                <Trophy className="w-4 h-4 mr-1" />
                +{(newAchievement.achievements as any)?.points} points
              </Badge>
            </Card>
          </div>
        )}

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <span className="text-4xl">{config.emoji}</span>
              {config.name}
            </h1>
            <p className="text-muted-foreground mt-1">{config.description}</p>
            {userIndustry && (
              <Badge variant="outline" className="mt-2">
                Optimized for {userIndustry}
              </Badge>
            )}
          </div>
        </div>

        <SystemCompletionCard totalProgress={totalSystemProgress} palProgress={palProgress} />

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Target className="w-5 h-5" />
              Your Video System Progress
            </h2>
            <span className="text-2xl font-bold text-primary">{progressPercent}%</span>
          </div>
          <Progress value={progressPercent} className="h-3" />
        </Card>

        <Card className="p-6 bg-primary/5 border-primary/20">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-1">Pro Tip</h3>
              <p className="text-sm text-muted-foreground">{config.proTips[currentTip]}</p>
            </div>
          </div>
        </Card>

        {config.checklists.map((category: VideoCategory) => (
          <Card key={category.name} className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Video className="w-5 h-5" />
              {category.name}
            </h3>
            <div className="space-y-3">
              {category.items.map((item: VideoChecklistItem) => {
                const isCompleted = checklistProgress[item.id] || false;
                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent/50 transition-colors"
                  >
                    <Checkbox
                      checked={isCompleted}
                      onCheckedChange={() => handleChecklistToggle(item.id, isCompleted)}
                    />
                    <span className={isCompleted ? 'line-through text-muted-foreground' : ''}>
                      {item.title}
                    </span>
                    {isCompleted && <CheckCircle2 className="w-5 h-5 text-primary ml-auto" />}
                  </div>
                );
              })}
            </div>
          </Card>
        ))}
      </div>
      </DashboardLayout>
    </>
  );
}
