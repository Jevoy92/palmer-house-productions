import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Hero } from "@/components/site/Hero";
import { CreativesShowcase } from "@/components/site/CreativesShowcase";
import { BrandDna } from "@/components/site/BrandDna";
import { ContentCalendar } from "@/components/site/ContentCalendar";
import { Stats } from "@/components/site/Stats";
import { Comparison } from "@/components/site/Comparison";
import { Testimonials } from "@/components/site/Testimonials";
import { Team } from "@/components/site/Team";
import { Faq } from "@/components/site/Faq";
import { FinalCta } from "@/components/site/FinalCta";
import { PackageShelf } from "@/components/site/HomeLandingExtras";
import { HOME_FAQS } from "@/data/site-faqs";
import { createSeo, faqSchema, jsonLdScript, schemaGraph, SITE_DESCRIPTION } from "@/lib/seo";

const TITLE = "Palmer House Productions — Video Systems That Solve Business Problems";

export const Route = createFileRoute("/")({
  head: () => ({
    ...createSeo({ title: TITLE, description: SITE_DESCRIPTION, pathname: "/" }),
    scripts: [jsonLdScript(schemaGraph(faqSchema(HOME_FAQS)))],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen overflow-x-clip bg-background">
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white shadow-soft transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <SiteNav />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <CreativesShowcase />
        <div className="render-lazy">
          <PackageShelf />
        </div>
        <div className="render-lazy">
          <BrandDna />
        </div>
        <div className="render-lazy">
          <ContentCalendar />
        </div>
        <div className="render-lazy">
          <Stats />
        </div>
        <div className="render-lazy">
          <Comparison />
        </div>
        <div className="render-lazy">
          <Testimonials />
        </div>
        <div className="render-lazy">
          <Team />
        </div>
        <div className="render-lazy">
          <Faq />
        </div>
        <div className="render-lazy">
          <FinalCta />
        </div>
      </main>
      <div className="render-lazy">
        <SiteFooter />
      </div>
    </div>
  );
}
