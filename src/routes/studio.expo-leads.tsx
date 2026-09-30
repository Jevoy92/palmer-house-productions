import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { expoCampaign } from "@/lib/expo-campaign";

export const Route = createFileRoute("/studio/expo-leads")({
  head: () => ({
    meta: [
      { title: "Expo follow-up list — Palmer House" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ExpoLeads,
});

type Contact = {
  id: string;
  email: string;
  name: string | null;
  company: string | null;
  phone: string | null;
  interest: string | null;
  wants_to_create: string | null;
  source: string;
  status: "lead" | "account" | "paid";
  purchased: string | null;
  offer: "public" | "booth" | null;
  follow_up_date: string;
  follow_up_state: string;
  notes: string | null;
  created_at: string;
};

const db = supabase as any;

function firstName(c: Contact) {
  return (c.name || "there").split(" ")[0];
}

function previewEmail(c: Contact) {
  const origin = "https://www.palmerhouseproductions.com";
  if (c.status === "paid" && (c.purchased || "").toLowerCase().includes("studio"))
    return {
      subject: "How is your first Studio project going?",
      body: `Hi ${firstName(c)}, thanks for joining Palmer House Studio. What would you like to create first? You can pick up where you left off here: ${origin}/studio. Reply if you'd like help finding your starting point. — Jevoy`,
    };
  if (c.status === "paid")
    return {
      subject: "Your next step with Palmer House",
      body: `Hi ${firstName(c)}, thanks for booking ${c.purchased || "with us"}. Our team will reach out about scheduling and next steps. Reply any time with questions. — Jevoy`,
    };
  const rate = c.offer === "booth" ? expoCampaign.offers.booth.monthly : expoCampaign.offers.public.monthly;
  return {
    subject: "Your Palmer House Studio details",
    body: `Hi ${firstName(c)}, as promised, here's more about Palmer House Studio and the offer we discussed: ${origin}/expo. Your rate is $${rate}/month for your first 3 months, then $${expoCampaign.regularMonthly}/month.${c.offer === "booth" ? " Enter the booth code from our booth at checkout." : ""} The introductory offer can be redeemed through Sunday, October 4. What kind of content would you most like help with? — Jevoy`,
  };
}

function ExpoLeads() {
  const [rows, setRows] = useState<Contact[] | null>(null);
  const [error, setError] = useState("");
  const [open, setOpen] = useState<string | null>(null);
  async function load() {
    const r = await db
      .from("expo_contacts")
      .select("*")
      .eq("campaign_id", expoCampaign.id)
      .order("created_at", { ascending: false });
    if (r.error) setError("Only Palmer House staff can view this list. Sign in to Studio first.");
    else setRows(r.data);
  }
  useEffect(() => {
    void load();
  }, []);
  async function update(id: string, patch: Partial<Contact>) {
    await db.from("expo_contacts").update({ ...patch, updated_at: new Date().toISOString() }).eq("id", id);
    await load();
  }
  async function addPaper(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email") || "").trim().toLowerCase();
    if (!email) return;
    const r = await db.from("expo_contacts").upsert(
      {
        campaign_id: expoCampaign.id,
        email,
        name: String(f.get("name") || "") || null,
        company: String(f.get("company") || "") || null,
        source: "paper",
        notes: String(f.get("notes") || "") || null,
      },
      { onConflict: "campaign_id,email", ignoreDuplicates: true },
    );
    if (r.error) setError(r.error.message);
    e.currentTarget.reset();
    await load();
  }
  function exportCsv() {
    if (!rows) return;
    const cols = [
      "name", "email", "company", "phone", "source", "created_at", "interest", "status",
      "purchased", "offer", "follow_up_date", "follow_up_state", "notes",
    ] as const;
    const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const csv = [cols.join(","), ...rows.map((r) => cols.map((c) => esc(r[c])).join(","))].join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = `expo-follow-up-${expoCampaign.id}.csv`;
    a.click();
  }
  return (
    <main className="mx-auto max-w-6xl px-5 py-10">
      <Link to="/studio" className="text-sm underline">
        ← Studio
      </Link>
      <h1 className="mt-4 text-4xl font-extrabold">Expo follow-up list</h1>
      <p className="mt-2 text-muted-foreground">
        Everyone from the Small Business Expo. Friday follow-up is due {expoCampaign.followUpLabel}.
        Emails are previewed here; mark each one sent after you send it.
      </p>
      {error && <p className="mt-6 font-bold text-destructive">{error}</p>}
      {rows && (
        <>
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="secondary-action" onClick={exportCsv}>
              Export CSV
            </button>
            <span className="self-center text-sm text-muted-foreground">
              {rows.length} contacts · {rows.filter((r) => r.status === "paid").length} paid ·{" "}
              {rows.filter((r) => r.follow_up_state === "due").length} due
            </span>
          </div>
          <form onSubmit={addPaper} className="mt-6 grid gap-2 rounded-xl border border-border bg-card p-4 md:grid-cols-5">
            <input name="name" placeholder="Name" className="rounded-lg border border-border px-3 py-2" />
            <input name="email" type="email" required placeholder="Email" className="rounded-lg border border-border px-3 py-2" />
            <input name="company" placeholder="Company" className="rounded-lg border border-border px-3 py-2" />
            <input name="notes" placeholder="Notes" className="rounded-lg border border-border px-3 py-2" />
            <button className="primary-action">Add paper signup</button>
          </form>
          <div className="mt-6 space-y-3">
            {rows.map((c) => {
              const mail = previewEmail(c);
              return (
                <article key={c.id} className="rounded-xl border border-border bg-card p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-bold">
                        {c.name || "—"} · {c.email}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {[c.company, c.phone, c.interest, c.source, c.offer && `${c.offer} offer`]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                      <p className="mt-1 text-xs font-bold uppercase tracking-wider">
                        {c.status}
                        {c.purchased ? ` · ${c.purchased}` : ""} · follow-up {c.follow_up_state}
                      </p>
                      {c.wants_to_create && <p className="mt-2 text-sm">“{c.wants_to_create}”</p>}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button className="secondary-action" onClick={() => setOpen(open === c.id ? null : c.id)}>
                        Preview email
                      </button>
                      <select
                        value={c.follow_up_state}
                        onChange={(e) =>
                          void update(c.id, {
                            follow_up_state: e.target.value,
                            ...(e.target.value === "sent" ? { follow_up_sent_at: new Date().toISOString() } : {}),
                          } as Partial<Contact>)
                        }
                        className="rounded-lg border border-border px-2"
                        aria-label="Follow-up state"
                      >
                        {["due", "sent", "replied", "skipped"].map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {open === c.id && (
                    <div className="mt-3 rounded-lg bg-cream p-3 text-sm">
                      <p className="font-bold">Subject: {mail.subject}</p>
                      <p className="mt-2 whitespace-pre-wrap">{mail.body}</p>
                      <a
                        className="mt-2 inline-block underline"
                        href={`mailto:${c.email}?subject=${encodeURIComponent(mail.subject)}&body=${encodeURIComponent(mail.body)}`}
                      >
                        Open in email
                      </a>
                    </div>
                  )}
                  <textarea
                    defaultValue={c.notes || ""}
                    placeholder="Notes"
                    onBlur={(e) => e.target.value !== (c.notes || "") && void update(c.id, { notes: e.target.value })}
                    className="mt-3 w-full rounded-lg border border-border p-2 text-sm"
                    rows={1}
                  />
                </article>
              );
            })}
          </div>
        </>
      )}
    </main>
  );
}
