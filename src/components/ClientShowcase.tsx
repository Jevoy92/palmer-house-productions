import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Placeholder images - replace these with your actual client work
const clientImages = [
  { id: 1, src: "/placeholder.svg", alt: "Client Project 1" },
  { id: 2, src: "/placeholder.svg", alt: "Client Project 2" },
  { id: 3, src: "/placeholder.svg", alt: "Client Project 3" },
  { id: 4, src: "/placeholder.svg", alt: "Client Project 4" },
  { id: 5, src: "/placeholder.svg", alt: "Client Project 5" },
];

export const ClientShowcase = () => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 5;

  const handlePrevious = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => 
      Math.min(clientImages.length - visibleCount, prev + 1)
    );
  };

  const visibleImages = clientImages.slice(startIndex, startIndex + visibleCount);
  const canGoPrevious = startIndex > 0;
  const canGoNext = startIndex < clientImages.length - visibleCount;

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-display font-semibold mb-2">
            You've probably seen our work.
          </h2>
          <p className="text-[clamp(1.25rem,3vw,1.75rem)] text-corporate-gray font-medium">
            You just didn't know it was AI.
          </p>
        </div>

        <div className="relative">
          <div className="flex gap-6 justify-center items-center overflow-hidden">
            {visibleImages.map((image, index) => (
              <div
                key={image.id}
                className="flex-shrink-0 w-[200px] h-[280px] bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-3 justify-center mt-8">
            <button
              onClick={handlePrevious}
              disabled={!canGoPrevious}
              className="w-10 h-10 rounded-full bg-white border-2 border-corporate-gray/20 flex items-center justify-center hover:border-corporate-gray/40 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous images"
            >
              <ChevronLeft className="w-5 h-5 text-corporate-dark" />
            </button>
            <button
              onClick={handleNext}
              disabled={!canGoNext}
              className="w-10 h-10 rounded-full bg-white border-2 border-corporate-gray/20 flex items-center justify-center hover:border-corporate-gray/40 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next images"
            >
              <ChevronRight className="w-5 h-5 text-corporate-dark" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
