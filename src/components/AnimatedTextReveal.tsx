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
    { text: "Maybe" },
    { text: "your" },
    { text: "onboarding" },
    { text: "⏱️", isEmoji: true },
    { text: "takes" },
    { text: "too" },
    { text: "long." },
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
    { text: "Whatever" },
    { text: "the" },
    { text: "challenge," },
    { text: "we" },
    { text: "start" },
    { text: "by" },
    { text: "understanding" },
    { text: "what's" },
    { text: "getting" },
    { text: "in" },
    { text: "the" },
    { text: "way" },
    { text: "🔧", isEmoji: true },
    { text: "—" },
    { text: "and" },
    { text: "then" },
    { text: "design" },
    { text: "a" },
    { text: "video" },
    { text: "system" },
    { text: "built" },
    { text: "to" },
    { text: "fix" },
    { text: "it." },
  ],
  [
    { text: "From" },
    { text: "training" },
    { text: "📚", isEmoji: true },
    { text: "to" },
    { text: "visibility" },
    { text: "📈", isEmoji: true },
    { text: "to" },
    { text: "customer" },
    { text: "education," },
    { text: "our" },
    { text: "process" },
    { text: "turns" },
    { text: "complex" },
    { text: "pain" },
    { text: "points" },
    { text: "into" },
    { text: "clear," },
    { text: "measurable" },
    { text: "solutions." },
    { text: "✨", isEmoji: true },
  ],
  [
    { text: "Every" },
    { text: "project" },
    { text: "is" },
    { text: "tailored" },
    { text: "to" },
    { text: "your" },
    { text: "team," },
    { text: "your" },
    { text: "goals," },
    { text: "and" },
    { text: "your" },
    { text: "bottom" },
    { text: "line" },
    { text: "💼", isEmoji: true },
    { text: "—" },
    { text: "so" },
    { text: "you" },
    { text: "get" },
    { text: "more" },
    { text: "than" },
    { text: "beautiful" },
    { text: "footage." },
  ],
  [
    { text: "You" },
    { text: "get" },
    { text: "content" },
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
  [
    { text: "Because" },
    { text: "video" },
    { text: "🎬", isEmoji: true },
    { text: "isn't" },
    { text: "the" },
    { text: "goal." },
    { text: "It's" },
    { text: "the" },
    { text: "tool" },
    { text: "🛠️", isEmoji: true },
    { text: "that" },
    { text: "gets" },
    { text: "you" },
    { text: "there." },
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
  const visibleWordCount = Math.floor(progress * totalWords * 0.8); // Slower reveal for better visibility

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
      className="min-h-[250vh] py-12 bg-white flex items-center justify-center"
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="space-y-8">
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
