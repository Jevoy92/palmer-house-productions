
import { useState } from "react";
import { Menu, X } from "lucide-react";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-earth-brown-dark/90 backdrop-blur-sm border-b border-earth-brown">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-warm-orange">Palmer House Productions</h1>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#about" className="text-warm-cream hover:text-warm-orange transition-colors">The Tribe</a>
              <a href="#team" className="text-warm-cream hover:text-warm-orange transition-colors">The Crew</a>
              <a href="#services" className="text-warm-cream hover:text-warm-orange transition-colors">Field Guide</a>
              <a href="#pricing" className="text-warm-cream hover:text-warm-orange transition-colors">Pathways</a>
              <a href="#values" className="text-warm-cream hover:text-warm-orange transition-colors">The Compass</a>
              <a href="#contact" className="text-warm-cream hover:text-warm-orange transition-colors">Signal Us</a>
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-stone-gray hover:text-warm-cream focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-earth-brown-dark border-t border-earth-brown">
            <a href="#about" className="block px-3 py-2 text-warm-cream hover:text-warm-orange transition-colors">The Tribe</a>
            <a href="#team" className="block px-3 py-2 text-warm-cream hover:text-warm-orange transition-colors">The Crew</a>
            <a href="#services" className="block px-3 py-2 text-warm-cream hover:text-warm-orange transition-colors">Field Guide</a>
            <a href="#pricing" className="block px-3 py-2 text-warm-cream hover:text-warm-orange transition-colors">Pathways</a>
            <a href="#values" className="block px-3 py-2 text-warm-cream hover:text-warm-orange transition-colors">The Compass</a>
            <a href="#contact" className="block px-3 py-2 text-warm-cream hover:text-warm-orange transition-colors">Signal Us</a>
          </div>
        </div>
      )}
    </nav>
  );
};
