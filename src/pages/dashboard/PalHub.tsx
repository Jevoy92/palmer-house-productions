import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
    description: 'Master short-form content and social media',
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
          { id: 'reel-about-service', title: 'About the Service/Product' },
          { id: 'reel-how-helps', title: 'How This Helps' },
          { id: 'reel-testimonial', title: 'Client Testimonials' },
          { id: 'reel-behind-scenes', title: 'Behind the Scenes' },
          { id: 'reel-educational', title: 'Educational Content' },
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
          { id: 'spotlight-culture', title: 'Culture Video' },
          { id: 'spotlight-event', title: 'Event Coverage' },
          { id: 'spotlight-launch', title: 'Product Launch' },
        ]
      },
      {
        name: 'Brand Story',
        items: [
          { id: 'spotlight-documentary', title: 'Brand Documentary' },
          { id: 'spotlight-origin', title: 'Origin Story' },
          { id: 'spotlight-values', title: 'Values Video' },
          { id: 'spotlight-mission', title: 'Mission Statement' },
          { id: 'spotlight-impact', title: 'Impact Story' },
        ]
      }
    ]
  },
  system: {
    name: 'System Pal',
    emoji: '⚙️',
    description: 'Automate and scale your video operations',
    borderColor: 'border-orange-500',
    proTips: [
      'Create templates for recurring content',
      'Build a content calendar',
      'Document your processes'
    ],
    checklists: [
      {
        name: 'Training Videos',
        items: [
          { id: 'system-onboarding', title: 'Employee Onboarding' },
          { id: 'system-safety', title: 'Safety Training' },
          { id: 'system-software', title: 'Software Tutorial' },
          { id: 'system-procedures', title: 'Standard Procedures' },
          { id: 'system-compliance', title: 'Compliance Training' },
        ]
      },
      {
        name: 'Internal Communications',
        items: [
          { id: 'system-updates', title: 'Company Updates' },
          { id: 'system-announcements', title: 'Announcements' },
          { id: 'system-town-hall', title: 'Town Hall Recording' },
          { id: 'system-department', title: 'Department Overview' },
          { id: 'system-quarterly', title: 'Quarterly Review' },
        ]
      }
    ]
  }
};

export default function PalHub() {
  const { palId } = useParams();
  const navigate = useNavigate();
  const user: { id: string; email?: string; user_metadata?: any } | null = null;
  const [config] = useState(PAL_CONFIG[palId || 'reel'] || PAL_CONFIG.reel);
  const [checklistProgress, setChecklistProgress] = useState<Record<string, boolean>>({});
  const [userIndustry, setUserIndustry] = useState<string>('');
  const [totalSystemProgress, setTotalSystemProgress] = useState(0);
  const [palProgress, setPalProgress] = useState<any>({});
  const [userAchievements, setUserAchievements] = useState<Set<string>>(new Set());
  const [newAchievement, setNewAchievement] = useState<any>(null);

  useEffect(() => {
    if (user) {
      fetchUserIndustry();
      fetchSystemProgress();
      fetchAchievements();
      fetchChecklist();
    }
  }, [user, palId]);

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

  const getCategoryProgress = (category: VideoCategory) => {
    const completed = category.items.filter(item => checklistProgress[item.id] || false).length;
    return { completed, total: category.items.length };
  };

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

          {/* Header */}
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate('/dashboard')}
              className="mb-4 -ml-2"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <span className="text-4xl">{config.emoji}</span>
                {config.name}
              </h1>
              <p className="text-gray-600">{config.description}</p>
              {userIndustry && (
                <Badge variant="outline" className="mt-2">
                  Optimized for {userIndustry}
                </Badge>
              )}
            </div>
          </div>

          <SystemCompletionCard totalProgress={totalSystemProgress} palProgress={palProgress} />

          {/* Video Production Progress */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Video Production Progress</h2>
                <p className="text-sm text-gray-600">
                  {completedItems} of {totalItems} videos filmed
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">
                  {progressPercent}%
                </div>
                <p className="text-xs text-gray-500">Complete</p>
              </div>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </div>

          {/* Quick Actions */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Quick Actions
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <button 
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all flex flex-col items-center gap-2 text-center"
                onClick={() => navigate('/tools/series-builder')}
              >
                <div className="p-2 rounded-lg bg-blue-50">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-sm font-medium">Write 5 Hooks</span>
              </button>
              <button 
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all flex flex-col items-center gap-2 text-center"
                onClick={() => navigate('/tools/content-system-builder')}
              >
                <div className="p-2 rounded-lg bg-purple-50">
                  <Video className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-sm font-medium">Plan 10 Shorts</span>
              </button>
              <button 
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all flex flex-col items-center gap-2 text-center"
                onClick={() => navigate('/tools/engagement-responder')}
              >
                <div className="p-2 rounded-lg bg-green-50">
                  <Trophy className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-sm font-medium">Engagement Starters</span>
              </button>
            </div>
          </div>

          {/* Video Production Checklist */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              Video Production Checklist
            </h2>
            
            <div className="space-y-8">
              {config.checklists.map((category: VideoCategory) => {
                const categoryProgress = getCategoryProgress(category);
                
                return (
                  <div key={category.name} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-semibold text-gray-900">{category.name}</h3>
                      <span className="text-sm text-gray-500">
                        {categoryProgress.completed}/{categoryProgress.total}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      {category.items.map((item: VideoChecklistItem) => {
                        const isCompleted = checklistProgress[item.id] || false;
                        
                        return (
                          <div
                            key={item.id}
                            className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                            onClick={() => handleChecklistToggle(item.id, isCompleted)}
                          >
                            <Checkbox
                              checked={isCompleted}
                              onCheckedChange={() => handleChecklistToggle(item.id, isCompleted)}
                              className="h-5 w-5"
                            />
                            <label className="text-base font-medium cursor-pointer flex-1">
                              {item.title}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pro Tips */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg border border-yellow-200 p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-600" />
              Pro Tips
            </h2>
            
            <div className="space-y-3">
              {config.proTips.map((tip: string, index: number) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-white/60 rounded-lg"
                >
                  <div className="w-6 h-6 rounded-full bg-yellow-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-sm leading-relaxed text-gray-700">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}