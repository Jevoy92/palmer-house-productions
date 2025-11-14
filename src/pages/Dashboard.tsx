import { useState, useEffect } from 'react';
import { MetaTags } from '@/components/seo/MetaTags';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { TopNavigation } from '@/components/dashboard/TopNavigation';
import { MobileTopBar } from '@/components/dashboard/MobileTopBar';
import { SimplifiedSidebar } from '@/components/dashboard/SimplifiedSidebar';
import { BottomNavigation } from '@/components/dashboard/BottomNavigation';
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

      {/* Mobile Top Bar */}
      <MobileTopBar 
        favoritePal={favoritePal} 
        onAvatarClick={() => setShowPalSelector(true)}
      />

      {/* Desktop Top Navigation */}
      <TopNavigation />

      <div className="min-h-screen w-full flex pb-16 lg:pb-0 lg:pt-16 lg:pl-64 xl:pr-80">
        {/* Desktop Left Sidebar */}
        <SimplifiedSidebar />

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto bg-background">
          <div className="max-w-7xl mx-auto p-3 md:p-4 space-y-4">
            {/* Hero Banner */}
            <HeroBanner />

            {/* Tool Progress Cards */}
            <div>
              <h3 className="text-base font-semibold text-foreground mb-2">Recent Activity</h3>
              <ToolProgressCards />
            </div>

            {/* Continue Creating Section */}
            <div>
              <h3 className="text-base font-semibold text-foreground mb-2">Continue Creating</h3>
              <ContinueCreating />
            </div>
          </div>
        </main>

        {/* Right Stats Sidebar - Desktop Only */}
        <aside className="hidden xl:block xl:fixed xl:top-16 xl:right-0 xl:bottom-0 w-80 border-l border-border overflow-y-auto bg-background">
          <div className="p-3">
            <DashboardStats 
              favoritePal={favoritePal}
              onChangePal={() => setShowPalSelector(true)}
            />
          </div>
        </aside>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNavigation />

      {/* Pal Avatar Selector Modal */}
      <PalAvatarSelector
        open={showPalSelector}
        onOpenChange={setShowPalSelector}
        currentPal={favoritePal}
        onPalChange={setFavoritePal}
      />
    </>
  );
}
