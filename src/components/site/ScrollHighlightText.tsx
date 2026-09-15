import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";
import { useHydratedReducedMotion } from "@/hooks/use-hydrated-reduced-motion";

/**
 * Phrases start in muted ink (AA-readable on paper, 4.8:1) and darken to full ink
 * as they scroll into focus. Content is always legible — the highlight is emphasis,
 * never a reveal. Keep these in sync with --muted-foreground / --ink in styles.css.
 */
const MUTED_INK = "#6b7280";
const FULL_INK = "#1f2328";

function Phrase({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const color = useTransform(progress, range, [MUTED_INK, FULL_INK]);
  return <motion.span style={{ color }}>{children} </motion.span>;
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
  const reduce = useHydratedReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.4"],
  });

  const phraseLists = paragraphs.map(
    (paragraph) =>
      paragraph
        .match(/[^.!?]+[.!?]+|[^.!?]+$/g)
        ?.map((phrase) => phrase.trim())
        .filter(Boolean) ?? [paragraph],
  );
  const total = phraseLists.reduce((count, phrases) => count + phrases.length, 0);

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
      {phraseLists.map((phrases, pi) => {
        const start = offset;
        offset += phrases.length;
        return (
          <p key={pi} className={pi > 0 ? paragraphClassName : undefined}>
            {phrases.map((phrase, i) => (
              <Phrase
                key={`${phrase}-${i}`}
                progress={scrollYProgress}
                range={[(start + i) / total, (start + i + 1) / total]}
              >
                {phrase}
              </Phrase>
            ))}
          </p>
        );
      })}
    </div>
  );
}
