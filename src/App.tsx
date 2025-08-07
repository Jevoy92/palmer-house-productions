
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { StructuredData } from "@/components/seo/StructuredData";
import { BreadcrumbNavigation } from "@/components/seo/BreadcrumbNavigation";
import { EnhancedFooter } from "@/components/seo/EnhancedFooter";
import Index from "./pages/Index";
import VideoPackages from "./pages/VideoPackages";

import ClientResults from "./pages/ClientResults";
import VideoUseCases from "./pages/VideoUseCases";
import AboutUs from "./pages/AboutUs";
import Podcast from "./pages/Podcast";
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
import ContentStrategy from "./pages/ContentStrategy";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <StructuredData />
        <BreadcrumbNavigation />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/video-packages" element={<VideoPackages />} />
          <Route path="/discovery-call" element={<Navigate to="/contact" replace />} />
          <Route path="/client-results" element={<ClientResults />} />
          <Route path="/video-use-cases" element={<VideoUseCases />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/podcast" element={<Podcast />} />
          <Route path="/contact" element={<Contact />} />
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
          
          {/* Legacy route redirects */}
          <Route path="/pathways" element={<Navigate to="/video-packages" replace />} />
          <Route path="/glimpse" element={<Navigate to="/contact" replace />} />
          <Route path="/reviews" element={<Navigate to="/client-results" replace />} />
          <Route path="/arsenal" element={<Navigate to="/video-use-cases" replace />} />
          <Route path="/about" element={<Navigate to="/about-us" replace />} />
          <Route path="/team" element={<Navigate to="/about-us" replace />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <EnhancedFooter />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
