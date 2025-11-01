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
import evergreenRoiComparisonImage from '@/assets/blog/evergreen-roi-comparison.jpg';
import evergreenVideoSeoImage from '@/assets/blog/evergreen-video-seo.jpg';
import evergreenRepurposeVideoImage from '@/assets/blog/evergreen-repurpose-video.jpg';
import evergreenLongTermStrategyImage from '@/assets/blog/evergreen-long-term-strategy.jpg';

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
    id: 'build-video-training-library',
    title: 'How to Build a Scalable Video Training Library',
    excerpt: 'Create an organized, searchable video training library that grows with your team and reduces onboarding time by 70%.',
    category: 'Training',
    readTime: '11 min read',
    publishDate: '2025-01-08',
    featured: false,
    slug: '/blog/build-video-training-library',
    tags: ['video-library', 'training-systems', 'knowledge-management', 'onboarding'],
    image: employeeTrainingAutomationImage,
    imageAlt: 'Organized video training library system',
    author: 'System Pal',
    authorRole: 'Operations & Systems Expert'
  },
  {
    id: 'scale-video-operations',
    title: 'Scaling Video Operations: From 1 to 100 Videos per Month',
    excerpt: 'Proven systems and workflows to scale your video production from occasional content to consistent, high-volume output.',
    category: 'Operations',
    readTime: '13 min read',
    publishDate: '2025-01-03',
    featured: false,
    slug: '/blog/scale-video-operations',
    tags: ['video-operations', 'scaling', 'workflows', 'production-management'],
    image: editingLikeProImage,
    imageAlt: 'Video production operations dashboard',
    author: 'System Pal',
    authorRole: 'Operations & Systems Expert'
  },
  {
    id: 'mobile-video-production',
    title: 'Mobile Video Production: Create Pro Content Anywhere',
    excerpt: 'Learn how to produce professional-quality video content using just your smartphone and a few essential accessories.',
    category: 'Production',
    readTime: '9 min read',
    publishDate: '2025-01-12',
    featured: true,
    slug: '/blog/mobile-video-production',
    tags: ['mobile-video', 'on-the-go', 'content-creation', 'smartphone'],
    image: mobileVideoProductionImage,
    imageAlt: 'Mobile video production setup with smartphone',
    author: 'Reel Pal',
    authorRole: 'Social Media & Short-Form Expert'
  },
  {
    id: 'instagram-reels-strategy',
    title: 'Instagram Reels Strategy: What Works in 2025',
    excerpt: 'Master Instagram Reels with data-backed strategies that increase reach, engagement, and drive business results.',
    category: 'Social Media',
    readTime: '8 min read',
    publishDate: '2025-01-07',
    featured: false,
    slug: '/blog/instagram-reels-strategy',
    tags: ['instagram', 'reels', 'social-media-strategy', 'engagement'],
    image: mobileVideoProductionImage,
    imageAlt: 'Instagram Reels content strategy',
    author: 'Reel Pal',
    authorRole: 'Social Media & Short-Form Expert'
  },
  {
    id: 'tiktok-business-guide',
    title: 'TikTok for Business: The Complete 2025 Guide',
    excerpt: 'Transform TikTok from entertainment platform to powerful business tool with strategies that drive real leads and sales.',
    category: 'Social Media',
    readTime: '10 min read',
    publishDate: '2025-01-04',
    featured: false,
    slug: '/blog/tiktok-business-guide',
    tags: ['tiktok', 'business-marketing', 'social-selling', 'lead-generation'],
    image: mobileVideoProductionImage,
    imageAlt: 'TikTok business marketing strategy',
    author: 'Reel Pal',
    authorRole: 'Social Media & Short-Form Expert'
  },
  {
    id: 'short-form-video-hooks',
    title: 'Writing Hooks That Stop the Scroll: Short-Form Video Mastery',
    excerpt: 'Learn the psychology and techniques behind viral hooks that capture attention in the first 3 seconds.',
    category: 'Social Media',
    readTime: '7 min read',
    publishDate: '2025-01-02',
    featured: false,
    slug: '/blog/short-form-video-hooks',
    tags: ['video-hooks', 'copywriting', 'engagement', 'viral-content'],
    image: mobileVideoProductionImage,
    imageAlt: 'Short-form video hooks and engagement',
    author: 'Reel Pal',
    authorRole: 'Social Media & Short-Form Expert'
  },
  {
    id: 'content-creation-tools-2025',
    title: '10 Content Creation Tools Every Business Owner Should Know',
    excerpt: 'Discover the essential tools that streamline video content creation and help busy founders create professional content efficiently.',
    category: 'Tools',
    readTime: '8 min read',
    publishDate: '2025-01-09',
    featured: false,
    slug: '/blog/content-creation-tools-2025',
    tags: ['content-tools', 'productivity', 'video-production', 'efficiency'],
    image: editingLikeProImage,
    imageAlt: 'Essential content creation tools and editing workspace',
    author: 'Spotlight Pal',
    authorRole: 'Professional Production Expert'
  },
  {
    id: 'professional-lighting-budget',
    title: 'Professional Video Lighting on Any Budget',
    excerpt: 'Achieve cinematic lighting for your business videos without breaking the bank. From $50 to $5000 setups.',
    category: 'Production',
    readTime: '9 min read',
    publishDate: '2025-01-06',
    featured: false,
    slug: '/blog/professional-lighting-budget',
    tags: ['lighting', 'video-production', 'budget-friendly', 'cinematography'],
    image: editingLikeProImage,
    imageAlt: 'Professional video lighting setup',
    author: 'Spotlight Pal',
    authorRole: 'Professional Production Expert'
  },
  {
    id: 'audio-quality-business-video',
    title: 'Audio Quality: The Secret to Professional Business Videos',
    excerpt: 'Why good audio matters more than video quality, and how to capture crystal-clear sound for any budget.',
    category: 'Production',
    readTime: '8 min read',
    publishDate: '2024-12-30',
    featured: false,
    slug: '/blog/audio-quality-business-video',
    tags: ['audio', 'sound-quality', 'microphones', 'production-value'],
    image: editingLikeProImage,
    imageAlt: 'Professional audio recording setup',
    author: 'Spotlight Pal',
    authorRole: 'Professional Production Expert'
  },
  {
    id: 'video-editing-workflows',
    title: 'Video Editing Workflows That Save 10+ Hours per Week',
    excerpt: 'Streamline your editing process with proven workflows, keyboard shortcuts, and organization systems.',
    category: 'Tools',
    readTime: '11 min read',
    publishDate: '2024-12-28',
    featured: false,
    slug: '/blog/video-editing-workflows',
    tags: ['video-editing', 'workflows', 'productivity', 'time-saving'],
    image: editingLikeProImage,
    imageAlt: 'Efficient video editing workflow',
    author: 'Spotlight Pal',
    authorRole: 'Professional Production Expert'
  },
  {
    id: 'video-content-roi-comparison',
    title: 'The Real ROI of Video Content vs Old-School Training',
    excerpt: 'Data-driven analysis showing how video content delivers measurable returns compared to traditional training methods.',
    category: 'ROI',
    readTime: '15 min read',
    publishDate: '2025-01-11',
    featured: true,
    slug: '/blog/video-content-roi-comparison',
    tags: ['roi-analysis', 'video-training', 'business-metrics', 'cost-comparison'],
    image: evergreenRoiComparisonImage,
    imageAlt: 'Video ROI analytics comparison between video content and traditional training',
    author: 'Evergreen Pal',
    authorRole: 'Content Strategy & SEO Expert'
  },
  {
    id: 'video-seo-guide',
    title: 'Video SEO: Rank Your Videos on Google and YouTube',
    excerpt: 'Complete guide to optimizing video content for search engines and driving organic traffic to your business.',
    category: 'SEO',
    readTime: '12 min read',
    publishDate: '2025-01-05',
    featured: false,
    slug: '/blog/video-seo-guide',
    tags: ['video-seo', 'youtube-seo', 'organic-traffic', 'search-optimization'],
    image: evergreenVideoSeoImage,
    imageAlt: 'Video SEO strategy showing Google and YouTube ranking optimization',
    author: 'Evergreen Pal',
    authorRole: 'Content Strategy & SEO Expert'
  },
  {
    id: 'repurpose-video-content',
    title: 'How to Repurpose One Video into 20+ Pieces of Content',
    excerpt: 'Maximize your video ROI by transforming single videos into blogs, social posts, podcasts, and more.',
    category: 'Strategy',
    readTime: '10 min read',
    publishDate: '2024-12-29',
    featured: false,
    slug: '/blog/repurpose-video-content',
    tags: ['content-repurposing', 'content-strategy', 'efficiency', 'multi-platform'],
    image: evergreenRepurposeVideoImage,
    imageAlt: 'Repurposing one video into 20+ pieces of content across platforms',
    author: 'Evergreen Pal',
    authorRole: 'Content Strategy & SEO Expert'
  },
  {
    id: 'long-term-content-strategy',
    title: 'Building a Long-Term Video Content Strategy That Compounds',
    excerpt: 'Create evergreen video content that drives consistent traffic and leads for years, not just weeks.',
    category: 'Strategy',
    readTime: '13 min read',
    publishDate: '2024-12-27',
    featured: false,
    slug: '/blog/long-term-content-strategy',
    tags: ['content-strategy', 'evergreen-content', 'long-term-growth', 'seo'],
    image: evergreenLongTermStrategyImage,
    imageAlt: 'Long-term video content strategy showing compound growth over time',
    author: 'Evergreen Pal',
    authorRole: 'Content Strategy & SEO Expert'
  }
];

