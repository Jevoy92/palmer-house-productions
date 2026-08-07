import { useState, useEffect } from 'react';
import { MetaTags } from '@/components/seo/MetaTags';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { HeroBanner } from '@/components/dashboard/HeroBanner';
import { ToolProgressCards } from '@/components/dashboard/ToolProgressCards';
import { ContinueCreating } from '@/components/dashboard/ContinueCreating';
import { PalAvatarSelector } from '@/components/dashboard/PalAvatarSelector';
import { SystemCompletionCard } from '@/components/dashboard/SystemCompletionCard';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Target } from 'lucide-react';

export default function Dashboard() {
  const user: { id: string; email?: string; user_metadata?: any } | null = null;
  const [favoritePal, setFavoritePal] = useState<string>('reel');
  const [showPalSelector, setShowPalSelector] = useState(false);
  const [userIndustry, setUserIndustry] = useState<string>('');
  const [totalProgress, setTotalProgress] = useState(0);
  const [palProgress, setPalProgress] = useState({ reel: 0, evergreen: 0, spotlight: 0, system: 0 });

  useEffect(() => {
    if (user) {
      fetchFavoritePal();
      fetchUserIndustry();
      fetchSystemProgress();
    }
  }, [user]);

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
      setTotalProgress(totalData);
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

  const fetchFavoritePal = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('profiles')
      .select('favorite_pal')
      .eq('id', user.id)
      .single();

    if (data?.favorite_pal) {
      setFavoritePal(data.favorite_pal);
    }
  };

  return (
    <>
      <MetaTags 
        title="Dashboard - Palmer House Content OS"
        description="Access your video creation tools and manage your content system"
      />

      <DashboardLayout rightSidebar={<DashboardStats />}>
        <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">
          <Card className="p-6 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <div className="flex items-start gap-4">
              <Target className="w-12 h-12 text-primary flex-shrink-0" />
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">
                  Building Your Complete {userIndustry ? userIndustry.charAt(0).toUpperCase() + userIndustry.slice(1) : 'Business'} Video System
                </h2>
                <p className="text-muted-foreground mb-4">
                  Every successful {userIndustry || 'business'} needs a comprehensive video marketing system. 
                  Complete your video checklist across all Pals to build the foundation for long-term success.
                </p>
                <div className="flex items-center gap-2 text-sm font-medium">
                  <span className="text-primary text-lg">{totalProgress}%</span>
                  <span className="text-muted-foreground">Complete</span>
                </div>
              </div>
            </div>
          </Card>

          <SystemCompletionCard totalProgress={totalProgress} palProgress={palProgress} />
          <HeroBanner />
          <ToolProgressCards />
          <ContinueCreating />
        </div>

        <PalAvatarSelector
          open={showPalSelector}
          onOpenChange={setShowPalSelector}
          currentPal={favoritePal}
          onPalChange={setFavoritePal}
        />
      </DashboardLayout>
    </>
  );
}
