
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { StructuredData } from "@/components/seo/StructuredData";
import { BreadcrumbNavigation } from "@/components/seo/BreadcrumbNavigation";
import { EnhancedFooter } from "@/components/seo/EnhancedFooter";
import Index from "./pages/Index";
import VideoPackages from "./pages/VideoPackages";

import VideoUseCases from "./pages/VideoUseCases";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import DIYDownloads from "./pages/services/DIYDownloads";
import GroupCoaching from "./pages/services/GroupCoaching";
import MonthlyContent from "./pages/services/MonthlyContent";
import Team from "./pages/company/Team";
import Values from "./pages/company/Values";
import Reviews from "./pages/resources/Reviews";
import FAQ from "./pages/FAQ";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import BellevueWA from "./pages/locations/BellevueWA";
import PortlandOR from "./pages/locations/PortlandOR";
import ContentStrategy from "./pages/ContentStrategy";
import Blog from "./pages/Blog";
import VideoContentToolkit2025 from "./pages/blog/VideoContentToolkit2025";
import AutomateEmployeeTrainingVideo from "./pages/blog/AutomateEmployeeTrainingVideo";
import ContentCreationTools2025 from "./pages/blog/ContentCreationTools2025";
import VideoContentROIComparison from "./pages/blog/VideoContentROIComparison";
import PsychologyOfVideo from "./pages/blog/PsychologyOfVideo";
import DIYVideoFails from "./pages/blog/DIYVideoFails";
import ScriptWritingSecrets from "./pages/blog/ScriptWritingSecrets";
import LightingAudioBasics from "./pages/blog/LightingAudioBasics";
import BrandStorytellingVideo from "./pages/blog/BrandStorytellingVideo";
import VideoMetricsMatter from "./pages/blog/VideoMetricsMatter";
import EditingLikePro from "./pages/blog/EditingLikePro";
import MobileVideoProduction from "./pages/blog/MobileVideoProduction";
import SocialMediaVideoOptimization from "./pages/blog/SocialMediaVideoOptimization";
import VideoSEOMastery from "./pages/blog/VideoSEOMastery";
import LiveStreamingBusiness from "./pages/blog/LiveStreamingBusiness";
import CustomerTestimonialVideos from "./pages/blog/CustomerTestimonialVideos";
import VideoProductionBudget from "./pages/blog/VideoProductionBudget";
import RemoteVideoCollaboration from "./pages/blog/RemoteVideoCollaboration";
import OverwhelmedToAuthority from "./pages/blog/OverwhelmedToAuthority";
import VideoMarketingSaaS from "./pages/blog/VideoMarketingSaaS";
import ThankYou from "./pages/ThankYou";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <StructuredData />
        <BreadcrumbNavigation />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/video-packages" element={<VideoPackages />} />
          <Route path="/discovery-call" element={<Navigate to="/contact" replace />} />
          <Route path="/video-use-cases" element={<VideoUseCases />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/locations/bellevue-wa" element={<BellevueWA />} />
          <Route path="/locations/portland-or" element={<PortlandOR />} />
          <Route path="/services/diy-downloads" element={<DIYDownloads />} />
          <Route path="/services/group-coaching" element={<GroupCoaching />} />
          <Route path="/services/monthly-content" element={<MonthlyContent />} />
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
          <Route path="/blog/psychology-of-video" element={<PsychologyOfVideo />} />
          <Route path="/blog/diy-video-fails" element={<DIYVideoFails />} />
          <Route path="/blog/script-writing-secrets" element={<ScriptWritingSecrets />} />
          <Route path="/blog/lighting-audio-basics" element={<LightingAudioBasics />} />
          <Route path="/blog/brand-storytelling-video" element={<BrandStorytellingVideo />} />
          <Route path="/blog/video-metrics-matter" element={<VideoMetricsMatter />} />
          <Route path="/blog/editing-like-pro" element={<EditingLikePro />} />
          <Route path="/blog/mobile-video-production" element={<MobileVideoProduction />} />
          <Route path="/blog/social-media-video-optimization" element={<SocialMediaVideoOptimization />} />
          <Route path="/blog/video-seo-mastery" element={<VideoSEOMastery />} />
          <Route path="/blog/live-streaming-business" element={<LiveStreamingBusiness />} />
          <Route path="/blog/customer-testimonial-videos" element={<CustomerTestimonialVideos />} />
          <Route path="/blog/video-production-budget" element={<VideoProductionBudget />} />
          <Route path="/blog/remote-video-collaboration" element={<RemoteVideoCollaboration />} />
          <Route path="/blog/overwhelmed-to-authority" element={<OverwhelmedToAuthority />} />
          <Route path="/blog/video-marketing-saas" element={<VideoMarketingSaaS />} />
          
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
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
