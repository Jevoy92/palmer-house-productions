import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Clock, Calendar, ChevronRight } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { MetaTags } from '@/components/seo/MetaTags';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { OptimizedImage } from '@/components/seo/ImageOptimization';
import diyVideoFailsImage from '@/assets/blog/diy-video-fails.jpg';
import brandStorytellingImage from '@/assets/blog/brand-storytelling-video.jpg';
import mobileVideoProductionImage from '@/assets/blog/mobile-video-production.jpg';
import remoteVideoCollaborationImage from '@/assets/blog/remote-video-collaboration.jpg';
import psychologyOfVideoImage from '@/assets/blog/psychology-of-video.jpg';
import videoMetricsMatterImage from '@/assets/blog/video-metrics-matter.jpg';
import scriptWritingSecretsImage from '@/assets/blog/script-writing-secrets.jpg';
import lightingAudioBasicsImage from '@/assets/blog/lighting-audio-basics.jpg';
import socialMediaVideoOptimizationImage from '@/assets/blog/social-media-video-optimization.jpg';
import customerTestimonialImage from '@/assets/blog/customer-testimonial-videos.jpg';
import videoSeoMasteryImage from '@/assets/blog/video-seo-mastery.jpg';
import editingLikeProImage from '@/assets/blog/editing-like-pro.jpg';
import liveStreamingBusinessImage from '@/assets/blog/live-streaming-business.jpg';

