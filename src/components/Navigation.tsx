
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-apple-gray-2/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-sf font-semibold text-black">Palmer House</Link>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <a href="#about" className="text-apple-gray-5 hover:text-black transition-colors text-sm font-medium">Our Journey</a>
              <a href="#team" className="text-apple-gray-5 hover:text-black transition-colors text-sm font-medium">Meet the Crew</a>
              <a href="#services" className="text-apple-gray-5 hover:text-black transition-colors text-sm font-medium">Pathways</a>
              <Link to="/glimpse" className="text-apple-gray-5 hover:text-black transition-colors text-sm font-medium">The Glimpse</Link>
              <a href="#contact" className="text-apple-gray-5 hover:text-black transition-colors text-sm font-medium">Signal US</a>
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-apple-gray-5 hover:text-black focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-apple-gray-2">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <a href="#about" className="block px-3 py-2 text-apple-gray-5 hover:text-black transition-colors">Our Journey</a>
            <a href="#team" className="block px-3 py-2 text-apple-gray-5 hover:text-black transition-colors">Meet the Crew</a>
            <a href="#services" className="block px-3 py-2 text-apple-gray-5 hover:text-black transition-colors">Pathways</a>
            <Link to="/glimpse" className="block px-3 py-2 text-apple-gray-5 hover:text-black transition-colors">The Glimpse</Link>
            <a href="#contact" className="block px-3 py-2 text-apple-gray-5 hover:text-black transition-colors">Signal US</a>
          </div>
        </div>
      )}
    </nav>
  );
};
