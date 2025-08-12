import { useLocation } from "react-router-dom";
import { BRAND_ENTITY } from "@/lib/brand-entity";

interface StructuredDataProps {
  type?: "homepage" | "about" | "services" | "contact" | "packages";
}

export const StructuredData = ({ type }: StructuredDataProps) => {
  const location = useLocation();
  
  // Auto-detect page type based on route if not provided
  const getPageType = (): "homepage" | "about" | "services" | "contact" | "packages" => {
    if (type) return type;
    
    const path = location.pathname;
    switch (path) {
      case "/about-us":
        return "about";
      case "/video-packages":
        return "packages";
      case "/contact":
        return "contact";
      case "/video-use-cases":
      case "/discovery-call":
        return "services";
      default:
        return "homepage";
    }
  };
  
  const pageType = getPageType();
  
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": BRAND_ENTITY.legalName,
    "description": "Professional video production services for bold brands. Short-form cinematic storytelling that scales your business.",
    "url": BRAND_ENTITY.url,
    "@id": BRAND_ENTITY.organizationId,
    "telephone": BRAND_ENTITY.telephone,
    "email": BRAND_ENTITY.email,
    "logo": BRAND_ENTITY.logo,
    "image": BRAND_ENTITY.image,
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "sameAs": BRAND_ENTITY.sameAs,
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Video Production Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Corporate Video Production",
            "description": "Professional corporate video production services"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Cinematic Storytelling",
            "description": "Short-form cinematic storytelling for brands"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Video Marketing",
            "description": "Strategic video marketing solutions"
          }
        }
      ]
    }
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Video Production Services",
    "description": "Professional video production and cinematic storytelling services for bold brands",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Palmer House Productions",
      "url": "https://www.palmerhouseproductions.com"
    },
    "areaServed": ["Worldwide", "Bellevue, WA", "Portland, OR"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Video Production Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Corporate Video Production"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Brand Storytelling"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Video Marketing"
          }
        }
      ]
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": BRAND_ENTITY.url,
    "name": BRAND_ENTITY.legalName,
    "publisher": {
      "@type": "Organization",
      "@id": BRAND_ENTITY.organizationId
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${BRAND_ENTITY.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  const aggregateRatingSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Palmer House Productions",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "47",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  function getBreadcrumbItems() {
    const items = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.palmerhouseproductions.com"
      }
    ];

    switch (pageType) {
      case "about":
        items.push({
          "@type": "ListItem",
          "position": 2,
          "name": "About",
          "item": "https://www.palmerhouseproductions.com/about-us"
        });
        break;
      case "services":
        items.push({
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://www.palmerhouseproductions.com/services"
        });
        break;
      case "packages":
        items.push({
          "@type": "ListItem",
          "position": 2,
          "name": "Video Packages",
          "item": "https://www.palmerhouseproductions.com/video-packages"
        });
        break;
      case "contact":
        items.push({
          "@type": "ListItem",
          "position": 2,
          "name": "Contact",
          "item": "https://www.palmerhouseproductions.com/contact"
        });
        break;
    }

    return items;
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": getBreadcrumbItems()
  };

  const schemas: any[] = [websiteSchema, localBusinessSchema, serviceSchema, aggregateRatingSchema];
  
  if (pageType !== "homepage") {
    schemas.push(breadcrumbSchema);
  }

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema)
          }}
        />
      ))}
    </>
  );
};