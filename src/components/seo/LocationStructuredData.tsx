import { BRAND_ENTITY } from '@/lib/brand-entity';

interface LocationStructuredDataProps {
  city: string;
  region: string; // e.g., "WA"
  canonicalUrl: string;
}

export const LocationStructuredData = ({ city, region, canonicalUrl }: LocationStructuredDataProps) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `${BRAND_ENTITY.legalName} — ${city}`,
    url: canonicalUrl,
    '@id': `${canonicalUrl}#localbusiness`,
    image: BRAND_ENTITY.image,
    logo: BRAND_ENTITY.logo,
    telephone: BRAND_ENTITY.telephone,
    email: BRAND_ENTITY.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: city,
      addressRegion: region,
      addressCountry: 'US'
    },
    areaServed: [city, `${city}, ${region}`, 'Pacific Northwest', 'United States', 'Worldwide'],
    sameAs: BRAND_ENTITY.sameAs,
    branchOf: {
      '@type': 'Organization',
      '@id': BRAND_ENTITY.organizationId,
      name: BRAND_ENTITY.legalName,
      url: BRAND_ENTITY.url
    }
  } as const;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