const categories = ['All', 'Strategy', 'Training', 'Production', 'Tools', 'ROI', 'Social Media', 'SEO', 'Operations'];
const pals = ['All', 'System Pal', 'Reel Pal', 'Spotlight Pal', 'Evergreen Pal'];

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPal, setSelectedPal] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  // Filter and sort articles
  const filteredArticles = blogArticles
    .filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
      const matchesPal = selectedPal === 'All' || article.author === selectedPal;
      return matchesSearch && matchesCategory && matchesPal;
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
            {featuredArticles.length > 0 && (() => {
              // Map author to Pal color for featured article
              const getPalColor = (author?: string) => {
                switch(author) {
                  case 'System Pal':
                    return 'from-green-50/80 to-green-100/80 dark:from-green-950/40 dark:to-green-900/40';
                  case 'Reel Pal':
                    return 'from-orange-50/80 to-orange-100/80 dark:from-orange-950/40 dark:to-orange-900/40';
                  case 'Spotlight Pal':
                    return 'from-purple-50/80 to-purple-100/80 dark:from-purple-950/40 dark:to-purple-900/40';
                  case 'Evergreen Pal':
                    return 'from-blue-50/80 to-blue-100/80 dark:from-blue-950/40 dark:to-blue-900/40';
                  default:
                    return 'from-gray-50/80 to-gray-100/80 dark:from-gray-950/40 dark:to-gray-900/40';
                }
              };
              const featuredBgColor = getPalColor(featuredArticles[0].author);
              
              return (
              <Link to={featuredArticles[0].slug}>
                <div className={`bg-gradient-to-br ${featuredBgColor} rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 group`}>
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
              );
            })()}
          </div>
        </section>

        {/* Filters and Sort Section */}
        <section className="py-8 border-b border-border bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col gap-6">
              {/* Search Bar */}
              <div className="relative max-w-2xl">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search articles by title, topic, or keyword..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 bg-background border-2 focus:border-primary transition-colors"
                />
              </div>

              {/* Filters Row with Labels */}
              <div className="flex flex-wrap items-end gap-6">
                {/* Category Filter */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Category
                  </label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-[180px] bg-background border-2 h-11">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent className="bg-background">
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Pal Filter */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Author (Pal)
                  </label>
                  <Select value={selectedPal} onValueChange={setSelectedPal}>
                    <SelectTrigger className="w-[180px] bg-background border-2 h-11">
                      <SelectValue placeholder="All Authors" />
                    </SelectTrigger>
                    <SelectContent className="bg-background">
                      {pals.map(pal => (
                        <SelectItem key={pal} value={pal}>
                          {pal}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort By */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Sort By
                  </label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px] bg-background border-2 h-11">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent className="bg-background">
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="readTime">Reading Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Active Filters Count */}
                {(selectedCategory !== 'All' || selectedPal !== 'All' || searchTerm) && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setSelectedCategory('All');
                      setSelectedPal('All');
                      setSearchTerm('');
                    }}
                    className="ml-auto mb-1"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Top Stories Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                {selectedPal !== 'All' ? `${selectedPal} Articles` : selectedCategory !== 'All' ? `${selectedCategory} Articles` : 'Top stories'}
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.slice(1).map((article) => {
                // Map author to Pal color
                const getPalColor = (author?: string) => {
                  switch(author) {
                    case 'System Pal':
                      return 'from-green-50/80 to-green-100/80 dark:from-green-950/40 dark:to-green-900/40';
                    case 'Reel Pal':
                      return 'from-orange-50/80 to-orange-100/80 dark:from-orange-950/40 dark:to-orange-900/40';
                    case 'Spotlight Pal':
                      return 'from-purple-50/80 to-purple-100/80 dark:from-purple-950/40 dark:to-purple-900/40';
                    case 'Evergreen Pal':
                      return 'from-blue-50/80 to-blue-100/80 dark:from-blue-950/40 dark:to-blue-900/40';
                    default:
                      return 'from-gray-50/80 to-gray-100/80 dark:from-gray-950/40 dark:to-gray-900/40';
                  }
                };
                const bgColor = getPalColor(article.author);
                
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