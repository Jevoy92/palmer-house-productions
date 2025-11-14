import { useState, useEffect } from 'react';
import { MetaTags } from '@/components/seo/MetaTags';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { HeroBanner } from '@/components/dashboard/HeroBanner';
import { ToolProgressCards } from '@/components/dashboard/ToolProgressCards';
import { ContinueCreating } from '@/components/dashboard/ContinueCreating';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { PalAvatarSelector } from '@/components/dashboard/PalAvatarSelector';

export default function Dashboard() {
  const { user } = useAuth();
  const [favoritePal, setFavoritePal] = useState('reel');
  const [showPalSelector, setShowPalSelector] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('favorite_pal')
        .eq('id', user.id)
        .single();

      if ((data as any)?.favorite_pal) {
        setFavoritePal((data as any).favorite_pal);
      }
    };

    fetchProfile();
  }, [user]);

  return (
    <>
      <MetaTags
        title="Dashboard | Palmer House Productions Content OS"
        description="Access your video series builder, persona generator, production assistant, and more content creation tools."
        canonicalUrl="https://www.palmerhouseproductions.com/dashboard"
      />

      <DashboardLayout
        rightSidebar={
          <div className="p-3">
            <DashboardStats 
              favoritePal={favoritePal}
              onChangePal={() => setShowPalSelector(true)}
            />
          </div>
        }
      >
        <div className="max-w-7xl mx-auto px-3 md:px-4 pt-0 space-y-4">
          <HeroBanner />

          <div>
            <h3 className="text-base font-semibold text-foreground mb-2">Recent Activity</h3>
            <ToolProgressCards />
          </div>

          <div>
            <h3 className="text-base font-semibold text-foreground mb-2">Continue Creating</h3>
            <ContinueCreating />
          </div>
        </div>
      </DashboardLayout>

      <PalAvatarSelector
        open={showPalSelector}
        onOpenChange={setShowPalSelector}
        currentPal={favoritePal}
        onPalChange={setFavoritePal}
      />
    </>
  );
}
