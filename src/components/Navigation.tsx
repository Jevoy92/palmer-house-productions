
import { useState } from "react";
import { Menu, X } from "lucide-react";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-deep-charcoal/95 backdrop-blur-sm border-b border-warm-brown/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-accent-terracotta">Palmer House Productions</h1>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#about" className="text-cream-white hover:text-accent-terracotta transition-colors">The Tribe</a>
              <a href="#team" className="text-cream-white hover:text-accent-terracotta transition-colors">The Crew</a>
              <a href="#services" className="text-cream-white hover:text-accent-terracotta transition-colors">Field Guide</a>
              <a href="#pricing" className="text-cream-white hover:text-accent-terracotta transition-colors">Pathways</a>
              <a href="#values" className="text-cream-white hover:text-accent-terracotta transition-colors">The Compass</a>
              <a href="#contact" className="text-cream-white hover:text-accent-terracotta transition-colors">Signal Us</a>
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-muted-gray hover:text-cream-white focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-deep-charcoal border-t border-warm-brown/20">
            <a href="#about" className="block px-3 py-2 text-cream-white hover:text-accent-terracotta transition-colors">The Tribe</a>
            <a href="#team" className="block px-3 py-2 text-cream-white hover:text-accent-terracotta transition-colors">The Crew</a>
            <a href="#services" className="block px-3 py-2 text-cream-white hover:text-accent-terracotta transition-colors">Field Guide</a>
            <a href="#pricing" className="block px-3 py-2 text-cream-white hover:text-accent-terracotta transition-colors">Pathways</a>
            <a href="#values" className="block px-3 py-2 text-cream-white hover:text-accent-terracotta transition-colors">The Compass</a>
            <a href="#contact" className="block px-3 py-2 text-cream-white hover:text-accent-terracotta transition-colors">Signal Us</a>
          </div>
        </div>
      )}
    </nav>
  );
};
