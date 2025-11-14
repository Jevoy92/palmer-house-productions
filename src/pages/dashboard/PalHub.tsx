import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { MetaTags } from '@/components/seo/MetaTags';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Award, Sparkles, ArrowRight, Trophy, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface VideoChecklistItem {
  id: string;
  title: string;
  completed: boolean;
}

interface VideoCategory {
  name: string;
  items: VideoChecklistItem[];
}

const PAL_CONFIG = {
  reel: {
    name: 'Reel Pal',
    description: 'Master short-form content and social media',
    borderColor: 'border-pink-500',
    actions: [
      { label: 'Write 5 Hooks', icon: Sparkles },
      { label: 'Plan 10 Shorts', icon: ArrowRight },
      { label: 'Engagement Starters', icon: ArrowRight }
    ],
    tips: [
      'Hook viewers in the first 3 seconds',
      'Use trending audio to boost visibility',
      'Post consistently at peak times',
      'Engage with comments within 30 minutes'
    ],
    checklists: [
      {
        name: 'Social Reels',
        items: [
          { id: 'reel-about-business', title: 'About the Business' },
          { id: 'reel-about-service', title: 'About the Service/Product' },
          { id: 'reel-how-this-helps', title: 'How This Helps' },
          { id: 'reel-customer-testimonial', title: 'Customer Testimonial' },
          { id: 'reel-behind-scenes', title: 'Behind the Scenes' },
          { id: 'reel-team-intro', title: 'Team Introduction' },
        ]
      },
      {
        name: 'Web Video',
        items: [
          { id: 'reel-about-video', title: 'About Video' },
          { id: 'reel-pricing-explainer', title: 'Pricing Explainer' },
          { id: 'reel-process-explainer', title: 'Process Explainer' },
          { id: 'reel-faq-video', title: 'FAQ Video' },
          { id: 'reel-service-overview', title: 'Service Overview' },
          { id: 'reel-portfolio-showcase', title: 'Portfolio Showcase' },
        ]
      }
    ]
  },
  evergreen: {
    name: 'Evergreen Pal',
    description: 'Create lasting, SEO-optimized content',
    borderColor: 'border-green-500',
    actions: [
      { label: 'Evergreen Outline', icon: Sparkles },
      { label: 'YouTube Script', icon: ArrowRight },
      { label: 'SEO Title & Description', icon: ArrowRight }
    ],
    tips: [
      'Focus on timeless topics that won\'t age',
      'Optimize for search intent and keywords',
      'Create comprehensive pillar content',
      'Update older content to keep it relevant'
    ],
    checklists: [
      {
        name: 'Educational Content',
        items: [
          { id: 'evergreen-how-to-tutorial', title: 'How-To Tutorial' },
          { id: 'evergreen-industry-insights', title: 'Industry Insights' },
          { id: 'evergreen-best-practices', title: 'Best Practices' },
          { id: 'evergreen-common-mistakes', title: 'Common Mistakes' },
          { id: 'evergreen-getting-started', title: 'Getting Started Guide' },
        ]
      },
      {
        name: 'Long-Form Value',
        items: [
          { id: 'evergreen-ultimate-guide', title: 'Ultimate Guide' },
          { id: 'evergreen-case-study', title: 'Case Study' },
          { id: 'evergreen-deep-dive', title: 'Deep Dive' },
          { id: 'evergreen-thought-leadership', title: 'Thought Leadership' },
          { id: 'evergreen-industry-trends', title: 'Industry Trends' },
        ]
      }
    ]
  },
  spotlight: {
    name: 'Spotlight Pal',
    description: 'Professional production quality',
    borderColor: 'border-yellow-500',
    actions: [
      { label: 'Interview Questions', icon: Sparkles },
      { label: 'Lighting Checklist', icon: ArrowRight },
      { label: 'Audio Setup Guide', icon: ArrowRight }
    ],
    tips: [
      'Three-point lighting creates depth',
      'Test audio levels before recording',
      'Frame subjects using rule of thirds',
      'Always have backup equipment ready'
    ],
    checklists: [
      {
        name: 'Professional Productions',
        items: [
          { id: 'spotlight-company-overview', title: 'Company Overview' },
          { id: 'spotlight-executive-interview', title: 'Executive Interview' },
          { id: 'spotlight-product-demo', title: 'Product Demonstration' },
          { id: 'spotlight-brand-story', title: 'Brand Story' },
          { id: 'spotlight-culture-video', title: 'Culture Video' },
        ]
      },
      {
        name: 'High-Production Value',
        items: [
          { id: 'spotlight-commercial', title: 'Commercial' },
          { id: 'spotlight-testimonial-series', title: 'Testimonial Series' },
          { id: 'spotlight-event-coverage', title: 'Event Coverage' },
          { id: 'spotlight-documentary', title: 'Documentary-Style' },
          { id: 'spotlight-launch-video', title: 'Launch Video' },
        ]
      }
    ]
  },
  system: {
    name: 'System Pal',
    description: 'Automate and scale operations',
    borderColor: 'border-blue-500',
    actions: [
      { label: 'Training Outline', icon: Sparkles },
      { label: 'Process Steps', icon: ArrowRight },
      { label: 'Knowledge Article', icon: ArrowRight }
    ],
    tips: [
      'Document processes as you create them',
      'Build reusable templates and workflows',
      'Automate repetitive tasks first',
      'Create a centralized knowledge base'
    ],
    checklists: [
      {
        name: 'Training & Documentation',
        items: [
          { id: 'system-onboarding-video', title: 'Onboarding Video' },
          { id: 'system-process-doc', title: 'Process Documentation' },
          { id: 'system-tool-tutorial', title: 'Tool Tutorial' },
          { id: 'system-safety-procedures', title: 'Safety Procedures' },
          { id: 'system-compliance-training', title: 'Compliance Training' },
        ]
      },
      {
        name: 'Internal Operations',
        items: [
          { id: 'system-sops', title: 'Standard Operating Procedures' },
          { id: 'system-knowledge-base', title: 'Knowledge Base Article' },
          { id: 'system-team-comms', title: 'Team Communications' },
          { id: 'system-policy-updates', title: 'Policy Updates' },
          { id: 'system-troubleshooting', title: 'Troubleshooting Guide' },
        ]
      }
    ]
  }
};

