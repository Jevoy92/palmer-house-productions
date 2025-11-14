import { Suspense, lazy, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import { StructuredData } from "@/components/seo/StructuredData";
import { BreadcrumbNavigation } from "@/components/seo/BreadcrumbNavigation";
import { EnhancedFooter } from "@/components/seo/EnhancedFooter";
import { PageTransition } from '@/components/PageTransition';
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import { trackPageView } from "@/lib/analytics";
import { Canonical } from "@/components/seo/Canonical";
import { AnimationOptimizer } from "@/components/performance/AnimationOptimizer";
import { CriticalStyles } from "@/components/performance/CriticalStyles";
import Index from "./pages/Index";
import Pals from "./pages/Pals";
import ReelPal from "./pages/ReelPal";
import SystemPal from "./pages/SystemPal";
import EvergreenPal from "./pages/EvergreenPal";
import SpotlightPal from "./pages/SpotlightPal";

import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import DIYDownloads from "./pages/services/DIYDownloads";
import VideoProduction from "./pages/services/VideoProduction";
import PostProduction from "./pages/services/PostProduction";
import Startups from "./pages/Startups";
import Reviews from "./pages/resources/Reviews";
import FAQ from "./pages/FAQ";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import BellevueWA from "./pages/locations/BellevueWA";
import PortlandOR from "./pages/locations/PortlandOR";
import Healthcare from "./pages/industries/Healthcare";
import Manufacturing from "./pages/industries/Manufacturing";
import ProfessionalServices from "./pages/industries/ProfessionalServices";
import Education from "./pages/industries/Education";
import Government from "./pages/industries/Government";
import Technology from "./pages/industries/Technology";
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
import StyleGuide from "./pages/StyleGuide";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import ContentSystemBuilder from "./pages/tools/ContentSystemBuilder";
import SeriesBuilder from "./pages/tools/SeriesBuilder";
import PersonaGenerator from "./pages/tools/PersonaGenerator";
import ProductionAssistant from "./pages/tools/ProductionAssistant";
import ContentMaximizer from "./pages/tools/ContentMaximizer";
import EngagementResponder from "./pages/tools/EngagementResponder";
import AppPricing from "./pages/AppPricing";
import Memberships from "./pages/Memberships";
import ProductionPricing from "./pages/ProductionPricing";

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
    <ErrorBoundary>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
          <PageTransition>
          <CriticalStyles />
          <CriticalCSS />
          <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />
          <AnimationOptimizer />
          <Navigation />
          <ScrollToTop />
          <ScrollToTopButton />
          <StructuredData />
          <Canonical />
          <BreadcrumbNavigation />
          <RouteTracker />
          <div className="pt-20">
            <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/tools/content-system-builder" element={<ProtectedRoute><ContentSystemBuilder /></ProtectedRoute>} />
            <Route path="/tools/series-builder" element={<ProtectedRoute><SeriesBuilder /></ProtectedRoute>} />
          <Route path="/tools/persona-generator" element={<ProtectedRoute><PersonaGenerator /></ProtectedRoute>} />
          <Route path="/tools/production-assistant" element={<ProtectedRoute><ProductionAssistant /></ProtectedRoute>} />
          <Route path="/tools/content-maximizer" element={<ProtectedRoute><ContentMaximizer /></ProtectedRoute>} />
          <Route path="/tools/engagement-responder" element={<ProtectedRoute><EngagementResponder /></ProtectedRoute>} />
          <Route path="/app-pricing" element={<AppPricing />} />
          <Route path="/pals" element={<Pals />} />
          <Route path="/reel-pal" element={<ReelPal />} />
          <Route path="/system-pal" element={<SystemPal />} />
          <Route path="/evergreen-pal" element={<EvergreenPal />} />
          <Route path="/spotlight-pal" element={<SpotlightPal />} />
          <Route path="/discovery-call" element={<Navigate to="/contact" replace />} />
          <Route path="/about-us" element={<AboutUs />} />
           <Route path="/memberships" element={<Memberships />} />
           <Route path="/production-pricing" element={<ProductionPricing />} />
           <Route path="/contact" element={<Contact />} />
          <Route path="/thank-you" element={<ThankYou />} />
           <Route path="/locations/bellevue-wa" element={<BellevueWA />} />
           <Route path="/locations/portland-or" element={<PortlandOR />} />
           <Route path="/services/diy-downloads" element={<DIYDownloads />} />
           <Route path="/services/video-production" element={<VideoProduction />} />
           <Route path="/services/post-production" element={<PostProduction />} />
           <Route path="/startups" element={<Startups />} />
           <Route path="/industries/healthcare" element={<Healthcare />} />
           <Route path="/industries/manufacturing" element={<Manufacturing />} />
           <Route path="/industries/professional-services" element={<ProfessionalServices />} />
           <Route path="/industries/education" element={<Education />} />
           <Route path="/industries/government" element={<Government />} />
           <Route path="/industries/technology" element={<Technology />} />
           <Route path="/services/group-coaching" element={<Navigate to="/contact" replace />} />
           <Route path="/services/monthly-content" element={<Navigate to="/contact" replace />} />
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
             <Route path="/style-guide" element={<StyleGuide />} />
           
            {/* Legacy route redirects */}
           <Route path="/pathways" element={<Navigate to="/contact" replace />} />
           <Route path="/video-packages" element={<Navigate to="/pals" replace />} />
           <Route path="/glimpse" element={<Navigate to="/contact" replace />} />
           <Route path="/reviews" element={<Navigate to="/resources/reviews" replace />} />
           <Route path="/arsenal" element={<Navigate to="/about-us" replace />} />
           <Route path="/video-use-cases" element={<Navigate to="/about-us" replace />} />
           <Route path="/about" element={<Navigate to="/about-us" replace />} />
           <Route path="/team" element={<Navigate to="/about-us" replace />} />
           <Route path="/company/team" element={<Navigate to="/about-us" replace />} />
           <Route path="/company/values" element={<Navigate to="/about-us" replace />} />
          
           {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
           <Route path="*" element={<NotFound />} />
           </Routes>
          </div>
           <EnhancedFooter />
        </PageTransition>
          </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
    </ErrorBoundary>
  </QueryClientProvider>
);

export default App;
