import { toast } from "sonner";
import { useStudio } from "./StudioProvider";

type Prefs = {
  inapp_alerts: boolean;
  email_usage_alerts: boolean;
  email_campaign_ready: boolean;
  email_palmer_support: boolean;
};

const rows: { key: keyof Prefs; title: string; body: string }[] = [
  {
    key: "inapp_alerts",
    title: "Alerts in Studio",
    body: "News about plan, credit and feature changes shows up under the bell.",
  },
  {
    key: "email_usage_alerts",
    title: "Email me about credits and my plan",
    body: "When your monthly credits, prices or plan details change.",
  },
  {
    key: "email_palmer_support",
    title: "Email me about Studio updates",
    body: "New features and changes our team makes to Studio.",
  },
  {
    key: "email_campaign_ready",
    title: "Email me when a campaign is ready",
    body: "A short note when your drafts are ready to review.",
  },
];

export function StudioAlertPrefs() {
  const { settings, saveSettings } = useStudio();
  const current = (settings || {}) as Partial<Prefs>;

  async function toggle(key: keyof Prefs) {
    const next = !(current[key] ?? true);
    try {
      await saveSettings({ [key]: next } as never);
      toast.success(next ? "Turned on." : "Turned off.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save that choice.");
    }
  }

  return (
    <section className="mt-6 rounded-2xl border border-border bg-background p-5">
      <h3 className="text-base font-semibold text-foreground">How we keep you updated</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Choose where you hear about changes to your plan, credits and Studio.
      </p>
      <ul className="mt-4 divide-y divide-border">
        {rows.map((row) => {
          const on = current[row.key] ?? true;
          return (
            <li key={row.key} className="flex items-start justify-between gap-4 py-3">
              <div>
                <p className="text-sm font-medium text-foreground">{row.title}</p>
                <p className="text-sm text-muted-foreground">{row.body}</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={on}
                aria-label={row.title}
                onClick={() => toggle(row.key)}
                className={`relative mt-1 h-6 w-11 shrink-0 rounded-full transition-colors ${
                  on ? "bg-primary" : "bg-muted"
                }`}
              >
                <span
                  className={`absolute top-0.5 size-5 rounded-full bg-background shadow transition-transform ${
                    on ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
