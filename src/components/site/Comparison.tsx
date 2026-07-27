const cols = ["Holo", "ChatGPT", "Canva", "Midjourney"];
const rows: Array<{ label: string; values: boolean[] }> = [
  { label: "High-performing design", values: [true, false, true, true] },
  { label: "Personalised for your brand", values: [true, false, false, false] },
  { label: "Works while you sleep", values: [true, false, false, false] },
  { label: "Easy-to-use, fun platform", values: [true, true, false, false] },
  { label: "Multi-language support", values: [true, true, false, false] },
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
        <h2 className="text-[clamp(1.9rem,4.5vw,3rem)]">1 tool to do it all</h2>
        <p className="mt-3 text-lg text-muted-foreground">Save $400/month. Just get Holo.</p>
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
