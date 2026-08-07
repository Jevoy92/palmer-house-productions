import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Plus, Sparkles, X } from "lucide-react";

/** Shared field chrome: label row with an optional "filled from source" marker. */
function FieldHead({
  label,
  hint,
  filledFrom,
  optional,
  children,
}: {
  label: string;
  hint?: string;
  filledFrom?: string;
  optional?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
      <span className="text-sm font-semibold">
        {label}
        {optional ? (
          <span className="ml-2 font-mono text-[9px] uppercase tracking-[.14em] text-muted-foreground">
            Optional
          </span>
        ) : null}
        {filledFrom ? (
          <span className="ml-2 inline-flex items-center gap-1 align-middle font-mono text-[9px] uppercase tracking-[.12em] text-evergreen">
            <Check className="size-3" /> {filledFrom}
          </span>
        ) : null}
      </span>
      {children}
      {hint ? <span className="w-full text-xs text-muted-foreground">{hint}</span> : null}
    </div>
  );
}

function useOutsideClose(onClose: () => void) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    function handler(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) onClose();
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);
  return ref;
}

/** Dropdown of curated starter answers. Always allows a custom answer. */
export function SuggestionMenu({
  options,
  onPick,
  label = "Ideas",
  align = "right",
}: {
  options: readonly string[];
  onPick: (value: string) => void;
  label?: string;
  align?: "left" | "right";
}) {
  const [open, setOpen] = useState(false);
  const ref = useOutsideClose(() => setOpen(false));
  if (!options.length) return null;
  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex min-h-8 items-center gap-1.5 rounded-xl border border-border bg-white px-2.5 text-[11px] font-bold text-ink transition hover:border-line-strong"
      >
        <Sparkles className="size-3 text-system" />
        {label}
        <ChevronDown className={`size-3 transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open ? (
        <div
          className={`absolute z-30 mt-2 max-h-72 w-72 overflow-y-auto rounded-2xl border border-border bg-white p-1.5 shadow-soft ${align === "right" ? "right-0" : "left-0"}`}
        >
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onPick(option);
                setOpen(false);
              }}
              className="block w-full rounded-xl px-3 py-2 text-left text-[13px] leading-snug transition hover:bg-mist"
            >
              {option}
            </button>
          ))}
          <p className="border-t border-border px-3 py-2 text-[11px] text-muted-foreground">
            Pick one to start, then edit it in your own words.
          </p>
        </div>
      ) : null}
    </div>
  );
}

/** Single-line or short paragraph field with starter answers. */
export function GuidedText({
  label,
  value,
  onChange,
  suggestions = [],
  placeholder,
  hint,
  rows = 3,
  multiline = true,
  filledFrom,
  optional,
  type,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  suggestions?: readonly string[];
  placeholder?: string;
  hint?: string;
  rows?: number;
  multiline?: boolean;
  filledFrom?: string;
  optional?: boolean;
  type?: string;
}) {
  const classes =
    "mt-2 w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-system focus:ring-2 focus:ring-system/15";
  return (
    <div className="block">
      <FieldHead label={label} hint={hint} filledFrom={filledFrom} optional={optional}>
        <SuggestionMenu options={suggestions} onPick={(picked) => onChange(picked)} />
      </FieldHead>
      {multiline ? (
        <textarea
          rows={rows}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          className={`${classes} min-h-20 resize-y`}
        />
      ) : (
        <input
          type={type || "text"}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          className={`${classes} min-h-12`}
        />
      )}
    </div>
  );
}

/** Newline-separated list, edited as removable rows instead of an empty box. */
export function GuidedList({
  label,
  value,
  onChange,
  suggestions = [],
  placeholder = "Add your own…",
  hint,
  filledFrom,
  optional,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  suggestions?: readonly string[];
  placeholder?: string;
  hint?: string;
  filledFrom?: string;
  optional?: boolean;
}) {
  const items = value.split("\n").map((item) => item.trim()).filter(Boolean);
  const [entry, setEntry] = useState("");
  const add = (next: string) => {
    const clean = next.trim();
    if (!clean || items.includes(clean)) return;
    onChange([...items, clean].join("\n"));
  };
  const remove = (target: string) => onChange(items.filter((item) => item !== target).join("\n"));
  return (
    <div className="block">
      <FieldHead label={label} hint={hint} filledFrom={filledFrom} optional={optional}>
        <SuggestionMenu options={suggestions} onPick={add} label="Add from list" />
      </FieldHead>
      {items.length ? (
        <ul className="mt-2 space-y-1.5">
          {items.map((item, index) => (
            <li
              key={item}
              className="flex items-start gap-2 rounded-xl border border-border bg-white px-3 py-2"
            >
              <span className="mt-0.5 font-mono text-[9px] text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              <input
                value={item}
                onChange={(event) => {
                  const next = [...items];
                  next[index] = event.target.value;
                  onChange(next.join("\n"));
                }}
                className="min-w-0 flex-1 bg-transparent text-[13px] outline-none"
              />
              <button
                type="button"
                onClick={() => remove(item)}
                aria-label={`Remove ${item}`}
                className="mt-0.5 text-muted-foreground transition hover:text-ink"
              >
                <X className="size-3.5" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      <div className="mt-2 flex gap-2">
        <input
          value={entry}
          placeholder={placeholder}
          onChange={(event) => setEntry(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              add(entry);
              setEntry("");
            }
          }}
          className="min-h-11 flex-1 rounded-xl border border-border bg-white px-3 text-[13px] outline-none transition focus:border-system"
        />
        <button
          type="button"
          onClick={() => {
            add(entry);
            setEntry("");
          }}
          className="inline-flex min-h-11 items-center gap-1 rounded-xl border border-border bg-white px-3 text-[12px] font-bold transition hover:border-line-strong"
        >
          <Plus className="size-3.5" /> Add
        </button>
      </div>
    </div>
  );
}

/** Comma-separated traits, chosen by toggling instead of typing. */
export function GuidedTags({
  label,
  value,
  onChange,
  suggestions = [],
  hint,
  filledFrom,
  optional,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  suggestions?: readonly string[];
  hint?: string;
  filledFrom?: string;
  optional?: boolean;
}) {
  const items = value.split(",").map((item) => item.trim()).filter(Boolean);
  const [entry, setEntry] = useState("");
  const toggle = (item: string) =>
    onChange(
      (items.includes(item) ? items.filter((current) => current !== item) : [...items, item]).join(
        ", ",
      ),
    );
  const custom = items.filter((item) => !suggestions.includes(item));
  return (
    <div className="block">
      <FieldHead label={label} hint={hint} filledFrom={filledFrom} optional={optional} />
      <div className="mt-2 flex flex-wrap gap-1.5">
        {[...suggestions, ...custom].map((item) => {
          const active = items.includes(item);
          return (
            <button
              key={item}
              type="button"
              onClick={() => toggle(item)}
              className={`inline-flex min-h-9 items-center gap-1.5 rounded-xl border px-3 text-[12px] font-bold transition ${
                active
                  ? "border-system bg-system text-white"
                  : "border-border bg-white text-ink hover:border-line-strong"
              }`}
            >
              {active ? <Check className="size-3" /> : null}
              {item}
            </button>
          );
        })}
      </div>
      <div className="mt-2 flex gap-2">
        <input
          value={entry}
          placeholder="Add your own…"
          onChange={(event) => setEntry(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              if (entry.trim() && !items.includes(entry.trim())) toggle(entry.trim());
              setEntry("");
            }
          }}
          className="min-h-10 flex-1 rounded-xl border border-border bg-white px-3 text-[12px] outline-none transition focus:border-system"
        />
      </div>
    </div>
  );
}

/** Select with a built-in "Something else" escape hatch. */
export function GuidedSelect({
  label,
  value,
  onChange,
  options,
  hint,
  filledFrom,
  customLabel = "Something else…",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  hint?: string;
  filledFrom?: string;
  customLabel?: string;
}) {
  const isCustom = Boolean(value) && !options.includes(value);
  const [custom, setCustom] = useState(isCustom);
  return (
    <div className="block">
      <FieldHead label={label} hint={hint} filledFrom={filledFrom} />
      {custom ? (
        <div className="mt-2 flex gap-2">
          <input
            value={value}
            autoFocus
            placeholder="Type your own"
            onChange={(event) => onChange(event.target.value)}
            className="min-h-12 flex-1 rounded-2xl border border-border bg-white px-4 text-sm outline-none focus:border-system"
          />
          <button
            type="button"
            onClick={() => {
              setCustom(false);
              onChange(options[0] ?? "");
            }}
            className="min-h-12 rounded-2xl border border-border px-3 text-xs font-bold"
          >
            List
          </button>
        </div>
      ) : (
        <select
          value={options.includes(value) ? value : ""}
          onChange={(event) => {
            if (event.target.value === "__custom__") {
              setCustom(true);
              onChange("");
              return;
            }
            onChange(event.target.value);
          }}
          className="mt-2 min-h-12 w-full rounded-2xl border border-border bg-white px-4 text-sm outline-none focus:border-system"
        >
          <option value="">Choose one…</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
          <option value="__custom__">{customLabel}</option>
        </select>
      )}
    </div>
  );
}
