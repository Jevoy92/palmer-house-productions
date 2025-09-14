import { Suspense, lazy, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { ScrollToTop } from "@/components/ScrollToTop";
import { StructuredData } from "@/components/seo/StructuredData";
import { BreadcrumbNavigation } from "@/components/seo/BreadcrumbNavigation";
import { EnhancedFooter } from "@/components/seo/EnhancedFooter";
import { PageTransition } from '@/components/PageTransition';
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import { trackPageView } from "@/lib/analytics";
import { Canonical } from "@/components/seo/Canonical";
import Index from "./pages/Index";
import VideoPackages from "./pages/VideoPackages";
import Pals from "./pages/Pals";
import ReelPal from "./pages/ReelPal";
import SystemPal from "./pages/SystemPal";
import EvergreenPal from "./pages/EvergreenPal";
import SpotlightPal from "./pages/SpotlightPal";

import VideoUseCases from "./pages/VideoUseCases";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import DIYDownloads from "./pages/services/DIYDownloads";
import Team from "./pages/company/Team";
import Values from "./pages/company/Values";
import Reviews from "./pages/resources/Reviews";
import FAQ from "./pages/FAQ";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import TestPage from "./pages/TestPage";
import BellevueWA from "./pages/locations/BellevueWA";
import PortlandOR from "./pages/locations/PortlandOR";
import { CriticalCSS } from "./components/performance/CriticalCSS";
import ContentStrategy from "./pages/ContentStrategy";
import Blog from "./pages/Blog";
import VideoContentToolkit2025 from "./pages/blog/VideoContentToolkit2025";
import AutomateEmployeeTrainingVideo from "./pages/blog/AutomateEmployeeTrainingVideo";
import ContentCreationTools2025 from "./pages/blog/ContentCreationTools2025";
import VideoContentROIComparison from "./pages/blog/VideoContentROIComparison";
import MobileVideoProduction from "./pages/blog/MobileVideoProduction";
import ThankYou from "./pages/ThankYou";
import { MobileFirstOptimization } from "@/components/MobileFirstOptimization";

const VideoReadinessPage = lazy(() => import("./pages/assessments/VideoReadiness"));

const queryClient = new QueryClient();

// Google Analytics Measurement ID (replace with actual GA4 ID when available)
const GA_MEASUREMENT_ID = "G-HTFNMQRWLL";

// Route tracking component
function RouteTracker() {
  const location = useLocation();

  useEffect(() => {
    // Track page views on route changes
    trackPageView(location.pathname, document.title);
  }, [location]);

  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <PageTransition>
          <CriticalCSS />
          <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />
          <Navigation />
          <ScrollToTop />
          <StructuredData />
          <Canonical />
          <BreadcrumbNavigation />
          <RouteTracker />
          <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/pals" element={<Pals />} />
          <Route path="/reel-pal" element={<ReelPal />} />
          <Route path="/system-pal" element={<SystemPal />} />
          <Route path="/evergreen-pal" element={<EvergreenPal />} />
          <Route path="/spotlight-pal" element={<SpotlightPal />} />
          <Route path="/video-packages" element={<VideoPackages />} />
          <Route path="/discovery-call" element={<Navigate to="/contact" replace />} />
          <Route path="/video-use-cases" element={<VideoUseCases />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/locations/bellevue-wa" element={<BellevueWA />} />
          <Route path="/locations/portland-or" element={<PortlandOR />} />
          <Route path="/services/diy-downloads" element={<DIYDownloads />} />
          <Route path="/services/group-coaching" element={<Navigate to="/video-packages" replace />} />
          <Route path="/services/monthly-content" element={<Navigate to="/video-packages" replace />} />
          <Route path="/company/team" element={<Team />} />
          <Route path="/company/values" element={<Values />} />
          <Route path="/resources/reviews" element={<Reviews />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/content-strategy" element={<ContentStrategy />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/video-content-toolkit-2025" element={<VideoContentToolkit2025 />} />
          <Route path="/blog/automate-employee-training-video" element={<AutomateEmployeeTrainingVideo />} />
          <Route path="/blog/content-creation-tools-2025" element={<ContentCreationTools2025 />} />
           <Route path="/blog/video-content-roi-comparison" element={<VideoContentROIComparison />} />
           <Route path="/blog/mobile-video-production" element={<MobileVideoProduction />} />
           <Route path="/test" element={<TestPage />} />
           <Route
             path="/assessments/video-readiness"
             element={
               <Suspense fallback={<div className="p-8 text-center">Loading assessment...</div>}>
                 <VideoReadinessPage />
               </Suspense>
             }
           />
          
          {/* Legacy route redirects */}
          <Route path="/pathways" element={<Navigate to="/video-packages" replace />} />
          <Route path="/glimpse" element={<Navigate to="/contact" replace />} />
          <Route path="/reviews" element={<Navigate to="/resources/reviews" replace />} />
          <Route path="/arsenal" element={<Navigate to="/video-use-cases" replace />} />
          <Route path="/about" element={<Navigate to="/about-us" replace />} />
          <Route path="/team" element={<Navigate to="/company/team" replace />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
          </Routes>
          <EnhancedFooter />
        </PageTransition>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
