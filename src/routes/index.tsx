import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Hero } from "@/components/site/Hero";
import { CreativesShowcase } from "@/components/site/CreativesShowcase";
import { Steps } from "@/components/site/Steps";
import { BrandDna } from "@/components/site/BrandDna";
import { ContentCalendar } from "@/components/site/ContentCalendar";
import { Stats } from "@/components/site/Stats";
import { Comparison } from "@/components/site/Comparison";
import { Testimonials } from "@/components/site/Testimonials";
import { Team } from "@/components/site/Team";
import { Faq } from "@/components/site/Faq";
import { FinalCta } from "@/components/site/FinalCta";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Palmer House Productions — Video Systems That Solve Business Problems" },
      {
        name: "description",
        content:
          "Palmer House Productions builds video systems for Pacific Northwest businesses — one shoot day delivers a content library for social, web, and training.",
      },
      { property: "og:title", content: "Palmer House Productions — Build Your Video Library, One Shoot At A Time" },
      {
        property: "og:description",
        content:
          "Strategic video content production serving Seattle, Bellevue, Tacoma, and Portland. We don't just make videos; we solve business problems with them.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-background">
      <Nav />
      <Hero />
      <CreativesShowcase />
      <Steps />
      <BrandDna />
      <ContentCalendar />
      <Stats />
      <Comparison />
      <Testimonials />
      <Team />
      <Faq />
      <FinalCta />
    </main>
  );
}
