import { useEffect, useRef, useState } from "react";

interface TextSegment {
  text: string;
  isEmoji?: boolean;
}

const content: TextSegment[][] = [
  [
    { text: "We" },
    { text: "don't" },
    { text: "just" },
    { text: "make" },
    { text: "videos;" },
    { text: "we" },
    { text: "solve" },
    { text: "🎯", isEmoji: true },
    { text: "business" },
    { text: "problems" },
    { text: "with" },
    { text: "them." },
  ],
  [
    { text: "Your" },
    { text: "message" },
    { text: "💬", isEmoji: true },
    { text: "isn't" },
    { text: "landing." },
    { text: "Your" },
    { text: "brand" },
    { text: "isn't" },
    { text: "getting" },
    { text: "seen" },
    { text: "👀", isEmoji: true },
    { text: "where" },
    { text: "it" },
    { text: "counts." },
  ],
  [
    { text: "We" },
    { text: "design" },
    { text: "video" },
    { text: "systems" },
    { text: "🔧", isEmoji: true },
    { text: "that" },
    { text: "turn" },
    { text: "complex" },
    { text: "problems" },
    { text: "into" },
    { text: "measurable" },
    { text: "solutions." },
    { text: "✨", isEmoji: true },
  ],
  [
    { text: "Content" },
    { text: "that" },
    { text: "performs," },
    { text: "🚀", isEmoji: true },
    { text: "scales," },
    { text: "📊", isEmoji: true },
    { text: "and" },
    { text: "delivers" },
    { text: "real" },
    { text: "ROI." },
    { text: "💰", isEmoji: true },
  ],
];

export const AnimatedTextReveal = () => {
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate scroll progress: starts revealing as section enters, completes before exit
      const scrollStart = windowHeight - rect.top;
      const scrollHeight = windowHeight + rect.height * 0.5;
      const scrollProgress = Math.max(0, Math.min(1, scrollStart / scrollHeight));

      setProgress(scrollProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate total words
  const totalWords = content.reduce((sum, paragraph) => sum + paragraph.length, 0);

  // Calculate which words should be visible based on scroll progress
  const visibleWordCount = Math.floor(progress * totalWords); // Full reveal when scrolled

  const getWordStyle = (globalIndex: number): React.CSSProperties => {
    const distance = Math.max(0, globalIndex - visibleWordCount);
    const opacity = Math.max(0, Math.min(1, 1 - distance * 0.2));
    const blur = Math.min(10, distance * 1.5);

    return {
      opacity,
      filter: `blur(${blur}px)`,
      transition: "opacity 0.8s ease-out, filter 0.8s ease-out",
    };
  };

  let globalWordIndex = 0;

  return (
    <section
      ref={sectionRef}
      className="min-h-screen pt-12 pb-16 md:pt-16 md:pb-24 bg-white flex items-center justify-center"
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="space-y-4">
          {content.map((paragraph, pIndex) => (
            <p
              key={pIndex}
              className="text-[clamp(1.5rem,4vw,2.5rem)] font-display font-bold leading-tight"
            >
              {paragraph.map((segment, wIndex) => {
                const currentIndex = globalWordIndex++;
                return (
                  <span
                    key={wIndex}
                    style={getWordStyle(currentIndex)}
                    className={segment.isEmoji ? "inline-block mx-1" : ""}
                  >
                    {segment.text}
                    {!segment.isEmoji && wIndex < paragraph.length - 1 && " "}
                  </span>
                );
              })}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};
