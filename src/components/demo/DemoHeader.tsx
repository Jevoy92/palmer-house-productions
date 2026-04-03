import { Link, useLocation } from "react-router-dom";

export default function DemoHeader() {
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link to="/" className="text-lg font-bold tracking-tight text-foreground hover:text-accent transition">
          Palmer House
        </Link>
        <nav className="flex gap-6 text-sm">
          <Link
            to="/"
            className={`transition ${location.pathname === "/" ? "text-accent" : "text-muted-foreground hover:text-foreground"}`}
          >
            Home
          </Link>
          <Link
            to="/demo"
            className={`transition ${location.pathname === "/demo" ? "text-accent" : "text-muted-foreground hover:text-foreground"}`}
          >
            Demo
          </Link>
        </nav>
      </div>
    </header>
  );
}
