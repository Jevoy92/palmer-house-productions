import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
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
      { title: "Holo — AI Marketing Tool for Ads, Emails & Social Posts" },
      {
        name: "description",
        content:
          "Holo turns your website into ads, emails, and social posts. Launch 10x more content, 75% faster, with AI that learns your brand DNA.",
      },
      { property: "og:title", content: "Holo — Launch 10x more content, 75% faster" },
      {
        property: "og:description",
        content:
          "AI for marketing: hundreds of on-brand ads, emails, and social posts generated while you sleep.",
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
