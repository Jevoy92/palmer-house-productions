import { Link } from 'react-router-dom';
import { Clock, Calendar, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishDate: string;
  featured?: boolean;
  slug: string;
  tags: string[];
}

export const BlogCard = ({
  title,
  excerpt,
  category,
  readTime,
  publishDate,
  featured = false,
  slug,
  tags
}: BlogCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 border-corporate-light/30 ${
      featured ? 'border-social-purple/30 bg-gradient-to-br from-social-purple/5 to-transparent' : ''
    }`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-3">
          <Badge 
            variant={featured ? "default" : "secondary"} 
            className={featured ? "bg-social-purple text-white" : "bg-corporate-light/50 text-corporate-gray"}
          >
            {category}
          </Badge>
          <div className="flex items-center text-sm text-corporate-gray">
            <Clock className="h-4 w-4 mr-1" />
            {readTime}
          </div>
        </div>
        <h3 className={`font-semibold text-corporate-dark group-hover:text-social-purple transition-colors leading-tight ${
          featured ? 'text-xl' : 'text-lg'
        }`}>
          <Link to={slug} className="hover:underline focus:underline">
            {title}
          </Link>
        </h3>
      </CardHeader>
      <CardContent>
        <p className="text-corporate-gray mb-4 leading-relaxed text-sm">
          {excerpt}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.slice(0, featured ? 3 : 2).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs bg-corporate-light/50 text-corporate-gray">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-corporate-gray">
            <Calendar className="h-4 w-4 mr-1" />
            {formatDate(publishDate)}
          </div>
          <Link
            to={slug}
            className="inline-flex items-center text-social-purple hover:text-social-pink transition-colors font-medium text-sm"
          >
            Read More
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};