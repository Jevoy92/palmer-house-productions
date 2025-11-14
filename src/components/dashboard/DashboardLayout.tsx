import { ReactNode } from 'react';
import { TopNavigation } from './TopNavigation';
import { MobileTopBar } from './MobileTopBar';
import { SimplifiedSidebar } from './SimplifiedSidebar';
import { BottomNavigation } from './BottomNavigation';

interface DashboardLayoutProps {
  children: ReactNode;
  rightSidebar?: ReactNode;
  showMobileTopBar?: boolean;
}

export function DashboardLayout({ children, rightSidebar, showMobileTopBar = true }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen w-full bg-background">
      {/* Mobile Top Bar */}
      {showMobileTopBar && (
        <div className="lg:hidden">
          <MobileTopBar />
        </div>
      )}

      {/* Desktop Top Navigation */}
      <div className="hidden lg:block">
        <TopNavigation />
      </div>

      {/* Main Layout Container */}
      <div className="min-h-screen w-full flex pb-16 lg:pb-0 lg:pt-16 lg:pl-64">
        {/* Desktop Left Sidebar */}
        <SimplifiedSidebar />

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>

        {/* Right Sidebar (optional) - Desktop Only */}
        {rightSidebar && (
          <aside className="hidden xl:block xl:fixed xl:top-16 xl:right-0 xl:bottom-0 w-80 border-l border-border overflow-y-auto bg-background">
            {rightSidebar}
          </aside>
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
