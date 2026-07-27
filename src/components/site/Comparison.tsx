const cols = ["Palmer House", "Freelancer", "In-house DIY", "Stock footage"];
const rows: Array<{ label: string; values: boolean[] }> = [
  { label: "Cinematic production quality", values: [true, true, false, true] },
  { label: "Strategy before the camera rolls", values: [true, false, false, false] },
  { label: "Multi-format library from one shoot", values: [true, false, false, false] },
  { label: "Reliable turnaround and communication", values: [true, false, true, false] },
  { label: "Built around your business goals", values: [true, false, true, false] },
];

function Mark({ ok }: { ok: boolean }) {
  return ok ? (
    <span className="bg-gradient-brand mx-auto grid size-7 place-items-center rounded-full text-sm text-primary-foreground">
      ✓
    </span>
  ) : (
    <span className="mx-auto grid size-7 place-items-center rounded-full bg-secondary text-sm text-muted-foreground">
      ✕
    </span>
  );
}

export function Comparison() {
  return (
    <section id="pricing" className="px-4 py-20">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-[clamp(1.9rem,4.5vw,3rem)]">1 team to do it all</h2>
        <p className="mt-3 text-lg text-muted-foreground">
          One partner for strategy, production, and delivery.
        </p>
      </div>

      <div className="surface-card mx-auto mt-10 max-w-4xl overflow-x-auto p-4 sm:p-8">
        <table className="w-full min-w-[560px] border-collapse text-left">
          <thead>
            <tr>
              <th className="w-1/3 pb-6" />
              {cols.map((c, i) => (
                <th key={c} className="pb-6 text-center text-sm font-semibold">
                  <span className={i === 0 ? "text-gradient-brand font-display text-lg" : ""}>
                    {c}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="border-t border-border">
                <td className="py-4 text-sm font-medium">{r.label}</td>
                {r.values.map((v, i) => (
                  <td key={i} className="py-4 text-center">
                    <Mark ok={v} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
