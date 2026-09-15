/* eslint-disable react-refresh/only-export-components -- Shared currency formatter accompanies the small reusable scope control. */
import { Minus, Plus } from "lucide-react";

export const money = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: Number.isInteger(amount) ? 0 : 2,
  }).format(amount);

export function Stepper({
  value,
  min,
  max,
  onChange,
  label,
  suffix = "",
}: {
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  label: string;
  suffix?: string;
}) {
  return (
    <div className="pc-stepper" role="group" aria-label={label}>
      <button
        type="button"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
        aria-label={`Decrease ${label.toLowerCase()}`}
      >
        <Minus size={17} />
      </button>
      <output aria-live="polite">
        {value}
        {suffix && <small>{suffix}</small>}
      </output>
      <button
        type="button"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
        aria-label={`Increase ${label.toLowerCase()}`}
      >
        <Plus size={17} />
      </button>
    </div>
  );
}
