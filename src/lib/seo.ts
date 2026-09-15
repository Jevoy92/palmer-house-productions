import defaultSocialImage from "@/assets/hero/pal-crew.png";

export const SITE_NAME = "Palmer House Productions";
export const SITE_URL = "https://www.palmerhouseproductions.com";
export const SITE_DESCRIPTION =
  "Palmer House Productions builds video systems for Pacific Northwest businesses — one shoot day delivers a content library for social, web, and training.";

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const BUSINESS_CONTACT = {
  name: SITE_NAME,
  email: "info@palmerhouseproductions.com",
  phone: "+14255339060",
  displayPhone: "(425) 533-9060",
} as const;

const SOCIAL_PROFILES = [
  "https://www.facebook.com/profile.php?id=100092553086353",
  "https://www.instagram.com/palmerhouseproductions",
  "https://www.youtube.com/channel/UCe7_R47Klv_JdupA1exogMw",
  "https://www.linkedin.com/company/palmer-house-productions/",
  "https://x.com/palmerhouseviz",
  "https://www.pinterest.com/palmerhouseproductions/",
  "https://www.tiktok.com/@palmerhouseproductions",
  "https://www.threads.net/@palmerhouseproductions",
] as const;

type JsonLdNode = Record<string, unknown>;

type SeoOptions = {
  title: string;
  description: string;
  pathname: string;
  type?: "website" | "article";
  image?: string;
  noIndex?: boolean;
};

export type BreadcrumbItem = {
  name: string;
  pathname: string;
};

export type FaqItem = {
  q: string;
  a: string;
};

export function absoluteUrl(pathname: string) {
  if (/^https?:\/\//.test(pathname)) return pathname;
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${SITE_URL}${normalizedPath}`;
}

export function createSeo({
  title,
  description,
  pathname,
  type = "website",
  image = defaultSocialImage,
  noIndex = false,
}: SeoOptions) {
  const canonical = absoluteUrl(pathname);
  const socialImage = image ? absoluteUrl(image) : undefined;

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "author", content: SITE_NAME },
      ...(noIndex ? [{ name: "robots", content: "noindex, nofollow" }] : []),
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: canonical },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:locale", content: "en_US" },
      ...(socialImage
        ? [
            { property: "og:image", content: socialImage },
            { property: "og:image:alt", content: `${SITE_NAME} video production team` },
            { property: "og:image:type", content: "image/png" },
            { property: "og:image:width", content: "1024" },
            { property: "og:image:height", content: "683" },
          ]
        : []),
      { name: "twitter:card", content: socialImage ? "summary_large_image" : "summary" },
      { name: "twitter:site", content: "@palmerhouseviz" },
      { name: "twitter:creator", content: "@palmerhouseviz" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      ...(socialImage
        ? [
            { name: "twitter:image", content: socialImage },
            { name: "twitter:image:alt", content: `${SITE_NAME} video production team` },
          ]
        : []),
    ],
    links: [{ rel: "canonical", href: canonical }],
  };
}

export function organizationSchema(): JsonLdNode {
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    url: SITE_URL,
    email: BUSINESS_CONTACT.email,
    telephone: BUSINESS_CONTACT.phone,
    areaServed: [
      { "@type": "State", name: "Washington" },
      { "@type": "State", name: "Oregon" },
    ],
    sameAs: SOCIAL_PROFILES,
  };
}

export function websiteSchema(): JsonLdNode {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: "en-US",
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export function serviceSchema({
  name,
  description,
  pathname,
  serviceType,
  areaServed,
}: {
  name: string;
  description: string;
  pathname: string;
  serviceType: string;
  areaServed: string[];
}): JsonLdNode {
  return {
    "@type": "Service",
    "@id": `${absoluteUrl(pathname)}#service`,
    name,
    description,
    url: absoluteUrl(pathname),
    serviceType,
    provider: { "@id": ORGANIZATION_ID },
    areaServed: areaServed.map((name) => ({ "@type": "Place", name })),
  };
}

export function createServiceSeo({
  serviceName,
  serviceType,
  areaServed = ["Washington", "Oregon", "Pacific Northwest"],
  ...seoOptions
}: SeoOptions & {
  serviceName: string;
  serviceType: string;
  areaServed?: string[];
}) {
  return {
    ...createSeo(seoOptions),
    scripts: [
      jsonLdScript(
        schemaGraph(
          serviceSchema({
            name: serviceName,
            description: seoOptions.description,
            pathname: seoOptions.pathname,
            serviceType,
            areaServed,
          }),
        ),
      ),
    ],
  };
}

export function blogPostingSchema({
  headline,
  description,
  pathname,
  author,
  datePublished,
  dateModified = datePublished,
}: {
  headline: string;
  description: string;
  pathname: string;
  author: string;
  datePublished: string;
  dateModified?: string;
}): JsonLdNode {
  const url = absoluteUrl(pathname);

  return {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline,
    description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@type": "Person", name: author },
    publisher: { "@id": ORGANIZATION_ID },
    datePublished,
    dateModified,
    inLanguage: "en-US",
  };
}

export function faqSchema(items: FaqItem[]): JsonLdNode {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[]): JsonLdNode {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.pathname),
    })),
  };
}

export function schemaGraph(...nodes: JsonLdNode[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}

export function jsonLdScript(schema: JsonLdNode) {
  return {
    type: "application/ld+json",
    children: JSON.stringify(schema),
  };
}
