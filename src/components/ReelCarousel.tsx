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
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate the angle between each item for even distribution
  const angleStep = 360 / reelItems.length;
  const radius = 600; // Distance from center

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

  // Handle drag/touch
  const handlePointerDown = (e: React.PointerEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setLastX(clientX);
    setVelocity(0);
  };

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent | TouchEvent) => {
      if (!isDragging) return;
      
      const clientX = 'touches' in e ? (e as TouchEvent).touches[0].clientX : (e as PointerEvent).clientX;
      const deltaX = clientX - lastX;
      const rotationChange = deltaX * 0.5;
      
      setRotation(prev => prev + rotationChange);
      setVelocity(rotationChange);
      setLastX(clientX);
    };

    const handlePointerUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('touchmove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
      window.addEventListener('touchend', handlePointerUp);
    }

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('touchend', handlePointerUp);
    };
  }, [isDragging, lastX]);

  // Inertia effect
  useEffect(() => {
    if (isDragging || Math.abs(velocity) < 0.1) return;

    const inertiaInterval = setInterval(() => {
      setVelocity(prev => prev * 0.95);
      setRotation(prev => prev + velocity);
    }, 16);

    return () => clearInterval(inertiaInterval);
  }, [velocity, isDragging]);

  // Auto-rotation
  useEffect(() => {
    if (isDragging) return;

    const autoRotateInterval = setInterval(() => {
      setRotation(prev => prev + 0.2);
    }, 30);

    return () => clearInterval(autoRotateInterval);
  }, [isDragging]);

  const goToPrevious = () => {
    setRotation(prev => prev + angleStep);
  };

  const goToNext = () => {
    setRotation(prev => prev - angleStep);
  };
  return (
    <section className="py-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-display font-semibold mb-2">
            You've probably seen our work.
          </h2>
          <p className="text-[clamp(1.25rem,3vw,1.75rem)] text-corporate-gray font-medium">
            You just didn't know it was us.
          </p>
        </div>

        {/* 3D Circular Carousel Container */}
        <div className="relative h-[700px] flex items-center justify-center">
          {/* Navigation Buttons */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={goToPrevious}
            className="absolute left-4 z-40 h-12 w-12 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white shadow-lg" 
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button 
            variant="ghost" 
            size="icon" 
            onClick={goToNext}
            className="absolute right-4 z-40 h-12 w-12 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white shadow-lg" 
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* 3D Carousel Container */}
          <div 
            ref={containerRef}
            className="relative w-full h-full flex items-center justify-center"
            style={{ 
              perspective: '2000px',
              perspectiveOrigin: 'center center'
            }}
            onPointerDown={handlePointerDown}
            onTouchStart={handlePointerDown}
          >
            <div
              className="relative w-full h-full transition-transform duration-100 ease-out"
              style={{
                transformStyle: 'preserve-3d',
                transform: `rotateY(${rotation}deg)`,
              }}
            >
              {reelItems.map((item, index) => {
                const angle = angleStep * index;
                const scale = Math.cos((angle - rotation) * Math.PI / 180) * 0.15 + 0.85;
                const zIndex = Math.round(Math.cos((angle - rotation) * Math.PI / 180) * 100);
                
                return (
                  <div
                    key={index}
                    className="absolute top-1/2 left-1/2"
                    style={{
                      transform: `
                        translate(-50%, -50%)
                        rotateY(${angle}deg)
                        translateZ(${radius}px)
                        scale(${scale})
                      `,
                      transformStyle: 'preserve-3d',
                      width: '380px',
                      height: '620px',
                      zIndex: zIndex,
                    }}
                  >
                    <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl bg-black">
                      {item.type === "video" ? (
                        <video
                          ref={el => videoRefs.current[index] = el}
                          src={item.src}
                          className="w-full h-full object-cover"
                          loop
                          muted
                          playsInline
                          aria-label={item.alt}
                        />
                      ) : (
                        <img
                          src={item.src}
                          alt={item.alt}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Optional Caption */}
        <div className="text-center mt-8">
          <p className="text-corporate-gray text-sm">
            Drag to rotate or use arrows to explore our work
          </p>
        </div>
      </div>
    </section>
  );
};