export default function PalHub() {
  const { palId } = useParams<{ palId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [achievements, setAchievements] = useState<any[]>([]);
  const [userAchievements, setUserAchievements] = useState<string[]>([]);
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});
  const [currentTip, setCurrentTip] = useState(0);

  const pal = palId && PAL_CONFIG[palId as keyof typeof PAL_CONFIG];

  useEffect(() => {
    if (!pal) {
      navigate('/dashboard');
      return;
    }
    fetchAchievements();
    fetchChecklist();
    
    const interval = setInterval(() => {
      setCurrentTip(prev => (prev + 1) % pal.tips.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [palId, pal, navigate]);

  const fetchAchievements = async () => {
    if (!user || !palId) return;
    
    const { data: allAchievements } = await supabase
      .from('achievements')
      .select('*')
      .eq('pal', palId);
    
    const { data: userAch } = await supabase
      .from('user_achievements')
      .select('achievement_code')
      .eq('user_id', user.id);
    
    setAchievements(allAchievements || []);
    setUserAchievements(userAch?.map(a => a.achievement_code) || []);
  };

  const fetchChecklist = async () => {
    if (!user || !palId) return;
    
    const { data } = await supabase
      .from('user_video_checklist' as any)
      .select('video_id, completed')
      .eq('user_id', user.id)
      .eq('pal', palId);
    
    if (data) {
      const checklistMap: Record<string, boolean> = {};
      data.forEach((item: any) => {
        checklistMap[item.video_id] = item.completed;
      });
      setChecklist(checklistMap);
    }
  };

  const handleChecklistToggle = async (videoId: string, completed: boolean) => {
    if (!user || !palId) return;

    const { error } = await supabase
      .from('user_video_checklist' as any)
      .upsert({
        user_id: user.id,
        pal: palId,
        video_id: videoId,
        completed,
        completed_at: completed ? new Date().toISOString() : null,
      }, {
        onConflict: 'user_id,pal,video_id'
      });

    if (error) {
      toast.error('Failed to update checklist');
      return;
    }

    setChecklist(prev => ({ ...prev, [videoId]: completed }));
    
    if (completed) {
      toast.success('Video marked as complete!');
    }
  };

  if (!pal) return null;

  const totalItems = pal.checklists.reduce((sum, cat) => sum + cat.items.length, 0);
  const completedItems = Object.values(checklist).filter(Boolean).length;
  const progress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

  return (
    <>
      <MetaTags 
        title={`${pal.name} Hub`}
        description={pal.description}
      />
      
      <DashboardLayout>
        <div className="px-3 md:px-4 pt-0 pb-6 space-y-4 min-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className={`border-l-4 ${pal.borderColor} pl-4 py-2`}>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">{pal.name}</h1>
            <p className="text-muted-foreground">{pal.description}</p>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Video Production Progress</CardTitle>
                  <CardDescription>{completedItems} of {totalItems} videos filmed</CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-foreground">{Math.round(progress)}%</div>
                  <div className="text-xs text-muted-foreground">Complete</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={progress} className="h-3" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {pal.actions.map((action, idx) => {
                const Icon = action.icon;
                return (
                  <Button key={idx} variant="outline" className="justify-start gap-2 h-auto py-3">
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{action.label}</span>
                  </Button>
                );
              })}
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              Video Production Checklist
            </h2>
            
            {pal.checklists.map((category) => {
              const categoryCompleted = category.items.filter(item => checklist[item.id]).length;
              const categoryProgress = (categoryCompleted / category.items.length) * 100;
              
              return (
                <Card key={category.name}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                      <Badge variant="secondary">{categoryCompleted}/{category.items.length}</Badge>
                    </div>
                    <Progress value={categoryProgress} className="h-2 mt-2" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {category.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                          <Checkbox
                            id={item.id}
                            checked={checklist[item.id] || false}
                            onCheckedChange={(checked) => handleChecklistToggle(item.id, checked as boolean)}
                            className="w-5 h-5"
                          />
                          <label htmlFor={item.id} className={`flex-1 text-sm cursor-pointer ${checklist[item.id] ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                            {item.title}
                          </label>
                          {checklist[item.id] && <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {achievements.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {achievements.map((achievement) => {
                    const earned = userAchievements.includes(achievement.code);
                    return (
                      <div key={achievement.code} className={`p-4 rounded-lg border text-center transition-all ${earned ? 'border-primary bg-primary/5' : 'border-border bg-muted/30 opacity-60'}`}>
                        <div className="text-3xl mb-2">{achievement.icon}</div>
                        <h4 className="font-semibold text-sm mb-1">{achievement.name}</h4>
                        <p className="text-xs text-muted-foreground">{achievement.description}</p>
                        {earned && (
                          <Badge variant="secondary" className="mt-2">
                            <Award className="w-3 h-3 mr-1" />
                            {achievement.points} pts
                          </Badge>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          <Card className={`border-l-4 ${pal.borderColor}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Pro Tip
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground font-medium">{pal.tips[currentTip]}</p>
              <div className="flex gap-1 mt-3">
                {pal.tips.map((_, idx) => (
                  <div key={idx} className={`h-1 flex-1 rounded-full transition-all ${idx === currentTip ? 'bg-primary' : 'bg-muted'}`} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </>
  );
}
