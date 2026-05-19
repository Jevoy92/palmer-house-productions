import { cn } from "@/lib/utils";

interface MainContentProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const MainContent = ({ children, className, id = "main-content" }: MainContentProps) => {
  return (
    <main 
      id={id}
      className={cn("min-h-screen", className)}
      role="main"
      aria-label="Main content"
    >
      {children}
    </main>
  );
};