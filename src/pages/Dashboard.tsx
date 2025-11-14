import { MetaTags } from '@/components/seo/MetaTags';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { HeroBanner } from '@/components/dashboard/HeroBanner';
import { ToolProgressCards } from '@/components/dashboard/ToolProgressCards';
import { ContinueCreating } from '@/components/dashboard/ContinueCreating';

export default function Dashboard() {
  return (
    <>
      <MetaTags 
        title="Dashboard - Palmer House Content OS"
        description="Access your video creation tools and manage your content system"
      />

      <DashboardLayout rightSidebar={<DashboardStats />}>
        <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">
          <HeroBanner />
          <ToolProgressCards />
          <ContinueCreating />
        </div>
      </DashboardLayout>
    </>
  );
}
