
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import VideoPackages from "./pages/VideoPackages";
import DiscoveryCall from "./pages/DiscoveryCall";
import ClientResults from "./pages/ClientResults";
import VideoUseCases from "./pages/VideoUseCases";
import AboutUs from "./pages/AboutUs";
import Podcast from "./pages/Podcast";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/video-packages" element={<VideoPackages />} />
          <Route path="/discovery-call" element={<DiscoveryCall />} />
          <Route path="/client-results" element={<ClientResults />} />
          <Route path="/video-use-cases" element={<VideoUseCases />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/podcast" element={<Podcast />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Legacy route redirects */}
          <Route path="/pathways" element={<Navigate to="/video-packages" replace />} />
          <Route path="/glimpse" element={<Navigate to="/discovery-call" replace />} />
          <Route path="/reviews" element={<Navigate to="/client-results" replace />} />
          <Route path="/arsenal" element={<Navigate to="/video-use-cases" replace />} />
          <Route path="/about" element={<Navigate to="/about-us" replace />} />
          <Route path="/team" element={<Navigate to="/about-us" replace />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
