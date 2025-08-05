
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Clients } from "@/components/Clients";
import { SolutionsOverview } from "@/components/SolutionsOverview";
import { Contact } from "@/components/Contact";
import { Navigation } from "@/components/Navigation";
import { SkipLink } from "@/components/ui/skip-link";
import { MainContent } from "@/components/MainContent";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <Navigation />
      <MainContent>
        <Hero />
        <div id="services">
          <Services />
        </div>
        <Clients />
        <div id="pricing">
          <SolutionsOverview />
        </div>
        <div id="contact">
          <Contact />
        </div>
      </MainContent>
    </div>
  );
};

export default Index;
