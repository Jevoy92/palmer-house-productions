import { useEffect, useRef, useState } from "react";

interface TextSegment {
  text: string;
  isEmoji?: boolean;
}

const content: TextSegment[][] = [
  [
    { text: "At" },
    { text: "Palmer" },
    { text: "House" },
    { text: "Productions" },
    { text: "we're" },
    { text: "revolutionizing" },
    { text: "how" },
    { text: "businesses" },
    { text: "create" },
    { text: "🎬", isEmoji: true },
    { text: "content." },
  ],
  [
    { text: "Using" },
    { text: "the" },
    { text: "latest" },
    { text: "AI" },
    { text: "models" },
    { text: "we" },
    { text: "capture" },
    { text: "🎨", isEmoji: true },
    { text: "your" },
    { text: "brand's" },
    { text: "essence" },
    { text: "to" },
    { text: "deliver" },
    { text: "agency-like" },
    { text: "content" },
    { text: "across" },
    { text: "all" },
    { text: "💼", isEmoji: true },
    { text: "platforms." },
  ],
  [
    { text: "So" },
    { text: "you" },
    { text: "can" },
    { text: "do" },
    { text: "the" },
    { text: "work" },
    { text: "of" },
    { text: "a" },
    { text: "full" },
    { text: "team" },
    { text: "👥", isEmoji: true },
    { text: "without" },
    { text: "hiring" },
    { text: "one." },
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

      // Calculate scroll progress: 0 when section enters viewport, 1 when at top
      const scrollProgress = Math.max(
        0,
        Math.min(1, (windowHeight - rect.top) / windowHeight)
      );

      setProgress(scrollProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate total words
  const totalWords = content.reduce((sum, paragraph) => sum + paragraph.length, 0);

  // Calculate which words should be visible based on scroll progress
  const visibleWordCount = Math.floor(progress * totalWords * 1.2); // Adjusted multiplier for faster reveal

  const getWordStyle = (globalIndex: number): React.CSSProperties => {
    const distance = Math.max(0, globalIndex - visibleWordCount);
    const opacity = Math.max(0, Math.min(1, 1 - distance * 0.3));
    const blur = Math.min(8, distance * 2);

    return {
      opacity,
      filter: `blur(${blur}px)`,
      transition: "opacity 0.6s ease-out, filter 0.6s ease-out",
    };
  };

  let globalWordIndex = 0;

  return (
    <section
      ref={sectionRef}
      className="min-h-[150vh] py-12 bg-white flex items-center justify-center"
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="space-y-8">
          {content.map((paragraph, pIndex) => (
            <p
              key={pIndex}
              className="text-[clamp(1.5rem,4vw,2.5rem)] font-display font-medium leading-tight"
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
