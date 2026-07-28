import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {children}&nbsp;
    </motion.span>
  );
}

export function ScrollHighlightText({
  paragraphs,
  className = "",
  paragraphClassName = "",
}: {
  paragraphs: string[];
  className?: string;
  paragraphClassName?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.4"],
  });

  const wordLists = paragraphs.map((p) => p.split(" "));
  const total = wordLists.reduce((n, l) => n + l.length, 0);

  if (reduce) {
    return (
      <div className={className}>
        {paragraphs.map((p, i) => (
          <p key={i} className={i > 0 ? paragraphClassName : undefined}>
            {p}
          </p>
        ))}
      </div>
    );
  }

  let offset = 0;

  return (
    <div ref={ref} className={className}>
      {wordLists.map((words, pi) => {
        const start = offset;
        offset += words.length;
        return (
          <p
            key={pi}
            className={`flex flex-wrap justify-center ${pi > 0 ? paragraphClassName : ""}`}
          >
            {words.map((w, i) => (
              <Word
                key={`${w}-${i}`}
                progress={scrollYProgress}
                range={[(start + i) / total, (start + i + 1) / total]}
              >
                {w}
              </Word>
            ))}
          </p>
        );
      })}
    </div>
  );
}
