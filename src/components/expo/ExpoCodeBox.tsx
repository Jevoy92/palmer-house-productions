import { useEffect, useState } from "react";
import { checkExpoCode } from "@/lib/expo.functions";
import { expoCampaign, expoCodeStorageKey, expoSavings } from "@/lib/expo-campaign";

export function readStoredExpoCode() {
  try {
    return window.sessionStorage.getItem(expoCodeStorageKey) || "";
  } catch {
    return "";
  }
}

/** Booth-code entry with server-checked feedback. The code is remembered for this tab only;
 * checkout re-validates it on the server. */
export function ExpoCodeBox({
  onChange,
  compact = false,
}: {
  onChange?: (code: string) => void;
  compact?: boolean;
}) {
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState("");
  const [state, setState] = useState<"idle" | "checking" | "error">("idle");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const stored = readStoredExpoCode();
    if (stored) {
      setApplied(stored);
      onChange?.(stored);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  async function apply(e: React.FormEvent) {
    e.preventDefault();
    if (!code.trim()) return;
    setState("checking");
    try {
      const r = await checkExpoCode({ data: { code } });
      if (r.valid) {
        const clean = code.trim().toUpperCase();
        try {
          window.sessionStorage.setItem(expoCodeStorageKey, clean);
        } catch {
          /* still applied for this page */
        }
        setApplied(clean);
        setState("idle");
        onChange?.(clean);
      } else {
        setState("error");
        setMessage(
          r.reason === "ended"
            ? "The expo offer has ended, so this code can't be used."
            : "That code isn't valid. Check the spelling, or continue at the public rate.",
        );
      }
    } catch {
      setState("error");
      setMessage("We couldn't check that code. Please try again.");
    }
  }
  function remove() {
    try {
      window.sessionStorage.removeItem(expoCodeStorageKey);
    } catch {
      /* ignore */
    }
    setApplied("");
    setCode("");
    onChange?.("");
  }
  if (applied)
    return (
      <div className="expo-code expo-code-ok" role="status">
        <p className="expo-code-title">Booth offer unlocked</p>
        <p>
          ${expoCampaign.offers.booth.monthly}/month for your first 3 months. Then $
          {expoCampaign.regularMonthly}/month. Save ${expoSavings("booth")} total.
        </p>
        <p className="expo-code-note">Your booth offer replaces the public introductory offer.</p>
        <button type="button" className="expo-link" onClick={remove}>
          Remove code
        </button>
      </div>
    );
  if (compact && !open)
    return (
      <button type="button" className="expo-link" onClick={() => setOpen(true)}>
        Have a booth code?
      </button>
    );
  return (
    <form className="expo-code" onSubmit={apply}>
      <label htmlFor="expo-code-input" className="expo-code-title">
        Have a booth code?
      </label>
      <div className="expo-code-row">
        <input
          id="expo-code-input"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            setState("idle");
          }}
          autoCapitalize="characters"
          autoComplete="off"
          aria-invalid={state === "error"}
          aria-describedby={state === "error" ? "expo-code-error" : undefined}
          placeholder="Enter code"
        />
        <button type="submit" className="secondary-action" disabled={state === "checking"}>
          {state === "checking" ? "Checking…" : "Apply"}
        </button>
      </div>
      {state === "error" && (
        <p id="expo-code-error" className="expo-code-error" role="alert">
          {message}
        </p>
      )}
    </form>
  );
}
