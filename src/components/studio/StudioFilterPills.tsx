import { useEffect, useId, useRef } from "react";
import { LayoutGroup, motion } from "motion/react";
import { useStudioMotion } from "./studio-motion";

/** A single keyboard stop with a visible selection that follows the chosen filter. */
export function StudioFilterPills({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
}) {
  const id = useId();
  const { reduceMotion, transition } = useStudioMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = containerRef.current;
    const selected = container?.querySelector<HTMLButtonElement>('[aria-pressed="true"]');
    if (!container || !selected) return;
    const left =
      selected.getBoundingClientRect().left -
      container.getBoundingClientRect().left +
      container.scrollLeft;
    container.scrollTo({
      left: Math.max(0, left - (container.clientWidth - selected.clientWidth) / 2),
      behavior: reduceMotion ? "instant" : "smooth",
    });
  }, [value, reduceMotion]);
  return (
    <LayoutGroup id={id}>
      <div className="studio-filter-pills" role="toolbar" aria-label={label} ref={containerRef}>
        {options.map((option, index) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={value === option.value}
            tabIndex={value === option.value ? 0 : -1}
            onClick={() => onChange(option.value)}
            onKeyDown={(event) => {
              const next =
                event.key === "ArrowRight"
                  ? (index + 1) % options.length
                  : event.key === "ArrowLeft"
                    ? (index + options.length - 1) % options.length
                    : event.key === "Home"
                      ? 0
                      : event.key === "End"
                        ? options.length - 1
                        : -1;
              if (next < 0) return;
              event.preventDefault();
              onChange(options[next].value);
              const button = event.currentTarget.parentElement?.querySelectorAll("button")[next];
              button?.focus({ preventScroll: true });
            }}
          >
            {value === option.value && (
              <motion.span
                className="studio-filter-selection"
                layoutId={reduceMotion ? undefined : "selection"}
                transition={transition}
                aria-hidden="true"
              />
            )}
            <span className="studio-filter-label">{option.label}</span>
          </button>
        ))}
      </div>
    </LayoutGroup>
  );
}