// Blog articles data
const blogArticles = [
  // Core ChatGPT Articles
  {
    id: 'video-content-toolkit-2025',
    title: 'The Ultimate Video Content System Toolkit for Founders (2025 Edition)',
    excerpt: 'Master the complete video content creation process with our comprehensive toolkit that scales with your business growth.',
    category: 'Strategy',
    readTime: '12 min read',
    publishDate: '2025-01-15',
    featured: true,
    slug: '/blog/video-content-toolkit-2025',
    tags: ['video-strategy', 'content-creation', 'business-growth', 'toolkits'],
    image: editingLikeProImage,
    imageAlt: 'Video content creation toolkit and editing workflow'
  },
  {
    id: 'automate-employee-training-video',
    title: 'How to Automate Employee Training with Video',
    excerpt: 'Transform your employee onboarding and training programs with scalable video solutions that reduce costs and improve engagement.',
    category: 'Training',
    readTime: '10 min read',
    publishDate: '2025-01-10',
    featured: true,
    slug: '/blog/automate-employee-training-video',
    tags: ['employee-training', 'automation', 'video-systems', 'hr'],
    image: liveStreamingBusinessImage,
    imageAlt: 'Automated employee training with video modules'
  },
  {
    id: 'content-creation-tools-2025',
    title: '10 Content Creation Tools Every Business Owner Should Know',
    excerpt: 'Discover the essential tools that streamline video content creation and help busy founders create professional content efficiently.',
    category: 'Tools',
    readTime: '8 min read',
    publishDate: '2025-01-05',
    featured: false,
    slug: '/blog/content-creation-tools-2025',
    tags: ['content-tools', 'productivity', 'video-production', 'efficiency'],
    image: mobileVideoProductionImage,
    imageAlt: 'Essential content creation tools and mobile production setup'
  },
  {
    id: 'video-content-roi-comparison',
    title: 'The Real ROI of Video Content vs Old-School Training',
    excerpt: 'Data-driven analysis showing how video content delivers measurable returns compared to traditional training methods.',
    category: 'ROI',
    readTime: '15 min read',
    publishDate: '2025-01-01',
    featured: true,
    slug: '/blog/video-content-roi-comparison',
    tags: ['roi-analysis', 'video-training', 'business-metrics', 'cost-comparison'],
    image: videoMetricsMatterImage,
    imageAlt: 'Video ROI analytics and performance dashboard'
  },
  // Additional Business Strategy Articles
  {
    id: 'diy-video-fails',
    title: 'Why DIY Video Fails (And When to Hire Professionals)',
    excerpt: 'Understand the hidden costs of DIY video production and learn when professional help becomes a strategic investment.',
    category: 'Strategy',
    readTime: '9 min read',
    publishDate: '2024-12-28',
    featured: false,
    slug: '/blog/diy-video-fails',
    tags: ['diy-video', 'professional-services', 'video-strategy', 'business-decisions'],
    image: diyVideoFailsImage,
    imageAlt: 'Professional vs DIY video production comparison'
  },
  {
    id: 'brand-storytelling-video',
    title: 'The 5-Stage Video Content System That Scales With Your Business',
    excerpt: 'Build a sustainable video content framework that grows with your company from startup to enterprise.',
    category: 'Strategy',
    readTime: '14 min read',
    publishDate: '2024-12-25',
    featured: false,
    slug: '/blog/brand-storytelling-video',
    tags: ['scaling', 'content-systems', 'business-growth', 'video-framework'],
    image: brandStorytellingImage,
    imageAlt: 'Video content system framework visualization'
  },
  {
    id: 'overwhelmed-to-authority',
    title: 'From Overwhelmed to Authority: A Founder\'s Guide to Video Confidence',
    excerpt: 'Overcome camera anxiety and build confidence to become a thought leader through strategic video content.',
    category: 'Personal Development',
    readTime: '11 min read',
    publishDate: '2024-12-20',
    featured: false,
    slug: '/blog/overwhelmed-to-authority',
    tags: ['camera-confidence', 'thought-leadership', 'personal-branding', 'founder-tips'],
    image: mobileVideoProductionImage,
    imageAlt: 'Founder building video confidence and authority'
  },
  {
    id: 'remote-video-collaboration',
    title: 'How to Build Internal Video Libraries That Actually Get Used',
    excerpt: 'Create organized, accessible video resources that your team will actually reference and use in their daily work.',
    category: 'Organization',
    readTime: '13 min read',
    publishDate: '2024-12-15',
    featured: false,
    slug: '/blog/remote-video-collaboration',
    tags: ['video-organization', 'team-resources', 'knowledge-management', 'internal-comms'],
    image: remoteVideoCollaborationImage,
    imageAlt: 'Internal video library organization system'
  },
  {
    id: 'psychology-of-video',
    title: 'The Psychology of Video: Why Talking Heads Beat Text Every Time',
    excerpt: 'Explore the cognitive science behind why video communication is more effective than written content for learning and engagement.',
    category: 'Psychology',
    readTime: '10 min read',
    publishDate: '2024-12-10',
    featured: false,
    slug: '/blog/psychology-of-video',
    tags: ['video-psychology', 'communication-science', 'engagement', 'learning-theory'],
    image: psychologyOfVideoImage,
    imageAlt: 'Psychology of video communication and engagement'
  },
  {
    id: 'video-metrics-matter',
    title: 'Measuring Video ROI: Beyond Views to Business Impact',
    excerpt: 'Learn how to track meaningful video metrics that connect directly to business outcomes and revenue growth.',
    category: 'Analytics',
    readTime: '12 min read',
    publishDate: '2024-12-05',
    featured: false,
    slug: '/blog/video-metrics-matter',
    tags: ['video-analytics', 'roi-measurement', 'business-metrics', 'kpi-tracking'],
    image: videoMetricsMatterImage,
    imageAlt: 'Video ROI measurement and analytics dashboard'
  },
  // Technical How-To Articles
  {
    id: 'script-writing-secrets',
    title: 'Script Writing for Busy Founders: The 5-Minute Framework',
    excerpt: 'Master the art of concise, effective video scripts that communicate value without wasting time.',
    category: 'How-To',
    readTime: '7 min read',
    publishDate: '2024-12-01',
    featured: false,
    slug: '/blog/script-writing-secrets',
    tags: ['scriptwriting', 'video-planning', 'communication', 'time-management'],
    image: scriptWritingSecretsImage,
    imageAlt: 'Video script writing framework for founders'
  },
  {
    id: 'lighting-audio-basics',
    title: 'Lighting and Audio Basics: Professional Videos on a Budget',
    excerpt: 'Achieve professional video quality without expensive equipment using smart lighting and audio techniques.',
    category: 'Technical',
    readTime: '16 min read',
    publishDate: '2024-11-25',
    featured: false,
    slug: '/blog/lighting-audio-basics',
    tags: ['video-production', 'lighting', 'audio', 'budget-friendly'],
    image: lightingAudioBasicsImage,
    imageAlt: 'Professional lighting and audio setup for video production'
  },
  {
    id: 'social-media-video-optimization',
    title: 'Platform-Specific Video: What Works on LinkedIn vs. Instagram vs. YouTube',
    excerpt: 'Optimize your video content for each social platform to maximize reach, engagement, and business results.',
    category: 'Social Media',
    readTime: '14 min read',
    publishDate: '2024-11-20',
    featured: false,
    slug: '/blog/social-media-video-optimization',
    tags: ['social-media', 'platform-optimization', 'video-marketing', 'multi-channel'],
    image: socialMediaVideoOptimizationImage,
    imageAlt: 'Platform-specific video optimization strategies'
  },
  {
    id: 'customer-testimonial-videos',
    title: 'Creating Video Content That Converts: Hook, Value, Call-to-Action',
    excerpt: 'Master the formula for video content that not only engages viewers but drives them to take meaningful action.',
    category: 'Conversion',
    readTime: '11 min read',
    publishDate: '2024-11-15',
    featured: false,
    slug: '/blog/customer-testimonial-videos',
    tags: ['conversion-optimization', 'video-marketing', 'cta-strategy', 'engagement'],
    image: customerTestimonialImage,
    imageAlt: 'Video content conversion strategy and optimization'
  },
  // Industry-Specific Content
  {
    id: 'video-marketing-saas',
    title: 'Video Marketing for SaaS: Onboarding, Demos, and Customer Success',
    excerpt: 'Specialized video strategies for SaaS companies to improve user onboarding, showcase features, and reduce churn.',
    category: 'Industry',
    readTime: '13 min read',
    publishDate: '2024-11-10',
    featured: false,
    slug: '/blog/video-marketing-saas',
    tags: ['saas-marketing', 'user-onboarding', 'product-demos', 'customer-success'],
    image: videoSeoMasteryImage,
    imageAlt: 'SaaS video marketing and customer onboarding strategy'
  }
];

