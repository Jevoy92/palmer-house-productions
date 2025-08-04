
import { Navigation } from "@/components/Navigation";
import { About } from "@/components/About";
import { Team } from "@/components/Team";
import { Values } from "@/components/Values";
import { SkipLink } from "@/components/ui/skip-link";
import { MainContent } from "@/components/MainContent";

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <Navigation />
      <MainContent>
        <About />
        <Team />
        <Values />
      </MainContent>
    </div>
  );
};

export default AboutUsPage;
