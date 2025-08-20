import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  className?: string;
  count?: number;
  height?: string;
  variant?: 'text' | 'circular' | 'rectangular';
}

export const LoadingSkeleton = ({ 
  className, 
  count = 1, 
  height = 'h-4',
  variant = 'rectangular'
}: LoadingSkeletonProps) => {
  const variants = {
    text: 'h-4 rounded',
    circular: 'rounded-full aspect-square',
    rectangular: 'rounded-md'
  };

  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={cn(
            'skeleton-pulse',
            variants[variant],
            height,
            className
          )}
          style={{ animationDelay: `${index * 0.1}s` }}
        />
      ))}
    </div>
  );
};