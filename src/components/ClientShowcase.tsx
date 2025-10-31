import { useRef, useEffect, useState } from "react";

// Placeholder images - replace these with your actual client work
const clientImages = [
  { src: "/placeholder.svg", alt: "Client Project 1" },
  { src: "/placeholder.svg", alt: "Client Project 2" },
  { src: "/placeholder.svg", alt: "Client Project 3" },
  { src: "/placeholder.svg", alt: "Client Project 4" },
  { src: "/placeholder.svg", alt: "Client Project 5" },
];

export const ClientShowcase = () => {
  const [rotation, setRotation] = useState(0);
  const [dragging, setDragging] = useState(false);
  const lastX = useRef(0);
  const velocity = useRef(0);
  const raf = useRef<number | null>(null);

  const radius = 320;
  const itemWidth = 260;
  const itemHeight = 360;
  const perspective = 1200;
  const rotationSpeed = 0.18;
  const tiltAngle = -18;

  // Mouse/touch drag to rotate
  useEffect(() => {
    function onPointerMove(e: MouseEvent | TouchEvent) {
      if (!dragging) return;
      let x: number;
      if (e.type.startsWith("touch") && "touches" in e) {
        x = e.touches[0].clientX;
      } else {
        x = (e as MouseEvent).clientX;
      }
      const dx = x - lastX.current;
      lastX.current = x;
      velocity.current = dx * 0.5;
      setRotation((r) => r + dx * 0.5);
    }

    function onPointerUp() {
      setDragging(false);
    }

    if (dragging) {
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);
      window.addEventListener("touchmove", onPointerMove);
      window.addEventListener("touchend", onPointerUp);
    }

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("touchend", onPointerUp);
    };
  }, [dragging]);

  // Inertia
  useEffect(() => {
    let running = true;
    function animate() {
      if (!dragging && Math.abs(velocity.current) > 0.01) {
        setRotation((r) => r + velocity.current);
        velocity.current *= 0.94;
      }
      if (running) raf.current = requestAnimationFrame(animate);
    }
    raf.current = requestAnimationFrame(animate);
    return () => {
      running = false;
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [dragging]);

  // Auto-rotate
  useEffect(() => {
    if (dragging) return;
    let running = true;
    function tick() {
      setRotation((r) => r + rotationSpeed);
      if (running) raf.current = requestAnimationFrame(tick);
    }
    raf.current = requestAnimationFrame(tick);
    return () => {
      running = false;
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [dragging, rotationSpeed]);

  const angleStep = 360 / clientImages.length;

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-display font-semibold mb-2">
            You've probably seen our work.
          </h2>
          <p className="text-[clamp(1.25rem,3vw,1.75rem)] text-corporate-gray font-medium">
            You just didn't know it was AI.
          </p>
        </div>

        {/* 3D Circular Carousel */}
        <div
          style={{
            width: "100%",
            height: "500px",
            perspective: `${perspective}px`,
            perspectiveOrigin: "50% 50%",
            overflow: "visible",
            position: "relative",
            cursor: dragging ? "grabbing" : "grab",
            userSelect: "none",
          }}
          onPointerDown={(e) => {
            e.preventDefault();
            setDragging(true);
            if (e.type === "touchstart" && "touches" in e) {
              lastX.current = (e as any).touches[0].clientX;
            } else {
              lastX.current = e.clientX;
            }
          }}
          onTouchStart={(e) => {
            setDragging(true);
            if (e.touches && e.touches.length > 0) {
              lastX.current = e.touches[0].clientX;
            }
          }}
          role="region"
          aria-label="3D Carousel"
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              left: 0,
              top: 0,
              transformStyle: "preserve-3d",
              transform: `translateZ(0px) rotateY(${rotation}deg)`,
              transition: dragging ? "none" : "transform 0.2s cubic-bezier(.4,1,.4,1)",
            }}
          >
            {clientImages.map((img, i) => {
              const theta = angleStep * i;
              return (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    width: itemWidth,
                    height: itemHeight,
                    marginLeft: -itemWidth / 2,
                    marginTop: -itemHeight / 2,
                    boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
                    borderRadius: 18,
                    overflow: "hidden",
                    background: "#fff",
                    transformStyle: "preserve-3d",
                    transform: `rotateY(${theta}deg) translateZ(${radius}px) rotateX(${tiltAngle}deg)`,
                    transition: dragging
                      ? "none"
                      : "box-shadow 0.2s cubic-bezier(.4,1,.4,1)",
                  }}
                  aria-label={img.alt || `Carousel item ${i + 1}`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      pointerEvents: "none",
                      userSelect: "none",
                    }}
                    draggable={false}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
