
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Clients } from "@/components/Clients";
import { SolutionsOverview } from "@/components/SolutionsOverview";
import { Contact } from "@/components/Contact";
import { Navigation } from "@/components/Navigation";
import { CollapsibleAbout } from "@/components/home/CollapsibleAbout";
import { CollapsibleTeam } from "@/components/home/CollapsibleTeam";
import { CollapsibleValues } from "@/components/home/CollapsibleValues";
import { CollapsibleReviews } from "@/components/home/CollapsibleReviews";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <div id="about">
        <CollapsibleAbout />
      </div>
      <div id="team">
        <CollapsibleTeam />
      </div>
      <div id="services">
        <Services />
      </div>
      <div id="reviews">
        <CollapsibleReviews />
      </div>
      <Clients />
      <div id="pricing">
        <SolutionsOverview />
      </div>
      <CollapsibleValues />
      <div id="contact">
        <Contact />
      </div>
    </div>
  );
};

export default Index;
