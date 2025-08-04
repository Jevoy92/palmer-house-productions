import { useLocation } from "react-router-dom";

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
    "name": "Palmer House Productions",
    "description": "Professional video production services for bold brands. Short-form cinematic storytelling that scales your business.",
    "url": "https://www.palmerhouseproductions.com",
    "telephone": "+1-555-0123",
    "email": "info@palmerhouseproductions.com",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "sameAs": [
      "https://www.linkedin.com/company/palmer-house-productions",
      "https://www.instagram.com/palmerhouseproductions"
    ],
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
    "areaServed": "United States",
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
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Sarah M."
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        },
        "reviewBody": "Palmer House Productions transformed our brand story into a compelling visual narrative. Their attention to detail and creative vision exceeded our expectations."
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Michael R."
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        },
        "reviewBody": "Working with Palmer House was seamless from start to finish. They delivered a stunning corporate video that perfectly captured our company's mission and values."
      }
    ]
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

  const schemas: any[] = [localBusinessSchema, serviceSchema, aggregateRatingSchema];
  
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