import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, ArrowLeft, Share2, BookOpen } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { MetaTags } from '@/components/seo/MetaTags';
import { InternalLinking } from '@/components/seo/InternalLinking';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { OptimizedImage } from '@/components/seo/ImageOptimization';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BlogPostSchema } from '@/components/seo/BlogPostSchema';

interface BlogPostProps {
  title: string;
  excerpt: string;
  content: ReactNode;
  category: string;
  readTime: string;
  publishDate: string;
  tags: string[];
  metaDescription: string;
  keywords: string;
  canonicalUrl: string;
  heroImage?: string;
  heroAlt?: string;
  ogImage?: string;
  author?: string;
  authorRole?: string;
  authorBio?: string;
  authorImage?: string;
  relatedLinks?: Array<{
    title: string;
    href: string;
    description: string;
  }>;
}

export const BlogPost = ({
  title,
  excerpt,
  content,
  category,
  readTime,
  publishDate,
  tags,
  metaDescription,
  keywords,
  canonicalUrl,
  heroImage,
  heroAlt,
  ogImage,
  author,
  authorRole,
  authorBio,
  authorImage,
  relatedLinks
}: BlogPostProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: excerpt,
          url: window.location.href,
        });
      } catch (err) {
        // Silently handle share error
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <>
      <BlogPostSchema
        headline={title}
        description={metaDescription || excerpt}
        canonicalUrl={canonicalUrl}
        image={ogImage || heroImage}
        datePublished={publishDate}
      />
      <MetaTags
        title={`${title} | Palmer House Productions`}
        description={metaDescription}
        keywords={keywords}
        ogTitle={title}
        ogDescription={metaDescription}
        ogImage={ogImage || heroImage}
        canonicalUrl={canonicalUrl}
      />
      
      <Navigation />
      
      <main className="min-h-screen bg-video-white pt-20">
        {/* Breadcrumb */}
        <div className="bg-corporate-light/30 py-4">
          <div className="max-w-4xl mx-auto px-6">
            <Link 
              to="/blog" 
              className="inline-flex items-center text-corporate-gray hover:text-social-purple transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
      </div>
    </div>

    {/* Hero Image */}
    {heroImage && (
      <div className="max-w-5xl mx-auto px-6 mt-8">
        <div className="overflow-hidden rounded-lg shadow-sm border border-corporate-light/40">
          <AspectRatio ratio={16/9}>
            <OptimizedImage
              src={heroImage}
              alt={heroAlt || `${title} hero image`}
              className="w-full h-full object-cover"
              loading="eager"
              priority
            />
          </AspectRatio>
        </div>
      </div>
    )}

    {/* Article Header */}
    <article className="py-12">
          <div className="max-w-4xl mx-auto px-6">
            <header className="mb-12">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <Badge className="bg-social-purple text-white">
                  {category}
                </Badge>
                <div className="flex items-center text-corporate-gray">
                  <Clock className="h-4 w-4 mr-2" />
                  {readTime}
                </div>
                <div className="flex items-center text-corporate-gray">
                  <Calendar className="h-4 w-4 mr-2" />
                  {formatDate(publishDate)}
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-corporate-dark mb-6 leading-tight">
                {title}
              </h1>
              
              <p className="text-xl text-corporate-gray leading-relaxed mb-8">
                {excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-corporate-light/50 text-corporate-gray">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button
                  onClick={handleShare}
                  variant="outline"
                  size="sm"
                  className="ml-auto"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </header>

            <Separator className="mb-12" />

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              {typeof content === 'string' ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {content as string}
                </ReactMarkdown>
              ) : (
                content
              )}
            </div>

            <Separator className="my-12" />

            {/* Author Section */}
            {author && (
              <div className="mb-12">
                <div className="flex items-start gap-6">
                  {authorImage && (
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100 p-1">
                        <img 
                          src={authorImage}
                          alt={author}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </div>
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="text-sm text-muted-foreground mb-1">Written by</div>
                    <h3 className="text-3xl font-bold text-foreground mb-2">{author}</h3>
                    {authorRole && (
                      <p className="text-sm font-medium text-primary mb-3">{authorRole}</p>
                    )}
                    {authorBio && (
                      <p className="text-base text-muted-foreground leading-relaxed">{authorBio}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            <Separator className="my-12" />
            <div className="bg-gradient-to-r from-social-purple/10 to-social-pink/10 rounded-lg p-8 mb-12">
              <div className="text-center">
                <BookOpen className="h-12 w-12 text-social-purple mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-corporate-dark mb-4">
                  Ready to Implement These Strategies?
                </h3>
                <p className="text-corporate-gray mb-6">
                  Get personalized guidance and support to transform your video content strategy.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact">
                    <Button size="lg" className="bg-social-purple hover:bg-social-purple/90 text-white">
                      Schedule Your Strategy Session
                    </Button>
                  </Link>
                  <Link to="/video-packages">
                    <Button size="lg" variant="outline" className="border-social-purple text-social-purple hover:bg-social-purple/10">
                      Explore Our Services
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Related Content */}
            <InternalLinking 
              currentPage="blog" 
              relatedLinks={relatedLinks}
            />
          </div>
        </article>
      </main>
    </>
  );
};