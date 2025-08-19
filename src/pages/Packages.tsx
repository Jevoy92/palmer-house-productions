import { Navigation } from "@/components/Navigation";
import { PackageCatalog } from "@/components/pricing/PackageCatalog";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import { MetaTags } from "@/components/seo/MetaTags";
import { StructuredData } from "@/components/seo/StructuredData";
import { BreadcrumbNavigation } from "@/components/seo/BreadcrumbNavigation";
import { SkipLink } from "@/components/ui/skip-link";
import { MainContent } from "@/components/MainContent";
import { FAQSchema } from "@/components/seo/FAQSchema";

const PackagesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <MetaTags 
        title="Video Production Packages & Services | Palmer House Productions"
        description="Comprehensive video production packages for businesses. From brand storytelling to industry-specific content, find the perfect video solution for your needs."
        keywords="video production packages, business video services, brand storytelling videos, product videos, event coverage, industry video solutions"
        ogTitle="Video Production Packages | Palmer House Productions"
        ogDescription="Comprehensive video production packages for businesses. From brand storytelling to industry-specific content, find the perfect video solution for your needs."
      />
      <GoogleAnalytics measurementId="G-HTFNMQRWLL" />
      <StructuredData type="packages" />
      <FAQSchema
        faqs={[
          { question: 'What types of video packages do you offer?', answer: 'We offer packages in 6 main categories: Brand & Storytelling, Product & Sales, Events & Experiences, Industry Solutions, Social & Community, and Creative & Animation.' },
          { question: 'How do I choose the right package?', answer: 'Start by identifying your primary goal - brand awareness, product demos, event coverage, etc. Each category is designed for specific business objectives.' },
          { question: 'Can packages be customized?', answer: 'Yes, all packages can be customized to fit your specific needs. We also offer add-ons and modifications during our strategy consultation.' },
          { question: 'What is the typical timeline for packages?', answer: 'Most packages take 2-4 weeks to complete, depending on complexity. Event coverage and some specialized packages may have different timelines.' },
          { question: 'Do you offer monthly retainer options?', answer: 'Yes, we offer a Content Systems Retainer starting at $5,000/month for businesses needing consistent video output.' }
        ]}
      />
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <Navigation />
      <BreadcrumbNavigation />
      <MainContent>
        <h1 className="sr-only">Video Production Packages and Services</h1>
        <PackageCatalog />
      </MainContent>
    </div>
  );
};

export default PackagesPage;