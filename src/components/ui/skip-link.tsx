import { cn } from "@/lib/utils";

interface SkipLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export const SkipLink = ({ href, children, className }: SkipLinkProps) => {
  return (
    <a
      href={href}
      className={cn(
        "absolute left-[-10000px] top-auto w-[1px] h-[1px] overflow-hidden",
        "focus:static focus:w-auto focus:h-auto focus:z-[1000]",
        "focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground",
        "focus:no-underline focus:rounded focus:m-2 focus:inline-block",
        "transition-all duration-200",
        className
      )}
    >
      {children}
    </a>
  );
};