import { useEffect } from 'react';

interface BlogPostSchemaProps {
  headline: string;
  description: string;
  canonicalUrl: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
}

export const BlogPostSchema = ({
  headline,
  description,
  canonicalUrl,
  image,
  datePublished,
  dateModified,
  authorName = 'Palmer House Productions'
}: BlogPostSchemaProps) => {
  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline,
      description,
      mainEntityOfPage: canonicalUrl,
      image: image ? [image] : undefined,
      datePublished,
      dateModified: dateModified || datePublished,
      author: {
        '@type': 'Organization',
        name: authorName
      },
      publisher: {
        '@type': 'Organization',
        name: 'Palmer House Productions',
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.palmerhouseproductions.com/lovable-uploads/c5bbccdc-e50d-4422-8661-75baebb2813c.png'
        }
      }
    } as any;

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    script.id = 'blogpost-schema';

    const existing = document.getElementById('blogpost-schema');
    if (existing) existing.remove();

    document.head.appendChild(script);

    return () => {
      const el = document.getElementById('blogpost-schema');
      if (el) el.remove();
    };
  }, [headline, description, canonicalUrl, image, datePublished, dateModified, authorName]);

  return null;
};
