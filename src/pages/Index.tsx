
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Team } from "@/components/Team";
import { Services } from "@/components/Services";
import { Reviews } from "@/components/Reviews";
import { Clients } from "@/components/Clients";
import { Pricing } from "@/components/Pricing";
import { Values } from "@/components/Values";
import { Contact } from "@/components/Contact";
import { Navigation } from "@/components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <div id="about">
        <About />
      </div>
      <div id="team">
        <Team />
      </div>
      <div id="services">
        <Services />
      </div>
      <div id="reviews">
        <Reviews />
      </div>
      <Clients />
      <div id="pricing">
        <Pricing />
      </div>
      <Values />
      <div id="contact">
        <Contact />
      </div>
    </div>
  );
};

export default Index;
