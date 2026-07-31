import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CalendarDays,
  Check,
  Clock3,
  FileText,
  FolderUp,
  LayoutDashboard,
  Plus,
  Sparkles,
  Trash2,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { PageShell } from "@/components/site/PageShell";

type StudioTab = "home" | "brand" | "calendar" | "script" | "persona" | "content";
type CalendarItem = { id: string; title: string; channel: string; date: string; lane: string };

const TABS = [
  { id: "home", label: "Overview", icon: LayoutDashboard },
  { id: "brand", label: "Brand kit", icon: FolderUp },
  { id: "calendar", label: "Calendar", icon: CalendarDays },
  { id: "script", label: "Script builder", icon: FileText },
  { id: "persona", label: "Persona", icon: Users },
  { id: "content", label: "Content system", icon: Sparkles },
] as const;

function StudioPreviewPage() {
  const [tab, setTab] = useState<StudioTab>("home");
  const [daysLeft, setDaysLeft] = useState(7);

  useEffect(() => {
    const key = "ph.studio.preview.started";
    const started = Number(window.localStorage.getItem(key)) || Date.now();
    window.localStorage.setItem(key, String(started));
    const elapsed = Math.floor((Date.now() - started) / 86_400_000);
    setDaysLeft(Math.max(0, 7 - elapsed));
  }, []);

  return (
    <PageShell>
      <section className="px-3 pb-12 pt-5 sm:px-5">
        <div className="mx-auto max-w-[88rem] overflow-hidden rounded-[2rem] border border-border bg-white shadow-soft">
          <header className="flex flex-wrap items-center gap-4 border-b border-border px-5 py-4">
            <div className="min-w-0 flex-1">
              <p className="font-semibold">Palmer House Studio</p>
              <p className="font-mono text-[9px] uppercase tracking-[0.17em] text-muted-foreground">
                Local product preview
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-evergreen-soft px-4 py-2 text-sm font-semibold text-evergreen">
              <Clock3 className="size-4" /> {daysLeft} preview day{daysLeft === 1 ? "" : "s"} left
            </div>
            <Link
              to="/membership"
              className="hidden min-h-11 items-center rounded-full border border-border px-4 text-sm font-semibold sm:flex"
            >
              About membership
            </Link>
          </header>
          <div className="grid lg:grid-cols-[15rem_1fr]">
            <aside className="hidden border-r border-border bg-secondary/50 p-3 lg:block">
              <nav className="space-y-1" aria-label="Studio tools">
                {TABS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTab(item.id)}
                    className={`flex min-h-12 w-full items-center gap-3 rounded-2xl px-4 text-left text-sm font-semibold ${tab === item.id ? "bg-white shadow-soft" : "text-muted-foreground hover:bg-white/70"}`}
                  >
                    <item.icon className="size-4" />
                    {item.label}
                  </button>
                ))}
              </nav>
              <div className="mt-8 rounded-2xl bg-ink p-4 text-white">
                <p className="text-sm font-semibold">Preview boundary</p>
                <p className="mt-2 text-xs leading-relaxed text-white/60">
                  Files remain in this browser session. No account, cloud upload, AI charge, or
                  payment is active.
                </p>
              </div>
            </aside>
            <main className="min-w-0">
              <div className="border-b border-border p-3 lg:hidden">
                <label className="sr-only" htmlFor="studio-tool">
                  Choose a studio tool
                </label>
                <select
                  id="studio-tool"
                  value={tab}
                  onChange={(event) => setTab(event.target.value as StudioTab)}
                  className="min-h-12 w-full rounded-2xl border border-border bg-white px-4 font-semibold"
                >
                  {TABS.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="min-h-[44rem] p-5 sm:p-8 lg:p-10">
                {tab === "home" && <Overview setTab={setTab} />}
                {tab === "brand" && <BrandKit />}
                {tab === "calendar" && <CalendarTool />}
                {tab === "script" && <ScriptTool />}
                {tab === "persona" && <PersonaTool />}
                {tab === "content" && <ContentTool />}
              </div>
            </main>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function ToolHeading({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h1 className="text-3xl font-extrabold sm:text-5xl">{title}</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">{body}</p>
    </div>
  );
}

function Overview({ setTab }: { setTab: (tab: StudioTab) => void }) {
  const cards = TABS.filter((item) => item.id !== "home");
  return (
    <>
      <ToolHeading
        title="Make the next useful thing."
        body="Start with a business problem, not an empty document. Each tool gives the work a clear job before it gives you words."
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className="min-h-52 rounded-[2rem] border border-border bg-white p-6 text-left transition hover:bg-secondary"
          >
            <span
              className="grid size-11 place-items-center rounded-full"
              style={{
                background: [
                  "var(--system-soft)",
                  "var(--reel-soft)",
                  "var(--spotlight-soft)",
                  "var(--evergreen-soft)",
                  "var(--cream)",
                ][index],
              }}
            >
              <item.icon className="size-5" />
            </span>
            <h2 className="mt-8 text-xl font-bold">{item.label}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Open the guided {item.label.toLowerCase()} workspace.
            </p>
          </button>
        ))}
      </div>
      <div className="mt-8 rounded-[2rem] bg-ink p-6 text-white sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/50">
            0 credits used
          </p>
          <p className="mt-2 text-lg font-semibold">
            This preview uses transparent templates, not paid AI generation.
          </p>
        </div>
        <Link
          to="/membership"
          className="mt-5 inline-flex min-h-11 items-center rounded-full bg-white px-5 text-sm font-semibold text-ink sm:mt-0"
        >
          Join the founding list
        </Link>
      </div>
    </>
  );
}

