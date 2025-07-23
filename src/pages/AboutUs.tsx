
import { Navigation } from "@/components/Navigation";
import { About } from "@/components/About";
import { Team } from "@/components/Team";
import { Values } from "@/components/Values";

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <About />
      <Team />
      <Values />
    </div>
  );
};

export default AboutUsPage;
