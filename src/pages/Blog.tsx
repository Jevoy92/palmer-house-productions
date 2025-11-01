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
import mobileVideoProductionImage from '@/assets/blog/mobile-video-production.jpg';
import videoMetricsMatterImage from '@/assets/blog/video-metrics-matter.jpg';
import editingLikeProImage from '@/assets/blog/editing-like-pro.jpg';
import employeeTrainingAutomationImage from '@/assets/blog/employee-training-automation.jpg';

// Blog articles data - Focused on core strategic content
const blogArticles = [
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
    imageAlt: 'Video content creation toolkit and editing workflow',
    author: 'System Pal',
    authorRole: 'Operations & Systems Expert'
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
    image: employeeTrainingAutomationImage,
    imageAlt: 'Automated employee training with video modules',
    author: 'System Pal',
    authorRole: 'Operations & Systems Expert'
  },
  {
    id: 'mobile-video-production',
    title: 'Mobile Video Production: Create Pro Content Anywhere',
    excerpt: 'Learn how to produce professional-quality video content using just your smartphone and a few essential accessories.',
    category: 'Production',
    readTime: '9 min read',
    publishDate: '2025-01-08',
    featured: true,
    slug: '/blog/mobile-video-production',
    tags: ['mobile-video', 'on-the-go', 'content-creation', 'smartphone'],
    image: mobileVideoProductionImage,
    imageAlt: 'Mobile video production setup with smartphone',
    author: 'Reel Pal',
    authorRole: 'Social Media & Short-Form Expert'
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
    image: editingLikeProImage,
    imageAlt: 'Essential content creation tools and editing workspace',
    author: 'Spotlight Pal',
    authorRole: 'Professional Production Expert'
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
    imageAlt: 'Video ROI analytics and performance dashboard',
    author: 'Evergreen Pal',
    authorRole: 'Content Strategy & SEO Expert'
  }
];

const categories = ['All', 'Strategy', 'Training', 'Production', 'Tools', 'ROI'];

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
      
      <main className="min-h-screen bg-background font-sans">
        {/* Hero Section with Featured Article */}
        <section className="pt-24 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {/* Featured Article - Large Hero Card */}
            {featuredArticles.length > 0 && (
              <Link to={featuredArticles[0].slug}>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  <div className="grid md:grid-cols-5 gap-0">
                    {/* Image - Left Side */}
                    <div className="md:col-span-2 relative">
                      <div className="absolute top-4 left-4 z-10">
                        <Badge className="bg-white/90 backdrop-blur-sm text-foreground hover:bg-white">
                          {featuredArticles[0].category}
                        </Badge>
                      </div>
                      <AspectRatio ratio={4/3} className="md:h-full">
                        <OptimizedImage
                          src={featuredArticles[0].image || '/placeholder.svg'}
                          alt={featuredArticles[0].imageAlt || featuredArticles[0].title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </AspectRatio>
                    </div>
                    
                      {/* Content - Right Side */}
                    <div className="md:col-span-3 p-8 sm:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="text-sm text-muted-foreground">
                          {formatDate(featuredArticles[0].publishDate)}
                        </div>
                        {featuredArticles[0].author && (
                          <>
                            <span className="text-muted-foreground">•</span>
                            <div className="text-sm font-medium text-foreground">
                              By {featuredArticles[0].author}
                            </div>
                          </>
                        )}
                      </div>
                      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                        {featuredArticles[0].title}
                      </h2>
                      <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                        {featuredArticles[0].excerpt}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </section>

        {/* Top Stories Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Top stories
              </h2>
              <button className="p-2 hover:bg-muted rounded-full transition-colors">
                <Search className="h-6 w-6 text-foreground" />
              </button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.slice(1).map((article, index) => {
                const bgColors = [
                  'from-pink-50 to-pink-100',
                  'from-purple-50 to-purple-100',
                  'from-orange-50 to-orange-100',
                  'from-yellow-50 to-yellow-100',
                  'from-blue-50 to-blue-100',
                  'from-green-50 to-green-100'
                ];
                const bgColor = bgColors[index % bgColors.length];
                
                return (
                  <Link key={article.id} to={article.slug}>
                    <div className={`bg-gradient-to-br ${bgColor} rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 group h-full`}>
                      {/* Image */}
                      <div className="relative p-6 pb-4">
                        <div className="absolute top-4 left-4 z-10">
                          <Badge className="bg-white/90 backdrop-blur-sm text-foreground hover:bg-white">
                            {article.category}
                          </Badge>
                        </div>
                        <AspectRatio ratio={16/9}>
                          <OptimizedImage
                            src={article.image || '/placeholder.svg'}
                            alt={article.imageAlt || article.title}
                            className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                          />
                        </AspectRatio>
                      </div>
                      
                      {/* Content */}
                      <div className="px-6 pb-6">
                        {article.author && (
                          <div className="text-xs font-medium text-muted-foreground mb-2">
                            By {article.author}
                          </div>
                        )}
                        <h3 className="text-xl sm:text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors leading-tight">
                          {article.title}
                        </h3>
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                          {article.excerpt}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Search and Filter Bar */}
        {filteredArticles.length > 1 && (
          <section className="py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full sm:w-48">
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
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-48">
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
        )}

        {/* No Results */}
        {filteredArticles.length === 0 && (
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
              <p className="text-xl text-muted-foreground mb-4">No articles found matching your criteria.</p>
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
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl p-8 sm:p-12 text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Ready to Transform Your Business with Video?
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Get personalized insights and strategic recommendations for your unique situation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button size="lg" className="bg-pal-purple hover:bg-pal-purple/90 text-white px-8 py-4">
                    Get Your Strategy Assessment
                  </Button>
                </Link>
                <Link to="/video-packages">
                  <Button size="lg" variant="outline" className="border-pal-orange text-pal-orange hover:bg-pal-orange hover:text-white px-8 py-4">
                    View Our Packages
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Blog;