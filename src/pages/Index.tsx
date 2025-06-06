
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Team } from "@/components/Team";
import { Services } from "@/components/Services";
import { Clients } from "@/components/Clients";
import { Pricing } from "@/components/Pricing";
import { Values } from "@/components/Values";
import { Contact } from "@/components/Contact";
import { Navigation } from "@/components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navigation />
      <Hero />
      <About />
      <Team />
      <Services />
      <Clients />
      <Pricing />
      <Values />
      <Contact />
    </div>
  );
};

export default Index;
