import SWFSHeader from "../components/swfs/SWFSHeader";
import HeroSection from "../components/swfs/HeroSection";
import AudienceSection from "../components/swfs/AudienceSection";
import WhyItMattersSection from "../components/swfs/WhyItMattersSection";
import DeliverablesSection from "../components/swfs/DeliverablesSection";
import PlatformSection from "../components/swfs/PlatformSection";
import ServicesSection from "../components/swfs/ServicesSection";
import PricingSection from "../components/swfs/PricingSection";
import TestimonialsSection from "../components/swfs/TestimonialsSection";
import ClosingCTA from "../components/swfs/ClosingCTA";
import Footer from "../components/swfs/Footer";

export default function SuddenWealthFilmSystem() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SWFSHeader />
      <main>
        <HeroSection />
        <AudienceSection />
        <WhyItMattersSection />
        <DeliverablesSection />
        <PlatformSection />
        <ServicesSection />
        <PricingSection />
        <TestimonialsSection />
        <ClosingCTA />
      </main>
      <Footer />
    </div>
  );
}