const categories = ['All', 'Strategy', 'Training', 'Tools', 'ROI', 'How-To', 'Technical', 'Social Media', 'Conversion', 'Industry', 'Psychology', 'Analytics', 'Organization', 'Personal Development'];

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  // Filter and sort articles
  const filteredArticles = blogArticles
    .filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
      } else if (sortBy === 'oldest') {
        return new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime();
      } else if (sortBy === 'readTime') {
        return parseInt(a.readTime) - parseInt(b.readTime);
      }
      return 0;
    });

  const featuredArticles = filteredArticles.filter(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <MetaTags
        title="Video Strategy Blog | Palmer House Productions"
        description="Expert insights on video content strategy, employee training automation, and business growth through video. Learn from our proven systems and real client results."
        keywords="video strategy blog, content creation, employee training videos, business video marketing, video ROI, video production tips"
        ogTitle="Video Strategy Blog | Palmer House Productions"
        ogDescription="Expert insights on video content strategy, employee training automation, and business growth through video."
        canonicalUrl="https://palmerhouseproductions.com/blog"
      />
      
      <Navigation />
      
      <main className="min-h-screen bg-video-white pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-social-purple/10 via-video-white to-social-pink/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-corporate-dark mb-6">
                Video Strategy <span className="text-gradient-1">Intelligence</span>
              </h1>
              <p className="text-xl text-corporate-gray mb-8 leading-relaxed">
                Proven strategies, real-world insights, and actionable frameworks to transform your business through strategic video content.
              </p>
              
              {/* Search and Filter Bar */}
              <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-corporate-gray h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Search articles, topics, or strategies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 py-3 text-base border-corporate-light/50 focus:border-social-purple"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-48 py-3 border-corporate-light/50">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-3xl font-bold text-corporate-dark mb-8">Featured Articles</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredArticles.map((article) => (
                  <Card key={article.id} className="group hover:shadow-lg transition-all duration-300 border-corporate-light/30">
                    {/* Cover Image */}
                    <div className="overflow-hidden rounded-t-lg">
                      <AspectRatio ratio={16/9}>
                        <OptimizedImage
                          src={article.image || '/placeholder.svg'}
                          alt={article.imageAlt || `${article.title} cover image`}
                          className="w-full h-full object-cover"
                        />
                      </AspectRatio>
                    </div>
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="secondary" className="bg-social-purple/10 text-social-purple">
                          {article.category}
                        </Badge>
                        <div className="flex items-center text-sm text-corporate-gray">
                          <Clock className="h-4 w-4 mr-1" />
                          {article.readTime}
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-corporate-dark group-hover:text-social-purple transition-colors">
                        <Link to={article.slug} className="hover:underline focus:underline">{article.title}</Link>
                      </h3>
                    </CardHeader>
                    <CardContent>
                      <p className="text-corporate-gray mb-4 leading-relaxed">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-corporate-gray">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(article.publishDate)}
                        </div>
                        <Link
                          to={article.slug}
                          className="inline-flex items-center text-social-purple hover:text-social-pink transition-colors font-medium"
                        >
                          Read More
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Sort Controls */}
        <section className="py-8 border-t border-corporate-light/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h2 className="text-2xl font-bold text-corporate-dark">
                All Articles ({filteredArticles.length})
              </h2>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="readTime">Read Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* All Articles Grid */}
        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-6">
            {filteredArticles.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-corporate-gray mb-4">No articles found matching your criteria.</p>
                <Button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                  }}
                  variant="outline"
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article) => (
                  <Card key={article.id} className="group hover:shadow-lg transition-all duration-300 border-corporate-light/30">
                    {/* Cover Image */}
                    <div className="overflow-hidden rounded-t-lg">
                      <AspectRatio ratio={16/9}>
                        <OptimizedImage
                          src={article.image || '/placeholder.svg'}
                          alt={article.imageAlt || `${article.title} cover image`}
                          className="w-full h-full object-cover"
                        />
                      </AspectRatio>
                    </div>
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="outline" className="border-corporate-light text-corporate-gray">
                          {article.category}
                        </Badge>
                        <div className="flex items-center text-sm text-corporate-gray">
                          <Clock className="h-4 w-4 mr-1" />
                          {article.readTime}
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-corporate-dark group-hover:text-social-purple transition-colors leading-tight">
                        <Link to={article.slug} className="hover:underline focus:underline">{article.title}</Link>
                      </h3>
                    </CardHeader>
                    <CardContent>
                      <p className="text-corporate-gray mb-4 leading-relaxed text-sm">
                        {article.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs bg-corporate-light/50">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-corporate-gray">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(article.publishDate)}
                        </div>
                        <Link
                          to={article.slug}
                          className="inline-flex items-center text-social-purple hover:text-social-pink transition-colors font-medium text-sm"
                        >
                          Read More
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-social-purple/10 to-social-pink/10">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-corporate-dark mb-4">
              Ready to Transform Your Business with Video?
            </h2>
            <p className="text-xl text-corporate-gray mb-8">
              Get personalized insights and strategic recommendations for your unique situation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-social-purple hover:bg-social-purple/90 text-white px-8 py-4">
                  Get Your Strategy Assessment
                </Button>
              </Link>
              <Link to="/video-packages">
                <Button size="lg" variant="outline" className="border-social-purple text-social-purple hover:bg-social-purple/10 px-8 py-4">
                  View Our Packages
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Blog;