function BrandKit() {
  const [files, setFiles] = useState<string[]>([]);
  const [brand, setBrand] = useState({
    promise: "",
    audience: "",
    voice: "Direct, warm, specific",
    proof: "",
  });
  function chooseFiles(event: ChangeEvent<HTMLInputElement>) {
    setFiles(Array.from(event.target.files ?? []).map((file) => file.name));
  }
  return (
    <>
      <ToolHeading
        title="Give every draft the same memory."
        body="Add the minimum brand context that helps the team sound like you. Selected files are listed locally and are not uploaded."
      />
      <div className="mt-10 grid gap-6 xl:grid-cols-[1fr_0.8fr]">
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            label="Core promise"
            value={brand.promise}
            onChange={(value) => setBrand({ ...brand, promise: value })}
            placeholder="We turn… into…"
          />
          <TextField
            label="Primary audience"
            value={brand.audience}
            onChange={(value) => setBrand({ ...brand, audience: value })}
            placeholder="Growing service businesses…"
          />
          <TextField
            label="Voice"
            value={brand.voice}
            onChange={(value) => setBrand({ ...brand, voice: value })}
          />
          <TextField
            label="Best proof"
            value={brand.proof}
            onChange={(value) => setBrand({ ...brand, proof: value })}
            placeholder="A result clients can verify…"
          />
        </div>
        <div>
          <label className="grid min-h-56 cursor-pointer place-items-center rounded-[2rem] border border-dashed border-border bg-secondary p-6 text-center">
            <input
              type="file"
              multiple
              accept="image/*,.pdf,.doc,.docx"
              onChange={chooseFiles}
              className="sr-only"
            />
            <span>
              <FolderUp className="mx-auto size-8 text-system" />
              <span className="mt-4 block font-semibold">Choose brand files</span>
              <span className="mt-2 block text-xs text-muted-foreground">
                Logos, references, or guidelines · local preview only
              </span>
            </span>
          </label>
          {files.length > 0 && (
            <ul className="mt-4 space-y-2">
              {files.map((file) => (
                <li
                  key={file}
                  className="flex items-center gap-2 rounded-xl bg-evergreen-soft px-3 py-2 text-sm"
                >
                  <Check className="size-4 text-evergreen" />
                  {file}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

function CalendarTool() {
  const [items, setItems] = useState<CalendarItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(
        window.localStorage.getItem("ph.studio.calendar") ?? "[]",
      ) as CalendarItem[];
    } catch {
      return [];
    }
  });
  const [draft, setDraft] = useState({
    title: "",
    channel: "LinkedIn",
    date: "",
    lane: "Spotlight",
  });
  function save(next: CalendarItem[]) {
    setItems(next);
    window.localStorage.setItem("ph.studio.calendar", JSON.stringify(next));
  }
  function add(event: FormEvent) {
    event.preventDefault();
    if (!draft.title || !draft.date) return;
    save([...items, { ...draft, id: crypto.randomUUID() }]);
    setDraft({ ...draft, title: "" });
  }
  return (
    <>
      <ToolHeading
        title="Turn the shoot into a rhythm."
        body="Plan the next publishable asset while the idea is still alive. Calendar items are saved only in this browser."
      />
      <form
        onSubmit={add}
        className="mt-9 grid gap-3 rounded-[2rem] bg-secondary p-5 md:grid-cols-[1fr_10rem_10rem_9rem_auto]"
      >
        <input
          value={draft.title}
          onChange={(event) => setDraft({ ...draft, title: event.target.value })}
          className="min-h-12 rounded-2xl border border-border bg-white px-4"
          placeholder="Content idea"
        />
        <select
          value={draft.channel}
          onChange={(event) => setDraft({ ...draft, channel: event.target.value })}
          className="min-h-12 rounded-2xl border border-border bg-white px-3"
        >
          <option>LinkedIn</option>
          <option>Instagram</option>
          <option>YouTube</option>
          <option>Email</option>
          <option>Internal</option>
        </select>
        <input
          type="date"
          value={draft.date}
          onChange={(event) => setDraft({ ...draft, date: event.target.value })}
          className="min-h-12 rounded-2xl border border-border bg-white px-3"
        />
        <select
          value={draft.lane}
          onChange={(event) => setDraft({ ...draft, lane: event.target.value })}
          className="min-h-12 rounded-2xl border border-border bg-white px-3"
        >
          <option>Spotlight</option>
          <option>Reel</option>
          <option>Evergreen</option>
          <option>System</option>
        </select>
        <button
          type="submit"
          className="grid min-h-12 place-items-center rounded-full bg-ink px-5 text-white"
          aria-label="Add calendar item"
        >
          <Plus className="size-5" />
        </button>
      </form>
      <div className="mt-7 divide-y divide-border border-y border-border">
        {items.length ? (
          items
            .sort((a, b) => a.date.localeCompare(b.date))
            .map((item) => (
              <div
                key={item.id}
                className="grid min-h-20 items-center gap-3 py-3 sm:grid-cols-[7rem_1fr_8rem_auto]"
              >
                <span className="font-mono text-xs text-muted-foreground">{item.date}</span>
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.channel}</p>
                </div>
                <span className="text-sm font-semibold">{item.lane}</span>
                <button
                  type="button"
                  onClick={() => save(items.filter((candidate) => candidate.id !== item.id))}
                  className="grid size-11 place-items-center rounded-full hover:bg-secondary"
                  aria-label={`Delete ${item.title}`}
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            ))
        ) : (
          <div className="grid min-h-56 place-items-center text-center text-muted-foreground">
            <div>
              <CalendarDays className="mx-auto size-8" />
              <p className="mt-3">Your first planned asset will appear here.</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function ScriptTool() {
  const [form, setForm] = useState({
    goal: "Build trust",
    audience: "",
    offer: "",
    proof: "",
    tone: "Warm and direct",
  });
  const [generated, setGenerated] = useState(false);
  const script = useMemo(
    () => ({
      hook: `If ${form.audience || "your best client"} is still unsure, they probably do not need more information. They need clearer proof.`,
      body: `Here is what ${form.offer || "this approach"} changes: [name the before]. The important difference is [show the method]. You can see it in ${form.proof || "one specific client result"}.`,
      cta:
        form.goal === "Build trust"
          ? "See the proof, then decide if this is the right fit."
          : "Take the next useful step while the problem is still clear.",
    }),
    [form],
  );
  return (
    <>
      <ToolHeading
        title="Build a script with a job."
        body="This guided template shapes a useful first draft. It is deterministic and editable—no AI model is called in preview mode."
      />
      <div className="mt-10 grid gap-7 xl:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-4">
          <SelectField
            label="Goal"
            value={form.goal}
            onChange={(value) => setForm({ ...form, goal: value })}
            options={["Build trust", "Create momentum", "Explain the offer", "Train the team"]}
          />
          <TextField
            label="Audience"
            value={form.audience}
            onChange={(value) => setForm({ ...form, audience: value })}
            placeholder="Who needs this?"
          />
          <TextField
            label="Offer or idea"
            value={form.offer}
            onChange={(value) => setForm({ ...form, offer: value })}
            placeholder="What are you explaining?"
          />
          <TextField
            label="Specific proof"
            value={form.proof}
            onChange={(value) => setForm({ ...form, proof: value })}
            placeholder="A real result, example, or change"
          />
          <button
            type="button"
            onClick={() => setGenerated(true)}
            className="min-h-12 w-full rounded-full bg-spotlight px-6 font-semibold text-white"
          >
            Build the first draft
          </button>
        </div>
        <div className="rounded-[2rem] bg-ink p-6 text-white sm:p-8">
          {generated ? (
            <div className="space-y-7">
              <ScriptBlock label="Hook" text={script.hook} />
              <ScriptBlock label="Body" text={script.body} />
              <ScriptBlock label="Call to action" text={script.cta} />
              <p className="border-t border-white/15 pt-5 text-xs leading-relaxed text-white/45">
                Replace every bracketed phrase with your real detail. Specific beats polished.
              </p>
            </div>
          ) : (
            <div className="grid min-h-96 place-items-center text-center text-white/45">
              <div>
                <FileText className="mx-auto size-9" />
                <p className="mt-4">Your hook, body, and CTA will appear here.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function PersonaTool() {
  const [form, setForm] = useState({ role: "", pressure: "", fear: "", outcome: "" });
  const ready = Object.values(form).every((value) => value.trim());
  return (
    <>
      <ToolHeading
        title="Write for one real decision-maker."
        body="A useful persona is not a fictional biography. It is a map of the decision, pressure, fear, and proof your message must respect."
      />
      <div className="mt-10 grid gap-7 xl:grid-cols-[0.8fr_1.2fr]">
        <div className="grid gap-4">
          <TextField
            label="Their role"
            value={form.role}
            onChange={(value) => setForm({ ...form, role: value })}
            placeholder="Operations manager"
          />
          <TextField
            label="Current pressure"
            value={form.pressure}
            onChange={(value) => setForm({ ...form, pressure: value })}
            placeholder="Onboarding takes too much manager time"
          />
          <TextField
            label="What they fear"
            value={form.fear}
            onChange={(value) => setForm({ ...form, fear: value })}
            placeholder="Another tool nobody uses"
          />
          <TextField
            label="What good looks like"
            value={form.outcome}
            onChange={(value) => setForm({ ...form, outcome: value })}
            placeholder="New hires find the right answer alone"
          />
        </div>
        <div className="rounded-[2rem] border border-border bg-secondary p-6 sm:p-8">
          {ready ? (
            <>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-system">
                Decision persona
              </p>
              <h2 className="mt-4 text-3xl font-extrabold">{form.role}</h2>
              <p className="mt-5 text-lg">
                They are under pressure because <strong>{form.pressure.toLowerCase()}</strong>.
              </p>
              <p className="mt-4 text-muted-foreground">
                They will resist anything that feels like “{form.fear}.” Show them a concrete path
                to “{form.outcome}.”
              </p>
              <div className="mt-7 rounded-2xl bg-white p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  Message test
                </p>
                <p className="mt-2 font-semibold">
                  Does this content lower their risk, show the path, and prove the outcome?
                </p>
              </div>
            </>
          ) : (
            <div className="grid min-h-80 place-items-center text-center text-muted-foreground">
              <div>
                <Users className="mx-auto size-9" />
                <p className="mt-4">Complete all four decisions to reveal the persona.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function ContentTool() {
  const [idea, setIdea] = useState("");
  const [result, setResult] = useState<string[]>([]);
  function build() {
    if (!idea.trim()) return;
    setResult([
      `Short-form hook: “The part nobody tells you about ${idea.toLowerCase()}.”`,
      `Long-form lesson: Break ${idea.toLowerCase()} into the problem, the common mistake, the method, and one real example.`,
      `Email note: Share the moment you realized ${idea.toLowerCase()} needed a better system.`,
      `Internal asset: Record the repeatable steps your team should follow when ${idea.toLowerCase()} comes up again.`,
    ]);
  }
  return (
    <>
      <ToolHeading
        title="One idea. Four useful lives."
        body="Turn a single source idea into a connected content system instead of four disconnected posts."
      />
      <div className="mt-10 grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <textarea
            value={idea}
            onChange={(event) => setIdea(event.target.value)}
            rows={8}
            className="w-full rounded-[2rem] border border-border bg-white p-5"
            placeholder="Paste the idea, client question, lesson, or process you want to reuse…"
          />
          <button
            type="button"
            onClick={build}
            className="mt-3 min-h-12 w-full rounded-full bg-ink px-6 font-semibold text-white"
          >
            Build the content system
          </button>
        </div>
        <div className="grid gap-px overflow-hidden rounded-[2rem] bg-border sm:grid-cols-2">
          {result.length ? (
            result.map((item, index) => (
              <article key={item} className="min-h-48 bg-secondary p-6">
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.18em]"
                  style={{
                    color: ["var(--reel)", "var(--evergreen)", "var(--spotlight)", "var(--system)"][
                      index
                    ],
                  }}
                >
                  {["Reel", "Evergreen", "Spotlight", "System"][index]} output
                </span>
                <p className="mt-5 font-semibold leading-relaxed">{item}</p>
              </article>
            ))
          ) : (
            <div className="col-span-full grid min-h-96 place-items-center bg-secondary text-center text-muted-foreground">
              <div>
                <Sparkles className="mx-auto size-9" />
                <p className="mt-4">Your four-lane content map will appear here.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder = "",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label>
      <span className="text-sm font-semibold">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-2 min-h-12 w-full rounded-2xl border border-border bg-white px-4"
      />
    </label>
  );
}
function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label>
      <span className="text-sm font-semibold">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 min-h-12 w-full rounded-2xl border border-border bg-white px-4"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}
function ScriptBlock({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">{label}</p>
      <p className="mt-2 text-lg leading-relaxed">{text}</p>
    </div>
  );
}

export const Route = createFileRoute("/studio-preview")({
  head: () => ({
    meta: [
      { title: "Palmer House Studio Preview" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: StudioPreviewPage,
});
