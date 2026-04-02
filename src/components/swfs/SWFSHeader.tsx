export default function SWFSHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div>
          <span className="text-lg font-bold tracking-tight text-foreground">Palmer House</span>
        </div>
        <p className="hidden sm:block text-sm text-muted-foreground italic">
          We Don't Make Videos. We Translate Businesses.
        </p>
      </div>
    </header>
  );
}
