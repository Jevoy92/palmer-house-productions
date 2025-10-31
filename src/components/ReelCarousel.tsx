import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
const reelItems = [{
  type: "video" as const,
  src: "/assets/COLORFUL_NO_WIFI.mov",
  alt: "Colorful No WiFi"
}, {
  type: "video" as const,
  src: "/assets/DiscovertheExcitingPop-UpEventsinDowntownBothell.mov",
  alt: "Downtown Bothell Pop-Up Events"
}, {
  type: "video" as const,
  src: "/assets/Martin_Vid_FInal.mov",
  alt: "Martin Video"
}, {
  type: "video" as const,
  src: "/assets/1030_2.mp4",
  alt: "Client Video 4"
}, {
  type: "video" as const,
  src: "/assets/1030_3.mp4",
  alt: "Client Video 5"
}, {
  type: "video" as const,
  src: "/assets/1030_4.mp4",
  alt: "Client Video 6"
}, {
  type: "video" as const,
  src: "/assets/EmpowerYourBusiness_HRSolutionsfromExperts.mp4",
  alt: "HR Solutions for Business"
}];
export const ReelCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const autoPlayInterval = useRef<NodeJS.Timeout | null>(null);
  const goToPrevious = () => {
    setCurrentIndex(prev => prev === 0 ? reelItems.length - 1 : prev - 1);
  };
  const goToNext = () => {
    setCurrentIndex(prev => prev === reelItems.length - 1 ? 0 : prev + 1);
  };

  // Handle video playback - keep all videos playing
  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.play().catch(() => {
          // Handle autoplay restrictions
        });
      }
    });
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    autoPlayInterval.current = setInterval(() => {
      goToNext();
    }, 5000);
    return () => {
      if (autoPlayInterval.current) {
        clearInterval(autoPlayInterval.current);
      }
    };
  }, [isAutoPlaying, currentIndex]);

  // Pause autoplay on user interaction
  const handleUserInteraction = () => {
    setIsAutoPlaying(false);
    if (autoPlayInterval.current) {
      clearInterval(autoPlayInterval.current);
    }
  };
  const getItemStyle = (index: number) => {
    let diff = index - currentIndex;
    
    // Handle wrapping for continuous loop
    if (diff > reelItems.length / 2) {
      diff -= reelItems.length;
    } else if (diff < -reelItems.length / 2) {
      diff += reelItems.length;
    }
    
    const absDiff = Math.abs(diff);
    if (absDiff > 2) return {
      display: "none"
    };

    // Center item
    if (diff === 0) {
      return {
        transform: "translateX(0%) scale(1)",
        opacity: 1,
        zIndex: 30
      };
    }

    // Right items
    if (diff > 0) {
      return {
        transform: `translateX(${60 + (diff - 1) * 20}%) scale(${0.75 - (diff - 1) * 0.1})`,
        opacity: 0.4 - (diff - 1) * 0.2,
        zIndex: 30 - diff
      };
    }

    // Left items
    return {
      transform: `translateX(${-60 + (diff + 1) * 20}%) scale(${0.75 + (diff + 1) * 0.1})`,
      opacity: 0.4 + (diff + 1) * 0.2,
      zIndex: 30 + diff
    };
  };
  return <section className="py-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-display font-semibold mb-2">
            You've probably seen our work.
          </h2>
          <p className="text-[clamp(1.25rem,3vw,1.75rem)] text-corporate-gray font-medium">You just didn't know it was us.</p>
        </div>

        {/* Carousel Container */}
        <div className="relative h-[600px] flex items-center justify-center">
          {/* Navigation Buttons */}
          <Button variant="ghost" size="icon" onClick={() => {
          handleUserInteraction();
          goToPrevious();
        }} className="absolute left-4 z-40 h-12 w-12 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white shadow-lg" aria-label="Previous slide">
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button variant="ghost" size="icon" onClick={() => {
          handleUserInteraction();
          goToNext();
        }} className="absolute right-4 z-40 h-12 w-12 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white shadow-lg" aria-label="Next slide">
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Carousel Items */}
          <div className="relative w-full h-full flex items-center justify-center">
            {reelItems.map((item, index) => <div key={index} className="absolute transition-all duration-700 ease-out" style={{
            width: "min(380px, 90vw)",
            height: "min(620px, 80vh)",
            ...getItemStyle(index)
          }}>
                <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl bg-black">
                  {item.type === "video" ? <video ref={el => videoRefs.current[index] = el} src={item.src} className="w-full h-full object-cover scale-110" loop muted playsInline aria-label={item.alt} /> : <img src={item.src} alt={item.alt} className="w-full h-full object-cover scale-110" />}
                </div>
              </div>)}
          </div>

          {/* Dots Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-40">
            {reelItems.map((_, index) => <button key={index} onClick={() => {
            handleUserInteraction();
            setCurrentIndex(index);
          }} className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/75"}`} aria-label={`Go to slide ${index + 1}`} />)}
          </div>
        </div>

        {/* Optional Caption */}
        <div className="text-center mt-8">
          <p className="text-corporate-gray text-sm">
            Swipe or use arrows to explore our work
          </p>
        </div>
      </div>
    </section>;
};